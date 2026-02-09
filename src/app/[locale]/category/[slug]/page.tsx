import { useTranslations } from 'next-intl';
import { categoryDeals } from '@/data/deals';
import { DealGrid } from "@/components/DealGrid";
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = await getTranslations('Header.categories');

  // Map slug to translation key
  const slugToKey: Record<string, string> = {
    'day-trips': 'dayOut',
    'sauna': 'sauna',
    'food': 'food',
    'museums': 'museums',
    'products': 'products',
    'last-minute': 'lastMinute',
    'hotels': 'hotels',
    'night-out': 'nightOut',
    'auto': 'auto',
    'workshops': 'workshops',
    'nearby': 'nearby',
    'all-deals': 'allDeals'
  };

  const translationKey = slugToKey[slug];
  const title = translationKey ? t(translationKey) : slug;

  return {
    title: `${title} Deals`,
    description: `Find the best ${title} deals on Trippa. Save up to 70% on tickets and enjoy unforgettable experiences with friends and family.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = await getTranslations('Header.categories');

  const deals = categoryDeals[slug] || [];

  // Map slug to translation key
  const slugToKey: Record<string, string> = {
    'day-trips': 'dayOut',
    'sauna': 'sauna',
    'food': 'food',
    'museums': 'museums',
    'products': 'products',
    'last-minute': 'lastMinute',
    'hotels': 'hotels',
    'night-out': 'nightOut',
    'auto': 'auto',
    'workshops': 'workshops',
    'nearby': 'nearby',
    'all-deals': 'allDeals'
  };

  const translationKey = slugToKey[slug];
  const title = translationKey ? t(translationKey) : slug;

  if (deals.length === 0) {
      return (
          <div className="min-h-screen bg-gray-50 py-20 px-4">
              <div className="container mx-auto text-center">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
                  <p className="text-gray-600">Geen deals gevonden voor deze categorie.</p>
              </div>
          </div>
      );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20 pt-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 capitalize">{title}</h1>
        <DealGrid deals={deals} />
      </div>
    </div>
  );
}
