// Cinematic Unlock Celebration Modal
// Designed for the AMUDUX Immersive Learning Platform

import React, { useEffect } from 'react';
import { Sparkles, Heart, Timer, Volume2, Award, Mic, MessageCircle, MapPin, Coffee, LockOpen } from 'lucide-react';

const UnlockCelebrationModal = ({ feature, onClose }) => {
  useEffect(() => {
    // Triumphant AudioContext Chord
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      
      const playOsc = (freq, type, startTime, duration) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, startTime);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.3, startTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
        
        osc.start(startTime);
        osc.stop(startTime + duration);
      };

      const now = audioCtx.currentTime;
      // Play a major chord (C E G C)
      playOsc(261.63, 'sine', now, 2); // C4
      playOsc(329.63, 'sine', now, 2); // E4
      playOsc(392.00, 'sine', now + 0.1, 2); // G4
      playOsc(523.25, 'sine', now + 0.2, 3); // C5
    } catch (e) {
      console.log('AudioContext blocked');
    }
  }, []);

  const getIcon = (iconName) => {
    const props = { size: 100, color: 'var(--amazigh-amber)' };
    switch (iconName) {
      case 'Heart': return <Heart {...props} />;
      case 'Timer': return <Timer {...props} />;
      case 'Volume2': return <Volume2 {...props} />;
      case 'Award': return <Award {...props} />;
      case 'Mic': return <Mic {...props} />;
      case 'MessageCircle': return <MessageCircle {...props} />;
      case 'MapPin': return <MapPin {...props} />;
      case 'Coffee': return <Coffee {...props} />;
      default: return <LockOpen {...props} />;
    }
  };

  return (
    <div className="celebration-overlay">
      <div className="celebration-modal">
        <div className="celebration-glow"></div>
        <div className="celebration-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{ 
              '--angle': `${Math.random() * 360}deg`,
              '--distance': `${Math.random() * 150 + 100}px`,
              '--delay': `${Math.random() * 0.5}s`
            }}>
              <Sparkles size={Math.random() * 15 + 10} color="var(--amazigh-amber)" />
            </div>
          ))}
        </div>
        
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <div className="celebration-icon-wrapper">
            {getIcon(feature.icon)}
          </div>
          
          <h2 style={{ fontSize: '2rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '10px' }}>
            Nouveau Palier Atteint
          </h2>
          <h1 style={{ fontSize: '3.5rem', color: '#FFF', marginBottom: '20px', textShadow: '0 0 20px rgba(255, 122, 0, 0.42)' }}>
            {feature.title}
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '40px' }}>
            Cette fonctionnalité est maintenant disponible dans votre parcours.
          </p>
          
          <button className="btn-primary" onClick={onClose} style={{ fontSize: '1.2rem', padding: '15px 40px' }}>
            Continuer l'Aventure
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnlockCelebrationModal;
