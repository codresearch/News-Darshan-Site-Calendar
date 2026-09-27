import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export const ADS_ENABLED = true;
export const DEFAULT_ADSENSE_CLIENT = 'ca-pub-5817841895051108';
export const DEFAULT_ADSENSE_SLOT = '8029503602';

interface AdSlotProps {
  type?: 'top' | 'in-content' | 'sidebar' | 'before-footer' | 'between-sections';
  adSlot?: string;
  adClient?: string;
  className?: string;
}

export default function AdSlot({
  type = 'in-content',
  adSlot,
  adClient,
  className = ''
}: AdSlotProps) {
  const adRef = useRef<HTMLModElement | null>(null);

  // Check if slot type is disabled in admin
  const isEnabled = (() => {
    if (!ADS_ENABLED) return false;
    if (typeof window === 'undefined') return true;
    if (type === 'top' && localStorage.getItem('nd_ad_top') === 'false') return false;
    if (type === 'in-content' && localStorage.getItem('nd_ad_incontent') === 'false') return false;
    if (type === 'before-footer' && localStorage.getItem('nd_ad_footer') === 'false') return false;
    return true;
  })();

  const activeClient = adClient || (typeof window !== 'undefined' && localStorage.getItem('nd_adsense_client')) || DEFAULT_ADSENSE_CLIENT;
  const activeSlot = adSlot || (typeof window !== 'undefined' && localStorage.getItem('nd_adsense_slot')) || DEFAULT_ADSENSE_SLOT;

  useEffect(() => {
    if (!isEnabled) return;
    try {
      if (typeof window !== 'undefined') {
        // Ensure script is loaded if not already in document
        if (!document.querySelector(`script[src*="adsbygoogle.js?client=${activeClient}"]`)) {
          const script = document.createElement('script');
          script.async = true;
          script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${activeClient}`;
          script.crossOrigin = 'anonymous';
          document.head.appendChild(script);
        }

        // Push adsbygoogle queue
        if (adRef.current && !adRef.current.getAttribute('data-adsbygoogle-status')) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      }
    } catch (e) {
      // Ignored for adblockers or already rendered ads
    }
  }, [isEnabled, activeClient, activeSlot]);

  if (!isEnabled) return null;

  const containerConstraints = {
    top: 'min-h-[90px] max-w-4xl my-6',
    'in-content': 'min-h-[120px] max-w-3xl my-8',
    sidebar: 'min-h-[250px] max-w-sm my-4',
    'before-footer': 'min-h-[120px] max-w-5xl my-10',
    'between-sections': 'min-h-[100px] max-w-4xl my-6'
  };

  return (
    <aside
      aria-label="Advertisement"
      className={`mx-auto w-full flex flex-col items-center justify-center overflow-hidden transition-all no-print select-none ${containerConstraints[type]} ${className}`}
    >
      <div className="w-full flex items-center justify-between px-2 mb-1">
        <span className="text-[10px] tracking-widest uppercase text-stone-500 font-mono font-medium">
          Advertisement
        </span>
        <span className="text-[9px] text-stone-400 font-mono">
          NewsDarshan
        </span>
      </div>

      <div className="w-full bg-white/40 border border-stone-200/80 rounded-2xl p-2 sm:p-3 shadow-2xs flex items-center justify-center min-h-[90px] overflow-hidden">
        {/* ND */}
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', minHeight: '90px' }}
          data-ad-client={activeClient}
          data-ad-slot={activeSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
}
