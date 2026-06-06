import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  X, ArrowRight, ArrowLeft, CheckCircle, XCircle, UtensilsCrossed, AlertTriangle,
  Award, Users, Hand, Share2, Heart, MapPin, Sparkles, Coffee, ChefHat, Home
} from "lucide-react";
import { useLanguage } from "../../accueil/LanguageContext";
import { useAuth } from "../../../context/AuthContext";
import CultureCompletion from "./CultureCompletion";
import "../darija/mission.css";
import { useAutoProgress, canAccessMission } from "../../../utils/progress";
import LockedScreen from "../common/LockedScreen";
import FavoriteButton from "../common/FavoriteButton";
import SaveVocabButton from "../common/SaveVocabButton";

const STEPS = ["intro", "dishes", "etiquette", "situations", "mistakes", "journey", "challenge", "quiz", "completion"];

const STEP_LABELS = {
  intro: { FR: "Bienvenue", EN: "Welcome", AR: "مرحباً" },
  dishes: { FR: "Plats Emblématiques", EN: "Iconic Dishes", AR: "أطباق شهيرة" },
  etiquette: { FR: "Étiquette", EN: "Dining Etiquette", AR: "آداب الطعام" },
  situations: { FR: "Scénarios", EN: "Dining Scenarios", AR: "سيناريوهات" },
  mistakes: { FR: "Erreurs", EN: "Common Mistakes", AR: "أخطاء شائعة" },
  journey: { FR: "Voyage Culinaire", EN: "Food Journey", AR: "رحلة غذائية" },
  challenge: { FR: "Défi", EN: "Food Challenge", AR: "تحدي الطعام" },
  quiz: { FR: "Quiz Final", EN: "Final Quiz", AR: "الاختبار النهائي" },
  completion: { FR: "Achèvement", EN: "Completion", AR: "اكتمال" }
};

