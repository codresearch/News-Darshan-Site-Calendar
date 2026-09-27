import { useState } from 'react';
import { MONTH_NAMES, MONTH_DISPLAY_NAMES } from '../utils/seoEngine';
import { FESTIVALS_2027, EKADASHI_2027, PURNIMA_2027, AMAVASYA_2027 } from '../data/calendarData';
import { getPanchangForDate } from '../data/panchangEngine';
import { getUIText, getWeekdayLocalized } from '../data/localization';
import {
  getFestivalName,
  getFestivalSummary,
  getLocalizedTithiName,
  getLocalizedNakshatraName
} from '../data/localizedFestivalsAndMuhurat';
import { getRegionalDigits } from '../data/regionalCalendarEngine';
import { CityInfo, LanguageCode } from '../types';
import Breadcrumbs from '../components/Breadcrumbs';
import AdSlot from '../components/AdSlot';
import ShareButtons from '../components/ShareButtons';
import MonthlyVratSection from '../components/MonthlyVratSection';
import { ChevronLeft, ChevronRight, Calendar, Sparkles, MapPin, LayoutGrid, List, Star } from 'lucide-react';

interface CalendarMonthPageProps {
  year?: string;
  month: string;
  currentLang?: LanguageCode;
  currentCity?: CityInfo;
  onOpenCityModal?: () => void;
  onNavigate: (path: string) => void;
}

