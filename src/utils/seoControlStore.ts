import { CustomSEORule, RedirectRule } from '../types';

export const SITE_URL = 'https://www.newsdarshan.in';

const SEO_RULES_STORAGE_KEY = 'nd_seo_custom_rules_v1';
const REDIRECT_RULES_STORAGE_KEY = 'nd_redirect_rules_v1';

export const COMMON_APP_PATHS = [
  { path: '/', label: 'Home Page (/)', category: 'Core' },
  { path: '/today', label: "Today's Panchang (/today)", category: 'Core' },
  { path: '/hindu-calendar-2027', label: 'Hindu Calendar 2027 (/hindu-calendar-2027)', category: 'Calendar' },
  { path: '/hindu-calendar-2027/january', label: 'Calendar January 2027 (/hindu-calendar-2027/january)', category: 'Calendar' },
  { path: '/choghadiya', label: 'Choghadiya Timings (/choghadiya)', category: 'Astrology' },
  { path: '/festivals/2027', label: 'Festivals 2027 Hub (/festivals/2027)', category: 'Festivals' },
  { path: '/festivals/diwali', label: 'Diwali 2027 (/festivals/diwali)', category: 'Festivals' },
  { path: '/festivals/maha-shivratri', label: 'Maha Shivratri 2027 (/festivals/maha-shivratri)', category: 'Festivals' },
  { path: '/festivals/holi', label: 'Holi 2027 (/festivals/holi)', category: 'Festivals' },
  { path: '/vrat', label: 'Hindu Vrat Hub (/vrat)', category: 'Vrat' },
  { path: '/vrat/sankashti-chaturthi', label: 'Sankashti Chaturthi (/vrat/sankashti-chaturthi)', category: 'Vrat' },
  { path: '/vrat/pradosham-dates', label: 'Pradosham Dates (/vrat/pradosham-dates)', category: 'Vrat' },
  { path: '/vrat/vinayaka-chaturthi', label: 'Vinayaka Chaturthi (/vrat/vinayaka-chaturthi)', category: 'Vrat' },
  { path: '/vrat/dwadashi-mahadwadashi', label: 'Dwadashi & Mahadwadashi (/vrat/dwadashi-mahadwadashi)', category: 'Vrat' },
  { path: '/vrat/satyanarayan-dvatrinshi-purnima', label: 'Satyanarayan Vrat (/vrat/satyanarayan-dvatrinshi-purnima)', category: 'Vrat' },
  { path: '/ekadashi/2027', label: 'Ekadashi 2027 Schedule (/ekadashi/2027)', category: 'Vrat' },
  { path: '/purnima/2027', label: 'Purnima 2027 Dates (/purnima/2027)', category: 'Vrat' },
  { path: '/amavasya/2027', label: 'Amavasya 2027 Dates (/amavasya/2027)', category: 'Vrat' },
  { path: '/muhurat', label: 'Shubh Muhurat Hub (/muhurat)', category: 'Muhurat' },
  { path: '/vivah-muhurat-2027', label: 'Vivah / Marriage Muhurat (/vivah-muhurat-2027)', category: 'Muhurat' },
  { path: '/griha-pravesh-muhurat-2027', label: 'Griha Pravesh Muhurat (/griha-pravesh-muhurat-2027)', category: 'Muhurat' },
  { path: '/rashifal', label: 'Daily Rashifal Horoscope (/rashifal)', category: 'Astrology' },
  { path: '/kundli-milan', label: 'Kundli Gun Milan (/kundli-milan)', category: 'Tools' },
  { path: '/sade-sati', label: 'Shani Sade Sati Checker (/sade-sati)', category: 'Tools' },
  { path: '/date-converter', label: 'Gregorian to Hindu Date Converter (/date-converter)', category: 'Tools' },
  { path: '/tools/manglik-dosha', label: 'Manglik Dosha Calculator (/tools/manglik-dosha)', category: 'Tools' },
  { path: '/baby-names', label: 'Hindu Baby Names (/baby-names)', category: 'Tools' },
  { path: '/temples', label: 'Famous Temples Directory (/temples)', category: 'Culture' },
  { path: '/telugu-calendar-2027', label: 'Telugu Calendar 2027 (/telugu-calendar-2027)', category: 'Regional' },
  { path: '/marathi-calendar-2027', label: 'Marathi Calendar 2027 (/marathi-calendar-2027)', category: 'Regional' },
  { path: '/gujarati-calendar-2027', label: 'Gujarati Calendar 2027 (/gujarati-calendar-2027)', category: 'Regional' },
  { path: '/tamil-calendar-2027', label: 'Tamil Calendar 2027 (/tamil-calendar-2027)', category: 'Regional' },
  { path: '/bengali-calendar-2027', label: 'Bengali Calendar 2027 (/bengali-calendar-2027)', category: 'Regional' },
  { path: '/holidays/2027', label: 'Government Holidays 2027 (/holidays/2027)', category: 'Holidays' },
  { path: '/bank-holidays/2027', label: 'Bank Holidays 2027 (/bank-holidays/2027)', category: 'Holidays' },
  { path: '/sitemap', label: 'HTML Sitemap (/sitemap)', category: 'SEO' },
];

