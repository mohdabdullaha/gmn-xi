"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

// ── Types ─────────────────────────────────────────────────────
interface ComingSoonProps {
  title: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ title }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar pageTitle={title} />
      <main className="flex-grow flex items-center justify-center py-20">
        <div className="text-center px-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-8 flex justify-center"
          >
            <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gold animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-navy mb-4"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-500 max-w-lg mx-auto"
          >
            We are currently populating this section with rich ethical content. Please check back soon!
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-10"
          >
            <div className="h-1 w-20 bg-gold mx-auto rounded-full" />
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ComingSoon;
