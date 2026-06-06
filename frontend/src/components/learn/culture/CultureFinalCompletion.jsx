import React from "react";
import { useNavigate } from "react-router-dom";
import { Award, CheckCircle, ArrowRight } from "lucide-react";
import { useLanguage } from "../../accueil/LanguageContext";

const MISSION_KEYS = [
  { titleKey: "cultureM1Title", descKey: null },
  { titleKey: "cultureM2Title", descKey: null },
  { titleKey: "cultureM3Title", descKey: null },
  { titleKey: "cultureM4Title", descKey: null },
  { titleKey: "cultureM5Title", descKey: null },
  { titleKey: "cultureM6Title", descKey: null }
];

function CultureFinalCompletion() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();

  const ui = (fr, en, ar) => (lang === "FR" ? fr : lang === "AR" ? ar : en);

  return (
    <div className="completion-step">
      <div className="completion-icon">
        <Award size={56} />
      </div>
      <h1 className="intro-title">{t("cultureM6FinalTitle")}</h1>
      <p className="intro-desc">{t("cultureM6FinalDesc")}</p>

      <div style={{
        marginTop: 30, textAlign: "left", background: "var(--learn-surface)",
        padding: 24, borderRadius: 16, border: "2px solid var(--learn-success)",
        width: "100%", maxWidth: 460
      }}>
        <h4 style={{ marginBottom: 16, fontSize: "1.1rem", fontWeight: 700, color: "var(--learn-accent)", textAlign: "center" }}>
          {ui("Parcours Culturel Marocain", "Moroccan Culture Path", "المسار الثقافي المغربي")}
        </h4>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {MISSION_KEYS.map((mission, idx) => (
            <div key={idx} style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "12px 16px", borderRadius: 12,
              background: "rgba(var(--learn-accent-rgb), 0.06)", border: "1px solid rgba(var(--learn-accent-rgb), 0.15)"
            }}>
              <div className="completion-check" style={{ flexShrink: 0 }}>
                <CheckCircle size={22} />
              </div>
              <div style={{ fontWeight: 500, color: "var(--learn-text)", fontSize: "0.95rem" }}>
                {t(mission.titleKey)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 16, marginTop: 40, flexWrap: "wrap", justifyContent: "center" }}>
        <button className="mission-btn" onClick={() => navigate("/languages")}>
          {t("cultureM6ReturnHub")}
          <ArrowRight size={20} />
        </button>
        <button className="mission-btn secondary" onClick={() => navigate("/languages")}>
          {t("cultureM6ExploreOther")}
        </button>
      </div>
    </div>
  );
}

export default CultureFinalCompletion;
