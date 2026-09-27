import React, { useState } from 'react';
import { LanguageCode, CityInfo } from '../types';
import { CITIES } from '../data/panchangEngine';
import SunVisualization from './SunVisualization';
import MoonPhaseTracker from './MoonPhaseTracker';
import { Sun, Moon, Sparkles, MapPin } from 'lucide-react';

interface CelestialTrackerProps {
  currentLang?: LanguageCode;
  selectedCity?: CityInfo;
  onNavigate?: (path: string) => void;
  className?: string;
  onOpenCityModal?: () => void;
}

export default function CelestialTracker({
  currentLang = 'en',
  selectedCity = CITIES[0],
  onNavigate,
  className = '',
  onOpenCityModal
}: CelestialTrackerProps) {
  const isMarathi = currentLang === 'mr';
  const isHindi = currentLang === 'hi';
  const isGujarati = currentLang === 'gu';

  const [activeTab, setActiveTab] = useState<'sun' | 'moon'>('sun');

  return (
    <div className={`space-y-4 ${className}`}>
      
      {/* Top Toggle Switch between Sun Visualization & Moon Phase */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-900/90 text-white p-3 sm:p-4 rounded-2xl border border-amber-500/30 shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-stone-950 font-bold shadow-md">
            {activeTab === 'sun' ? <Sun className="w-4 h-4 text-stone-950" /> : <Moon className="w-4 h-4 text-stone-950" />}
          </div>
          <div>
            <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              {isMarathi ? 'खगोलीय व पंचांग दर्शक' : isHindi ? 'खगोलीय एवं पंचांग दर्शक' : 'Celestial Horizon Observatory'}
            </div>
            <div className="text-sm font-bold font-serif text-white">
              {activeTab === 'sun'
                ? isMarathi ? 'थेट सूर्य स्थिती व खगोलीय चाप (Solar Arc)' : 'Live Sun Position & Astronomical Arc'
                : isMarathi ? 'थेट चंद्र दर्शन व तिथी चक्र' : 'Live Moon Phase & Vedic Tithi'}
            </div>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="bg-stone-800 p-1 rounded-xl flex items-center border border-stone-700">
            <button
              type="button"
              onClick={() => setActiveTab('sun')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'sun'
                  ? 'bg-amber-400 text-stone-950 shadow-md scale-102'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>{isMarathi ? 'सूर्य स्थिती' : 'Sun Arc'}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('moon')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'moon'
                  ? 'bg-amber-400 text-stone-950 shadow-md scale-102'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>{isMarathi ? 'चंद्र कला' : 'Moon Phase'}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onOpenCityModal}
            className="flex items-center gap-1 px-3 py-2 bg-stone-800 hover:bg-stone-700 border border-stone-700 rounded-xl text-xs font-bold text-amber-300 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>{selectedCity.name}</span>
          </button>
        </div>
      </div>

      {/* Render Selected View */}
      {activeTab === 'sun' ? (
        <SunVisualization
          currentLang={currentLang}
          selectedCity={selectedCity}
          onNavigate={onNavigate}
          onOpenCityModal={onOpenCityModal}
        />
      ) : (
        <MoonPhaseTracker
          currentLang={currentLang}
          selectedCity={selectedCity}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
}
