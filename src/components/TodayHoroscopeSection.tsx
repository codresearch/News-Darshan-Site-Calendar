import { useState } from 'react';
import { RASHIFAL_DATA } from '../data/calendarData';
import { LOCALIZED_RASHI_NAMES, getUIText } from '../data/localization';
import { getLocalizedRashiPrediction } from '../data/horoscopeLocalized';
import { LanguageCode } from '../types';
import {
  Compass,
  Sparkles,
  Heart,
  Briefcase,
  Activity,
  Check,
  Bookmark,
  ChevronRight,
  Sun,
  ShieldCheck,
  Clock
} from 'lucide-react';

interface TodayHoroscopeSectionProps {
  currentLang: LanguageCode;
  onNavigate: (path: string) => void;
  savedRashi: string;
  onSaveRashi: (rashiId: string) => void;
}

export default function TodayHoroscopeSection({
  currentLang,
  onNavigate,
  savedRashi,
  onSaveRashi
}: TodayHoroscopeSectionProps) {
  const [activeRashiId, setActiveRashiId] = useState<string>(savedRashi || 'mesha');
  const [activeTab, setActiveTab] = useState<'today' | 'tomorrow' | 'weekly'>('today');

  const activeRashi = RASHIFAL_DATA.find((r) => r.rashiId === activeRashiId) || RASHIFAL_DATA[0];
  const isSaved = savedRashi === activeRashi.rashiId;

  // Localized predictions for the active rashi based on current language
  const locPred = getLocalizedRashiPrediction(activeRashi.rashiId, currentLang, activeRashi.dailyPrediction);

  // Rating generation based on daily prediction metrics
  const scoreMap: Record<string, { pct: number; labelEn: string; labelHi: string }> = {
    mesha: { pct: 94, labelEn: 'Highly Auspicious', labelHi: 'अत्यंत शुभ' },
    vrishabha: { pct: 91, labelEn: 'Very Favorable', labelHi: 'उत्तम फलदायक' },
    mithuna: { pct: 89, labelEn: 'Positive & Productive', labelHi: 'शुभ व फलदायी' },
    karka: { pct: 95, labelEn: 'Prosperous & Serene', labelHi: 'शांति व समृद्धिदायक' },
    simha: { pct: 96, labelEn: 'Royal & Victorious', labelHi: 'विजयी एवं सौभाग्यशाली' },
    kanya: { pct: 88, labelEn: 'Intellectually Sharp', labelHi: 'लाभकारी व प्रगतिकारक' },
    tula: { pct: 92, labelEn: 'Harmonious & Lucky', labelHi: 'सौहार्दपूर्ण व भाग्यशाली' },
    vrishchika: { pct: 90, labelEn: 'Energetic & Focused', labelHi: 'ऊर्जावान व शुभ' },
    dhanu: { pct: 97, labelEn: 'Bountiful Blessings', labelHi: 'गुरु कृपा व अत्यंत शुभ' },
    makara: { pct: 87, labelEn: 'Steady & Profitable', labelHi: 'स्थिर व लाभप्रद' },
    kumbha: { pct: 93, labelEn: 'Innovative & Auspicious', labelHi: 'नवाचार व सफलता' },
    meena: { pct: 95, labelEn: 'Spiritual Fulfillment', labelHi: 'आध्यात्मिक व कल्याणकारी' }
  };

  const currentScore = scoreMap[activeRashi.rashiId] || { pct: 92, labelEn: 'Very Auspicious', labelHi: 'अत्यंत शुभ' };

  return (
    <section className="vedic-card rounded-2xl p-6 sm:p-8 border border-[#E7D6CB] shadow-sm relative overflow-hidden bg-white">
      {/* Top Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF1EC] text-[#9A3412] text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{currentLang === 'hi' ? 'दैनिक वैदिक ज्योतिष' : 'Daily Vedic Horoscope'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif">
            {getUIText(currentLang, 'todayHoroscope', "Today's Horoscope")} (आज का राशिफल)
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-1">
            {currentLang === 'hi'
              ? 'ग्रह-नक्षत्रों की चाल पर आधारित सभी १२ राशियों का सटीक दैनिक, साप्ताहिक व मासिक भविष्यफल।'
              : 'Accurate planetary transit predictions for all 12 Moon signs (Janma Rashi).'}
          </p>
        </div>

        {/* Action button to view all Rashis directory */}
        <button
          type="button"
          onClick={() => onNavigate('/rashifal')}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-semibold text-[#9A3412] bg-[#FAF1EC] hover:bg-[#F3E5DD] rounded-xl border border-[#E8DCD4] transition-colors shrink-0"
        >
          <span>{getUIText(currentLang, 'allTwelveRashis', 'View All 12 Rashis')}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 12 Rashi Selector Bar */}
      <div className="pt-6 pb-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3 flex items-center justify-between">
          <span>{getUIText(currentLang, 'selectYourRashi', 'Choose Your Zodiac Sign (राशि चुनें)')}:</span>
          {isSaved && (
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md text-[11px] font-bold flex items-center gap-1">
              <Check className="w-3 h-3" /> {getUIText(currentLang, 'savedRashi', 'My Saved Sign')}
            </span>
          )}
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2">
          {RASHIFAL_DATA.map((r) => {
            const isSelected = r.rashiId === activeRashiId;
            const isDefault = r.rashiId === savedRashi;
            const locMeta = LOCALIZED_RASHI_NAMES[r.rashiId];

            return (
              <button
                key={r.rashiId}
                type="button"
                onClick={() => setActiveRashiId(r.rashiId)}
                className={`relative flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all text-center group ${
                  isSelected
                    ? 'bg-[#9A3412] text-white border-[#9A3412] shadow-md scale-[1.03] z-10'
                    : 'bg-stone-50 hover:bg-[#FAF1EC] text-stone-800 border-stone-200 hover:border-[#E8DCD4]'
                }`}
              >
                {isDefault && !isSelected && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white"></span>
                )}
                <span className={`text-lg sm:text-xl leading-none mb-1 ${isSelected ? 'text-amber-200' : 'text-[#9A3412]'}`}>
                  {locMeta?.icon || '⭐'}
                </span>
                <span className="text-xs font-bold font-serif leading-tight">
                  {currentLang === 'en' ? r.name.split(' ')[0] : r.nameHi}
                </span>
                <span className={`text-[10px] uppercase tracking-tighter truncate max-w-full ${isSelected ? 'text-stone-200' : 'text-stone-500'}`}>
                  {r.westernSign}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Period Tabs: Today / Tomorrow / Weekly */}
      <div className="flex items-center gap-2 pt-2 pb-5">
        <button
          type="button"
          onClick={() => setActiveTab('today')}
          className={`px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors ${
            activeTab === 'today'
              ? 'bg-[#9A3412] text-white shadow-xs'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          {currentLang === 'hi' ? 'आज का राशिफल' : "Today's Prediction"}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('tomorrow')}
          className={`px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors ${
            activeTab === 'tomorrow'
              ? 'bg-[#9A3412] text-white shadow-xs'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          {currentLang === 'hi' ? 'कल का राशिफल' : "Tomorrow's Outlook"}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('weekly')}
          className={`px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors ${
            activeTab === 'weekly'
              ? 'bg-[#9A3412] text-white shadow-xs'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          {currentLang === 'hi' ? 'साप्ताहिक फल' : 'Weekly Forecast'}
        </button>
      </div>

      {/* Active Rashi Horoscope Card */}
      <div className="bg-gradient-to-br from-[#FFFBF7] to-[#FAF5EE] rounded-2xl border border-[#E7D6CB] p-5 sm:p-7 space-y-6">
        {/* Rashi Header & Save Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200/80">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#9A3412] text-amber-200 flex items-center justify-center text-2xl font-serif shadow-xs">
              {LOCALIZED_RASHI_NAMES[activeRashi.rashiId]?.icon || '⭐'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
                  {activeRashi.name} ({activeRashi.nameHi} दैनिक राशिफल)
                </h3>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">
                  {currentLang === 'hi' ? currentScore.labelHi : currentScore.labelEn}
                </span>
              </div>
              <div className="text-xs sm:text-sm text-stone-600 mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span>{getUIText(currentLang, 'rulingPlanet', 'Ruler')}: <strong className="text-stone-800">{activeRashi.ruler}</strong></span>
                <span>•</span>
                <span>{getUIText(currentLang, 'element', 'Element')}: <strong className="text-stone-800">{activeRashi.element}</strong></span>
                <span>•</span>
                <span>Symbol: <strong className="text-stone-800">{activeRashi.symbol}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onSaveRashi(activeRashi.rashiId)}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl border transition-colors ${
                isSaved
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold'
                  : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
              }`}
            >
              {isSaved ? <Check className="w-4 h-4 text-emerald-600" /> : <Bookmark className="w-4 h-4 text-[#9A3412]" />}
              <span>{isSaved ? getUIText(currentLang, 'savedRashi', 'My Saved Sign') : getUIText(currentLang, 'saveRashi', 'Set as My Rashi')}</span>
            </button>
          </div>
        </div>

        {/* 4 Astrological Attributes Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Lucky Color */}
          <div className="bg-white p-3.5 rounded-xl border border-stone-200/90 shadow-2xs">
            <div className="text-xs text-stone-500 font-medium">
              {getUIText(currentLang, 'luckyColor', 'Lucky Color')}
            </div>
            <div className="text-sm sm:text-base font-bold text-stone-900 mt-1 flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 border border-stone-300 shrink-0"></span>
              <span className="truncate">{locPred.luckyColor}</span>
            </div>
          </div>

          {/* Lucky Number */}
          <div className="bg-white p-3.5 rounded-xl border border-stone-200/90 shadow-2xs">
            <div className="text-xs text-stone-500 font-medium">
              {getUIText(currentLang, 'luckyNumber', 'Lucky Number')}
            </div>
            <div className="text-sm sm:text-base font-bold text-[#9A3412] mt-1 flex items-center gap-1.5">
              <span className="w-6 h-6 rounded-full bg-amber-100 text-[#9A3412] text-xs font-black flex items-center justify-center border border-amber-300">
                {locPred.luckyNumber}
              </span>
              <span>({currentLang === 'hi' ? 'शुभ अंक' : 'Lucky'})</span>
            </div>
          </div>

          {/* Auspicious Time */}
          <div className="bg-white p-3.5 rounded-xl border border-stone-200/90 shadow-2xs">
            <div className="text-xs text-stone-500 font-medium">
              {getUIText(currentLang, 'auspiciousTime', 'Auspicious Time')}
            </div>
            <div className="text-sm sm:text-base font-bold text-stone-900 mt-1 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="truncate">{locPred.luckyTime}</span>
            </div>
          </div>

          {/* Fortune Rating */}
          <div className="bg-white p-3.5 rounded-xl border border-stone-200/90 shadow-2xs">
            <div className="text-xs text-stone-500 font-medium">
              {currentLang === 'hi' ? 'आज का भाग्य प्रतिशत' : 'Auspicious Score'}
            </div>
            <div className="text-sm sm:text-base font-bold text-emerald-700 mt-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{currentScore.pct}% {currentLang === 'hi' ? currentScore.labelHi : currentScore.labelEn}</span>
            </div>
          </div>
        </div>

        {/* Detailed Predictions based on active tab */}
        {activeTab === 'today' && (
          <div className="space-y-4">
            <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200">
              <h4 className="text-sm font-bold text-stone-900 font-serif uppercase tracking-wide flex items-center gap-2 mb-2 text-[#9A3412]">
                <Sun className="w-4 h-4" />
                <span>{currentLang === 'hi' ? 'दैनिक सारांश एवं गृह स्थिति' : 'Daily Overview & Planetary Guidance'}</span>
              </h4>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                {locPred.general}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200/80">
                <div className="text-xs sm:text-sm font-bold text-blue-900 flex items-center gap-1.5 mb-1.5">
                  <Briefcase className="w-4 h-4 text-blue-700" />
                  <span>{getUIText(currentLang, 'careerFinance', 'Career & Wealth')}</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {locPred.career}
                </p>
              </div>

              <div className="p-4 bg-rose-50/60 rounded-xl border border-rose-200/80">
                <div className="text-xs sm:text-sm font-bold text-rose-900 flex items-center gap-1.5 mb-1.5">
                  <Heart className="w-4 h-4 text-rose-700" />
                  <span>{getUIText(currentLang, 'loveFamily', 'Love & Family')}</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {locPred.love}
                </p>
              </div>
            </div>

            <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200/80">
              <div className="text-xs sm:text-sm font-bold text-emerald-900 flex items-center gap-1.5 mb-1.5">
                <Activity className="w-4 h-4 text-emerald-700" />
                <span>{getUIText(currentLang, 'healthEnergy', 'Health & Vitality')}</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {locPred.health}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'tomorrow' && (
          <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-2">
            <h4 className="text-sm font-bold text-stone-900 font-serif uppercase tracking-wide text-[#9A3412]">
              {currentLang === 'hi' ? 'कल के लिए ग्रह स्थिति व सलाह' : "Tomorrow's Astro Transits"}
            </h4>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              {currentLang === 'hi'
                ? 'कल के ग्रह गोचर आपकी रचनात्मकता और कार्यकुशलता को गति देंगे। महत्वपूर्ण कार्यों को प्रातः अभिजीत मुहूर्त में प्रारंभ करना श्रेयस्कर रहेगा। शाम के समय अनावश्यक बहस से बचें।'
                : 'Planetary alignments tomorrow favor methodical planning, strategic communications, and family harmony. Avoid rash decisions during evening hours. Auspicious tasks should be executed during morning Abhijit Muhurat.'}
            </p>
          </div>
        )}

        {activeTab === 'weekly' && (
          <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-2">
            <h4 className="text-sm font-bold text-stone-900 font-serif uppercase tracking-wide text-[#9A3412]">
              {currentLang === 'hi' ? 'साप्ताहिक विस्तृत भविष्यवाणी' : 'Weekly Planetary Guidance'}
            </h4>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              {locPred.weekly}
            </p>
          </div>
        )}

        {/* Read In-Depth Rashi Link */}
        <div className="pt-2 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            Auspicious Syllables: <strong className="text-stone-700">{activeRashi.syllables.join(', ')}</strong>
          </span>

          <button
            type="button"
            onClick={() => onNavigate(`/rashifal/${activeRashi.rashiId}-rashi`)}
            className="inline-flex items-center gap-1 text-sm font-bold text-[#9A3412] hover:text-[#B91C1C] hover:underline transition-colors"
          >
            <span>{currentLang === 'hi' ? `${activeRashi.nameHi} का सम्पूर्ण राशिफल २०२७ देखें` : `Read Full ${activeRashi.name} Horoscope 2027`}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
