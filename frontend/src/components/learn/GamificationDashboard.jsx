import React from "react";
import { Award, Calendar, Lock, Target } from "lucide-react";
import { ACHIEVEMENTS, MASTERY_RANKS } from "./data/gamificationEngine";
import { useLanguage } from "../accueil/LanguageContext";

const GamificationDashboard = ({ stats, currentRank, nextRank, progressPercentage, unlockedAchievements }) => {
  const { t } = useLanguage();

  return (
    <div className="gamification-dashboard">
      <div className="learn-glass-panel dashboard-summary">
        <div className="dashboard-summary__main">
          <div className="dashboard-summary__level" style={{ "--dashboard-rank-color": currentRank.color }}>
            <span>{currentRank.level}</span>
          </div>

          <div className="dashboard-summary__copy">
            <h3>{t(currentRank.titleKey) || currentRank.title}</h3>
            <p>{t("learnLevelRequired")} {currentRank.level}</p>

            <div className="dashboard-progress">
              <div className="dashboard-progress__meta">
                <span>{stats.xp} XP</span>
                <span>{nextRank ? `${nextRank.minXp} XP` : "MAX"}</span>
              </div>
              <div className="dashboard-progress__track">
                <div
                  className="dashboard-progress__fill"
                  style={{ width: `${progressPercentage}%`, "--dashboard-rank-color": currentRank.color }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-kpi-grid">
          <div className="dashboard-kpi">
            <Calendar size={20} />
            <strong>{stats.streak}</strong>
            <span>{t("learnDays")}</span>
          </div>
          <div className="dashboard-kpi">
            <Award size={20} />
            <strong>{unlockedAchievements.length}</strong>
            <span>{t("learnAcquired")}</span>
          </div>
        </div>
      </div>

      <div className="learn-glass-panel dashboard-section">
        <div className="dashboard-section__head">
          <h3>{t("learnJourney")}</h3>
        </div>

        <div className="dashboard-rank-row">
          {MASTERY_RANKS.map((rank) => {
            const isUnlocked = stats.xp >= rank.minXp;
            const isCurrent = currentRank.level === rank.level;

            return (
              <article
                key={rank.level}
                className={`dashboard-rank-card ${isUnlocked ? "is-unlocked" : ""} ${isCurrent ? "is-current" : ""}`}
              >
                <strong>{rank.level}</strong>
                <span>{t(rank.titleKey) || rank.title}</span>
                <small>{rank.minXp} XP</small>
              </article>
            );
          })}
        </div>
      </div>

      <div className="learn-glass-panel dashboard-section">
        <div className="dashboard-section__head">
          <h3>{t("learnAchievements")}</h3>
        </div>

        <div className="dashboard-achievement-grid">
          {ACHIEVEMENTS.map((achievement) => {
            const isUnlocked = unlockedAchievements.includes(achievement.id);

            return (
              <article key={achievement.id} className={`dashboard-achievement-card ${isUnlocked ? "is-unlocked" : ""}`}>
                <div className="dashboard-achievement-card__icon">
                  {isUnlocked ? <Target size={18} color={achievement.color} /> : <Lock size={16} color="rgba(255,255,255,0.2)" />}
                </div>
                <div className="dashboard-achievement-card__copy">
                  <h4>{t(achievement.titleKey) || achievement.title}</h4>
                  <p>{t(achievement.descriptionKey) || achievement.description}</p>
                  <small>+{achievement.xpReward} XP</small>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GamificationDashboard;
