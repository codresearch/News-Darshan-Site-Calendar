import { SEOMetadata, FAQItem, CityInfo } from '../types';
import { FESTIVALS_2027, EKADASHI_2027, PURNIMA_2027, AMAVASYA_2027, MUHURATS_2027, RASHIFAL_DATA, ARTICLES_DATA } from '../data/calendarData';
import { REGIONAL_CALENDARS_INFO } from '../data/localization';
import { FAMOUS_TEMPLES } from '../data/templesData';
import { CITIES } from '../data/panchangEngine';
import { getSEORuleForPath } from './seoControlStore';

export const SITE_URL = 'https://www.newsdarshan.in';
export const SITE_NAME = 'NewsDarshan';

export const MONTH_NAMES = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december'
];

export const MONTH_DISPLAY_NAMES: Record<string, string> = {
  january: 'January',
  february: 'February',
  march: 'March',
  april: 'April',
  may: 'May',
  june: 'June',
  july: 'July',
  august: 'August',
  september: 'September',
  october: 'October',
  november: 'November',
  december: 'December'
};

export function getCitySEOMetadata(
  city: CityInfo,
  subType: 'panchang' | 'today' | 'choghadiya' | 'calendar' = 'panchang',
  month?: string,
  year: string = '2027'
): SEOMetadata {
  const cityName = city.name;
  const state = city.state;
  const country = city.country;
  const latStr = `${Math.abs(city.latitude).toFixed(2)}° ${city.latitude >= 0 ? 'N' : 'S'}`;
  const lngStr = `${Math.abs(city.longitude).toFixed(2)}° ${city.longitude >= 0 ? 'E' : 'W'}`;

  if (subType === 'choghadiya') {
    return {
      title: `${cityName} Choghadiya Today – Day & Night Auspicious Timings (${country}) | NewsDarshan`,
      description: `Check accurate Day & Night Choghadiya timings for ${cityName}, ${state}, ${country} (${city.timezone}). Real-time Shubh, Labh, Amrit, Chal, Rog, Kaal and Udveg muhurats calculated for local sunrise in ${cityName}.`,
      h1: `${cityName} Choghadiya Today (चौघड़िया)`,
      canonicalUrl: `${SITE_URL}/choghadiya/${city.id}/`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Choghadiya', url: '/choghadiya/' },
        { name: `${cityName} Choghadiya`, url: `/choghadiya/${city.id}/` }
      ],
      schemaType: 'Place',
      faq: [
        {
          question: `How are Choghadiya timings calculated for ${cityName}?`,
          answer: `Choghadiya in ${cityName} divides the local daytime (sunrise to sunset) and nighttime (sunset to next sunrise) into 8 equal intervals of ~1.5 hours each, customized precisely for ${cityName}'s geographical coordinates (${latStr}, ${lngStr}).`
        },
        {
          question: `What are the auspicious Choghadiya periods in ${cityName}?`,
          answer: `Amrit (अमृत), Shubh (शुभ), and Labh (लाभ) are the top auspicious Choghadiyas in ${cityName} for commencing business, travel, property registration, and religious ceremonies.`
        },
        {
          question: `Is ${cityName} Choghadiya timing adjusted for local timezone?`,
          answer: `Yes, all Choghadiya intervals for ${cityName} are calculated strictly in the local ${city.timezone} timezone based on true topocentric solar coordinates.`
        }
      ]
    };
  }

  if (subType === 'calendar' && month) {
    const mDisplay = MONTH_DISPLAY_NAMES[month.toLowerCase()] || month.charAt(0).toUpperCase() + month.slice(1);
    const shortCity = cityName.split(',')[0].trim();
    return {
      title: `Hindu Calendar ${year} ${mDisplay} ${shortCity} – Tithi, Ekadashi & Festivals (${country}) | NewsDarshan`,
      description: `Comprehensive Hindu Calendar for ${mDisplay} ${year} in ${cityName}, ${country}. Daily astronomical Tithi, Nakshatra, Ekadashi, Makar Sankranti, fasting days, and Rahu Kaal computed for local timezone ${city.timezone}.`,
      h1: `Hindu Calendar ${mDisplay} ${year} – ${cityName}`,
      canonicalUrl: `${SITE_URL}/hindu-calendar-${year}/${city.id}/${month.toLowerCase()}/`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: `Hindu Calendar ${year}`, url: `/hindu-calendar-${year}/` },
        { name: cityName, url: `/hindu-calendar-${year}/${city.id}/` },
        { name: `${mDisplay} ${year}`, url: `/hindu-calendar-${year}/${city.id}/${month.toLowerCase()}/` }
      ],
      schemaType: 'Place',
      faq: [
        {
          question: `What are the major Hindu festivals in ${shortCity} during ${mDisplay} ${year}?`,
          answer: `In ${mDisplay} ${year}, key observances in ${shortCity} include Makar Sankranti (Jan 14), Pongal, Paush Putrada Ekadashi, Paush Purnima, and Shattila Ekadashi, observed in the local ${city.timezone} timezone.`
        },
        {
          question: `Are festival and fasting dates in ${shortCity} different from India?`,
          answer: `Because ${shortCity} is located at longitude ${lngStr} (${city.timezone}), lunar tithis (like Ekadashi, Purnima, or Sankranti) may coincide with a different calendar day compared to India depending on whether the tithi prevails at local sunrise (Udaya Tithi).`
        },
        {
          question: `How are sunrise and sunset times calculated for ${shortCity}?`,
          answer: `NewsDarshan uses precise topocentric astronomical calculations for ${shortCity}'s coordinates (${latStr}, ${lngStr}) to provide exact sunrise, sunset, and solar midday timings.`
        }
      ]
    };
  }

  if (subType === 'calendar') {
    const shortCity = cityName.split(',')[0].trim();
    return {
      title: `Hindu Calendar ${year} ${shortCity} – 12 Months, Tithi, Festivals & Panchang (${country}) | NewsDarshan`,
      description: `Complete 12-month Hindu Calendar ${year} for ${cityName}, ${country}. Accurate astronomical Tithi, Ekadashis, Purnimas, Diwali (Nov 8), Holi (Mar 22), and auspicious muhurats adjusted for ${city.timezone}.`,
      h1: `Hindu Calendar ${year} – ${cityName} (हिन्दू पंचांग)`,
      canonicalUrl: `${SITE_URL}/hindu-calendar-${year}/${city.id}/`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: `Hindu Calendar ${year}`, url: `/hindu-calendar-${year}/` },
        { name: cityName, url: `/hindu-calendar-${year}/${city.id}/` }
      ],
      schemaType: 'Place',
      faq: [
        {
          question: `How does the ${year} Hindu Calendar work for ${shortCity}?`,
          answer: `The ${year} Hindu Calendar for ${shortCity} calculates all 12 lunar months, Vikram Samvat 2083-2084, and Shaka 1948-1949 specifically adjusted for ${city.timezone} local solar sunrise.`
        },
        {
          question: `When are Diwali and Holi celebrated in ${shortCity} in ${year}?`,
          answer: `In ${year}, Holi is celebrated on March 22, 2027 and Diwali (Lakshmi Puja) is celebrated on November 8, 2027 in ${shortCity} (${city.timezone}).`
        }
      ]
    };
  }

  return {
    title: `${cityName} Panchang Today & Hindu Calendar 2027 (${country}) | NewsDarshan`,
    description: `Accurate Vedic Panchang & Hindu Calendar 2027 for ${cityName}, ${state}, ${country}. Real-time Tithi, Nakshatra, Yoga, Karana, Rahu Kaal, Abhijit Muhurat, Sunrise/Sunset in ${city.timezone}.`,
    h1: `${cityName} Panchang & Hindu Calendar 2027 (${city.nameHi || cityName})`,
    canonicalUrl: `${SITE_URL}/panchang/${city.id}/`,
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Panchang', url: '/panchang/' },
      { name: `${cityName} Panchang`, url: `/panchang/${city.id}/` }
    ],
    schemaType: 'Place',
    faq: [
      {
        question: `What is today's Tithi, Sunrise and Sunset time in ${cityName}?`,
        answer: `Today's astronomical Tithi, Sunrise, Sunset, and Moonrise for ${cityName} (${state}, ${country}) are computed using precise geographical coordinates (${latStr}, ${lngStr}) and rendered in ${city.timezone}.`
      },
      {
        question: `When is Rahu Kaal and Abhijit Muhurat in ${cityName} today?`,
        answer: `Rahu Kaal (inauspicious 90-min daytime window) and Abhijit Muhurat (midday auspicious window) in ${cityName} vary dynamically with the exact local sunrise time and weekday.`
      },
      {
        question: `Are Hindu festival and fasting dates in ${cityName} different from India?`,
        answer: `While lunar tithis occur simultaneously worldwide, local festival and Ekadashi fasting observances in ${cityName} depend on whether the tithi prevails at local sunrise (Udaya Tithi) or sunset in ${city.timezone}.`
      },
      {
        question: `How does NewsDarshan calculate Panchang for diaspora cities like ${cityName}?`,
        answer: `NewsDarshan utilizes high-precision astronomical algorithms based on Surya Siddhanta and modern planetary ephemeris to compute exact local solar noon, horizon elevation, and tithi transitions for ${cityName}.`
      }
    ]
  };
}

