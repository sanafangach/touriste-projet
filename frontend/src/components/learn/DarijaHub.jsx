// Darija Learning Hub Component
// Designed for the AMUDUX Immersive Learning Platform

import React, { useState, useEffect, useRef } from "react";
import { BookOpen, Trophy, Sparkles, Award, Flame, Shield, ArrowLeft, MessageCircle } from "lucide-react";
import './LearnHub.css';

// Import sub-systems
import DarijaLessons from "./DarijaLessons";
import DarijaConversations from "./DarijaConversations";
import GamificationDashboard from "./GamificationDashboard";
import UnlockCelebrationModal from "./UnlockCelebrationModal";

// Import data & logic
import { loadProgress, addXp, unlockAchievement, getRankByXp } from "./data/gamificationEngine";

const DarijaHub = ({ onBack, theme = "dark" }) => {
  const [activeTab, setActiveTab] = useState("lessons");
  
  // Global State
  const [stats, setStats] = useState(null);
  const [learnedDarijaWords, setLearnedDarijaWords] = useState([]);
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [currentRank, setCurrentRank] = useState(null);
  const [nextRank, setNextRank] = useState(null);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [unlockQueue, setUnlockQueue] = useState([]);

  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const progress = loadProgress();
    setStats(progress.stats);
    setUnlockedAchievements(progress.unlockedAchievements);
    setCurrentRank(progress.currentRank);
    setNextRank(progress.nextRank);
    setProgressPercentage(progress.progressPercentage);
    
    // Load local Darija progress (we can store this in localStorage later, for now memory)
    const storedWords = JSON.parse(localStorage.getItem('amudux_darija_learned')) || [];
    setLearnedDarijaWords(storedWords);
    
    // Custom Background Engine - Subtle Moroccan Patterns
    const initBackground = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      let width = window.innerWidth;
      let height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      const stars = Array(20).fill().map(() => ({
        x: Math.random() * width, 
        y: Math.random() * height,
        radius: Math.random() * 30 + 15, 
        speed: Math.random() * 0.3 + 0.1,
        angle: Math.random() * Math.PI * 2
      }));

      const render = () => {
        ctx.clearRect(0, 0, width, height);
        
        stars.forEach(star => {
          star.y -= star.speed;
          star.angle += 0.002;
          if (star.y < -100) {
            star.y = height + 100;
            star.x = Math.random() * width;
          }
          
          ctx.save();
          ctx.translate(star.x, star.y);
          ctx.rotate(star.angle);
          ctx.beginPath();
          for(let i = 0; i < 8; i++) {
            ctx.rotate(Math.PI / 4);
            ctx.lineTo(0, star.radius);
            ctx.lineTo(star.radius * 0.3, star.radius * 0.3);
          }
          ctx.closePath();
          ctx.fillStyle = 'rgba(255, 122, 0, 0.05)';
          ctx.fill();
          ctx.restore();
        });
        
        animationRef.current = requestAnimationFrame(render);
      };
      render();
    };

    initBackground();
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
        setUnlockQueue(prev => [...prev, ...result.newUnlocks.filter(u => u.hub === 'darija')]);
      }
      
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
  };

  const handleMarkLearned = (id) => {
    if (!learnedDarijaWords.includes(id)) {
      const newLearned = [...learnedDarijaWords, id];
      setLearnedDarijaWords(newLearned);
      localStorage.setItem('amudux_darija_learned', JSON.stringify(newLearned));
    }
  };

  const handleAchievementUnlock = (id) => {
    const ach = unlockAchievement(id);
    if (ach) {
      setUnlockedAchievements(prev => [...prev, id]);
      if (ach.xpReward) {
        const result = getRankByXp(stats.xp + ach.xpReward);
        setStats(prev => ({ ...prev, xp: prev.xp + ach.xpReward }));
        setCurrentRank(result.currentRank);
        setNextRank(result.nextRank);
        setProgressPercentage(result.progressPercentage);
      }
    }
  };

  if (!stats || !currentRank) return <div style={{ color: 'white', textAlign: 'center', padding: '100px' }}>Chargement de l'univers...</div>;

  return (
    <div
      className={`learn-hub-container ${theme === "light" ? "learn-hub-container--light" : ""}`}
      style={{
        backgroundImage:
          theme === "light"
            ? "radial-gradient(circle at 50% 0%, rgba(255, 122, 0, 0.12) 0%, rgba(247, 240, 230, 1) 68%)"
            : "radial-gradient(circle at 50% 0%, rgba(255, 122, 0, 0.14) 0%, rgba(18, 27, 39, 1) 72%)",
      }}
    >
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
            <button onClick={onBack} className="btn-primary" style={{ padding: '10px', width: 'auto', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', color: '#FFF' }}>
              <ArrowLeft size={24} />
            </button>
            <h1 className="learn-title" style={{ background: 'linear-gradient(135deg, #FFF7EE, var(--amazigh-amber))', WebkitBackgroundClip: 'text' }}>
              <span style={{ fontSize: '3.5rem', filter: `drop-shadow(0 0 20px var(--amazigh-amber-glow))` }}>{currentRank.badge}</span>
              Immersion Darija
            </h1>
          </div>
          
          <div className="learn-stats-bar">
            <div className="stat-item xp" style={{ color: 'var(--amazigh-amber)' }}>
              <Sparkles size={20} />
              <span>{stats.xp} XP</span>
            </div>
            <div className="stat-item streak">
              <Flame size={20} />
              <span>{stats.streak} Jours</span>
            </div>
            {stats.streakFreezes > 0 && (
              <div className="stat-item" style={{ color: '#4A90E2' }}>
                <Shield size={20} />
                <span>{stats.streakFreezes}</span>
              </div>
            )}
            <div className="stat-item rank" style={{ color: 'var(--amazigh-amber)' }}>
              <Award size={20} />
              <span>{currentRank.title}</span>
            </div>
          </div>
        </div>

        <div className="learn-tabs">
          <button className={`learn-tab-btn ${activeTab === 'lessons' ? 'active' : ''}`} onClick={() => setActiveTab('lessons')} style={activeTab === 'lessons' ? { borderColor: 'rgba(255, 122, 0, 0.35)', color: 'var(--amazigh-amber)', boxShadow: '0 0 20px rgba(255, 122, 0, 0.18)', background: 'rgba(255, 122, 0, 0.12)' } : {}}>
            <BookOpen size={18} /> Vocabulaire
          </button>
          <button className={`learn-tab-btn ${activeTab === 'conversations' ? 'active' : ''}`} onClick={() => setActiveTab('conversations')} style={activeTab === 'conversations' ? { borderColor: 'rgba(255, 122, 0, 0.35)', color: 'var(--amazigh-amber)', boxShadow: '0 0 20px rgba(255, 122, 0, 0.18)', background: 'rgba(255, 122, 0, 0.12)' } : {}}>
            <MessageCircle size={18} /> Scénarios
          </button>
          {/* Quiz and Audio tabs can be enabled here using the same style logic */}
          <button className={`learn-tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')} style={activeTab === 'dashboard' ? { borderColor: 'rgba(255, 122, 0, 0.35)', color: 'var(--amazigh-amber)', boxShadow: '0 0 20px rgba(255, 122, 0, 0.18)', background: 'rgba(255, 122, 0, 0.12)' } : {}}>
            <Trophy size={18} /> Progression Globale
          </button>
        </div>

        <div className="learn-active-view">
          {activeTab === 'lessons' && (
            <DarijaLessons 
              onXpEarned={handleXpEarned} 
              learnedWords={learnedDarijaWords}
              onMarkLearned={handleMarkLearned}
            />
          )}
          
          {activeTab === 'conversations' && (
            <DarijaConversations 
              onXpEarned={handleXpEarned} 
              unlockedAchievements={unlockedAchievements} 
              onAchievementUnlock={handleAchievementUnlock} 
              currentLevel={currentRank.level}
            />
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

export default DarijaHub;
