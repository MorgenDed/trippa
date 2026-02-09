import { getBlogPostBySlug } from '@/data/blog';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Trippa Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link href="/blog" className="inline-flex items-center text-gray-600 hover:text-tripper-pink mb-8 transition-colors">
        <ArrowLeft size={20} className="mr-2" />
        Terug naar blog
      </Link>

      <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="relative h-64 md:h-96 w-full">
          <Image 
            src={post.image} 
            alt={post.title} 
            fill 
            className="object-cover"
            priority
          />
        </div>
        
        <div className="p-8 md:p-12">
          <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={18} />
              <span>{post.author}</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
            {post.title}
          </h1>

          <div 
            className="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 prose-a:text-tripper-pink"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
    </div>
  );
}
