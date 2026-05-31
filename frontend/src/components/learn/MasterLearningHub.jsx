import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, ChevronDown, Coffee, Compass, Info, MapPin, MessageCircle, Sparkles } from "lucide-react";
import TifinaghHub from "./TifinaghHub";
import DarijaHub from "./DarijaHub";
import TravelTipsHub from "./TravelTipsHub";
import { loadProgress } from "./data/gamificationEngine";
import { useLanguage } from "../accueil/LanguageContext";
import {
  DESTINATIONS,
  getSelectedDestination,
  setSelectedDestination as saveDestination
} from "./data/destinationContext";
import "./LearnHub.css";

const LEARNING_PATHS = [
  {
    id: "darija",
    icon: MessageCircle,
    cardClass: "learn-path-card learn-path-card--primary",
    iconClass: "learn-path-card__icon",
    eyebrowKey: "learnPathDarijaEyebrow",
    titleKey: "learnPathDarijaTitle",
    descKey: "learnPathDarijaDesc",
    ctaKey: "learnPathDarijaCTA",
    tags: ["learnTagAirport", "learnTagCafe", "learnTagEmergencies"]
  },
  {
    id: "tifinagh",
    icon: Compass,
    cardClass: "learn-path-card learn-path-card--heritage",
    iconClass: "learn-path-card__icon learn-path-card__icon--secondary",
    eyebrowKey: "learnPathTifinaghEyebrow",
    titleKey: "learnPathTifinaghTitle",
    descKey: "learnPathTifinaghDesc",
    ctaKey: "learnPathTifinaghCTA",
    tags: ["learnTagAlphabet", "learnTagCalligraphy", "learnTagCities"]
  },
  {
    id: "tips",
    icon: Coffee,
    cardClass: "learn-path-card learn-path-card--travel",
    iconClass: "learn-path-card__icon learn-path-card__icon--travel",
    eyebrowKey: "learnPathTipsEyebrow",
    titleKey: "learnPathTipsTitle",
    descKey: "learnPathTipsDesc",
    ctaKey: "learnPathTipsCTA",
    tags: ["learnTagNegotiation", "learnTagEtiquette", "learnTagTea"]
  }
];

