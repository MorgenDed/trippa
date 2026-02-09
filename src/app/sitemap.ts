import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://trippa.online';
  
  // Static routes
  const routes = [
    '',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/refund',
  ].map((route) => ({
    url: `${baseUrl}/en${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 1,
  }));

  // Categories (simplified list)
  const categories = ['day-trips', 'sauna', 'food', 'museums'].map((slug) => ({
    url: `${baseUrl}/en/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...routes, ...categories];
}
