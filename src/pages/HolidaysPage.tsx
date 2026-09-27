import { useState } from 'react';
import { HOLIDAYS_2027, BANK_HOLIDAYS_2027 } from '../data/calendarData';
import { LanguageCode } from '../types';
import { getUIText, getWeekdayLocalized } from '../data/localization';
import Breadcrumbs from '../components/Breadcrumbs';
import AdSlot from '../components/AdSlot';
import ShareButtons from '../components/ShareButtons';
import { Calendar, Building2, MapPin } from 'lucide-react';

export const INDIAN_STATES: { code: string; name: string }[] = [
  { code: 'ALL', name: 'All India (Central)' },
  { code: 'MH', name: 'Maharashtra' },
  { code: 'WB', name: 'West Bengal' },
  { code: 'GJ', name: 'Gujarat' },
  { code: 'KA', name: 'Karnataka' },
  { code: 'TN', name: 'Tamil Nadu' },
  { code: 'KL', name: 'Kerala' },
  { code: 'TS', name: 'Telangana' },
  { code: 'AP', name: 'Andhra Pradesh' },
  { code: 'DL', name: 'Delhi NCR' },
  { code: 'UP', name: 'Uttar Pradesh' },
  { code: 'BR', name: 'Bihar' },
  { code: 'RJ', name: 'Rajasthan' },
  { code: 'GA', name: 'Goa' },
  { code: 'OD', name: 'Odisha' },
  { code: 'AS', name: 'Assam' }
];

interface HolidaysPageProps {
  isBankHolidays?: boolean;
  selectedStateCode?: string;
  currentLang?: LanguageCode;
  onNavigate: (path: string) => void;
}

