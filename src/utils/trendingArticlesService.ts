export interface TrendingArticle {
  id: string;
  title: string;
  titleHi?: string;
  url: string;
  category: 'Temple' | 'Panchang' | 'Festival' | 'Astrology' | 'Muhurat';
  badge: '🔥 Trending' | '⭐ Top Read' | '⚡ Breaking' | '🪔 Special' | '🕉️ Sacred';
  viewsToday: number;
  totalViews: number;
  sharesCount: number;
  viralityScore: number; // 0 - 100
  isPinned: boolean;
  isActive: boolean;
  publishedDate: string;
}

const TRENDING_STORAGE_KEY = 'nd_trending_articles_v1';

const INITIAL_TRENDING: TrendingArticle[] = [
  {
    id: 'tr-1',
    title: 'Angkor Wat (Paramavishnuloka) Cambodia – Darshan, History & Aarti Guide',
    titleHi: 'अंकोरवाट मंदिर (कंबोडिया) – दर्शन समय, इतिहास एवं आरती सारणी',
    url: '/temples/angkor-wat-cambodia',
    category: 'Temple',
    badge: '🔥 Trending',
    viewsToday: 4120,
    totalViews: 154000,
    sharesCount: 1820,
    viralityScore: 98,
    isPinned: true,
    isActive: true,
    publishedDate: '2026-09-27'
  },
  {
    id: 'tr-2',
    title: 'BAPS Swaminarayan Akshardham (Robbinsville, NJ) USA – Timings & Aarti Pass',
    titleHi: 'अक्षरधाम मंदिर न्यू जर्सी (अमेरिका) – दर्शन व आरती समय',
    url: '/temples/baps-akshardham-usa',
    category: 'Temple',
    badge: '⭐ Top Read',
    viewsToday: 3840,
    totalViews: 148000,
    sharesCount: 1420,
    viralityScore: 95,
    isPinned: true,
    isActive: true,
    publishedDate: '2026-09-27'
  },
  {
    id: 'tr-3',
    title: 'Shri Pashupatinath Temple Kathmandu Nepal – 5-Faced Shiva Darshan',
    titleHi: 'श्री पशुपतिनाथ मंदिर काठमांडू (नेपाल) – प्रातः व संध्या आरती समय',
    url: '/temples/pashupatinath-nepal',
    category: 'Temple',
    badge: '🔥 Trending',
    viewsToday: 3260,
    totalViews: 139000,
    sharesCount: 1190,
    viralityScore: 92,
    isPinned: false,
    isActive: true,
    publishedDate: '2026-09-27'
  },
  {
    id: 'tr-4',
    title: 'BAPS Hindu Mandir Abu Dhabi UAE – 7 Shikhars & Booking Timings',
    titleHi: 'अबू धाबी हिन्दू मंदिर (यूएई) – दर्शन घंटे एवं ड्रेस कोड नियम',
    url: '/temples/baps-hindu-mandir-abu-dhabi',
    category: 'Temple',
    badge: '🔥 Trending',
    viewsToday: 2980,
    totalViews: 128000,
    sharesCount: 1050,
    viralityScore: 89,
    isPinned: false,
    isActive: true,
    publishedDate: '2026-09-27'
  },
  {
    id: 'tr-5',
    title: 'Shri Kashi Vishwanath Temple Varanasi – Sparsh Darshan & Mangala Aarti',
    titleHi: 'काशी विश्वनाथ मंदिर वाराणसी – मंगला आरती व स्पर्श दर्शन समय',
    url: '/temples/kashi-vishwanath',
    category: 'Temple',
    badge: '🕉️ Sacred',
    viewsToday: 2740,
    totalViews: 112000,
    sharesCount: 940,
    viralityScore: 86,
    isPinned: false,
    isActive: true,
    publishedDate: '2026-09-27'
  },
  {
    id: 'tr-6',
    title: 'Aaj Ka Choghadiya – Shubh, Labh, Amrit Muhurat Calculator',
    titleHi: 'आज का चौघड़िया – शुभ, लाभ, अमृत व चर मुहूर्त समय',
    url: '/choghadiya',
    category: 'Panchang',
    badge: '⚡ Breaking',
    viewsToday: 2650,
    totalViews: 415000,
    sharesCount: 890,
    viralityScore: 84,
    isPinned: false,
    isActive: true,
    publishedDate: '2026-09-27'
  },
  {
    id: 'tr-7',
    title: 'Vivah Muhurat 2027 – Auspicious Hindu Marriage Dates & Lagna Tithi',
    titleHi: 'विवाह मुहूर्त २०२७ – शुभ लग्न तिथियां व नक्षत्र सूची',
    url: '/muhurat/vivah',
    category: 'Muhurat',
    badge: '⭐ Top Read',
    viewsToday: 2190,
    totalViews: 56000,
    sharesCount: 780,
    viralityScore: 81,
    isPinned: false,
    isActive: true,
    publishedDate: '2026-09-27'
  }
];

export function getTrendingArticles(): TrendingArticle[] {
  if (typeof window === 'undefined') return INITIAL_TRENDING;
  try {
    const raw = localStorage.getItem(TRENDING_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(TRENDING_STORAGE_KEY, JSON.stringify(INITIAL_TRENDING));
      return INITIAL_TRENDING;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_TRENDING;
  }
}

export function saveTrendingArticles(articles: TrendingArticle[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TRENDING_STORAGE_KEY, JSON.stringify(articles));
  window.dispatchEvent(new CustomEvent('nd_trending_updated', { detail: articles }));
}

export function addTrendingArticle(article: Omit<TrendingArticle, 'id' | 'viewsToday' | 'totalViews' | 'sharesCount' | 'viralityScore' | 'publishedDate'>): TrendingArticle {
  const current = getTrendingArticles();
  const newEntry: TrendingArticle = {
    ...article,
    id: `tr-${Date.now()}`,
    viewsToday: Math.floor(Math.random() * 500 + 100),
    totalViews: Math.floor(Math.random() * 5000 + 1000),
    sharesCount: Math.floor(Math.random() * 100 + 20),
    viralityScore: Math.floor(Math.random() * 30 + 70),
    publishedDate: new Date().toISOString().split('T')[0]
  };
  const updated = [newEntry, ...current];
  saveTrendingArticles(updated);
  return newEntry;
}

export function togglePinArticle(id: string): void {
  const current = getTrendingArticles();
  const updated = current.map((a) => (a.id === id ? { ...a, isPinned: !a.isPinned } : a));
  saveTrendingArticles(updated);
}

export function toggleActiveArticle(id: string): void {
  const current = getTrendingArticles();
  const updated = current.map((a) => (a.id === id ? { ...a, isActive: !a.isActive } : a));
  saveTrendingArticles(updated);
}

export function deleteTrendingArticle(id: string): void {
  const current = getTrendingArticles();
  const updated = current.filter((a) => a.id !== id);
  saveTrendingArticles(updated);
}
