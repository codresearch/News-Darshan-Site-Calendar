import React from 'react';
import { MONTH_NAMES, MONTH_DISPLAY_NAMES } from '../utils/seoEngine';
import { FESTIVALS_2027, EKADASHI_2027 } from '../data/calendarData';
import { getUIText } from '../data/localization';
import { CityInfo, LanguageCode } from '../types';
import Breadcrumbs from '../components/Breadcrumbs';
import AdSlot from '../components/AdSlot';
import ShareButtons from '../components/ShareButtons';
import { Calendar, ChevronRight, Printer, ShieldCheck, MapPin } from 'lucide-react';

interface CalendarYearPageProps {
  year?: string;
  currentLang?: LanguageCode;
  currentCity?: CityInfo;
  onOpenCityModal?: () => void;
  onNavigate: (path: string) => void;
}

export default function CalendarYearPage({
  year = '2027',
  currentLang = 'en',
  currentCity,
  onOpenCityModal,
  onNavigate
}: CalendarYearPageProps) {
  const currentYearNum = parseInt(year, 10) || 2027;

  const cityPathPrefix = currentCity && currentCity.id !== 'delhi' ? `/hindu-calendar-${year}/${currentCity.id}` : `/hindu-calendar-${year}`;

  const breadcrumbs = [
    { name: getUIText(currentLang, 'home', 'Home'), url: '/' },
    { name: `${getUIText(currentLang, 'hinduCalendar', `Hindu Calendar`)} ${year}`, url: `/hindu-calendar-${year}/` },
    ...(currentCity && currentCity.id !== 'delhi' ? [{ name: currentCity.name, url: `/hindu-calendar-${year}/${currentCity.id}/` }] : [])
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 sm:space-y-12">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      {/* Year Hero Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-10 bg-gradient-to-r from-[#FFFDF9] via-[#FAF3EC] to-[#F5ECE3] rounded-3xl border-2 border-[#E6C88A] shadow-sm">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#9A3412]">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Lunisolar Ephemeris · Vikram Samvat 2083–2084 · Shaka 1948</span>
            </div>
            {currentCity && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-950 bg-amber-200/80 px-2 py-0.5 rounded-full border border-amber-300">
                <MapPin className="w-3 h-3 text-[#9A3412]" />
                {currentCity.name}, {currentCity.country} ({currentCity.timezone})
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-serif">
            {getUIText(currentLang, 'calendar2027', `Hindu Calendar ${year}`)}
            {currentCity ? ` – ${currentCity.name}` : ` (हिन्दू पंचांग ${year})`}
          </h1>
          <p className="text-sm sm:text-base text-stone-700 mt-2.5 max-w-3xl leading-relaxed">
            {currentCity
              ? `Complete 12-month Hindu Calendar ${year} for ${currentCity.name}, ${currentCity.state}, ${currentCity.country}. Accurate lunar tithis, Ekadashis, solar sankrantis, and major festival dates calculated for ${currentCity.timezone}.`
              : `Complete annual calendar for ${year} featuring all 12 lunar months, solar sankrantis, Ekadashis, Purnimas, Amavasyas, and major Hindu festivals across India.`}
          </p>
        </div>

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

          {/* Quick Year Switcher for future years */}
          <div className="flex items-center gap-1 bg-white border border-stone-300 rounded-xl p-1 text-xs">
            {['2027', '2028', '2029', '2030'].map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => onNavigate(`/hindu-calendar-${y}${currentCity && currentCity.id !== 'delhi' ? `/${currentCity.id}` : ''}`)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  y === year
                    ? 'bg-[#9A3412] text-white'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {y}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handlePrint}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-white text-xs font-semibold text-stone-700 border border-stone-300 rounded-xl hover:bg-stone-50 transition-colors"
            title="Print Calendar"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>
        </div>
      </div>

      <AdSlot type="top" />

      {/* 12 Months Grid */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-stone-900 font-serif">
          All 12 Months in {year}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MONTH_NAMES.map((m, idx) => {
            const mDisplay = MONTH_DISPLAY_NAMES[m];
            const monthFestivals = FESTIVALS_2027.filter((f) => {
              const fMonth = parseInt(f.date2027.split('-')[1], 10);
              return fMonth === idx + 1;
            });

            return (
              <div
                key={m}
                onClick={() => onNavigate(`${cityPathPrefix}/${m}`)}
                className="p-5 bg-white rounded-xl border border-stone-200 hover:border-[#9A3412] hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-stone-400">
                      Month {(idx + 1).toString().padStart(2, '0')}
                    </span>
                    <span className="text-xs font-medium text-[#9A3412] group-hover:underline">
                      Explore Days →
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 group-hover:text-[#9A3412] font-serif mt-1">
                    {mDisplay} {year}
                  </h3>

                  <div className="mt-3 space-y-1">
                    <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                      Key Observances:
                    </div>
                    {monthFestivals.length > 0 ? (
                      monthFestivals.slice(0, 3).map((f) => (
                        <div key={f.id} className="text-xs text-stone-700 truncate">
                          · {f.name} ({f.date2027.split('-')[2]} {mDisplay})
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-stone-400 italic">
                        Ekadashi & Pradosh Vrats
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span>View Complete Panchang</span>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Complete Annual 2027 Festival Chronology Table */}
      <section className="bg-white rounded-3xl border-2 border-stone-300 overflow-hidden shadow-md">
        <div className="px-6 py-4.5 bg-gradient-to-r from-stone-950 via-slate-900 to-stone-950 border-b-2 border-amber-500/80 flex items-center justify-between">
          <div>
            <h2 className="text-base font-black text-amber-300 font-serif tracking-wide flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              Master Festival Chronology {year}
            </h2>
            <p className="text-xs text-amber-200/80 mt-0.5 font-medium">
              Verified dates, tithis, and days for major Hindu celebrations in {year}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/festivals/2027')}
            className="text-xs font-bold text-amber-300 hover:text-amber-200 underline"
          >
            All Festivals →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-stone-900 text-amber-300 uppercase font-black text-[11px] tracking-wider border-b-2 border-stone-700">
              <tr>
                <th className="px-4 py-3.5">Festival Name</th>
                <th className="px-4 py-3.5">Gregorian Date</th>
                <th className="px-4 py-3.5">Day</th>
                <th className="px-4 py-3.5">Tithi / Month</th>
                <th className="px-4 py-3.5">Deity</th>
                <th className="px-4 py-3.5 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {FESTIVALS_2027.map((fest, idx) => (
                <tr key={fest.id} className={`transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-stone-50/70'} hover:bg-amber-50/40`}>
                  <td className="px-4 py-3.5 font-bold text-stone-950">
                    {fest.name}
                    {fest.nameHi && (
                      <span className="block text-xs font-semibold text-stone-600">
                        {fest.nameHi}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 font-mono font-black text-amber-950">
                    {fest.date2027}
                  </td>
                  <td className="px-4 py-3.5 text-stone-800 font-bold">
                    {fest.dayOfWeek2027}
                  </td>
                  <td className="px-4 py-3.5 text-stone-800 font-medium">
                    {fest.tithiText}
                  </td>
                  <td className="px-4 py-3.5 text-stone-700 font-medium">
                    {fest.deity || 'Vedic Tradition'}
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => onNavigate(`/festivals/${fest.slug}`)}
                      className="text-xs font-bold text-[#9A3412] hover:underline"
                    >
                      Puja Vidhi →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SEO Long-form Article Section */}
      <section className="p-6 sm:p-8 bg-[#FAF6F2] rounded-2xl border border-stone-200 text-sm text-stone-700 space-y-4">
        <h2 className="text-xl font-bold text-stone-900 font-serif">
          Significance of Hindu Calendar {year}
        </h2>
        <p className="leading-relaxed">
          The year <strong>{year}</strong> marks significant astronomical alignments across the Indian subcontinent. Starting under the auspices of <em>Vikram Samvat 2083</em>, the year transitions into <em>Vikram Samvat 2084</em> on April 7, 2027, celebrated synchronously as <strong>Gudi Padwa</strong> in Maharashtra and <strong>Ugadi</strong> in Karnataka, Andhra Pradesh, and Telangana.
        </p>
        <p className="leading-relaxed">
          The Hindu calendar tracks both lunar months (governed by the Moon's phase from Amavasya to Purnima) and solar months (governed by the Sun's transit or <em>Sankranti</em> through the twelve zodiac constellations). Because the lunar year is approximately 354 days long, an intricate mathematical leap month or <em>Adhika Masa</em> is inserted approximately every 32.5 lunar months to maintain seasonal alignment with the agricultural rhythms of Mother Nature.
        </p>

        <ShareButtons
          title={`Hindu Calendar ${year} – NewsDarshan`}
          url={`https://www.newsdarshan.in/hindu-calendar-${year}`}
        />
      </section>

      <AdSlot type="before-footer" />
    </div>
  );
}
