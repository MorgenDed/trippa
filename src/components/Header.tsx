'use client';

import { Search, Menu, User, Heart, X, Globe, ChevronDown, LogOut } from 'lucide-react';
import { useState, useTransition, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname, Link } from '@/i18n/routing';
import { SearchResults } from './SearchResults';
import { categoryDeals } from '@/data/deals';
import Image from 'next/image';

interface HeaderProps {
  user?: any | null;
}

export function Header({ user }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const t = useTranslations('Header');
  const tDeals = useTranslations('Deals');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Memoize flattened deals for search
  const allDeals = useMemo(() => {
    return Object.entries(categoryDeals).flatMap(([slug, deals]) => 
      deals.map(deal => ({ 
        ...deal, 
        slug,
        title: tDeals(`${deal.id}.title`)
      }))
    );
  }, [tDeals]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length > 1) {
      const filtered = allDeals.filter(deal => 
        deal.title.toLowerCase().includes(query.toLowerCase()) || 
        deal.location.toLowerCase().includes(query.toLowerCase())
      );
      // Limit results to 10 to avoid performance issues
      setSearchResults(filtered.slice(0, 10));
    } else {
      setSearchResults([]);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      router.replace(pathname, {locale: nextLocale});
    });
  };

  // Temporary signOut function until auth module is fixed
  const signOut = async (locale: string) => {
    // console.log('Sign out clicked', locale);
    // Add logic here later
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      {/* Top Bar (Optional, usually for USPs) */}
      <div className="bg-tripper-pink text-white text-xs py-1 text-center font-medium hidden sm:block">
        {t('newsletter')}
      </div>

      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-tripper-pink text-white font-bold text-2xl px-3 py-1 rounded-md transform -rotate-3 transition-transform group-hover:rotate-0">
            TRIPPA
          </div>
        </Link>

        {/* Search Bar - Hidden on mobile, visible on desktop */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder={t('searchPlaceholder')}
            className="w-full border border-gray-300 rounded-full py-2.5 px-4 pl-12 focus:outline-none focus:border-tripper-pink focus:ring-1 focus:ring-tripper-pink transition-all"
          />
          <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
          {searchQuery && (
             <button onClick={clearSearch} className="absolute right-24 top-3 text-gray-400 hover:text-gray-600">
               <X size={16} />
             </button>
          )}
          <button className="absolute right-1 top-1 bottom-1 bg-tripper-pink text-white px-4 rounded-full text-sm font-medium hover:bg-tripper-pink-hover transition-colors">
            {t('searchButton')}
          </button>
          
          {/* Live Search Results */}
          <SearchResults 
            results={searchResults} 
            isVisible={searchQuery.length > 1} 
            onClose={clearSearch}
          />
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-4 lg:gap-6">
          {/* Language Switcher */}
          <div className="hidden md:flex items-center gap-1 text-sm font-medium text-gray-700">
             <Globe className="h-4 w-4" />
             <select 
               value={locale} 
               onChange={handleLanguageChange}
               className="bg-transparent border-none focus:ring-0 cursor-pointer text-gray-700 font-medium"
               disabled={isPending}
             >
               <option value="nl">NL</option>
               <option value="en">EN</option>
               <option value="de">DE</option>
               <option value="fr">FR</option>
               <option value="es">ES</option>
             </select>
          </div>

          <Link href="#" className="hidden lg:flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-tripper-pink transition-colors">
            <Heart className="h-5 w-5" />
            <span className="hidden xl:inline">{t('wishlist')}</span>
          </Link>
          {user ? (
            <button 
              onClick={() => signOut(locale as string)}
              className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-tripper-pink transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden xl:inline">Logout</span>
            </button>
          ) : (
            <Link href="/login" className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-tripper-pink transition-colors">
              <User className="h-5 w-5" />
              <span className="hidden xl:inline">{t('login')}</span>
            </Link>
          )}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </div>
      
      {/* Categories Bar (Desktop) */}
      <div className="hidden md:block border-t border-gray-100 relative z-40">
        <div className="container mx-auto px-4">
            <ul className="flex items-center gap-8 py-3 text-sm font-medium text-gray-600 overflow-visible">
                <li><Link href="/category/day-trips" className="hover:text-tripper-pink cursor-pointer whitespace-nowrap">{t('categories.dayOut')}</Link></li>
                <li><Link href="/category/sauna" className="hover:text-tripper-pink cursor-pointer whitespace-nowrap">{t('categories.sauna')}</Link></li>
                <li><Link href="/category/food" className="hover:text-tripper-pink cursor-pointer whitespace-nowrap">{t('categories.food')}</Link></li>
                <li><Link href="/category/museums" className="hover:text-tripper-pink cursor-pointer whitespace-nowrap">{t('categories.museums')}</Link></li>
                
                {/* Products Dropdown */}
                <li className="relative group">
                  <button 
                    className="hover:text-tripper-pink cursor-pointer whitespace-nowrap flex items-center gap-1 focus:outline-none"
                    onClick={() => setIsProductsOpen(!isProductsOpen)}
                    onMouseEnter={() => setIsProductsOpen(true)}
                  >
                    {t('categories.products')} <ChevronDown size={14} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {(isProductsOpen) && (
                    <div 
                      className="absolute top-full left-0 mt-2 w-64 bg-white shadow-xl rounded-lg border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2"
                      onMouseLeave={() => setIsProductsOpen(false)}
                    >
                       <Link href="/category/all-deals" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-tripper-pink transition-colors">{t('categories.allDeals')}</Link>
                       <Link href="/category/nearby" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-tripper-pink transition-colors">{t('categories.nearby')}</Link>
                       <Link href="/category/day-trips" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-tripper-pink transition-colors">{t('categories.dayOut')}</Link>
                       <Link href="/category/hotels" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-tripper-pink transition-colors">{t('categories.hotels')}</Link>
                       <Link href="/category/food" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-tripper-pink transition-colors">{t('categories.food')}</Link>
                       <Link href="/category/sauna" className="block px-4 py-2 text-tripper-pink font-medium bg-purple-50 hover:bg-purple-100 transition-colors">{t('categories.beautyWellness')}</Link>
                       <Link href="/category/night-out" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-tripper-pink transition-colors">{t('categories.nightOut')}</Link>
                       <Link href="/category/auto" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-tripper-pink transition-colors">{t('categories.auto')}</Link>
                       <Link href="/category/workshops" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-tripper-pink transition-colors">{t('categories.workshops')}</Link>
                    </div>
                  )}
                </li>

                <li><Link href="/category/last-minute" className="hover:text-tripper-pink cursor-pointer whitespace-nowrap text-red-500">{t('categories.lastMinute')}</Link></li>
            </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white absolute w-full left-0 top-full shadow-lg p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
           <input
            type="text"
            placeholder={t('searchPlaceholder')}
            className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-tripper-pink"
          />
          
           {/* Mobile Language Switcher */}
           <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
             <Globe className="h-5 w-5" />
             <select 
               value={locale} 
               onChange={handleLanguageChange}
               className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
               disabled={isPending}
             >
               <option value="nl">Nederlands</option>
               <option value="en">English</option>
               <option value="de">Deutsch</option>
               <option value="fr">Français</option>
               <option value="es">Español</option>
             </select>
           </div>

           {user ? (
             <button 
               // onClick={() => signOut(locale)} // Disabled for now
               className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-tripper-pink w-full text-left"
             >
               <LogOut className="h-5 w-5" /> Logout
             </button>
           ) : (
             <Link href="/login" className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-tripper-pink">
               <User className="h-5 w-5" /> {t('login')}
             </Link>
           )}

           <Link href="#" className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-tripper-pink">
             <Heart className="h-5 w-5" /> {t('wishlist')}
           </Link>
           <div className="border-t border-gray-100 pt-2 flex flex-col gap-2">
              <span className="font-bold text-gray-900">Categorieën</span>
              <Link href="/category/day-trips" className="text-sm text-gray-600 hover:text-tripper-pink">{t('categories.dayOut')}</Link>
              <Link href="/category/sauna" className="text-sm text-gray-600 hover:text-tripper-pink">{t('categories.sauna')}</Link>
              <Link href="/category/food" className="text-sm text-gray-600 hover:text-tripper-pink">{t('categories.food')}</Link>
              <Link href="/category/museums" className="text-sm text-gray-600 hover:text-tripper-pink">{t('categories.museums')}</Link>
           </div>
        </div>
      )}
    </header>
  );
}
