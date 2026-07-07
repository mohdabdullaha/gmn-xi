"use client";
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

// ── Types ─────────────────────────────────────────────────────
interface SectionHeadingProps {
  children: ReactNode;
  centered?: boolean;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ children, centered = true }) => {
  const hasArabic = typeof children === 'string' && /[\u0600-\u06FF]/.test(children);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`flex flex-col mb-16 ${centered ? 'items-center text-center' : 'items-start text-left'}`}
    >
      <span className="text-gold text-[10px] md:text-xs font-black uppercase tracking-[0.4em] mb-3">
        Nexus Foundations
      </span>
      <h2
        className={`text-3xl md:text-5xl font-black text-navy mb-5 tracking-tight relative pb-1 ${
          hasArabic ? 'font-urdu' : ''
        }`}
      >
        {children}
      </h2>
      <div className="relative flex items-center gap-2">
        <div className="w-8 h-[2px] bg-gradient-to-r from-transparent to-gold" />
        <div className="w-3 h-3 border-2 border-gold rotate-45" />
        <div className="w-8 h-[2px] bg-gradient-to-l from-transparent to-gold" />
      </div>
    </motion.div>
  );
};

export default SectionHeading;
