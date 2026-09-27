/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { LanguageCode, CityInfo, NotificationSettings } from './types';
import { CITIES } from './data/panchangEngine';
import { getSEOMetadataForPath } from './utils/seoEngine';
import { findMatchingRedirect, recordRedirectHit } from './utils/seoControlStore';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import SEOHead from './components/SEOHead';
import CitySelectorModal from './components/CitySelectorModal';
import NotificationModal from './components/NotificationModal';
import MoonPhaseTracker from './components/MoonPhaseTracker';
import SunVisualization from './components/SunVisualization';
import Breadcrumbs from './components/Breadcrumbs';
import { getUIText } from './data/localization';

// Pages
import HomePage from './pages/HomePage';
import TodayPage from './pages/TodayPage';
import CityPanchangPage from './pages/CityPanchangPage';
import CalendarYearPage from './pages/CalendarYearPage';
import CalendarMonthPage from './pages/CalendarMonthPage';
import RegionalCalendarPage from './pages/RegionalCalendarPage';
import FestivalsPage, { FestivalDetailPage } from './pages/FestivalsPage';
import ChoghadiyaPage from './pages/ChoghadiyaPage';
import MuhuratPage from './pages/MuhuratPage';
import VratHubPage from './pages/VratHubPage';
import VratDetailPage from './pages/VratDetailPage';
import HolidaysPage from './pages/HolidaysPage';
import RashifalPage from './pages/RashifalPage';
import BabyNamesPage from './pages/BabyNamesPage';
import ToolsPage from './pages/ToolsPage';
import TemplesPage from './pages/TemplesPage';
import TempleDetailPage from './pages/TempleDetailPage';
import AdminPage from './pages/AdminPage';
import EEATPages from './pages/EEATPages';
import SitemapPage from './pages/SitemapPage';
import { recordPageView } from './utils/analyticsTracker';
import { detectUserCity } from './utils/geoLocator';

