'use client';

import { motion } from "framer-motion";
import { DealCard } from "@/components/DealCard";

interface DealGridProps {
  deals: any[];
}

export function DealGrid({ deals }: DealGridProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      {deals.map((deal) => (
        <motion.div key={deal.id} variants={item} className="h-full">
          <DealCard 
            id={deal.id}
            title={deal.title}
            image={deal.image}
            location={deal.location}
            originalPrice={deal.originalPrice}
            price={deal.price}
            discount={deal.discount}
            label={deal.label}
            images={deal.images}
            className="h-full"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
