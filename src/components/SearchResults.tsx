
'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Search } from 'lucide-react';
import Image from 'next/image';

interface SearchResult {
  id: number;
  title: string;
  image: string;
  location: string;
  price: number;
  slug?: string; // category slug
}

interface SearchResultsProps {
  results: SearchResult[];
  isVisible: boolean;
  onClose: () => void;
}

export function SearchResults({ results, isVisible, onClose }: SearchResultsProps) {
  const t = useTranslations('Header');

  if (!isVisible) return null;

  return (
    <div className="absolute top-full left-0 right-0 bg-white shadow-xl rounded-b-xl border-x border-b border-gray-100 mt-1 max-h-[400px] overflow-y-auto z-50 animate-in fade-in slide-in-from-top-2">
      {results.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          {t('noResults')}
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {results.map((result) => (
            <Link 
              key={result.id} 
              href={`/category/${result.slug || 'all-deals'}`} // Fallback to category
              className="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors group"
              onClick={onClose}
            >
              <div className="relative w-12 h-12 rounded-md overflow-hidden shrink-0">
                <Image 
                  src={result.image} 
                  alt={result.title} 
                  fill 
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate group-hover:text-tripper-pink transition-colors">
                  {result.title}
                </h4>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{result.location}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span className="font-bold text-tripper-pink">€{result.price.toFixed(2)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      <div className="p-2 bg-gray-50 border-t border-gray-100 text-center">
         <button onClick={onClose} className="text-xs text-gray-500 hover:text-gray-700">
            {t('closeSearch')}
         </button>
      </div>
    </div>
  );
}
