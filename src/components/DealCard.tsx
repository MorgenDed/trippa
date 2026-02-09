import Image from 'next/image';
import { MapPin, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useState, useMemo } from 'react';
import { Link } from '@/i18n/routing';

interface DealCardProps {
  id: string | number;
  title: string;
  image: string;
  images?: string[];
  location: string;
  originalPrice: number;
  price: number;
  discount: number;
  className?: string;
  label?: string;
}

export function DealCard({ id, title, image, images, location, originalPrice, price, discount, className, label }: DealCardProps) {
  const t = useTranslations('Home.card');
  const tLabels = useTranslations('Labels');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Combine main image with additional images
  const allImages = [image, ...(images || [])];

  // Generate random rating and reviews
  // Use id to keep it consistent between renders
  const { rating, reviews } = useMemo(() => {
    const seed = Number(id);
    // Rating between 3.5 and 5.0
    const rating = (Math.floor((seed * 13 % 15) + 35) / 10).toFixed(1);
    // Reviews between 50 and 500
    const reviews = Math.floor((seed * 17 % 450) + 50);
    return { rating, reviews };
  }, [id]);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  // Safe label translation
  const translatedLabel = label ? (
    // @ts-ignore - Dynamic key check
    tLabels.has(label) ? tLabels(label) : label
  ) : null;

  return (
    <Link 
      href={`/deal/${id}`}
      className={cn("group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full block", className)}
    >
      <div className="relative h-48 w-full overflow-hidden shrink-0">
        {label && (
           <div className="absolute top-2 left-2 bg-tripper-pink text-white text-xs font-bold px-2 py-1 rounded z-10">
             {translatedLabel}
           </div>
        )}
        <div className="absolute top-2 right-2 bg-white/90 text-gray-900 text-xs font-bold px-2 py-1 rounded z-10 shadow-sm">
           -{discount}%
        </div>
        
        {/* Image Carousel */}
        <div className="relative w-full h-full">
            <Image 
              src={allImages[currentImageIndex]} 
              alt={`${title} - image ${currentImageIndex + 1}`} 
              fill 
              className="object-cover transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Carousel Navigation - Only show if multiple images */}
            {allImages.length > 1 && (
                <>
                    <button 
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button 
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                    >
                        <ChevronRight size={16} />
                    </button>
                    
                    {/* Dots indicator */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                        {allImages.map((_, idx) => (
                            <div 
                                key={idx} 
                                className={cn(
                                    "w-1.5 h-1.5 rounded-full transition-colors", 
                                    idx === currentImageIndex ? "bg-white" : "bg-white/50"
                                )}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>

      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
          <MapPin size={12} />
          <span>{location}</span>
        </div>
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 min-h-[40px] group-hover:text-tripper-pink transition-colors">
          {title}
        </h3>
        
        {/* Ratings */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                size={14} 
                className={cn(
                  "fill-current", 
                  star <= Math.round(Number(rating)) 
                    ? "text-yellow-400" 
                    : "text-gray-300"
                )} 
              />
            ))}
          </div>
          <span className="text-xs text-blue-500 hover:underline">({reviews}+ reviews)</span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-2">
           <div className="flex flex-col">
              <span className="text-gray-400 text-xs line-through">€{originalPrice.toFixed(2)}</span>
              <span className="text-tripper-pink font-bold text-xl">€{price.toFixed(2)}</span>
           </div>
           <div 
             className="bg-tripper-pink text-white px-4 py-1.5 rounded-md text-sm font-medium opacity-100 md:opacity-0 group-hover:opacity-100 transform translate-y-0 md:translate-y-2 group-hover:translate-y-0 transition-all duration-300"
           >
             {t('view')}
           </div>
        </div>
      </div>
    </Link>
  );
}
