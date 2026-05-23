// Gamification Dashboard & Progress Tracker
// Designed for the AMUDUX Immersive Learning Platform

import React from "react";
import { Award, Target, Lock, Calendar } from "lucide-react";
import { ACHIEVEMENTS, MASTERY_RANKS } from "./data/gamificationEngine";
import { useLanguage } from "../accueil/LanguageContext";

const GamificationDashboard = ({ stats, currentRank, nextRank, progressPercentage, unlockedAchievements }) => {
  const { t } = useLanguage();
  
  return (
    <div className="gamification-dashboard">
      
      {/* Top Banner Stats */}
      <div className="learn-glass-panel" style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
        
        <div style={{ flex: '1', minWidth: '250px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: '600', color: currentRank.color }}>{currentRank.level}</span>
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', color: '#FFF', marginBottom: '3px', fontWeight: '400' }}>{t(currentRank.titleKey) || currentRank.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>{t("learnLevelRequired")} {currentRank.level}</p>
            </div>
          </div>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <span>{stats.xp} XP</span>
              <span>{nextRank ? `${nextRank.minXp} XP` : 'MAX'}</span>
            </div>
            <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ 
                height: '100%', 
                width: `${progressPercentage}%`, 
                background: currentRank.color,
                borderRadius: '2px',
                boxShadow: `0 0 18px ${currentRank.color}33`,
                transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}></div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '16px', textAlign: 'center', minWidth: '120px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <Calendar size={20} color="var(--text-muted)" style={{ margin: '0 auto 10px' }} />
            <h4 style={{ fontSize: '1.8rem', margin: '0', fontWeight: '300' }}>{stats.streak}</h4>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase' }}>{t("learnDays")}</span>
          </div>
          
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '16px', textAlign: 'center', minWidth: '120px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <Award size={20} color="var(--text-muted)" style={{ margin: '0 auto 10px' }} />
            <h4 style={{ fontSize: '1.8rem', margin: '0', fontWeight: '300' }}>{unlockedAchievements.length}</h4>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase' }}>{t("learnAcquired")}</span>
          </div>
        </div>
      </div>

      {/* Journey Map */}
      <div className="learn-glass-panel" style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '25px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '400' }}>
          {t("learnJourney")}
        </h3>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px' }}>
          {MASTERY_RANKS.map((rank, i) => {
            const isUnlocked = stats.xp >= rank.minXp;
            const isCurrent = currentRank.level === rank.level;
            
            return (
              <div key={i} style={{ 
                minWidth: '110px', 
                background: isCurrent ? 'rgba(255,255,255,0.05)' : 'transparent',
                border: `1px solid ${isCurrent ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.03)'}`,
                padding: '15px 12px',
                borderRadius: '12px',
                textAlign: 'center',
                opacity: isUnlocked ? 1 : 0.3,
                transition: 'all 0.3s'
              }}>
                <div style={{ fontSize: '1.2rem', fontWeight: '300', marginBottom: '8px', color: isUnlocked ? '#FFF' : 'var(--text-muted)' }}>{rank.level}</div>
                <div style={{ fontSize: '0.7rem', color: isUnlocked ? 'var(--text-muted)' : 'rgba(255,255,255,0.3)', lineHeight: '1.4' }}>{t(rank.titleKey) || rank.title}</div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.2)', marginTop: '8px' }}>{rank.minXp} XP</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div className="learn-glass-panel">
        <h3 style={{ fontSize: '1.1rem', marginBottom: '25px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '400' }}>
          {t("learnAchievements")}
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px' }}>
          {ACHIEVEMENTS.map(ach => {
            const isUnlocked = unlockedAchievements.includes(ach.id);
            
            return (
              <div key={ach.id} style={{ 
                background: isUnlocked ? 'rgba(255,255,255,0.03)' : 'transparent',
                border: `1px solid ${isUnlocked ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)'}`,
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                gap: '15px',
                alignItems: 'center',
                opacity: isUnlocked ? 1 : 0.4,
                transition: 'all 0.3s'
              }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {isUnlocked ? <Target size={18} color={ach.color} /> : <Lock size={16} color="rgba(255,255,255,0.2)" />}
                </div>
                
                <div style={{ minWidth: 0 }}>
                  <h4 style={{ margin: '0 0 3px', fontSize: '1rem', color: isUnlocked ? '#FFF' : 'var(--text-muted)', fontWeight: '500' }}>{t(ach.titleKey) || ach.title}</h4>
                  <p style={{ margin: '0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t(ach.descriptionKey) || ach.description}</p>
                  <div style={{ marginTop: '6px', fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    +{ach.xpReward} XP
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default GamificationDashboard;
