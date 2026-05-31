import React, { useEffect, useState } from "react";
import { CheckCircle, Volume2, X } from "lucide-react";
import { tifinaghAlphabet } from "./data/tifnaghData";
import { useLanguage } from "../accueil/LanguageContext";

const AlphabetSystem = ({ learnedLetters, onMarkLearned }) => {
  const { t } = useLanguage();
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [filter, setFilter] = useState("all");

  const playAudio = (text, lang = "fr-FR") => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.85;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const categories = [
    { id: "all", label: t("learnCatAll") },
    { id: "voyelles", label: t("learnCatVowels") },
    { id: "consonnes", label: t("learnCatConsonants") },
    { id: "emphatiques", label: t("learnCatEmphatics") }
  ];

  const filteredAlphabet = filter === "all" ? tifinaghAlphabet : tifinaghAlphabet.filter((letter) => letter.category === filter);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedLetter(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="alphabet-system">
      <div className="alphabet-filter-bar">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={`alphabet-filter-btn ${filter === category.id ? "active" : ""}`}
            onClick={() => setFilter(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="alphabet-grid">
        {filteredAlphabet.map((item, index) => {
          const isLearned = learnedLetters.includes(item.char);

          return (
            <button
              key={index}
              type="button"
              className={`letter-card ${isLearned ? "learned" : ""}`}
              onClick={() => setSelectedLetter(item)}
            >
              <span className="letter-glyph">{item.char}</span>
              <span className="letter-latin">{item.transliteration}</span>
              {isLearned && (
                <span className="letter-card__status">
                  <CheckCircle size={14} />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {selectedLetter && (
        <div className="learn-modal-overlay" onClick={() => setSelectedLetter(null)}>
          <div className="learn-modal-content" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setSelectedLetter(null)}>
              <X size={24} />
            </button>

            <div className="modal-glyph">{selectedLetter.char}</div>

            <button
              type="button"
              className="modal-audio-btn"
              onClick={() => playAudio(selectedLetter.name, "ar-SA")}
              title={t("learnListenPronunciation")}
            >
              <Volume2 size={28} />
            </button>

            <div className="modal-details">
              <div>
                <span>{t("learnLatin")}</span>
                <strong>{selectedLetter.transliteration.toUpperCase()}</strong>
              </div>
              <div>
                <span>{t("learnName")}</span>
                <strong>{selectedLetter.name}</strong>
              </div>
              <div>
                <span>{t("learnPhonetics")}</span>
                <strong>/{selectedLetter.ipa}/</strong>
              </div>
              <div>
                <span>{t("learnDarijaEquivalent")}</span>
                <strong>{selectedLetter.da}</strong>
              </div>
            </div>

            <div className="learn-example-card">
              <span>{t("learnExample")}</span>
              <div className="learn-example-card__content">
                <strong>{selectedLetter.example}</strong>
                <button
                  type="button"
                  className="icon-ghost-btn"
                  onClick={() => playAudio(selectedLetter.wordMeaning, "fr-FR")}
                >
                  <Volume2 size={18} />
                </button>
              </div>
              <p>{selectedLetter.wordMeaning}</p>
            </div>

            {!learnedLetters.includes(selectedLetter.char) ? (
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  onMarkLearned(selectedLetter.char);
                  setSelectedLetter(null);
                }}
              >
                {t("learnMarkLearned")}
              </button>
            ) : (
              <button type="button" className="btn-primary btn-primary--success" onClick={() => setSelectedLetter(null)}>
                <CheckCircle size={18} />
                {t("learnLetterAcquired")}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AlphabetSystem;
