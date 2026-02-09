import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Legal' });

  return {
    title: `${t('privacyTitle')} - Trippa`,
    description: t('privacyDescription'),
  };
}

export default function PrivacyPage() {
  const t = useTranslations('Legal');

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">{t('privacyTitle')}</h1>
      <div className="prose max-w-none">
        <p className="mb-4">{t('privacyIntro')}</p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">{t('privacyCollectionTitle')}</h2>
        <p className="mb-4">{t('privacyCollectionText')}</p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{t('privacyUsageTitle')}</h2>
        <p className="mb-4">{t('privacyUsageText')}</p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{t('privacyContactTitle')}</h2>
        <p className="mb-4">{t('privacyContactText')}</p>
      </div>
    </div>
  );
}
