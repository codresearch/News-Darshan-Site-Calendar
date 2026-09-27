import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (url: string) => void;
}

export default function Breadcrumbs({ items, onNavigate }: BreadcrumbsProps) {
  if (!items || items.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-xs text-stone-500">
      <ol className="flex flex-wrap items-center gap-1.5 list-none p-0 m-0">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.url + index} className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" aria-hidden="true" />}
              {isLast ? (
                <span className="text-stone-800 font-medium truncate max-w-[200px] sm:max-w-none" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => onNavigate(item.url)}
                  className="hover:text-[#9A3412] hover:underline transition-colors focus:outline-none"
                >
                  {item.name}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
