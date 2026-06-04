import React from 'react';
import { Volume2, Loader2 } from 'lucide-react';
import { useAudio } from './useAudio';
import { useLanguage } from '../../accueil/LanguageContext';

export const AudioButton = ({ text, audioUrl, overrideLang, ttsText, className, style }) => {
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
      // Graceful fallback: never crash the UI
      console.warn("AudioButton play failed:", err);
    }
  };

  return (
    <button 
      className={`vocab-audio-btn ${className || ''}`}
      style={style}
      onClick={handleClick}
      aria-label={ariaLabel}
      aria-pressed={isPlaying}
      title={ariaLabel}
      type="button"
    >
      {isPlaying ? (
        <Loader2 size={20} className="audio-spin" />
      ) : (
        <Volume2 size={20} />
      )}
    </button>
  );
};
