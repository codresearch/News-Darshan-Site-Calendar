import React, { useState, useEffect } from 'react';
import { getUpcomingMilestones, MilestoneItem } from '../utils/upcomingMilestones';
import { Sparkles, Calendar, ChevronRight, Moon, Sun, Flame, CheckCircle2, Clock } from 'lucide-react';
import { LanguageCode } from '../types';

interface UpcomingFestivalsWidgetProps {
  currentLang: LanguageCode;
  onNavigate: (path: string) => void;
}

export default function UpcomingFestivalsWidget({ currentLang, onNavigate }: UpcomingFestivalsWidgetProps) {
  const [milestones, setMilestones] = useState(() => getUpcomingMilestones());
  const [activeHorizon, setActiveHorizon] = useState<'7days' | '30days' | 'major' | 'purnima' | 'all'>('7days');

  const isHindi = currentLang === 'hi';
  const isMarathi = currentLang === 'mr';
  const isGujarati = currentLang === 'gu';

  useEffect(() => {
    const handleUpdate = () => {
      setMilestones(getUpcomingMilestones());
    };
    window.addEventListener('nd_festivals_updated', handleUpdate);
    return () => window.removeEventListener('nd_festivals_updated', handleUpdate);
  }, []);

  const getActiveList = (): MilestoneItem[] => {
    switch (activeHorizon) {
      case '7days':
        return milestones.in7Days;
      case '30days':
        return milestones.in30Days;
      case 'major':
        return milestones.majorFestivals;
      case 'purnima':
        return milestones.purnimaEkadashi;
      case 'all':
      default:
        return milestones.allUpcoming;
    }
  };

  const activeList = getActiveList();

  return (
    <section className="rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF4EC] to-[#F5EBE1] border-2 border-[#E7D0AB] p-6 sm:p-9 shadow-md space-y-7 relative overflow-hidden">
      {/* Background Mandala Motif */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 text-[#9A3412]/5 pointer-events-none select-none">
        <svg viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M50 4 L50 96 M4 50 L96 50 M17 17 L83 83 M17 83 L83 17" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Widget Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8D4B7] pb-4 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9A3412]/10 border border-[#9A3412]/20 text-xs font-bold text-[#9A3412] mb-1.5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#9A3412]" />
            <span>
              {isMarathi
                ? 'वैदिक सण व पौर्णिमा उल्टी गिनती'
                : isHindi
                ? 'वैदिक व्रत, त्यौहार एवं पूर्णिमा उल्टी गिनती (Live Countdown)'
                : 'Vedic Ephemeris · Festivals & Purnima Live Countdown'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif leading-tight">
            {isMarathi
              ? 'आगामी सण, उत्सव व पुढील पौर्णिमा'
              : isHindi
              ? 'आगामी व्रत-त्यौहार एवं अगली पूर्णिमा'
              : isGujarati
              ? 'આગામી તહેવારો અને પૂનમ'
              : 'Upcoming Festivals & Next Purnima Countdown'}
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl">
            {isMarathi
              ? 'सूर्य सिद्धांत दृक गणित प्रमाणित पंचांगानुसार पुढील प्रमुख सण, पौर्णिमा व आगामी ७ आणि ३० दिवसांतील शुभ पर्व.'
              : isHindi
              ? 'सूर्य सिद्धान्त दृक पंचांग गणना अनुसार अगला मुख्य पर्व, अगली पूर्णिमा, एकादशी एवं आगामी ७ व ३० दिनों के समस्त शुभ पर्व।'
              : 'Real-time Drigganita countdown to the next festival, next Purnima (full moon), and all sacred observances in the next 7 and 30 days.'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('/festivals/2027')}
          className="text-xs sm:text-sm font-bold text-[#9A3412] hover:underline whitespace-nowrap self-start sm:self-auto flex items-center gap-1.5 cursor-pointer bg-white/80 px-4 py-2 rounded-xl border border-stone-300 shadow-2xs"
        >
          <Calendar className="w-4 h-4 text-[#9A3412]" />
          <span>{isMarathi ? 'सर्व २०२७ सण पहा →' : isHindi ? 'सभी २०२७ त्यौहार देखें →' : 'View All 2027 Festivals →'}</span>
        </button>
      </div>

      {/* 4 CORE SPOTLIGHT CARDS (Next Festival, Next Purnima in Days, Next Ekadashi, Next Amavasya) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {/* 1. NEXT FESTIVAL */}
        {milestones.nextFestival && (
          <div
            onClick={() => onNavigate(milestones.nextFestival.url)}
            className="p-5 bg-gradient-to-br from-amber-500/10 via-white to-amber-50 rounded-2xl border-2 border-amber-300 hover:border-[#9A3412] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-[#9A3412] uppercase tracking-wider flex items-center gap-1">
                  <span>🪔</span>
                  <span>{isMarathi ? 'पुढील प्रमुख सण' : isHindi ? 'अगला प्रमुख पर्व' : 'Next Festival'}</span>
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-black bg-[#9A3412] text-white shadow-xs animate-pulse">
                  {milestones.nextFestival.daysRemaining === 0
                    ? 'TODAY!'
                    : milestones.nextFestival.daysRemaining === 1
                    ? 'TOMORROW!'
                    : `In ${milestones.nextFestival.daysRemaining} Days`}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-stone-900 group-hover:text-[#9A3412] font-serif transition-colors leading-tight">
                {milestones.nextFestival.name}
              </h3>
              {milestones.nextFestival.nameHi && (
                <div className="text-xs font-serif text-stone-600 mt-0.5">
                  {milestones.nextFestival.nameHi}
                </div>
              )}

              <div className="text-xs font-bold text-stone-800 mt-2 font-mono flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#9A3412]" />
                <span>{milestones.nextFestival.dateStr} · {milestones.nextFestival.dayOfWeek}</span>
              </div>

              <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                {milestones.nextFestival.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-amber-200/80 text-xs font-bold text-[#9A3412] flex items-center justify-between">
              <span>{isMarathi ? 'पूजा विधी व शुभ मुहूर्त' : isHindi ? 'पूजा विधि व शुभ मुहूर्त' : 'View Puja Vidhi'}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        )}

        {/* 2. NEXT PURNIMA IN DAYS (User specifically requested: "next purnima in days like") */}
        {milestones.nextPurnima && (
          <div
            onClick={() => onNavigate(milestones.nextPurnima.url)}
            className="p-5 bg-gradient-to-br from-yellow-500/10 via-white to-yellow-50 rounded-2xl border-2 border-yellow-400 hover:border-amber-600 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1">
                  <span>🌕</span>
                  <span>{isMarathi ? 'पुढील पौर्णिमा' : isHindi ? 'अगली पूर्णिमा' : 'Next Purnima'}</span>
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-black bg-amber-600 text-white shadow-xs">
                  {milestones.nextPurnima.daysRemaining === 0
                    ? 'TODAY (आज)'
                    : milestones.nextPurnima.daysRemaining === 1
                    ? 'TOMORROW (कल)'
                    : `In ${milestones.nextPurnima.daysRemaining} Days`}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-stone-900 group-hover:text-amber-800 font-serif transition-colors leading-tight">
                {milestones.nextPurnima.name}
              </h3>

              <div className="text-xs font-bold text-stone-800 mt-2 font-mono flex items-center gap-1">
                <Moon className="w-3.5 h-3.5 text-amber-600" />
                <span>{milestones.nextPurnima.dateStr} · {milestones.nextPurnima.dayOfWeek}</span>
              </div>

              <div className="mt-2 text-xs font-bold text-amber-900 bg-amber-100/70 p-2 rounded-xl border border-amber-200">
                {milestones.nextPurnima.paranaOrTithi || `Moonrise: ${milestones.nextPurnima.moonriseTime || 'Evening'}`}
              </div>

              <p className="text-xs text-stone-600 mt-1.5 line-clamp-1">
                Satyanarayan Vrat & Chandra Darshan
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-yellow-200/80 text-xs font-bold text-amber-800 flex items-center justify-between">
              <span>{isMarathi ? 'सत्यनारायण पूजा वेळ' : isHindi ? 'सत्यनारायण पूजा समय' : 'Satyanarayan Puja'}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        )}

        {/* 3. NEXT EKADASHI IN DAYS */}
        {milestones.nextEkadashi && (
          <div
            onClick={() => onNavigate(milestones.nextEkadashi.url)}
            className="p-5 bg-gradient-to-br from-emerald-500/10 via-white to-emerald-50 rounded-2xl border-2 border-emerald-300 hover:border-emerald-600 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1">
                  <span>🕉️</span>
                  <span>{isMarathi ? 'पुढील एकादशी' : isHindi ? 'अगली एकादशी' : 'Next Ekadashi'}</span>
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-black bg-emerald-700 text-white shadow-xs">
                  {milestones.nextEkadashi.daysRemaining === 0
                    ? 'TODAY'
                    : `In ${milestones.nextEkadashi.daysRemaining} Days`}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-stone-900 group-hover:text-emerald-800 font-serif transition-colors leading-tight">
                {milestones.nextEkadashi.name}
              </h3>

              <div className="text-xs font-bold text-stone-800 mt-2 font-mono flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                <span>{milestones.nextEkadashi.dateStr} · {milestones.nextEkadashi.dayOfWeek}</span>
              </div>

              <div className="mt-2 text-xs font-bold text-emerald-900 bg-emerald-100/70 p-2 rounded-xl border border-emerald-200">
                {milestones.nextEkadashi.paranaOrTithi || 'Dedicated to Lord Vishnu'}
              </div>

              <p className="text-xs text-stone-600 mt-1.5 line-clamp-1">
                Vishnu Puja, Vrat & Shubh Parana
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-emerald-200/80 text-xs font-bold text-emerald-800 flex items-center justify-between">
              <span>{isMarathi ? 'व्रत नियम व पारण' : isHindi ? 'व्रत नियम व पारण' : 'Fasting Rules'}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        )}

        {/* 4. NEXT AMAVASYA */}
        {milestones.nextAmavasya && (
          <div
            onClick={() => onNavigate(milestones.nextAmavasya.url)}
            className="p-5 bg-gradient-to-br from-purple-500/10 via-white to-purple-50 rounded-2xl border-2 border-purple-300 hover:border-purple-600 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-purple-900 uppercase tracking-wider flex items-center gap-1">
                  <span>🌑</span>
                  <span>{isMarathi ? 'पुढील अमावास्या' : isHindi ? 'अगली अमावस्या' : 'Next Amavasya'}</span>
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-black bg-purple-700 text-white shadow-xs">
                  {milestones.nextAmavasya.daysRemaining === 0
                    ? 'TODAY'
                    : `In ${milestones.nextAmavasya.daysRemaining} Days`}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-stone-900 group-hover:text-purple-800 font-serif transition-colors leading-tight">
                {milestones.nextAmavasya.name}
              </h3>

              <div className="text-xs font-bold text-stone-800 mt-2 font-mono flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-purple-700" />
                <span>{milestones.nextAmavasya.dateStr} · {milestones.nextAmavasya.dayOfWeek}</span>
              </div>

              <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                {milestones.nextAmavasya.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-purple-200/80 text-xs font-bold text-purple-800 flex items-center justify-between">
              <span>{isMarathi ? 'पितृ तर्पण विधी' : isHindi ? 'पितृ तर्पण विधि' : 'Pitru Tarpan Vidhi'}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        )}
      </div>

      {/* HORIZON SELECTOR (User requested: "major fasival show like in 30 days, another 7 days like this") */}
      <div className="pt-2 border-t border-[#E8D4B7] space-y-4 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-orange-600" />
              <span>
                {isMarathi ? 'कालावधीनुसार सण निवडा:' : isHindi ? 'समयानुसार पर्व फिल्टर करें:' : 'View by Time Horizon:'}
              </span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-white p-1 rounded-2xl border border-stone-300 shadow-2xs">
            {/* Horizon 1: 7 Days */}
            <button
              type="button"
              onClick={() => setActiveHorizon('7days')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeHorizon === '7days'
                  ? 'bg-[#9A3412] text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <span>🔥</span>
              <span>{isMarathi ? 'आगामी ७ दिवस' : isHindi ? 'आगामी ७ दिन' : 'In 7 Days'}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                activeHorizon === '7days' ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'
              }`}>
                {milestones.in7Days.length}
              </span>
            </button>

            {/* Horizon 2: 30 Days */}
            <button
              type="button"
              onClick={() => setActiveHorizon('30days')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeHorizon === '30days'
                  ? 'bg-[#9A3412] text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <span>🪔</span>
              <span>{isMarathi ? 'आगामी ३० दिवस' : isHindi ? 'आगामी ३० दिन' : 'In 30 Days'}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                activeHorizon === '30days' ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'
              }`}>
                {milestones.in30Days.length}
              </span>
            </button>

            {/* Horizon 3: Major Festivals */}
            <button
              type="button"
              onClick={() => setActiveHorizon('major')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeHorizon === 'major'
                  ? 'bg-[#9A3412] text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <span>⭐</span>
              <span>{isMarathi ? 'प्रमुख सण' : isHindi ? 'प्रमुख त्यौहार' : 'Major Festivals'}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                activeHorizon === 'major' ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'
              }`}>
                {milestones.majorFestivals.length}
              </span>
            </button>

            {/* Horizon 4: Purnima & Ekadashi */}
            <button
              type="button"
              onClick={() => setActiveHorizon('purnima')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeHorizon === 'purnima'
                  ? 'bg-[#9A3412] text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <span>🌕</span>
              <span>{isMarathi ? 'पौर्णिमा व एकादशी' : isHindi ? 'पूर्णिमा व एकादशी' : 'Purnima & Ekadashi'}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                activeHorizon === 'purnima' ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'
              }`}>
                {milestones.purnimaEkadashi.length}
              </span>
            </button>

            {/* Horizon 5: All Upcoming */}
            <button
              type="button"
              onClick={() => setActiveHorizon('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeHorizon === 'all'
                  ? 'bg-[#9A3412] text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <span>📅</span>
              <span>{isMarathi ? 'सर्व आगामी' : isHindi ? 'सभी आगामी' : 'All Upcoming'}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                activeHorizon === 'all' ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'
              }`}>
                {milestones.allUpcoming.length}
              </span>
            </button>
          </div>
        </div>

        {/* Selected Horizon Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeList.length === 0 ? (
            <div className="col-span-full py-10 text-center text-stone-500 bg-white/70 rounded-2xl border border-stone-200 text-xs sm:text-sm">
              {isMarathi
                ? 'या कालावधीत कोणतेही अतिरिक्त सण नियोजित नाहीत. "आगामी ३० दिवस" किंवा "सर्व आगामी" निवडा.'
                : isHindi
                ? 'इस समयावधि में कोई अन्य त्यौहार निर्धारित नहीं है। "आगामी ३० दिन" या "सभी आगामी" चुनें।'
                : 'No milestones found in this specific horizon. Try switching to "In 30 Days" or "All Upcoming".'}
            </div>
          ) : (
            activeList.slice(0, 9).map((item) => (
              <div
                key={item.id}
                onClick={() => onNavigate(item.url)}
                className="p-4 bg-white hover:bg-amber-50/50 rounded-2xl border border-stone-200 hover:border-[#9A3412] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 uppercase">
                      {item.category}
                    </span>
                    <span
                      className={`text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-2xs ${
                        item.daysRemaining <= 3
                          ? 'bg-rose-600 text-white animate-pulse'
                          : item.daysRemaining <= 7
                          ? 'bg-amber-600 text-white'
                          : item.daysRemaining <= 30
                          ? 'bg-[#9A3412] text-white'
                          : 'bg-stone-800 text-white'
                      }`}
                    >
                      {item.daysRemaining === 0
                        ? 'TODAY'
                        : item.daysRemaining === 1
                        ? 'TOMORROW'
                        : `In ${item.daysRemaining} Days`}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-stone-900 group-hover:text-[#9A3412] font-serif transition-colors leading-tight">
                    {item.name}
                  </h4>
                  {item.nameHi && (
                    <div className="text-xs font-serif text-stone-600 mt-0.5">
                      {item.nameHi}
                    </div>
                  )}

                  <div className="text-xs font-semibold text-stone-700 mt-2 font-mono flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#9A3412]" />
                    <span>{item.dateStr} · {item.dayOfWeek}</span>
                  </div>

                  <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-stone-100 text-xs font-bold text-[#9A3412] flex items-center justify-between">
                  <span>{isMarathi ? 'माहिती व मुहूर्त →' : isHindi ? 'विवरण एवं मुहूर्त →' : 'Read Details →'}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
