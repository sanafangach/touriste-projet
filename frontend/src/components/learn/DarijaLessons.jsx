// Darija Vocabulary & Street Slang Lessons
// Designed for the AMUDUX Immersive Learning Platform

import React, { useState } from "react";
import { Volume2, CheckCircle, Search, AlertCircle } from "lucide-react";
import { darijaVocab } from "./data/darijaData";
import { getWordMastery, recordWordAttempt } from "./data/gamificationEngine";
import { useLanguage } from "../accueil/LanguageContext";

const DarijaLessons = ({ onXpEarned, learnedWords = [], onMarkLearned, selectedDestination }) => {
  const { t, lang } = useLanguage();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [masteryData, setMasteryData] = useState(getWordMastery());

  const categories = ['All', 'Recommandés', 'À Réviser', ...new Set(darijaVocab.map(v => v.categoryKey))];

  const filteredVocab = darijaVocab.filter(v => {
    if (filter === 'À Réviser') {
      const stats = masteryData[v.id];
      return stats && (stats.attempts > 0 && (stats.correct / stats.attempts) < 0.5);
    }
    if (filter === 'Recommandés' && selectedDestination) {
      return v.destinationRelevance && (v.destinationRelevance.includes('all') || v.destinationRelevance.includes(selectedDestination));
    } else if (filter === 'Recommandés') {
      return v.tags && v.tags.includes('essential');
    }
    const matchesCategory = filter === 'All' || v.categoryKey === filter;
    const wordTranslation = lang === 'FR' ? v.french : lang === 'EN' ? v.english : v.french; // fallback to french for arabic or other
    const matchesSearch = v.darija.toLowerCase().includes(search.toLowerCase()) || 
                          wordTranslation.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleRevision = (id, isCorrect, e) => {
    e.stopPropagation();
    recordWordAttempt(id, isCorrect);
    setMasteryData(getWordMastery());
    if (isCorrect) onXpEarned(5);
  };

  const speakAudio = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ar-MA"; // Best fallback for Darija pronunciation if available
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleLearn = (id, e) => {
    e.stopPropagation();
    if (!learnedWords.includes(id)) {
      onMarkLearned(id);
      onXpEarned(10);
    }
  };

  return (
    <div className="darija-lessons">
      <div className="learn-glass-panel" style={{ marginBottom: '30px', display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>{t("learnDarijaLessonsTitle")}</h2>
          <p style={{ color: 'var(--text-muted)' }}>{t("learnDarijaLessonsDesc")}</p>
        </div>
        
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          {selectedDestination && (
            <button 
              className={`pill-btn ${filter === 'Recommandés' ? 'active' : ''}`}
              onClick={() => setFilter('Recommandés')}
              style={{
                background: filter === 'Recommandés' ? 'rgba(255, 122, 0, 0.1)' : 'rgba(255,255,255,0.03)',
                color: filter === 'Recommandés' ? '#FFF' : 'var(--text-muted)',
                border: `1px solid ${filter === 'Recommandés' ? 'var(--amazigh-amber)' : 'rgba(255,255,255,0.1)'}`,
                padding: '10px 20px', borderRadius: '30px', cursor: 'pointer', transition: 'all 0.3s'
              }}
            >
              {t("learnRecommended")}
            </button>
          )}
          <div style={{ position: 'relative' }}>
            <Search size={20} color="var(--text-muted)" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              placeholder={t("learnSearchPlaceholder")} 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', padding: '12px 15px 12px 45px', borderRadius: '30px', color: '#FFF', outline: 'none' }}
            />
          </div>
          
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', padding: '12px 20px', borderRadius: '30px', color: '#FFF', outline: 'none', appearance: 'none', cursor: 'pointer' }}
          >
            {categories.map(c => {
              let label = c;
              if (c === 'All') label = t("learnAll");
              else if (c === 'Recommandés') label = t("learnRecommended");
              else if (c === 'À Réviser') label = t("learnToReview");
              else label = t(c);
              return <option key={c} value={c} style={{ background: '#121b27' }}>{label}</option>
            })}
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
        {filteredVocab.map((vocab) => {
          const isLearned = learnedWords.includes(vocab.id);
          const stats = masteryData[vocab.id];
          const isWeak = stats && stats.attempts > 0 && (stats.correct / stats.attempts) < 0.5;
          const wordTranslation = lang === 'FR' ? vocab.french : lang === 'EN' ? vocab.english : vocab.french; // fallback
          
          return (
            <div key={vocab.id} className="myth-card" style={{ height: '220px' }}>
              <div className="myth-card-inner">
                {/* Front of Card: Darija */}
                <div className={`myth-front ${isWeak ? 'heat-level-high' : ''}`} style={{ border: isLearned && !isWeak ? '1px solid rgba(255, 122, 0, 0.35)' : isWeak ? '1px solid var(--amazigh-crimson)' : '1px solid var(--glass-border)', background: isLearned ? 'linear-gradient(135deg, rgba(255, 122, 0, 0.12), rgba(0,0,0,0.5))' : 'rgba(0,0,0,0.5)' }}>
                  <div className="zellige-pattern"></div>
                  <div style={{ position: 'absolute', top: '15px', right: '15px', display: 'flex', gap: '10px', zIndex: 2 }}>
                    {isLearned && !isWeak && <CheckCircle size={20} color="var(--amazigh-amber)" />}
                    {isWeak && <AlertCircle size={20} color="var(--amazigh-crimson)" />}
                    <button onClick={(e) => { e.stopPropagation(); speakAudio(vocab.darija); }} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', opacity: 0.8, transition: 'opacity 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = 1} onMouseLeave={(e) => e.currentTarget.style.opacity = 0.8}>
                      <Volume2 size={24} />
                    </button>
                  </div>
                  
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px', position: 'absolute', top: '15px', left: '15px' }}>
                    {t(vocab.categoryKey)}
                  </span>

                  <h3 style={{ fontSize: '2.5rem', margin: '0', color: '#FFF' }}>{vocab.darija}</h3>
                  
                  <p style={{ position: 'absolute', bottom: '15px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    {t("learnHoverTranslate")}
                  </p>
                </div>
                
                {/* Back of Card: Translation */}
                <div className="myth-back" style={{ borderColor: 'var(--amazigh-amber)' }}>
                  <h3 style={{ fontSize: '1.8rem', marginBottom: '15px', color: 'var(--amazigh-amber)' }}>{wordTranslation}</h3>
                  
                  <div style={{ marginBottom: '20px', fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '2px' }}>
                    {t("learnDifficulty")} : <span style={{ color: 'var(--text-primary)' }}>{vocab.difficulty === 1 ? 'I' : vocab.difficulty === 2 ? 'II' : 'III'} / III</span>
                  </div>

                  {!isLearned ? (
                    <button 
                      onClick={(e) => handleLearn(vocab.id, e)}
                      style={{ background: 'rgba(255, 122, 0, 0.08)', color: 'var(--amazigh-amber)', border: '1px solid rgba(255, 122, 0, 0.2)', padding: '8px 20px', borderRadius: '30px', cursor: 'pointer', fontSize: '0.9rem', transition: 'all 0.3s' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 122, 0, 0.15)'; e.currentTarget.style.borderColor = 'rgba(255, 122, 0, 0.4)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 122, 0, 0.08)'; e.currentTarget.style.borderColor = 'rgba(255, 122, 0, 0.2)'; e.currentTarget.style.transform = 'translateY(0)' }}
                    >
                      {t("learnMarkLearned")}
                    </button>
                  ) : (
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button 
                        onClick={(e) => handleRevision(vocab.id, false, e)}
                        style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', padding: '8px 15px', borderRadius: '30px', cursor: 'pointer', fontSize: '0.9rem', transition: 'all 0.3s' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)' }}
                      >
                        {t("learnToReview")}
                      </button>
                      <button 
                        onClick={(e) => handleRevision(vocab.id, true, e)}
                        style={{ background: 'rgba(255, 122, 0, 0.12)', border: '1px solid rgba(255, 122, 0, 0.24)', color: 'var(--amazigh-amber)', padding: '8px 15px', borderRadius: '30px', cursor: 'pointer', fontSize: '0.9rem' }}
                      >
                        {t("learnKnown")}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DarijaLessons;
