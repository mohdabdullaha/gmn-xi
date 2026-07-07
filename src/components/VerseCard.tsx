import React from 'react';
import AudioPlayer from './AudioPlayer';

// ── Types ─────────────────────────────────────────────────────
export interface Verse {
  surah: string;
  arabic: string;
  urdu?: string;
  translation: string;
  reflection: string;
  audio?: string;
  englishAudio?: string;
}

interface VerseCardProps {
  verse: Verse;
}

const VerseCard: React.FC<VerseCardProps> = ({ verse }) => {
  return (
    <div className="bg-ice border border-ice-border rounded-2xl p-8 shadow-sm hover:shadow-md transition-all mb-8 max-w-4xl mx-auto">
      <div className="text-right mb-6">
        <h4 className="text-navy font-bold text-xl mb-4 text-left">{verse.surah}</h4>
        <p
          className="text-3xl md:text-4xl text-green leading-loose font-arabic pb-4 border-b border-green/20"
          dir="rtl"
        >
          {verse.arabic}
        </p>
      </div>

      <div className="text-left space-y-4">
        {verse.urdu && (
          <p className="text-2xl text-gray-700 text-right font-arabic" dir="rtl">
            {verse.urdu}
          </p>
        )}
        <p className="text-2xl italic text-gray-700">"{verse.translation}"</p>
        <p className="text-sm text-navy/70 uppercase font-bold tracking-wider">Reflection:</p>
        <p className="text-gray-600 text-xl border-l-4 border-gold pl-4">{verse.reflection}</p>

        <div className="mt-8 space-y-2 pt-6 border-t border-ice-border -mx-8 -mb-8">
          {verse.audio && (
            <AudioPlayer englishSrc={verse.audio} variant="minimal" title="RECITATION" />
          )}
          {verse.englishAudio && (
            <AudioPlayer englishSrc={verse.englishAudio} variant="minimal" title="TRANSLATION" />
          )}
        </div>
      </div>
    </div>
  );
};

export default VerseCard;
