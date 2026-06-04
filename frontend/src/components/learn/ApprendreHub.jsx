import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Type, Compass, ArrowRight } from "lucide-react";
import { useLanguage } from "../accueil/LanguageContext";
import "./apprendre.css";

const ApprendreHub = () => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
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
        <p className="apprendre-subtitle">
          {t("learnHeroCopy")}
        </p>
      </motion.div>

      <motion.div 
        className="apprendre-cards-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Darija Card */}
        <motion.div className="apprendre-card darija-card" variants={itemVariants}>
          <div className="card-header">
            <div className="card-icon-wrapper darija-icon">
              <MessageCircle size={32} strokeWidth={1.5} />
            </div>
            <span className="card-eyebrow">{t("learnPathDarijaEyebrow")}</span>
          </div>
          <h2 className="card-title">{t("learnPathDarijaTitle")}</h2>
          <p className="card-desc">{t("learnPathDarijaDesc")}</p>
          <button className="card-btn group" onClick={() => navigate("/learn/darija/mission-1")}>
            <span>{t("learnPathDarijaCTA")}</span>
            <ArrowRight size={20} className={`transition-transform duration-300 ${isRTL ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
          </button>
          {/* Subtle Decorative SVG for Darija */}
          <svg className="card-decoration" viewBox="0 0 100 100" preserveAspectRatio="xMaxYMax meet">
            <path fill="currentColor" d="M70,100 L70,50 L75,50 L75,45 L72,45 L72,30 L65,30 L65,45 L62,45 L62,50 L67,50 L67,100 Z" />
            <path fill="currentColor" d="M72,25 A3,3 0 1,0 65,25 A3,3 0 1,0 72,25" />
            <rect fill="currentColor" x="63" y="30" width="11" height="70" />
            <rect fill="currentColor" x="65" y="20" width="7" height="10" />
            <circle fill="currentColor" cx="68.5" cy="15" r="2" />
            <circle fill="currentColor" cx="68.5" cy="10" r="1.5" />
            <circle fill="currentColor" cx="68.5" cy="6" r="1" />
          </svg>
        </motion.div>

        {/* Tifinagh Card */}
        <motion.div className="apprendre-card tifinagh-card" variants={itemVariants}>
          <div className="card-header">
            <div className="card-icon-wrapper tifinagh-icon">
              <Type size={32} strokeWidth={1.5} />
            </div>
            <span className="card-eyebrow">{t("learnPathTifinaghEyebrow")}</span>
          </div>
          <h2 className="card-title">{t("learnPathTifinaghTitle")}</h2>
          <p className="card-desc">{t("learnPathTifinaghDesc")}</p>
          <button className="card-btn group" onClick={() => navigate("/learn/tifinagh/mission-1")}>
            <span>{t("learnPathTifinaghCTA")}</span>
            <ArrowRight size={20} className={`transition-transform duration-300 ${isRTL ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
          </button>
          {/* Subtle Decorative SVG for Tifinagh */}
          <svg className="card-decoration" viewBox="0 0 100 100" preserveAspectRatio="xMaxYMax meet">
            <path fill="currentColor" d="M30,100 L60,60 L90,100 Z" />
            <path fill="currentColor" d="M60,100 L85,70 L110,100 Z" />
            <path fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" d="M75,20 L75,50 M55,35 L95,35 M55,20 L55,50 M95,20 L95,50" />
          </svg>
        </motion.div>

        {/* Culture Card */}
        <motion.div className="apprendre-card culture-card" variants={itemVariants}>
          <div className="card-header">
            <div className="card-icon-wrapper culture-icon">
              <Compass size={32} strokeWidth={1.5} />
            </div>
            <span className="card-eyebrow">{t("learnPathTipsEyebrow")}</span>
          </div>
          <h2 className="card-title">{t("learnPathTipsTitle")}</h2>
          <p className="card-desc">{t("learnPathTipsDesc")}</p>
          <button className="card-btn group">
            <span>{t("learnPathTipsCTA")}</span>
            <ArrowRight size={20} className={`transition-transform duration-300 ${isRTL ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
          </button>
          {/* Subtle Decorative SVG for Culture */}
          <svg className="card-decoration" viewBox="0 0 100 100" preserveAspectRatio="xMaxYMax meet">
            <path fill="currentColor" d="M75,80 C85,80 90,70 90,60 C90,50 80,45 75,45 L70,40 L60,40 C60,35 65,30 65,25 L45,25 C45,30 50,35 50,40 L40,40 L35,45 C30,45 20,50 20,60 C20,70 25,80 35,80 Z" />
            <path fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" d="M90,60 C95,60 98,65 95,70" />
            <path fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" d="M20,60 C10,60 10,70 20,75" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ApprendreHub;
