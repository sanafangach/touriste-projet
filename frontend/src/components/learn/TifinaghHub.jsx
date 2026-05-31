import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, BookOpen, Globe, Mic, Sparkles } from "lucide-react";
import "./LearnHub.css";

import AlphabetSystem from "./AlphabetSystem";
import QuizArena from "./QuizArena";
import CulturalImmersion from "./CulturalImmersion";
import NameConverter from "./NameConverter";
import PronunciationLab from "./PronunciationLab";
import GamificationDashboard from "./GamificationDashboard";
import UnlockCelebrationModal from "./UnlockCelebrationModal";

import { addXp, getRankByXp, loadProgress, markLetterLearned, unlockAchievement } from "./data/gamificationEngine";
import { tifinaghAlphabet } from "./data/tifnaghData";
import { getDestinationContext } from "./data/destinationContext";
import { useLanguage } from "../accueil/LanguageContext";

const TifinaghHub = ({ onBack, selectedDestination, onXpEarned: externalOnXpEarned }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("alphabet");
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

  useEffect(() => {
    const progress = loadProgress();
    setStats(progress.stats);
    setLearnedLetters(progress.learnedLetters);
    setUnlockedCards(progress.unlockedCards);
    setUnlockedAchievements(progress.unlockedAchievements);
    setCurrentRank(progress.currentRank);
    setNextRank(progress.nextRank);
    setProgressPercentage(progress.progressPercentage);

    const initParticles = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      let width = window.innerWidth;
      let height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      const particles = [];
      const chars = tifinaghAlphabet.map((letter) => letter.char);

      for (let index = 0; index < 30; index += 1) {
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

        particles.forEach((particle) => {
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.y < -50) particle.y = height + 50;
          if (particle.x < -50) particle.x = width + 50;
          if (particle.x > width + 50) particle.x = -50;

          ctx.font = `${particle.size}px Arial`;
          ctx.fillStyle = `rgba(255, 122, 0, ${particle.opacity})`;
          ctx.fillText(particle.char, particle.x, particle.y);
        });

        animationRef.current = requestAnimationFrame(render);
      };

      render();
    };

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    initParticles();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
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
        setUnlockQueue((previous) => [...previous, ...result.newUnlocks.filter((unlock) => unlock.hub === "tifinagh")]);
      }

      if (result.leveledUp) {
        try {
          const audioContext = new (window.AudioContext || window.webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          oscillator.connect(audioContext.destination);
          oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 1);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 1);
        } catch (error) {
          // Ignore audio issues and keep the interface responsive.
        }
      }
    }

    if (externalOnXpEarned) {
      externalOnXpEarned(amount);
    }
  };

  const handleMarkLearned = (char) => {
    const isNew = markLetterLearned(char);
    if (isNew) {
      setLearnedLetters((previous) => [...previous, char]);
      handleXpEarned(20);

      if (learnedLetters.length + 1 === 33) {
        handleAchievementUnlock("alphabet_master");
      }
    }
  };

  const handleAchievementUnlock = (id) => {
    const achievement = unlockAchievement(id);
    if (achievement) {
      setUnlockedAchievements((previous) => [...previous, id]);
      if (achievement.xpReward) {
        const ranks = getRankByXp(stats.xp + achievement.xpReward);
        setStats((previous) => ({ ...previous, xp: previous.xp + achievement.xpReward }));
        setCurrentRank(ranks.currentRank);
        setNextRank(ranks.nextRank);
        setProgressPercentage(ranks.progressPercentage);
      }
    }
  };

  if (!stats || !currentRank) {
    return <div className="learn-loading">Chargement de l'univers...</div>;
  }

  const destinationContext = selectedDestination ? getDestinationContext(selectedDestination) : null;

  return (
    <div className="learn-hub-container learn-hub-container--tifinagh">
      {unlockQueue.length > 0 && (
        <UnlockCelebrationModal feature={unlockQueue[0]} onClose={() => setUnlockQueue((previous) => previous.slice(1))} />
      )}

      <canvas ref={canvasRef} className="tifinagh-particles" />

      <div className="learn-content-z">
        <section className="learn-stage-hero">
          <div className="learn-stage-hero__main">
            <div className="learn-stage-hero__actions">
              <button type="button" onClick={onBack} className="learn-back-btn" aria-label="Back">
                <ArrowLeft size={18} />
              </button>
              <div className="learn-stage-kicker">
                <Globe size={14} />
                <span>{t("learnPathTifinaghEyebrow")}</span>
              </div>
            </div>

            <h1 className="learn-stage-hero__title">{t("learnTifinaghHeritage")}</h1>
            <p className="learn-stage-hero__copy">{t("learnPathTifinaghDesc")}</p>
          </div>

          <div className="learn-stage-hero__stats">
            <div className="learn-stage-stat">
              <Sparkles size={18} />
              <div>
                <strong>{stats.xp} XP</strong>
                <span>{t("learnXpPoints")}</span>
              </div>
            </div>
            <div className="learn-stage-stat">
              <div>
                <strong>{stats.streak}</strong>
                <span>{t("learnActiveDays")}</span>
              </div>
            </div>
            <div className="learn-stage-stat">
              <div>
                <strong>{t(currentRank.titleKey) || currentRank.title}</strong>
                <span>{t("learnCurrentRank")}</span>
              </div>
            </div>
          </div>
        </section>

        {destinationContext && (
          <div
            className="destination-banner destination-banner--context"
            style={{ "--learn-destination-accent": destinationContext.accentColor }}
          >
            <div className="destination-banner__emoji">{destinationContext.emoji}</div>
            <div>
              <h3>{t("learnTifinaghHeritageIn")} {t(destinationContext.nameKey)}</h3>
              <p>{t(destinationContext.atmosphereKey || destinationContext.atmosphere)}</p>
            </div>
          </div>
        )}

        <div className="learn-tabs">
          <button
            type="button"
            className={`learn-tab-btn ${activeTab === "alphabet" ? "active" : ""}`}
            onClick={() => setActiveTab("alphabet")}
          >
            <BookOpen size={16} />
            {t("learnAlphabet")}
          </button>
          {selectedDestination && (
            <button
              type="button"
              className={`learn-tab-btn ${activeTab === "city" ? "active" : ""}`}
              onClick={() => setActiveTab("city")}
            >
              <Globe size={16} />
              {t("learnInCity")}
            </button>
          )}
          <button
            type="button"
            className={`learn-tab-btn ${activeTab === "quiz" ? "active" : ""}`}
            onClick={() => setActiveTab("quiz")}
          >
            {t("learnQuizArena")}
          </button>
          <button
            type="button"
            className={`learn-tab-btn ${activeTab === "culture" ? "active" : ""}`}
            onClick={() => setActiveTab("culture")}
          >
            <Globe size={16} />
            {t("learnImmersion")}
          </button>
          <button
            type="button"
            className={`learn-tab-btn ${activeTab === "name" ? "active" : ""}`}
            onClick={() => setActiveTab("name")}
          >
            {t("learnCalligraphy")}
          </button>
          <button
            type="button"
            className={`learn-tab-btn ${activeTab === "audio" ? "active" : ""}`}
            onClick={() => setActiveTab("audio")}
          >
            <Mic size={16} />
            {t("learnAudioLab")}
          </button>
          <button
            type="button"
            className={`learn-tab-btn ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            {t("learnProgress")}
          </button>
        </div>

        <div className="learn-active-view">
          {activeTab === "alphabet" && (
            <div className="learn-glass-panel learn-panel-section">
              <div className="learn-panel-intro">
                <h2>{t("learnNeoTifinagh")}</h2>
                <p>{t("learnTifinaghDesc")}</p>
              </div>
              <AlphabetSystem learnedLetters={learnedLetters} onMarkLearned={handleMarkLearned} />
            </div>
          )}

          {activeTab === "city" && destinationContext && destinationContext.tifinaghSpots && (
            <div className="learn-glass-panel learn-panel-section">
              <div className="learn-panel-intro">
                <h2>{t("learnTifinaghHeritageIn")} {t(destinationContext.nameKey)}</h2>
                <p>{t("learnPathTifinaghDesc")}</p>
              </div>

              <div className="learn-spot-grid">
                {destinationContext.tifinaghSpots.map((spot, index) => (
                  <article key={index} className="learn-spot-card">
                    <h3>{t(spot.titleKey)}</h3>
                    <p>{t(spot.descKey)}</p>
                  </article>
                ))}
              </div>
            </div>
          )}

          {activeTab === "quiz" && (
            <QuizArena
              onXpEarned={handleXpEarned}
              unlockedAchievements={unlockedAchievements}
              onAchievementUnlock={handleAchievementUnlock}
              currentLevel={currentRank.level}
            />
          )}

          {activeTab === "culture" && (
            <CulturalImmersion unlockedCards={unlockedCards} userXp={stats.xp} />
          )}

          {activeTab === "name" && (
            <NameConverter
              onAchievementUnlock={handleAchievementUnlock}
              unlockedAchievements={unlockedAchievements}
            />
          )}

          {activeTab === "audio" && <PronunciationLab />}

          {activeTab === "dashboard" && (
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
