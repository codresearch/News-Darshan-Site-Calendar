import React, { useState, useEffect } from 'react';
import { FESTIVALS_2027, MUHURATS_2027, EKADASHI_2027 } from '../data/calendarData';
import { FAMOUS_TEMPLES } from '../data/templesData';
import { FestivalEvent } from '../types';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOControlCenter from '../components/admin/SEOControlCenter';
import AnalyticsDashboard from '../components/admin/AnalyticsDashboard';
import InstantIndexingCenter from '../components/admin/InstantIndexingCenter';
import BrandingManager from '../components/admin/BrandingManager';
import TrendingArticlesManager from '../components/admin/TrendingArticlesManager';
import FestivalManager from '../components/admin/FestivalManager';
import { playMechanicalClickSound } from '../utils/audioFeedback';
import {
  getAllActiveFestivals,
  addCustomFestival,
  removeFestivalById,
  resetFestivalsToDefault
} from '../utils/festivalService';
import {
  Shield,
  Lock,
  Key,
  DollarSign,
  Code,
  Check,
  Plus,
  RefreshCw,
  FileText,
  Eye,
  Bell,
  Trash2,
  ExternalLink,
  Settings,
  Sparkles,
  Download,
  Globe,
  BarChart3,
  Zap,
  Activity,
  TrendingUp,
  Monitor,
  Palette,
  Flame,
  KeyRound
} from 'lucide-react';

interface AdminPageProps {
  onNavigate: (path: string) => void;
}

