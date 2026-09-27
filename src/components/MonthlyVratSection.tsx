import { useState } from 'react';
import { LanguageCode } from '../types';
import { MONTH_NAMES, MONTH_DISPLAY_NAMES } from '../utils/seoEngine';
import { VratDetail, getVratsForMonth, MONTHLY_VRATS_2027 } from '../data/vratEngine';
import VratRitualChecklist from './VratRitualChecklist';
import {
  Calendar,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Clock,
  BookOpen,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Download,
  ShieldCheck,
  HelpCircle,
  Flame,
  Moon,
  Sun,
  AlertCircle
} from 'lucide-react';

interface MonthlyVratSectionProps {
  initialMonthIndex?: number;
  year?: string;
  currentLang?: LanguageCode;
  onNavigate?: (path: string) => void;
  className?: string;
}

export default function MonthlyVratSection({
  initialMonthIndex = 0,
  year = '2027',
  currentLang = 'en',
  onNavigate,
  className = ''
}: MonthlyVratSectionProps) {
  const [selectedMonth, setSelectedMonth] = useState<number>(initialMonthIndex);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ekadashi' | 'purnima' | 'special'>('all');
  const [expandedVratId, setExpandedVratId] = useState<string | null>(null);
  const [copiedMantraId, setCopiedMantraId] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const isMarathi = currentLang === 'mr';
  const isHindi = currentLang === 'hi';
  const isGujarati = currentLang === 'gu';

  // Month Vrats
  const allMonthVrats = getVratsForMonth(selectedMonth);

  // Filtered by category
  const filteredVrats = allMonthVrats.filter((v) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'ekadashi') return v.category === 'ekadashi';
    if (selectedCategory === 'purnima') return v.category === 'purnima' || v.category === 'amavasya';
    if (selectedCategory === 'special') return v.category === 'special' || v.category === 'chaturthi';
    return true;
  });

  const toggleExpand = (id: string) => {
    setExpandedVratId(expandedVratId === id ? null : id);
  };

  const handleCopyMantra = (id: string, text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedMantraId(id);
      setTimeout(() => setCopiedMantraId(null), 2500);
    }
  };

  const handleDownloadICS = (vrat: VratDetail) => {
    const cleanDate = vrat.gregorianDate.replace(/-/g, '');
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//NewsDarshan Vedic Calendar//EN',
      'BEGIN:VEVENT',
      `UID:${vrat.id}@newsdarshan.in`,
      `DTSTAMP:${cleanDate}T000000Z`,
      `DTSTART;VALUE=DATE:${cleanDate}`,
      `SUMMARY:${vrat.name} - Vedic Vrat`,
      `DESCRIPTION:${vrat.significance.replace(/\n/g, ' ')} Parana Time: ${vrat.paranaTime || 'Morning'}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${vrat.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const currentMonthDisplayName = MONTH_DISPLAY_NAMES[MONTH_NAMES[selectedMonth]];

  const faqs = [
    {
      q: isMarathi
        ? 'एकादशी पारण वेळेचे (Parana Timing) महत्त्व काय आहे?'
        : 'Why is observing the exact Ekadashi Parana timing so critical in Shastras?',
      a: isMarathi
        ? 'पारण म्हणजे उपवास सोडणे. शास्त्रानुसार (निर्णय सिंधू), सूर्योदयानंतर आणि द्वादशी तिथी संपण्यापूर्वी पारण करणे अनिवार्य आहे. तसेच हरी वासर (द्वादशीचा पहिला चतुर्थांश) काळात पारण वर्ज्य आहे. योग्य वेळेत पारण न केल्यास उपवासाचे फळ निष्फळ ठरते.'
        : 'Parana signifies breaking the fast on the morning of Dwadashi. According to the Nirnaya Sindhu and Padma Purana, failure to break the fast within the Dwadashi Muhurat window or breaking it during Hari Vasara (the first quarter of Dwadashi) nullifies the spiritual merits of the austerity.'
    },
    {
      q: isMarathi
        ? 'निर्जला व फलाहार उपवासामध्ये काय फरक आहे?'
        : 'What is the scriptural distinction between Nirjala and Phalahari fasting?',
      a: isMarathi
        ? 'निर्जला उपवासात २४ तास अन्नाचा किंवा पाण्याचा एकही थेंब घेतला जात नाही (उदा. निर्जला एकादशी, करवा चौथ). तर फलाहार उपवासात सात्त्विक फळे, गायीचे दूध, मखाना, साबुदाणा व शेंदेलोण (Rock Salt) घेण्याची अनुमती असते.'
        : 'Nirjala fasting is the highest austerity where not even a drop of water is consumed for 24 continuous hours. Phalahari fasting permits pure Satvik foods such as seasonal fruits, cow milk, makhana (fox nuts), and rock salt (Sendha Namak), avoiding all grains and sea salt.'
    },
    {
      q: isMarathi
        ? 'उपवासादरम्यान चुकून अन्न सेवन झाल्यास काय प्रायश्चित्त करावे?'
        : 'What expiation (Prayashchitta) is prescribed if a fast is accidentally broken?',
      a: isMarathi
        ? 'चुकून काही खाल्ले गेल्यास तत्काळ स्नान करून सूर्याला अर्घ्य द्यावे, १०८ वेळा गायत्री मंत्र किंवा विष्णू सहस्रनामाचा जप करावा आणि ब्राह्मण किंवा गरजू व्यक्तीला फळे व दक्षिणा दान करावी.'
        : 'If a fast is broken inadvertently due to forgetfulness, the devotee should immediately bathe, offer water libation to Surya Dev, chant the Gayatri Mantra 108 times, and make a charitable offering (Daana) of fruits or grain to a deserving recipient.'
    }
  ];

  return (
    <section className={`bg-white rounded-3xl border border-stone-200/90 shadow-xs overflow-hidden ${className}`}>
      {/* Header Banner */}
      <div className="p-6 sm:p-8 bg-gradient-to-br from-[#FAF1EC] via-[#FAF5F0] to-[#F5ECE5] border-b border-[#E8DCD4]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 border border-amber-300 text-xs font-bold text-[#9A3412] mb-3 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isMarathi ? 'वैदिक उपवास व पारण मार्गदर्शिका' : isHindi ? 'वैदिक व्रत एवं पारण निर्देशिका' : 'Vedic Fasting & Ritual Guide'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 font-serif leading-tight">
              {isMarathi
                ? `${currentMonthDisplayName} ${year} मधील प्रमुख व्रते व उपवास`
                : isHindi
                ? `${currentMonthDisplayName} ${year} के प्रमुख व्रत एवं पारण नियम`
                : `Upcoming Vrats & Fasting Rituals in ${currentMonthDisplayName} ${year}`}
            </h2>

            <p className="text-stone-600 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
              {isMarathi
                ? 'निर्णय सिंधू व धर्म सिंधू शास्त्रानुसार प्रत्येक उपवासाचे महत्त्व, संकल्प मंत्र, पूजा विधी, पारण वेळा आणि आहार नियम.'
                : isHindi
                ? 'निर्णय सिंधु एवं धर्म सिंधु के अनुसार प्रत्येक व्रत का आध्यात्मिक महात्म्य, संकल्प मंत्र, षोडशोपचार पूजा, पारण समय एवं फलाहार नियम।'
                : 'Scriptural fasting rules, exact next-morning Parana timings, Sanskrit Sankalpa mantras, and Shastric diet protocols verified against Nirnaya Sindhu and Surya Siddhanta.'}
            </p>
          </div>

          {/* E-E-A-T Certified Badge */}
          <div className="bg-white/90 p-4 rounded-2xl border border-amber-200 shadow-2xs max-w-xs shrink-0 flex items-start gap-3">
            <ShieldCheck className="w-7 h-7 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-stone-900">
                {isMarathi ? 'शास्त्रशुद्ध पंचांग प्रमाणीकरण' : 'Vedic Shastric Authority'}
              </div>
              <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                {isMarathi
                  ? 'पद्म पुराण, भविष्य पुराण आणि सूर्य सिद्धांत खगोलीय गणितानुसार प्रमाणित.'
                  : 'Grounded in Padma Purana, Bhavishya Purana, and topocentric planetary ephemeris.'}
              </p>
            </div>
          </div>
        </div>

        {/* 12 Months Pill Navigator */}
        <div className="mt-6 pt-5 border-t border-stone-200/80">
          <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
            {isMarathi ? 'महिना निवडा (Select Month):' : 'Select Month:'}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
            {MONTH_NAMES.map((m, idx) => {
              const isSelected = idx === selectedMonth;
              const countInMonth = getVratsForMonth(idx).length;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => setSelectedMonth(idx)}
                  className={`px-3.5 py-2 rounded-xl text-xs whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 border ${
                    isSelected
                      ? 'bg-[#9A3412] text-white border-[#9A3412] font-bold shadow-xs scale-102'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-amber-400 hover:bg-amber-50/50 font-medium'
                  }`}
                >
                  <span>{MONTH_DISPLAY_NAMES[m]}</span>
                  {countInMonth > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isSelected ? 'bg-amber-200 text-stone-900 font-bold' : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {countInMonth}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="px-6 py-4 bg-stone-50 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              selectedCategory === 'all'
                ? 'bg-stone-900 text-white shadow-2xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            {isMarathi ? 'सर्व व्रते' : 'All Vrats'} ({allMonthVrats.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('ekadashi')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              selectedCategory === 'ekadashi'
                ? 'bg-[#9A3412] text-white shadow-2xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            {isMarathi ? 'एकादशी' : 'Ekadashi'}
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('purnima')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              selectedCategory === 'purnima'
                ? 'bg-[#9A3412] text-white shadow-2xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            {isMarathi ? 'पौर्णिमा व अमावास्या' : 'Purnima / Amavasya'}
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('special')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              selectedCategory === 'special'
                ? 'bg-[#9A3412] text-white shadow-2xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            {isMarathi ? 'विशेष सण व नवरात्र' : 'Special & Navratri'}
          </button>
        </div>

        <div className="text-xs text-stone-500 font-medium">
          {filteredVrats.length} {isMarathi ? 'उपवास उपलब्ध' : 'Vrats Scheduled'}
        </div>
      </div>

      {/* Vrats List */}
      <div className="p-6 sm:p-8 space-y-5">
        {filteredVrats.length > 0 ? (
          filteredVrats.map((vrat) => {
            const isExpanded = expandedVratId === vrat.id;
            const isCopied = copiedMantraId === vrat.id;
            const isNirjala = vrat.fastingType.includes('Nirjala');

            return (
              <div
                key={vrat.id}
                className="rounded-2xl border border-stone-200/90 bg-white overflow-hidden shadow-2xs hover:border-amber-300 transition-all"
              >
                {/* Card Header Section */}
                <div className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-stone-50/50">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                        {vrat.tithiText}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold ${
                          isNirjala
                            ? 'bg-rose-100 text-rose-900 border border-rose-200'
                            : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                        }`}
                      >
                        {vrat.fastingType}
                      </span>
                      <span className="text-[11px] text-stone-500 font-mono">
                        {vrat.deity}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-stone-900 font-serif">
                      {isMarathi && vrat.nameRegional?.mr ? vrat.nameRegional.mr : isHindi ? vrat.nameHi : vrat.name}
                      {isMarathi && vrat.nameRegional?.mr && (
                        <span className="text-xs font-normal text-stone-500 ml-2 font-sans">
                          ({vrat.name})
                        </span>
                      )}
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-3xl">
                      {vrat.significance}
                    </p>
                  </div>

                  {/* Date & Muhurat Box */}
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-2 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-stone-200">
                    <div className="text-left md:text-right">
                      <div className="text-base font-extrabold text-[#9A3412] font-mono">
                        {vrat.gregorianDate}
                      </div>
                      <div className="text-xs text-stone-500 font-medium">
                        {vrat.dayOfWeek}
                      </div>
                    </div>

                    {vrat.paranaTime && (
                      <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                        <Clock className="w-3 h-3 text-emerald-600" />
                        <span>{isMarathi ? 'पारण:' : 'Parana:'} {vrat.paranaTime}</span>
                      </div>
                    )}

                    {vrat.moonriseTime && (
                      <div className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
                        <Moon className="w-3 h-3 text-indigo-600" />
                        <span>{isMarathi ? 'चंद्रोदय:' : 'Moonrise:'} {vrat.moonriseTime}</span>
                      </div>
                    )}

                    {/* Expand/Collapse Toggle Button */}
                    <button
                      type="button"
                      onClick={() => toggleExpand(vrat.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF1EC] hover:bg-[#F5ECE5] text-[#9A3412] text-xs font-bold rounded-xl transition-colors border border-[#E8DCD4]"
                    >
                      <span>{isExpanded ? (isMarathi ? 'तपशील बंद करा' : 'Hide Rituals') : (isMarathi ? 'पूजा विधी व मंत्र' : 'View Rituals & Vidhi')}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* EXPANDABLE ACCORDION: RITUALS, SANKALPA & DIETARY RULES */}
                {isExpanded && (
                  <div className="p-5 sm:p-7 border-t border-stone-200 bg-white space-y-6">
                    {/* Scriptural Authority Reference */}
                    <div className="flex items-center gap-2 p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900">
                      <BookOpen className="w-4 h-4 text-amber-700 shrink-0" />
                      <div>
                        <strong>{isMarathi ? 'शास्त्र संदर्भ (Scripture):' : 'Scriptural Reference:'}</strong> {vrat.scripturalReference}
                      </div>
                    </div>

                    {/* Sankalpa Mantra Section with Copy Button */}
                    <div className="bg-[#FAF6F2] p-4 sm:p-5 rounded-2xl border border-stone-200/90 relative">
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <div className="text-xs font-bold text-[#9A3412] uppercase tracking-wider flex items-center gap-1.5">
                          <Flame className="w-3.5 h-3.5 text-[#9A3412]" />
                          <span>{isMarathi ? 'प्रातः संकल्प मंत्र (Vrat Sankalpa Mantra)' : 'Morning Vrat Sankalpa Mantra'}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopyMantra(vrat.id, vrat.sankalpaMantra.sanskrit)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-white border border-stone-300 rounded-lg text-stone-700 hover:bg-stone-50 transition-colors"
                          title="Copy Sanskrit Mantra"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-700 font-bold">{isMarathi ? 'कॉपी झाले!' : 'Copied!'}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 text-stone-500" />
                              <span>{isMarathi ? 'मंत्र कॉपी करा' : 'Copy Mantra'}</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="font-serif text-sm sm:text-base font-bold text-stone-900 bg-white p-3 rounded-xl border border-amber-200/70 leading-relaxed tracking-wide">
                        {vrat.sankalpaMantra.sanskrit}
                      </div>

                      <div className="text-xs text-stone-500 font-mono italic mt-2">
                        {vrat.sankalpaMantra.transliteration}
                      </div>

                      <div className="text-xs sm:text-sm text-stone-700 mt-2 font-medium">
                        <strong>{isMarathi ? 'अर्थ:' : 'Meaning:'}</strong> {vrat.sankalpaMantra.meaning}
                      </div>
                    </div>

                    {/* Interactive Rituals Checklist Tracker with LocalStorage */}
                    <VratRitualChecklist
                      vratId={vrat.id}
                      vratName={vrat.name}
                      rituals={vrat.rituals}
                      paranaTime={vrat.paranaTime}
                      deity={vrat.deity}
                      currentLang={currentLang}
                    />

                    {/* Step-by-Step Rituals Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Step-by-Step Rituals */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold text-stone-900 font-serif flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#9A3412]" />
                          <span>{isMarathi ? 'क्रमशः पूजा विधी व नियम (Rituals)' : 'Step-by-Step Rituals & Observance'}</span>
                        </h4>

                        <ol className="space-y-2 text-xs sm:text-sm text-stone-700">
                          {vrat.rituals.map((r, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <span className="w-5 h-5 rounded-full bg-stone-100 border border-stone-300 text-stone-700 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                {i + 1}
                              </span>
                              <span className="leading-relaxed">{r}</span>
                            </li>
                          ))}
                        </ol>

                        <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 leading-relaxed">
                          <strong>{isMarathi ? 'विधी सारांश:' : 'Puja Vidhi Overview:'}</strong> {vrat.pujaVidhi}
                        </div>
                      </div>

                      {/* Dietary Rules (Aahar Niyama): Allowed vs Prohibited */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold text-stone-900 font-serif flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-600" />
                          <span>{isMarathi ? 'उपवास आहार नियम (Dietary Guidelines)' : 'Dietary Guidelines (Aahar Niyama)'}</span>
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* Recommended Foods */}
                          <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>{isMarathi ? 'अनुमत फलाहार (Allowed)' : 'Permitted Foods'}</span>
                            </div>
                            <ul className="text-xs text-stone-700 space-y-1">
                              {vrat.dietaryRules.allowed.map((item, i) => (
                                <li key={i} className="flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Strictly Prohibited Foods */}
                          <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-200 space-y-2">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900">
                              <XCircle className="w-4 h-4 text-rose-600" />
                              <span>{isMarathi ? 'वर्ज्य अन्न (Prohibited)' : 'Strictly Prohibited'}</span>
                            </div>
                            <ul className="text-xs text-stone-700 space-y-1">
                              {vrat.dietaryRules.prohibited.map((item, i) => (
                                <li key={i} className="flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Parana Rule Reminder Callout */}
                        {vrat.paranaTime && (
                          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                            <div>
                              <strong>{isMarathi ? 'पारण वेळ नियम:' : 'Parana Rule:'}</strong> {isMarathi ? 'दुसऱ्या दिवशी सकाळी ' : 'On Dwadashi morning between '} <strong>{vrat.paranaTime}</strong> {isMarathi ? 'या वेळेतच उपवास सोडावा. हरी वासर संपल्यावर पारण करणे अत्यंत फलदायी ठरते.' : 'break your fast. Avoid Hari Vasara to preserve full spiritual merits.'}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Action Footer for this Vrat */}
                    <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <button
                        type="button"
                        onClick={() => handleDownloadICS(vrat)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-xl transition-colors"
                      >
                        <Download className="w-3.5 h-3.5 text-stone-600" />
                        <span>{isMarathi ? 'कॅलेंडरमध्ये जोडा (.ICS)' : 'Add to Calendar Reminder'}</span>
                      </button>

                      {onNavigate && (
                        <button
                          type="button"
                          onClick={() => onNavigate(`/panchang/2027/${MONTH_NAMES[selectedMonth]}/${parseInt(vrat.gregorianDate.split('-')[2], 10)}`)}
                          className="text-[#9A3412] font-bold hover:underline"
                        >
                          {isMarathi ? 'या दिवसाचे संपूर्ण पंचांग पहा →' : 'View Full Panchang for this Day →'}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center text-sm text-stone-500 bg-stone-50 rounded-2xl border border-dashed border-stone-300">
            {isMarathi
              ? 'या श्रेणीत या महिन्यात कोणतेही विशेष उपवास नाहीत. इतर श्रेणी निवडा.'
              : 'No specific vrats listed for this category in this month. Switch to "All Vrats" or explore neighboring months.'}
          </div>
        )}
      </div>

      {/* Authoritative E-E-A-T FAQ & Science of Fasting Accordion */}
      <div className="p-6 sm:p-8 bg-[#FAF6F2] border-t border-stone-200 space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#9A3412]" />
          <h3 className="text-lg font-bold text-stone-900 font-serif">
            {isMarathi ? 'उपवास व पारण नियमावली: वारंवार विचारले जाणारे प्रश्न' : 'Vedic Fasting & Parana Protocol: Frequently Asked Questions'}
          </h3>
        </div>

        <div className="divide-y divide-stone-200/80 bg-white rounded-2xl border border-stone-200 overflow-hidden">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div key={idx} className="p-4 sm:p-5">
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full text-left flex items-center justify-between gap-4 font-bold text-stone-900 text-sm"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-stone-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-stone-500 shrink-0" />}
                </button>
                {isOpen && (
                  <p className="text-xs sm:text-sm text-stone-600 mt-2.5 leading-relaxed pt-2 border-t border-stone-100">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
