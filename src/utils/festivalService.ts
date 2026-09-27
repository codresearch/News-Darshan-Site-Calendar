import { FESTIVALS_2027 } from '../data/calendarData';
import { FestivalEvent } from '../types';

const STORAGE_CUSTOM_KEY = 'nd_custom_festivals_v1';
const STORAGE_DELETED_KEY = 'nd_deleted_festival_ids_v1';

export function getCustomFestivals(): FestivalEvent[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_CUSTOM_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getDeletedFestivalIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_DELETED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getAllActiveFestivals(): FestivalEvent[] {
  const deletedIds = new Set(getDeletedFestivalIds());
  const custom = getCustomFestivals();

  // Combine default canonical festivals (filtered) + custom added
  const defaultFiltered = FESTIVALS_2027.filter((f) => !deletedIds.has(f.id));
  const combined = [...defaultFiltered, ...custom];

  // Sort chronologically by date
  combined.sort((a, b) => (a.date2027 || '').localeCompare(b.date2027 || ''));
  return combined;
}

export function getRemovedFestivals(): FestivalEvent[] {
  const deletedIds = new Set(getDeletedFestivalIds());
  return FESTIVALS_2027.filter((f) => deletedIds.has(f.id));
}

export function addCustomFestival(fest: {
  name: string;
  nameHi?: string;
  date2027: string;
  category: 'Major' | 'Deity' | 'Vrat' | 'Purnima' | 'Ekadashi' | 'Amavasya';
  hinduMonth?: string;
  tithiText?: string;
  description?: string;
}): FestivalEvent {
  const dateObj = new Date(fest.date2027);
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;
  const dayOfWeek = weekdays[dateObj.getDay()] || 'Friday';
  const month = fest.hinduMonth || dateObj.toLocaleString('en-US', { month: 'long' });

  const id = `fest_${Date.now()}`;
  const slug = fest.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const newEntry: FestivalEvent = {
    id,
    name: fest.name,
    nameHi: fest.nameHi,
    date2027: fest.date2027,
    dayOfWeek2027: dayOfWeek,
    category: fest.category,
    tithiText: fest.tithiText || 'Shubh Tithi',
    hinduMonth: month,
    summary: fest.description || `Celebration of ${fest.name} with sacred puja rituals and shubh muhurat.`,
    slug: slug || `festival-${Date.now()}`,
    significance: fest.description || 'Auspicious Hindu festival celebrated with joy, devotion, and traditional prayers.',
    rituals: ['Pratah Snan', 'Puja Archana', 'Auspicious Offerings', 'Aarti & Prasad']
  };

  const custom = getCustomFestivals();
  custom.push(newEntry);
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_CUSTOM_KEY, JSON.stringify(custom));
    window.dispatchEvent(new CustomEvent('nd_festivals_updated'));
  }

  return newEntry;
}

export function removeFestivalById(id: string): void {
  if (typeof window === 'undefined') return;

  // 1. Check if it's in custom festivals
  const custom = getCustomFestivals();
  const filteredCustom = custom.filter((f) => f.id !== id);
  localStorage.setItem(STORAGE_CUSTOM_KEY, JSON.stringify(filteredCustom));

  // 2. Add to deleted IDs list (to hide default festivals)
  const deletedIds = getDeletedFestivalIds();
  if (!deletedIds.includes(id)) {
    deletedIds.push(id);
    localStorage.setItem(STORAGE_DELETED_KEY, JSON.stringify(deletedIds));
  }

  window.dispatchEvent(new CustomEvent('nd_festivals_updated'));
}

export function restoreFestivalById(id: string): void {
  if (typeof window === 'undefined') return;

  const deletedIds = getDeletedFestivalIds().filter((d) => d !== id);
  localStorage.setItem(STORAGE_DELETED_KEY, JSON.stringify(deletedIds));
  window.dispatchEvent(new CustomEvent('nd_festivals_updated'));
}

export function resetFestivalsToDefault(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_CUSTOM_KEY);
  localStorage.removeItem(STORAGE_DELETED_KEY);
  window.dispatchEvent(new CustomEvent('nd_festivals_updated'));
}
