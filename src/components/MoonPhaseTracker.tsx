import React, { useState, useMemo } from 'react';
import { LanguageCode, CityInfo, PanchangData } from '../types';
import { getPanchangForDate, CITIES, NAKSHATRA_NAMES, TITHI_NAMES } from '../data/panchangEngine';
import { getUIText, getCityLocalizedName } from '../data/localization';
import {
  Moon,
  Sun,
  Sparkles,
  Compass,
  Calendar,
  Clock,
  MapPin,
  Share2,
  Copy,
  Check,
  ChevronRight,
  ChevronLeft,
  Info,
  Flame,
  ShieldCheck,
  Star,
  Activity
} from 'lucide-react';

export interface MoonPhaseTrackerProps {
  currentLang?: LanguageCode;
  selectedCity?: CityInfo;
  onNavigate?: (path: string) => void;
  className?: string;
  initialDate?: Date;
}

// 16 Vedic Kalas of Chandra (as described in Shatapatha Brahmana & Agni Purana)
const CHANDRA_KALAS = [
  { num: 1, name: 'Amrita (अमृता)', meaning: 'Nectar of immortality, rejuvenates life force' },
  { num: 2, name: 'Manada (मानदा)', meaning: 'Bestower of honor, intellect and clear perception' },
  { num: 3, name: 'Poosha (पूषा)', meaning: 'Nourisher of mental clarity and digestion' },
  { num: 4, name: 'Pushti (पुष्टि)', meaning: 'Bringer of physical vitality and spiritual growth' },
  { num: 5, name: 'Rati (रति)', meaning: 'Awakener of bliss, harmonious relationships and joy' },
  { num: 6, name: 'Dhriti (धृति)', meaning: 'Fortifier of patience, courage and mental endurance' },
  { num: 7, name: 'Sasthini (शशिनी)', meaning: 'Cooling lunar radiance dispelling heat & anxiety' },
  { num: 8, name: 'Chandrika (चन्द्रिका)', meaning: 'Illuminating glow awakening meditative focus' },
  { num: 9, name: 'Kanti (कान्ति)', meaning: 'Aura of grace, beauty and magnetic aura' },
  { num: 10, name: 'Jyotsna (ज्योत्स्ना)', meaning: 'Moonlight expanding subtle consciousness' },
  { num: 11, name: 'Shri (श्री)', meaning: 'Manifestation of prosperity, auspiciousness and Lakshmi' },
  { num: 12, name: 'Priti (प्रीति)', meaning: 'Affection, universal love and devotional surrender' },
  { num: 13, name: 'Angada (अंगदा)', meaning: 'Vital energy restoring cellular rejuvenation' },
  { num: 14, name: 'Purna (पूर्णा)', meaning: 'Fullness of spiritual wisdom and mental wholeness' },
  { num: 15, name: 'Purnamrita (पूर्णामृता)', meaning: 'Supreme fullness brimming with celestial soma' },
  { num: 16, name: 'Chidagni (चिदग्नि / अमा)', meaning: 'Transcendental inner light during Amavasya stillness' }
];

// Zodiac Signs with Sanskrit & English
const ZODIAC_SIGNS = [
  { id: 'mesha', en: 'Aries', sa: 'मेष (Mesha)', element: 'Fire', lord: 'Mars (Mangal)' },
  { id: 'vrishabha', en: 'Taurus', sa: 'वृषभ (Vrishabha)', element: 'Earth', lord: 'Venus (Shukra)' },
  { id: 'mithuna', en: 'Gemini', sa: 'मिथुन (Mithuna)', element: 'Air', lord: 'Mercury (Budha)' },
  { id: 'karka', en: 'Cancer', sa: 'कर्क (Karka)', element: 'Water', lord: 'Moon (Chandra)' },
  { id: 'simha', en: 'Leo', sa: 'सिंह (Simha)', element: 'Fire', lord: 'Sun (Surya)' },
  { id: 'kanya', en: 'Virgo', sa: 'कन्या (Kanya)', element: 'Earth', lord: 'Mercury (Budha)' },
  { id: 'tula', en: 'Libra', sa: 'तुला (Tula)', element: 'Air', lord: 'Venus (Shukra)' },
  { id: 'vrishchika', en: 'Scorpio', sa: 'वृश्चिक (Vrishchika)', element: 'Water', lord: 'Mars (Mangal)' },
  { id: 'dhanu', en: 'Sagittarius', sa: 'धनु (Dhanu)', element: 'Fire', lord: 'Jupiter (Guru)' },
  { id: 'makara', en: 'Capricorn', sa: 'मकर (Makara)', element: 'Earth', lord: 'Saturn (Shani)' },
  { id: 'kumbha', en: 'Aquarius', sa: 'कुम्भ (Kumbha)', element: 'Air', lord: 'Saturn (Shani)' },
  { id: 'meena', en: 'Pisces', sa: 'मीन (Meena)', element: 'Water', lord: 'Jupiter (Guru)' }
];

