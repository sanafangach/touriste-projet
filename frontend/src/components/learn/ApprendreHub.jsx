import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Type, Compass, ArrowRight, CheckCircle, Lock, LockOpen, BookOpen } from "lucide-react";
import { useLanguage } from "../accueil/LanguageContext";
import { getCompletedMissions, getPathTotalMissions, getPathProgress, getOverallProgress, getTotalCompleted, getTotalMissions, getFirstUnlockedMission } from "../../utils/progress";
import "./apprendre.css";

const tracks = [
  {
    id: "darija",
    icon: MessageCircle,
    iconWrapper: "darija-icon",
    cardClass: "darija-card",
    navigateTo: "/languages/darija/mission-1",
    titleKey: "learnPathDarijaTitle",
    descKey: "learnPathDarijaDesc",
    ctaKey: "learnPathDarijaCTA",
    eyebrowKey: "learnPathDarijaEyebrow",
  },
  {
    id: "tifinagh",
    icon: Type,
    iconWrapper: "tifinagh-icon",
    cardClass: "tifinagh-card",
    navigateTo: "/languages/tifinagh/mission-1",
    titleKey: "learnPathTifinaghTitle",
    descKey: "learnPathTifinaghDesc",
    ctaKey: "learnPathTifinaghCTA",
    eyebrowKey: "learnPathTifinaghEyebrow",
  },
  {
    id: "culture",
    icon: Compass,
    iconWrapper: "culture-icon",
    cardClass: "culture-card",
    navigateTo: "/languages/culture/mission-1",
    titleKey: "learnPathTipsTitle",
    descKey: "learnPathTipsDesc",
    ctaKey: "learnPathTipsCTA",
    eyebrowKey: "learnPathTipsEyebrow",
  },
];

function ProgressBar({ percent }) {
  return (
    <div style={{
      width: "100%", height: "8px", background: "var(--apprendre-border)",
      borderRadius: "999px", overflow: "hidden", marginTop: "8px"
    }}>
      <div style={{
        width: `${percent}%`, height: "100%",
        background: "linear-gradient(90deg, var(--learn-accent, #d97706), var(--learn-accent, #d97706))",
        borderRadius: "999px", transition: "width 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
      }} />
    </div>
  );
}

