import React, { useEffect, useState } from "react";
import { CheckCircle, Info, MapPin } from "lucide-react";
import { useLanguage } from "../accueil/LanguageContext";
import { TIP_CATEGORIES, filterTips, getDestinationTips } from "./data/travelTipsData";
import { getDestinationContext } from "./data/destinationContext";

const TravelTipsHub = ({ selectedDestination, onXpEarned }) => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const [readTips, setReadTips] = useState([]);
  const [tipsToDisplay, setTipsToDisplay] = useState([]);

  useEffect(() => {
    if (activeCategory === "all" && selectedDestination) {
      setTipsToDisplay(getDestinationTips(selectedDestination));
      return;
    }

    setTipsToDisplay(filterTips(activeCategory, selectedDestination));
  }, [activeCategory, selectedDestination]);

  const destinationContext = selectedDestination ? getDestinationContext(selectedDestination) : null;

  const markAsRead = (tipId) => {
    if (!readTips.includes(tipId)) {
      setReadTips((previous) => [...previous, tipId]);
      if (onXpEarned) {
        onXpEarned(10);
      }
    }
  };

  return (
    <div className="learn-glass-panel travel-tips-container">
      <div className="learn-panel-intro learn-panel-intro--split">
        <div>
          <div className="learn-stage-kicker">
            <MapPin size={14} />
            <span>{t("learnPathTipsEyebrow")}</span>
          </div>
          <h2>{t("learnPathTipsTitle")}</h2>
          <p>{t("learnPathTipsDesc")}</p>
        </div>
      </div>

      {destinationContext && (
        <div
          className="destination-banner destination-banner--context"
          style={{ "--learn-destination-accent": destinationContext.accentColor }}
        >
          <div className="destination-banner__emoji">{destinationContext.emoji}</div>
          <div>
            <h3>{t("learnPhrasesFor")} {t(destinationContext.nameKey)}</h3>
            <p>{t("learnContextAtmosphere")}: {t(destinationContext.atmosphereKey || destinationContext.atmosphere)}</p>
          </div>
        </div>
      )}

      <div className="category-pills">
        {TIP_CATEGORIES.map((category) => (
          <button
            key={category.id}
            type="button"
            className={`pill-btn ${activeCategory === category.id ? "active" : ""}`}
            onClick={() => setActiveCategory(category.id)}
          >
            <span>{category.icon}</span>
            {t(category.labelKey)}
          </button>
        ))}
      </div>

      <div className="tips-grid">
        {tipsToDisplay.map((tip, index) => {
          const isRead = readTips.includes(tip.id);
          const isDestinationSpecific = selectedDestination && tip.destinations.includes(selectedDestination);

          return (
            <article
              key={tip.id}
              className={`tip-card ${isRead ? "read" : ""} ${isDestinationSpecific ? "tip-card--accent" : ""}`}
              onClick={() => markAsRead(tip.id)}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="tip-card__head">
                <span className="tip-card__icon">{tip.icon}</span>
                <div className="tip-card__badges">
                  {isDestinationSpecific && destinationContext && (
                    <span className="destination-badge" style={{ "--learn-destination-accent": destinationContext.accentColor }}>
                      {t(destinationContext.nameKey)}
                    </span>
                  )}
                  {isRead && <CheckCircle size={18} color="var(--amazigh-amber)" />}
                </div>
              </div>

              <h3 className="tip-card__title">{t(tip.titleKey)}</h3>
              <p className="tip-card__content">{t(tip.contentKey)}</p>

              {tip.quickPhrase && (
                <div className="tip-card__phrase">
                  <Info size={16} color="var(--amazigh-amber)" />
                  <div>
                    <strong>{tip.quickPhrase.darija}</strong>
                    <span>{t(tip.quickPhrase.key)}</span>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {tipsToDisplay.length === 0 && (
        <div className="learn-empty-state">
          <p>Aucun conseil trouve pour cette categorie.</p>
        </div>
      )}
    </div>
  );
};

export default TravelTipsHub;