const MasterLearningHub = () => {
  const { t } = useLanguage();
  const [activeHub, setActiveHub] = useState(null);
  const [stats, setStats] = useState(null);
  const [currentRank, setCurrentRank] = useState(null);
  const [selectedDestId, setSelectedDestId] = useState(null);
  const [isDestSelectorOpen, setIsDestSelectorOpen] = useState(false);
  const selectorRef = useRef(null);

  useEffect(() => {
    const destination = getSelectedDestination();
    if (destination) {
      setSelectedDestId(destination.id);
    }

    if (!activeHub) {
      const progress = loadProgress();
      setStats(progress.stats);
      setCurrentRank(progress.currentRank);
    }
  }, [activeHub]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target)) {
        setIsDestSelectorOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsDestSelectorOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleDestinationChange = (id) => {
    setSelectedDestId(id);
    saveDestination(id);
    setIsDestSelectorOpen(false);
  };

  const handleXpEarned = () => {
    const progress = loadProgress();
    setStats(progress.stats);
    setCurrentRank(progress.currentRank);
  };

  if (activeHub === "tifinagh") {
    return (
      <TifinaghHub
        onBack={() => setActiveHub(null)}
        selectedDestination={selectedDestId}
        onXpEarned={handleXpEarned}
      />
    );
  }

  if (activeHub === "darija") {
    return (
      <DarijaHub
        onBack={() => setActiveHub(null)}
        selectedDestination={selectedDestId}
        onXpEarned={handleXpEarned}
      />
    );
  }

  if (activeHub === "tips") {
    return (
      <div className="learn-hub-container learn-hub-container--master">
        <div className="learn-content-z learn-portal-shell">
          <section className="learn-stage-hero learn-stage-hero--compact">
            <div className="learn-stage-hero__main">
              <button type="button" className="learn-back-btn" onClick={() => setActiveHub(null)} aria-label="Back">
                <ArrowLeft size={18} />
              </button>
              <div className="learn-stage-kicker">
                <Coffee size={14} />
                <span>{t("learnPathTipsEyebrow")}</span>
              </div>
              <h1 className="learn-stage-hero__title">{t("learnPathTipsTitle")}</h1>
              <p className="learn-stage-hero__copy">{t("learnPathTipsDesc")}</p>
            </div>
          </section>
          <TravelTipsHub selectedDestination={selectedDestId} onXpEarned={handleXpEarned} />
        </div>
      </div>
    );
  }

  if (!stats || !currentRank) {
    return <div className="learn-loading">Chargement...</div>;
  }

  const currentDest = selectedDestId ? DESTINATIONS.find((destination) => destination.id === selectedDestId) : null;
  const quickStripStyle = {
    "--learn-destination-accent": currentDest ? currentDest.accentColor : "rgba(255, 255, 255, 0.04)"
  };

  return (
    <div className="learn-hub-container learn-hub-container--master">
      <div className="learn-content-z learn-portal-shell">
        <section className="learn-hero-band learn-hero-band--master">
          <div className="learn-hero-layout">
            <div className="learn-hero-content">
              <div className="learn-kicker">
                <Sparkles size={14} />
                <span>{t("languages")}</span>
              </div>
              <h1 className="learn-hero-title">{t("learnHeroTitle")}</h1>
              <p className="learn-hero-copy">{t("learnHeroCopy")}</p>

              <div className="learn-hero-metrics">
                <div className="learn-metric">
                  <strong>{stats.xp}</strong>
                  <span>{t("learnXpCumulated")}</span>
                </div>
                <div className="learn-metric">
                  <strong>{stats.streak}</strong>
                  <span>{t("learnActiveDays")}</span>
                </div>
                <div className="learn-metric">
                  <strong>{t(currentRank.titleKey) || currentRank.title}</strong>
                  <span>{t("learnCurrentRank")}</span>
                </div>
              </div>
            </div>

            <aside className="learn-hero-aside" ref={selectorRef}>
              <div className="learn-hero-card">
                <p className="learn-selector-heading">{t("learnDestinationSelect")}</p>
                <button
                  type="button"
                  className="learn-destination-trigger"
                  onClick={() => setIsDestSelectorOpen((open) => !open)}
                >
                  <MapPin size={18} color="var(--amazigh-amber)" />
                  <span className="learn-destination-trigger__label">
                    {currentDest ? t(currentDest.nameKey) : t("learnDestinationSelect")}
                  </span>
                  <ChevronDown size={16} className={isDestSelectorOpen ? "is-open" : ""} />
                </button>

                {isDestSelectorOpen && (
                  <div className="learn-destination-menu">
                    <button
                      type="button"
                      className={`learn-destination-option ${!selectedDestId ? "active" : ""}`}
                      onClick={() => handleDestinationChange(null)}
                    >
                      {t("learnAllDestinations")}
                    </button>
                    {DESTINATIONS.map((destination) => (
                      <button
                        key={destination.id}
                        type="button"
                        className={`learn-destination-option ${selectedDestId === destination.id ? "active" : ""}`}
                        style={{ "--learn-option-accent": destination.accentColor }}
                        onClick={() => handleDestinationChange(destination.id)}
                      >
                        <span>{destination.emoji}</span>
                        {t(destination.nameKey)}
                      </button>
                    ))}
                  </div>
                )}

                <p className="learn-destination-caption">
                  {currentDest
                    ? `${t("learnPhrasesFor")} ${t(currentDest.nameKey)}`
                    : t("learnUniversalPhrases")}
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="learn-path-grid">
          {LEARNING_PATHS.map((path) => {
            const Icon = path.icon;

            return (
              <button
                key={path.id}
                type="button"
                className={path.cardClass}
                onClick={() => setActiveHub(path.id)}
              >
                <div className={path.iconClass}>
                  <Icon size={26} />
                </div>
                <div className="learn-path-card__eyebrow">{t(path.eyebrowKey)}</div>
                <h2 className="learn-path-card__title">{t(path.titleKey)}</h2>
                <p className="learn-path-card__desc">{t(path.descKey)}</p>
                <div className="learn-path-card__tags">
                  {path.tags.map((tagKey) => (
                    <span key={tagKey} className="learn-tag">
                      {t(tagKey)}
                    </span>
                  ))}
                </div>
                <span className="learn-path-card__cta">{t(path.ctaKey)}</span>
              </button>
            );
          })}
        </section>

        <section className="learn-glass-panel learn-guide-strip" style={quickStripStyle}>
          <div className="learn-guide-strip__label">
            <Info size={18} />
            <span>{currentDest ? `${t("learnPhrasesFor")} ${t(currentDest.nameKey)}` : t("learnUniversalPhrases")}</span>
          </div>

          <div className="learn-guide-strip__content">
            {currentDest ? (
              currentDest.quickPhrases.map((quickPhrase, index) => (
                <span key={index} className="learn-guide-pill" title={t(quickPhrase.key)}>
                  {quickPhrase.darija}
                </span>
              ))
            ) : (
              <>
                <span className="learn-guide-pill">{t("learnFallbackPhrase1")}</span>
                <span className="learn-guide-pill">{t("learnFallbackPhrase2")}</span>
                <span className="learn-guide-pill">{t("learnFallbackPhrase3")}</span>
                <span className="learn-guide-pill">{t("learnFallbackPhrase4")}</span>
              </>
            )}

            <p>
              {currentDest
                ? `${t("learnAtmosphereIs")} ${t(currentDest.nameKey)} ${t("learnAtmosphereHelp")} ${t(currentDest.atmosphereKey || currentDest.atmosphere)} ${t("learnAtmosphereTheseHelp")}`
                : t("learnBasicPhrasesWork")}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MasterLearningHub;
