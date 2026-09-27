export interface RealVisitLog {
  id: string;
  path: string;
  title: string;
  timestamp: number;
  country: string;
  countryCode: string;
  city: string;
  device: 'Mobile' | 'Desktop' | 'Tablet';
  referrer: string;
  sessionId: string;
}

export interface URLPageView {
  path: string;
  title: string;
  todayViews: number;
  weeklyViews: number;
  monthlyViews: number;
  totalViews: number;
  lastVisited: string;
}

export interface GeoLocationView {
  country: string;
  flag: string;
  todayViews: number;
  weeklyViews: number;
  monthlyViews: number;
  totalViews: number;
  percent: number;
  cities: { city: string; count: number }[];
}

export interface TrafficSource {
  source: string;
  category: 'Organic' | 'Direct' | 'Social' | 'Referral';
  percent: number;
  visits: number;
}

export interface DeviceBreakdown {
  device: string;
  percent: number;
  visits: number;
  icon: string;
}

export interface RealAnalyticsSummary {
  isRealData: boolean;
  todayViews: number;
  todayVisitors: number;
  weeklyViews: number;
  weeklyVisitors: number;
  monthlyViews: number;
  monthlyVisitors: number;
  totalViews: number;
  totalVisitors: number;
  activeVisitorsNow: number;
  googleTagId: string;
  googleTagActive: boolean;
  lastEventTimestamp?: string;
  urls: URLPageView[];
  locations: GeoLocationView[];
  sources: TrafficSource[];
  devices: DeviceBreakdown[];
  recentVisits: RealVisitLog[];
}

const STORAGE_LOGS_KEY = 'nd_real_visit_logs_v1';
const GEO_CACHE_KEY = 'nd_visitor_geo_cache';

