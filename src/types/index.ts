export type LanguageCode =
  | 'en'
  | 'hi'
  | 'mr'
  | 'gu'
  | 'te'
  | 'ta'
  | 'kn'
  | 'ml'
  | 'bn'
  | 'or'
  | 'pa'
  | 'as';

export type RegionalCalendarKey =
  | 'marathi'
  | 'gujarati'
  | 'telugu'
  | 'tamil'
  | 'kannada'
  | 'malayalam'
  | 'bengali'
  | 'odia'
  | 'hindi'
  | 'punjabi'
  | 'assamese';

export interface CityInfo {
  id: string;
  name: string;
  nameHi?: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
  category?: 'metro' | 'pilgrimage' | 'north' | 'south' | 'east' | 'west' | 'central' | 'international' | 'north_america' | 'europe_uk' | 'middle_east' | 'oceania' | 'diaspora';
  region?: string;
}

export interface PanchangData {
  date: string; // YYYY-MM-DD
  dayOfWeek: string;
  tithi: {
    name: string;
    number: number;
    paksha: 'Shukla' | 'Krishna';
    endTime?: string;
  };
  nakshatra: {
    name: string;
    number: number;
    endTime?: string;
  };
  yoga: {
    name: string;
    number: number;
    endTime?: string;
  };
  karana: {
    name: string;
    number: number;
    endTime?: string;
  };
  hinduMonthAmavasyant: string;
  hinduMonthPurnimant: string;
  shakaSamvat: number;
  vikramSamvat: number;
  ritu: string;
  ayana: 'Uttarayana' | 'Dakshinayana';
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  rahuKaal: { start: string; end: string };
  yamaganda: { start: string; end: string };
  gulikaKaal: { start: string; end: string };
  abhijitMuhurat: { start: string; end: string };
  brahmaMuhurat: { start: string; end: string };
  choghadiya: {
    day: ChoghadiyaSlot[];
    night: ChoghadiyaSlot[];
  };
  festivals?: string[];
  vrat?: string[];
  city: CityInfo;
}

export interface ChoghadiyaSlot {
  name: 'Shubh' | 'Labh' | 'Amrit' | 'Chal' | 'Rog' | 'Kaal' | 'Udveg';
  ruler: string;
  start: string;
  end: string;
  nature: 'Auspicious' | 'Inauspicious' | 'Neutral';
}

export interface FestivalEvent {
  id: string;
  slug: string;
  name: string;
  nameHi?: string;
  nameRegional?: Record<string, string>;
  date2027: string;
  dayOfWeek2027: string;
  category: 'Major' | 'Deity' | 'Jayanti' | 'Vrat' | 'Sankranti' | 'Regional';
  deity?: string;
  tithiText: string;
  hinduMonth: string;
  summary: string;
  significance: string;
  rituals: string[];
  pujaVidhi?: string;
  shubhMuhurat?: string;
  regions?: string[];
}

export interface EkadashiEvent {
  id: string;
  slug: string;
  name: string;
  date2027: string;
  dayOfWeek2027: string;
  paksha: 'Shukla' | 'Krishna';
  hinduMonth: string;
  paranaTime: string;
  significance: string;
  storySummary: string;
}

export interface PurnimaEvent {
  id: string;
  name: string;
  date2027: string;
  dayOfWeek2027: string;
  hinduMonth: string;
  tithiStart: string;
  tithiEnd: string;
  moonriseTime: string;
  significance: string;
  vratDetails: string;
}

export interface AmavasyaEvent {
  id: string;
  name: string;
  date2027: string;
  dayOfWeek2027: string;
  hinduMonth: string;
  tithiStart: string;
  tithiEnd: string;
  significance: string;
  tarpanRules: string;
}

export interface MuhuratDate {
  date: string;
  dayOfWeek: string;
  tithi: string;
  nakshatra: string;
  timeWindow: string;
  auspiciousScore: string;
}

export interface MuhuratCategory {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  dates2027: MuhuratDate[];
  rules: string[];
}

export interface HolidayItem {
  id: string;
  date: string;
  dayOfWeek: string;
  name: string;
  type: 'Central' | 'State' | 'Restricted';
  applicableStates: string[]; // ['ALL'] or state codes
  description: string;
}

export interface BankHolidayItem {
  id: string;
  date: string;
  dayOfWeek: string;
  name: string;
  states: string[];
  category: 'Negotiable Instruments Act' | 'Holiday under Real Time Gross' | 'Banks Closing Accounts';
}

export interface RashifalData {
  rashiId: string;
  name: string;
  nameHi: string;
  sanskritName: string;
  westernSign: string;
  ruler: string;
  element: string;
  symbol: string;
  syllables: string[];
  dailyPrediction: {
    general: string;
    career: string;
    love: string;
    health: string;
    luckyColor: string;
    luckyNumber: string;
    luckyTime: string;
  };
  weeklyPrediction: string;
  monthlyPrediction: string;
  yearly2027Prediction: string;
}

export interface BabyName {
  id: string;
  name: string;
  gender: 'Boy' | 'Girl' | 'Unisex';
  meaning: string;
  rashi: string;
  nakshatra: string;
  startingLetter: string;
  origin: string;
  numerology: number;
}

export interface NotificationSettings {
  masterEnabled: boolean;
  dailyPanchang: boolean;
  festivals: boolean;
  ekadashi: boolean;
  purnimaAmavasya: boolean;
  muhurat: boolean;
  rashifal: boolean;
  selectedRashi: string;
  scheduledTime: string; // e.g., '06:00'
  language: LanguageCode;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedDate: string;
  content: string[];
  relatedFestivals?: string[];
  faq: { question: string; answer: string }[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SEOMetadata {
  title: string;
  description: string;
  h1: string;
  canonicalUrl: string;
  ogTitle?: string;
  ogDescription?: string;
  robots?: string;
  breadcrumbs: { name: string; url: string }[];
  schemaType?: string;
  faq?: FAQItem[];
}

export interface CustomSEORule {
  id: string;
  path: string;
  title: string;
  description: string;
  canonicalUrl: string;
  h1?: string;
  ogTitle?: string;
  ogDescription?: string;
  robots: 'index, follow' | 'noindex, follow' | 'noindex, nofollow' | 'index, nofollow';
  enabled: boolean;
  notes?: string;
  lastUpdated: string;
}

export interface RedirectRule {
  id: string;
  sourcePath: string;
  destinationUrl: string;
  statusCode: 301 | 302 | 307 | 308;
  preserveQuery: boolean;
  enabled: boolean;
  notes?: string;
  hitCount: number;
  lastTriggered?: string;
  createdAt: string;
}
