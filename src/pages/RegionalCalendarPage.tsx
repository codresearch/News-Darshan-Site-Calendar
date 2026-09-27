import React, { useState } from 'react';
import { RegionalCalendarKey, LanguageCode } from '../types';
import { REGIONAL_CALENDARS_INFO, getUIText, getWeekdayLocalized } from '../data/localization';
import { MONTH_NAMES, MONTH_DISPLAY_NAMES } from '../utils/seoEngine';
import { FESTIVALS_2027, EKADASHI_2027, PURNIMA_2027, AMAVASYA_2027 } from '../data/calendarData';
import { getPanchangForDate } from '../data/panchangEngine';
import {
  normalizeRegionKey,
  REGIONAL_WEEKDAYS,
  REGIONAL_MONTH_MAPPINGS,
  getRegionalTithiDisplay,
  getRegionalDigits
} from '../data/regionalCalendarEngine';
import {
  getFestivalName,
  getLocalizedNakshatraName
} from '../data/localizedFestivalsAndMuhurat';
import Breadcrumbs from '../components/Breadcrumbs';
import AdSlot from '../components/AdSlot';
import ShareButtons from '../components/ShareButtons';
import MonthlyVratSection from '../components/MonthlyVratSection';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Grid,
  List,
  Sun,
  Moon,
  Clock,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Star
} from 'lucide-react';

interface RegionalCalendarPageProps {
  regionKey: RegionalCalendarKey | string;
  month?: string;
  year?: string;
  currentLang?: LanguageCode;
  onNavigate: (path: string) => void;
}