function CultureMission3() {
  const { t, lang, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedDish, setSelectedDish] = useState(0);
  const [selectedEtiquette, setSelectedEtiquette] = useState(0);
  const [expandedMistake, setExpandedMistake] = useState(0);

  const [currentSituationIndex, setCurrentSituationIndex] = useState(0);
  const [situationFeedback, setSituationFeedback] = useState(null);

  const [challengeIndex, setChallengeIndex] = useState(0);
  const [challengeFeedback, setChallengeFeedback] = useState(null);
  const [challengeCompleted, setChallengeCompleted] = useState([]);

  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizFeedback, setQuizFeedback] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStepIndex]);

  const step = STEPS[currentStepIndex];
  useAutoProgress(step);
  const progressPercent = (currentStepIndex / (STEPS.length - 1)) * 100;

  const ui = (fr, en, ar) => (lang === "FR" ? fr : lang === "AR" ? ar : en);
  const getStepLabel = (key) => STEP_LABELS[key]?.[lang] || STEP_LABELS[key]?.EN || key;

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) setCurrentStepIndex(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentStepIndex > 0) setCurrentStepIndex(prev => prev - 1);
  };

  const introStories = [
    { icon: <ChefHat size={22} />, text: t("cultureM3IntroFoodCulture") },
    { icon: <Users size={22} />, text: t("cultureM3IntroFamilyMeals") },
    { icon: <Share2 size={22} />, text: t("cultureM3IntroSharing") },
    { icon: <MapPin size={22} />, text: t("cultureM3IntroRegional") }
  ];

  const dishesData = [
    { icon: "ChefHat", title: t("cultureM3Dish1Title"), desc: t("cultureM3Dish1Desc"), significance: t("cultureM3Dish1Significance"), region: t("cultureM3Dish1Region") },
    { icon: "UtensilsCrossed", title: t("cultureM3Dish2Title"), desc: t("cultureM3Dish2Desc"), significance: t("cultureM3Dish2Significance"), region: t("cultureM3Dish2Region") },
    { icon: "ChefHat", title: t("cultureM3Dish3Title"), desc: t("cultureM3Dish3Desc"), significance: t("cultureM3Dish3Significance"), region: t("cultureM3Dish3Region") },
    { icon: "UtensilsCrossed", title: t("cultureM3Dish4Title"), desc: t("cultureM3Dish4Desc"), significance: t("cultureM3Dish4Significance"), region: t("cultureM3Dish4Region") },
    { icon: "UtensilsCrossed", title: t("cultureM3Dish5Title"), desc: t("cultureM3Dish5Desc"), significance: t("cultureM3Dish5Significance"), region: t("cultureM3Dish5Region") },
    { icon: "Coffee", title: t("cultureM3Dish6Title"), desc: t("cultureM3Dish6Desc"), significance: t("cultureM3Dish6Significance"), region: t("cultureM3Dish6Region") }
  ];

  const etiquetteCards = [
    { icon: <Hand size={22} />, title: t("cultureM3Etiq1Title"), desc: t("cultureM3Etiq1Desc"), context: t("cultureM3Etiq1Context") },
    { icon: <Share2 size={22} />, title: t("cultureM3Etiq2Title"), desc: t("cultureM3Etiq2Desc"), context: t("cultureM3Etiq2Context") },
    { icon: <UtensilsCrossed size={22} />, title: t("cultureM3Etiq3Title"), desc: t("cultureM3Etiq3Desc"), context: t("cultureM3Etiq3Context") },
    { icon: <Heart size={22} />, title: t("cultureM3Etiq4Title"), desc: t("cultureM3Etiq4Desc"), context: t("cultureM3Etiq4Context") }
  ];

  const situationsData = [
    {
      icon: "Home",
      q: t("cultureM3Sit1Q"),
      options: [t("cultureM3Sit1A1"), t("cultureM3Sit1A2"), t("cultureM3Sit1A3")],
      correctIdx: 1,
      feedbackCorrect: t("cultureM3Sit1FeedbackCorrect"),
      feedbackWrong: t("cultureM3Sit1FeedbackWrong")
    },
    {
      icon: "Coffee",
      q: t("cultureM3Sit2Q"),
      options: [t("cultureM3Sit2A1"), t("cultureM3Sit2A2"), t("cultureM3Sit2A3")],
      correctIdx: 1,
      feedbackCorrect: t("cultureM3Sit2FeedbackCorrect"),
      feedbackWrong: t("cultureM3Sit2FeedbackWrong")
    },
    {
      icon: "UtensilsCrossed",
      q: t("cultureM3Sit3Q"),
      options: [t("cultureM3Sit3A1"), t("cultureM3Sit3A2"), t("cultureM3Sit3A3")],
      correctIdx: 1,
      feedbackCorrect: t("cultureM3Sit3FeedbackCorrect"),
      feedbackWrong: t("cultureM3Sit3FeedbackWrong")
    }
  ];

  const mistakesData = [
    { title: t("cultureM3Mistake1Title"), why: t("cultureM3Mistake1Why"), bad: t("cultureM3Mistake1Bad"), good: t("cultureM3Mistake1Good") },
    { title: t("cultureM3Mistake2Title"), why: t("cultureM3Mistake2Why"), bad: t("cultureM3Mistake2Bad"), good: t("cultureM3Mistake2Good") },
    { title: t("cultureM3Mistake3Title"), why: t("cultureM3Mistake3Why"), bad: t("cultureM3Mistake3Bad"), good: t("cultureM3Mistake3Good") }
  ];

  const journeyData = [
    { icon: <MapPin size={24} />, title: t("cultureM3JourneyMarrakechTitle"), desc: t("cultureM3JourneyMarrakechDesc") },
    { icon: <ChefHat size={24} />, title: t("cultureM3JourneyFesTitle"), desc: t("cultureM3JourneyFesDesc") },
    { icon: <Coffee size={24} />, title: t("cultureM3JourneyTangierTitle"), desc: t("cultureM3JourneyTangierDesc") },
    { icon: <UtensilsCrossed size={24} />, title: t("cultureM3JourneyAgadirTitle"), desc: t("cultureM3JourneyAgadirDesc") }
  ];

  const challengeData = [
    {
      q: t("cultureM3Ch1Q"),
      options: [t("cultureM3Ch1A1"), t("cultureM3Ch1A2"), t("cultureM3Ch1A3")],
      correctIdx: 1,
      feedbackCorrect: t("cultureM3Ch1FeedbackCorrect"),
      feedbackWrong: t("cultureM3Ch1FeedbackWrong")
    },
    {
      q: t("cultureM3Ch2Q"),
      options: [t("cultureM3Ch2A1"), t("cultureM3Ch2A2"), t("cultureM3Ch2A3")],
      correctIdx: 0,
      feedbackCorrect: t("cultureM3Ch2FeedbackCorrect"),
      feedbackWrong: t("cultureM3Ch2FeedbackWrong")
    },
    {
      q: t("cultureM3Ch3Q"),
      options: [t("cultureM3Ch3A1"), t("cultureM3Ch3A2"), t("cultureM3Ch3A3")],
      correctIdx: 1,
      feedbackCorrect: t("cultureM3Ch3FeedbackCorrect"),
      feedbackWrong: t("cultureM3Ch3FeedbackWrong")
    }
  ];

  const quizData = [
    { q: t("cultureM3QuizQ1"), options: [t("cultureM3QuizQ1O1"), t("cultureM3QuizQ1O2"), t("cultureM3QuizQ1O3")], answer: 0 },
    { q: t("cultureM3QuizQ2"), options: [t("cultureM3QuizQ2O1"), t("cultureM3QuizQ2O2"), t("cultureM3QuizQ2O3")], answer: 1 },
    { q: t("cultureM3QuizQ3"), options: [t("cultureM3QuizQ3O1"), t("cultureM3QuizQ3O2"), t("cultureM3QuizQ3O3")], answer: 0 },
    { q: t("cultureM3QuizQ4"), options: [t("cultureM3QuizQ4O1"), t("cultureM3QuizQ4O2"), t("cultureM3QuizQ4O3")], answer: 1 },
    { q: t("cultureM3QuizQ5"), options: [t("cultureM3QuizQ5O1"), t("cultureM3QuizQ5O2"), t("cultureM3QuizQ5O3")], answer: 0 }
  ];

  const iconMap = {
    ChefHat, UtensilsCrossed, Coffee, Home
  };

  const handleSituationAnswer = (idx) => {
    if (situationFeedback) return;
    setSituationFeedback(idx === situationsData[currentSituationIndex].correctIdx ? "correct" : "wrong");
  };

  const handleNextSituation = () => {
    if (currentSituationIndex < situationsData.length - 1) {
      setCurrentSituationIndex(prev => prev + 1);
      setSituationFeedback(null);
    } else {
      handleNext();
    }
  };

  const handleChallengeAnswer = (idx) => {
    if (challengeFeedback) return;
    const isCorrect = idx === challengeData[challengeIndex].correctIdx;
    setChallengeFeedback(isCorrect ? "correct" : "wrong");
    if (isCorrect) setChallengeCompleted(prev => [...prev, challengeIndex]);
  };

  const handleNextChallenge = () => {
    if (challengeIndex < challengeData.length - 1) {
      setChallengeIndex(prev => prev + 1);
      setChallengeFeedback(null);
    } else {
      handleNext();
    }
  };

  const handleQuizAnswer = (idx) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    const isCorrect = idx === quizData[quizQuestionIndex].answer;
    setQuizFeedback(isCorrect ? "correct" : "wrong");

    setTimeout(() => {
      if (isCorrect) {
        if (quizQuestionIndex < quizData.length - 1) {
          setQuizQuestionIndex(prev => prev + 1);
          setSelectedOption(null);
          setQuizFeedback(null);
        } else {
          handleNext();
        }
      } else {
        setSelectedOption(null);
        setQuizFeedback(null);
      }
    }, 1500);
  };

  const renderFeedback = (feedback, correctText, wrongText, onContinue, onRetry) => (
    <AnimatePresence>
      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          style={{
            padding: "16px 20px", borderRadius: 16, marginTop: 16,
            background: feedback === "correct" ? "rgba(52,199,89,0.1)" : "rgba(255,59,48,0.1)",
            color: feedback === "correct" ? "var(--learn-success)" : "var(--learn-error)",
            display: "flex", flexDirection: "column", gap: 12
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {feedback === "correct" ? <CheckCircle size={22} /> : <XCircle size={22} />}
            <span style={{ fontWeight: 600, lineHeight: 1.4 }}>
              {feedback === "correct" ? correctText : wrongText}
            </span>
          </div>
          {feedback === "correct" && (
            <button className="mission-btn" style={{ alignSelf: "center", marginTop: 8 }} onClick={onContinue}>
              {ui("Continuer", "Continue", "متابعة")}
              <ArrowRight size={18} />
            </button>
          )}
          {feedback === "wrong" && (
            <button className="mission-btn secondary" style={{ alignSelf: "center", marginTop: 8 }} onClick={onRetry}>
              {ui("Réessayer", "Retry", "حاول مرة أخرى")}
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );

  const currentDish = dishesData[selectedDish];
  const currentEtiq = etiquetteCards[selectedEtiquette];

  const pathMatch = window.location.pathname.match(/\/languages\/(\w+)\/mission-(\d+)/);
  const currentTrack = pathMatch?.[1];
  const currentMissionNum = pathMatch?.[2] ? parseInt(pathMatch[2]) : 0;
  if (currentTrack && currentMissionNum && !canAccessMission(currentTrack, currentMissionNum, user)) {
    return <LockedScreen track={currentTrack} />;
  }
  return (
    <div className={`mission-container culture-theme ${isRTL ? "rtl" : "ltr"}`}>
      <div className="mission-header">
        <button className="mission-close" onClick={() => navigate("/languages")}>
          <X size={24} />
        </button>
        <FavoriteButton track="culture" missionNum={3} />
        <div className="mission-progress-bar">
          <div className="mission-progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      <div className="step-indicator">
        <span className="step-indicator-number">
          {ui(`Étape ${currentStepIndex + 1}/${STEPS.length}`, `Step ${currentStepIndex + 1}/${STEPS.length}`, `الخطوة ${currentStepIndex + 1}/${STEPS.length}`)}
        </span>
        <span className="step-indicator-name">{getStepLabel(step)}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="mission-content"
        >
          {/* STEP 1 — Welcome to Moroccan Cuisine */}
          {step === "intro" && (
            <div className="intro-step">
              <div className="intro-icon">
                <UtensilsCrossed size={40} />
              </div>
              <h1 className="intro-title">{t("cultureM3Title")}</h1>
              <div className="culture-intro-hero">
                <Sparkles size={20} style={{ color: "var(--learn-accent)", marginBottom: 8 }} />
                <p style={{ margin: 0, fontStyle: "italic" }}>{t("cultureM3IntroStory")}</p>
              </div>
              <p className="intro-desc">{t("cultureM3IntroDesc")}</p>
              <div className="culture-story-grid">
                {introStories.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="culture-story-pill"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="culture-story-pill-icon">{item.icon}</div>
                    <p style={{ margin: 0, fontSize: "0.9rem", lineHeight: 1.55, color: "var(--learn-text-secondary)" }}>{item.text}</p>
                  </motion.div>
                ))}
              </div>
              <button className="mission-btn" style={{ marginTop: 32 }} onClick={handleNext}>
                {ui("Commencer la mission", "Start Mission", "ابدأ المهمة")}
              </button>
            </div>
          )}

          {/* STEP 2 — Discover Iconic Dishes */}
          {step === "dishes" && (
            <div>
              <h2 className="step-title">{t("cultureM3DishesTitle")}</h2>
              <p className="step-subtitle">{t("cultureM3DishesDesc")}</p>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 24 }}>
                {dishesData.map((dish, idx) => (
                  <button
                    key={idx}
                    className={`vocab-card culture-card-override ${selectedDish === idx ? "selected" : ""}`}
                    style={{ flex: "1 1 80px", maxWidth: 100, padding: 14, cursor: "pointer", textAlign: "center" }}
                    onClick={() => setSelectedDish(idx)}
                  >
                    {(() => { const Ic = iconMap[dish.icon]; return <Ic size={24} />; })()}
                    <div style={{ fontSize: "0.7rem", fontWeight: 600, marginTop: 6, color: selectedDish === idx ? "var(--learn-accent)" : "var(--learn-text-secondary)" }}>
                      {dish.title}
                    </div>
                  </button>
                ))}
              </div>

              <motion.div
                key={selectedDish}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="vocab-card culture-card-override"
                style={{ padding: 28 }}
              >
                <div style={{ textAlign: "center", marginBottom: 16 }}>
                  {(() => { const Ic = iconMap[currentDish.icon]; return <Ic size={56} />; })()}
                  <h3 style={{ margin: "12px 0 0", fontSize: "1.35rem", fontWeight: 700, color: "var(--learn-accent)" }}>{currentDish.title}</h3>
                  <div style={{ fontSize: "0.85rem", color: "var(--learn-text-secondary)", marginTop: 4 }}>{currentDish.region}</div>
                </div>
                <p style={{ lineHeight: 1.65, margin: "0 0 14px", color: "var(--learn-text)" }}>{currentDish.desc}</p>
                <div style={{
                  padding: "14px 18px", borderRadius: 12,
                  background: "rgba(21,128,61,0.06)", border: "1px solid rgba(21,128,61,0.2)"
                }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--learn-accent)", marginBottom: 6, textTransform: "uppercase" }}>
                    {ui("Signification culturelle", "Cultural significance", "الأهمية الثقافية")}
                  </div>
                  <p style={{ margin: 0, fontSize: "0.92rem", lineHeight: 1.6, color: "var(--learn-text-secondary)" }}>{currentDish.significance}</p>
                </div>
              </motion.div>
            </div>
          )}

          {/* STEP 3 — Dining Etiquette */}
          {step === "etiquette" && (
            <div>
              <h2 className="step-title">{t("cultureM3EtiqTitle")}</h2>
              <p className="step-subtitle">{t("cultureM3EtiqDesc")}</p>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 24 }}>
                {etiquetteCards.map((card, idx) => (
                  <button
                    key={idx}
                    className={`vocab-card culture-card-override ${selectedEtiquette === idx ? "selected" : ""}`}
                    style={{ flex: "1 1 120px", maxWidth: 150, padding: 16, cursor: "pointer", textAlign: "center" }}
                    onClick={() => setSelectedEtiquette(idx)}
                  >
                    <div style={{ color: "var(--learn-accent)", display: "flex", justifyContent: "center", marginBottom: 8 }}>{card.icon}</div>
                    <div style={{ fontSize: "0.78rem", fontWeight: 600, color: selectedEtiquette === idx ? "var(--learn-accent)" : "var(--learn-text-secondary)" }}>
                      {card.title}
                    </div>
                  </button>
                ))}
              </div>

              <motion.div
                key={selectedEtiquette}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="vocab-card culture-card-override"
                style={{ padding: 28 }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                  <div style={{ color: "var(--learn-accent)", background: "rgba(21,128,61,0.1)", padding: 12, borderRadius: 12 }}>
                    {currentEtiq.icon}
                  </div>
                  <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700, color: "var(--learn-accent)" }}>{currentEtiq.title}</h3>
                  <SaveVocabButton id={'culture_3_' + selectedEtiquette} word={currentEtiq.title} translation={currentEtiq.desc} track="culture" missionNum={3} type="tip" />
                </div>
                <p style={{ lineHeight: 1.65, margin: "0 0 16px", color: "var(--learn-text)" }}>{currentEtiq.desc}</p>
                <div style={{
                  padding: "14px 18px", borderRadius: 12,
                  background: "rgba(21,128,61,0.06)", border: "1px solid rgba(21,128,61,0.2)"
                }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--learn-accent)", marginBottom: 6, textTransform: "uppercase" }}>
                    {ui("En pratique", "In practice", "عملياً")}
                  </div>
                  <p style={{ margin: 0, fontSize: "0.92rem", lineHeight: 1.6, color: "var(--learn-text-secondary)" }}>{currentEtiq.context}</p>
                </div>
              </motion.div>
            </div>
          )}

          {/* STEP 4 — Real Dining Scenarios */}
          {step === "situations" && (() => {
            const currentSit = situationsData[currentSituationIndex];
            return (
              <div>
                <h2 className="step-title" style={{ textAlign: "center" }}>{t("cultureM3SitTitle")}</h2>
                <p className="step-subtitle" style={{ textAlign: "center" }}>
                  {t("cultureM3SitDesc")} ({currentSituationIndex + 1}/{situationsData.length})
                </p>

                <div className="vocab-card culture-card-override" style={{ padding: "32px 24px", maxWidth: 600, margin: "0 auto" }}>
                  <div style={{ textAlign: "center", marginBottom: 16 }}>
                    {(() => { const Ic = iconMap[currentSit.icon]; return <Ic size={48} />; })()}
                  </div>
                  <div className="quiz-question">{currentSit.q}</div>
                  <div className="quiz-options">
                    {currentSit.options.map((opt, idx) => {
                      let btnClass = "quiz-option";
                      if (situationFeedback) {
                        if (idx === currentSit.correctIdx) btnClass += " correct";
                        else if (situationFeedback === "wrong") btnClass += " wrong";
                      }
                      return (
                        <button
                          key={idx}
                          className={btnClass}
                          onClick={() => handleSituationAnswer(idx)}
                          disabled={situationFeedback !== null}
                        >
                          <span style={{ fontWeight: 700, marginRight: 8 }}>{String.fromCharCode(65 + idx)}.</span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {renderFeedback(
                    situationFeedback,
                    currentSit.feedbackCorrect,
                    currentSit.feedbackWrong,
                    handleNextSituation,
                    () => setSituationFeedback(null)
                  )}
                </div>
              </div>
            );
          })()}

          {/* STEP 5 — Common Mistakes */}
          {step === "mistakes" && (
            <div>
              <h2 className="step-title" style={{ textAlign: "center" }}>
                <AlertTriangle size={24} style={{ display: "inline", verticalAlign: "middle", marginRight: 8, color: "var(--learn-accent)" }} />
                {t("cultureM3MistakesTitle")}
              </h2>
              <p className="step-subtitle" style={{ textAlign: "center" }}>{t("cultureM3MistakesDesc")}</p>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 20 }}>
                {mistakesData.map((m, idx) => (
                  <button
                    key={idx}
                    className={`mission-btn ${expandedMistake === idx ? "" : "secondary"}`}
                    style={{ padding: "10px 16px", fontSize: "0.85rem" }}
                    onClick={() => setExpandedMistake(idx)}
                  >
                    {m.title}
                  </button>
                ))}
              </div>

              <motion.div
                key={expandedMistake}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="vocab-card culture-card-override"
                style={{ padding: 24, maxWidth: 600, margin: "0 auto" }}
              >
                <h3 style={{ fontWeight: 700, fontSize: "1.15rem", marginBottom: 12, color: "var(--learn-accent)" }}>
                  {mistakesData[expandedMistake].title}
                </h3>
                <p className="culture-mistake-why">{mistakesData[expandedMistake].why}</p>
                <div style={{
                  display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12,
                  padding: "12px 16px", borderRadius: 12,
                  background: "rgba(255,59,48,0.08)", border: "1px solid rgba(255,59,48,0.2)"
                }}>
                  <XCircle size={20} style={{ color: "var(--learn-error)", flexShrink: 0, marginTop: 2 }} />
                  <span style={{ color: "var(--learn-error)", fontWeight: 500, lineHeight: 1.5 }}>{mistakesData[expandedMistake].bad}</span>
                </div>
                <div style={{
                  display: "flex", alignItems: "flex-start", gap: 12,
                  padding: "12px 16px", borderRadius: 12,
                  background: "rgba(52,199,89,0.08)", border: "1px solid rgba(52,199,89,0.2)"
                }}>
                  <CheckCircle size={20} style={{ color: "var(--learn-success)", flexShrink: 0, marginTop: 2 }} />
                  <span style={{ color: "var(--learn-success)", fontWeight: 500, lineHeight: 1.5 }}>{mistakesData[expandedMistake].good}</span>
                </div>
              </motion.div>
            </div>
          )}

          {/* STEP 6 — Cultural Food Journey */}
          {step === "journey" && (
            <div>
              <h2 className="step-title">{t("cultureM3JourneyTitle")}</h2>
              <p className="step-subtitle">{t("cultureM3JourneyDesc")}</p>
              <div className="culture-region-grid">
                {journeyData.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="vocab-card culture-card-override"
                    style={{ padding: 24 }}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.06 }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                      <div style={{ color: "var(--learn-accent)", background: "rgba(21,128,61,0.1)", padding: 10, borderRadius: 12 }}>
                        {item.icon}
                      </div>
                      <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "var(--learn-accent)" }}>{item.title}</h3>
                    </div>
                    <p style={{ margin: 0, lineHeight: 1.65, fontSize: "0.92rem", color: "var(--learn-text-secondary)" }}>{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 7 — Food Challenge */}
          {step === "challenge" && (() => {
            const ch = challengeData[challengeIndex];
            const allDone = challengeCompleted.length === challengeData.length && challengeIndex === challengeData.length - 1 && challengeFeedback === "correct";
            return (
              <div>
                <h2 className="step-title" style={{ textAlign: "center" }}>{t("cultureM3ChallengeTitle")}</h2>
                <p className="step-subtitle" style={{ textAlign: "center" }}>
                  {t("cultureM3ChallengeDesc")} ({challengeIndex + 1}/{challengeData.length})
                </p>

                <div className="culture-challenge-progress">
                  {challengeData.map((_, idx) => (
                    <div
                      key={idx}
                      className={`culture-challenge-dot ${challengeCompleted.includes(idx) ? "done" : idx === challengeIndex ? "active" : ""}`}
                    />
                  ))}
                </div>

                <div className="vocab-card culture-card-override" style={{ padding: "32px 24px", maxWidth: 600, margin: "0 auto" }}>
                  <div className="quiz-question">{ch.q}</div>
                  <div className="quiz-options">
                    {ch.options.map((opt, idx) => {
                      let btnClass = "quiz-option";
                      if (challengeFeedback) {
                        if (idx === ch.correctIdx) btnClass += " correct";
                        else btnClass += " wrong";
                      }
                      return (
                        <button
                          key={idx}
                          className={btnClass}
                          onClick={() => handleChallengeAnswer(idx)}
                          disabled={challengeFeedback !== null}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {renderFeedback(
                    challengeFeedback,
                    ch.feedbackCorrect,
                    ch.feedbackWrong,
                    handleNextChallenge,
                    () => setChallengeFeedback(null)
                  )}
                  {allDone && (
                    <div className="culture-challenge-reward">
                      <Award size={32} style={{ color: "var(--learn-accent)", marginBottom: 8 }} />
                      <p style={{ margin: 0, fontWeight: 600, color: "var(--learn-accent)" }}>{t("cultureM3ChallengeSuccess")}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}

          {/* STEP 8 — Final Quiz */}
          {step === "quiz" && (
            <div>
              <h2 className="step-title" style={{ textAlign: "center" }}>{t("cultureM3QuizTitle")}</h2>
              <p className="step-subtitle" style={{ textAlign: "center" }}>
                {ui(`Question ${quizQuestionIndex + 1} sur ${quizData.length}`, `Question ${quizQuestionIndex + 1} of ${quizData.length}`, `السؤال ${quizQuestionIndex + 1} من ${quizData.length}`)}
              </p>

              <div className="quiz-card culture-card-override" style={{ maxWidth: 600, margin: "0 auto" }}>
                <div className="quiz-question">{quizData[quizQuestionIndex].q}</div>
                <div className="quiz-options">
                  {quizData[quizQuestionIndex].options.map((opt, idx) => {
                    let btnClass = "quiz-option";
                    if (selectedOption === idx) {
                      if (quizFeedback === "correct") btnClass += " correct";
                      else if (quizFeedback === "wrong") btnClass += " wrong";
                      else btnClass += " selected";
                    } else if (selectedOption !== null && idx === quizData[quizQuestionIndex].answer && quizFeedback === "wrong") {
                      btnClass += " correct";
                    }
                    return (
                      <button
                        key={idx}
                        className={btnClass}
                        onClick={() => handleQuizAnswer(idx)}
                        disabled={selectedOption !== null}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                <div className={`quiz-feedback ${quizFeedback ? (quizFeedback === "correct" ? "correct-text" : "wrong-text") : ""}`}>
                  {quizFeedback === "correct" && ui("Excellent !", "Excellent!", "ممتاز!")}
                  {quizFeedback === "wrong" && ui("Oops, essayez encore.", "Oops, try again.", "عفواً، حاول مرة أخرى.")}
                </div>
              </div>
            </div>
          )}

          {/* STEP 9 — Completion */}
          {step === "completion" && (
            <CultureCompletion
              missionNumber={3}
              completeTitle={t("cultureM3CompleteTitle")}
              completeDesc={t("cultureM3CompleteDesc")}
              nextMissionTitle={t("cultureM4Title")}
              nextMissionPath="/languages/culture/mission-4"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {(step === "dishes" || step === "etiquette" || step === "mistakes" || step === "journey") && (
        <div className="mission-footer">
          <button className="mission-btn secondary" onClick={handleBack}>
            <ArrowLeft size={18} />
            {ui("Précédent", "Back", "السابق")}
          </button>
          <button className="mission-btn" onClick={handleNext}>
            {ui("Continuer", "Continue", "متابعة")}
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}

export default CultureMission3;
