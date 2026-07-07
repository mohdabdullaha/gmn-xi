"use client";
import React, { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { ArrowLeft } from 'lucide-react';

const PDFViewerContent: React.FC = () => {
  const searchParams = useSearchParams();
  const navigate = useRouter();
  const pdfUrl = searchParams.get('url');
  const pdfTitle = searchParams.get('title') ?? 'PDF Viewer';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!pdfUrl) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-navy p-6">
        <h1 className="text-3xl font-bold mb-4">Error</h1>
        <p className="text-xl mb-6 text-gray-500">No PDF URL was provided to the viewer.</p>
        <button
          onClick={() => navigate.back()}
          className="bg-navy text-white px-6 py-3 rounded-xl font-semibold hover:bg-navy-dark transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-navy overflow-hidden">
      {/* Branded Navigation Header */}
      <header className="bg-navy border-b border-navy-light text-white px-6 py-4 flex items-center justify-between shadow-md z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate.back()}
            className="p-2 hover:bg-white/10 rounded-xl transition-all flex items-center justify-center"
            title="Back to portal"
          >
            <ArrowLeft size={24} className="text-white" />
          </button>
          <div>
            <h1 className="text-xl font-bold tracking-tight">{pdfTitle}</h1>
            <p className="text-xs text-white/60">GIFT Moral Nexus Reader</p>
          </div>
        </div>
      </header>

      {/* Fullscreen iframe serving the PDF */}
      <div className="flex-grow bg-[#525659] relative">
        <iframe
          src={pdfUrl}
          title={pdfTitle}
          className="w-full h-full border-none absolute inset-0"
          allow="autoplay"
        />
      </div>
    </div>
  );
};

const PDFViewer: React.FC = () => (
  <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-navy"><div style={{ width: 40, height: 40, border: '4px solid rgba(255,255,255,0.2)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /></div>}>
    <PDFViewerContent />
  </Suspense>
);

export default PDFViewer;
