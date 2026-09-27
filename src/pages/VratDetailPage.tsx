import React, { useState } from 'react';
import { LanguageCode } from '../types';
import { MONTHLY_VRATS_2027, VratDetail } from '../data/vratEngine';
import { FESTIVALS_2027, EKADASHI_2027 } from '../data/calendarData';
import { getUIText, getWeekdayLocalized } from '../data/localization';
import Breadcrumbs from '../components/Breadcrumbs';
import AdSlot from '../components/AdSlot';
import ShareButtons from '../components/ShareButtons';
import VratRitualChecklist from '../components/VratRitualChecklist';
import {
  Calendar,
  Clock,
  Sparkles,
  BookOpen,
  ShieldCheck,
  ChevronLeft,
  Flame,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Download,
  Moon,
  Sun
} from 'lucide-react';

interface VratDetailPageProps {
  slug: string;
  currentLang?: LanguageCode;
  onNavigate: (path: string) => void;
}

export default function VratDetailPage({
  slug,
  currentLang = 'en',
  onNavigate
}: VratDetailPageProps) {
  const isMarathi = currentLang === 'mr';
  const isHindi = currentLang === 'hi';

  const cleanSlug = slug.toLowerCase().trim();

  // 1. Try finding in MONTHLY_VRATS_2027
  const vratFromEngine = MONTHLY_VRATS_2027.find(
    (v) => v.id === cleanSlug || v.id.replace(/-2027$/, '') === cleanSlug.replace(/-2027$/, '')
  );

  // 2. Try finding in FESTIVALS_2027
  const fest = FESTIVALS_2027.find(
    (f) => f.slug === cleanSlug || f.id === cleanSlug || f.slug.replace(/-2027$/, '') === cleanSlug.replace(/-2027$/, '')
  );

  // 3. Try finding in EKADASHI_2027
  const ekadashi = EKADASHI_2027.find(
    (e) => e.slug === cleanSlug || e.id === cleanSlug || e.slug.replace(/-2027$/, '') === cleanSlug.replace(/-2027$/, '')
  );

  // Fallback to first vrat if not found
  const vrat: VratDetail = vratFromEngine || {
    id: cleanSlug,
    name: fest?.name || ekadashi?.name || 'Vedic Vrat Observance',
    nameHi: fest?.nameHi || ekadashi?.name || 'वैदिक व्रत अनुष्ठान',
    nameRegional: fest?.nameRegional,
    category: ekadashi ? 'ekadashi' : 'special',
    monthIndex: 0,
    gregorianDate: fest?.date2027 || ekadashi?.date2027 || '2027-01-18',
    dayOfWeek: fest?.dayOfWeek2027 || ekadashi?.dayOfWeek2027 || 'Monday',
    tithiText: fest?.tithiText || (ekadashi ? `${ekadashi.hinduMonth} ${ekadashi.paksha} Ekadashi` : 'Shukla Ekadashi'),
    paksha: (ekadashi?.paksha as any) || 'Shukla',
    deity: fest?.deity || 'Bhagwan Vishnu / Shiva',
    fastingType: 'Phalahar (Fruits & Milk)',
    paranaTime: ekadashi?.paranaTime || '06:30 AM to 09:00 AM (Next Day)',
    scripturalReference: 'Padma Purana & Bhavishya Purana',
    significance: fest?.significance || ekadashi?.significance || 'Sacred Vedic fasting discipline removing karmic obstacles.',
    sankalpaMantra: {
      sanskrit: 'ॐ नमो भगवते वासुदेवाय। मम सर्वपापक्षयपूर्वकं श्रीविष्णुप्रीत्यर्थं व्रतं करिष्ये।',
      transliteration: 'Om namo bhagavate vāsudevāya. Mama sarvapāpakṣayapūrvakaṁ śrīviṣṇuprītyarthaṁ vrataṁ kariṣye.',
      meaning: 'Salutations to the Supreme Lord. I resolve to observe this sacred fast to dissolve sins and attain divine grace.'
    },
    rituals: fest?.rituals || [
      'Early morning bath during Brahma Muhurat with sacred water',
      'Taking solemn Vrat Sankalpa with holy water in right palm',
      'Worshipping the deity with flowers, incense, and ghee lamp',
      'Recitation of Vrat Katha and divine stotrams',
      'Observing Satvik Phalahari diet avoiding all grains and salt',
      'Next morning Parana within auspicious Muhurat hours'
    ],
    pujaVidhi: fest?.pujaVidhi || 'Offer Panchamrit, sandalwood paste, fresh flowers, and seasonal fruits to the deity.',
    dietaryRules: {
      allowed: ['Fresh fruits', 'Cow milk & curd', 'Makhana (Fox nuts)', 'Sabudana', 'Singhara flour', 'Sendha Namak (Rock salt)'],
      prohibited: ['Grains (Rice, Wheat)', 'Lentils & Beans', 'Garlic & Onion', 'Table Salt', 'Non-veg & alcohol']
    }
  };

  const [copiedMantra, setCopiedMantra] = useState(false);

  const handleCopyMantra = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(vrat.sankalpaMantra.sanskrit);
      setCopiedMantra(true);
      setTimeout(() => setCopiedMantra(false), 2500);
    }
  };

  const handleDownloadICS = () => {
    const cleanDate = vrat.gregorianDate.replace(/-/g, '');
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//NewsDarshan Vedic Calendar//EN',
      'BEGIN:VEVENT',
      `UID:${vrat.id}@newsdarshan.in`,
      `DTSTAMP:${cleanDate}T000000Z`,
      `DTSTART;VALUE=DATE:${cleanDate}`,
      `SUMMARY:${vrat.name} - Vedic Vrat`,
      `DESCRIPTION:${vrat.significance.replace(/\n/g, ' ')} Parana: ${vrat.paranaTime || 'Morning'}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${vrat.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const breadcrumbs = [
    { name: getUIText(currentLang, 'home', 'Home'), url: '/' },
    { name: getUIText(currentLang, 'vrat', 'Vrat & Upvas'), url: '/vrat' },
    { name: vrat.name, url: `/vrat/${cleanSlug}` }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      {/* Hero Banner */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-[#FAF1EC] via-[#FAF5F0] to-[#F5ECE5] rounded-3xl border border-[#E8DCD4] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 border border-amber-300 text-xs font-bold text-[#9A3412] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{vrat.tithiText} · {vrat.fastingType}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 font-serif leading-tight">
              {isMarathi && vrat.nameRegional?.mr ? vrat.nameRegional.mr : isHindi ? vrat.nameHi : vrat.name} 2027
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-stone-600 font-medium">
              <span className="font-bold text-stone-900 font-mono">{vrat.gregorianDate} ({vrat.dayOfWeek})</span>
              <span>·</span>
              <span>{getUIText(currentLang, 'deity', 'Deity')}: <strong className="text-stone-800">{vrat.deity}</strong></span>
              {vrat.paranaTime && (
                <>
                  <span>·</span>
                  <span className="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    {getUIText(currentLang, 'paranaTiming', 'Parana')}: {vrat.paranaTime}
                  </span>
                </>
              )}
            </div>

            <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-3xl leading-relaxed">
              {vrat.significance}
            </p>
          </div>

          {/* Quick Buttons */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <button
              type="button"
              onClick={handleDownloadICS}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#9A3412] hover:bg-[#7C2D12] text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>{isMarathi ? 'कॅलेंडरमध्ये जोडा' : 'Add to Calendar'}</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/vrat')}
              className="inline-flex items-center justify-center gap-1 px-4 py-2.5 bg-white hover:bg-stone-50 text-stone-700 text-xs font-bold rounded-xl border border-stone-300 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{isMarathi ? 'सर्व व्रते सूची' : 'All Vrats Hub'}</span>
            </button>
          </div>
        </div>
      </div>

      <AdSlot type="top" />

      {/* INTERACTIVE RITUAL CHECKLIST COMPONENT */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold uppercase tracking-wider text-[#9A3412]">
            {isMarathi ? 'व्रत संकल्प आणि विधी ट्रॅकर' : 'Daily Ritual & Vrat Tracker'}
          </div>
          <span className="text-xs text-stone-500 font-medium">
            {isMarathi ? 'आपोआप सेव्ह होते' : 'Auto-saves to your device'}
          </span>
        </div>

        <VratRitualChecklist
          vratId={vrat.id}
          vratName={vrat.name}
          rituals={vrat.rituals}
          paranaTime={vrat.paranaTime}
          deity={vrat.deity}
          currentLang={currentLang}
        />
      </section>

      {/* Sankalpa Mantra Card */}
      <section className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#9A3412]" />
            <h2 className="text-lg sm:text-xl font-bold text-stone-900 font-serif">
              {isMarathi ? 'प्रातः संकल्प मंत्र' : isHindi ? 'प्रातः संकल्प मन्त्र' : 'Morning Vrat Sankalpa Mantra'}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleCopyMantra}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-[#FAF1EC] border border-[#E8DCD4] rounded-xl text-[#9A3412] hover:bg-[#F3E5DD] transition-colors"
          >
            {copiedMantra ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">{isMarathi ? 'कॉपी झाले!' : 'Copied!'}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{isMarathi ? 'मंत्र कॉपी करा' : 'Copy Mantra'}</span>
              </>
            )}
          </button>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF6F2] border border-amber-200/80 font-serif text-base sm:text-lg font-bold text-stone-900 leading-relaxed text-center">
          {vrat.sankalpaMantra.sanskrit}
        </div>

        <div className="text-xs text-stone-500 font-mono italic text-center">
          {vrat.sankalpaMantra.transliteration}
        </div>

        <div className="text-xs sm:text-sm text-stone-700 bg-stone-50 p-3.5 rounded-xl border border-stone-200">
          <strong>{isMarathi ? 'अर्थ:' : 'Meaning:'}</strong> {vrat.sankalpaMantra.meaning}
        </div>
      </section>

      {/* Dietary Rules & Puja Vidhi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Permitted Foods */}
        <section className="bg-white rounded-3xl border border-stone-200/90 p-6 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-900 font-bold">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold font-serif">{isMarathi ? 'अनुमत फलाहार (Permitted)' : 'Permitted Fasting Foods'}</h3>
          </div>
          <ul className="text-xs sm:text-sm text-stone-700 space-y-2">
            {vrat.dietaryRules.allowed.map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Prohibited Foods */}
        <section className="bg-white rounded-3xl border border-stone-200/90 p-6 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-rose-900 font-bold">
            <XCircle className="w-5 h-5 text-rose-600" />
            <h3 className="text-base font-bold font-serif">{isMarathi ? 'वर्ज्य अन्न (Prohibited)' : 'Strictly Prohibited Items'}</h3>
          </div>
          <ul className="text-xs sm:text-sm text-stone-700 space-y-2">
            {vrat.dietaryRules.prohibited.map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Shastric Puja Vidhi Overview */}
      <section className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 space-y-3 shadow-xs">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#9A3412]" />
          <h2 className="text-lg font-bold text-stone-900 font-serif">
            {isMarathi ? 'शास्त्रोक्त पूजा विधी व पद्धती' : isHindi ? 'शास्त्रोक्त पूजा विधि एवं पद्धति' : 'Shastric Puja Vidhi & Methodology'}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed bg-[#FAF6F2] p-4 rounded-2xl border border-stone-200">
          {vrat.pujaVidhi}
        </p>
        <div className="text-xs text-stone-500 flex items-center gap-1.5 pt-1">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>{isMarathi ? 'संदर्भ ग्रंथ:' : 'Authority:'} {vrat.scripturalReference}</span>
        </div>
      </section>

      <ShareButtons
        title={`${vrat.name} 2027 Fasting Rituals & Muhurat – NewsDarshan`}
        url={`https://www.newsdarshan.in/vrat/${cleanSlug}`}
      />

      <AdSlot type="before-footer" />
    </div>
  );
}
