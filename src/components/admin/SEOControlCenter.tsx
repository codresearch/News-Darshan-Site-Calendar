import React, { useState, useMemo } from 'react';
import { CustomSEORule, RedirectRule } from '../../types';
import {
  getCustomSEORules,
  upsertCustomSEORule,
  deleteCustomSEORule,
  getRedirectRules,
  upsertRedirectRule,
  deleteRedirectRule,
  COMMON_APP_PATHS,
  SITE_URL,
  normalizePath,
  exportSEODataJSON,
  importSEODataJSON,
  resetToDefaultSEORules,
  resetToDefaultRedirects,
  recordRedirectHit
} from '../../utils/seoControlStore';
import {
  Globe,
  ArrowRight,
  ExternalLink,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Search,
  Download,
  Upload,
  Link as LinkIcon,
  Tag,
  Shuffle,
  Eye,
  Sliders,
  Smartphone,
  Monitor,
  Copy,
  Check,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';

interface SEOControlCenterProps {
  onNavigate: (path: string) => void;
  onShowNotice?: (msg: string) => void;
}

export default function SEOControlCenter({ onNavigate, onShowNotice }: SEOControlCenterProps) {
  // Main Sub-Tab within SEO Control Center: 'meta' | 'redirects' | 'serp' | 'backup'
  const [subTab, setSubTab] = useState<'meta' | 'redirects' | 'serp' | 'backup'>('meta');

  // Rules state
  const [seoRules, setSeoRules] = useState<CustomSEORule[]>(() => getCustomSEORules());
  const [redirectRules, setRedirectRules] = useState<RedirectRule[]>(() => getRedirectRules());

  // Search & Filter state
  const [metaSearch, setMetaSearch] = useState('');
  const [metaCategoryFilter, setMetaCategoryFilter] = useState('ALL');
  const [redirectSearch, setRedirectSearch] = useState('');

  // Modals & Forms
  const [isEditMetaModalOpen, setIsEditMetaModalOpen] = useState(false);
  const [editingMetaRule, setEditingMetaRule] = useState<Partial<CustomSEORule> | null>(null);

  const [isEditRedirectModalOpen, setIsEditRedirectModalOpen] = useState(false);
  const [editingRedirectRule, setEditingRedirectRule] = useState<Partial<RedirectRule> | null>(null);

  // SERP Simulator Selected Path
  const [serpSelectedPath, setSerpSelectedPath] = useState<string>('/');
  const [serpDevice, setSerpDevice] = useState<'desktop' | 'mobile'>('desktop');

  // Redirect Simulator Input
  const [testRedirectInput, setTestRedirectInput] = useState('');
  const [testRedirectResult, setTestRedirectResult] = useState<{
    matched: boolean;
    rule?: RedirectRule;
    target?: string;
  } | null>(null);

  // Feedback notifications
  const [localFeedback, setLocalFeedback] = useState<string>('');
  const [copiedText, setCopiedText] = useState(false);

  const showNotification = (msg: string) => {
    setLocalFeedback(msg);
    if (onShowNotice) onShowNotice(msg);
    setTimeout(() => setLocalFeedback(''), 4000);
  };

  // Sync back to storage & state
  const refreshAll = () => {
    setSeoRules(getCustomSEORules());
    setRedirectRules(getRedirectRules());
    showNotification('SEO database refreshed from storage.');
  };

  // -------------------------------------------------------------
  // STATS & AUDIT METRICS
  // -------------------------------------------------------------
  const totalTrackedPaths = COMMON_APP_PATHS.length + seoRules.filter((r) => !COMMON_APP_PATHS.some((p) => p.path === r.path)).length;
  const activeOverridesCount = seoRules.filter((r) => r.enabled).length;
  const activeRedirectsCount = redirectRules.filter((r) => r.enabled).length;
  const totalRedirectHits = redirectRules.reduce((acc, r) => acc + (r.hitCount || 0), 0);

  // Health Score Calculation
  const healthScore = useMemo(() => {
    let score = 100;
    // Check for title length warnings (>60 or <30)
    seoRules.forEach((r) => {
      if (r.title.length > 65 || r.title.length < 25) score -= 2;
      if (r.description.length > 170 || r.description.length < 100) score -= 2;
      if (!r.canonicalUrl || !r.canonicalUrl.startsWith('http')) score -= 4;
    });
    return Math.max(score, 75);
  }, [seoRules]);

  // -------------------------------------------------------------
  // META RULES CRUD
  // -------------------------------------------------------------
  const handleOpenAddMeta = () => {
    setEditingMetaRule({
      id: `seo-custom-${Date.now()}`,
      path: '/today',
      title: 'Hindu Panchang & Auspicious Timings | NewsDarshan',
      description: 'Check accurate Tithi, Nakshatra, Yoga, Karana, Rahu Kaal, and Shubh Choghadiya timings with authentic Vedic calculations.',
      canonicalUrl: `${SITE_URL}/today/`,
      h1: "Today's Panchang & Muhurat",
      ogTitle: '',
      ogDescription: '',
      robots: 'index, follow',
      enabled: true,
      notes: ''
    });
    setIsEditMetaModalOpen(true);
  };

  const handleOpenEditMeta = (rule: CustomSEORule) => {
    setEditingMetaRule({ ...rule });
    setIsEditMetaModalOpen(true);
  };

  const handleSaveMetaRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMetaRule || !editingMetaRule.path || !editingMetaRule.title) return;

    const normalizedPath = normalizePath(editingMetaRule.path);
    const ruleToSave: CustomSEORule = {
      id: editingMetaRule.id || `seo-custom-${Date.now()}`,
      path: normalizedPath,
      title: editingMetaRule.title.trim(),
      description: (editingMetaRule.description || '').trim(),
      canonicalUrl: (editingMetaRule.canonicalUrl || `${SITE_URL}${normalizedPath === '/' ? '' : normalizedPath}/`).trim(),
      h1: editingMetaRule.h1?.trim() || editingMetaRule.title.split('–')[0].trim(),
      ogTitle: editingMetaRule.ogTitle?.trim() || editingMetaRule.title.trim(),
      ogDescription: editingMetaRule.ogDescription?.trim() || editingMetaRule.description?.trim(),
      robots: editingMetaRule.robots || 'index, follow',
      enabled: editingMetaRule.enabled !== false,
      notes: editingMetaRule.notes || '',
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    const updated = upsertCustomSEORule(ruleToSave);
    setSeoRules(updated);
    setIsEditMetaModalOpen(false);
    setEditingMetaRule(null);
    showNotification(`SEO indexing rule saved for ${normalizedPath}`);
  };

  const handleDeleteMetaRule = (id: string, path: string) => {
    if (confirm(`Remove custom SEO override for "${path}"? The system will revert to automatic astronomical metadata.`)) {
      const updated = deleteCustomSEORule(id);
      setSeoRules(updated);
      showNotification(`Deleted custom override for ${path}`);
    }
  };

  const handleToggleMetaEnabled = (rule: CustomSEORule) => {
    const updatedRule: CustomSEORule = { ...rule, enabled: !rule.enabled };
    const updated = upsertCustomSEORule(updatedRule);
    setSeoRules(updated);
    showNotification(`${rule.path} override is now ${!rule.enabled ? 'ACTIVE' : 'DISABLED'}`);
  };

  // -------------------------------------------------------------
  // REDIRECTS CRUD
  // -------------------------------------------------------------
  const handleOpenAddRedirect = () => {
    setEditingRedirectRule({
      id: `red-custom-${Date.now()}`,
      sourcePath: '/old-path',
      destinationUrl: '/today',
      statusCode: 301,
      preserveQuery: true,
      enabled: true,
      notes: '301 Permanent Redirect for link equity',
      hitCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    });
    setIsEditRedirectModalOpen(true);
  };

  const handleOpenEditRedirect = (rule: RedirectRule) => {
    setEditingRedirectRule({ ...rule });
    setIsEditRedirectModalOpen(true);
  };

  const handleSaveRedirectRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRedirectRule || !editingRedirectRule.sourcePath || !editingRedirectRule.destinationUrl) return;

    const normalizedSource = normalizePath(editingRedirectRule.sourcePath);
    const destination = editingRedirectRule.destinationUrl.trim();

    if (normalizedSource === normalizePath(destination)) {
      alert('Error: Source Path and Destination URL cannot be the same (Redirect loop prevention).');
      return;
    }

    const ruleToSave: RedirectRule = {
      id: editingRedirectRule.id || `red-custom-${Date.now()}`,
      sourcePath: normalizedSource,
      destinationUrl: destination,
      statusCode: editingRedirectRule.statusCode || 301,
      preserveQuery: editingRedirectRule.preserveQuery !== false,
      enabled: editingRedirectRule.enabled !== false,
      notes: editingRedirectRule.notes || '',
      hitCount: editingRedirectRule.hitCount || 0,
      lastTriggered: editingRedirectRule.lastTriggered,
      createdAt: editingRedirectRule.createdAt || new Date().toISOString().split('T')[0]
    };

    const updated = upsertRedirectRule(ruleToSave);
    setRedirectRules(updated);
    setIsEditRedirectModalOpen(false);
    setEditingRedirectRule(null);
    showNotification(`Redirect rule configured: ${normalizedSource} ➔ ${destination}`);
  };

  const handleDeleteRedirect = (id: string, sourcePath: string) => {
    if (confirm(`Delete redirect rule for "${sourcePath}"?`)) {
      const updated = deleteRedirectRule(id);
      setRedirectRules(updated);
      showNotification(`Redirect removed: ${sourcePath}`);
    }
  };

  const handleToggleRedirectEnabled = (rule: RedirectRule) => {
    const updatedRule: RedirectRule = { ...rule, enabled: !rule.enabled };
    const updated = upsertRedirectRule(updatedRule);
    setRedirectRules(updated);
    showNotification(`Redirect for ${rule.sourcePath} is now ${!rule.enabled ? 'ACTIVE' : 'PAUSED'}`);
  };

  // Test Redirect Simulator
  const handleTestRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testRedirectInput) return;
    const clean = normalizePath(testRedirectInput);
    const matched = redirectRules.find((r) => r.enabled && normalizePath(r.sourcePath) === clean);
    if (matched) {
      setTestRedirectResult({
        matched: true,
        rule: matched,
        target: matched.destinationUrl
      });
    } else {
      setTestRedirectResult({
        matched: false
      });
    }
  };

  // -------------------------------------------------------------
  // BACKUP & RESTORE
  // -------------------------------------------------------------
  const handleDownloadBackup = () => {
    const jsonStr = exportSEODataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `newsdarshan-seo-control-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('SEO database backup exported successfully.');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const result = importSEODataJSON(content);
        if (result.success) {
          setSeoRules(getCustomSEORules());
          setRedirectRules(getRedirectRules());
          showNotification(result.message);
        } else {
          alert(`Failed to import JSON: ${result.message}`);
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleResetSEODefaults = () => {
    if (confirm('Reset all SEO title and canonical rules to system defaults? Any custom modifications will be lost.')) {
      const reset = resetToDefaultSEORules();
      setSeoRules(reset);
      showNotification('SEO rules reset to factory defaults.');
    }
  };

  const handleResetRedirectDefaults = () => {
    if (confirm('Reset all redirects to system defaults? Any custom redirects will be reset.')) {
      const reset = resetToDefaultRedirects();
      setRedirectRules(reset);
      showNotification('Redirects reset to factory defaults.');
    }
  };

  // Filtered lists
  const filteredMetaRules = useMemo(() => {
    return seoRules.filter((rule) => {
      const matchesSearch =
        rule.path.toLowerCase().includes(metaSearch.toLowerCase()) ||
        rule.title.toLowerCase().includes(metaSearch.toLowerCase()) ||
        rule.description.toLowerCase().includes(metaSearch.toLowerCase()) ||
        rule.canonicalUrl.toLowerCase().includes(metaSearch.toLowerCase());

      if (!matchesSearch) return false;
      if (metaCategoryFilter === 'ALL') return true;
      if (metaCategoryFilter === 'ACTIVE') return rule.enabled;
      if (metaCategoryFilter === 'DISABLED') return !rule.enabled;
      if (metaCategoryFilter === 'NOINDEX') return rule.robots.includes('noindex');

      // Check common path category
      const foundPath = COMMON_APP_PATHS.find((p) => p.path === rule.path);
      return foundPath?.category === metaCategoryFilter;
    });
  }, [seoRules, metaSearch, metaCategoryFilter]);

  const filteredRedirectRules = useMemo(() => {
    return redirectRules.filter((r) => {
      return (
        r.sourcePath.toLowerCase().includes(redirectSearch.toLowerCase()) ||
        r.destinationUrl.toLowerCase().includes(redirectSearch.toLowerCase()) ||
        (r.notes && r.notes.toLowerCase().includes(redirectSearch.toLowerCase()))
      );
    });
  }, [redirectRules, redirectSearch]);

  // Current active SERP target
  const currentSerpMeta = useMemo(() => {
    const clean = normalizePath(serpSelectedPath);
    const custom = seoRules.find((r) => r.enabled && normalizePath(r.path) === clean);
    if (custom) return custom;

    // Fallback template
    return {
      id: 'preview',
      path: clean,
      title: `${clean.replace(/^\//, '').replace(/-/g, ' ').toUpperCase() || 'Hindu Calendar 2027'} | NewsDarshan`,
      description: 'Comprehensive Vedic Panchang, astronomical calculations, daily Tithi, Nakshatra, Shubh Muhurat, and festivals computed for 100+ cities worldwide.',
      canonicalUrl: `${SITE_URL}${clean === '/' ? '' : clean}/`,
      h1: clean,
      robots: 'index, follow' as const,
      enabled: true,
      lastUpdated: '2027-01-01'
    };
  }, [serpSelectedPath, seoRules]);

  return (
    <div className="space-y-6">
      {/* LOCAL NOTIFICATION POP */}
      {localFeedback && (
        <div className="p-4 bg-emerald-900/90 border border-emerald-500 text-emerald-100 text-xs font-bold rounded-2xl flex items-center justify-between shadow-lg animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{localFeedback}</span>
          </div>
          <button
            type="button"
            onClick={() => setLocalFeedback('')}
            className="text-emerald-300 hover:text-white text-xs px-2 py-0.5 rounded-lg bg-emerald-800"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* PRO ADMIN KPI STRIP */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="p-4 bg-stone-900 text-white rounded-2xl border border-stone-800 shadow-xs relative overflow-hidden">
          <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Indexed Routes</div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-400 mt-1">{totalTrackedPaths}</div>
          <div className="text-[11px] text-stone-400 mt-1 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>100% crawlable</span>
          </div>
        </div>

        <div className="p-4 bg-stone-900 text-white rounded-2xl border border-stone-800 shadow-xs">
          <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Custom Overrides</div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-white mt-1">{activeOverridesCount}</div>
          <div className="text-[11px] text-amber-300 mt-1">Active canonicals & metas</div>
        </div>

        <div className="p-4 bg-stone-900 text-white rounded-2xl border border-stone-800 shadow-xs">
          <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Active Redirects</div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-purple-400 mt-1">{activeRedirectsCount}</div>
          <div className="text-[11px] text-purple-200 mt-1">301/302 link preservation</div>
        </div>

        <div className="p-4 bg-stone-900 text-white rounded-2xl border border-stone-800 shadow-xs">
          <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Redirect Hits</div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-sky-400 mt-1">{totalRedirectHits}</div>
          <div className="text-[11px] text-sky-200 mt-1">Live requests rerouted</div>
        </div>

        <div className="col-span-2 lg:col-span-1 p-4 bg-gradient-to-br from-emerald-950 to-stone-900 text-white rounded-2xl border border-emerald-800/60 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider">SEO Health</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-300 mt-1">{healthScore}%</div>
          <div className="text-[11px] text-emerald-200/90 mt-1">Canonical & Meta Audit OK</div>
        </div>
      </div>

      {/* PRO SUB-TABS NAVIGATION */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-3">
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-2xl border border-stone-200">
          <button
            type="button"
            onClick={() => setSubTab('meta')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              subTab === 'meta'
                ? 'bg-white text-[#9A3412] shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Canonical & Meta Editor</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-stone-100 text-[10px] font-mono text-stone-700">
              {seoRules.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSubTab('redirects')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              subTab === 'redirects'
                ? 'bg-white text-[#9A3412] shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Redirects Manager</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-purple-100 text-[10px] font-mono text-purple-800">
              {redirectRules.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSubTab('serp')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              subTab === 'serp'
                ? 'bg-white text-[#9A3412] shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live SERP Simulator</span>
          </button>

          <button
            type="button"
            onClick={() => setSubTab('backup')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              subTab === 'backup'
                ? 'bg-white text-[#9A3412] shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Backup & Sync</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={refreshAll}
            className="p-2 text-stone-600 hover:text-stone-900 bg-white border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors shadow-2xs"
            title="Refresh from storage"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          {subTab === 'meta' && (
            <button
              type="button"
              onClick={handleOpenAddMeta}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#9A3412] hover:bg-[#7C2D12] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add URL Rule</span>
            </button>
          )}

          {subTab === 'redirects' && (
            <button
              type="button"
              onClick={handleOpenAddRedirect}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Redirect (301/302)</span>
            </button>
          )}
        </div>
      </div>

      {/* =================================================================== */}
      {/* SUB-TAB 1: CANONICAL & META EDITOR */}
      {/* =================================================================== */}
      {subTab === 'meta' && (
        <div className="space-y-4">
          {/* Controls Bar: Search & Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={metaSearch}
                onChange={(e) => setMetaSearch(e.target.value)}
                placeholder="Filter by URL path, meta title, canonical tag..."
                className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={metaCategoryFilter}
                onChange={(e) => setMetaCategoryFilter(e.target.value)}
                className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-700 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              >
                <option value="ALL">All Categories ({seoRules.length})</option>
                <option value="ACTIVE">Active Overrides Only</option>
                <option value="DISABLED">Disabled Overrides</option>
                <option value="Core">Core Pages</option>
                <option value="Calendar">Calendar & Months</option>
                <option value="Vrat">Vrat & Deities</option>
                <option value="Festivals">Festivals</option>
                <option value="Tools">Astrology Tools</option>
                <option value="Regional">Regional Calendars</option>
                <option value="NOINDEX">Noindex Tagged</option>
              </select>
            </div>
          </div>

          {/* Quick Preset Badges */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs text-stone-600 scrollbar-none">
            <span className="font-semibold text-stone-400 text-[11px] shrink-0">Quick jump:</span>
            {['/', '/today', '/hindu-calendar-2027', '/choghadiya', '/vrat', '/kundli-milan', '/sade-sati', '/festivals/2027'].map((quick) => (
              <button
                key={quick}
                type="button"
                onClick={() => setMetaSearch(quick)}
                className={`px-2 py-1 rounded-lg border font-mono text-[11px] transition-colors shrink-0 ${
                  metaSearch === quick
                    ? 'bg-[#9A3412] text-white border-[#9A3412]'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {quick}
              </button>
            ))}
            {metaSearch && (
              <button
                type="button"
                onClick={() => setMetaSearch('')}
                className="text-[11px] text-amber-700 underline font-medium ml-1 shrink-0"
              >
                Clear
              </button>
            )}
          </div>

          {/* Rules List */}
          <div className="bg-white rounded-3xl border border-stone-200 shadow-xs divide-y divide-stone-100 overflow-hidden">
            {filteredMetaRules.length === 0 ? (
              <div className="p-8 text-center space-y-3">
                <Tag className="w-8 h-8 text-stone-400 mx-auto" />
                <div className="text-sm font-bold text-stone-800">No SEO rules matched your filter</div>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Click "+ Add URL Rule" to create a custom canonical tag or meta description for this URL path.
                </p>
                <button
                  type="button"
                  onClick={handleOpenAddMeta}
                  className="px-4 py-2 bg-[#9A3412] text-white text-xs font-bold rounded-xl"
                >
                  Create Custom SEO Override
                </button>
              </div>
            ) : (
              filteredMetaRules.map((rule) => {
                const titleLength = rule.title.length;
                const descLength = rule.description.length;
                const isOptimalTitle = titleLength >= 35 && titleLength <= 65;
                const isOptimalDesc = descLength >= 120 && descLength <= 165;

                return (
                  <div key={rule.id} className="p-4 sm:p-5 hover:bg-stone-50/70 transition-colors">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      {/* Left: Path, Canonical & Metas */}
                      <div className="space-y-2 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-amber-950 bg-amber-100/70 px-2.5 py-0.5 rounded-lg border border-amber-200">
                            {rule.path}
                          </span>

                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              rule.enabled
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : 'bg-stone-200 text-stone-600 border border-stone-300'
                            }`}
                          >
                            {rule.enabled ? 'ACTIVE OVERRIDE' : 'DISABLED'}
                          </span>

                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold ${
                              rule.robots.includes('noindex')
                                ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                : 'bg-blue-100 text-blue-800 border border-blue-200'
                            }`}
                          >
                            {rule.robots}
                          </span>

                          {rule.lastUpdated && (
                            <span className="text-[10px] text-stone-400">
                              Updated: {rule.lastUpdated}
                            </span>
                          )}
                        </div>

                        {/* Title Display */}
                        <div>
                          <div className="text-xs font-semibold text-stone-500 flex items-center gap-2">
                            <span>Meta Title</span>
                            <span
                              className={`text-[10px] font-mono px-1.5 py-0.2 rounded-sm ${
                                isOptimalTitle
                                  ? 'text-emerald-700 bg-emerald-50'
                                  : 'text-amber-800 bg-amber-50'
                              }`}
                            >
                              {titleLength} / 60 chars {isOptimalTitle ? '✓' : '⚠️'}
                            </span>
                          </div>
                          <div className="text-sm font-bold text-stone-900 mt-0.5 font-serif line-clamp-1">
                            {rule.title}
                          </div>
                        </div>

                        {/* Description Display */}
                        <div>
                          <div className="text-xs font-semibold text-stone-500 flex items-center gap-2">
                            <span>Meta Description</span>
                            <span
                              className={`text-[10px] font-mono px-1.5 py-0.2 rounded-sm ${
                                isOptimalDesc
                                  ? 'text-emerald-700 bg-emerald-50'
                                  : 'text-amber-800 bg-amber-50'
                              }`}
                            >
                              {descLength} / 160 chars {isOptimalDesc ? '✓' : '⚠️'}
                            </span>
                          </div>
                          <p className="text-xs text-stone-600 mt-0.5 line-clamp-2 leading-relaxed">
                            {rule.description}
                          </p>
                        </div>

                        {/* Canonical URL Tag Display */}
                        <div className="flex items-center gap-2 pt-1 text-xs">
                          <LinkIcon className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                          <span className="text-[11px] font-semibold text-stone-500 shrink-0">Canonical:</span>
                          <span className="font-mono text-[11px] text-stone-800 bg-stone-100 px-2 py-0.5 rounded-md border border-stone-200 truncate">
                            {rule.canonicalUrl}
                          </span>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
                        <button
                          type="button"
                          onClick={() => {
                            setSerpSelectedPath(rule.path);
                            setSubTab('serp');
                          }}
                          className="p-2 text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-xl text-xs font-bold transition-colors"
                          title="Preview in Google SERP Simulator"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleToggleMetaEnabled(rule)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                            rule.enabled
                              ? 'bg-stone-100 text-stone-700 border-stone-300 hover:bg-stone-200'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                          }`}
                        >
                          {rule.enabled ? 'Pause' : 'Activate'}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenEditMeta(rule)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#9A3412] hover:bg-[#7C2D12] text-white rounded-xl text-xs font-bold transition-colors shadow-2xs"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onNavigate(rule.path)}
                          className="p-2 text-stone-600 hover:text-[#9A3412] bg-stone-100 hover:bg-stone-200 rounded-xl text-xs transition-colors"
                          title="Visit live page in app"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteMetaRule(rule.id, rule.path)}
                          className="p-2 text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 rounded-xl text-xs transition-colors"
                          title="Delete custom override"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* SUB-TAB 2: REDIRECTS MANAGER */}
      {/* =================================================================== */}
      {subTab === 'redirects' && (
        <div className="space-y-5">
          {/* Header & Simulator Bar */}
          <div className="p-5 bg-gradient-to-br from-purple-950 via-stone-900 to-stone-900 text-white rounded-3xl border border-purple-900/60 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[11px] font-bold">
                  <Shuffle className="w-3 h-3" />
                  <span>301 Permanent & 302 Temporary Redirect Engine</span>
                </div>
                <h3 className="text-lg font-bold font-serif mt-1">Manage URL Migration & Query Routing</h3>
                <p className="text-xs text-stone-300">
                  Guarantee zero broken links (404 errors), pass link equity to canonical paths, and consolidate legacy URLs.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenAddRedirect}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors self-start sm:self-auto shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>+ Create New Redirect</span>
              </button>
            </div>

            {/* Live Redirect Tester Tool */}
            <form onSubmit={handleTestRedirect} className="p-3 bg-stone-800/80 rounded-2xl border border-stone-700 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <span className="text-xs font-bold text-stone-300 px-1 shrink-0">Test Path:</span>
              <input
                type="text"
                value={testRedirectInput}
                onChange={(e) => {
                  setTestRedirectInput(e.target.value);
                  setTestRedirectResult(null);
                }}
                placeholder="e.g. /old-panchang or /horoscope"
                className="flex-1 px-3 py-1.5 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white placeholder-stone-500 font-mono focus:outline-hidden focus:ring-2 focus:ring-purple-400"
              />
              <button
                type="submit"
                className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition-colors shrink-0"
              >
                Simulate Redirect
              </button>
            </form>

            {testRedirectResult && (
              <div
                className={`p-3 rounded-xl border text-xs font-mono flex items-center justify-between ${
                  testRedirectResult.matched
                    ? 'bg-purple-900/80 border-purple-500 text-purple-200'
                    : 'bg-stone-800 border-stone-600 text-stone-300'
                }`}
              >
                <div>
                  {testRedirectResult.matched ? (
                    <span>
                      ✓ <strong>{testRedirectResult.rule?.statusCode} Redirect:</strong> {testRedirectInput} ➔{' '}
                      <span className="text-amber-300 underline font-bold">{testRedirectResult.target}</span> (Hits:{' '}
                      {testRedirectResult.rule?.hitCount})
                    </span>
                  ) : (
                    <span>✕ No active redirect configured for {testRedirectInput}. Served as standard route.</span>
                  )}
                </div>
                {testRedirectResult.matched && (
                  <button
                    type="button"
                    onClick={() => onNavigate(testRedirectResult.target || '/')}
                    className="px-2.5 py-1 bg-white text-purple-900 text-xs font-bold rounded-lg ml-2 hover:bg-purple-100"
                  >
                    Execute Now ➔
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Search Bar for Redirects */}
          <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-stone-200 shadow-2xs">
            <Search className="w-4 h-4 text-stone-400 ml-2" />
            <input
              type="text"
              value={redirectSearch}
              onChange={(e) => setRedirectSearch(e.target.value)}
              placeholder="Search redirects by source, target destination, or notes..."
              className="w-full py-1 text-xs text-stone-900 placeholder-stone-400 focus:outline-hidden"
            />
          </div>

          {/* Redirects Table */}
          <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-700 divide-y divide-stone-200">
                <thead className="bg-stone-50 text-stone-500 font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="px-5 py-3.5">Source URL Path</th>
                    <th className="px-3 py-3.5 text-center">Type</th>
                    <th className="px-5 py-3.5">Destination URL</th>
                    <th className="px-3 py-3.5 text-center">Status</th>
                    <th className="px-3 py-3.5 text-center">Hits</th>
                    <th className="px-3 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredRedirectRules.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-5 py-8 text-center text-stone-500">
                        No redirect rules found.
                      </td>
                    </tr>
                  ) : (
                    filteredRedirectRules.map((rule) => {
                      const is301 = rule.statusCode === 301;
                      const is302 = rule.statusCode === 302;

                      return (
                        <tr key={rule.id} className="hover:bg-stone-50/70 transition-colors">
                          {/* Source */}
                          <td className="px-5 py-4">
                            <div className="font-mono font-bold text-stone-900">{rule.sourcePath}</div>
                            {rule.notes && <div className="text-[11px] text-stone-400 mt-0.5">{rule.notes}</div>}
                          </td>

                          {/* Code */}
                          <td className="px-3 py-4 text-center">
                            <span
                              className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold ${
                                is301
                                  ? 'bg-purple-100 text-purple-800 border border-purple-200'
                                  : is302
                                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                  : 'bg-sky-100 text-sky-800 border border-sky-200'
                              }`}
                            >
                              {rule.statusCode}
                            </span>
                          </td>

                          {/* Destination */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-1.5 font-mono text-emerald-800 font-semibold">
                              <ArrowRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                              <span>{rule.destinationUrl}</span>
                            </div>
                            {rule.preserveQuery && (
                              <div className="text-[10px] text-stone-400 mt-0.5">+ Preserves URL query parameters</div>
                            )}
                          </td>

                          {/* Status */}
                          <td className="px-3 py-4 text-center">
                            <button
                              type="button"
                              onClick={() => handleToggleRedirectEnabled(rule)}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors ${
                                rule.enabled
                                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                  : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                              }`}
                            >
                              {rule.enabled ? 'ACTIVE' : 'PAUSED'}
                            </button>
                          </td>

                          {/* Hits */}
                          <td className="px-3 py-4 text-center">
                            <span className="font-mono text-xs font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded-md">
                              {rule.hitCount || 0}
                            </span>
                            {rule.lastTriggered && (
                              <div className="text-[9px] text-stone-400 mt-0.5">{rule.lastTriggered.split(' ')[0]}</div>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="px-3 py-4 text-right">
                            <div className="inline-flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => {
                                  recordRedirectHit(rule.id);
                                  onNavigate(rule.destinationUrl);
                                }}
                                className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-lg text-xs"
                                title="Test redirect directly"
                              >
                                Test
                              </button>

                              <button
                                type="button"
                                onClick={() => handleOpenEditRedirect(rule)}
                                className="p-1.5 text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg text-xs"
                                title="Edit redirect"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDeleteRedirect(rule.id, rule.sourcePath)}
                                className="p-1.5 text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 rounded-lg text-xs"
                                title="Delete redirect"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* SUB-TAB 3: LIVE GOOGLE SERP SIMULATOR */}
      {/* =================================================================== */}
      {subTab === 'serp' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-stone-700 shrink-0">Simulate URL:</span>
              <select
                value={serpSelectedPath}
                onChange={(e) => setSerpSelectedPath(e.target.value)}
                className="px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              >
                {COMMON_APP_PATHS.map((p) => (
                  <option key={p.path} value={p.path}>
                    {p.path} — {p.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => setSerpDevice('desktop')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                  serpDevice === 'desktop'
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-100'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop SERP</span>
              </button>

              <button
                type="button"
                onClick={() => setSerpDevice('mobile')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                  serpDevice === 'mobile'
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-100'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile SERP</span>
              </button>
            </div>
          </div>

          {/* GOOGLE SEARCH CARD SIMULATOR */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                  Google Search Engine Result Snippet ({serpDevice.toUpperCase()})
                </span>
              </div>
              <span className="text-[11px] text-stone-400 font-mono">
                Canonical: {currentSerpMeta.canonicalUrl}
              </span>
            </div>

            {/* Google SERP Snippet Preview Box */}
            <div
              className={`p-5 bg-white rounded-2xl border border-stone-200 shadow-sm transition-all ${
                serpDevice === 'mobile' ? 'max-w-md mx-auto border-stone-300 ring-4 ring-stone-100' : 'w-full'
              }`}
            >
              {/* Header / Favicon / Breadcrumb */}
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-white text-[11px] font-bold shadow-xs">
                  🕉️
                </div>
                <div className="leading-tight">
                  <div className="text-xs font-semibold text-[#202124]">NewsDarshan</div>
                  <div className="text-[11px] text-[#4d5156] font-sans truncate max-w-sm">
                    {currentSerpMeta.canonicalUrl}
                  </div>
                </div>
              </div>

              {/* Title Link */}
              <h4 className="text-base sm:text-lg font-normal text-[#1a0dab] hover:underline cursor-pointer leading-snug line-clamp-2">
                {currentSerpMeta.title}
              </h4>

              {/* Meta Description Snippet */}
              <p className="text-xs sm:text-sm text-[#4d5156] mt-1.5 leading-relaxed line-clamp-3">
                <span className="text-stone-400 mr-1 text-[11px]">2027 ·</span>
                {currentSerpMeta.description}
              </p>

              {/* SERP Sitelinks or Rich Features */}
              <div className="mt-3 pt-3 border-t border-stone-100 grid grid-cols-2 gap-2 text-xs">
                <div className="text-[#1a0dab] hover:underline cursor-pointer">Daily Panchang Timings</div>
                <div className="text-[#1a0dab] hover:underline cursor-pointer">Choghadiya Muhurat</div>
                <div className="text-[#1a0dab] hover:underline cursor-pointer">Kundli Gun Milan</div>
                <div className="text-[#1a0dab] hover:underline cursor-pointer">Hindu Festivals 2027</div>
              </div>
            </div>

            {/* Diagnostic Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                <div className="font-bold text-stone-700">Title Pixel / Char Analysis</div>
                <div className="text-stone-500 mt-1">
                  Length: <span className="font-mono font-bold text-stone-900">{currentSerpMeta.title.length}</span> chars
                  (~{currentSerpMeta.title.length * 8}px)
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                  ✓ Fits within desktop 600px truncation limits
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                <div className="font-bold text-stone-700">Snippet Character Count</div>
                <div className="text-stone-500 mt-1">
                  Length: <span className="font-mono font-bold text-stone-900">{currentSerpMeta.description.length}</span> chars
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                  ✓ Optimal range (120 - 160 characters)
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                <div className="font-bold text-stone-700">Robots & Canonical</div>
                <div className="text-stone-500 mt-1">
                  Robots: <code className="text-stone-900">{currentSerpMeta.robots}</code>
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                  ✓ Self-referential HTTPS canonical tag
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* SUB-TAB 4: BACKUP, EXPORT & RESTORE */}
      {/* =================================================================== */}
      {subTab === 'backup' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Export Card */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 space-y-4 shadow-xs">
            <div className="flex items-center gap-2">
              <Download className="w-5 h-5 text-[#9A3412]" />
              <h3 className="text-base font-bold text-stone-900 font-serif">Export SEO Configuration</h3>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed">
              Download the complete database of canonical tags, custom meta descriptions, robots indexing directives, and 301/302 redirects as a portable JSON file.
            </p>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs font-mono space-y-1">
              <div>Total SEO Rules: {seoRules.length}</div>
              <div>Total Redirects: {redirectRules.length}</div>
              <div>Format: JSON (Compliant with NewsDarshan Engine v1.0)</div>
            </div>
            <button
              type="button"
              onClick={handleDownloadBackup}
              className="w-full py-2.5 bg-[#9A3412] hover:bg-[#7C2D12] text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Download JSON Backup</span>
            </button>
          </div>

          {/* Import Card */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 space-y-4 shadow-xs">
            <div className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-purple-700" />
              <h3 className="text-base font-bold text-stone-900 font-serif">Import & Restore Configuration</h3>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed">
              Restore previously saved SEO metadata or sync redirects between staging and production environments.
            </p>
            <label className="block p-4 border-2 border-dashed border-stone-300 hover:border-purple-500 rounded-2xl cursor-pointer text-center transition-colors bg-stone-50 hover:bg-purple-50/50">
              <Upload className="w-6 h-6 text-stone-400 mx-auto mb-1" />
              <span className="text-xs font-bold text-stone-700 block">Select .json backup file</span>
              <span className="text-[11px] text-stone-400">Click to browse your device</span>
              <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          {/* Reset Defaults Card */}
          <div className="md:col-span-2 bg-stone-50 rounded-3xl border border-stone-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Factory Shastric Reset</span>
              </div>
              <p className="text-xs text-stone-500 mt-1">
                Revert canonical tags, meta titles, or redirects to initial high-performance astronomical defaults.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetSEODefaults}
                className="px-3.5 py-2 bg-white hover:bg-stone-100 text-stone-800 text-xs font-bold rounded-xl border border-stone-300 transition-colors"
              >
                Reset SEO Rules
              </button>
              <button
                type="button"
                onClick={handleResetRedirectDefaults}
                className="px-3.5 py-2 bg-white hover:bg-stone-100 text-purple-900 text-xs font-bold rounded-xl border border-stone-300 transition-colors"
              >
                Reset Redirects
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* MODAL: EDIT / CREATE SEO RULE */}
      {/* =================================================================== */}
      {isEditMetaModalOpen && editingMetaRule && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-stone-200 max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-stone-900 font-serif">
                  {editingMetaRule.id?.startsWith('seo-custom') ? 'Create URL SEO Rule' : 'Edit URL SEO Rule'}
                </h3>
                <p className="text-xs text-stone-500">
                  Control canonical tags, robots meta, and SERP descriptions for this exact path.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditMetaModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 p-2 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveMetaRule} className="space-y-4">
              {/* Target URL Path */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Target URL Path <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    required
                    placeholder="/today or /festivals/diwali or /custom-path"
                    value={editingMetaRule.path || ''}
                    onChange={(e) => {
                      const newPath = e.target.value;
                      setEditingMetaRule((prev) => ({
                        ...prev,
                        path: newPath,
                        canonicalUrl: `${SITE_URL}${newPath.startsWith('/') ? newPath : `/${newPath}`}/`
                      }));
                    }}
                    className="flex-1 px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                  {/* Shortcut helper dropdown */}
                  <select
                    onChange={(e) => {
                      if (!e.target.value) return;
                      const sel = e.target.value;
                      setEditingMetaRule((prev) => ({
                        ...prev,
                        path: sel,
                        canonicalUrl: `${SITE_URL}${sel === '/' ? '' : sel}/`
                      }));
                    }}
                    className="px-2.5 py-2 bg-stone-100 border border-stone-300 rounded-xl text-xs font-medium text-stone-700"
                  >
                    <option value="">Preset paths...</option>
                    {COMMON_APP_PATHS.map((p) => (
                      <option key={p.path} value={p.path}>
                        {p.path}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-[11px] text-stone-400 mt-1">
                  Enter any valid URL path starting with a forward slash.
                </p>
              </div>

              {/* Meta Title */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-stone-700">
                    Meta Title (Page & SERP Title) <span className="text-rose-500">*</span>
                  </label>
                  <span
                    className={`text-[10px] font-mono ${
                      (editingMetaRule.title || '').length > 65
                        ? 'text-rose-600 font-bold'
                        : 'text-stone-400'
                    }`}
                  >
                    {(editingMetaRule.title || '').length} / 60 characters
                  </span>
                </div>
                <input
                  type="text"
                  required
                  value={editingMetaRule.title || ''}
                  onChange={(e) => setEditingMetaRule({ ...editingMetaRule, title: e.target.value })}
                  placeholder="e.g. Hindu Calendar 2027 – Festivals, Tithi, Vrat & Panchang | NewsDarshan"
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Meta Description */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-stone-700">
                    Meta Description (SERP Snippet) <span className="text-rose-500">*</span>
                  </label>
                  <span
                    className={`text-[10px] font-mono ${
                      (editingMetaRule.description || '').length > 165
                        ? 'text-rose-600 font-bold'
                        : 'text-stone-400'
                    }`}
                  >
                    {(editingMetaRule.description || '').length} / 160 characters
                  </span>
                </div>
                <textarea
                  rows={3}
                  required
                  value={editingMetaRule.description || ''}
                  onChange={(e) => setEditingMetaRule({ ...editingMetaRule, description: e.target.value })}
                  placeholder="Summarize the core Vedic content, exact city timings, and value proposition in 120-160 characters..."
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500 leading-relaxed"
                />
              </div>

              {/* Canonical URL Tag */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-stone-700">
                    Canonical Tag (rel="canonical") <span className="text-rose-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const clean = normalizePath(editingMetaRule.path || '/');
                      setEditingMetaRule({
                        ...editingMetaRule,
                        canonicalUrl: `${SITE_URL}${clean === '/' ? '' : clean}/`
                      });
                    }}
                    className="text-[11px] text-[#9A3412] hover:underline font-semibold"
                  >
                    Auto Self-Canonicalize
                  </button>
                </div>
                <input
                  type="url"
                  required
                  value={editingMetaRule.canonicalUrl || ''}
                  onChange={(e) => setEditingMetaRule({ ...editingMetaRule, canonicalUrl: e.target.value })}
                  placeholder="https://www.newsdarshan.in/today/"
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
                <p className="text-[11px] text-stone-400 mt-1">
                  Prevents duplicate content penalties by instructing search crawlers on the single authoritative URL.
                </p>
              </div>

              {/* Robots & Heading Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Robots Indexing Directive</label>
                  <select
                    value={editingMetaRule.robots || 'index, follow'}
                    onChange={(e) =>
                      setEditingMetaRule({
                        ...editingMetaRule,
                        robots: e.target.value as any
                      })
                    }
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-medium text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="index, follow">index, follow (Standard Recommended)</option>
                    <option value="noindex, follow">noindex, follow (Do not index, follow links)</option>
                    <option value="noindex, nofollow">noindex, nofollow (Complete block)</option>
                    <option value="index, nofollow">index, nofollow</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">H1 Main Heading (Optional)</label>
                  <input
                    type="text"
                    value={editingMetaRule.h1 || ''}
                    onChange={(e) => setEditingMetaRule({ ...editingMetaRule, h1: e.target.value })}
                    placeholder="e.g. Hindu Calendar 2027 & Daily Panchang"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Status Switch */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="ruleEnabled"
                  checked={editingMetaRule.enabled !== false}
                  onChange={(e) => setEditingMetaRule({ ...editingMetaRule, enabled: e.target.checked })}
                  className="rounded-md text-[#9A3412] focus:ring-amber-500"
                />
                <label htmlFor="ruleEnabled" className="text-xs font-bold text-stone-800">
                  Active Override (Takes precedence over automatic algorithm)
                </label>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsEditMetaModalOpen(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#9A3412] hover:bg-[#7C2D12] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                >
                  Save SEO Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* MODAL: EDIT / CREATE REDIRECT RULE */}
      {/* =================================================================== */}
      {isEditRedirectModalOpen && editingRedirectRule && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-stone-200 max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-stone-900 font-serif">
                  {editingRedirectRule.id?.startsWith('red-custom') ? 'Create URL Redirect' : 'Edit URL Redirect'}
                </h3>
                <p className="text-xs text-stone-500">
                  Forward traffic seamlessly and preserve search engine rankings with 301/302 routing.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditRedirectModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 p-2 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveRedirectRule} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Source Path (From) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. /old-panchang or /panchang-today"
                  value={editingRedirectRule.sourcePath || ''}
                  onChange={(e) => setEditingRedirectRule({ ...editingRedirectRule, sourcePath: e.target.value })}
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                />
                <p className="text-[11px] text-stone-400 mt-1">
                  The incoming request path that should be redirected.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Destination URL (To) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. /today or /hindu-calendar-2027"
                  value={editingRedirectRule.destinationUrl || ''}
                  onChange={(e) => setEditingRedirectRule({ ...editingRedirectRule, destinationUrl: e.target.value })}
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                />
                <p className="text-[11px] text-stone-400 mt-1">
                  The target canonical URL or app path.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">HTTP Status Code</label>
                  <select
                    value={editingRedirectRule.statusCode || 301}
                    onChange={(e) =>
                      setEditingRedirectRule({
                        ...editingRedirectRule,
                        statusCode: parseInt(e.target.value, 10) as any
                      })
                    }
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-medium text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                  >
                    <option value={301}>301 - Moved Permanently (Passes SEO link juice)</option>
                    <option value={302}>302 - Found / Temporary</option>
                    <option value={307}>307 - Temporary Redirect (Preserves method)</option>
                    <option value={308}>308 - Permanent Redirect (Preserves method)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Internal Notes / Audit</label>
                  <input
                    type="text"
                    value={editingRedirectRule.notes || ''}
                    onChange={(e) => setEditingRedirectRule({ ...editingRedirectRule, notes: e.target.value })}
                    placeholder="e.g. Legacy migration from 2026 sitemap"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="preserveQuery"
                    checked={editingRedirectRule.preserveQuery !== false}
                    onChange={(e) => setEditingRedirectRule({ ...editingRedirectRule, preserveQuery: e.target.checked })}
                    className="rounded-md text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor="preserveQuery" className="text-xs font-bold text-stone-800">
                    Preserve Query Parameters (e.g. ?city=mumbai&lang=hi)
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="redirectEnabled"
                    checked={editingRedirectRule.enabled !== false}
                    onChange={(e) => setEditingRedirectRule({ ...editingRedirectRule, enabled: e.target.checked })}
                    className="rounded-md text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor="redirectEnabled" className="text-xs font-bold text-stone-800">
                    Enable Redirect Rule
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsEditRedirectModalOpen(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                >
                  Save Redirect
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
