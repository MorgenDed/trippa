import { getTranslations } from 'next-intl/server';
import { HeroContent } from './HeroContent';

export async function Hero() {
  const t = await getTranslations('Hero');

  return (
    <section className="relative h-[400px] w-full bg-gradient-to-r from-purple-600 via-pink-600 to-tripper-pink overflow-hidden flex items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 z-10" />
      <div className="absolute inset-0 bg-black/20 z-10" />
      
      {/* Content */}
      <HeroContent title={t('title')} subtitle={t('subtitle')} />
    </section>
  );
}
