import React, { useState, useEffect } from 'react';
import {
  getAllActiveFestivals,
  addCustomFestival,
  removeFestivalById,
  restoreFestivalById,
  getRemovedFestivals,
  resetFestivalsToDefault
} from '../../utils/festivalService';
import { playMechanicalClickSound } from '../../utils/audioFeedback';
import { FestivalEvent } from '../../types';
import {
  Sparkles,
  Plus,
  Trash2,
  RefreshCw,
  Search,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  RotateCcw,
  Zap,
  Tag
} from 'lucide-react';

interface FestivalManagerProps {
  onShowNotice?: (msg: string) => void;
}

export default function FestivalManager({ onShowNotice }: FestivalManagerProps) {
  const [festivals, setFestivals] = useState<FestivalEvent[]>(getAllActiveFestivals);
  const [removedList, setRemovedList] = useState<FestivalEvent[]>(getRemovedFestivals);

  // Form State
  const [name, setName] = useState('');
  const [nameHi, setNameHi] = useState('');
  const [date, setDate] = useState('2027-10-15');
  const [category, setCategory] = useState<'Major' | 'Deity' | 'Vrat' | 'Purnima' | 'Ekadashi' | 'Amavasya'>('Major');
  const [description, setDescription] = useState('');
  const [isDispatching, setIsDispatching] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [lastDispatchedFest, setLastDispatchedFest] = useState<string | null>(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const refreshData = () => {
    setFestivals(getAllActiveFestivals());
    setRemovedList(getRemovedFestivals());
  };

  useEffect(() => {
    const handleUpdate = () => refreshData();
    window.addEventListener('nd_festivals_updated', handleUpdate);
    return () => window.removeEventListener('nd_festivals_updated', handleUpdate);
  }, []);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !date.trim()) return;

    // Tactile Click sound & visual feedback
    playMechanicalClickSound();
    setIsButtonClicked(true);
    setIsDispatching(true);

    setTimeout(() => {
      addCustomFestival({
        name: name.trim(),
        nameHi: nameHi.trim() || undefined,
        date2027: date.trim(),
        category,
        description: description.trim() || undefined
      });

      refreshData();
      setIsDispatching(false);
      setLastDispatchedFest(name.trim());
      setName('');
      setNameHi('');
      setDescription('');

      if (onShowNotice) {
        onShowNotice(`✅ Dispatched & Published "${name.trim()}" to Live Site!`);
      }

      setTimeout(() => {
        setIsButtonClicked(false);
        setLastDispatchedFest(null);
      }, 3500);
    }, 450);
  };

  const handleQuickAdd = (preset: {
    name: string;
    nameHi: string;
    date: string;
    category: 'Major' | 'Deity' | 'Vrat' | 'Purnima' | 'Ekadashi' | 'Amavasya';
    desc: string;
  }) => {
    playMechanicalClickSound();
    addCustomFestival({
      name: preset.name,
      nameHi: preset.nameHi,
      date2027: preset.date,
      category: preset.category,
      description: preset.desc
    });
    refreshData();
    if (onShowNotice) {
      onShowNotice(`✅ Added preset "${preset.name}" to Live Calendar!`);
    }
  };

  const handleRemove = (id: string, festName: string) => {
    playMechanicalClickSound();
    if (window.confirm(`Are you sure you want to remove festival "${festName}" from the live site?`)) {
      removeFestivalById(id);
      refreshData();
      if (onShowNotice) {
        onShowNotice(`🗑️ Removed "${festName}" from live site.`);
      }
    }
  };

  const handleRestore = (id: string, festName: string) => {
    playMechanicalClickSound();
    restoreFestivalById(id);
    refreshData();
    if (onShowNotice) {
      onShowNotice(`↩️ Restored "${festName}" to live calendar!`);
    }
  };

  const handleResetDefaults = () => {
    playMechanicalClickSound();
    if (window.confirm('Reset all festivals back to canonical 2027 ephemeris defaults?')) {
      resetFestivalsToDefault();
      refreshData();
      if (onShowNotice) {
        onShowNotice('✅ All festivals restored to canonical defaults.');
      }
    }
  };

  // Filtered List
  const filteredFestivals = festivals.filter((f) => {
    const matchSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (f.nameHi && f.nameHi.includes(searchQuery));
    const matchCat =
      categoryFilter === 'all'
        ? true
        : categoryFilter === 'custom'
        ? f.id.startsWith('fest_')
        : f.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const customCount = festivals.filter((f) => f.id.startsWith('fest_')).length;

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-6 bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white rounded-3xl border-2 border-amber-500 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-xs font-bold text-amber-300 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Sacred Ephemeris & Live Calendar Control</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif">
            Festivals & Sacred Days Manager
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
            Add custom regional or temple festivals, or remove any festival from the live website and homepage countdown widgets in real time.
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetDefaults}
          className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 active:scale-95 text-stone-300 hover:text-white font-bold text-xs rounded-xl border border-stone-600 transition-all flex items-center gap-2 self-start md:self-auto cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-amber-400" />
          <span>Reset to Canonical Defaults</span>
        </button>
      </div>

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border-2 border-stone-200 shadow-sm">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">Total Active Festivals</span>
          <div className="text-2xl sm:text-3xl font-black text-stone-900 mt-1 font-serif">
            {festivals.length}
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">Live on Homepage</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border-2 border-stone-200 shadow-sm">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">Major Festivals</span>
          <div className="text-2xl sm:text-3xl font-black text-[#9A3412] mt-1 font-serif">
            {festivals.filter((f) => f.category === 'Major').length}
          </div>
          <span className="text-[11px] text-stone-500 font-semibold mt-1 block">Diwali, Holi, Navratri...</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border-2 border-stone-200 shadow-sm">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">Custom Added</span>
          <div className="text-2xl sm:text-3xl font-black text-amber-600 mt-1 font-serif">
            {customCount}
          </div>
          <span className="text-[11px] text-amber-700 font-semibold mt-1 block">Added by Admin</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border-2 border-stone-200 shadow-sm">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">Removed / Hidden</span>
          <div className="text-2xl sm:text-3xl font-black text-rose-600 mt-1 font-serif">
            {removedList.length}
          </div>
          <span className="text-[11px] text-stone-500 font-semibold mt-1 block">Hidden from site</span>
        </div>
      </div>

      {/* Quick 1-Click Preset Additions */}
      <div className="p-5 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-3">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-700" />
          <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
            Quick 1-Click Sacred Day Additions
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() =>
              handleQuickAdd({
                name: 'Som Pradosh Vrat',
                nameHi: 'सोम प्रदोष व्रत',
                date: '2027-10-18',
                category: 'Vrat',
                desc: 'Auspicious Shiva twilight fasting and puja.'
              })
            }
            className="px-3 py-1.5 bg-white hover:bg-amber-100 text-[#9A3412] font-bold text-xs rounded-xl border border-amber-300 shadow-2xs transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Som Pradosh Vrat</span>
          </button>

          <button
            type="button"
            onClick={() =>
              handleQuickAdd({
                name: 'Sankashti Chaturthi',
                nameHi: 'संकष्टी चतुर्थी व्रत',
                date: '2027-10-21',
                category: 'Vrat',
                desc: 'Lord Ganesha fasting with evening moonrise arghya.'
              })
            }
            className="px-3 py-1.5 bg-white hover:bg-amber-100 text-[#9A3412] font-bold text-xs rounded-xl border border-amber-300 shadow-2xs transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Sankashti Chaturthi</span>
          </button>

          <button
            type="button"
            onClick={() =>
              handleQuickAdd({
                name: 'Somvati Amavasya',
                nameHi: 'सोमवती अमावस्या',
                date: '2027-11-29',
                category: 'Amavasya',
                desc: 'Sacred Monday new moon for Peepal tree parikrama.'
              })
            }
            className="px-3 py-1.5 bg-white hover:bg-amber-100 text-[#9A3412] font-bold text-xs rounded-xl border border-amber-300 shadow-2xs transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Somvati Amavasya</span>
          </button>

          <button
            type="button"
            onClick={() =>
              handleQuickAdd({
                name: 'Sharad Purnima Kojagari Puja',
                nameHi: 'शरद पूर्णिमा कोजागरी पूजा',
                date: '2027-10-15',
                category: 'Purnima',
                desc: 'Maa Lakshmi worship with moonlight amrit kheer.'
              })
            }
            className="px-3 py-1.5 bg-white hover:bg-amber-100 text-[#9A3412] font-bold text-xs rounded-xl border border-amber-300 shadow-2xs transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Sharad Purnima Kojagari</span>
          </button>
        </div>
      </div>

      {/* Add New Festival Form with 3D Mechanical Dispatch Button */}
      <div className="p-6 bg-white rounded-3xl border-2 border-stone-200 shadow-sm space-y-5">
        <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
          <Plus className="w-5 h-5 text-[#9A3412]" />
          <div>
            <h3 className="text-lg font-bold text-stone-900 font-serif">Add New Festival Record</h3>
            <p className="text-xs text-stone-500">Publish a new festival or vrat into the live ephemeris.</p>
          </div>
        </div>

        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Festival Name (English) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Kartik Som Pradosh Vrat"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#9A3412]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Hindi / Indic Name
              </label>
              <input
                type="text"
                placeholder="उदा. कार्तिक सोम प्रदोष व्रत"
                value={nameHi}
                onChange={(e) => setNameHi(e.target.value)}
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-serif focus:outline-none focus:ring-2 focus:ring-[#9A3412]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Date (YYYY-MM-DD) *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#9A3412]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#9A3412]"
              >
                <option value="Major">Major Festival (प्रमुख)</option>
                <option value="Deity">Deity / Jayanti (देवता)</option>
                <option value="Vrat">Vrat / Fast (व्रत)</option>
                <option value="Purnima">Purnima Vrat (पौर्णिमा)</option>
                <option value="Ekadashi">Ekadashi Fast (एकादशी)</option>
                <option value="Amavasya">Amavasya Tithi (अमावस्या)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Significance / Puja Timings Description
            </label>
            <input
              type="text"
              placeholder="Puja Vidhi timings, significance, and sacred offerings..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#9A3412]"
            />
          </div>

          {/* User Requested: "dispatch button must feel like click or clicked here no button like this in admin panel" */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isDispatching || !name.trim()}
              className={`w-full py-4 px-6 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-3 cursor-pointer transition-all duration-150 transform select-none ${
                isDispatching
                  ? 'bg-amber-600 text-white cursor-wait translate-y-1.5 shadow-inner'
                  : isButtonClicked
                  ? 'bg-emerald-600 text-white translate-y-1.5 shadow-inner ring-4 ring-emerald-400'
                  : 'bg-gradient-to-r from-[#9A3412] via-[#C2410C] to-[#9A3412] hover:brightness-110 active:translate-y-1.5 active:shadow-inner text-white shadow-lg hover:shadow-xl border-b-4 border-[#5E1E08] active:border-b-0'
              }`}
            >
              <Sparkles className={`w-5 h-5 ${isDispatching ? 'animate-spin text-amber-200' : isButtonClicked ? 'scale-125 text-emerald-200' : 'text-amber-300'}`} />
              <span>
                {isDispatching
                  ? '⚡ DISPATCHING TO LIVE SITE...'
                  : isButtonClicked
                  ? `💥 CLICKED HERE! "${lastDispatchedFest || 'Festival'}" DISPATCHED LIVE ✅`
                  : '🪔 Click Here to Dispatch & Publish Festival to Live Calendar'}
              </span>
            </button>
            <p className="text-[11px] text-stone-500 text-center mt-1.5 font-medium">
              Clicking dispatches instantly to homepage widgets, monthly calendar, and JSON-LD structured data.
            </p>
          </div>
        </form>
      </div>

      {/* Festivals List with Search & Remove Buttons */}
      <div className="p-6 bg-white rounded-3xl border-2 border-stone-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
          <div>
            <h3 className="text-lg font-bold text-stone-900 font-serif">
              Active Festival Directory ({filteredFestivals.length})
            </h3>
            <p className="text-xs text-stone-500">
              Click "Remove" on any festival to immediately hide it from the live site and countdowns.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search festival to remove..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#9A3412]"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center bg-stone-100 p-0.5 rounded-xl border border-stone-200 text-[11px] font-bold">
              {['all', 'Major', 'Deity', 'Vrat', 'custom'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    categoryFilter === cat
                      ? 'bg-[#9A3412] text-white shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {cat === 'all' ? 'All' : cat === 'custom' ? 'Custom' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Festival Cards List */}
        <div className="max-h-[500px] overflow-y-auto space-y-2 pr-1 scrollbar-thin">
          {filteredFestivals.length === 0 ? (
            <div className="text-center py-8 text-stone-500 text-xs">
              No festivals match your search query.
            </div>
          ) : (
            filteredFestivals.map((f) => {
              const isCustom = f.id.startsWith('fest_');
              return (
                <div
                  key={f.id}
                  className="flex items-center justify-between p-3.5 bg-stone-50 hover:bg-amber-50/50 rounded-2xl border border-stone-200 transition-colors gap-3 group"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-xs sm:text-sm text-stone-900">
                        {f.name}
                      </span>
                      {f.nameHi && (
                        <span className="font-serif text-xs text-stone-500 font-bold">
                          ({f.nameHi})
                        </span>
                      )}
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-[#9A3412]">
                        {f.category}
                      </span>
                      {isCustom && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          Custom Added
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-stone-500 mt-1 font-mono flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-[#9A3412]" />
                      <span>{f.date2027} · {f.dayOfWeek2027}</span>
                      {f.tithiText && (
                        <>
                          <span>•</span>
                          <span>{f.tithiText}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => handleRemove(f.id, f.name)}
                    className="px-3.5 py-2 bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white border border-rose-200 hover:border-rose-600 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shrink-0 cursor-pointer active:scale-95 shadow-2xs"
                    title="Remove this festival from live site"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Hidden / Removed Festivals section with Restore option */}
      {removedList.length > 0 && (
        <div className="p-6 bg-stone-50 rounded-3xl border-2 border-stone-200 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>Hidden / Removed Festivals ({removedList.length})</span>
            </div>
            <span className="text-xs text-stone-500">Click "Restore" to re-enable on the live website.</span>
          </div>

          <div className="space-y-2">
            {removedList.map((rf) => (
              <div
                key={rf.id}
                className="flex items-center justify-between p-3 bg-white rounded-xl border border-stone-200 text-xs"
              >
                <div>
                  <span className="font-bold text-stone-800 line-through mr-2">{rf.name}</span>
                  <span className="font-mono text-stone-400">{rf.date2027}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRestore(rf.id, rf.name)}
                  className="px-3 py-1 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-300 font-bold rounded-lg text-xs transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restore</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