// Detect Device
function detectDevice(): 'Mobile' | 'Desktop' | 'Tablet' {
  if (typeof window === 'undefined') return 'Desktop';
  const ua = navigator.userAgent.toLowerCase();
  if (/(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(ua)) {
    return 'Tablet';
  }
  if (/(mobi|ipod|phone|blackberry|opera mini|fennec|minimo|symbian|psp|nintendo ds|archos|skyfire)/.test(ua)) {
    return 'Mobile';
  }
  return 'Desktop';
}

// Get or create Session ID
function getSessionId(): string {
  if (typeof window === 'undefined') return 'server';
  let sid = sessionStorage.getItem('nd_session_id');
  if (!sid) {
    sid = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    sessionStorage.setItem('nd_session_id', sid);
  }
  return sid;
}

// Fast country flag helper
function getFlagEmoji(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return '🌐';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

// Get stored raw visit logs
export function getStoredVisitLogs(): RealVisitLog[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_LOGS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

// Save raw visit logs
function saveVisitLogs(logs: RealVisitLog[]): void {
  if (typeof window === 'undefined') return;
  try {
    // Keep up to 2,000 real visits in local browser storage
    const trimmed = logs.slice(0, 2000);
    localStorage.setItem(STORAGE_LOGS_KEY, JSON.stringify(trimmed));
  } catch (e) {
    console.debug('Failed to save visit logs:', e);
  }
}

// Real asynchronous IP/Geo detector (cached per session)
async function detectRealVisitorGeo(): Promise<{ country: string; countryCode: string; city: string }> {
  if (typeof window === 'undefined') {
    return { country: 'Unknown', countryCode: 'IN', city: 'Unknown' };
  }

  // 1. Check session cache first
  try {
    const cached = sessionStorage.getItem(GEO_CACHE_KEY);
    if (cached) return JSON.parse(cached);
  } catch {}

  // 2. Try fetching real public IP geo
  try {
    const res = await fetch('https://api.country.is/', { mode: 'cors' });
    if (res.ok) {
      const data = await res.json();
      const countryCode = data.country || 'IN';
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      let country = 'India';
      if (countryCode === 'US') country = 'United States';
      else if (countryCode === 'GB') country = 'United Kingdom';
      else if (countryCode === 'AE') country = 'United Arab Emirates';
      else if (countryCode === 'NP') country = 'Nepal';
      else if (countryCode === 'CA') country = 'Canada';
      else if (countryCode === 'AU') country = 'Australia';

      let city = tz.split('/')[1]?.replace(/_/g, ' ') || 'Local City';
      const result = { country, countryCode, city };
      sessionStorage.setItem(GEO_CACHE_KEY, JSON.stringify(result));
      return result;
    }
  } catch {}

  // 3. Fallback to Browser Timezone
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata';
  let country = 'India';
  let countryCode = 'IN';
  if (tz.includes('America') || tz.includes('New_York') || tz.includes('Los_Angeles')) {
    country = 'United States';
    countryCode = 'US';
  } else if (tz.includes('London') || tz.includes('Europe')) {
    country = 'United Kingdom';
    countryCode = 'GB';
  } else if (tz.includes('Dubai')) {
    country = 'United Arab Emirates';
    countryCode = 'AE';
  } else if (tz.includes('Kathmandu')) {
    country = 'Nepal';
    countryCode = 'NP';
  }

  const city = tz.split('/')[1]?.replace(/_/g, ' ') || 'New Delhi';
  const fallback = { country, countryCode, city };
  try {
    sessionStorage.setItem(GEO_CACHE_KEY, JSON.stringify(fallback));
  } catch {}
  return fallback;
}

// Record a 100% REAL Page View
export async function recordPageView(path: string, pageTitle?: string): Promise<void> {
  if (typeof window === 'undefined') return;

  const normalizedPath = path.replace(/\/+$/, '') || '/';
  const title = pageTitle || document.title || normalizedPath;
  const now = Date.now();
  const sessionId = getSessionId();
  const device = detectDevice();
  const referrer = document.referrer ? new URL(document.referrer, window.location.origin).hostname : 'Direct';

  // 1. Dispatch real GA4 event
  try {
    if ((window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_path: normalizedPath,
        page_title: title,
        page_location: window.location.href,
        send_to: 'G-G061QQTE9T'
      });
    }
  } catch (err) {
    console.debug('gtag send error:', err);
  }

  // 2. Fetch real geo info
  const geo = await detectRealVisitorGeo();

  // 3. Create real visit entry
  const newVisit: RealVisitLog = {
    id: `v_${now}_${Math.random().toString(36).substr(2, 4)}`,
    path: normalizedPath,
    title,
    timestamp: now,
    country: geo.country,
    countryCode: geo.countryCode,
    city: geo.city,
    device,
    referrer,
    sessionId
  };

  const logs = getStoredVisitLogs();
  logs.unshift(newVisit);
  saveVisitLogs(logs);

  // Notify active listeners
  window.dispatchEvent(new CustomEvent('nd_real_visit_recorded', { detail: newVisit }));
}

// Compute Real Analytics from recorded visits
export function getRealAnalyticsSummary(): RealAnalyticsSummary {
  const logs = getStoredVisitLogs();
  const now = Date.now();

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const startOfTodayMs = startOfToday.getTime();

  const sevenDaysAgoMs = now - 7 * 24 * 60 * 60 * 1000;
  const thirtyDaysAgoMs = now - 30 * 24 * 60 * 60 * 1000;
  const fiveMinutesAgoMs = now - 5 * 60 * 1000;

  // Real Active Visitors Now: unique sessions active in last 5 minutes
  const activeSessions = new Set(
    logs.filter((l) => l.timestamp >= fiveMinutesAgoMs).map((l) => l.sessionId)
  );
  // Current user is always at least 1 if on page
  const activeVisitorsNow = Math.max(1, activeSessions.size);

  // Timeframe filters
  const todayLogs = logs.filter((l) => l.timestamp >= startOfTodayMs);
  const weeklyLogs = logs.filter((l) => l.timestamp >= sevenDaysAgoMs);
  const monthlyLogs = logs.filter((l) => l.timestamp >= thirtyDaysAgoMs);

  const todayVisitors = new Set(todayLogs.map((l) => l.sessionId)).size;
  const weeklyVisitors = new Set(weeklyLogs.map((l) => l.sessionId)).size;
  const monthlyVisitors = new Set(monthlyLogs.map((l) => l.sessionId)).size;
  const totalVisitors = new Set(logs.map((l) => l.sessionId)).size;

  // Real URL aggregation
  const urlMap = new Map<string, { title: string; today: number; weekly: number; monthly: number; total: number; lastTime: number }>();

  for (const log of logs) {
    let entry = urlMap.get(log.path);
    if (!entry) {
      entry = { title: log.title, today: 0, weekly: 0, monthly: 0, total: 0, lastTime: log.timestamp };
      urlMap.set(log.path, entry);
    }
    entry.total += 1;
    if (log.timestamp >= startOfTodayMs) entry.today += 1;
    if (log.timestamp >= sevenDaysAgoMs) entry.weekly += 1;
    if (log.timestamp >= thirtyDaysAgoMs) entry.monthly += 1;
    if (log.timestamp > entry.lastTime) {
      entry.lastTime = log.timestamp;
      entry.title = log.title;
    }
  }

  const urls: URLPageView[] = Array.from(urlMap.entries()).map(([path, data]) => ({
    path,
    title: data.title,
    todayViews: data.today,
    weeklyViews: data.weekly,
    monthlyViews: data.monthly,
    totalViews: data.total,
    lastVisited: new Date(data.lastTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }));

  // Sort URLs by totalViews descending
  urls.sort((a, b) => b.totalViews - a.totalViews);

  // Real Geographic aggregation
  const locationMap = new Map<string, { country: string; flag: string; today: number; weekly: number; monthly: number; total: number; cities: Map<string, number> }>();

  for (const log of logs) {
    let loc = locationMap.get(log.country);
    if (!loc) {
      loc = {
        country: log.country,
        flag: getFlagEmoji(log.countryCode),
        today: 0,
        weekly: 0,
        monthly: 0,
        total: 0,
        cities: new Map()
      };
      locationMap.set(log.country, loc);
    }
    loc.total += 1;
    if (log.timestamp >= startOfTodayMs) loc.today += 1;
    if (log.timestamp >= sevenDaysAgoMs) loc.weekly += 1;
    if (log.timestamp >= thirtyDaysAgoMs) loc.monthly += 1;

    const cityCount = loc.cities.get(log.city) || 0;
    loc.cities.set(log.city, cityCount + 1);
  }

  const totalLogsCount = Math.max(1, logs.length);
  const locations: GeoLocationView[] = Array.from(locationMap.values()).map((l) => ({
    country: l.country,
    flag: l.flag,
    todayViews: l.today,
    weeklyViews: l.weekly,
    monthlyViews: l.monthly,
    totalViews: l.total,
    percent: parseFloat(((l.total / totalLogsCount) * 100).toFixed(1)),
    cities: Array.from(l.cities.entries())
      .map(([city, count]) => ({ city, count }))
      .sort((a, b) => b.count - a.count)
  }));
  locations.sort((a, b) => b.totalViews - a.totalViews);

  // Real Device breakdown
  const deviceCounts: Record<string, number> = { Mobile: 0, Desktop: 0, Tablet: 0 };
  for (const log of logs) {
    deviceCounts[log.device] = (deviceCounts[log.device] || 0) + 1;
  }
  const devices: DeviceBreakdown[] = Object.keys(deviceCounts).map((dev) => ({
    device: dev,
    visits: deviceCounts[dev],
    percent: parseFloat(((deviceCounts[dev] / totalLogsCount) * 100).toFixed(1)),
    icon: dev === 'Mobile' ? 'Smartphone' : dev === 'Tablet' ? 'Tablet' : 'Monitor'
  }));

  // Real Traffic sources
  const sourceMap = new Map<string, number>();
  for (const log of logs) {
    const src = log.referrer || 'Direct';
    sourceMap.set(src, (sourceMap.get(src) || 0) + 1);
  }
  const sources: TrafficSource[] = Array.from(sourceMap.entries()).map(([source, count]) => {
    let category: 'Organic' | 'Direct' | 'Social' | 'Referral' = 'Direct';
    if (source.includes('google') || source.includes('bing') || source.includes('yahoo')) category = 'Organic';
    else if (source.includes('whatsapp') || source.includes('facebook') || source.includes('t.co') || source.includes('instagram')) category = 'Social';
    else if (source !== 'Direct') category = 'Referral';

    return {
      source,
      category,
      visits: count,
      percent: parseFloat(((count / totalLogsCount) * 100).toFixed(1))
    };
  });
  sources.sort((a, b) => b.visits - a.visits);

  const lastLog = logs[0];
  const lastEventTimestamp = lastLog ? new Date(lastLog.timestamp).toLocaleTimeString() : undefined;

  return {
    isRealData: true,
    todayViews: todayLogs.length,
    todayVisitors,
    weeklyViews: weeklyLogs.length,
    weeklyVisitors,
    monthlyViews: monthlyLogs.length,
    monthlyVisitors,
    totalViews: logs.length,
    totalVisitors,
    activeVisitorsNow,
    googleTagId: 'G-G061QQTE9T',
    googleTagActive: typeof window !== 'undefined' && typeof (window as any).gtag === 'function',
    lastEventTimestamp,
    urls,
    locations,
    sources,
    devices,
    recentVisits: logs.slice(0, 50)
  };
}

// Clear recorded visit logs
export function clearRealVisitLogs(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_LOGS_KEY);
  window.dispatchEvent(new CustomEvent('nd_real_visit_recorded'));
}
