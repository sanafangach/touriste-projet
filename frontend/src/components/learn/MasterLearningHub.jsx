import React, { useState, useEffect } from "react";
import { Compass, Map, MessageCircle, Sparkles, MapPin, Coffee, Info, ChevronDown } from "lucide-react";
import TifinaghHub from "./TifinaghHub";
import DarijaHub from "./DarijaHub";
import TravelTipsHub from "./TravelTipsHub";
import { loadProgress } from "./data/gamificationEngine";
import { useLanguage } from "../accueil/LanguageContext";
import { DESTINATIONS, getSelectedDestination, setSelectedDestination as saveDestination } from "./data/destinationContext";
import "./LearnHub.css";

const MasterLearningHub = () => {
  const { t, lang } = useLanguage();
  const [activeHub, setActiveHub] = useState(null);
  const [stats, setStats] = useState(null);
  const [currentRank, setCurrentRank] = useState(null);
  
  // Destination state
  const [selectedDestId, setSelectedDestId] = useState(null);
  const [isDestSelectorOpen, setIsDestSelectorOpen] = useState(false);

  useEffect(() => {
    // Load destination
    const dest = getSelectedDestination();
    if (dest) setSelectedDestId(dest.id);

    // Load gamification progress
    if (!activeHub) {
      const progress = loadProgress();
      setStats(progress.stats);
      setCurrentRank(progress.currentRank);
    }
  }, [activeHub]);

  const handleDestinationChange = (id) => {
    setSelectedDestId(id);
    saveDestination(id);
    setIsDestSelectorOpen(false);
  };

  const handleXpEarned = (amount) => {
    // To update stats immediately when coming back
    const progress = loadProgress();
    setStats(progress.stats);
    setCurrentRank(progress.currentRank);
  };

  if (activeHub === "tifinagh") {
    return <TifinaghHub onBack={() => setActiveHub(null)} selectedDestination={selectedDestId} onXpEarned={handleXpEarned} />;
  }

  if (activeHub === "darija") {
    return <DarijaHub onBack={() => setActiveHub(null)} selectedDestination={selectedDestId} onXpEarned={handleXpEarned} />;
  }

  if (activeHub === "tips") {
    return (
      <div className="learn-hub-container">
        <div className="learn-content-z learn-portal-shell">
          <div style={{ marginBottom: "20px" }}>
            <button className="btn-secondary" onClick={() => setActiveHub(null)} style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <span>← Retour</span>
            </button>
          </div>
          <TravelTipsHub selectedDestination={selectedDestId} onXpEarned={handleXpEarned} />
        </div>
      </div>
    );
  }

  if (!stats || !currentRank) {
    return <div className="learn-loading">Chargement...</div>;
  }

  const currentDest = selectedDestId ? DESTINATIONS.find(d => d.id === selectedDestId) : null;

  return (
    <div className="learn-hub-container">
      <div className="learn-content-z learn-portal-shell">
        
        <section className="learn-hero-band" style={{ position: 'relative', overflow: 'visible' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <div className="learn-kicker">
                <Sparkles size={14} />
                <span>{t("languages")}</span>
              </div>
              <h1 className="learn-hero-title">{t("learnHeroTitle")}</h1>
              <p className="learn-hero-copy">{t("learnHeroCopy")}</p>
            </div>

            {/* Destination Selector */}
            <div style={{ position: 'relative', zIndex: 100 }}>
              <button 
                onClick={() => setIsDestSelectorOpen(!isDestSelectorOpen)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '12px 20px', borderRadius: '12px',
                  color: '#FFF', cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                <MapPin size={18} color="var(--amazigh-amber)" />
                <span style={{ fontWeight: 500 }}>
                  {currentDest ? t(currentDest.nameKey) : t("learnDestinationSelect")}
                </span>
                <ChevronDown size={16} />
              </button>

              {isDestSelectorOpen && (
                <div style={{
                  position: 'absolute', top: '100%', right: 0, marginTop: '10px',
                  background: 'rgba(15, 20, 35, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px', padding: '10px',
                  width: 'max-content', minWidth: '200px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  display: 'flex', flexDirection: 'column', gap: '5px'
                }}>
                  <button 
                    onClick={() => handleDestinationChange(null)}
                    style={{
                      background: !selectedDestId ? 'rgba(255,122,0,0.1)' : 'transparent',
                      color: !selectedDestId ? 'var(--amazigh-amber)' : '#FFF',
                      border: 'none', padding: '10px 15px', borderRadius: '8px',
                      textAlign: 'left', cursor: 'pointer'
                    }}
                  >
                    {t("learnAllDestinations")}
                  </button>
                  {DESTINATIONS.map(dest => (
                    <button
                      key={dest.id}
                      onClick={() => handleDestinationChange(dest.id)}
                      style={{
                        background: selectedDestId === dest.id ? dest.accentColor : 'transparent',
                        color: '#FFF',
                        border: 'none', padding: '10px 15px', borderRadius: '8px',
                        textAlign: 'left', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '8px'
                      }}
                    >
                      <span>{dest.emoji}</span>
                      {t(dest.nameKey)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="learn-hero-metrics" style={{ marginTop: '30px' }}>
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
        </section>

        {/* Path Grid: 3 Pillars */}
        <section className="learn-path-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          
          {/* Darija */}
          <button
            type="button"
            className="learn-path-card learn-path-card--primary"
            onClick={() => setActiveHub("darija")}
          >
            <div className="learn-path-card__icon">
              <MessageCircle size={26} />
            </div>
            <div className="learn-path-card__eyebrow">{t("learnPathDarijaEyebrow")}</div>
            <h2 className="learn-path-card__title">{t("learnPathDarijaTitle")}</h2>
            <p className="learn-path-card__desc">{t("learnPathDarijaDesc")}</p>
            <div className="learn-path-card__tags">
              <span className="learn-tag">{t("learnTagAirport")}</span>
              <span className="learn-tag">{t("learnTagCafe")}</span>
              <span className="learn-tag">{t("learnTagEmergencies")}</span>
            </div>
            <span className="learn-path-card__cta">{t("learnPathDarijaCTA")}</span>
          </button>

          {/* Tifinagh */}
          <button
            type="button"
            className="learn-path-card"
            onClick={() => setActiveHub("tifinagh")}
          >
            <div className="learn-path-card__icon learn-path-card__icon--secondary">
              <Compass size={26} />
            </div>
            <div className="learn-path-card__eyebrow">{t("learnPathTifinaghEyebrow")}</div>
            <h2 className="learn-path-card__title">{t("learnPathTifinaghTitle")}</h2>
            <p className="learn-path-card__desc">{t("learnPathTifinaghDesc")}</p>
            <div className="learn-path-card__tags">
              <span className="learn-tag">{t("learnTagAlphabet")}</span>
              <span className="learn-tag">{t("learnTagCalligraphy")}</span>
              <span className="learn-tag">{t("learnTagCities")}</span>
            </div>
            <span className="learn-path-card__cta learn-path-card__cta--secondary">
              {t("learnPathTifinaghCTA")}
            </span>
          </button>

          {/* Travel Tips */}
          <button
            type="button"
            className="learn-path-card"
            onClick={() => setActiveHub("tips")}
            style={{ borderColor: 'rgba(74, 144, 226, 0.3)' }}
          >
            <div className="learn-path-card__icon" style={{ background: 'rgba(74, 144, 226, 0.1)', color: '#4A90E2', borderColor: 'rgba(74, 144, 226, 0.2)' }}>
              <Coffee size={26} />
            </div>
            <div className="learn-path-card__eyebrow" style={{ color: '#4A90E2' }}>{t("learnPathTipsEyebrow")}</div>
            <h2 className="learn-path-card__title">{t("learnPathTipsTitle")}</h2>
            <p className="learn-path-card__desc">{t("learnPathTipsDesc")}</p>
            <div className="learn-path-card__tags">
              <span className="learn-tag">{t("learnTagNegotiation")}</span>
              <span className="learn-tag">{t("learnTagEtiquette")}</span>
              <span className="learn-tag">{t("learnTagTea")}</span>
            </div>
            <span className="learn-path-card__cta" style={{ color: '#4A90E2' }}>
              {t("learnPathTipsCTA")}
            </span>
          </button>
        </section>

        {/* Quick Phrases Contextual Strip */}
        <section className="learn-glass-panel learn-guide-strip" style={{ 
          background: currentDest ? currentDest.accentColor : 'rgba(255,255,255,0.02)',
          border: `1px solid ${currentDest ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'}`
        }}>
          <div className="learn-guide-strip__label">
            <Info size={18} />
            <span>{currentDest ? `${t("learnPhrasesFor")} ${t(currentDest.nameKey)}` : t("learnUniversalPhrases")}</span>
          </div>
          <div className="learn-guide-strip__content">
            {currentDest ? (
              currentDest.quickPhrases.map((qp, idx) => (
                <span key={idx} className="learn-guide-pill" title={t(qp.key)}>{qp.darija}</span>
              ))
            ) : (
              <>
                <span className="learn-guide-pill">{t("learnFallbackPhrase1")}</span>
                <span className="learn-guide-pill">{t("learnFallbackPhrase2")}</span>
                <span className="learn-guide-pill">{t("learnFallbackPhrase3")}</span>
                <span className="learn-guide-pill">{t("learnFallbackPhrase4")}</span>
              </>
            )}
            <p style={{ marginTop: '10px' }}>
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
