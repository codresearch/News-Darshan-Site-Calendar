import React from 'react';
import { LanguageCode } from '../types';
import { FESTIVALS_2027, EKADASHI_2027, PURNIMA_2027, AMAVASYA_2027, MUHURATS_2027, RASHIFAL_DATA } from '../data/calendarData';
import { FAMOUS_TEMPLES } from '../data/templesData';
import { CITIES } from '../data/panchangEngine';
import { MONTH_NAMES, MONTH_DISPLAY_NAMES } from '../utils/seoEngine';
import { getUIText } from '../data/localization';
import Breadcrumbs from '../components/Breadcrumbs';
import AdSlot from '../components/AdSlot';
import {
  FileText,
  Calendar,
  Sparkles,
  Landmark,
  Calculator,
  Compass,
  Heart,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Moon,
  Sun,
  Globe,
  MapPin
} from 'lucide-react';

interface SitemapPageProps {
  currentLang?: LanguageCode;
  onNavigate: (path: string) => void;
}

export default function SitemapPage({ currentLang = 'en', onNavigate }: SitemapPageProps) {
  const isMarathi = currentLang === 'mr';
  const isHindi = currentLang === 'hi';

  const breadcrumbs = [
    { name: getUIText(currentLang, 'home', 'Home'), url: '/' },
    { name: isMarathi ? 'साईटमॅप (सर्व पानांची सूची)' : 'HTML Sitemap (Complete Page Directory)', url: '/sitemap/' }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      {/* Hero Header */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-[#FAF1EC] via-[#FAF5F0] to-[#F5ECE5] rounded-3xl border border-[#E8DCD4] shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 border border-amber-300 text-xs font-bold text-[#9A3412] mb-2 shadow-2xs">
          <FileText className="w-3.5 h-3.5" />
          <span>100% Complete Internal Linking & SEO Index</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 font-serif">
          {isMarathi ? 'न्यूजदर्शन सर्वसमावेशक साईटमॅप' : isHindi ? 'न्यूजदर्शन सम्पूर्ण साईटमैप' : 'NewsDarshan Complete HTML Sitemap'}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-3xl leading-relaxed">
          {isMarathi
            ? 'सर्व १२ महिने, ५०+ प्रसिद्ध मंदिरे, ३०+ वैदिक सण व उत्सव, कुंडली व ज्योतिष टूल्स, आणि दैनिक पंचांग पानांची थेट सूची.'
            : 'Access every single verified section of the NewsDarshan portal: 12 monthly calendars, 50+ temple guides, 30+ festival muhurats, daily horoscope, and Vedic calculators with zero orphan pages.'}
        </p>
      </div>

      <AdSlot type="top" />

      {/* Grid of Categorized Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Category 1: Core Daily Panchang & Celestial */}
        <section className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-[#9A3412] font-bold font-serif pb-2 border-b border-stone-200">
            <Sun className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-bold">Daily Panchang & Timings</h2>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li>
              <button onClick={() => onNavigate('/today')} className="text-stone-700 hover:text-[#9A3412] font-medium hover:underline text-left">
                → Today Panchang & Real-time Tithi
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/moon-phase')} className="text-stone-700 hover:text-[#9A3412] font-medium hover:underline text-left">
                → Live Moon Phase Tracker (चन्द्र दर्शन)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/choghadiya')} className="text-stone-700 hover:text-[#9A3412] font-medium hover:underline text-left">
                → Day & Night Choghadiya Timings
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/muhurat')} className="text-stone-700 hover:text-[#9A3412] font-medium hover:underline text-left">
                → Shubh Muhurat 2027 Directory
              </button>
            </li>
          </ul>
        </section>

        {/* Category 2: 12 Months 2027 Calendars */}
        <section className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-[#9A3412] font-bold font-serif pb-2 border-b border-stone-200">
            <Calendar className="w-5 h-5 text-[#9A3412]" />
            <h2 className="text-base font-bold">12 Months Hindu Calendar 2027</h2>
          </div>
          <ul className="grid grid-cols-2 gap-1.5 text-xs">
            {MONTH_NAMES.map((m) => (
              <li key={m}>
                <button onClick={() => onNavigate(`/hindu-calendar-2027/${m}`)} className="text-stone-700 hover:text-[#9A3412] font-medium hover:underline text-left">
                  • {MONTH_DISPLAY_NAMES[m]} 2027
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Category 3: Regional Calendars */}
        <section className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-[#9A3412] font-bold font-serif pb-2 border-b border-stone-200">
            <Compass className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold">Regional Hindu Calendars</h2>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li>
              <button onClick={() => onNavigate('/marathi-calendar-2027')} className="text-stone-700 hover:text-[#9A3412] font-medium hover:underline text-left">
                → Marathi Calendar 2027 (मराठी दिनदर्शिका)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/gujarati-calendar-2027')} className="text-stone-700 hover:text-[#9A3412] font-medium hover:underline text-left">
                → Gujarati Calendar 2027 (ગુજરાતી પંચાંગ)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/telugu-calendar-2027')} className="text-stone-700 hover:text-[#9A3412] font-medium hover:underline text-left">
                → Telugu Calendar 2027 (తెలుగు పంచాంగం)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/tamil-calendar-2027')} className="text-stone-700 hover:text-[#9A3412] font-medium hover:underline text-left">
                → Tamil Calendar 2027 (தமிழ் காலண்டர்)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/bengali-calendar-2027')} className="text-stone-700 hover:text-[#9A3412] font-medium hover:underline text-left">
                → Bengali Calendar 2027 (বাংলা ক্যালেন্ডার)
              </button>
            </li>
          </ul>
        </section>

        {/* Category 4: Vedic Astrology Tools */}
        <section className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-[#9A3412] font-bold font-serif pb-2 border-b border-stone-200">
            <Calculator className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base font-bold">Vedic Astrology Calculators</h2>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li>
              <button onClick={() => onNavigate('/kundli-milan')} className="text-stone-700 hover:text-[#9A3412] font-medium hover:underline text-left">
                → Kundli Milan (36 Gunas) (कुंडली गुण मिलान)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/sade-sati')} className="text-stone-700 hover:text-[#9A3412] font-medium hover:underline text-left">
                → Shani Sade Sati & Dhaiya Checker (साढ़े साती)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/manglik-dosha')} className="text-stone-700 hover:text-[#9A3412] font-medium hover:underline text-left">
                → Manglik Dosha (Kuja Dosha) Checker (मांगलिक दोष)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/date-converter')} className="text-stone-700 hover:text-[#9A3412] font-medium hover:underline text-left">
                → Hindu Date & Tithi Converter (तिथि कनवर्टर)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/vedic-age-calculator')} className="text-stone-700 hover:text-[#9A3412] font-medium hover:underline text-left">
                → Vedic Solar & Lunar Age Calculator (आयु कैलकुलेटर)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/sun-visualization')} className="text-stone-700 hover:text-[#9A3412] font-medium hover:underline text-left">
                → Astronomical Sun Solar Arc & Altitude (सूर्य चाप)
              </button>
            </li>
          </ul>
        </section>

        {/* Category 5: Famous Hindu Temples & Darshan */}
        <section className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-[#9A3412] font-bold font-serif pb-2 border-b border-stone-200">
            <Landmark className="w-5 h-5 text-amber-600" />
            <h2 className="text-base font-bold">Famous Temples ({FAMOUS_TEMPLES.length})</h2>
          </div>
          <ul className="space-y-1.5 text-xs max-h-48 overflow-y-auto pr-1">
            {FAMOUS_TEMPLES.map((t) => (
              <li key={t.id}>
                <button onClick={() => onNavigate(`/temples/${t.id}`)} className="text-stone-700 hover:text-[#9A3412] font-medium hover:underline text-left truncate block w-full">
                  • {t.name} ({t.city})
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Category 6: Vrats, Ekadashi, Purnima & Holidays */}
        <section className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-[#9A3412] font-bold font-serif pb-2 border-b border-stone-200">
            <Sparkles className="w-5 h-5 text-[#9A3412]" />
            <h2 className="text-base font-bold">Vrats & Fasting Observances</h2>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li>
              <button onClick={() => onNavigate('/ekadashi/2027')} className="text-stone-700 hover:text-[#9A3412] font-medium hover:underline text-left">
                → Ekadashi 2027 Fasting & Parana Timings
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/purnima/2027')} className="text-stone-700 hover:text-[#9A3412] font-medium hover:underline text-left">
                → Purnima 2027 Full Moon Dates
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/amavasya/2027')} className="text-stone-700 hover:text-[#9A3412] font-medium hover:underline text-left">
                → Amavasya 2027 New Moon Dates
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/holidays/2027')} className="text-stone-700 hover:text-[#9A3412] font-medium hover:underline text-left">
                → Gazetted Government Holidays 2027
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/bank-holidays/2027')} className="text-stone-700 hover:text-[#9A3412] font-medium hover:underline text-left">
                → RBI Bank Holidays 2027 by State
              </button>
            </li>
          </ul>
        </section>

      </div>

      {/* Category 7: Global Hindu Diaspora & City-Wise Panchang Directory */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-[#9A3412] shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
                {isMarathi
                  ? 'जागतिक हिंदू शहर पंचांग सूची (Global City Panchang SEO Index)'
                  : isHindi
                  ? 'वैश्विक हिन्दू नगर पंचांग सूची (Global City Panchang Index)'
                  : 'Global Hindu Diaspora & City Panchang Directory (100+ Cities)'}
              </h2>
              <p className="text-xs text-stone-500">
                Direct links with city-tailored astronomical coordinates, local sunrise/sunset, Choghadiya, and Udaya Tithi calculations.
              </p>
            </div>
          </div>
        </div>

        {/* Sub-grids for Regional Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* North America (USA & Canada) */}
          <div className="space-y-2 p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-stone-200">
              <span>🇺🇸 🇨🇦 North America (USA & Canada)</span>
            </h3>
            <ul className="space-y-1.5 text-xs max-h-48 overflow-y-auto pr-1">
              {CITIES.filter(c => c.region === 'North America' || c.country === 'United States' || c.country === 'Canada').map((c) => (
                <li key={c.id}>
                  <button onClick={() => onNavigate(`/panchang/${c.id}`)} className="text-stone-700 hover:text-[#9A3412] font-medium hover:underline text-left truncate block w-full">
                    • {c.name} ({c.country})
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Europe & UK */}
          <div className="space-y-2 p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-stone-200">
              <span>🇬🇧 🇩🇪 🇳🇱 Europe & United Kingdom</span>
            </h3>
            <ul className="space-y-1.5 text-xs max-h-48 overflow-y-auto pr-1">
              {CITIES.filter(c => c.region === 'Europe & United Kingdom' || ['United Kingdom', 'Germany', 'Netherlands', 'France'].includes(c.country)).map((c) => (
                <li key={c.id}>
                  <button onClick={() => onNavigate(`/panchang/${c.id}`)} className="text-stone-700 hover:text-[#9A3412] font-medium hover:underline text-left truncate block w-full">
                    • {c.name} ({c.country})
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Middle East */}
          <div className="space-y-2 p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-stone-200">
              <span>🇦🇪 🇸🇦 🇴🇲 Middle East & Gulf</span>
            </h3>
            <ul className="space-y-1.5 text-xs max-h-48 overflow-y-auto pr-1">
              {CITIES.filter(c => c.region === 'Middle East' || ['United Arab Emirates', 'Saudi Arabia', 'Oman', 'Kuwait', 'Qatar'].includes(c.country)).map((c) => (
                <li key={c.id}>
                  <button onClick={() => onNavigate(`/panchang/${c.id}`)} className="text-stone-700 hover:text-[#9A3412] font-medium hover:underline text-left truncate block w-full">
                    • {c.name} ({c.country})
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Southeast Asia & Oceania */}
          <div className="space-y-2 p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-stone-200">
              <span>🇲🇾 🇸🇬 🇦🇺 🇳🇿 SE Asia & Oceania</span>
            </h3>
            <ul className="space-y-1.5 text-xs max-h-48 overflow-y-auto pr-1">
              {CITIES.filter(c => c.region === 'Southeast Asia & Oceania' || ['Australia', 'New Zealand', 'Malaysia', 'Singapore'].includes(c.country)).map((c) => (
                <li key={c.id}>
                  <button onClick={() => onNavigate(`/panchang/${c.id}`)} className="text-stone-700 hover:text-[#9A3412] font-medium hover:underline text-left truncate block w-full">
                    • {c.name} ({c.country})
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Historic Diaspora Hubs */}
          <div className="space-y-2 p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-stone-200">
              <span>🏝️ Historic Diaspora & Sacred Sites</span>
            </h3>
            <ul className="space-y-1.5 text-xs max-h-48 overflow-y-auto pr-1">
              {CITIES.filter(c => c.region === 'Historic Diaspora Hubs' || ['Mauritius', 'Fiji', 'South Africa', 'Trinidad and Tobago', 'Guyana', 'Nepal'].includes(c.country)).map((c) => (
                <li key={c.id}>
                  <button onClick={() => onNavigate(`/panchang/${c.id}`)} className="text-stone-700 hover:text-[#9A3412] font-medium hover:underline text-left truncate block w-full">
                    • {c.name} ({c.country})
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Sacred Indian Pilgrimages & Metros */}
          <div className="space-y-2 p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-stone-200">
              <span>🕉️ Sacred Indian Pilgrimages & Metros</span>
            </h3>
            <ul className="space-y-1.5 text-xs max-h-48 overflow-y-auto pr-1">
              {CITIES.filter(c => c.country === 'India' && (c.category === 'pilgrimage' || c.category === 'metro')).map((c) => (
                <li key={c.id}>
                  <button onClick={() => onNavigate(`/panchang/${c.id}`)} className="text-stone-700 hover:text-[#9A3412] font-medium hover:underline text-left truncate block w-full">
                    • {c.name} ({c.state})
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <AdSlot type="before-footer" />
    </div>
  );
}
