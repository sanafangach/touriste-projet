// Tifinagh Learning Hub Component
// Designed for the AMUDUX Immersive Learning Platform

import React, { useState, useEffect, useRef } from "react";
import { BookOpen, Sparkles, Globe, Mic, ArrowLeft } from "lucide-react";
import './LearnHub.css';

// Import sub-systems
import AlphabetSystem from "./AlphabetSystem";
import QuizArena from "./QuizArena";
import CulturalImmersion from "./CulturalImmersion";
import NameConverter from "./NameConverter";
import PronunciationLab from "./PronunciationLab";
import GamificationDashboard from "./GamificationDashboard";
import UnlockCelebrationModal from "./UnlockCelebrationModal";

// Import data & logic
import { loadProgress, addXp, markLetterLearned, unlockAchievement, getRankByXp } from "./data/gamificationEngine";
import { tifinaghAlphabet } from "./data/tifnaghData";
import { getDestinationContext } from "./data/destinationContext";
import { useLanguage } from "../accueil/LanguageContext";

const TifinaghHub = ({ onBack, selectedDestination, onXpEarned: externalOnXpEarned }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("alphabet");
  
  // Global State
  const [stats, setStats] = useState(null);
  const [learnedLetters, setLearnedLetters] = useState([]);
  const [unlockedCards, setUnlockedCards] = useState([]);
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [currentRank, setCurrentRank] = useState(null);
  const [nextRank, setNextRank] = useState(null);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [unlockQueue, setUnlockQueue] = useState([]);

  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Initialize state on load
  useEffect(() => {
    const progress = loadProgress();
    setStats(progress.stats);
    setLearnedLetters(progress.learnedLetters);
    setUnlockedCards(progress.unlockedCards);
    setUnlockedAchievements(progress.unlockedAchievements);
    setCurrentRank(progress.currentRank);
    setNextRank(progress.nextRank);
    setProgressPercentage(progress.progressPercentage);
    
    // Custom Canvas Particle Engine for background
    const initParticles = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      let width = window.innerWidth;
      let height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      const particles = [];
      const numParticles = 30; // Optimized for performance
      const chars = tifinaghAlphabet.map(t => t.char);

      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5 - 0.5,
          char: chars[Math.floor(Math.random() * chars.length)],
          size: Math.random() * 20 + 10,
          opacity: Math.random() * 0.3 + 0.05
        });
      }

      const render = () => {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          
          if (p.y < -50) p.y = height + 50;
          if (p.x < -50) p.x = width + 50;
          if (p.x > width + 50) p.x = -50;

          ctx.font = `${p.size}px Arial`;
          ctx.fillStyle = `rgba(255, 122, 0, ${p.opacity})`;
          ctx.fillText(p.char, p.x, p.y);
        });

        animationRef.current = requestAnimationFrame(render);
      };
      render();
    };

    initParticles();
    window.addEventListener('resize', () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    });

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const handleXpEarned = (amount) => {
    const result = addXp(amount);
    if (result) {
      setStats(result.stats);
      const ranks = getRankByXp(result.stats.xp);
      setCurrentRank(ranks.currentRank);
      setNextRank(ranks.nextRank);
      setProgressPercentage(ranks.progressPercentage);
      
      if (result.newUnlocks && result.newUnlocks.length > 0) {
        setUnlockQueue(prev => [...prev, ...result.newUnlocks.filter(u => u.hub === 'tifinagh')]);
      }
      
      // Play level up sound if applicable
      if (result.leveledUp) {
        try {
          const ctx = new (window.AudioContext || window.webkitAudioContext)();
          const osc = ctx.createOscillator();
          osc.connect(ctx.destination);
          osc.frequency.setValueAtTime(440, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 1);
          osc.start();
          osc.stop(ctx.currentTime + 1);
        } catch (e) {}
      }
    }
    if (externalOnXpEarned) {
      externalOnXpEarned(amount);
    }
  };

  const handleMarkLearned = (char) => {
    const isNew = markLetterLearned(char);
    if (isNew) {
      setLearnedLetters(prev => [...prev, char]);
      handleXpEarned(20);
      
      if (learnedLetters.length + 1 === 33) {
        handleAchievementUnlock('alphabet_master');
      }
    }
  };

  const handleAchievementUnlock = (id) => {
    const ach = unlockAchievement(id);
    if (ach) {
      setUnlockedAchievements(prev => [...prev, id]);
      if (ach.xpReward) {
        const result = getRankByXp(stats.xp + ach.xpReward); // Just updating local display state, actual save happened in engine
        setStats(prev => ({ ...prev, xp: prev.xp + ach.xpReward }));
        setCurrentRank(result.currentRank);
        setNextRank(result.nextRank);
        setProgressPercentage(result.progressPercentage);
      }
    }
  };

  if (!stats || !currentRank) return <div style={{ color: 'white', textAlign: 'center', padding: '100px' }}>Chargement de l'univers...</div>;

  return (
    <div className="learn-hub-container">
      {unlockQueue.length > 0 && (
        <UnlockCelebrationModal 
          feature={unlockQueue[0]} 
          onClose={() => setUnlockQueue(prev => prev.slice(1))} 
        />
      )}
      
      <canvas ref={canvasRef} className="tifinagh-particles"></canvas>
      
      <div className="learn-content-z">
        <div className="learn-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button onClick={onBack} style={{ padding: '10px', width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#FFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}>
              <ArrowLeft size={20} />
            </button>
            <h1 className="learn-title">
              {t("learnTifinaghHeritage")}
            </h1>
          </div>
          
          <div className="learn-stats-bar">
            <div className="stat-item" style={{ color: 'var(--amazigh-amber)' }} title={t("learnXpPoints")}>
              <Sparkles size={18} />
              <span>{stats.xp} XP</span>
            </div>
            <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)' }}></div>
            <div className="stat-item" style={{ color: 'var(--text-muted)' }}>
              <span>{stats.streak} Jours</span>
            </div>
            <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)' }}></div>
            <div className="stat-item" style={{ color: 'var(--text-muted)' }}>
              <span>{currentRank.title}</span>
            </div>
          </div>
        </div>

        {selectedDestination && (() => {
          const destContext = getDestinationContext(selectedDestination);
          if (!destContext) return null;
          return (
            <div className="destination-banner" style={{ background: destContext.accentColor, borderColor: destContext.accentColor, marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.5rem' }}>{destContext.emoji}</span>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#FFF' }}>
                  {t("learnTifinaghHeritageIn")} {t(destContext.nameKey)}
                </h3>
              </div>
            </div>
          );
        })()}

        <div className="learn-tabs">
          <button className={`learn-tab-btn ${activeTab === 'alphabet' ? 'active' : ''}`} onClick={() => setActiveTab('alphabet')}>
            <BookOpen size={16} /> {t("learnAlphabet")}
          </button>
          {selectedDestination && (
            <button className={`learn-tab-btn ${activeTab === 'city' ? 'active' : ''}`} onClick={() => setActiveTab('city')} style={{ color: activeTab === 'city' ? 'var(--amazigh-amber)' : '' }}>
              <Globe size={16} /> {t("learnInCity")}
            </button>
          )}
          <button className={`learn-tab-btn ${activeTab === 'quiz' ? 'active' : ''}`} onClick={() => setActiveTab('quiz')}>
            {t("learnQuizArena")}
          </button>
          <button className={`learn-tab-btn ${activeTab === 'culture' ? 'active' : ''}`} onClick={() => setActiveTab('culture')}>
            <Globe size={16} /> {t("learnImmersion")}
          </button>
          <button className={`learn-tab-btn ${activeTab === 'name' ? 'active' : ''}`} onClick={() => setActiveTab('name')}>
            {t("learnCalligraphy")}
          </button>
          <button className={`learn-tab-btn ${activeTab === 'audio' ? 'active' : ''}`} onClick={() => setActiveTab('audio')}>
            <Mic size={16} /> {t("learnAudioLab")}
          </button>
          <button className={`learn-tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            {t("learnProgress")}
          </button>
        </div>

        <div className="learn-active-view">
          {activeTab === 'alphabet' && (
            <div className="learn-glass-panel">
              <h2 style={{ fontSize: '1.8rem', marginBottom: '10px', fontWeight: '500' }}>{t("learnNeoTifinagh")}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{t("learnTifinaghDesc")}</p>
              <AlphabetSystem learnedLetters={learnedLetters} onMarkLearned={handleMarkLearned} />
            </div>
          )}

          {activeTab === 'city' && selectedDestination && (() => {
            const destContext = getDestinationContext(selectedDestination);
            if (!destContext || !destContext.tifinaghSpots) return null;
            return (
              <div className="learn-glass-panel">
                <h2 style={{ fontSize: '1.8rem', marginBottom: '10px', fontWeight: '500' }}>
                  Où voir le Tifinagh à {t(destContext.nameKey)} ?
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
                  {destContext.tifinaghSpots.map((spot, idx) => (
                    <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '20px' }}>
                      <h4 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#FFF' }}>{t(spot.titleKey)}</h4>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>{t(spot.descKey)}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
          
          {activeTab === 'quiz' && (
            <QuizArena 
              onXpEarned={handleXpEarned} 
              unlockedAchievements={unlockedAchievements} 
              onAchievementUnlock={handleAchievementUnlock} 
              currentLevel={currentRank.level}
            />
          )}
          
          {activeTab === 'culture' && (
            <CulturalImmersion 
              unlockedCards={unlockedCards} 
              userXp={stats.xp} 
            />
          )}
          
          {activeTab === 'name' && (
            <NameConverter 
              onAchievementUnlock={handleAchievementUnlock} 
              unlockedAchievements={unlockedAchievements} 
            />
          )}

          {activeTab === 'audio' && (
            <PronunciationLab />
          )}

          {activeTab === 'dashboard' && (
            <GamificationDashboard 
              stats={stats} 
              currentRank={currentRank} 
              nextRank={nextRank} 
              progressPercentage={progressPercentage}
              unlockedAchievements={unlockedAchievements}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TifinaghHub;
