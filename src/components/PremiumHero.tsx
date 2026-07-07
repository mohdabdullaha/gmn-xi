"use client";
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// ── Types ─────────────────────────────────────────────────────
interface HeroButton {
  text: string;
  icon?: ReactNode;
  link: string;
  primary?: boolean;
}

interface PremiumHeroProps {
  image?: string;
  title?: ReactNode;
  titleGradient?: string;
  subtitle?: string;
  intro?: string;
  height?: string;
  showScroll?: boolean;
  showButtons?: boolean;
  buttons?: HeroButton[];
}

const PremiumHero: React.FC<PremiumHeroProps> = ({
  image = '/img.jpg',
  title,
  titleGradient = 'from-white via-white to-gold',
  subtitle,
  intro,
  height = 'h-[65vh] md:h-[75vh]',
  showScroll = false,
  showButtons = false,
  buttons = [],
}) => {
  return (
    <section className={`relative ${height} flex items-center justify-center overflow-hidden bg-[#040A15]`}>
      {/* Parallax Background Layer */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: 'easeOut' }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={image}
          alt={typeof title === 'string' ? title : 'Hero'}
          fill
          priority
          className="object-cover opacity-50"
        />
      </motion.div>

      {/* Gradient & Noise Overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#081225]/60 via-transparent to-[#040A15]" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#040A15] via-transparent to-transparent opacity-80" />

      {/* Animated Glow Elements */}
      <motion.div
        animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-gold/5 blur-[120px] rounded-full z-[1]"
      />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl px-6 text-center mb-20 md:mb-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {subtitle && (
            <span className="inline-block text-gold text-xs md:text-sm font-black uppercase tracking-[0.5em] mb-6 drop-shadow-md">
              {subtitle}
            </span>
          )}

          <h1
            className={`text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight mb-8 ${
              typeof title === 'string' && /[\u0600-\u06FF]/.test(title) ? 'font-urdu' : ''
            }`}
          >
            {typeof title === 'string' ? (
              <span
                className={`bg-clip-text text-transparent bg-gradient-to-r ${titleGradient} inline-block drop-shadow-2xl`}
              >
                {title}
              </span>
            ) : (
              title
            )}
          </h1>

          <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8 opacity-60" />

          {intro && (
            <p
              className={`text-lg md:text-2xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-md mb-10 italic ${
                /[\u0600-\u06FF]/.test(intro) ? 'font-urdu' : 'font-serif'
              }`}
            >
              "{intro}"
            </p>
          )}

          {showButtons && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-5"
            >
              {buttons.map((btn: any, idx: number) => {
                const isInternal = btn.link?.startsWith('/') && !btn.link?.startsWith('//');

                if (isInternal) {
                  return (
                    <Link
                      key={btn?.id || btn?.title || idx}
                      href={btn.link}
                      className={
                        btn.primary
                          ? 'group relative px-8 py-4 bg-white text-navy font-black rounded-2xl overflow-hidden shadow-2xl transition-all hover:scale-105 active:scale-95'
                          : 'px-8 py-4 bg-transparent text-white border-2 border-white/20 hover:border-white/50 font-black rounded-2xl transition-all hover:bg-white/5 backdrop-blur-sm'
                      }
                    >
                      {btn.primary && (
                        <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      )}
                      <span className="relative z-10 flex items-center gap-2">
                        {btn.text} {btn.icon}
                      </span>
                    </Link>
                  );
                }

                return (
                  <a
                    key={idx}
                    href={btn.link}
                    className={
                      btn.primary
                        ? 'group relative px-8 py-4 bg-white text-navy font-black rounded-2xl overflow-hidden shadow-2xl transition-all hover:scale-105 active:scale-95'
                        : 'px-8 py-4 bg-transparent text-white border-2 border-white/20 hover:border-white/50 font-black rounded-2xl transition-all hover:bg-white/5 backdrop-blur-sm'
                    }
                  >
                    {btn.primary && (
                      <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      {btn.text} {btn.icon}
                    </span>
                  </a>
                );
              })}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      {showScroll && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-2 md:bottom-10 left-1/2 -translate-x-1/2 z-[1] flex flex-col items-center gap-1 md:gap-2 pointer-events-none"
        >
          <span className="text-[9px] md:text-[10px] font-black text-white/50 tracking-[0.3em] uppercase drop-shadow-md">
            Scroll
          </span>
          <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-gold to-transparent" />
        </motion.div>
      )}
    </section>
  );
};

export default PremiumHero;
