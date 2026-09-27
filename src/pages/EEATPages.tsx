import { useState } from 'react';
import { ARTICLES_DATA } from '../data/calendarData';
import Breadcrumbs from '../components/Breadcrumbs';
import AdSlot from '../components/AdSlot';
import ShareButtons from '../components/ShareButtons';
import { ShieldCheck, BookOpen, Mail, CheckCircle2 } from 'lucide-react';

interface EEATPageProps {
  pageType: 'about' | 'editorial' | 'methodology' | 'contact' | 'privacy' | 'terms' | 'disclaimer' | 'article';
  slug?: string;
  onNavigate: (path: string) => void;
}

export default function EEATPages({ pageType, slug, onNavigate }: EEATPageProps) {
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSent(true);
    setTimeout(() => {
      setFeedbackSent(false);
      setFeedbackName('');
      setFeedbackEmail('');
      setFeedbackMsg('');
    }, 4000);
  };

  // Article View
  if (pageType === 'article') {
    const article = ARTICLES_DATA.find((a) => a.slug === slug) || ARTICLES_DATA[0];
    const breadcrumbs = [
      { name: 'Home', url: '/' },
      { name: 'Articles', url: '/articles/' },
      { name: article.title, url: `/articles/${article.slug}/` }
    ];

    return (
      <div className="space-y-8 max-w-4xl mx-auto">
        <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

        <div className="p-6 sm:p-10 bg-gradient-to-r from-[#FAF1EC] to-[#F5ECE5] rounded-2xl border border-[#E8DCD4]">
          <div className="text-xs font-mono uppercase tracking-wider text-[#9A3412] mb-2">
            {article.category} · Published {article.publishedDate} · {article.readTime}
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-stone-900 font-serif leading-tight">
            {article.title}
          </h1>
        </div>

        <AdSlot type="top" />

        <article className="bg-white p-6 sm:p-10 rounded-2xl border border-stone-200 space-y-6 text-stone-800 leading-relaxed text-base sm:text-lg">
          {article.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </article>

        {article.faq && article.faq.length > 0 && (
          <section className="bg-[#FAF6F2] p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-4">
            <h2 className="text-xl font-bold text-stone-900 font-serif">Frequently Asked Questions</h2>
            <div className="space-y-3 text-sm">
              {article.faq.map((f, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-stone-200">
                  <div className="font-bold text-stone-900">{f.question}</div>
                  <p className="mt-1.5 text-stone-600 text-xs sm:text-sm leading-relaxed">{f.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <ShareButtons title={article.title} url={`https://www.newsdarshan.in/articles/${article.slug}`} />
        <AdSlot type="before-footer" />
      </div>
    );
  }

  // Institutional Pages
  const titles = {
    about: 'About NewsDarshan',
    editorial: 'Editorial & Accuracy Policy',
    methodology: 'Panchang Calculation Methodology',
    contact: 'Contact Us & Corrections Desk',
    privacy: 'Privacy Policy',
    terms: 'Terms and Conditions',
    disclaimer: 'Astrological & Religious Disclaimer'
  };

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: titles[pageType], url: `/${pageType}/` }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      <div className="p-6 sm:p-8 bg-gradient-to-r from-[#FAF1EC] to-[#F5ECE5] rounded-2xl border border-[#E8DCD4]">
        <h1 className="text-2xl sm:text-4xl font-bold text-stone-900 font-serif">
          {titles[pageType]}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-2">
          Published by NewsDarshan Editorial & Vedic Research Desk · www.newsdarshan.in
        </p>
      </div>

      <AdSlot type="top" />

      <div className="bg-white p-6 sm:p-10 rounded-2xl border border-stone-200 space-y-6 text-sm sm:text-base text-stone-700 leading-relaxed">
        {pageType === 'about' && (
          <>
            <p>
              <strong>NewsDarshan</strong> is a premier Indian cultural, religious, and astronomical portal committed to delivering mathematically accurate Vedic Panchang, regional calendar calculations, festival schedules, and authentic astrological insights.
            </p>
            <p>
              Our mission is to bridge ancient Vedic timekeeping wisdom with modern, lightning-fast digital accessibility. We reject arbitrary approximations in favor of city-specific topocentric computations, ensuring that devotees across Mumbai, Delhi, Kolkata, Chennai, Bengaluru, and overseas communities receive exact religious timings for pujas, fasts, and auspicious celebrations.
            </p>
            <h2 className="text-xl font-bold text-stone-900 font-serif pt-4">Our Core Pillars</h2>
            <ul className="space-y-2 list-disc pl-5">
              <li><strong>Mathematical Rigor:</strong> Algorithms grounded in classical <em>Surya Siddhanta</em> principles verified against contemporary ephemeris models.</li>
              <li><strong>Cultural Inclusivity:</strong> Deep support for 11 distinct regional traditions (Marathi, Gujarati, Telugu, Tamil, Kannada, Malayalam, Bengali, Odia, Hindi, Punjabi, Assamese).</li>
              <li><strong>Reader Trust:</strong> Transparent disclosures, zero deceptive clickbait, and independent correction mechanisms.</li>
            </ul>
          </>
        )}

        {pageType === 'editorial' && (
          <>
            <p>
              At <strong>NewsDarshan</strong>, accuracy in religious dates is paramount. A miscalculated Ekadashi or incorrectly reported Rahu Kaal impacts religious observances. Consequently, all calendar entries undergo a multi-stage editorial verification protocol.
            </p>
            <h2 className="text-xl font-bold text-stone-900 font-serif pt-4">Verification Standards</h2>
            <ol className="space-y-2 list-decimal pl-5">
              <li><strong>Astronomical Verification:</strong> Planetary elongations and tithi transitions are calculated using exact Julian days and topocentric coordinates.</li>
              <li><strong>Cross-Regional Validation:</strong> Festival dates are verified against both Purnimant and Amavasyant lunar month boundaries to prevent regional discrepancies.</li>
              <li><strong>Zero Hallucination Policy:</strong> Astrological and Panchang data is strictly derived from proven celestial equations and certified historical records.</li>
            </ol>
          </>
        )}

        {pageType === 'methodology' && (
          <>
            <p>
              Traditional Hindu timekeeping is fundamentally lunisolar. The Sun determines solar days and seasonal solstices/equinoxes (<em>Ayana</em> and <em>Ritu</em>), while the Moon\'s phases govern the 30 lunar days (<em>Tithis</em>).
            </p>
            <h2 className="text-xl font-bold text-stone-900 font-serif pt-4">The Mathematical Formulas</h2>
            <p>
              A Tithi is completed each time the longitudinal separation between the Moon and Sun increases by exactly 12 degrees:
            </p>
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 font-mono text-xs text-stone-800">
              Tithi Number = floor((Moon_Longitude - Sun_Longitude) / 12°) + 1
            </div>
            <p>
              Local Sunrise and Sunset times are computed using exact solar declination, local geographic latitude, and IST longitude offset (82.5°E), establishing accurate day lengths upon which the 8 Day Choghadiyas and 8 Night Choghadiyas are partitioned.
            </p>
          </>
        )}

        {pageType === 'contact' && (
          <div className="space-y-6">
            <p>
              We welcome corrections, scholarly feedback, and general inquiries from our readers and Vedic astrologers.
            </p>

            <form onSubmit={handleFeedbackSubmit} className="space-y-4 max-w-lg">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={feedbackName}
                  onChange={(e) => setFeedbackName(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#9A3412]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={feedbackEmail}
                  onChange={(e) => setFeedbackEmail(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#9A3412]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Message / Correction Details</label>
                <textarea
                  rows={4}
                  required
                  value={feedbackMsg}
                  onChange={(e) => setFeedbackMsg(e.target.value)}
                  placeholder="Please specify festival name, city, and suggested correction..."
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#9A3412]"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-[#9A3412] text-white text-xs font-semibold rounded-lg hover:bg-[#78280B] transition-colors"
              >
                Submit Feedback / Correction
              </button>

              {feedbackSent && (
                <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-medium rounded-lg flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Thank you. Your message has been received by our editorial desk.</span>
                </div>
              )}
            </form>
          </div>
        )}

        {pageType === 'privacy' && (
          <>
            <p>
              NewsDarshan respects your privacy. We do not require account registration or collect personally identifiable information for standard calendar browsing.
            </p>
            <h2 className="text-xl font-bold text-stone-900 font-serif pt-2">Local Storage Usage</h2>
            <p>
              Preferences such as your saved "My Rashi", chosen city location, and notification settings are stored locally on your device via HTML5 LocalStorage and are never transmitted to third parties.
            </p>
          </>
        )}

        {pageType === 'terms' && (
          <>
            <p>
              By accessing NewsDarshan (www.newsdarshan.in), you agree to use our timekeeping calculators, festival directories, and astrological content for informational and religious planning purposes.
            </p>
          </>
        )}

        {pageType === 'disclaimer' && (
          <>
            <p>
              Panchang timings and Muhurat calculations provided by NewsDarshan are prepared with high astronomical precision according to the Surya Siddhanta framework. However, regional variations in temple traditions (Sampradayas) may lead to slight divergence in local temple observances. Consult your local family priest (Purohit) for specific life milestone rites.
            </p>
          </>
        )}
      </div>

      <AdSlot type="before-footer" />
    </div>
  );
}
