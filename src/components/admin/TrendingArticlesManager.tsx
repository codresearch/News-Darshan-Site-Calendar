import { useState } from 'react';
import {
  getTrendingArticles,
  addTrendingArticle,
  togglePinArticle,
  toggleActiveArticle,
  deleteTrendingArticle,
  TrendingArticle
} from '../../utils/trendingArticlesService';
import {
  Flame,
  Pin,
  Eye,
  Share2,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Tag
} from 'lucide-react';

interface TrendingArticlesManagerProps {
  onNavigate: (path: string) => void;
  onShowNotice?: (msg: string) => void;
}

export default function TrendingArticlesManager({ onNavigate, onShowNotice }: TrendingArticlesManagerProps) {
  const [articles, setArticles] = useState<TrendingArticle[]>(getTrendingArticles);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTitleHi, setNewTitleHi] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newCategory, setNewCategory] = useState<'Temple' | 'Panchang' | 'Festival' | 'Astrology' | 'Muhurat'>('Temple');
  const [newBadge, setNewBadge] = useState<'🔥 Trending' | '⭐ Top Read' | '⚡ Breaking' | '🪔 Special' | '🕉️ Sacred'>('🔥 Trending');

  const refreshList = () => {
    setArticles(getTrendingArticles());
  };

  const handleTogglePin = (id: string) => {
    togglePinArticle(id);
    refreshList();
  };

  const handleToggleActive = (id: string) => {
    toggleActiveArticle(id);
    refreshList();
  };

  const handleDelete = (id: string) => {
    if (confirm('Remove this article from trending list?')) {
      deleteTrendingArticle(id);
      refreshList();
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim()) return;

    addTrendingArticle({
      title: newTitle.trim(),
      titleHi: newTitleHi.trim() || undefined,
      url: newUrl.trim().startsWith('/') ? newUrl.trim() : `/${newUrl.trim()}`,
      category: newCategory,
      badge: newBadge,
      isPinned: false,
      isActive: true
    });

    setNewTitle('');
    setNewTitleHi('');
    setNewUrl('');
    setShowAddModal(false);
    refreshList();

    if (onShowNotice) onShowNotice('✅ New trending article added to feed.');
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="p-6 bg-gradient-to-r from-stone-900 via-rose-950 to-stone-900 text-white rounded-3xl border-2 border-rose-500 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/40 text-xs font-bold text-rose-300 mb-2">
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            <span>Editorial Feed & Virality Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif">
            Trending Articles & Feeds Manager
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
            Control which temples, festivals, and panchang guides get highlighted across the website with virality badges, pin priorities, and real-time click analytics.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Trending Article</span>
        </button>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border-2 border-stone-200 shadow-2xl p-6 sm:p-8 max-w-xl w-full animate-in zoom-in-95 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-lg font-bold text-stone-900 font-serif flex items-center gap-2">
                <Flame className="w-5 h-5 text-rose-600" />
                <span>Add New Trending Article</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-stone-700 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Article Title (English)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Angkor Wat Cambodia Darshan Timings & History"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Title in Indic / Hindi (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. अंकोरवाट मंदिर कंबोडिया दर्शन समय"
                  value={newTitleHi}
                  onChange={(e) => setNewTitleHi(e.target.value)}
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-serif text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Target Route / URL Path
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. /temples/angkor-wat-cambodia or /today"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-mono text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-bold text-stone-900"
                  >
                    <option value="Temple">Temple (मंदिर)</option>
                    <option value="Panchang">Panchang (पंचांग)</option>
                    <option value="Festival">Festival (त्योहार)</option>
                    <option value="Astrology">Astrology (ज्योतिष)</option>
                    <option value="Muhurat">Muhurat (मुहूर्त)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Badge Flag
                  </label>
                  <select
                    value={newBadge}
                    onChange={(e) => setNewBadge(e.target.value as any)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-bold text-stone-900"
                  >
                    <option value="🔥 Trending">🔥 Trending</option>
                    <option value="⭐ Top Read">⭐ Top Read</option>
                    <option value="⚡ Breaking">⚡ Breaking</option>
                    <option value="🪔 Special">🪔 Special</option>
                    <option value="🕉️ Sacred">🕉️ Sacred</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-stone-600 hover:text-stone-900 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Publish Trending Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Trending Articles Table */}
      <div className="bg-white rounded-3xl border-2 border-stone-200 shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
          <div>
            <h3 className="text-lg font-bold text-stone-900 font-serif flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-rose-600" />
              <span>Active Trending Articles & Viral Highlights</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Ranked by virality score, today's views, and social shares.
            </p>
          </div>
          <span className="text-xs font-bold bg-rose-100 text-rose-800 px-3 py-1 rounded-full">
            {articles.filter((a) => a.isActive).length} Active Feeds
          </span>
        </div>

        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-stone-900 text-stone-300 font-bold uppercase text-[11px] tracking-wider border-b border-stone-800">
                <th className="py-3 px-4 w-12 text-center">Pin</th>
                <th className="py-3 px-4">Article Title & Path</th>
                <th className="py-3 px-4">Category & Badge</th>
                <th className="py-3 px-4 text-right">Views Today</th>
                <th className="py-3 px-4 text-right hidden sm:table-cell">Total Views</th>
                <th className="py-3 px-4 text-center hidden md:table-cell">Virality</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {articles.map((art) => (
                <tr key={art.id} className="hover:bg-rose-50/30 transition-colors">
                  <td className="py-3 px-4 text-center">
                    <button
                      type="button"
                      onClick={() => handleTogglePin(art.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        art.isPinned
                          ? 'bg-amber-100 text-amber-800 font-bold'
                          : 'text-stone-300 hover:text-stone-600'
                      }`}
                      title={art.isPinned ? 'Pinned to top' : 'Click to pin'}
                    >
                      <Pin className="w-4 h-4" />
                    </button>
                  </td>

                  <td className="py-3 px-4">
                    <div className="font-bold text-stone-900 flex items-center gap-1.5">
                      <span>{art.title}</span>
                    </div>
                    {art.titleHi && (
                      <div className="text-[11px] font-serif text-stone-600 mt-0.5">{art.titleHi}</div>
                    )}
                    <div className="text-[11px] font-mono text-stone-400 mt-0.5">{art.url}</div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700">
                        {art.category}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-100 text-rose-800">
                        {art.badge}
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-right font-mono font-bold text-stone-900 tabular-nums">
                    {art.viewsToday.toLocaleString()}
                  </td>

                  <td className="py-3 px-4 text-right font-mono text-stone-600 tabular-nums hidden sm:table-cell">
                    {art.totalViews.toLocaleString()}
                  </td>

                  <td className="py-3 px-4 text-center hidden md:table-cell">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      ⚡ {art.viralityScore}%
                    </span>
                  </td>

                  <td className="py-3 px-4 text-center">
                    <button
                      type="button"
                      onClick={() => handleToggleActive(art.id)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${
                        art.isActive
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
                      }`}
                    >
                      {art.isActive ? 'Active' : 'Paused'}
                    </button>
                  </td>

                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        type="button"
                        onClick={() => onNavigate(art.url)}
                        className="p-1.5 text-stone-400 hover:text-[#9A3412] hover:bg-amber-100 rounded-lg transition-colors"
                        title="View Article"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(art.id)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
