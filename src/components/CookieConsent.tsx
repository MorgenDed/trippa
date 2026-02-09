'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations('CookieConsent');

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Small delay to not overwhelm the user immediately
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (type: 'all' | 'necessary') => {
    localStorage.setItem('cookie-consent', type);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-[0_-4px_24px_rgba(0,0,0,0.1)] border border-gray-100 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <p className="text-gray-700 leading-relaxed">
                {t('text')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                onClick={() => handleConsent('necessary')}
                className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors whitespace-nowrap"
              >
                {t('necessary')}
              </button>
              <button
                onClick={() => handleConsent('all')}
                className="px-6 py-2.5 rounded-lg bg-tripper-pink text-white font-bold hover:bg-tripper-pink-hover shadow-md hover:shadow-lg transition-all whitespace-nowrap"
              >
                {t('agree')}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
