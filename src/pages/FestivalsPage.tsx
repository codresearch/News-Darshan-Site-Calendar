import { useState } from 'react';
import { FESTIVALS_2027 } from '../data/calendarData';
import { FestivalEvent, LanguageCode } from '../types';
import { getUIText, getWeekdayLocalized } from '../data/localization';
import {
  getFestivalName,
  getFestivalSummary,
  getFestivalShubhMuhurat,
  getLocalizedTithiName
} from '../data/localizedFestivalsAndMuhurat';
import Breadcrumbs from '../components/Breadcrumbs';
import AdSlot from '../components/AdSlot';
import ShareButtons from '../components/ShareButtons';
import VratRitualChecklist from '../components/VratRitualChecklist';
import { Sparkles, Calendar, Search, ChevronRight } from 'lucide-react';

interface FestivalsPageProps {
  currentLang?: LanguageCode;
  onNavigate: (path: string) => void;
}

const CATEGORY_TRANSLATIONS: Record<string, Partial<Record<LanguageCode, string>>> = {
  All: { en: 'All', hi: 'सभी', mr: 'सर्व', gu: 'બધા', te: 'అన్నీ', ta: 'அனைத்தும்', kn: 'ಎಲ್ಲಾ', ml: 'എല്ലാം', bn: 'সব', or: 'ସବୁ', pa: 'ਸਾਰੇ', as: 'সকলো' },
  Major: { en: 'Major', hi: 'प्रमुख', mr: 'प्रमुख', gu: 'મુખ્ય', te: 'ప్రధాన', ta: 'முக்கிய', kn: 'ಪ್ರಮುಖ', ml: 'പ്രധാനം', bn: 'প্রধান', or: 'ପ୍ରମୁଖ', pa: 'ਮੁੱਖ', as: 'প্ৰধান' },
  Deity: { en: 'Deity', hi: 'देवता', mr: 'देवता', gu: 'દેવતા', te: 'దేవత', ta: 'தெய்வம்', kn: 'ದೇವತೆ', ml: 'ദൈവം', bn: 'দেবতা', or: 'ଦେବତା', pa: 'ਦੇਵਤਾ', as: 'দেৱতা' },
  Vrat: { en: 'Vrat', hi: 'व्रत', mr: 'व्रत', gu: 'વ્રત', te: 'వ్రతం', ta: 'விரதம்', kn: 'ವ್ರತ', ml: 'വ്രതം', bn: 'ব্রত', or: 'ବ୍ରତ', pa: 'ਵਰਤ', as: 'ব্ৰত' },
  Sankranti: { en: 'Sankranti', hi: 'संक्रांति', mr: 'संक्रांत', gu: 'સંક્રાંતિ', te: 'సంక్రాంతి', ta: 'சங்கராந்தி', kn: 'ಸಂಕ್ರಾಂತಿ', ml: 'സംക്രാന്തി', bn: 'সংক্রান্তি', or: 'ସଂକ୍ରାନ୍ତି', pa: 'ਸੰਕ੍ਰਾਂਤੀ', as: 'সংক্ৰান্তি' }
};

