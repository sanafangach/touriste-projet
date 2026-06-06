import { useState, useEffect, useCallback } from 'react';
import { globalAudioManager } from './audioManager';
import { useLanguage } from '../../accueil/LanguageContext';

export const useAudio = (text, audioUrl = null, overrideLang = null) => {
  const { lang } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleStateChange = ({ playingUrl, playingText }) => {
      // Check if this specific audio is currently playing
      const isThisPlaying = (audioUrl && playingUrl === audioUrl) || 
                            (!audioUrl && text && playingText === text);
      setIsPlaying(!!isThisPlaying);
    };

    const unsubscribe = globalAudioManager.subscribe(handleStateChange);
    return unsubscribe;
  }, [text, audioUrl]);

  const play = useCallback(() => {
    if (isPlaying) {
      globalAudioManager.stop();
    } else {
      // CRITICAL: .catch() prevents unhandled promise rejections
      globalAudioManager
        .play({ text, audioUrl, overrideLang, uiLang: lang })
        .catch(() => {
          // Silently handle — the manager already cleaned up state
        });
    }
  }, [isPlaying, text, audioUrl, overrideLang, lang]);

  return { isPlaying, play };
};
