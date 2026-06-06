import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Star, X, Trash2, MessageCircle, Type, Compass } from "lucide-react";
import { getSavedVocabulary, removeVocabularyItem } from "../../../utils/storage";
import { getMissionTitle } from "../../../utils/progress";

const TRACK_CONFIG = {
  darija: { icon: MessageCircle, color: "var(--learn-accent, #d97706)", label: { FR: "Darija", EN: "Darija", AR: "الدارجة" } },
  tifinagh: { icon: Type, color: "var(--learn-primary, #0369a1)", label: { FR: "Tifinagh", EN: "Tifinagh", AR: "تيفيناغ" } },
  culture: { icon: Compass, color: "var(--learn-success, #10b981)", label: { FR: "Culture", EN: "Culture", AR: "الثقافة" } }
};

function MyVocabulary({ lang, isRTL, onClose }) {
  const navigate = useNavigate();
  const items = getSavedVocabulary();

  const handleRemove = (id) => {
    removeVocabularyItem(id);
    onClose("refresh");
  };

  const handleItemClick = (item) => {
    navigate(`/languages/${item.track}/mission-${item.missionNum}`);
  };

  const ui = (fr, en, ar) => lang === "FR" ? fr : lang === "AR" ? ar : en;

  const groups = {
    darija: [],
    tifinagh: [],
    culture: []
  };
  items.forEach(item => {
    if (groups[item.track]) groups[item.track].push(item);
  });

  const trackOrder = ["darija", "tifinagh", "culture"];
  const hasAny = trackOrder.some(t => groups[t].length > 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px"
      }}
      onClick={() => onClose()}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: "var(--apprendre-surface)", borderRadius: "24px",
          border: "1px solid var(--apprendre-border)",
          boxShadow: "var(--apprendre-shadow-lg, 0 20px 60px rgba(0,0,0,0.15))",
          width: "100%", maxWidth: "520px", maxHeight: "80vh",
          overflow: "hidden", display: "flex", flexDirection: "column"
        }}
      >
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 24px",
          borderBottom: "1px solid var(--apprendre-border)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Star size={20} style={{ color: "var(--learn-accent, #d97706)" }} />
            <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700, color: "var(--apprendre-text-primary)" }}>
              {ui("Ma Collection d'Apprentissage", "My Learning Collection", "مجموعتي التعليمية")}
            </h3>
          </div>
          <button onClick={() => onClose()} className="mission-close" style={{ position: "static", width: 36, height: 36 }}>
            <X size={20} />
          </button>
        </div>

        {!hasAny ? (
          <div style={{ padding: "60px 24px", textAlign: "center" }}>
            <Star size={40} style={{ color: "var(--apprendre-text-secondary)", marginBottom: "16px", opacity: 0.4 }} />
            <p style={{ color: "var(--apprendre-text-secondary)", fontSize: "1rem", margin: 0 }}>
              {ui("Enregistrez du contenu pour commencer.", "Save content to get started.", "احفظ المحتوى لتبدأ.")}
            </p>
          </div>
        ) : (
          <div style={{ padding: "12px 8px", overflowY: "auto", flex: 1 }}>
            {trackOrder.map(track => {
              const trackItems = groups[track];
              if (trackItems.length === 0) return null;
              const config = TRACK_CONFIG[track];
              const Icon = config.icon;
              return (
                <div key={track} style={{ marginBottom: "16px" }}>
                  <div style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    padding: "8px 12px", marginBottom: "4px"
                  }}>
                    <Icon size={16} style={{ color: config.color }} />
                    <span style={{
                      fontSize: "0.85rem", fontWeight: 700, color: config.color,
                      textTransform: "uppercase", letterSpacing: "0.04em"
                    }}>
                      {config.label[lang] || config.label.EN}
                    </span>
                    <span style={{
                      fontSize: "0.75rem", fontWeight: 600, color: "var(--apprendre-text-secondary)",
                      marginLeft: "4px"
                    }}>
                      {trackItems.length}
                    </span>
                  </div>
                  {trackItems.map((item) => {
                    const title = getMissionTitle(item.track, item.missionNum, lang);
                    return (
                      <div
                        key={item.id}
                        style={{
                          display: "flex", alignItems: "center", gap: "12px",
                          padding: "10px 16px", borderRadius: "12px",
                          cursor: "pointer", transition: "background 0.2s",
                          margin: "2px 0"
                        }}
                        onClick={() => handleItemClick(item)}
                        onMouseEnter={e => { e.currentTarget.style.background = "var(--apprendre-hover, rgba(0,0,0,0.04))"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                      >
                        <Star size={14} style={{ color: config.color, flexShrink: 0, opacity: 0.6 }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--apprendre-text-primary)" }}>
                            {item.word}
                          </div>
                          <div style={{ fontSize: "0.8rem", color: "var(--apprendre-text-secondary)" }}>
                            {item.translation}
                          </div>
                          <div style={{ fontSize: "0.7rem", color: "var(--apprendre-text-secondary)", opacity: 0.7, marginTop: "2px" }}>
                            {ui("Mission", "Mission", "المهمة")} {item.missionNum} — {title}
                          </div>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleRemove(item.id); }}
                          style={{
                            background: "none", border: "none", cursor: "pointer",
                            padding: "6px", color: "var(--learn-text-secondary, #9ca3af)",
                            transition: "color 0.2s", flexShrink: 0
                          }}
                          onMouseEnter={e => { e.currentTarget.style.color = "var(--learn-error, #ef4444)"; }}
                          onMouseLeave={e => { e.currentTarget.style.color = "var(--learn-text-secondary, #9ca3af)"; }}
                          title={ui("Supprimer", "Remove", "إزالة")}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}

        <div style={{
          padding: "16px 24px",
          borderTop: "1px solid var(--apprendre-border)",
          fontSize: "0.85rem", fontWeight: 500,
          color: "var(--apprendre-text-secondary)",
          textAlign: "center"
        }}>
          {ui(`${items.length} élément${items.length > 1 ? "s" : ""} enregistré${items.length > 1 ? "s" : ""}`,
              `${items.length} item${items.length > 1 ? "s" : ""} saved`,
              `${items.length} ${items.length > 1 ? "عناصر محفوظة" : "عنصر محفوظ"}`)}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default MyVocabulary;
