import { useState, useEffect } from 'react';
import { CityInfo, LanguageCode, PanchangData } from '../types';
import { getPanchangForDate } from '../data/panchangEngine';
import {
  FESTIVALS_2027,
  EKADASHI_2027,
  PURNIMA_2027,
  AMAVASYA_2027,
  MUHURATS_2027,
  RASHIFAL_DATA,
  ARTICLES_DATA
} from '../data/calendarData';
import { FAMOUS_TEMPLES, TempleInfo } from '../data/templesData';
import {
  REGIONAL_CALENDARS_INFO,
  getUIText,
  getCityLocalizedName,
  getLocaleCode,
  getWeekdayLocalized,
  LOCALIZED_RASHI_NAMES
} from '../data/localization';
import {
  getFestivalName,
  getFestivalSummary,
  getLocalizedTithiName,
  getLocalizedNakshatraName,
  getLocalizedTimeWindow
} from '../data/localizedFestivalsAndMuhurat';
import { MONTH_NAMES, MONTH_DISPLAY_NAMES } from '../utils/seoEngine';
import { getUpcomingMilestones, MilestoneItem } from '../utils/upcomingMilestones';
import UpcomingFestivalsWidget from '../components/UpcomingFestivalsWidget';
import AdSlot from '../components/AdSlot';
import ShareButtons from '../components/ShareButtons';
import TodayHoroscopeSection from '../components/TodayHoroscopeSection';
import MonthlyVratSection from '../components/MonthlyVratSection';
import CelestialTracker from '../components/CelestialTracker';
import {
  Calendar,
  Sun,
  Moon,
  Compass,
  Sparkles,
  ArrowRight,
  Clock,
  Heart,
  Briefcase,
  ChevronRight,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Award,
  Landmark,
  Calculator,
  Flame,
  AlertTriangle,
  HelpCircle,
  BookOpen
} from 'lucide-react';

interface HomePageProps {
  currentCity: CityInfo;
  currentLang: LanguageCode;
  onNavigate: (path: string) => void;
  onOpenCityModal: () => void;
}

