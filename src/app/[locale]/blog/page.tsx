import { Link } from '@/i18n/routing';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { BLOG_POSTS } from '@/data/blog';

export default function BlogPage() {
  const t = useTranslations('Blog'); // Assuming we add translations later, fallback to hardcoded for now

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4 text-center">Trippa Blog</h1>
      <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        Inspiratie, tips en nieuws over de leukste uitjes en ervaringen.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post) => (
          <article key={post.slug} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
            <div className="relative h-48 overflow-hidden">
              <Image 
                src={post.image} 
                alt={post.title} 
                fill 
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User size={14} />
                  <span>{post.author}</span>
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-tripper-pink transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <Link 
                href={`/blog/${post.slug}`} 
                className="inline-flex items-center text-tripper-pink font-semibold hover:gap-2 transition-all"
              >
                Lees meer <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