export const INITIAL_SEO_RULES: CustomSEORule[] = [
  {
    id: 'seo-home',
    path: '/',
    title: 'Hindu Calendar 2027 – Festivals, Tithi, Vrat & Panchang | NewsDarshan',
    description: 'Explore the complete Hindu Calendar 2027 with daily Panchang, accurate Tithi, Nakshatra, Choghadiya, Regional Calendars (Marathi, Gujarati, Telugu, Tamil, Bengali), Festivals, and Muhurat.',
    canonicalUrl: `${SITE_URL}/`,
    h1: 'Hindu Calendar 2027 & Daily Panchang',
    ogTitle: 'Hindu Calendar 2027 – Daily Panchang & Auspicious Muhurats',
    ogDescription: 'Accurate Vedic Panchang, Tithi, Nakshatra, and Festivals for 100+ cities worldwide.',
    robots: 'index, follow',
    enabled: true,
    notes: 'Primary root index for NewsDarshan portal',
    lastUpdated: '2027-01-01'
  },
  {
    id: 'seo-today',
    path: '/today',
    title: 'Today Panchang – Tithi, Nakshatra, Choghadiya & Muhurat | NewsDarshan',
    description: "Check today's real-time Hindu date, Tithi, Nakshatra, Yoga, Karana, Sunrise, Sunset, Rahu Kaal, Abhijit Muhurat, and Shubh Choghadiya for your city.",
    canonicalUrl: `${SITE_URL}/today/`,
    h1: "Today's Panchang & Hindu Calendar",
    ogTitle: "Today's Hindu Panchang & Auspicious Timings",
    ogDescription: 'Instant daily Tithi, Rahu Kaal, Abhijit Muhurat, and Choghadiya timings updated in real-time.',
    robots: 'index, follow',
    enabled: true,
    notes: 'High-intent real-time daily landing page',
    lastUpdated: '2027-01-01'
  },
  {
    id: 'seo-calendar-2027',
    path: '/hindu-calendar-2027',
    title: 'Hindu Calendar 2027 – Complete 12 Months, Festivals, Vrat & Tithi',
    description: 'Comprehensive 2027 Hindu Calendar featuring all 12 months (January to December 2027), Hindu festivals, Ekadashi, Purnima, Amavasya, Sankranti, and Shubh Muhurat.',
    canonicalUrl: `${SITE_URL}/hindu-calendar-2027/`,
    h1: 'Hindu Calendar 2027 (हिन्दू पंचांग २०२७)',
    ogTitle: 'Hindu Calendar 2027 – Complete 12 Months & Festivals Schedule',
    ogDescription: 'Official 12-month Hindu Calendar 2027 with Vikram Samvat 2083-2084 and Shalivahana Shaka 1948-1949.',
    robots: 'index, follow',
    enabled: true,
    notes: 'Pillar page for full year queries',
    lastUpdated: '2027-01-01'
  },
  {
    id: 'seo-choghadiya',
    path: '/choghadiya',
    title: "Today's Choghadiya – Day & Night Auspicious Timings | NewsDarshan",
    description: 'Real-time Day and Night Choghadiya calculator for today and tomorrow. Check Shubh, Labh, Amrit, Chal, Rog, Kaal, and Udveg muhurats adjusted for local sunrise.',
    canonicalUrl: `${SITE_URL}/choghadiya/`,
    h1: "Today's Choghadiya Muhurat (चौघड़िया)",
    ogTitle: "Today's Choghadiya – Day & Night Shubh Muhurat Calculator",
    ogDescription: 'Accurate 8-period daytime and nighttime Choghadiya table for starting new ventures and travels.',
    robots: 'index, follow',
    enabled: true,
    notes: 'Daily muhurat high-volume page',
    lastUpdated: '2027-01-01'
  },
  {
    id: 'seo-kundli-milan',
    path: '/kundli-milan',
    title: 'Kundli Gun Milan Calculator – 36 Guna Match for Marriage | NewsDarshan',
    description: 'Calculate 36 Guna Milan (Ashta Koota) compatibility for marriage. Get instant Varna, Vashya, Tara, Yoni, Maitri, Gana, Bhakoot, and Nadi Dosha scores with remedies.',
    canonicalUrl: `${SITE_URL}/kundli-milan/`,
    h1: 'Kundli Milan & 36 Guna Match Calculator (कुंडली गुण मिलान)',
    ogTitle: 'Free Kundli Gun Milan (36 Gunas) for Marriage Compatibility',
    ogDescription: 'Instant Vedic horoscope matching score with Nadi Dosha and Bhakoot Dosha cancellation analysis.',
    robots: 'index, follow',
    enabled: true,
    notes: 'Top performing Vedic astrological tool',
    lastUpdated: '2027-01-01'
  },
  {
    id: 'seo-festivals-2027',
    path: '/festivals/2027',
    title: 'Hindu Festivals 2027 – Complete Calendar, Dates & Puja Timings',
    description: 'Comprehensive list of Hindu Festivals 2027 with exact dates, tithis, puja vidhi, shubh muhurat, and regional celebrations across India.',
    canonicalUrl: `${SITE_URL}/festivals/2027/`,
    h1: 'Hindu Festivals 2027 (त्यौहार एवं पर्व)',
    ogTitle: 'Hindu Festivals 2027 – Complete Festival Dates & Puja Timings',
    ogDescription: 'All major Hindu festivals: Diwali, Holi, Navratri, Maha Shivratri, Raksha Bandhan, and Ganesh Chaturthi.',
    robots: 'index, follow',
    enabled: true,
    notes: 'Key festival directory listing',
    lastUpdated: '2027-01-01'
  },
  {
    id: 'seo-vrat-hub',
    path: '/vrat',
    title: 'Hindu Vrat & Upvas 2027 – Sacred Deities, Fasting Days, Dates & Rules | NewsDarshan',
    description: 'Comprehensive directory of sacred Hindu Vrats in 2027: Sankashti Chaturthi, Pradosh, Vinayaka Chaturthi, Mahadwadashi, Masik Shivratri, Sawan Somwar, Satyanarayan, Navagraha, and Skanda Sashti.',
    canonicalUrl: `${SITE_URL}/vrat/`,
    h1: 'Hindu Vrat, Deities & Upvas Calendar 2027 (व्रत एवं उपवास)',
    ogTitle: 'Hindu Vrat & Upvas Calendar 2027 – Fasting Rules & Dates',
    ogDescription: 'Authentic scriptural dates, fasting guidelines, Parana rules, and sacred mantras for all deities.',
    robots: 'index, follow',
    enabled: true,
    notes: 'Comprehensive Vrat and Deity Hub',
    lastUpdated: '2027-01-01'
  },
  {
    id: 'seo-sade-sati',
    path: '/sade-sati',
    title: 'Shani Sade Sati & Dhaiya Checker 2027 – Phase & Vedic Remedies | NewsDarshan',
    description: 'Check if you are under Saturn Sade Sati (7.5 years transit) or Dhaiya (2.5 years) for your Janma Rashi. Discover peak phases, effects, and authentic Vedic remedies.',
    canonicalUrl: `${SITE_URL}/sade-sati/`,
    h1: 'Shani Sade Sati & Dhaiya Calculator (शनि साढ़े साती कैलकुलेटर)',
    ogTitle: 'Shani Sade Sati & Dhaiya Calculator 2027 – Check Rashi Phase',
    ogDescription: 'Identify Rising, Peak, or Setting phases of Saturn transit with proven Vedic remedies.',
    robots: 'index, follow',
    enabled: true,
    notes: 'High demand transit calculator',
    lastUpdated: '2027-01-01'
  }
];

