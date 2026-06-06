import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Heart, X, Trash2 } from "lucide-react";
import { getFavoriteMissions, unfavoriteMission } from "../../../utils/storage";
import { getMissionTitle } from "../../../utils/progress";

function FavoriteMissions({ lang, isRTL, onClose }) {
  const navigate = useNavigate();
  const items = getFavoriteMissions();

  const handleRemove = (track, num) => {
    unfavoriteMission(track, num);
    onClose("refresh");
  };

  const handleItemClick = (item) => {
    navigate(`/languages/${item.track}/mission-${item.missionNum}`);
  };

  const trackLabel = (track) => track.charAt(0).toUpperCase() + track.slice(1);
  const ui = (fr, en, ar) => lang === "FR" ? fr : lang === "AR" ? ar : en;

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
            <Heart size={20} style={{ color: "var(--learn-error, #ef4444)" }} />
            <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700, color: "var(--apprendre-text-primary)" }}>
              {ui("Leçons Favorites", "Favorite Lessons", "الدروس المفضلة")}
            </h3>
          </div>
          <button onClick={() => onClose()} className="mission-close" style={{ position: "static", width: 36, height: 36 }}>
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div style={{ padding: "60px 24px", textAlign: "center" }}>
            <Heart size={40} style={{ color: "var(--apprendre-text-secondary)", marginBottom: "16px", opacity: 0.4 }} />
            <p style={{ color: "var(--apprendre-text-secondary)", fontSize: "1rem", margin: 0 }}>
              {ui("Ajoutez des leçons à vos favoris.", "Add lessons to your favorites.", "أضف الدروس إلى مفضلتك.")}
            </p>
          </div>
        ) : (
          <div style={{ padding: "12px 8px", overflowY: "auto", flex: 1 }}>
            {items.map((item, idx) => {
              const title = getMissionTitle(item.track, item.missionNum, lang);
              return (
                <div
                  key={`${item.track}_${item.missionNum}`}
                  style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    padding: "14px 16px", borderRadius: "14px",
                    cursor: "pointer", transition: "background 0.2s"
                  }}
                  onClick={() => handleItemClick(item)}
                  onMouseEnter={e => { e.currentTarget.style.background = "var(--apprendre-hover, rgba(0,0,0,0.04))"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                >
                  <Heart size={16} style={{ color: "var(--learn-error, #ef4444)", flexShrink: 0, fill: "currentColor" }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: "1rem", color: "var(--apprendre-text-primary)" }}>
                      {title}
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "var(--apprendre-text-secondary)" }}>
                      {trackLabel(item.track)} — {ui("Mission", "Mission", "المهمة")} {item.missionNum}
                    </div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleRemove(item.track, item.missionNum); }}
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      padding: "6px", color: "var(--learn-text-secondary, #9ca3af)",
                      transition: "color 0.2s", flexShrink: 0
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = "var(--learn-error, #ef4444)"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "var(--learn-text-secondary, #9ca3af)"; }}
                    title={ui("Supprimer", "Remove", "إزالة")}
                  >
                    <Trash2 size={16} />
                  </button>
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
          {ui(`${items.length} leçon${items.length > 1 ? "s" : ""} favorite${items.length > 1 ? "s" : ""}`,
              `${items.length} favorite lesson${items.length > 1 ? "s" : ""}`,
              `${items.length} درس${items.length > 1 ? " " : ""}مفضل${items.length > 1 ? "ة" : ""}`)}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default FavoriteMissions;
