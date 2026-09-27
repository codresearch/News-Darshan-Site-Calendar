import { useState, useEffect } from 'react';
import { RASHIFAL_DATA } from '../data/calendarData';
import { LOCALIZED_RASHI_NAMES, getUIText } from '../data/localization';
import { getLocalizedHoroscope } from '../data/horoscopeLocalized';
import { RashifalData, LanguageCode } from '../types';
import Breadcrumbs from '../components/Breadcrumbs';
import AdSlot from '../components/AdSlot';
import ShareButtons from '../components/ShareButtons';
import TodayHoroscopeSection from '../components/TodayHoroscopeSection';
import {
  Compass,
  Sparkles,
  Heart,
  Briefcase,
  Activity,
  Check,
  Bookmark,
  Sun,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface RashifalPageProps {
  rashiSlug?: string;
  currentLang?: LanguageCode;
  onNavigate: (path: string) => void;
}

export default function RashifalPage({
  rashiSlug,
  currentLang = 'en',
  onNavigate
}: RashifalPageProps) {
  const isMarathi = currentLang === 'mr';
  const isHindi = currentLang === 'hi';
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily');
  const [savedRashi, setSavedRashi] = useState<string>('mesha');

  useEffect(() => {
    const saved = localStorage.getItem('nd_saved_rashi');
    if (saved) setSavedRashi(saved);
  }, []);

  const handleSaveRashi = (id: string) => {
    setSavedRashi(id);
    localStorage.setItem('nd_saved_rashi', id);
  };

  const selectedRashi = rashiSlug
    ? RASHIFAL_DATA.find((r) => `${r.rashiId}-rashi` === rashiSlug)
    : null;

  const breadcrumbs = selectedRashi
    ? [
        { name: getUIText(currentLang, 'home', 'Home'), url: '/' },
        { name: getUIText(currentLang, 'rashifal', 'Rashifal'), url: '/rashifal/' },
        {
          name: isMarathi
            ? `${selectedRashi.nameHi} राशी`
            : `${selectedRashi.name} (${selectedRashi.nameHi})`,
          url: `/rashifal/${selectedRashi.rashiId}-rashi/`
        }
      ]
    : [
        { name: getUIText(currentLang, 'home', 'Home'), url: '/' },
        { name: `${getUIText(currentLang, 'rashifal', 'Rashifal')} 2027`, url: '/rashifal/' }
      ];

  // If viewing single Rashi Detail Page
  if (selectedRashi) {
    const isSaved = savedRashi === selectedRashi.rashiId;
    const localizedPred = getLocalizedHoroscope(selectedRashi.rashiId, currentLang);

    return (
      <div className="space-y-8 sm:space-y-10">
        <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

        <div className="p-6 sm:p-8 bg-gradient-to-r from-[#FFFDF9] via-[#FAF3EC] to-[#F5ECE3] rounded-3xl border-2 border-[#E6C88A] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#9A3412] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {isMarathi
                  ? `वैदिक राशीभविष्य · ${selectedRashi.element} तत्त्व · स्वामी ग्रह ${selectedRashi.ruler}`
                  : isHindi
                  ? `वैदिक राशिफल · ${selectedRashi.element} तत्व · स्वामी ग्रह ${selectedRashi.ruler}`
                  : `Vedic Horoscope · ${selectedRashi.element} Element · Ruled by ${selectedRashi.ruler}`}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 font-serif">
              {isMarathi
                ? `${selectedRashi.nameHi} दैनिक राशीभविष्य २०२७`
                : isHindi
                ? `${selectedRashi.nameHi} दैनिक राशिफल २०२७`
                : `${selectedRashi.name} Rashifal (${selectedRashi.nameHi})`}
            </h1>
            <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-2xl leading-relaxed">
              {isMarathi ? 'पाश्चात्त्य चिन्ह:' : 'Western Sign:'} <strong className="text-stone-800">{selectedRashi.westernSign}</strong> · {isMarathi ? 'प्रतीक:' : 'Symbol:'} <strong className="text-stone-800">{selectedRashi.symbol}</strong> · {isMarathi ? 'शुभ नामाक्षरे:' : 'Auspicious Syllables:'} <strong className="text-stone-800">{selectedRashi.syllables.join(', ')}</strong>
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleSaveRashi(selectedRashi.rashiId)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-bold rounded-xl border transition-colors shadow-2xs shrink-0 ${
              isSaved
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-white text-stone-800 border-stone-300 hover:bg-stone-50'
            }`}
          >
            {isSaved ? <Check className="w-4 h-4 text-emerald-600" /> : <Bookmark className="w-4 h-4 text-[#9A3412]" />}
            <span>
              {isSaved
                ? isMarathi
                  ? 'माझी निवडलेली रास'
                  : 'My Saved Rashi (मेरी राशि)'
                : isMarathi
                ? 'माझी रास म्हणून निवडा'
                : 'Set as My Rashi (मेरी राशि चुनें)'}
            </span>
          </button>
        </div>

        <AdSlot type="top" />

        {/* Daily Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <section className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 space-y-4 shadow-2xs">
              <h2 className="text-xl font-bold text-stone-900 font-serif text-[#9A3412]">
                {isMarathi ? 'आजचे ग्रहमान व दैनिक अंदाज' : isHindi ? 'आज का ग्रहमान एवं दैनिक भविष्यफल' : "Today's Planetary Overview"}
              </h2>
              <p className="text-base text-stone-700 leading-relaxed">
                {localizedPred ? localizedPred.prediction : selectedRashi.dailyPrediction.general}
              </p>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-200">
                  <div className="text-sm font-bold text-blue-900 flex items-center gap-2 mb-1.5">
                    <Briefcase className="w-4 h-4 text-blue-700" />
                    <span>{isMarathi ? 'व्यवसाय आणि नोकरी' : 'Career & Business (व्यापार एवं धन)'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {localizedPred ? localizedPred.career : selectedRashi.dailyPrediction.career}
                  </p>
                </div>

                <div className="p-4 bg-rose-50/70 rounded-xl border border-rose-200">
                  <div className="text-sm font-bold text-rose-900 flex items-center gap-2 mb-1.5">
                    <Heart className="w-4 h-4 text-rose-700" />
                    <span>{isMarathi ? 'प्रेम आणि कौटुंबिक जीवन' : 'Love & Family (दाम्पत्य व प्रेम)'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {localizedPred ? localizedPred.love : selectedRashi.dailyPrediction.love}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200">
                <div className="text-sm font-bold text-emerald-900 flex items-center gap-2 mb-1.5">
                  <Activity className="w-4 h-4 text-emerald-700" />
                  <span>{isMarathi ? 'आरोग्य व ऊर्जा' : 'Health & Wellness (स्वास्थ्य एवं ऊर्जा)'}</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {localizedPred ? localizedPred.health : selectedRashi.dailyPrediction.health}
                </p>
              </div>
            </section>

            <section className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 space-y-4 shadow-2xs">
              <h2 className="text-xl font-bold text-stone-900 font-serif">
                {isMarathi ? 'साप्ताहिक व मासिक फलकथन' : 'Weekly & Monthly Forecast'}
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-stone-700">
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="font-bold text-xs text-[#9A3412] uppercase tracking-wider mb-1">
                    {isMarathi ? 'साप्ताहिक मार्गदर्शन' : 'Weekly Guidance (साप्ताहिक फल)'}
                  </div>
                  <p className="leading-relaxed">{selectedRashi.weeklyPrediction}</p>
                </div>
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="font-bold text-xs text-[#9A3412] uppercase tracking-wider mb-1">
                    {isMarathi ? 'मासिक मार्गदर्शन' : 'Monthly Forecast (मासिक फल)'}
                  </div>
                  <p className="leading-relaxed">{selectedRashi.monthlyPrediction}</p>
                </div>
              </div>
            </section>

            <section className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 space-y-3 shadow-2xs">
              <h2 className="text-xl font-bold text-stone-900 font-serif text-[#9A3412]">
                {isMarathi ? '२०२७ चे वार्षिक राशीभविष्य' : '2027 Annual Vedic Forecast'}
              </h2>
              <p className="text-base text-stone-700 leading-relaxed">
                {selectedRashi.yearly2027Prediction}
              </p>
            </section>
          </div>

          {/* Right Sidebar: Astrological Attributes */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-4 shadow-2xs text-sm">
              <h3 className="font-bold text-stone-900 uppercase tracking-wider text-xs border-b border-stone-200 pb-2">
                {isMarathi ? 'शुभ ज्योतिषीय घटक' : 'Auspicious Astrological Attributes (शुभ लक्षण)'}
              </h3>
              <div className="space-y-3 text-stone-700">
                <div className="flex justify-between py-1.5 border-b border-stone-100">
                  <span className="font-medium text-stone-500">{isMarathi ? 'शुभ रंग:' : 'Lucky Color:'}</span>
                  <strong className="text-stone-900">{selectedRashi.dailyPrediction.luckyColor}</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-100">
                  <span className="font-medium text-stone-500">{isMarathi ? 'भाग्यवान अंक:' : 'Lucky Number:'}</span>
                  <strong className="text-stone-900">{selectedRashi.dailyPrediction.luckyNumber}</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-100">
                  <span className="font-medium text-stone-500">{isMarathi ? 'स्वामी ग्रह:' : 'Ruling Planet:'}</span>
                  <strong className="text-stone-900">{selectedRashi.ruler}</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-100">
                  <span className="font-medium text-stone-500">{isMarathi ? 'तत्त्व:' : 'Element:'}</span>
                  <strong className="text-stone-900">{selectedRashi.element}</strong>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="font-medium text-stone-500">{isMarathi ? 'शुभ वेळ:' : 'Auspicious Time:'}</span>
                  <strong className="text-stone-900">{selectedRashi.dailyPrediction.luckyTime}</strong>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate('/rashifal')}
                  className="w-full py-2.5 bg-[#FAF1EC] text-[#9A3412] hover:bg-[#F3E5DD] font-bold rounded-xl text-center transition-colors text-xs mt-2"
                >
                  {isMarathi ? '← इतर ११ राशींचे भविष्य पहा' : '← Explore Other 11 Signs'}
                </button>
              </div>
            </div>

            <AdSlot type="sidebar" />
          </div>
        </div>

        <ShareButtons
          title={`${selectedRashi.name} Rashifal – NewsDarshan`}
          url={`https://www.newsdarshan.in/rashifal/${selectedRashi.rashiId}-rashi`}
        />

        <AdSlot type="before-footer" />
      </div>
    );
  }

  // Period label maps
  const periodLabels = {
    daily: isMarathi ? 'दैनिक' : isHindi ? 'दैनिक' : 'Daily',
    weekly: isMarathi ? 'साप्ताहिक' : isHindi ? 'साप्ताहिक' : 'Weekly',
    monthly: isMarathi ? 'मासिक' : isHindi ? 'मासिक' : 'Monthly',
    yearly: isMarathi ? 'वार्षिक २०२७' : isHindi ? 'वार्षिक २०२७' : 'Yearly 2027'
  };

  // Rashifal Hub (All 12 Rashis)
  return (
    <div className="space-y-8 sm:space-y-12">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      <div className="p-6 sm:p-10 bg-gradient-to-r from-[#FFFDF9] via-[#FAF3EC] to-[#F5ECE3] rounded-3xl border-2 border-[#E6C88A] shadow-sm">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9A3412] mb-2">
          <Sparkles className="w-4 h-4" />
          <span>{isMarathi ? 'वैदिक चंद्र राशी भविष्य · १२ राशी' : isHindi ? 'वैदिक चंद्र राशि भविष्यफल · १२ राशियां' : 'Vedic Moon Sign Astrological Ephemeris · 12 Rashis'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-serif">
          {isMarathi
            ? 'आजचे राशीभविष्य व २०२७ वार्षिक राशीफळ'
            : isHindi
            ? 'आज का दैनिक राशिफल एवं २०२७ वार्षिक भविष्यफल'
            : 'Aaj Ka Rashifal & 2027 Horoscope (दैनिक राशिफल)'}
        </h1>
        <p className="text-base sm:text-lg text-stone-700 mt-3 max-w-3xl leading-relaxed">
          {isMarathi
            ? 'आपली चंद्र रास निवडून करिअर, आर्थिक प्रगती, कौटुंबिक सौख्य आणि आरोग्याविषयी अचूक वैदिक राशीभविष्य वाचा.'
            : isHindi
            ? 'अपनी चंद्र राशि चुनकर करियर, आर्थिक उन्नति, पारिवारिक सुख एवं स्वास्थ्य का सटीक वैदिक राशिफल पढ़ें।'
            : 'Select your Moon sign (Chandra Rashi) or Western sun sign to read personalized forecasts across professional achievements, domestic happiness, financial developments, and vitality.'}
        </p>

        {/* Forecast Period Switcher */}
        <div className="mt-6 flex flex-wrap gap-2.5">
          {(['daily', 'weekly', 'monthly', 'yearly'] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors ${
                period === p
                  ? 'bg-[#9A3412] text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-50'
              }`}
            >
              {periodLabels[p]} {isMarathi ? 'भविष्य' : isHindi ? 'राशिफल' : 'Horoscope'}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Today Horoscope Module */}
      <TodayHoroscopeSection
        currentLang={currentLang}
        onNavigate={onNavigate}
        savedRashi={savedRashi}
        onSaveRashi={handleSaveRashi}
      />

      <AdSlot type="top" />

      {/* 12 Rashis Complete Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif">
          {isMarathi
            ? `सर्व १२ राशींचे (${periodLabels[period]}) राशीभविष्य`
            : isHindi
            ? `सभी १२ राशियों का (${periodLabels[period]}) भविष्यफल`
            : `All 12 Zodiac Signs (${period.toUpperCase()} PREDICTION)`}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {RASHIFAL_DATA.map((r) => {
            const isUserSaved = savedRashi === r.rashiId;
            const localizedPred = getLocalizedHoroscope(r.rashiId, currentLang);

            return (
              <div
                key={r.rashiId}
                onClick={() => onNavigate(`/rashifal/${r.rashiId}-rashi`)}
                className="p-6 bg-white rounded-2xl border border-stone-200 hover:border-[#9A3412] transition-all cursor-pointer group flex flex-col justify-between shadow-2xs hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
                    <span>{r.westernSign} ({r.element})</span>
                    {isUserSaved && (
                      <span className="text-emerald-800 font-bold flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 rounded-full text-xs border border-emerald-200">
                        ★ {isMarathi ? 'माझी रास' : isHindi ? 'मेरी राशि' : 'My Rashi'}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-stone-900 group-hover:text-[#9A3412] font-serif mt-2 flex items-center gap-2">
                    <span>{isMarathi ? r.nameHi : r.name}</span>
                    <span className="font-normal text-stone-500 text-sm font-sans">
                      {isMarathi ? `(${r.name})` : `(${r.nameHi})`}
                    </span>
                  </h3>

                  <p className="text-sm text-stone-600 mt-3 line-clamp-3 leading-relaxed">
                    {period === 'daily'
                      ? (localizedPred ? localizedPred.prediction : r.dailyPrediction.general)
                      : period === 'weekly'
                      ? r.weeklyPrediction
                      : period === 'monthly'
                      ? r.monthlyPrediction
                      : r.yearly2027Prediction}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs sm:text-sm text-stone-500">
                  <span>{isMarathi ? 'स्वामी:' : 'Ruler:'} <strong className="text-stone-800">{r.ruler.split(' ')[0]}</strong></span>
                  <span className="text-[#9A3412] font-bold group-hover:underline flex items-center gap-1">
                    <span>{isMarathi ? 'संपूर्ण माहिती' : isHindi ? 'विस्तृत राशिफल' : 'Full Guide'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ShareButtons
        title="Vedic Rashifal 2027 for All 12 Signs – NewsDarshan"
        url="https://www.newsdarshan.in/rashifal"
      />

      <AdSlot type="before-footer" />
    </div>
  );
}
