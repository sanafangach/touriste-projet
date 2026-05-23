// Quiz Arena Immersive Gamified Quiz Component
// Designed for the AMUDUX Immersive Learning Platform

import React, { useState, useEffect, useRef } from "react";
import { Heart, Timer, Volume2, BookOpen } from "lucide-react";
import { generateQuestion, calculateXpReward, QUESTION_TYPES } from "./data/quizEngine";
import { tifinaghAlphabet } from "./data/tifnaghData";

const QuizArena = ({ onXpEarned, unlockedAchievements, onAchievementUnlock, currentLevel = 1 }) => {
  const [activeMode, setActiveMode] = useState(null);
  const [question, setQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isGameOver, setIsGameOver] = useState(false);
  
  // Phase management: 'idle' -> 'answering' -> 'transitioning'
  const [phase, setPhase] = useState('idle');
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  
  // Visual effects state removed for minimalist aesthetic
  const [shakeContainer, setShakeContainer] = useState(false);
  const [floatingXp, setFloatingXp] = useState(null);
  const [dynamicPraise, setDynamicPraise] = useState("");
  
  const questionStartTime = useRef(Date.now());
  const timerRef = useRef(null);
  const praiseTimerRef = useRef(null);
  const floatingXpTimerRef = useRef(null);

  // Web Audio Context for synthesized chimes
  const playSound = (type) => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      if (type === 'correct') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.1); // C6
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      } else if (type === 'wrong') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch (e) {
      console.log("AudioContext not supported or blocked");
    }
  };

  const speakAudio = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "fr-FR";
      window.speechSynthesis.speak(utterance);
    }
  };

  const checkDynamicPraise = (newCombo) => {
    if (newCombo < 3) return;

    let praise = "Excellent";
    if (newCombo >= 10) {
      praise = "Legendaire";
    } else if (newCombo >= 7) {
      praise = "Incroyable";
    } else if (newCombo >= 5) {
      praise = "Magistral";
    }

    setDynamicPraise(praise);

    if (praiseTimerRef.current) clearTimeout(praiseTimerRef.current);
    praiseTimerRef.current = setTimeout(() => setDynamicPraise(""), 1800);
  };

  const showFloatingXp = (xp) => {
    setFloatingXp(`+${xp} XP`);

    if (floatingXpTimerRef.current) clearTimeout(floatingXpTimerRef.current);
    floatingXpTimerRef.current = setTimeout(() => setFloatingXp(null), 1400);
  };

  const startQuiz = (mode) => {
    setActiveMode(mode);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setTotalQuestions(0);
    setCorrectAnswers(0);
    setLives(mode === 'survival' ? 3 : null);
    setTimeLeft(mode === 'timed' ? 60 : null);
    setIsGameOver(false);
    nextQuestion(mode);

    if (mode === 'timed') {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const nextQuestion = (mode = activeMode) => {
    setPhase('transitioning');
    
    setTimeout(() => {
      let qType = QUESTION_TYPES.CHAR_TO_LATIN;
      const rand = Math.random();
      
      if (mode === 'audio') {
        qType = QUESTION_TYPES.AUDIO_TO_CHAR;
      } else {
        if (rand > 0.5) qType = QUESTION_TYPES.LATIN_TO_CHAR;
      }

      const newQ = generateQuestion(tifinaghAlphabet, qType);
      setQuestion(newQ);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setPhase('idle');
      questionStartTime.current = Date.now();

      if (qType === QUESTION_TYPES.AUDIO_TO_CHAR) {
        speakAudio(newQ.correctItem.name);
      }
    }, 300); // Wait for slide out animation
  };

  const handleAnswer = (option) => {
    if (phase !== 'idle' || selectedAnswer) return;
    
    setPhase('answering');
    const timeTaken = Date.now() - questionStartTime.current;
    const correct = option.isCorrect;
    
    setSelectedAnswer(option.id);
    setIsCorrect(correct);
    
    setTotalQuestions(prev => prev + 1);

    if (correct) {
      playSound('correct');
      const newCombo = combo + 1;
      setCombo(newCombo);
      setMaxCombo(prev => Math.max(prev, newCombo));
      setCorrectAnswers(prev => prev + 1);
      checkDynamicPraise(newCombo);
      
      const { totalXp } = calculateXpReward(10, timeTaken, newCombo, activeMode === 'survival' ? 1.5 : 1);
      setScore(prev => prev + totalXp);
      onXpEarned(totalXp);
      showFloatingXp(totalXp);
      
      if (timeTaken < 1000 && !unlockedAchievements.includes('speed_demon')) {
        onAchievementUnlock('speed_demon');
      }
      
      setTimeout(() => nextQuestion(), 1200);
    } else {
      playSound('wrong');
      setCombo(0);
      setShakeContainer(true);
      setTimeout(() => setShakeContainer(false), 500);
      
      if (activeMode === 'survival') {
        const newLives = lives - 1;
        setLives(newLives);
        if (newLives <= 0) {
          setTimeout(() => endGame(), 1500);
          return;
        }
      }
      setTimeout(() => nextQuestion(), 1800); // Give user time to see the correct answer
    }
  };

  const endGame = () => {
    setIsGameOver(true);
    setPhase('idle');
    setQuestion(null);
    if (timerRef.current) clearInterval(timerRef.current);
    
    if (score > 1000 && !unlockedAchievements.includes('perfect_quiz')) {
      onAchievementUnlock('perfect_quiz');
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (praiseTimerRef.current) clearTimeout(praiseTimerRef.current);
      if (floatingXpTimerRef.current) clearTimeout(floatingXpTimerRef.current);
    };
  }, []);

  if (!activeMode) {
    return (
      <div className="quiz-setup learn-glass-panel">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Arène d'Entraînement</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Choisissez votre mode de défi. Gagnez de l'XP en répondant rapidement et sans erreur !</p>
        </div>
        
        <div className="quiz-modes">
          <div className="quiz-mode-card" onClick={() => startQuiz('classic')}>
            <div className="quiz-mode-icon"><BookOpen size={48} /></div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Classique</h3>
            <p style={{ color: 'var(--text-muted)' }}>Apprentissage standard sans pression temporelle.</p>
          </div>
          
          <div className={`quiz-mode-card ${currentLevel < 3 ? 'locked-feature-card' : ''}`} onClick={() => currentLevel >= 3 && startQuiz('survival')}>
            <div className="quiz-mode-icon"><Heart size={48} color="var(--amazigh-crimson)" /></div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Mode Survie</h3>
            <p style={{ color: 'var(--text-muted)' }}>3 vies. Difficulté croissante. XP multiplié par 1.5.</p>
            {currentLevel < 3 && (
              <div className="padlock-overlay">
                <Heart size={24} color="#ff4d4d" />
                <span style={{ color: '#ff4d4d', fontWeight: 'bold' }}>Niveau 3 requis</span>
              </div>
            )}
          </div>
          
          <div className={`quiz-mode-card ${currentLevel < 5 ? 'locked-feature-card' : ''}`} onClick={() => currentLevel >= 5 && startQuiz('timed')}>
            <div className="quiz-mode-icon"><Timer size={48} color="#4A90E2" /></div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Contre-la-montre</h3>
            <p style={{ color: 'var(--text-muted)' }}>60 secondes pour accumuler un maximum de points.</p>
            {currentLevel < 5 && (
              <div className="padlock-overlay">
                <Timer size={24} color="#4A90E2" />
                <span style={{ color: '#4A90E2', fontWeight: 'bold' }}>Niveau 5 requis</span>
              </div>
            )}
          </div>
          
          <div className={`quiz-mode-card ${currentLevel < 7 ? 'locked-feature-card' : ''}`} onClick={() => currentLevel >= 7 && startQuiz('audio')}>
            <div className="quiz-mode-icon"><Volume2 size={48} color="var(--amazigh-amber)" /></div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>À l'Aveugle</h3>
            <p style={{ color: 'var(--text-muted)' }}>Écoutez le son et identifiez le symbole Tifinagh.</p>
            {currentLevel < 7 && (
              <div className="padlock-overlay">
                <Volume2 size={24} color="var(--amazigh-amber)" />
                <span style={{ color: 'var(--amazigh-amber)', fontWeight: 'bold' }}>Niveau 7 requis</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (isGameOver) {
    const accuracy = Math.round((correctAnswers / Math.max(1, totalQuestions)) * 100);
    
    return (
      <div className="epic-results-container">
        <div className="epic-results-card">
          <h2 className="epic-title">
            Session Terminée
          </h2>
          
          <div className="epic-stats-grid">
            
            <div className="epic-stat-item">
              <p className="epic-stat-label">Précision</p>
              <strong className="epic-stat-value" style={{ color: accuracy >= 80 ? 'var(--amazigh-amber)' : accuracy >= 50 ? '#ffb977' : 'var(--text-primary)' }}>
                {accuracy}%
              </strong>
            </div>

            <div className="epic-stat-item">
              <p className="epic-stat-label">Combo Max</p>
              <strong className="epic-stat-value" style={{ color: 'var(--text-primary)' }}>
                x{maxCombo}
              </strong>
            </div>

            <div className="epic-stat-item">
              <p className="epic-stat-label">Progression</p>
              <strong className="epic-stat-value" style={{ color: 'var(--text-primary)' }}>
                +{score} XP
              </strong>
            </div>

          </div>
          
          <button className="btn-cinematic" onClick={() => setActiveMode(null)}>
            Continuer l'Aventure
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`quiz-play-area learn-glass-panel ${shakeContainer ? 'arena-shake' : ''}`}>
      {dynamicPraise && <div className="dynamic-praise">{dynamicPraise}</div>}

      <div className="quiz-active-header">
        <div className="quiz-score-combo">
          <div style={{ position: 'relative' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: '500', color: 'var(--text-primary)', letterSpacing: '1px' }}>{score} XP</span>
            {floatingXp && <div className="floating-xp">{floatingXp}</div>}
          </div>
          
          {combo >= 3 && (
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '4px' }}>
              Combo x{combo >= 10 ? 3 : combo >= 5 ? 2 : 1.5}
            </div>
          )}
        </div>
        
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {activeMode === 'survival' && (
            <div style={{ display: 'flex', gap: '8px' }}>
              {[...Array(3)].map((_, i) => (
                <Heart key={i} size={28} color={i < lives ? "var(--amazigh-crimson)" : "rgba(255,255,255,0.2)"} fill={i < lives ? "var(--amazigh-crimson)" : "none"} style={{ transition: 'all 0.3s' }} />
              ))}
            </div>
          )}
          {activeMode === 'timed' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: timeLeft < 10 ? 'var(--amazigh-crimson)' : '#FFF', fontWeight: 'bold', fontSize: '1.5rem', transition: 'color 0.3s' }}>
              <Timer size={28} /> {timeLeft}s
            </div>
          )}
          <button onClick={() => { if(timerRef.current) clearInterval(timerRef.current); setActiveMode(null); }} className="quit-arena-btn">
            Quitter
          </button>
        </div>
      </div>

      {/* Minimalist transition wrapper */}

      {question && (
        <div className={`quiz-question-container ${phase === 'transitioning' ? 'slide-out-left' : 'slide-in-right'}`}>
          <div className="quiz-question-box">
            <p className="quiz-question-text">{question.questionText}</p>
            
            {question.type === QUESTION_TYPES.AUDIO_TO_CHAR ? (
              <button className="modal-audio-btn pulse-glow" onClick={() => speakAudio(question.correctItem.name)} style={{ margin: '30px auto', width: '100px', height: '100px' }}>
                <Volume2 size={50} />
              </button>
            ) : (
              <div className="quiz-question-target">
                {question.type === QUESTION_TYPES.CHAR_TO_LATIN ? question.correctItem.char : question.correctItem.transliteration.toUpperCase()}
              </div>
            )}

            <div className="quiz-options-grid">
              {question.options.map((opt) => {
                let btnClass = "quiz-option-btn";
                if (selectedAnswer) {
                  if (opt.id === selectedAnswer) {
                    btnClass += isCorrect ? " correct" : " wrong";
                  } else if (opt.isCorrect) {
                    btnClass += " correct-reveal"; // Reveal correct answer elegantly if user was wrong
                  } else {
                    btnClass += " disabled-dim"; // Dim other options
                  }
                }

                return (
                  <button
                    key={opt.id}
                    className={btnClass}
                    onClick={() => handleAnswer(opt)}
                    disabled={selectedAnswer !== null}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizArena;
