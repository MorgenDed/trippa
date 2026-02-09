'use client';

import { DealCard } from "@/components/DealCard";
import { motion } from "framer-motion";

interface HomeDealsProps {
  newDeals: any[];
  popularDeals: any[];
  titles: {
    newDeals: string;
    popularDeals: string;
  }
}

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

export function HomeDeals({ newDeals, popularDeals, titles }: HomeDealsProps) {
  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-lg mb-10">
         <h2 className="text-2xl font-bold text-gray-800 mb-6">{titles.newDeals}</h2>
         <motion.div 
           variants={container}
           initial="hidden"
           whileInView="show"
           viewport={{ once: true, margin: "-50px" }}
           className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
         >
           {newDeals.map((deal) => (
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
      </div>
      
       <div className="mb-10">
         <h2 className="text-2xl font-bold text-gray-800 mb-6">{titles.popularDeals}</h2>
         <motion.div 
           variants={container}
           initial="hidden"
           whileInView="show"
           viewport={{ once: true, margin: "-50px" }}
           className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
         >
           {popularDeals.map((deal) => (
             <motion.div key={`pop-${deal.id}`} variants={item} className="h-full">
               <DealCard 
                 id={deal.id}
                 title={deal.title}
                 image={deal.image}
                 location={deal.location}
                 originalPrice={deal.originalPrice}
                 price={deal.price}
                 discount={deal.discount}
                 images={deal.images}
                 className="h-full"
               />
             </motion.div>
           ))}
         </motion.div>
      </div>
    </>
  );
}