const ApprendreHub = () => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handle = () => setRefreshKey(k => k + 1);
    window.addEventListener("storage", handle);
    return () => window.removeEventListener("storage", handle);
  }, []);

  const overallProgress = getOverallProgress();
  const totalCompleted = getTotalCompleted();
  const totalMissions = getTotalMissions();

  const handleCardClick = (track) => {
    const firstUnlocked = getFirstUnlockedMission(track.id);
    if (firstUnlocked !== null) {
      navigate(`/languages/${track.id}/mission-${firstUnlocked}`);
    } else {
      navigate(track.navigateTo);
    }
  };

  const getStatusInfo = (track) => {
    const completed = getCompletedMissions(track.id);
    const total = getPathTotalMissions(track.id);
    const done = completed === total;
    const progress = getPathProgress(track.id);
    return { completed, total, done, progress };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1, y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
  };

  return (
    <div className={`apprendre-foundation ${isRTL ? "rtl" : "ltr"}`}>
      <motion.div
        className="apprendre-hero"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="apprendre-badge">Amudux Learning</span>
        <h1 className="apprendre-title">{t("learnHeroTitle")}</h1>
        <p className="apprendre-subtitle">{t("learnHeroCopy")}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          width: "100%", maxWidth: "1200px", marginBottom: "48px",
          background: "var(--apprendre-surface)", borderRadius: "24px",
          border: "1px solid var(--apprendre-border)", overflow: "hidden",
          boxShadow: "var(--apprendre-shadow-md)"
        }}
      >
        <div style={{
          padding: "28px 32px",
          borderBottom: "1px solid var(--apprendre-border)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: "12px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <BookOpen size={24} style={{ color: "var(--apprendre-text-primary)" }} />
            <h3 style={{
              fontSize: "1.25rem", fontWeight: 700,
              color: "var(--apprendre-text-primary)", margin: 0
            }}>
              {isRTL ? "ملخص التعلم" : "Learning Summary"}
            </h3>
          </div>
          <div style={{
            fontSize: "2rem", fontWeight: 800,
            color: "var(--apprendre-brand, #d97706)",
            letterSpacing: "-0.02em"
          }}>
            {overallProgress}%
          </div>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px", padding: "24px 32px"
        }}>
          {tracks.map(track => {
            const { completed, total, done, progress } = getStatusInfo(track);
            return (
              <div key={track.id} style={{
                display: "flex", flexDirection: "column", gap: "6px"
              }}>
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  fontSize: "0.85rem", fontWeight: 600,
                  color: "var(--apprendre-text-secondary)"
                }}>
                  <span>{t(track.titleKey)}</span>
                  <span style={{
                    display: "flex", alignItems: "center", gap: "4px",
                    color: done ? "var(--learn-success, #10b981)" : "var(--apprendre-text-primary)"
                  }}>
                    {completed}/{total}
                    {done && <CheckCircle size={14} />}
                  </span>
                </div>
                <ProgressBar percent={progress} />
              </div>
            );
          })}
        </div>
        <div style={{
          padding: "12px 32px 16px",
          borderTop: "1px solid var(--apprendre-border)",
          fontSize: "0.9rem", fontWeight: 500,
          color: "var(--apprendre-text-secondary)",
          display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px"
        }}>
          <span>
            {isRTL
              ? `${totalCompleted} من ${totalMissions} مهام مكتملة`
              : `${totalCompleted} / ${totalMissions} Missions Completed`}
          </span>
          <span style={{ fontWeight: 700, color: "var(--apprendre-text-primary)" }}>
            {overallProgress}% {isRTL ? "اكتمال" : "Complete"}
          </span>
        </div>
      </motion.div>

      <motion.div
        className="apprendre-cards-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={refreshKey}
      >
        {tracks.map((track) => {
          const { completed, total, done, progress } = getStatusInfo(track);
          const Icon = track.icon;
          const firstUnlocked = getFirstUnlockedMission(track.id);
          const hasUnlocked = firstUnlocked !== null;
          const statusLabel = done
            ? (isRTL ? "مكتمل" : "Completed")
            : hasUnlocked
            ? (isRTL ? "متاح" : "Available")
            : (isRTL ? "مقفل" : "Locked");
          const StatusIcon = done ? CheckCircle : (hasUnlocked ? LockOpen : Lock);
          const statusClass = done ? "completed" : (hasUnlocked ? "available" : "coming-soon");

          return (
            <motion.div
              key={track.id}
              className={`apprendre-card ${track.cardClass} cursor-pointer`}
              variants={itemVariants}
              onClick={() => handleCardClick(track)}
              style={{ opacity: hasUnlocked || done ? 1 : 0.6 }}
            >
              <div className="card-header">
                <div className={`card-icon-wrapper ${track.iconWrapper}`}>
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                <div className="card-header-meta">
                  <span className={`card-status ${statusClass}`}
                    style={done ? {
                      background: "rgba(16, 185, 129, 0.12)",
                      color: "var(--learn-success, #10b981)",
                      display: "inline-flex", alignItems: "center", gap: "4px"
                    } : hasUnlocked ? {} : {}}
                  >
                    <StatusIcon size={12} />
                    {statusLabel}
                  </span>
                  <span className="card-eyebrow">{t(track.eyebrowKey)}</span>
                </div>
              </div>
              <h2 className="card-title">{t(track.titleKey)}</h2>
              <p className="card-desc">{t(track.descKey)}</p>
              <div style={{ marginBottom: "16px" }}>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  fontSize: "0.85rem", fontWeight: 600,
                  color: done ? "var(--learn-success, #10b981)" : "var(--apprendre-text-secondary)",
                  marginBottom: "6px"
                }}>
                  <span>{done
                    ? (isRTL ? "مكتمل" : "Completed")
                    : `${completed} / ${total} ${isRTL ? "مكتمل" : "Completed"}`}
                  </span>
                  <span>{done ? "100%" : `${progress}%`}</span>
                </div>
                <ProgressBar percent={progress} />
              </div>
              <button className="card-btn group" onClick={(e) => { e.stopPropagation(); handleCardClick(track); }}>
                <span>{done
                  ? (isRTL ? "مراجعة" : "Review")
                  : hasUnlocked
                  ? (isRTL ? "متابعة" : "Continue Journey")
                  : (isRTL ? "مقفل" : "Locked")}
                </span>
                {done ? <CheckCircle size={20} /> : hasUnlocked
                  ? <ArrowRight size={20} className={`transition-transform duration-300 ${isRTL ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
                  : <Lock size={20} />}
              </button>
              <svg className="card-decoration" viewBox="0 0 100 100" preserveAspectRatio="xMaxYMax meet">
                {track.id === "darija" && (
                  <>
                    <path fill="currentColor" d="M70,100 L70,50 L75,50 L75,45 L72,45 L72,30 L65,30 L65,45 L62,45 L62,50 L67,50 L67,100 Z" />
                    <path fill="currentColor" d="M72,25 A3,3 0 1,0 65,25 A3,3 0 1,0 72,25" />
                    <rect fill="currentColor" x="63" y="30" width="11" height="70" />
                    <rect fill="currentColor" x="65" y="20" width="7" height="10" />
                    <circle fill="currentColor" cx="68.5" cy="15" r="2" />
                    <circle fill="currentColor" cx="68.5" cy="10" r="1.5" />
                    <circle fill="currentColor" cx="68.5" cy="6" r="1" />
                  </>
                )}
                {track.id === "tifinagh" && (
                  <>
                    <path fill="currentColor" d="M30,100 L60,60 L90,100 Z" />
                    <path fill="currentColor" d="M60,100 L85,70 L110,100 Z" />
                    <path fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" d="M75,20 L75,50 M55,35 L95,35 M55,20 L55,50 M95,20 L95,50" />
                  </>
                )}
                {track.id === "culture" && (
                  <>
                    <path fill="currentColor" d="M75,80 C85,80 90,70 90,60 C90,50 80,45 75,45 L70,40 L60,40 C60,35 65,30 65,25 L45,25 C45,30 50,35 50,40 L40,40 L35,45 C30,45 20,50 20,60 C20,70 25,80 35,80 Z" />
                    <path fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" d="M90,60 C95,60 98,65 95,70" />
                    <path fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" d="M20,60 C10,60 10,70 20,75" />
                  </>
                )}
              </svg>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default ApprendreHub;
