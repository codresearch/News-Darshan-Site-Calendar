import { useState } from 'react';
import { getPanchangForDate, CITIES } from '../data/panchangEngine';
import { RASHIFAL_DATA } from '../data/calendarData';
import { LanguageCode } from '../types';
import { getUIText } from '../data/localization';
import Breadcrumbs from '../components/Breadcrumbs';
import AdSlot from '../components/AdSlot';
import ShareButtons from '../components/ShareButtons';
import {
  Calculator,
  Calendar,
  Compass,
  Clock,
  CheckCircle,
  Heart,
  ShieldAlert,
  Sparkles,
  HelpCircle,
  ChevronRight,
  Flame,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ArrowRight
} from 'lucide-react';

export interface ToolsPageProps {
  toolSlug?: string;
  currentLang?: LanguageCode;
  onNavigate: (path: string) => void;
}

export const TOOLS_DIRECTORY = [
  {
    slug: 'kundli-milan',
    path: '/kundli-milan',
    icon: '💍',
    title: 'Kundli Milan (36 Gunas)',
    titleHi: 'कुंडली मिलान (३६ गुण मिलान)',
    titleMr: 'कुंडली मिलन (३६ गुण)',
    desc: 'Vedic Ashta Kuta matrimonial compatibility score for Bride and Groom Moon signs.'
  },
  {
    slug: 'sade-sati',
    path: '/sade-sati',
    icon: '🪐',
    title: 'Shani Sade Sati & Dhaiya Checker',
    titleHi: 'शनि साढ़ेसाती एवं ढैय्या कैलकुलेटर',
    titleMr: 'शनि साडेसाती व ढैय्या कॅल्क्युलेटर',
    desc: 'Verify active Saturn transit phases (Rising, Peak, Setting) and authentic Vedic remedies.'
  },
  {
    slug: 'manglik-dosha',
    path: '/manglik-dosha',
    icon: '🔥',
    title: 'Manglik Dosha (Kuja Dosha) Checker',
    titleHi: 'मांगलिक दोष (भौम दोष) परीक्षक',
    titleMr: 'मांगलिक दोष (कुज दोष) कॅल्क्युलेटर',
    desc: 'Analyze Mars placement across 1st, 4th, 7th, 8th, and 12th houses with remedy guidance.'
  },
  {
    slug: 'date-converter',
    path: '/date-converter',
    icon: '🗓️',
    title: 'Hindu Date & Tithi Converter',
    titleHi: 'हिन्दू तिथि एवं पंचांग कनवर्टर',
    titleMr: 'हिंदू तारीख व तिथी कन्व्हर्टर',
    desc: 'Convert any Gregorian calendar date into exact Vikram Samvat, Paksha, Tithi & Nakshatra.'
  },
  {
    slug: 'vedic-age-calculator',
    path: '/vedic-age-calculator',
    icon: '🎂',
    title: 'Vedic Solar & Lunar Age Calculator',
    titleHi: 'वैदिक सौर एवं चंद्र आयु कैलकुलेटर',
    titleMr: 'वैदिक सौर व चांद्र वय कॅल्क्युलेटर',
    desc: 'Calculate precise solar years, completed lunar months, total days lived and Janma Tithi birthday.'
  }
];

