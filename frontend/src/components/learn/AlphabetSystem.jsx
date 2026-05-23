// Tifinagh Interactive Alphabet Learning System Component
// Designed for the AMUDUX Immersive Learning Platform

import React, { useState, useEffect } from "react";
import { Volume2, X, CheckCircle } from "lucide-react";
import { tifinaghAlphabet } from "./data/tifnaghData";

const AlphabetSystem = ({ learnedLetters, onMarkLearned }) => {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [filter, setFilter] = useState("all");

  // Web Speech API wrapper for pronunciation
  const playAudio = (ipa, text, lang = "fr-FR") => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.85; // slightly slower for clarity
      utterance.pitch = 1;
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const categories = [
    { id: "all", label: "Toutes les lettres" },
    { id: "voyelles", label: "Voyelles" },
    { id: "consonnes", label: "Consonnes" },
    { id: "emphatiques", label: "Emphatiques" }
  ];

  const filteredAlphabet = filter === "all" 
    ? tifinaghAlphabet 
    : tifinaghAlphabet.filter(l => l.category === filter);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedLetter(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="alphabet-system">
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: `1px solid ${filter === cat.id ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)'}`,
              background: filter === cat.id ? 'rgba(255,255,255,0.05)' : 'transparent',
              color: filter === cat.id ? '#FFF' : 'var(--text-muted)',
              cursor: 'pointer',
              transition: 'all 0.3s',
              fontSize: '0.9rem',
              letterSpacing: '0.5px'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="alphabet-grid">
        {filteredAlphabet.map((item, index) => {
          const isLearned = learnedLetters.includes(item.char);
          return (
            <div 
              key={index} 
              className={`letter-card ${isLearned ? 'learned' : ''}`}
              onClick={() => setSelectedLetter(item)}
            >
              <span className="letter-glyph">{item.char}</span>
              <span className="letter-latin">{item.transliteration}</span>
              {isLearned && (
                <div style={{ position: 'absolute', top: '8px', right: '8px', color: 'var(--text-primary)', opacity: 0.6 }}>
                  <CheckCircle size={14} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Letter Detail Modal */}
      {selectedLetter && (
        <div className="learn-modal-overlay" onClick={() => setSelectedLetter(null)}>
          <div className="learn-modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedLetter(null)}>
              <X size={24} />
            </button>
            
            <div className="modal-glyph">{selectedLetter.char}</div>
            
            <button 
              className="modal-audio-btn"
              onClick={() => playAudio(selectedLetter.ipa, selectedLetter.name, "ar-SA")}
              title="Écouter la prononciation"
            >
              <Volume2 size={28} />
            </button>

            <div className="modal-details">
              <div>
                <span>Latin</span>
                <strong>{selectedLetter.transliteration.toUpperCase()}</strong>
              </div>
              <div>
                <span>Nom</span>
                <strong>{selectedLetter.name}</strong>
              </div>
              <div>
                <span>IPA (Phonétique)</span>
                <strong>/{selectedLetter.ipa}/</strong>
              </div>
              <div>
                <span>Darija équivalent</span>
                <strong>{selectedLetter.da}</strong>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', marginBottom: '30px' }}>
              <span style={{ fontSize: '0.85rem', color: '#ADB5BD', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>Exemple</span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
                <span style={{ fontSize: '2.5rem', fontFamily: 'Arial, sans-serif' }}>{selectedLetter.example}</span>
                <button 
                  onClick={() => playAudio('', selectedLetter.wordMeaning, "fr-FR")}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', transition: 'opacity 0.3s', opacity: 0.7 }}
                >
                  <Volume2 size={20} />
                </button>
              </div>
              <p style={{ margin: '10px 0 0', fontSize: '1.1rem' }}>{selectedLetter.wordMeaning}</p>
            </div>

            {!learnedLetters.includes(selectedLetter.char) ? (
              <button 
                className="btn-primary"
                onClick={() => {
                  onMarkLearned(selectedLetter.char);
                  setSelectedLetter(null);
                }}
              >
                Marquer comme acquis
              </button>
            ) : (
              <button 
                className="btn-primary"
                style={{ background: 'rgba(255, 122, 0, 0.16)', color: 'var(--amazigh-amber)', border: '1px solid rgba(255, 122, 0, 0.22)' }}
                onClick={() => setSelectedLetter(null)}
              >
                <CheckCircle size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px' }} />
                Lettre acquise
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AlphabetSystem;