export default function App() {
  // Current route pathname
  const [currentPath, setCurrentPath] = useState<string>(
    typeof window !== 'undefined' ? window.location.pathname || '/' : '/'
  );

  // User City Selection
  const [currentCity, setCurrentCity] = useState<CityInfo>(() => {
    if (typeof window !== 'undefined') {
      const savedCityId = localStorage.getItem('nd_city_id');
      const found = CITIES.find((c) => c.id === savedCityId);
      if (found) return found;
    }
    return CITIES[0]; // New Delhi default
  });

  // User Language
  const [currentLang, setCurrentLang] = useState<LanguageCode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nd_lang') as LanguageCode;
      if (saved) return saved;
    }
    return 'en';
  });

  // User Notification Settings
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(() => {
    const defaultSettings: NotificationSettings = {
      masterEnabled: false,
      dailyPanchang: true,
      festivals: true,
      ekadashi: true,
      purnimaAmavasya: true,
      muhurat: true,
      rashifal: true,
      selectedRashi: 'mesha',
      scheduledTime: '06:00',
      language: 'en'
    };

    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nd_notif_settings');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // Fallback
        }
      }
    }
    return defaultSettings;
  });

  // Modals
  const [cityModalOpen, setCityModalOpen] = useState(false);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);

  // Auto-Detect User Location on First Visit (e.g. Mumbai, Delhi, Bengaluru, etc.)
  useEffect(() => {
    const initLocation = async () => {
      const savedCityId = localStorage.getItem('nd_city_id');
      if (!savedCityId) {
        const detected = await detectUserCity();
        if (detected && detected.city) {
          setCurrentCity(detected.city);
        }
      }
    };
    initLocation();
  }, []);

  // Check and execute URL redirects (301/302/307/308)
  useEffect(() => {
    const rawPath = typeof window !== 'undefined' ? window.location.pathname || currentPath : currentPath;
    const rule = findMatchingRedirect(rawPath);
    if (rule && rule.enabled) {
      recordRedirectHit(rule.id);
      let target = rule.destinationUrl;
      if (rule.preserveQuery && typeof window !== 'undefined' && window.location.search) {
        target += window.location.search;
      }
      if (typeof window !== 'undefined') {
        window.history.replaceState({}, '', target);
      }
      setCurrentPath(target);
    }
  }, [currentPath]);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const newPath = window.location.pathname || '/';
      const redirectRule = findMatchingRedirect(newPath);
      if (redirectRule && redirectRule.enabled) {
        recordRedirectHit(redirectRule.id);
        const dest = redirectRule.destinationUrl;
        window.history.replaceState({}, '', dest);
        setCurrentPath(dest);
      } else {
        setCurrentPath(newPath);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Track pageview across route navigation
  useEffect(() => {
    recordPageView(currentPath);
  }, [currentPath]);

  const handleNavigate = (path: string) => {
    // Check if path has a matching active redirect rule
    const redirectRule = findMatchingRedirect(path);
    let resolvedPath = path;
    if (redirectRule && redirectRule.enabled) {
      recordRedirectHit(redirectRule.id);
      resolvedPath = redirectRule.destinationUrl;
      if (redirectRule.preserveQuery && path.includes('?')) {
        const query = path.split('?')[1];
        resolvedPath += `?${query}`;
      }
    }

    if (resolvedPath === currentPath) return;
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', resolvedPath);
    }
    setCurrentPath(resolvedPath);
  };

  const handleSelectCity = (city: CityInfo) => {
    setCurrentCity(city);
    localStorage.setItem('nd_city_id', city.id);
  };

  const handleSelectLang = (lang: LanguageCode) => {
    setCurrentLang(lang);
    localStorage.setItem('nd_lang', lang);
  };

  const handleSaveNotificationSettings = (newSettings: NotificationSettings) => {
    setNotificationSettings(newSettings);
    localStorage.setItem('nd_notif_settings', JSON.stringify(newSettings));
  };

  // Resolve Route & Component
  const cleanPath = currentPath.split('?')[0].replace(/\/+$/, '') || '/';

  // Check if URL specifies a city
  const cityUrlMatch = cleanPath.match(/^\/(?:city|panchang|today|today-panchang|choghadiya)\/([a-z0-9-]+)$/);
  const routeCity = cityUrlMatch
    ? CITIES.find(
        (c) =>
          c.id.toLowerCase() === cityUrlMatch[1].toLowerCase() ||
          c.id.toLowerCase().replace(/[^a-z0-9]/g, '') === cityUrlMatch[1].toLowerCase().replace(/[^a-z0-9]/g, '')
      )
    : null;

  // Helper to extract city from URL path segments
  const pathSegments = cleanPath.split('/').filter(Boolean);
  const foundCityInPath = CITIES.find((c) =>
    pathSegments.some((seg) => {
      const cleanSeg = seg.toLowerCase().replace(/[^a-z0-9]/g, '');
      const cleanId = c.id.toLowerCase().replace(/[^a-z0-9]/g, '');
      return cleanSeg === cleanId;
    })
  );

  const effectiveCity = routeCity || foundCityInPath || currentCity;
  const seoMeta = getSEOMetadataForPath(cleanPath, effectiveCity);

  const renderContent = () => {
    // 0. City Directory or City Hub
    if (cleanPath === '/cities' || cleanPath === '/city-directory') {
      return (
        <SitemapPage
          currentLang={currentLang}
          onNavigate={handleNavigate}
        />
      );
    }

    // 0b. Dedicated City Panchang / City Hub (/city/:cityId or /panchang/:cityId)
    if (routeCity) {
      if (cleanPath.startsWith('/choghadiya')) {
        return (
          <ChoghadiyaPage
            currentCity={routeCity}
            currentLang={currentLang}
            onOpenCityModal={() => setCityModalOpen(true)}
            onNavigate={handleNavigate}
          />
        );
      }
      if (cleanPath.startsWith('/today')) {
        return (
          <TodayPage
            currentCity={routeCity}
            currentLang={currentLang}
            onNavigate={handleNavigate}
            onOpenCityModal={() => setCityModalOpen(true)}
          />
        );
      }
      return (
        <CityPanchangPage
          city={routeCity}
          currentLang={currentLang}
          onNavigate={handleNavigate}
          onSelectCity={handleSelectCity}
        />
      );
    }

    // 1. Homepage
    if (cleanPath === '/') {
      return (
        <HomePage
          currentCity={currentCity}
          currentLang={currentLang}
          onNavigate={handleNavigate}
          onOpenCityModal={() => setCityModalOpen(true)}
        />
      );
    }

    // 2. Today / Today Panchang
    if (cleanPath === '/today' || cleanPath === '/today-panchang') {
      return (
        <TodayPage
          currentCity={currentCity}
          currentLang={currentLang}
          onNavigate={handleNavigate}
          onOpenCityModal={() => setCityModalOpen(true)}
        />
      );
    }

    // 2b. Today Regional Date
    if (cleanPath.startsWith('/today/')) {
      const regMatch = cleanPath.match(/^\/today\/([a-z]+)-date$/);
      if (regMatch) {
        return (
          <TodayPage
            currentCity={currentCity}
            currentLang={currentLang}
            onNavigate={handleNavigate}
            onOpenCityModal={() => setCityModalOpen(true)}
            regionalVariant={regMatch[1]}
          />
        );
      }
    }

    // 3. Hindu Calendar Full Year (2027, 2028, or /hindu-calendar or /calendar)
    if (cleanPath === '/hindu-calendar' || cleanPath === '/calendar') {
      return (
        <CalendarYearPage
          year="2027"
          currentLang={currentLang}
          currentCity={effectiveCity}
          onOpenCityModal={() => setCityModalOpen(true)}
          onNavigate={handleNavigate}
        />
      );
    }

    const yearMatch = cleanPath.match(/^\/hindu-calendar-(\d{4})(?:\/([a-z0-9-]+))?$/);
    if (yearMatch) {
      const yr = yearMatch[1];
      const subParam = yearMatch[2]?.toLowerCase();
      const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
      if (subParam && monthNames.includes(subParam)) {
        return (
          <CalendarMonthPage
            year={yr}
            month={subParam}
            currentLang={currentLang}
            currentCity={effectiveCity}
            onOpenCityModal={() => setCityModalOpen(true)}
            onNavigate={handleNavigate}
          />
        );
      }
      return (
        <CalendarYearPage
          year={yr}
          currentLang={currentLang}
          currentCity={effectiveCity}
          onOpenCityModal={() => setCityModalOpen(true)}
          onNavigate={handleNavigate}
        />
      );
    }

    // 4. Monthly Calendar with City or Month: /hindu-calendar-2027/:city/:month or /hindu-calendar-2027/:month/:city
    const monthCityMatch = cleanPath.match(/^\/(?:hindu-calendar|calendar)(?:-(\d{4}))?\/([a-z0-9-]+)\/([a-z0-9-]+)$/);
    if (monthCityMatch) {
      const yr = monthCityMatch[1] || '2027';
      const seg1 = monthCityMatch[2].toLowerCase();
      const seg2 = monthCityMatch[3].toLowerCase();
      const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
      const targetMonth = monthNames.includes(seg1) ? seg1 : monthNames.includes(seg2) ? seg2 : 'january';

      return (
        <CalendarMonthPage
          year={yr}
          month={targetMonth}
          currentLang={currentLang}
          currentCity={effectiveCity}
          onOpenCityModal={() => setCityModalOpen(true)}
          onNavigate={handleNavigate}
        />
      );
    }

    // Monthly Calendar fallback
    const monthMatch = cleanPath.match(/^\/(?:hindu-calendar|calendar)(?:-(\d{4}))?\/([a-z]+)$/);
    if (monthMatch) {
      return (
        <CalendarMonthPage
          year={monthMatch[1] || '2027'}
          month={monthMatch[2]}
          currentLang={currentLang}
          currentCity={effectiveCity}
          onOpenCityModal={() => setCityModalOpen(true)}
          onNavigate={handleNavigate}
        />
      );
    }

    // 5. Regional Calendars (e.g. /marathi-calendar, /marathi-calendar-2027, /marathi-calendar-2027/january, /telugu-calendar-2027/january, /telugu-calendar-2027/2027/january)
    const regionalMatch = cleanPath.match(/^\/([a-z]+)-calendar(?:-(\d{4}))?(?:\/(?:(\d{4})\/)?([a-z0-9-]+))?(?:\/([a-z0-9-]+))?$/);
    if (regionalMatch) {
      const regKey = regionalMatch[1];
      const yr = regionalMatch[2] || '2027';
      let m = regionalMatch[4]?.toLowerCase();
      const extra = regionalMatch[5]?.toLowerCase();
      if (m === '2027' && extra) {
        m = extra;
      }
      return (
        <RegionalCalendarPage
          regionKey={regKey}
          year={yr}
          month={m}
          currentLang={currentLang}
          onNavigate={handleNavigate}
        />
      );
    }

    // 6. Panchang Hub & Specific Date Panchang (/panchang, /panchang/2027/january/15, /panchang/2027-04-15)
    if (cleanPath === '/panchang') {
      return (
        <TodayPage
          currentCity={currentCity}
          currentLang={currentLang}
          onNavigate={handleNavigate}
          onOpenCityModal={() => setCityModalOpen(true)}
        />
      );
    }

    const panchangDateMatch = cleanPath.match(/^\/panchang\/(\d{4})\/([a-z0-9]+)\/(\d{1,2})$/);
    if (panchangDateMatch) {
      const year = parseInt(panchangDateMatch[1], 10);
      const monthParam = panchangDateMatch[2].toLowerCase();
      const day = parseInt(panchangDateMatch[3], 10);
      const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
      const monthIdx = monthNames.indexOf(monthParam) !== -1 ? monthNames.indexOf(monthParam) : (parseInt(monthParam, 10) - 1);
      const validMonth = monthIdx >= 0 && monthIdx <= 11 ? monthIdx : 0;
      const parsedDate = new Date(year, validMonth, day);

      return (
        <TodayPage
          currentCity={currentCity}
          currentLang={currentLang}
          onNavigate={handleNavigate}
          onOpenCityModal={() => setCityModalOpen(true)}
          initialDate={parsedDate}
        />
      );
    }

    const panchangIsoDateMatch = cleanPath.match(/^\/panchang\/(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (panchangIsoDateMatch) {
      const year = parseInt(panchangIsoDateMatch[1], 10);
      const month = parseInt(panchangIsoDateMatch[2], 10) - 1;
      const day = parseInt(panchangIsoDateMatch[3], 10);
      const parsedDate = new Date(year, month, day);

      return (
        <TodayPage
          currentCity={currentCity}
          currentLang={currentLang}
          onNavigate={handleNavigate}
          onOpenCityModal={() => setCityModalOpen(true)}
          initialDate={parsedDate}
        />
      );
    }

    // 7. Choghadiya
    if (cleanPath === '/choghadiya') {
      return (
        <ChoghadiyaPage
          currentCity={currentCity}
          currentLang={currentLang}
          onOpenCityModal={() => setCityModalOpen(true)}
          onNavigate={handleNavigate}
        />
      );
    }

    // 7b. Moon Phase & Chandra Darshan Tracker
    if (cleanPath === '/moon-phase' || cleanPath === '/chandra-darshan') {
      return (
        <div className="space-y-6">
          <Breadcrumbs
            items={[
              { name: getUIText(currentLang, 'home', 'Home'), url: '/' },
              { name: currentLang === 'mr' ? 'चंद्र दर्शन व तिथी' : currentLang === 'hi' ? 'चन्द्र दर्शन एवं तिथि' : 'Moon Phase Tracker (चन्द्र दर्शन)', url: '/moon-phase/' }
            ]}
            onNavigate={handleNavigate}
          />
          <MoonPhaseTracker
            selectedCity={currentCity}
            currentLang={currentLang}
            onNavigate={handleNavigate}
          />
        </div>
      );
    }

    // 7c. Sun Visualization & Solar Arc Tracker
    if (cleanPath === '/sun-visualization' || cleanPath === '/solar-arc') {
      return (
        <div className="space-y-6">
          <Breadcrumbs
            items={[
              { name: getUIText(currentLang, 'home', 'Home'), url: '/' },
              { name: currentLang === 'mr' ? 'सूर्य स्थिती व खगोलीय चाप' : currentLang === 'hi' ? 'सूर्य स्थिति एवं खगोलीय चाप' : 'Sun Visualization (सूर्य चाप)', url: '/sun-visualization/' }
            ]}
            onNavigate={handleNavigate}
          />
          <SunVisualization
            selectedCity={currentCity}
            currentLang={currentLang}
            onNavigate={handleNavigate}
            onOpenCityModal={() => setCityModalOpen(true)}
          />
        </div>
      );
    }

    // 8. Festivals Hub
    if (cleanPath === '/festivals' || cleanPath === '/festivals/2027') {
      return <FestivalsPage currentLang={currentLang} onNavigate={handleNavigate} />;
    }

    // 8b. Festival Detail Page (/festivals/ganesh-chaturthi-2027)
    const festMatch = cleanPath.match(/^\/festivals\/([a-z0-9-]+)$/);
    if (festMatch) {
      return <FestivalDetailPage slug={festMatch[1]} currentLang={currentLang} onNavigate={handleNavigate} />;
    }

    // 9. Vrats, Ekadashi, Purnima, Amavasya & Deities
    if (cleanPath === '/vrat' || cleanPath === '/vrat/2027') {
      return <VratHubPage type="hub" currentLang={currentLang} onNavigate={handleNavigate} />;
    }
    if (cleanPath === '/ekadashi' || cleanPath === '/ekadashi/2027') {
      return <VratHubPage type="ekadashi" currentLang={currentLang} onNavigate={handleNavigate} />;
    }
    if (cleanPath === '/purnima' || cleanPath === '/purnima/2027') {
      return <VratHubPage type="purnima" currentLang={currentLang} onNavigate={handleNavigate} />;
    }
    if (cleanPath === '/amavasya' || cleanPath === '/amavasya/2027') {
      return <VratHubPage type="amavasya" currentLang={currentLang} onNavigate={handleNavigate} />;
    }

    // Direct deity observances
    const deityObservanceAliases: Record<string, string> = {
      'sankashti': 'sankashti-chaturthi',
      'sankashti-chaturthi': 'sankashti-chaturthi',
      'vinayaka-chaturthi': 'vinayaka-chaturthi',
      'pradosh': 'pradosham-dates',
      'pradosham': 'pradosham-dates',
      'pradosham-dates': 'pradosham-dates',
      'dwadashi': 'dwadashi-mahadwadashi',
      'mahadwadashi': 'dwadashi-mahadwadashi',
      'shivaratri': 'masik-shivaratri-sawan-somwar',
      'masik-shivaratri': 'masik-shivaratri-sawan-somwar',
      'sawan-somwar': 'masik-shivaratri-sawan-somwar',
      'shiva-puja': 'masik-shivaratri-sawan-somwar',
      'satyanarayan': 'satyanarayan-dvatrinshi-purnima',
      'satyanarayana-vrat': 'satyanarayan-dvatrinshi-purnima',
      'skanda-sashti': 'skanda-sashti-karthigai',
      'karthigai': 'skanda-sashti-karthigai',
      'shradh': 'shradh-shraddha-dates',
      'shraddha': 'shradh-shraddha-dates',
      'durgashtami': 'durgashtami-days',
      'kalashtami': 'kalashtami-days',
      'rohini-vrat': 'rohini-vrat-days',
      'sankranti': 'sankranti-calendar',
      'mangala-gauri': 'mangala-gauri-days',
      'ishti': 'ishti-and-anvadhan',
      'ishti-anvadhan': 'ishti-and-anvadhan',
      'iskcon-ekadashi': 'iskcon-ekadashi',
      'masik-krishna-janmashtami': 'masik-krishna-janmashtami',
      'dashavatara': 'dashavatara-vrat',
      'purushottam-maas': 'purushottam-maas',
      'chaturmasa': 'chaturmasa',
      'ashoka-ashtami': 'ashoka-ashtami',
      'asha-dashami': 'asha-dashami-vrat',
      'durva-ashtami': 'durva-ashtami-vrat',
      'jivitputrika': 'jivitputrika-vrat',
      'jitiya': 'jivitputrika-vrat',
      'shitala-saptami': 'shitala-saptami',
      'basoda': 'shitala-saptami'
    };

    const directDeityMatch = cleanPath.match(/^\/(?:vrat\/)?([a-z0-9-]+)$/);
    if (directDeityMatch && deityObservanceAliases[directDeityMatch[1]]) {
      return (
        <VratHubPage
          type="deities"
          initialObservanceId={deityObservanceAliases[directDeityMatch[1]]}
          currentLang={currentLang}
          onNavigate={handleNavigate}
        />
      );
    }

    // 9b. Vrat Detail Page (/vrat/nirjala-ekadashi-2027, /ekadashi/amalaki-ekadashi-2027, etc.)
    const vratMatch = cleanPath.match(/^\/(?:vrat|ekadashi)\/([a-z0-9-]+)$/);
    if (vratMatch && vratMatch[1] !== '2027') {
      return <VratDetailPage slug={vratMatch[1]} currentLang={currentLang} onNavigate={handleNavigate} />;
    }

    // 10. Muhurats Hub
    if (cleanPath === '/muhurat') {
      return <MuhuratPage currentLang={currentLang} onNavigate={handleNavigate} />;
    }
    const muhuratCatMatch = cleanPath.match(/^\/([a-z-]+-muhurat-2027)$/);
    if (muhuratCatMatch) {
      return <MuhuratPage categorySlug={muhuratCatMatch[1]} currentLang={currentLang} onNavigate={handleNavigate} />;
    }

    // 11. Government and Bank Holidays
    if (cleanPath === '/holidays/2027' || cleanPath.startsWith('/holidays/2027/')) {
      const statePart = cleanPath.split('/')[3]?.toUpperCase() || 'ALL';
      return <HolidaysPage isBankHolidays={false} selectedStateCode={statePart} currentLang={currentLang} onNavigate={handleNavigate} />;
    }
    if (cleanPath === '/bank-holidays/2027' || cleanPath.startsWith('/bank-holidays/2027/')) {
      const statePart = cleanPath.split('/')[3]?.toUpperCase() || 'ALL';
      return <HolidaysPage isBankHolidays={true} selectedStateCode={statePart} currentLang={currentLang} onNavigate={handleNavigate} />;
    }

    // 12. Rashifal Hub & Signs
    if (cleanPath === '/rashifal' || cleanPath.startsWith('/rashifal/')) {
      const rashiPart = cleanPath.split('/')[2];
      return <RashifalPage rashiSlug={rashiPart} currentLang={currentLang} onNavigate={handleNavigate} />;
    }

    // 13. Baby Names
    if (cleanPath === '/baby-names') {
      return <BabyNamesPage currentLang={currentLang} onNavigate={handleNavigate} />;
    }

    // 14. Vedic Astrology Tools & Individual Direct URLs
    if (cleanPath === '/kundli-milan' || cleanPath === '/kundali-milan' || cleanPath === '/guna-milan') {
      return <ToolsPage toolSlug="kundli-milan" currentLang={currentLang} onNavigate={handleNavigate} />;
    }
    if (cleanPath === '/sade-sati' || cleanPath === '/shani-sade-sati') {
      return <ToolsPage toolSlug="sade-sati" currentLang={currentLang} onNavigate={handleNavigate} />;
    }
    if (cleanPath === '/manglik-dosha' || cleanPath === '/kuja-dosha') {
      return <ToolsPage toolSlug="manglik-dosha" currentLang={currentLang} onNavigate={handleNavigate} />;
    }
    if (cleanPath === '/date-converter' || cleanPath === '/tithi-converter' || cleanPath === '/hindu-date-converter') {
      return <ToolsPage toolSlug="date-converter" currentLang={currentLang} onNavigate={handleNavigate} />;
    }
    if (cleanPath === '/vedic-age-calculator' || cleanPath === '/vedic-age') {
      return <ToolsPage toolSlug="vedic-age-calculator" currentLang={currentLang} onNavigate={handleNavigate} />;
    }
    if (cleanPath === '/tools' || cleanPath.startsWith('/tools/')) {
      const toolPart = cleanPath.split('/')[2];
      // Normalize aliases like /tools/tithi-converter -> date-converter, /tools/vedic-age -> vedic-age-calculator
      let normalizedSlug = toolPart;
      if (toolPart === 'tithi-converter' || toolPart === 'hindu-date-converter') normalizedSlug = 'date-converter';
      if (toolPart === 'vedic-age') normalizedSlug = 'vedic-age-calculator';
      if (toolPart === 'shani-sade-sati') normalizedSlug = 'sade-sati';
      if (toolPart === 'kuja-dosha') normalizedSlug = 'manglik-dosha';
      return <ToolsPage toolSlug={normalizedSlug} currentLang={currentLang} onNavigate={handleNavigate} />;
    }

    // 14b. Famous Hindu Temples & Timings (Directory & Individual Temple SEO Pages)
    const templeSingleMatch = cleanPath.match(/^\/temples\/([a-z0-9-]+)$/);
    if (templeSingleMatch) {
      return <TempleDetailPage templeId={templeSingleMatch[1]} currentLang={currentLang} onNavigate={handleNavigate} />;
    }
    if (cleanPath === '/temples' || cleanPath.startsWith('/temples/')) {
      return <TemplesPage currentLang={currentLang} onNavigate={handleNavigate} />;
    }

    // 15. Articles
    const artMatch = cleanPath.match(/^\/articles\/([a-z0-9-]+)$/);
    if (artMatch) {
      return <EEATPages pageType="article" slug={artMatch[1]} onNavigate={handleNavigate} />;
    }

    // 16. E-E-A-T Institutional Pages
    const eeatTypes = ['about', 'editorial-policy', 'panchang-methodology', 'contact', 'privacy-policy', 'terms', 'disclaimer'];
    const matchedEEAT = eeatTypes.find((t) => `/${t}` === cleanPath);
    if (matchedEEAT) {
      const typeKey = matchedEEAT.replace('-policy', '').replace('-methodology', 'methodology') as any;
      return <EEATPages pageType={typeKey} onNavigate={handleNavigate} />;
    }

    // 17. Admin Console
    if (cleanPath === '/admin') {
      return <AdminPage onNavigate={handleNavigate} />;
    }

    // 18. HTML Sitemap Index
    if (cleanPath === '/sitemap') {
      return <SitemapPage currentLang={currentLang} onNavigate={handleNavigate} />;
    }

    // Default Fallback to Homepage
    return (
      <HomePage
        currentCity={currentCity}
        currentLang={currentLang}
        onNavigate={handleNavigate}
        onOpenCityModal={() => setCityModalOpen(true)}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#241F1A]">
      {/* Dynamic SEO Metadata in <head> */}
      <SEOHead meta={seoMeta} />

      {/* Header */}
      <Header
        currentLang={currentLang}
        onSelectLang={handleSelectLang}
        currentCity={currentCity}
        onOpenCityModal={() => setCityModalOpen(true)}
        onOpenNotificationModal={() => setNotificationModalOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Main Content Viewport */}
      <main className={`flex-1 w-full mx-auto py-6 sm:py-8 ${
        cleanPath === '/admin'
          ? 'max-w-[1680px] px-4 sm:px-6 lg:px-8 xl:px-10'
          : 'max-w-7xl px-4 sm:px-6 lg:px-8'
      }`}>
        {renderContent()}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* City Switcher Modal */}
      <CitySelectorModal
        currentCity={currentCity}
        isOpen={cityModalOpen}
        onClose={() => setCityModalOpen(false)}
        onSelectCity={handleSelectCity}
      />

      {/* Notification Preferences Modal */}
      <NotificationModal
        isOpen={notificationModalOpen}
        onClose={() => setNotificationModalOpen(false)}
        settings={notificationSettings}
        onSaveSettings={handleSaveNotificationSettings}
      />
    </div>
  );
}
