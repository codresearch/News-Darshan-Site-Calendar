import { useState } from 'react';
import {
  getIndexingLogs,
  getIndexingConfig,
  saveIndexingServiceAccountJson,
  submitRealUrlForIndexing,
  pingSearchEnginesReal,
  clearIndexingLogs,
  IndexingLogEntry
} from '../../utils/instantIndexingService';
import { FAMOUS_TEMPLES } from '../../data/templesData';
import {
  Zap,
  CheckCircle2,
  AlertTriangle,
  Globe,
  RefreshCw,
  Send,
  Trash2,
  ShieldCheck,
  ExternalLink,
  Layers,
  Key,
  Upload,
  Lock,
  FileCode,
  Activity,
  Server
} from 'lucide-react';

export default function InstantIndexingCenter() {
  const [logs, setLogs] = useState<IndexingLogEntry[]>(getIndexingLogs);
  const [config, setConfig] = useState(getIndexingConfig);
  const [singleUrl, setSingleUrl] = useState('');
  const [actionType, setActionType] = useState<'URL_UPDATED' | 'URL_DELETED'>('URL_UPDATED');
  const [jsonInput, setJsonInput] = useState(config.serviceAccountJsonRaw || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [configError, setConfigError] = useState('');
  const [showConfigBox, setShowConfigBox] = useState(!config.isConfigured);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  // Mechanical audio click feedback
  const playClickSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const audioCtx = new AudioCtx();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } catch {}
  };

  const refreshLogs = () => {
    setLogs(getIndexingLogs());
  };

  // Save Service Account JSON
  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setConfigError('');
    const result = saveIndexingServiceAccountJson(jsonInput);
    if (result.success) {
      setConfig(result.config);
      setShowConfigBox(false);
      setStatusMessage('✅ Google Service Account credentials saved successfully!');
      setTimeout(() => setStatusMessage(''), 5000);
    } else {
      setConfigError(result.error || 'Failed to parse JSON.');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setJsonInput(content);
        const result = saveIndexingServiceAccountJson(content);
        if (result.success) {
          setConfig(result.config);
          setShowConfigBox(false);
          setStatusMessage(`✅ Loaded Google Service Account JSON for: ${result.config.clientEmail}`);
          setTimeout(() => setStatusMessage(''), 5000);
        } else {
          setConfigError(result.error || 'Failed to parse JSON key file.');
        }
      }
    };
    reader.readAsText(file);
  };

  // Submit Single URL
  const handleSingleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!singleUrl.trim()) return;

    let fullUrl = singleUrl.trim();
    if (!fullUrl.startsWith('http')) {
      fullUrl = `https://www.newsdarshan.in${fullUrl.startsWith('/') ? '' : '/'}${fullUrl}`;
    }

    setIsSubmitting(true);
    setStatusMessage('Transmitting indexing notification to Google...');

    const res = await submitRealUrlForIndexing(fullUrl, actionType);

    setIsSubmitting(false);
    refreshLogs();
    if (res.status === 'SUCCESS') {
      setStatusMessage(`✅ Notification accepted by Google for: ${fullUrl}`);
    } else if (res.status === 'CONFIG_REQUIRED') {
      setStatusMessage('⚠️ Google Service Account JSON required. Please paste your JSON credentials below.');
      setShowConfigBox(true);
    } else {
      setStatusMessage(`ℹ️ Status (${res.statusCode}): ${res.message}`);
    }
    setTimeout(() => setStatusMessage(''), 6000);
  };

  // Real Search Engine Sitemap Ping
  const handlePingSearchEngines = async () => {
    setIsSubmitting(true);
    setStatusMessage('Pinging Google & Bing sitemaps with live network request...');

    const sitemap = 'https://www.newsdarshan.in/sitemap.xml';
    await pingSearchEnginesReal(sitemap);

    setIsSubmitting(false);
    setStatusMessage('✅ Live ping dispatched to Google and Bing crawler notification endpoints.');
    refreshLogs();
    setTimeout(() => setStatusMessage(''), 5000);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-6 bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white rounded-3xl border-2 border-amber-500 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-xs font-bold text-amber-300 mb-2">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Official Google Indexing API Integration</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif">
            Google Instant Indexing API
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
            Real direct communication with Google's Indexing API v3. Connect your official Google Cloud Service Account JSON key to notify Google crawlers in real time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto shrink-0">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              handlePingSearchEngines();
            }}
            disabled={isSubmitting}
            className="px-5 py-3 bg-amber-500 hover:bg-amber-400 active:translate-y-1 active:border-b-0 border-b-4 border-amber-700 text-stone-950 font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Activity className={`w-4 h-4 ${isSubmitting ? 'animate-spin' : ''}`} />
            <span>⚡ Click Here to Dispatch Crawler Ping</span>
          </button>

          <button
            type="button"
            onClick={() => setShowConfigBox(!showConfigBox)}
            className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs rounded-xl border border-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Key className="w-4 h-4 text-amber-400" />
            <span>{config.isConfigured ? 'Edit Service Account Key' : 'Configure Google Key'}</span>
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-4 bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-xs font-bold rounded-2xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Real Connection Status Indicator */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-3xl border-2 border-stone-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-stone-500 text-xs font-bold uppercase tracking-wider block">Google API Status</span>
            <div className="mt-1 flex items-center gap-1.5">
              {config.isConfigured ? (
                <span className="text-sm font-bold text-emerald-600 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Key Connected</span>
                </span>
              ) : (
                <span className="text-sm font-bold text-amber-600 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>Key Setup Required</span>
                </span>
              )}
            </div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-700">
            <Server className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 bg-white rounded-3xl border-2 border-stone-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-stone-500 text-xs font-bold uppercase tracking-wider block">Service Account Email</span>
            <div className="text-xs font-mono font-semibold text-stone-900 truncate max-w-[200px] mt-1" title={config.clientEmail || 'Not configured'}>
              {config.clientEmail || 'None (Upload JSON below)'}
            </div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-700">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 bg-white rounded-3xl border-2 border-stone-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-stone-500 text-xs font-bold uppercase tracking-wider block">Google Search Console</span>
            <a
              href="https://search.google.com/search-console"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#9A3412] hover:underline flex items-center gap-1 mt-1"
            >
              <span>Open Search Console</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-[#9A3412] flex items-center justify-center font-bold text-xs">
            GSC
          </div>
        </div>
      </div>

      {/* Google Service Account Key Setup Box (Real Credentials) */}
      {showConfigBox && (
        <div className="p-6 bg-stone-900 text-white rounded-3xl border-2 border-amber-500 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <Key className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold font-serif">Google Cloud Service Account JSON Key</h3>
            </div>
            <button
              type="button"
              onClick={() => setShowConfigBox(false)}
              className="text-stone-400 hover:text-white font-bold"
            >
              ✕
            </button>
          </div>

          <div className="p-4 bg-stone-800 rounded-2xl text-xs text-stone-300 space-y-2 border border-stone-700">
            <strong className="text-amber-300 font-bold block">How to get your real Google Service Account key:</strong>
            <ol className="list-decimal list-inside space-y-1 text-stone-300">
              <li>
                Open{' '}
                <a
                  href="https://console.cloud.google.com/iam-admin/serviceaccounts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 underline"
                >
                  Google Cloud Console → Service Accounts
                </a>.
              </li>
              <li>
                Enable the{' '}
                <a
                  href="https://console.cloud.google.com/apis/library/indexing.googleapis.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 underline"
                >
                  Web Search Indexing API
                </a>.
              </li>
              <li>Create a key for your Service Account in JSON format and download it.</li>
              <li>
                Go to{' '}
                <a
                  href="https://search.google.com/search-console/users"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 underline"
                >
                  Google Search Console → Settings → Users & Permissions
                </a>{' '}
                and add your Service Account email as an <strong>Owner</strong>.
              </li>
              <li>Paste the contents of your JSON file below or upload it directly.</li>
            </ol>
          </div>

          {configError && (
            <div className="p-3 bg-rose-950 border border-rose-600 text-rose-200 text-xs font-bold rounded-xl">
              {configError}
            </div>
          )}

          <form onSubmit={handleSaveConfig} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-stone-300 uppercase tracking-wider">
                  Paste Service Account JSON Content
                </label>
                <label className="text-xs font-bold text-amber-400 hover:text-amber-300 cursor-pointer flex items-center gap-1">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload .json file</span>
                  <input
                    type="file"
                    accept=".json,application/json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <textarea
                rows={5}
                required
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='{\n  "type": "service_account",\n  "project_id": "your-project",\n  "client_email": "your-account@your-project.iam.gserviceaccount.com",\n  "private_key": "-----BEGIN PRIVATE KEY-----\\n..."\n}'
                className="w-full p-3.5 bg-stone-950 border border-stone-800 rounded-2xl font-mono text-xs text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div className="flex items-center justify-end gap-2">
              {config.isConfigured && (
                <button
                  type="button"
                  onClick={() => {
                    saveIndexingServiceAccountJson('');
                    setConfig(getIndexingConfig());
                    setJsonInput('');
                  }}
                  className="px-4 py-2 text-rose-400 hover:text-rose-300 text-xs font-bold cursor-pointer"
                >
                  Remove Key
                </button>
              )}
              <button
                type="submit"
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
              >
                Save & Connect Key
              </button>
            </div>
          </form>
        </div>
      )}

      {/* URL Submission Form & Direct Search Console Inspection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Single URL Submit */}
        <div className="p-6 bg-white rounded-3xl border-2 border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <Send className="w-5 h-5 text-[#9A3412]" />
            <div>
              <h3 className="text-lg font-bold text-stone-900 font-serif">Publish URL to Google</h3>
              <p className="text-xs text-stone-500">Send an instant crawl request for updated content.</p>
            </div>
          </div>

          <form onSubmit={handleSingleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Target URL
              </label>
              <input
                type="text"
                required
                placeholder="https://www.newsdarshan.in/today"
                value={singleUrl}
                onChange={(e) => setSingleUrl(e.target.value)}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-2xl text-xs sm:text-sm font-mono text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#9A3412]"
              />
            </div>

            <div className="flex items-center gap-3">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">Action:</label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActionType('URL_UPDATED')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    actionType === 'URL_UPDATED'
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  URL_UPDATED
                </button>
                <button
                  type="button"
                  onClick={() => setActionType('URL_DELETED')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    actionType === 'URL_DELETED'
                      ? 'bg-rose-600 text-white shadow-2xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  URL_DELETED
                </button>
              </div>
            </div>

            {/* Tactile 3D Dispatch Button with Click Feedback */}
            <div className="space-y-2 pt-1">
              <button
                type="submit"
                disabled={isSubmitting || !singleUrl.trim()}
                onClick={() => {
                  playClickSound();
                  setIsButtonClicked(true);
                  setClickCount((prev) => prev + 1);
                  setTimeout(() => setIsButtonClicked(false), 800);
                }}
                className={`w-full py-4 px-6 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-3 cursor-pointer transition-all duration-150 transform select-none ${
                  isSubmitting
                    ? 'bg-amber-600 text-white cursor-wait translate-y-1 shadow-inner'
                    : isButtonClicked
                    ? 'bg-emerald-600 text-white translate-y-1 shadow-inner ring-4 ring-emerald-400'
                    : 'bg-gradient-to-r from-[#9A3412] via-[#C2410C] to-[#9A3412] hover:brightness-110 active:translate-y-1 active:shadow-inner text-white shadow-lg hover:shadow-xl border-b-4 border-[#5E1E08] active:border-b-0'
                }`}
              >
                <Zap className={`w-5 h-5 ${isSubmitting ? 'animate-spin text-amber-200' : isButtonClicked ? 'scale-125 text-emerald-200' : 'text-amber-300'}`} />
                <span>
                  {isSubmitting
                    ? '⚡ TRANSMITTING TO GOOGLE API...'
                    : isButtonClicked
                    ? '💥 CLICK REGISTERED! DISPATCHING...'
                    : '🚀 Click Here to Dispatch Live to Google'}
                </span>
                {clickCount > 0 && !isSubmitting && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/20 text-white">
                    Clicks: {clickCount}
                  </span>
                )}
              </button>
              <div className="flex items-center justify-between text-[11px] text-stone-500 px-1">
                <span>✓ Interactive mechanical button</span>
                <span className="font-mono text-emerald-700 font-bold">● Google API v3 Ready</span>
              </div>
            </div>
          </form>

          {/* Quick preset links */}
          <div className="pt-2 text-xs text-stone-500">
            <span className="font-bold text-stone-700">Quick Test URLs: </span>
            <button
              type="button"
              onClick={() => setSingleUrl('https://www.newsdarshan.in/today')}
              className="underline text-[#9A3412] hover:text-stone-900 mr-2"
            >
              /today
            </button>
            <button
              type="button"
              onClick={() => setSingleUrl('https://www.newsdarshan.in/temples/angkor-wat-cambodia')}
              className="underline text-[#9A3412] hover:text-stone-900 mr-2"
            >
              /angkor-wat
            </button>
            <button
              type="button"
              onClick={() => setSingleUrl('https://www.newsdarshan.in/choghadiya')}
              className="underline text-[#9A3412] hover:text-stone-900"
            >
              /choghadiya
            </button>
          </div>
        </div>

        {/* Real Live Google Search Console URL Inspector Tool */}
        <div className="p-6 bg-white rounded-3xl border-2 border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <ExternalLink className="w-5 h-5 text-[#9A3412]" />
            <div>
              <h3 className="text-lg font-bold text-stone-900 font-serif">Google Search Console URL Inspector</h3>
              <p className="text-xs text-stone-500">Check official Google indexing status directly on Google.</p>
            </div>
          </div>

          <p className="text-xs text-stone-600 leading-relaxed">
            Google's authoritative URL Inspection tool provides exact Googlebot crawl dates, index coverage, and mobile-friendly validation.
          </p>

          <div className="space-y-2.5">
            {[
              { name: 'Homepage (/)', path: '/' },
              { name: "Today's Panchang (/today)", path: '/today' },
              { name: 'Aaj Ka Choghadiya (/choghadiya)', path: '/choghadiya' },
              { name: 'Famous Temples (/temples)', path: '/temples' },
              { name: 'Angkor Wat (/temples/angkor-wat-cambodia)', path: '/temples/angkor-wat-cambodia' }
            ].map((page) => {
              const fullUrl = `https://www.newsdarshan.in${page.path}`;
              const inspectUrl = `https://search.google.com/search-console/inspect?resource_id=https%3A%2F%2Fwww.newsdarshan.in%2F&id=${encodeURIComponent(fullUrl)}`;

              return (
                <div key={page.path} className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between gap-2">
                  <div className="min-w-0 truncate">
                    <span className="font-bold text-xs text-stone-900 block truncate">{page.name}</span>
                    <span className="text-[11px] font-mono text-stone-500 block truncate">{fullUrl}</span>
                  </div>
                  <a
                    href={inspectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 bg-white hover:bg-stone-100 text-[#9A3412] font-bold text-xs rounded-lg border border-stone-200 transition-colors flex items-center gap-1 shrink-0"
                  >
                    <span>Inspect</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Real Indexing Dispatch Log Table */}
      <div className="bg-white rounded-3xl border-2 border-stone-200 shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
          <div>
            <h3 className="text-lg font-bold text-stone-900 font-serif flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#9A3412]" />
              <span>Real Indexing Notification Log</span>
            </h3>
            <p className="text-xs text-stone-500">History of real submission attempts and API responses.</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={refreshLogs}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded-xl transition-colors"
              title="Refresh Logs"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            {logs.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  clearIndexingLogs();
                  setLogs([]);
                }}
                className="p-2 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-xl transition-colors"
                title="Clear Logs"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto scrollbar-thin">
          {logs.length === 0 ? (
            <div className="p-10 text-center text-stone-500 space-y-1">
              <Activity className="w-7 h-7 text-stone-400 mx-auto mb-1" />
              <p className="font-bold text-stone-700 text-xs sm:text-sm">No indexing requests dispatched yet.</p>
              <p className="text-xs text-stone-400">
                Submit a URL above or click "Ping Google & Bing Sitemaps" to record real API dispatch logs.
              </p>
            </div>
          ) : (
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-stone-900 text-stone-300 font-bold uppercase text-[11px] tracking-wider border-b border-stone-800">
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Target URL</th>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Response Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-amber-50/40 transition-colors">
                    <td className="py-3 px-4 whitespace-nowrap">
                      {log.status === 'SUCCESS' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>{log.statusCode} OK</span>
                        </span>
                      ) : log.status === 'CONFIG_REQUIRED' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
                          <span>Key Required</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-stone-100 text-stone-700 border border-stone-300">
                          <span>{log.statusCode || 'Queued'}</span>
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap font-mono text-[11px] font-bold text-[#9A3412]">
                      {log.action}
                    </td>

                    <td className="py-3 px-4 font-mono text-xs text-stone-900 break-all">
                      {log.url}
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap text-xs text-stone-500 font-mono">
                      {log.timestamp}
                    </td>

                    <td className="py-3 px-4 text-xs text-stone-600 leading-tight">
                      {log.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
