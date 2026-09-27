import { useState } from 'react';
import { FAMOUS_TEMPLES, TempleInfo } from '../data/templesData';
import { LanguageCode } from '../types';
import { getUIText } from '../data/localization';
import Breadcrumbs from '../components/Breadcrumbs';
import AdSlot from '../components/AdSlot';
import ShareButtons from '../components/ShareButtons';
import {
  Landmark,
  Clock,
  MapPin,
  Sparkles,
  ShieldCheck,
  Calendar,
  ChevronLeft,
  BookOpen,
  ChevronRight,
  Star,
  CheckCircle2,
  HelpCircle,
  Sun,
  Moon,
  ExternalLink,
  ArrowRight
} from 'lucide-react';

interface TempleDetailPageProps {
  templeId: string;
  currentLang?: LanguageCode;
  onNavigate: (path: string) => void;
}

export default function TempleDetailPage({
  templeId,
  currentLang = 'en',
  onNavigate
}: TempleDetailPageProps) {
  const isMarathi = currentLang === 'mr';
  const isHindi = currentLang === 'hi';
  const isGujarati = currentLang === 'gu';
  const isIndic = isMarathi || isHindi || isGujarati;

  const temple: TempleInfo | undefined = FAMOUS_TEMPLES.find((t) => t.id === templeId);

  // Fallback if temple not found
  if (!temple) {
    return (
      <div className="py-16 text-center space-y-6 bg-white rounded-3xl border border-stone-200 p-8 shadow-xs">
        <Landmark className="w-16 h-16 text-amber-700 mx-auto opacity-75" />
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif">
          {isMarathi ? 'मंदिर सापडले नाही' : isHindi ? 'मंदिर नहीं मिला' : 'Temple Not Found'}
        </h1>
        <p className="text-stone-600 max-w-md mx-auto text-sm">
          {isMarathi
            ? 'आपण शोधत असलेले मंदिर अस्तित्वात नाही किंवा त्याचा URL बदलला आहे.'
            : isHindi
            ? 'आप जिस मंदिर की खोज कर रहे हैं वह मौजूद नहीं है या उसका लिंक बदल गया है।'
            : 'The temple you are looking for does not exist or may have been moved.'}
        </p>
        <button
          onClick={() => onNavigate('/temples')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#9A3412] hover:bg-[#802B0F] text-white rounded-xl font-bold text-sm transition-colors shadow-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{isMarathi ? 'सर्व मंदिरे पहा' : isHindi ? 'सभी मंदिर देखें' : 'View All Temples'}</span>
        </button>
      </div>
    );
  }

  // Related temples (same category or foreign)
  const relatedTemples = FAMOUS_TEMPLES.filter(
    (t) => t.id !== temple.id && (t.region === temple.region || t.category === temple.category)
  ).slice(0, 3);

  const breadcrumbs = [
    { name: getUIText(currentLang, 'home', 'Home'), url: '/' },
    { name: getUIText(currentLang, 'temples', 'Famous Temples & Darshan'), url: '/temples/' },
    { name: isIndic && temple.nameHi ? temple.nameHi : temple.name, url: `/temples/${temple.id}/` }
  ];

  // Common FAQ items for Google rich snippets accordion
  const faqItems = [
    {
      q: `What are the daily Darshan opening and closing timings at ${temple.name}?`,
      qHi: `${temple.nameHi || temple.name} के खुलने और बंद होने का समय क्या है?`,
      a: `General Darshan at ${temple.name} (${temple.city}) is conducted in two sessions: Morning from ${temple.morningOpen} to ${temple.morningClose}, and Evening from ${temple.eveningOpen} to ${temple.eveningClose}. Timings may be extended during auspicious festivals and solar/lunar eclipses.`,
      aHi: `${temple.nameHi} में दर्शन प्रातः ${temple.morningOpen} से ${temple.morningClose} तक तथा सायंकाल ${temple.eveningOpen} से ${temple.eveningClose} तक सुलभ होते हैं।`
    },
    {
      q: `What is the Aarti timetable at ${temple.name}?`,
      qHi: `${temple.nameHi} में आरती का क्या समय है?`,
      a: `${temple.name} conducts ${temple.aartis.length} primary daily Aartis: ${temple.aartis.map(a => `${a.name} (${a.time})`).join(', ')}. Devotees can participate in community singing and receive sacred charnamrit.`,
      aHi: `मंदिर में मुख्य रूप से ${temple.aartis.map(a => `${a.nameHi} (${a.time})`).join(', ')} संपन्न होती है।`
    },
    {
      q: `What is the dress code and visitor guidelines for ${temple.name}?`,
      qHi: `${temple.nameHi} में प्रवेश हेतु पोशाक नियम (Dress Code) क्या है?`,
      a: temple.dressCode,
      aHi: temple.dressCodeHi
    },
    {
      q: `Which deity is worshipped and what is the spiritual significance of ${temple.name}?`,
      qHi: `${temple.nameHi} के मुख्य आराध्य देव कौन हैं और इसका क्या पौराणिक महत्व है?`,
      a: `${temple.deity} is the presiding deity of ${temple.name}. ${temple.significance}`,
      aHi: `${temple.deityHi} मुख्य आराध्य देव हैं। ${temple.significanceHi}`
    },
    {
      q: `What is the best time to visit ${temple.name} and what sacred Prasad is distributed?`,
      qHi: `${temple.nameHi} दर्शन हेतु सबसे उत्तम समय और प्रसाद क्या है?`,
      a: `The best time to visit is ${temple.bestTimeToVisit}. Blessed prasadam includes ${temple.prasadam}.`,
      aHi: `भ्रमण हेतु उत्तम समय: ${temple.bestTimeToVisit}। मुख्य प्रसाद: ${temple.prasadam}।`
    }
  ];

  const pageUrl = typeof window !== 'undefined' ? window.location.href : `https://www.newsdarshan.in/temples/${temple.id}`;

  return (
    <div className="space-y-8 sm:space-y-12 max-w-5xl mx-auto">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      {/* Hero Header */}
      <section className="p-6 sm:p-10 bg-gradient-to-br from-[#FFFDF9] via-[#FAF3EC] to-[#F5ECE3] rounded-3xl border-2 border-[#E6C88A] shadow-md relative overflow-hidden">
        {/* Subtle Watermark */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 text-amber-900/5 pointer-events-none select-none text-9xl font-serif flex items-center justify-center">
          ॐ
        </div>

        <div className="relative z-10">
          {/* Top Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#9A3412] bg-white/90 px-3 py-1 rounded-full border border-amber-300 shadow-2xs">
              {temple.region === 'international' ? (
                <>
                  <span>🌍</span>
                  <span>{temple.country || 'International Shrine'}</span>
                </>
              ) : temple.category === 'jyotirlinga' ? (
                <>
                  <span>🕉️</span>
                  <span>{isMarathi ? '१२ ज्योतिर्लिंग' : isHindi ? 'द्वादश ज्योतिर्लिंग' : '12 Jyotirlinga'}</span>
                </>
              ) : temple.category === 'shaktipeeth' ? (
                <>
                  <span>🔱</span>
                  <span>{isMarathi ? 'महाशक्तीपीठ' : isHindi ? 'महाशक्तिपीठ' : 'Maha Shaktipeeth'}</span>
                </>
              ) : (
                <>
                  <span>🪷</span>
                  <span>{isMarathi ? 'पावन तीर्थ धाम' : isHindi ? 'पावन तीर्थ' : 'Holy Pilgrimage Shrine'}</span>
                </>
              )}
            </span>

            {temple.liveDarshanAvailable && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{isMarathi ? 'लाईव्ह दर्शन उपलब्ध' : isHindi ? 'लाइव दर्शन उपलब्ध' : 'Live Darshan / Trust Stream'}</span>
              </span>
            )}
          </div>

          {/* Temple Main Name & Hindi Name */}
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-serif leading-tight">
            {isIndic ? temple.nameHi : temple.name}
          </h1>

          {isIndic && temple.name !== temple.nameHi && (
            <div className="text-sm sm:text-base text-stone-600 font-serif mt-1 font-medium">
              {temple.name}
            </div>
          )}

          {!isIndic && temple.nameHi && (
            <div className="text-base sm:text-lg text-amber-900 font-serif mt-1 font-bold">
              {temple.nameHi}
            </div>
          )}

          {/* Location & Deity Subheader */}
          <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-stone-700">
            <div className="flex items-center gap-1.5 font-semibold">
              <MapPin className="w-4 h-4 text-[#9A3412] shrink-0" />
              <span>
                {temple.city}, {temple.state}
                {temple.country ? `, ${temple.country}` : ', India'}
              </span>
            </div>

            <span className="text-stone-300 hidden sm:inline">•</span>

            <div className="flex items-center gap-1.5 font-semibold bg-white/70 px-3 py-1 rounded-lg border border-amber-200">
              <span className="text-stone-500">{isMarathi ? 'आराध्य देवता:' : isHindi ? 'मुख्य आराध्य:' : 'Presiding Deity:'}</span>
              <strong className="text-stone-900">{isIndic ? temple.deityHi : temple.deity}</strong>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="mt-5 pt-4 border-t border-amber-200/80 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-stone-500 font-medium">
              Verified Pilgrimage Guide · Daily Aarti & Darshan Schedule
            </div>
            <ShareButtons title={`${temple.name} – Darshan Hours & Aarti Timings`} url={pageUrl} />
          </div>
        </div>
      </section>

      {/* Quick Darshan Hours Snapshot Box */}
      <section className="bg-white rounded-3xl border-2 border-stone-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-base sm:text-lg font-bold text-stone-900 font-serif mb-4">
          <Clock className="w-5 h-5 text-[#9A3412]" />
          <h2>{getUIText(currentLang, 'templeOpenClose', 'Daily Temple Darshan Timetable')}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Morning Session */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/40 border border-amber-200 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center shrink-0 shadow-2xs">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                {isMarathi ? 'सकाळचे दर्शन सत्र' : isHindi ? 'प्रातः दर्शन सत्र' : 'Morning Darshan Session'}
              </span>
              <strong className="text-xl sm:text-2xl font-black text-stone-950 font-serif tabular-nums block mt-1">
                {temple.morningOpen} – {temple.morningClose}
              </strong>
              <span className="text-xs text-stone-600 mt-1 block">
                {isMarathi ? 'मंगला आरती व अभिषेक समाविष्ट' : isHindi ? 'मंगला आरती व अभिषेक समय सम्मिलित' : 'Includes morning Mangala & Abhishek rites'}
              </span>
            </div>
          </div>

          {/* Evening Session */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50/40 border border-indigo-200 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider block">
                {isMarathi ? 'संध्याकाळचे दर्शन सत्र' : isHindi ? 'सायं दर्शन सत्र' : 'Evening Darshan Session'}
              </span>
              <strong className="text-xl sm:text-2xl font-black text-stone-950 font-serif tabular-nums block mt-1">
                {temple.eveningOpen} – {temple.eveningClose}
              </strong>
              <span className="text-xs text-stone-600 mt-1 block">
                {isMarathi ? 'संध्या महाआरती व शयन आरती' : isHindi ? 'संध्या महाआरती व शयन आरती' : 'Includes Sandhya & Shayan Aarti before closure'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Full Aarti & Ritual Schedule */}
      <section className="bg-white rounded-3xl border-2 border-stone-200 overflow-hidden shadow-sm">
        <div className="px-6 py-4.5 bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 border-b-2 border-amber-500 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-base sm:text-xl font-bold text-white font-serif tracking-wide">
              {isMarathi ? `${temple.nameHi || temple.name} दैनिक आरती वेळापत्रक` : isHindi ? `${temple.nameHi || temple.name} दैनिक आरती सारणी` : `${temple.name} Daily Aarti Timetable`}
            </h2>
          </div>
          <span className="text-xs font-bold bg-amber-400 text-stone-950 px-3 py-1 rounded-full font-mono">
            {temple.aartis.length} Aartis
          </span>
        </div>

        <div className="divide-y divide-stone-200">
          {temple.aartis.map((aarti, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 hover:bg-amber-50/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-[#9A3412] text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <h3 className="font-bold text-base sm:text-lg text-stone-950 font-serif">
                    {isIndic ? aarti.nameHi : aarti.name}
                  </h3>
                  {isIndic && aarti.name !== aarti.nameHi && (
                    <span className="text-xs text-stone-500 font-normal">({aarti.name})</span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-stone-600 pl-8 leading-relaxed">
                  {aarti.description}
                </p>
              </div>

              <div className="pl-8 sm:pl-0 shrink-0">
                <span className="inline-block px-3.5 py-1.5 bg-amber-100 text-amber-950 font-bold rounded-xl text-xs sm:text-sm tabular-nums border border-amber-300 shadow-2xs">
                  {aarti.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <AdSlot type="top" />

      {/* Dress Code & Sacred Guidelines */}
      <section className="bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-blue-50/70 rounded-3xl border-2 border-blue-200 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-base sm:text-lg font-bold text-blue-950 font-serif mb-2">
          <ShieldCheck className="w-5 h-5 text-blue-700" />
          <h2>{getUIText(currentLang, 'dressCode', 'Dress Code & Visitor Guidelines')}</h2>
        </div>
        <p className="text-sm sm:text-base text-stone-800 leading-relaxed pt-1">
          {isIndic ? temple.dressCodeHi : temple.dressCode}
        </p>

        <div className="mt-4 pt-4 border-t border-blue-200/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <strong className="text-stone-900 block font-semibold">
                {isMarathi ? 'सर्वोत्तम भेट काळ:' : isHindi ? 'दर्शन हेतु उत्तम समय:' : 'Best Time to Visit:'}
              </strong>
              <span className="text-stone-600">{temple.bestTimeToVisit}</span>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <strong className="text-stone-900 block font-semibold">
                {isMarathi ? 'पवित्र प्रसाद:' : isHindi ? 'पावन प्रसाद:' : 'Sacred Prasadam:'}
              </strong>
              <span className="text-stone-600">{temple.prasadam}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Historical & Puranic Significance */}
      <section className="bg-white rounded-3xl border-2 border-stone-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-base sm:text-lg font-bold text-stone-900 font-serif">
          <BookOpen className="w-5 h-5 text-[#9A3412]" />
          <h2>
            {isMarathi ? 'पौराणिक, धार्मिक व ऐतिहासिक महत्त्व' : isHindi ? 'पौराणिक, धार्मिक एवं ऐतिहासिक महत्व' : 'Historical & Puranic Significance'}
          </h2>
        </div>

        <div className="prose prose-stone max-w-none text-sm sm:text-base text-stone-700 leading-relaxed space-y-3">
          <p>{temple.significance}</p>
          {temple.significanceHi && (
            <p className="font-serif text-stone-800 bg-amber-50/50 p-4 rounded-2xl border border-amber-200">
              {temple.significanceHi}
            </p>
          )}
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) with Schema Accordion */}
      <section className="bg-white rounded-3xl border-2 border-stone-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-base sm:text-lg font-bold text-stone-900 font-serif">
          <HelpCircle className="w-5 h-5 text-[#9A3412]" />
          <h2>
            {isMarathi ? 'वारंवार विचारले जाणारे प्रश्न (FAQ)' : isHindi ? 'अक्सर पूछे जाने वाले प्रश्न (FAQ)' : 'Frequently Asked Questions (FAQ)'}
          </h2>
        </div>

        <div className="space-y-3">
          {faqItems.map((item, idx) => (
            <details
              key={idx}
              className="group border border-stone-200 rounded-2xl overflow-hidden bg-stone-50 open:bg-white transition-colors"
            >
              <summary className="p-4 font-bold text-sm sm:text-base text-stone-900 cursor-pointer list-none flex items-center justify-between gap-3 group-hover:text-[#9A3412]">
                <span>{isIndic ? item.qHi : item.q}</span>
                <span className="transition-transform group-open:rotate-180 text-stone-400 shrink-0">▼</span>
              </summary>
              <div className="p-4 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100">
                {isIndic ? item.aHi : item.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Related Temples */}
      {relatedTemples.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
              {isMarathi ? 'संबंधित प्रसिद्ध मंदिरे' : isHindi ? 'संबंधित प्रमुख मंदिर' : 'Explore Other Revered Temples'}
            </h2>
            <button
              onClick={() => onNavigate('/temples')}
              className="text-xs sm:text-sm font-bold text-[#9A3412] hover:underline inline-flex items-center gap-1"
            >
              <span>{isMarathi ? 'सर्व मंदिरे' : isHindi ? 'सभी मंदिर देखें' : 'View All'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedTemples.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onNavigate(`/temples/${rel.id}`)}
                className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-[#9A3412] transition-all cursor-pointer group shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-[#9A3412] uppercase tracking-wider bg-[#FAF1EC] px-2 py-0.5 rounded">
                    {rel.region === 'international' ? (rel.country || 'Foreign') : rel.category}
                  </span>
                  <h3 className="font-bold text-base text-stone-900 font-serif mt-2 group-hover:text-[#9A3412] transition-colors">
                    {isIndic ? rel.nameHi : rel.name}
                  </h3>
                  <div className="text-xs text-stone-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span>{rel.city}, {rel.country ? rel.country : rel.state}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-[#9A3412]">
                  <span>{rel.morningOpen} – {rel.morningClose}</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Back to All Temples Button */}
      <div className="text-center pt-4">
        <button
          onClick={() => onNavigate('/temples')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-2xl font-bold text-sm transition-all shadow-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{isMarathi ? 'सर्व हिंदू मंदिरांची यादी पहा' : isHindi ? 'सभी हिन्दू मंदिरों की संपूर्ण सूची' : 'Back to All Hindu Temples Directory'}</span>
        </button>
      </div>
    </div>
  );
}
