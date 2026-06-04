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
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ApprendreHub;
