import { notFound } from 'next/navigation';
import { getDealById } from '@/data/deals';
import { MapPin, Check, Star } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { DealGallery } from '@/components/DealGallery';
import { DealBookingSidebar } from '@/components/DealBookingSidebar';
import { ReviewsList } from '@/components/ReviewsList';
import { getTranslations } from 'next-intl/server';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const deal = getDealById(id);
  const tDeals = await getTranslations('Deals');

  if (!deal) {
    return {
      title: 'Deal Not Found',
    };
  }

  const dealTitle = tDeals(`${deal.id}.title`);
  const description = tDeals(`${deal.id}.description`);

  // Add "Discount" or "Korting" to title dynamically for better CTR
  const isDutch = true; // Ideally detect locale, but defaulting for now.
  // Note: For real app, pass locale to generateMetadata params
  
  return {
    title: `${dealTitle} - Tickets with Discount`,
    description: `${description} Book now at Trippa.online for the best price!`,
  };
}

export default async function DealPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deal = getDealById(id);
  const t = await getTranslations('DealPage');
  const tDeals = await getTranslations('Deals');

  if (!deal) {
    notFound();
  }

  const allImages = [deal.image, ...(deal.images || [])];
  
  // Try to translate title, fallback to original title if translation key is returned
  let dealTitle = tDeals(`${deal.id}.title`);
  if (dealTitle.includes(`${deal.id}.title`)) {
    dealTitle = deal.title;
  }
  
  const description = tDeals(`${deal.id}.description`);
  
  // Generate random rating and reviews based on ID (consistent with DealCard logic)
  const seed = Number(id);
  const rating = (Math.floor((seed * 13 % 15) + 35) / 10).toFixed(1);
  const reviews = Math.floor((seed * 17 % 450) + 50);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t('home'),
        item: 'https://trippa.online'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: dealTitle,
        item: `https://trippa.online/en/deal/${id}`
      }
    ]
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: dealTitle,
    image: deal.image,
    description: description,
    offers: {
      '@type': 'Offer',
      price: deal.price,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: `http://localhost:3000/en/deal/${id}`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating,
      reviewCount: reviews,
    },
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumb - Simplified */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 text-sm text-gray-500">
          <Link href="/" className="hover:text-tripper-pink">{t('home')}</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 truncate">{dealTitle}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Gallery & Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Gallery (Client Component) */}
            <DealGallery 
                title={dealTitle}
                images={allImages}
                discount={deal.discount}
                label={deal.label}
            />

            {/* Mobile Booking (Visible only on mobile/tablet) */}
            <div className="lg:hidden">
               <DealBookingSidebar 
                  dealTitle={dealTitle}
                  originalPrice={deal.originalPrice}
                  price={deal.price}
                  image={deal.image}
               />
            </div>

            {/* Title & Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{dealTitle}</h1>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-1">
                  <MapPin className="text-tripper-pink" size={18} />
                  <span>{deal.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        size={18} 
                        className={cn(
                          "fill-current", 
                          "text-yellow-400"
                        )} 
                      />
                    ))}
                  </div>
                  <span className="text-blue-500 hover:underline cursor-pointer">({t('reviews')})</span>
                </div>
              </div>

              <div className="prose max-w-none text-gray-700">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{t('aboutTitle')}</h3>
                <p className="mb-4">
                  {description}
                </p>
                <p>
                  {t('aboutText2', { title: dealTitle })}
                </p>
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Star className="text-tripper-pink" size={20} />
                {t('highlightsTitle')}
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <li className="flex items-start gap-2 text-gray-700">
                  <Check className="text-green-500 shrink-0 mt-1" size={16} />
                  <span>{t('highlights.access', { title: dealTitle })}</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <Check className="text-green-500 shrink-0 mt-1" size={16} />
                  <span>{t('highlights.fees')}</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <Check className="text-green-500 shrink-0 mt-1" size={16} />
                  <span>{t('highlights.days')}</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <Check className="text-green-500 shrink-0 mt-1" size={16} />
                  <span>{t('highlights.ages')}</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <Check className="text-green-500 shrink-0 mt-1" size={16} />
                  <span>{t('highlights.experience', { location: deal.location })}</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <Check className="text-green-500 shrink-0 mt-1" size={16} />
                  <span>{t('highlights.guarantee')}</span>
                </li>
              </ul>
            </div>

            {/* Reviews */}
            <ReviewsList />

            {/* Location / Map */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="text-tripper-pink" size={20} />
                {t('locationTitle')}
              </h3>
              <div className="bg-gray-100 h-64 rounded-lg overflow-hidden relative">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(deal.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                  className="absolute inset-0"
                ></iframe>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Sidebar (Client Component) - Desktop Only */}
          <div className="hidden lg:block lg:col-span-1">
             <DealBookingSidebar 
                dealTitle={dealTitle}
                originalPrice={deal.originalPrice}
                price={deal.price}
                image={deal.image}
             />
          </div>
        </div>
      </div>
    </div>
  );
}
