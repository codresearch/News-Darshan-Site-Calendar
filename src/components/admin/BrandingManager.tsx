import { useState } from 'react';
import {
  getSiteBranding,
  saveSiteBranding,
  DEFAULT_BRANDING,
  SiteBrandingConfig
} from '../../utils/brandingService';
import {
  Image,
  Sparkles,
  Upload,
  CheckCircle2,
  RefreshCw,
  Palette,
  Eye,
  Globe,
  Smile,
  ShieldAlert
} from 'lucide-react';

interface BrandingManagerProps {
  onShowNotice?: (msg: string) => void;
}

export default function BrandingManager({ onShowNotice }: BrandingManagerProps) {
  const [config, setConfig] = useState<SiteBrandingConfig>(getSiteBranding);
  const [statusMsg, setStatusMsg] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'customLogoUrl' | 'faviconUrl') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Image size must be under 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setConfig((prev) => ({
          ...prev,
          [field]: dataUrl,
          ...(field === 'customLogoUrl' ? { logoType: 'image' } : {})
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveSiteBranding(config);
    setStatusMsg('✅ Site Logo & Favicon updated successfully! Changes are live across all pages.');
    if (onShowNotice) onShowNotice('✅ Site Logo & Favicon updated.');
    setTimeout(() => setStatusMsg(''), 5000);
  };

  const handleReset = () => {
    if (confirm('Reset branding, logo, and favicon to NewsDarshan defaults?')) {
      const def = saveSiteBranding(DEFAULT_BRANDING);
      setConfig(def);
      setStatusMsg('✅ Branding reset to defaults.');
      setTimeout(() => setStatusMsg(''), 4000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-6 bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white rounded-3xl border-2 border-amber-500 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-xs font-bold text-amber-300 mb-2">
            <Palette className="w-3.5 h-3.5" />
            <span>Site Identity & Brand Customization</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif">
            Logo & Favicon Manager
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
            Customize your website header logo, emblem icon, brand typography, and browser tab favicon in real time without code deployment.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold text-xs rounded-xl border border-stone-700 transition-colors self-start md:self-auto"
        >
          Reset to Defaults
        </button>
      </div>

      {statusMsg && (
        <div className="p-4 bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-xs font-bold rounded-2xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Live Preview Bar */}
      <div className="p-6 bg-white rounded-3xl border-2 border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-[#9A3412]" />
            <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif">
              Live Real-Time Header & Favicon Preview
            </h3>
          </div>
          <span className="text-xs font-bold text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
            Header Simulator
          </span>
        </div>

        {/* Header Simulation Box */}
        <div className="p-4 sm:p-6 bg-[#FAF7F2] rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo representation */}
          <div className="flex items-center gap-3">
            {config.logoType === 'image' && config.customLogoUrl ? (
              <img
                src={config.customLogoUrl}
                alt="Brand Logo"
                className="h-10 sm:h-12 w-auto object-contain rounded-lg"
              />
            ) : (
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr ${config.iconBgGradient} flex items-center justify-center text-white shadow-xs border border-amber-600/40 shrink-0`}
              >
                <span className="font-serif font-bold text-xl sm:text-2xl leading-none">
                  {config.iconSymbol || 'ॐ'}
                </span>
              </div>
            )}

            <div>
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 font-serif block leading-tight">
                {config.brandName || 'NewsDarshan'}
              </span>
              <span className="text-xs text-stone-600 font-sans tracking-wide uppercase font-semibold block">
                {config.tagline || 'Vedic Calendar & Panchang'}
              </span>
            </div>
          </div>

          {/* Browser Tab Favicon Preview */}
          <div className="bg-stone-200/80 px-4 py-2 rounded-xl border border-stone-300 flex items-center gap-2.5 text-xs text-stone-800 font-mono shadow-2xs">
            <div className="w-5 h-5 rounded flex items-center justify-center bg-white border border-stone-300 text-sm overflow-hidden shrink-0">
              {config.faviconUrl ? (
                <img src={config.faviconUrl} alt="Favicon" className="w-full h-full object-contain" />
              ) : (
                <span>{config.faviconEmoji || '🕉️'}</span>
              )}
            </div>
            <span className="truncate max-w-[180px]">
              {config.brandName || 'NewsDarshan'} – Calendar 2027
            </span>
          </div>
        </div>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section 1: Logo & Header Emblem Settings */}
        <div className="p-6 bg-white rounded-3xl border-2 border-stone-200 shadow-sm space-y-5">
          <div className="border-b border-stone-100 pb-3 flex items-center gap-2">
            <Image className="w-5 h-5 text-[#9A3412]" />
            <div>
              <h3 className="text-lg font-bold text-stone-900 font-serif">Header Logo Options</h3>
              <p className="text-xs text-stone-500">Configure text, custom image, or spiritual emblem logo.</p>
            </div>
          </div>

          {/* Mode Selector */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
              Logo Display Format
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setConfig({ ...config, logoType: 'default' })}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-center border ${
                  config.logoType === 'default'
                    ? 'bg-[#9A3412] text-white border-[#9A3412] shadow-2xs'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                Default Emblem (ॐ)
              </button>
              <button
                type="button"
                onClick={() => setConfig({ ...config, logoType: 'custom_icon' })}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-center border ${
                  config.logoType === 'custom_icon'
                    ? 'bg-[#9A3412] text-white border-[#9A3412] shadow-2xs'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                Custom Symbol
              </button>
              <button
                type="button"
                onClick={() => setConfig({ ...config, logoType: 'image' })}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-center border ${
                  config.logoType === 'image'
                    ? 'bg-[#9A3412] text-white border-[#9A3412] shadow-2xs'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                Image / Upload
              </button>
            </div>
          </div>

          {/* Brand Name Input */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Website Brand Name
            </label>
            <input
              type="text"
              required
              value={config.brandName}
              onChange={(e) => setConfig({ ...config, brandName: e.target.value })}
              className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#9A3412]"
            />
          </div>

          {/* Brand Tagline Input */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Sub-tagline
            </label>
            <input
              type="text"
              value={config.tagline}
              onChange={(e) => setConfig({ ...config, tagline: e.target.value })}
              placeholder="Vedic Calendar & Panchang"
              className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#9A3412]"
            />
          </div>

          {/* Symbol options if custom_icon */}
          {config.logoType !== 'image' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Logo Emblem Symbol / Emoji
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    maxLength={4}
                    value={config.iconSymbol}
                    onChange={(e) => setConfig({ ...config, iconSymbol: e.target.value })}
                    className="w-20 px-3 py-2 text-center bg-stone-50 border border-stone-300 rounded-xl text-lg font-serif font-bold text-stone-900"
                  />
                  <div className="flex flex-wrap gap-1.5">
                    {['ॐ', '🕉️', '🔱', '🪷', '☀', '🚩', '☸', '🪔'].map((sym) => (
                      <button
                        key={sym}
                        type="button"
                        onClick={() => setConfig({ ...config, iconSymbol: sym })}
                        className="px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-amber-100 text-sm border border-stone-200 transition-colors"
                      >
                        {sym}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Emblem Badge Gradient
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'from-[#9A3412] to-[#E8602E]', name: 'Vedic Saffron' },
                    { id: 'from-amber-600 to-yellow-500', name: 'Golden Surya' },
                    { id: 'from-red-800 to-rose-600', name: 'Sindoor Red' },
                    { id: 'from-indigo-900 to-purple-700', name: 'Royal Indigo' },
                    { id: 'from-stone-900 to-stone-800', name: 'Midnight Charcoal' }
                  ].map((grad) => (
                    <button
                      key={grad.id}
                      type="button"
                      onClick={() => setConfig({ ...config, iconBgGradient: grad.id })}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold text-white transition-all bg-gradient-to-r ${grad.id} ${
                        config.iconBgGradient === grad.id ? 'ring-2 ring-amber-400 ring-offset-2 scale-105' : 'opacity-80'
                      }`}
                    >
                      {grad.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Upload or Image URL if image */}
          {config.logoType === 'image' && (
            <div className="space-y-3 p-4 bg-stone-50 rounded-2xl border border-stone-200">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Upload Logo File (PNG, JPG, SVG)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'customLogoUrl')}
                  className="w-full text-xs text-stone-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#9A3412] file:text-white hover:file:bg-[#802B0F]"
                />
              </div>

              <div className="text-center text-xs text-stone-400 font-bold uppercase">— OR ENTER URL —</div>

              <div>
                <input
                  type="url"
                  placeholder="https://example.com/my-logo.png"
                  value={config.customLogoUrl}
                  onChange={(e) => setConfig({ ...config, customLogoUrl: e.target.value })}
                  className="w-full px-4 py-2 bg-white border border-stone-300 rounded-xl text-xs font-mono text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#9A3412]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Section 2: Browser Tab Favicon & App Icon */}
        <div className="p-6 bg-white rounded-3xl border-2 border-stone-200 shadow-sm space-y-5">
          <div className="border-b border-stone-100 pb-3 flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#9A3412]" />
            <div>
              <h3 className="text-lg font-bold text-stone-900 font-serif">Browser Tab Favicon & App Icon</h3>
              <p className="text-xs text-stone-500">The icon shown in browser tabs, bookmarks, and mobile home screen.</p>
            </div>
          </div>

          {/* Favicon Emoji Quick Pick */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
              Select Favicon Emoji / Symbol
            </label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                maxLength={4}
                value={config.faviconEmoji}
                onChange={(e) => setConfig({ ...config, faviconEmoji: e.target.value, faviconUrl: '' })}
                className="w-16 h-12 text-center text-2xl bg-stone-50 border border-stone-300 rounded-xl font-bold"
              />
              <div className="flex flex-wrap gap-2">
                {['🕉️', 'ॐ', '🚩', '🪔', '🔱', '☀', '🪷', '☸'].map((em) => (
                  <button
                    key={em}
                    type="button"
                    onClick={() => setConfig({ ...config, faviconEmoji: em, faviconUrl: '' })}
                    className={`w-10 h-10 rounded-xl text-lg flex items-center justify-center border transition-all ${
                      config.faviconEmoji === em && !config.faviconUrl
                        ? 'bg-amber-100 border-[#9A3412] scale-110 shadow-2xs'
                        : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {em}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Favicon File Upload or Custom URL */}
          <div className="space-y-3 p-4 bg-stone-50 rounded-2xl border border-stone-200">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Upload Custom Favicon Image (.ico, .png, .svg)
              </label>
              <input
                type="file"
                accept="image/*,.ico"
                onChange={(e) => handleImageUpload(e, 'faviconUrl')}
                className="w-full text-xs text-stone-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#9A3412] file:text-white hover:file:bg-[#802B0F]"
              />
            </div>

            <div className="text-center text-xs text-stone-400 font-bold uppercase">— OR IMAGE URL —</div>

            <div>
              <input
                type="url"
                placeholder="https://example.com/favicon.png"
                value={config.faviconUrl}
                onChange={(e) => setConfig({ ...config, faviconUrl: e.target.value })}
                className="w-full px-4 py-2 bg-white border border-stone-300 rounded-xl text-xs font-mono text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#9A3412]"
              />
            </div>
          </div>

          <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 text-xs text-amber-900 leading-relaxed space-y-1">
            <strong className="block font-bold">Automatic Synchronization:</strong>
            <p>
              When you click "Save Changes Live", this updates both the browser tab &lt;link rel="icon"&gt; and the header logo immediately without clearing browser cache.
            </p>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="lg:col-span-2 flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="px-8 py-3.5 bg-[#9A3412] hover:bg-[#802B0F] text-white font-bold text-sm rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Save & Apply Changes Live</span>
          </button>
        </div>
      </form>
    </div>
  );
}
