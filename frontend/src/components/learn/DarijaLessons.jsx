import React, { useState } from "react";
import { AlertCircle, CheckCircle, Search, Volume2 } from "lucide-react";
import { darijaVocab } from "./data/darijaData";
import { getWordMastery, recordWordAttempt } from "./data/gamificationEngine";
import { useLanguage } from "../accueil/LanguageContext";

const FILTER_ALL = "all";
const FILTER_RECOMMENDED = "recommended";
const FILTER_REVIEW = "review";

const DarijaLessons = ({ onXpEarned, learnedWords = [], onMarkLearned, selectedDestination }) => {
  const { t, lang } = useLanguage();
  const [filter, setFilter] = useState(FILTER_ALL);
  const [search, setSearch] = useState("");
  const [masteryData, setMasteryData] = useState(getWordMastery());

  const categoryOptions = [
    { id: FILTER_ALL, label: t("learnAll") },
    ...(selectedDestination ? [{ id: FILTER_RECOMMENDED, label: t("learnRecommended") }] : []),
    { id: FILTER_REVIEW, label: t("learnToReview") },
    ...Array.from(new Set(darijaVocab.map((item) => item.categoryKey))).map((categoryKey) => ({
      id: categoryKey,
      label: t(categoryKey)
    }))
  ];

  const filteredVocab = darijaVocab.filter((vocab) => {
    if (filter === FILTER_REVIEW) {
      const stats = masteryData[vocab.id];
      return stats && stats.attempts > 0 && stats.correct / stats.attempts < 0.5;
    }

    if (filter === FILTER_RECOMMENDED && selectedDestination) {
      return (
        vocab.destinationRelevance &&
        (vocab.destinationRelevance.includes("all") || vocab.destinationRelevance.includes(selectedDestination))
      );
    }

    if (filter === FILTER_RECOMMENDED) {
      return vocab.tags && vocab.tags.includes("essential");
    }

    const matchesCategory = filter === FILTER_ALL || vocab.categoryKey === filter;
    const wordTranslation = lang === "FR" ? vocab.french : lang === "EN" ? vocab.english : vocab.french;
    const matchesSearch =
      vocab.darija.toLowerCase().includes(search.toLowerCase()) ||
      wordTranslation.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleRevision = (id, isCorrect, event) => {
    event.stopPropagation();
    recordWordAttempt(id, isCorrect);
    setMasteryData(getWordMastery());
    if (isCorrect) {
      onXpEarned(5);
    }
  };

  const speakAudio = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ar-MA";
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleLearn = (id, event) => {
    event.stopPropagation();
    if (!learnedWords.includes(id)) {
      onMarkLearned(id);
      onXpEarned(10);
    }
  };

  return (
    <div className="darija-lessons">
      <div className="learn-glass-panel learn-toolbar-panel">
        <div className="learn-panel-intro">
          <h2>{t("learnDarijaLessonsTitle")}</h2>
          <p>{t("learnDarijaLessonsDesc")}</p>
        </div>

        <div className="learn-toolbar">
          {selectedDestination && (
            <button
              type="button"
              className={`pill-btn ${filter === FILTER_RECOMMENDED ? "active" : ""}`}
              onClick={() => setFilter(FILTER_RECOMMENDED)}
            >
              {t("learnRecommended")}
            </button>
          )}

          <label className="learn-search">
            <Search size={18} />
            <input
              type="text"
              value={search}
              placeholder={t("learnSearchPlaceholder")}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <select value={filter} onChange={(event) => setFilter(event.target.value)} className="learn-select">
            {categoryOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="learn-card-grid learn-card-grid--vocab">
        {filteredVocab.map((vocab) => {
          const isLearned = learnedWords.includes(vocab.id);
          const stats = masteryData[vocab.id];
          const isWeak = stats && stats.attempts > 0 && stats.correct / stats.attempts < 0.5;
          const wordTranslation = lang === "FR" ? vocab.french : lang === "EN" ? vocab.english : vocab.french;

          return (
            <article
              key={vocab.id}
              className={`myth-card vocab-card ${isLearned ? "is-learned" : ""} ${isWeak ? "is-weak" : ""}`}
            >
              <div className="myth-card-inner">
                <div className={`myth-front vocab-card__front ${isWeak ? "heat-level-high" : ""}`}>
                  <div className="zellige-pattern" />
                  <div className="vocab-card__meta">
                    <span className="vocab-card__category">{t(vocab.categoryKey)}</span>
                    <div className="vocab-card__actions">
                      {isLearned && !isWeak && <CheckCircle size={18} color="var(--amazigh-amber)" />}
                      {isWeak && <AlertCircle size={18} color="var(--amazigh-crimson)" />}
                      <button type="button" className="icon-ghost-btn" onClick={(event) => {
                        event.stopPropagation();
                        speakAudio(vocab.darija);
                      }}>
                        <Volume2 size={20} />
                      </button>
                    </div>
                  </div>

                  <h3 className="vocab-card__word">{vocab.darija}</h3>
                  <p className="vocab-card__hint">{t("learnHoverTranslate")}</p>
                </div>

                <div className="myth-back vocab-card__back">
                  <h3 className="vocab-card__translation">{wordTranslation}</h3>
                  <div className="vocab-card__difficulty">
                    {t("learnDifficulty")}:{" "}
                    <span>{vocab.difficulty === 1 ? "I" : vocab.difficulty === 2 ? "II" : "III"} / III</span>
                  </div>

                  {!isLearned ? (
                    <button type="button" className="learn-chip-btn learn-chip-btn--primary" onClick={(event) => handleLearn(vocab.id, event)}>
                      {t("learnMarkLearned")}
                    </button>
                  ) : (
                    <div className="vocab-card__review-actions">
                      <button
                        type="button"
                        className="learn-chip-btn learn-chip-btn--muted"
                        onClick={(event) => handleRevision(vocab.id, false, event)}
                      >
                        {t("learnToReview")}
                      </button>
                      <button
                        type="button"
                        className="learn-chip-btn learn-chip-btn--strong"
                        onClick={(event) => handleRevision(vocab.id, true, event)}
                      >
                        {t("learnKnown")}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default DarijaLessons;
