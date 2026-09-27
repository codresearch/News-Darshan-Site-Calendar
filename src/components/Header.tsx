import { useState, useEffect } from 'react';
import { LanguageCode, CityInfo } from '../types';
import { SUPPORTED_LANGUAGES, UI_TRANSLATIONS, getUIText } from '../data/localization';
import { FESTIVALS_2027, MUHURATS_2027, RASHIFAL_DATA } from '../data/calendarData';
import { getSiteBranding, SiteBrandingConfig, applyFaviconToHead } from '../utils/brandingService';
import { Search, MapPin, Bell, Globe, Menu, X, Sparkles, ChevronDown, Check } from 'lucide-react';

interface HeaderProps {
  currentLang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
  currentCity: CityInfo;
  onOpenCityModal: () => void;
  onOpenNotificationModal: () => void;
  onNavigate: (path: string) => void;
}

export default function Header({
  currentLang,
  onSelectLang,
  currentCity,
  onOpenCityModal,
  onOpenNotificationModal,
  onNavigate
}: HeaderProps) {
  const [branding, setBranding] = useState<SiteBrandingConfig>(getSiteBranding);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [moreNavDropdownOpen, setMoreNavDropdownOpen] = useState(false);
  const [currentTimeStr, setCurrentTimeStr] = useState('');

  // Listen to live branding updates
  useEffect(() => {
    applyFaviconToHead(branding);
    const handleBrandingUpdate = (e: any) => {
      if (e.detail) {
        setBranding(e.detail);
        applyFaviconToHead(e.detail);
      }
    };
    window.addEventListener('nd_branding_updated', handleBrandingUpdate);
    return () => window.removeEventListener('nd_branding_updated', handleBrandingUpdate);
  }, []);

  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;

  // Live IST time updater
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTimeStr(
        now.toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleNav = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setSearchQuery('');
    setMoreNavDropdownOpen(false);
  };

  // Search filter
  const searchResults = searchQuery.trim()
    ? [
        ...FESTIVALS_2027.filter((f) =>
          f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (f.nameHi && f.nameHi.includes(searchQuery))
        ).map((f) => ({ title: f.name, category: 'Festival', path: `/festivals/${f.slug}` })),
        ...MUHURATS_2027.filter((m) =>
          m.title.toLowerCase().includes(searchQuery.toLowerCase())
        ).map((m) => ({ title: m.title, category: 'Muhurat', path: `/${m.slug}` })),
        ...RASHIFAL_DATA.filter((r) =>
          r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.nameHi.includes(searchQuery)
        ).map((r) => ({ title: `${r.name} (${r.nameHi})`, category: 'Rashifal', path: `/rashifal/${r.rashiId}-rashi` })),
        { title: 'Kundli Milan (36 Gunas)', category: 'Tool', path: '/kundli-milan' },
        { title: 'Shani Sade Sati Checker', category: 'Tool', path: '/sade-sati' },
        { title: 'Manglik Dosha Checker', category: 'Tool', path: '/manglik-dosha' },
        { title: 'Hindu Date & Tithi Converter', category: 'Tool', path: '/date-converter' },
        { title: 'Vedic Age Calculator', category: 'Tool', path: '/vedic-age-calculator' },
        { title: 'Sun Solar Arc & Visualization', category: 'Tool', path: '/sun-visualization' },
        { title: 'Today Panchang & Choghadiya', category: 'Panchang', path: '/today' },
        { title: 'Hindu Calendar 2027', category: 'Calendar', path: '/hindu-calendar-2027' },
        { title: 'Marathi Calendar 2027', category: 'Regional', path: '/marathi-calendar-2027' },
        { title: 'Gujarati Calendar 2027', category: 'Regional', path: '/gujarati-calendar-2027' },
        { title: 'Telugu Calendar 2027', category: 'Regional', path: '/telugu-calendar-2027' },
        { title: 'Tamil Calendar 2027', category: 'Regional', path: '/tamil-calendar-2027' },
        { title: 'Bengali Calendar 2027', category: 'Regional', path: '/bengali-calendar-2027' },
        { title: 'Ekadashi 2027 List', category: 'Vrat', path: '/ekadashi/2027' },
        { title: 'Purnima 2027 Dates', category: 'Vrat', path: '/purnima/2027' },
        { title: 'Amavasya 2027 Dates', category: 'Vrat', path: '/amavasya/2027' },
        { title: 'Government Holidays 2027', category: 'Holidays', path: '/holidays/2027' },
        { title: 'Bank Holidays 2027', category: 'Holidays', path: '/bank-holidays/2027' },
        { title: 'Hindu Baby Names', category: 'Names', path: '/baby-names' },
        { title: 'Vedic Astrology Calculators', category: 'Tools', path: '/tools' }
      ].filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 8)
    : [];

  const activeLangMeta = SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  // Quick popular languages for direct 1-click switcher bar
  const quickLanguages: LanguageCode[] = ['en', 'hi', 'mr', 'gu', 'te', 'ta', 'bn', 'kn'];

  return (
    <>
      {/* Top Authority Vedic Bar: Samvat Info & 1-Click Quick Language Switcher */}
      <div className={`bg-[#831843] bg-gradient-to-r from-[#991B1B] via-[#9A3412] to-[#B45309] text-white text-xs py-1.5 px-2.5 sm:px-6 lg:px-8 border-b border-amber-900/40 w-full relative ${langDropdownOpen ? 'z-[60]' : 'z-50'}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-1.5 sm:gap-2">
          
          {/* Left: Authentic Samvat & Time Coordinates */}
          <div className="flex items-center gap-2 sm:gap-3 text-amber-100 font-medium tracking-wide text-[11px] sm:text-xs">
            <span className="flex items-center gap-1 font-serif font-bold text-amber-300">
              <span className="text-sm sm:text-base leading-none">{branding.iconSymbol || 'ॐ'}</span> {branding.brandName || 'NewsDarshan'}
            </span>
            <span className="hidden sm:inline text-amber-300/60">•</span>
            <span className="hidden sm:inline">
              विक्रम संवत २०८३–२०८४ · शक संवत १९४८
            </span>
            {currentTimeStr && (
              <>
                <span className="text-amber-300/60">•</span>
                <span className="font-semibold text-white">
                  IST {currentTimeStr}
                </span>
              </>
            )}
          </div>

          {/* Right: Quick 1-Click Language Switcher Bar with Non-Clipping Dropdown */}
          <div className="flex items-center gap-1 sm:gap-1.5 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto scrollbar-none py-0.5 max-w-[calc(100vw-100px)] md:max-w-none">
              <span className="text-amber-200/80 text-[11px] font-semibold uppercase tracking-wider mr-1 hidden xl:inline">
                Language:
              </span>
              {quickLanguages.map((code) => {
                const meta = SUPPORTED_LANGUAGES.find((l) => l.code === code);
                if (!meta) return null;
                const isSelected = currentLang === code;

                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => onSelectLang(code)}
                    className={`px-1.5 sm:px-2 py-0.5 rounded-md text-[11px] sm:text-xs transition-all whitespace-nowrap font-medium cursor-pointer ${
                      isSelected
                        ? 'bg-amber-400 text-stone-900 font-bold shadow-xs scale-105'
                        : 'text-amber-100/90 hover:text-white hover:bg-white/15'
                    }`}
                    title={`Switch language to ${meta.name} (${meta.nativeName})`}
                  >
                    {meta.nativeName}
                  </button>
                );
              })}
            </div>

            {/* Dropdown for all 12 languages OUTSIDE scroll container so it never clips */}
            <div className={`relative shrink-0 ml-1 ${langDropdownOpen ? 'z-[60]' : ''}`}>
              <button
                type="button"
                onClick={() => {
                  const nextState = !langDropdownOpen;
                  setLangDropdownOpen(nextState);
                  if (nextState) {
                    setMobileMenuOpen(false);
                    setMoreNavDropdownOpen(false);
                    setSearchOpen(false);
                  }
                }}
                className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/20 hover:bg-white/30 text-white font-bold text-[11px] sm:text-xs transition-colors cursor-pointer shadow-2xs"
              >
                <span>{currentLang === 'hi' ? 'अन्य' : currentLang === 'mr' ? 'अधिक' : 'More'}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-xs"
                    onClick={() => setLangDropdownOpen(false)}
                  />

                  {/* Desktop Popover Menu (hidden on mobile) */}
                  <div className="hidden sm:block absolute right-0 top-full mt-2 w-60 bg-white border border-stone-200 rounded-2xl shadow-2xl py-2 z-[80] animate-in fade-in zoom-in-95 text-stone-800 ring-1 ring-black/10">
                    <div className="px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-900/90 border-b border-stone-100 flex items-center justify-between bg-stone-50/80 rounded-t-xl">
                      <span>All 12 Languages</span>
                      <span className="text-[10px] text-stone-500 font-serif font-bold">१२ भाषाएं</span>
                    </div>
                    <div className="max-h-72 overflow-y-auto divide-y divide-stone-100 scrollbar-thin">
                      {SUPPORTED_LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => {
                            onSelectLang(lang.code);
                            setLangDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left transition-colors cursor-pointer ${
                            currentLang === lang.code
                              ? 'bg-amber-50 text-[#9A3412] font-bold'
                              : 'text-stone-700 hover:bg-stone-50'
                          }`}
                        >
                          <span className="font-semibold text-sm">{lang.nativeName}</span>
                          <span className="text-[11px] text-stone-400 font-mono">{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dedicated Mobile Language Sheet / Modal */}
                  <div className="sm:hidden fixed inset-x-3 bottom-4 top-auto max-h-[85vh] bg-white border border-amber-900/20 rounded-3xl shadow-2xl z-[80] overflow-hidden flex flex-col animate-in slide-in-from-bottom-5">
                    <div className="px-5 py-3.5 bg-gradient-to-r from-[#991B1B] to-[#9A3412] text-white flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-base">🌐</span>
                        <div>
                          <h3 className="font-bold text-sm font-serif leading-tight">
                            Select Language / भाषा चुनें
                          </h3>
                          <p className="text-[10px] text-amber-200">
                            12 Indic Regional Languages Supported
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setLangDropdownOpen(false)}
                        className="p-1 rounded-full bg-white/20 text-white hover:bg-white/30"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-3 overflow-y-auto max-h-[60vh] grid grid-cols-2 gap-2 bg-[#FAF7F2]">
                      {SUPPORTED_LANGUAGES.map((lang) => {
                        const isSelected = currentLang === lang.code;
                        return (
                          <button
                            key={lang.code}
                            type="button"
                            onClick={() => {
                              onSelectLang(lang.code);
                              setLangDropdownOpen(false);
                            }}
                            className={`p-2.5 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                              isSelected
                                ? 'bg-[#9A3412] text-white border-[#9A3412] shadow-md scale-[1.02]'
                                : 'bg-white text-stone-800 border-stone-200 hover:border-amber-400'
                            }`}
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className="text-base font-bold font-serif">{lang.nativeName}</span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-amber-300" />}
                            </div>
                            <span className={`text-[11px] ${isSelected ? 'text-amber-200' : 'text-stone-500'}`}>
                              {lang.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="px-4 py-2.5 bg-stone-100 border-t border-stone-200 text-center text-[11px] text-stone-600 font-medium">
                      Panchang, Tithis & Checklists translate automatically
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-stone-200/90 shadow-2xs w-full max-w-full">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-18 gap-1.5 sm:gap-4 min-w-0">
            
            {/* Zone 1: Brand Wordmark with Vedic Kalash/Om Icon */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0 flex-1 lg:flex-none">
              <button
                type="button"
                onClick={() => handleNav('/')}
                className="text-left group flex items-center gap-1.5 sm:gap-2.5 focus:outline-none min-w-0 truncate"
              >
                {branding.logoType === 'image' && branding.customLogoUrl ? (
                  <img
                    src={branding.customLogoUrl}
                    alt={branding.brandName}
                    className="h-8 sm:h-10 w-auto object-contain rounded-xl shrink-0"
                  />
                ) : (
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr ${
                      branding.iconBgGradient || 'from-[#9A3412] to-[#E8602E]'
                    } flex items-center justify-center text-white shadow-xs border border-amber-600/40 shrink-0`}
                  >
                    <span className="font-serif font-bold text-lg sm:text-2xl leading-none">
                      {branding.iconSymbol || 'ॐ'}
                    </span>
                  </div>
                )}
                <div className="min-w-0 truncate">
                  <span className="text-sm xs:text-base sm:text-xl xl:text-2xl font-bold tracking-tight text-stone-900 group-hover:text-[#9A3412] transition-colors font-serif block leading-tight truncate">
                    {branding.brandName || t.brand || 'NewsDarshan'}
                  </span>
                  <span className="hidden sm:block text-[10px] xl:text-[11px] text-stone-600 font-sans tracking-wide uppercase font-semibold truncate">
                    {branding.tagline || (currentLang === 'hi' ? 'हिन्दू कैलेंडर एवं पंचांग' : 'Vedic Calendar & Panchang')}
                  </span>
                </div>
              </button>
            </div>

            {/* Zone 2: Primary Navigation Links (Adaptive, Localized & Fluid across all 12 Languages) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs xl:text-sm font-semibold text-stone-800 shrink min-w-0">
              <button
                type="button"
                onClick={() => handleNav('/hindu-calendar-2027')}
                className="hover:text-[#9A3412] px-2 py-1 rounded-md hover:bg-amber-100/50 transition-colors whitespace-nowrap shrink-0"
              >
                {t.hinduCalendar || 'Calendar 2027'}
              </button>
              <button
                type="button"
                onClick={() => handleNav('/today')}
                className="hover:text-[#9A3412] px-2 py-1 rounded-md hover:bg-amber-100/50 transition-colors whitespace-nowrap shrink-0"
              >
                {t.todayPanchang || "Today's Panchang"}
              </button>
              <button
                type="button"
                onClick={() => handleNav('/choghadiya')}
                className="hover:text-[#9A3412] px-2 py-1 rounded-md hover:bg-amber-100/50 transition-colors whitespace-nowrap shrink-0"
              >
                {t.todayChoghadiya || 'Choghadiya'}
              </button>
              
              {/* Visible on xl and wider screens */}
              <button
                type="button"
                onClick={() => handleNav('/rashifal')}
                className="hidden xl:inline-flex hover:text-[#9A3412] px-2 py-1 rounded-md hover:bg-amber-100/50 transition-colors whitespace-nowrap font-bold text-[#9A3412] shrink-0"
              >
                {t.todayHoroscope || 'Rashifal'}
              </button>
              <button
                type="button"
                onClick={() => handleNav('/festivals/2027')}
                className="hidden xl:inline-flex hover:text-[#9A3412] px-2 py-1 rounded-md hover:bg-amber-100/50 transition-colors whitespace-nowrap shrink-0"
              >
                {t.festivals || 'Festivals'}
              </button>

              {/* Extra links visible on wide 2xl screens */}
              <button
                type="button"
                onClick={() => handleNav('/muhurat')}
                className="hidden 2xl:inline-flex hover:text-[#9A3412] px-2 py-1 rounded-md hover:bg-amber-100/50 transition-colors whitespace-nowrap shrink-0"
              >
                {t.muhurat || 'Muhurat'}
              </button>
              <button
                type="button"
                onClick={() => handleNav('/temples')}
                className="hidden 2xl:inline-flex hover:text-[#9A3412] px-2 py-1 rounded-md hover:bg-amber-100/50 transition-colors whitespace-nowrap text-[#9A3412] font-bold shrink-0"
              >
                {t.temples || 'Temples'}
              </button>

              {/* Smart More / अधिक Dropdown */}
              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setMoreNavDropdownOpen(!moreNavDropdownOpen)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100/80 hover:bg-amber-200 text-stone-900 text-xs font-bold transition-colors border border-amber-300/80 cursor-pointer shadow-2xs"
                >
                  <span>{currentLang === 'hi' ? 'अधिक' : currentLang === 'mr' ? 'अधिक' : 'More'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreNavDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {moreNavDropdownOpen && (
                  <>
                    {/* Click-outside backdrop */}
                    <div
                      className="fixed inset-0 z-[45]"
                      onClick={() => setMoreNavDropdownOpen(false)}
                    />
                    <div
                      className="absolute right-0 top-full mt-2 w-72 bg-white border border-stone-200 rounded-2xl shadow-2xl py-2.5 z-[55] animate-in fade-in zoom-in-95 text-xs text-stone-800 max-h-[80vh] overflow-y-auto ring-1 ring-black/5"
                    >
                      <div className="px-3.5 py-1 font-bold text-[10px] uppercase tracking-wider text-amber-900/80 border-b border-stone-100">
                        ⭐ Vedic Astrology Calculators
                      </div>
                      <button
                        type="button"
                        onClick={() => handleNav('/tools')}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-left hover:bg-amber-50 text-stone-900 font-bold text-[#9A3412]"
                      >
                        <span>🔮</span>
                        <span>{t.tools || 'All Astrology Tools (सभी टूल्स)'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNav('/kundli-milan')}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-left hover:bg-amber-50 text-stone-900 font-semibold"
                      >
                        <span>💍</span>
                        <span>Kundali Milan (36 Gunas)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNav('/sade-sati')}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-left hover:bg-amber-50 text-stone-900 font-semibold"
                      >
                        <span>🪐</span>
                        <span>Shani Sade Sati & Dhaiya</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNav('/manglik-dosha')}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-left hover:bg-amber-50 text-stone-900 font-semibold"
                      >
                        <span>🔥</span>
                        <span>Manglik Dosha (Kuja Dosha)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNav('/date-converter')}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-left hover:bg-amber-50 text-stone-900 font-semibold"
                      >
                        <span>🗓️</span>
                        <span>Hindu Date & Tithi Converter</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNav('/vedic-age-calculator')}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-left hover:bg-amber-50 text-stone-900 font-semibold"
                      >
                        <span>🎂</span>
                        <span>Vedic Solar & Lunar Age</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNav('/sun-visualization')}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-left hover:bg-amber-50 text-stone-900 font-semibold"
                      >
                        <span>☀️</span>
                        <span>Sun Solar Arc & Altitude (सूर्य चाप)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNav('/moon-phase')}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-left hover:bg-amber-50 text-stone-900 font-semibold"
                      >
                        <span>🌙</span>
                        <span>Moon Phase & Chandra Tithi</span>
                      </button>

                      <div className="my-1.5 border-t border-stone-100" />
                      <div className="px-3.5 py-1 font-bold text-[10px] uppercase tracking-wider text-amber-900/80">
                        🗓️ Panchang & Observances
                      </div>
                      <button
                        type="button"
                        onClick={() => handleNav('/rashifal')}
                        className="xl:hidden w-full flex items-center gap-2.5 px-3.5 py-2 text-left hover:bg-amber-50 text-stone-900 font-semibold text-[#9A3412]"
                      >
                        <span>♈</span>
                        <span>{t.todayHoroscope || 'Daily Rashifal (राशिफल)'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNav('/festivals/2027')}
                        className="xl:hidden w-full flex items-center gap-2.5 px-3.5 py-2 text-left hover:bg-amber-50 text-stone-900 font-semibold"
                      >
                        <span>🪔</span>
                        <span>{t.festivals || 'Festivals & Vrats (त्योहार)'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNav('/muhurat')}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-left hover:bg-amber-50 text-stone-900 font-semibold"
                      >
                        <span>⭐</span>
                        <span>{t.muhurat || 'Shubh Muhurat 2027 (शुभ मुहूर्त)'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNav('/temples')}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-left hover:bg-amber-50 text-stone-900 font-semibold"
                      >
                        <span>🛕</span>
                        <span>{t.temples || 'Famous Temples & Darshan Timings'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNav('/marathi-calendar-2027')}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-left hover:bg-amber-50 text-stone-900 font-semibold"
                      >
                        <span>🚩</span>
                        <span>{currentLang === 'mr' ? 'मराठी दिनदर्शिका' : currentLang === 'gu' ? 'ગુજરાતી કેલેન્ડર' : currentLang === 'te' ? 'తెలుగు క్యాలెండర్' : 'Regional Calendars'}</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </nav>

            {/* Zone 3: City selector, Search, Notifications, Hamburger */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {/* City Button with responsive truncated city name */}
              <button
                type="button"
                onClick={onOpenCityModal}
                className="flex items-center gap-1 px-1.5 py-1.5 sm:px-2.5 sm:py-1.5 text-xs text-stone-800 bg-white hover:bg-stone-50 rounded-xl transition-colors border border-stone-300 shadow-2xs font-medium shrink-0"
                title="Change city for accurate sunrise, sunset & panchang"
              >
                <MapPin className="w-3.5 h-3.5 text-[#9A3412] shrink-0" />
                <span className="max-w-[45px] xs:max-w-[70px] sm:max-w-[100px] md:max-w-[120px] lg:max-w-[110px] xl:max-w-[140px] truncate font-bold text-stone-900">
                  {currentLang === 'hi' && currentCity.nameHi ? currentCity.nameHi : currentCity.name}
                </span>
              </button>

              {/* Search Trigger */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="p-1.5 sm:p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-colors bg-white border border-stone-200 shrink-0"
                title="Search festivals, rashis, tithis"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Notifications Trigger */}
              <button
                type="button"
                onClick={onOpenNotificationModal}
                className="p-1.5 sm:p-2 text-stone-600 hover:text-[#9A3412] hover:bg-stone-100 rounded-xl transition-colors bg-white border border-stone-200 relative shrink-0"
                title="Daily Panchang & Festival Alerts"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
              </button>

              {/* Mobile Menu Hamburger - ALWAYS VISIBLE, PINNED & HIGH CONTRAST */}
              <button
                type="button"
                onClick={() => {
                  const nextState = !mobileMenuOpen;
                  setMobileMenuOpen(nextState);
                  if (nextState) {
                    setLangDropdownOpen(false);
                    setMoreNavDropdownOpen(false);
                    setSearchOpen(false);
                  }
                }}
                className="p-1.5 sm:p-2 text-stone-800 hover:text-stone-900 lg:hidden rounded-xl bg-white border border-stone-300 shadow-2xs shrink-0 z-20"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-[#9A3412]" /> : <Menu className="w-5 h-5 text-stone-900" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-[#FAF7F2] px-4 py-4 space-y-2 animate-in slide-in-from-top-2">
            {/* Quick city on mobile */}
            <div className="p-3 bg-white rounded-xl border border-stone-200 flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#9A3412]" />
                <span className="text-sm font-bold text-stone-800">
                  {currentCity.name}, {currentCity.state}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCityModal();
                }}
                className="text-xs font-bold text-[#9A3412] underline"
              >
                Change
              </button>
            </div>

            <button
              type="button"
              onClick={() => handleNav('/hindu-calendar-2027')}
              className="w-full text-left py-2.5 px-3 text-base font-bold text-stone-800 rounded-lg hover:bg-stone-100"
            >
              {t.hinduCalendar || 'Hindu Calendar 2027'}
            </button>
            <button
              type="button"
              onClick={() => handleNav('/today')}
              className="w-full text-left py-2.5 px-3 text-base font-bold text-stone-800 rounded-lg hover:bg-stone-100"
            >
              {t.todayPanchang || "Today's Panchang"}
            </button>
            <button
              type="button"
              onClick={() => handleNav('/choghadiya')}
              className="w-full text-left py-2.5 px-3 text-base font-bold text-stone-800 rounded-lg hover:bg-stone-100"
            >
              {t.todayChoghadiya || 'Choghadiya'}
            </button>
            <button
              type="button"
              onClick={() => handleNav('/rashifal')}
              className="w-full text-left py-2.5 px-3 text-base font-bold text-[#9A3412] rounded-lg hover:bg-stone-100 flex items-center justify-between"
            >
              <span>{t.todayHoroscope || 'Today Rashifal (आज का राशिफल)'}</span>
              <span className="text-xs bg-amber-100 text-[#9A3412] px-2 py-0.5 rounded-full font-bold">12 Signs</span>
            </button>
            <button
              type="button"
              onClick={() => handleNav('/festivals/2027')}
              className="w-full text-left py-2.5 px-3 text-base font-bold text-stone-800 rounded-lg hover:bg-stone-100"
            >
              {t.festivals || 'Festivals & Vrats'}
            </button>
            <button
              type="button"
              onClick={() => handleNav('/muhurat')}
              className="w-full text-left py-2.5 px-3 text-base font-bold text-stone-800 rounded-lg hover:bg-stone-100"
            >
              {t.muhurat || 'Shubh Muhurat 2027'}
            </button>
            <button
              type="button"
              onClick={() => handleNav('/temples')}
              className="w-full text-left py-2.5 px-3 text-base font-bold text-[#9A3412] rounded-lg hover:bg-stone-100 flex items-center justify-between"
            >
              <span>{t.temples || 'Famous Temples (प्रसिद्ध मंदिर व समय)'}</span>
              <span className="text-xs bg-amber-100 text-[#9A3412] px-2 py-0.5 rounded-full font-bold">Timings</span>
            </button>
            <button
              type="button"
              onClick={() => handleNav('/tools')}
              className="w-full text-left py-2.5 px-3 text-base font-bold text-stone-800 rounded-lg hover:bg-stone-100"
            >
              {t.tools || 'Vedic Astrology Calculators'}
            </button>

            {/* Direct Astrology Calculators Links in Mobile Drawer */}
            <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/70 space-y-1">
              <div className="text-[11px] font-bold text-[#9A3412] uppercase tracking-wider mb-1">
                ⭐ {currentLang === 'mr' ? 'वैदिक टूल्स व कॅल्क्युलेटर:' : currentLang === 'hi' ? 'वैदिक टूल्स एवं कैलकुलेटर:' : 'Astrology Calculators:'}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs font-semibold text-stone-800">
                <button
                  type="button"
                  onClick={() => handleNav('/kundli-milan')}
                  className="w-full text-left py-1.5 px-2 hover:bg-amber-100/60 rounded-md transition-colors flex items-center gap-1.5"
                >
                  <span>💍</span>
                  <span>Kundali Milan (36 Gunas)</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('/sade-sati')}
                  className="w-full text-left py-1.5 px-2 hover:bg-amber-100/60 rounded-md transition-colors flex items-center gap-1.5"
                >
                  <span>🪐</span>
                  <span>Shani Sade Sati Checker</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('/manglik-dosha')}
                  className="w-full text-left py-1.5 px-2 hover:bg-amber-100/60 rounded-md transition-colors flex items-center gap-1.5"
                >
                  <span>🔥</span>
                  <span>Manglik Dosha Checker</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('/date-converter')}
                  className="w-full text-left py-1.5 px-2 hover:bg-amber-100/60 rounded-md transition-colors flex items-center gap-1.5"
                >
                  <span>🗓️</span>
                  <span>Hindu Date & Tithi Converter</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('/vedic-age-calculator')}
                  className="w-full text-left py-1.5 px-2 hover:bg-amber-100/60 rounded-md transition-colors flex items-center gap-1.5"
                >
                  <span>🎂</span>
                  <span>Vedic Solar & Lunar Age</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('/sun-visualization')}
                  className="w-full text-left py-1.5 px-2 hover:bg-amber-100/60 rounded-md transition-colors flex items-center gap-1.5"
                >
                  <span>☀️</span>
                  <span>Sun Solar Arc & Altitude</span>
                </button>
              </div>
            </div>

            {/* Regional Calendars on Mobile */}
            <div className="pt-2 border-t border-stone-200">
              <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                {currentLang === 'mr' ? 'प्रादेशिक दिनदर्शिका (Regional Calendars):' : 'Regional Calendars (प्रादेशिक पंचांग):'}
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => handleNav('/marathi-calendar-2027')}
                  className="py-1.5 px-2 bg-stone-50 hover:bg-[#FAF1EC] text-stone-800 text-left rounded-lg border border-stone-200 font-bold"
                >
                  मराठी दिनदर्शिका
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('/gujarati-calendar-2027')}
                  className="py-1.5 px-2 bg-stone-50 hover:bg-[#FAF1EC] text-stone-800 text-left rounded-lg border border-stone-200 font-bold"
                >
                  ગુજરાતી કેલેન્ડર
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('/telugu-calendar-2027')}
                  className="py-1.5 px-2 bg-stone-50 hover:bg-[#FAF1EC] text-stone-800 text-left rounded-lg border border-stone-200 font-bold"
                >
                  తెలుగు క్యాలెండర్
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('/tamil-calendar-2027')}
                  className="py-1.5 px-2 bg-stone-50 hover:bg-[#FAF1EC] text-stone-800 text-left rounded-lg border border-stone-200 font-bold"
                >
                  தமிழ் நாட்காட்டி
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('/kannada-calendar-2027')}
                  className="py-1.5 px-2 bg-stone-50 hover:bg-[#FAF1EC] text-stone-800 text-left rounded-lg border border-stone-200 font-bold"
                >
                  ಕನ್ನಡ ಕ್ಯಾಲೆಂಡರ್
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('/bengali-calendar-2027')}
                  className="py-1.5 px-2 bg-stone-50 hover:bg-[#FAF1EC] text-stone-800 text-left rounded-lg border border-stone-200 font-bold"
                >
                  বাংলা ক্যালেন্ডার
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('/odia-calendar-2027')}
                  className="py-1.5 px-2 bg-stone-50 hover:bg-[#FAF1EC] text-stone-800 text-left rounded-lg border border-stone-200 font-bold"
                >
                  ଓଡ଼ିଆ କ୍ୟାଲେଣ୍ଡର
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('/malayalam-calendar-2027')}
                  className="py-1.5 px-2 bg-stone-50 hover:bg-[#FAF1EC] text-stone-800 text-left rounded-lg border border-stone-200 font-bold"
                >
                  മലയാളം കലണ്ടർ
                </button>
              </div>
            </div>

            {/* Language Selector on Mobile */}
            <div className="pt-3 border-t border-stone-200">
              <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                Select Portal Language:
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      onSelectLang(lang.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`py-2 px-2 text-xs text-center rounded-lg border font-semibold ${
                      currentLang === lang.code
                        ? 'bg-[#9A3412] text-white border-[#9A3412]'
                        : 'bg-white text-stone-800 border-stone-200'
                    }`}
                  >
                    {lang.nativeName}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Dialog Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white border border-stone-200 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-4 border-b border-stone-200 flex items-center gap-3">
              <Search className="w-5 h-5 text-stone-400" />
              <input
                type="text"
                autoFocus
                placeholder="Search festivals, rashis, tithis, muhurats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-base focus:outline-none text-stone-900 font-medium"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-stone-400 hover:text-stone-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {searchResults.length > 0 ? (
                searchResults.map((res, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleNav(res.path)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#FAF1EC] text-left transition-colors"
                  >
                    <span className="font-semibold text-stone-800 text-sm">{res.title}</span>
                    <span className="text-xs bg-stone-100 text-stone-600 px-2.5 py-1 rounded-md font-medium">
                      {res.category}
                    </span>
                  </button>
                ))
              ) : searchQuery ? (
                <div className="p-6 text-center text-sm text-stone-500">
                  No matching results found for "{searchQuery}"
                </div>
              ) : (
                <div className="p-4 text-xs text-stone-500 space-y-1">
                  <div className="font-bold text-stone-700 uppercase tracking-wider mb-2">Popular Searches</div>
                  <div className="flex flex-wrap gap-1.5">
                    {['Maha Shivratri', 'Holi 2027', 'Diwali 2027', 'Ekadashi', 'Mesha Rashifal', 'Choghadiya', 'Marriage Muhurat'].map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => setSearchQuery(term)}
                        className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 rounded-lg text-stone-700 text-xs font-medium"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
