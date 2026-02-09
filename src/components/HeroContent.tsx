'use client';
import { motion } from 'framer-motion';

interface HeroContentProps {
  title: string;
  subtitle: string;
}

export function HeroContent({ title, subtitle }: HeroContentProps) {
  return (
    <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg"
      >
        {title}
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg md:text-2xl text-white/95 mb-8 font-medium drop-shadow-md"
      >
        {subtitle}
      </motion.p>
    </div>
  );
}
