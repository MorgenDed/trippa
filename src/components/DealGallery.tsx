'use client';

import Image from 'next/image';
import { useState } from 'react';

interface DealGalleryProps {
  title: string;
  images: string[];
  discount: number;
  label?: string;
}

export function DealGallery({ title, images, discount, label }: DealGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Dedup images just in case
  const uniqueImages = Array.from(new Set(images));

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
      <div className="relative h-[400px] w-full">
        <Image
          src={uniqueImages[activeImageIndex]}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
          priority
        />
        {label && (
          <div className="absolute top-4 left-4 bg-tripper-pink text-white text-sm font-bold px-3 py-1.5 rounded shadow-md z-10">
            {label}
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white/90 text-gray-900 font-bold px-3 py-1.5 rounded shadow-md z-10">
          -{discount}%
        </div>
      </div>
      
      {/* Thumbnails */}
      {uniqueImages.length > 1 && (
        <div className="p-4 flex gap-2 overflow-x-auto">
          {uniqueImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-colors ${
                activeImageIndex === idx ? 'border-tripper-pink' : 'border-transparent'
              }`}
            >
              <Image
                src={img}
                alt={`${title} thumb ${idx}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