export default function HolidaysPage({
  isBankHolidays = false,
  selectedStateCode = 'ALL',
  currentLang = 'en',
  onNavigate
}: HolidaysPageProps) {
  const [activeState, setActiveState] = useState(selectedStateCode);
  const [activeTab, setActiveTab] = useState<'gov' | 'bank'>(isBankHolidays ? 'bank' : 'gov');

  const filteredGovHolidays = HOLIDAYS_2027.filter((h) => {
    if (activeState === 'ALL') return true;
    return h.applicableStates.includes('ALL') || h.applicableStates.includes(activeState);
  });

  const filteredBankHolidays = BANK_HOLIDAYS_2027.filter((bh) => {
    if (activeState === 'ALL') return true;
    return bh.states.includes('ALL') || bh.states.includes(activeState);
  });

  const stateName = INDIAN_STATES.find((s) => s.code === activeState)?.name || 'India';

  const breadcrumbs = [
    { name: getUIText(currentLang, 'home', 'Home'), url: '/' },
    {
      name: isBankHolidays
        ? `${getUIText(currentLang, 'bankHolidays', 'Bank Holidays')} 2027`
        : `${getUIText(currentLang, 'holidays', 'Government Holidays')} 2027`,
      url: isBankHolidays ? '/bank-holidays/2027/' : '/holidays/2027/'
    }
  ];

  return (
    <div className="space-y-8">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      <div className="p-6 sm:p-8 bg-gradient-to-r from-[#FAF1EC] to-[#F5ECE5] rounded-2xl border border-[#E8DCD4]">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#9A3412] mb-1">
          {currentLang === 'mr' ? 'अधिकृत सुट्ट्यांचे वेळापत्रक · २०२७' : currentLang === 'hi' ? 'शासकीय एवं सार्वजनिक अवकाश तालिका · २०२७' : 'Official Gazetted & Public Holidays · 2027'}
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-stone-900 font-serif">
          {activeTab === 'bank'
            ? `${getUIText(currentLang, 'bankHolidays', 'Bank Holidays')} 2027`
            : `${getUIText(currentLang, 'holidays', 'Government Holidays')} 2027`} – {stateName}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
          {currentLang === 'mr'
            ? '२०२७ मधील केंद्र आणि राज्य सरकारी सुट्ट्या, बँकांच्या अधिकृत सुट्ट्या आणि स्थानिक सणांची माहिती.'
            : currentLang === 'hi'
            ? '२०२७ के केन्द्रीय एवं राज्य सरकार के राजपत्रित (गज़टेड) अवकाश तथा बैंक अवकाशों की प्रामाणिक सूची।'
            : 'Verified list of central gazetted, restricted, and state government holidays in 2027. Filter by state to view applicable public and commercial bank closings.'}
        </p>

        {/* Tab & State Controls */}
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1 bg-white border border-stone-300 rounded-xl p-1 text-xs">
            <button
              type="button"
              onClick={() => {
                setActiveTab('gov');
                onNavigate('/holidays/2027');
              }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activeTab === 'gov'
                  ? 'bg-[#9A3412] text-white'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {getUIText(currentLang, 'holidays', 'Government Holidays')}
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('bank');
                onNavigate('/bank-holidays/2027');
              }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activeTab === 'bank'
                  ? 'bg-[#9A3412] text-white'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {getUIText(currentLang, 'bankHolidays', 'Bank Holidays')}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#9A3412]" />
            <select
              value={activeState}
              onChange={(e) => setActiveState(e.target.value)}
              className="text-xs py-1.5 px-3 bg-white border border-stone-300 rounded-lg text-stone-800 font-medium focus:outline-none focus:border-[#9A3412]"
            >
              {INDIAN_STATES.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <AdSlot type="top" />

      {/* Holidays Table */}
      <div className="bg-white rounded-3xl border-2 border-stone-300 overflow-hidden shadow-md">
        <div className="px-6 py-4.5 bg-gradient-to-r from-stone-950 via-slate-900 to-stone-950 border-b-2 border-amber-500/80 flex items-center justify-between">
          <h2 className="text-base font-black text-amber-300 font-serif tracking-wide flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            {activeTab === 'bank' ? 'Bank Closures Schedule' : 'Public Holidays Schedule'} (2027)
          </h2>
          <span className="text-xs font-mono font-bold text-amber-200 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-700/50">
            {activeTab === 'bank' ? filteredBankHolidays.length : filteredGovHolidays.length} Entries for {stateName}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-stone-900 text-amber-300 uppercase font-black text-[11px] tracking-wider border-b-2 border-stone-700">
              <tr>
                <th className="px-4 py-3.5">{currentLang === 'mr' ? 'सुट्टीचे नाव' : currentLang === 'hi' ? 'अवकाश का नाम' : 'Holiday Name'}</th>
                <th className="px-4 py-3.5">{getUIText(currentLang, 'gregorianDate', 'Date')}</th>
                <th className="px-4 py-3.5">{getUIText(currentLang, 'weekday', 'Day of Week')}</th>
                <th className="px-4 py-3.5">{activeTab === 'bank' ? 'RBI Category' : 'Type'}</th>
                <th className="px-4 py-3.5">{currentLang === 'mr' ? 'लागू क्षेत्र' : currentLang === 'hi' ? 'क्षेत्र' : 'Applicable Scope'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {activeTab === 'gov'
                ? filteredGovHolidays.map((h, idx) => {
                    const localizedDay = getWeekdayLocalized(h.dayOfWeek, currentLang);
                    return (
                      <tr key={h.id} className={`transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-stone-50/70'} hover:bg-amber-50/40`}>
                        <td className="px-4 py-3.5 font-bold text-stone-950">
                          {h.name}
                          <span className="block text-[11px] font-medium text-stone-600">
                            {h.description}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 font-mono font-black text-amber-950">
                          {h.date}
                        </td>
                        <td className="px-4 py-3.5 text-stone-800 font-bold">
                          {localizedDay}
                        </td>
                        <td className="px-4 py-3.5">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                              h.type === 'Central'
                                ? 'bg-blue-100 text-blue-900 border border-blue-300'
                                : 'bg-amber-100 text-amber-900 border border-amber-300'
                            }`}
                          >
                            {h.type} Gazetted
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-stone-700 font-medium text-xs">
                          {h.applicableStates.includes('ALL') ? 'Pan-India' : h.applicableStates.join(', ')}
                        </td>
                      </tr>
                    );
                  })
                : filteredBankHolidays.map((bh, idx) => {
                    const localizedDay = getWeekdayLocalized(bh.dayOfWeek, currentLang);
                    return (
                      <tr key={bh.id} className={`transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-stone-50/70'} hover:bg-amber-50/40`}>
                        <td className="px-4 py-3.5 font-bold text-stone-950">
                          {bh.name}
                        </td>
                        <td className="px-4 py-3.5 font-mono font-black text-amber-950">
                          {bh.date}
                        </td>
                        <td className="px-4 py-3.5 text-stone-800 font-bold">
                          {localizedDay}
                        </td>
                        <td className="px-4 py-3.5 text-stone-800 text-xs font-mono font-bold">
                          {bh.category}
                        </td>
                        <td className="px-4 py-3.5 text-stone-700 font-medium text-xs">
                          {bh.states.includes('ALL') ? 'All Indian Banks' : bh.states.join(', ')}
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
      </div>

      <ShareButtons
        title={`${activeTab === 'bank' ? 'Bank' : 'Government'} Holidays 2027 – NewsDarshan`}
        url={`https://www.newsdarshan.in/${activeTab === 'bank' ? 'bank-holidays' : 'holidays'}/2027`}
      />

      <AdSlot type="before-footer" />
    </div>
  );
}