export default function CalendarMonthPage({
  year = '2027',
  month,
  currentLang = 'en',
  currentCity,
  onOpenCityModal,
  onNavigate
}: CalendarMonthPageProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const isMarathi = currentLang === 'mr';
  const isHindi = currentLang === 'hi';
  const isGujarati = currentLang === 'gu';

  const mIndex = MONTH_NAMES.indexOf(month.toLowerCase());
  const validIndex = mIndex !== -1 ? mIndex : 0;
  const currentMonthKey = MONTH_NAMES[validIndex];
  const mDisplay = MONTH_DISPLAY_NAMES[currentMonthKey];

  const yearNum = parseInt(year, 10) || 2027;

  // Month days generator
  const daysInMonth = new Date(yearNum, validIndex + 1, 0).getDate();
  const firstDayOfWeek = new Date(yearNum, validIndex, 1).getDay(); // 0 = Sun

  const prevMonthKey = validIndex === 0 ? MONTH_NAMES[11] : MONTH_NAMES[validIndex - 1];
  const nextMonthKey = validIndex === 11 ? MONTH_NAMES[0] : MONTH_NAMES[validIndex + 1];

  const monthFestivals = FESTIVALS_2027.filter((f) => {
    const parts = f.date2027.split('-');
    return parseInt(parts[0], 10) === yearNum && parseInt(parts[1], 10) === validIndex + 1;
  });

  const cityPathPrefix = currentCity && currentCity.id !== 'delhi' ? `/hindu-calendar-${year}/${currentCity.id}` : `/hindu-calendar-${year}`;

  const breadcrumbs = [
    { name: getUIText(currentLang, 'home', 'Home'), url: '/' },
    { name: `${getUIText(currentLang, 'hinduCalendar', 'Hindu Calendar')} ${year}`, url: `/hindu-calendar-${year}/` },
    ...(currentCity && currentCity.id !== 'delhi' ? [{ name: currentCity.name, url: `/hindu-calendar-${year}/${currentCity.id}/` }] : []),
    { name: `${mDisplay} ${year}`, url: `${cityPathPrefix}/${currentMonthKey}/` }
  ];

  const standardWeekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-8">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      {/* Month Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 bg-gradient-to-r from-[#FAF1EC] to-[#F5ECE5] rounded-2xl border border-[#E8DCD4]">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#9A3412]">
              {isMarathi
                ? `${year} चा महिना ${(validIndex + 1).toString().padStart(2, '0')} · दैनिक तिथी व पंचांग`
                : isHindi
                ? `${year} का माह ${(validIndex + 1).toString().padStart(2, '0')} · दैनिक तिथि एवं पंचांग`
                : `Month ${(validIndex + 1).toString().padStart(2, '0')} of ${year} · Daily Tithi & Panchang`}
            </span>
            {currentCity && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-950 bg-amber-200/80 px-2 py-0.5 rounded-full border border-amber-300">
                <MapPin className="w-3 h-3 text-[#9A3412]" />
                {currentCity.name}, {currentCity.country} ({currentCity.timezone})
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-stone-900 font-serif">
            {isMarathi
              ? `हिंदू दिनदर्शिका ${mDisplay} ${year}${currentCity ? ` – ${currentCity.name}` : ''}`
              : isHindi
              ? `हिन्दू कैलेंडर ${mDisplay} ${year}${currentCity ? ` – ${currentCity.name}` : ''}`
              : `Hindu Calendar ${mDisplay} ${year}${currentCity ? ` – ${currentCity.name}` : ''}`}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl">
            {currentCity
              ? `Accurate ${mDisplay} ${year} Hindu Calendar for ${currentCity.name}, ${currentCity.state}, ${currentCity.country}. Astronomical Tithi, Nakshatra, Sunrise/Sunset, Ekadashi, and festivals calculated for ${currentCity.timezone}.`
              : isMarathi
              ? `${mDisplay} ${year} चे संपूर्ण दैनिक पंचांग, तिथी, नक्षत्र, चौघडिया, राहू काळ व शुभ मुहूर्त जाणून घेण्यासाठी कोणत्याही तारखेवर क्लिक करा.`
              : isHindi
              ? `${mDisplay} ${year} का विस्तृत दैनिक पंचांग। किसी भी दिन पर क्लिक करके उसकी सम्पूर्ण खगोलीय तिथि, नक्षत्र, चौघड़िया एवं शुभ मुहूर्त देखें।`
              : `Detailed daily calendar for ${mDisplay} ${year}. Click on any day to inspect its full astronomical Panchang, Choghadiya, Rahu Kaal, and auspicious muhurats.`}
          </p>
        </div>

        {/* Previous and Next Month Controls */}
        <div className="flex items-center gap-2">
          {onOpenCityModal && (
            <button
              type="button"
              onClick={onOpenCityModal}
              className="flex items-center gap-1.5 px-3 py-2 bg-amber-50 text-xs font-bold text-[#9A3412] border border-amber-200 rounded-xl hover:bg-amber-100 transition-colors shadow-2xs"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Change City</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => onNavigate(`${cityPathPrefix}/${prevMonthKey}`)}
            className="flex items-center gap-1 px-3 py-2 bg-white text-xs font-semibold text-stone-700 border border-stone-300 rounded-xl hover:bg-stone-50 transition-colors shadow-2xs"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{MONTH_DISPLAY_NAMES[prevMonthKey]}</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate(`${cityPathPrefix}/${nextMonthKey}`)}
            className="flex items-center gap-1 px-3 py-2 bg-white text-xs font-semibold text-stone-700 border border-stone-300 rounded-xl hover:bg-stone-50 transition-colors shadow-2xs"
          >
            <span>{MONTH_DISPLAY_NAMES[nextMonthKey]}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <AdSlot type="top" />

      {/* Interactive Monthly Calendar Grid */}
      <div className="bg-white rounded-3xl border-2 border-stone-300 overflow-hidden shadow-md">
        <div className="px-4 sm:px-6 py-4 bg-gradient-to-r from-stone-950 via-slate-900 to-stone-950 border-b-2 border-amber-500 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-400 shrink-0" />
            <h2 className="text-base sm:text-xl font-bold text-white font-serif tracking-wide">
              {isMarathi ? `मासिक दिनदर्शिका – ${mDisplay} ${year}` : isHindi ? `मासिक पंचांग ग्रिड – ${mDisplay} ${year}` : `Monthly Day Grid – ${mDisplay} ${year}`}
            </h2>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* View Switcher: Grid vs List (Crucial for Mobile) */}
            <div className="flex items-center bg-stone-800 p-0.5 rounded-xl border border-stone-700">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-amber-400 text-stone-950 shadow-xs'
                    : 'text-stone-300 hover:text-white'
                }`}
                title="Wall Calendar Grid"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="text-[11px]">{isMarathi ? 'ग्रिड' : isHindi ? 'ग्रिड' : 'Grid'}</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'table'
                    ? 'bg-amber-400 text-stone-950 shadow-xs'
                    : 'text-stone-300 hover:text-white'
                }`}
                title="Daily Agenda Table"
              >
                <List className="w-3.5 h-3.5" />
                <span className="text-[11px]">{isMarathi ? 'तारीख सूची' : isHindi ? 'दैनिक सूची' : 'List'}</span>
              </button>
            </div>

            <span className="text-xs text-slate-950 font-mono font-bold bg-amber-400 px-3 py-1 rounded-full border border-amber-300 shadow-xs shrink-0">
              {daysInMonth} {isMarathi ? 'दिवस' : isHindi ? 'दिन' : 'Days'}
            </span>
          </div>
        </div>

        {/* Mobile Swipe / Visibility Hint */}
        {viewMode === 'grid' && (
          <div className="sm:hidden px-3 py-2 bg-amber-50/90 border-b border-amber-200/80 text-[11px] text-amber-950 flex items-center justify-between">
            <span className="font-medium">👉 Swipe sideways to view all 7 days</span>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className="font-bold underline text-[#9A3412] ml-2 shrink-0"
            >
              Switch to Daily List
            </button>
          </div>
        )}

        {/* VIEW 1: HORIZONTALLY SCROLLABLE 7-COL WALL CALENDAR GRID */}
        {viewMode === 'grid' && (
          <div className="overflow-x-auto scrollbar-thin">
            <div className="min-w-[640px] sm:min-w-full">
              {/* Weekday Headers */}
              <div className="grid grid-cols-7 border-b-2 border-stone-700 bg-stone-900 text-center text-xs font-black py-2.5 sm:py-3 tracking-wider">
                {standardWeekdays.map((w, idx) => {
                  const locDay = getWeekdayLocalized(w, currentLang);
                  return (
                    <div
                      key={w}
                      className={`px-1 ${
                        idx === 0
                          ? 'text-rose-400 font-black'
                          : idx === 6
                          ? 'text-amber-200 font-black'
                          : 'text-amber-300 font-bold'
                      }`}
                    >
                      <span>{locDay}</span>
                      <span className="font-normal text-stone-400 text-[11px] ml-1">({w})</span>
                    </div>
                  );
                })}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 divide-x divide-y divide-stone-200/90 bg-stone-100/30">
                {/* Empty cells for preceding days */}
                {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                  <div key={`empty-${i}`} className="min-h-[85px] sm:min-h-[115px] bg-stone-100/60 p-2 opacity-50" />
                ))}

                {/* Days of current month */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const dayNum = i + 1;
                  const nativeDayNum = getRegionalDigits(dayNum, currentLang);
                  const dateObj = new Date(yearNum, validIndex, dayNum);
                  const activeCityId = currentCity?.id || 'delhi';
                  const panchang = getPanchangForDate(dateObj, activeCityId);

                  const dateStr = `${yearNum}-${(validIndex + 1).toString().padStart(2, '0')}-${dayNum.toString().padStart(2, '0')}`;
                  const dayFest = FESTIVALS_2027.find((f) => f.date2027 === dateStr);
                  const isEkadashi = panchang.tithi.name === 'Ekadashi';
                  const isPurnima = panchang.tithi.name === 'Purnima';
                  const isAmavasya = panchang.tithi.name === 'Amavasya';
                  const isSunday = dateObj.getDay() === 0;

                  const pakshaLabel = panchang.tithi.paksha === 'Shukla'
                    ? (currentLang === 'gu' ? 'સુદ' : currentLang === 'te' ? 'శు' : currentLang === 'ta' ? 'வள' : currentLang === 'kn' ? 'ಶು' : currentLang === 'ml' ? 'ശു' : currentLang === 'bn' ? 'শু' : currentLang === 'or' ? 'ଶୁ' : 'शु')
                    : (currentLang === 'gu' ? 'વદ' : currentLang === 'te' ? 'బ' : currentLang === 'ta' ? 'தேய்' : currentLang === 'kn' ? 'ಕೃ' : currentLang === 'ml' ? 'കൃ' : currentLang === 'bn' ? 'কৃ' : currentLang === 'or' ? 'କୃ' : 'कृ');

                  return (
                    <div
                      key={dayNum}
                      onClick={() => onNavigate(`/panchang/${year}/${currentMonthKey}/${dayNum}`)}
                      className={`min-h-[85px] sm:min-h-[115px] p-2 sm:p-2.5 hover:bg-amber-50/70 transition-colors cursor-pointer group flex flex-col justify-between ${
                        dayFest ? 'bg-amber-50/50' : isEkadashi || isPurnima || isAmavasya ? 'bg-amber-100/30' : isSunday ? 'bg-rose-50/20' : 'bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-baseline gap-1">
                            <span className={`font-black text-base sm:text-xl font-serif leading-none ${isSunday ? 'text-red-700' : 'text-stone-950 group-hover:text-[#9A3412]'}`}>
                              {dayNum}
                            </span>
                            {nativeDayNum !== String(dayNum) && (
                              <span className="text-xs font-bold text-amber-950 font-serif leading-none">
                                ({nativeDayNum})
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] sm:text-[11px] font-black font-mono text-slate-950 bg-amber-400 px-1.5 py-0.5 rounded shadow-2xs leading-none">
                            {pakshaLabel}
                          </span>
                        </div>

                        {/* Localized Tithi with line-clamp-2 so it wraps instead of getting clipped */}
                        <div className="text-[11px] sm:text-xs font-bold text-stone-950 mt-1 line-clamp-2 leading-tight break-words">
                          {getLocalizedTithiName(panchang.tithi.name, currentLang)}
                        </div>

                        {/* Nakshatra */}
                        <div className="text-[10px] sm:text-[11px] text-stone-600 font-medium truncate mt-0.5">
                          {getLocalizedNakshatraName(panchang.nakshatra.name, currentLang)}
                        </div>
                      </div>

                      {/* Badges for festivals & major vrats */}
                      <div className="mt-1.5 space-y-1">
                        {dayFest && (
                          <div className="text-[10px] sm:text-[11px] font-bold text-white line-clamp-2 leading-tight break-words bg-rose-700 px-1.5 py-0.5 rounded shadow-2xs">
                            ★ {getFestivalName(dayFest, currentLang)}
                          </div>
                        )}
                        {isEkadashi && !dayFest && (
                          <div className="text-[10px] sm:text-[11px] font-bold text-white line-clamp-2 leading-tight break-words bg-emerald-700 px-1.5 py-0.5 rounded shadow-2xs">
                            {getLocalizedTithiName('Ekadashi', currentLang)}
                          </div>
                        )}
                        {isPurnima && !dayFest && (
                          <div className="text-[10px] sm:text-[11px] font-bold text-white line-clamp-2 leading-tight break-words bg-amber-600 px-1.5 py-0.5 rounded shadow-2xs">
                            {getLocalizedTithiName('Purnima', currentLang)}
                          </div>
                        )}
                        {isAmavasya && !dayFest && (
                          <div className="text-[10px] sm:text-[11px] font-bold text-white line-clamp-2 leading-tight break-words bg-stone-800 px-1.5 py-0.5 rounded shadow-2xs">
                            {getLocalizedTithiName('Amavasya', currentLang)}
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

        {/* VIEW 2: FULLY VISIBLE MOBILE-FRIENDLY DAILY AGENDA TABLE */}
        {viewMode === 'table' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-stone-900 border-b border-stone-700 text-amber-300 font-bold uppercase text-[11px] tracking-wider">
                  <th className="py-3 px-3 sm:px-4">Date & Day</th>
                  <th className="py-3 px-3 sm:px-4">Tithi (तिथि)</th>
                  <th className="py-3 px-3 sm:px-4 hidden sm:table-cell">Nakshatra & Yoga</th>
                  <th className="py-3 px-3 sm:px-4">Festival / Vrat</th>
                  <th className="py-3 px-3 sm:px-4 text-right">Panchang</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const dayNum = i + 1;
                  const nativeDayNum = getRegionalDigits(dayNum, currentLang);
                  const dateObj = new Date(yearNum, validIndex, dayNum);
                  const activeCityId = currentCity?.id || 'delhi';
                  const panchang = getPanchangForDate(dateObj, activeCityId);
                  const dayOfWeek = dateObj.getDay();
                  const locWeekday = getWeekdayLocalized(standardWeekdays[dayOfWeek], currentLang);

                  const dateStr = `${yearNum}-${(validIndex + 1).toString().padStart(2, '0')}-${dayNum.toString().padStart(2, '0')}`;
                  const dayFest = FESTIVALS_2027.find((f) => f.date2027 === dateStr);
                  const isEkadashi = panchang.tithi.name === 'Ekadashi';
                  const isPurnima = panchang.tithi.name === 'Purnima';
                  const isAmavasya = panchang.tithi.name === 'Amavasya';
                  const isSunday = dayOfWeek === 0;

                  return (
                    <tr
                      key={`list-${dayNum}`}
                      onClick={() => onNavigate(`/panchang/${year}/${currentMonthKey}/${dayNum}`)}
                      className={`hover:bg-amber-50/60 transition-colors cursor-pointer ${
                        dayFest ? 'bg-amber-50/40' : isSunday ? 'bg-rose-50/20' : ''
                      }`}
                    >
                      {/* Date & Weekday */}
                      <td className="py-2.5 sm:py-3 px-3 sm:px-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-8 h-8 sm:w-9 sm:h-9 flex flex-col items-center justify-center rounded-xl font-bold font-serif text-xs sm:text-sm shrink-0 ${
                              isSunday
                                ? 'bg-red-100 text-red-800 border border-red-200'
                                : 'bg-stone-100 text-stone-900 border border-stone-200'
                            }`}
                          >
                            <span>{dayNum}</span>
                            {nativeDayNum !== String(dayNum) && (
                              <span className="text-[9px] opacity-75 font-mono">{nativeDayNum}</span>
                            )}
                          </span>
                          <div>
                            <div className="font-bold text-stone-900 leading-tight">
                              {dayNum} {mDisplay} {year}
                            </div>
                            <div className={`text-[11px] font-semibold ${isSunday ? 'text-red-700' : 'text-stone-500'}`}>
                              {locWeekday} ({standardWeekdays[dayOfWeek]})
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Tithi & Paksha */}
                      <td className="py-2.5 sm:py-3 px-3 sm:px-4">
                        <div className="font-bold text-stone-900 text-xs sm:text-sm">
                          {getLocalizedTithiName(panchang.tithi.name, currentLang)}
                        </div>
                        <div className="text-[11px] text-stone-500 mt-0.5 flex items-center gap-1">
                          <span className="px-1.5 py-0.2 rounded-sm bg-amber-100 text-amber-900 text-[10px] font-bold">
                            {panchang.tithi.paksha} Paksha
                          </span>
                        </div>
                      </td>

                      {/* Nakshatra & Yoga */}
                      <td className="py-2.5 sm:py-3 px-3 sm:px-4 hidden sm:table-cell">
                        <div className="text-xs font-semibold text-stone-800">
                          {getLocalizedNakshatraName(panchang.nakshatra.name, currentLang)}
                        </div>
                        <div className="text-[11px] text-stone-500">
                          Yoga: {panchang.yoga.name} · Karana: {panchang.karana.name}
                        </div>
                      </td>

                      {/* Festival or Observance */}
                      <td className="py-2.5 sm:py-3 px-3 sm:px-4">
                        {dayFest ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-700 text-white shadow-2xs">
                            <Star className="w-3 h-3 fill-current" />
                            <span>{getFestivalName(dayFest, currentLang)}</span>
                          </span>
                        ) : isEkadashi ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-bold bg-emerald-700 text-white shadow-2xs">
                            {getLocalizedTithiName('Ekadashi', currentLang)} Vrat
                          </span>
                        ) : isPurnima ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-bold bg-amber-600 text-white shadow-2xs">
                            {getLocalizedTithiName('Purnima', currentLang)} Vrat
                          </span>
                        ) : isAmavasya ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-bold bg-stone-800 text-white shadow-2xs">
                            {getLocalizedTithiName('Amavasya', currentLang)}
                          </span>
                        ) : (
                          <span className="text-stone-400 text-xs">—</span>
                        )}
                      </td>

                      {/* Link to Panchang */}
                      <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-right">
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#9A3412] group-hover:underline">
                          <span>View</span>
                          <span>➔</span>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Festivals and Vrats occurring in this Month */}
      <section className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-stone-200 bg-stone-50">
          <h2 className="text-base font-bold text-stone-900 font-serif">
            {isMarathi
              ? `${mDisplay} ${year} मधील प्रमुख सण व व्रते`
              : isHindi
              ? `${mDisplay} ${year} के प्रमुख व्रत एवं त्यौहार`
              : `Festivals & Major Observances in ${mDisplay} ${year}`}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {isMarathi ? 'या महिन्यातील धार्मिक तिथी आणि उपवासांचे वेळापत्रक' : 'Key religious dates and fasting schedules for the month'}
          </p>
        </div>

        {monthFestivals.length > 0 ? (
          <div className="divide-y divide-stone-100">
            {monthFestivals.map((fest) => {
              const localizedName = getFestivalName(fest, currentLang);
              const localizedSummary = getFestivalSummary(fest, currentLang);
              const localizedTithi = getLocalizedTithiName(fest.tithiText, currentLang);
              const localizedDay = getWeekdayLocalized(fest.dayOfWeek2027, currentLang);

              return (
                <div
                  key={fest.id}
                  onClick={() => onNavigate(`/festivals/${fest.slug}`)}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-50/70 transition-colors cursor-pointer group"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-stone-900 group-hover:text-[#9A3412]">
                        {localizedName}
                      </span>
                      {fest.name !== localizedName && (
                        <span className="text-xs text-stone-500 font-serif">
                          ({fest.name})
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-stone-500 mt-0.5">
                      {localizedTithi} · {isMarathi ? `समर्पित: ${fest.deity || 'वैदिक परंपरा'}` : isHindi ? `समर्पित: ${fest.deity || 'वैदिक परंपरा'}` : `Dedicated to ${fest.deity || 'Vedic Tradition'}`}
                    </div>
                    <p className="text-xs text-stone-600 mt-1 line-clamp-1">
                      {localizedSummary}
                    </p>
                  </div>

                  <div className="shrink-0 text-left sm:text-right">
                    <div className="text-sm font-bold text-stone-900 font-mono">
                      {fest.date2027}
                    </div>
                    <div className="text-xs text-stone-500">
                      {localizedDay}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-6 text-center text-sm text-stone-500">
            {isMarathi
              ? 'या महिन्यात कोणतेही मोठे राष्ट्रीय सण नाहीत. नियमित शुक्ल व कृष्ण एकादशी, प्रदोष आणि पौर्णिमा/अमावास्या पाळली जाते.'
              : isHindi
              ? 'इस माह में कोई प्रमुख राष्ट्रीय त्यौहार नहीं है। सामान्य शुक्ल एवं कृष्ण एकादशी, प्रदोष व्रत तथा पूर्णिमा/अमावस्या लागू हैं।'
              : 'No major national festivals scheduled in this month. Standard Shukla & Krishna Ekadashis, Pradosh Vrats, and Purnima / Amavasya observances apply.'}
          </div>
        )}
      </section>

      {/* Specialized Upcoming Vrats Section with E-E-A-T Shastric Details */}
      <MonthlyVratSection
        initialMonthIndex={validIndex}
        year={year}
        currentLang={currentLang}
        onNavigate={onNavigate}
      />

      {/* Editorial Content */}
      <section className="p-6 sm:p-8 bg-[#FAF6F2] rounded-2xl border border-stone-200 text-sm text-stone-700 space-y-4">
        <h2 className="text-xl font-bold text-stone-900 font-serif">
          {isMarathi ? `${mDisplay} ${year} चे खगोलीय व पंचांग महत्त्व` : `Astronomical Overview for ${mDisplay} ${year}`}
        </h2>
        <p className="leading-relaxed">
          {isMarathi
            ? `${mDisplay} ${year} च्या महिन्यात सूर्य आणि चंद्राच्या गतीनुसार शुक्ल व कृष्ण पक्षातील एकादशी उपवास, प्रदोष व्रत आणि संक्रांतीचे महत्त्व आहे.`
            : `The month of ${mDisplay} ${year} features significant luni-solar movements. Devotees observe strict Ekadashi fasts in both Shukla and Krishna pakshas, which detoxify the digestive tract and center mental faculties during auspicious moon phases.`}
        </p>
        <p className="leading-relaxed">
          {isMarathi
            ? `वरील दैनिक पंचांग सूर्य सिद्धांत प्रणालीनुसार तयार केले आहे. सूर्योदय, सूर्यास्त, राहू काळ व चौघडिया वेळा आपल्या निवडलेल्या शहरानुसार अचूक मोजल्या जातात.`
            : `Daily Panchang entries shown above follow the Surya Siddhanta system. Timings for sunrise, sunset, Rahu Kaal, and Choghadiya partitions are calculated topocentrically based on your selected city.`}
        </p>

        <ShareButtons
          title={`Hindu Calendar ${mDisplay} ${year} – NewsDarshan`}
          url={`https://www.newsdarshan.in/hindu-calendar-${year}/${currentMonthKey}`}
        />
      </section>

      <AdSlot type="before-footer" />
    </div>
  );
}
