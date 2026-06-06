import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { saveVocabularyItem, removeVocabularyItem, isVocabularySaved } from "../../../utils/storage";

function SaveVocabButton({ id, word, translation, track, missionNum, type = "vocab" }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isVocabularySaved(id));
  }, [id]);

  const toggle = (e) => {
    e.stopPropagation();
    if (saved) {
      removeVocabularyItem(id);
      setSaved(false);
    } else {
      saveVocabularyItem({ id, word, translation, track, missionNum, type });
      setSaved(true);
    }
  };

  return (
    <button
      onClick={toggle}
      title={saved ? "Saved" : "Save"}
      style={{
        background: "none", border: "none", cursor: "pointer",
        padding: "4px", display: "inline-flex", alignItems: "center",
        color: saved ? "var(--learn-accent, #d97706)" : "var(--learn-text-secondary, #9ca3af)",
        transition: "color 0.2s, transform 0.2s"
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.2)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
    >
      <Star size={18} fill={saved ? "currentColor" : "none"} />
    </button>
  );
}

export default SaveVocabButton;
