import { CityInfo } from '../types';
import { CITIES } from '../data/panchangEngine';

// Earth radius in kilometers for Haversine distance
const EARTH_RADIUS_KM = 6371;

function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

// Calculate Haversine distance between two coordinates
export function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(lat1)) *
      Math.cos(degreesToRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c;
}

// Find closest city from our CITIES database
export function findClosestCity(userLat: number, userLon: number): CityInfo {
  let closestCity = CITIES[0];
  let minDistance = Infinity;

  for (const city of CITIES) {
    const dist = getDistanceKm(userLat, userLon, city.latitude, city.longitude);
    if (dist < minDistance) {
      minDistance = dist;
      closestCity = city;
    }
  }

  return closestCity;
}

// Map browser timezone to a default representative city
const TIMEZONE_MAP: Record<string, string> = {
  'Asia/Kolkata': 'delhi',
  'Asia/Calcutta': 'delhi',
  'Europe/London': 'london',
  'America/New_York': 'newyork',
  'America/Los_Angeles': 'bayarea',
  'America/Toronto': 'toronto',
  'Asia/Dubai': 'dubai',
  'Asia/Singapore': 'singapore',
  'Australia/Sydney': 'sydney',
  'Indian/Mauritius': 'portlouis',
  'Asia/Kathmandu': 'kathmandu'
};

/**
 * Automatically detects the user's location via:
 * 1. Stored user preference in localStorage ('nd_user_city')
 * 2. High-accuracy Browser Geolocation (with closest city calculation)
 * 3. Browser Timezone mapping fallback
 */
export async function detectUserCity(): Promise<{ city: CityInfo; source: 'stored' | 'gps' | 'timezone' | 'default' }> {
  // 1. Check local storage first
  if (typeof window !== 'undefined') {
    try {
      const storedCityId = localStorage.getItem('nd_user_city');
      if (storedCityId) {
        const found = CITIES.find((c) => c.id === storedCityId);
        if (found) return { city: found, source: 'stored' };
      }
    } catch {
      // Ignore localStorage read errors
    }
  }

  // 2. Try browser Geolocation if available
  if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 4000,
          maximumAge: 1000 * 60 * 60 * 24 // 24 hours cache
        });
      });

      const closest = findClosestCity(position.coords.latitude, position.coords.longitude);
      if (closest && typeof window !== 'undefined') {
        localStorage.setItem('nd_user_city', closest.id);
      }
      return { city: closest, source: 'gps' };
    } catch {
      // User denied GPS or timed out, proceed to timezone heuristic
    }
  }

  // 3. Fallback to browser timezone
  if (typeof Intl !== 'undefined') {
    try {
      const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const mappedCityId = TIMEZONE_MAP[userTz];
      if (mappedCityId) {
        const found = CITIES.find((c) => c.id === mappedCityId);
        if (found) {
          if (typeof window !== 'undefined') {
            localStorage.setItem('nd_user_city', found.id);
          }
          return { city: found, source: 'timezone' };
        }
      }
    } catch {
      // Ignore timezone read error
    }
  }

  return { city: CITIES[0], source: 'default' };
}
