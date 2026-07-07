import React from 'react';

// ── Types ─────────────────────────────────────────────────────
interface AudioPlayerProps {
  urduSrc?: string;
  englishSrc?: string;
  title?: string;
  variant?: 'default' | 'minimal';
  dark?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  urduSrc,
  englishSrc,
  title,
  variant = 'default',
  dark = false,
}) => {
  const isMinimal = variant === 'minimal';

  const containerClasses = isMinimal
    ? 'w-full p-6'
    : `w-full max-w-2xl mx-auto my-12 p-8 ${
        dark ? 'bg-navy/50 border-white/10' : 'bg-ice/50 border-ice-border'
      } border rounded-3xl shadow-sm`;

  const labelClasses = isMinimal
    ? `text-xs font-black ${dark ? 'text-white/70' : 'text-navy'} uppercase tracking-[0.2em]`
    : `text-sm font-black ${dark ? 'text-white/70' : 'text-navy'} uppercase tracking-[0.2em] ml-2`;

  const spacingClasses = isMinimal ? 'space-y-6' : 'space-y-8';

  return (
    <div className={containerClasses}>
      {title && (
        <h3 className="font-bold text-navy text-sm md:text-base flex-grow tracking-wide truncate">
          {title}
        </h3>
      )}
      <div className={spacingClasses}>
        {urduSrc && (
          <div className="flex flex-col gap-3 items-start text-left">
            {!title && <label className={labelClasses}>Urdu</label>}
            <audio
              controls
              controlsList="nodownload"
              onContextMenu={(e) => e.preventDefault()}
              className={`w-full ${isMinimal ? 'max-w-md' : ''} h-10 custom-audio-player`}
              src={urduSrc}
            >
              Your browser does not support the audio element.
            </audio>
          </div>
        )}

        {englishSrc && (
          <div className="flex flex-col gap-3 items-start text-left">
            {!title && <label className={labelClasses}>ENGLISH AUDIO</label>}
            <audio
              controls
              controlsList="nodownload"
              onContextMenu={(e) => e.preventDefault()}
              className={`w-full ${isMinimal ? 'max-w-md' : ''} h-10 custom-audio-player`}
              src={englishSrc}
            >
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;