export default function RegionalCalendarPage({
  regionKey: rawRegionKey,
  month: initialMonth,
  year = '2027',
  currentLang = 'en',
  onNavigate
}: RegionalCalendarPageProps) {
  const normKey = normalizeRegionKey(rawRegionKey);
  const regInfo = REGIONAL_CALENDARS_INFO[normKey] || REGIONAL_CALENDARS_INFO.marathi;
  const yearNum = parseInt(year, 10) || 2027;

  // Selected Month State (defaults to prop month, or current month or January)
  const initialMonthIndex = initialMonth ? MONTH_NAMES.indexOf(initialMonth.toLowerCase()) : -1;
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(
    initialMonthIndex !== -1 ? initialMonthIndex : new Date().getMonth()
  );

  // View Mode: 'grid' (Wall Calendar) or 'table' (Detailed Date List)
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const currentMonthKey = MONTH_NAMES[selectedMonthIndex];
  const mDisplay = MONTH_DISPLAY_NAMES[currentMonthKey];
  const monthDetails = REGIONAL_MONTH_MAPPINGS[normKey] || REGIONAL_MONTH_MAPPINGS.marathi;
  const currentMonthDetail = monthDetails[selectedMonthIndex];

  // Calendar Math
  const daysInMonth = new Date(yearNum, selectedMonthIndex + 1, 0).getDate();
  const firstDayOfWeek = new Date(yearNum, selectedMonthIndex, 1).getDay(); // 0 = Sun

  const prevMonthIndex = selectedMonthIndex === 0 ? 11 : selectedMonthIndex - 1;
  const nextMonthIndex = selectedMonthIndex === 11 ? 0 : selectedMonthIndex + 1;
  const prevMonthKey = MONTH_NAMES[prevMonthIndex];
  const nextMonthKey = MONTH_NAMES[nextMonthIndex];

  // Weekdays for this regional calendar
  const weekdays = REGIONAL_WEEKDAYS[normKey] || REGIONAL_WEEKDAYS.marathi;

  // Month Festivals
  const monthFestivals = FESTIVALS_2027.filter((f) => {
    const parts = f.date2027.split('-');
    return parseInt(parts[0], 10) === yearNum && parseInt(parts[1], 10) === selectedMonthIndex + 1;
  });

  const isMarathi = normKey === 'marathi' || currentLang === 'mr';
  const isGujarati = normKey === 'gujarati' || currentLang === 'gu';
  const isTelugu = normKey === 'telugu' || currentLang === 'te';
  const isTamil = normKey === 'tamil' || currentLang === 'ta';
  const isKannada = normKey === 'kannada' || currentLang === 'kn';
  const isBengali = normKey === 'bengali' || currentLang === 'bn';

  const handleMonthChange = (idx: number) => {
    setSelectedMonthIndex(idx);
    const targetKey = MONTH_NAMES[idx];
    // Update URL shallowly or via onNavigate
    window.history.pushState({}, '', `/${normKey}-calendar-${year}/${targetKey}`);
  };

  const breadcrumbs = [
    { name: getUIText(currentLang, 'home', 'Home'), url: '/' },
    { name: `${regInfo.name} ${year}`, url: `/${normKey}-calendar-${year}/` },
    { name: `${mDisplay} (${currentMonthDetail.regionalMasaNative})`, url: `/${normKey}-calendar-${year}/${currentMonthKey}/` }
  ];

  return (
    <div className="space-y-8 sm:space-y-10">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      {/* Regional Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#FFFDF9] via-[#FAF3EC] to-[#F5ECE3] border-2 border-[#E6C88A] p-6 sm:p-8 shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-amber-300 text-xs font-bold text-[#9A3412] mb-2.5 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {regInfo.eraName} · {regInfo.system} System
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 font-serif leading-tight">
              {regInfo.nativeName} {year}
            </h1>

            <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              {mDisplay} {year} · <strong className="text-stone-900">{currentMonthDetail.regionalMasaNative}</strong> ({currentMonthDetail.regionalMasaEn}). {regInfo.description}
            </p>
          </div>

          {/* Quick Month Control Widget */}
          <div className="flex flex-col sm:flex-row items-center gap-3 bg-white/95 p-3 sm:p-4 rounded-2xl border border-stone-200/90 shadow-2xs shrink-0">
            <button
              type="button"
              onClick={() => handleMonthChange(prevMonthIndex)}
              className="flex items-center gap-1 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl transition-colors w-full sm:w-auto justify-center"
              title="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{MONTH_DISPLAY_NAMES[prevMonthKey]}</span>
            </button>

            <div className="text-center px-2">
              <div className="text-sm font-extrabold text-[#9A3412] font-serif">
                {mDisplay} {year}
              </div>
              <div className="text-[11px] font-bold text-stone-500">
                {currentMonthDetail.regionalMasaNative}
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleMonthChange(nextMonthIndex)}
              className="flex items-center gap-1 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl transition-colors w-full sm:w-auto justify-center"
              title="Next Month"
            >
              <span>{MONTH_DISPLAY_NAMES[nextMonthKey]}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 12-Month Quick Tab Navigator */}
        <div className="mt-6 pt-5 border-t border-[#E8DCD4]">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
            {isMarathi ? '१२ महिन्यांची दिनदर्शिका (महिना निवडा):' : isGujarati ? '૧૨ મહિનાનું પંચાંગ (મહિનો પસંદ કરો):' : isTelugu ? '12 నెలల క్యాలెండర్ (నెల ఎంచుకోండి):' : 'Select Month (12 Months Calendar):'}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
            {MONTH_NAMES.map((m, idx) => {
              const isSelected = idx === selectedMonthIndex;
              const detail = monthDetails[idx];
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => handleMonthChange(idx)}
                  className={`px-3 py-2 rounded-xl text-xs whitespace-nowrap transition-all flex flex-col items-center shrink-0 border ${
                    isSelected
                      ? 'bg-[#9A3412] text-white border-[#9A3412] font-extrabold shadow-xs scale-102'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-amber-400 hover:bg-amber-50/50'
                  }`}
                >
                  <span className="font-bold text-xs">{MONTH_DISPLAY_NAMES[m]}</span>
                  <span className={`text-[10px] mt-0.5 ${isSelected ? 'text-amber-200' : 'text-stone-500 font-medium'}`}>
                    {detail.regionalMasaNative.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <AdSlot type="top" />

      {/* Main Calendar Card with Grid & Table Views */}
      <section className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
        {/* Calendar Header Bar with View Toggle */}
        <div className="p-4 sm:p-6 bg-stone-50 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-[#9A3412] uppercase tracking-wider">
              {regInfo.name} · {year}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif mt-0.5">
              {mDisplay} {year} – {currentMonthDetail.regionalMasaNative} ({currentMonthDetail.regionalMasaEn})
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              {isMarathi
                ? 'दैनिक तिथी, नक्षत्र, सण, एकादशी व शुभ मुहूर्त जाणून घेण्यासाठी कोणत्याही तारखेवर क्लिक करा.'
                : isGujarati
                ? 'દૈનિક તિથિ, નક્ષત્ર, તહેવાર અને શુભ મુહૂર્ત જોવા માટે કોઈપણ તારીખ પર ક્લિક કરો.'
                : isTelugu
                ? 'రోజువారీ తిథి, నక్షత్రం, పండుగలు మరియు శుభ ముహూర్తాల కోసం ఏదైనా తేదీపై క్లిక్ చేయండి.'
                : 'Click on any calendar date to inspect full daily astronomical Panchang and Choghadiya.'}
            </p>
          </div>

          {/* View Mode Toggle: Grid vs Table */}
          <div className="flex items-center gap-1.5 bg-stone-200/70 p-1 rounded-xl self-start sm:self-auto shrink-0">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>{isMarathi ? 'दिनदर्शिका ग्रिड' : 'Calendar Grid'}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                viewMode === 'table'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>{isMarathi ? 'तारीख सूची' : 'Date Table'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Swipe Hint */}
        {viewMode === 'grid' && (
          <div className="sm:hidden px-3 py-2 bg-amber-50/90 border-b border-amber-200/80 text-[11px] text-amber-950 flex items-center justify-between">
            <span className="font-medium">👉 Swipe sideways to view all 7 days</span>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className="font-bold underline text-[#9A3412] ml-2 shrink-0"
            >
              {isMarathi ? 'तारीख सूची पहा' : 'Switch to Date Table'}
            </button>
          </div>
        )}

        {/* VIEW 1: INTERACTIVE CALENDAR DATE GRID (Wall Calendar Style) */}
        {viewMode === 'grid' && (
          <div className="overflow-x-auto scrollbar-thin">
            <div className="min-w-[620px] sm:min-w-full">
              {/* Weekday Headers in Native Script & English */}
              <div className="grid grid-cols-7 border-b border-stone-200 bg-stone-100/80 text-center py-2.5 sm:py-3 text-xs font-bold">
                {weekdays.map((w, idx) => (
                  <div
                    key={w.en}
                    className={`px-1 ${idx === 0 ? 'text-red-700 font-black' : idx === 6 ? 'text-stone-900 font-bold' : 'text-stone-700 font-bold'}`}
                  >
                    <span>{w.native}</span>
                    <span className="text-[11px] font-normal text-stone-500 ml-1">
                      ({w.short})
                    </span>
                  </div>
                ))}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 divide-x divide-y divide-stone-200/80">
                {/* Preceding empty cells */}
                {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="min-h-[85px] sm:min-h-[115px] p-2 bg-stone-50/40 opacity-40 select-none"
                  />
                ))}

                {/* Day Cells (1 to daysInMonth) */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const dayNum = i + 1;
                  const nativeDayNum = getRegionalDigits(dayNum, normKey);
                  const dateObj = new Date(yearNum, selectedMonthIndex, dayNum);
                  const dayOfWeekIdx = dateObj.getDay();
                  const panchang = getPanchangForDate(dateObj, 'delhi');

                  const dateStr = `${yearNum}-${(selectedMonthIndex + 1).toString().padStart(2, '0')}-${dayNum.toString().padStart(2, '0')}`;
                  const festival = FESTIVALS_2027.find((f) => f.date2027 === dateStr);

                  const tithiDisplay = getRegionalTithiDisplay(
                    panchang.tithi.name,
                    panchang.tithi.paksha,
                    normKey
                  );

                  const isSunday = dayOfWeekIdx === 0;
                  const isEkadashi = panchang.tithi.name === 'Ekadashi';
                  const isPurnima = panchang.tithi.name === 'Purnima';
                  const isAmavasya = panchang.tithi.name === 'Amavasya';

                  const localizedNakshatra = getLocalizedNakshatraName(panchang.nakshatra.name, regInfo.language);

                  return (
                    <div
                      key={dayNum}
                      onClick={() => onNavigate(`/panchang/${yearNum}/${currentMonthKey}/${dayNum}`)}
                      className={`min-h-[85px] sm:min-h-[115px] p-2 sm:p-2.5 flex flex-col justify-between transition-all cursor-pointer group hover:bg-amber-50/60 ${
                        festival
                          ? 'bg-gradient-to-br from-[#FAF1EC]/60 to-[#F5ECE5]/40 hover:bg-amber-100/50'
                          : isPurnima || isAmavasya
                          ? 'bg-amber-50/40'
                          : isEkadashi
                          ? 'bg-emerald-50/40'
                          : isSunday
                          ? 'bg-rose-50/20'
                          : 'bg-white'
                      }`}
                    >
                      <div>
                        {/* Top Row: Day Number in Latin & Indic script & Paksha indicator */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-baseline gap-1">
                            <span
                              className={`text-base sm:text-xl font-black font-serif transition-colors leading-none ${
                                isSunday
                                  ? 'text-red-700 group-hover:text-red-900'
                                  : 'text-stone-900 group-hover:text-[#9A3412]'
                              }`}
                            >
                              {dayNum}
                            </span>
                            {nativeDayNum !== String(dayNum) && (
                              <span className="text-xs sm:text-sm font-bold text-amber-900/80 font-serif leading-none">
                                ({nativeDayNum})
                              </span>
                            )}
                          </div>

                          <span
                            className={`text-[10px] font-bold px-1 py-0.5 rounded leading-none ${
                              panchang.tithi.paksha === 'Shukla'
                                ? 'bg-amber-100 text-amber-900 border border-amber-200'
                                : 'bg-stone-200 text-stone-800'
                            }`}
                          >
                            {tithiDisplay.short}
                          </span>
                        </div>

                        {/* Tithi Full Name */}
                        <div className="text-[11px] sm:text-xs font-bold text-stone-800 mt-1 line-clamp-2 leading-tight break-words">
                          {tithiDisplay.full}
                        </div>

                        {/* Nakshatra */}
                        <div className="text-[10px] text-stone-500 line-clamp-1 mt-0.5">
                          {localizedNakshatra}
                        </div>
                      </div>

                      {/* Bottom Badges: Festival / Ekadashi / Purnima */}
                      <div className="mt-1 space-y-0.5">
                        {festival && (
                          <div className="text-[10px] sm:text-[11px] font-extrabold text-[#9A3412] bg-rose-100/90 text-rose-950 px-1.5 py-0.5 rounded border border-rose-300 leading-tight line-clamp-2 break-words flex items-center gap-0.5">
                            <Star className="w-2.5 h-2.5 shrink-0 fill-current text-rose-600" />
                            <span>
                              {getFestivalName(festival, regInfo.language)}
                            </span>
                          </div>
                        )}

                        {!festival && tithiDisplay.badge && (
                          <div
                            className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded leading-tight line-clamp-2 break-words ${
                              isEkadashi
                                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                : isPurnima
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : 'bg-stone-200 text-stone-800 border border-stone-300'
                            }`}
                          >
                            ★ {tithiDisplay.badge}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: DETAILED CALENDAR DATES TABLE (Complete Date List) */}
        {viewMode === 'table' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-stone-100 border-b border-stone-200 text-stone-700 font-bold uppercase text-[11px] tracking-wider">
                  <th className="py-3 px-4">
                    {normKey === 'marathi' ? 'दिनांक व वार' : normKey === 'gujarati' ? 'તારીખ અને વાર' : normKey === 'odia' ? 'ତାରିଖ ଓ ବାର' : normKey === 'bengali' ? 'তারিখ ও বার' : normKey === 'telugu' ? 'తేదీ & వారం' : normKey === 'tamil' ? 'தேதி & நாள்' : normKey === 'kannada' ? 'ದಿನಾಂಕ & ವಾರ' : normKey === 'malayalam' ? 'തീയതിയും ദിവസവും' : 'Date & Day'}
                  </th>
                  <th className="py-3 px-4">
                    {normKey === 'marathi' ? 'स्थानिक तिथी व पक्ष' : normKey === 'gujarati' ? 'સ્થાનિક તિથિ અને પક્ષ' : normKey === 'odia' ? 'ସ୍ଥାନୀୟ ତିଥି ଓ ପକ୍ଷ' : normKey === 'bengali' ? 'স্থানীয় তিথি ও পক্ষ' : normKey === 'telugu' ? 'ప్రాంతీయ తిథి & పక్షం' : normKey === 'tamil' ? 'திதி & பட்சம்' : normKey === 'kannada' ? 'ಸ್ಥಳೀಯ ತಿಥಿ & ಪಕ್ಷ' : normKey === 'malayalam' ? 'പ്രാദേശിക തിഥിയും പക്ഷവും' : 'Regional Tithi & Paksha'}
                  </th>
                  <th className="py-3 px-4">
                    {normKey === 'marathi' ? 'नक्षत्र' : normKey === 'gujarati' ? 'નક્ષત્ર' : normKey === 'odia' ? 'ନକ୍ଷତ୍ର' : normKey === 'bengali' ? 'নক্ষত্র' : normKey === 'telugu' ? 'నక్షత్రం' : normKey === 'tamil' ? 'நட்சத்திரம்' : normKey === 'kannada' ? 'ನಕ್ಷತ್ರ' : normKey === 'malayalam' ? 'നക്ഷത്രം' : 'Nakshatra'}
                  </th>
                  <th className="py-3 px-4">
                    {normKey === 'marathi' ? 'सूर्योदय / सूर्यास्त' : normKey === 'gujarati' ? 'સૂર્યોદય / સૂર્યાસ્ત' : normKey === 'odia' ? 'ସୂର୍ଯ୍ୟୋଦୟ / ସୂର୍ଯ୍ୟାସ୍ତ' : normKey === 'bengali' ? 'সূর্যোদয় / সূর্যাস্ত' : normKey === 'telugu' ? 'సూర్యోదయం / సూర్యాస్తమయం' : normKey === 'tamil' ? 'சூரியோதயம் / சூரிய அஸ்தமனம்' : normKey === 'kannada' ? 'ಸೂರ್ಯೋದಯ / ಸೂರ್ಯಾಸ್ತ' : normKey === 'malayalam' ? 'സൂര്യോദയം / സൂര്യാസ്തമയം' : 'Sunrise / Sunset'}
                  </th>
                  <th className="py-3 px-4">
                    {normKey === 'marathi' ? 'सण व उपवास' : normKey === 'gujarati' ? 'તહેવાર અને વ્રત' : normKey === 'odia' ? 'ପର୍ବ ଓ ବ୍ରତ' : normKey === 'bengali' ? 'উৎসব ও ব্রত' : normKey === 'telugu' ? 'పండుగలు & వ్రతాలు' : normKey === 'tamil' ? 'திருவிழா & விரதம்' : normKey === 'kannada' ? 'ಹಬ್ಬಗಳು & ವ್ರತಗಳು' : normKey === 'malayalam' ? 'ഉത്സവങ്ങളും വ്രതങ്ങളും' : 'Festival / Vrat'}
                  </th>
                  <th className="py-3 px-4 text-right">
                    {normKey === 'marathi' ? 'पंचांग' : normKey === 'gujarati' ? 'પંચાંગ' : normKey === 'odia' ? 'ପଞ୍ଜିକା' : normKey === 'bengali' ? 'পঞ্জিকা' : normKey === 'telugu' ? 'పంచాంగం' : normKey === 'tamil' ? 'பஞ்சாங்கம்' : normKey === 'kannada' ? 'ಪಂಚಾಂಗ' : normKey === 'malayalam' ? 'പഞ്ചാംഗം' : 'Panchang'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const dayNum = i + 1;
                  const nativeDayNum = getRegionalDigits(dayNum, normKey);
                  const dateObj = new Date(yearNum, selectedMonthIndex, dayNum);
                  const dayOfWeekIdx = dateObj.getDay();
                  const panchang = getPanchangForDate(dateObj, 'delhi');
                  const weekdayInfo = weekdays[dayOfWeekIdx];

                  const dateStr = `${yearNum}-${(selectedMonthIndex + 1).toString().padStart(2, '0')}-${dayNum.toString().padStart(2, '0')}`;
                  const festival = FESTIVALS_2027.find((f) => f.date2027 === dateStr);
                  const tithiDisplay = getRegionalTithiDisplay(
                    panchang.tithi.name,
                    panchang.tithi.paksha,
                    normKey
                  );

                  const isSunday = dayOfWeekIdx === 0;
                  const localizedNakshatra = getLocalizedNakshatraName(panchang.nakshatra.name, regInfo.language);

                  return (
                    <tr
                      key={dayNum}
                      className={`hover:bg-amber-50/40 transition-colors ${
                        festival ? 'bg-amber-50/20' : isSunday ? 'bg-rose-50/10' : ''
                      }`}
                    >
                      {/* Date & Day */}
                      <td className="py-3 px-4 font-medium text-stone-900 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-8 h-8 flex flex-col items-center justify-center rounded-lg font-bold font-serif text-xs leading-none ${
                              isSunday
                                ? 'bg-red-100 text-red-800'
                                : 'bg-stone-100 text-stone-900'
                            }`}
                          >
                            <span>{dayNum}</span>
                            {nativeDayNum !== String(dayNum) && (
                              <span className="text-[10px] opacity-80">{nativeDayNum}</span>
                            )}
                          </span>
                          <div>
                            <div className="font-bold text-stone-900">
                              {dayNum} {mDisplay} {year}
                            </div>
                            <div className="text-[11px] text-stone-500 font-medium">
                              {weekdayInfo.native} ({weekdayInfo.en})
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Tithi & Paksha */}
                      <td className="py-3 px-4">
                        <div className="font-bold text-stone-900">
                          {tithiDisplay.full}
                        </div>
                        <div className="text-[11px] text-stone-500">
                          {currentMonthDetail.regionalMasaNative}
                        </div>
                      </td>

                      {/* Nakshatra */}
                      <td className="py-3 px-4 text-stone-700">
                        {localizedNakshatra}
                      </td>

                      {/* Sunrise / Sunset */}
                      <td className="py-3 px-4 font-mono text-xs text-stone-600 whitespace-nowrap">
                        <div>🌅 {panchang.sunrise}</div>
                        <div>🌇 {panchang.sunset}</div>
                      </td>

                      {/* Festival */}
                      <td className="py-3 px-4">
                        {festival ? (
                          <span className="inline-flex items-center gap-1 font-bold text-[#9A3412] bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md text-xs">
                            ★ {getFestivalName(festival, regInfo.language)}
                          </span>
                        ) : tithiDisplay.badge ? (
                          <span className="inline-flex items-center gap-1 font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md text-xs">
                            {tithiDisplay.badge}
                          </span>
                        ) : (
                          <span className="text-stone-400 text-xs">—</span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => onNavigate(`/panchang/${yearNum}/${currentMonthKey}/${dayNum}`)}
                          className="px-2.5 py-1 text-xs font-bold text-[#9A3412] hover:bg-[#FAF1EC] border border-[#E8DCD4] rounded-lg transition-colors inline-flex items-center gap-1"
                        >
                          <span>{normKey === 'marathi' ? 'पंचांग' : normKey === 'gujarati' ? 'પંચાંગ' : normKey === 'odia' ? 'ପଞ୍ଜିକା' : normKey === 'bengali' ? 'পঞ্জিকা' : normKey === 'telugu' ? 'పంచాంగం' : normKey === 'tamil' ? 'பஞ்சாங்கம்' : normKey === 'kannada' ? 'ಪಂಚಾಂಗ' : normKey === 'malayalam' ? 'പഞ്ചാംഗം' : 'Panchang'}</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Festivals and Observances of This Month */}
      <section className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="p-6 bg-stone-50 border-b border-stone-200">
          <div className="text-xs font-bold text-[#9A3412] uppercase tracking-wider mb-0.5">
            {regInfo.name} · {mDisplay} {year}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
            {isMarathi
              ? `${mDisplay} ${year} मधील प्रमुख सण व उत्सव`
              : isGujarati
              ? `${mDisplay} ${year} ના મુખ્ય તહેવારો અને વ્રત`
              : isTelugu
              ? `${mDisplay} ${year} ముఖ్యమైన పండుగలు మరియు వ్రతాలు`
              : `Major Festivals & Vrats in ${mDisplay} ${year}`}
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            {isMarathi
              ? 'या महिन्यात साजरे होणारे महत्त्वाचे धार्मिक सण, उपवास व मुहूर्त'
              : 'Key religious festivals, fastings, and observances scheduled in this month'}
          </p>
        </div>

        {monthFestivals.length > 0 ? (
          <div className="divide-y divide-stone-100">
            {monthFestivals.map((fest) => (
              <div
                key={fest.id}
                onClick={() => onNavigate(`/festivals/${fest.slug}`)}
                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-stone-50/70 transition-colors cursor-pointer group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-stone-900 group-hover:text-[#9A3412] font-serif">
                      {fest.nameRegional?.[regInfo.language] || fest.nameHi || fest.name}
                    </span>
                    {fest.nameRegional?.[regInfo.language] && (
                      <span className="text-xs text-stone-500 font-medium">
                        ({fest.name})
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    {fest.tithiText} · {isMarathi ? `समर्पित: ${fest.deity || 'वैदिक परंपरा'}` : `Dedicated to: ${fest.deity || 'Vedic Tradition'}`}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1.5 line-clamp-2 max-w-3xl">
                    {fest.summary}
                  </p>
                </div>

                <div className="shrink-0 text-left sm:text-right">
                  <div className="text-sm font-extrabold text-[#9A3412] font-mono">
                    {fest.date2027}
                  </div>
                  <div className="text-xs text-stone-500 font-medium">
                    {fest.dayOfWeek2027}
                  </div>
                  <span className="text-[11px] font-bold text-[#9A3412] group-hover:underline inline-flex items-center gap-0.5 mt-1">
                    {isMarathi ? 'माहिती वाचा →' : 'Details →'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-sm text-stone-500">
            {isMarathi
              ? 'या महिन्यात कोणतेही मोठे राष्ट्रीय सण नाहीत. नियमित एकादशी, संकष्टी चतुर्थी, प्रदोष आणि पौर्णिमा/अमावास्या पाळली जाते.'
              : 'No major national festivals scheduled in this month. Standard Shukla & Krishna Ekadashis, Sankashti Chaturthi, Pradosh Vrats, and Purnima / Amavasya observances apply.'}
          </div>
        )}
      </section>

      {/* Specialized Upcoming Vrats Section with E-E-A-T Shastric Details */}
      <MonthlyVratSection
        initialMonthIndex={selectedMonthIndex}
        year={year}
        currentLang={currentLang}
        onNavigate={onNavigate}
      />

      {/* Traditional Regional Months Schedule */}
      <section className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="text-xl font-bold text-stone-900 font-serif">
          {isMarathi
            ? `पारंपारिक १२ प्रादेशिक महिने (${regInfo.name})`
            : isGujarati
            ? `પરંપરાગત ૧૨ પ્રાદેશિક મહિના (${regInfo.name})`
            : `Traditional 12 Regional Months (${regInfo.name})`}
        </h2>
        <p className="text-xs text-stone-600">
          {isMarathi
            ? `${regInfo.system} पद्धतीनुसार वर्षाचे १२ महिने खालीलप्रमाणे आहेत. कोणत्याही महिन्यावर क्लिक करून त्याचे वेळापत्रक पहा.`
            : `Month sequence as per ${regInfo.system} calendar tradition. Click any month to jump to its calendar grid.`}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {regInfo.monthNames.map((name, idx) => (
            <button
              key={name}
              type="button"
              onClick={() => handleMonthChange(idx)}
              className={`p-3 rounded-2xl border text-center transition-all ${
                idx === selectedMonthIndex
                  ? 'bg-[#FAF1EC] border-[#9A3412] ring-2 ring-[#9A3412]/20'
                  : 'bg-stone-50 border-stone-200 hover:border-amber-400 hover:bg-stone-100'
              }`}
            >
              <div className="text-[10px] text-stone-400 font-mono">
                {isMarathi ? `महिना #${idx + 1}` : `Month #${idx + 1}`}
              </div>
              <div className="text-sm font-bold text-stone-900 mt-0.5">{name}</div>
              <div className="text-[10px] text-stone-500 mt-0.5">{MONTH_DISPLAY_NAMES[MONTH_NAMES[idx]]}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Switch to Other Regional Calendars */}
      <section className="p-6 sm:p-8 bg-[#FAF6F2] rounded-3xl border border-stone-200 space-y-4">
        <h2 className="text-lg font-bold text-stone-900 font-serif">
          {isMarathi
            ? 'इतर प्रादेशिक दिनदर्शिका २०२७ पहा'
            : isGujarati
            ? 'અન્ય પ્રાદેશિક પંચાંગ ૨૦૨૭ જુઓ'
            : isTelugu
            ? 'ఇతర ప్రాంతీయ క్యాలెండర్లు 2027 చూడండి'
            : 'Explore Other Regional Calendars for 2027'}
        </h2>
        <p className="text-xs text-stone-600">
          {isMarathi
            ? 'भारतातील विविध राज्यांच्या पारंपारिक पंचांग पद्धती:'
            : 'Explore authentic Panchangs calibrated for each state and linguistic heritage:'}
        </p>

        <div className="flex flex-wrap gap-2 text-xs">
          {Object.entries(REGIONAL_CALENDARS_INFO).map(([k, r]) => (
            <button
              key={k}
              type="button"
              onClick={() => onNavigate(`/${k}-calendar-${year}`)}
              className={`px-3.5 py-2 rounded-xl border transition-colors ${
                k === normKey
                  ? 'bg-[#9A3412] text-white border-[#9A3412] font-bold shadow-2xs'
                  : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100 font-medium'
              }`}
            >
              {r.name} ({r.nativeName.split(' ')[0]})
            </button>
          ))}
        </div>
      </section>

      <ShareButtons
        title={`${regInfo.name} ${year} Calendar Dates & Panchang – NewsDarshan`}
        url={`https://www.newsdarshan.in/${normKey}-calendar-${year}`}
      />

      <AdSlot type="before-footer" />
    </div>
  );
}
