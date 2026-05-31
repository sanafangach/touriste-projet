import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, Award, BookOpen, Flame, MessageCircle, Shield, Sparkles, Trophy } from "lucide-react";
import "./LearnHub.css";

import DarijaLessons from "./DarijaLessons";
import DarijaConversations from "./DarijaConversations";
import GamificationDashboard from "./GamificationDashboard";
import UnlockCelebrationModal from "./UnlockCelebrationModal";

import { addXp, getRankByXp, loadProgress, unlockAchievement } from "./data/gamificationEngine";
import { getDestinationContext } from "./data/destinationContext";
import { useLanguage } from "../accueil/LanguageContext";

const DarijaHub = ({ onBack, selectedDestination, onXpEarned }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("lessons");
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

    const storedWords = JSON.parse(localStorage.getItem("amudux_darija_learned")) || [];
    setLearnedDarijaWords(storedWords);

    const initBackground = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      let width = window.innerWidth;
      let height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      const stars = Array.from({ length: 20 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 30 + 15,
        speed: Math.random() * 0.3 + 0.1,
        angle: Math.random() * Math.PI * 2
      }));

      const render = () => {
        ctx.clearRect(0, 0, width, height);

        stars.forEach((star) => {
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
          for (let index = 0; index < 8; index += 1) {
            ctx.rotate(Math.PI / 4);
            ctx.lineTo(0, star.radius);
            ctx.lineTo(star.radius * 0.3, star.radius * 0.3);
          }
          ctx.closePath();
          ctx.fillStyle = "rgba(255, 122, 0, 0.05)";
          ctx.fill();
          ctx.restore();
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

    initBackground();
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
        setUnlockQueue((previous) => [...previous, ...result.newUnlocks.filter((unlock) => unlock.hub === "darija")]);
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
          // Ignore audio failures and keep the learning flow uninterrupted.
        }
      }
    }

    if (onXpEarned) {
      onXpEarned(amount);
    }
  };

  const handleMarkLearned = (id) => {
    if (!learnedDarijaWords.includes(id)) {
      const nextLearnedWords = [...learnedDarijaWords, id];
      setLearnedDarijaWords(nextLearnedWords);
      localStorage.setItem("amudux_darija_learned", JSON.stringify(nextLearnedWords));
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
    return <div className="learn-loading">{t("learnLoadingHub")}</div>;
  }

  const destinationContext = selectedDestination ? getDestinationContext(selectedDestination) : null;

  return (
    <div className="learn-hub-container learn-hub-container--darija">
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
                <MessageCircle size={14} />
                <span>{t("learnPathDarijaEyebrow")}</span>
              </div>
            </div>

            <h1 className="learn-stage-hero__title">
              <span className="learn-stage-rank-badge">{currentRank.badge}</span>
              <span>{t("learnPathDarijaTitle")}</span>
            </h1>
            <p className="learn-stage-hero__copy">{t("learnPathDarijaDesc")}</p>
          </div>

          <div className="learn-stage-hero__stats">
            <div className="learn-stage-stat">
              <Sparkles size={18} />
              <div>
                <strong>{stats.xp} XP</strong>
                <span>{t("learnXpCumulated")}</span>
              </div>
            </div>
            <div className="learn-stage-stat">
              <Flame size={18} />
              <div>
                <strong>{stats.streak}</strong>
                <span>{t("learnActiveDays")}</span>
              </div>
            </div>
            {stats.streakFreezes > 0 && (
              <div className="learn-stage-stat learn-stage-stat--cool">
                <Shield size={18} />
                <div>
                  <strong>{stats.streakFreezes}</strong>
                  <span>{t("learnDays")}</span>
                </div>
              </div>
            )}
            <div className="learn-stage-stat">
              <Award size={18} />
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
              <h3>{t("learnVocabScenesFor")} {t(destinationContext.nameKey)}</h3>
              <p>{t(destinationContext.atmosphereKey || destinationContext.atmosphere)}</p>
            </div>
          </div>
        )}

        <div className="learn-tabs">
          <button
            type="button"
            className={`learn-tab-btn ${activeTab === "lessons" ? "active" : ""}`}
            onClick={() => setActiveTab("lessons")}
          >
            <BookOpen size={18} />
            {t("learnVocabulary")}
          </button>
          <button
            type="button"
            className={`learn-tab-btn ${activeTab === "conversations" ? "active" : ""}`}
            onClick={() => setActiveTab("conversations")}
          >
            <MessageCircle size={18} />
            {t("learnScenarios")}
          </button>
          <button
            type="button"
            className={`learn-tab-btn ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            <Trophy size={18} />
            {t("learnGlobalProgress")}
          </button>
        </div>

        <div className="learn-active-view">
          {activeTab === "lessons" && (
            <DarijaLessons
              onXpEarned={handleXpEarned}
              learnedWords={learnedDarijaWords}
              onMarkLearned={handleMarkLearned}
              selectedDestination={selectedDestination}
            />
          )}

          {activeTab === "conversations" && (
            <DarijaConversations
              onXpEarned={handleXpEarned}
              unlockedAchievements={unlockedAchievements}
              onAchievementUnlock={handleAchievementUnlock}
              currentLevel={currentRank.level}
              selectedDestination={selectedDestination}
            />
          )}

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

export default DarijaHub;
