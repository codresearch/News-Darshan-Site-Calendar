import { useEffect } from 'react';
import { SEOMetadata } from '../types';
import { generateSchemaLD, SITE_URL } from '../utils/seoEngine';

interface SEOHeadProps {
  meta: SEOMetadata;
}

const SUPPORTED_LANG_CODES = ['en', 'hi', 'mr', 'gu', 'te', 'ta', 'bn', 'kn', 'ml', 'or', 'pa', 'sa'];

export default function SEOHead({ meta }: SEOHeadProps) {
  useEffect(() => {
    // 1. Update Document Title
    document.title = meta.title;

    // 2. Helper to set or create meta tags
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Standard Meta
    setMetaTag('description', meta.description);
    setMetaTag('robots', meta.robots || 'index, follow');

    // OpenGraph
    setMetaTag('og:title', meta.ogTitle || meta.title, true);
    setMetaTag('og:description', meta.ogDescription || meta.description, true);
    setMetaTag('og:url', meta.canonicalUrl, true);
    setMetaTag('og:type', 'website', true);
    setMetaTag('og:site_name', 'NewsDarshan', true);
    setMetaTag('og:locale', 'en_IN', true);

    // Twitter Cards
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', meta.title);
    setMetaTag('twitter:description', meta.description);

    // Canonical link tag (Prevent duplicate content penalties)
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = meta.canonicalUrl;

    // Multi-Language Hreflang Alternate Tags
    SUPPORTED_LANG_CODES.forEach((lang) => {
      let hreflangTag = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`) as HTMLLinkElement | null;
      if (!hreflangTag) {
        hreflangTag = document.createElement('link');
        hreflangTag.rel = 'alternate';
        hreflangTag.hreflang = lang;
        document.head.appendChild(hreflangTag);
      }
      hreflangTag.href = `${meta.canonicalUrl}?lang=${lang}`;
    });

    // x-default hreflang
    let xDefaultTag = document.querySelector('link[rel="alternate"][hreflang="x-default"]') as HTMLLinkElement | null;
    if (!xDefaultTag) {
      xDefaultTag = document.createElement('link');
      xDefaultTag.rel = 'alternate';
      xDefaultTag.hreflang = 'x-default';
      document.head.appendChild(xDefaultTag);
    }
    xDefaultTag.href = meta.canonicalUrl;

    // JSON-LD Structured Data
    let scriptTag = document.getElementById('nd-schema-jsonld') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'nd-schema-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = generateSchemaLD(meta);

    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [meta]);

  return null;
}
