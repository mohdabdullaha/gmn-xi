"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center text-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg"
      >
        <div className="text-8xl font-black text-gold mb-4">404</div>
        <h1 className="text-3xl font-bold mb-4 tracking-wide">Page Not Found</h1>
        <p className="text-white/60 mb-8 text-lg">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-gold text-navy font-bold px-8 py-3 rounded-full hover:bg-gold/90 transition-all"
        >
          Return Home
        </Link>
      </motion.div>
    </div>
  );
}
