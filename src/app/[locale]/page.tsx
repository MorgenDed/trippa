import { Hero } from "@/components/Hero";
import { HomeDeals } from "@/components/HomeDeals";
import WhitePage from "@/components/WhitePage";
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { categoryDeals } from '@/data/deals';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Hero' });
  
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const sp = await searchParams;
  console.log('Search Params:', sp);
  console.log('Keys length:', Object.keys(sp).length);
  
  // CLOAKING LOGIC:
  // If user comes without ANY parameters (direct traffic/moderators), show White Page.
  // If user comes from ads (with utm_source, gclid, etc) or any param, show Black Page (Trippa).
  // To bypass locally: http://localhost:3000/?test=1
  const showWhitePage = Object.keys(sp).length === 0;

  if (showWhitePage) {
    return <WhitePage />;
  }

  const t = await getTranslations('Home');
  const tDeals = await getTranslations('Deals');

  // Helper to translate deals
  const translateDeals = (deals: any[]) => {
    return deals.map(deal => ({
      ...deal,
      title: tDeals(`${deal.id}.title`),
    }));
  };

  // Select deals for the homepage
  // For demo purposes, we'll use 'sauna' as "New Deals" and 'day-trips' as "Popular Deals"
  // In a real app, you might have specific flags or a separate API endpoint
  const newDeals = translateDeals(categoryDeals['museums']?.slice(0, 4) || []);
  const popularDeals = translateDeals(categoryDeals['day-trips']?.slice(0, 4) || []);

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Trippa.online',
    url: 'https://trippa.online',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://trippa.online/en?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Hero />
      
      <div className="container mx-auto px-4 -mt-10 relative z-30">
        <HomeDeals 
          newDeals={newDeals} 
          popularDeals={popularDeals} 
          titles={{
            newDeals: t('newDeals'),
            popularDeals: t('popularDeals')
          }}
        />
      </div>
    </div>
  );
}
