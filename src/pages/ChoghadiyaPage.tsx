import { useState } from 'react';
import { CityInfo, LanguageCode } from '../types';
import { getPanchangForDate } from '../data/panchangEngine';
import {
  getUIText,
  getChoghadiyaSlotName,
  getChoghadiyaSlotRuler,
  getChoghadiyaSlotNature,
  getChoghadiyaSlotDesc,
  getCityLocalizedName,
  CHOGHADIYA_LOCALIZED
} from '../data/localization';
import Breadcrumbs from '../components/Breadcrumbs';
import AdSlot from '../components/AdSlot';
import ShareButtons from '../components/ShareButtons';
import { Clock, Sun, Moon, MapPin, CheckCircle, AlertTriangle, ShieldAlert } from 'lucide-react';

interface ChoghadiyaPageProps {
  currentCity: CityInfo;
  currentLang?: LanguageCode;
  onOpenCityModal: () => void;
  onNavigate: (path: string) => void;
}

export default function ChoghadiyaPage({
  currentCity,
  currentLang = 'en',
  onOpenCityModal,
  onNavigate
}: ChoghadiyaPageProps) {
  const [dayOffset, setDayOffset] = useState(0); // 0 = today, 1 = tomorrow

  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + dayOffset);

  const panchang = getPanchangForDate(targetDate, currentCity.id);
  const cityNameDisplay = getCityLocalizedName(currentCity, currentLang);

  const breadcrumbs = [
    { name: getUIText(currentLang, 'home', 'Home'), url: '/' },
    { name: getUIText(currentLang, 'choghadiya', 'Choghadiya'), url: '/choghadiya/' }
  ];

  // Choghadiya types array for the reference banner
  const choghadiyaKeys = ['Amrit', 'Shubh', 'Labh', 'Chal', 'Rog', 'Kaal', 'Udveg'];

  return (
    <div className="space-y-8">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 bg-gradient-to-r from-[#FAF1EC] to-[#F5ECE5] rounded-2xl border border-[#E8DCD4]">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#9A3412] mb-1">
            {getUIText(currentLang, 'choghadiyaTagline', 'Planetary Auspicious Hours · Chau-Ghati System')}
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-stone-900 font-serif">
            {getUIText(currentLang, 'choghadiyaTitle', 'Day & Night Choghadiya (चौघड़िया मुहूर्त)')}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
            {currentLang === 'mr'
              ? `${cityNameDisplay} येथील सूर्योदय (${panchang.sunrise}) आणि सूर्यास्तावर (${panchang.sunset}) आधारित दिवसाचे ८ आणि रात्रीचे ८ भागांत विभागलेले अचूक चौघडिया मुहूर्त.`
              : currentLang === 'hi'
              ? `${cityNameDisplay} के सूर्योदय (${panchang.sunrise}) एवं सूर्यास्त (${panchang.sunset}) के आधार पर दिन के ८ और रात्रि के ८ अंतरालों में विभाजित वास्तविक समय चौघड़िया मुहूर्त।`
              : currentLang === 'gu'
              ? `${cityNameDisplay} ના સૂર્યોદય (${panchang.sunrise}) અને સૂર્યાસ્ત (${panchang.sunset}) પર આધારિત દિવસના ૮ અને રાત્રિના ૮ ભાગમાં વિભાજિત ચોઘડિયા મુહૂર્ત.`
              : `Real-time Choghadiya calculator dynamically partitioned into 8 daytime and 8 nighttime intervals based on ${cityNameDisplay} sunrise (${panchang.sunrise}) and sunset (${panchang.sunset}).`}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {/* Day Offset Toggle */}
          <div className="flex items-center bg-white border border-stone-300 rounded-xl p-1 text-xs">
            <button
              type="button"
              onClick={() => setDayOffset(0)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                dayOffset === 0
                  ? 'bg-[#9A3412] text-white'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {getUIText(currentLang, 'today', 'Today')}
            </button>
            <button
              type="button"
              onClick={() => setDayOffset(1)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                dayOffset === 1
                  ? 'bg-[#9A3412] text-white'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {getUIText(currentLang, 'tomorrow', 'Tomorrow')}
            </button>
          </div>

          <button
            type="button"
            onClick={onOpenCityModal}
            className="flex items-center gap-1.5 px-3 py-2 bg-white text-xs font-semibold text-stone-700 border border-stone-300 rounded-xl hover:bg-stone-50"
          >
            <MapPin className="w-3.5 h-3.5 text-[#9A3412]" />
            <span>{cityNameDisplay}</span>
          </button>
        </div>
      </div>

      <AdSlot type="top" />

      {/* Choghadiya Meaning Reference Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 text-center text-xs">
        {choghadiyaKeys.map((key) => {
          const isAuspicious = key === 'Amrit' || key === 'Shubh' || key === 'Labh';
          const isNeutral = key === 'Chal';
          const bgClass = isAuspicious
            ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
            : isNeutral
            ? 'bg-stone-100 border-stone-200 text-stone-800'
            : 'bg-[#FAF1EC] border-[#E8DCD4] text-rose-950';

          const subTextClass = isAuspicious
            ? 'text-emerald-700'
            : isNeutral
            ? 'text-stone-600'
            : 'text-stone-700';

          return (
            <div key={key} className={`p-2.5 border rounded-xl ${bgClass}`}>
              <div className="font-bold">
                {getChoghadiyaSlotName(key, currentLang)}
              </div>
              <div className={`text-[10px] mt-0.5 leading-snug ${subTextClass}`}>
                {getChoghadiyaSlotDesc(key, currentLang)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Day and Night Choghadiya Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Day Choghadiya */}
        <div className="bg-white rounded-3xl border-2 border-amber-300 overflow-hidden shadow-md">
          <div className="px-6 py-4.5 bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 border-b-2 border-amber-400 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Sun className="w-5 h-5 text-amber-400" />
              <h2 className="text-base sm:text-lg font-bold text-white font-serif tracking-wide">
                {getUIText(currentLang, 'dayChoghadiya', 'Day Choghadiya (दिन का चौघड़िया)')}
              </h2>
            </div>
            <span className="text-xs text-slate-950 font-mono font-black bg-amber-400 px-3 py-1 rounded-full border border-amber-300">
              {panchang.sunrise} – {panchang.sunset}
            </span>
          </div>

          <div className="divide-y divide-stone-200">
            {panchang.choghadiya.day.map((slot, idx) => {
              const localizedName = getChoghadiyaSlotName(slot.name, currentLang);
              const localizedRuler = getChoghadiyaSlotRuler(slot.name, currentLang);
              const localizedNature = getChoghadiyaSlotNature(slot.name, currentLang);

              return (
                <div
                  key={idx}
                  className={`p-4 sm:p-5 flex items-center justify-between text-sm transition-colors ${
                    slot.nature === 'Auspicious'
                      ? 'bg-emerald-50/90 hover:bg-emerald-100/80'
                      : slot.nature === 'Inauspicious'
                      ? 'bg-rose-50/80 hover:bg-rose-100/70'
                      : 'bg-white hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="font-mono font-bold text-stone-400 text-xs w-5">
                      #{idx + 1}
                    </span>
                    <div>
                      <div className="font-bold text-stone-950 text-base font-serif">
                        {localizedName}
                      </div>
                      <div className="text-xs text-stone-600 mt-0.5">
                        {getUIText(currentLang, 'ruler', 'Ruler')}: <strong className="text-stone-900">{localizedRuler}</strong> · {getUIText(currentLang, 'nature', 'Nature')}: <strong className={slot.nature === 'Auspicious' ? 'text-emerald-900 font-bold' : slot.nature === 'Inauspicious' ? 'text-rose-900 font-bold' : 'text-stone-900 font-bold'}>{localizedNature}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-black ${
                      slot.nature === 'Auspicious'
                        ? 'bg-emerald-700 text-white'
                        : slot.nature === 'Inauspicious'
                        ? 'bg-rose-700 text-white'
                        : 'bg-stone-800 text-stone-100'
                    }`}>
                      {localizedNature}
                    </span>
                    <span className="font-mono text-sm font-bold text-stone-950 tabular-nums">
                      {slot.start} – {slot.end}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Night Choghadiya */}
        <div className="bg-white rounded-3xl border-2 border-indigo-300 overflow-hidden shadow-md">
          <div className="px-6 py-4.5 bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border-b-2 border-indigo-400 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Moon className="w-5 h-5 text-indigo-400" />
              <h2 className="text-base sm:text-lg font-bold text-white font-serif tracking-wide">
                {getUIText(currentLang, 'nightChoghadiya', 'Night Choghadiya (रात्रि का चौघड़िया)')}
              </h2>
            </div>
            <span className="text-xs text-white font-mono font-bold bg-indigo-900/90 px-3 py-1 rounded-full border border-indigo-400">
              {getUIText(currentLang, 'sunsetToSunrise', 'Sunset to Sunrise')}
            </span>
          </div>

          <div className="divide-y divide-stone-200">
            {panchang.choghadiya.night.map((slot, idx) => {
              const localizedName = getChoghadiyaSlotName(slot.name, currentLang);
              const localizedRuler = getChoghadiyaSlotRuler(slot.name, currentLang);
              const localizedNature = getChoghadiyaSlotNature(slot.name, currentLang);

              return (
                <div
                  key={idx}
                  className={`p-4 sm:p-5 flex items-center justify-between text-sm transition-colors ${
                    slot.nature === 'Auspicious'
                      ? 'bg-emerald-50/90 hover:bg-emerald-100/80'
                      : slot.nature === 'Inauspicious'
                      ? 'bg-rose-50/80 hover:bg-rose-100/70'
                      : 'bg-white hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="font-mono font-bold text-stone-400 text-xs w-5">
                      #{idx + 1}
                    </span>
                    <div>
                      <div className="font-bold text-stone-950 text-base font-serif">
                        {localizedName}
                      </div>
                      <div className="text-xs text-stone-600 mt-0.5">
                        {getUIText(currentLang, 'ruler', 'Ruler')}: <strong className="text-stone-900">{localizedRuler}</strong> · {getUIText(currentLang, 'nature', 'Nature')}: <strong className={slot.nature === 'Auspicious' ? 'text-emerald-900 font-bold' : slot.nature === 'Inauspicious' ? 'text-rose-900 font-bold' : 'text-stone-900 font-bold'}>{localizedNature}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-black ${
                      slot.nature === 'Auspicious'
                        ? 'bg-emerald-700 text-white'
                        : slot.nature === 'Inauspicious'
                        ? 'bg-rose-700 text-white'
                        : 'bg-stone-800 text-stone-100'
                    }`}>
                      {localizedNature}
                    </span>
                    <span className="font-mono text-sm font-bold text-stone-950 tabular-nums">
                      {slot.start} – {slot.end}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Guide Content */}
      <section className="p-6 sm:p-8 bg-[#FAF6F2] rounded-2xl border border-stone-200 text-sm text-stone-700 space-y-4">
        <h2 className="text-xl font-bold text-stone-900 font-serif">
          {getUIText(currentLang, 'choghadiyaHowToUse', 'How to Use Choghadiya Muhurat')}
        </h2>
        <p className="leading-relaxed">
          {getUIText(
            currentLang,
            'choghadiyaGuideText1',
            'Choghadiya is a classical timekeeping division in Indian astrology, widely consulted before embarking on travels, purchasing vehicles, signing contracts, or conducting auspicious rituals. Because daytime and nighttime lengths change daily throughout the seasons, static tables are inaccurate. NewsDarshan calculates the precise duration of each partition by dividing the actual local day length by eight.'
          )}
        </p>
        <p className="leading-relaxed">
          {getUIText(
            currentLang,
            'choghadiyaGuideText2',
            'For commercial contracts, property purchases, and business inauguration, prefer Labh or Amrit Choghadiya. For weddings, educational admissions, and puja ceremonies, Shubh Choghadiya is ideal. When initiating travel, Chal or Amrit are recommended.'
          )}
        </p>

        <ShareButtons
          title={`${getUIText(currentLang, 'choghadiyaTitle', 'Day and Night Choghadiya Muhurat')} – NewsDarshan`}
          url="https://www.newsdarshan.in/choghadiya"
        />
      </section>

      <AdSlot type="before-footer" />
    </div>
  );
}
