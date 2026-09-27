import React, { useState, useEffect, useMemo, useRef } from 'react';
import { CityInfo, LanguageCode, PanchangData } from '../types';
import { getPanchangForDate, CITIES, calculateSunTimes } from '../data/panchangEngine';
import {
  Sun,
  Sunrise,
  Sunset,
  Clock,
  Compass,
  Play,
  Pause,
  RotateCcw,
  Bell,
  BellRing,
  Sparkles,
  MapPin,
  ShieldCheck,
  Check,
  ChevronRight,
  Flame,
  Info
} from 'lucide-react';

export interface SunVisualizationProps {
  currentLang?: LanguageCode;
  selectedCity?: CityInfo;
  onNavigate?: (path: string) => void;
  className?: string;
  onOpenCityModal?: () => void;
}

export default function SunVisualization({
  currentLang = 'en',
  selectedCity = CITIES[0],
  onNavigate,
  className = '',
  onOpenCityModal
}: SunVisualizationProps) {
  const isMarathi = currentLang === 'mr';
  const isHindi = currentLang === 'hi';
  const isGujarati = currentLang === 'gu';

  // Live real-time clock
  const [realTime, setRealTime] = useState<Date>(new Date());
  // Simulated minutes from midnight [0 to 1439] (null = follow real-time)
  const [scrubbedMinutes, setScrubbedMinutes] = useState<number | null>(null);
  const [isPlayingSimulation, setIsPlayingSimulation] = useState(false);
  const [notifState, setNotifState] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Live tick every second
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulation playback loop using clean interval (advances 3 minutes per 40ms)
  useEffect(() => {
    if (!isPlayingSimulation) return;
    const interval = setInterval(() => {
      setScrubbedMinutes((prev) => {
        const current = prev !== null ? prev : realTime.getHours() * 60 + realTime.getMinutes();
        return (current + 3) % 1440;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [isPlayingSimulation, realTime]);

  // Current effective minutes from midnight
  const effectiveMinutes = useMemo(() => {
    if (scrubbedMinutes !== null) return scrubbedMinutes;
    return realTime.getHours() * 60 + realTime.getMinutes() + realTime.getSeconds() / 60;
  }, [scrubbedMinutes, realTime]);

  // Calculate panchang and sun times for date and city
  const panchang: PanchangData = useMemo(() => {
    return getPanchangForDate(realTime, selectedCity.id);
  }, [realTime, selectedCity]);

  // Astronomical Sun Calculations (Accurate solar elevation, declination, azimuth, and golden hours)
  const solarData = useMemo(() => {
    const lat = selectedCity.latitude;
    const lon = selectedCity.longitude;

    // Day of year
    const startOfYear = new Date(realTime.getFullYear(), 0, 0);
    const diff = realTime.getTime() - startOfYear.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

    // Solar declination (approx Spencer/Cooper formula)
    const declination = 23.45 * Math.sin(((360 / 365) * (dayOfYear - 81) * Math.PI) / 180);
    const declinationRad = (declination * Math.PI) / 180;
    const latRad = (lat * Math.PI) / 180;

    // Solar noon offset
    const solarNoonOffsetMins = (82.5 - lon) * 4;
    const solarNoonMinutes = 12 * 60 + solarNoonOffsetMins;

    // Sunrise & Sunset in minutes
    const cosH = -Math.tan(latRad) * Math.tan(declinationRad);
    const clampedCosH = Math.max(-1, Math.min(1, cosH));
    const hourAngleDeg = (Math.acos(clampedCosH) * 180) / Math.PI;
    const halfDayMins = (hourAngleDeg / 15) * 60;

    const sunriseMins = solarNoonMinutes - halfDayMins;
    const sunsetMins = solarNoonMinutes + halfDayMins;
    const dayLengthMins = sunsetMins - sunriseMins;

    // Golden Hour windows (sun within 6 degrees above horizon)
    const morningGoldenEnd = sunriseMins + 45;
    const eveningGoldenStart = sunsetMins - 45;

    // Civil Twilight window (sun between 0 and -6 degrees)
    const dawnCivilStart = sunriseMins - 30;
    const duskCivilEnd = sunsetMins + 30;

    // Current hour angle for effective time
    const currentHourAngleDeg = ((effectiveMinutes - solarNoonMinutes) / 4);
    const currentHourAngleRad = (currentHourAngleDeg * Math.PI) / 180;

    // Solar Elevation Angle (Altitude)
    const sinElevation =
      Math.sin(latRad) * Math.sin(declinationRad) +
      Math.cos(latRad) * Math.cos(declinationRad) * Math.cos(currentHourAngleRad);
    const elevationRad = Math.asin(Math.max(-1, Math.min(1, sinElevation)));
    const elevationDeg = (elevationRad * 180) / Math.PI;

    // Solar Azimuth Angle (0° = North, 90° = East, 180° = South, 270° = West)
    const cosAzimuth =
      (Math.sin(declinationRad) - Math.sin(latRad) * Math.sin(elevationRad)) /
      (Math.cos(latRad) * Math.cos(elevationRad));
    let azimuthDeg = (Math.acos(Math.max(-1, Math.min(1, cosAzimuth))) * 180) / Math.PI;
    if (currentHourAngleDeg > 0) {
      azimuthDeg = 360 - azimuthDeg;
    }

    const isDaytime = effectiveMinutes >= sunriseMins && effectiveMinutes <= sunsetMins;
    const isGoldenHour =
      (effectiveMinutes >= sunriseMins && effectiveMinutes <= morningGoldenEnd) ||
      (effectiveMinutes >= eveningGoldenStart && effectiveMinutes <= sunsetMins);
    const isTwilight =
      (effectiveMinutes >= dawnCivilStart && effectiveMinutes < sunriseMins) ||
      (effectiveMinutes > sunsetMins && effectiveMinutes <= duskCivilEnd);

    // Calculate Position on SVG Arc:
    // We map Daytime (sunriseMins to sunsetMins) across the upper arc from X=40 (East) to X=360 (West).
    // SVG Canvas width = 400, height = 180. Horizon baseline = 140. Peak noon Y = 25.
    let sunX = 200;
    let sunY = 140;
    let arcProgress = 0; // 0 (sunrise) to 1 (sunset)

    if (isDaytime) {
      arcProgress = Math.max(0, Math.min(1, (effectiveMinutes - sunriseMins) / dayLengthMins));
      sunX = 40 + arcProgress * 320;
      // Parabolic altitude arc: apex at arcProgress = 0.5 (Y=25), baseline at Y=140
      sunY = 25 + 4 * (140 - 25) * Math.pow(arcProgress - 0.5, 2);
    } else {
      // Nighttime: sun moves along the lower subtle trajectory
      let nightProgress = 0;
      if (effectiveMinutes > sunsetMins) {
        nightProgress = (effectiveMinutes - sunsetMins) / (1440 - dayLengthMins);
      } else {
        nightProgress = (effectiveMinutes + (1440 - sunsetMins)) / (1440 - dayLengthMins);
      }
      sunX = 360 - nightProgress * 320;
      sunY = 140 + 4 * (165 - 140) * Math.pow(nightProgress - 0.5, 2);
    }

    // Time string formatting
    const formatMins = (mins: number) => {
      const norm = (Math.floor(mins) % 1440 + 1440) % 1440;
      const h = Math.floor(norm / 60);
      const m = norm % 60;
      const period = h >= 12 ? 'PM' : 'AM';
      const displayH = h % 12 === 0 ? 12 : h % 12;
      return `${displayH.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${period}`;
    };

    const sunsetTimeStr = formatMins(sunsetMins);
    const sunriseTimeStr = formatMins(sunriseMins);

    // Localized countdown generator across all languages
    let countdownLabel = '';
    let countdownType: 'sunset' | 'sunrise' | 'noon' | 'golden' = 'sunset';

    if (isDaytime) {
      const minsToSunset = Math.round(sunsetMins - effectiveMinutes);
      const hrs = Math.floor(minsToSunset / 60);
      const remMins = minsToSunset % 60;

      if (minsToSunset <= 15 && minsToSunset > 0) {
        if (currentLang === 'hi') {
          countdownLabel = `🌅 सूर्यास्त मात्र ${minsToSunset} मिनट में (${sunsetTimeStr}) – सांध्यकाल वेला!`;
        } else if (currentLang === 'mr') {
          countdownLabel = `🌅 सूर्यास्त अवघ्या ${minsToSunset} मिनिटांत (${sunsetTimeStr}) – सांजवात वेला!`;
        } else if (currentLang === 'gu') {
          countdownLabel = `🌅 સૂર્યાસ્ત માત્ર ${minsToSunset} મિનિટમાં (${sunsetTimeStr}) – સંધ્યાકાળ!`;
        } else if (currentLang === 'te') {
          countdownLabel = `🌅 సూర్యాస్తమయం ${minsToSunset} నిమిషాల్లో (${sunsetTimeStr}) – సంధ్యా సమయం!`;
        } else if (currentLang === 'ta') {
          countdownLabel = `🌅 சூரிய அஸ்தமனம் ${minsToSunset} நிமிடங்களில் (${sunsetTimeStr}) – அந்தி மாலை!`;
        } else if (currentLang === 'bn') {
          countdownLabel = `🌅 সূর্যাস্ত মাত্র ${minsToSunset} মিনিটে (${sunsetTimeStr}) – সন্ধ্যা কাল!`;
        } else if (currentLang === 'kn') {
          countdownLabel = `🌅 ಸೂರ್ಯಾಸ್ತ ${minsToSunset} ನಿಮಿಷಗಳಲ್ಲಿ (${sunsetTimeStr}) – ಸಂಧ್ಯಾ ಸಮಯ!`;
        } else {
          countdownLabel = `🌅 Sunset in ${minsToSunset} minutes (${sunsetTimeStr}) – Golden Hour!`;
        }
        countdownType = 'sunset';
      } else if (minsToSunset <= 60 && minsToSunset > 15) {
        if (currentLang === 'hi') {
          countdownLabel = `🌅 सूर्यास्त ${minsToSunset} मिनट में (${sunsetTimeStr})`;
        } else if (currentLang === 'mr') {
          countdownLabel = `🌅 सूर्यास्त ${minsToSunset} मिनिटांत (${sunsetTimeStr})`;
        } else if (currentLang === 'gu') {
          countdownLabel = `🌅 સૂર્યાસ્ત ${minsToSunset} મિનિટમાં (${sunsetTimeStr})`;
        } else if (currentLang === 'te') {
          countdownLabel = `🌅 సూర్యాస్తమయం ${minsToSunset} నిమిషాల్లో (${sunsetTimeStr})`;
        } else if (currentLang === 'ta') {
          countdownLabel = `🌅 சூரிய அஸ்தமனம் ${minsToSunset} நிமிடங்களில் (${sunsetTimeStr})`;
        } else if (currentLang === 'bn') {
          countdownLabel = `🌅 সূর্যাস্ত ${minsToSunset} মিনিটে (${sunsetTimeStr})`;
        } else if (currentLang === 'kn') {
          countdownLabel = `🌅 ಸೂರ್ಯಾಸ್ತ ${minsToSunset} ನಿಮಿಷಗಳಲ್ಲಿ (${sunsetTimeStr})`;
        } else {
          countdownLabel = `🌅 Sunset in ${minsToSunset} mins (${sunsetTimeStr})`;
        }
        countdownType = 'sunset';
      } else {
        if (currentLang === 'hi') {
          countdownLabel = `☀️ सूर्यास्त होने में ${hrs} घंटे ${remMins} मिनट शेष (${sunsetTimeStr})`;
        } else if (currentLang === 'mr') {
          countdownLabel = `☀️ सूर्यास्त होण्यास ${hrs} तास ${remMins} मिनिटे बाकी (${sunsetTimeStr})`;
        } else if (currentLang === 'gu') {
          countdownLabel = `☀️ સૂર્યાસ્ત થવામાં ${hrs} કલાક ${remMins} મિનિટ બાકી (${sunsetTimeStr})`;
        } else if (currentLang === 'te') {
          countdownLabel = `☀️ సూర్యాస్తమయానికి ${hrs} గంటల ${remMins} నిమిషాలు ఉంది (${sunsetTimeStr})`;
        } else if (currentLang === 'ta') {
          countdownLabel = `☀️ சூரிய அஸ்தமனத்திற்கு ${hrs} மணி ${remMins} நிமிடங்கள் உள்ளன (${sunsetTimeStr})`;
        } else if (currentLang === 'bn') {
          countdownLabel = `☀️ সূর্যাস্ত হতে ${hrs} ঘণ্টা ${remMins} মিনিট বাকি (${sunsetTimeStr})`;
        } else if (currentLang === 'kn') {
          countdownLabel = `☀️ ಸೂರ್ಯಾಸ್ತಕ್ಕೆ ${hrs} ಗಂಟೆ ${remMins} ನಿಮಿಷ ಬಾಕಿ ಇದೆ (${sunsetTimeStr})`;
        } else {
          countdownLabel = `☀️ Sunset in ${hrs}h ${remMins}m (${sunsetTimeStr})`;
        }
        countdownType = 'sunset';
      }
    } else {
      const minsToSunrise =
        effectiveMinutes > sunsetMins
          ? Math.round(1440 - effectiveMinutes + sunriseMins)
          : Math.round(sunriseMins - effectiveMinutes);
      const hrs = Math.floor(minsToSunrise / 60);
      const remMins = minsToSunrise % 60;

      if (currentLang === 'hi') {
        countdownLabel = `🌌 रात्रि काल · आगामी सूर्योदय ${hrs} घंटे ${remMins} मिनट में (${sunriseTimeStr})`;
      } else if (currentLang === 'mr') {
        countdownLabel = `🌌 रात्रीचा काळ · पुढील सूर्योदय ${hrs} तास ${remMins} मिनिटांत (${sunriseTimeStr})`;
      } else if (currentLang === 'gu') {
        countdownLabel = `🌌 રાત્રિ કાળ · આગામી સૂર્યોદય ${hrs} કલાક ${remMins} મિનિટમાં (${sunriseTimeStr})`;
      } else if (currentLang === 'te') {
        countdownLabel = `🌌 రాత్రి సమయం · తదుపరి సూర్యోదయం ${hrs} గం ${remMins} నిమిషాల్లో (${sunriseTimeStr})`;
      } else if (currentLang === 'ta') {
        countdownLabel = `🌌 இரவு வேளை · அடுத்த சூரியோதயம் ${hrs} மணி ${remMins} நிமிடங்களில் (${sunriseTimeStr})`;
      } else if (currentLang === 'bn') {
        countdownLabel = `🌌 রাত্রি কাল · পরবর্তী সূর্যোদয় ${hrs} ঘণ্টা ${remMins} মিনিটে (${sunriseTimeStr})`;
      } else if (currentLang === 'kn') {
        countdownLabel = `🌌 ರಾತ್ರಿ ಸಮಯ · ಮುಂದಿನ ಸೂರ್ಯೋದಯ ${hrs} ಗಂ ${remMins} ನಿಮಿಷಗಳಲ್ಲಿ (${sunriseTimeStr})`;
      } else {
        countdownLabel = `🌌 Night Sky · Next Sunrise in ${hrs}h ${remMins}m (${sunriseTimeStr})`;
      }
      countdownType = 'sunrise';
    }

    // Dynamic background sky theme class & gradient
    let skyGradient = 'from-[#0B1021] via-[#121A33] to-[#0A0E1A]'; // default night
    let auraColor = 'rgba(251, 191, 36, 0.15)';

    if (isGoldenHour) {
      skyGradient = 'from-[#381B14] via-[#5A2613] to-[#1C101A]';
      auraColor = 'rgba(249, 115, 22, 0.4)';
    } else if (isTwilight) {
      skyGradient = 'from-[#1E1B38] via-[#351C33] to-[#12101F]';
      auraColor = 'rgba(217, 70, 239, 0.25)';
    } else if (isDaytime) {
      if (elevationDeg > 45) {
        // High noon bright sky
        skyGradient = 'from-[#0E3566] via-[#14427D] to-[#0F284D]';
        auraColor = 'rgba(254, 240, 138, 0.35)';
      } else {
        // Morning / Afternoon clear azure
        skyGradient = 'from-[#122A4E] via-[#1A3B66] to-[#0F1E38]';
        auraColor = 'rgba(251, 191, 36, 0.25)';
      }
    }

    return {
      isDaytime,
      isGoldenHour,
      isTwilight,
      elevationDeg: elevationDeg.toFixed(1),
      azimuthDeg: azimuthDeg.toFixed(1),
      sunriseMins,
      sunsetMins,
      solarNoonMinutes,
      sunriseTime: formatMins(sunriseMins),
      sunsetTime: formatMins(sunsetMins),
      solarNoonTime: formatMins(solarNoonMinutes),
      currentTimeStr: formatMins(effectiveMinutes),
      dayLengthHours: Math.floor(dayLengthMins / 60),
      dayLengthMins: Math.round(dayLengthMins % 60),
      sunX,
      sunY,
      arcProgress,
      countdownLabel,
      countdownType,
      skyGradient,
      auraColor
    };
  }, [selectedCity, realTime, effectiveMinutes, currentLang]);

  // Handle Browser Notifications
  const triggerNotification = async (minsBefore: number) => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      setToastMessage(isMarathi ? 'ब्राउझरमध्ये सूचना सुविधा उपलब्ध नाही' : 'Notifications not supported in this browser');
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    let perm = Notification.permission;
    if (perm === 'default') {
      perm = await Notification.requestPermission();
    }

    if (perm === 'granted') {
      setNotifState(minsBefore);
      setToastMessage(
        isMarathi
          ? `✅ सूर्यास्तापूर्वी ${minsBefore} मिनिटे आधी आठवण सेट झाली (${solarData.sunsetTime})`
          : `✅ Sunset reminder set: ${minsBefore} minutes prior to ${solarData.sunsetTime}!`
      );
    } else {
      setToastMessage(isMarathi ? 'कृपया ब्राउझरमधून सूचना परवानगी द्या' : 'Please enable browser notification permissions');
    }

    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <section className={`rounded-3xl bg-gradient-to-br ${solarData.skyGradient} text-white p-5 sm:p-7 border border-amber-500/35 shadow-2xl relative overflow-hidden transition-colors duration-1000 ${className}`}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 bg-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow-2xl border border-amber-300 flex items-center gap-2 animate-bounce">
          <BellRing className="w-4 h-4 text-stone-950" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Radiant Background Aura */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-1000"
        style={{ backgroundColor: solarData.auraColor }}
      />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header & City Coordinates Bar */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-xs font-bold text-amber-300 mb-2 shadow-2xs">
            <Sun className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '20s' }} />
            <span>{isMarathi ? 'थेट सूर्य स्थिती व खगोलीय चाप (Solar Arc)' : isHindi ? 'प्रत्यक्ष सूर्य स्थिति एवं खगोलीय चाप' : 'Live Astronomical Sun Visualization'}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold font-serif text-white tracking-tight">
            {isMarathi
              ? `${selectedCity.name} – आजचा सूर्य मार्ग व मुहूर्त स्थिती`
              : `${selectedCity.name} – Sun Position & Celestial Trajectory`}
          </h2>

          <p className="text-xs text-stone-300 mt-1 max-w-2xl">
            {isMarathi
              ? `अक्षांश: ${selectedCity.latitude.toFixed(2)}°N, रेखांश: ${selectedCity.longitude.toFixed(2)}°E | सूर्योदय: ${solarData.sunriseTime}, सूर्यास्त: ${solarData.sunsetTime}`
              : `Lat: ${selectedCity.latitude.toFixed(2)}°N, Lon: ${selectedCity.longitude.toFixed(2)}°E · Topocentric Solar Altitude: ${solarData.elevationDeg}°`}
          </p>
        </div>

        {/* City Switcher & Simulation Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* City Button */}
          <button
            type="button"
            onClick={onOpenCityModal}
            className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold text-amber-200 transition-colors backdrop-blur-sm"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>{selectedCity.name}</span>
          </button>

          {/* Simulation Play / Pause Button */}
          <button
            type="button"
            onClick={() => setIsPlayingSimulation(!isPlayingSimulation)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
              isPlayingSimulation
                ? 'bg-amber-400 text-stone-950 ring-2 ring-amber-300'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
            }`}
            title="Simulate 24h Solar Motion"
          >
            {isPlayingSimulation ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlayingSimulation ? (isMarathi ? 'थांबवा' : 'Pause') : (isMarathi ? '२४ तास फिरवा' : 'Simulate 24h')}</span>
          </button>

          {/* Reset to Real Time */}
          {scrubbedMinutes !== null && (
            <button
              type="button"
              onClick={() => {
                setScrubbedMinutes(null);
                setIsPlayingSimulation(false);
              }}
              className="flex items-center gap-1 px-3 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-400/40 rounded-xl text-xs font-bold transition-colors"
              title="Reset to current local time"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isMarathi ? 'थेट वेळ' : 'Live Time'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Realtime Countdown Alert Banner */}
      <div className="relative z-10 my-4 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-serif font-bold text-amber-200 sm:text-sm">
            {solarData.countdownLabel}
          </span>
        </div>

        {/* Quick Sunset Notification Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-stone-300 text-[11px] hidden md:inline">
            {isMarathi ? 'सूर्यास्त सूचना:' : 'Sunset Alert:'}
          </span>
          <button
            type="button"
            onClick={() => triggerNotification(10)}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all text-xs ${
              notifState === 10
                ? 'bg-emerald-500 text-white'
                : 'bg-amber-400 hover:bg-amber-300 text-stone-950'
            }`}
          >
            {notifState === 10 ? '✓ 10m Set' : '10m Prior'}
          </button>
          <button
            type="button"
            onClick={() => triggerNotification(15)}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all text-xs ${
              notifState === 15
                ? 'bg-emerald-500 text-white'
                : 'bg-white/20 hover:bg-white/30 text-white'
            }`}
          >
            {notifState === 15 ? '✓ 15m Set' : '15m Prior'}
          </button>
        </div>
      </div>

      {/* MAIN VISUAL SVG SOLAR TRAJECTORY ARC */}
      <div className="relative z-10 w-full max-w-3xl mx-auto py-2">
        <svg viewBox="0 0 400 180" className="w-full h-auto overflow-visible select-none drop-shadow-xl">
          <defs>
            {/* Daytime Sky Arc Gradient */}
            <linearGradient id="dayArcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F97316" stopOpacity="0.8" />
              <stop offset="25%" stopColor="#FBBF24" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#FEF08A" stopOpacity="1" />
              <stop offset="75%" stopColor="#FBBF24" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#EA580C" stopOpacity="0.8" />
            </linearGradient>

            {/* Night Arc Gradient */}
            <linearGradient id="nightArcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#334155" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#475569" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#334155" stopOpacity="0.5" />
            </linearGradient>

            {/* Glowing Sun Radial Gradient */}
            <radialGradient id="sunRealisticGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="25%" stopColor="#FFFBEB" />
              <stop offset="55%" stopColor="#FDE047" />
              <stop offset="80%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </radialGradient>

            {/* Horizon Landscape Ground */}
            <linearGradient id="horizonGround" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#0B101D" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Upper Daytime Parabolic Trajectory Arc (Sunrise X=40 to Sunset X=360) */}
          <path
            d="M 40 140 Q 200 -30 360 140"
            fill="none"
            stroke="url(#dayArcGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Lower Nighttime Trajectory Arc (Subtle dashed curve below horizon) */}
          <path
            d="M 360 140 Q 200 200 40 140"
            fill="none"
            stroke="url(#nightArcGradient)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* Active Path Traveled Today (Highlighted trail behind the Sun) */}
          {solarData.isDaytime && solarData.arcProgress > 0 && (
            <path
              d={`M 40 140 Q ${40 + (solarData.sunX - 40) / 2} ${140 - (140 - solarData.sunY) * 1.5} ${solarData.sunX} ${solarData.sunY}`}
              fill="none"
              stroke="#FEF08A"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.8"
            />
          )}

          {/* Horizon Line & Ground Silhouette */}
          <line x1="10" y1="140" x2="390" y2="140" stroke="#475569" strokeWidth="2.5" />
          <rect x="10" y="140" width="380" height="35" fill="url(#horizonGround)" rx="6" />

          {/* Horizon Indian Temple Shikhara & Tree Silhouettes */}
          <g opacity="0.3" fill="#64748B">
            {/* Left Temple Shikhara near East */}
            <polygon points="65,140 72,126 79,140" />
            <polygon points="70,126 72,122 74,126" />
            <circle cx="72" cy="121" r="1.5" />
            
            {/* Center Sacred Peepal Tree Silhouette */}
            <circle cx="200" cy="132" r="7" />
            <rect x="199" y="132" width="2" height="8" />

            {/* Right Temple Shikhara near West */}
            <polygon points="325,140 332,124 339,140" />
            <polygon points="330,124 332,120 334,124" />
            <circle cx="332" cy="119" r="1.5" />
          </g>

          {/* Direction Compass & Solar Milestone Markers */}
          {/* East Marker */}
          <g transform="translate(40, 156)">
            <text x="0" y="0" fill="#FDBA74" fontSize="9" fontWeight="bold" textAnchor="middle">
              🌅 पूर्व (East)
            </text>
            <text x="0" y="11" fill="#94A3B8" fontSize="8" textAnchor="middle" fontFamily="monospace">
              {solarData.sunriseTime}
            </text>
          </g>

          {/* Solar Noon Apex Marker */}
          <g transform="translate(200, 18)">
            <text x="0" y="0" fill="#FEF08A" fontSize="9" fontWeight="bold" textAnchor="middle">
              ☀️ मध्याह्न (Solar Noon / अभिजित)
            </text>
            <text x="0" y="11" fill="#FDE68A" fontSize="8" textAnchor="middle" fontFamily="monospace">
              {solarData.solarNoonTime}
            </text>
          </g>

          {/* West Marker */}
          <g transform="translate(360, 156)">
            <text x="0" y="0" fill="#FDBA74" fontSize="9" fontWeight="bold" textAnchor="middle">
              🌇 पश्चिम (West)
            </text>
            <text x="0" y="11" fill="#94A3B8" fontSize="8" textAnchor="middle" fontFamily="monospace">
              {solarData.sunsetTime}
            </text>
          </g>

          {/* Vertical Solar Altitude Projection Line */}
          {solarData.isDaytime && (
            <line
              x1={solarData.sunX}
              y1={solarData.sunY}
              x2={solarData.sunX}
              y2="140"
              stroke="#FEF08A"
              strokeWidth="1.5"
              strokeDasharray="2 2"
              opacity="0.6"
            />
          )}

          {/* ANIMATED GLOWING SUN ORB */}
          {solarData.isDaytime ? (
            <g transform={`translate(${solarData.sunX}, ${solarData.sunY})`}>
              {/* Pulsating outer flare */}
              <circle cx="0" cy="0" r="22" fill="#FBBF24" opacity="0.25" className="animate-ping" />
              {/* Corona outer ring */}
              <circle cx="0" cy="0" r="16" fill="#FDE68A" opacity="0.4" />
              {/* Central Radiant Orb */}
              <circle cx="0" cy="0" r="10" fill="url(#sunRealisticGlow)" stroke="#FFF" strokeWidth="1.5" />
              
              {/* Rotating Coronal Rays */}
              <g className="animate-spin" style={{ animationDuration: '30s' }}>
                <line x1="0" y1="-14" x2="0" y2="-18" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />
                <line x1="0" y1="14" x2="0" y2="18" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />
                <line x1="-14" y1="0" x2="-18" y2="0" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />
                <line x1="14" y1="0" x2="18" y2="0" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />
                <line x1="-10" y1="-10" x2="-13" y2="-13" stroke="#FEF08A" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="10" y1="10" x2="13" y2="13" stroke="#FEF08A" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="10" y1="-10" x2="13" y2="-13" stroke="#FEF08A" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="-10" y1="10" x2="-13" y2="13" stroke="#FEF08A" strokeWidth="1.5" strokeLinecap="round" />
              </g>

              {/* Real-time Altitude Tag above Sun */}
              <rect x="-24" y="-32" width="48" height="14" rx="4" fill="#0F172A" opacity="0.85" stroke="#FBBF24" strokeWidth="0.8" />
              <text x="0" y="-22" fill="#FEF08A" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                +{solarData.elevationDeg}°
              </text>
            </g>
          ) : (
            /* Night Indicator Below Horizon */
            <g transform={`translate(${solarData.sunX}, ${solarData.sunY})`}>
              <circle cx="0" cy="0" r="7" fill="#334155" stroke="#64748B" strokeWidth="1" />
              <text x="0" y="14" fill="#94A3B8" fontSize="8" textAnchor="middle">
                {solarData.currentTimeStr}
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* INTERACTIVE TIME SCRUBBER & QUICK MILESTONES */}
      <div className="relative z-10 mt-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-amber-300" />
            <span className="font-bold text-stone-200">{isMarathi ? 'वेळ सिम्युलेटर व सूर्य स्थिती नियंत्रण:' : 'Time Simulator & Solar Scrubber:'}</span>
          </div>
          <span className="font-mono font-bold text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-lg border border-amber-400/30 text-xs">
            {solarData.currentTimeStr} {scrubbedMinutes !== null ? '(Simulated)' : '(Live)'}
          </span>
        </div>

        {/* 24-Hour Range Slider */}
        <input
          type="range"
          min="0"
          max="1439"
          value={effectiveMinutes}
          onChange={(e) => {
            setScrubbedMinutes(parseInt(e.target.value, 10));
            setIsPlayingSimulation(false);
          }}
          className="w-full h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-400 focus:outline-hidden"
          aria-label="Drag sun along 24h trajectory"
        />

        {/* Quick Jump Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1 text-[11px]">
          <button
            type="button"
            onClick={() => {
              setScrubbedMinutes(solarData.sunriseMins - 48);
              setIsPlayingSimulation(false);
            }}
            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-stone-300 transition-colors"
          >
            {isMarathi ? 'ब्रह्म मुहूर्त' : 'Brahma Muhurat'}
          </button>

          <button
            type="button"
            onClick={() => {
              setScrubbedMinutes(solarData.sunriseMins);
              setIsPlayingSimulation(false);
            }}
            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-amber-300 transition-colors font-semibold"
          >
            🌅 {isMarathi ? 'सूर्योदय' : 'Sunrise'}
          </button>

          <button
            type="button"
            onClick={() => {
              setScrubbedMinutes(solarData.solarNoonMinutes);
              setIsPlayingSimulation(false);
            }}
            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-amber-200 transition-colors font-semibold"
          >
            ☀️ {isMarathi ? 'अभिजित मध्याह्न' : 'Solar Noon'}
          </button>

          <button
            type="button"
            onClick={() => {
              setScrubbedMinutes(solarData.sunsetMins);
              setIsPlayingSimulation(false);
            }}
            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-orange-300 transition-colors font-semibold"
          >
            🌇 {isMarathi ? 'सूर्यास्त' : 'Sunset'}
          </button>

          <button
            type="button"
            onClick={() => {
              setScrubbedMinutes(solarData.sunsetMins + 20);
              setIsPlayingSimulation(false);
            }}
            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-rose-300 transition-colors"
          >
            {isMarathi ? 'संध्याकाळ' : 'Sandhya Kaal'}
          </button>
        </div>
      </div>

      {/* 4 REALTIME ASTRONOMICAL DATA CARDS */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
        
        {/* Card 1: Solar Elevation */}
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
          <div className="text-[11px] text-stone-400 font-medium">{isMarathi ? 'सूर्य उन्नती कोन (Elevation)' : 'Solar Elevation'}</div>
          <div className="text-lg font-bold font-mono text-amber-200 mt-0.5">
            {solarData.elevationDeg > '0' ? `+${solarData.elevationDeg}°` : `${solarData.elevationDeg}°`}
          </div>
          <div className="text-[10px] text-stone-400 mt-0.5">
            {solarData.isDaytime ? (isMarathi ? 'क्षितिजाच्या वर' : 'Above Horizon') : (isMarathi ? 'क्षितिजाच्या खाली' : 'Below Horizon')}
          </div>
        </div>

        {/* Card 2: Solar Azimuth */}
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
          <div className="text-[11px] text-stone-400 font-medium">{isMarathi ? 'दिगंश कोन (Azimuth)' : 'Solar Azimuth'}</div>
          <div className="text-lg font-bold font-mono text-amber-200 mt-0.5">
            {solarData.azimuthDeg}°
          </div>
          <div className="text-[10px] text-stone-400 mt-0.5">
            {solarData.azimuthDeg < '180' ? (isMarathi ? 'पूर्व / दक्षिण-पूर्व' : 'East / South-East') : (isMarathi ? 'दक्षिण-पश्चिम / पश्चिम' : 'South-West / West')}
          </div>
        </div>

        {/* Card 3: Day Length */}
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
          <div className="text-[11px] text-stone-400 font-medium">{isMarathi ? 'दिवसाचा कालावधी' : 'Day Length'}</div>
          <div className="text-lg font-bold font-mono text-stone-100 mt-0.5">
            {solarData.dayLengthHours}h {solarData.dayLengthMins}m
          </div>
          <div className="text-[10px] text-stone-400 mt-0.5">
            {isMarathi ? 'सूर्यप्रकाशाचे तास' : 'Total Sunlight Window'}
          </div>
        </div>

        {/* Card 4: Vedic Sandhya Timing */}
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
          <div className="text-[11px] text-stone-400 font-medium">{isMarathi ? 'त्रिकाल संध्या व गायत्री' : 'Vedic Sandhya Kaal'}</div>
          <div className="text-sm font-bold font-mono text-amber-200 mt-1 truncate">
            {panchang.abhijitMuhurat.start}
          </div>
          <div className="text-[10px] text-emerald-400 mt-0.5">
            {isMarathi ? 'माध्यान्ह संध्या' : 'Madhyahna Window'}
          </div>
        </div>

      </div>

      {/* FOOTER VERIFICATION STRIP */}
      <div className="relative z-10 mt-5 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-300">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>{isMarathi ? 'सूर्य सिद्धांत व आधुनिक खगोलीय सूत्रांवर आधारित अचूक गणना' : 'Real-time calculation using topocentric solar ephemeris equations'}</span>
        </div>

        <button
          type="button"
          onClick={() => onNavigate && onNavigate('/today')}
          className="font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1 group"
        >
          <span>{isMarathi ? 'आजचे संपूर्ण पंचांग पहा' : "View Today's Full Panchang"}</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </section>
  );
}