export const INITIAL_REDIRECT_RULES: RedirectRule[] = [
  {
    id: 'red-1',
    sourcePath: '/old-panchang',
    destinationUrl: '/today',
    statusCode: 301,
    preserveQuery: true,
    enabled: true,
    notes: 'Legacy daily panchang migration',
    hitCount: 38,
    lastTriggered: '2027-01-02 08:14',
    createdAt: '2027-01-01'
  },
  {
    id: 'red-2',
    sourcePath: '/panchang-today',
    destinationUrl: '/today',
    statusCode: 301,
    preserveQuery: true,
    enabled: true,
    notes: 'Common search query slug normalization',
    hitCount: 114,
    lastTriggered: '2027-01-03 12:45',
    createdAt: '2027-01-01'
  },
  {
    id: 'red-3',
    sourcePath: '/calendar-2027',
    destinationUrl: '/hindu-calendar-2027',
    statusCode: 301,
    preserveQuery: false,
    enabled: true,
    notes: 'Canonical calendar URL consolidation',
    hitCount: 76,
    lastTriggered: '2027-01-03 15:20',
    createdAt: '2027-01-01'
  },
  {
    id: 'red-4',
    sourcePath: '/horoscope',
    destinationUrl: '/rashifal',
    statusCode: 301,
    preserveQuery: true,
    enabled: true,
    notes: 'Horoscope alias redirect',
    hitCount: 52,
    lastTriggered: '2027-01-02 18:02',
    createdAt: '2027-01-01'
  },
  {
    id: 'red-5',
    sourcePath: '/daily-choghadiya',
    destinationUrl: '/choghadiya',
    statusCode: 301,
    preserveQuery: true,
    enabled: true,
    notes: 'Daily choghadiya keyword rewrite',
    hitCount: 29,
    lastTriggered: '2027-01-02 09:30',
    createdAt: '2027-01-01'
  },
  {
    id: 'red-6',
    sourcePath: '/kundali-matching',
    destinationUrl: '/kundli-milan',
    statusCode: 301,
    preserveQuery: true,
    enabled: true,
    notes: 'Synonym consolidation for Kundli Milan',
    hitCount: 88,
    lastTriggered: '2027-01-03 11:15',
    createdAt: '2027-01-01'
  },
  {
    id: 'red-7',
    sourcePath: '/shani-sadesati',
    destinationUrl: '/sade-sati',
    statusCode: 301,
    preserveQuery: true,
    enabled: true,
    notes: 'Alternate spelling redirect',
    hitCount: 19,
    lastTriggered: '2027-01-01 19:40',
    createdAt: '2027-01-01'
  },
  {
    id: 'red-8',
    sourcePath: '/vrat-calendar',
    destinationUrl: '/vrat',
    statusCode: 301,
    preserveQuery: true,
    enabled: true,
    notes: 'Generic vrat calendar route',
    hitCount: 44,
    lastTriggered: '2027-01-03 14:10',
    createdAt: '2027-01-01'
  },
  {
    id: 'red-9',
    sourcePath: '/diwali-2027',
    destinationUrl: '/festivals/diwali',
    statusCode: 302,
    preserveQuery: true,
    enabled: true,
    notes: 'Temporary festival promotion shortlink',
    hitCount: 63,
    lastTriggered: '2027-01-03 16:55',
    createdAt: '2027-01-01'
  }
];

