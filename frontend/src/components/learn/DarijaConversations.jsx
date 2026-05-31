import React, { useState } from "react";
import { CheckCircle, Coffee, Lock, MapPin, MessageCircle, Store, XCircle } from "lucide-react";
import { darijaConversations } from "./data/darijaData";
import { useLanguage } from "../accueil/LanguageContext";

const DarijaConversations = ({
  onXpEarned,
  unlockedAchievements,
  onAchievementUnlock,
  currentLevel = 1,
  selectedDestination
}) => {
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
    if (feedback) return;

    setFeedback({ isCorrect: option.isCorrect, text: option.feedback, option });

    if (option.isCorrect) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      oscillator.connect(audioContext.destination);
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);

      setTimeout(() => {
        if (stepIndex + 1 < activeScenario.steps.length) {
          setStepIndex((previous) => previous + 1);
          setFeedback(null);
        } else {
          setCompleted(true);
          onXpEarned(activeScenario.xpReward);

          if (!unlockedAchievements.includes("darija_speaker")) {
            onAchievementUnlock("darija_speaker");
          }
        }
      }, 2000);

      return;
    }

    setShake(true);
    setTimeout(() => setShake(false), 300);

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.type = "sine";
    oscillator.connect(audioContext.destination);
    oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(120, audioContext.currentTime + 0.1);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);

    setTimeout(() => {
      setFeedback(null);
    }, 3000);
  };

  const getScenarioIcon = (scenarioId) => {
    if (scenarioId.includes("cafe")) {
      return <Coffee size={48} color="var(--amazigh-amber)" />;
    }

    if (scenarioId.includes("souk")) {
      return <Store size={48} color="var(--amazigh-amber)" />;
    }

    return <MapPin size={48} color="var(--amazigh-amber)" />;
  };

  if (!activeScenario) {
    return (
      <div className="darija-scenarios">
        <div className="learn-panel-intro learn-panel-intro--centered">
          <h2>{t("learnLifeScenarios")}</h2>
          <p>{t("learnPracticeDarija")}</p>
        </div>

        <div className="quiz-modes">
          {darijaConversations.map((scenario) => {
            const isLocked = scenario.id === "petit_taxi" && currentLevel < 2;
            const isDestinationSpecific =
              selectedDestination &&
              scenario.destinationRelevance &&
              (scenario.destinationRelevance.includes("all") || scenario.destinationRelevance.includes(selectedDestination));

            return (
              <article
                key={scenario.id}
                className={`quiz-mode-card learn-scenario-card ${isLocked ? "locked-feature-card" : ""} ${isDestinationSpecific ? "learn-scenario-card--recommended" : ""}`}
                onClick={() => !isLocked && startScenario(scenario)}
              >
                <div className="quiz-mode-icon">{getScenarioIcon(scenario.id)}</div>
                {isDestinationSpecific && <div className="learn-card-pill">{t("learnRecommended")}</div>}
                <h3>{scenario.title}</h3>
                <p>{scenario.description}</p>

                <div className="learn-scenario-card__meta">
                  <span>{scenario.difficulty}</span>
                  <strong>+{scenario.xpReward} XP</strong>
                </div>

                {isLocked && (
                  <div className="padlock-overlay">
                    <Lock size={24} color="var(--amazigh-amber)" />
                    <span>{t("learnLevelRequired")} {scenario.id === "souk_marrakech" ? "5" : "2"} {t("learnRequired")}</span>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="learn-glass-panel scenario-complete">
        <div className="scenario-complete__glow" />
        <div className="scenario-complete__content">
          <MessageCircle size={80} color="var(--amazigh-amber)" />
          <h2>{t("learnScenarioCompleted")}</h2>
          <p>{t("learnScenarioSuccess")}</p>
          <div className="scenario-complete__xp">+{activeScenario.xpReward} XP</div>
          <button type="button" className="btn-primary" onClick={() => setActiveScenario(null)}>
            {t("learnBackToScenarios")}
          </button>
        </div>
      </div>
    );
  }

  const currentStep = activeScenario.steps[stepIndex];

  return (
    <div className={`learn-glass-panel scenario-shell ${shake ? "arena-shake" : ""}`}>
      <div className="scenario-shell__head">
        <h3>{activeScenario.title}</h3>
        <span>{t("learnStep")} {stepIndex + 1} / {activeScenario.steps.length}</span>
      </div>

      <div className={`scenario-shell__conversation ${shake ? "haptic-shake" : ""}`}>
        <div className="scenario-shell__avatar">
          {activeScenario.id.includes("cafe") ? (
            <Coffee size={24} color="var(--text-primary)" />
          ) : activeScenario.id.includes("souk") ? (
            <Store size={24} color="var(--text-primary)" />
          ) : (
            <MapPin size={24} color="var(--text-primary)" />
          )}
        </div>

        <div className="cinematic-bubble">
          <div className="scenario-shell__bubble-head">
            <p className="scenario-shell__quote">"{currentStep.npcText}"</p>
            {currentStep.mood && <span className="scenario-shell__mood">{currentStep.mood}</span>}
          </div>
          <p className="scenario-shell__translation">{currentStep.translation}</p>
        </div>
      </div>

      <h4 className="scenario-shell__prompt">{t("learnWhatReply")}</h4>

      <div className="scenario-options">
        {currentStep.options.map((option, index) => {
          const classes = ["scenario-option"];

          if (feedback) {
            if (option.isCorrect) {
              classes.push("is-correct");
            } else if (!option.isCorrect && feedback.text === option.feedback) {
              classes.push("is-wrong");
            } else {
              classes.push("is-muted");
            }
          }

          return (
            <button
              key={index}
              type="button"
              className={classes.join(" ")}
              onClick={() => handleChoice(option)}
              disabled={feedback !== null}
            >
              <span>{option.text}</span>
              {feedback && option.isCorrect && <CheckCircle color="var(--amazigh-amber)" />}
              {feedback && !option.isCorrect && feedback.text === option.feedback && <XCircle color="var(--amazigh-crimson)" />}
            </button>
          );
        })}
      </div>

      {feedback && (
        <div className="scenario-feedback">
          <p>
            {feedback.isCorrect ? <CheckCircle size={18} color="var(--text-primary)" /> : <XCircle size={18} color="var(--amazigh-crimson)" />}
            {feedback.text}
          </p>
          {feedback.option.moodImpact && (
            <span>{t("learnReaction")}: {feedback.option.moodImpact}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default DarijaConversations;
