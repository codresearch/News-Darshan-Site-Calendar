export interface SiteBrandingConfig {
  logoType: 'default' | 'image' | 'custom_icon';
  customLogoUrl: string;
  brandName: string;
  tagline: string;
  iconSymbol: string;
  iconBgGradient: string;
  faviconUrl: string;
  faviconEmoji: string;
  lastUpdated: string;
}

const BRANDING_STORAGE_KEY = 'nd_site_branding_v1';

export const DEFAULT_BRANDING: SiteBrandingConfig = {
  logoType: 'default',
  customLogoUrl: '',
  brandName: 'NewsDarshan',
  tagline: 'Vedic Calendar & Panchang',
  iconSymbol: 'ॐ',
  iconBgGradient: 'from-[#9A3412] to-[#E8602E]',
  faviconUrl: '',
  faviconEmoji: '🕉️',
  lastUpdated: new Date().toISOString()
};

export function getSiteBranding(): SiteBrandingConfig {
  if (typeof window === 'undefined') return DEFAULT_BRANDING;
  try {
    const raw = localStorage.getItem(BRANDING_STORAGE_KEY);
    if (!raw) return DEFAULT_BRANDING;
    return { ...DEFAULT_BRANDING, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_BRANDING;
  }
}

export function saveSiteBranding(config: Partial<SiteBrandingConfig>): SiteBrandingConfig {
  if (typeof window === 'undefined') return DEFAULT_BRANDING;
  const current = getSiteBranding();
  const updated: SiteBrandingConfig = {
    ...current,
    ...config,
    lastUpdated: new Date().toISOString()
  };
  localStorage.setItem(BRANDING_STORAGE_KEY, JSON.stringify(updated));

  // Apply favicon to document head immediately
  applyFaviconToHead(updated);

  // Dispatch custom window event so Header & other components re-render immediately
  window.dispatchEvent(new CustomEvent('nd_branding_updated', { detail: updated }));

  return updated;
}

export function applyFaviconToHead(branding: SiteBrandingConfig): void {
  if (typeof document === 'undefined') return;

  try {
    let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }

    if (branding.faviconUrl && branding.faviconUrl.trim()) {
      link.href = branding.faviconUrl.trim();
    } else if (branding.faviconEmoji) {
      // SVG favicon with emoji
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${branding.faviconEmoji}</text></svg>`;
      link.href = `data:image/svg+xml,${encodeURIComponent(svg)}`;
    }
  } catch (err) {
    console.debug('Failed to apply favicon:', err);
  }
}