export default function HomePage({
  currentCity,
  currentLang,
  onNavigate,
  onOpenCityModal
}: HomePageProps) {
  const [todayPanchang, setTodayPanchang] = useState<PanchangData | null>(null);
  const [savedRashi, setSavedRashi] = useState('mesha');

  // Temple Category Filter State
  const [templeFilter, setTempleFilter] = useState<string>('all');

  // Mini Astrology Tools State
  const [boyRashi, setBoyRashi] = useState('mesha');
  const [girlRashi, setGirlRashi] = useState('simha');
  const [milanResult, setMilanResult] = useState<{ score: number; verdict: string } | null>(null);

  const [sadeSatiRashi, setSadeSatiRashi] = useState('meena');
  const [sadeSatiResult, setSadeSatiResult] = useState<{ phase: string; status: string; remedy: string } | null>(null);

  // Dynamic Upcoming Milestones State
  const [upcomingFilter, setUpcomingFilter] = useState<'7days' | '30days' | 'purnima_vrat' | 'major' | 'all'>('7days');
  const [milestones, setMilestones] = useState(() => getUpcomingMilestones());

  const isHindi = currentLang === 'hi';
  const isMarathi = currentLang === 'mr';
  const isGujarati = currentLang === 'gu';
  const isIndic = isMarathi || isHindi || isGujarati;

  useEffect(() => {
    const handleFestivalUpdate = () => {
      setMilestones(getUpcomingMilestones());
    };
    window.addEventListener('nd_festivals_updated', handleFestivalUpdate);
    return () => window.removeEventListener('nd_festivals_updated', handleFestivalUpdate);
  }, []);

  useEffect(() => {
    const today = new Date();
    const panchang = getPanchangForDate(today, currentCity.id);
    setTodayPanchang(panchang);

    const storedRashi = localStorage.getItem('nd_saved_rashi');
    if (storedRashi) {
      setSavedRashi(storedRashi);
    }
  }, [currentCity]);

  const handleSaveRashi = (rashiId: string) => {
    setSavedRashi(rashiId);
    localStorage.setItem('nd_saved_rashi', rashiId);
  };

  // Quick calculate Gun Milan
  const handleCalculateMilan = () => {
    const boyIdx = RASHIFAL_DATA.findIndex((r) => r.rashiId === boyRashi);
    const girlIdx = RASHIFAL_DATA.findIndex((r) => r.rashiId === girlRashi);
    const diff = Math.abs(boyIdx - girlIdx);
    let score = 26;
    if (diff === 0 || diff === 4 || diff === 8) {
      score = 31;
    } else if (diff === 6) {
      score = 29;
    } else if (diff === 5 || diff === 7) {
      score = 21;
    } else if (diff === 1 || diff === 11) {
      score = 19;
    }

    const verdict =
      score >= 28
        ? isMarathi
          ? 'उत्तम व श्रेष्ठ मिलन (विवाहासाठी अत्यंत शुभ)'
          : isHindi
          ? 'उत्तम एवं श्रेष्ठ मिलान (विवाह हेतु अत्यंत शुभ)'
          : 'Excellent Compatibility (Highly Auspicious)'
        : score >= 18
        ? isMarathi
          ? 'मध्यम व सामान्य मिलन (वैदिक उपायांसह विवाह योग्य)'
          : isHindi
          ? 'मध्यम एवं सामान्य मिलान (वैदिक उपायों के साथ शुभ)'
          : 'Acceptable Compatibility (Good with Minor Remedies)'
        : isMarathi
        ? 'कमी गुण मिलन (विद्वान ज्योतिषांचा सल्ला घ्यावा)'
        : isHindi
        ? 'कम गुण मिलान (विद्वान ज्योतिषी से परामर्श लें)'
        : 'Low Compatibility (Astrological Consultation Recommended)';

    setMilanResult({ score, verdict });
  };

  // Quick calculate Sade Sati
  const handleCalculateSadeSati = () => {
    if (sadeSatiRashi === 'meena') {
      setSadeSatiResult({
        phase: isMarathi ? 'द्वितीय चरण (शिखर काळ)' : isHindi ? 'द्वितीय चरण (शिखर काल)' : 'Peak Second Phase',
        status: isMarathi ? 'अत्यंत सक्रिय' : isHindi ? 'अत्यधिक सक्रिय' : 'Active Peak',
        remedy: isMarathi
          ? 'शनिवारी पिंपळाच्या झाडाखाली मोहरीच्या तेलाचा दिवा लावा आणि मारुती स्तोत्र/हनुमान चालीसा म्हणा.'
          : isHindi
          ? 'शनिवार को पीपल वृक्ष के नीचे सरसों के तेल का दीपक जलाएं एवं सुंदरकांड पाठ करें।'
          : 'Light a mustard oil lamp under Peepal tree on Saturdays & recite Hanuman Chalisa.'
      });
    } else if (sadeSatiRashi === 'mesha') {
      setSadeSatiResult({
        phase: isMarathi ? 'प्रथम चरण (उदय काळ)' : isHindi ? 'प्रथम चरण (उदय काल)' : 'First Rising Phase',
        status: isMarathi ? 'सुरुवातीचा टप्पा' : isHindi ? 'प्रारंभिक चरण' : 'Rising Transit',
        remedy: isMarathi
          ? 'शनि मंदिरात छाया दान करा आणि "ॐ शं शनैश्चराय नमः" मंत्राचा नित्य जप करा.'
          : isHindi
          ? 'शनि मंदिर में छाया दान करें एवं "ॐ शं शनैश्चराय नमः" का नित्य जाप करें।'
          : 'Perform Chhaya Daan in mustard oil & chant Shani Mantra daily.'
      });
    } else if (sadeSatiRashi === 'kumbha') {
      setSadeSatiResult({
        phase: isMarathi ? 'तृतीय चरण (उतरती साडेसाती)' : isHindi ? 'तृतीय चरण (अस्त / ढलती साढ़ेसाती)' : 'Third Setting Phase',
        status: isMarathi ? 'शेवटचा टप्पा' : isHindi ? 'उतरती साढ़ेसाती' : 'Setting Transit',
        remedy: isMarathi
          ? 'काळ्या कुत्र्याला आणि कावळ्याला भाकरी खाऊ घाला; गरजूंना मदत करा.'
          : isHindi
          ? 'काले कुत्ते एवं कौवे को रोटी खिलाएं; श्रमिकों का यथोचित सम्मान करें।'
          : 'Feed black dogs & birds; treat helpers and laborers with kindness.'
      });
    } else {
      setSadeSatiResult({
        phase: isMarathi ? 'साडेसातीचा प्रभाव नाही' : isHindi ? 'साढ़ेसाती का प्रभाव नहीं' : 'No Active Sade Sati',
        status: isMarathi ? 'शुभ व निर्दोष' : isHindi ? 'शुभ व निर्बाध' : 'Free from Sade Sati',
        remedy: isMarathi
          ? 'नियमित धर्म, सेवा व परोपकाराचे पालन करा.'
          : isHindi
          ? 'नियमित धर्म व परोपकार का पालन करें।'
          : 'Maintain righteous conduct and regular charity.'
      });
    }
  };

  // Next event calculations from 2027 canonical dataset
  const nextFestival = FESTIVALS_2027[0];
  const nextEkadashi = EKADASHI_2027[0];
  const nextPurnima = PURNIMA_2027[0];
  const nextMarriageMuhurat = MUHURATS_2027[0].dates2027[0];

  const cityNameDisplay = getCityLocalizedName(currentCity, currentLang);

  // Filter temples for home page display
  const featuredTemples = FAMOUS_TEMPLES.filter((t) => {
    if (templeFilter === 'all') return true;
    if (templeFilter === 'international') return t.region === 'international' || t.category === 'international';
    return t.category === templeFilter;
  }).slice(0, 6);

  return (
    <div className="space-y-10 sm:space-y-14">
      {/* Top Banner AdSlot */}
      <AdSlot type="top" />

      {/* Hero Section: High-Authority Vedic Ephemeris & Live Snapshot */}
      <section className="relative rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF3EC] to-[#F5ECE3] border-2 border-[#E6C88A] p-6 sm:p-10 shadow-md overflow-hidden">
        {/* Subtle traditional watermark motif */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 text-[#9A3412]/5 pointer-events-none select-none">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2" fill="none" />
            <path
              d="M50 4 L50 96 M4 50 L96 50 M17 17 L83 83 M17 83 L83 17"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        </div>

        <div className="relative z-10 max-w-5xl">
          {/* Trust Authority Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-amber-300 text-xs sm:text-sm font-semibold text-[#9A3412] mb-3 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>
              {isMarathi
                ? 'वैदिक पंचांग · दृक गणित सूर्य सिद्धांत प्रमाणित'
                : isHindi
                ? 'वैदिक पंचांग · दृक गणित सूर्य सिद्धान्त प्रमाणित समय गणना'
                : getUIText(currentLang, 'authorityBadge', 'Vedic Ephemeris · Drigganita Surya Siddhanta Certified')}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-stone-900 font-serif leading-tight">
            {isMarathi
              ? 'हिंदू दिनदर्शिका २०२७, आजचे पंचांग व मंदिर दर्शन वेळ'
              : isHindi
              ? 'हिन्दू कैलेंडर २०२७, आज का पंचांग एवं मंदिर दर्शन समय'
              : isGujarati
              ? 'હિન્દુ કેલેન્ડર ૨૦૨૭, આજનું પંચાંગ અને મંદિર દર્શન સમય'
              : getUIText(currentLang, 'heroTitle', 'Hindu Calendar 2027 & Daily Panchang')}
          </h1>

          <p className="mt-3 text-base sm:text-lg text-stone-700 leading-relaxed max-w-4xl font-normal">
            {isMarathi
              ? 'संपूर्ण हिंदू दिनदर्शिका २०२७, दैनिक पंचांग, चौघडिया, सण-उत्सव, शुभ विवाह मुहूर्त, प्रसिद्ध मंदिरांचे दर्शन व आरती वेळ, आणि ज्योतिष टूल्स.'
              : isHindi
              ? 'सम्पूर्ण हिन्दू कैलेंडर २०२७, दैनिक पंचांग, चौघड़िया, क्षेत्रीय पंचांग (मराठी, गुजराती, तेलुगु, तमिल, बंगाली), व्रत-त्यौहार, विवाह मुहूर्त, प्रसिद्ध मंदिरों के खुलने-बंद होने का समय व आरती समय सारणी, एवं कुंडली व राशिफल।'
              : getUIText(
                  currentLang,
                  'heroDesc',
                  'Complete Hindu Calendar 2027, Daily Panchang, Choghadiya, Regional Calendars, Festivals, Vrat, Shubh Muhurat, Famous Temples Opening Timings & Aarti, and Vedic Kundli Tools.'
                )}
          </p>

          {/* Quick city indicator & Changer with Coordinates */}
          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-stone-700 bg-white/90 p-3 rounded-xl border border-stone-200/90 shadow-2xs max-w-fit">
            <span className="flex items-center gap-1.5 font-bold text-stone-900">
              <MapPin className="w-4 h-4 text-[#9A3412]" />
              <span>{isMarathi ? 'पंचांग स्थान' : isHindi ? 'पंचांग गणना स्थान' : getUIText(currentLang, 'cityCalculation', 'Calculations for')}:</span>
              <span className="text-[#9A3412] font-serif underline decoration-dotted">
                {cityNameDisplay}, {currentCity.state}
              </span>
            </span>
            <span className="text-stone-300 hidden sm:inline">•</span>
            <span className="text-xs text-stone-500 tabular-nums">
              ({currentCity.latitude}°N, {currentCity.longitude}°E)
            </span>
            <button
              type="button"
              onClick={onOpenCityModal}
              className="text-xs font-bold text-white bg-[#9A3412] hover:bg-[#78280B] px-3.5 py-1.5 rounded-lg transition-colors ml-auto sm:ml-2 shadow-2xs"
            >
              {isMarathi ? 'शहर बदला' : isHindi ? 'शहर बदलें' : getUIText(currentLang, 'changeCity', 'Change City')}
            </button>
          </div>
        </div>

        {/* Live Today's Snapshot Grid */}
        {todayPanchang && (
          <div className="mt-8 pt-6 border-t border-[#E5D7CD]">
            <div className="flex items-center justify-between mb-3 text-xs uppercase tracking-wider font-bold text-stone-500">
              <span className="flex items-center gap-1.5 text-[#9A3412]">
                <Clock className="w-3.5 h-3.5" />{' '}
                {isMarathi ? 'आजचे लाईव्ह पंचांग' : isHindi ? 'आज का लाइव पंचांग' : getUIText(currentLang, 'todayPanchang', "Today's Live Panchang")}
              </span>
              <span className="text-stone-600 font-mono font-medium">
                {new Date().toLocaleDateString(getLocaleCode(currentLang), {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {/* 1. Today Date & Tithi */}
              <div className="bg-white p-4 rounded-xl border border-stone-200/90 shadow-2xs">
                <div className="text-xs font-bold text-stone-500 uppercase tracking-wide">
                  {getUIText(currentLang, 'tithi', 'Tithi')}
                </div>
                <div className="text-base sm:text-lg font-extrabold text-stone-900 mt-1 font-serif">
                  {todayPanchang.tithi.paksha} {todayPanchang.tithi.name}
                </div>
                <div className="text-xs text-stone-600 mt-0.5 font-medium">
                  {todayPanchang.hinduMonthAmavasyant} {isMarathi ? 'महिना' : isHindi ? 'मास' : 'Masa'}
                </div>
              </div>

              {/* 2. Nakshatra & Yoga */}
              <div className="bg-white p-4 rounded-xl border border-stone-200/90 shadow-2xs">
                <div className="text-xs font-bold text-stone-500 uppercase tracking-wide">
                  {getUIText(currentLang, 'nakshatra', 'Nakshatra')}
                </div>
                <div className="text-base sm:text-lg font-extrabold text-stone-900 mt-1 font-serif">
                  {todayPanchang.nakshatra.name}
                </div>
                <div className="text-xs text-stone-600 mt-0.5 truncate">
                  {isMarathi ? 'योग:' : isHindi ? 'योग:' : 'Yoga:'} {todayPanchang.yoga.name}
                </div>
              </div>

              {/* 3. Sunrise & Sunset */}
              <div className="bg-white p-4 rounded-xl border border-stone-200/90 shadow-2xs">
                <div className="text-xs font-bold text-stone-500 uppercase tracking-wide flex items-center justify-between">
                  <span>{getUIText(currentLang, 'sunrise', 'Sunrise')}</span>
                  <span>/</span>
                  <span>{getUIText(currentLang, 'sunset', 'Sunset')}</span>
                </div>
                <div className="text-sm sm:text-base font-extrabold text-amber-700 mt-1 tabular-nums flex items-center gap-1">
                  <Sun className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{todayPanchang.sunrise}</span>
                </div>
                <div className="text-xs text-stone-600 mt-0.5 tabular-nums flex items-center gap-1">
                  <Moon className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span>{isMarathi ? 'अस्त:' : isHindi ? 'अस्त:' : 'Sunset:'} {todayPanchang.sunset}</span>
                </div>
              </div>

              {/* 4. Rahu Kaal */}
              <div className="bg-white p-4 rounded-xl border border-rose-200 shadow-2xs">
                <div className="text-xs font-bold text-rose-700 uppercase tracking-wide flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                  <span>{getUIText(currentLang, 'rahuKaal', 'Rahu Kaal')}</span>
                </div>
                <div className="text-sm sm:text-base font-extrabold text-rose-900 mt-1 tabular-nums">
                  {todayPanchang.rahuKaal.start}
                </div>
                <div className="text-xs text-rose-600 mt-0.5 tabular-nums">
                  {isMarathi ? 'ते' : isHindi ? 'से' : 'to'} {todayPanchang.rahuKaal.end}
                </div>
              </div>

              {/* 5. Abhijit Muhurat */}
              <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-2xs">
                <div className="text-xs font-bold text-emerald-700 uppercase tracking-wide flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <span>{getUIText(currentLang, 'abhijit', 'Abhijit Muhurat')}</span>
                </div>
                <div className="text-sm sm:text-base font-extrabold text-emerald-900 mt-1 tabular-nums">
                  {todayPanchang.abhijitMuhurat.start}
                </div>
                <div className="text-xs text-emerald-700 mt-0.5 tabular-nums">
                  {isMarathi ? 'ते' : isHindi ? 'से' : 'to'} {todayPanchang.abhijitMuhurat.end}
                </div>
              </div>

              {/* 6. Active Choghadiya */}
              <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-[#9A3412] uppercase tracking-wide">
                    {getUIText(currentLang, 'choghadiya', 'Choghadiya')}
                  </div>
                  <div className="text-base sm:text-lg font-extrabold text-stone-900 mt-1 font-serif">
                    {todayPanchang.choghadiya.day[0].name}
                  </div>
                  <div className="text-xs font-semibold text-emerald-700">
                    {todayPanchang.choghadiya.day[0].nature}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('/choghadiya')}
                  className="text-xs font-bold text-[#9A3412] hover:underline mt-1 block text-left"
                >
                  {isMarathi ? '१६ मुहूर्त पहा →' : isHindi ? '१६ मुहूर्त देखें →' : 'View 16 Muhurats →'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Action Navigation Buttons */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => onNavigate('/today')}
            className="px-5 py-2.5 bg-[#9A3412] hover:bg-[#7C2D12] text-white text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <span>{isMarathi ? 'आजचे संपूर्ण पंचांग' : isHindi ? 'आज का सम्पूर्ण पंचांग' : getUIText(currentLang, 'todayPanchang', "Today's Full Panchang")}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/hindu-calendar-2027')}
            className="px-5 py-2.5 bg-white text-stone-900 border border-stone-300 hover:bg-stone-50 text-sm font-bold rounded-xl shadow-2xs transition-colors"
          >
            {isMarathi ? 'हिंदू दिनदर्शिका २०२७ (१२ महिने)' : isHindi ? 'हिन्दू कैलेंडर २०२७ (१२ माह)' : getUIText(currentLang, 'calendar2027', 'Hindu Calendar 2027')}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/choghadiya')}
            className="px-5 py-2.5 bg-white text-stone-900 border border-stone-300 hover:bg-stone-50 text-sm font-bold rounded-xl shadow-2xs transition-colors"
          >
            {isMarathi ? 'चौघडिया मुहूर्त' : isHindi ? 'चौघड़िया मुहूर्त' : getUIText(currentLang, 'todayChoghadiya', 'Choghadiya Muhurat')}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/temples')}
            className="px-5 py-2.5 bg-white text-[#9A3412] border-2 border-amber-400 hover:bg-amber-50 text-sm font-bold rounded-xl shadow-2xs transition-colors flex items-center gap-1.5"
          >
            <Landmark className="w-4 h-4 text-[#9A3412]" />
            <span>{isMarathi ? 'प्रसिद्ध मंदिरे व आरती वेळ' : isHindi ? 'प्रसिद्ध मंदिर व आरती समय' : 'Famous Temples & Aarti Timings'}</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/tools')}
            className="px-5 py-2.5 bg-white text-stone-900 border border-stone-300 hover:bg-stone-50 text-sm font-bold rounded-xl shadow-2xs transition-colors flex items-center gap-1.5"
          >
            <Calculator className="w-4 h-4 text-stone-700" />
            <span>{isMarathi ? 'कुंडली व ज्योतिष टूल्स' : isHindi ? 'कुंडली व ज्योतिष टूल्स' : 'Kundli & Astrology Tools'}</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/festivals/2027')}
            className="px-5 py-2.5 bg-white text-stone-900 border border-stone-300 hover:bg-stone-50 text-sm font-bold rounded-xl shadow-2xs transition-colors"
          >
            {isMarathi ? 'सण व व्रते २०२७' : isHindi ? 'व्रत एवं त्यौहार २०२७' : getUIText(currentLang, 'festivals', 'Festivals & Vrat 2027')}
          </button>
        </div>
      </section>

      {/* UPCOMING FESTIVALS, NEXT PURNIMA & SACRED DAYS SPOTLIGHT WIDGET */}
      <UpcomingFestivalsWidget currentLang={currentLang} onNavigate={onNavigate} />

      {/* LIVE SUN TRAJECTORY, MUHURATS & MOON PHASE TRACKER */}
      <CelestialTracker
        selectedCity={currentCity}
        currentLang={currentLang}
        onNavigate={onNavigate}
        onOpenCityModal={onOpenCityModal}
      />

      {/* TODAY'S HOROSCOPE SECTION */}
      <TodayHoroscopeSection
        currentLang={currentLang}
        onNavigate={onNavigate}
        savedRashi={savedRashi}
        onSaveRashi={handleSaveRashi}
      />

      {/* In-Content AdSlot */}
      <AdSlot type="in-content" />

      {/* FAMOUS HINDU TEMPLES & DARSHAN TIMINGS DIRECTORY */}
      <section className="vedic-card rounded-2xl p-6 sm:p-8 bg-white border border-[#E7D6CB]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-200">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9A3412] uppercase tracking-wider mb-1">
              <Landmark className="w-4 h-4" />
              <span>{isMarathi ? 'पवित्र तीर्थ दर्शन मार्गदर्शिका' : isHindi ? 'पवित्र तीर्थ दर्शन गाइड' : 'Holy Pilgrimage Darshan & Timing Guide'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif">
              {isMarathi
                ? 'प्रसिद्ध हिंदू मंदिर दर्शन, उघडण्याची-बंद होण्याची वेळ व आरती वेळापत्रक'
                : isHindi
                ? 'प्रसिद्ध हिन्दू मंदिर दर्शन, खुलने-बंद होने का समय व आरती सारणी'
                : 'Famous Hindu Temples – Opening, Closing & Aarti Timings'}
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-3xl">
              {isMarathi
                ? 'काशी विश्वनाथ, अयोध्या राम मंदिर, महाकालेश्वर, तिरुपती बालाजी, पुरी जगन्नाथ, शिर्डी साईं व सिद्धिविनायक मंदिरांचे अधिकृत दर्शन वेळ व आरती.'
                : isHindi
                ? 'काशी विश्वनाथ, अयोध्या राम मंदिर, महाकालेश्वर, तिरुपति बालाजी, पुरी जगन्नाथ एवं वैष्णो देवी सहित प्रमुख तीर्थों के सत्यापित दर्शन समय व आरती।'
                : 'Verified morning and evening darshan opening hours, sanctum closure intervals, daily Aarti schedules, and dress codes for India’s most revered shrines.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/temples')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-[#9A3412] bg-[#FAF1EC] hover:bg-[#F3E5DD] rounded-xl border border-[#E8DCD4] transition-colors whitespace-nowrap self-start sm:self-auto"
          >
            <span>{isMarathi ? 'सर्व प्रसिद्ध मंदिरे पहा →' : isHindi ? 'सभी प्रसिद्ध मंदिर देखें →' : 'View All 20+ Temples →'}</span>
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'all', label: isMarathi ? 'सर्व मंदिरे' : isHindi ? 'सभी मंदिर (All)' : 'All Temples' },
            { id: 'international', label: isMarathi ? '🌍 परदेशातील मंदिरे' : isHindi ? '🌍 विदेश स्थित मंदिर' : '🌍 Foreign Temples' },
            { id: 'jyotirlinga', label: isMarathi ? '🕉️ १२ ज्योतिर्लिंगे' : isHindi ? '🕉️ १२ ज्योतिर्लिंग' : '🕉️ 12 Jyotirlingas' },
            { id: 'vishnu', label: isMarathi ? '🪷 विष्णू, राम व कृष्ण' : isHindi ? '🪷 विष्णु, राम एवं कृष्ण' : '🪷 Vishnu & Rama' },
            { id: 'shaktipeeth', label: isMarathi ? '🔱 शक्तिपीठे व देवी' : isHindi ? '🔱 शक्तिपीठ एवं देवी' : '🔱 Shaktipeeth & Devi' },
            { id: 'ganesha', label: isMarathi ? '🐘 श्री गणेश मंदिरे' : isHindi ? '🐘 श्री गणेश मंदिर' : '🐘 Ganesha Temples' }
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setTempleFilter(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                templeFilter === cat.id
                  ? 'bg-[#9A3412] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Temples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredTemples.map((temple) => (
            <div
              key={temple.id}
              onClick={() => onNavigate('/temples')}
              className="p-5 rounded-2xl border border-stone-200 hover:border-[#9A3412] hover:bg-[#FFFDF9] transition-all cursor-pointer group flex flex-col justify-between shadow-2xs"
            >
              <div>
                {/* Header: Name & Deity */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-stone-900 group-hover:text-[#9A3412] font-serif transition-colors leading-snug">
                      {isIndic && temple.nameHi ? temple.nameHi : temple.name}
                    </h3>
                    <div className="text-xs text-stone-600 font-medium mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>{temple.city}, {temple.state}{temple.country ? ` (${temple.country})` : ''}</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-100 text-[#9A3412] shrink-0 capitalize">
                    {temple.region === 'international' ? (temple.country || 'Foreign') : temple.category}
                  </span>
                </div>

                <div className="text-xs text-stone-600 mt-2 font-medium">
                  {isIndic && temple.deityHi ? temple.deityHi : temple.deity}
                </div>

                {/* Timing Badge Box */}
                <div className="mt-3.5 p-3 rounded-xl bg-stone-50 border border-stone-200/90 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-700 flex items-center gap-1">
                      <Sun className="w-3.5 h-3.5 text-amber-600" />
                      {isMarathi ? 'सकाळचे दर्शन:' : isHindi ? 'प्रातः दर्शन:' : 'Morning Darshan:'}
                    </span>
                    <span className="font-extrabold text-stone-900 tabular-nums">
                      {temple.morningOpen} – {temple.morningClose}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-700 flex items-center gap-1">
                      <Moon className="w-3.5 h-3.5 text-indigo-600" />
                      {isMarathi ? 'संध्याकाळचे दर्शन:' : isHindi ? 'संध्या दर्शन:' : 'Evening Darshan:'}
                    </span>
                    <span className="font-extrabold text-stone-900 tabular-nums">
                      {temple.eveningOpen} – {temple.eveningClose}
                    </span>
                  </div>
                </div>

                {/* Aarti Highlights */}
                <div className="mt-3">
                  <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                    {isMarathi ? 'प्रमुख आरती वेळा:' : isHindi ? 'प्रमुख आरती समय:' : 'Key Aartis:'}
                  </div>
                  <div className="space-y-1 text-xs text-stone-700">
                    {temple.aartis.slice(0, 2).map((a, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="font-medium text-stone-800">{isIndic && a.nameHi ? a.nameHi : a.name}</span>
                        <span className="font-mono text-stone-600 tabular-nums text-[11px]">{a.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom footer */}
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-stone-500 truncate max-w-[180px]">
                  {isIndic && temple.dressCodeHi ? temple.dressCodeHi : temple.dressCode}
                </span>
                <span className="font-bold text-[#9A3412] group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                  {isMarathi ? 'आरती वेळ' : isHindi ? 'आरती सारणी' : 'Full Timetable'} <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VEDIC ASTROLOGY CALCULATORS & TOOLS */}
      <section className="vedic-card rounded-2xl p-6 sm:p-8 bg-white border border-[#E7D6CB]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-200">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9A3412] uppercase tracking-wider mb-1">
              <Calculator className="w-4 h-4" />
              <span>{isMarathi ? 'प्रामाणिक वैदिक ज्योतिष गणना' : isHindi ? 'प्रामाणिक वैदिक ज्योतिष गणना' : 'Authentic Vedic Astrology Calculations'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif">
              {isMarathi
                ? 'वैदिक ज्योतिष टूल्स व कुंडली कॅल्क्युलेटर'
                : isHindi
                ? 'वैदिक ज्योतिष टूल्स एवं कुंडली कैलकुलेटर'
                : 'Vedic Astrology Calculators & Kundli Tools'}
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-3xl">
              {isMarathi
                ? 'विवाहासाठी ३६ गुण मिलन (अष्टकूट), शनी साडेसाती गोचर, मांगलिक दोष, जन्म नक्षत्र व तिथी कनवर्टर.'
                : isHindi
                ? 'विवाह हेतु ३६ गुण मिलान (अष्टकूट), शनि साढ़े साती गोचर, मांगलिक दोष, जन्म नक्षत्र एवं तिथि कनवर्टर।'
                : 'Precision astrological utilities: 36 Gun Milan compatibility, Shani Sade Sati transit analyzer, Manglik Dosha detector, and Janma Nakshatra finder.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/tools')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-[#9A3412] bg-[#FAF1EC] hover:bg-[#F3E5DD] rounded-xl border border-[#E8DCD4] transition-colors whitespace-nowrap self-start sm:self-auto"
          >
            <span>{isMarathi ? 'सर्व ८ कॅल्क्युलेटर उघडा →' : isHindi ? 'सभी ८ कैलकुलेटर खोलें →' : 'Explore All 8 Calculators →'}</span>
          </button>
        </div>

        {/* 2 Interactive Mini Tools Side-by-Side: Kundli Milan & Sade Sati */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          
          {/* Mini Tool 1: Kundli Gun Milan */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#FFFDF9] to-[#FAF3EC] border border-amber-300/80 shadow-2xs">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-rose-600" />
              <h3 className="text-lg font-bold text-stone-900 font-serif">
                {isMarathi ? 'कुंडली गुण मिलन (३६ गुण)' : isHindi ? 'कुंडली गुण मिलान (३६ गुण)' : 'Kundli Gun Milan (36 Gunas)'}
              </h3>
            </div>
            <p className="text-xs text-stone-600 mb-4">
              {isMarathi
                ? 'वर व वधूची चंद्र रास निवडून विवाहासाठी अष्टकूट अनुकूलता गुण मिळवा.'
                : isHindi
                ? 'वर एवं वधू की चंद्र राशि चुनकर विवाह हेतु अष्टकूट अनुकूलता अंक प्राप्त करें।'
                : 'Select Groom and Bride Moon Signs to compute authentic Ashta Koota marital compatibility score.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {isMarathi ? 'वराची रास (Boy):' : isHindi ? 'वर की राशि (Boy):' : 'Groom Rashi (Boy):'}
                </label>
                <select
                  value={boyRashi}
                  onChange={(e) => setBoyRashi(e.target.value)}
                  className="w-full text-xs font-bold p-2.5 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#9A3412]"
                >
                  {RASHIFAL_DATA.map((r) => (
                    <option key={r.rashiId} value={r.rashiId}>
                      {isMarathi ? `${r.nameHi} (${r.name})` : `${r.name} (${r.nameHi})`}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {isMarathi ? 'वधूची रास (Girl):' : isHindi ? 'कन्या की राशि (Girl):' : 'Bride Rashi (Girl):'}
                </label>
                <select
                  value={girlRashi}
                  onChange={(e) => setGirlRashi(e.target.value)}
                  className="w-full text-xs font-bold p-2.5 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#9A3412]"
                >
                  {RASHIFAL_DATA.map((r) => (
                    <option key={r.rashiId} value={r.rashiId}>
                      {isMarathi ? `${r.nameHi} (${r.name})` : `${r.name} (${r.nameHi})`}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCalculateMilan}
              className="w-full py-2.5 bg-[#9A3412] hover:bg-[#7C2D12] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isMarathi ? 'गुण मिलन मोजा' : isHindi ? 'गुण मिलान गणना करें' : 'Calculate Compatibility Score'}</span>
            </button>

            {milanResult && (
              <div className="mt-4 p-4 rounded-xl bg-white border border-amber-300 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-600">
                    {isMarathi ? 'एकूण प्राप्त गुण:' : isHindi ? 'कुल प्राप्त गुण:' : 'Total Match Score:'}
                  </span>
                  <span className="text-2xl font-black text-[#9A3412] font-serif">
                    {milanResult.score} / 36
                  </span>
                </div>
                <div className="text-xs font-bold text-emerald-800 mt-1">
                  {milanResult.verdict}
                </div>
              </div>
            )}
          </div>

          {/* Mini Tool 2: Shani Sade Sati Checker */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#FFFDF9] to-[#FAF3EC] border border-amber-300/80 shadow-2xs">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-indigo-700" />
              <h3 className="text-lg font-bold text-stone-900 font-serif">
                {isMarathi ? 'शनी साडेसाती तपासणी २०२७' : isHindi ? 'शनि साढ़े साती कैलकुलेटर २०२७' : 'Shani Sade Sati Status 2027'}
              </h3>
            </div>
            <p className="text-xs text-stone-600 mb-4">
              {isMarathi
                ? 'वर्ष २०२७ मधील शनीच्या गोचरानुसार आपल्या राशीवर साडेसातीचा प्रभाव तपासा.'
                : isHindi
                ? 'वर्ष २०२७ में शनि के मीन एवं मेष राशि में गोचर के अनुसार अपनी राशि का साढ़ेसाती प्रभाव जानें।'
                : 'Inspect current Sade Sati phase and astrological remedies for Saturn’s transit in 2027.'}
            </p>

            <div className="mb-4">
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {isMarathi ? 'आपली चंद्र रास निवडा:' : isHindi ? 'अपनी चंद्र राशि चुनें:' : 'Select Your Moon Sign (Janma Rashi):'}
              </label>
              <select
                value={sadeSatiRashi}
                onChange={(e) => setSadeSatiRashi(e.target.value)}
                className="w-full text-xs font-bold p-2.5 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#9A3412]"
              >
                {RASHIFAL_DATA.map((r) => (
                  <option key={r.rashiId} value={r.rashiId}>
                    {isMarathi ? `${r.nameHi} (${r.name})` : `${r.name} (${r.nameHi})`}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handleCalculateSadeSati}
              className="w-full py-2.5 bg-stone-900 hover:bg-black text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Clock className="w-4 h-4" />
              <span>{isMarathi ? 'साडेसाती स्थिती तपासा' : isHindi ? 'साढ़े साती स्थिति जांचें' : 'Check Sade Sati Phase'}</span>
            </button>

            {sadeSatiResult && (
              <div className="mt-4 p-4 rounded-xl bg-white border border-stone-300 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-700">{sadeSatiResult.phase}</span>
                  <span className="text-xs font-extrabold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-800">
                    {sadeSatiResult.status}
                  </span>
                </div>
                <div className="text-xs text-stone-600 mt-2">
                  <strong>{isMarathi ? 'वैदिक उपाय:' : isHindi ? 'वैदिक उपाय:' : 'Remedy:'}</strong> {sadeSatiResult.remedy}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* 4 Dedicated Tool Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div
            onClick={() => onNavigate('/tools')}
            className="p-4 rounded-xl border border-stone-200 hover:border-[#9A3412] hover:bg-stone-50 transition-colors cursor-pointer group shadow-2xs"
          >
            <div className="font-bold text-stone-900 text-sm sm:text-base group-hover:text-[#9A3412] font-serif">
              {isMarathi ? 'तिथी शोधक' : isHindi ? 'तिथि कैलकुलेटर' : 'Tithi Finder'}
            </div>
            <div className="text-xs text-stone-600 mt-1">
              {isMarathi ? 'कोणत्याही तारखेची अचूक तिथी' : isHindi ? 'किसी भी तारीख की सटीक तिथि' : 'Exact tithi for any date'}
            </div>
          </div>

          <div
            onClick={() => onNavigate('/tools')}
            className="p-4 rounded-xl border border-stone-200 hover:border-[#9A3412] hover:bg-stone-50 transition-colors cursor-pointer group shadow-2xs"
          >
            <div className="font-bold text-stone-900 text-sm sm:text-base group-hover:text-[#9A3412] font-serif">
              {isMarathi ? 'जन्म नक्षत्र शोधक' : isHindi ? 'जन्म नक्षत्र खोजक' : 'Nakshatra Finder'}
            </div>
            <div className="text-xs text-stone-600 mt-1">
              {isMarathi ? 'जन्म नक्षत्र व चरण गणना' : isHindi ? 'जन्म नक्षत्र एवं चरण की गणना' : 'Birth star and Pada calculations'}
            </div>
          </div>

          <div
            onClick={() => onNavigate('/choghadiya')}
            className="p-4 rounded-xl border border-stone-200 hover:border-[#9A3412] hover:bg-stone-50 transition-colors cursor-pointer group shadow-2xs"
          >
            <div className="font-bold text-stone-900 text-sm sm:text-base group-hover:text-[#9A3412] font-serif">
              {isMarathi ? 'चौघडिया मुहूर्त' : isHindi ? 'चौघड़िया मुहूर्त' : 'Choghadiya Engine'}
            </div>
            <div className="text-xs text-stone-600 mt-1">
              {isMarathi ? 'दिवस व रात्रीचे १६ शुभ चौघडिया' : isHindi ? 'दिन व रात के १६ चौघड़िया मुहूर्त' : '16 daytime and nighttime slots'}
            </div>
          </div>

          <div
            onClick={() => onNavigate('/baby-names')}
            className="p-4 rounded-xl border border-stone-200 hover:border-[#9A3412] hover:bg-stone-50 transition-colors cursor-pointer group shadow-2xs"
          >
            <div className="font-bold text-stone-900 text-sm sm:text-base group-hover:text-[#9A3412] font-serif">
              {isMarathi ? 'वैदिक बाळांची नावे' : isHindi ? 'वैदिक शिशु नाम' : 'Vedic Baby Names'}
            </div>
            <div className="text-xs text-stone-600 mt-1">
              {isMarathi ? 'रास व नक्षत्रानुसार शुभ नावे' : isHindi ? 'राशि एवं नक्षत्र अनुसार शुभ नाम' : 'Search sacred names by Rashi'}
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Auspicious Milestones & Live Days Countdown */}
      <section className="vedic-card rounded-3xl p-6 sm:p-8 bg-white border-2 border-[#E7D6CB] shadow-sm space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-[#9A3412] mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {isMarathi ? 'थेट दिवस गणना व आगामी सण' : isHindi ? 'लाइव दिन गणना एवं आगामी त्यौहार' : 'Live Days Countdown & Upcoming Festivals'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif">
              {isMarathi ? 'आगामी सण, पौर्णिमा व एकादशी २०२७' : isHindi ? 'आगामी त्यौहार, पूर्णिमा एवं एकादशी २०२७' : getUIText(currentLang, 'festivalsAndVrats', 'Upcoming Festivals, Purnima & Ekadashi 2027')}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              {isMarathi
                ? 'पुढील पौर्णिमा, एकादशी आणि आगामी ७ ते ३० दिवसांतील प्रमुख हिंदू सणांची अचूक दिवस गणना.'
                : isHindi
                ? 'अगली पूर्णिमा, एकादशी एवं आगामी ७ से ३० दिनों के प्रमुख हिन्दू पर्वों की प्रमाणित दिवस गणना।'
                : 'Exact days remaining for Next Purnima, Ekadashi, Amavasya, and major festivals in 7 and 30 days.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/festivals/2027')}
            className="text-xs sm:text-sm font-bold text-[#9A3412] hover:underline whitespace-nowrap self-start sm:self-auto flex items-center gap-1 cursor-pointer"
          >
            <span>{isMarathi ? 'सर्व २०२७ सण पहा →' : isHindi ? 'सभी २०२७ त्यौहार देखें →' : getUIText(currentLang, 'viewAll', 'View All 2027 Festivals →')}</span>
          </button>
        </div>

        {/* 4 Core Upcoming Spotlight Cards (Next Festival, Next Purnima in days, Next Ekadashi in days, Next Amavasya in days) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Next Festival */}
          {milestones.nextFestival && (
            <div
              onClick={() => onNavigate(milestones.nextFestival.url)}
              className="p-5 bg-gradient-to-br from-amber-50/70 to-orange-50/40 hover:from-amber-100/60 hover:to-orange-100/50 rounded-2xl border-2 border-amber-300 hover:border-[#9A3412] transition-all cursor-pointer group flex flex-col justify-between shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-[#9A3412] uppercase tracking-wider">
                    {isMarathi ? 'पुढील प्रमुख सण' : isHindi ? 'अगला प्रमुख त्यौहार' : 'Next Festival'}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#9A3412] text-white shadow-2xs">
                    {milestones.nextFestival.badgeLabel}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-stone-900 group-hover:text-[#9A3412] font-serif transition-colors leading-tight">
                  {milestones.nextFestival.name}
                </h3>
                {milestones.nextFestival.nameHi && (
                  <div className="text-xs font-serif text-stone-600 mt-0.5">
                    {milestones.nextFestival.nameHi}
                  </div>
                )}
                <div className="text-xs font-semibold text-stone-700 mt-1.5 font-mono">
                  {milestones.nextFestival.dateStr} · {milestones.nextFestival.dayOfWeek}
                </div>
                <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                  {milestones.nextFestival.description}
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-amber-200/80 text-xs font-bold text-[#9A3412] flex items-center justify-between">
                <span>{isMarathi ? 'पूजा विधी व शुभ मुहूर्त' : isHindi ? 'पूजा विधि व शुभ मुहूर्त' : 'View Puja Vidhi'}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          )}

          {/* 2. Next Purnima (Full Moon) */}
          {milestones.nextPurnima && (
            <div
              onClick={() => onNavigate(milestones.nextPurnima.url)}
              className="p-5 bg-gradient-to-br from-yellow-50/70 to-amber-50/40 hover:from-yellow-100/60 hover:to-amber-100/50 rounded-2xl border-2 border-yellow-300 hover:border-amber-600 transition-all cursor-pointer group flex flex-col justify-between shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1">
                    <span>🌕</span>
                    <span>{isMarathi ? 'पुढील पौर्णिमा' : isHindi ? 'अगली पूर्णिमा' : 'Next Purnima'}</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-600 text-white shadow-2xs">
                    {milestones.nextPurnima.badgeLabel}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-stone-900 group-hover:text-amber-800 font-serif transition-colors leading-tight">
                  {milestones.nextPurnima.name}
                </h3>
                <div className="text-xs font-semibold text-stone-700 mt-1.5 font-mono">
                  {milestones.nextPurnima.dateStr} · {milestones.nextPurnima.dayOfWeek}
                </div>
                <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                  {milestones.nextPurnima.paranaOrTithi || 'Satyanarayan Vrat & Chandra Darshan'}
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-yellow-200/80 text-xs font-bold text-amber-800 flex items-center justify-between">
                <span>{isMarathi ? 'सत्यनारायण पूजा वेळ' : isHindi ? 'सत्यनारायण पूजा समय' : 'Satyanarayan Puja'}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          )}

          {/* 3. Next Ekadashi Fast */}
          {milestones.nextEkadashi && (
            <div
              onClick={() => onNavigate(milestones.nextEkadashi.url)}
              className="p-5 bg-gradient-to-br from-emerald-50/70 to-teal-50/40 hover:from-emerald-100/60 hover:to-teal-100/50 rounded-2xl border-2 border-emerald-300 hover:border-emerald-600 transition-all cursor-pointer group flex flex-col justify-between shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1">
                    <span>🕉️</span>
                    <span>{isMarathi ? 'पुढील एकादशी' : isHindi ? 'अगली एकादशी' : 'Next Ekadashi'}</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-700 text-white shadow-2xs">
                    {milestones.nextEkadashi.badgeLabel}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-800 font-serif transition-colors leading-tight">
                  {milestones.nextEkadashi.name}
                </h3>
                <div className="text-xs font-semibold text-stone-700 mt-1.5 font-mono">
                  {milestones.nextEkadashi.dateStr} · {milestones.nextEkadashi.dayOfWeek}
                </div>
                <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                  {milestones.nextEkadashi.paranaOrTithi || 'Dedicated to Lord Vishnu'}
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-emerald-200/80 text-xs font-bold text-emerald-800 flex items-center justify-between">
                <span>{isMarathi ? 'व्रत नियम व पारण' : isHindi ? 'व्रत नियम व पारण' : 'Fasting Details'}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          )}

          {/* 4. Next Amavasya Tithi */}
          {milestones.nextAmavasya && (
            <div
              onClick={() => onNavigate(milestones.nextAmavasya.url)}
              className="p-5 bg-gradient-to-br from-purple-50/70 to-indigo-50/40 hover:from-purple-100/60 hover:to-indigo-100/50 rounded-2xl border-2 border-purple-300 hover:border-purple-600 transition-all cursor-pointer group flex flex-col justify-between shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-purple-900 uppercase tracking-wider flex items-center gap-1">
                    <span>🌑</span>
                    <span>{isMarathi ? 'पुढील अमावास्या' : isHindi ? 'अगली अमावस्या' : 'Next Amavasya'}</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-purple-700 text-white shadow-2xs">
                    {milestones.nextAmavasya.badgeLabel}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-stone-900 group-hover:text-purple-800 font-serif transition-colors leading-tight">
                  {milestones.nextAmavasya.name}
                </h3>
                <div className="text-xs font-semibold text-stone-700 mt-1.5 font-mono">
                  {milestones.nextAmavasya.dateStr} · {milestones.nextAmavasya.dayOfWeek}
                </div>
                <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                  {milestones.nextAmavasya.description}
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-purple-200/80 text-xs font-bold text-purple-800 flex items-center justify-between">
                <span>{isMarathi ? 'पितृ तर्पण विधी' : isHindi ? 'पितृ तर्पण विधि' : 'Pitru Tarpan'}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          )}
        </div>

        {/* Time Horizon Filter Switcher (In 7 Days, In 30 Days, Major, Purnima/Vrats, All) */}
        <div className="pt-4 border-t border-stone-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                {isMarathi ? 'सण व व्रते वेळेनुसार निवडा:' : isHindi ? 'पर्व एवं व्रत समयानुसार देखें:' : 'Filter Milestones by Horizon:'}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 bg-stone-100 p-1 rounded-2xl border border-stone-200">
              <button
                type="button"
                onClick={() => setUpcomingFilter('7days')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  upcomingFilter === '7days'
                    ? 'bg-[#9A3412] text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                🔥 {isMarathi ? 'आगामी ७ दिवस' : isHindi ? 'आगामी ७ दिन' : 'In 7 Days'} ({milestones.in7Days.length})
              </button>

              <button
                type="button"
                onClick={() => setUpcomingFilter('30days')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  upcomingFilter === '30days'
                    ? 'bg-[#9A3412] text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                🪔 {isMarathi ? 'आगामी ३० दिवस' : isHindi ? 'आगामी ३० दिन' : 'In 30 Days'} ({milestones.in30Days.length})
              </button>

              <button
                type="button"
                onClick={() => setUpcomingFilter('major')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  upcomingFilter === 'major'
                    ? 'bg-[#9A3412] text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                ⭐ {isMarathi ? 'प्रमुख सण' : isHindi ? 'प्रमुख त्यौहार' : 'Major Festivals'}
              </button>

              <button
                type="button"
                onClick={() => setUpcomingFilter('purnima_vrat')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  upcomingFilter === 'purnima_vrat'
                    ? 'bg-[#9A3412] text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                🌕 {isMarathi ? 'पौर्णिमा व व्रते' : isHindi ? 'पूर्णिमा व व्रत' : 'Purnima & Vrats'}
              </button>

              <button
                type="button"
                onClick={() => setUpcomingFilter('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  upcomingFilter === 'all'
                    ? 'bg-[#9A3412] text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                📅 {isMarathi ? 'सर्व आगामी' : isHindi ? 'सभी आगामी' : 'All Upcoming'} ({milestones.allUpcoming.length})
              </button>
            </div>
          </div>

          {/* Filtered Grid Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {(() => {
              const currentList =
                upcomingFilter === '7days'
                  ? milestones.in7Days
                  : upcomingFilter === '30days'
                  ? milestones.in30Days
                  : upcomingFilter === 'major'
                  ? milestones.majorFestivals
                  : upcomingFilter === 'purnima_vrat'
                  ? milestones.allUpcoming.filter((i) => i.type === 'purnima' || i.type === 'ekadashi')
                  : milestones.allUpcoming;

              if (currentList.length === 0) {
                return (
                  <div className="col-span-full py-8 text-center text-stone-500 bg-stone-50 rounded-2xl border border-stone-200 text-xs sm:text-sm">
                    {isMarathi
                      ? 'या कालावधीत कोणतेही अतिरिक्त सण नियोजित नाहीत.'
                      : isHindi
                      ? 'इस समयावधि में कोई अन्य त्यौहार निर्धारित नहीं है।'
                      : 'No other milestones scheduled in this exact window. Check "In 30 Days" or "All Upcoming".'}
                  </div>
                );
              }

              return currentList.slice(0, 9).map((item) => (
                <div
                  key={item.id}
                  onClick={() => onNavigate(item.url)}
                  className="p-4 bg-stone-50/80 hover:bg-amber-50/60 rounded-2xl border border-stone-200 hover:border-[#9A3412] transition-all cursor-pointer flex flex-col justify-between group shadow-2xs"
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-200/80 text-stone-700 uppercase">
                        {item.category}
                      </span>
                      <span
                        className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-2xs ${
                          item.daysRemaining <= 2
                            ? 'bg-rose-600 text-white animate-pulse'
                            : item.daysRemaining <= 7
                            ? 'bg-amber-600 text-white'
                            : item.daysRemaining <= 30
                            ? 'bg-[#9A3412] text-white'
                            : 'bg-stone-800 text-white'
                        }`}
                      >
                        {item.badgeLabel}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm sm:text-base text-stone-900 group-hover:text-[#9A3412] font-serif transition-colors leading-tight">
                      {item.name}
                    </h4>
                    {item.nameHi && (
                      <div className="text-xs font-serif text-stone-600 mt-0.5 font-medium">
                        {item.nameHi}
                      </div>
                    )}
                    <div className="text-[11px] font-mono font-semibold text-stone-500 mt-1">
                      {item.dateStr} · {item.dayOfWeek}
                    </div>
                    <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-stone-200/80 text-xs font-bold text-[#9A3412] flex items-center justify-between">
                    <span>
                      {isMarathi ? 'पूजा विधी व माहिती' : isHindi ? 'पूजा विधि व कथा' : 'Puja Vidhi & Timings'}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>
      </section>

      {/* SPECIALIZED UPCOMING VRATS & FASTING RITUALS SECTION (E-E-A-T) */}
      <MonthlyVratSection
        initialMonthIndex={new Date().getMonth()}
        year="2027"
        currentLang={currentLang}
        onNavigate={onNavigate}
      />

      {/* Hindu Calendar 2027 12-Month Grid */}
      <section className="vedic-card rounded-2xl p-6 sm:p-8 bg-white border border-[#E7D6CB]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-stone-200">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif">
              {isMarathi ? 'हिंदू दिनदर्शिका २०२७ महिनेवार यादी (१२ महिने)' : isHindi ? 'हिन्दू कैलेंडर २०२७ माहवारी सूची (१२ माह)' : getUIText(currentLang, 'calendar2027', 'Hindu Calendar 2027 Months')}
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              {isMarathi
                ? 'कोणत्याही महिन्यावर क्लिक करून दैनिक तिथी, एकादशी, प्रदोष आणि सण पहा.'
                : isHindi
                ? 'किसी भी माह पर क्लिक कर दैनिक तिथियां, एकादशी, प्रदोष एवं ग्रह गोचर देखें।'
                : 'Select any month to inspect daily tithis, fasting schedules, and planetary transits.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/hindu-calendar-2027')}
            className="text-sm font-bold text-[#9A3412] hover:underline whitespace-nowrap"
          >
            {isMarathi ? 'संपूर्ण २०२७ दिनदर्शिका →' : isHindi ? 'सम्पूर्ण २०२७ कैलेंडर →' : getUIText(currentLang, 'viewAll', 'Full 2027 Calendar →')}
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {MONTH_NAMES.map((m, idx) => (
            <button
              key={m}
              type="button"
              onClick={() => onNavigate(`/hindu-calendar-2027/${m}`)}
              className="p-4 rounded-xl border border-stone-200 hover:border-[#9A3412] hover:bg-[#FAF6F2] text-left transition-colors group shadow-2xs"
            >
              <div className="text-xs text-stone-400 font-mono font-bold">
                {(idx + 1).toString().padStart(2, '0')} / 2027
              </div>
              <div className="text-lg font-bold text-stone-900 group-hover:text-[#9A3412] font-serif mt-1">
                {MONTH_DISPLAY_NAMES[m]} 2027
              </div>
              <div className="text-xs text-stone-500 mt-1 flex items-center justify-between font-medium">
                <span>{isMarathi ? 'मासिक पंचांग पहा' : isHindi ? 'मासिक पंचांग देखें' : 'View Monthly Panchang'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Regional Calendars & Panjika (11 Traditions) */}
      <section className="vedic-card rounded-2xl p-6 sm:p-8 bg-white border border-[#E7D6CB]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-stone-200">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif">
              {isMarathi ? 'प्रादेशिक पंचांग २०२७ (११ प्रादेशिक परंपरा)' : isHindi ? 'प्रादेशिक पंचांग २०२७ (११ क्षेत्रीय परंपराएं)' : getUIText(currentLang, 'regionalCalendars', 'Regional Calendars 2027')}
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              {isMarathi
                ? 'मराठी, गुजराती, तेलुगु, तामिळ, बंगाली, कन्नड, ओडिया आणि मल्याळम दिनदर्शिकेचे संपूर्ण तपशील.'
                : isHindi
                ? 'मराठी, गुजराती, तेलुगु, तमिल, बंगाली, कन्नड़, उड़िया एवं मलयालम कैलेंडरों का पूर्ण विवरण।'
                : 'Dedicated calendar systems for 11 regional traditions with native months, regional eras, and observances.'}
            </p>
          </div>
          <span className="text-xs font-bold text-[#9A3412] bg-[#FAF1EC] px-3 py-1 rounded-full border border-[#E8DCD4]">
            11 Regional Systems Available
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {Object.entries(REGIONAL_CALENDARS_INFO).map(([key, reg]) => (
            <div
              key={key}
              onClick={() => onNavigate(`/${key}-calendar-2027`)}
              className="p-4 rounded-xl border border-stone-200 hover:border-[#9A3412] hover:bg-[#FAF6F2] transition-all cursor-pointer group flex flex-col justify-between shadow-2xs"
            >
              <div>
                <div className="text-base font-bold text-stone-900 group-hover:text-[#9A3412] font-serif transition-colors">
                  {reg.name}
                </div>
                <div className="text-xs text-stone-600 font-sans mt-0.5 font-medium">
                  {reg.nativeName}
                </div>
                <div className="text-xs text-[#9A3412] mt-1 font-semibold">
                  {reg.eraName}
                </div>
              </div>
              <div className="mt-4 pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-medium">
                <span>{isMarathi ? 'सुरुवात: ' + reg.startingMonth : isHindi ? 'प्रारंभ: ' + reg.startingMonth : 'Starts ' + reg.startingMonth}</span>
                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Editorial Articles Section */}
      <section className="vedic-card rounded-2xl p-6 sm:p-8 bg-white border border-[#E7D6CB]">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif mb-4">
          {isMarathi ? 'पंचांग व वैदिक ज्योतिष शोधनिबंध' : isHindi ? 'पंचांग एवं वैदिक ज्योतिष शोध लेख' : 'Calendar Guides & Vedic Astronomy Articles'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTICLES_DATA.map((art) => (
            <article
              key={art.slug}
              onClick={() => onNavigate(`/articles/${art.slug}`)}
              className="group cursor-pointer flex flex-col justify-between p-4 rounded-xl border border-stone-200 hover:border-[#9A3412] hover:bg-[#FAF6F2] transition-all"
            >
              <div>
                <div className="text-xs text-stone-400 font-mono uppercase tracking-wider mb-1 font-semibold">
                  {art.category} · {art.readTime}
                </div>
                <h3 className="text-base font-bold text-stone-900 group-hover:text-[#9A3412] font-serif leading-snug transition-colors">
                  {art.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-stone-100 text-xs font-bold text-[#9A3412] flex items-center gap-1 group-hover:gap-1.5 transition-all">
                <span>{isMarathi ? 'संपूर्ण लेख वाचा' : isHindi ? 'पूरा लेख पढ़ें' : getUIText(currentLang, 'readMore', 'Read Full Guide')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Educational E-E-A-T Authority & FAQ */}
      <section className="p-6 sm:p-8 bg-[#FAF6F2] rounded-3xl border border-stone-200/90 text-sm text-stone-800 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#9A3412] text-amber-200 flex items-center justify-center font-bold text-xl shadow-xs">
            ॐ
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
              {isMarathi
                ? 'न्यूज दर्शन हिंदू दिनदर्शिका २०२७ आणि पंचांग पद्धती'
                : isHindi
                ? 'न्यूज़ दर्शन हिन्दू कैलेंडर २०२७ एवं पंचांग पद्धति'
                : 'About NewsDarshan Hindu Calendar 2027 & Panchang'}
            </h2>
            <div className="text-xs text-stone-500">
              {isMarathi
                ? 'प्रमाणित खगोलीय मानके · भारतीय राष्ट्रीय पंचांग आणि दृक गणित'
                : isHindi
                ? 'सत्यापित खगोलीय मानक · भारतीय राष्ट्रीय पंचांग एवं दृक गणित'
                : 'Verified Ephemeris Standards · Indian National Astronomical Timekeeping'}
            </div>
          </div>
        </div>

        <p className="text-sm sm:text-base leading-relaxed text-stone-700">
          {isMarathi
            ? 'हिंदू दिनदर्शिका २०२७ प्राचीन वैदिक खगोलशास्त्र आणि आधुनिक दृक गणितावर आधारित आहे. सूर्य सिद्धांत, आर्यभटीय आणि ब्रह्मस्फूट सिद्धांतानुसार, चांद्र मास व सौर वर्षाच्या समन्वयासाठी अधिक मास व क्षय तिथीची अचूक गणितीय मोजणी केली जाते.'
            : isHindi
            ? 'हिन्दू कैलेंडर २०२७ प्राचीन वैदिक खगोलशास्त्र एवं आधुनिक दृक गणित पर आधारित है। सूर्य सिद्धान्त, आर्यभटीय एवं ब्रह्मस्फुट सिद्धान्त के अनुसार, चान्द्र मास और सौर वर्ष के सामंजस्य हेतु अधिक मास एवं क्षय तिथि की सटीक गणितीय गणना की जाती है।'
            : 'The Hindu Calendar 2027 represents one of humankind’s most enduring astronomical achievements. Rooted in classical treatises including the Surya Siddhanta, Brahma Sphuta Siddhanta, and Aryabhatiya, the Vedic calendar harmonizes the solar year with the lunar cycles through rigorous mathematical intercalation.'}
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-stone-700">
          {isMarathi
            ? 'पारंपारिक पंचांगाचे पाच मुख्य अंग आहेत: तिथी (चांद्र कला), वार (सौर दिवस), नक्षत्र (तारामंडळ), योग (सूर्य-चंद्र कोनीय योग), आणि करण (अर्ध तिथी). न्यूज दर्शनवर भारतातील प्रमुख शहरे व तीर्थक्षेत्रांच्या अक्षांश-रेखांशानुसार स्थानिक सूर्योदय-सूर्यास्ताची अचूक गणना केली जाते.'
            : isHindi
            ? 'परंपरागत पंचांग के पांच मुख्य अंग हैं: तिथि (चन्द्र कला), वार (सौर दिवस), नक्षत्र (तारामंडल), योग (सूर्य-चन्द्र कोणीय योग), एवं करण (अर्ध तिथि)। न्यूज़ दर्शन पर भारत के ७० से अधिक प्रमुख नगरों एवं तीर्थों के अक्षांश-देशांतर के आधार पर सटीक स्थानीय सूर्योदय-सूर्यास्त की गणना की जाती है।'
            : 'A traditional Panchang comprises five limbs (Pancha-Anga): Tithi (lunar phase), Vara (solar weekday), Nakshatra (lunar asterism), Yoga (luni-solar angular sum), and Karana (half-tithi). At NewsDarshan, all calculations are performed topocentrically using exact geographic coordinates for over 70 Indian cities and pilgrimage hubs.'}
        </p>

        {/* FAQs */}
        <div className="pt-4 border-t border-stone-300/80 space-y-3">
          <h3 className="text-lg font-bold text-stone-900 font-serif">
            {isMarathi ? 'नेहमी विचारले जाणारे प्रश्न (FAQ)' : isHindi ? 'अक्सर पूछे जाने वाले प्रश्न (FAQ)' : 'Frequently Asked Questions (FAQ)'}
          </h3>
          <div className="space-y-2 text-sm">
            <details className="bg-white p-4 rounded-xl border border-stone-200 cursor-pointer">
              <summary className="font-bold text-stone-800">
                {isMarathi ? 'वर्ष २०२७ मध्ये कोणते विक्रम संवत असणार आहे?' : isHindi ? 'वर्ष २०२७ में कौन सा विक्रम संवत रहेगा?' : 'What is the Vikram Samvat year for 2027?'}
              </summary>
              <p className="mt-2 text-stone-600 leading-relaxed">
                {isMarathi
                  ? 'वर्ष २०२७ चा प्रारंभ विक्रम संवत २०८३ मध्ये होईल आणि गुढीपाडवा (७ एप्रिल २०२७) पासून नवीन विक्रम संवत २०८४ सुरू होईल.'
                  : isHindi
                  ? 'वर्ष २०२७ का प्रारंभ विक्रम संवत २०८३ में होगा तथा चैत्र शुक्ल प्रतिपदा (गुड़ी पड़वा/उगादी - ७ अप्रैल २०२७) से विक्रम संवत २०८४ प्रारंभ होगा।'
                  : 'The Gregorian year 2027 begins under Vikram Samvat 2083 and transitions to Vikram Samvat 2084 on Chaitra Shukla Pratipada (Gudi Padwa and Ugadi) on April 7, 2027.'}
              </p>
            </details>
            <details className="bg-white p-4 rounded-xl border border-stone-200 cursor-pointer">
              <summary className="font-bold text-stone-800">
                {isMarathi ? 'वर्ष २०२७ मध्ये दिवाळी (लक्ष्मीपूजन) कधी आहे?' : isHindi ? 'वर्ष २०२७ में दीपावली कब है?' : 'What is the date of Diwali in 2027?'}
              </summary>
              <p className="mt-2 text-stone-600 leading-relaxed">
                {isMarathi
                  ? 'दिवाळी (लक्ष्मी पूजन) सोमवार, ८ नोव्हेंबर २०२७ रोजी कार्तिक कृष्ण अमावास्येच्या दिवशी साजरी केली जाईल.'
                  : isHindi
                  ? 'दीपावली (लक्ष्मी पूजन) सोमवार, ८ नवंबर २०२७ को कार्तिक कृष्ण अमावस्या के दिन मनाई जाएगी।'
                  : 'Diwali (Deepavali & Lakshmi Puja) will be celebrated on Monday, November 8, 2027, coinciding with Kartika Krishna Amavasya.'}
              </p>
            </details>
            <details className="bg-white p-4 rounded-xl border border-stone-200 cursor-pointer">
              <summary className="font-bold text-stone-800">
                {isMarathi ? 'पंचांग गणितासाठी शहराची निवड का आवश्यक आहे?' : isHindi ? 'पंचांग गणना हेतु शहर का चयन क्यों आवश्यक है?' : 'Why are city coordinates required for accurate Panchang?'}
              </summary>
              <p className="mt-2 text-stone-600 leading-relaxed">
                {isMarathi
                  ? 'तिथी समाप्ती, चौघडिया, राहू काळ व शुभ मुहूर्त स्थानिक सूर्योदय आणि सूर्यास्तावर अवलंबून असतात. त्यामुळे पूर्वेकडील आणि पश्चिमेकडील शहरांच्या वेळेत ४० ते ६० मिनिटांचा फरक असतो.'
                  : isHindi
                  ? 'चूंकि तिथि समाप्ति, चौघड़िया, राहु काल एवं अभिजीत मुहूर्त स्थानीय सूर्योदय व सूर्यास्त पर निर्भर करते हैं, इसलिए पूर्व (जैसे कोलकाता) और पश्चिम (जैसे मुंबई) के शहरों के समय में ४० से ६० मिनट तक का अंतर होता है।'
                  : 'Because tithis, choghadiyas, and auspicious muhurats such as Rahu Kaal and Abhijit Muhurat are directly calculated from the local sunrise and sunset, timings vary substantially across different cities.'}
              </p>
            </details>
          </div>
        </div>

        {/* Social Share */}
        <ShareButtons
          title={
            isMarathi
              ? 'हिंदू दिनदर्शिका २०२७, दैनिक पंचांग व मंदिर दर्शन वेळ – न्यूज दर्शन'
              : isHindi
              ? 'हिन्दू कैलेंडर २०२७, दैनिक पंचांग एवं मंदिर दर्शन समय – न्यूज़ दर्शन'
              : 'Hindu Calendar 2027 & Daily Panchang – NewsDarshan'
          }
          url="https://www.newsdarshan.in/"
        />
      </section>

      {/* Global Hindu Diaspora & City Panchang Section */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9A3412] uppercase tracking-wider mb-1">
              <MapPin className="w-4 h-4" />
              <span>{isMarathi ? 'जागतिक हिंदू शहर पंचांग' : isHindi ? 'वैश्विक हिन्दू नगर पंचांग' : 'Global Hindu Diaspora & City Panchang'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
              {isMarathi ? 'आंतरराष्ट्रीय शहरे व एनआरआय पंचांग २०२७' : isHindi ? 'अंतरराष्ट्रीय शहर एवं एनआरआई पंचांग २०२७' : 'International Cities & NRI Diaspora Panchang 2027'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl">
              Authentic Vedic astronomical calculations with topocentric solar horizon corrections for USA, Canada, UK, Europe, Middle East, Australia, New Zealand, and Historic Diaspora hubs.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/cities')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-bold text-[#9A3412] bg-amber-50 hover:bg-amber-100 rounded-xl border border-amber-200 transition-colors whitespace-nowrap self-start sm:self-auto"
          >
            <span>{isMarathi ? 'सर्व १००+ शहरे पहा →' : isHindi ? 'सभी १००+ शहर देखें →' : 'View All 100+ Cities →'}</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {[
            { id: 'newyork', name: 'New York', flag: '🇺🇸', region: 'USA' },
            { id: 'edison', name: 'Edison (NJ)', flag: '🇺🇸', region: 'USA' },
            { id: 'sanjose', name: 'San Jose (CA)', flag: '🇺🇸', region: 'USA' },
            { id: 'chicago', name: 'Chicago', flag: '🇺🇸', region: 'USA' },
            { id: 'dallas', name: 'Dallas', flag: '🇺🇸', region: 'USA' },
            { id: 'brampton', name: 'Brampton', flag: '🇨🇦', region: 'Canada' },
            { id: 'toronto', name: 'Toronto', flag: '🇨🇦', region: 'Canada' },
            { id: 'vancouver', name: 'Vancouver', flag: '🇨🇦', region: 'Canada' },
            { id: 'london', name: 'London', flag: '🇬🇧', region: 'UK' },
            { id: 'leicester', name: 'Leicester', flag: '🇬🇧', region: 'UK' },
            { id: 'berlin', name: 'Berlin', flag: '🇩🇪', region: 'Germany' },
            { id: 'dubai', name: 'Dubai', flag: '🇦🇪', region: 'UAE' },
            { id: 'abudhabi', name: 'Abu Dhabi', flag: '🇦🇪', region: 'UAE' },
            { id: 'riyadh', name: 'Riyadh', flag: '🇸🇦', region: 'Saudi Arabia' },
            { id: 'singapore', name: 'Singapore', flag: '🇸🇬', region: 'Singapore' },
            { id: 'kualalumpur', name: 'Kuala Lumpur', flag: '🇲🇾', region: 'Malaysia' },
            { id: 'sydney', name: 'Sydney', flag: '🇦🇺', region: 'Australia' },
            { id: 'melbourne', name: 'Melbourne', flag: '🇦🇺', region: 'Australia' },
            { id: 'auckland', name: 'Auckland', flag: '🇳🇿', region: 'New Zealand' },
            { id: 'portlouis', name: 'Port Louis', flag: '🇲🇺', region: 'Mauritius' },
            { id: 'suva', name: 'Suva', flag: '🇫🇯', region: 'Fiji' },
            { id: 'durban', name: 'Durban', flag: '🇿🇦', region: 'South Africa' },
            { id: 'chaguanas', name: 'Chaguanas', flag: '🇹🇹', region: 'Trinidad' },
            { id: 'georgetown', name: 'Georgetown', flag: '🇬🇾', region: 'Guyana' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(`/panchang/${item.id}`)}
              className="p-3 rounded-2xl bg-stone-50 hover:bg-amber-50/50 border border-stone-200/90 hover:border-[#9A3412] text-left transition-all group shadow-2xs"
            >
              <div className="flex items-center justify-between text-xs font-bold text-stone-900 group-hover:text-[#9A3412]">
                <span className="truncate">{item.name}</span>
                <span className="text-sm">{item.flag}</span>
              </div>
              <div className="text-[11px] text-stone-500 mt-1 flex items-center justify-between">
                <span>{item.region}</span>
                <span className="text-[#9A3412] opacity-0 group-hover:opacity-100 transition-opacity font-bold">→</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Before Footer AdSlot */}
      <AdSlot type="before-footer" />
    </div>
  );
}
