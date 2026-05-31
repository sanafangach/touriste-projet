import React, { useState } from "react";
import { BookOpen, Calendar, Share2 } from "lucide-react";
import { timelineEvents, mythologyCards, proverbs } from "./data/culturalData";
import { useLanguage } from "../accueil/LanguageContext";

const CulturalImmersion = ({ unlockedCards = ["anzar"], userXp = 0 }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("mythology");
  const [activeProverb, setActiveProverb] = useState(0);

  const nextProverb = () => {
    setActiveProverb((previous) => (previous + 1) % proverbs.length);
  };

  return (
    <div className="cultural-immersion">
      <div className="cultural-tabs">
        <button
          type="button"
          className={`learn-tab-btn ${activeTab === "mythology" ? "active" : ""}`}
          onClick={() => setActiveTab("mythology")}
        >
          {t("learnMythology")}
        </button>
        <button
          type="button"
          className={`learn-tab-btn ${activeTab === "timeline" ? "active" : ""}`}
          onClick={() => setActiveTab("timeline")}
        >
          <Calendar size={16} />
          {t("learnTimeline")}
        </button>
        <button
          type="button"
          className={`learn-tab-btn ${activeTab === "proverbs" ? "active" : ""}`}
          onClick={() => setActiveTab("proverbs")}
        >
          <BookOpen size={16} />
          {t("learnProverbs")}
        </button>
      </div>

      {activeTab === "mythology" && (
        <div className="mythology-grid">
          {mythologyCards.map((card) => {
            const isUnlocked = unlockedCards.includes(card.id) || userXp >= card.unlockXp;

            return (
              <article key={card.id} className={`myth-card cultural-card ${isUnlocked ? "is-unlocked" : "is-locked"}`}>
                <div className="myth-card-inner">
                  <div className="myth-front cultural-card__front">
                    <h3>{card.title}</h3>
                    <p>{card.subtitle}</p>
                    {!isUnlocked && <span className="cultural-card__lock">{card.unlockXp} XP {t("learnRequired")}</span>}
                    {isUnlocked && <span className="cultural-card__prompt">{t("learnHoverRead")}</span>}
                  </div>

                  {isUnlocked && (
                    <div className="myth-back cultural-card__back">
                      <h4>{t("learnLegend")}</h4>
                      <p>{card.story}</p>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      {activeTab === "timeline" && (
        <div className="learn-glass-panel learn-panel-section">
          <div className="learn-panel-intro">
            <h2>{t("learnHistoryYears")}</h2>
            <p>{t("learnTimelineDesc")}</p>
          </div>

          <div className="timeline-container">
            {timelineEvents.map((event, index) => (
              <article key={index} className="timeline-node">
                <div className="timeline-year">{event.year}</div>
                <h3>{event.title}</h3>
                <p>{event.desc}</p>
              </article>
            ))}
          </div>
        </div>
      )}

      {activeTab === "proverbs" && (
        <div className="learn-glass-panel proverb-panel">
          <div className="proverb-panel__copy">
            <h2>{proverbs[activeProverb].tamazight}</h2>
            <div className="proverb-panel__translation">
              <p>"{proverbs[activeProverb].french}"</p>
              <span>"{proverbs[activeProverb].english}"</span>
            </div>
          </div>

          <div className="proverb-panel__actions">
            <button type="button" className="btn-primary" onClick={nextProverb}>
              {t("learnNext")}
            </button>
            <button type="button" className="btn-primary btn-primary--ghost">
              <Share2 size={16} />
              {t("learnShare")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CulturalImmersion;
