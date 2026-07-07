"use client";
import React from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center text-white px-6">
      <div className="text-center max-w-lg">
        <div className="text-6xl mb-6">⚠️</div>
        <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
        <p className="text-white/60 mb-8">{error.message || 'An unexpected error occurred.'}</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-gold text-navy font-bold px-6 py-3 rounded-full hover:bg-gold/90 transition-all"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="border border-white/30 text-white font-bold px-6 py-3 rounded-full hover:bg-white/10 transition-all"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
