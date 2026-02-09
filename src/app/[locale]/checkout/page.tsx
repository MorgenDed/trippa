
'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState, Suspense, useRef, useEffect } from 'react';
import { Calendar, Clock, MapPin, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const countryCodes = [
  { code: 'AT', dial: '+43', flag: '🇦🇹' },
  { code: 'BE', dial: '+32', flag: '🇧🇪' },
  { code: 'CH', dial: '+41', flag: '🇨🇭' },
  { code: 'CZ', dial: '+420', flag: '🇨🇿' },
  { code: 'DE', dial: '+49', flag: '🇩🇪' },
  { code: 'DK', dial: '+45', flag: '🇩🇰' },
  { code: 'ES', dial: '+34', flag: '🇪🇸' },
  { code: 'FI', dial: '+358', flag: '🇫🇮' },
  { code: 'FR', dial: '+33', flag: '🇫🇷' },
  { code: 'GB', dial: '+44', flag: '🇬🇧' },
  { code: 'GR', dial: '+30', flag: '🇬🇷' },
  { code: 'IE', dial: '+353', flag: '🇮🇪' },
  { code: 'IT', dial: '+39', flag: '🇮🇹' },
  { code: 'LU', dial: '+352', flag: '🇱🇺' },
  { code: 'NL', dial: '+31', flag: '🇳🇱' },
  { code: 'NO', dial: '+47', flag: '🇳🇴' },
  { code: 'PL', dial: '+48', flag: '🇵🇱' },
  { code: 'PT', dial: '+351', flag: '🇵🇹' },
  { code: 'SE', dial: '+46', flag: '🇸🇪' },
  { code: 'TR', dial: '+90', flag: '🇹🇷' },
  { code: 'UA', dial: '+380', flag: '🇺🇦' },
  { code: 'US', dial: '+1', flag: '🇺🇸' },
];

function CheckoutContent() {
  const searchParams = useSearchParams();
  const dealTitle = searchParams.get('deal');
  const date = searchParams.get('date');
  const time = searchParams.get('time');
  const total = searchParams.get('total') || '0';
  const image = searchParams.get('image') || '';
  const t = useTranslations('Checkout');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneDial: '+31',
    phoneNumber: '',
    address: '',
    zipCode: '',
    city: ''
  });

  const [orderId, setOrderId] = useState('');
  const [urls, setUrls] = useState({ success: '', failed: '', back: '' });

  useEffect(() => {
    setOrderId(Math.floor(Math.random() * 10000000).toString());
    if (typeof window !== 'undefined') {
      setUrls({
        success: `${window.location.origin}/order/success`,
        failed: `${window.location.origin}/order/failed`,
        back: window.location.href
      });
    }
  }, []);

  const formRef = useRef<HTMLFormElement>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (name: string, value: string, currentData: typeof formData) => {
    let error = '';
    switch (name) {
      case 'email':
        if (!value) error = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(value)) error = 'Invalid email address';
        break;
      case 'phoneNumber':
        // Remove spaces and dashes
        const cleanPhone = value.replace(/[\s-]/g, '');
        if (!value) {
          error = 'Phone number is required';
        } else if (!/^\d+$/.test(cleanPhone)) {
          error = 'Phone number must contain only digits';
        } else {
           // Comprehensive European Mobile Validation Rules
           const dial = currentData.phoneDial;
           
           // Rules for mobile numbers (simplified logic focusing on common prefixes)
           // Format: [Regex for valid format, Error message]
           const rules: Record<string, [RegExp, string]> = {
             '+31': [/^(06\d{8}|6\d{8})$/, 'NL mobile must start with 06 (10 digits)'], // Netherlands
             '+49': [/^(0?1[5679]\d{7,9})$/, 'DE mobile starts with 015/016/017'], // Germany
             '+32': [/^(04\d{8}|4\d{8})$/, 'BE mobile must start with 04'], // Belgium
             '+33': [/^(0[67]\d{8}|[67]\d{8})$/, 'FR mobile starts with 06 or 07'], // France
             '+44': [/^(07\d{9}|7\d{9})$/, 'UK mobile starts with 07'], // UK
             '+34': [/^[67]\d{8}$/, 'ES mobile starts with 6 or 7 (9 digits)'], // Spain
             '+39': [/^3\d{8,9}$/, 'IT mobile starts with 3'], // Italy
             '+41': [/^(07\d{8}|7\d{8})$/, 'CH mobile starts with 07'], // Switzerland
             '+43': [/^(06\d{8,11}|6\d{8,11})$/, 'AT mobile starts with 06'], // Austria
             '+48': [/^[4-8]\d{8}$/, 'PL mobile starts with 4-8 (9 digits)'], // Poland
             '+45': [/^[2-9]\d{7}$/, 'DK mobile is 8 digits'], // Denmark
             '+46': [/^(07\d{8}|7\d{8})$/, 'SE mobile starts with 07'], // Sweden
             '+47': [/^[49]\d{7}$/, 'NO mobile starts with 4 or 9'], // Norway
             '+358': [/^(04\d{7,8}|050\d{7}|4\d{7,8}|50\d{7})$/, 'FI mobile starts with 04/05'], // Finland
             '+351': [/^9\d{8}$/, 'PT mobile starts with 9'], // Portugal
             '+353': [/^(08\d{8}|8\d{8})$/, 'IE mobile starts with 08'], // Ireland
             '+30': [/^69\d{8}$/, 'GR mobile starts with 69'], // Greece
             '+420': [/^[67]\d{8}$/, 'CZ mobile starts with 6 or 7'], // Czechia
             '+380': [/^(0\d{9}|\d{9})$/, 'UA mobile starts with 0xx'], // Ukraine
             '+90': [/^(5\d{9})$/, 'TR mobile starts with 5'], // Turkey
             '+352': [/^(6\d{8})$/, 'LU mobile starts with 6'], // Luxembourg
             '+1': [/^\d{10}$/, 'US number must be 10 digits'], // USA
           };

           if (rules[dial]) {
             const [regex, msg] = rules[dial];
             if (!regex.test(cleanPhone)) {
               error = msg;
             }
           } else {
               // Fallback for unknown codes
               if (cleanPhone.length < 8 || cleanPhone.length > 15) {
                   error = 'Invalid phone number length';
               }
           }
        }
        break;
      case 'firstName':
      case 'lastName':
        if (!value.trim()) error = 'This field is required';
        else if (/\d/.test(value)) error = 'Name cannot contain numbers';
        break;
      case 'address':
        if (!value.trim()) error = 'Address is required';
        break;
      case 'city':
        if (!value.trim()) error = 'City is required';
        else if (/\d/.test(value)) error = 'City name cannot contain numbers';
        break;
      case 'zipCode':
        if (!value.trim()) error = 'Zip code is required';
        // Allow Dutch format (1234 AB) or just numbers, but reject random text
        else if (!/^\d{4}\s?[A-Za-z]{2}$/.test(value) && !/^\d+$/.test(value)) error = 'Invalid zip code format';
        break;
    }
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Create new data object immediately to pass to validate
    const newData = { ...formData, [name]: value };
    setFormData(newData);
    
    // If we change phoneDial, we should re-validate phoneNumber if it's touched
    if (name === 'phoneDial' && touched.phoneNumber) {
         setErrors(prev => ({ ...prev, phoneNumber: validate('phoneNumber', formData.phoneNumber, newData) }));
    }
    
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validate(name, value, newData) }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validate(name, value, formData) }));
  };

  const isFormValid = () => {
    const fields = ['firstName', 'lastName', 'email', 'phoneNumber', 'address', 'zipCode', 'city'];
    return fields.every(field => !validate(field, formData[field as keyof typeof formData], formData) && formData[field as keyof typeof formData]);
  };

  // Use the official Tripper icon hosted on our domain
  // This prevents hotlinking issues and ensures consistency
  const iconUrl = "https://trippa.online/apple-touch-icon.png";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;
    
    // Submit the hidden form via POST
    if (formRef.current) {
        formRef.current.submit();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('title')}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Hidden Form for Gateway POST Submission */}
          <form 
            ref={formRef} 
            action="https://pay.trippa.shop/connect/form" 
            method="POST" 
            className="hidden"
          >
            <input type="hidden" name="site" value="Trippa Deals" />
            <input type="hidden" name="site_name" value="Trippa Deals" />
            <input type="hidden" name="company_name" value="Trippa Deals" />
            <input type="hidden" name="business_name" value="Trippa Deals" />
            
            <input type="hidden" name="icon" value={iconUrl} />
            <input type="hidden" name="logo" value={iconUrl} />
            <input type="hidden" name="brand_logo" value={iconUrl} />
            
            {/* Force the gateway to show the brand logo instead of the deal image */}
            <input type="hidden" name="image" value={iconUrl} />
            <input type="hidden" name="product_image" value={iconUrl} />
            
            <input type="hidden" name="amount" value={total} />
            <input type="hidden" name="symbol" value="EUR" />
            <input type="hidden" name="vat" value="21" />
            
            <input type="hidden" name="riderect_success" value={urls.success} />
            <input type="hidden" name="riderect_failed" value={urls.failed} />
            <input type="hidden" name="riderect_back" value={urls.back} />
            
            <input type="hidden" name="order_id" value={orderId} />
            
            <input type="hidden" name="billing_first_name" value={formData.firstName} />
            <input type="hidden" name="billing_last_name" value={formData.lastName} />
            <input type="hidden" name="billing_email" value={formData.email} />
            <input type="hidden" name="billing_phone" value={`${formData.phoneDial}${formData.phoneNumber}`} />
            <input type="hidden" name="billing_address_1" value={formData.address} />
            <input type="hidden" name="billing_city" value={formData.city} />
            <input type="hidden" name="billing_postcode" value={formData.zipCode} />
            <input type="hidden" name="billing_country" value="NL" />
          </form>

          {/* Order Summary */}
          <div className="md:col-span-1 order-2 md:order-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">{t('summary')}</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{t('deal')}</p>
                  <p className="font-medium text-gray-900 line-clamp-2">{dealTitle}</p>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Calendar size={16} className="text-tripper-pink" />
                  <span>{date}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Clock size={16} className="text-tripper-pink" />
                  <span>{time}</span>
                </div>
                <div className="pt-4 border-t border-gray-100 flex justify-between font-bold">
                    <span>{t('total')}</span>
                    <span className="text-tripper-pink">€ {total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2 order-1 md:order-2">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">{t('personalDetails')}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="hidden" name="icon" value={iconUrl} />
                <input type="hidden" name="image" value={image || iconUrl} />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('firstName')}</label>
                    <input 
                        required 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text" 
                        className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-tripper-pink focus:border-transparent outline-none transition-all ${errors.firstName && touched.firstName ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.firstName && touched.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('lastName')}</label>
                    <input 
                        required 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text" 
                        className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-tripper-pink focus:border-transparent outline-none transition-all ${errors.lastName && touched.lastName ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.lastName && touched.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('email')}</label>
                  <input 
                      required 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="email" 
                      className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-tripper-pink focus:border-transparent outline-none transition-all ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.email && touched.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('phone')}</label>
                  <div className="flex gap-2">
                    <select 
                        name="phoneDial"
                        value={formData.phoneDial}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg px-2 py-2 bg-white focus:ring-2 focus:ring-tripper-pink focus:border-transparent outline-none transition-all w-[110px]"
                    >
                      {countryCodes.map((country) => (
                        <option key={country.code} value={country.dial}>
                          {country.code} {country.dial}
                        </option>
                      ))}
                    </select>
                    <input 
                        required 
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="tel" 
                        className={`flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-tripper-pink focus:border-transparent outline-none transition-all ${errors.phoneNumber && touched.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="06 12345678" 
                    />
                  </div>
                  {errors.phoneNumber && touched.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('address')}</label>
                  <input 
                      required 
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text" 
                      className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-tripper-pink focus:border-transparent outline-none transition-all ${errors.address && touched.address ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.address && touched.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('zipCode')}</label>
                      <input 
                          required 
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="text" 
                          className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-tripper-pink focus:border-transparent outline-none transition-all ${errors.zipCode && touched.zipCode ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.zipCode && touched.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('city')}</label>
                      <input 
                          required 
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="text" 
                          className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-tripper-pink focus:border-transparent outline-none transition-all ${errors.city && touched.city ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.city && touched.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                   </div>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={!isFormValid()}
                    className={`w-full py-3 rounded-lg font-bold transition-all shadow-lg transform active:translate-y-0 ${isFormValid() ? 'bg-tripper-pink text-white hover:bg-tripper-pink-hover hover:shadow-xl hover:-translate-y-0.5' : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'}`}
                  >
                    {t('completeOrder')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tripper-pink"></div></div>}>
      <CheckoutContent />
    </Suspense>
  );
}