// Normalize path for consistent matching
export function normalizePath(path: string): string {
  if (!path) return '/';
  const clean = path.split('?')[0].trim().replace(/\/+$/, '') || '/';
  return clean.startsWith('/') ? clean : `/${clean}`;
}

export function getCustomSEORules(): CustomSEORule[] {
  if (typeof window === 'undefined') return INITIAL_SEO_RULES;
  try {
    const raw = localStorage.getItem(SEO_RULES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(SEO_RULES_STORAGE_KEY, JSON.stringify(INITIAL_SEO_RULES));
      return INITIAL_SEO_RULES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_SEO_RULES;
  } catch (e) {
    console.warn('Failed to parse custom SEO rules from localStorage:', e);
    return INITIAL_SEO_RULES;
  }
}

export function saveCustomSEORules(rules: CustomSEORule[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SEO_RULES_STORAGE_KEY, JSON.stringify(rules));
  } catch (e) {
    console.error('Failed to save custom SEO rules to localStorage:', e);
  }
}

export function upsertCustomSEORule(rule: CustomSEORule): CustomSEORule[] {
  const current = getCustomSEORules();
  const normalizedTarget = normalizePath(rule.path);
  const updatedRule: CustomSEORule = {
    ...rule,
    path: normalizedTarget,
    lastUpdated: new Date().toISOString().split('T')[0]
  };

  const existingIndex = current.findIndex(
    (r) => r.id === rule.id || normalizePath(r.path) === normalizedTarget
  );

  let updatedList: CustomSEORule[];
  if (existingIndex >= 0) {
    updatedList = [...current];
    updatedList[existingIndex] = { ...updatedList[existingIndex], ...updatedRule };
  } else {
    updatedList = [updatedRule, ...current];
  }

  saveCustomSEORules(updatedList);
  return updatedList;
}

