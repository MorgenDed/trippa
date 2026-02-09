import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Legal' });

  return {
    title: `${t('refundTitle')} - Trippa`,
    description: t('refundDescription'),
  };
}

export default function RefundPage() {
  const t = useTranslations('Legal');

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">{t('refundTitle')}</h1>
      <div className="prose max-w-none">
        <p className="mb-4">{t('refundIntro')}</p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">{t('refundRightTitle')}</h2>
        <p className="mb-4">{t('refundRightText')}</p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{t('refundProcessTitle')}</h2>
        <p className="mb-4">{t('refundProcessText')}</p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{t('refundEffectsTitle')}</h2>
        <p className="mb-4">{t('refundEffectsText')}</p>
      </div>
    </div>
  );
}