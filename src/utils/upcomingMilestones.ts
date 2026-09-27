import { EKADASHI_2027, PURNIMA_2027, AMAVASYA_2027 } from '../data/calendarData';
import { getAllActiveFestivals } from './festivalService';

export interface MilestoneItem {
  id: string;
  type: 'festival' | 'purnima' | 'ekadashi' | 'amavasya';
  name: string;
  nameHi?: string;
  dateStr: string; // YYYY-MM-DD
  dayOfWeek: string;
  daysRemaining: number;
  badgeLabel: string;
  badgeTone: 'urgent' | 'warning' | 'info' | 'sacred';
  category: string;
  description: string;
  url: string;
  paranaOrTithi?: string;
  moonriseTime?: string;
}

export function getAnchorDate(): Date {
  const now = new Date();
  // Project to 2027 so 2027 festival calendar countdowns are accurate and active
  const currentMonth = now.getMonth();
  const currentDate = now.getDate();
  return new Date(2027, currentMonth, currentDate, 0, 0, 0);
}

export function calculateDaysRemaining(targetDateStr: string, anchorDate = getAnchorDate()): number {
  const parts = targetDateStr.split('-');
  if (parts.length < 3) return 999;
  const targetYear = parseInt(parts[0], 10);
  const targetMonth = parseInt(parts[1], 10) - 1;
  const targetDay = parseInt(parts[2], 10);

  const target = new Date(targetYear, targetMonth, targetDay, 0, 0, 0);
  const diffTime = target.getTime() - anchorDate.getTime();
  let days = Math.round(diffTime / (1000 * 60 * 60 * 24));

  // If the festival passed earlier in the 2027 calendar year, wrap around into the next annual cycle
  if (days < 0) {
    days = days + 365;
  }
  return days;
}

export function formatCountdownBadge(daysRemaining: number): { label: string; tone: 'urgent' | 'warning' | 'info' | 'sacred' } {
  if (daysRemaining === 0) {
    return { label: 'Today (आज)', tone: 'urgent' };
  }
  if (daysRemaining === 1) {
    return { label: 'Tomorrow (कल)', tone: 'urgent' };
  }
  if (daysRemaining <= 7) {
    return { label: `In ${daysRemaining} Days (${daysRemaining} दिनों में)`, tone: 'warning' };
  }
  if (daysRemaining <= 30) {
    return { label: `In ${daysRemaining} Days (${daysRemaining} दिनों में)`, tone: 'info' };
  }
  return { label: `In ${daysRemaining} Days`, tone: 'sacred' };
}

export function getUpcomingMilestones() {
  const anchor = getAnchorDate();
  const allFestivals = getAllActiveFestivals();

  const items: MilestoneItem[] = [];

  // 1. Process Festivals (including active custom ones added by admin)
  for (const f of allFestivals) {
    if (!f.date2027) continue;
    const days = calculateDaysRemaining(f.date2027, anchor);
    const badge = formatCountdownBadge(days);
    items.push({
      id: `f_${f.id}`,
      type: 'festival',
      name: f.name,
      nameHi: f.nameHi,
      dateStr: f.date2027,
      dayOfWeek: f.dayOfWeek2027 || 'Auspicious Day',
      daysRemaining: days,
      badgeLabel: badge.label,
      badgeTone: badge.tone,
      category: f.category || 'Major',
      description: f.summary || f.description || f.significance || 'Sacred Hindu festival celebration with puja timings and muhurat.',
      url: `/festivals/${f.slug}`
    });
  }

  // 2. Process Purnimas (Full Moons)
  for (const p of PURNIMA_2027) {
    if (!p.date2027) continue;
    const days = calculateDaysRemaining(p.date2027, anchor);
    const badge = formatCountdownBadge(days);
    items.push({
      id: `p_${p.id}`,
      type: 'purnima',
      name: p.name,
      dateStr: p.date2027,
      dayOfWeek: p.dayOfWeek2027 || 'Purnima',
      daysRemaining: days,
      badgeLabel: badge.label,
      badgeTone: badge.tone,
      category: 'Purnima Vrat',
      description: `Satyanarayan Vrat & Moonrise at ${p.moonriseTime || 'Evening'}. Sacred full moon tithi.`,
      url: '/purnima/2027',
      paranaOrTithi: `Moonrise: ${p.moonriseTime || '6:15 PM'}`,
      moonriseTime: p.moonriseTime
    });
  }

  // 3. Process Ekadashis
  for (const e of EKADASHI_2027) {
    if (!e.date2027) continue;
    const days = calculateDaysRemaining(e.date2027, anchor);
    const badge = formatCountdownBadge(days);
    items.push({
      id: `e_${e.id}`,
      type: 'ekadashi',
      name: e.name,
      dateStr: e.date2027,
      dayOfWeek: e.dayOfWeek2027 || 'Ekadashi',
      daysRemaining: days,
      badgeLabel: badge.label,
      badgeTone: badge.tone,
      category: 'Ekadashi Fast',
      description: `Dedicated to Lord Vishnu. Parana window: ${e.paranaTime}.`,
      url: '/ekadashi/2027',
      paranaOrTithi: `Parana: ${e.paranaTime}`
    });
  }

  // 4. Process Amavasyas (New Moons)
  for (const a of AMAVASYA_2027) {
    if (!a.date2027) continue;
    const days = calculateDaysRemaining(a.date2027, anchor);
    const badge = formatCountdownBadge(days);
    items.push({
      id: `a_${a.id}`,
      type: 'amavasya',
      name: a.name,
      dateStr: a.date2027,
      dayOfWeek: a.dayOfWeek2027 || 'Amavasya',
      daysRemaining: days,
      badgeLabel: badge.label,
      badgeTone: badge.tone,
      category: 'Amavasya Tithi',
      description: a.description || 'Sacred new moon tithi for Pitru Tarpan and spiritual meditation.',
      url: '/amavasya/2027'
    });
  }

  // Sort chronologically by days remaining
  items.sort((a, b) => a.daysRemaining - b.daysRemaining);

  // Identify next specific milestones (smallest daysRemaining)
  const nextFestival = items.find((i) => i.type === 'festival') || items[0];
  const nextPurnima = items.find((i) => i.type === 'purnima');
  const nextEkadashi = items.find((i) => i.type === 'ekadashi');
  const nextAmavasya = items.find((i) => i.type === 'amavasya');

  // Buckets
  const in7Days = items.filter((i) => i.daysRemaining <= 7);
  const in30Days = items.filter((i) => i.daysRemaining <= 30);
  const majorFestivals = items.filter((i) => (i.type === 'festival' && (i.category === 'Major' || i.daysRemaining <= 60)) || i.daysRemaining <= 30);
  const purnimaEkadashi = items.filter((i) => i.type === 'purnima' || i.type === 'ekadashi');

  return {
    allUpcoming: items,
    nextFestival,
    nextPurnima,
    nextEkadashi,
    nextAmavasya,
    in7Days,
    in30Days,
    majorFestivals,
    purnimaEkadashi
  };
}
