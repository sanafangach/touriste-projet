import React from "react";
import { useNavigate } from "react-router-dom";
import { Lock, ArrowRight, Home } from "lucide-react";
import { useLanguage } from "../../accueil/LanguageContext";
import { getFirstUnlockedMission } from "../../../utils/progress";

function LockedScreen({ track }) {
  const { lang } = useLanguage();
  const navigate = useNavigate();

  const firstUnlocked = getFirstUnlockedMission(track);

  return (
    <div className="mission-container" style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      minHeight: "100vh"
    }}>
      <div style={{
        textAlign: "center", maxWidth: "480px", padding: "40px 24px"
      }}>
        <div style={{
          width: "80px", height: "80px", borderRadius: "50%",
          background: "var(--learn-surface)", border: "2px solid var(--learn-border)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 24px", color: "var(--learn-text-secondary)"
        }}>
          <Lock size={36} />
        </div>

        <h1 style={{
          fontSize: "1.8rem", fontWeight: 700, marginBottom: "12px",
          color: "var(--learn-text)"
        }}>
          {lang === "FR" ? "Mission Verrouillée" :
           lang === "AR" ? "المهمة مقفلة" : "Mission Locked"}
        </h1>

        <p style={{
          fontSize: "1.05rem", color: "var(--learn-text-secondary)",
          lineHeight: "1.6", marginBottom: "32px"
        }}>
          {lang === "FR"
            ? "Complétez les missions précédentes pour débloquer cette leçon."
            : lang === "AR"
            ? "أكمل المهام السابقة لفتح هذا الدرس."
            : "Complete previous missions to unlock this lesson."}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
          <button
            className="mission-btn"
            onClick={() => navigate("/languages")}
            style={{ width: "100%", justifyContent: "center" }}
          >
            <Home size={18} />
            <span style={{ margin: "0 8px" }}>
              {lang === "FR" ? "Retour au Hub d'Apprentissage" :
               lang === "AR" ? "العودة إلى لوحة التعلم" :
               "Return to Learning Hub"}
            </span>
          </button>

          {firstUnlocked && (
            <button
              className="mission-btn secondary"
              onClick={() => navigate(`/languages/${track}/mission-${firstUnlocked}`)}
              style={{ width: "100%", justifyContent: "center" }}
            >
              <span style={{ margin: "0 8px" }}>
                {lang === "FR" ? "Aller à la Mission Disponible" :
                 lang === "AR" ? "الذهاب إلى المهمة المتاحة" :
                 "Go To Available Mission"}
              </span>
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default LockedScreen;
