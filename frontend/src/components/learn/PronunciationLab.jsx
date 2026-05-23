// Pronunciation and Audio Wave Lab
// Designed for the AMUDUX Immersive Learning Platform

import React, { useState, useEffect, useRef } from "react";
import { Play, Square, Settings, RefreshCcw } from "lucide-react";
import { tifinaghAlphabet } from "./data/tifnaghData";
import { useLanguage } from "../accueil/LanguageContext";

const PronunciationLab = () => {
  const { t } = useLanguage();
  const [word, setWord] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Draws a simulated audio waveform on the canvas
  const drawWaveform = (active = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    
    const time = Date.now() / 200;
    
    for (let i = 0; i < width; i++) {
      let amplitude = active ? (Math.random() * 40 + 10) : 2;
      
      // Smooth sine wave formula
      const y = height / 2 + Math.sin(i * 0.05 + time) * amplitude * Math.sin(time * 0.5);
      
      ctx.lineTo(i, y);
    }
    
    ctx.strokeStyle = active ? '#D4A843' : 'rgba(212, 168, 67, 0.2)';
    ctx.lineWidth = active ? 3 : 1;
    ctx.stroke();

    // Add glow
    if (active) {
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(212, 168, 67, 0.6)';
    } else {
      ctx.shadowBlur = 0;
    }

    if (active) {
      animationRef.current = requestAnimationFrame(() => drawWaveform(true));
    }
  };

  useEffect(() => {
    // Setup initial flat wave
    const canvas = canvasRef.current;
    if (canvas) {
      // Fix high-DPI blurriness
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      drawWaveform(false);
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlayAudio = () => {
    if (word.length === 0) return;
    
    setIsPlaying(true);
    drawWaveform(true);

    const fullTextToSpeak = word.map(w => w.name).join(" ");
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(fullTextToSpeak);
      utterance.lang = "fr-FR";
      utterance.rate = playbackSpeed;
      
      utterance.onend = () => {
        setIsPlaying(false);
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        drawWaveform(false);
      };
      
      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback
      setTimeout(() => {
        setIsPlaying(false);
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        drawWaveform(false);
      }, 2000);
    }
  };

  const addLetterToWord = (letter) => {
    if (word.length < 8) {
      setWord([...word, letter]);
    }
  };

  const clearWord = () => {
    setWord([]);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsPlaying(false);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    drawWaveform(false);
  };

  return (
    <div className="pronunciation-lab learn-glass-panel">
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '10px', fontWeight: '500', color: '#FFF' }}>{t("learnPhoneticLab")}</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{t("learnLabDesc")}</p>
      </div>

      <canvas ref={canvasRef} className="wave-canvas" style={{ width: '100%', height: '150px' }}></canvas>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '40px' }}>
        <button 
          className="btn-primary" 
          onClick={handlePlayAudio} 
          disabled={isPlaying || word.length === 0}
          style={{ width: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          {isPlaying ? <Square size={20} /> : <Play size={20} />}
          {isPlaying ? t("learnAnalysisInProgress") : t("learnListen")}
        </button>
        
        <button 
          className="btn-primary" 
          onClick={clearWord}
          style={{ width: 'auto', background: 'rgba(255,255,255,0.1)', color: '#FFF' }}
        >
          <RefreshCcw size={20} />
        </button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ background: 'rgba(255,255,255,0.02)', minHeight: '100px', border: '1px dashed rgba(212, 168, 67, 0.4)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', gap: '10px', boxShadow: 'inset 0 0 20px rgba(212, 168, 67, 0.05)' }}>
          {word.length === 0 ? (
            <span style={{ color: 'var(--text-muted)' }}>{t("learnClickToBuild")}</span>
          ) : (
            word.map((w, i) => (
              <span key={i} style={{ fontSize: '3.5rem', fontFamily: 'var(--font-tifinagh)', color: '#FFF' }}>
                {w.char}
              </span>
            ))
          )}
        </div>
        {word.length > 0 && (
          <div style={{ marginTop: '10px', color: 'var(--text-muted)', fontSize: '1.2rem', letterSpacing: '2px' }}>
            {word.map(w => w.transliteration).join('')}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.2rem' }}>{t("learnPhoneticKeyboard")}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Settings size={18} color="var(--text-muted)" />
          <span style={{ color: 'var(--text-muted)' }}>{t("learnSpeed")} </span>
          <select 
            value={playbackSpeed} 
            onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
            style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--amazigh-amber)', border: '1px solid rgba(255,255,255,0.1)', padding: '5px 10px', borderRadius: '8px', cursor: 'pointer' }}
          >
            <option value="0.5">{t("learnSpeedSlow")}</option>
            <option value="0.85">{t("learnSpeedNormal")}</option>
            <option value="1.5">{t("learnSpeedFast")}</option>
          </select>
        </div>
      </div>

      <div className="alphabet-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '10px' }}>
        {tifinaghAlphabet.map((item, index) => (
          <button 
            key={index}
            className="letter-card"
            style={{
              padding: '15px 5px',
              fontFamily: 'var(--font-tifinagh)',
              fontSize: '2rem',
              color: '#FFF',
              border: '1px solid rgba(255,255,255,0.05)'
            }}
            onClick={() => addLetterToWord(item)}
          >
            {item.char}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PronunciationLab;