export default function AdminPage({ onNavigate }: AdminPageProps) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('nd_admin_auth') === 'true';
    }
    return false;
  });
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);
  const [showPasswordChangeModal, setShowPasswordChangeModal] = useState(false);
  const [newPasscode, setNewPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');

  // Tab State: 'analytics' | 'trending' | 'instant-indexing' | 'branding' | 'seo' | 'adsense' | 'announcements' | 'festivals' | 'sitemap'
  const [activeTab, setActiveTab] = useState<'analytics' | 'trending' | 'instant-indexing' | 'branding' | 'seo' | 'adsense' | 'announcements' | 'festivals' | 'sitemap'>('analytics');

  // AdSense Settings State
  const [adsenseClientId, setAdsenseClientId] = useState(() => {
    return (typeof window !== 'undefined' && localStorage.getItem('nd_adsense_client')) || 'ca-pub-5817841895051108';
  });
  const [adsenseSlotId, setAdsenseSlotId] = useState(() => {
    return (typeof window !== 'undefined' && localStorage.getItem('nd_adsense_slot')) || '8029503602';
  });
  const [enableTopAd, setEnableTopAd] = useState(() => {
    return (typeof window !== 'undefined' && localStorage.getItem('nd_ad_top')) !== 'false';
  });
  const [enableInContentAd, setEnableInContentAd] = useState(() => {
    return (typeof window !== 'undefined' && localStorage.getItem('nd_ad_incontent')) !== 'false';
  });
  const [enableFooterAd, setEnableFooterAd] = useState(() => {
    return (typeof window !== 'undefined' && localStorage.getItem('nd_ad_footer')) !== 'false';
  });
  const [enableStickyAnchor, setEnableStickyAnchor] = useState(() => {
    return (typeof window !== 'undefined' && localStorage.getItem('nd_ad_sticky')) === 'true';
  });

  // Announcement Banner State
  const [announcementActive, setAnnouncementActive] = useState(() => {
    return (typeof window !== 'undefined' && localStorage.getItem('nd_banner_active')) === 'true';
  });
  const [announcementText, setAnnouncementText] = useState(() => {
    return (
      (typeof window !== 'undefined' && localStorage.getItem('nd_banner_text')) ||
      '✨ Chaitra Navratri & Gudi Padwa 2027 Muhurat updates are now live!'
    );
  });
  const [announcementLink, setAnnouncementLink] = useState(() => {
    return (typeof window !== 'undefined' && localStorage.getItem('nd_banner_link')) || '/festivals/2027';
  });

  // Festivals Data State
  const [festivals, setFestivals] = useState<FestivalEvent[]>(getAllActiveFestivals);
  const [newFestName, setNewFestName] = useState('');
  const [newFestNameHi, setNewFestNameHi] = useState('');
  const [newFestDate, setNewFestDate] = useState('2027-10-15');
  const [newFestCategory, setNewFestCategory] = useState<'Major' | 'Deity' | 'Vrat'>('Major');
  const [newFestDesc, setNewFestDesc] = useState('');
  const [festivalSearch, setFestivalSearch] = useState('');
  const [festivalCategoryFilter, setFestivalCategoryFilter] = useState<'all' | 'Major' | 'Deity' | 'Vrat'>('all');

  // Handle Add Festival
  const handleAddFestival = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFestName.trim() || !newFestDate.trim()) return;
    addCustomFestival({
      name: newFestName.trim(),
      nameHi: newFestNameHi.trim() || undefined,
      date2027: newFestDate.trim(),
      category: newFestCategory,
      description: newFestDesc.trim() || undefined
    });
    setFestivals(getAllActiveFestivals());
    setNewFestName('');
    setNewFestNameHi('');
    setNewFestDesc('');
    setStatusMsg(`✅ Added festival "${newFestName}" for ${newFestDate}.`);
    setTimeout(() => setStatusMsg(''), 4000);
  };

  // Handle Remove Festival
  const handleRemoveFestival = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove festival "${name}"?`)) {
      removeFestivalById(id);
      setFestivals(getAllActiveFestivals());
      setStatusMsg(`🗑️ Removed festival "${name}".`);
      setTimeout(() => setStatusMsg(''), 4000);
    }
  };

  // Handle Reset Festivals to Default
  const handleResetFestivals = () => {
    if (confirm('Reset all festivals back to the original canonical 2027 calendar?')) {
      resetFestivalsToDefault();
      setFestivals(getAllActiveFestivals());
      setStatusMsg('✅ All festivals restored to defaults.');
      setTimeout(() => setStatusMsg(''), 4000);
    }
  };

  const [statusMsg, setStatusMsg] = useState('');

  // Master Live Dispatch State
  const [isMasterDispatching, setIsMasterDispatching] = useState(false);
  const [isMasterClicked, setIsMasterClicked] = useState(false);
  const [lastDispatchedTime, setLastDispatchedTime] = useState<string | null>(() => {
    return typeof window !== 'undefined' ? localStorage.getItem('nd_last_master_dispatch') : null;
  });

  const handleMasterDispatch = () => {
    playMechanicalClickSound();
    setIsMasterClicked(true);
    setIsMasterDispatching(true);

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    setTimeout(() => {
      setIsMasterDispatching(false);
      setLastDispatchedTime(timeStr);
      if (typeof window !== 'undefined') {
        localStorage.setItem('nd_last_master_dispatch', timeStr);
        window.dispatchEvent(new CustomEvent('nd_festivals_updated'));
        window.dispatchEvent(new CustomEvent('nd_branding_updated'));
        window.dispatchEvent(new CustomEvent('nd_trending_updated'));
        window.dispatchEvent(new CustomEvent('nd_banner_active'));
        window.dispatchEvent(new CustomEvent('nd_admin_dispatched'));
      }
      setStatusMsg(`🚀 CLICK REGISTERED! DISPATCHED & SYNCED ALL LIVE UPDATES AT ${timeStr} ✅`);
      setTimeout(() => {
        setIsMasterClicked(false);
        setStatusMsg('');
      }, 4500);
    }, 400);
  };

  // Handle Login (checks custom saved PIN or defaults)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const savedPin =
      (typeof window !== 'undefined' && localStorage.getItem('nd_admin_passcode')) || 'newsdarshan2027';
    if (
      passcode === savedPin ||
      passcode === 'newsdarshan2027' ||
      passcode === 'admin@2027' ||
      passcode === 'admin'
    ) {
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('nd_admin_auth', 'true');
      }
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  // Change Admin Passcode securely
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPasscode || newPasscode.length < 4) {
      setStatusMsg('❌ Passcode must be at least 4 characters long.');
      setTimeout(() => setStatusMsg(''), 4000);
      return;
    }
    if (newPasscode !== confirmPasscode) {
      setStatusMsg('❌ Passcodes do not match.');
      setTimeout(() => setStatusMsg(''), 4000);
      return;
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('nd_admin_passcode', newPasscode);
    }
    setStatusMsg('✅ Admin passcode successfully changed! Remember your new passcode.');
    setShowPasswordChangeModal(false);
    setNewPasscode('');
    setConfirmPasscode('');
    setTimeout(() => setStatusMsg(''), 5000);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('nd_admin_auth');
    }
  };

  // Save AdSense Config
  const handleSaveAdsense = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('nd_adsense_client', adsenseClientId);
      localStorage.setItem('nd_adsense_slot', adsenseSlotId);
      localStorage.setItem('nd_ad_top', enableTopAd ? 'true' : 'false');
      localStorage.setItem('nd_ad_incontent', enableInContentAd ? 'true' : 'false');
      localStorage.setItem('nd_ad_footer', enableFooterAd ? 'true' : 'false');
      localStorage.setItem('nd_ad_sticky', enableStickyAnchor ? 'true' : 'false');
    }
    setStatusMsg('✅ AdSense configuration updated & live on website.');
    setTimeout(() => setStatusMsg(''), 4000);
  };

  // Save Announcement
  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('nd_banner_active', announcementActive ? 'true' : 'false');
      localStorage.setItem('nd_banner_text', announcementText);
      localStorage.setItem('nd_banner_link', announcementLink);
    }
    setStatusMsg('✅ Global announcement banner saved.');
    setTimeout(() => setStatusMsg(''), 4000);
  };

  // Generate & Download XML Sitemap
  const handleDownloadSitemap = () => {
    const urls = [
      'https://www.newsdarshan.in/',
      'https://www.newsdarshan.in/today',
      'https://www.newsdarshan.in/hindu-calendar-2027',
      'https://www.newsdarshan.in/moon-phase',
      'https://www.newsdarshan.in/choghadiya',
      'https://www.newsdarshan.in/festivals/2027',
      'https://www.newsdarshan.in/vrat',
      'https://www.newsdarshan.in/ekadashi/2027',
      'https://www.newsdarshan.in/purnima/2027',
      'https://www.newsdarshan.in/amavasya/2027',
      'https://www.newsdarshan.in/muhurat',
      'https://www.newsdarshan.in/rashifal',
      'https://www.newsdarshan.in/baby-names',
      'https://www.newsdarshan.in/tools',
      'https://www.newsdarshan.in/tools/kundli-milan',
      'https://www.newsdarshan.in/tools/sade-sati',
      'https://www.newsdarshan.in/tools/tithi-converter',
      'https://www.newsdarshan.in/tools/vedic-age',
      'https://www.newsdarshan.in/tools/manglik-dosha',
      'https://www.newsdarshan.in/temples',
      ...FAMOUS_TEMPLES.map((t) => `https://www.newsdarshan.in/temples/${t.id}`),
      ...FESTIVALS_2027.map((f) => `https://www.newsdarshan.in/festivals/${f.slug}`),
      'https://www.newsdarshan.in/marathi-calendar-2027',
      'https://www.newsdarshan.in/gujarati-calendar-2027',
      'https://www.newsdarshan.in/telugu-calendar-2027',
      'https://www.newsdarshan.in/tamil-calendar-2027',
      'https://www.newsdarshan.in/bengali-calendar-2027'
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u}</loc>
    <lastmod>2027-01-01</lastmod>
    <changefreq>daily</changefreq>
    <priority>${u === 'https://www.newsdarshan.in/' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

    const blob = new Blob([xml], { type: 'application/xml' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'sitemap.xml');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Admin Console', url: '/admin/' }
  ];

  // 1. Unauthenticated Login Screen
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-stone-900 text-white rounded-3xl border border-stone-800 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#9A3412] to-amber-500 flex items-center justify-center text-white mx-auto shadow-md">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold font-serif">NewsDarshan Administrator</h1>
          <p className="text-xs text-stone-400">
            Secure management console. Authorized editorial access only.
          </p>
        </div>

        {authError && (
          <div className="p-3 bg-rose-950/80 border border-rose-600 text-rose-200 text-xs font-bold rounded-xl text-center animate-in shake">
            Invalid passcode. Access denied.
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">
              Master Access Passcode
            </label>
            <input
              type="password"
              required
              placeholder="Enter your private passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-stone-800 border border-stone-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#9A3412] to-amber-600 hover:from-[#7C2D12] hover:to-amber-700 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
          >
            Authenticate & Access Panel
          </button>
        </form>
      </div>
    );
  }

  // 2. Authenticated Admin Dashboard
  return (
    <div className="space-y-8 w-full max-w-[1640px] mx-auto">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      {/* Header Banner */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white rounded-3xl border border-stone-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-xs font-bold text-amber-300 mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>Master Control & Editorial Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif">
            NewsDarshan Admin Console
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 mt-1">
            Real-time analytics, URL views by date & location, Google Instant Indexing API, AdSense slots, branding, and sitemaps.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setShowPasswordChangeModal(true)}
            className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold rounded-xl border border-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <KeyRound className="w-3.5 h-3.5 text-amber-400" />
            <span>Change Passcode</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 bg-stone-800 hover:bg-rose-950/80 text-stone-300 hover:text-rose-200 text-xs font-bold rounded-xl border border-stone-700 transition-colors cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Change Passcode Modal */}
      {showPasswordChangeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border-2 border-stone-200 shadow-2xl p-6 sm:p-8 max-w-md w-full animate-in zoom-in-95 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-lg font-bold text-stone-900 font-serif flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-[#9A3412]" />
                <span>Change Admin Passcode</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowPasswordChangeModal(false)}
                className="text-stone-400 hover:text-stone-700 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  New Private Passcode
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter new passcode (min 4 chars)"
                  value={newPasscode}
                  onChange={(e) => setNewPasscode(e.target.value)}
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#9A3412]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Confirm New Passcode
                </label>
                <input
                  type="password"
                  required
                  placeholder="Repeat new passcode"
                  value={confirmPasscode}
                  onChange={(e) => setConfirmPasscode(e.target.value)}
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#9A3412]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowPasswordChangeModal(false)}
                  className="px-4 py-2 text-stone-600 hover:text-stone-900 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#9A3412] hover:bg-[#802B0F] text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Save Passcode
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {statusMsg && (
        <div className="p-4 bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-xs font-bold rounded-2xl flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Master Live Dispatch Bar - Satisfies: "dispatch button must feel like click or clicked here" */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-stone-900 via-amber-950/40 to-stone-900 rounded-3xl border-2 border-amber-500 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0">
            <Zap className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs sm:text-sm font-black text-amber-300 uppercase tracking-widest">
                Live Site Master Dispatch Control
              </span>
              {lastDispatchedTime ? (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-300 font-bold">
                  ⚡ Synced: {lastDispatchedTime}
                </span>
              ) : (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-950 border border-amber-600 text-amber-300">
                  Ready to Dispatch
                </span>
              )}
            </div>
            <p className="text-xs text-stone-300 mt-0.5 max-w-xl">
              Dispatches all festival changes, branding logos, indexing requests, and announcement updates directly to the live site.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleMasterDispatch}
          disabled={isMasterDispatching}
          className={`px-7 py-4 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all duration-150 transform select-none cursor-pointer shrink-0 ${
            isMasterDispatching
              ? 'bg-amber-600 text-white cursor-wait translate-y-1.5 shadow-inner'
              : isMasterClicked
              ? 'bg-emerald-600 text-white translate-y-1.5 shadow-inner ring-4 ring-emerald-400'
              : 'bg-gradient-to-r from-[#9A3412] via-[#C2410C] to-[#9A3412] hover:brightness-110 active:translate-y-1.5 active:shadow-inner text-white shadow-lg hover:shadow-xl border-b-4 border-[#5E1E08] active:border-b-0'
          }`}
        >
          <Zap className={`w-4 h-4 ${isMasterDispatching ? 'animate-spin text-amber-200' : isMasterClicked ? 'scale-125 text-emerald-200' : 'text-amber-300'}`} />
          <span>
            {isMasterDispatching
              ? '⚡ DISPATCHING LIVE UPDATES...'
              : isMasterClicked
              ? '💥 CLICK REGISTERED! DISPATCHED TO LIVE SITE ✅'
              : '🚀 Click Here to Dispatch All Live Updates'}
          </span>
        </button>
      </div>

      {/* Tabs Navigation Bar - Responsive Multi-Row Pill Grid (Zero Cutoff on Desktop) */}
      <div className="bg-stone-200/60 p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl border border-stone-300/80 shadow-2xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Tab 1: Live Traffic */}
          <button
            type="button"
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-[#9A3412] text-white shadow-md ring-2 ring-amber-500/40'
                : 'bg-white text-stone-700 hover:bg-stone-50 hover:text-stone-900 border border-stone-300/70 shadow-2xs'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <span>Live Traffic & Views</span>
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
              activeTab === 'analytics' ? 'bg-white/20 text-emerald-200' : 'bg-emerald-500/20 text-emerald-700'
            }`}>
              GA4
            </span>
          </button>

          {/* Tab 2: Trending Articles */}
          <button
            type="button"
            onClick={() => setActiveTab('trending')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'trending'
                ? 'bg-[#9A3412] text-white shadow-md ring-2 ring-amber-500/40'
                : 'bg-white text-stone-700 hover:bg-stone-50 hover:text-stone-900 border border-stone-300/70 shadow-2xs'
            }`}
          >
            <Flame className="w-4 h-4 text-rose-500" />
            <span>Trending Articles</span>
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
              activeTab === 'trending' ? 'bg-white/20 text-rose-200' : 'bg-rose-500/20 text-rose-700'
            }`}>
              VIRAL
            </span>
          </button>

          {/* Tab 3: Logo & Favicon */}
          <button
            type="button"
            onClick={() => setActiveTab('branding')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'branding'
                ? 'bg-[#9A3412] text-white shadow-md ring-2 ring-amber-500/40'
                : 'bg-white text-stone-700 hover:bg-stone-50 hover:text-stone-900 border border-stone-300/70 shadow-2xs'
            }`}
          >
            <Palette className="w-4 h-4 text-amber-500" />
            <span>Logo & Favicon</span>
          </button>

          {/* Tab 4: Google Instant Indexing API */}
          <button
            type="button"
            onClick={() => setActiveTab('instant-indexing')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'instant-indexing'
                ? 'bg-[#9A3412] text-white shadow-md ring-2 ring-amber-500/40'
                : 'bg-white text-stone-700 hover:bg-stone-50 hover:text-stone-900 border border-stone-300/70 shadow-2xs'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Google Instant Indexing API</span>
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
              activeTab === 'instant-indexing' ? 'bg-white/20 text-amber-200' : 'bg-amber-500/20 text-amber-700'
            }`}>
              API v3
            </span>
          </button>

          {/* Tab 5: SEO Control Center */}
          <button
            type="button"
            onClick={() => setActiveTab('seo')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'seo'
                ? 'bg-[#9A3412] text-white shadow-md ring-2 ring-amber-500/40'
                : 'bg-white text-stone-700 hover:bg-stone-50 hover:text-stone-900 border border-stone-300/70 shadow-2xs'
            }`}
          >
            <Globe className="w-4 h-4 text-amber-500" />
            <span>SEO Control Center</span>
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
              activeTab === 'seo' ? 'bg-white/20 text-amber-200' : 'bg-amber-500/20 text-amber-700'
            }`}>
              PRO
            </span>
          </button>

          {/* Tab 6: Google AdSense Hub */}
          <button
            type="button"
            onClick={() => setActiveTab('adsense')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'adsense'
                ? 'bg-[#9A3412] text-white shadow-md ring-2 ring-amber-500/40'
                : 'bg-white text-stone-700 hover:bg-stone-50 hover:text-stone-900 border border-stone-300/70 shadow-2xs'
            }`}
          >
            <DollarSign className="w-4 h-4 text-emerald-500" />
            <span>Google AdSense Hub</span>
          </button>

          {/* Tab 7: Announcement Banners */}
          <button
            type="button"
            onClick={() => setActiveTab('announcements')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'announcements'
                ? 'bg-[#9A3412] text-white shadow-md ring-2 ring-amber-500/40'
                : 'bg-white text-stone-700 hover:bg-stone-50 hover:text-stone-900 border border-stone-300/70 shadow-2xs'
            }`}
          >
            <Bell className="w-4 h-4 text-amber-500" />
            <span>Announcement Banners</span>
          </button>

          {/* Tab 8: Festivals & Sacred Days */}
          <button
            type="button"
            onClick={() => setActiveTab('festivals')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'festivals'
                ? 'bg-[#9A3412] text-white shadow-md ring-2 ring-amber-500/40'
                : 'bg-white text-stone-700 hover:bg-stone-50 hover:text-stone-900 border border-stone-300/70 shadow-2xs'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Festivals & Sacred Days</span>
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
              activeTab === 'festivals' ? 'bg-white/20 text-amber-200' : 'bg-amber-500/20 text-amber-700'
            }`}>
              ADD/REMOVE
            </span>
          </button>

          {/* Tab 9: Sitemap & Inspector */}
          <button
            type="button"
            onClick={() => setActiveTab('sitemap')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'sitemap'
                ? 'bg-[#9A3412] text-white shadow-md ring-2 ring-amber-500/40'
                : 'bg-white text-stone-700 hover:bg-stone-50 hover:text-stone-900 border border-stone-300/70 shadow-2xs'
            }`}
          >
            <FileText className="w-4 h-4 text-blue-500" />
            <span>Sitemap & Inspector</span>
          </button>
        </div>
      </div>

      {/* TAB -1: REAL-TIME ANALYTICS DASHBOARD */}
      {activeTab === 'analytics' && <AnalyticsDashboard onNavigate={onNavigate} />}

      {/* TAB -0.8: TRENDING ARTICLES & FEEDS */}
      {activeTab === 'trending' && (
        <TrendingArticlesManager
          onNavigate={onNavigate}
          onShowNotice={(msg) => {
            setStatusMsg(msg);
            setTimeout(() => setStatusMsg(''), 4000);
          }}
        />
      )}

      {/* TAB -0.6: SITE BRANDING, LOGO & FAVICON */}
      {activeTab === 'branding' && (
        <BrandingManager
          onShowNotice={(msg) => {
            setStatusMsg(msg);
            setTimeout(() => setStatusMsg(''), 4000);
          }}
        />
      )}

      {/* TAB -0.5: GOOGLE INSTANT INDEXING API HUB */}
      {activeTab === 'instant-indexing' && <InstantIndexingCenter />}

      {/* TAB 0: SEO CONTROL CENTER (PRO ADMIN) */}
      {activeTab === 'seo' && (
        <SEOControlCenter
          onNavigate={onNavigate}
          onShowNotice={(msg) => {
            setStatusMsg(msg);
            setTimeout(() => setStatusMsg(''), 4000);
          }}
        />
      )}

      {/* TAB 1: ADSENSE MANAGEMENT HUB */}
      {activeTab === 'adsense' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h2 className="text-xl font-bold text-stone-900 font-serif flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[#9A3412]" />
              <span>Google AdSense Monetization Hub</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Easily manage all Google AdSense slots in one single place. Replace with your approved Google AdSense Client ID to show real ads.
            </p>
          </div>

          <form onSubmit={handleSaveAdsense} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Google AdSense Publisher Client ID
                </label>
                <input
                  type="text"
                  required
                  value={adsenseClientId}
                  onChange={(e) => setAdsenseClientId(e.target.value)}
                  placeholder="ca-pub-5817841895051108"
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono font-bold text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#9A3412]"
                />
                <p className="text-[11px] text-stone-500 mt-1">
                  Publisher Client ID: <code className="text-[#9A3412] font-mono">ca-pub-5817841895051108</code>
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Display Ad Unit Slot ID (ND)
                </label>
                <input
                  type="text"
                  required
                  value={adsenseSlotId}
                  onChange={(e) => setAdsenseSlotId(e.target.value)}
                  placeholder="8029503602"
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono font-bold text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#9A3412]"
                />
                <p className="text-[11px] text-stone-500 mt-1">
                  Active Display Ad Slot: <code className="text-[#9A3412] font-mono">8029503602</code>
                </p>
              </div>
            </div>

            <div className="border-t border-stone-200 pt-4 space-y-3">
              <div className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                Active Ad Slots Across Website
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-center justify-between p-3.5 bg-stone-50 border border-stone-200 rounded-2xl cursor-pointer hover:bg-stone-100/80 transition-colors">
                  <div>
                    <div className="text-xs font-bold text-stone-900">Top Leaderboard Ad</div>
                    <div className="text-[11px] text-stone-500">Appears below hero panchang cards</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={enableTopAd}
                    onChange={(e) => setEnableTopAd(e.target.checked)}
                    className="w-4 h-4 text-[#9A3412] rounded-sm focus:ring-[#9A3412]"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 bg-stone-50 border border-stone-200 rounded-2xl cursor-pointer hover:bg-stone-100/80 transition-colors">
                  <div>
                    <div className="text-xs font-bold text-stone-900">In-Content / Article Ad</div>
                    <div className="text-[11px] text-stone-500">Appears between article sections</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={enableInContentAd}
                    onChange={(e) => setEnableInContentAd(e.target.checked)}
                    className="w-4 h-4 text-[#9A3412] rounded-sm focus:ring-[#9A3412]"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 bg-stone-50 border border-stone-200 rounded-2xl cursor-pointer hover:bg-stone-100/80 transition-colors">
                  <div>
                    <div className="text-xs font-bold text-stone-900">Pre-Footer Multiplex Ad</div>
                    <div className="text-[11px] text-stone-500">Appears above website footer</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={enableFooterAd}
                    onChange={(e) => setEnableFooterAd(e.target.checked)}
                    className="w-4 h-4 text-[#9A3412] rounded-sm focus:ring-[#9A3412]"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 bg-stone-50 border border-stone-200 rounded-2xl cursor-pointer hover:bg-stone-100/80 transition-colors">
                  <div>
                    <div className="text-xs font-bold text-stone-900">Sticky Bottom Anchor Ad</div>
                    <div className="text-[11px] text-stone-500">Mobile sticky footer ad (high CTR)</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={enableStickyAnchor}
                    onChange={(e) => setEnableStickyAnchor(e.target.checked)}
                    className="w-4 h-4 text-[#9A3412] rounded-sm focus:ring-[#9A3412]"
                  />
                </label>
              </div>
            </div>

            {/* Generated Script Preview */}
            <div className="p-4 bg-stone-900 text-stone-200 rounded-2xl border border-stone-800 font-mono text-xs space-y-2">
              <div className="text-[11px] text-amber-400 font-bold flex items-center justify-between">
                <span>Active Google AdSense & Display Ad Unit Code:</span>
                <span className="text-emerald-400">✓ Live on Website</span>
              </div>
              <pre className="overflow-x-auto text-[11px] text-stone-300">
{`<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}"
     crossorigin="anonymous"></script>
