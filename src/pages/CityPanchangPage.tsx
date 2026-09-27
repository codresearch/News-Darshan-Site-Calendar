import { useState } from 'react';
import { CityInfo, LanguageCode } from '../types';
import { getPanchangForDate, CITIES } from '../data/panchangEngine';
import {
  getUIText,
  getCityLocalizedName,
  getLocaleCode,
  getWeekdayLocalized,
  getPakshaLocalized,
  getChoghadiyaSlotName,
  getChoghadiyaSlotRuler,
  getChoghadiyaSlotNature
} from '../data/localization';
import Breadcrumbs from '../components/Breadcrumbs';
import AdSlot from '../components/AdSlot';
import ShareButtons from '../components/ShareButtons';
import CelestialTracker from '../components/CelestialTracker';
import {
  Sun,
  Moon,
  Clock,
  MapPin,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Globe,
  Compass,
  Check,
  Share2,
  HelpCircle,
  Building2,
  Navigation
} from 'lucide-react';

interface CityPanchangPageProps {
  city: CityInfo;
  currentLang: LanguageCode;
  onNavigate: (path: string) => void;
  onSelectCity: (city: CityInfo) => void;
}

export default function CityPanchangPage({
  city,
  currentLang,
  onNavigate,
  onSelectCity
}: CityPanchangPageProps) {
  const [dateOffset, setDateOffset] = useState(0); // 0 = today, 1 = tomorrow, -1 = yesterday
  const [copiedNotification, setCopiedNotification] = useState(false);

  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + dateOffset);

  const panchang = getPanchangForDate(targetDate, city.id);

  const cityNameDisplay = getCityLocalizedName(city, currentLang);
  const localizedWeekday = getWeekdayLocalized(panchang.dayOfWeek, currentLang);
  const localizedPaksha = getPakshaLocalized(panchang.tithi.paksha, currentLang);

  const dateHeading =
    dateOffset === 0
      ? getUIText(currentLang, 'today', "Today's")
      : dateOffset === 1
      ? getUIText(currentLang, 'tomorrow', "Tomorrow's")
      : getUIText(currentLang, 'yesterday', "Yesterday's");

  const breadcrumbs = [
    { name: getUIText(currentLang, 'home', 'Home'), url: '/' },
    { name: getUIText(currentLang, 'citiesDirectory', 'Cities'), url: '/cities/' },
    { name: `${city.name} Panchang`, url: `/panchang/${city.id}/` }
  ];

  // Related cities in same region
  const siblingCities = CITIES.filter(
    (c) => c.id !== city.id && (c.region === city.region || c.country === city.country || c.category === city.category)
  ).slice(0, 8);

  const handleSetDefaultCity = () => {
    onSelectCity(city);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const getCountryFlag = (country: string) => {
    switch (country) {
      case 'United States': return '🇺🇸';
      case 'Canada': return '🇨🇦';
      case 'United Kingdom': return '🇬🇧';
      case 'Germany': return '🇩🇪';
      case 'Netherlands': return '🇳🇱';
      case 'France': return '🇫🇷';
      case 'United Arab Emirates': return '🇦🇪';
      case 'Saudi Arabia': return '🇸🇦';
      case 'Oman': return '🇴🇲';
      case 'Kuwait': return '🇰🇼';
      case 'Qatar': return '🇶🇦';
      case 'Malaysia': return '🇲🇾';
      case 'Singapore': return '🇸🇬';
      case 'Australia': return '🇦🇺';
      case 'New Zealand': return '🇳🇿';
      case 'Mauritius': return '🇲🇺';
      case 'Fiji': return '🇫🇯';
      case 'South Africa': return '🇿🇦';
      case 'Trinidad and Tobago': return '🇹🇹';
      case 'Guyana': return '🇬🇾';
      case 'Nepal': return '🇳🇵';
      default: return '🇮🇳';
    }
  };

  return (
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      {/* Hero City Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#7C2D12] via-[#9A3412] to-[#451A03] text-white p-6 sm:p-10 shadow-lg border border-[#EA580C]/20">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-bold text-amber-200">
              <span className="text-base">{getCountryFlag(city.country)}</span>
              <span>{city.region || city.country}</span>
              <span className="text-amber-300/60">•</span>
              <span>{city.timezone}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-serif tracking-tight text-white">
              {city.name}
            </h1>
            
            {city.nameHi && (
              <p className="text-lg sm:text-2xl text-amber-200/90 font-medium font-serif">
                {city.nameHi} – {getUIText(currentLang, 'dailyPanchang', 'दैनिक पंचांग')}
              </p>
            )}

            <p className="text-xs sm:text-sm text-stone-200 max-w-2xl leading-relaxed">
              Authentic Hindu Calendar 2027, real-time Tithi, Nakshatra, Day & Night Choghadiya, Rahu Kaal, and Shubh Muhurat computed for {city.name} ({city.state}, {city.country}) at coordinates {Math.abs(city.latitude).toFixed(2)}°{city.latitude >= 0 ? 'N' : 'S'}, {Math.abs(city.longitude).toFixed(2)}°{city.longitude >= 0 ? 'E' : 'W'}.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <button
              onClick={handleSetDefaultCity}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-[#7C2D12] font-bold text-sm shadow-md transition-all active:scale-95"
            >
              <Navigation className="w-4 h-4" />
              <span>{copiedNotification ? '✓ Saved as Current City' : 'Set as My City'}</span>
            </button>
            <button
              onClick={() => onNavigate('/choghadiya/' + city.id)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-bold text-sm border border-white/20 transition-all"
            >
              <Clock className="w-4 h-4 text-amber-300" />
              <span>{city.name.split(',')[0]} Choghadiya</span>
            </button>
          </div>
        </div>
      </div>

      {/* Date Switcher Ribbon */}
      <div className="flex items-center justify-between p-4 sm:p-5 bg-white rounded-2xl border border-stone-200 shadow-2xs">
        <button
          type="button"
          onClick={() => setDateOffset((prev) => prev - 1)}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-stone-700 hover:text-[#9A3412] px-3 py-1.5 rounded-lg hover:bg-stone-100 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{getUIText(currentLang, 'previousDay', 'Previous Day')}</span>
        </button>

        <div className="text-center">
          <div className="text-base sm:text-xl font-bold text-stone-900 font-serif">
            {targetDate.toLocaleDateString(getLocaleCode(currentLang), {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </div>
          <div className="text-xs font-semibold text-[#9A3412] mt-0.5">
            {dateHeading} {getUIText(currentLang, 'panchangIn', 'Panchang in')} {cityNameDisplay} ({city.timezone})
          </div>
        </div>

        <button
          type="button"
          onClick={() => setDateOffset((prev) => prev + 1)}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-stone-700 hover:text-[#9A3412] px-3 py-1.5 rounded-lg hover:bg-stone-100 transition-colors"
        >
          <span>{getUIText(currentLang, 'nextDay', 'Next Day')}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <AdSlot type="top" />

      {/* Main 5 Limbs of Panchang Grid for this City */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* 1. Tithi */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              {getUIText(currentLang, 'tithi', 'Tithi (तिथि)')}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-[#9A3412]">
              {localizedPaksha}
            </span>
          </div>
          <div className="text-2xl font-bold text-stone-900 font-serif">
            {panchang.tithi.name}
          </div>
          <p className="text-xs text-stone-600">
            {panchang.tithi.endTime
              ? `Up to ${panchang.tithi.endTime} local time`
              : 'Prevalent throughout the local solar day'}
          </p>
        </div>

        {/* 2. Nakshatra */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              {getUIText(currentLang, 'nakshatra', 'Nakshatra (नक्षत्र)')}
            </span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-stone-900 font-serif">
            {panchang.nakshatra.name}
          </div>
          <p className="text-xs text-stone-600">
            {panchang.nakshatra.endTime
              ? `Until ${panchang.nakshatra.endTime} (${city.timezone})`
              : 'Active constellation for this date'}
          </p>
        </div>

        {/* 3. Yoga & Karana */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              {getUIText(currentLang, 'yogaKarana', 'Yoga & Karana (योग व करण)')}
            </span>
            <Compass className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-lg font-bold text-stone-900">
            {panchang.yoga.name} <span className="text-xs font-normal text-stone-500 font-sans">Yoga</span>
          </div>
          <div className="text-sm font-semibold text-stone-700">
            {panchang.karana.name} <span className="text-xs font-normal text-stone-500 font-sans">Karana</span>
          </div>
        </div>

        {/* 4. Solar Timings in City */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50/50 border border-amber-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9A3412] flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-amber-600" />
              {city.name.split(',')[0]} Solar Timings
            </span>
            <span className="text-[11px] font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md">
              Local Coordinates
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <div className="text-xs text-stone-500">{getUIText(currentLang, 'sunrise', 'Sunrise')}</div>
              <div className="text-lg font-extrabold text-stone-900 tabular-nums">{panchang.sunrise}</div>
            </div>
            <div>
              <div className="text-xs text-stone-500">{getUIText(currentLang, 'sunset', 'Sunset')}</div>
              <div className="text-lg font-extrabold text-stone-900 tabular-nums">{panchang.sunset}</div>
            </div>
            <div>
              <div className="text-xs text-stone-500">{getUIText(currentLang, 'moonrise', 'Moonrise')}</div>
              <div className="text-sm font-bold text-stone-800 tabular-nums">{panchang.moonrise || '18:42'}</div>
            </div>
            <div>
              <div className="text-xs text-stone-500">{getUIText(currentLang, 'moonset', 'Moonset')}</div>
              <div className="text-sm font-bold text-stone-800 tabular-nums">{panchang.moonset || '06:15'}</div>
            </div>
          </div>
        </div>

        {/* 5. Auspicious Abhijit & Inauspicious Rahu Kaal */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {getUIText(currentLang, 'abhijitMuhurat', 'Abhijit Muhurat')}
            </span>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
              Highly Auspicious
            </span>
          </div>
          <div className="text-lg font-extrabold text-emerald-900 tabular-nums">
            {panchang.abhijitMuhurat.start} – {panchang.abhijitMuhurat.end}
          </div>
          
          <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
            <span className="text-xs font-bold text-red-700 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
              {getUIText(currentLang, 'rahuKaal', 'Rahu Kaal')}
            </span>
            <span className="text-sm font-bold text-red-900 tabular-nums">
              {panchang.rahuKaal.start} – {panchang.rahuKaal.end}
            </span>
          </div>
        </div>

        {/* 6. Hindu Calendar Year & Samvat */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Vedic Samvat ({city.name.split(',')[0]})
            </span>
            <Calendar className="w-4 h-4 text-[#9A3412]" />
          </div>
          <div className="text-sm text-stone-800 font-medium">
            <span className="font-bold text-stone-900">Vikram Samvat:</span> {panchang.vikramSamvat}
          </div>
          <div className="text-sm text-stone-800 font-medium">
            <span className="font-bold text-stone-900">Shaka Samvat:</span> {panchang.shakaSamvat}
          </div>
          <div className="text-xs text-stone-500 pt-1">
            Masa: {panchang.hinduMonthPurnimant} ({panchang.tithi.paksha} Paksha)
          </div>
        </div>
      </div>

      {/* City Celestial Moon & Sun Tracker */}
      <CelestialTracker
        selectedCity={city}
        currentLang={currentLang}
        onNavigate={onNavigate}
      />

      {/* Day & Night Choghadiya Table for this city */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-stone-300 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b-2 border-stone-200">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9A3412] uppercase tracking-wider">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>Vedic Muhurat Schedule</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-950 font-serif mt-0.5">
              Day & Night Choghadiya for {city.name}
            </h2>
            <p className="text-xs text-stone-600 mt-0.5">
              Local sunrise at {panchang.sunrise} and sunset at {panchang.sunset} ({city.timezone})
            </p>
          </div>
          <button
            onClick={() => onNavigate('/choghadiya/' + city.id)}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#9A3412] hover:underline self-start sm:self-auto"
          >
            <span>Full Choghadiya Page</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Day Choghadiya */}
          <div className="space-y-3">
            <div className="bg-amber-950 text-amber-200 p-3 rounded-2xl flex items-center justify-between border border-amber-900 shadow-xs">
              <h3 className="text-xs font-black uppercase tracking-wider flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-400" />
                <span>Day Choghadiya (दिन का चौघड़िया)</span>
              </h3>
              <span className="text-[11px] font-mono text-amber-300">{panchang.sunrise} to {panchang.sunset}</span>
            </div>
            <div className="overflow-x-auto rounded-2xl border-2 border-stone-200">
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-900 text-amber-300 font-bold uppercase tracking-wider text-[11px] border-b border-stone-700">
                  <tr>
                    <th className="p-3">Time Interval</th>
                    <th className="p-3">Muhurat</th>
                    <th className="p-3">Ruler</th>
                    <th className="p-3 text-right">Nature</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {panchang.choghadiya.day.map((slot, i) => (
                    <tr key={i} className={`transition-colors ${slot.nature === 'Auspicious' ? 'bg-emerald-50/90 hover:bg-emerald-100/80' : slot.nature === 'Inauspicious' ? 'bg-rose-50/80 hover:bg-rose-100/70' : 'bg-white hover:bg-stone-50'}`}>
                      <td className="p-3 font-mono font-bold text-stone-950">{slot.start} – {slot.end}</td>
                      <td className="p-3 font-bold text-stone-950 font-serif text-sm">{getChoghadiyaSlotName(slot.name, currentLang)}</td>
                      <td className="p-3 text-stone-700 font-medium">{getChoghadiyaSlotRuler(slot.name, currentLang)}</td>
                      <td className="p-3 text-right">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-black ${
                          slot.nature === 'Auspicious' ? 'bg-emerald-700 text-white' :
                          slot.nature === 'Inauspicious' ? 'bg-rose-700 text-white' :
                          'bg-stone-800 text-stone-100'
                        }`}>
                          {getChoghadiyaSlotNature(slot.name, currentLang)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Night Choghadiya */}
          <div className="space-y-3">
            <div className="bg-indigo-950 text-indigo-200 p-3 rounded-2xl flex items-center justify-between border border-indigo-900 shadow-xs">
              <h3 className="text-xs font-black uppercase tracking-wider flex items-center gap-2">
                <Moon className="w-4 h-4 text-indigo-400" />
                <span>Night Choghadiya (रात का चौघड़िया)</span>
              </h3>
              <span className="text-[11px] font-mono text-indigo-300">Sunset to Sunrise</span>
            </div>
            <div className="overflow-x-auto rounded-2xl border-2 border-stone-200">
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-900 text-amber-300 font-bold uppercase tracking-wider text-[11px] border-b border-stone-700">
                  <tr>
                    <th className="p-3">Time Interval</th>
                    <th className="p-3">Muhurat</th>
                    <th className="p-3">Ruler</th>
                    <th className="p-3 text-right">Nature</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {panchang.choghadiya.night.map((slot, i) => (
                    <tr key={i} className={`transition-colors ${slot.nature === 'Auspicious' ? 'bg-emerald-50/90 hover:bg-emerald-100/80' : slot.nature === 'Inauspicious' ? 'bg-rose-50/80 hover:bg-rose-100/70' : 'bg-white hover:bg-stone-50'}`}>
                      <td className="p-3 font-mono font-bold text-stone-950">{slot.start} – {slot.end}</td>
                      <td className="p-3 font-bold text-stone-950 font-serif text-sm">{getChoghadiyaSlotName(slot.name, currentLang)}</td>
                      <td className="p-3 text-stone-700 font-medium">{getChoghadiyaSlotRuler(slot.name, currentLang)}</td>
                      <td className="p-3 text-right">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-black ${
                          slot.nature === 'Auspicious' ? 'bg-emerald-700 text-white' :
                          slot.nature === 'Inauspicious' ? 'bg-rose-700 text-white' :
                          'bg-stone-800 text-stone-100'
                        }`}>
                          {getChoghadiyaSlotNature(slot.name, currentLang)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Other Cities in Region / Diaspora */}
      {siblingCities.length > 0 && (
        <section className="bg-stone-100/80 p-6 sm:p-8 rounded-3xl border border-stone-200 space-y-4">
          <div className="flex items-center gap-2 text-stone-800 font-bold font-serif">
            <Globe className="w-5 h-5 text-[#9A3412]" />
            <h2 className="text-lg sm:text-xl font-bold">
              Explore Panchang in Other {city.region || city.country} Cities
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {siblingCities.map((sib) => (
              <button
                key={sib.id}
                onClick={() => onNavigate('/panchang/' + sib.id)}
                className="p-3 bg-white rounded-2xl border border-stone-200/90 hover:border-[#9A3412] hover:bg-amber-50/30 transition-all text-left shadow-2xs group flex flex-col justify-between"
              >
                <div className="text-xs font-bold text-stone-900 group-hover:text-[#9A3412] font-serif truncate">
                  {sib.name}
                </div>
                <div className="text-[11px] text-stone-500 mt-1 flex items-center justify-between">
                  <span>{sib.state}</span>
                  <span className="font-bold text-[#9A3412] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* SEO & Astronomical Calculation Explainer */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
          About {city.name} Hindu Panchang & Astronomical Calculations
        </h2>
        <div className="prose prose-stone text-xs sm:text-sm text-stone-600 space-y-3 leading-relaxed">
          <p>
            Vedic timekeeping is deeply rooted in local horizon astronomy. Because {city.name} is situated at latitude <strong>{city.latitude}°</strong> and longitude <strong>{city.longitude}°</strong> in the <strong>{city.timezone}</strong> timezone, the exact moments of sunrise (Surya Udaya), sunset (Surya Astha), and moonrise differ significantly from Indian Standard Time (IST).
          </p>
          <p>
            In authentic Hindu traditions, religious fasting observances such as Ekadashi, Pradosh, Sankashti Chaturthi, and festivals like Diwali, Holi, and Janmashtami are determined based on the <em>Udaya Tithi</em> (the tithi prevailing at local sunrise in {city.name}) and night-prevailing tithis (Nishita Kaal / Pradosha Kaal). NewsDarshan automatically computes these planetary ephemerides for {city.name} without manual conversions.
          </p>
        </div>
      </section>

      {/* City Specific FAQ Accordion */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-[#9A3412] font-bold font-serif pb-2 border-b border-stone-100">
          <HelpCircle className="w-5 h-5 text-amber-500" />
          <h2 className="text-xl font-bold">Frequently Asked Questions for {city.name} Panchang</h2>
        </div>
        <div className="space-y-3 pt-2">
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
            <h3 className="text-sm font-bold text-stone-900">
              What is today's sunrise and sunset time in {city.name}?
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Today's sunrise in {city.name} is at <strong>{panchang.sunrise}</strong> and sunset is at <strong>{panchang.sunset}</strong> ({city.timezone}).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
            <h3 className="text-sm font-bold text-stone-900">
              When is Rahu Kaal in {city.name} today?
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Rahu Kaal for {city.name} is active from <strong>{panchang.rahuKaal.start} – {panchang.rahuKaal.end}</strong>. It is traditionally considered inauspicious for starting new business or travel.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
            <h3 className="text-sm font-bold text-stone-900">
              How are Hindu festival dates determined in {city.name} ({city.country})?
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Festivals are calculated based on when the lunar tithi touches local sunrise or nighttime puja muhurat windows in {city.name}'s timezone ({city.timezone}).
            </p>
          </div>
        </div>
      </section>

      <AdSlot type="before-footer" />
    </div>
  );
}
