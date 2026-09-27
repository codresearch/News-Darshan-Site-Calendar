import React from 'react';
import { MUHURATS_2027 } from '../data/calendarData';
import { MuhuratCategory, LanguageCode } from '../types';
import { getUIText, getWeekdayLocalized } from '../data/localization';
import {
  getMuhuratTitle,
  getMuhuratSubtitle,
  getMuhuratDescription,
  getMuhuratRules,
  getLocalizedTithiName,
  getLocalizedNakshatraName,
  getLocalizedTimeWindow
} from '../data/localizedFestivalsAndMuhurat';
import Breadcrumbs from '../components/Breadcrumbs';
import AdSlot from '../components/AdSlot';
import ShareButtons from '../components/ShareButtons';
import { Calendar, ChevronRight, CheckCircle2, ShieldCheck, Heart, Home, Car, Building, Baby, Store } from 'lucide-react';

interface MuhuratPageProps {
  categorySlug?: string;
  currentLang?: LanguageCode;
  onNavigate: (path: string) => void;
}

export default function MuhuratPage({ categorySlug, currentLang = 'en', onNavigate }: MuhuratPageProps) {
  const currentCategory = categorySlug
    ? MUHURATS_2027.find((m) => m.slug === categorySlug)
    : null;

  const currentCategoryTitle = currentCategory
    ? getMuhuratTitle(currentCategory.id, currentLang)
    : '';

  const currentCategoryDesc = currentCategory
    ? getMuhuratDescription(currentCategory.id, currentLang)
    : '';

  const currentCategoryRules = currentCategory
    ? getMuhuratRules(currentCategory.id, currentLang)
    : [];

  const breadcrumbs = currentCategory
    ? [
        { name: getUIText(currentLang, 'home', 'Home'), url: '/' },
        { name: getUIText(currentLang, 'muhurat', 'Shubh Muhurat'), url: '/muhurat/' },
        { name: currentCategoryTitle, url: `/${currentCategory.slug}/` }
      ]
    : [
        { name: getUIText(currentLang, 'home', 'Home'), url: '/' },
        { name: `${getUIText(currentLang, 'muhurat', 'Shubh Muhurat')} 2027`, url: '/muhurat/' }
      ];

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'marriage':
        return <Heart className="w-5 h-5 text-rose-600" />;
      case 'griha-pravesh':
        return <Home className="w-5 h-5 text-amber-600" />;
      case 'vehicle-purchase':
        return <Car className="w-5 h-5 text-blue-600" />;
      case 'property-purchase':
        return <Building className="w-5 h-5 text-emerald-600" />;
      case 'namkaran':
        return <Baby className="w-5 h-5 text-purple-600" />;
      case 'business-opening':
        return <Store className="w-5 h-5 text-indigo-600" />;
      default:
        return <Calendar className="w-5 h-5 text-[#9A3412]" />;
    }
  };

  // If specific category is selected
  if (currentCategory) {
    return (
      <div className="space-y-8">
        <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

        <div className="p-6 sm:p-8 bg-gradient-to-r from-[#FAF1EC] to-[#F5ECE5] rounded-2xl border border-[#E8DCD4]">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#9A3412] mb-1">
            {currentLang === 'mr' ? 'वैदिक ज्योतिष मुहूर्त · २०२७' : currentLang === 'hi' ? 'वैदिक ज्योतिष शुभ मुहूर्त · २०२७' : currentLang === 'gu' ? 'વૈદિક જ્યોતિષ શુભ મુહૂર્ત · ૨૦૨૭' : 'Vedic Astrological Timings · 2027'}
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-stone-900 font-serif">
            {currentCategoryTitle}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
            {currentCategoryDesc}
          </p>
        </div>

        <AdSlot type="top" />

        {/* Dates Table */}
        <div className="bg-white rounded-3xl border-2 border-stone-300 overflow-hidden shadow-md">
          <div className="px-6 py-4.5 bg-gradient-to-r from-stone-950 via-slate-900 to-stone-950 border-b-2 border-amber-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="text-base sm:text-lg font-bold text-white font-serif tracking-wide">
              {getUIText(currentLang, 'datesSchedule', 'Auspicious Dates Schedule (2027)')}
            </h2>
            <span className="text-xs font-mono font-bold text-slate-950 bg-amber-400 px-3 py-1 rounded-full border border-amber-300 shadow-xs self-start sm:self-auto">
              {currentCategory.dates2027.length} {getUIText(currentLang, 'verifiedDates', 'Verified Dates')}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-900 text-amber-300 uppercase font-black text-[11px] tracking-wider border-b border-stone-700">
                <tr>
                  <th className="px-4 py-3.5">{getUIText(currentLang, 'gregorianDate', 'Gregorian Date')}</th>
                  <th className="px-4 py-3.5">{getUIText(currentLang, 'weekday', 'Weekday')}</th>
                  <th className="px-4 py-3.5">{getUIText(currentLang, 'tithi', 'Tithi')}</th>
                  <th className="px-4 py-3.5">{getUIText(currentLang, 'nakshatra', 'Nakshatra')}</th>
                  <th className="px-4 py-3.5">{getUIText(currentLang, 'auspiciousWindow', 'Auspicious Time Window')}</th>
                  <th className="px-4 py-3.5 text-right">{getUIText(currentLang, 'auspiciousScore', 'Auspicious Score')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {currentCategory.dates2027.map((d, idx) => {
                  const localizedDay = getWeekdayLocalized(d.dayOfWeek, currentLang);
                  const localizedTithi = getLocalizedTithiName(d.tithi, currentLang);
                  const localizedNakshatra = getLocalizedNakshatraName(d.nakshatra, currentLang);
                  const localizedTime = getLocalizedTimeWindow(d.timeWindow, currentLang);

                  return (
                    <tr key={idx} className={`transition-colors ${idx % 2 === 0 ? 'bg-white hover:bg-amber-50/50' : 'bg-stone-50/90 hover:bg-amber-50/50'}`}>
                      <td className="px-4 py-3.5 font-mono font-bold text-stone-950 whitespace-nowrap">
                        <span className="bg-stone-100 px-2.5 py-1 rounded-lg border border-stone-300">
                          {d.date}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-stone-900 font-bold whitespace-nowrap">
                        {localizedDay}
                      </td>
                      <td className="px-4 py-3.5 text-stone-950 font-serif font-bold text-sm">
                        {localizedTithi}
                      </td>
                      <td className="px-4 py-3.5 text-stone-800 font-medium">
                        {localizedNakshatra}
                      </td>
                      <td className="px-4 py-3.5 font-mono font-bold text-stone-950 whitespace-nowrap">
                        <span className="bg-amber-100 text-amber-950 px-2.5 py-1 rounded-lg border border-amber-300">
                          ⏱ {localizedTime}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <span className="px-3 py-1 rounded-full bg-emerald-700 text-white font-black text-xs shadow-xs">
                          ★ {d.auspiciousScore}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Astrological Rules Section */}
        <section className="bg-white p-6 rounded-2xl border border-stone-200 space-y-4">
          <h2 className="text-lg font-bold text-stone-900 font-serif flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#9A3412]" />
            <span>{currentLang === 'mr' ? 'महत्त्वाचे ज्योतिषीय नियम व विधी' : currentLang === 'hi' ? 'महत्वपूर्ण ज्योतिषीय नियम एवं विधि' : currentLang === 'gu' ? 'મહત્વપૂર્ણ જ્યોતિષીય નિયમો અને વિધિ' : 'Important Astrological Rules & Vidhi'}</span>
          </h2>
          <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
            {currentCategoryRules.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Other Muhurats Navigator */}
        <section className="p-6 bg-[#FAF6F2] rounded-2xl border border-stone-200 space-y-3">
          <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
            {currentLang === 'mr' ? 'इतर २०२७ शुभ मुहूर्त श्रेणी पहा' : currentLang === 'hi' ? 'अन्य २०२७ शुभ मुहूर्त श्रेणियां देखें' : currentLang === 'gu' ? 'અન્ય ૨૦૨૭ શુભ મુહૂર્ત શ્રેણીઓ જુઓ' : 'Explore Other 2027 Shubh Muhurat Categories'}
          </h2>
          <div className="flex flex-wrap gap-2 text-xs">
            {MUHURATS_2027.filter((m) => m.slug !== categorySlug).map((m) => {
              const localizedTitle = getMuhuratTitle(m.id, currentLang);
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => onNavigate(`/${m.slug}`)}
                  className="px-3 py-1.5 bg-white text-stone-800 border border-stone-300 rounded-lg hover:bg-stone-50 font-medium"
                >
                  {localizedTitle}
                </button>
              );
            })}
          </div>
        </section>

        <ShareButtons
          title={`${currentCategoryTitle} – NewsDarshan`}
          url={`https://www.newsdarshan.in/${currentCategory.slug}`}
        />

        <AdSlot type="before-footer" />
      </div>
    );
  }

  // Muhurat Hub Overview Page
  return (
    <div className="space-y-8">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      <div className="p-6 sm:p-8 bg-gradient-to-r from-[#FAF1EC] to-[#F5ECE5] rounded-2xl border border-[#E8DCD4]">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#9A3412] mb-1">
          {currentLang === 'mr' ? 'शुभ वेळ व कालगणना · २०२७' : currentLang === 'hi' ? 'शुभ काल एवं मुहूर्त गणना · २०२७' : currentLang === 'gu' ? 'શુભ કાળ અને મુહૂર્ત ગણતરી · ૨૦૨૭' : 'Auspicious Timings · Vedic Shubh Muhurat 2027'}
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-stone-900 font-serif">
          {getUIText(currentLang, 'muhurat', 'Shubh Muhurat')} 2027
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
          {currentLang === 'mr'
            ? 'विवाह, गृह प्रवेश, वाहन खरेदी, मालमत्ता खरेदी, नामकरण आणि नवीन व्यवसाय सुरू करण्यासाठी २०२७ मधील प्रमाणित शुभ तारखा आणि मुहूर्त.'
            : currentLang === 'hi'
            ? 'विवाह, गृह प्रवेश, वाहन क्रय, संपत्ति रजिस्ट्री, नामकरण एवं नए व्यापार शुभारंभ हेतु २०२७ की प्रामाणिक शुभ तिथियां एवं मुहूर्त।'
            : currentLang === 'gu'
            ? 'વિવાહ, ગૃહ પ્રવેશ, વાહન ખરીદી, મિલકત ખરીદી, નામકરણ અને નવા વેપાર શરૂ કરવા માટે ૨૦૨૭ ની પ્રામાણિક શુભ તારીખો.'
            : 'Select an auspicious event category below to view verified Vedic dates for Marriage (Vivah), Griha Pravesh (Housewarming), Vehicle Purchase, Property Registration, Namkaran, and Business Inauguration in 2027.'}
        </p>
      </div>

      <AdSlot type="top" />

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {MUHURATS_2027.map((m) => {
          const title = getMuhuratTitle(m.id, currentLang);
          const subtitle = getMuhuratSubtitle(m.id, currentLang);
          const desc = getMuhuratDescription(m.id, currentLang);

          return (
            <div
              key={m.id}
              onClick={() => onNavigate(`/${m.slug}`)}
              className="p-6 bg-white rounded-2xl border border-stone-200 hover:border-[#9A3412] hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center mb-3 group-hover:bg-[#FAF1EC] transition-colors">
                  {getCategoryIcon(m.id)}
                </div>

                <h2 className="text-lg font-bold text-stone-900 group-hover:text-[#9A3412] font-serif transition-colors">
                  {title}
                </h2>

                <p className="text-xs text-stone-500 mt-1">
                  {subtitle}
                </p>

                <div className="mt-4 text-xs text-stone-600 leading-relaxed line-clamp-2">
                  {desc}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span className="font-semibold text-stone-800">
                  {m.dates2027.length} {getUIText(currentLang, 'verifiedDates', 'Verified Dates')}
                </span>
                <span className="text-[#9A3412] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  {currentLang === 'mr' ? 'तारखा पहा →' : currentLang === 'hi' ? 'तिथियां देखें →' : currentLang === 'gu' ? 'તારીખો જુઓ →' : 'View Dates →'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <ShareButtons
        title={`${getUIText(currentLang, 'muhurat', 'Shubh Muhurat')} 2027 – NewsDarshan`}
        url="https://www.newsdarshan.in/muhurat"
      />

      <AdSlot type="before-footer" />
    </div>
  );
}

