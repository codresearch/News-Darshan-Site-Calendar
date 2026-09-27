import { useState } from 'react';
import { EKADASHI_2027, PURNIMA_2027, AMAVASYA_2027 } from '../data/calendarData';
import { LanguageCode } from '../types';
import { getUIText, getWeekdayLocalized, getPakshaLocalized } from '../data/localization';
import Breadcrumbs from '../components/Breadcrumbs';
import AdSlot from '../components/AdSlot';
import ShareButtons from '../components/ShareButtons';
import MonthlyVratSection from '../components/MonthlyVratSection';
import DeityVratsDirectory from '../components/DeityVratsDirectory';
import { Calendar, Moon, Sun, Sparkles, ChevronRight, Flame } from 'lucide-react';

interface VratHubPageProps {
  type?: 'hub' | 'ekadashi' | 'purnima' | 'amavasya' | 'deities' | 'pradosham' | 'sankashti';
  initialObservanceId?: string;
  currentLang?: LanguageCode;
  onNavigate: (path: string) => void;
}

export default function VratHubPage({ type = 'hub', initialObservanceId, currentLang = 'en', onNavigate }: VratHubPageProps) {
  const [activeTab, setActiveTab] = useState<'ekadashi' | 'purnima' | 'amavasya' | 'deities'>(
    type === 'hub' ? 'deities' : (type === 'pradosham' || type === 'sankashti' || type === 'deities' ? 'deities' : (type as any))
  );

  const localizedPageTitle = type === 'ekadashi'
    ? `${getUIText(currentLang, 'nextEkadashi', 'Ekadashi')} 2027`
    : type === 'purnima'
    ? `${getUIText(currentLang, 'nextPurnima', 'Purnima')} 2027`
    : type === 'amavasya'
    ? `${getUIText(currentLang, 'nextAmavasya', 'Amavasya')} 2027`
    : type === 'pradosham'
    ? 'Pradosham Dates 2027 (Lord Shiva)'
    : type === 'sankashti'
    ? 'Sankashti Chaturthi 2027 (Lord Vinayaka)'
    : getUIText(currentLang, 'vrat', 'Vrat & Upvas (Sacred Deity Observances)');

  const breadcrumbs = [
    { name: getUIText(currentLang, 'home', 'Home'), url: '/' },
    { name: localizedPageTitle, url: `/${type === 'hub' ? 'vrat' : type}/2027/` }
  ];

  return (
    <div className="space-y-8">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      {/* Hero Header */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-[#FAF1EC] to-[#F5ECE5] rounded-2xl border border-[#E8DCD4]">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#9A3412] mb-1">
          {currentLang === 'mr' ? 'उपवास दिनदर्शिका · वैदिक व्रत २०२७' : currentLang === 'hi' ? 'व्रत पंचांग · वैदिक उपवास २०२७' : 'Fasting Calendars · Vedic Upvas 2027'}
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-stone-900 font-serif">
          {type === 'ekadashi'
            ? (currentLang === 'mr' ? 'सर्व २४ एकादशी २०२७ व पारण वेळ' : currentLang === 'hi' ? 'एकादशी २०२७ तिथियां एवं पारण समय' : 'Ekadashi 2027 Dates & Parana Timings')
            : type === 'purnima'
            ? (currentLang === 'mr' ? 'पौर्णिमा २०२७ तारखा व चंद्रोदय वेळ' : currentLang === 'hi' ? 'पूर्णिमा २०२७ तिथियां एवं चन्द्रोदय समय' : 'Purnima 2027 Dates & Moonrise Timings')
            : type === 'amavasya'
            ? (currentLang === 'mr' ? 'अमावास्या २०२७ तारखा व पितृ तर्पण' : currentLang === 'hi' ? 'अमावस्या २०२७ तिथियां एवं पितृ तर्पण' : 'Amavasya 2027 Dates & Pitru Tarpan')
            : getUIText(currentLang, 'fastingSchedules', 'Sacred Hindu Vrats 2027 (व्रत एवं उपवास)')}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
          {currentLang === 'mr'
            ? 'एकादशी, पौर्णिमा, अमावास्या, प्रदोष आणि संकष्टी चतुर्थीचे अचूक उपवास वेळापत्रक, पारण वेळ, धार्मिक महत्त्व आणि विधी नियम.'
            : currentLang === 'hi'
            ? 'एकादशी, पूर्णिमा, अमावस्या, प्रदोष एवं संकष्टी चतुर्थी के प्रामाणिक व्रत, पारण समय, धार्मिक महत्व एवं पूजन नियम।'
            : 'Accurate fasting schedules, parana windows, religious significance, and ritual rules for Ekadashi, Purnima, Amavasya, Pradosh, and Sankashti Chaturthi.'}
        </p>

        {/* Tab switchers */}
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('deities')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'deities'
                ? 'bg-[#9A3412] text-white shadow-xs'
                : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-50'
            }`}
          >
            {currentLang === 'hi' ? '🕉️ देवी-देवता एवं विशेष व्रत' : currentLang === 'mr' ? '🕉️ देव-देवता व विशेष व्रत' : '🕉️ Deities & Sacred Vrats'}
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('ekadashi');
              if (type !== 'hub') onNavigate('/ekadashi/2027');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'ekadashi'
                ? 'bg-[#9A3412] text-white'
                : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-50'
            }`}
          >
            {getUIText(currentLang, 'all24Ekadashis', 'All 24 Ekadashis')}
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('purnima');
              if (type !== 'hub') onNavigate('/purnima/2027');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'purnima'
                ? 'bg-[#9A3412] text-white'
                : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-50'
            }`}
          >
            {getUIText(currentLang, 'fullMoonPurnima', 'Purnima (Satyanarayan)')}
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('amavasya');
              if (type !== 'hub') onNavigate('/amavasya/2027');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'amavasya'
                ? 'bg-[#9A3412] text-white'
                : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-50'
            }`}
          >
            {getUIText(currentLang, 'newMoonAmavasya', 'Amavasya (No Moon / Tarpan)')}
          </button>
        </div>
      </div>

      <AdSlot type="top" />

      {/* Render Deity Vrats Directory if deities tab is active */}
      {activeTab === 'deities' && (
        <DeityVratsDirectory
          currentLang={currentLang}
          onNavigate={onNavigate}
          initialSelectedId={initialObservanceId}
        />
      )}

      {/* Monthly Interactive Upcoming Vrats Section with E-E-A-T Shastric Details */}
      <MonthlyVratSection
        initialMonthIndex={new Date().getMonth()}
        year="2027"
        currentLang={currentLang}
        onNavigate={onNavigate}
      />

      {/* Ekadashi Section */}
      {activeTab === 'ekadashi' && (
        <section className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="px-6 py-4 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-stone-900 font-serif">
                {currentLang === 'mr' ? '२०२७ मधील सर्व २४ एकादशी (एकादशी व्रत सूची)' : currentLang === 'hi' ? '२०२७ की सभी २४ एकादशियां (एकादशी व्रत सूची)' : 'All 24 Ekadashis in 2027 (एकादशी व्रत सूची)'}
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                {currentLang === 'mr' ? 'उपवासाच्या अचूक तारखा आणि दुसऱ्या दिवशी सकाळी पारण करण्याची वेळ' : currentLang === 'hi' ? 'सटीक व्रत तिथियां एवं अगले दिन प्रातः पारण समय अवधि' : 'Exact fasting dates and next-morning Parana break-fast time intervals'}
              </p>
            </div>
            <span className="text-xs font-mono text-stone-500">{EKADASHI_2027.length} {getUIText(currentLang, 'verifiedDates', 'Listed')}</span>
          </div>

          <div className="divide-y divide-stone-100">
            {EKADASHI_2027.map((ek) => {
              const localizedDay = getWeekdayLocalized(ek.dayOfWeek2027, currentLang);
              const localizedPaksha = getPakshaLocalized(ek.paksha, currentLang);
              return (
                <div key={ek.id} className="p-5 hover:bg-stone-50/70 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs text-[#9A3412] font-semibold uppercase tracking-wider">
                        {localizedPaksha} · {ek.hinduMonth}
                      </span>
                      <h3 className="text-base font-bold text-stone-900 mt-0.5 font-serif">
                        {ek.name}
                      </h3>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="text-sm font-bold text-stone-900 font-mono">
                        {ek.date2027} ({localizedDay})
                      </div>
                      <div className="text-xs text-emerald-800 font-semibold mt-0.5">
                        {getUIText(currentLang, 'paranaTiming', 'Parana')}: {ek.paranaTime}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    {ek.significance}
                  </p>

                  <div className="mt-2 text-xs text-stone-500 italic bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                    {currentLang === 'mr' ? 'कथा' : 'Katha'}: {ek.storySummary}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Purnima Section */}
      {activeTab === 'purnima' && (
        <section className="bg-white rounded-3xl border-2 border-amber-300 overflow-hidden shadow-md">
          <div className="px-6 py-4.5 bg-gradient-to-r from-stone-950 via-slate-900 to-stone-950 border-b-2 border-amber-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-serif tracking-wide flex items-center gap-2">
                <Moon className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span>{currentLang === 'mr' ? 'पौर्णिमा तारखा २०२७ (पौर्णिमा व्रत सूची)' : currentLang === 'hi' ? 'पूर्णिमा तिथियां २०२७ (पूर्णिमा व्रत सूची)' : 'Purnima Dates 2027 (पूर्णिमा तिथियाँ)'}</span>
              </h2>
              <p className="text-xs text-amber-200/90 mt-0.5 font-medium">
                {currentLang === 'mr' ? 'पौर्णिमा तिथी, संध्याकाळची चंद्रोदय वेळ आणि सत्यनारायण पूजा मुहूर्त' : currentLang === 'hi' ? 'पूर्णिमा तिथि, सायंकालीन चन्द्रोदय एवं सत्यनारायण पूजन वेला' : 'Full moon tithi timings, evening moonrise, and Satyanarayan Puja windows'}
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-950 bg-amber-400 px-3 py-1 rounded-full border border-amber-300 shadow-xs self-start sm:self-auto">
              {PURNIMA_2027.length} {getUIText(currentLang, 'verifiedDates', 'Listed')}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-900 text-amber-300 uppercase font-black text-[11px] tracking-wider border-b border-stone-700">
                <tr>
                  <th className="px-4 py-3.5">{currentLang === 'mr' ? 'पौर्णिमा व्रत' : currentLang === 'hi' ? 'पूर्णिमा व्रत' : 'Purnima Observance'}</th>
                  <th className="px-4 py-3.5">{getUIText(currentLang, 'gregorianDate', 'Date & Day')}</th>
                  <th className="px-4 py-3.5">{getUIText(currentLang, 'hinduMonthAmavasyantLabel', 'Hindu Month')}</th>
                  <th className="px-4 py-3.5">{getUIText(currentLang, 'moonrise', 'Moonrise Time')}</th>
                  <th className="px-4 py-3.5">{getUIText(currentLang, 'significance', 'Significance')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {PURNIMA_2027.map((p, idx) => {
                  const localizedDay = getWeekdayLocalized(p.dayOfWeek2027, currentLang);
                  return (
                    <tr key={p.id} className={`transition-colors ${idx % 2 === 0 ? 'bg-white hover:bg-amber-50/50' : 'bg-stone-50/90 hover:bg-amber-50/50'}`}>
                      <td className="px-4 py-3.5 font-bold text-stone-950 font-serif text-sm sm:text-base">
                        {p.name}
                      </td>
                      <td className="px-4 py-3.5 font-mono font-bold text-stone-950 whitespace-nowrap">
                        <span className="bg-stone-100 px-2.5 py-1 rounded-lg border border-stone-300">
                          {p.date2027} ({localizedDay})
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-stone-900 font-semibold whitespace-nowrap">
                        {p.hinduMonth}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className="font-mono font-black text-amber-950 bg-amber-300 px-2.5 py-1 rounded-lg border border-amber-400 text-xs sm:text-sm">
                          🌙 {p.moonriseTime}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-stone-800 font-medium text-xs leading-relaxed max-w-md">
                        {p.significance}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Amavasya Section */}
      {activeTab === 'amavasya' && (
        <section className="bg-white rounded-3xl border-2 border-stone-400 overflow-hidden shadow-md">
          <div className="px-6 py-4.5 bg-gradient-to-r from-stone-950 via-slate-900 to-stone-950 border-b-2 border-amber-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-serif tracking-wide flex items-center gap-2">
                <Moon className="w-5 h-5 text-amber-300" />
                <span>{currentLang === 'mr' ? 'अमावास्या तारखा २०२७ (पितृ तर्पण)' : currentLang === 'hi' ? 'अमावस्या तिथियां २०२७ (पितृ तर्पण)' : 'Amavasya Dates 2027 (अमावस्या तिथियाँ)'}</span>
              </h2>
              <p className="text-xs text-amber-200/90 mt-0.5 font-medium">
                {currentLang === 'mr' ? 'पितृ तर्पण, श्राद्ध आणि पूर्वजांच्या स्मरणासाठी शुभ तिथी' : currentLang === 'hi' ? 'पितृ तर्पण, श्राद्ध एवं पूर्वज शांति हेतु अमावस्या तिथियां' : 'New moon dates for Pitru Tarpan, Shradh, and ancestor libations'}
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-950 bg-amber-400 px-3 py-1 rounded-full border border-amber-300 shadow-xs self-start sm:self-auto">
              {AMAVASYA_2027.length} {getUIText(currentLang, 'verifiedDates', 'Listed')}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-900 text-amber-300 uppercase font-black text-[11px] tracking-wider border-b border-stone-700">
                <tr>
                  <th className="px-4 py-3.5">{currentLang === 'mr' ? 'अमावास्या नाव' : currentLang === 'hi' ? 'अमावस्या नाम' : 'Amavasya Name'}</th>
                  <th className="px-4 py-3.5">{getUIText(currentLang, 'gregorianDate', 'Date & Day')}</th>
                  <th className="px-4 py-3.5">{getUIText(currentLang, 'hinduMonthAmavasyantLabel', 'Hindu Month')}</th>
                  <th className="px-4 py-3.5">{getUIText(currentLang, 'significance', 'Significance')}</th>
                  <th className="px-4 py-3.5">{currentLang === 'mr' ? 'तर्पण नियम' : currentLang === 'hi' ? 'तर्पण नियम' : 'Tarpan Rules'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {AMAVASYA_2027.map((a, idx) => {
                  const localizedDay = getWeekdayLocalized(a.dayOfWeek2027, currentLang);
                  return (
                    <tr key={a.id} className={`transition-colors ${idx % 2 === 0 ? 'bg-white hover:bg-stone-100' : 'bg-stone-50/90 hover:bg-stone-100'}`}>
                      <td className="px-4 py-3.5 font-bold text-stone-950 font-serif text-sm sm:text-base">
                        {a.name}
                      </td>
                      <td className="px-4 py-3.5 font-mono font-bold text-stone-950 whitespace-nowrap">
                        <span className="bg-stone-100 px-2.5 py-1 rounded-lg border border-stone-300">
                          {a.date2027} ({localizedDay})
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-stone-900 font-semibold whitespace-nowrap">
                        {a.hinduMonth}
                      </td>
                      <td className="px-4 py-3.5 text-stone-800 font-medium text-xs leading-relaxed max-w-xs">
                        {a.significance}
                      </td>
                      <td className="px-4 py-3.5 text-stone-800 font-medium text-xs leading-relaxed max-w-xs">
                        <span className="bg-stone-200/80 text-stone-900 px-2.5 py-1 rounded-lg border border-stone-300 inline-block font-semibold">
                          {a.tarpanRules}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <ShareButtons
        title={`${localizedPageTitle} – NewsDarshan`}
        url="https://www.newsdarshan.in/vrat"
      />

      <AdSlot type="before-footer" />
    </div>
  );
}
