import { useState, useEffect, useMemo } from 'react';
import {
  getRealAnalyticsSummary,
  RealAnalyticsSummary,
  clearRealVisitLogs,
  recordPageView
} from '../../utils/analyticsTracker';
import {
  TrendingUp,
  Eye,
  Users,
  Globe,
  MapPin,
  Clock,
  ArrowUpRight,
  Search,
  Download,
  Activity,
  Smartphone,
  Monitor,
  Tablet,
  ExternalLink,
  Share2,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  Trash2
} from 'lucide-react';

interface AnalyticsDashboardProps {
  onNavigate: (path: string) => void;
}

export default function AnalyticsDashboard({ onNavigate }: AnalyticsDashboardProps) {
  const [analytics, setAnalytics] = useState<RealAnalyticsSummary>(getRealAnalyticsSummary);
  const [timeframe, setTimeframe] = useState<'today' | 'weekly' | 'monthly' | 'total'>('today');
  const [searchUrl, setSearchUrl] = useState('');
  const [testSent, setTestSent] = useState(false);

  // Auto-refresh when new real visits occur
  useEffect(() => {
    const handleVisitUpdate = () => {
      setAnalytics(getRealAnalyticsSummary());
    };
    window.addEventListener('nd_real_visit_recorded', handleVisitUpdate);
    const interval = setInterval(handleVisitUpdate, 5000); // 5s pulse
    return () => {
      window.removeEventListener('nd_real_visit_recorded', handleVisitUpdate);
      clearInterval(interval);
    };
  }, []);

  const refreshData = () => {
    setAnalytics(getRealAnalyticsSummary());
  };

  const handleClearLogs = () => {
    if (confirm('Clear recorded local analytics visit history?')) {
      clearRealVisitLogs();
      setAnalytics(getRealAnalyticsSummary());
    }
  };

  // Filter URLs
  const filteredUrls = useMemo(() => {
    return analytics.urls.filter(
      (u) =>
        u.path.toLowerCase().includes(searchUrl.toLowerCase()) ||
        u.title.toLowerCase().includes(searchUrl.toLowerCase())
    );
  }, [analytics.urls, searchUrl]);

  const currentTotalViews =
    timeframe === 'today'
      ? analytics.todayViews
      : timeframe === 'weekly'
      ? analytics.weeklyViews
      : timeframe === 'monthly'
      ? analytics.monthlyViews
      : analytics.totalViews;

  const currentTotalVisitors =
    timeframe === 'today'
      ? analytics.todayVisitors
      : timeframe === 'weekly'
      ? analytics.weeklyVisitors
      : timeframe === 'monthly'
      ? analytics.monthlyVisitors
      : analytics.totalVisitors;

  const handleSendTestPing = async () => {
    await recordPageView(window.location.pathname, document.title);
    setTestSent(true);
    refreshData();
    setTimeout(() => setTestSent(false), 3000);
  };

  const handleExportCSV = () => {
    const headers = ['URL Path', 'Page Title', 'Today Views', 'Weekly Views', 'Monthly Views', 'Total Views', 'Last Visited'];
    const rows = analytics.urls.map((u) => [
      `"${u.path}"`,
      `"${u.title.replace(/"/g, '""')}"`,
      u.todayViews,
      u.weeklyViews,
      u.monthlyViews,
      u.totalViews,
      `"${u.lastVisited}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `newsdarshan-real-analytics-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Real Data Integrity Notice & Google Analytics 4 Status */}
      <div className="p-6 bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 rounded-3xl border-2 border-emerald-500/50 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-5 text-white">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                100% Real Data Mode
              </span>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-stone-800 text-amber-300 border border-stone-700">
                GA4: G-G061QQTE9T
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Live Event Stream Active</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif mt-1">
              Live Real-Time Traffic & Analytics
            </h2>
            <p className="text-xs text-stone-300 max-w-2xl mt-0.5">
              Zero simulated figures. Every pageview, country, city, and active visitor displayed here is recorded from real browser sessions.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <a
            href="https://analytics.google.com/analytics/web/#/realtime"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Google Analytics 4 Live</span>
          </a>

          <button
            type="button"
            onClick={handleSendTestPing}
            className="px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{testSent ? '✓ Recorded!' : 'Record Test Visit'}</span>
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            disabled={analytics.urls.length === 0}
            className="px-3.5 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs rounded-xl border border-stone-700 transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            onClick={refreshData}
            className="p-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl border border-stone-700 transition-colors"
            title="Refresh Realtime Stats"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Today's Real Pageviews */}
        <div className="p-5 sm:p-6 bg-white rounded-3xl border-2 border-stone-200 shadow-sm relative">
          <div className="flex items-center justify-between text-stone-500 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Today's Real Views</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif tabular-nums">
            {analytics.todayViews.toLocaleString()}
          </div>
          <div className="mt-2 text-xs text-stone-500">
            {analytics.todayVisitors} unique visitor session{analytics.todayVisitors === 1 ? '' : 's'} today
          </div>
        </div>

        {/* Weekly Views (7 Days) */}
        <div className="p-5 sm:p-6 bg-white rounded-3xl border-2 border-stone-200 shadow-sm relative">
          <div className="flex items-center justify-between text-stone-500 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Weekly Views (7 Days)</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif tabular-nums">
            {analytics.weeklyViews.toLocaleString()}
          </div>
          <div className="mt-2 text-xs text-stone-500">
            {analytics.weeklyVisitors} unique visitor session{analytics.weeklyVisitors === 1 ? '' : 's'} (last 7 days)
          </div>
        </div>

        {/* Monthly Views (30 Days) */}
        <div className="p-5 sm:p-6 bg-white rounded-3xl border-2 border-stone-200 shadow-sm relative">
          <div className="flex items-center justify-between text-stone-500 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Monthly Views (30 Days)</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600 border border-purple-200">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif tabular-nums">
            {analytics.monthlyViews.toLocaleString()}
          </div>
          <div className="mt-2 text-xs text-stone-500">
            {analytics.monthlyVisitors} unique visitor session{analytics.monthlyVisitors === 1 ? '' : 's'} (last 30 days)
          </div>
        </div>

        {/* Real Live Active Visitors Now */}
        <div className="p-5 sm:p-6 bg-gradient-to-br from-stone-950 via-slate-900 to-stone-950 text-white rounded-3xl border-2 border-emerald-500 shadow-sm relative">
          <div className="flex items-center justify-between text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Real Live Visitors Now</span>
            </span>
            <div className="p-2 rounded-xl bg-emerald-900/60 text-emerald-300 border border-emerald-700">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-white font-serif tabular-nums">
            {analytics.activeVisitorsNow}
          </div>
          <div className="mt-2 text-xs text-stone-300 flex items-center justify-between">
            <span>All-time visits:</span>
            <span className="font-mono font-bold text-amber-300">{analytics.totalViews.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Main URLs Table (Real views only) */}
      <div className="bg-white rounded-3xl border-2 border-stone-200 shadow-sm overflow-hidden">
        {/* Table Header & Controls */}
        <div className="p-5 sm:p-6 border-b border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-stone-50/80 to-amber-50/40">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 font-serif flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#9A3412]" />
              <span>Real URL Pageviews</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Actual count of visits to each URL on your website.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Timeframe Switcher */}
            <div className="flex items-center bg-stone-200/80 p-1 rounded-2xl border border-stone-300">
              {(['today', 'weekly', 'monthly', 'total'] as const).map((tf) => (
                <button
                  key={tf}
                  type="button"
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    timeframe === tf
                      ? 'bg-[#9A3412] text-white shadow-xs'
                      : 'text-stone-700 hover:text-stone-900'
                  }`}
                >
                  {tf === 'today' ? 'Today' : tf === 'weekly' ? '7 Days' : tf === 'monthly' ? '30 Days' : 'All-Time'}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[200px]">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search URL..."
                value={searchUrl}
                onChange={(e) => setSearchUrl(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#9A3412]"
              />
            </div>
          </div>
        </div>

        {/* URLs Table */}
        <div className="overflow-x-auto scrollbar-thin">
          {filteredUrls.length === 0 ? (
            <div className="p-12 text-center text-stone-500 space-y-2">
              <Eye className="w-8 h-8 text-stone-400 mx-auto" />
              <p className="font-bold text-stone-700 text-sm">No pageviews recorded yet for this timeframe.</p>
              <p className="text-xs text-stone-500">
                Click "Record Test Visit" above or open pages on the website to see real views appear here instantly.
              </p>
            </div>
          ) : (
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-stone-900 text-stone-300 font-bold uppercase text-[11px] tracking-wider border-b border-stone-800">
                  <th className="py-3 px-4 w-12 text-center">#</th>
                  <th className="py-3 px-4">Page Title & Path</th>
                  <th className="py-3 px-4 text-right">
                    <span className="text-amber-300">
                      {timeframe === 'today' ? "Today's Views" : timeframe === 'weekly' ? '7 Days Views' : timeframe === 'monthly' ? '30 Days Views' : 'Total Views'}
                    </span>
                  </th>
                  <th className="py-3 px-4 text-right hidden sm:table-cell">Traffic Share</th>
                  <th className="py-3 px-4 text-right hidden md:table-cell">Last Visited</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {filteredUrls.map((item, idx) => {
                  const views =
                    timeframe === 'today'
                      ? item.todayViews
                      : timeframe === 'weekly'
                      ? item.weeklyViews
                      : timeframe === 'monthly'
                      ? item.monthlyViews
                      : item.totalViews;

                  const sharePercent = currentTotalViews > 0 ? ((views / currentTotalViews) * 100).toFixed(1) : '0';

                  return (
                    <tr key={item.path} className="hover:bg-amber-50/50 transition-colors">
                      <td className="py-3 px-4 text-center font-mono font-bold text-stone-400 text-xs">
                        {idx + 1}
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-bold text-stone-900">
                          {item.title}
                        </div>
                        <div className="text-[11px] font-mono text-stone-500 mt-0.5">
                          {item.path}
                        </div>
                      </td>

                      <td className="py-3 px-4 text-right font-mono font-bold text-stone-900 text-sm sm:text-base tabular-nums">
                        {views.toLocaleString()}
                      </td>

                      <td className="py-3 px-4 text-right hidden sm:table-cell">
                        <div className="inline-flex items-center gap-1.5">
                          <div className="w-16 bg-stone-200 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-[#9A3412] h-1.5 rounded-full"
                              style={{ width: `${Math.min(100, parseFloat(sharePercent))}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono font-bold text-stone-700">{sharePercent}%</span>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-right font-mono text-xs text-stone-500 hidden md:table-cell">
                        {item.lastVisited}
                      </td>

                      <td className="py-3 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => onNavigate(item.path)}
                          className="p-1.5 text-stone-400 hover:text-[#9A3412] hover:bg-amber-100 rounded-lg transition-colors inline-flex items-center gap-1 text-xs font-semibold"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Visit</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Two Columns: Real Countries & Cities + Real Devices / Live Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real Geographic Visitors: Countries & Cities */}
        <div className="p-6 bg-white rounded-3xl border-2 border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <h3 className="text-lg font-bold text-stone-900 font-serif flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#9A3412]" />
                <span>Real Geographic Locations</span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Countries and cities of real visitors detected via IP/Timezone.
              </p>
            </div>
            <span className="text-xs font-bold bg-amber-100 text-[#9A3412] px-2.5 py-1 rounded-full">
              Real IP Data
            </span>
          </div>

          {analytics.locations.length === 0 ? (
            <p className="text-xs text-stone-400 py-6 text-center">No location visits recorded yet.</p>
          ) : (
            <div className="space-y-4">
              {analytics.locations.map((loc) => {
                const views =
                  timeframe === 'today'
                    ? loc.todayViews
                    : timeframe === 'weekly'
                    ? loc.weeklyViews
                    : timeframe === 'monthly'
                    ? loc.monthlyViews
                    : loc.totalViews;

                return (
                  <div key={loc.country} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{loc.flag}</span>
                        <span className="text-stone-900 font-bold">{loc.country}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-stone-900 font-bold">{views} visits</span>
                        <span className="text-xs text-stone-400 font-mono">({loc.percent}%)</span>
                      </div>
                    </div>

                    <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-[#9A3412] h-2 rounded-full"
                        style={{ width: `${loc.percent}%` }}
                      />
                    </div>

                    {loc.cities.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {loc.cities.map((c) => (
                          <span
                            key={c.city}
                            className="text-[11px] bg-stone-100 border border-stone-200 text-stone-700 px-2 py-0.5 rounded-md font-medium"
                          >
                            {c.city} ({c.count})
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Live Visitor Feed & Device Breakdown */}
        <div className="space-y-6">
          {/* Real Device Breakdown */}
          <div className="p-6 bg-white rounded-3xl border-2 border-stone-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-stone-900 font-serif flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-[#9A3412]" />
              <span>Real Visitor Devices</span>
            </h3>

            <div className="grid grid-cols-3 gap-3 text-center">
              {analytics.devices.map((d) => (
                <div key={d.device} className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200">
                  <div className="w-8 h-8 rounded-xl bg-white border border-stone-200 flex items-center justify-center mx-auto mb-2 text-[#9A3412]">
                    {d.icon === 'Smartphone' ? (
                      <Smartphone className="w-4 h-4" />
                    ) : d.icon === 'Tablet' ? (
                      <Tablet className="w-4 h-4" />
                    ) : (
                      <Monitor className="w-4 h-4" />
                    )}
                  </div>
                  <div className="text-xl font-bold font-serif text-stone-900 tabular-nums">
                    {d.percent}%
                  </div>
                  <div className="text-[11px] text-stone-500 font-medium truncate mt-0.5">
                    {d.device} ({d.visits})
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Recent Visit Stream */}
          <div className="p-6 bg-white rounded-3xl border-2 border-stone-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Real-Time Visitor Log Stream</span>
              </h3>
              {analytics.recentVisits.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearLogs}
                  className="text-stone-400 hover:text-rose-600 transition-colors"
                  title="Clear history"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {analytics.recentVisits.length === 0 ? (
              <p className="text-xs text-stone-400 py-3 text-center">Waiting for visitor events...</p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin">
                {analytics.recentVisits.slice(0, 10).map((v) => (
                  <div key={v.id} className="p-2.5 bg-stone-50 rounded-xl text-xs flex items-center justify-between gap-2 border border-stone-200">
                    <div className="min-w-0 truncate">
                      <span className="font-mono font-bold text-stone-900 block truncate">{v.path}</span>
                      <span className="text-[11px] text-stone-500 truncate block">
                        {v.city}, {v.country} · {v.device}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-stone-400 shrink-0">
                      {new Date(v.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
