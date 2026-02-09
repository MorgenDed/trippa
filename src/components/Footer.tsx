import { Link } from '@/i18n/routing';
import { Facebook, Instagram } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-gray-50 border-t pt-12 pb-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">{t('about.title')}</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="/about" className="hover:text-tripper-pink transition-colors">{t('about.aboutUs')}</Link></li>
              <li><Link href="/jobs" className="hover:text-tripper-pink transition-colors">{t('about.jobs')}</Link></li>
              <li><Link href="#" className="hover:text-tripper-pink transition-colors">{t('about.business')}</Link></li>
              <li><Link href="/blog" className="hover:text-tripper-pink transition-colors">{t('about.blog')}</Link></li>
            </ul>
          </div>

          {/* Service */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">{t('service.title')}</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-tripper-pink transition-colors">{t('service.faq')}</Link></li>
              <li><Link href="/contact" className="hover:text-tripper-pink transition-colors">{t('service.contact')}</Link></li>
              <li><Link href="/terms" className="hover:text-tripper-pink transition-colors">{t('service.terms')}</Link></li>
              <li><Link href="/privacy" className="hover:text-tripper-pink transition-colors">{t('service.privacy')}</Link></li>
              <li><Link href="/refund" className="hover:text-tripper-pink transition-colors">{t('service.refund')}</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">{t('categories.title')}</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-tripper-pink transition-colors">{t('categories.parks')}</Link></li>
              <li><Link href="#" className="hover:text-tripper-pink transition-colors">{t('categories.zoos')}</Link></li>
              <li><Link href="#" className="hover:text-tripper-pink transition-colors">{t('categories.wellness')}</Link></li>
              <li><Link href="#" className="hover:text-tripper-pink transition-colors">{t('categories.restaurants')}</Link></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">{t('stayUpdated.title')}</h3>
            <p className="text-sm text-gray-600 mb-4">
              {t('stayUpdated.text')}
            </p>
            <div className="flex gap-4">
               <a 
                 href="https://www.facebook.com/tripper.nl/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white cursor-pointer hover:opacity-90 transition-opacity"
               >
                 <Facebook size={20} />
               </a>
               <a 
                 href="https://www.instagram.com/tripper.nl/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center text-white cursor-pointer hover:opacity-90 transition-opacity"
               >
                 <Instagram size={20} />
               </a>
               <a 
                 href="https://www.tiktok.com/@tripper.nl" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white cursor-pointer hover:opacity-90 transition-opacity"
               >
                 <svg 
                   width="20" 
                   height="20" 
                   viewBox="0 0 24 24" 
                   fill="none" 
                   stroke="currentColor" 
                   strokeWidth="2" 
                   strokeLinecap="round" 
                   strokeLinejoin="round"
                 >
                   <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                 </svg>
               </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 mt-8 text-center text-sm text-gray-500">
          <p>{t('copyright', { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
}
