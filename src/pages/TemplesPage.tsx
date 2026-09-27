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
  Search,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  X,
  ChevronRight,
  BookOpen,
  Calendar,
  ShieldCheck,
  Compass,
  ExternalLink
} from 'lucide-react';

interface TemplesPageProps {
  currentLang?: LanguageCode;
  onNavigate: (path: string) => void;
}

export default function TemplesPage({
  currentLang = 'en',
  onNavigate
}: TemplesPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [activeTempleModal, setActiveTempleModal] = useState<TempleInfo | null>(null);

  const isMarathi = currentLang === 'mr';
  const isHindi = currentLang === 'hi';
  const isGujarati = currentLang === 'gu';
  const isIndic = isMarathi || isHindi || isGujarati;

  const breadcrumbs = [
    { name: getUIText(currentLang, 'home', 'Home'), url: '/' },
    { name: getUIText(currentLang, 'temples', 'Famous Hindu Temples & Timings'), url: '/temples/' }
  ];

  const categories = [
    {
      id: 'all',
      label: isMarathi ? 'सर्व मंदिरे' : isHindi ? 'सभी मंदिर' : isGujarati ? 'બધા મંદિરો' : 'All Temples (सभी मंदिर)'
    },
    {
      id: 'jyotirlinga',
      label: isMarathi ? '🕉️ १२ ज्योतिर्लिंग' : isHindi ? '🕉️ द्वादश ज्योतिर्लिंग' : isGujarati ? '🕉️ ૧૨ જ્યોતિર્લિંગ' : '🕉️ 12 Jyotirlingas'
    },
    {
      id: 'vishnu',
      label: isMarathi ? '🪷 विष्णू, कृष्ण व राम' : isHindi ? '🪷 विष्णु, कृष्ण एवं राम' : isGujarati ? '🪷 વિષ્ણુ, કૃષ્ણ અને રામ' : '🪷 Vishnu, Krishna & Rama'
    },
    {
      id: 'shaktipeeth',
      label: isMarathi ? '🔱 शक्तीपीठ व देवी धाम' : isHindi ? '🔱 शक्तिपीठ एवं देवी धाम' : isGujarati ? '🔱 શક્તિપીઠ અને દેવી' : '🔱 Shaktipeeth & Devi'
    },
    {
      id: 'international',
      label: isMarathi ? '🌍 परदेशातील प्रसिद्ध मंदिरे' : isHindi ? '🌍 विदेश स्थित भव्य मंदिर' : isGujarati ? '🌍 વિદેશના હિન્દુ મંદિરો' : '🌍 Foreign & Global Mandirs'
    },
    {
      id: 'ganesha',
      label: isMarathi ? '🐘 श्री गणेश मंदिरे' : isHindi ? '🐘 श्री गणेश मंदिर' : isGujarati ? '🐘 શ્રી ગણેશ મંદિરો' : '🐘 Ganesha Temples'
    }
  ];

  const regions = [
    { id: 'all', label: getUIText(currentLang, 'allRegions', 'All Regions') },
    { id: 'international', label: isMarathi ? '🌍 परदेश / विदेश (Foreign)' : isHindi ? '🌍 विदेश / अंतरराष्ट्रीय (Foreign)' : isGujarati ? '🌍 વિદેશના દેશો (Foreign)' : '🌍 Foreign Countries' },
    { id: 'north', label: getUIText(currentLang, 'northIndia', 'North India') },
    { id: 'south', label: getUIText(currentLang, 'southIndia', 'South India') },
    { id: 'west', label: getUIText(currentLang, 'westIndia', 'West India') },
    { id: 'east', label: getUIText(currentLang, 'eastIndia', 'East India') },
    { id: 'central', label: getUIText(currentLang, 'centralIndia', 'Central India') }
  ];

  const filteredTemples = FAMOUS_TEMPLES.filter((temple) => {
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      temple.name.toLowerCase().includes(query) ||
      temple.nameHi.toLowerCase().includes(query) ||
      temple.deity.toLowerCase().includes(query) ||
      temple.city.toLowerCase().includes(query) ||
      temple.state.toLowerCase().includes(query) ||
      (temple.country && temple.country.toLowerCase().includes(query));

    if (!matchesSearch) return false;
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'international') {
        if (temple.region !== 'international' && temple.category !== 'international') return false;
      } else if (temple.category !== selectedCategory) {
        return false;
      }
    }
    if (selectedRegion !== 'all' && temple.region !== selectedRegion) return false;

    return true;
  });

  return (
    <div className="space-y-8 sm:space-y-12">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      {/* Hero Header */}
      <section className="p-6 sm:p-10 bg-gradient-to-r from-[#FFFDF9] via-[#FAF3EC] to-[#F5ECE3] rounded-3xl border-2 border-[#E6C88A] shadow-sm">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9A3412] mb-2">
          <Landmark className="w-4 h-4" />
          <span>{isMarathi ? 'पवित्र तीर्थ दर्शन मार्गदर्शक' : isHindi ? 'पवित्र तीर्थ दर्शन गाइड' : 'Holy Pilgrimage Darshan & Timing Guide'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-serif">
          {isMarathi
            ? 'प्रसिद्ध हिंदू मंदिरे व आंतरराष्ट्रीय तीर्थ – दर्शन, उघडणे-बंद होण्याची वेळ व आरती वेळापत्रक'
            : isHindi
            ? 'प्रसिद्ध हिन्दू मंदिर एवं विदेश स्थित पावन मंदिर – दर्शन, खुलने-बंद होने का समय व आरती सारणी'
            : 'Famous Hindu Temples & Foreign Country Mandirs – Opening & Aarti Timings'}
        </h1>
        <p className="text-base sm:text-lg text-stone-700 mt-3 max-w-3xl leading-relaxed">
          {isMarathi
            ? 'काशी विश्वनाथ, अयोध्या, महाकालेश्वरसह अंकोरवाट (कंबोडिया), पशुपतिनाथ (नेपाल), अक्षरधाम (न्यू जर्सी, अमेरिका), बाटु गुहा (मलेशिया), अबू धाबी मंदिर आणि लंडन नीसडन मंदिराच्या दर्शनाची वेळ, आरती वेळापत्रक आणि नियम.'
            : isHindi
            ? 'काशी विश्वनाथ, अयोध्या, महाकालेश्वर सहित अंकोरवाट (कंबोडिया), पशुपतिनाथ (नेपाल), अक्षरधाम (न्यू जर्सी, अमेरिका), बाटु गुफाएं (मलेशिया), अबू धाबी मंदिर एवं लंडन नीसडन मंदिर के दर्शन समय, आरती सारणी एवं नियम।'
            : 'Comprehensive pilgrimage timetable: verified morning and evening darshan hours, daily Aarti schedules, dress codes, and prasad for India’s holiest shrines and magnificent foreign Hindu temples across USA, Nepal, Cambodia, UAE, Malaysia, Indonesia, UK & more.'}
        </p>

        {/* Search Input */}
        <div className="mt-6 max-w-2xl relative">
          <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={isMarathi ? 'मंदिर, देवता, शहर किंवा देश शोधा (उदा. अंकोरवाट, पशुपतिनाथ, अक्षरधाम, काशी)...' : isHindi ? 'मंदिर, भगवान, शहर या देश खोजें (उदा. अंकोरवाट, पशुपतिनाथ, अक्षरधाम, अबू धाबी, काशी)...' : 'Search temple by name, deity, city, or country (e.g. Angkor Wat, Pashupatinath, Akshardham, Abu Dhabi, Kashi)...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-stone-300 rounded-2xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#9A3412]/30 focus:border-[#9A3412] shadow-sm text-base"
          />
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="space-y-3">
        {/* Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[#9A3412] text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Region Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-stone-500 font-semibold uppercase tracking-wider mr-1">
            {isMarathi ? 'प्रदेश:' : isHindi ? 'क्षेत्र:' : 'Region:'}
          </span>
          {regions.map((reg) => (
            <button
              key={reg.id}
              type="button"
              onClick={() => setSelectedRegion(reg.id)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedRegion === reg.id
                  ? 'bg-amber-100 text-amber-900 border border-amber-300 font-bold'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              {reg.label}
            </button>
          ))}
        </div>
      </div>

      <AdSlot type="top" />

      {/* Temples Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemples.map((temple) => (
          <div
            key={temple.id}
            className="vedic-card rounded-2xl p-6 bg-white border border-[#E7D6CB] hover:border-[#9A3412] transition-all flex flex-col justify-between shadow-2xs hover:shadow-md"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[11px] font-bold text-[#9A3412] uppercase tracking-wider bg-[#FAF1EC] px-2.5 py-0.5 rounded-md inline-flex items-center gap-1">
                    {temple.region === 'international' ? (
                      <>
                        <span>🌍</span>
                        <span>{temple.country || (isMarathi ? 'परदेश मंदिर' : isHindi ? 'विदेश मंदिर' : 'International')}</span>
                      </>
                    ) : temple.category === 'jyotirlinga' ? (
                      isMarathi ? 'ज्योतिर्लिंग' : isHindi ? 'ज्योतिर्लिंग' : 'Jyotirlinga'
                    ) : temple.category === 'shaktipeeth' ? (
                      isMarathi ? 'महा शक्तीपीठ' : isHindi ? 'महा शक्तिपीठ' : 'Shaktipeeth'
                    ) : (
                      isMarathi ? 'पावन तीर्थ' : isHindi ? 'पवित्र तीर्थ' : 'Holy Shrine'
                    )}
                  </span>
                  <h2
                    onClick={() => onNavigate(`/temples/${temple.id}`)}
                    className="text-xl font-bold text-stone-900 hover:text-[#9A3412] cursor-pointer font-serif mt-2 transition-colors"
                  >
                    {isIndic ? temple.nameHi : temple.name}
                  </h2>
                  <div className="text-xs text-stone-500 flex items-center gap-1 mt-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#9A3412] shrink-0" />
                    <span>
                      {temple.city}, {temple.state}
                      {temple.country ? ` (${temple.country})` : ''}
                    </span>
                  </div>
                </div>

                <div
                  onClick={() => onNavigate(`/temples/${temple.id}`)}
                  className="w-10 h-10 rounded-xl bg-amber-100 text-[#9A3412] flex items-center justify-center text-xl shrink-0 font-serif border border-amber-200 cursor-pointer hover:scale-105 transition-transform"
                >
                  {temple.region === 'international' ? '🌍' : temple.category === 'jyotirlinga' ? '🕉️' : temple.category === 'shaktipeeth' ? '🔱' : '🪷'}
                </div>
              </div>

              {/* Deity */}
              <div className="mt-3 text-xs sm:text-sm font-semibold text-stone-800 bg-stone-50 p-2.5 rounded-xl border border-stone-200/80">
                <span className="text-stone-500 mr-1">{isMarathi ? 'मुख्य देवता:' : isHindi ? 'मुख्य देवता:' : 'Deity:'}</span>
                <span>{isIndic ? temple.deityHi : temple.deity}</span>
              </div>

              {/* Open & Close Timings Box */}
              <div className="mt-4 p-3.5 bg-gradient-to-br from-[#FFFDF9] to-[#FAF5EE] rounded-xl border border-amber-200 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#9A3412]" />
                  <span>{getUIText(currentLang, 'templeOpenClose', 'Daily Darshan Hours')}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="bg-white p-2 rounded-lg border border-stone-200">
                    <span className="text-stone-500 block text-[11px] font-medium">{getUIText(currentLang, 'morningDarshan', 'Morning Session:')}</span>
                    <strong className="text-stone-900 text-xs sm:text-sm font-bold block mt-0.5 tabular-nums">
                      {temple.morningOpen} – {temple.morningClose}
                    </strong>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-stone-200">
                    <span className="text-stone-500 block text-[11px] font-medium">{getUIText(currentLang, 'eveningDarshan', 'Evening Session:')}</span>
                    <strong className="text-stone-900 text-xs sm:text-sm font-bold block mt-0.5 tabular-nums">
                      {temple.eveningOpen} – {temple.eveningClose}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Significance preview */}
              <p className="mt-3 text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
                {isIndic ? temple.significanceHi : temple.significance}
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setActiveTempleModal(temple)}
                className="text-xs font-semibold text-stone-500 hover:text-stone-800 underline decoration-dotted transition-colors"
                title="Quick Preview"
              >
                {temple.aartis.length} {isMarathi ? 'आरत्या' : isHindi ? 'आरतियां' : 'Aartis'}
              </button>

              <button
                type="button"
                onClick={() => onNavigate(`/temples/${temple.id}`)}
                className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-[#9A3412] hover:bg-[#802B0F] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-2xs"
              >
                <span>{isMarathi ? 'आरती व दर्शन वेळ' : isHindi ? 'आरती व दर्शन सारणी' : 'Aarti & Darshan Timings'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTemples.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-stone-200">
          <p className="text-stone-500 text-base">
            {isMarathi
              ? `"${searchTerm}" शी संबंधित कोणतेही मंदिर सापडले नाही. कृपया दुसरे नाव शोधा.`
              : isHindi
              ? `"${searchTerm}" से संबंधित कोई मंदिर नहीं मिला। कृपया अन्य नाम खोजें।`
              : `No temples found matching "${searchTerm}". Try searching by another city or deity.`}
          </p>
        </div>
      )}

      {/* Temple Details Modal */}
      {activeTempleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF7F2] border border-[#E7D6CB] w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-stone-200 bg-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#9A3412] to-[#E8602E] text-white flex items-center justify-center text-2xl font-serif shadow-xs">
                  ॐ
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
                    {isIndic ? activeTempleModal.nameHi : activeTempleModal.name}
                  </h3>
                  <div className="text-xs text-stone-500 flex items-center gap-1.5 mt-0.5 font-medium flex-wrap">
                    <MapPin className="w-3.5 h-3.5 text-[#9A3412] shrink-0" />
                    <span>
                      {activeTempleModal.city}, {activeTempleModal.state}
                      {activeTempleModal.country ? ` (${activeTempleModal.country})` : ''}
                    </span>
                    <span>•</span>
                    <span className="text-[#9A3412] font-semibold">{isIndic ? activeTempleModal.deityHi : activeTempleModal.deity}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveTempleModal(null)}
                className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1 bg-white">
              
              {/* Darshan Hours Banner */}
              <div className="p-4 bg-gradient-to-r from-amber-50 to-[#FAF1EC] rounded-2xl border border-amber-200">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-[#9A3412]" />
                  <span>{getUIText(currentLang, 'templeOpenClose', 'Daily Temple Open & Close Timings')}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white p-3 rounded-xl border border-stone-200">
                    <span className="text-xs text-stone-500 block font-medium">{getUIText(currentLang, 'morningDarshan', 'Morning Opening:')}</span>
                    <strong className="text-stone-900 text-base font-bold tabular-nums block mt-1">
                      {activeTempleModal.morningOpen} to {activeTempleModal.morningClose}
                    </strong>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-stone-200">
                    <span className="text-xs text-stone-500 block font-medium">{getUIText(currentLang, 'eveningDarshan', 'Evening Opening:')}</span>
                    <strong className="text-stone-900 text-base font-bold tabular-nums block mt-1">
                      {activeTempleModal.eveningOpen} to {activeTempleModal.eveningClose}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Complete Daily Aarti Timetable */}
              <div>
                <h4 className="text-base font-bold text-stone-900 font-serif mb-3 flex items-center gap-2 text-[#9A3412]">
                  <Sparkles className="w-4 h-4" />
                  <span>{getUIText(currentLang, 'aartiSchedule', 'Daily Aarti & Ritual Timetable')}</span>
                </h4>

                <div className="space-y-2.5">
                  {activeTempleModal.aartis.map((aarti, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div>
                        <div className="font-bold text-sm text-stone-900 font-serif">
                          {isIndic ? aarti.nameHi : aarti.name}
                        </div>
                        <div className="text-xs text-stone-600 mt-0.5">
                          {aarti.description}
                        </div>
                      </div>
                      <div className="px-3 py-1.5 bg-amber-100/80 text-amber-950 rounded-lg text-xs font-bold tabular-nums whitespace-nowrap self-start sm:self-auto border border-amber-300">
                        {aarti.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dress Code & Guidelines */}
              <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-200 space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-700" />
                  <span>{getUIText(currentLang, 'dressCode', 'Temple Dress Code & Entry Guidelines')}</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed pt-1">
                  {isIndic ? activeTempleModal.dressCodeHi : activeTempleModal.dressCode}
                </p>
              </div>

              {/* Significance & Prasadam */}
              <div className="space-y-3 pt-2 text-xs sm:text-sm text-stone-700">
                <div>
                  <strong className="text-stone-900 font-serif block text-sm mb-1">
                    {isMarathi ? 'पौराणिक व ऐतिहासिक महत्त्व:' : isHindi ? 'पौराणिक महत्व:' : 'Historical & Puranic Significance:'}
                  </strong>
                  <p className="leading-relaxed text-stone-600">
                    {isIndic ? activeTempleModal.significanceHi : activeTempleModal.significance}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                    <span className="font-bold text-stone-900 block mb-0.5">{isMarathi ? 'प्रसाद:' : isHindi ? 'प्रसादम:' : 'Holy Prasadam:'}</span>
                    <span className="text-stone-600 text-xs">{activeTempleModal.prasadam}</span>
                  </div>
                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                    <span className="font-bold text-stone-900 block mb-0.5">{isMarathi ? 'दर्शनाची सर्वोत्तम वेळ:' : isHindi ? 'दर्शन का सर्वोत्तम समय:' : 'Best Time to Visit:'}</span>
                    <span className="text-stone-600 text-xs">{activeTempleModal.bestTimeToVisit}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#FAF7F2] border-t border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-600 shrink-0">
              <span className="hidden sm:inline">{isMarathi ? 'टीप: सण आणि ग्रहण काळात वेळेत बदल होऊ शकतो.' : isHindi ? 'नोट: विशेष पर्वों पर समय में परिवर्तन संभव है।' : 'Note: Timings subject to change on festival days.'}</span>
              <div className="flex items-center gap-2 ml-auto">
                <button
                  type="button"
                  onClick={() => {
                    const id = activeTempleModal.id;
                    setActiveTempleModal(null);
                    onNavigate(`/temples/${id}`);
                  }}
                  className="px-3.5 py-2 bg-white border border-[#9A3412] text-[#9A3412] hover:bg-[#FAF1EC] font-bold rounded-xl text-xs transition-colors inline-flex items-center gap-1 shadow-2xs"
                >
                  <span>{isMarathi ? 'संपूर्ण पृष्ठ पहा' : isHindi ? 'पूर्ण पृष्ठ देखें' : 'View Full Page'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTempleModal(null)}
                  className="px-4 py-2 bg-[#9A3412] text-white font-bold rounded-xl text-xs hover:bg-[#78280B] transition-colors"
                >
                  {isMarathi ? 'बंद करा' : isHindi ? 'बंद करें' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Institutional Note */}
      <section className="p-6 bg-white rounded-2xl border border-stone-200 text-xs sm:text-sm text-stone-600 space-y-2">
        <h3 className="text-base font-bold text-stone-900 font-serif">
          {isMarathi ? 'मंदिर दर्शन वेळ व नियम संबंधी सूचना' : isHindi ? 'मंदिर दर्शन समय संबंधी महत्वपूर्ण सूचना' : 'Temple Darshan Timings & Protocols'}
        </h3>
        <p className="leading-relaxed">
          {isMarathi
            ? 'भारतातील प्रसिद्ध मंदिरांमध्ये सकाळची मंगला आरती, दुपारचा राजभोग आणि रात्रीची शयन आरतीच्या वेळी गर्भगृहाचे दरवाजे भाविकांसाठी काही काळासाठी बंद असतात. सूर्यग्रहण आणि चंद्रग्रहणाच्या वेध काळात सर्व मंदिरांचे कपाट आपोआप बंद ठेवले जातात.'
            : isHindi
            ? 'भारत के प्रसिद्ध मंदिरों में प्रातः मंगला आरती, दोपहर का राजभोग तथा रात्रि शयन आरती के समय गर्भगृह के कपाट दर्शनार्थियों के लिए कुछ समय हेतु बंद रहते हैं। सूर्यग्रहण एवं चंद्रग्रहण के सूतक काल में सभी मंदिरों के पट स्वतः बंद कर दिए जाते हैं।'
            : 'During sacred Bhog and Shayan periods, sanctum doors remain closed for brief intervals. During Solar and Lunar eclipses (Sutak Kaal), temples across India remain closed until the purifying post-eclipse holy bath and temple sanctification.'}
        </p>
      </section>

      <ShareButtons
        title="Famous Hindu Temples & Opening Timings – NewsDarshan"
        url="https://www.newsdarshan.in/temples"
      />
    </div>
  );
}
