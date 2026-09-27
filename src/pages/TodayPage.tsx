import { useState, useEffect } from 'react';
import { CityInfo, LanguageCode } from '../types';
import { getPanchangForDate } from '../data/panchangEngine';
import {
  REGIONAL_CALENDARS_INFO,
  getUIText,
  getCityLocalizedName,
  getLocaleCode,
  getWeekdayLocalized,
  getPakshaLocalized,
  getChoghadiyaSlotName,
  getChoghadiyaSlotRuler,
  getChoghadiyaSlotNature
} from '../data/localization';
import Breadcrumbs from '../components/Breadcrumbs';
import AdSlot from '../components/AdSlot';
import ShareButtons from '../components/ShareButtons';
import TodayHoroscopeSection from '../components/TodayHoroscopeSection';
import CelestialTracker from '../components/CelestialTracker';
import {
  Sun,
  Moon,
  Clock,
  MapPin,
  Calendar,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface TodayPageProps {
  currentCity: CityInfo;
  currentLang: LanguageCode;
  onNavigate: (path: string) => void;
  onOpenCityModal: () => void;
  regionalVariant?: string;
  initialDate?: Date;
}

export default function TodayPage({
  currentCity,
  currentLang,
  onNavigate,
  onOpenCityModal,
  regionalVariant,
  initialDate
}: TodayPageProps) {
  const [dateOffset, setDateOffset] = useState(0); // 0 = today/initial, 1 = next day, -1 = prev day
  const [savedRashi, setSavedRashi] = useState('mesha');

  useEffect(() => {
    // Reset offset when initialDate changes
    setDateOffset(0);
  }, [initialDate]);

  useEffect(() => {
    const stored = localStorage.getItem('nd_saved_rashi');
    if (stored) setSavedRashi(stored);
  }, []);

  const handleSaveRashi = (rashiId: string) => {
    setSavedRashi(rashiId);
    localStorage.setItem('nd_saved_rashi', rashiId);
  };

  const targetDate = new Date(initialDate || new Date());
  targetDate.setDate(targetDate.getDate() + dateOffset);

  const panchang = getPanchangForDate(targetDate, currentCity.id);

  const isCustomDate = Boolean(initialDate);
  const dateHeading = isCustomDate
    ? targetDate.toLocaleDateString(getLocaleCode(currentLang), { month: 'short', day: 'numeric', year: 'numeric' })
    : dateOffset === 0
    ? getUIText(currentLang, 'today', "Today's")
    : dateOffset === 1
    ? getUIText(currentLang, 'tomorrow', "Tomorrow's")
    : getUIText(currentLang, 'yesterday', "Yesterday's");

  const breadcrumbs = [
    { name: getUIText(currentLang, 'home', 'Home'), url: '/' },
    { name: isCustomDate ? `Panchang (${dateHeading})` : `${dateHeading} ${getUIText(currentLang, 'panchang', 'Panchang')}`, url: '/today/' }
  ];

  const cityNameDisplay = getCityLocalizedName(currentCity, currentLang);
  const localizedWeekday = getWeekdayLocalized(panchang.dayOfWeek, currentLang);
  const localizedPaksha = getPakshaLocalized(panchang.tithi.paksha, currentLang);

  return (
    <div className="space-y-8 sm:space-y-12">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      {/* Date Switcher Ribbon */}
      <div className="flex items-center justify-between p-4 sm:p-5 bg-white rounded-2xl border border-stone-200 shadow-2xs">
        <button
          type="button"
          onClick={() => setDateOffset((prev) => prev - 1)}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-stone-700 hover:text-[#9A3412] px-3 py-1.5 rounded-lg hover:bg-stone-100 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{getUIText(currentLang, 'previousDay', 'Previous Day')}</span>
        </button>

        <div className="text-center">
          <div className="text-base sm:text-xl font-bold text-stone-900 font-serif">
            {targetDate.toLocaleDateString(getLocaleCode(currentLang), {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
          <div className="text-xs sm:text-sm text-stone-600 font-medium mt-0.5">
            {localizedPaksha} {panchang.tithi.name} · {panchang.hinduMonthAmavasyant}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setDateOffset((prev) => prev + 1)}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-stone-700 hover:text-[#9A3412] px-3 py-1.5 rounded-lg hover:bg-stone-100 transition-colors"
        >
          <span>{getUIText(currentLang, 'nextDay', 'Next Day')}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Header & City Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 bg-gradient-to-r from-[#FFFDF9] via-[#FAF3EC] to-[#F5ECE3] rounded-3xl border-2 border-[#E6C88A] shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9A3412] mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{getUIText(currentLang, 'authorityBadge', 'Surya Siddhanta Ephemeris · High Precision')}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 font-serif">
            {dateHeading} {getUIText(currentLang, 'panchang', 'Panchang')} & {getUIText(currentLang, 'hinduCalendar', 'Hindu Calendar')}
          </h1>
          <p className="text-sm sm:text-base text-stone-600 mt-1">
            {currentLang === 'mr'
              ? `${cityNameDisplay} साठी तिथी, नक्षत्र, योग, करण, शुभ मुहूर्त आणि १६ चौघडिया`
              : currentLang === 'hi'
              ? `${cityNameDisplay} के लिए तिथि, नक्षत्र, योग, करण, शुभ मुहूर्त एवं १६ चौघड़िया`
              : currentLang === 'gu'
              ? `${cityNameDisplay} માટે તિથિ, નક્ષત્ર, યોગ, કરણ, શુભ મુહૂર્ત અને ૧૬ ચોઘડિયા`
              : `Tithi, Nakshatra, Yoga, Karana, Auspicious Muhurats & 16 Choghadiyas for ${cityNameDisplay}`}
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenCityModal}
          className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 bg-white text-xs sm:text-sm font-bold text-[#9A3412] border border-stone-300 rounded-xl hover:bg-stone-50 transition-colors shadow-2xs"
        >
          <MapPin className="w-4 h-4 text-[#9A3412]" />
          <span>{cityNameDisplay}, {currentCity.state} ({currentCity.latitude}°N)</span>
        </button>
      </div>

      <AdSlot type="top" />

      {/* Sun & Moon Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-2xs">
          <div className="flex items-center gap-1.5 text-xs text-amber-800 font-bold uppercase tracking-wider">
            <Sun className="w-4 h-4 text-amber-600" />
            <span>{getUIText(currentLang, 'sunrise', 'Sunrise')}</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-stone-900 mt-2 font-mono tabular-nums">
            {panchang.sunrise}
          </div>
          <div className="text-xs text-stone-500 mt-0.5">{cityNameDisplay}</div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-2xs">
          <div className="flex items-center gap-1.5 text-xs text-orange-800 font-bold uppercase tracking-wider">
            <Sun className="w-4 h-4 text-orange-600" />
            <span>{getUIText(currentLang, 'sunset', 'Sunset')}</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-stone-900 mt-2 font-mono tabular-nums">
            {panchang.sunset}
          </div>
          <div className="text-xs text-stone-500 mt-0.5">{cityNameDisplay}</div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-2xs">
          <div className="flex items-center gap-1.5 text-xs text-indigo-800 font-bold uppercase tracking-wider">
            <Moon className="w-4 h-4 text-indigo-600" />
            <span>{getUIText(currentLang, 'moonrise', 'Moonrise')}</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-stone-900 mt-2 font-mono tabular-nums">
            {panchang.moonrise}
          </div>
          <div className="text-xs text-stone-500 mt-0.5">{cityNameDisplay}</div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-2xs">
          <div className="flex items-center gap-1.5 text-xs text-slate-800 font-bold uppercase tracking-wider">
            <Moon className="w-4 h-4 text-slate-600" />
            <span>{getUIText(currentLang, 'moonset', 'Moonset')}</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-stone-900 mt-2 font-mono tabular-nums">
            {panchang.moonset}
          </div>
          <div className="text-xs text-stone-500 mt-0.5">{cityNameDisplay}</div>
        </div>
      </div>

      {/* Core 5 Limbs (Panchang) Detailed Table */}
      <div className="bg-white rounded-3xl border-2 border-stone-300 overflow-hidden shadow-md">
        <div className="px-6 py-4.5 bg-gradient-to-r from-stone-950 via-slate-900 to-stone-950 border-b-2 border-amber-500 flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-white font-serif tracking-wide">
              {getUIText(currentLang, 'fiveLimbs', 'The Five Vedic Limbs (Panchang Detailed)')}
            </h2>
            <p className="text-xs text-amber-200/90 mt-0.5 font-medium">
              {panchang.date} · {cityNameDisplay} ({currentCity.state})
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-950 bg-amber-400 px-3 py-1 rounded-full border border-amber-300 shadow-xs">
            Surya Siddhanta
          </span>
        </div>

        <div className="divide-y divide-stone-200 text-sm sm:text-base">
          {/* Tithi */}
          <div className="grid grid-cols-1 sm:grid-cols-3 hover:bg-amber-50/40 transition-colors">
            <div className="bg-stone-100/90 sm:border-r border-b sm:border-b-0 border-stone-200 p-4 sm:p-5 flex items-center gap-2">
              <span className="text-stone-950 font-bold text-sm sm:text-base uppercase tracking-wider">{getUIText(currentLang, 'tithi', 'Tithi')}</span>
            </div>
            <div className="sm:col-span-2 p-4 sm:p-5 flex flex-wrap items-center gap-3">
              <span className="font-bold text-stone-950 font-serif text-lg sm:text-xl">
                {localizedPaksha} {panchang.tithi.name}
              </span>
              <span className="font-mono font-black text-amber-950 bg-amber-200/80 px-2.5 py-1 rounded-md border border-amber-400 text-xs">
                Tithi #{panchang.tithi.number} / 30
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-black bg-stone-900 text-amber-300">
                {panchang.tithi.paksha} Paksha
              </span>
            </div>
          </div>

          {/* Nakshatra */}
          <div className="grid grid-cols-1 sm:grid-cols-3 hover:bg-amber-50/40 transition-colors">
            <div className="bg-stone-100/90 sm:border-r border-b sm:border-b-0 border-stone-200 p-4 sm:p-5 flex items-center gap-2">
              <span className="text-stone-950 font-bold text-sm sm:text-base uppercase tracking-wider">{getUIText(currentLang, 'nakshatra', 'Nakshatra')}</span>
            </div>
            <div className="sm:col-span-2 p-4 sm:p-5 flex flex-wrap items-center gap-3">
              <span className="font-bold text-stone-950 font-serif text-lg sm:text-xl">
                {panchang.nakshatra.name}
              </span>
              <span className="font-mono font-bold text-indigo-950 bg-indigo-100 px-2.5 py-1 rounded-md border border-indigo-300 text-xs">
                Nakshatra #{panchang.nakshatra.number} / 27
              </span>
            </div>
          </div>

          {/* Yoga */}
          <div className="grid grid-cols-1 sm:grid-cols-3 hover:bg-amber-50/40 transition-colors">
            <div className="bg-stone-100/90 sm:border-r border-b sm:border-b-0 border-stone-200 p-4 sm:p-5 flex items-center gap-2">
              <span className="text-stone-950 font-bold text-sm sm:text-base uppercase tracking-wider">{getUIText(currentLang, 'yoga', 'Yoga')}</span>
            </div>
            <div className="sm:col-span-2 p-4 sm:p-5 flex flex-wrap items-center gap-3">
              <span className="font-bold text-stone-950 font-serif text-lg sm:text-xl">
                {panchang.yoga.name}
              </span>
              <span className="font-mono font-bold text-emerald-950 bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-300 text-xs">
                Yoga #{panchang.yoga.number} / 27
              </span>
            </div>
          </div>

          {/* Karana */}
          <div className="grid grid-cols-1 sm:grid-cols-3 hover:bg-amber-50/40 transition-colors">
            <div className="bg-stone-100/90 sm:border-r border-b sm:border-b-0 border-stone-200 p-4 sm:p-5 flex items-center gap-2">
              <span className="text-stone-950 font-bold text-sm sm:text-base uppercase tracking-wider">{getUIText(currentLang, 'karana', 'Karana')}</span>
            </div>
            <div className="sm:col-span-2 p-4 sm:p-5">
              <span className="font-bold text-stone-950 font-serif text-lg sm:text-xl">
                {panchang.karana.name}
              </span>
            </div>
          </div>

          {/* Vara / Day */}
          <div className="grid grid-cols-1 sm:grid-cols-3 hover:bg-amber-50/40 transition-colors">
            <div className="bg-stone-100/90 sm:border-r border-b sm:border-b-0 border-stone-200 p-4 sm:p-5 flex items-center gap-2">
              <span className="text-stone-950 font-bold text-sm sm:text-base uppercase tracking-wider">{getUIText(currentLang, 'varaDay', 'Vara / Day')}</span>
            </div>
            <div className="sm:col-span-2 p-4 sm:p-5">
              <span className="font-bold text-stone-950 font-serif text-lg sm:text-xl">
                {localizedWeekday} ({panchang.dayOfWeek})
              </span>
            </div>
          </div>

          {/* Hindu Month (Amavasyant) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 hover:bg-amber-50/40 transition-colors">
            <div className="bg-stone-100/90 sm:border-r border-b sm:border-b-0 border-stone-200 p-4 sm:p-5 flex items-center gap-2">
              <span className="text-stone-950 font-bold text-sm sm:text-base">{getUIText(currentLang, 'hinduMonthAmavasyantLabel', 'Hindu Month (Amavasyant)')}</span>
            </div>
            <div className="sm:col-span-2 p-4 sm:p-5 text-stone-950 font-bold">
              {panchang.hinduMonthAmavasyant} <span className="font-normal text-stone-600 text-xs sm:text-sm">(Maharashtra, Gujarat, South India)</span>
            </div>
          </div>

          {/* Hindu Month (Purnimant) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 hover:bg-amber-50/40 transition-colors">
            <div className="bg-stone-100/90 sm:border-r border-b sm:border-b-0 border-stone-200 p-4 sm:p-5 flex items-center gap-2">
              <span className="text-stone-950 font-bold text-sm sm:text-base">{getUIText(currentLang, 'hinduMonthPurnimantLabel', 'Hindu Month (Purnimant)')}</span>
            </div>
            <div className="sm:col-span-2 p-4 sm:p-5 text-stone-950 font-bold">
              {panchang.hinduMonthPurnimant} <span className="font-normal text-stone-600 text-xs sm:text-sm">(North India, UP, Bihar, MP, Rajasthan)</span>
            </div>
          </div>

          {/* Samvat & Eras */}
          <div className="grid grid-cols-1 sm:grid-cols-3 hover:bg-amber-50/40 transition-colors">
            <div className="bg-stone-100/90 sm:border-r border-b sm:border-b-0 border-stone-200 p-4 sm:p-5 flex items-center gap-2">
              <span className="text-stone-950 font-bold text-sm sm:text-base">{getUIText(currentLang, 'samvatEras', 'Samvat & Eras')}</span>
            </div>
            <div className="sm:col-span-2 p-4 sm:p-5 text-stone-950 font-bold">
              Vikram Samvat <strong className="font-mono text-amber-900">{panchang.vikramSamvat}</strong> · Shalivahana Shaka <strong className="font-mono text-amber-900">{panchang.shakaSamvat}</strong>
            </div>
          </div>

          {/* Ritu & Ayana */}
          <div className="grid grid-cols-1 sm:grid-cols-3 hover:bg-amber-50/40 transition-colors">
            <div className="bg-stone-100/90 sm:border-r border-b sm:border-b-0 border-stone-200 p-4 sm:p-5 flex items-center gap-2">
              <span className="text-stone-950 font-bold text-sm sm:text-base">{getUIText(currentLang, 'rituAyana', 'Ritu & Ayana')}</span>
            </div>
            <div className="sm:col-span-2 p-4 sm:p-5 text-stone-950 font-bold">
              {panchang.ritu} · {panchang.ayana}
            </div>
          </div>
        </div>
      </div>

      {/* Auspicious and Inauspicious Timings Side-by-Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Auspicious Muhurats */}
        <div className="bg-white rounded-3xl border-2 border-emerald-300 overflow-hidden shadow-sm">
          <div className="px-6 py-4 bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 border-b-2 border-emerald-400 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <h3 className="font-serif font-bold text-white text-lg sm:text-xl">
                {getUIText(currentLang, 'abhijit', 'Abhijit')} & {getUIText(currentLang, 'brahmaMuhurat', 'Brahma Muhurat')}
              </h3>
            </div>
            <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-400 text-emerald-950">
              Shubh
            </span>
          </div>

          <div className="p-5 sm:p-6 space-y-3.5 text-sm sm:text-base">
            <div className="flex items-center justify-between p-4 bg-emerald-50/90 rounded-2xl border border-emerald-200">
              <div>
                <div className="font-bold text-emerald-950 font-serif text-base">{getUIText(currentLang, 'abhijit', 'Abhijit Muhurat')}</div>
                <div className="text-xs text-emerald-800 font-medium">{currentLang === 'mr' ? 'दुपारची अतिशुभ वेळ' : currentLang === 'hi' ? 'दोपहर की अतिशुभ वेला' : 'Most auspicious midday window'}</div>
              </div>
              <div className="font-mono font-black text-emerald-950 bg-emerald-200/80 px-3 py-1.5 rounded-xl border border-emerald-400 text-sm sm:text-base tabular-nums">
                {panchang.abhijitMuhurat.start} – {panchang.abhijitMuhurat.end}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-emerald-50/90 rounded-2xl border border-emerald-200">
              <div>
                <div className="font-bold text-emerald-950 font-serif text-base">{getUIText(currentLang, 'brahmaMuhurat', 'Brahma Muhurat')}</div>
                <div className="text-xs text-emerald-800 font-medium">{currentLang === 'mr' ? 'पहाटेची साधना व ध्यान वेळ' : currentLang === 'hi' ? 'प्रातः काल ध्यान एवं साधना वेला' : 'Pre-dawn meditation & prayer'}</div>
              </div>
              <div className="font-mono font-black text-emerald-950 bg-emerald-200/80 px-3 py-1.5 rounded-xl border border-emerald-400 text-sm sm:text-base tabular-nums">
                {panchang.brahmaMuhurat.start} – {panchang.brahmaMuhurat.end}
              </div>
            </div>
          </div>
        </div>

        {/* Inauspicious Timings */}
        <div className="bg-white rounded-3xl border-2 border-rose-300 overflow-hidden shadow-sm">
          <div className="px-6 py-4 bg-gradient-to-r from-rose-950 via-rose-900 to-stone-950 border-b-2 border-rose-400 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              <h3 className="font-serif font-bold text-white text-lg sm:text-xl">
                {getUIText(currentLang, 'rahuKaal', 'Rahu Kaal')} & {getUIText(currentLang, 'yamaganda', 'Yamaganda')}
              </h3>
            </div>
            <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-400 text-rose-950">
              Ashubh
            </span>
          </div>

          <div className="p-5 sm:p-6 space-y-3 text-sm sm:text-base">
            <div className="flex items-center justify-between p-3.5 bg-rose-50 rounded-2xl border border-rose-200">
              <div>
                <div className="font-bold text-rose-950 font-serif">{getUIText(currentLang, 'rahuKaal', 'Rahu Kaal')}</div>
                <div className="text-xs text-rose-800 font-medium">{currentLang === 'mr' ? 'नवीन कामे व प्रवास टाळावा' : currentLang === 'hi' ? 'शुभ कार्य व यात्रा आरंभ वर्जित' : 'Avoid starting new endeavors or travel'}</div>
              </div>
              <div className="font-mono font-black text-rose-950 bg-rose-200/90 px-3 py-1.5 rounded-xl border border-rose-400 text-sm tabular-nums">
                {panchang.rahuKaal.start} – {panchang.rahuKaal.end}
              </div>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-stone-100/90 rounded-2xl border border-stone-200">
              <div>
                <div className="font-bold text-stone-950 font-serif">{getUIText(currentLang, 'yamaganda', 'Yamaganda')}</div>
                <div className="text-xs text-stone-700">{currentLang === 'mr' ? 'अशुभ ग्रहांची वेला' : currentLang === 'hi' ? 'अशुभ ग्रह काल' : 'Inauspicious planetary slot'}</div>
              </div>
              <div className="font-mono font-bold text-stone-950 bg-white px-2.5 py-1 rounded-lg border border-stone-300 tabular-nums">
                {panchang.yamaganda.start} – {panchang.yamaganda.end}
              </div>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-stone-100/90 rounded-2xl border border-stone-200">
              <div>
                <div className="font-bold text-stone-950 font-serif">{getUIText(currentLang, 'gulika', 'Gulika Kaal')}</div>
                <div className="text-xs text-stone-700">{currentLang === 'mr' ? 'गुलिक काल' : currentLang === 'hi' ? 'गुलिक काल' : "Saturn's purifying period"}</div>
              </div>
              <div className="font-mono font-bold text-stone-950 bg-white px-2.5 py-1 rounded-lg border border-stone-300 tabular-nums">
                {panchang.gulikaKaal.start} – {panchang.gulikaKaal.end}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* LIVE SUN TRAJECTORY, MUHURATS & MOON PHASE TRACKER */}
      <CelestialTracker
        selectedCity={currentCity}
        currentLang={currentLang}
        onNavigate={onNavigate}
        onOpenCityModal={onOpenCityModal}
      />

      {/* Day & Night Choghadiya Table */}
      <div className="bg-white rounded-3xl border-2 border-stone-300 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b-2 border-stone-200">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-950 font-serif">
              {dateHeading} {getUIText(currentLang, 'todayChoghadiya', 'Day & Night Choghadiya')}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-medium mt-0.5">
              16 Auspicious & Inauspicious partitions calculated for {cityNameDisplay} ({panchang.sunrise} – {panchang.sunset})
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/choghadiya')}
            className="text-xs sm:text-sm font-bold text-[#9A3412] hover:underline"
          >
            {getUIText(currentLang, 'choghadiyaHowToUse', 'Choghadiya Guide & Rules →')}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Day Slots */}
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-amber-200 bg-amber-950 p-3.5 rounded-2xl mb-3 flex items-center justify-between border border-amber-900 shadow-xs">
              <span>{getUIText(currentLang, 'dayChoghadiya', 'Day Choghadiya (दिन का चौघड़िया)')}</span>
              <span className="text-[11px] font-mono text-amber-300">{panchang.sunrise} to {panchang.sunset}</span>
            </div>
            <div className="space-y-2 text-xs sm:text-sm">
              {panchang.choghadiya.day.map((slot, i) => {
                const localizedName = getChoghadiyaSlotName(slot.name, currentLang);
                const localizedRuler = getChoghadiyaSlotRuler(slot.name, currentLang);
                const localizedNature = getChoghadiyaSlotNature(slot.name, currentLang);
                return (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border transition-colors ${
                      slot.nature === 'Auspicious'
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold'
                        : slot.nature === 'Inauspicious'
                        ? 'bg-rose-50 border-rose-300 text-rose-950 font-medium'
                        : 'bg-stone-100 border-stone-200 text-stone-900 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-stone-400 text-xs w-5">#{i+1}</span>
                      <span className="font-bold text-base font-serif text-stone-950">{localizedName}</span>
                      <span className="text-xs text-stone-600">({localizedRuler})</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-black ${
                        slot.nature === 'Auspicious' ? 'bg-emerald-700 text-white' : slot.nature === 'Inauspicious' ? 'bg-rose-700 text-white' : 'bg-stone-800 text-stone-100'
                      }`}>
                        {localizedNature}
                      </span>
                      <span className="font-mono font-bold tabular-nums text-stone-950">
                        {slot.start} – {slot.end}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Night Slots */}
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-indigo-200 bg-indigo-950 p-3.5 rounded-2xl mb-3 flex items-center justify-between border border-indigo-900 shadow-xs">
              <span>{getUIText(currentLang, 'nightChoghadiya', 'Night Choghadiya (रात्रि का चौघड़िया)')}</span>
              <span className="text-[11px] font-mono text-indigo-300">{getUIText(currentLang, 'sunsetToSunrise', 'Sunset to Next Sunrise')}</span>
            </div>
            <div className="space-y-2 text-xs sm:text-sm">
              {panchang.choghadiya.night.map((slot, i) => {
                const localizedName = getChoghadiyaSlotName(slot.name, currentLang);
                const localizedRuler = getChoghadiyaSlotRuler(slot.name, currentLang);
                const localizedNature = getChoghadiyaSlotNature(slot.name, currentLang);
                return (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border transition-colors ${
                      slot.nature === 'Auspicious'
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold'
                        : slot.nature === 'Inauspicious'
                        ? 'bg-rose-50 border-rose-300 text-rose-950 font-medium'
                        : 'bg-stone-100 border-stone-200 text-stone-900 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-stone-400 text-xs w-5">#{i+1}</span>
                      <span className="font-bold text-base font-serif text-stone-950">{localizedName}</span>
                      <span className="text-xs text-stone-600">({localizedRuler})</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-black ${
                        slot.nature === 'Auspicious' ? 'bg-emerald-700 text-white' : slot.nature === 'Inauspicious' ? 'bg-rose-700 text-white' : 'bg-stone-800 text-stone-100'
                      }`}>
                        {localizedNature}
                      </span>
                      <span className="font-mono font-bold tabular-nums text-stone-950">
                        {slot.start} – {slot.end}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* TODAY'S HOROSCOPE MODULE ON TODAY PAGE */}
      <TodayHoroscopeSection
        currentLang={currentLang}
        onNavigate={onNavigate}
        savedRashi={savedRashi}
        onSaveRashi={handleSaveRashi}
      />

      <ShareButtons
        title={`${dateHeading} ${getUIText(currentLang, 'panchang', 'Panchang')} & ${getUIText(currentLang, 'tithi', 'Tithi')} – NewsDarshan`}
        url={`https://www.newsdarshan.in/today`}
      />
    </div>
  );
}
