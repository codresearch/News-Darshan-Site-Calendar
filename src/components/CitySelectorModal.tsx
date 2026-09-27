import { useState } from 'react';
import { CITIES } from '../data/panchangEngine';
import { CityInfo } from '../types';
import { MapPin, X, Navigation, Check, Search, Globe, Landmark } from 'lucide-react';

interface CitySelectorModalProps {
  currentCity: CityInfo;
  isOpen: boolean;
  onClose: () => void;
  onSelectCity: (city: CityInfo) => void;
}

type CategoryFilter = 
  | 'all' 
  | 'pilgrimage' 
  | 'metro' 
  | 'north_america'
  | 'europe_uk'
  | 'middle_east'
  | 'oceania'
  | 'diaspora'
  | 'north' 
  | 'west' 
  | 'south' 
  | 'east' 
  | 'international';

export default function CitySelectorModal({
  currentCity,
  isOpen,
  onClose,
  onSelectCity
}: CitySelectorModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [isLocating, setIsLocating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredCities = CITIES.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.nameHi && c.nameHi.toLowerCase().includes(searchTerm.toLowerCase())) ||
      c.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.region && c.region.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'north_america') {
      return c.region === 'North America' || c.country === 'United States' || c.country === 'Canada';
    }
    if (selectedCategory === 'europe_uk') {
      return c.region === 'Europe & United Kingdom' || c.country === 'United Kingdom' || c.country === 'Germany' || c.country === 'Netherlands' || c.country === 'France';
    }
    if (selectedCategory === 'middle_east') {
      return c.region === 'Middle East' || c.country === 'United Arab Emirates' || c.country === 'Saudi Arabia' || c.country === 'Oman' || c.country === 'Kuwait' || c.country === 'Qatar';
    }
    if (selectedCategory === 'oceania') {
      return c.region === 'Southeast Asia & Oceania' || c.country === 'Australia' || c.country === 'New Zealand' || c.country === 'Malaysia' || c.country === 'Singapore';
    }
    if (selectedCategory === 'diaspora') {
      return c.region === 'Historic Diaspora Hubs' || c.country === 'Mauritius' || c.country === 'Fiji' || c.country === 'South Africa' || c.country === 'Trinidad and Tobago' || c.country === 'Guyana';
    }
    return c.category === selectedCategory;
  });

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setStatusMessage('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    setStatusMessage('Accessing GPS coordinates for precise sunrise calculations...');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const { latitude, longitude } = pos.coords;
        const customCity: CityInfo = {
          id: 'user-loc',
          name: 'My Exact Location',
          nameHi: 'मेरी वर्तमान स्थिति',
          state: 'GPS Coordinates',
          country: 'India',
          latitude: parseFloat(latitude.toFixed(4)),
          longitude: parseFloat(longitude.toFixed(4)),
          timezone: 'Asia/Kolkata',
          category: 'metro'
        };
        onSelectCity(customCity);
        onClose();
      },
      (err) => {
        setIsLocating(false);
        setStatusMessage('Location permission denied or unavailable. Please choose your nearest city below.');
      }
    );
  };

  const categories: { id: CategoryFilter; label: string; icon?: string }[] = [
    { id: 'all', label: 'All Cities (सभी शहर)' },
    { id: 'pilgrimage', label: '🕉️ Sacred Pilgrimages (तीर्थ स्थल)' },
    { id: 'north_america', label: '🇺🇸 North America (USA & Canada)' },
    { id: 'europe_uk', label: '🇬🇧 Europe & UK (London, Germany, NL)' },
    { id: 'middle_east', label: '🇦🇪 Middle East (UAE, Saudi, Qatar)' },
    { id: 'oceania', label: '🌏 SE Asia & Oceania (Aus, NZ, MY, SG)' },
    { id: 'diaspora', label: '🏝️ Historic Diaspora (Mauritius, Fiji, Caribbean)' },
    { id: 'metro', label: '🇮🇳 Metros (महानगर)' },
    { id: 'north', label: 'North India (उत्तर)' },
    { id: 'west', label: 'West India (पश्चिम)' },
    { id: 'south', label: 'South India (दक्षिण)' },
    { id: 'east', label: 'East India (पूर्व)' },
    { id: 'international', label: '🌍 All NRI & Global (विदेश)' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FAF7F2] border border-[#E7D6CB] w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FAF1EC] text-[#9A3412] flex items-center justify-center border border-[#E8DCD4]">
              <MapPin className="w-5 h-5 text-[#9A3412]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900 font-serif">
                Select City for Panchang Calculations
              </h2>
              <p className="text-xs text-stone-500">
                Panchang, Tithi, Sunrise & Sunset vary by latitude and longitude.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search, GPS & Categories */}
        <div className="p-5 space-y-3 bg-[#FAF7F2] border-b border-stone-200 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search 70+ cities by name, Hindi name, or state (e.g., Ayodhya, Kashi, Mumbai)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9A3412]/30 focus:border-[#9A3412] text-stone-900 shadow-2xs"
            />
          </div>

          {/* Quick GPS button */}
          <button
            type="button"
            onClick={handleUseMyLocation}
            disabled={isLocating}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs sm:text-sm font-semibold text-[#9A3412] bg-[#FAF1EC] border border-[#E7D6CB] rounded-xl hover:bg-[#F3E5DD] transition-colors"
          >
            <Navigation className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
            <span>{isLocating ? 'Detecting Coordinates via GPS...' : 'Use My Exact GPS Location (Auto-Detect)'}</span>
          </button>

          {statusMessage && (
            <div className="text-xs text-stone-600 bg-amber-50 border border-amber-200 p-2 rounded-lg text-center">
              {statusMessage}
            </div>
          )}

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-[#9A3412] text-white shadow-2xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cities List */}
        <div className="overflow-y-auto p-4 space-y-1.5 flex-1 bg-white">
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-400 px-2 pb-1 flex justify-between items-center">
            <span>Available Cities ({filteredCities.length})</span>
            <span>Current: {currentCity.name}</span>
          </div>

          {filteredCities.map((city) => {
            const isSelected = currentCity.id === city.id;
            return (
              <button
                key={city.id}
                type="button"
                onClick={() => {
                  onSelectCity(city);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all ${
                  isSelected
                    ? 'bg-[#9A3412] text-white font-medium shadow-xs'
                    : 'text-stone-800 hover:bg-[#FAF1EC]/70 border border-transparent hover:border-[#E8DCD4]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0 ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                  }`}>
                    {city.category === 'pilgrimage' ? '🕉️' : city.category === 'international' ? '✈️' : '📍'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm sm:text-base font-bold ${isSelected ? 'text-white' : 'text-stone-900 font-serif'}`}>
                        {city.name}
                      </span>
                      {city.nameHi && (
                        <span className={`text-xs ${isSelected ? 'text-amber-200' : 'text-[#9A3412] font-medium'}`}>
                          ({city.nameHi})
                        </span>
                      )}
                    </div>
                    <div className={`text-xs ${isSelected ? 'text-white/80' : 'text-stone-500'}`}>
                      {city.state}, {city.country} · {city.latitude}°N, {city.longitude}°E
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-md text-xs font-bold text-white">
                    <Check className="w-3.5 h-3.5" />
                    <span>Selected</span>
                  </div>
                )}
              </button>
            );
          })}

          {filteredCities.length === 0 && (
            <div className="text-center py-8 text-stone-500 text-sm">
              No cities found matching "{searchTerm}". Try a different spelling or use GPS Auto-Detect.
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 bg-[#FAF7F2] border-t border-stone-200 text-xs text-stone-600 flex items-center justify-between shrink-0">
          <span>Formula: High-precision Nirayana spherical trigonometry</span>
          <span className="font-semibold text-[#9A3412]">110+ Global Locations Supported</span>
        </div>
      </div>
    </div>
  );
}
