import React from 'react';
import { MONTH_NAMES, MONTH_DISPLAY_NAMES } from '../utils/seoEngine';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleNav = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer className="bg-[#241F1A] text-stone-300 pt-16 pb-12 border-t border-stone-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-12 border-b border-stone-800">
          
          {/* Column 1: Hindu Calendar 2027 */}
          <div>
            <h3 className="font-serif font-semibold text-white tracking-wide uppercase text-xs mb-4 text-[#E8602E]">
              Hindu Calendar 2027
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="/hindu-calendar-2027"
                  onClick={(e) => handleNav('/hindu-calendar-2027', e)}
                  className="hover:text-white transition-colors"
                >
                  Full 2027 Calendar
                </a>
              </li>
              {MONTH_NAMES.slice(0, 6).map((m) => (
                <li key={m}>
                  <a
                    href={`/hindu-calendar-2027/${m}`}
                    onClick={(e) => handleNav(`/hindu-calendar-2027/${m}`, e)}
                    className="hover:text-white transition-colors"
                  >
                    {MONTH_DISPLAY_NAMES[m]} 2027
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/hindu-calendar-2027/july"
                  onClick={(e) => handleNav('/hindu-calendar-2027/july', e)}
                  className="hover:text-white transition-colors"
                >
                  July – Dec 2027
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Regional Calendars */}
          <div>
            <h3 className="font-serif font-semibold text-white tracking-wide uppercase text-xs mb-4 text-[#E8602E]">
              Regional Calendars
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="/marathi-calendar-2027"
                  onClick={(e) => handleNav('/marathi-calendar-2027', e)}
                  className="hover:text-white transition-colors"
                >
                  Marathi Calendar 2027
                </a>
              </li>
              <li>
                <a
                  href="/gujarati-calendar-2027"
                  onClick={(e) => handleNav('/gujarati-calendar-2027', e)}
                  className="hover:text-white transition-colors"
                >
                  Gujarati Calendar 2027
                </a>
              </li>
              <li>
                <a
                  href="/telugu-calendar-2027"
                  onClick={(e) => handleNav('/telugu-calendar-2027', e)}
                  className="hover:text-white transition-colors"
                >
                  Telugu Calendar 2027
                </a>
              </li>
              <li>
                <a
                  href="/tamil-calendar-2027"
                  onClick={(e) => handleNav('/tamil-calendar-2027', e)}
                  className="hover:text-white transition-colors"
                >
                  Tamil Calendar 2027
                </a>
              </li>
              <li>
                <a
                  href="/kannada-calendar-2027"
                  onClick={(e) => handleNav('/kannada-calendar-2027', e)}
                  className="hover:text-white transition-colors"
                >
                  Kannada Calendar 2027
                </a>
              </li>
              <li>
                <a
                  href="/bengali-calendar-2027"
                  onClick={(e) => handleNav('/bengali-calendar-2027', e)}
                  className="hover:text-white transition-colors"
                >
                  Bengali Calendar 1433–1434
                </a>
              </li>
              <li>
                <a
                  href="/odia-calendar-2027"
                  onClick={(e) => handleNav('/odia-calendar-2027', e)}
                  className="hover:text-white transition-colors"
                >
                  Odia Calendar 2027
                </a>
              </li>
              <li>
                <a
                  href="/malayalam-calendar-2027"
                  onClick={(e) => handleNav('/malayalam-calendar-2027', e)}
                  className="hover:text-white transition-colors"
                >
                  Malayalam Calendar 2027
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Panchang & Vrats */}
          <div>
            <h3 className="font-serif font-semibold text-white tracking-wide uppercase text-xs mb-4 text-[#E8602E]">
              Panchang & Vrats
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="/today"
                  onClick={(e) => handleNav('/today', e)}
                  className="hover:text-white transition-colors"
                >
                  Today's Panchang
                </a>
              </li>
              <li>
                <a
                  href="/choghadiya"
                  onClick={(e) => handleNav('/choghadiya', e)}
                  className="hover:text-white transition-colors"
                >
                  Day & Night Choghadiya
                </a>
              </li>
              <li>
                <a
                  href="/festivals/2027"
                  onClick={(e) => handleNav('/festivals/2027', e)}
                  className="hover:text-white transition-colors"
                >
                  2027 Hindu Festivals
                </a>
              </li>
              <li>
                <a
                  href="/ekadashi/2027"
                  onClick={(e) => handleNav('/ekadashi/2027', e)}
                  className="hover:text-white transition-colors"
                >
                  Ekadashi 2027 List
                </a>
              </li>
              <li>
                <a
                  href="/purnima/2027"
                  onClick={(e) => handleNav('/purnima/2027', e)}
                  className="hover:text-white transition-colors"
                >
                  Purnima 2027 Dates
                </a>
              </li>
              <li>
                <a
                  href="/amavasya/2027"
                  onClick={(e) => handleNav('/amavasya/2027', e)}
                  className="hover:text-white transition-colors"
                >
                  Amavasya 2027 Dates
                </a>
              </li>
              <li>
                <a
                  href="/vrat"
                  onClick={(e) => handleNav('/vrat', e)}
                  className="hover:text-white transition-colors"
                >
                  All Sacred Hindu Vrats
                </a>
              </li>
              <li>
                <a
                  href="/temples"
                  onClick={(e) => handleNav('/temples', e)}
                  className="hover:text-[#E8602E] font-medium transition-colors"
                >
                  Famous Temples & Timings
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Muhurat & Astrology */}
          <div>
            <h3 className="font-serif font-semibold text-white tracking-wide uppercase text-xs mb-4 text-[#E8602E]">
              Vedic Astrology & Tools
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="/kundli-milan"
                  onClick={(e) => handleNav('/kundli-milan', e)}
                  className="hover:text-white transition-colors"
                >
                  Kundli Milan (36 Gunas)
                </a>
              </li>
              <li>
                <a
                  href="/sade-sati"
                  onClick={(e) => handleNav('/sade-sati', e)}
                  className="hover:text-white transition-colors"
                >
                  Shani Sade Sati & Dhaiya
                </a>
              </li>
              <li>
                <a
                  href="/manglik-dosha"
                  onClick={(e) => handleNav('/manglik-dosha', e)}
                  className="hover:text-white transition-colors"
                >
                  Manglik Dosha Checker
                </a>
              </li>
              <li>
                <a
                  href="/date-converter"
                  onClick={(e) => handleNav('/date-converter', e)}
                  className="hover:text-white transition-colors"
                >
                  Hindu Date & Tithi Converter
                </a>
              </li>
              <li>
                <a
                  href="/vedic-age-calculator"
                  onClick={(e) => handleNav('/vedic-age-calculator', e)}
                  className="hover:text-white transition-colors"
                >
                  Vedic Solar & Lunar Age
                </a>
              </li>
              <li>
                <a
                  href="/sun-visualization"
                  onClick={(e) => handleNav('/sun-visualization', e)}
                  className="hover:text-white transition-colors"
                >
                  Sun Solar Arc & Altitude
                </a>
              </li>
              <li>
                <a
                  href="/moon-phase"
                  onClick={(e) => handleNav('/moon-phase', e)}
                  className="hover:text-white transition-colors"
                >
                  Moon Phase & Chandra Tithi
                </a>
              </li>
              <li>
                <a
                  href="/rashifal"
                  onClick={(e) => handleNav('/rashifal', e)}
                  className="hover:text-white transition-colors"
                >
                  Daily & Yearly Rashifal
                </a>
              </li>
              <li>
                <a
                  href="/muhurat"
                  onClick={(e) => handleNav('/muhurat', e)}
                  className="hover:text-white transition-colors"
                >
                  Shubh Muhurat 2027
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: E-E-A-T & Trust */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h3 className="font-serif font-semibold text-white tracking-wide uppercase text-xs mb-4 text-[#E8602E]">
              Editorial & Trust
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed mb-4">
              NewsDarshan is dedicated to high-precision Vedic astronomical timekeeping, authentic festival dates, and zero-hallucination astrological knowledge grounded in Surya Siddhanta and modern ephemeris models.
            </p>
            <ul className="space-y-1.5 text-xs text-stone-400">
              <li>
                <a
                  href="/about"
                  onClick={(e) => handleNav('/about', e)}
                  className="hover:text-white transition-colors"
                >
                  About NewsDarshan
                </a>
              </li>
              <li>
                <a
                  href="/panchang-methodology"
                  onClick={(e) => handleNav('/panchang-methodology', e)}
                  className="hover:text-white transition-colors"
                >
                  Panchang Methodology
                </a>
              </li>
              <li>
                <a
                  href="/editorial-policy"
                  onClick={(e) => handleNav('/editorial-policy', e)}
                  className="hover:text-white transition-colors"
                >
                  Editorial & Accuracy Policy
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => handleNav('/contact', e)}
                  className="hover:text-white transition-colors"
                >
                  Contact & Corrections
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  onClick={(e) => handleNav('/privacy-policy', e)}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  onClick={(e) => handleNav('/terms', e)}
                  className="hover:text-white transition-colors"
                >
                  Terms and Conditions
                </a>
              </li>
              <li>
                <a
                  href="/disclaimer"
                  onClick={(e) => handleNav('/disclaimer', e)}
                  className="hover:text-white transition-colors"
                >
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-stone-200">NewsDarshan</span>
            <span>·</span>
            <span>www.newsdarshan.in</span>
          </div>
          <div>
            © {new Date().getFullYear()} NewsDarshan. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
