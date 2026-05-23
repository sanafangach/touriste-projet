// Darija Conversation Simulator
// Designed for the AMUDUX Immersive Learning Platform

import React, { useState } from "react";
import { MessageCircle, MapPin, Coffee, CheckCircle, XCircle, Lock, Store } from "lucide-react";
import { darijaConversations } from "./data/darijaData";
import { useLanguage } from "../accueil/LanguageContext";

const DarijaConversations = ({ onXpEarned, unlockedAchievements, onAchievementUnlock, currentLevel = 1, selectedDestination }) => {
  const { t } = useLanguage();
  const [activeScenario, setActiveScenario] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [shake, setShake] = useState(false);
  const [completed, setCompleted] = useState(false);

  const startScenario = (scenario) => {
    setActiveScenario(scenario);
    setStepIndex(0);
    setFeedback(null);
    setCompleted(false);
  };

  const handleChoice = (option) => {
    if (feedback) return; // Prevent double click

    setFeedback({ isCorrect: option.isCorrect, text: option.feedback, option: option });

    if (option.isCorrect) {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      osc.connect(audioCtx.destination);
      osc.frequency.setValueAtTime(600, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.1);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.1);

      setTimeout(() => {
        if (stepIndex + 1 < activeScenario.steps.length) {
          setStepIndex(prev => prev + 1);
          setFeedback(null);
        } else {
          setCompleted(true);
          onXpEarned(activeScenario.xpReward);
          
          if (!unlockedAchievements.includes('darija_speaker')) {
            onAchievementUnlock('darija_speaker');
          }
        }
      }, 2000);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 300);

      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      osc.type = 'sine';
      osc.connect(audioCtx.destination);
      osc.frequency.setValueAtTime(150, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.1);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.1);

      setTimeout(() => {
        setFeedback(null);
      }, 3000);
    }
  };

  if (!activeScenario) {
    return (
      <div className="darija-scenarios">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{t("learnLifeScenarios")}</h2>
          <p style={{ color: 'var(--text-muted)' }}>{t("learnPracticeDarija")}</p>
        </div>

        <div className="quiz-modes">
          {darijaConversations.map((scenario) => {
            const isLocked = scenario.id === "petit_taxi" && currentLevel < 2; // Level 2 required for advanced scenarios
            const isDestSpecific = selectedDestination && scenario.destinationRelevance && (scenario.destinationRelevance.includes('all') || scenario.destinationRelevance.includes(selectedDestination));

            return (
              <div key={scenario.id} className={`quiz-mode-card ${isLocked ? 'locked-feature-card' : ''}`} onClick={() => !isLocked && startScenario(scenario)} style={{ border: isDestSpecific ? '1px solid var(--amazigh-amber)' : '' }}>
                <div className="quiz-mode-icon">
                  {scenario.id.includes('cafe') ? <Coffee size={48} color="var(--amazigh-amber)" /> : <MapPin size={48} color="var(--amazigh-amber)" />}
                </div>
                {isDestSpecific && <div style={{ fontSize: '0.7rem', color: 'var(--amazigh-amber)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>{t("learnRecommended")}</div>}
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{scenario.title}</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '15px' }}>{scenario.description}</p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                  <span style={{ color: scenario.difficulty === 'Facile' ? 'var(--text-primary)' : 'var(--amazigh-amber)' }}>{scenario.difficulty}</span>
                  <span style={{ color: 'var(--amazigh-amber)', fontWeight: 'bold' }}>+{scenario.xpReward} XP</span>
                </div>

                {isLocked && (
                  <div className="padlock-overlay">
                    <Lock size={24} color="var(--amazigh-amber)" />
                    <span style={{ color: 'var(--amazigh-amber)', fontWeight: 'bold' }}>{t("learnLevelRequired")} {scenario.id === 'souk_marrakech' ? '5' : '2'} {t("learnRequired")}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="learn-glass-panel" style={{ textAlign: 'center', padding: '60px 20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-50%', left: '-50%', right: '-50%', bottom: '-50%', background: 'radial-gradient(circle at center, rgba(255, 122, 0, 0.15), transparent 60%)', zIndex: 0, animation: 'pulseHeat 4s infinite alternate' }}></div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <MessageCircle size={80} color="var(--amazigh-amber)" style={{ margin: '0 auto 30px', filter: 'drop-shadow(0 0 30px rgba(255, 122, 0, 0.32))' }} />
          <h2 style={{ fontSize: '2.5rem', marginBottom: '15px', fontWeight: '500', color: '#FFF' }}>{t("learnScenarioCompleted")}</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '30px' }}>{t("learnScenarioSuccess")}</p>
          <div style={{ fontSize: '2rem', color: 'var(--amazigh-amber)', fontWeight: '300', marginBottom: '40px', letterSpacing: '2px' }}>
            +{activeScenario.xpReward} XP
          </div>
          <button className="btn-primary" onClick={() => setActiveScenario(null)} style={{ maxWidth: '300px' }}>
            {t("learnBackToScenarios")}
          </button>
        </div>
      </div>
    );
  }

  const currentStep = activeScenario.steps[stepIndex];

  return (
    <div className={`learn-glass-panel ${shake ? 'arena-shake' : ''}`} style={{ maxWidth: '800px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '15px' }}>
        <h3 style={{ color: 'var(--amazigh-amber)', fontSize: '1.2rem' }}>{activeScenario.title}</h3>
        <span style={{ color: 'var(--text-muted)' }}>{t("learnStep")} {stepIndex + 1} / {activeScenario.steps.length}</span>
      </div>

      <div className={shake ? "haptic-shake" : ""} style={{ display: 'flex', gap: '20px', marginBottom: '40px', position: 'relative' }}>
        <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {activeScenario.id.includes('cafe') ? <Coffee size={24} color="var(--text-primary)" /> : activeScenario.id.includes('souk') ? <Store size={24} color="var(--text-primary)" /> : <MapPin size={24} color="var(--text-primary)" />}
        </div>
        <div className="cinematic-bubble" style={{ borderColor: shake ? 'rgba(139, 26, 26, 0.4)' : 'rgba(255, 122, 0, 0.15)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <p style={{ fontSize: '1.4rem', fontWeight: '400', marginBottom: '10px', color: '#FFF' }}>"{currentStep.npcText}"</p>
            {currentStep.mood && (
              <span style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)', border: '1px solid rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: '500', whiteSpace: 'nowrap', marginLeft: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {currentStep.mood}
              </span>
            )}
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>{currentStep.translation}</p>
        </div>
      </div>

      <h4 style={{ marginBottom: '20px', color: 'var(--text-muted)' }}>{t("learnWhatReply")}</h4>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {currentStep.options.map((opt, i) => {
          let btnStyle = {
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)',
            padding: '20px',
            borderRadius: '12px',
            textAlign: 'left',
            fontSize: '1.1rem',
            cursor: feedback ? 'default' : 'pointer',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            color: 'var(--text-primary)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          };

          if (feedback) {
            if (opt.isCorrect) {
              btnStyle.background = 'rgba(255,255,255,0.08)';
              btnStyle.borderColor = 'rgba(255,255,255,0.2)';
            } else if (!opt.isCorrect && feedback.text === opt.feedback) {
              btnStyle.background = 'transparent';
              btnStyle.borderColor = 'rgba(139, 26, 26, 0.2)';
              btnStyle.opacity = 0.5;
            } else {
              btnStyle.opacity = 0.3;
            }
          }

          return (
            <button 
              key={i} 
              style={btnStyle}
              onClick={() => handleChoice(opt)}
              disabled={feedback !== null}
              onMouseEnter={(e) => { if(!feedback) e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
              onMouseLeave={(e) => { if(!feedback) e.currentTarget.style.background = 'rgba(0,0,0,0.3)'; }}
            >
              {opt.text}
              {feedback && opt.isCorrect && <CheckCircle color="var(--amazigh-amber)" />}
              {feedback && !opt.isCorrect && feedback.text === opt.feedback && <XCircle color="var(--amazigh-crimson)" />}
            </button>
          );
        })}
      </div>

      {feedback && (
        <div style={{
          marginTop: '30px',
          padding: '15px 20px',
          borderRadius: '12px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.05)',
          animation: 'fadeIn 0.4s ease-out'
        }}>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            {feedback.isCorrect ? <CheckCircle size={18} color="var(--text-primary)" /> : <XCircle size={18} color="var(--amazigh-crimson)" />}
            {feedback.text}
          </p>
          {feedback.option.moodImpact && (
            <p style={{ marginTop: '5px', color: 'var(--text-primary)', fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
              {t("learnReaction")}: {feedback.option.moodImpact}
            </p>
          )}
        </div>
      )}

    </div>
  );
};

export default DarijaConversations;