export default function MoonPhaseTracker({
  currentLang = 'en',
  selectedCity = CITIES[0],
  onNavigate,
  className = '',
  initialDate
}: MoonPhaseTrackerProps) {
  const isMarathi = currentLang === 'mr';
  const isHindi = currentLang === 'hi';
  const isGujarati = currentLang === 'gu';
  const isIndic = isMarathi || isHindi || isGujarati;

  const [activeDate, setActiveDate] = useState<Date>(initialDate || new Date());
  const [selectedDayOffset, setSelectedDayOffset] = useState<number>(0);
  const [activeCity, setActiveCity] = useState<CityInfo>(selectedCity);
  const [activeTab, setActiveTab] = useState<'visual' | 'timeline' | 'shastra'>('visual');
  const [copiedState, setCopiedState] = useState(false);

  // Compute date from selected offset
  const computedDate = useMemo(() => {
    const base = new Date(activeDate);
    base.setDate(base.getDate() + selectedDayOffset);
    return base;
  }, [activeDate, selectedDayOffset]);

  // Compute panchang for the selected date and city
  const panchang: PanchangData = useMemo(() => {
    return getPanchangForDate(computedDate, activeCity.id);
  }, [computedDate, activeCity]);

  // Astronomical Lunar Calculations
  const lunarMetrics = useMemo(() => {
    const tithiNum = panchang.tithi.number; // 1 to 30
    const isShukla = panchang.tithi.paksha === 'Shukla';

    // Elongation angle: 0 deg at Amavasya, 180 deg at Purnima, 360 deg at next Amavasya
    const elongationDegrees = (tithiNum - 1) * 12 + 6; // approximate midpoint of Tithi
    
    // Phase calculation
    let phaseName = '';
    let phaseNameHi = '';
    let phaseNameMr = '';
    let phaseType: 'new' | 'waxing-crescent' | 'first-quarter' | 'waxing-gibbous' | 'full' | 'waning-gibbous' | 'third-quarter' | 'waning-crescent' = 'new';
    
    // Illumination % formula: (1 - cos(elongation)) / 2 * 100
    const illuminationFraction = (1 - Math.cos((elongationDegrees * Math.PI) / 180)) / 2;
    const illuminationPercent = Math.round(illuminationFraction * 100);

    // Moon age in days (synodic month = 29.530588 days)
    const moonAgeDays = ((tithiNum - 1) * (29.53 / 30)).toFixed(1);

    if (tithiNum === 30 || tithiNum === 1) {
      if (tithiNum === 30) {
        phaseName = 'New Moon (Amavasya)';
        phaseNameHi = 'अमावस्या (दर्श चन्द्र)';
        phaseNameMr = 'अमावास्या (नवा चंद्र)';
        phaseType = 'new';
      } else {
        phaseName = 'Waxing Crescent (Pratipada)';
        phaseNameHi = 'शुक्ल प्रतिपदा (बाल चन्द्र)';
        phaseNameMr = 'शुक्ल प्रतिपदा (चंद्र दर्शन)';
        phaseType = 'waxing-crescent';
      }
    } else if (tithiNum < 7) {
      phaseName = 'Waxing Crescent';
      phaseNameHi = 'शुक्ल बाल चन्द्र (वर्धमान)';
      phaseNameMr = 'शुक्ल तृतीया-पंचमी चंद्र';
      phaseType = 'waxing-crescent';
    } else if (tithiNum >= 7 && tithiNum <= 9) {
      phaseName = 'First Quarter (Shukla Ashtami)';
      phaseNameHi = 'प्रथम पाद (शुक्ल अष्टमी)';
      phaseNameMr = 'शुक्ल अष्टमी (अर्धचंद्र)';
      phaseType = 'first-quarter';
    } else if (tithiNum < 15) {
      phaseName = 'Waxing Gibbous';
      phaseNameHi = 'शुक्ल कुब्ज चन्द्र';
      phaseNameMr = 'शुक्ल एकादशी-चतुर्दशी चंद्र';
      phaseType = 'waxing-gibbous';
    } else if (tithiNum === 15) {
      phaseName = 'Full Moon (Purnima)';
      phaseNameHi = 'पूर्णिमा (पूर्ण चन्द्र)';
      phaseNameMr = 'पौर्णिमा (पूर्ण चंद्र)';
      phaseType = 'full';
    } else if (tithiNum < 22) {
      phaseName = 'Waning Gibbous';
      phaseNameHi = 'कृष्ण कुब्ज चन्द्र';
      phaseNameMr = 'कृष्ण प्रतिपदा-सप्तमी चंद्र';
      phaseType = 'waning-gibbous';
    } else if (tithiNum >= 22 && tithiNum <= 24) {
      phaseName = 'Third Quarter (Krishna Ashtami)';
      phaseNameHi = 'तृतीय पाद (कृष्ण अष्टमी)';
      phaseNameMr = 'कृष्ण अष्टमी (अर्धचंद्र)';
      phaseType = 'third-quarter';
    } else {
      phaseName = 'Waning Crescent';
      phaseNameHi = 'कृष्ण क्षीयमाण चन्द्र';
      phaseNameMr = 'कृष्ण एकादशी-चतुर्दशी चंद्र';
      phaseType = 'waning-crescent';
    }

    // Chandra Kala index (1 to 16)
    const kalaIndex = isShukla ? Math.min(14, tithiNum - 1) : tithiNum === 30 ? 15 : Math.max(0, 30 - tithiNum);
    const chandraKala = CHANDRA_KALAS[kalaIndex] || CHANDRA_KALAS[0];

    // Chandra Rashi based on Nakshatra (each rashi spans 2.25 nakshatras)
    const nakshatraIndex = panchang.nakshatra.number - 1; // 0 to 26
    const rashiIndex = Math.floor((nakshatraIndex * 4) / 9) % 12;
    const chandraRashi = ZODIAC_SIGNS[rashiIndex] || ZODIAC_SIGNS[3];

    // Calculate Moon Terminator SVG path
    // We render a circle of radius 60 centered at (75, 75).
    // An elliptical arc determines the terminator line separating light and shadow.
    const cx = 75;
    const cy = 75;
    const r = 60;
    
    // Normalized phase angle [-1 to 1]
    // -1 = New Moon, 0 = Quarter, 1 = Full Moon
    const cosAngle = Math.cos((elongationDegrees * Math.PI) / 180);
    const rX = Math.abs(r * cosAngle);
    
    let lightPath = '';
    const sweepRight = isShukla ? 1 : 0;
    const sweepLeft = isShukla ? 0 : 1;
    
    if (elongationDegrees <= 180) {
      // Waxing (Light on the right side in Northern Hemisphere)
      if (elongationDegrees <= 90) {
        // Waxing Crescent: light is right half minus inner ellipse
        lightPath = `M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} A ${rX} ${r} 0 0 0 ${cx} ${cy - r} Z`;
      } else {
        // Waxing Gibbous: light is right half plus inner ellipse
        lightPath = `M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} A ${rX} ${r} 0 0 1 ${cx} ${cy - r} Z`;
      }
    } else {
      // Waning (Light on the left side)
      if (elongationDegrees <= 270) {
        // Waning Gibbous: light is left half plus inner ellipse
        lightPath = `M ${cx} ${cy - r} A ${r} ${r} 0 0 0 ${cx} ${cy + r} A ${rX} ${r} 0 0 0 ${cx} ${cy - r} Z`;
      } else {
        // Waning Crescent: light is left half minus inner ellipse
        lightPath = `M ${cx} ${cy - r} A ${r} ${r} 0 0 0 ${cx} ${cy + r} A ${rX} ${r} 0 0 1 ${cx} ${cy - r} Z`;
      }
    }

    return {
      elongationDegrees,
      illuminationPercent,
      moonAgeDays,
      phaseName,
      phaseNameHi,
      phaseNameMr,
      phaseType,
      chandraKala,
      chandraRashi,
      lightPath,
      isShukla
    };
  }, [panchang]);

  // 30-Day Timeline Generator for current lunar cycle
  const [timelineFilter, setTimelineFilter] = useState<'all' | 'shukla' | 'krishna' | 'special'>('all');

  const timelineDays = useMemo(() => {
    const days = [];
    const baseDate = new Date(activeDate);
    for (let offset = -5; offset <= 24; offset++) {
      const d = new Date(baseDate);
      d.setDate(d.getDate() + offset);
      const p = getPanchangForDate(d, activeCity.id);
      const isToday = offset === selectedDayOffset;
      const tNum = p.tithi.number;
      const isSpecial = tNum === 11 || tNum === 15 || tNum === 26 || tNum === 30 || tNum === 4 || tNum === 19 || tNum === 13 || tNum === 28;
      
      let badge = '';
      let vratDesc = '';
      if (tNum === 11) {
        badge = isMarathi ? 'शुक्ल एकादशी' : 'Shukla Ekadashi';
        vratDesc = isMarathi ? 'एकादशी उपवास व विष्णू पूजन' : 'Lord Vishnu Fasting & Parana';
      } else if (tNum === 26) {
        badge = isMarathi ? 'कृष्ण एकादशी' : 'Krishna Ekadashi';
        vratDesc = isMarathi ? 'एकादशी उपवास व पारण' : 'Sacred Fasting & Meditation';
      } else if (tNum === 15) {
        badge = isMarathi ? 'पौर्णिमा' : 'Purnima (Full Moon)';
        vratDesc = isMarathi ? 'सत्यनारायण पूजा व दीपदान' : 'Satyanarayan Puja & River Bathing';
      } else if (tNum === 30) {
        badge = isMarathi ? 'अमावास्या' : 'Amavasya (New Moon)';
        vratDesc = isMarathi ? 'पितृ तर्पण, श्राद्ध व दान' : 'Pitru Tarpan, Shradh & Charity';
      } else if (tNum === 4) {
        badge = isMarathi ? 'विनायक चतुर्थी' : 'Vinayaka Chaturthi';
        vratDesc = isMarathi ? 'श्री गणेश पूजन' : 'Ganesh Puja & Modak Offering';
      } else if (tNum === 19) {
        badge = isMarathi ? 'संकष्टी चतुर्थी' : 'Sankashti Chaturthi';
        vratDesc = isMarathi ? 'गणेश व्रत व चंद्र दर्शन' : 'Sankashti Vrat & Moon Arghya';
      } else if (tNum === 13) {
        badge = isMarathi ? 'शुक्ल प्रदोष' : 'Shukla Pradosh';
        vratDesc = isMarathi ? 'शिव प्रदोष व्रत' : 'Twilight Shiva Abhishekam';
      } else if (tNum === 28) {
        badge = isMarathi ? 'कृष्ण प्रदोष' : 'Krishna Pradosh / Shivratri';
        vratDesc = isMarathi ? 'मासिक शिवरात्री व्रत' : 'Monthly Shivratri & Bilva Offering';
      }

      // Quick illumination & phase name
      const elong = (tNum - 1) * 12 + 6;
      const illum = Math.round(((1 - Math.cos((elong * Math.PI) / 180)) / 2) * 100);

      let phaseLabel = '';
      if (tNum === 30) phaseLabel = isMarathi ? 'दर्श / नवी चंद्र (New Moon)' : 'New Moon (Amavasya)';
      else if (tNum === 1) phaseLabel = isMarathi ? 'प्रतिपदा चंद्र (Waxing Crescent)' : 'Waxing Crescent';
      else if (tNum > 1 && tNum < 7) phaseLabel = isMarathi ? 'शुक्ल बालचंद्र (Waxing Crescent)' : 'Waxing Crescent';
      else if (tNum >= 7 && tNum <= 9) phaseLabel = isMarathi ? 'प्रथम पाद (First Quarter)' : 'First Quarter';
      else if (tNum > 9 && tNum < 15) phaseLabel = isMarathi ? 'शुक्ल कुब्ज (Waxing Gibbous)' : 'Waxing Gibbous';
      else if (tNum === 15) phaseLabel = isMarathi ? 'पूर्ण चंद्र (Full Moon)' : 'Full Moon (Purnima)';
      else if (tNum > 15 && tNum < 22) phaseLabel = isMarathi ? 'कृष्ण कुब्ज (Waning Gibbous)' : 'Waning Gibbous';
      else if (tNum >= 22 && tNum <= 24) phaseLabel = isMarathi ? 'तृतीय पाद (Third Quarter)' : 'Third Quarter';
      else phaseLabel = isMarathi ? 'कृष्ण क्षीयमाण (Waning Crescent)' : 'Waning Crescent';

      const weekdayShort = p.dayOfWeek.split(' ')[0];

      days.push({
        offset,
        rawDate: d,
        dateStr: `${d.getDate()} ${d.toLocaleString('default', { month: 'short' })}`,
        fullDateStr: d.toLocaleDateString(isIndic ? 'hi-IN' : 'en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        }),
        weekday: weekdayShort,
        tithiName: p.tithi.name,
        tithiNum: tNum,
        paksha: p.tithi.paksha,
        phaseLabel,
        illumination: illum,
        moonrise: p.moonrise,
        moonset: p.moonset,
        nakshatra: p.nakshatra.name,
        isToday,
        isSpecial,
        badge,
        vratDesc
      });
    }
    return days;
  }, [activeDate, selectedDayOffset, activeCity, isMarathi, isIndic]);

  const filteredTimelineDays = useMemo(() => {
    if (timelineFilter === 'shukla') {
      return timelineDays.filter((d) => d.paksha === 'Shukla');
    }
    if (timelineFilter === 'krishna') {
      return timelineDays.filter((d) => d.paksha === 'Krishna');
    }
    if (timelineFilter === 'special') {
      return timelineDays.filter((d) => d.isSpecial || d.badge);
    }
    return timelineDays;
  }, [timelineDays, timelineFilter]);

  // Copy Lunar Details to Clipboard
  const handleCopy = () => {
    const text = isMarathi
      ? `🌙 *आजचे चंद्र दर्शन व तिथी (${panchang.date})*\n` +
        `• तिथी: ${panchang.tithi.paksha} ${panchang.tithi.name} (तिथी #${panchang.tithi.number})\n` +
        `• चंद्र प्रकाश: ${lunarMetrics.illuminationPercent}%\n` +
        `• चंद्र राशी: ${lunarMetrics.chandraRashi.sa}\n` +
        `• नक्षत्र: ${panchang.nakshatra.name}\n` +
        `• चंद्रोदय: ${panchang.moonrise} | चंद्रास्त: ${panchang.moonset}\n` +
        `• वैदिक कला: ${lunarMetrics.chandraKala.name}\n` +
        `स्त्रोत: NewsDarshan Vedic Panchang (newsdarshan.in)`
      : `🌙 *Today's Moon Phase & Vedic Tithi (${panchang.date})*\n` +
        `• Phase: ${lunarMetrics.phaseName} (${lunarMetrics.illuminationPercent}% Illumination)\n` +
        `• Tithi: ${panchang.tithi.paksha} ${panchang.tithi.name} (Tithi #${panchang.tithi.number})\n` +
        `• Moon Sign (Chandra Rashi): ${lunarMetrics.chandraRashi.sa}\n` +
        `• Nakshatra: ${panchang.nakshatra.name}\n` +
        `• Moonrise: ${panchang.moonrise} | Moonset: ${panchang.moonset}\n` +
        `• Chandra Kala: ${lunarMetrics.chandraKala.name}\n` +
        `Source: NewsDarshan Vedic Panchang (newsdarshan.in)`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedState(true);
      setTimeout(() => setCopiedState(false), 2500);
    }
  };

  return (
    <section className={`rounded-3xl bg-[#0A0E1A] bg-gradient-to-br from-[#0F172A] via-[#161F38] to-[#0A0E1A] text-white p-5 sm:p-8 border-2 border-amber-500/40 shadow-2xl relative overflow-hidden ${className}`}>
      {/* Background Starry Glow Effects */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
      
      {/* Subtle Star Points */}
      <div className="absolute top-8 left-12 w-1 h-1 bg-white rounded-full opacity-60 animate-pulse" />
      <div className="absolute top-20 right-32 w-1.5 h-1.5 bg-amber-200 rounded-full opacity-70 animate-pulse" />
      <div className="absolute bottom-16 right-16 w-1 h-1 bg-cyan-200 rounded-full opacity-50 animate-pulse" />
      <div className="absolute bottom-24 left-1/3 w-1.5 h-1.5 bg-white rounded-full opacity-60 animate-pulse" />

      {/* Header Bar */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-700/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/50 text-xs font-bold text-amber-300 mb-2 shadow-xs">
            <Moon className="w-3.5 h-3.5 fill-amber-300" />
            <span>{isMarathi ? 'वैदिक चंद्र दर्शन व तिथी ट्रॅकर' : isHindi ? 'वैदिक चन्द्र दर्शन एवं तिथि ट्रैकर' : 'Live Vedic Moon Phase & Tithi Tracker'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight text-white">
            {isMarathi
              ? 'आजची तिथी व चंद्र कला दर्शन'
              : isHindi
              ? 'आज की तिथि एवं चन्द्र कला दर्शन'
              : "Today's Moon Phase & Chandra Tithi"}
          </h2>

          <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl font-medium">
            {isMarathi
              ? `${activeCity.name} साठी थेट चंद्रोदय, चंद्रास्त, चंद्राची कला (${lunarMetrics.illuminationPercent}%), चंद्र रास आणि १६ वैदिक कलांचे शास्त्रोक्त विश्लेषण.`
              : `Real-time topocentric lunar illumination (${lunarMetrics.illuminationPercent}%), Moonrise/Moonset in ${activeCity.name}, Chandra Rashi, and 16 Vedic Kalas.`}
          </p>
        </div>

        {/* City Selector & Action Controls */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto shrink-0">
          <div className="relative">
            <select
              value={activeCity.id}
              onChange={(e) => {
                const found = CITIES.find((c) => c.id === e.target.value);
                if (found) setActiveCity(found);
              }}
              className="appearance-none bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl px-3 py-2 pr-8 text-xs font-bold text-amber-200 focus:outline-hidden focus:ring-2 focus:ring-amber-400 cursor-pointer shadow-md"
              aria-label="Select City for Moon Timings"
            >
              {CITIES.slice(0, 15).map((city) => (
                <option key={city.id} value={city.id} className="bg-stone-900 text-white font-medium">
                  📍 {isIndic && city.nameHi ? city.nameHi : city.name}
                </option>
              ))}
            </select>
            <MapPin className="w-3.5 h-3.5 text-amber-300 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white rounded-xl border border-slate-600 transition-all active:scale-95 shadow-md"
            title="Copy lunar details"
          >
            {copiedState ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">{isMarathi ? 'कॉपी झाले!' : 'Copied!'}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-amber-300" />
                <span>{isMarathi ? 'कॉपी' : 'Copy'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="relative z-10 flex flex-wrap items-center gap-2 mt-5 mb-5">
        <button
          type="button"
          onClick={() => setActiveTab('visual')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'visual'
              ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/30 ring-2 ring-amber-300'
              : 'bg-slate-800/90 hover:bg-slate-700 text-stone-200 border border-slate-600'
          }`}
        >
          {isMarathi ? 'चंद्र दृश्य व तिथी' : 'Current Phase & Tithi'}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('timeline')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'timeline'
              ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/30 ring-2 ring-amber-300'
              : 'bg-slate-800/90 hover:bg-slate-700 text-stone-200 border border-slate-600'
          }`}
        >
          {isMarathi ? '३० दिवस चंद्र चक्र' : '30-Day Lunar Cycle'}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('shastra')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'shastra'
              ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/30 ring-2 ring-amber-300'
              : 'bg-slate-800/90 hover:bg-slate-700 text-stone-200 border border-slate-600'
          }`}
        >
          {isMarathi ? '१६ वैदिक कला व रहस्य' : '16 Chandra Kalas & Shastra'}
        </button>
      </div>

      {/* TAB 1: VISUAL MOON & PANCHANG METRICS */}
      {activeTab === 'visual' && (
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Column: Realistic 3D Moon Visualizer (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-5 sm:p-7 rounded-3xl bg-slate-900/90 border-2 border-slate-700/80 shadow-xl relative overflow-hidden group">
            
            {/* Ambient Radial Aura behind Moon */}
            <div
              className={`absolute w-56 h-56 rounded-full blur-2xl transition-all duration-700 pointer-events-none ${
                lunarMetrics.illuminationPercent > 70
                  ? 'bg-amber-300/25 scale-125'
                  : lunarMetrics.illuminationPercent > 30
                  ? 'bg-indigo-300/20 scale-100'
                  : 'bg-indigo-900/30 scale-75'
              }`}
            />

            {/* SVG Rendered Moon Sphere with Crater Texture and Dynamic Terminator */}
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
              <svg viewBox="0 0 150 150" className="w-full h-full drop-shadow-[0_0_35px_rgba(251,191,36,0.35)]">
                <defs>
                  {/* Dark base side of moon */}
                  <radialGradient id="moonDarkBase" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#1E2333" />
                    <stop offset="75%" stopColor="#131722" />
                    <stop offset="100%" stopColor="#0B0D14" />
                  </radialGradient>

                  {/* Illuminated side texture */}
                  <radialGradient id="moonLitBase" cx="45%" cy="40%" r="55%">
                    <stop offset="0%" stopColor="#FFFDF7" />
                    <stop offset="65%" stopColor="#E6DECE" />
                    <stop offset="90%" stopColor="#C8BC9E" />
                    <stop offset="100%" stopColor="#8F8367" />
                  </radialGradient>

                  {/* Mask for clip */}
                  <clipPath id="moonCircleClip">
                    <circle cx="75" cy="75" r="60" />
                  </clipPath>
                </defs>

                {/* Outer Base Sphere */}
                <circle cx="75" cy="75" r="60" fill="url(#moonDarkBase)" stroke="#475569" strokeWidth="1.5" />

                {/* Dark side crater details */}
                <g clipPath="url(#moonCircleClip)" opacity="0.35">
                  <circle cx="55" cy="65" r="14" fill="#0E111A" />
                  <circle cx="85" cy="90" r="18" fill="#0B0E17" />
                  <circle cx="95" cy="50" r="10" fill="#0E111A" />
                  <circle cx="65" cy="105" r="8" fill="#121622" />
                </g>

                {/* Lit Path (Calculated dynamically from Moon phase angle) */}
                {lunarMetrics.illuminationPercent > 0 && (
                  <path
                    d={
                      lunarMetrics.illuminationPercent >= 98
                        ? 'M 75 15 A 60 60 0 1 1 74.9 15 Z'
                        : lunarMetrics.lightPath
                    }
                    fill="url(#moonLitBase)"
                  />
                )}

                {/* Lit Surface Maria & Crater Formations overlay */}
                <g clipPath="url(#moonCircleClip)" opacity={lunarMetrics.illuminationPercent > 5 ? 0.35 : 0}>
                  {/* Sea of Serenity / Mare Serenitatis */}
                  <ellipse cx="68" cy="52" rx="13" ry="9" fill="#887D65" opacity="0.4" />
                  {/* Sea of Tranquility / Mare Tranquillitatis */}
                  <ellipse cx="86" cy="66" rx="15" ry="11" fill="#7C7159" opacity="0.45" />
                  {/* Ocean of Storms / Oceanus Procellarum */}
                  <ellipse cx="45" cy="78" rx="16" ry="22" fill="#82775E" opacity="0.38" />
                  {/* Tycho Crater Ray Center */}
                  <circle cx="82" cy="112" r="5" fill="#FFF9EA" opacity="0.7" />
                  <circle cx="82" cy="112" r="3" fill="#D4C8AE" opacity="0.9" />
                  {/* Copernicus Crater */}
                  <circle cx="56" cy="72" r="4.5" fill="#FFFDF5" opacity="0.6" />
                </g>

                {/* Glowing Outer Rim */}
                <circle
                  cx="75"
                  cy="75"
                  r="60"
                  fill="none"
                  stroke={lunarMetrics.illuminationPercent > 50 ? '#FDE68A' : '#64748B'}
                  strokeWidth="1.5"
                  opacity="0.6"
                />
              </svg>
            </div>

            {/* Phase Badge & Percentage */}
            <div className="mt-4 text-center">
              <div className="text-xl sm:text-2xl font-black font-serif text-amber-300 drop-shadow-sm">
                {isMarathi ? lunarMetrics.phaseNameMr : isIndic && lunarMetrics.phaseNameHi ? lunarMetrics.phaseNameHi : lunarMetrics.phaseName}
              </div>
              <div className="flex items-center justify-center gap-3 mt-2 text-xs text-white font-mono">
                <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black shadow-sm">
                  {lunarMetrics.illuminationPercent}% {isMarathi ? 'प्रकाशित' : 'Illuminated'}
                </span>
                <span>·</span>
                <span className="text-amber-200 font-bold">{isMarathi ? `चंद्र वय: ${lunarMetrics.moonAgeDays} दिवस` : `Age: ${lunarMetrics.moonAgeDays} days`}</span>
              </div>
            </div>

            {/* Step Navigation for date */}
            <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-700/80 w-full justify-between text-xs">
              <button
                type="button"
                onClick={() => setSelectedDayOffset((prev) => prev - 1)}
                className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold border border-slate-600 transition-colors shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{isMarathi ? 'मागील दिवस' : 'Prev Day'}</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedDayOffset(0)}
                className={`px-3 py-2 rounded-xl font-black transition-all shadow-md ${
                  selectedDayOffset === 0
                    ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300'
                    : 'bg-slate-800 text-stone-200 hover:bg-slate-700 border border-slate-600'
                }`}
              >
                {isMarathi ? 'आज (Today)' : 'Today'}
              </button>

              <button
                type="button"
                onClick={() => setSelectedDayOffset((prev) => prev + 1)}
                className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold border border-slate-600 transition-colors shadow-sm"
              >
                <span>{isMarathi ? 'पुढील दिवस' : 'Next Day'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Vedic Astrological & Timings Data (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Tithi & Paksha Hero Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#18233C] to-slate-900 border-2 border-amber-400/50 shadow-xl backdrop-blur-md">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-md border border-amber-400/30">
                  {isMarathi ? 'दैनिक तिथी व पक्ष' : 'Active Tithi & Fortnight'}
                </span>
                <span className="text-xs font-mono text-amber-200 font-bold">
                  {panchang.date} ({panchang.dayOfWeek.split(' ')[0]})
                </span>
              </div>

              <div className="text-2xl sm:text-3xl font-black font-serif text-white mt-2 drop-shadow-sm">
                {panchang.tithi.paksha} {panchang.tithi.name}
              </div>

              <div className="flex flex-wrap items-center gap-2.5 mt-3 text-xs">
                <span className="px-3 py-1.5 rounded-xl bg-slate-800 text-white font-bold border border-slate-600 shadow-xs">
                  <span className="text-amber-300">{isMarathi ? 'पक्ष:' : 'Paksha:'}</span> {panchang.tithi.paksha === 'Shukla' ? (isMarathi ? 'शुक्ल पक्ष (Bright Fortnight)' : 'Shukla Paksha (Waxing)') : (isMarathi ? 'कृष्ण पक्ष (Dark Fortnight)' : 'Krishna Paksha (Waning)')}
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-slate-800 text-white font-bold border border-slate-600 shadow-xs">
                  <span className="text-amber-300">{isMarathi ? 'तिथी क्रमांक:' : 'Tithi #:'}</span> <strong className="font-mono text-amber-200">{panchang.tithi.number} / 30</strong>
                </span>
              </div>
            </div>

            {/* 4 Essential Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              {/* Metric 1: Chandra Rashi (Moon Sign) */}
              <div className="p-4 rounded-2xl bg-stone-900/80 border border-white/15 backdrop-blur-md shadow-sm">
                <div className="flex items-center justify-between text-xs text-stone-200 mb-1 font-medium">
                  <span>{isMarathi ? 'चंद्र राशी (Moon Sign)' : 'Chandra Rashi (Moon Sign)'}</span>
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div className="text-lg font-bold font-serif text-amber-200">
                  {lunarMetrics.chandraRashi.sa}
                </div>
                <div className="text-xs text-stone-300 mt-0.5">
                  {isMarathi ? 'स्वामी ग्रह:' : 'Ruling Planet:'} <span className="text-amber-100 font-semibold">{lunarMetrics.chandraRashi.lord}</span>
                </div>
              </div>

              {/* Metric 2: Nakshatra */}
              <div className="p-4 rounded-2xl bg-stone-900/80 border border-white/15 backdrop-blur-md shadow-sm">
                <div className="flex items-center justify-between text-xs text-stone-200 mb-1 font-medium">
                  <span>{isMarathi ? 'नक्षत्र (Lunar Mansion)' : 'Nakshatra (Lunar Mansion)'}</span>
                  <Star className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div className="text-lg font-bold font-serif text-amber-200">
                  {panchang.nakshatra.name}
                </div>
                <div className="text-xs text-stone-300 mt-0.5">
                  {isMarathi ? 'नक्षत्र क्र.:' : 'Nakshatra #:'} <span className="font-mono text-amber-100 font-semibold">{panchang.nakshatra.number} / 27</span>
                </div>
              </div>

              {/* Metric 3: Moonrise & Moonset */}
              <div className="p-4 rounded-2xl bg-stone-900/80 border border-white/15 backdrop-blur-md shadow-sm">
                <div className="flex items-center justify-between text-xs text-stone-200 mb-1 font-medium">
                  <span>{isMarathi ? 'चंद्रोदय व चंद्रास्त' : 'Moonrise & Moonset'}</span>
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div className="flex items-center justify-between text-sm font-bold font-mono text-white">
                  <div className="text-amber-200">🌙 ↑ {panchang.moonrise}</div>
                  <div className="text-amber-200">🌙 ↓ {panchang.moonset}</div>
                </div>
                <div className="text-[11px] text-stone-300 mt-1 font-medium">
                  📍 {activeCity.name} ({activeCity.state})
                </div>
              </div>

              {/* Metric 4: Chandra Kala (Vedic Phase) */}
              <div className="p-4 rounded-2xl bg-stone-900/80 border border-white/15 backdrop-blur-md shadow-sm">
                <div className="flex items-center justify-between text-xs text-stone-200 mb-1 font-medium">
                  <span>{isMarathi ? '१६ वैदिक कला' : 'Chandra Kala (Vedic Stage)'}</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div className="text-base font-bold font-serif text-amber-200 truncate">
                  {lunarMetrics.chandraKala.name}
                </div>
                <div className="text-[11px] text-stone-300 mt-0.5 truncate font-medium">
                  {lunarMetrics.chandraKala.meaning}
                </div>
              </div>

            </div>

            {/* Next Major Lunar Milestones Box */}
            <div className="p-4 rounded-2xl bg-stone-900/90 border border-white/15 text-xs shadow-md">
              <div className="font-bold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-amber-400" />
                <span>{isMarathi ? 'आगामी प्रमुख चंद्र तिथी व व्रते' : 'Upcoming Major Lunar Milestones'}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('/ekadashi/2027')}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 transition-colors text-white"
                >
                  <div className="text-[11px] text-stone-300 font-medium">{isMarathi ? 'पुढील एकादशी' : 'Next Ekadashi'}</div>
                  <div className="text-xs font-bold text-amber-200 mt-0.5 font-serif">एकादशी व्रत</div>
                  <div className="text-[10px] text-emerald-300 mt-0.5 font-semibold">पारण वेळा →</div>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('/purnima/2027')}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 transition-colors text-white"
                >
                  <div className="text-[11px] text-stone-300 font-medium">{isMarathi ? 'पुढील पौर्णिमा' : 'Next Purnima'}</div>
                  <div className="text-xs font-bold text-amber-200 mt-0.5 font-serif">पौर्णिमा</div>
                  <div className="text-[10px] text-amber-300 mt-0.5 font-semibold">सत्यनारायण →</div>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('/amavasya/2027')}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 transition-colors text-white"
                >
                  <div className="text-[11px] text-stone-300 font-medium">{isMarathi ? 'पुढील अमावास्या' : 'Next Amavasya'}</div>
                  <div className="text-xs font-bold text-amber-200 mt-0.5 font-serif">अमावास्या</div>
                  <div className="text-[10px] text-amber-200 mt-0.5 font-semibold">पितृ तर्पण →</div>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('/vrat')}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 transition-colors text-white"
                >
                  <div className="text-[11px] text-stone-300 font-medium">{isMarathi ? 'संकष्टी चतुर्थी' : 'Sankashti'}</div>
                  <div className="text-xs font-bold text-amber-200 mt-0.5 font-serif">गणेश व्रत</div>
                  <div className="text-[10px] text-rose-300 mt-0.5 font-semibold">चंद्रोदय वेळ →</div>
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: 30-DAY LUNAR CYCLE TIMELINE */}
      {activeTab === 'timeline' && (
        <div className="relative z-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/90 p-4 rounded-2xl border border-slate-700">
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-serif text-amber-200">
                {isMarathi ? '३० दिवसांचे चंद्र चक्र व तिथी वेळापत्रक' : '30-Day Lunar Cycle & Tithi Schedule'}
              </h3>
              <p className="text-xs text-stone-300 mt-0.5">
                {isMarathi
                  ? 'कोणत्याही दिवसावर क्लिक करून त्या दिवशीचा चंद्र, तिथी व तिथी क्रमांक (#१ ते #३०) तपासा.'
                  : 'Inspect daily Tithi #, Lunar Phase, Illumination %, Moonrise/Moonset & Auspicious Vrats.'}
              </p>
            </div>
            <span className="text-xs text-amber-300 font-mono font-bold bg-amber-400/10 px-3 py-1.5 rounded-xl border border-amber-400/30 self-start sm:self-auto">
              {panchang.hinduMonthAmavasyant} {panchang.vikramSamvat}
            </span>
          </div>

          {/* Horizontal Scrollable Days Ribbon */}
          <div>
            <div className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{isMarathi ? 'दैनिक चंद्र दर्शन पट्टी (Quick Ribbon)' : 'Daily Visual Ribbon (Click to Select)'}</span>
            </div>
            <div className="flex gap-2.5 overflow-x-auto pb-4 pt-1 scrollbar-thin scrollbar-thumb-amber-500/30">
              {timelineDays.map((item) => (
                <button
                  key={item.offset}
                  type="button"
                  onClick={() => setSelectedDayOffset(item.offset)}
                  className={`flex-shrink-0 w-24 p-3 rounded-2xl border text-center transition-all ${
                    item.isToday
                      ? 'bg-amber-400 text-slate-950 border-2 border-amber-300 font-black scale-105 shadow-lg shadow-amber-400/30 ring-2 ring-amber-300'
                      : item.isSpecial
                      ? 'bg-indigo-950/90 border-2 border-amber-400/70 hover:bg-indigo-900 text-white'
                      : 'bg-slate-800/90 border border-slate-600 hover:bg-slate-700 text-white'
                  }`}
                >
                  <div className={`text-[10px] font-mono ${item.isToday ? 'text-slate-950 font-black' : 'text-stone-300 font-semibold'}`}>
                    {item.dateStr}
                  </div>

                  {/* Mini Moon Icon */}
                  <div className="my-2 flex items-center justify-center">
                    <div
                      className={`w-7 h-7 rounded-full border border-stone-600 relative overflow-hidden flex items-center justify-center ${
                        item.isToday ? 'bg-stone-900' : 'bg-[#0E1220]'
                      }`}
                    >
                      <div
                        className={`h-full transition-all ${
                          item.isToday ? 'bg-amber-300' : 'bg-amber-100'
                        }`}
                        style={{ width: `${item.illumination}%` }}
                      />
                    </div>
                  </div>

                  <div className="text-xs font-bold truncate font-serif text-white">
                    {item.tithiName}
                  </div>

                  <div className={`text-[10px] mt-0.5 font-mono ${item.isToday ? 'text-slate-950 font-black' : 'text-amber-200 font-bold'}`}>
                    {item.illumination}%
                  </div>

                  {item.badge && (
                    <div className={`mt-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-md truncate ${
                      item.isToday ? 'bg-slate-950 text-amber-300' : 'bg-amber-400 text-slate-950'
                    }`}>
                      ★ {item.badge}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* HIGH-CONTRAST 30-DAY LUNAR CYCLE & TITHI TABLE */}
          <div className="rounded-2xl border-2 border-slate-700 bg-slate-950 overflow-hidden shadow-2xl">
            {/* Table Header Controls */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b-2 border-amber-400/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-base sm:text-lg font-bold font-serif text-amber-300 flex items-center gap-2">
                  <Moon className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span>{isMarathi ? '३० दिवसीय चंद्र तिथी व कला संपूर्ण तक्ता' : '30-Day Lunar Cycle & Tithi Detailed Table'}</span>
                </h4>
                <p className="text-xs text-stone-300 mt-0.5">
                  {isMarathi ? `तिथी क्रमांक, पक्ष, चंद्र प्रकाश आणि चंद्रोदय वेळा (${activeCity.name})` : `High-precision Tithi #, Paksha, Lunar Phase, Illumination %, and Moonrise times for ${activeCity.name}`}
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto bg-slate-900/90 p-1 rounded-xl border border-slate-700">
                <button
                  type="button"
                  onClick={() => setTimelineFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    timelineFilter === 'all'
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  {isMarathi ? 'सर्व ३० दिवस' : 'All 30 Days'}
                </button>
                <button
                  type="button"
                  onClick={() => setTimelineFilter('shukla')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    timelineFilter === 'shukla'
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  {isMarathi ? 'शुक्ल पक्ष' : 'Shukla Paksha'}
                </button>
                <button
                  type="button"
                  onClick={() => setTimelineFilter('krishna')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    timelineFilter === 'krishna'
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  {isMarathi ? 'कृष्ण पक्ष' : 'Krishna Paksha'}
                </button>
                <button
                  type="button"
                  onClick={() => setTimelineFilter('special')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    timelineFilter === 'special'
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  {isMarathi ? 'प्रमुख व्रते / एकादशी' : 'Key Vrats & Vows'}
                </button>
              </div>
            </div>

            {/* Scrollable Table View */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-900 text-amber-300 uppercase font-black text-[11px] tracking-wider border-b border-slate-700">
                  <tr>
                    <th className="px-4 py-3.5">{isMarathi ? 'दिनांक / वार' : 'Date & Day'}</th>
                    <th className="px-4 py-3.5">{isMarathi ? 'तिथी क्रमांक' : 'Tithi #'}</th>
                    <th className="px-4 py-3.5">{isMarathi ? 'तिथी नाव' : 'Tithi Name'}</th>
                    <th className="px-4 py-3.5">{isMarathi ? 'पक्ष' : 'Paksha'}</th>
                    <th className="px-4 py-3.5">{isMarathi ? 'चंद्र कला (Phase)' : 'Lunar Phase'}</th>
                    <th className="px-4 py-3.5">{isMarathi ? 'प्रकाश %' : 'Illumination'}</th>
                    <th className="px-4 py-3.5">{isMarathi ? 'चंद्रोदय' : 'Moonrise'}</th>
                    <th className="px-4 py-3.5">{isMarathi ? 'नक्षत्र' : 'Nakshatra'}</th>
                    <th className="px-4 py-3.5">{isMarathi ? 'व्रत / धार्मिक महत्त्व' : 'Special Vrat / Observance'}</th>
                    <th className="px-4 py-3.5 text-right">{isMarathi ? 'कृती' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredTimelineDays.map((row) => {
                    const isRowActive = row.offset === selectedDayOffset;
                    return (
                      <tr
                        key={row.offset}
                        className={`transition-colors ${
                          isRowActive
                            ? 'bg-amber-400/20 text-white font-semibold'
                            : row.isSpecial
                            ? 'bg-slate-900/90 hover:bg-slate-800 text-stone-100'
                            : 'bg-slate-950 hover:bg-slate-900 text-stone-200'
                        }`}
                      >
                        {/* Date & Weekday */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="font-bold text-white font-mono flex items-center gap-1.5">
                            {row.fullDateStr}
                            {isRowActive && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black">
                                ACTIVE
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Tithi Number */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="font-mono font-black text-amber-300 bg-amber-400/15 px-2.5 py-1 rounded-md border border-amber-400/30 text-xs">
                            #{row.tithiNum} / 30
                          </span>
                        </td>

                        {/* Tithi Name */}
                        <td className="px-4 py-3 whitespace-nowrap font-serif font-bold text-white text-sm sm:text-base">
                          {row.tithiName}
                        </td>

                        {/* Paksha Badge */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          {row.paksha === 'Shukla' ? (
                            <span className="px-2.5 py-1 rounded-full text-xs font-black bg-amber-400 text-slate-950 shadow-xs">
                              {isMarathi ? 'शुक्ल पक्ष' : 'Shukla (Waxing)'}
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-800 text-amber-200 border border-slate-600">
                              {isMarathi ? 'कृष्ण पक्ष' : 'Krishna (Waning)'}
                            </span>
                          )}
                        </td>

                        {/* Lunar Phase */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="font-medium text-stone-200">
                            {row.phaseLabel}
                          </span>
                        </td>

                        {/* Illumination % */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="w-14 h-2 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
                              <div
                                className="h-full bg-gradient-to-r from-amber-400 to-amber-200"
                                style={{ width: `${row.illumination}%` }}
                              />
                            </div>
                            <span className="font-mono font-bold text-amber-300 text-xs">
                              {row.illumination}%
                            </span>
                          </div>
                        </td>

                        {/* Moonrise Time */}
                        <td className="px-4 py-3 whitespace-nowrap font-mono font-bold text-cyan-200">
                          🌙 {row.moonrise}
                        </td>

                        {/* Nakshatra */}
                        <td className="px-4 py-3 whitespace-nowrap text-stone-300 font-serif">
                          {row.nakshatra}
                        </td>

                        {/* Observance / Vrat */}
                        <td className="px-4 py-3">
                          {row.badge ? (
                            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-400/20 text-amber-200 border border-amber-400/40 text-xs font-bold">
                              <span>★ {row.badge}</span>
                              {row.vratDesc && <span className="hidden md:inline font-normal text-stone-300">({row.vratDesc})</span>}
                            </div>
                          ) : (
                            <span className="text-stone-500 text-xs italic">—</span>
                          )}
                        </td>

                        {/* Action Button */}
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedDayOffset(row.offset);
                              setActiveTab('visual');
                            }}
                            className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-amber-300 border border-slate-600 font-bold text-xs transition-colors"
                          >
                            {isMarathi ? 'पहा' : 'Inspect'} →
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: 16 CHANDRA KALAS & VEDIC SHASTRA */}
      {activeTab === 'shastra' && (
        <div className="relative z-10 space-y-6">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-bold font-serif text-amber-200 flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400" />
              <span>{isMarathi ? 'चंद्राचे मन व शरीरावरील आध्यात्मिक प्रभाव' : 'Vedic Wisdom: The Moon, Mind & Subtle Prana'}</span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
              {isMarathi
                ? 'ऋग्वेदात व बृहत् पराशर होरा शास्त्रामध्ये म्हटले आहे — "चन्द्रमा मनसो जातः" (चंद्रापासून मनाची उत्पत्ती झाली आहे). चंद्राच्या १६ कला मानवी चेतना, शरीरातील जलतत्त्व (७०% शरीराचे पाणी) आणि पाचक अग्नीवर थेट परिणाम करतात. शुक्ल पक्षात मनाचा उत्साह वाढतो, तर कृष्ण पक्षात आत्मपरीक्षण व ध्यान सहज घडते.'
                : 'As declared in Rigveda and Brihat Parashara Hora Shastra — "Chandrama Manaso Jatah" (The Moon was born of the Cosmic Mind). The Moon governs our mental tranquility, emotional rhythm, and the bodily water element. Understanding the 16 Chandra Kalas allows one to align fasting, meditation, and healing practices with natural cosmic tides.'}
            </p>

            <div className="mt-4 p-3.5 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-amber-200 font-serif text-sm font-bold">
                <span>ॐ सों सोमाय नमः</span>
                <span className="text-xs text-stone-300 font-sans font-normal">(Chandra Beej Mantra for Mental Peace)</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText('ॐ सों सोमाय नमः');
                    setCopiedState(true);
                    setTimeout(() => setCopiedState(false), 2500);
                  }
                }}
                className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold rounded-lg text-xs transition-colors"
              >
                {copiedState ? 'Copied!' : 'Copy Mantra'}
              </button>
            </div>
          </div>

          {/* 16 Kalas Grid */}
          <div>
            <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-3">
              {isMarathi ? '१६ वैदिक चंद्र कलांची नावे व गूढ अर्थ' : 'The 16 Sacred Chandra Kalas (अग्नि पुराण व शतपथ ब्राह्मण)'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {CHANDRA_KALAS.map((kala) => {
                const isActiveKala = kala.num === lunarMetrics.chandraKala.num;
                return (
                  <div
                    key={kala.num}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isActiveKala
                        ? 'bg-amber-400/25 border-amber-400 ring-1 ring-amber-400 text-white'
                        : 'bg-stone-900/80 border-white/15 text-stone-200 hover:bg-stone-800'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-amber-300 font-bold">
                      <span>Kala #{kala.num}</span>
                      {isActiveKala && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-stone-950 font-bold">
                          Active Today
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-bold font-serif text-amber-100 mt-1">
                      {kala.name}
                    </div>
                    <p className="text-[11px] text-stone-300 mt-1 leading-snug">
                      {kala.meaning}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Footer Info Bar */}
      <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-300 font-medium">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>{isMarathi ? 'सूर्य सिद्धांत व आधुनिक खगोलीय सूत्रांवर आधारित अचूक गणना' : 'Computed using Surya Siddhanta & High-Precision Ephemeris Algorithms'}</span>
        </div>

        <button
          type="button"
          onClick={() => onNavigate && onNavigate('/today')}
          className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 font-bold transition-colors group"
        >
          <span>{isMarathi ? 'आजचे संपूर्ण पंचांग उघडा' : "View Today's Complete Panchang"}</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