export function getSEOMetadataForPath(pathname: string, activeCity?: CityInfo): SEOMetadata {
  const baseMeta = computeDefaultSEOMetadataForPath(pathname, activeCity);
  const cleanPath = pathname.split('?')[0].replace(/\/+$/, '') || '/';
  const customOverride = getSEORuleForPath(cleanPath);

  if (!customOverride) {
    return baseMeta;
  }

  return {
    ...baseMeta,
    title: customOverride.title || baseMeta.title,
    description: customOverride.description || baseMeta.description,
    canonicalUrl: customOverride.canonicalUrl || baseMeta.canonicalUrl,
    h1: customOverride.h1 || baseMeta.h1,
    ogTitle: customOverride.ogTitle || customOverride.title || baseMeta.ogTitle,
    ogDescription: customOverride.ogDescription || customOverride.description || baseMeta.ogDescription,
    robots: customOverride.robots || baseMeta.robots || 'index, follow'
  };
}

function computeDefaultSEOMetadataForPath(pathname: string, activeCity?: CityInfo): SEOMetadata {
  const cleanPath = pathname.split('?')[0].replace(/\/+$/, '') || '/';

  // 0. City Directory Page: /cities or /city-directory
  if (cleanPath === '/cities' || cleanPath === '/city-directory') {
    return {
      title: 'Global Hindu Panchang Cities & Diaspora Directory 2027 | NewsDarshan',
      description: 'Explore authentic Hindu Calendar 2027, Daily Panchang, Choghadiya, Sunrise, and Shubh Muhurat for 100+ cities in USA, Canada, UK, Europe, Middle East, Australia, and India.',
      h1: 'Global Hindu Diaspora & City Panchang Directory',
      canonicalUrl: `${SITE_URL}/cities/`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Cities Directory', url: '/cities/' }
      ],
      schemaType: 'CollectionPage'
    };
  }

  // 0c. Date-Specific Panchang Routes: /panchang/:year/:month/:day or /panchang/:year-:month-:day
  const datePanchangMatch = cleanPath.match(/^\/panchang\/(\d{4})\/([a-z0-9]+)\/(\d{1,2})$/);
  if (datePanchangMatch) {
    const year = datePanchangMatch[1];
    const monthKey = datePanchangMatch[2].toLowerCase();
    const day = datePanchangMatch[3];
    const monthDisplay = MONTH_DISPLAY_NAMES[monthKey] || monthKey.charAt(0).toUpperCase() + monthKey.slice(1);
    const citySuffix = activeCity ? ` in ${activeCity.name} (${activeCity.country})` : '';

    return {
      title: `Panchang ${monthDisplay} ${day}, ${year}${citySuffix} – Hindu Tithi, Nakshatra & Muhurat | NewsDarshan`,
      description: `Daily Hindu Panchang for ${monthDisplay} ${day}, ${year}${citySuffix}. Get exact Tithi, Nakshatra, Yoga, Karana, Day/Night Choghadiya, Rahu Kaal, and Auspicious Muhurats.`,
      h1: `Panchang for ${monthDisplay} ${day}, ${year}${activeCity ? ` (${activeCity.name})` : ''}`,
      canonicalUrl: `${SITE_URL}/panchang/${year}/${monthKey}/${day}/`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: `Hindu Calendar ${year}`, url: `/hindu-calendar-${year}/` },
        { name: `${monthDisplay} ${year}`, url: `/hindu-calendar-${year}/${monthKey}/` },
        { name: `${monthDisplay} ${day}`, url: `/panchang/${year}/${monthKey}/${day}/` }
      ],
      schemaType: 'ItemPage'
    };
  }

  const isoDatePanchangMatch = cleanPath.match(/^\/panchang\/(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (isoDatePanchangMatch) {
    const year = isoDatePanchangMatch[1];
    const mNum = parseInt(isoDatePanchangMatch[2], 10);
    const day = isoDatePanchangMatch[3];
    const monthKey = MONTH_NAMES[mNum - 1] || 'january';
    const monthDisplay = MONTH_DISPLAY_NAMES[monthKey] || `Month ${mNum}`;
    const citySuffix = activeCity ? ` in ${activeCity.name} (${activeCity.country})` : '';

    return {
      title: `Panchang ${monthDisplay} ${day}, ${year}${citySuffix} – Hindu Tithi & Muhurat | NewsDarshan`,
      description: `Astronomical Vedic Panchang for ${year}-${mNum}-${day}${citySuffix}. Accurate Tithi, Nakshatra, Yoga, Karana, Choghadiya, and Rahu Kaal.`,
      h1: `Panchang for ${monthDisplay} ${day}, ${year}`,
      canonicalUrl: `${SITE_URL}/panchang/${year}-${mNum}-${day}/`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Panchang', url: '/today/' },
        { name: `${year}-${mNum}-${day}`, url: `/panchang/${year}-${mNum}-${day}/` }
      ],
      schemaType: 'ItemPage'
    };
  }
  const cityPathMatch = cleanPath.match(/^\/(?:city|panchang|today|today-panchang|choghadiya)\/([a-z0-9-]+)$/);
  if (cityPathMatch) {
    const citySlug = cityPathMatch[1].toLowerCase();
    // Exclude standard non-city segments (e.g. today/marathi-date, etc.)
    if (!citySlug.endsWith('-date') && !['daily', '2027', 'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'].includes(citySlug)) {
      const foundCity = CITIES.find(
        (c) => c.id.toLowerCase() === citySlug || c.id.toLowerCase().replace(/[^a-z0-9]/g, '') === citySlug.replace(/[^a-z0-9]/g, '')
      );
      if (foundCity) {
        const isChoghadiya = cleanPath.startsWith('/choghadiya');
        return getCitySEOMetadata(foundCity, isChoghadiya ? 'choghadiya' : 'panchang');
      }
    }
  }

  // 1. Homepage
  if (cleanPath === '/') {
    const citySuffix = activeCity && activeCity.id !== 'delhi' ? ` for ${activeCity.name}` : '';
    return {
      title: `Hindu Calendar 2027 – Festivals, Tithi, Vrat & Panchang${citySuffix} | NewsDarshan`,
      description: `Explore the complete Hindu Calendar 2027 with daily Panchang${citySuffix ? ` for ${activeCity?.name}, ${activeCity?.country}` : ''}, accurate Tithi, Nakshatra, Choghadiya, Regional Calendars (Marathi, Gujarati, Telugu, Tamil, Bengali), Festivals, and Muhurat.`,
      h1: `Hindu Calendar 2027 & Daily Panchang${citySuffix}`,
      canonicalUrl: `${SITE_URL}/`,
      breadcrumbs: [{ name: 'Home', url: '/' }],
      schemaType: 'WebSite',
      faq: [
        { question: 'What is the Hindu year in 2027?', answer: 'In 2027, the Hindu calendar observes Vikram Samvat 2083-2084 and Shalivahana Shaka 1948-1949.' },
        { question: 'When is Gudi Padwa and Ugadi in 2027?', answer: 'Gudi Padwa and Ugadi fall on Wednesday, April 7, 2027, inaugurating Vikram Samvat 2084 and Chaitra Navratri.' },
        { question: 'When is Diwali celebrated in 2027?', answer: 'Diwali (Deepavali & Lakshmi Puja) is celebrated on Monday, November 8, 2027.' },
        { question: 'How is Daily Panchang calculated on NewsDarshan?', answer: 'NewsDarshan computes daily Panchang using precise Surya Siddhanta and modern topocentric astronomical algorithms for 100+ cities worldwide across USA, Canada, UK, Europe, Middle East, Australia, and India.' }
      ]
    };
  }

  // 2. Today Page
  if (cleanPath === '/today' || cleanPath === '/today-panchang') {
    const cityText = activeCity ? ` in ${activeCity.name} (${activeCity.country})` : '';
    return {
      title: `Today Panchang${cityText} – Tithi, Nakshatra, Choghadiya & Muhurat | NewsDarshan`,
      description: `Check today's real-time Hindu date, Tithi, Nakshatra, Yoga, Karana, Sunrise, Sunset, Rahu Kaal, Abhijit Muhurat, and Shubh Choghadiya${activeCity ? ` for ${activeCity.name}, ${activeCity.state}, ${activeCity.country} (${activeCity.timezone})` : ' for your city'}.`,
      h1: `Today's Panchang & Hindu Calendar${activeCity ? ` (${activeCity.name})` : ''}`,
      canonicalUrl: `${SITE_URL}/today/`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Today Panchang', url: '/today/' }
      ],
      schemaType: 'ItemPage',
      faq: [
        { question: 'What is today\'s Tithi and Paksha?', answer: 'Today\'s tithi is calculated in real-time based on the exact elongation between the Sun and Moon.' },
        { question: 'What is today\'s Rahu Kaal timing?', answer: 'Rahu Kaal is the 90-minute inauspicious window during daytime, which varies based on sunrise time and weekday.' }
      ]
    };
  }

  // 2b. Today Regional Date Pages
  if (cleanPath.startsWith('/today/')) {
    const regMatch = cleanPath.match(/^\/today\/([a-z]+)-date$/);
    if (regMatch) {
      const reg = regMatch[1];
      const capReg = reg.charAt(0).toUpperCase() + reg.slice(1);
      return {
        title: `Today's ${capReg} Date – ${capReg} Month, Tithi & Panchang | NewsDarshan`,
        description: `Check today's exact date in the ${capReg} calendar, including ${capReg} month, Tithi, Paksha, Nakshatra, and auspicious muhurat timings.`,
        h1: `Today's ${capReg} Date & Panchang`,
        canonicalUrl: `${SITE_URL}/today/${reg}-date/`,
        breadcrumbs: [
          { name: 'Home', url: '/' },
          { name: 'Today', url: '/today/' },
          { name: `${capReg} Date`, url: `/today/${reg}-date/` }
        ]
      };
    }
  }

  // 3. Hindu Calendar 2027 Full Year
  if (cleanPath === '/hindu-calendar-2027') {
    return {
      title: 'Hindu Calendar 2027 – Complete 12 Months, Festivals, Vrat & Tithi',
      description: 'Comprehensive 2027 Hindu Calendar featuring all 12 months (January to December 2027), Hindu festivals, Ekadashi, Purnima, Amavasya, Sankranti, and Shubh Muhurat.',
      h1: 'Hindu Calendar 2027 (हिन्दू पंचांग २०२७)',
      canonicalUrl: `${SITE_URL}/hindu-calendar-2027/`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Hindu Calendar 2027', url: '/hindu-calendar-2027/' }
      ],
      schemaType: 'CollectionPage',
      faq: [
        { question: 'Which major festivals fall in Hindu Calendar 2027?', answer: 'Major festivals in 2027 include Makar Sankranti (Jan 14), Maha Shivratri (Feb 25), Holi (Mar 22), Gudi Padwa/Ugadi (Apr 7), Ram Navami (Apr 16), Raksha Bandhan (Aug 17), Janmashtami (Aug 25), Ganesh Chaturthi (Sep 5), Navratri (Oct 1), Dussehra (Oct 10), and Diwali (Nov 8).' },
        { question: 'Which Samvat years correspond to 2027?', answer: 'Vikram Samvat 2083 transitions to Vikram Samvat 2084 in April 2027, and Shalivahana Shaka 1948 transitions to Shaka 1949.' }
      ]
    };
  }

  // 4. Monthly & City Calendar Pages: /hindu-calendar-2027/:month, /hindu-calendar-2027/:city, /hindu-calendar-2027/:city/:month
  const cityMonthMatch = cleanPath.match(/^\/hindu-calendar-2027\/([a-z0-9-]+)(?:\/([a-z0-9-]+))?$/);
  if (cityMonthMatch) {
    const param1 = cityMonthMatch[1].toLowerCase();
    const param2 = cityMonthMatch[2]?.toLowerCase();

    // Check if param1 is a month
    if (MONTH_NAMES.includes(param1) && !param2) {
      const m = param1;
      const mDisplay = MONTH_DISPLAY_NAMES[m];
      return {
        title: `Hindu Calendar 2027 ${mDisplay} – Festivals, Tithi, Panchang & Vrat`,
        description: `Complete ${mDisplay} 2027 Hindu Calendar with daily dates, Tithis, Pakshas, Nakshatras, Ekadashi, Purnima, Amavasya, festivals, and auspicious muhurats.`,
        h1: `Hindu Calendar ${mDisplay} 2027 (पंचांग)`,
        canonicalUrl: `${SITE_URL}/hindu-calendar-2027/${m}/`,
        breadcrumbs: [
          { name: 'Home', url: '/' },
          { name: 'Hindu Calendar 2027', url: '/hindu-calendar-2027/' },
          { name: mDisplay, url: `/hindu-calendar-2027/${m}/` }
        ],
        schemaType: 'ItemPage'
      };
    }

    // Check if param1 is a city and param2 is a month
    const foundCity1 = CITIES.find(
      (c) => c.id.toLowerCase() === param1 || c.id.toLowerCase().replace(/[^a-z0-9]/g, '') === param1.replace(/[^a-z0-9]/g, '')
    );
    if (foundCity1) {
      if (param2 && MONTH_NAMES.includes(param2)) {
        return getCitySEOMetadata(foundCity1, 'calendar', param2, '2027');
      }
      if (!param2) {
        return getCitySEOMetadata(foundCity1, 'calendar', undefined, '2027');
      }
    }

    // Check if param1 is a month and param2 is a city
    if (MONTH_NAMES.includes(param1) && param2) {
      const foundCity2 = CITIES.find(
        (c) => c.id.toLowerCase() === param2 || c.id.toLowerCase().replace(/[^a-z0-9]/g, '') === param2.replace(/[^a-z0-9]/g, '')
      );
      if (foundCity2) {
        return getCitySEOMetadata(foundCity2, 'calendar', param1, '2027');
      }
    }
  }

  // 5. Regional Calendars: /:regional-calendar-2027/ and /:regional-calendar-2027/:month/
  // Also supports duplicate tokens e.g. /telugu-calendar-2027/2027/:month/ or /:reg-calendar-2027/:city/:month
  const regionalMonthMatch = cleanPath.match(/^\/([a-z]+)-calendar(?:-(\d{4}))?(?:\/(?:(\d{4})\/)?([a-z0-9-]+))?(?:\/([a-z0-9-]+))?$/);
  if (regionalMonthMatch) {
    const regKey = regionalMonthMatch[1] as import('../types').RegionalCalendarKey;
    let seg1: string | undefined = regionalMonthMatch[4]?.toLowerCase();
    let seg2: string | undefined = regionalMonthMatch[5]?.toLowerCase();

    // Check if seg1 is redundant "2027"
    if (seg1 === '2027' && seg2) {
      seg1 = seg2;
      seg2 = undefined;
    }

    const regInfo = (REGIONAL_CALENDARS_INFO as Record<string, any>)[regKey];
    if (regInfo) {
      // Check if seg1 is a month
      if (seg1 && MONTH_NAMES.includes(seg1)) {
        const m = seg1;
        const mDisplay = MONTH_DISPLAY_NAMES[m];

        // Specific high-intent optimization for Telugu Calendar January 2027
        if (regKey === 'telugu' && m === 'january') {
          return {
            title: `Telugu Calendar 2027 January (తెలుగు క్యాలెండర్) – Dates, Tithi & Festivals | NewsDarshan`,
            description: `Telugu Calendar January 2027 (తెలుగు క్యాలెండర్ २०२७) with Margasira & Pushya Masam, accurate Tithi, Vaikuntha Ekadashi, Bhogi, Makara Sankranti / Pedda Panduga, Kanuma, and Shubh Muhurat.`,
            h1: `Telugu Calendar January 2027 (తెలుగు క్యాలెండర్ 2027)`,
            canonicalUrl: `${SITE_URL}/telugu-calendar-2027/january/`,
            breadcrumbs: [
              { name: 'Home', url: '/' },
              { name: 'Telugu Calendar 2027', url: '/telugu-calendar-2027/' },
              { name: 'January 2027', url: '/telugu-calendar-2027/january/' }
            ],
            schemaType: 'ItemPage',
            faq: [
              {
                question: 'Which Telugu months fall in January 2027?',
                answer: 'January 2027 in the Telugu calendar covers the latter part of Margasira Masam (Krishna Paksham) and the beginning of Pushya Masam (Shukla and Krishna Paksham).'
              },
              {
                question: 'When is Makara Sankranti and Kanuma in Telugu Calendar 2027?',
                answer: 'In January 2027, Bhogi is observed on January 13, Makara Sankranti (Pedda Panduga) is celebrated on January 14, and Kanuma falls on January 15, 2027.'
              },
              {
                question: 'When is Vaikuntha Ekadashi in January 2027?',
                answer: 'Vaikuntha Ekadashi (Mukkoti Ekadashi) is observed during Pushya Shukla Ekadashi in early 2027 with special Uttaradwara darshanam timings.'
              },
              {
                question: 'How are Telugu calendar Tithis calculated on NewsDarshan?',
                answer: 'NewsDarshan calculates authentic Amanta-lunar calendar tithis based on high-precision planetary ephemeris, showing Shukla and Krishna Paksham with accurate end times.'
              }
            ]
          };
        }

        return {
          title: `${regInfo.name} 2027 ${mDisplay} – ${regInfo.nativeName} Dates, Tithi & Festivals`,
          description: `Detailed ${mDisplay} 2027 ${regInfo.name} with regional month names, daily Tithis, fasting observances, regional festivals, and Panchang.`,
          h1: `${regInfo.name} ${mDisplay} 2027 (${regInfo.nativeName})`,
          canonicalUrl: `${SITE_URL}/${regKey}-calendar-2027/${m}/`,
          breadcrumbs: [
            { name: 'Home', url: '/' },
            { name: regInfo.name, url: `/${regKey}-calendar-2027/` },
            { name: mDisplay, url: `/${regKey}-calendar-2027/${m}/` }
          ]
        };
      }

      // Check if seg1 is a city (e.g. /telugu-calendar-2027/newyork)
      if (seg1) {
        const foundCity = CITIES.find(
          (c) => c.id.toLowerCase() === seg1 || c.id.toLowerCase().replace(/[^a-z0-9]/g, '') === seg1?.replace(/[^a-z0-9]/g, '')
        );
        if (foundCity) {
          const m = seg2 && MONTH_NAMES.includes(seg2) ? seg2 : undefined;
          const mDisplay = m ? MONTH_DISPLAY_NAMES[m] : '';
          return {
            title: `${regInfo.name} 2027${mDisplay ? ` ${mDisplay}` : ''} ${foundCity.name} – ${foundCity.country} | NewsDarshan`,
            description: `${regInfo.name} 2027${mDisplay ? ` for ${mDisplay}` : ''} in ${foundCity.name}, ${foundCity.country}. Astronomical Tithi, regional festivals, and muhurat timings in ${foundCity.timezone}.`,
            h1: `${regInfo.name} 2027${mDisplay ? ` ${mDisplay}` : ''} – ${foundCity.name}`,
            canonicalUrl: `${SITE_URL}/${regKey}-calendar-2027/${foundCity.id}/${m ? `${m}/` : ''}`,
            breadcrumbs: [
              { name: 'Home', url: '/' },
              { name: `${regInfo.name} 2027`, url: `/${regKey}-calendar-2027/` },
              { name: foundCity.name, url: `/${regKey}-calendar-2027/${foundCity.id}/` },
              ...(mDisplay ? [{ name: mDisplay, url: `/${regKey}-calendar-2027/${foundCity.id}/${m}/` }] : [])
            ]
          };
        }
      }

      return {
        title: `${regInfo.name} 2027 – ${regInfo.nativeName}, Festivals, Tithi & Panchang`,
        description: `Explore the complete ${regInfo.name} (${regInfo.eraName}), featuring authentic regional months, major festivals, Ekadashi, Purnima, Amavasya, and daily Panchang.`,
        h1: `${regInfo.name} (${regInfo.nativeName})`,
        canonicalUrl: `${SITE_URL}/${regKey}-calendar-2027/`,
        breadcrumbs: [
          { name: 'Home', url: '/' },
          { name: regInfo.name, url: `/${regKey}-calendar-2027/` }
        ]
      };
    }
  }

  // 6. Panchang Hub and Specific Date: /panchang/ or /panchang/2027/january/1/
  if (cleanPath === '/panchang') {
    return {
      title: 'Vedic Panchang 2027 – Daily Tithi, Nakshatra, Yoga, Karana & Choghadiya',
      description: 'Accurate Vedic Panchang with Tithi, Nakshatra, Yoga, Karana, Rahu Kaal, Yamaganda, Gulika Kaal, Abhijit Muhurat, and Sunrise-Sunset times for all major Indian cities.',
      h1: 'Vedic Panchang & Astronomical Calendar 2027',
      canonicalUrl: `${SITE_URL}/panchang/`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Panchang', url: '/panchang/' }
      ],
      schemaType: 'ItemPage'
    };
  }

  const panchangDateMatch = cleanPath.match(/^\/panchang\/(\d{4})\/([a-z]+)\/(\d{1,2})$/);
  if (panchangDateMatch) {
    const [, yr, m, d] = panchangDateMatch;
    const mDisplay = MONTH_DISPLAY_NAMES[m] || m;
    return {
      title: `${mDisplay} ${d}, ${yr} Panchang – Tithi, Nakshatra, Choghadiya & Hindu Calendar`,
      description: `Complete Vedic Panchang for ${mDisplay} ${d}, ${yr} featuring accurate Tithi, Nakshatra, Yoga, Karana, Shubh Muhurat, Rahu Kaal, and Choghadiya table.`,
      h1: `${mDisplay} ${d}, ${yr} Panchang – Tithi, Nakshatra & Choghadiya`,
      canonicalUrl: `${SITE_URL}/panchang/${yr}/${m}/${d}/`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Panchang', url: '/panchang/' },
        { name: `${mDisplay} ${yr}`, url: `/hindu-calendar-${yr}/${m}/` },
        { name: `${mDisplay} ${d}`, url: `/panchang/${yr}/${m}/${d}/` }
      ]
    };
  }

  // 7. Choghadiya
  if (cleanPath === '/choghadiya') {
    return {
      title: "Today's Choghadiya – Day & Night Auspicious Timings | NewsDarshan",
      description: "Real-time Day and Night Choghadiya calculator for today and tomorrow. Check Shubh, Labh, Amrit, Chal, Rog, Kaal, and Udveg muhurats adjusted for local sunrise.",
      h1: "Today's Choghadiya Muhurat (चौघड़िया)",
      canonicalUrl: `${SITE_URL}/choghadiya/`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Choghadiya', url: '/choghadiya/' }
      ]
    };
  }

  // 8. Festivals Hub: /festivals/ & /festivals/2027/
  if (cleanPath === '/festivals' || cleanPath === '/festivals/2027') {
    return {
      title: 'Hindu Festivals 2027 – Complete Calendar, Dates & Puja Timings',
      description: 'Comprehensive list of Hindu Festivals 2027 with exact dates, tithis, puja vidhi, shubh muhurat, and regional celebrations across India.',
      h1: 'Hindu Festivals 2027 (त्यौहार एवं पर्व)',
      canonicalUrl: `${SITE_URL}/festivals/2027/`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Festivals 2027', url: '/festivals/2027/' }
      ]
    };
  }

  // 9. Festival Detail: /festivals/:slug
  const festMatch = cleanPath.match(/^\/festivals\/([a-z0-9-]+)$/);
  if (festMatch) {
    const slug = festMatch[1];
    const fest = FESTIVALS_2027.find((f) => f.slug === slug);
    if (fest) {
      return {
        title: `${fest.name} 2027 – Date, Puja Muhurat, Vidhi & Significance | NewsDarshan`,
        description: `Everything you need to know about ${fest.name} 2027 on ${fest.date2027} (${fest.dayOfWeek2027}). Shubh puja timings, rituals, Katha, significance, and regional customs.`,
        h1: `${fest.name} 2027 (${fest.nameHi || fest.name})`,
        canonicalUrl: `${SITE_URL}/festivals/${fest.slug}/`,
        breadcrumbs: [
          { name: 'Home', url: '/' },
          { name: 'Festivals', url: '/festivals/2027/' },
          { name: fest.name, url: `/festivals/${fest.slug}/` }
        ],
        schemaType: 'Event'
      };
    }
  }

  // 10. Vrat Hub: /vrat/ & /vrat/2027/
  if (cleanPath === '/vrat' || cleanPath === '/vrat/2027') {
    return {
      title: 'Hindu Vrat & Upvas 2027 – Sacred Deities, Fasting Days, Dates & Rules | NewsDarshan',
      description: 'Comprehensive directory of sacred Hindu Vrats in 2027: Sankashti Chaturthi, Pradosh, Vinayaka Chaturthi, Mahadwadashi, Masik Shivratri, Sawan Somwar, Satyanarayan, Navagraha, Skanda Sashti, Shradh, Durgashtami, Kalashtami, Rohini Vrat, Sankranti, and Chaturmasa.',
      h1: 'Hindu Vrat, Deities & Upvas Calendar 2027 (व्रत एवं उपवास)',
      canonicalUrl: `${SITE_URL}/vrat/`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Vrat & Deities', url: '/vrat/' }
      ]
    };
  }

  // 10b. Specific Deity Observances
  const deitySeoMap: Record<string, { title: string; desc: string; h1: string }> = {
    'sankashti-chaturthi': {
      title: 'Sankashti Chaturthi 2027 Dates & Moonrise Timings (Lord Vinayaka) | NewsDarshan',
      desc: 'All 12 Sankashti Chaturthi dates for 2027 with exact city-wise Moonrise (Chandrodaya) timings, Angarki Chaturthi dates, Lord Ganesha puja vidhi, and fasting rules.',
      h1: 'Sankashti Chaturthi 2027 Dates & Moonrise Time'
    },
    'vinayaka-chaturthi': {
      title: 'Vinayaka Chaturthi 2027 Dates & Midday Puja Muhurat (Lord Vinayaka) | NewsDarshan',
      desc: 'Shukla Paksha Vinayaka Chaturthi 2027 dates with exact Madhyahna puja muhurat windows, Ganesha Atharvashirsha vidhi, and monthly fast guidelines.',
      h1: 'Vinayaka Chaturthi 2027 Dates & Madhyahna Puja'
    },
    'pradosham-dates': {
      title: 'Pradosham Dates 2027 (Lord Shiva) – Trayodashi Pradosh Kaal Muhurat | NewsDarshan',
      desc: 'Complete list of Pradosham dates in 2027 for Lord Shiva and Parvati. Shani Pradosham, Soma Pradosham, Bhauma Pradosh, and evening Shiva Lingam Abhishek rules.',
      h1: 'Pradosham Dates 2027 (प्रदोष व्रत तिथियाँ)'
    },
    'dwadashi-mahadwadashi': {
      title: 'Dwadashi & Mahadwadashi 2027 Dates (Lord Vishnu on Garuda) | NewsDarshan',
      desc: 'All Dwadashi dates in 2027 with exact Ekadashi Parana windows and the 8 Shastric Mahadwadashis (Trisprisha, Unmilani, Pakshavardhini, Jaya, Vijaya).',
      h1: 'Dwadashi Dates & Mahadwadashi 2027'
    },
    'masik-shivaratri-sawan-somwar': {
      title: 'Masik Shivaratri & Sawan Somwar Days 2027 (Lord Shiva) | NewsDarshan',
      desc: 'Monthly Masik Shivaratri 2027 dates with Nishita Kaal midnight puja muhurats, plus Sawan Somwar (Shravana Monday) fast schedules and Rudrabhishek vidhi.',
      h1: 'Masik Shivaratri & Sawan Somwar 2027'
    },
    'satyanarayan-dvatrinshi-purnima': {
      title: 'Satyanarayana Vrat 2027 & Dvatrinshi Purnima Katha (Shree Satyanarayan) | NewsDarshan',
      desc: 'Monthly Satyanarayan Vrat dates for 2027 with Purnima moonrise timings, the 32 sacred Dvatrinshi Purnima Kathas, and Panchamrit puja vidhi.',
      h1: 'Satyanarayana Vrat & Dvatrinshi Purnima Katha 2027'
    }
  };

  const matchedDeitySeo = Object.keys(deitySeoMap).find((k) => cleanPath === `/${k}` || cleanPath === `/vrat/${k}` || cleanPath === `/${k}/2027`);
  if (matchedDeitySeo) {
    const meta = deitySeoMap[matchedDeitySeo];
    return {
      title: meta.title,
      description: meta.desc,
      h1: meta.h1,
      canonicalUrl: `${SITE_URL}/vrat/${matchedDeitySeo}/`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Vrat', url: '/vrat/' },
        { name: meta.h1, url: `/vrat/${matchedDeitySeo}/` }
      ]
    };
  }

  // 11. Ekadashi: /ekadashi/ & /ekadashi/2027/
  if (cleanPath === '/ekadashi' || cleanPath === '/ekadashi/2027') {
    return {
      title: 'Ekadashi 2027 – Complete List of All 24 Ekadashi Dates & Parana Timings',
      description: 'Find all 24 Ekadashi dates for 2027 with exact Parana time, tithi, vrat significance, and ritual guidelines (Nirjala, Devshayani, Papmochani, Putrada, etc.).',
      h1: 'Ekadashi 2027 (एकादशी व्रत सूची एवं पारणा मुहूर्त)',
      canonicalUrl: `${SITE_URL}/ekadashi/2027/`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Ekadashi 2027', url: '/ekadashi/2027/' }
      ]
    };
  }

  // 12. Purnima: /purnima/ & /purnima/2027/
  if (cleanPath === '/purnima' || cleanPath === '/purnima/2027') {
    return {
      title: 'Purnima 2027 Dates – Full Moon Days, Tithi & Moonrise Times',
      description: 'Complete schedule of all Purnima dates in 2027 with exact tithi beginning and ending times, moonrise timings, and religious significance.',
      h1: 'Purnima 2027 (पूर्णिमा व्रत एवं तिथियाँ)',
      canonicalUrl: `${SITE_URL}/purnima/2027/`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Purnima 2027', url: '/purnima/2027/' }
      ]
    };
  }

  // 13. Amavasya: /amavasya/ & /amavasya/2027/
  if (cleanPath === '/amavasya' || cleanPath === '/amavasya/2027') {
    return {
      title: 'Amavasya 2027 Dates – New Moon Days, Tithi & Pitru Tarpan Timings',
      description: 'All Amavasya dates in 2027 with tithi timings, Mauni Amavasya, Somvati Amavasya, Sarva Pitru Amavasya, and Shradh rules.',
      h1: 'Amavasya 2027 (अमावस्या तिथियाँ एवं पितृ तर्पण)',
      canonicalUrl: `${SITE_URL}/amavasya/2027/`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Amavasya 2027', url: '/amavasya/2027/' }
      ]
    };
  }

  // 14. Muhurat Hub & Categories
  if (cleanPath === '/muhurat') {
    return {
      title: 'Shubh Muhurat 2027 – Auspicious Dates for Marriage, Griha Pravesh & Vehicle',
      description: 'Find auspicious Vedic Muhurats for 2027: Vivah / Marriage, Griha Pravesh (Housewarming), Vehicle Purchase, Property Registration, Namkaran, and Business Opening.',
      h1: 'Shubh Muhurat 2027 (शुभ मुहूर्त)',
      canonicalUrl: `${SITE_URL}/muhurat/`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Muhurat', url: '/muhurat/' }
      ]
    };
  }

  const muhuratCategory = MUHURATS_2027.find((m) => `/${m.slug}` === cleanPath);
  if (muhuratCategory) {
    return {
      title: `${muhuratCategory.title} – Dates, Timings & Astrological Rules | NewsDarshan`,
      description: `Discover all verified ${muhuratCategory.title} with exact nakshatras, tithis, time windows, and astrological guidelines for maximum prosperity.`,
      h1: muhuratCategory.title,
      canonicalUrl: `${SITE_URL}/${muhuratCategory.slug}/`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Muhurat', url: '/muhurat/' },
        { name: muhuratCategory.title, url: `/${muhuratCategory.slug}/` }
      ]
    };
  }

  // 15. Government Holidays: /holidays/2027/
  if (cleanPath === '/holidays/2027' || cleanPath.startsWith('/holidays/2027/')) {
    const stateMatch = cleanPath.match(/^\/holidays\/2027\/([a-z-]+)$/);
    const stateName = stateMatch ? stateMatch[1].replace('-', ' ').toUpperCase() : 'India';
    return {
      title: `Government Holidays 2027 ${stateName} – Public & Gazetted Holidays List`,
      description: `Complete list of Central and State Government Holidays in 2027 for ${stateName}, including gazetted and restricted holidays.`,
      h1: `Government Holidays 2027 (${stateName})`,
      canonicalUrl: `${SITE_URL}${cleanPath}/`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Holidays 2027', url: '/holidays/2027/' }
      ]
    };
  }

  // 16. Bank Holidays: /bank-holidays/2027/
  if (cleanPath === '/bank-holidays/2027' || cleanPath.startsWith('/bank-holidays/2027/')) {
    const stateMatch = cleanPath.match(/^\/bank-holidays\/2027\/([a-z-]+)$/);
    const stateName = stateMatch ? stateMatch[1].replace('-', ' ').toUpperCase() : 'India';
    return {
      title: `Bank Holidays 2027 ${stateName} – RBI State-Wise Bank Holidays Schedule`,
      description: `Official Reserve Bank of India (RBI) Bank Holidays 2027 schedule for ${stateName}. Find when private and public sector banks remain closed.`,
      h1: `Bank Holidays 2027 (${stateName})`,
      canonicalUrl: `${SITE_URL}${cleanPath}/`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Bank Holidays 2027', url: '/bank-holidays/2027/' }
      ]
    };
  }

  // 17. Rashifal Hub & Rashi Pages
  if (cleanPath === '/rashifal' || cleanPath === '/rashifal/daily') {
    return {
      title: "Today's Rashifal – Daily Horoscope for All 12 Zodiac Signs | NewsDarshan",
      description: "Read your daily, weekly, monthly, and 2027 yearly Rashifal for all 12 signs (Aries to Pisces). Personalized Vedic horoscope insights.",
      h1: "Daily Rashifal & Vedic Horoscope (दैनिक राशिफल)",
      canonicalUrl: `${SITE_URL}/rashifal/`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Rashifal', url: '/rashifal/' }
      ]
    };
  }

  const rashiMatch = cleanPath.match(/^\/rashifal\/([a-z]+)-rashi$/);
  if (rashiMatch) {
    const rashiId = rashiMatch[1];
    const rashi = RASHIFAL_DATA.find((r) => r.rashiId === rashiId);
    if (rashi) {
      return {
        title: `${rashi.name} Rashifal Today & 2027 Horoscope – Career, Health & Love`,
        description: `Read accurate ${rashi.name} (${rashi.nameHi}) daily, weekly, monthly and 2027 yearly astrological predictions, lucky colors, numbers, and remedies.`,
        h1: `${rashi.name} Rashifal (${rashi.nameHi} दैनिक राशिफल)`,
        canonicalUrl: `${SITE_URL}/rashifal/${rashi.rashiId}-rashi/`,
        breadcrumbs: [
          { name: 'Home', url: '/' },
          { name: 'Rashifal', url: '/rashifal/' },
          { name: `${rashi.name}`, url: `/rashifal/${rashi.rashiId}-rashi/` }
        ]
      };
    }
  }

  // 18. Baby Names
  if (cleanPath === '/baby-names') {
    return {
      title: 'Hindu Baby Names 2027 – Sanskrit, Modern & Nakshatra Names with Meanings',
      description: 'Explore 5,000+ Hindu baby names for boys and girls filterable by Janma Rashi, Nakshatra syllables, Vedic origins, numerology, and deep spiritual meanings.',
      h1: 'Hindu Baby Names Directory (बच्चों के शुभ नाम)',
      canonicalUrl: `${SITE_URL}/baby-names/`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Baby Names', url: '/baby-names/' }
      ]
    };
  }

  // 19. Tools Hub & Calculators
  if (cleanPath === '/tools') {
    return {
      title: 'Vedic Astrology Tools & Calculators – Kundli, Sade Sati & Tithi | NewsDarshan',
      description: 'Free, instant Vedic calculators: Kundli Milan (36 Gunas), Shani Sade Sati Checker, Manglik Dosha Detector, Hindu Date & Tithi Converter, and Vedic Age Calculator.',
      h1: 'Vedic Astrology Calculators & Hindu Tools',
      canonicalUrl: `${SITE_URL}/tools/`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Tools', url: '/tools/' }
      ],
      schemaType: 'WebApplication',
      faq: [
        { question: 'What tools are available on NewsDarshan?', answer: 'NewsDarshan provides Kundli Gun Milan (36 Gunas), Shani Sade Sati & Dhaiya Tracker, Manglik Dosha (Kuja Dosha) Detector, Gregorian to Hindu Date Converter, and Vedic Solar/Lunar Age Calculator.' },
        { question: 'Are these Vedic calculators accurate?', answer: 'Yes, our calculators implement authentic Ashta Koota algorithms from Brihat Parashara Hora Shastra, accurate Saturn ephemeris tables, and topocentric lunar elongation algorithms.' }
      ]
    };
  }

  // 19b. Individual Vedic Tools SEO (Both Top-Level URLs & /tools/ subpaths)
  if (
    cleanPath === '/kundli-milan' ||
    cleanPath === '/tools/kundli-milan' ||
    cleanPath === '/kundali-milan' ||
    cleanPath === '/guna-milan'
  ) {
    const isDirect = cleanPath === '/kundli-milan';
    return {
      title: 'Kundli Gun Milan Calculator – 36 Guna Match for Marriage | NewsDarshan',
      description: 'Calculate 36 Guna Milan (Ashta Koota) compatibility for marriage. Get instant Varna, Vashya, Tara, Yoni, Maitri, Gana, Bhakoot, and Nadi Dosha scores with remedies.',
      h1: 'Kundli Milan & 36 Guna Match Calculator (कुंडली गुण मिलान)',
      canonicalUrl: `${SITE_URL}/kundli-milan/`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        ...(isDirect ? [] : [{ name: 'Tools', url: '/tools/' }]),
        { name: 'Kundli Milan', url: '/kundli-milan/' }
      ],
      schemaType: 'WebApplication',
      faq: [
        { question: 'How many gunas are needed for a good marriage?', answer: 'A score of 18 or above (out of 36) is considered acceptable. 25–32 is very good, and 33–36 is excellent.' },
        { question: 'What are the 8 Kootas in Kundli Milan?', answer: 'The 8 Kootas are Varna (1), Vashya (2), Tara (3), Yoni (4), Graha Maitri (5), Gana (6), Bhakoot (7), and Nadi (8).' },
        { question: 'What happens if Nadi Dosha is present?', answer: 'Nadi Dosha carries 8 points. If present, it can be neutralized if the Bride and Groom have different Rashi lords or Nakshatra padas.' }
      ]
    };
  }

  if (
    cleanPath === '/sade-sati' ||
    cleanPath === '/shani-sade-sati' ||
    cleanPath === '/tools/sade-sati' ||
    cleanPath === '/tools/shani-sade-sati'
  ) {
    const isDirect = cleanPath === '/sade-sati';
    return {
      title: 'Shani Sade Sati & Dhaiya Checker 2027 – Phase & Vedic Remedies | NewsDarshan',
      description: 'Check if you are under Saturn Sade Sati (7.5 years transit) or Dhaiya (2.5 years) for your Janma Rashi. Discover peak phases, effects, and authentic Vedic remedies.',
      h1: 'Shani Sade Sati & Dhaiya Calculator (शनि साढ़े साती कैलकुलेटर)',
      canonicalUrl: `${SITE_URL}/sade-sati/`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        ...(isDirect ? [] : [{ name: 'Tools', url: '/tools/' }]),
        { name: 'Shani Sade Sati', url: '/sade-sati/' }
      ],
      schemaType: 'WebApplication',
      faq: [
        { question: 'Which rashis have Shani Sade Sati in 2027?', answer: 'In 2027, Saturn resides in Pisces (Meena Rashi), so Kumbha (Aquarius - setting phase), Meena (Pisces - peak second phase), and Mesha (Aries - rising first phase) experience Sade Sati.' },
        { question: 'What is Shani Dhaiya?', answer: 'Shani Dhaiya is a 2.5-year transit when Saturn aspects the 4th (Kantaka) or 8th (Ashtama) house from your Janma Rashi.' },
        { question: 'What are effective remedies for Shani Sade Sati?', answer: 'Light mustard oil lamps under Peepal trees on Saturdays, recite Hanuman Chalisa daily, and donate black sesame and blankets to the needy.' }
      ]
    };
  }

  if (
    cleanPath === '/date-converter' ||
    cleanPath === '/tithi-converter' ||
    cleanPath === '/hindu-date-converter' ||
    cleanPath === '/tools/date-converter' ||
    cleanPath === '/tools/tithi-converter' ||
    cleanPath === '/tools/hindu-date-converter'
  ) {
    const isDirect = cleanPath === '/date-converter';
    return {
      title: 'Hindu Date & Tithi Converter – Gregorian to Vikram Samvat & Tithi | NewsDarshan',
      description: 'Convert any English calendar date into the exact Hindu lunar date, Tithi, Paksha (Shukla/Krishna), Hindu Month, Nakshatra, and Vikram/Shaka Samvat.',
      h1: 'Hindu Date & Tithi Converter (हिन्दू तिथि कनवर्टर)',
      canonicalUrl: `${SITE_URL}/date-converter/`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        ...(isDirect ? [] : [{ name: 'Tools', url: '/tools/' }]),
        { name: 'Hindu Date Converter', url: '/date-converter/' }
      ],
      schemaType: 'WebApplication',
      faq: [
        { question: 'How do you convert English date to Hindu Tithi?', answer: 'By computing the astronomical celestial longitude of the Sun and Moon for that date, our engine calculates the exact 12-degree lunar elongation and corresponding Tithi & Paksha.' },
        { question: 'What Hindu Masa systems are supported?', answer: 'Our converter supports both Purnimanta (North Indian month ending on Purnima) and Amavasyanta (South/West Indian month ending on Amavasya) systems.' }
      ]
    };
  }

  if (
    cleanPath === '/vedic-age-calculator' ||
    cleanPath === '/vedic-age' ||
    cleanPath === '/tools/vedic-age-calculator' ||
    cleanPath === '/tools/vedic-age'
  ) {
    const isDirect = cleanPath === '/vedic-age-calculator';
    return {
      title: 'Vedic Solar & Lunar Age Calculator – Calculate Tithi Birthday | NewsDarshan',
      description: 'Calculate your exact Vedic age in solar years, completed lunar months, total days lived, and determine your traditional Hindu Tithi Janmadin (Lunar Birthday).',
      h1: 'Vedic Solar & Lunar Age Calculator (वैदिक सौर-चंद्र आयु)',
      canonicalUrl: `${SITE_URL}/vedic-age-calculator/`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        ...(isDirect ? [] : [{ name: 'Tools', url: '/tools/' }]),
        { name: 'Vedic Age Calculator', url: '/vedic-age-calculator/' }
      ],
      schemaType: 'WebApplication',
      faq: [
        { question: 'What is a Vedic Lunar Birthday (Tithi Janmadin)?', answer: 'In Hindu tradition, your birthday is celebrated on the exact Tithi (e.g. Shukla Ashtami) of the lunar month (e.g. Chaitra) in which you were born, rather than the Gregorian date.' },
        { question: 'How many days is a Vedic lunar month?', answer: 'A synodic lunar month averages 29.53059 days, completing 12 lunar months in 354.36 days compared to the solar 365.25 days.' }
      ]
    };
  }

  if (
    cleanPath === '/manglik-dosha' ||
    cleanPath === '/kuja-dosha' ||
    cleanPath === '/tools/manglik-dosha' ||
    cleanPath === '/tools/kuja-dosha'
  ) {
    const isDirect = cleanPath === '/manglik-dosha';
    return {
      title: 'Manglik Dosha (Kuja Dosha) Checker – Anshik Mangal & Remedies | NewsDarshan',
      description: 'Detect Manglik Dosha (Kuja Dosha) based on Mars placement in 1st, 4th, 7th, 8th, or 12th houses. Learn cancellation rules and Vedic remedies for marriage harmony.',
      h1: 'Manglik Dosha Calculator (मांगलिक दोष कैलकुलेटर)',
      canonicalUrl: `${SITE_URL}/manglik-dosha/`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        ...(isDirect ? [] : [{ name: 'Tools', url: '/tools/' }]),
        { name: 'Manglik Dosha', url: '/manglik-dosha/' }
      ],
      schemaType: 'WebApplication',
      faq: [
        { question: 'Which houses create Manglik Dosha?', answer: 'In Vedic astrology, Mars (Mangal) placed in the 1st (Lagna), 4th, 7th, 8th, or 12th house from the Ascendant or Moon creates Manglik Dosha.' },
        { question: 'What is Anshik Manglik Dosha?', answer: 'Anshik or mild Manglik Dosha occurs when Mars is in the 1st or 12th house and receives benefic aspects, which reduces its malefic effect after age 28.' },
        { question: 'How is Kuja Dosha cancelled in horoscope matching?', answer: 'If both partners are Manglik, or if Jupiter/Venus is strongly aspecting Mars, the dosha is traditionally considered neutralized.' }
      ]
    };
  }

  // 19c. Temples Directory & Individual Temples SEO
  if (cleanPath === '/temples') {
    return {
      title: 'Famous Hindu Temples in India – Aarti Timetable, Darshan & Dress Codes | NewsDarshan',
      description: 'Comprehensive directory of 50+ famous Hindu pilgrimage temples: 12 Jyotirlingas, Char Dham, Shakti Peethas, Darshan hours, live Aarti schedules, VIP pass details, and dress codes.',
      h1: 'Famous Hindu Temples & Darshan Guide (पवित्र तीर्थ दर्शन)',
      canonicalUrl: `${SITE_URL}/temples/`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Temples', url: '/temples/' }
      ],
      faq: [
        { question: 'What temples are featured in NewsDarshan Directory?', answer: 'We feature 12 Jyotirlingas (Kashi, Somnath, Mahakal, Kedarnath), Char Dham (Badrinath, Dwarka, Puri, Rameswaram), Tirupati Balaji, Vaishno Devi, Siddhivinayak, and Ayodhya Ram Mandir.' },
        { question: 'Are daily Aarti and Darshan timings verified?', answer: 'Yes, temple timings and dress codes are curated directly from verified temple trust administrations and updated regularly.' }
      ]
    };
  }

  const templeMatch = cleanPath.match(/^\/temples\/([a-z0-9-]+)$/);
  if (templeMatch) {
    const tId = templeMatch[1];
    const temple = FAMOUS_TEMPLES.find((t) => t.id === tId);
    if (temple) {
      const timingsStr = `${temple.morningOpen} – ${temple.morningClose}, ${temple.eveningOpen} – ${temple.eveningClose}`;
      const locationStr = `${temple.city}, ${temple.state}${temple.country ? `, ${temple.country}` : ', India'}`;
      return {
        title: `${temple.name} (${temple.nameHi}) – Darshan Timings, Daily Aarti Schedule & Rules | NewsDarshan`,
        description: `Complete pilgrim guide for ${temple.name} in ${locationStr}. Check daily morning (${temple.morningOpen}–${temple.morningClose}) & evening (${temple.eveningOpen}–${temple.eveningClose}) darshan timings, ${temple.aartis.length} daily Aartis, dress code, and significance.`,
        ogTitle: `${temple.name} (${temple.nameHi}) – Darshan & Aarti Guide`,
        ogDescription: `Verified Darshan hours, daily Aarti schedules, dress code guidelines, and sacred prasadam for ${temple.name} (${locationStr}).`,
        h1: `${temple.name} (${temple.nameHi}) – Darshan & Aarti Guide`,
        canonicalUrl: `${SITE_URL}/temples/${temple.id}/`,
        schemaType: 'Place',
        breadcrumbs: [
          { name: 'Home', url: '/' },
          { name: 'Hindu Temples', url: '/temples/' },
          { name: temple.name, url: `/temples/${temple.id}/` }
        ],
        faq: [
          {
            question: `What are the daily Darshan timings of ${temple.name}?`,
            answer: `General Darshan at ${temple.name} (${temple.city}) is open during two sessions: Morning from ${temple.morningOpen} to ${temple.morningClose}, and Evening from ${temple.eveningOpen} to ${temple.eveningClose}.`
          },
          {
            question: `What is the Aarti schedule at ${temple.name}?`,
            answer: `${temple.name} features ${temple.aartis.length} primary daily Aartis: ${temple.aartis.map(a => `${a.name} (${a.time})`).join(', ')}.`
          },
          {
            question: `What is the dress code for visiting ${temple.name}?`,
            answer: temple.dressCode
          },
          {
            question: `Which deity is worshipped at ${temple.name} and what is its significance?`,
            answer: `${temple.deity} is the presiding deity. ${temple.significance}`
          },
          {
            question: `What is the best time to visit ${temple.name} and what is the holy Prasad?`,
            answer: `Best visiting period: ${temple.bestTimeToVisit}. Blessed prasadam: ${temple.prasadam}.`
          }
        ]
      };
    }
  }

  // 19d. Moon Phase & Chandra Darshan SEO
  if (cleanPath === '/moon-phase' || cleanPath === '/chandra-darshan') {
    return {
      title: "Live Moon Phase Tracker & Vedic Chandra Tithi – Illumination & Moonrise | NewsDarshan",
      description: "Real-time visual Moon Phase tracker: Lunar illumination percentage, current Tithi, Chandra Rashi, 16 Vedic Chandra Kalas, exact Moonrise and Moonset for your city.",
      h1: "Live Moon Phase & Vedic Tithi Tracker (चन्द्र दर्शन एवं तिथि)",
      canonicalUrl: `${SITE_URL}/moon-phase/`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Moon Phase Tracker', url: '/moon-phase/' }
      ],
      faq: [
        { question: 'How is Moon Illumination calculated?', answer: 'Illumination is calculated based on topocentric lunar elongation between the Sun and Moon, varying smoothly from 0% at Amavasya to 100% at Purnima.' },
        { question: 'What are the 16 Chandra Kalas?', answer: 'In Vedic astronomy and Agni Purana, the Moon exhibits 16 subtle Kalas including Amrita, Manada, Poosha, Pushti, Rati, Dhriti, and Purnamrita.' }
      ]
    };
  }

  // 19e. Sun Visualization & Solar Arc SEO
  if (cleanPath === '/sun-visualization' || cleanPath === '/solar-arc') {
    return {
      title: "Live Sun Position & Solar Arc Simulator – Realtime Elevation & Sunset | NewsDarshan",
      description: "Interactive SVG Sun Arc simulator displaying real-time solar elevation, azimuth angles, golden hour windows, solar noon, and sunset countdowns for 30+ cities.",
      h1: "Astronomical Sun Visualization & Solar Arc (सूर्य चाप एवं स्थिति)",
      canonicalUrl: `${SITE_URL}/sun-visualization/`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Sun Visualization', url: '/sun-visualization/' }
      ],
      faq: [
        { question: 'How is the Sun position calculated?', answer: 'The solar elevation and azimuth are computed using topocentric spherical trigonometry based on your city latitude, longitude, and solar declination for the day.' },
        { question: 'What is Solar Noon / Madhyahna?', answer: 'Solar Noon occurs when the sun reaches its highest altitude across the local celestial meridian, coinciding with Abhijit Muhurat.' }
      ]
    };
  }

  // 20. Articles
  const articleMatch = cleanPath.match(/^\/articles\/([a-z0-9-]+)$/);
  if (articleMatch) {
    const slug = articleMatch[1];
    const art = ARTICLES_DATA.find((a) => a.slug === slug);
    if (art) {
      return {
        title: `${art.title} | NewsDarshan Editorial`,
        description: art.excerpt,
        h1: art.title,
        canonicalUrl: `${SITE_URL}/articles/${art.slug}/`,
        breadcrumbs: [
          { name: 'Home', url: '/' },
          { name: 'Articles', url: '/articles/' },
          { name: art.title, url: `/articles/${art.slug}/` }
        ],
        schemaType: 'Article',
        faq: art.faq
      };
    }
  }

  // 21. E-E-A-T Institutional Pages
  if (cleanPath === '/about') {
    return {
      title: 'About NewsDarshan – Dedicated to Authentic Vedic Timekeeping & Panchang',
      description: 'Learn about NewsDarshan mission, editorial leadership, Vedic scholars, and astronomical calculation standards.',
      h1: 'About NewsDarshan',
      canonicalUrl: `${SITE_URL}/about/`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'About Us', url: '/about/' }
      ]
    };
  }

  if (cleanPath === '/editorial-policy') {
    return {
      title: 'Editorial Policy & Accuracy Standards | NewsDarshan',
      description: 'Our rigorous editorial principles for verifying religious dates, astronomical calculations, and zero-hallucination astrological guidance.',
      h1: 'Editorial & Verification Policy',
      canonicalUrl: `${SITE_URL}/editorial-policy/`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Editorial Policy', url: '/editorial-policy/' }
      ]
    };
  }

  if (cleanPath === '/panchang-methodology') {
    return {
      title: 'Panchang Calculation Methodology & Astronomical Data Sources | NewsDarshan',
      description: 'Detailed explanation of how NewsDarshan calculates planetary positions, Tithis, Nakshatras, Sunrise, Sunset, and regional calendars.',
      h1: 'Panchang Methodology & Ephemeris Data',
      canonicalUrl: `${SITE_URL}/panchang-methodology/`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Methodology', url: '/panchang-methodology/' }
      ]
    };
  }

  if (cleanPath === '/contact') {
    return {
      title: 'Contact NewsDarshan – Editorial Desk, Corrections & Inquiries',
      description: 'Get in touch with the NewsDarshan editorial and astrological team for date corrections, feedback, or media partnerships.',
      h1: 'Contact NewsDarshan',
      canonicalUrl: `${SITE_URL}/contact/`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Contact Us', url: '/contact/' }
      ]
    };
  }

  if (cleanPath === '/privacy-policy') {
    return {
      title: 'Privacy Policy | NewsDarshan',
      description: 'NewsDarshan privacy practices, local storage usage for My Rashi and notification settings, and cookie transparency.',
      h1: 'Privacy Policy',
      canonicalUrl: `${SITE_URL}/privacy-policy/`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Privacy Policy', url: '/privacy-policy/' }
      ]
    };
  }

  if (cleanPath === '/terms') {
    return {
      title: 'Terms and Conditions | NewsDarshan',
      description: 'Terms of service governing the usage of NewsDarshan calendar services, calculators, and astrological content.',
      h1: 'Terms and Conditions',
      canonicalUrl: `${SITE_URL}/terms/`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Terms of Use', url: '/terms/' }
      ]
    };
  }

  if (cleanPath === '/disclaimer') {
    return {
      title: 'Astrological & Religious Disclaimer | NewsDarshan',
      description: 'Important legal and cultural disclaimer regarding astrological interpretations, Panchang variations, and religious guidelines.',
      h1: 'Disclaimer',
      canonicalUrl: `${SITE_URL}/disclaimer/`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Disclaimer', url: '/disclaimer/' }
      ]
    };
  }

  if (cleanPath === '/admin') {
    return {
      title: 'NewsDarshan Management Portal',
      description: 'Secure editorial management portal.',
      h1: 'NewsDarshan Management Console',
      canonicalUrl: `${SITE_URL}/admin/`,
      robots: 'noindex, nofollow',
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Admin', url: '/admin/' }
      ]
    };
  }

  // Fallback for general paths
  return {
    title: 'NewsDarshan – Hindu Calendar 2027, Daily Panchang & Vedic Astronomy',
    description: 'Explore the complete Hindu Calendar 2027, daily Panchang, Choghadiya, Regional Calendars, Festivals, Vrat, and Muhurats on NewsDarshan.',
    h1: 'NewsDarshan Vedic Calendar',
    canonicalUrl: `${SITE_URL}${cleanPath}/`,
    breadcrumbs: [{ name: 'Home', url: '/' }]
  };
}

