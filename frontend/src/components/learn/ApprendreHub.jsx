import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Type, Compass, ArrowRight, CheckCircle, Lock, LockOpen, BookOpen, BadgeCheck, List, Play, X, Star, Heart, Lightbulb } from "lucide-react";
import { useLanguage } from "../accueil/LanguageContext";
import {
  getCompletedMissions, getPathTotalMissions, getPathProgress, getOverallProgress,
  getTotalCompleted, getTotalMissions, getFirstUnlockedMission, isAdminUser,
  getMissionTitle, getMissionStatus, getContinueLearningInfo, isMissionCompleted, isMissionUnlocked
} from "../../utils/progress";
import { useAuth } from "../../context/AuthContext";
import { getSavedVocabCount, getFavoriteMissionsCount } from "../../utils/storage";
import MyVocabulary from "./common/MyVocabulary";
import FavoriteMissions from "./common/FavoriteMissions";
import RevisionMode from "./common/RevisionMode";
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
    label: "Darija"
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
    label: "Tifinagh"
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
    label: "Culture"
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

function MissionListModal({ track, lang, isRTL, onClose }) {
  const navigate = useNavigate();
  const total = getPathTotalMissions(track);

  const handleMissionClick = (missionNum) => {
    if (isMissionCompleted(track, missionNum) || isMissionUnlocked(track, missionNum)) {
      navigate(`/languages/${track}/mission-${missionNum}`);
    }
  };

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
      onClick={onClose}
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
          width: "100%", maxWidth: "480px", maxHeight: "80vh",
          overflow: "hidden", display: "flex", flexDirection: "column"
        }}
      >
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 24px",
          borderBottom: "1px solid var(--apprendre-border)"
        }}>
          <h3 style={{
            margin: 0, fontSize: "1.2rem", fontWeight: 700,
            color: "var(--apprendre-text-primary)"
          }}>
            {track === "darija" ? "Darija" : track === "tifinagh" ? "Tifinagh" : "Culture"}
          </h3>
          <button
            onClick={onClose}
            className="mission-close"
            style={{ position: "static", width: 36, height: 36 }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{
          padding: "12px 8px", overflowY: "auto", flex: 1
        }}>
          {Array.from({ length: total }, (_, i) => {
            const num = i + 1;
            const status = getMissionStatus(track, num);
            const title = getMissionTitle(track, num, lang);
            const isClickable = status === "completed" || status === "unlocked";

            let StatusIcon, iconColor;
            if (status === "completed") {
              StatusIcon = BadgeCheck;
              iconColor = "var(--learn-success, #10b981)";
            } else if (status === "unlocked") {
              StatusIcon = LockOpen;
              iconColor = "var(--learn-accent, #d97706)";
            } else {
              StatusIcon = Lock;
              iconColor = "var(--apprendre-text-secondary)";
            }

            return (
              <button
                key={num}
                onClick={() => isClickable && handleMissionClick(num)}
                disabled={!isClickable}
                style={{
                  display: "flex", alignItems: "center", gap: "14px",
                  width: "100%", padding: "14px 16px",
                  border: "none", borderRadius: "14px",
                  background: "transparent", cursor: isClickable ? "pointer" : "default",
                  opacity: status === "locked" ? 0.5 : 1,
                  transition: "all 0.2s",
                  textAlign: isRTL ? "right" : "left"
                }}
                onMouseEnter={e => { if (isClickable) e.currentTarget.style.background = "var(--apprendre-hover, rgba(0,0,0,0.04))"; }}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <StatusIcon size={22} style={{ color: iconColor, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: "0.8rem", fontWeight: 600,
                    color: "var(--apprendre-text-secondary)", marginBottom: "2px"
                  }}>
                    {isRTL ? `المهمة ${num}` : `Mission ${num}`}
                  </div>
                  <div style={{
                    fontSize: "0.95rem", fontWeight: 600,
                    color: isClickable ? "var(--apprendre-text-primary)" : "var(--apprendre-text-secondary)",
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
                  }}>
                    {title}
                  </div>
                </div>
                <div style={{
                  fontSize: "0.75rem", fontWeight: 600, padding: "3px 10px",
                  borderRadius: "999px", flexShrink: 0,
                  background: status === "completed" ? "rgba(16,185,129,0.12)" :
                              status === "unlocked" ? "rgba(var(--learn-accent-rgb, 217,119,6),0.12)" :
                              "rgba(0,0,0,0.05)",
                  color: status === "completed" ? "var(--learn-success, #10b981)" :
                         status === "unlocked" ? "var(--learn-accent, #d97706)" :
                         "var(--apprendre-text-secondary)"
                }}>
                  {status === "completed" ? (isRTL ? "مكتمل" : "Completed") :
                   status === "unlocked" ? (isRTL ? "متاح" : "Available") :
                   (isRTL ? "مقفل" : "Locked")}
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}

const ApprendreHub = () => {
  const { t, lang, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);
  const [modalTrack, setModalTrack] = useState(null);
  const [showVocab, setShowVocab] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showRevision, setShowRevision] = useState(false);
  const [hubRefresh, setHubRefresh] = useState(0);

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
  const continueInfo = getContinueLearningInfo();

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

  const renderSectionTitle = (icon, text) => (
    <div style={{
      width: "100%", maxWidth: "1200px", marginBottom: "20px",
      display: "flex", alignItems: "center", gap: "10px"
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: "10px",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "var(--apprendre-border)", color: "var(--apprendre-text-primary)"
      }}>
        {icon}
      </div>
      <h2 style={{
        margin: 0, fontSize: "1.3rem", fontWeight: 700,
        color: "var(--apprendre-text-primary)"
      }}>
        {text}
      </h2>
    </div>
  );

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

      {/* Continue Learning Section */}
      {continueInfo && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ width: "100%", maxWidth: "1200px" }}
        >
          {renderSectionTitle(
            <Play size={18} />,
            isRTL ? "مواصلة التعلم" : "Continue Learning"
          )}

          <div
            onClick={() => navigate(`/languages/${continueInfo.track}/mission-${continueInfo.missionNum}`)}
            style={{
              background: "var(--apprendre-surface)", borderRadius: "24px",
              border: "1px solid var(--apprendre-border)",
              boxShadow: "var(--apprendre-shadow-md)",
              padding: "24px 28px", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              gap: "16px", flexWrap: "wrap",
              transition: "all 0.25s",
              marginBottom: "40px"
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--learn-accent, #d97706)"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "var(--apprendre-shadow-lg)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--apprendre-border)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "var(--apprendre-shadow-md)"; }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px", minWidth: 0 }}>
              <div style={{
                width: "52px", height: "52px", borderRadius: "16px",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "linear-gradient(135deg, var(--learn-accent, #d97706), var(--learn-accent-secondary, #f59e0b))",
                color: "#fff", flexShrink: 0
              }}>
                <Play size={24} />
              </div>

              <div style={{ minWidth: 0 }}>
                <div style={{
                  fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase",
                  letterSpacing: "0.04em", color: "var(--apprendre-text-secondary)",
                  marginBottom: "4px"
                }}>
                  {isRTL ? `مسار ${continueInfo.track === "darija" ? "الدارجة" : continueInfo.track === "tifinagh" ? "تيفيناغ" : "الثقافة"}` :
                   `${continueInfo.track === "darija" ? "Darija" : continueInfo.track === "tifinagh" ? "Tifinagh" : "Culture"} Path`}
                </div>
                <div style={{
                  fontSize: "1.1rem", fontWeight: 700,
                  color: "var(--apprendre-text-primary)"
                }}>
                  {isRTL ? `المهمة ${continueInfo.missionNum}` : `Mission ${continueInfo.missionNum}`}
                  <span style={{
                    fontWeight: 500, color: "var(--apprendre-text-secondary)", marginLeft: "8px"
                  }}>
                    — {getMissionTitle(continueInfo.track, continueInfo.missionNum, lang)}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
              <div style={{
                fontSize: "0.9rem", fontWeight: 600,
                color: "var(--learn-accent, #d97706)",
                whiteSpace: "nowrap"
              }}>
                {isRTL ? "متابعة" : "Continue"}
              </div>
              <ArrowRight size={20} style={{
                color: "var(--learn-accent, #d97706)",
                transform: isRTL ? "rotate(180deg)" : "none"
              }} />
            </div>
          </div>
        </motion.div>
      )}

      {/* Learning Summary */}
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

      {/* Quick Access: My Vocabulary, Favorites, Revision */}
      <motion.div
        key={`quick-${hubRefresh}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px", width: "100%", maxWidth: "1200px", marginBottom: "48px"
        }}
      >
        {/* My Vocabulary */}
        <div
          onClick={() => setShowVocab(true)}
          style={{
            background: "var(--apprendre-surface)", borderRadius: "20px",
            border: "1px solid var(--apprendre-border)",
            boxShadow: "var(--apprendre-shadow-md)",
            padding: "20px", cursor: "pointer",
            transition: "all 0.25s",
            display: "flex", flexDirection: "column", gap: "12px"
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--learn-accent, #d97706)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--apprendre-border)"; e.currentTarget.style.transform = "none"; }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: 36, height: 36, borderRadius: "10px",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(var(--learn-accent-rgb, 217,119,6), 0.12)",
              color: "var(--learn-accent, #d97706)"
            }}>
              <Star size={18} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--apprendre-text-primary)" }}>
                {isRTL ? "مجموعتي التعليمية" : "My Learning Collection"}
              </div>
              <div style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--apprendre-text-secondary)" }}>
                {getSavedVocabCount()} {isRTL ? "كلمة محفوظة" : "word" + (getSavedVocabCount() !== 1 ? "s" : "")} {isRTL ? "" : "saved"}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <span style={{
              fontSize: "0.8rem", fontWeight: 600, color: "var(--learn-accent, #d97706)",
              display: "flex", alignItems: "center", gap: "4px"
            }}>
              {isRTL ? "فتح" : "Open"}
              <ArrowRight size={14} style={{ transform: isRTL ? "rotate(180deg)" : "none" }} />
            </span>
          </div>
        </div>

        {/* Favorite Lessons */}
        <div
          onClick={() => setShowFavorites(true)}
          style={{
            background: "var(--apprendre-surface)", borderRadius: "20px",
            border: "1px solid var(--apprendre-border)",
            boxShadow: "var(--apprendre-shadow-md)",
            padding: "20px", cursor: "pointer",
            transition: "all 0.25s",
            display: "flex", flexDirection: "column", gap: "12px"
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--learn-error, #ef4444)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--apprendre-border)"; e.currentTarget.style.transform = "none"; }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: 36, height: 36, borderRadius: "10px",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(239,68,68,0.12)",
              color: "var(--learn-error, #ef4444)"
            }}>
              <Heart size={18} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--apprendre-text-primary)" }}>
                {isRTL ? "الدروس المفضلة" : "Favorite Lessons"}
              </div>
              <div style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--apprendre-text-secondary)" }}>
                {getFavoriteMissionsCount()} {isRTL ? "درس" : "lesson" + (getFavoriteMissionsCount() !== 1 ? "s" : "")} {isRTL ? "مفضل" : "saved"}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <span style={{
              fontSize: "0.8rem", fontWeight: 600, color: "var(--learn-error, #ef4444)",
              display: "flex", alignItems: "center", gap: "4px"
            }}>
              {isRTL ? "فتح" : "Open"}
              <ArrowRight size={14} style={{ transform: isRTL ? "rotate(180deg)" : "none" }} />
            </span>
          </div>
        </div>

        {/* Revision Mode */}
        <div
          onClick={() => setShowRevision(true)}
          style={{
            background: "var(--apprendre-surface)", borderRadius: "20px",
            border: "1px solid var(--apprendre-border)",
            boxShadow: "var(--apprendre-shadow-md)",
            padding: "20px", cursor: "pointer",
            transition: "all 0.25s",
            display: "flex", flexDirection: "column", gap: "12px"
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--learn-success, #10b981)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--apprendre-border)"; e.currentTarget.style.transform = "none"; }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: 36, height: 36, borderRadius: "10px",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(16,185,129,0.12)",
              color: "var(--learn-success, #10b981)"
            }}>
              <Lightbulb size={18} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--apprendre-text-primary)" }}>
                {isRTL ? "وضع المراجعة" : "Revision Mode"}
              </div>
              <div style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--apprendre-text-secondary)" }}>
                {isRTL ? "مراجعة المفردات" : "Review vocabulary"}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <span style={{
              fontSize: "0.8rem", fontWeight: 600, color: "var(--learn-success, #10b981)",
              display: "flex", alignItems: "center", gap: "4px"
            }}>
              {isRTL ? "بدء المراجعة" : "Start Review"}
              <ArrowRight size={14} style={{ transform: isRTL ? "rotate(180deg)" : "none" }} />
            </span>
          </div>
        </div>
      </motion.div>

      {/* Learning Paths */}
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
          const isAdmin = isAdminUser(user);
          const firstUnlocked = getFirstUnlockedMission(track.id);
          const hasUnlocked = isAdmin || firstUnlocked !== null;
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
              className={`apprendre-card ${track.cardClass}`}
              variants={itemVariants}
              style={{ opacity: hasUnlocked || done ? 1 : 0.6 }}
            >
              <div
                className="cursor-pointer"
                onClick={() => handleCardClick(track)}
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
              </div>

              {/* View All Missions */}
              <div style={{ padding: "0 24px 20px" }}>
                <button
                  onClick={() => setModalTrack(track.id)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                    width: "100%", padding: "12px",
                    border: "1px solid var(--apprendre-border)", borderRadius: "12px",
                    background: "transparent", cursor: "pointer",
                    color: "var(--apprendre-text-secondary)", fontSize: "0.85rem", fontWeight: 600,
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "var(--apprendre-hover, rgba(0,0,0,0.03))"; e.currentTarget.style.borderColor = "var(--apprendre-text-secondary)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "var(--apprendre-border)"; }}
                >
                  <List size={16} />
                  {isRTL ? "عرض جميع المهام" : "View All Missions"}
                </button>
              </div>

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

      {/* Mission List Modal */}
      <AnimatePresence>
        {modalTrack && (
          <MissionListModal
            track={modalTrack}
            lang={lang}
            isRTL={isRTL}
            onClose={() => setModalTrack(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showVocab && (
          <MyVocabulary
            lang={lang}
            isRTL={isRTL}
            onClose={(refresh) => { setShowVocab(false); if (refresh) setTimeout(() => setHubRefresh(v => v + 1), 100); }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showFavorites && (
          <FavoriteMissions
            lang={lang}
            isRTL={isRTL}
            onClose={(refresh) => { setShowFavorites(false); if (refresh) setTimeout(() => setHubRefresh(v => v + 1), 100); }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showRevision && (
          <RevisionMode
            lang={lang}
            isRTL={isRTL}
            onClose={() => setShowRevision(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ApprendreHub;