export default function FestivalsPage({ currentLang = 'en', onNavigate }: FestivalsPageProps) {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const rawCategories = ['All', 'Major', 'Deity', 'Vrat', 'Sankranti'];

  const filtered = FESTIVALS_2027.filter((f) => {
    const matchesCat = filterCategory === 'All' || f.category === filterCategory;
    const localizedName = getFestivalName(f, currentLang);
    const matchesSearch =
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      localizedName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (f.nameHi && f.nameHi.includes(searchTerm));
    return matchesCat && matchesSearch;
  });

  const breadcrumbs = [
    { name: getUIText(currentLang, 'home', 'Home'), url: '/' },
    { name: `${getUIText(currentLang, 'festivals', 'Festivals')} 2027`, url: '/festivals/2027/' }
  ];

  return (
    <div className="space-y-8">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      <div className="p-6 sm:p-8 bg-gradient-to-r from-[#FAF1EC] to-[#F5ECE5] rounded-2xl border border-[#E8DCD4]">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#9A3412] mb-1">
          {currentLang === 'mr' ? 'भारतीय सण व धार्मिक उत्सव २०२७' : currentLang === 'hi' ? 'भारतीय त्यौहार एवं धार्मिक पर्व २०२७' : currentLang === 'gu' ? 'ભારતીય તહેવારો અને ધાર્મિક ઉત્સવો ૨૦૨૭' : 'Indian Festivals & Religious Holidays · 2027'}
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-stone-900 font-serif">
          {currentLang === 'mr'
            ? 'हिंदू सण व उत्सव २०२७ (सण, उत्सव व जयंत्या)'
            : currentLang === 'hi'
            ? 'हिन्दू त्यौहार २०२७ (पर्व, उत्सव एवं जयंतियां)'
            : currentLang === 'gu'
            ? 'હિન્દુ તહેવારો ૨૦૨૭ (પર્વ અને ઉત્સવો)'
            : `${getUIText(currentLang, 'festivals', 'Hindu Festivals')} 2027`}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
          {currentLang === 'mr'
            ? '२०२७ मधील सर्व हिंदू सण, उपवास, जयंत्या आणि सणांच्या अचूक तिथी, पूजा मुहूर्त आणि धार्मिक महत्त्व.'
            : currentLang === 'hi'
            ? '२०२७ के सम्पूर्ण हिन्दू त्यौहारों, जयंतियों एवं व्रतों की सूची, प्रामाणिक तिथियां, पूजा मुहूर्त एवं धार्मिक महत्व।'
            : currentLang === 'gu'
            ? '૨૦૨૭ ના તમામ હિન્દુ તહેવારો, વ્રત અને જયંતિઓની યાદી, તિથિ અને શુભ મુહૂર્ત.'
            : 'Comprehensive directory of sacred Hindu festivals, Jayantis, and fasting observances in 2027 with verified tithis, puja timings, and ritual significance.'}
        </p>

        {/* Filter controls */}
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <input
            type="text"
            placeholder={currentLang === 'mr' ? 'सणाचे नाव शोधा (दिवाळी, होळी, गणेशोत्सव)...' : currentLang === 'hi' ? 'त्यौहार का नाम खोजें (उदा. दीपावली, होली, नवरात्रि)...' : currentLang === 'gu' ? 'તહેવાર શોધો (દિવાળી, હોળી)...' : 'Search festival name (e.g., Diwali, Holi, Navratri)...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#9A3412] w-full sm:max-w-xs"
          />

          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/60 rounded-lg">
            {rawCategories.map((cat) => {
              const label = CATEGORY_TRANSLATIONS[cat]?.[currentLang] || CATEGORY_TRANSLATIONS[cat]?.hi || cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    filterCategory === cat
                      ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <AdSlot type="top" />

      {/* Festivals List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((fest) => {
          const localizedName = getFestivalName(fest, currentLang);
          const localizedSummary = getFestivalSummary(fest, currentLang);
          const localizedTithi = getLocalizedTithiName(fest.tithiText, currentLang);
          const localizedDay = getWeekdayLocalized(fest.dayOfWeek2027, currentLang);
          const categoryLabel = CATEGORY_TRANSLATIONS[fest.category]?.[currentLang] || fest.category;

          return (
            <div
              key={fest.id}
              onClick={() => onNavigate(`/festivals/${fest.slug}`)}
              className="p-5 bg-white rounded-xl border border-stone-200 hover:border-[#9A3412] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-mono text-[#9A3412] font-semibold">{fest.date2027} ({localizedDay})</span>
                  <span className="px-2 py-0.5 rounded bg-stone-100 text-[11px] font-medium">{categoryLabel}</span>
                </div>

                <h2 className="text-lg font-bold text-stone-900 group-hover:text-[#9A3412] font-serif mt-1.5 transition-colors">
                  {localizedName} {currentLang !== 'en' && fest.name !== localizedName && <span className="font-normal text-stone-500 text-sm font-sans">({fest.name})</span>}
                </h2>

                <div className="text-xs text-stone-500 mt-1">
                  {getUIText(currentLang, 'tithi', 'Tithi')}: <span className="font-semibold text-stone-700">{localizedTithi}</span>
                </div>

                <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                  {localizedSummary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span>{currentLang === 'mr' ? 'पूजा विधी व मुहूर्त पहा' : currentLang === 'hi' ? 'शुभ पूजा विधि एवं मुहूर्त देखें' : currentLang === 'gu' ? 'પૂજા વિધિ અને મુહૂર્ત જુઓ' : 'Shubh Puja Vidhi & Muhurat'}</span>
                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      <ShareButtons
        title={`${getUIText(currentLang, 'festivals', 'Festivals')} 2027 – NewsDarshan`}
        url="https://www.newsdarshan.in/festivals/2027"
      />

      <AdSlot type="before-footer" />
    </div>
  );
}

export function FestivalDetailPage({
  slug,
  currentLang = 'en',
  onNavigate
}: {
  slug: string;
  currentLang?: LanguageCode;
  onNavigate: (path: string) => void;
}) {
  const fest = FESTIVALS_2027.find((f) => f.slug === slug) || FESTIVALS_2027[0];
  const localizedName = getFestivalName(fest, currentLang);
  const localizedSummary = getFestivalSummary(fest, currentLang);
  const localizedShubhMuhurat = getFestivalShubhMuhurat(fest, currentLang);
  const localizedTithi = getLocalizedTithiName(fest.tithiText, currentLang);

  const breadcrumbs = [
    { name: getUIText(currentLang, 'home', 'Home'), url: '/' },
    { name: getUIText(currentLang, 'festivals', 'Festivals'), url: '/festivals/2027/' },
    { name: localizedName, url: `/festivals/${fest.slug}/` }
  ];

  const localizedDay = getWeekdayLocalized(fest.dayOfWeek2027, currentLang);

  return (
    <div className="space-y-8">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      {/* Festival Header Card */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-[#FAF1EC] to-[#F5ECE5] rounded-2xl border border-[#E8DCD4]">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#9A3412] mb-1">
          {CATEGORY_TRANSLATIONS[fest.category]?.[currentLang] || fest.category} Festival · {getUIText(currentLang, 'hinduCalendar', 'Hindu Calendar 2027')}
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-stone-900 font-serif">
          {localizedName} 2027 {currentLang !== 'en' && fest.name !== localizedName && <span className="font-normal text-stone-500 text-lg font-sans">({fest.name})</span>}
        </h1>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-stone-600">
          <span className="font-semibold text-stone-900">{fest.date2027} ({localizedDay})</span>
          <span>·</span>
          <span>{getUIText(currentLang, 'tithi', 'Tithi')}: {localizedTithi}</span>
          <span>·</span>
          <span>{getUIText(currentLang, 'deity', 'Deity')}: {fest.deity || 'Vedic Tradition'}</span>
        </div>
      </div>

      <AdSlot type="top" />

      {/* Auspicious Muhurat Highlight */}
      {localizedShubhMuhurat && (
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
            {currentLang === 'mr' ? 'शुभ पूजा मुहूर्त २०२७' : currentLang === 'hi' ? 'शुभ पूजा मुहूर्त २०२७' : currentLang === 'gu' ? 'શુભ પૂજા મુહૂર્ત ૨૦૨૭' : 'Shubh Puja Muhurat 2027'}
          </div>
          <div className="text-base font-bold text-emerald-950 mt-1">
            {localizedShubhMuhurat}
          </div>
        </div>
      )}

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Description, Significance, Vidhi */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
            <h2 className="text-lg font-bold text-stone-900 font-serif">
              {currentLang === 'mr' ? `${localizedName} बद्दल माहिती` : currentLang === 'hi' ? `${localizedName} के बारे में` : `About ${localizedName}`}
            </h2>
            <p className="text-sm text-stone-700 leading-relaxed">
              {localizedSummary}
            </p>
          </section>

          <section className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
            <h2 className="text-lg font-bold text-stone-900 font-serif">
              {getUIText(currentLang, 'significance', 'Religious Significance')}
            </h2>
            <p className="text-sm text-stone-700 leading-relaxed">
              {fest.significance}
            </p>
          </section>

          {/* Interactive Fasting & Rituals Checklist Component with LocalStorage */}
          <VratRitualChecklist
            vratId={fest.id || fest.slug}
            vratName={localizedName}
            rituals={fest.rituals}
            deity={fest.deity}
            currentLang={currentLang}
          />

          {fest.pujaVidhi && (
            <section className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
              <h2 className="text-lg font-bold text-stone-900 font-serif">
                {currentLang === 'mr' ? 'पूजा विधी आणि मंत्र' : currentLang === 'hi' ? 'पूजा विधि एवं मन्त्र' : 'Puja Vidhi & Mantra'}
              </h2>
              <p className="text-sm text-stone-700 leading-relaxed font-sans bg-stone-50 p-4 rounded-xl border border-stone-200">
                {fest.pujaVidhi}
              </p>
            </section>
          )}
        </div>

        {/* Right Col: Regional Names, Quick Facts */}
        <div className="space-y-6">
          {fest.nameRegional && Object.keys(fest.nameRegional).length > 0 && (
            <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                {currentLang === 'mr' ? 'भारतातील विविध भाषांतील नावे' : currentLang === 'hi' ? 'भारत के विभिन्न राज्यों में नाम' : 'Regional Names Across India'}
              </h3>
              <div className="space-y-2 text-xs">
                {Object.entries(fest.nameRegional).map(([lang, val]) => (
                  <div key={lang} className="flex items-center justify-between pb-1.5 border-b border-stone-100">
                    <span className="text-stone-500 uppercase font-mono">{lang}</span>
                    <span className="font-semibold text-stone-900 font-serif text-sm">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-[#FAF6F2] p-6 rounded-2xl border border-stone-200 space-y-3 text-xs">
            <h3 className="font-bold text-stone-900 uppercase tracking-wider">
              {currentLang === 'mr' ? 'कॅलेंडर माहिती' : currentLang === 'hi' ? 'कैलेंडर विवरण' : 'Quick Calendar Information'}
            </h3>
            <div className="space-y-1.5 text-stone-600">
              <div>{getUIText(currentLang, 'gregorianDate', 'Gregorian Date')}: <strong className="text-stone-900">{fest.date2027}</strong></div>
              <div>{getUIText(currentLang, 'weekday', 'Weekday')}: <strong className="text-stone-900">{localizedDay}</strong></div>
              <div>{getUIText(currentLang, 'hinduMonthAmavasyantLabel', 'Hindu Month')}: <strong className="text-stone-900">{fest.hinduMonth}</strong></div>
            </div>
          </div>

          <AdSlot type="sidebar" />
        </div>
      </div>

      <ShareButtons
        title={`${localizedName} 2027 – Date, Muhurat & Puja Vidhi`}
        url={`https://www.newsdarshan.in/festivals/${fest.slug}`}
      />

      <AdSlot type="before-footer" />
    </div>
  );
}

