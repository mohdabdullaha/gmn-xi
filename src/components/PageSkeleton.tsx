import React, { CSSProperties } from 'react';

// ── Types ─────────────────────────────────────────────────────
interface SkeletonBlockProps {
  width?: string | number;
  height?: number;
  style?: CSSProperties;
  className?: string;
}

/* ─────────────────────────────────────────────
   Shimmer skeleton building blocks
───────────────────────────────────────────── */
const shimmerBase: CSSProperties = {
  background: 'linear-gradient(90deg, #e8edf2 25%, #d0d9e3 50%, #e8edf2 75%)',
  backgroundSize: '200% 100%',
  animation: 'shimmer 1.5s infinite',
  borderRadius: '10px',
};

const SkeletonBlock: React.FC<SkeletonBlockProps> = ({
  width = '100%',
  height = 20,
  style = {},
  className = '',
}) => (
  <div className={className} style={{ ...shimmerBase, width, height, ...style }} />
);

/* ─────────────────────────────────────────────
   Page-level skeleton — matches the site layout
   (Navbar placeholder + Hero + Content blocks)
───────────────────────────────────────────── */
const PageSkeleton: React.FC = () => (
  <>
    {/* Inject keyframe once */}
    <style>{`
      @keyframes shimmer {
        0%   { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `}</style>

    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafb' }}>

      {/* ── Navbar placeholder ── */}
      <div style={{ background: '#0b2b50', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <SkeletonBlock width={80} height={44} style={{ background: '#1a3d6e', borderRadius: 8 }} />
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 8 }}>
          {[120, 140, 100, 130, 110].map((w: any, i: number) => (
            <SkeletonBlock key={w?.id || w?.title || i} width={w} height={14} style={{ background: '#1a3d6e' }} />
          ))}
        </div>
        <SkeletonBlock width={120} height={20} style={{ background: '#1a3d6e' }} />
      </div>

      {/* ── Hero skeleton ── */}
      <SkeletonBlock height={380} style={{ borderRadius: 0 }} />

      {/* ── Content area ── */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px', width: '100%' }}>
        <SkeletonBlock width="55%" height={36} style={{ margin: '0 auto 16px' }} />
        <SkeletonBlock width="35%" height={4} style={{ margin: '0 auto 40px', borderRadius: 99 }} />

        {[100, 95, 88, 70].map((pct: any, i: number) => (
          <SkeletonBlock key={pct?.id || pct?.title || i} width={`${pct}%`} height={18} style={{ marginBottom: 12 }} />
        ))}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 40 }}>
          {[0, 1].map(i => (
            <div key={i} style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <SkeletonBlock width="60%" height={22} style={{ marginBottom: 16 }} />
              <SkeletonBlock width="100%" height={14} style={{ marginBottom: 10 }} />
              <SkeletonBlock width="85%" height={14} style={{ marginBottom: 10 }} />
              <SkeletonBlock width="90%" height={14} />
            </div>
          ))}
        </div>
      </div>

      {/* ── NavGrid skeleton ── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 48px', width: '100%' }}>
        <SkeletonBlock width={180} height={28} style={{ margin: '0 auto 32px', borderRadius: 99 }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
          {[0, 1, 2, 3].map(i => (
            <div key={i} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
              <SkeletonBlock width="100%" height={140} style={{ borderRadius: 0 }} />
              <div style={{ padding: '14px 16px' }}>
                <SkeletonBlock width="70%" height={16} style={{ marginBottom: 10 }} />
                <SkeletonBlock width="90%" height={12} style={{ marginBottom: 6 }} />
                <SkeletonBlock width="75%" height={12} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
);

export default PageSkeleton;
