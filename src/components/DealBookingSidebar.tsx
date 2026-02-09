'use client';

import { useState } from 'react';
import { Clock, Calendar, ShieldCheck, Ticket, Info } from 'lucide-react';
import { BookingModal } from "@/components/BookingModal";
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

// Lazy load the modal since it's heavy and only needed on click
const BookingModalLazy = dynamic(() => import('@/components/BookingModal').then(mod => mod.BookingModal), {
  ssr: false,
  loading: () => null
});

interface DealBookingSidebarProps {
  dealTitle: string;
  originalPrice: number;
  price: number;
  image: string;
}

export function DealBookingSidebar({ dealTitle, originalPrice, price, image }: DealBookingSidebarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations('DealPage.sidebar');

  return (
    <div className="sticky top-24 space-y-6">
      
      {/* Price Box */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">{dealTitle}</h3>
        
        <div className="flex items-end gap-3 mb-6">
          <div className="text-gray-400 text-lg line-through decoration-red-500 decoration-2">
            €{originalPrice.toFixed(2)}
          </div>
          <div className="text-tripper-pink text-4xl font-extrabold">
            €{price.toFixed(2)}
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock size={16} className="text-gray-400" />
            <span>{t('directDelivery')}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={16} className="text-gray-400" />
            <span>{t('validity')}</span>
          </div>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-tripper-pink hover:bg-tripper-pink/90 text-white font-bold py-3 rounded-lg text-lg shadow-md transition-all transform hover:scale-[1.02]"
        >
          {t('buyNow')}
        </button>
        
        <p className="text-center text-xs text-gray-400 mt-3">
          {t('paymentMethods')}
        </p>
      </div>

      {/* USPs */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
         <ul className="space-y-4">
           <li className="flex items-center gap-3">
             <div className="bg-green-100 p-2 rounded-full text-green-600">
               <ShieldCheck size={20} />
             </div>
             <div>
               <p className="font-bold text-gray-900 text-sm">{t('usps.safeTitle')}</p>
               <p className="text-xs text-gray-500">{t('usps.safeDesc')}</p>
             </div>
           </li>
           <li className="flex items-center gap-3">
             <div className="bg-blue-100 p-2 rounded-full text-blue-600">
               <Ticket size={20} />
             </div>
             <div>
               <p className="font-bold text-gray-900 text-sm">{t('usps.ticketsTitle')}</p>
               <p className="text-xs text-gray-500">{t('usps.ticketsDesc')}</p>
             </div>
           </li>
           <li className="flex items-center gap-3">
             <div className="bg-purple-100 p-2 rounded-full text-purple-600">
               <Info size={20} />
             </div>
             <div>
               <p className="font-bold text-gray-900 text-sm">{t('usps.serviceTitle')}</p>
               <p className="text-xs text-gray-500">{t('usps.serviceDesc')}</p>
             </div>
           </li>
         </ul>
      </div>

      {isModalOpen && (
        <BookingModalLazy 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          dealTitle={dealTitle}
          price={price}
          image={image}
        />
      )}
    </div>
  );
}