// Generate JSON-LD Schema
export function generateSchemaLD(meta: SEOMetadata): string {
  const schemas: any[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'NewsDarshan',
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      sameAs: [
        'https://twitter.com/newsdarshan',
        'https://facebook.com/newsdarshan'
      ]
    }
  ];

  if (meta.breadcrumbs && meta.breadcrumbs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: meta.breadcrumbs.map((b, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: b.name,
        item: b.url.startsWith('http') ? b.url : `${SITE_URL}${b.url}`
      }))
    });
  }

  if (meta.faq && meta.faq.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: meta.faq.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer
        }
      }))
    });
  }

  if (meta.schemaType === 'Event') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: meta.h1,
      description: meta.description,
      startDate: '2027-01-01',
      eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
      eventStatus: 'https://schema.org/EventScheduled',
      location: {
        '@type': 'VirtualLocation',
        url: meta.canonicalUrl
      }
    });
  }

  if (meta.schemaType === 'Place') {
    // Check if canonicalUrl corresponds to a known City
    const cityMatch = meta.canonicalUrl.match(/\/(?:panchang|choghadiya|city)\/([a-z0-9-]+)\/?$/);
    const matchedCity = cityMatch ? CITIES.find(c => c.id === cityMatch[1]) : null;

    if (matchedCity) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'City',
        name: matchedCity.name,
        address: {
          '@type': 'PostalAddress',
          addressLocality: matchedCity.name,
          addressRegion: matchedCity.state,
          addressCountry: matchedCity.country
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: matchedCity.latitude,
          longitude: matchedCity.longitude
        },
        description: meta.description,
        url: meta.canonicalUrl
      });
    } else {
      const templeMatch = meta.canonicalUrl.match(/\/temples\/([a-z0-9-]+)\/?$/);
      const matchedTemple = templeMatch ? FAMOUS_TEMPLES.find(t => t.id === templeMatch[1]) : null;

      if (matchedTemple) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': ['HinduTemple', 'PlaceOfWorship', 'TouristAttraction'],
          name: matchedTemple.name,
          alternateName: [matchedTemple.nameHi, matchedTemple.deity, matchedTemple.deityHi].filter(Boolean),
          description: matchedTemple.significance,
          url: meta.canonicalUrl,
          address: {
            '@type': 'PostalAddress',
            addressLocality: matchedTemple.city,
            addressRegion: matchedTemple.state,
            addressCountry: matchedTemple.country || 'India'
          },
          publicAccess: true,
          isAccessibleForFree: true,
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
              opens: matchedTemple.morningOpen,
              closes: matchedTemple.morningClose
            },
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
              opens: matchedTemple.eveningOpen,
              closes: matchedTemple.eveningClose
            }
          ]
        });
      } else {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'HinduTemple',
          name: meta.h1,
          description: meta.description,
          url: meta.canonicalUrl
        });
      }
    }
  }

  if (meta.schemaType === 'SoftwareApplication') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: meta.h1,
      description: meta.description,
      applicationCategory: 'AstrologyApplication',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR'
      }
    });
  }

  if (meta.schemaType === 'Article') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: meta.h1,
      description: meta.description,
      mainEntityOfPage: meta.canonicalUrl,
      author: {
        '@type': 'Organization',
        name: 'NewsDarshan Vedic Scholars Desk'
      },
      publisher: {
        '@type': 'Organization',
        name: 'NewsDarshan',
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/logo.png`
        }
      }
    });
  }

  return JSON.stringify(schemas);
}
