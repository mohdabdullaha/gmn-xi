"use client";
import React, { ReactNode } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';


// ── Types ─────────────────────────────────────────────────────
interface PageLayoutProps {
  children: ReactNode;
  title: string;
  backPath?: string;
  backLabel?: string;
  action?: ReactNode;
  fullWidth?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  backPath = '/admin/dashboard',
  backLabel = 'BACK TO DASHBOARD',
  action,
  fullWidth = false,
}) => {
  const navigate = useRouter();

  return (
    <div className="min-h-screen bg-ice flex flex-col">
      <Navbar pageTitle={title} />

      <main className={`flex-grow ${fullWidth ? 'w-full' : 'max-w-6xl'} mx-auto w-full px-6 py-12`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <button
            onClick={() => navigate.push(backPath)}
            className="flex items-center gap-2 text-navy/60 hover:text-navy font-bold transition-colors"
          >
            <ArrowLeft size={18} />
            {backLabel}
          </button>
          {action && <div>{action}</div>}
        </div>

        {children}
      </main>

      <Footer />
    </div>
  );
};

export default PageLayout;