export function deleteCustomSEORule(id: string): CustomSEORule[] {
  const current = getCustomSEORules();
  const updated = current.filter((r) => r.id !== id);
  saveCustomSEORules(updated);
  return updated;
}

export function getSEORuleForPath(rawPath: string): CustomSEORule | undefined {
  const path = normalizePath(rawPath);
  const rules = getCustomSEORules();
  return rules.find((r) => r.enabled && normalizePath(r.path) === path);
}

export function getRedirectRules(): RedirectRule[] {
  if (typeof window === 'undefined') return INITIAL_REDIRECT_RULES;
  try {
    const raw = localStorage.getItem(REDIRECT_RULES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(REDIRECT_RULES_STORAGE_KEY, JSON.stringify(INITIAL_REDIRECT_RULES));
      return INITIAL_REDIRECT_RULES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_REDIRECT_RULES;
  } catch (e) {
    console.warn('Failed to parse redirect rules from localStorage:', e);
    return INITIAL_REDIRECT_RULES;
  }
}

export function saveRedirectRules(rules: RedirectRule[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(REDIRECT_RULES_STORAGE_KEY, JSON.stringify(rules));
  } catch (e) {
    console.error('Failed to save redirect rules to localStorage:', e);
  }
}

export function upsertRedirectRule(rule: RedirectRule): RedirectRule[] {
  const current = getRedirectRules();
  const normalizedSource = normalizePath(rule.sourcePath);
  const updatedRule: RedirectRule = {
    ...rule,
    sourcePath: normalizedSource,
    destinationUrl: rule.destinationUrl.trim()
  };

  const existingIndex = current.findIndex(
    (r) => r.id === rule.id || normalizePath(r.sourcePath) === normalizedSource
  );

  let updatedList: RedirectRule[];
  if (existingIndex >= 0) {
    updatedList = [...current];
    updatedList[existingIndex] = { ...updatedList[existingIndex], ...updatedRule };
  } else {
    updatedList = [updatedRule, ...current];
  }

  saveRedirectRules(updatedList);
  return updatedList;
}

export function deleteRedirectRule(id: string): RedirectRule[] {
  const current = getRedirectRules();
  const updated = current.filter((r) => r.id !== id);
  saveRedirectRules(updated);
  return updated;
}

export function findMatchingRedirect(rawPath: string): RedirectRule | undefined {
  const path = normalizePath(rawPath);
  const redirects = getRedirectRules();
  return redirects.find((r) => r.enabled && normalizePath(r.sourcePath) === path);
}

export function recordRedirectHit(ruleId: string): void {
  if (typeof window === 'undefined') return;
  const current = getRedirectRules();
  const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
  const updated = current.map((r) => {
    if (r.id === ruleId) {
      return {
        ...r,
        hitCount: (r.hitCount || 0) + 1,
        lastTriggered: nowStr
      };
    }
    return r;
  });
  saveRedirectRules(updated);
}

export function exportSEODataJSON(): string {
  const seoRules = getCustomSEORules();
  const redirectRules = getRedirectRules();
  const payload = {
    app: 'NewsDarshan SEO Control Center',
    exportDate: new Date().toISOString(),
    version: '1.0',
    seoRules,
    redirectRules
  };
  return JSON.stringify(payload, null, 2);
}

export function importSEODataJSON(jsonStr: string): {
  success: boolean;
  message: string;
  seoCount?: number;
  redirectCount?: number;
} {
  try {
    const data = JSON.parse(jsonStr);
    if (!data || typeof data !== 'object') {
      return { success: false, message: 'Invalid JSON file format.' };
    }

    let seoCount = 0;
    let redirectCount = 0;

    if (Array.isArray(data.seoRules)) {
      saveCustomSEORules(data.seoRules);
      seoCount = data.seoRules.length;
    }
    if (Array.isArray(data.redirectRules)) {
      saveRedirectRules(data.redirectRules);
      redirectCount = data.redirectRules.length;
    }

    return {
      success: true,
      message: `Successfully imported ${seoCount} SEO metadata rules and ${redirectCount} redirect rules.`,
      seoCount,
      redirectCount
    };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Error parsing imported JSON.' };
  }
}

export function resetToDefaultSEORules(): CustomSEORule[] {
  saveCustomSEORules(INITIAL_SEO_RULES);
  return INITIAL_SEO_RULES;
}

export function resetToDefaultRedirects(): RedirectRule[] {
  saveRedirectRules(INITIAL_REDIRECT_RULES);
  return INITIAL_REDIRECT_RULES;
}
