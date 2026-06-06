import React from 'react';
import { Volume2, Loader2 } from 'lucide-react';
import { useAudio } from './useAudio';
import { useLanguage } from '../../accueil/LanguageContext';

export const AudioButton = ({ text, audioUrl, overrideLang, ttsText, className, style, badge = false }) => {
  const textToPlay = ttsText || text;
  const { isPlaying, play } = useAudio(textToPlay, audioUrl, overrideLang);
  const { lang } = useLanguage();

  const ariaLabel = lang === 'FR' ? "Écouter la prononciation" : 
                    lang === 'AR' ? "استمع إلى النطق" : 
                    "Listen to pronunciation";

  const handleClick = (e) => {
    e.stopPropagation();
    try {
      play();
    } catch (err) {
      console.warn("AudioButton play failed:", err);
    }
  };

  const btnClass = badge
    ? `audio-badge ${isPlaying ? 'audio-badge-playing' : ''} ${className || ''}`
    : `vocab-audio-btn ${className || ''}`;

  return (
    <button 
      className={btnClass}
      style={style}
      onClick={handleClick}
      aria-label={ariaLabel}
      aria-pressed={isPlaying}
      title={ariaLabel}
      type="button"
    >
      {isPlaying ? (
        <Loader2 size={badge ? 22 : 20} className="audio-spin" />
      ) : (
        <Volume2 size={badge ? 22 : 20} />
      )}
    </button>
  );
};
