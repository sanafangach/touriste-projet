// Cultural Immersion Component - Immersive Amazigh Universe
// Designed for the AMUDUX Immersive Learning Platform

import React, { useState } from "react";
import { Calendar, BookOpen, Share2 } from "lucide-react";
import { timelineEvents, mythologyCards, proverbs } from "./data/culturalData";
import { useLanguage } from "../accueil/LanguageContext";

const CulturalImmersion = ({ unlockedCards = ['anzar'], userXp = 0 }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("mythology");
  const [activeProverb, setActiveProverb] = useState(0);

  const nextProverb = () => {
    setActiveProverb((prev) => (prev + 1) % proverbs.length);
  };

  return (
    <div className="cultural-immersion">
      <div style={{ display: 'flex', gap: '8px', marginBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '15px' }}>
        <button 
          className="learn-tab-btn" 
          onClick={() => setActiveTab("mythology")} 
          style={{ background: activeTab === "mythology" ? "rgba(255,255,255,0.05)" : "transparent", color: activeTab === "mythology" ? "#FFF" : "var(--text-muted)", border: activeTab === "mythology" ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent' }}
        >
          {t("learnMythology")}
        </button>
        <button 
          className="learn-tab-btn" 
          onClick={() => setActiveTab("timeline")}
          style={{ background: activeTab === "timeline" ? "rgba(255,255,255,0.05)" : "transparent", color: activeTab === "timeline" ? "#FFF" : "var(--text-muted)", border: activeTab === "timeline" ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent' }}
        >
          <Calendar size={16} /> {t("learnTimeline")}
        </button>
        <button 
          className="learn-tab-btn" 
          onClick={() => setActiveTab("proverbs")}
          style={{ background: activeTab === "proverbs" ? "rgba(255,255,255,0.05)" : "transparent", color: activeTab === "proverbs" ? "#FFF" : "var(--text-muted)", border: activeTab === "proverbs" ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent' }}
        >
          <BookOpen size={16} /> {t("learnProverbs")}
        </button>
      </div>

      {activeTab === "mythology" && (
        <div className="mythology-grid">
          {mythologyCards.map((card) => {
            const isUnlocked = unlockedCards.includes(card.id) || userXp >= card.unlockXp;
            
            return (
              <div key={card.id} className="myth-card">
                <div className="myth-card-inner" style={{ transform: !isUnlocked ? 'none' : '' }}>
                  <div className="myth-front" style={{ background: isUnlocked ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.3)' }}>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', fontWeight: '400' }}>{card.title}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{card.subtitle}</p>
                    
                    {!isUnlocked && (
                      <div style={{ marginTop: '20px', fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                        {card.unlockXp} XP {t("learnRequired")}
                      </div>
                    )}
                    {isUnlocked && (
                      <div style={{ position: 'absolute', bottom: '20px', fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                        {t("learnHoverRead")}
                      </div>
                    )}
                  </div>
                  
                  {isUnlocked && (
                    <div className="myth-back">
                      <h4 style={{ color: 'var(--text-primary)', marginBottom: '15px', fontSize: '1rem', fontWeight: '500', letterSpacing: '2px', textTransform: 'uppercase' }}>{t("learnLegend")}</h4>
                      <p style={{ fontSize: '0.9rem', lineHeight: '1.7', color: 'var(--text-muted)', textAlign: 'justify' }}>
                        {card.story}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === "timeline" && (
        <div className="learn-glass-panel">
          <h2 style={{ fontSize: '1.5rem', marginBottom: '10px', fontWeight: '400' }}>{t("learnHistoryYears")}</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '30px', fontSize: '0.9rem' }}>{t("learnTimelineDesc")}</p>
          
          <div className="timeline-container">
            {timelineEvents.map((ev, index) => (
              <div key={index} className="timeline-node">
                <div className="timeline-year">{ev.year}</div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '10px', fontWeight: '500' }}>{ev.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>{ev.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "proverbs" && (
        <div className="learn-glass-panel" style={{ textAlign: 'center', padding: '60px 40px' }}>
          
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: 'var(--font-tifinagh)', fontSize: '3rem', marginBottom: '20px', color: '#FFF', fontWeight: '300' }}>
              {proverbs[activeProverb].tamazight}
            </h2>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '16px', display: 'inline-block', maxWidth: '600px', width: '100%', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ fontSize: '1.1rem', marginBottom: '10px', color: 'var(--text-primary)' }}>"{proverbs[activeProverb].french}"</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>"{proverbs[activeProverb].english}"</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
            <button className="btn-primary" style={{ maxWidth: '200px' }} onClick={nextProverb}>
              {t("learnNext")}
            </button>
            <button className="btn-primary" style={{ maxWidth: '200px' }}>
              <Share2 size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px' }} />
              {t("learnShare")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CulturalImmersion;