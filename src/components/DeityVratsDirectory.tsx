import { useState } from 'react';
import { LanguageCode } from '../types';
import {
  SANKASHTI_CHATURTHI,
  VINAYAKA_CHATURTHI,
  PRADOSHAM_DATES,
  DWADASHI_MAHADWADASHI,
  SHIVA_VRAT_CALENDAR,
  SATYANARAYANA_PURNIMA_VRAT,
  NAVAGRAHA_WEEKDAYS_FASTING,
  DEITIES_WEEKDAYS_FASTING,
  SPECIAL_DEITY_VRATS,
  SacredObservanceItem
} from '../data/deityVratsData';
import {
  Sparkles,
  Calendar,
  Flame,
  Moon,
  Sun,
  Shield,
  BookOpen,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Copy,
  Check
} from 'lucide-react';

interface DeityVratsDirectoryProps {
  currentLang?: LanguageCode;
  onNavigate?: (path: string) => void;
  initialSelectedId?: string;
}

export default function DeityVratsDirectory({
  currentLang = 'en',
  onNavigate,
  initialSelectedId
}: DeityVratsDirectoryProps) {
  const [selectedDeityFilter, setSelectedDeityFilter] = useState<string>('all');
  const [expandedItemId, setExpandedItemId] = useState<string | null>(initialSelectedId || 'sankashti-chaturthi');
  const [copiedMantra, setCopiedMantra] = useState<string | null>(null);

  const isHindi = currentLang === 'hi';
  const isMarathi = currentLang === 'mr';

  const allObservances: SacredObservanceItem[] = [
    SANKASHTI_CHATURTHI,
    VINAYAKA_CHATURTHI,
    PRADOSHAM_DATES,
    DWADASHI_MAHADWADASHI,
    SHIVA_VRAT_CALENDAR,
    SATYANARAYANA_PURNIMA_VRAT,
    ...SPECIAL_DEITY_VRATS
  ];

  const filteredObservances = allObservances.filter((item) => {
    if (selectedDeityFilter === 'all') return true;
    if (selectedDeityFilter === 'ganesha') return item.deity.toLowerCase().includes('vinayaka') || item.deity.toLowerCase().includes('ganesh');
    if (selectedDeityFilter === 'shiva') return item.deity.toLowerCase().includes('shiva') || item.deity.toLowerCase().includes('bhairava');
    if (selectedDeityFilter === 'vishnu') return item.deity.toLowerCase().includes('vishnu') || item.deity.toLowerCase().includes('krishna') || item.deity.toLowerCase().includes('satyanarayan');
    if (selectedDeityFilter === 'devi') return item.deity.toLowerCase().includes('durga') || item.deity.toLowerCase().includes('gauri') || item.deity.toLowerCase().includes('shitala');
    if (selectedDeityFilter === 'graha') return item.deity.toLowerCase().includes('surya') || item.deity.toLowerCase().includes('chandra') || item.id.includes('rohini');
    return true;
  });

  const handleCopy = (id: string, text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedMantra(id);
      setTimeout(() => setCopiedMantra(null), 2000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Directory Section Header */}
      <div className="bg-gradient-to-r from-amber-900 via-stone-900 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-amber-600/30">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-3 border border-amber-400/30">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>{isMarathi ? 'वैदिक देव-देवता व्रत व उपवास दिनदर्शिका २०२७' : isHindi ? 'वैदिक देवी-देवता व्रत एवं उपवास पंचांग २०२७' : 'Vedic Deity & Observance Fasting Calendar 2027'}</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-serif font-bold text-amber-100">
          {isMarathi ? 'सर्व देवता व्रत, तिथी व उपवास वेळापत्रक २०२७' : isHindi ? 'समस्त देवी-देवता व्रत, तिथियां एवं उपवास नियम २०२७' : 'Complete Hindu Deities & Sacred Vrat Directory 2027'}
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 mt-2 max-w-3xl leading-relaxed">
          {isMarathi
            ? 'संकष्टी चतुर्थी, विनायक चतुर्थी, प्रदोष, महाद्वादशी, मासिक शिवरात्र, सावन सोमवार, श्री सत्यनारायण व्रत, स्कन्द षष्ठी, कार्तिका दीपम, श्राद्ध, दुर्गाष्टमी, कालाष्टमी, रोहिणी व्रत, सूर्य संक्रांती, चंद्र दर्शन, मंगळागौर, इष्टी-अन्वाधान, इस्कॉन एकादशी, दशावतार व चातुर्मास.'
            : isHindi
            ? 'संकष्टी चतुर्थी, विनायक चतुर्थी, प्रदोष, महाद्वादशी, मासिक शिवरात्रि, सावन सोमवार, श्री सत्यनारायण कथा, नवग्रह वार व्रत, स्कन्द षष्ठी, कार्तिगै दीपम, श्राद्ध तिथियां, दुर्गाष्टमी, कालाष्टमी, रोहिणी व्रत, संक्रांति, चन्द्र दर्शन, मंगला गौरी, इष्टि-अन्वाधान, इस्कॉन एकादशी, दशावतार एवं चातुर्मास।'
            : 'Authentic 2027 schedules, puja vidhi, dietary restrictions, and scriptural mantras for Sankashti Chaturthi, Pradosham, Mahadwadashi, Masik Shivaratri, Sawan Somwar, Satyanarayan Vrat, Navagraha Fasting, Skanda Sashti, Shradh, Durgashtami, Kalashtami, Rohini Vrat, Sankranti, Chandra Darshan, Mangala Gauri, Ishti-Anvadhan, and Chaturmasa.'}
        </p>

        {/* Quick Filter Buttons */}
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            { id: 'all', label: isHindi ? 'सभी व्रत (All)' : 'All Vrats' },
            { id: 'ganesha', label: isHindi ? 'भगवान गणेश (Lord Vinayaka)' : 'Lord Ganesha (Vinayaka)' },
            { id: 'shiva', label: isHindi ? 'भगवान शिव व भैरव (Lord Shiva)' : 'Lord Shiva & Bhairava' },
            { id: 'vishnu', label: isHindi ? 'भगवान विष्णु व कृष्ण (Lord Vishnu)' : 'Lord Vishnu & Krishna' },
            { id: 'devi', label: isHindi ? 'देवी दुर्गा व गौरी (Goddess Shakti)' : 'Goddess Durga & Gauri' },
            { id: 'graha', label: isHindi ? 'सूर्य, चन्द्र व नवग्रह (Planets)' : 'Surya, Chandra & Grahas' }
          ].map((btn) => (
            <button
              key={btn.id}
              type="button"
              onClick={() => setSelectedDeityFilter(btn.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedDeityFilter === btn.id
                  ? 'bg-amber-400 text-stone-950 shadow-md font-bold'
                  : 'bg-stone-800/80 text-stone-200 hover:bg-stone-700 border border-stone-600'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Observances List Accordion */}
      <div className="space-y-4">
        {filteredObservances.map((item) => {
          const isExpanded = expandedItemId === item.id;
          return (
            <div
              key={item.id}
              id={`observance-${item.id}`}
              className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden transition-all duration-200"
            >
              {/* Header Bar */}
              <div
                onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-amber-50/40 transition-colors select-none"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200">
                      {item.deity}
                    </span>
                    <span className="text-[11px] text-stone-500 font-mono">
                      {item.frequency}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif mt-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-1 mt-0.5">
                    {item.significance}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                  <span className="text-xs font-mono font-bold bg-stone-100 text-stone-800 px-3 py-1 rounded-full border border-stone-300">
                    {item.dates2027.length} Dates in 2027
                  </span>
                  <div className="p-1 rounded-full bg-stone-100 text-stone-600">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Expanded Details Body */}
              {isExpanded && (
                <div className="p-5 sm:p-6 border-t border-stone-200 bg-stone-50/50 space-y-6">
                  {/* Significance & Fast Type */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 bg-white p-4 rounded-xl border border-stone-200">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-amber-700" />
                        <span>{isHindi ? 'धार्मिक महत्व एवं शास्त्र प्रमाण' : 'Significance & Spiritual Merit'}</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                        {item.significance}
                      </p>
                    </div>

                    <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1 flex items-center gap-1.5">
                        <Flame className="w-4 h-4 text-amber-700" />
                        <span>{isHindi ? 'उपवास एवं आहार नियम' : 'Fasting Rule'}</span>
                      </h4>
                      <div className="text-xs font-semibold text-stone-800">
                        {item.fastingType}
                      </div>
                      <div className="text-[11px] text-stone-600 mt-2">
                        {item.pujaVidhi}
                      </div>
                    </div>
                  </div>

                  {/* Sacred Mantra & Copy Button */}
                  {item.mantra && (
                    <div className="bg-gradient-to-r from-amber-100/80 to-orange-100/60 p-4 rounded-xl border border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-900">
                          {isHindi ? 'संकल्प एवं पूजन मंत्र' : 'Sacred Invocation Mantra'}
                        </span>
                        <div className="text-xs sm:text-sm font-semibold text-stone-900 font-serif mt-0.5">
                          {item.mantra}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(item.id, item.mantra)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-800 text-white text-xs font-semibold hover:bg-amber-900 shrink-0 self-start sm:self-auto transition-colors"
                      >
                        {copiedMantra === item.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-300" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-amber-200" />
                            <span>Copy Mantra</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Rituals list */}
                  {item.rituals && item.rituals.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-2">
                        {isHindi ? 'मुख्य पूजन विधि एवं अनुष्ठान' : 'Prescribed Shastric Rituals'}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {item.rituals.map((r, idx) => (
                          <div key={idx} className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-stone-200 text-xs text-stone-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{r}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 2027 Schedule Table */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-2 flex items-center justify-between">
                      <span>{isHindi ? `वर्ष २०२७ तिथियां एवं समय (${item.dates2027.length})` : `Year 2027 Fasting Schedule (${item.dates2027.length} Dates)`}</span>
                    </h4>
                    <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-stone-100 text-stone-700 font-bold border-b border-stone-200 uppercase text-[10px]">
                          <tr>
                            <th className="px-4 py-2.5">Date & Day</th>
                            <th className="px-4 py-2.5">Tithi / Occasion</th>
                            <th className="px-4 py-2.5">Muhurat / Moonrise</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                          {item.dates2027.map((d, dIdx) => (
                            <tr key={dIdx} className={dIdx % 2 === 0 ? 'bg-white' : 'bg-stone-50/60'}>
                              <td className="px-4 py-2.5 font-mono font-bold text-stone-900 whitespace-nowrap">
                                {d.date} <span className="font-normal text-stone-600">({d.day})</span>
                              </td>
                              <td className="px-4 py-2.5 font-semibold text-stone-800">
                                {d.tithiOrOccasion}
                              </td>
                              <td className="px-4 py-2.5 text-stone-700 font-mono text-[11px]">
                                {d.timingOrMoonrise ? (
                                  <span className="bg-amber-100/70 text-amber-900 px-2 py-0.5 rounded border border-amber-200 font-medium">
                                    {d.timingOrMoonrise}
                                  </span>
                                ) : (
                                  '—'
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Navagraha Weekdays Fasting Showcase */}
      <section className="bg-white rounded-3xl border-2 border-stone-300 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-stone-200 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-semibold mb-2">
            <Sun className="w-3.5 h-3.5 text-blue-700" />
            <span>{isHindi ? 'नवग्रह शांति एवं वार व्रत' : 'Planetary Fasting & Weekday Rules'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-stone-900">
            {NAVAGRAHA_WEEKDAYS_FASTING.title}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            {isHindi
              ? 'सूर्य से लेकर केतु तक सभी ९ ग्रहों की शांति, रत्न, मंत्र एवं उपवास विधि।'
              : 'Fasting rules, Vedic remedies, ruling deities, gemstones, and mantras for all 9 celestial planets (Navagraha).'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {NAVAGRAHA_WEEKDAYS_FASTING.grahas.map((g, idx) => (
            <div key={idx} className="p-4 rounded-2xl border border-stone-200 bg-stone-50/70 hover:bg-stone-50 transition-colors space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-950 font-serif">
                  {g.name}
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                  {g.weekday}
                </span>
              </div>
              <div className="text-[11px] text-stone-600">
                <strong>Deity:</strong> {g.deity} | <strong>Gem:</strong> {g.gemstone}
              </div>
              <p className="text-xs text-stone-700 leading-relaxed">
                {g.fastingVidhi}
              </p>
              <div className="text-[11px] font-mono text-amber-900 bg-white p-1.5 rounded border border-amber-200">
                {g.mantra}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7 Deities Weekdays Vrat Katha Showcase */}
      <section className="bg-white rounded-3xl border-2 border-stone-300 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-stone-200 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
            <span>{isHindi ? 'सप्ताह के सातों वार की व्रत कथाएं' : '7 Weekdays Sacred Vrat Katha & Vidhi'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-stone-900">
            {DEITIES_WEEKDAYS_FASTING.title}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            {isHindi
              ? 'सोमवार से रविवार तक प्रत्येक दिन के अधिष्ठाता देवता, व्रत कथा का सारांश एवं प्रामाणिक पूजन नियम।'
              : 'Summaries of the sacred Vrat Kathas, presiding deities, and ritual dining rules for Monday through Sunday.'}
          </p>
        </div>

        <div className="divide-y divide-stone-200">
          {DEITIES_WEEKDAYS_FASTING.days.map((d, idx) => (
            <div key={idx} className="py-4 first:pt-0 last:pb-0 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <span className="text-sm font-bold text-stone-900 font-serif block">
                  {d.day}
                </span>
                <span className="text-xs text-amber-900 font-semibold">
                  {d.deity}
                </span>
              </div>
              <div className="md:col-span-2 text-xs text-stone-700 leading-relaxed">
                <span className="font-semibold text-stone-900 block mb-0.5">Vrat Katha Essence:</span>
                {d.katha}
              </div>
              <div className="text-xs text-stone-700 bg-stone-50 p-3 rounded-xl border border-stone-200">
                <span className="font-semibold text-stone-900 block mb-0.5">Puja & Diet:</span>
                {d.vidhi}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
