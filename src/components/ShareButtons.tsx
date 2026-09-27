import { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const fullUrl = url.startsWith('http') ? url : `https://www.newsdarshan.in${url}`;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: fullUrl });
      } catch {
        // User cancelled
      }
    }
  };

  return (
    <div className="flex items-center gap-2 pt-3 border-t border-stone-200/80 my-4 text-xs text-stone-600">
      <span className="font-medium text-stone-700">Share:</span>
      
      {/* WhatsApp */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-2.5 py-1 rounded bg-[#EAF8EE] text-[#1E7E34] hover:bg-[#D7F2DE] transition-colors font-medium"
      >
        WhatsApp
      </a>

      {/* X / Twitter */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-2.5 py-1 rounded bg-stone-100 text-stone-800 hover:bg-stone-200 transition-colors font-medium"
      >
        X (Twitter)
      </a>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-2.5 py-1 rounded bg-[#EBF3FE] text-[#1877F2] hover:bg-[#DCE9FD] transition-colors font-medium"
      >
        Facebook
      </a>

      {/* Copy Link */}
      <button
        type="button"
        onClick={handleCopy}
        className="flex items-center gap-1 px-2.5 py-1 rounded bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-700">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 text-stone-500" />
            <span>Copy Link</span>
          </>
        )}
      </button>

      {/* Native Web Share for Mobile */}
      {typeof navigator !== 'undefined' && 'share' in navigator && (
        <button
          type="button"
          onClick={handleNativeShare}
          className="p-1 rounded text-stone-600 hover:text-stone-900 transition-colors sm:hidden"
          title="Share"
        >
          <Share2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