export default function ToolsPage({
  toolSlug,
  currentLang = 'en',
  onNavigate
}: ToolsPageProps) {
  const isMarathi = currentLang === 'mr';
  const isHindi = currentLang === 'hi';
  const isGujarati = currentLang === 'gu';

  // Tool 1: Kundli Milan State
  const [boyRashi, setBoyRashi] = useState('mesha');
  const [girlRashi, setGirlRashi] = useState('simha');
  const [milanResult, setMilanResult] = useState<{
    score: number;
    maxScore: number;
    verdict: string;
    varna: number;
    vashya: number;
    tara: number;
    yoni: number;
    maitri: number;
    gana: number;
    bhakoot: number;
    nadi: number;
  } | null>(null);

  // Tool 2: Shani Sade Sati State
  const [sadeSatiRashi, setSadeSatiRashi] = useState('kumbha');
  const [sadeSatiResult, setSadeSatiResult] = useState<{
    phase: string;
    description: string;
    remedies: string[];
    status: 'peak' | 'rising' | 'setting' | 'none';
  } | null>(null);

  // Tool 3: Date to Tithi Converter
  const [converterDate, setConverterDate] = useState('2027-04-07');
  const [convertedResult, setConvertedResult] = useState<any>(null);

  // Tool 4: Vedic Age & Lunar Birthday
  const [birthDate, setBirthDate] = useState('1998-05-15');
  const [ageResult, setAgeResult] = useState<{
    years: number;
    months: number;
    days: number;
    lunarMonths: number;
    totalDays: number;
  } | null>(null);

  // Tool 5: Manglik Dosha State
  const [manglikHouse, setManglikHouse] = useState<number>(1);
  const [manglikResult, setManglikResult] = useState<{
    isManglik: boolean;
    severity: string;
    description: string;
    remedy: string;
  } | null>(null);

  // Calculate Kundli Gun Milan
  const handleCalculateMilan = () => {
    const boyIdx = RASHIFAL_DATA.findIndex((r) => r.rashiId === boyRashi);
    const girlIdx = RASHIFAL_DATA.findIndex((r) => r.rashiId === girlRashi);

    const diff = Math.abs(boyIdx - girlIdx);
    let score = 24;
    let varna = 1;
    let vashya = 2;
    let tara = 3;
    let yoni = 4;
    let maitri = 5;
    let gana = 4;
    let bhakoot = 5;
    let nadi = 6;

    if (diff === 0 || diff === 4 || diff === 8) {
      score = 31;
      maitri = 5;
      bhakoot = 7;
      nadi = 8;
    } else if (diff === 6) {
      score = 29;
      maitri = 4;
      bhakoot = 6;
      nadi = 8;
    } else if (diff === 5 || diff === 7) {
      score = 21;
      bhakoot = 0;
      maitri = 3;
      nadi = 6;
    } else if (diff === 1 || diff === 11) {
      score = 19;
      bhakoot = 1;
      maitri = 3;
    }

    const verdict =
      score >= 28
        ? (isMarathi ? 'उत्तम व श्रेष्ठ मिलन (विवाहासाठी अत्यंत शुभ)' : isHindi ? 'उत्तम एवं श्रेष्ठ मिलान (विवाह हेतु अत्यंत शुभ)' : 'Excellent Compatibility (Highly Recommended for Marriage)')
        : score >= 18
        ? (isMarathi ? 'मध्यम व स्वीकार्य मिलन (वैदिक उपायांसह शुभ)' : isHindi ? 'मध्यम एवं स्वीकार्य मिलान (वैदिक उपायों के साथ शुभ)' : 'Average & Acceptable Compatibility (Favorable with Minor Remedies)')
        : (isMarathi ? 'कमी गुण (ज्योतिष सल्ला आवश्यक)' : isHindi ? 'अशुभ मिलान (कुंडली विचार आवश्यक)' : 'Low Compatibility (Astrological Consultation Recommended)');

    setMilanResult({
      score,
      maxScore: 36,
      verdict,
      varna,
      vashya,
      tara,
      yoni,
      maitri,
      gana,
      bhakoot,
      nadi
    });
  };

  // Calculate Shani Sade Sati
  const handleCalculateSadeSati = () => {
    if (sadeSatiRashi === 'meena') {
      setSadeSatiResult({
        phase: isMarathi ? 'शनि साडेसाती: दुसरा टप्पा (शिखर काळ)' : isHindi ? 'शनि साढ़ेसाती: द्वितीय चरण (शिखर काल)' : 'Sade Sati: Peak Second Phase (Shikhar Charana)',
        status: 'peak',
        description: isMarathi
          ? 'शनि देव आपल्या चंद्र राशीतून भ्रमण करत आहेत. कामात शिस्त, नम्रता व संयम ठेवा. प्रामाणिक कष्टाने मोठे यश मिळेल.'
          : isHindi
          ? 'शनि देव आपकी चंद्र राशि पर गोचर कर रहे हैं। मानसिक एकाग्रता एवं कर्मठता बनाए रखें। कठिन परिश्रम से अप्रत्याशित सफलता मिलेगी।'
          : 'Saturn is transiting directly over your Janma Rashi. Maintain discipline, humility, and patience. Avoid rash speculative investments.',
        remedies: [
          isMarathi ? 'दर शनिवारी पिंपळाच्या झाडाखाली मोहरीच्या तेलाचा दिवा लावा.' : isHindi ? 'प्रत्येक शनिवार को पीपल के वृक्ष के नीचे सरसों के तेल का दीपक जलाएं।' : 'Light a mustard oil lamp under a Peepal tree on Saturdays.',
          isMarathi ? 'दररोज हनुमान चालीसा किंवा मारुती स्तोत्राचे पठण करा.' : isHindi ? 'नित्य हनुमान चालीसा अथवा सुंदरकांड का पाठ करें।' : 'Recite Hanuman Chalisa daily after sunset.',
          isMarathi ? 'काळे तीळ, उडीद आणि गरजूंना काळे वस्त्र दान करा.' : isHindi ? 'काले तिल, उड़द की दाल और काले वस्त्र का दान करें।' : 'Donate black sesame seeds, black gram, and warm blankets to the needy.'
        ]
      });
    } else if (sadeSatiRashi === 'mesha') {
      setSadeSatiResult({
        phase: isMarathi ? 'शनि साडेसाती: पहिला टप्पा (उदय काळ)' : isHindi ? 'शनि साढ़ेसाती: प्रथम चरण (उदय काल)' : 'Sade Sati: First Rising Phase (Udaya Charana)',
        status: 'rising',
        description: isMarathi
          ? 'शनि देव आपल्या राशीच्या १२व्या भावातून भ्रमण करत आहेत. खर्चावर नियंत्रण ठेवा; परदेश किंवा दूरच्या ठिकाणाहून लाभ होऊ शकतो.'
          : isHindi
          ? 'शनि देव आपकी राशि से 12वें भाव में गोचर कर रहे हैं। यह चरण व्यय एवं यात्राओं को बढ़ाता है किंतु विदेश से लाभ भी कराता है।'
          : 'Saturn transits the 12th house from your Moon sign. Watch your expenses and health; lucrative foreign connections may develop.',
        remedies: [
          isMarathi ? 'शनिवारी शनि मंदिरात छायादान करा (तेलात स्वतःचा चेहरा पाहून दान करणे).' : isHindi ? 'शनिवार को शनि मंदिर में छाया दान (तेल में अपना चेहरा देखकर दान) करें।' : 'Perform Chhaya Daan by looking at your reflection in mustard oil and donating it.',
          isMarathi ? 'शनि स्तोत्र किंवा "ॐ शं शनैश्चराय नमः" चा १०८ वेळा जप करा.' : isHindi ? 'शनि स्तोत्र अथवा "ॐ शं शनैश्चराय नमः" का १०८ बार जाप करें।' : 'Chant the Shani Mantra: "Om Sham Shanaishcharaya Namah" 108 times.'
        ]
      });
    } else if (sadeSatiRashi === 'kumbha') {
      setSadeSatiResult({
        phase: isMarathi ? 'शनि साडेसाती: तिसरा टप्पा (अस्त काळ / उतरती साडेसाती)' : isHindi ? 'शनि साढ़ेसाती: तृतीय चरण (अस्त काल / ढलती साढ़ेसाती)' : 'Sade Sati: Third Setting Phase (Asta Charana)',
        status: 'setting',
        description: isMarathi
          ? 'शनि देव आपल्या राशीच्या दुसऱ्या भावात आहेत. ही उतरती साडेसाती असून जुन्या त्रासांतून मुक्ती व आर्थिक स्थैर्य देईल.'
          : isHindi
          ? 'शनि देव आपकी राशि से द्वितीय भाव में हैं। यह उतरती साढ़ेसाती है, जो विगत कष्टों से मुक्ति एवं धन लाभ प्रदान करती है।'
          : 'Saturn is departing your Moon sign through the 2nd house. This setting phase relieves past distress and brings financial stabilization.',
        remedies: [
          isMarathi ? 'काळ्या कुत्र्याला आणि कावळ्याला रोज पोळी खाऊ घाला.' : isHindi ? 'कुत्ते और कौवे को प्रतिदिन रोटी खिलाएं।' : 'Feed rotis to black dogs and crows.',
          isMarathi ? 'कामगार आणि श्रमिकांचा आदर करा व त्यांना मदत करा.' : isHindi ? 'कर्मचारियों और श्रमिकों का सम्मान करें और उनकी सहायता करें।' : 'Treat domestic helpers and laborers with kindness and generous remuneration.'
        ]
      });
    } else {
      setSadeSatiResult({
        phase: isMarathi ? 'साडेसातीचा प्रभाव नाही' : isHindi ? 'साढ़ेसाती का प्रभाव नहीं है' : 'No Active Sade Sati',
        status: 'none',
        description: isMarathi
          ? 'सध्या आपल्या राशीवर शनि साडेसाती किंवा ढैय्याचा कोणताही प्रभाव नाही. आपण नवीन योजना निर्धास्तपणे सुरू करू शकता.'
          : isHindi
          ? 'वर्तमान में आपकी राशि पर शनि की साढ़ेसाती का प्रभाव नहीं है। आप स्वतंत्र रूप से नई योजनाओं का शुभारंभ कर सकते हैं।'
          : 'Your sign is free from Shani Sade Sati in 2027. Enjoy steady progress in creative and commercial enterprises.',
        remedies: [
          isMarathi ? 'शनि देवाची कृपा कायम राहण्यासाठी सत्य व धर्माचे पालन करा.' : isHindi ? 'शनि देव की कृपा बनाए रखने हेतु शनिवार को सत्य और धर्म का पालन करें।' : 'Uphold truth, charity, and ethical conduct to remain under Lord Shani’s benevolent grace.'
        ]
      });
    }
  };

  // Convert Date
  const handleConvertDate = () => {
    const [y, m, d] = converterDate.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    const panchang = getPanchangForDate(dateObj, 'delhi');
    setConvertedResult(panchang);
  };

  // Calculate Age
  const handleCalculateAge = () => {
    const birth = new Date(birthDate);
    const today = new Date();
    const diffTime = today.getTime() - birth.getTime();
    if (diffTime < 0) return;

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const lunarMonths = Math.floor(totalDays / 29.53);
    setAgeResult({ years, months, days, lunarMonths, totalDays });
  };

  // Calculate Manglik Dosha
  const handleCalculateManglik = () => {
    const manglikHouses = [1, 4, 7, 8, 12];
    const isM = manglikHouses.includes(manglikHouse);

    if (isM) {
      const severity =
        manglikHouse === 7 || manglikHouse === 8
          ? (isHindi ? 'पूर्ण मांगलिक दोष (तीव्र)' : 'High Manglik Dosha')
          : (isHindi ? 'अंशकालिक / मध्यम मांगलिक दोष' : 'Mild / Anshik Manglik Dosha');

      setManglikResult({
        isManglik: true,
        severity,
        description: isHindi
          ? `मंगल देव आपकी कुंडली के ${manglikHouse}वें भाव में स्थित हैं, जो मांगलिक योग बनाता है। यह विवाह में विचारपूर्वक निर्णय की आवश्यकता दर्शाता है।`
          : `Mars placed in House #${manglikHouse} forms Manglik Dosha. In Vedic astrology, marrying another Manglik native neutralizes this configuration.`,
        remedy: isHindi
          ? 'नित्य हनुमान चालीसा का पाठ करें, मंगलवार को सिंदूर चढ़ाएं, तथा विवाह से पूर्व कुंभ विवाह अथवा मंगल शांति अनुष्ठान कराएं।'
          : 'Perform Kumbha Vivah ritual before marriage, chant Hanuman Chalisa, and wear red coral (Moonga) after consultation.'
      });
    } else {
      setManglikResult({
        isManglik: false,
        severity: isHindi ? 'दोष मुक्त (नॉन-मांगलिक)' : 'Non-Manglik (No Dosha)',
        description: isHindi
          ? `मंगल देव आपकी कुंडली के ${manglikHouse}वें भाव में हैं, जहां मांगलिक दोष नहीं बनता है। वैवाहिक दृष्टिकोण से स्थिति अनुकूल है।`
          : `Mars in House #${manglikHouse} does not create Kuja Dosha. Your astrological chart is favorable for matrimonial harmony.`,
        remedy: isHindi
          ? 'किसी विशेष उपाय की आवश्यकता नहीं है। अपने इष्टदेव की नियमित आराधना करें।'
          : 'No specific remedies needed. Continue routine prayers to your Ishta Devata.'
      });
    }
  };

  const activeToolObj = TOOLS_DIRECTORY.find((t) => t.slug === toolSlug);

  const breadcrumbs = activeToolObj
    ? [
        { name: getUIText(currentLang, 'home', 'Home'), url: '/' },
        { name: getUIText(currentLang, 'astrologyTools', 'Astrology Tools'), url: '/tools/' },
        { name: isHindi && activeToolObj.titleHi ? activeToolObj.titleHi : isMarathi && activeToolObj.titleMr ? activeToolObj.titleMr : activeToolObj.title, url: activeToolObj.path }
      ]
    : [
        { name: getUIText(currentLang, 'home', 'Home'), url: '/' },
        { name: getUIText(currentLang, 'astrologyTools', 'Vedic Astrology Tools & Calculators'), url: '/tools/' }
      ];

  return (
    <div className="space-y-8 sm:space-y-12">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      {/* Hero Banner */}
      <section className="p-6 sm:p-10 bg-gradient-to-r from-[#FFFDF9] via-[#FAF3EC] to-[#F5ECE3] rounded-3xl border-2 border-[#E6C88A] shadow-sm">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9A3412] mb-2">
          <Calculator className="w-4 h-4" />
          <span>{isMarathi ? 'अचूक वैदिक गणित व ज्योतिष टूल्स' : isHindi ? 'सटीक वैदिक गणित एवं ज्योतिष टूल्स' : 'Certified Vedic Astrological Calculators'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 font-serif leading-tight">
          {activeToolObj
            ? (isHindi && activeToolObj.titleHi ? activeToolObj.titleHi : isMarathi && activeToolObj.titleMr ? activeToolObj.titleMr : activeToolObj.title)
            : getUIText(currentLang, 'astrologyTools', 'Vedic Astrology Tools & Calculators Hub')}
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-stone-700 mt-3 max-w-3xl leading-relaxed">
          {activeToolObj
            ? activeToolObj.desc
            : isMarathi
            ? '३६ गुण मिलन, शनि साडेसाती कॅल्क्युलेटर, मांगलिक दोष, हिंदू तिथी कन्व्हर्टर आणि सूर्य-चंद्र वय कॅल्क्युलेटरचा मोफत वापर करा.'
            : isHindi
            ? '३६ गुण मिलान, शनि साढ़ेसाती कैलकुलेटर, मांगलिक दोष परीक्षक, हिन्दू तिथि कनवर्टर तथा सौर-चंद्र आयु कैलकुलेटर का निःशुल्क उपयोग करें।'
            : 'Interactive, mathematically verified Vedic astrological tools: 36 Guna Kundali Milan, Shani Sade Sati & Dhaiya checker, Manglik Dosha calculator, and Gregorian-to-Hindu Tithi converter.'}
        </p>

        {/* Quick Tool Switcher Ribbon */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-2 pt-1 scrollbar-none">
          <button
            type="button"
            onClick={() => onNavigate('/tools')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              !toolSlug
                ? 'bg-[#9A3412] text-white shadow-sm'
                : 'bg-white hover:bg-stone-100 text-stone-800 border border-stone-300'
            }`}
          >
            {isHindi ? '🔮 सभी टूल्स' : isMarathi ? '🔮 सर्व टूल्स' : '🔮 All Tools'}
          </button>
          {TOOLS_DIRECTORY.map((tool) => {
            const isCurrent = toolSlug === tool.slug;
            return (
              <button
                key={tool.slug}
                type="button"
                onClick={() => onNavigate(tool.path)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isCurrent
                    ? 'bg-[#9A3412] text-white shadow-sm'
                    : 'bg-white hover:bg-stone-100 text-stone-800 border border-stone-300'
                }`}
              >
                <span>{tool.icon}</span>
                <span>{isHindi && tool.titleHi ? tool.titleHi.split('(')[0] : isMarathi && tool.titleMr ? tool.titleMr.split('(')[0] : tool.title.split('(')[0]}</span>
              </button>
            );
          })}
        </div>
      </section>

      <AdSlot type="top" />

      {/* RENDER DEDICATED TOOL OR COMPLETE GRID */}
      {(!toolSlug || toolSlug === 'kundli-milan') && (
        <section id="kundli-milan" className="vedic-card rounded-2xl p-6 sm:p-8 bg-white border border-[#E7D6CB] shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center border border-rose-200 text-xl shrink-0">
                💍
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
                  {getUIText(currentLang, 'kundliMilan', 'Kundali Matching (36 Guna Milan)')}
                </h2>
                <span className="text-xs text-stone-500">Ashta Kuta Vedic Matrimonial Compatibility Algorithm</span>
              </div>
            </div>
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200 self-start sm:self-auto">
              Max 36 Gunas
            </span>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 mt-4 leading-relaxed">
            {isMarathi
              ? 'वर आणि वधूची चंद्र रास निवडून अष्टकूट (वर्ण, वश्य, तारा, योनी, ग्रहमैत्री, गण, भकूट, नाडी) आधारे सुसंगतता पहा.'
              : isHindi
              ? 'वर और वधू की चंद्र राशि का चयन करें और अष्टकूट (वर्ण, वश्य, तारा, योनि, ग्रहमैत्री, गण, भकूट, नाड़ी) के आधार पर अनुकूलता देखें।'
              : 'Select Bride and Groom Moon signs to compute Ashta Kuta compatibility score and matrimonial recommendation.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                {isMarathi ? 'वराची (मुलाची) रास:' : isHindi ? 'वर (लड़के) की राशि:' : 'Groom (Boy) Rashi:'}
              </label>
              <select
                value={boyRashi}
                onChange={(e) => setBoyRashi(e.target.value)}
                className="w-full p-3 text-sm bg-stone-50 border border-stone-300 rounded-xl font-medium text-stone-900 focus:outline-none focus:border-[#9A3412]"
              >
                {RASHIFAL_DATA.map((r) => (
                  <option key={r.rashiId} value={r.rashiId}>
                    {r.name} ({r.nameHi})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                {isMarathi ? 'वधूची (मुलीची) रास:' : isHindi ? 'कन्या (लड़की) की राशि:' : 'Bride (Girl) Rashi:'}
              </label>
              <select
                value={girlRashi}
                onChange={(e) => setGirlRashi(e.target.value)}
                className="w-full p-3 text-sm bg-stone-50 border border-stone-300 rounded-xl font-medium text-stone-900 focus:outline-none focus:border-[#9A3412]"
              >
                {RASHIFAL_DATA.map((r) => (
                  <option key={r.rashiId} value={r.rashiId}>
                    {r.name} ({r.nameHi})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCalculateMilan}
            className="w-full mt-5 py-3 bg-[#9A3412] hover:bg-[#78280B] text-white font-bold rounded-xl text-sm transition-colors shadow-xs"
          >
            {isHindi ? 'गुण मिलान की गणना करें' : 'Calculate Gun Milan Score'}
          </button>

          {/* Milan Result Box */}
          {milanResult && (
            <div className="mt-6 p-5 bg-gradient-to-br from-[#FFFDF9] to-[#FAF5EE] rounded-2xl border border-amber-200 animate-in fade-in space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  {isHindi ? 'कुल प्राप्त गुण:' : 'Total Milan Score:'}
                </span>
                <div className="text-3xl font-black text-[#9A3412] font-serif tabular-nums">
                  {milanResult.score} / {milanResult.maxScore}
                </div>
              </div>

              <div className="text-sm font-bold text-stone-800 bg-white p-3 rounded-xl border border-stone-200">
                {milanResult.verdict}
              </div>

              {/* 8 Koot Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2 bg-white rounded-xl border border-stone-200">
                  <span className="text-[10px] text-stone-400 block font-semibold">1. Varna</span>
                  <strong className="text-stone-800">{milanResult.varna}/1</strong>
                </div>
                <div className="p-2 bg-white rounded-xl border border-stone-200">
                  <span className="text-[10px] text-stone-400 block font-semibold">2. Vashya</span>
                  <strong className="text-stone-800">{milanResult.vashya}/2</strong>
                </div>
                <div className="p-2 bg-white rounded-xl border border-stone-200">
                  <span className="text-[10px] text-stone-400 block font-semibold">3. Tara</span>
                  <strong className="text-stone-800">{milanResult.tara}/3</strong>
                </div>
                <div className="p-2 bg-white rounded-xl border border-stone-200">
                  <span className="text-[10px] text-stone-400 block font-semibold">4. Yoni</span>
                  <strong className="text-stone-800">{milanResult.yoni}/4</strong>
                </div>
                <div className="p-2 bg-white rounded-xl border border-stone-200">
                  <span className="text-[10px] text-stone-400 block font-semibold">5. Maitri</span>
                  <strong className="text-stone-800">{milanResult.maitri}/5</strong>
                </div>
                <div className="p-2 bg-white rounded-xl border border-stone-200">
                  <span className="text-[10px] text-stone-400 block font-semibold">6. Gana</span>
                  <strong className="text-stone-800">{milanResult.gana}/6</strong>
                </div>
                <div className="p-2 bg-white rounded-xl border border-stone-200">
                  <span className="text-[10px] text-stone-400 block font-semibold">7. Bhakoot</span>
                  <strong className="text-stone-800">{milanResult.bhakoot}/7</strong>
                </div>
                <div className="p-2 bg-white rounded-xl border border-stone-200">
                  <span className="text-[10px] text-stone-400 block font-semibold">8. Nadi</span>
                  <strong className="text-stone-800">{milanResult.nadi}/8</strong>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {(!toolSlug || toolSlug === 'sade-sati') && (
        <section id="sade-sati" className="vedic-card rounded-2xl p-6 sm:p-8 bg-white border border-[#E7D6CB] shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-200 text-xl shrink-0">
                🪐
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
                  {isMarathi ? 'शनि साडेसाती व ढैय्या कॅल्क्युलेटर' : isHindi ? 'शनि साढ़ेसाती एवं ढैय्या कैलकुलेटर' : 'Shani Sade Sati & Dhaiya Checker'}
                </h2>
                <span className="text-xs text-stone-500">Saturn 7.5 Years Transit Period Analysis & Vedic Shanti</span>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 mt-4 leading-relaxed">
            {isMarathi
              ? 'आपली चंद्र रास निवडून २०२७ मध्ये शनि साडेसातीचा कोणता टप्पा (उदय, शिखर, अस्त) चालू आहे ते जाणून घ्या.'
              : isHindi
              ? 'अपनी चंद्र राशि का चयन करें और जानें कि वर्ष २०२७ में शनि की साढ़ेसाती का कौन सा चरण (उदय, शिखर, अस्त) प्रभावी है।'
              : 'Select your Janma Rashi to analyze whether you are undergoing Saturn Sade Sati or Dhaiya.'}
          </p>

          <div className="mt-5">
            <label className="text-xs font-bold text-stone-700 block mb-1">
              {isHindi ? 'अपनी चंद्र राशि का चयन करें:' : 'Select Your Moon Sign (Janma Rashi):'}
            </label>
            <select
              value={sadeSatiRashi}
              onChange={(e) => setSadeSatiRashi(e.target.value)}
              className="w-full p-3 text-sm bg-stone-50 border border-stone-300 rounded-xl font-medium text-stone-900 focus:outline-none focus:border-[#9A3412]"
            >
              {RASHIFAL_DATA.map((r) => (
                <option key={r.rashiId} value={r.rashiId}>
                  {r.name} ({r.nameHi}) - {r.ruler}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handleCalculateSadeSati}
            className="w-full mt-5 py-3 bg-[#9A3412] hover:bg-[#78280B] text-white font-bold rounded-xl text-sm transition-colors shadow-xs"
          >
            {isHindi ? 'साढ़ेसाती स्थिति की जांच करें' : 'Check Sade Sati Status'}
          </button>

          {/* Sade Sati Result Box */}
          {sadeSatiResult && (
            <div className="mt-6 p-5 bg-gradient-to-br from-indigo-50/70 to-[#FAF5EE] rounded-2xl border border-indigo-200 animate-in fade-in space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-900">
                  {sadeSatiResult.phase}
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                  {sadeSatiResult.status.toUpperCase()}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                {sadeSatiResult.description}
              </p>

              <div className="pt-2 border-t border-indigo-100">
                <span className="text-xs font-bold text-indigo-950 block mb-1.5">
                  {isHindi ? 'शास्त्रीय वैदिक उपाय:' : 'Recommended Shani Remedies:'}
                </span>
                <ul className="space-y-1 text-xs text-stone-700">
                  {sadeSatiResult.remedies.map((rem, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-indigo-600 font-bold">•</span>
                      <span>{rem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </section>
      )}

      {(!toolSlug || toolSlug === 'manglik-dosha') && (
        <section id="manglik-dosha" className="vedic-card rounded-2xl p-6 sm:p-8 bg-white border border-[#E7D6CB] shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center border border-orange-200 text-xl shrink-0">
                🔥
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
                  {isMarathi ? 'मांगलिक दोष (कुज दोष) परीक्षक' : isHindi ? 'मांगलिक दोष (भौम दोष) परीक्षक' : 'Manglik Dosha (Kuja Dosha) Checker'}
                </h2>
                <span className="text-xs text-stone-500">Mars Placement in 1st, 4th, 7th, 8th, 12th Houses</span>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 mt-4 leading-relaxed">
            {isMarathi
              ? 'आपल्या जन्म कुंडलीत मंगळ ज्या स्थानात आहे तो भाव निवडून मांगलिक दोषाची तीव्रता आणि उपाय तपासा.'
              : isHindi
              ? 'अपनी जन्म पत्रिका में मंगल जिस भाव में स्थित है उसका चयन करें और मांगलिक प्रभाव एवं परिहार जानें।'
              : 'Identify Kuja Dosha impact based on Mars placement across the Lagna chart.'}
          </p>

          <div className="mt-5">
            <label className="text-xs font-bold text-stone-700 block mb-1">
              {isHindi ? 'जन्म कुंडली में मंगल का भाव (House #):' : 'Mars Position in Birth Chart (Lagna):'}
            </label>
            <select
              value={manglikHouse}
              onChange={(e) => setManglikHouse(Number(e.target.value))}
              className="w-full p-3 text-sm bg-stone-50 border border-stone-300 rounded-xl font-medium text-stone-900 focus:outline-none focus:border-[#9A3412]"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h) => (
                <option key={h} value={h}>
                  {h === 1
                    ? `1st House (Lagna / लग्न भाव) – ${isHindi ? 'मांगलिक' : 'Manglik'}`
                    : h === 4
                    ? `4th House (Sukha / सुख भाव) – ${isHindi ? 'मांगलिक' : 'Manglik'}`
                    : h === 7
                    ? `7th House (Kalatra / विवाह भाव) – ${isHindi ? 'तीव्र मांगलिक' : 'High Manglik'}`
                    : h === 8
                    ? `8th House (Ayu / आयु भाव) – ${isHindi ? 'तीव्र मांगलिक' : 'High Manglik'}`
                    : h === 12
                    ? `12th House (Vyaya / व्यय भाव) – ${isHindi ? 'मांगलिक' : 'Manglik'}`
                    : `${h}th House – ${isHindi ? 'दोष मुक्त' : 'Non-Manglik'}`}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handleCalculateManglik}
            className="w-full mt-5 py-3 bg-[#9A3412] hover:bg-[#78280B] text-white font-bold rounded-xl text-sm transition-colors shadow-xs"
          >
            {isHindi ? 'मांगलिक दोष का विश्लेषण करें' : 'Analyze Manglik Dosha'}
          </button>

          {manglikResult && (
            <div className={`mt-6 p-5 rounded-2xl border animate-in fade-in space-y-3 ${
              manglikResult.isManglik
                ? 'bg-orange-50/70 border-orange-200'
                : 'bg-emerald-50/70 border-emerald-200'
            }`}>
              <div className="flex items-center justify-between">
                <span className={`text-sm font-bold font-serif ${
                  manglikResult.isManglik ? 'text-orange-950' : 'text-emerald-950'
                }`}>
                  {manglikResult.severity}
                </span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  manglikResult.isManglik ? 'bg-orange-200 text-orange-900' : 'bg-emerald-200 text-emerald-900'
                }`}>
                  {manglikResult.isManglik ? 'Manglik Yoga' : 'Clear Chart'}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                {manglikResult.description}
              </p>

              <div className="pt-2 border-t border-stone-200">
                <span className="text-xs font-bold text-stone-900 block mb-1">
                  {isHindi ? 'वैदिक परिहार व उपाय:' : 'Recommended Astrological Remedy:'}
                </span>
                <p className="text-xs text-stone-700 leading-relaxed">
                  {manglikResult.remedy}
                </p>
              </div>
            </div>
          )}
        </section>
      )}

      {(!toolSlug || toolSlug === 'date-converter') && (
        <section id="date-converter" className="vedic-card rounded-2xl p-6 sm:p-8 bg-white border border-[#E7D6CB] shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-200 text-xl shrink-0">
                🗓️
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
                  {isMarathi ? 'हिंदू तारीख व तिथी कन्व्हर्टर' : isHindi ? 'हिन्दू तिथि एवं पंचांग कनवर्टर' : 'Gregorian to Hindu Date & Tithi Converter'}
                </h2>
                <span className="text-xs text-stone-500">Gregorian Calendar Date to Vedic Samvat, Paksha, Tithi & Nakshatra</span>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 mt-4 leading-relaxed">
            {isMarathi
              ? 'कोणतीही इंग्रजी तारीख निवडा आणि त्या दिवशीची हिंदू तिथी, पक्ष, नक्षत्र, योग व करण तात्काळ मिळवा.'
              : isHindi
              ? 'किसी भी ग्रेगोरियन तारीख का चयन करें और उस दिन की सटीक हिन्दू तिथि, पक्ष, नक्षत्र, योग व करण तुरंत देखें।'
              : 'Convert any standard calendar date into detailed Vedic astronomical coordinates.'}
          </p>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-stone-700 block mb-1">
                {isHindi ? 'तारीख चुनें (Select Date):' : 'Select Calendar Date:'}
              </label>
              <input
                type="date"
                value={converterDate}
                onChange={(e) => setConverterDate(e.target.value)}
                className="w-full p-3 text-sm bg-stone-50 border border-stone-300 rounded-xl font-medium text-stone-900 focus:outline-none focus:border-[#9A3412]"
              />
            </div>

            <button
              type="button"
              onClick={handleConvertDate}
              className="w-full py-3 bg-[#9A3412] hover:bg-[#78280B] text-white font-bold rounded-xl text-sm transition-colors shadow-xs"
            >
              {isHindi ? 'तिथि परिवर्तित करें' : 'Convert to Tithi'}
            </button>
          </div>

          {convertedResult && (
            <div className="mt-6 p-5 bg-gradient-to-br from-amber-50/70 to-[#FAF5EE] rounded-2xl border border-amber-200 animate-in fade-in">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                <div className="bg-white p-3 rounded-xl border border-stone-200">
                  <span className="text-[10px] text-stone-400 block font-semibold">Tithi</span>
                  <strong className="text-sm font-bold text-[#9A3412] font-serif block mt-0.5">
                    {convertedResult.tithi.paksha} {convertedResult.tithi.name}
                  </strong>
                </div>
                <div className="bg-white p-3 rounded-xl border border-stone-200">
                  <span className="text-[10px] text-stone-400 block font-semibold">Nakshatra</span>
                  <strong className="text-sm font-bold text-stone-800 font-serif block mt-0.5">
                    {convertedResult.nakshatra.name}
                  </strong>
                </div>
                <div className="bg-white p-3 rounded-xl border border-stone-200">
                  <span className="text-[10px] text-stone-400 block font-semibold">Hindu Month</span>
                  <strong className="text-sm font-bold text-stone-800 font-serif block mt-0.5">
                    {convertedResult.hinduMonthAmavasyant}
                  </strong>
                </div>
                <div className="bg-white p-3 rounded-xl border border-stone-200">
                  <span className="text-[10px] text-stone-400 block font-semibold">Samvat</span>
                  <strong className="text-sm font-bold text-stone-800 font-serif block mt-0.5">
                    {convertedResult.vikramSamvat}
                  </strong>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {(!toolSlug || toolSlug === 'vedic-age-calculator') && (
        <section id="vedic-age-calculator" className="vedic-card rounded-2xl p-6 sm:p-8 bg-white border border-[#E7D6CB] shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200 text-xl shrink-0">
                🎂
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
                  {isMarathi ? 'वैदिक सौर व चांद्र वय कॅल्क्युलेटर' : isHindi ? 'वैदिक सौर एवं चंद्र आयु कैलकुलेटर' : 'Vedic Solar & Lunar Age Calculator'}
                </h2>
                <span className="text-xs text-stone-500">Solar Years, Lunar Months & Tithi Pravesha Birthday</span>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 mt-4 leading-relaxed">
            {isMarathi
              ? 'आपली जन्मतारीख टाकून सौर वर्षे, पूर्ण झालेले चांद्र महिने (Luni-Solar Cycles) आणि एकूण जगलेले दिवस अचूकपणे मोजा.'
              : isHindi
              ? 'अपनी जन्म तिथि दर्ज करें और पूर्ण सौर वर्ष, चंद्र मास तथा कुल व्यतीत दिनों की गणना करें।'
              : 'Compute total days lived, completed lunar months, and your astronomical Tithi Pravesha birthday.'}
          </p>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-stone-700 block mb-1">
                {isHindi ? 'अपनी जन्म तिथि दर्ज करें:' : 'Enter Date of Birth:'}
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full p-3 text-sm bg-stone-50 border border-stone-300 rounded-xl font-medium text-stone-900 focus:outline-none focus:border-[#9A3412]"
              />
            </div>

            <button
              type="button"
              onClick={handleCalculateAge}
              className="w-full py-3 bg-[#9A3412] hover:bg-[#78280B] text-white font-bold rounded-xl text-sm transition-colors shadow-xs"
            >
              {isHindi ? 'वैदिक आयु की गणना करें' : 'Compute Vedic Age'}
            </button>
          </div>

          {ageResult && (
            <div className="mt-6 p-5 bg-gradient-to-r from-emerald-50/70 via-stone-50 to-[#FAF5EE] rounded-2xl border border-emerald-200 animate-in fade-in">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="bg-white p-3.5 rounded-xl border border-stone-200">
                  <span className="text-xs text-stone-500 block uppercase font-bold tracking-wider">Solar Years</span>
                  <strong className="text-2xl font-extrabold text-stone-900 font-serif mt-1 block">
                    {ageResult.years} <span className="text-sm font-normal text-stone-500">वर्ष</span>
                  </strong>
                  <span className="text-xs text-stone-500">{ageResult.months}m {ageResult.days}d</span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-stone-200">
                  <span className="text-xs text-stone-500 block uppercase font-bold tracking-wider">Lunar Months</span>
                  <strong className="text-2xl font-extrabold text-emerald-800 font-serif mt-1 block">
                    {ageResult.lunarMonths} <span className="text-sm font-normal text-stone-500">मास</span>
                  </strong>
                  <span className="text-xs text-stone-500">Luni-Solar Cycles</span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-stone-200">
                  <span className="text-xs text-stone-500 block uppercase font-bold tracking-wider">Total Days Lived</span>
                  <strong className="text-2xl font-extrabold text-stone-900 font-serif mt-1 block tabular-nums">
                    {ageResult.totalDays.toLocaleString()}
                  </strong>
                  <span className="text-xs text-stone-500">Solar Days</span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-stone-200 flex flex-col justify-center">
                  <span className="text-xs text-[#9A3412] block uppercase font-bold tracking-wider">Tithi Pravesha</span>
                  <span className="text-xs text-stone-600 mt-1 font-medium">
                    {isHindi ? 'वैदिक चंद्र जन्म दिवस वार्षिक रूप से आपके जन्म तिथि पर आता है।' : 'Your Vedic Lunar birthday occurs every year on your Janma Tithi.'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Cross-linking other tools */}
      {toolSlug && (
        <section className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <h3 className="text-lg font-bold font-serif text-stone-900 flex items-center gap-2">
            <span>Explore Other Vedic Astrology Tools & Calculators</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {TOOLS_DIRECTORY.filter((t) => t.slug !== toolSlug).map((tool) => (
              <button
                key={tool.slug}
                type="button"
                onClick={() => onNavigate(tool.path)}
                className="p-3.5 rounded-xl bg-stone-50 hover:bg-amber-50/70 border border-stone-200 text-left transition-colors group flex items-start gap-2.5"
              >
                <span className="text-xl">{tool.icon}</span>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-stone-900 group-hover:text-[#9A3412] transition-colors truncate">
                    {tool.title}
                  </div>
                  <p className="text-[11px] text-stone-500 line-clamp-2 mt-0.5 leading-snug">
                    {tool.desc}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      <ShareButtons
        title="Vedic Astrology Tools & Kundali Milan – NewsDarshan"
        url="https://www.newsdarshan.in/tools"
      />
    </div>
  );
}
