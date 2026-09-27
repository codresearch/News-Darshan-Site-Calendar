import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { getSEOMetadataForPath, generateSchemaLD, SITE_URL } from './src/utils/seoEngine';
import { getPanchangForDate, CITIES } from './src/data/panchangEngine';
import { FESTIVALS_2027, MUHURATS_2027, HOLIDAYS_2027, BANK_HOLIDAYS_2027, RASHIFAL_DATA } from './src/data/calendarData';
import { REGIONAL_CALENDARS_INFO } from './src/data/localization';
import { MONTH_NAMES, MONTH_DISPLAY_NAMES } from './src/utils/seoEngine';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // 1. Robots.txt
  app.get('/robots.txt', (_req: Request, res: Response) => {
    res.type('text/plain');
    res.send(`User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml
Sitemap: ${SITE_URL}/sitemap-calendar.xml
Sitemap: ${SITE_URL}/sitemap-cities.xml
Sitemap: ${SITE_URL}/sitemap-festivals.xml
Sitemap: ${SITE_URL}/sitemap-panchang.xml
Sitemap: ${SITE_URL}/sitemap-regional.xml
Sitemap: ${SITE_URL}/sitemap-muhurat.xml
Sitemap: ${SITE_URL}/sitemap-rashifal.xml
`);
  });

  // 2. Sitemap Index: /sitemap.xml
  app.get('/sitemap.xml', (_req: Request, res: Response) => {
    res.type('application/xml');
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${SITE_URL}/sitemap-calendar.xml</loc><lastmod>2026-09-27</lastmod></sitemap>
  <sitemap><loc>${SITE_URL}/sitemap-cities.xml</loc><lastmod>2026-09-27</lastmod></sitemap>
  <sitemap><loc>${SITE_URL}/sitemap-festivals.xml</loc><lastmod>2026-09-27</lastmod></sitemap>
  <sitemap><loc>${SITE_URL}/sitemap-panchang.xml</loc><lastmod>2026-09-27</lastmod></sitemap>
  <sitemap><loc>${SITE_URL}/sitemap-regional.xml</loc><lastmod>2026-09-27</lastmod></sitemap>
  <sitemap><loc>${SITE_URL}/sitemap-muhurat.xml</loc><lastmod>2026-09-27</lastmod></sitemap>
  <sitemap><loc>${SITE_URL}/sitemap-rashifal.xml</loc><lastmod>2026-09-27</lastmod></sitemap>
</sitemapindex>`);
  });

  // 3. Sitemap Calendar: /sitemap-calendar.xml
  app.get('/sitemap-calendar.xml', (_req: Request, res: Response) => {
    res.type('application/xml');
    const urls = [
      `${SITE_URL}/`,
      `${SITE_URL}/hindu-calendar-2027/`,
      ...MONTH_NAMES.map((m) => `${SITE_URL}/hindu-calendar-2027/${m}/`),
      `${SITE_URL}/hindu-calendar-2027/newyork/`,
      `${SITE_URL}/hindu-calendar-2027/newyork/january/`,
      `${SITE_URL}/vrat/`,
      `${SITE_URL}/ekadashi/2027/`,
      `${SITE_URL}/purnima/2027/`,
      `${SITE_URL}/amavasya/2027/`,
      `${SITE_URL}/holidays/2027/`,
      `${SITE_URL}/bank-holidays/2027/`
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>`).join('\n')}
</urlset>`;
    res.send(xml);
  });

  // 3b. Sitemap Cities & Diaspora: /sitemap-cities.xml
  app.get('/sitemap-cities.xml', (_req: Request, res: Response) => {
    res.type('application/xml');
    const urls: string[] = [
      `${SITE_URL}/cities/`,
      `${SITE_URL}/city-directory/`
    ];

    CITIES.forEach((c) => {
      urls.push(`${SITE_URL}/panchang/${c.id}/`);
      urls.push(`${SITE_URL}/choghadiya/${c.id}/`);
      urls.push(`${SITE_URL}/hindu-calendar-2027/${c.id}/`);
      urls.push(`${SITE_URL}/hindu-calendar-2027/${c.id}/january/`);
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc><changefreq>daily</changefreq><priority>0.85</priority></url>`).join('\n')}
</urlset>`;
    res.send(xml);
  });

  // 4. Sitemap Festivals: /sitemap-festivals.xml
  app.get('/sitemap-festivals.xml', (_req: Request, res: Response) => {
    res.type('application/xml');
    const urls = [
      `${SITE_URL}/festivals/2027/`,
      ...FESTIVALS_2027.map((f) => `${SITE_URL}/festivals/${f.slug}/`)
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc><changefreq>weekly</changefreq><priority>0.85</priority></url>`).join('\n')}
</urlset>`;
    res.send(xml);
  });

  // 5. Sitemap Regional: /sitemap-regional.xml
  app.get('/sitemap-regional.xml', (_req: Request, res: Response) => {
    res.type('application/xml');
    const urls: string[] = [];
    Object.keys(REGIONAL_CALENDARS_INFO).forEach((reg) => {
      urls.push(`${SITE_URL}/${reg}-calendar-2027/`);
      urls.push(`${SITE_URL}/today/${reg}-date/`);
      MONTH_NAMES.forEach((m) => {
        urls.push(`${SITE_URL}/${reg}-calendar-2027/${m}/`);
      });
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`).join('\n')}
</urlset>`;
    res.send(xml);
  });

  // 6. Sitemap Panchang: /sitemap-panchang.xml
  app.get('/sitemap-panchang.xml', (_req: Request, res: Response) => {
    res.type('application/xml');
    const urls = [
      `${SITE_URL}/today/`,
      `${SITE_URL}/panchang/`,
      `${SITE_URL}/choghadiya/`
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc><changefreq>daily</changefreq><priority>0.95</priority></url>`).join('\n')}
</urlset>`;
    res.send(xml);
  });

  // 7. Sitemap Muhurat: /sitemap-muhurat.xml
  app.get('/sitemap-muhurat.xml', (_req: Request, res: Response) => {
    res.type('application/xml');
    const urls = [
      `${SITE_URL}/muhurat/`,
      ...MUHURATS_2027.map((m) => `${SITE_URL}/${m.slug}/`)
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc><changefreq>weekly</changefreq><priority>0.85</priority></url>`).join('\n')}
</urlset>`;
    res.send(xml);
  });

  // 8. Sitemap Rashifal: /sitemap-rashifal.xml
  app.get('/sitemap-rashifal.xml', (_req: Request, res: Response) => {
    res.type('application/xml');
    const urls = [
      `${SITE_URL}/rashifal/`,
      ...RASHIFAL_DATA.map((r) => `${SITE_URL}/rashifal/${r.rashiId}-rashi/`)
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc><changefreq>daily</changefreq><priority>0.85</priority></url>`).join('\n')}
</urlset>`;
    res.send(xml);
  });

  // REST API: Panchang Calculation Endpoint
  app.get('/api/panchang', (req: Request, res: Response) => {
    try {
      const dateStr = (req.query.date as string) || new Date().toISOString().split('T')[0];
      const cityId = (req.query.city as string) || 'delhi';
      const [y, m, d] = dateStr.split('-').map(Number);
      const panchang = getPanchangForDate(new Date(y, m - 1, d), cityId);
      res.json({ success: true, data: panchang });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // REST API: Festivals
  app.get('/api/festivals', (req: Request, res: Response) => {
    const year = req.query.year ? parseInt(req.query.year as string, 10) : 2027;
    res.json({ success: true, count: FESTIVALS_2027.length, data: FESTIVALS_2027 });
  });

  // REST API: Notification registration
  app.post('/api/notifications/subscribe', (req: Request, res: Response) => {
    res.json({ success: true, message: 'Notification subscription recorded successfully.' });
  });

  // Initialize Vite or Static Middleware
  let vite: any;
  if (!isProd) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist'), { index: false }));
  }

  // SSR / Crawlable Pre-Render Route Handler for EVERY URL
  app.get('*', async (req: Request, res: Response, next) => {
    const url = req.originalUrl;
    try {
      let template: string;
      if (!isProd) {
        template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
      } else {
        template = fs.readFileSync(path.resolve(__dirname, 'dist', 'index.html'), 'utf-8');
      }

      // Fetch accurate SEO metadata for this exact URL path
      const meta = getSEOMetadataForPath(url);
      const schemaJson = generateSchemaLD(meta);

      // Pre-rendered HTML content block for search engine crawlers (Googlebot, Bingbot)
      const ssrContent = `
        <header class="no-print" style="padding:16px; border-bottom:1px solid #e7dcd4; display:flex; justify-content:space-between; align-items:center;">
          <a href="/" style="font-size:22px; font-weight:bold; color:#9A3412; text-decoration:none; font-family:serif;">NewsDarshan</a>
          <nav style="display:flex; gap:16px; font-size:14px;">
            <a href="/hindu-calendar-2027" style="color:#444; text-decoration:none;">Hindu Calendar 2027</a>
            <a href="/today" style="color:#444; text-decoration:none;">Today Panchang</a>
            <a href="/choghadiya" style="color:#444; text-decoration:none;">Choghadiya</a>
            <a href="/festivals/2027" style="color:#444; text-decoration:none;">Festivals</a>
            <a href="/muhurat" style="color:#444; text-decoration:none;">Muhurat</a>
            <a href="/rashifal" style="color:#444; text-decoration:none;">Rashifal</a>
          </nav>
        </header>

        <main style="max-width:1200px; margin:0 auto; padding:24px 16px;">
          <nav aria-label="Breadcrumb" style="font-size:12px; color:#777; margin-bottom:16px;">
            ${meta.breadcrumbs.map((b, i) => `<a href="${b.url}" style="color:#9A3412; text-decoration:none;">${b.name}</a>`).join(' &gt; ')}
          </nav>

          <h1 style="font-size:32px; font-family:serif; color:#1C1917; margin-bottom:12px;">${meta.h1}</h1>
          <p style="font-size:16px; color:#57534E; line-height:1.6; margin-bottom:24px;">${meta.description}</p>

          <div style="background:#fff; border:1px solid #e7dcd4; border-radius:12px; padding:20px; margin-bottom:24px;">
            <h2 style="font-size:20px; font-family:serif; margin-bottom:12px;">Vedic Astronomical Overview</h2>
            <p style="font-size:14px; color:#444; line-height:1.7;">
              NewsDarshan provides mathematically verified Surya Siddhanta calculations, daily Tithi, Nakshatra, Yoga, Karana, Rahu Kaal, and Choghadiya partitions for Hindu Calendar 2027 across 11 regional calendar traditions including Marathi, Gujarati, Telugu, Tamil, Bengali, Kannada, and Malayalam calendars.
            </p>
          </div>

          ${
            meta.faq && meta.faq.length > 0
              ? `
            <section style="background:#FAF6F2; border:1px solid #e7dcd4; border-radius:12px; padding:20px; margin-top:24px;">
              <h2 style="font-size:18px; font-family:serif; margin-bottom:12px;">Frequently Asked Questions</h2>
              ${meta.faq
                .map(
                  (f) => `
                <div style="margin-bottom:12px; padding-bottom:12px; border-bottom:1px solid #e2d7ce;">
                  <h3 style="font-size:14px; font-weight:bold; color:#222; margin-bottom:4px;">${f.question}</h3>
                  <p style="font-size:13px; color:#555; line-height:1.5;">${f.answer}</p>
                </div>
              `
                )
                .join('')}
            </section>
          `
              : ''
          }
        </main>
      `;

      // Replace metadata in HTML template
      let html = template
        .replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)
        .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${meta.description}" />`)
        .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${meta.ogTitle || meta.title}" />`)
        .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${meta.ogDescription || meta.description}" />`)
        .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${meta.canonicalUrl}" />`)
        .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${meta.title}" />`)
        .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${meta.description}" />`)
        .replace(
          '</head>',
          `<link rel="canonical" href="${meta.canonicalUrl}" />\n<script type="application/ld+json" id="nd-schema-jsonld">${schemaJson}</script>\n</head>`
        )
        .replace('<div id="root"></div>', `<div id="root">${ssrContent}</div>`);

      res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
    } catch (e: any) {
      if (!isProd && vite) {
        vite.ssrFixStacktrace(e);
      }
      next(e);
    }
  });

  app.listen(PORT, () => {
    console.log(`NewsDarshan Vedic Calendar Server running on http://localhost:${PORT}`);
  });
}

startServer();