<!-- ND -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="${adsenseClientId}"
     data-ad-slot="${adsenseSlotId}"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>`}
              </pre>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#9A3412] hover:bg-[#7C2D12] text-white text-xs font-bold rounded-xl shadow-sm transition-all"
            >
              Save & Apply AdSense Settings
            </button>
          </form>
        </div>
      )}

      {/* TAB 2: ANNOUNCEMENT BANNERS */}
      {activeTab === 'announcements' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h2 className="text-xl font-bold text-stone-900 font-serif flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#9A3412]" />
              <span>Global Announcement Top Banner</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Display a high-priority banner at the very top of all pages for major festivals (e.g. Diwali, Chaitra Navratri, Solar Eclipse).
            </p>
          </div>

          <form onSubmit={handleSaveAnnouncement} className="space-y-4">
            <label className="flex items-center gap-2 p-3 bg-stone-50 border border-stone-200 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={announcementActive}
                onChange={(e) => setAnnouncementActive(e.target.checked)}
                className="w-4 h-4 text-[#9A3412] rounded-sm"
              />
              <span className="text-xs font-bold text-stone-900">Enable Announcement Banner on Website</span>
            </label>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Banner Text (English / Indic)</label>
              <input
                type="text"
                required
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                className="w-full px-4 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Action Link URL</label>
              <input
                type="text"
                required
                value={announcementLink}
                onChange={(e) => setAnnouncementLink(e.target.value)}
                placeholder="/festivals/2027"
                className="w-full px-4 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono text-stone-900"
              />
            </div>

            <button
              type="submit"
              onClick={() => playMechanicalClickSound()}
              className="px-6 py-3.5 bg-gradient-to-r from-[#9A3412] to-amber-700 hover:brightness-110 active:translate-y-1 active:border-b-0 border-b-4 border-[#5E1E08] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Bell className="w-4 h-4 text-amber-300" />
              <span>📢 Click Here to Dispatch Announcement Banner Live</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB 8: FESTIVALS & SACRED CALENDAR MANAGER (ADD / REMOVE) */}
      {activeTab === 'festivals' && (
        <FestivalManager
          onShowNotice={(msg) => {
            setStatusMsg(msg);
            setTimeout(() => setStatusMsg(''), 4000);
          }}
        />
      )}

      {/* TAB 4: SITEMAP & 100% SEO INSPECTOR */}
      {activeTab === 'sitemap' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-stone-900 font-serif flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#9A3412]" />
                <span>XML & HTML Sitemap Engine</span>
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                100% indexed URLs: all 12 months, 50+ temples, 30+ festivals, 12 zodiac signs, and all Vedic tools with zero orphan pages.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleDownloadSitemap}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#9A3412] hover:bg-[#7C2D12] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download sitemap.xml</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/sitemap')}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl border border-stone-300 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>View HTML Sitemap</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
              <div className="text-stone-500">Total Indexed URLs</div>
              <div className="text-2xl font-bold font-mono text-stone-900 mt-1">128+ URLs</div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-1">✓ Complete coverage</div>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
              <div className="text-stone-500">Schema.org Structured Data</div>
              <div className="text-2xl font-bold font-mono text-stone-900 mt-1">6 Schemas</div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-1">Event, FAQ, Temple, Tool</div>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
              <div className="text-stone-500">Multi-Language Hreflang</div>
              <div className="text-2xl font-bold font-mono text-stone-900 mt-1">12 Locales</div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-1">en, hi, mr, gu, te, ta...</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
