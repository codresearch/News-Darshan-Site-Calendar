import { useState } from 'react';
import { BABY_NAMES_DATA } from '../data/calendarData';
import { BabyName, LanguageCode } from '../types';
import { getUIText } from '../data/localization';
import Breadcrumbs from '../components/Breadcrumbs';
import AdSlot from '../components/AdSlot';
import ShareButtons from '../components/ShareButtons';
import { Baby, Search, Filter } from 'lucide-react';

interface BabyNamesPageProps {
  currentLang?: LanguageCode;
  onNavigate: (path: string) => void;
}

export default function BabyNamesPage({ currentLang = 'en', onNavigate }: BabyNamesPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState<'All' | 'Boy' | 'Girl'>('All');
  const [selectedRashi, setSelectedRashi] = useState('All');

  const filteredNames = BABY_NAMES_DATA.filter((b) => {
    const matchesGender = genderFilter === 'All' || b.gender === genderFilter;
    const matchesRashi = selectedRashi === 'All' || b.rashi === selectedRashi;
    const matchesSearch =
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.meaning.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGender && matchesRashi && matchesSearch;
  });

  const breadcrumbs = [
    { name: getUIText(currentLang, 'home', 'Home'), url: '/' },
    { name: getUIText(currentLang, 'babyNames', 'Baby Names'), url: '/baby-names/' }
  ];

  return (
    <div className="space-y-8">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      <div className="p-6 sm:p-8 bg-gradient-to-r from-[#FAF1EC] to-[#F5ECE5] rounded-2xl border border-[#E8DCD4]">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#9A3412] mb-1">
          {currentLang === 'mr' ? 'वैदिक नामकरण निर्देशिका · नक्षत्र व राशीनुसार नावे' : currentLang === 'hi' ? 'वैदिक नामकरण डायरेक्टरी · नक्षत्र एवं राशिनुसार नाम' : 'Vedic Namkaran Directory · Nakshatra & Rashi Names'}
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-stone-900 font-serif">
          {currentLang === 'mr' ? 'हिंदू बाळांची शुभ नावे (मुले व मुलींची नावे)' : currentLang === 'hi' ? 'हिन्दू शिशु नाम (लड़के एवं लड़कियों के नाम)' : 'Hindu Baby Names (बच्चों के नाम)'}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
          {currentLang === 'mr'
            ? 'मुले आणि मुलींसाठी शुभ, अर्थपूर्ण संस्कृत आणि आधुनिक हिंदू नावे, जन्म नक्षत्र नामाक्षर आणि अंकशास्त्रासह.'
            : currentLang === 'hi'
            ? 'लड़कों और लड़कियों के लिए शुभ, अर्थपूर्ण संस्कृत एवं आधुनिक हिन्दू नाम, जन्म नक्षत्र नामाक्षर एवं अंकशास्त्र सहित।'
            : 'Discover auspicious, meaningful Sanskrit and modern Hindu baby names for boys and girls, organized with Janma Nakshatra syllables, Vedic origins, and numerology numbers.'}
        </p>

        {/* Filter Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <input
            type="text"
            placeholder={currentLang === 'mr' ? 'नावाने किंवा अर्थाने शोधा...' : currentLang === 'hi' ? 'नाम अथवा अर्थ से खोजें...' : 'Search by baby name or meaning (e.g., Shiva, Peace, Light)...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#9A3412] w-full sm:max-w-xs"
          />

          <div className="flex items-center gap-1.5 p-1 bg-stone-200/60 rounded-lg text-xs font-medium">
            {(['All', 'Boy', 'Girl'] as const).map((g) => {
              const label = g === 'All'
                ? getUIText(currentLang, 'filterAll', 'All')
                : g === 'Boy'
                ? getUIText(currentLang, 'boy', 'Boy')
                : getUIText(currentLang, 'girl', 'Girl');

              return (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGenderFilter(g)}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    genderFilter === g
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

      {/* Names Directory Table */}
      <div className="bg-white rounded-3xl border-2 border-stone-300 overflow-hidden shadow-md">
        <div className="px-6 py-4.5 bg-gradient-to-r from-stone-950 via-slate-900 to-stone-950 border-b-2 border-amber-500/80 flex items-center justify-between">
          <h2 className="text-base font-black text-amber-300 font-serif tracking-wide flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            {currentLang === 'mr' ? 'शुभ नामकरण सूची' : currentLang === 'hi' ? 'शुभ नामकरण सूची' : 'Auspicious Names Directory'}
          </h2>
          <span className="text-xs font-mono font-bold text-amber-200 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-700/50">
            {filteredNames.length} {currentLang === 'mr' ? 'नावे' : 'Matching Names'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-stone-900 text-amber-300 uppercase font-black text-[11px] tracking-wider border-b-2 border-stone-700">
              <tr>
                <th className="px-4 py-3.5">{currentLang === 'mr' ? 'बाळाचे नाव' : currentLang === 'hi' ? 'शिशु नाम' : 'Baby Name'}</th>
                <th className="px-4 py-3.5">{currentLang === 'mr' ? 'लिंग' : currentLang === 'hi' ? 'लिंग' : 'Gender'}</th>
                <th className="px-4 py-3.5">{getUIText(currentLang, 'meaning', 'Spiritual Meaning')}</th>
                <th className="px-4 py-3.5">{getUIText(currentLang, 'rashi', 'Janma Rashi')}</th>
                <th className="px-4 py-3.5">{getUIText(currentLang, 'nakshatra', 'Nakshatra')}</th>
                <th className="px-4 py-3.5 text-right">{getUIText(currentLang, 'numerology', 'Numerology')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {filteredNames.map((item, idx) => (
                <tr key={item.id} className={`transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-stone-50/70'} hover:bg-amber-50/40`}>
                  <td className="px-4 py-3.5 font-black text-stone-950 font-serif text-sm">
                    {item.name}
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        item.gender === 'Boy'
                          ? 'bg-blue-100 text-blue-900 border border-blue-300'
                          : 'bg-rose-100 text-rose-900 border border-rose-300'
                      }`}
                    >
                      {item.gender === 'Boy' ? getUIText(currentLang, 'boy', 'Boy') : getUIText(currentLang, 'girl', 'Girl')}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-stone-800 font-medium">
                    {item.meaning}
                  </td>
                  <td className="px-4 py-3.5 text-stone-900 font-bold">
                    {item.rashi}
                  </td>
                  <td className="px-4 py-3.5 text-stone-700 font-medium">
                    {item.nakshatra} ({item.startingLetter})
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono font-black text-[#9A3412] text-sm">
                    {item.numerology}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ShareButtons
        title="Hindu Baby Names & Meaning – NewsDarshan"
        url="https://www.newsdarshan.in/baby-names"
      />

      <AdSlot type="before-footer" />
    </div>
  );
}
