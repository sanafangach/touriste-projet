import React from "react";
import { useNavigate } from "react-router-dom";
import { Award, CheckCircle, Lock, ArrowRight } from "lucide-react";
import { useLanguage } from "../../accueil/LanguageContext";

const MISSION_TITLE_KEYS = [
  "cultureM1Title",
  "cultureM2Title",
  "cultureM3Title",
  "cultureM4Title",
  "cultureM5Title",
  "cultureM6Title"
];

function CultureCompletion({ missionNumber, completeTitle, completeDesc, nextMissionTitle, nextMissionPath }) {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();

  const ui = (fr, en, ar) => (lang === "FR" ? fr : lang === "AR" ? ar : en);

  return (
    <div className="completion-step">
      <div className="completion-icon">
        <Award size={48} />
      </div>
      <h1 className="intro-title">{completeTitle}</h1>
      <p className="intro-desc">{completeDesc}</p>

      {nextMissionPath && nextMissionTitle && (
        <div
          className="next-mission-card"
          style={{ cursor: "pointer", borderColor: "var(--learn-success)", opacity: 1, maxWidth: 460, width: "100%" }}
          onClick={() => navigate(nextMissionPath)}
        >
          <div className="next-icon" style={{ background: "var(--learn-success)", color: "#ffffff" }}>
            <Lock size={24} />
          </div>
          <div className="next-info">
            <h4>{ui("Prochaine mission débloquée", "Next mission unlocked", "تم فتح المهمة التالية")}</h4>
            <p style={{ fontWeight: 600, color: "var(--learn-text)" }}>{nextMissionTitle}</p>
          </div>
        </div>
      )}

      <div style={{
        marginTop: 30, textAlign: "left", background: "var(--learn-surface)",
        padding: 20, borderRadius: 16, border: "1px solid var(--learn-border)",
        width: "100%", maxWidth: 460
      }}>
        <h4 style={{ marginBottom: 16, fontSize: "1.1rem", fontWeight: 600 }}>
          {ui("Progression", "Progression", "التقدم")}
        </h4>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {MISSION_TITLE_KEYS.map((key, idx) => {
            const num = idx + 1;
            if (num <= missionNumber) {
              return (
                <div key={num} className="completion-progress-done" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <CheckCircle size={20} />
                  <span style={{ fontWeight: 500 }}>{t(key)}</span>
                </div>
              );
            }
            if (num === missionNumber + 1) {
              return (
                <div key={num} className="completion-progress-current" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Lock size={20} />
                  <span style={{ fontWeight: 500 }}>{t(key)}</span>
                </div>
              );
            }
            return (
              <div key={num} className="completion-progress-locked" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Lock size={20} />
                <span>{t(key)}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: "flex", gap: 16, marginTop: 40, flexWrap: "wrap", justifyContent: "center" }}>
        <button className="mission-btn secondary" onClick={() => navigate("/languages")}>
          {ui("Retour à l'accueil", "Return to Learning Hub", "العودة للرئيسية")}
        </button>
        {nextMissionPath && (
          <button className="mission-btn" onClick={() => navigate(nextMissionPath)}>
            {ui("Continuer la mission suivante", "Continue to Next Mission", "متابعة المهمة التالية")}
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}

export default CultureCompletion;
