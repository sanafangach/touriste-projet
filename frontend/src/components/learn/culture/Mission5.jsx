import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  X, ArrowRight, ArrowLeft, CheckCircle, XCircle, Award, AlertTriangle,
  Home, Heart, Shield, Moon, Sun, Star, Clock, Camera, MapPin, Users,
  Sparkles, MessageCircle, Landmark
} from "lucide-react";
import { useLanguage } from "../../accueil/LanguageContext";
import { useAuth } from "../../../context/AuthContext";
import CultureCompletion from "./CultureCompletion";
import "../darija/mission.css";
import { useAutoProgress, canAccessMission } from "../../../utils/progress";
import LockedScreen from "../common/LockedScreen";
import FavoriteButton from "../common/FavoriteButton";
import SaveVocabButton from "../common/SaveVocabButton";

const STEPS = ["intro", "mosques", "friday", "ramadan", "scenarios", "mistakes", "challenge", "quiz", "completion"];

const STEP_LABELS = {
  intro: { FR: "Introduction", EN: "Introduction", AR: "مقدمة" },
  mosques: { FR: "Lieux de Culte", EN: "Places of Worship", AR: "أماكن العبادة" },
  friday: { FR: "Culture du Vendredi", EN: "Friday Culture", AR: "ثقافة الجمعة" },
  ramadan: { FR: "Sensibilisation Ramadan", EN: "Ramadan Awareness", AR: "التوعية برمضان" },
  scenarios: { FR: "Scénarios", EN: "Real Scenarios", AR: "سيناريوهات" },
  mistakes: { FR: "Erreurs", EN: "Common Mistakes", AR: "أخطاء شائعة" },
  challenge: { FR: "Défi", EN: "Cultural Challenge", AR: "تحدي ثقافي" },
  quiz: { FR: "Quiz Final", EN: "Final Quiz", AR: "الاختبار النهائي" },
  completion: { FR: "Achèvement", EN: "Completion", AR: "اكتمال" }
};

function CultureMission5() {
  const { t, lang, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedMosque, setSelectedMosque] = useState(0);
  const [selectedFriday, setSelectedFriday] = useState(0);
  const [selectedRamadan, setSelectedRamadan] = useState(0);
  const [expandedMistake, setExpandedMistake] = useState(0);

  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [scenarioFeedback, setScenarioFeedback] = useState(null);

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
    { icon: <Heart size={22} />, text: t("cultureM5Intro1") },
    { icon: <Shield size={22} />, text: t("cultureM5Intro2") },
    { icon: <Star size={22} />, text: t("cultureM5Intro3") },
    { icon: <Users size={22} />, text: t("cultureM5Intro4") }
  ];

  const mosqueCards = [
    { icon: <MessageCircle size={22} />, title: t("cultureM5Mosque1Title"), desc: t("cultureM5Mosque1Desc"), context: t("cultureM5Mosque1Context") },
    { icon: <Shield size={22} />, title: t("cultureM5Mosque2Title"), desc: t("cultureM5Mosque2Desc"), context: t("cultureM5Mosque2Context") },
    { icon: <Camera size={22} />, title: t("cultureM5Mosque3Title"), desc: t("cultureM5Mosque3Desc"), context: t("cultureM5Mosque3Context") },
    { icon: <MapPin size={22} />, title: t("cultureM5Mosque4Title"), desc: t("cultureM5Mosque4Desc"), context: t("cultureM5Mosque4Context") }
  ];

  const fridayCards = [
    { icon: <Star size={22} />, title: t("cultureM5Friday1Title"), desc: t("cultureM5Friday1Desc"), context: t("cultureM5Friday1Context") },
    { icon: <Clock size={22} />, title: t("cultureM5Friday2Title"), desc: t("cultureM5Friday2Desc"), context: t("cultureM5Friday2Context") },
    { icon: <Home size={22} />, title: t("cultureM5Friday3Title"), desc: t("cultureM5Friday3Desc"), context: t("cultureM5Friday3Context") }
  ];

  const ramadanCards = [
    { icon: <Sun size={22} />, title: t("cultureM5Ramadan1Title"), desc: t("cultureM5Ramadan1Desc"), context: t("cultureM5Ramadan1Context") },
    { icon: <Clock size={22} />, title: t("cultureM5Ramadan2Title"), desc: t("cultureM5Ramadan2Desc"), context: t("cultureM5Ramadan2Context") },
    { icon: <Heart size={22} />, title: t("cultureM5Ramadan3Title"), desc: t("cultureM5Ramadan3Desc"), context: t("cultureM5Ramadan3Context") }
  ];

  const mistakesData = [
    { title: t("cultureM5Mistake1Title"), why: t("cultureM5Mistake1Why"), bad: t("cultureM5Mistake1Bad"), good: t("cultureM5Mistake1Good") },
    { title: t("cultureM5Mistake2Title"), why: t("cultureM5Mistake2Why"), bad: t("cultureM5Mistake2Bad"), good: t("cultureM5Mistake2Good") },
    { title: t("cultureM5Mistake3Title"), why: t("cultureM5Mistake3Why"), bad: t("cultureM5Mistake3Bad"), good: t("cultureM5Mistake3Good") },
    { title: t("cultureM5Mistake4Title"), why: t("cultureM5Mistake4Why"), bad: t("cultureM5Mistake4Bad"), good: t("cultureM5Mistake4Good") }
  ];

  const scenariosData = [
    {
      icon: "Landmark",
      q: t("cultureM5Scen1Q"),
      options: [t("cultureM5Scen1A1"), t("cultureM5Scen1A2"), t("cultureM5Scen1A3")],
      correctIdx: 1,
      feedbackCorrect: t("cultureM5Scen1FeedbackCorrect"),
      feedbackWrong: t("cultureM5Scen1FeedbackWrong")
    },
    {
      icon: "Landmark",
      q: t("cultureM5Scen2Q"),
      options: [t("cultureM5Scen2A1"), t("cultureM5Scen2A2"), t("cultureM5Scen2A3")],
      correctIdx: 1,
      feedbackCorrect: t("cultureM5Scen2FeedbackCorrect"),
      feedbackWrong: t("cultureM5Scen2FeedbackWrong")
    },
    {
      icon: "Moon",
      q: t("cultureM5Scen3Q"),
      options: [t("cultureM5Scen3A1"), t("cultureM5Scen3A2"), t("cultureM5Scen3A3")],
      correctIdx: 0,
      feedbackCorrect: t("cultureM5Scen3FeedbackCorrect"),
      feedbackWrong: t("cultureM5Scen3FeedbackWrong")
    }
  ];

  const challengeData = [
    {
      q: t("cultureM5Ch1Q"),
      options: [t("cultureM5Ch1A1"), t("cultureM5Ch1A2"), t("cultureM5Ch1A3")],
      correctIdx: 1,
      feedbackCorrect: t("cultureM5Ch1FeedbackCorrect"),
      feedbackWrong: t("cultureM5Ch1FeedbackWrong")
    },
    {
      q: t("cultureM5Ch2Q"),
      options: [t("cultureM5Ch2A1"), t("cultureM5Ch2A2"), t("cultureM5Ch2A3")],
      correctIdx: 1,
      feedbackCorrect: t("cultureM5Ch2FeedbackCorrect"),
      feedbackWrong: t("cultureM5Ch2FeedbackWrong")
    },
    {
      q: t("cultureM5Ch3Q"),
      options: [t("cultureM5Ch3A1"), t("cultureM5Ch3A2"), t("cultureM5Ch3A3")],
      correctIdx: 1,
      feedbackCorrect: t("cultureM5Ch3FeedbackCorrect"),
      feedbackWrong: t("cultureM5Ch3FeedbackWrong")
    }
  ];

  const quizData = [
    { q: t("cultureM5QuizQ1"), options: [t("cultureM5QuizQ1O1"), t("cultureM5QuizQ1O2"), t("cultureM5QuizQ1O3")], answer: 1 },
    { q: t("cultureM5QuizQ2"), options: [t("cultureM5QuizQ2O1"), t("cultureM5QuizQ2O2"), t("cultureM5QuizQ2O3")], answer: 1 },
    { q: t("cultureM5QuizQ3"), options: [t("cultureM5QuizQ3O1"), t("cultureM5QuizQ3O2"), t("cultureM5QuizQ3O3")], answer: 2 },
    { q: t("cultureM5QuizQ4"), options: [t("cultureM5QuizQ4O1"), t("cultureM5QuizQ4O2"), t("cultureM5QuizQ4O3")], answer: 0 },
    { q: t("cultureM5QuizQ5"), options: [t("cultureM5QuizQ5O1"), t("cultureM5QuizQ5O2"), t("cultureM5QuizQ5O3")], answer: 1 },
    { q: t("cultureM5QuizQ6"), options: [t("cultureM5QuizQ6O1"), t("cultureM5QuizQ6O2"), t("cultureM5QuizQ6O3")], answer: 1 },
    { q: t("cultureM5QuizQ7"), options: [t("cultureM5QuizQ7O1"), t("cultureM5QuizQ7O2"), t("cultureM5QuizQ7O3")], answer: 0 }
  ];

  const iconMap = {
    Landmark, Moon
  };

  const handleScenarioAnswer = (idx) => {
    if (scenarioFeedback) return;
    setScenarioFeedback(idx === scenariosData[currentScenarioIndex].correctIdx ? "correct" : "wrong");
  };

  const handleNextScenario = () => {
    if (currentScenarioIndex < scenariosData.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
      setScenarioFeedback(null);
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

  const renderSelectableCards = (items, selected, setSelected, renderDetail, getLabel) => (
    <>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 24 }}>
        {items.map((item, idx) => (
          <button
            key={idx}
            className={`vocab-card culture-card-override ${selected === idx ? "selected" : ""}`}
            style={{ flex: "1 1 100px", maxWidth: 130, padding: 16, cursor: "pointer", textAlign: "center" }}
            onClick={() => setSelected(idx)}
          >
            <div style={{ color: "var(--learn-accent)", display: "flex", justifyContent: "center", marginBottom: 4 }}>{item.icon}</div>
            <div style={{ fontSize: "0.75rem", fontWeight: 600, marginTop: 8, color: selected === idx ? "var(--learn-accent)" : "var(--learn-text-secondary)" }}>
              {getLabel(item)}
            </div>
          </button>
        ))}
      </div>
      <motion.div
        key={selected}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="vocab-card culture-card-override"
        style={{ padding: 28 }}
      >
        {renderDetail(items[selected])}
      </motion.div>
    </>
  );

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
        <FavoriteButton track="culture" missionNum={5} />
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
          {/* STEP 1 — Introduction */}
          {step === "intro" && (
            <div className="intro-step">
              <div className="intro-icon">
                <Moon size={40} />
              </div>
              <h1 className="intro-title">{t("cultureM5Title")}</h1>
              <div className="culture-intro-hero">
                <Sparkles size={20} style={{ color: "var(--learn-accent)", marginBottom: 8 }} />
                <p style={{ margin: 0, fontStyle: "italic" }}>{t("cultureM5IntroStory")}</p>
              </div>
              <p className="intro-desc">{t("cultureM5IntroDesc")}</p>
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

          {/* STEP 2 — Mosques & Religious Places */}
          {step === "mosques" && (
            <div>
              <h2 className="step-title">{t("cultureM5MosqueTitle")}</h2>
              <p className="step-subtitle">{t("cultureM5MosqueDesc")}</p>
              {renderSelectableCards(
                mosqueCards,
                selectedMosque,
                setSelectedMosque,
                (card) => (
                  <>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                      <div style={{ color: "var(--learn-accent)", background: "rgba(21,128,61,0.1)", padding: 12, borderRadius: 12 }}>{card.icon}</div>
                      <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700, color: "var(--learn-accent)" }}>{card.title}</h3>
                      <SaveVocabButton id={'culture_5_' + selectedMosque} word={card.title} translation={card.desc} track="culture" missionNum={5} type="tip" />
                    </div>
                    <p style={{ lineHeight: 1.65, margin: "0 0 16px", color: "var(--learn-text)" }}>{card.desc}</p>
                    <div style={{ padding: "14px 18px", borderRadius: 12, background: "rgba(21,128,61,0.06)", border: "1px solid rgba(21,128,61,0.2)" }}>
                      <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--learn-accent)", marginBottom: 6, textTransform: "uppercase" }}>
                        {ui("En pratique", "In practice", "عملياً")}
                      </div>
                      <p style={{ margin: 0, fontSize: "0.92rem", lineHeight: 1.6, color: "var(--learn-text-secondary)" }}>{card.context}</p>
                    </div>
                  </>
                ),
                (item) => item.title
              )}
            </div>
          )}

          {/* STEP 3 — Friday Culture */}
          {step === "friday" && (
            <div>
              <h2 className="step-title">{t("cultureM5FridayTitle")}</h2>
              <p className="step-subtitle">{t("cultureM5FridayDesc")}</p>
              {renderSelectableCards(
                fridayCards,
                selectedFriday,
                setSelectedFriday,
                (card) => (
                  <>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                      <div style={{ color: "var(--learn-accent)", background: "rgba(21,128,61,0.1)", padding: 12, borderRadius: 12 }}>{card.icon}</div>
                      <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700, color: "var(--learn-accent)" }}>{card.title}</h3>
                    </div>
                    <p style={{ lineHeight: 1.65, margin: "0 0 16px", color: "var(--learn-text)" }}>{card.desc}</p>
                    <div style={{ padding: "14px 18px", borderRadius: 12, background: "rgba(21,128,61,0.06)", border: "1px solid rgba(21,128,61,0.2)" }}>
                      <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--learn-accent)", marginBottom: 6, textTransform: "uppercase" }}>
                        {ui("Astuce", "Tip", "نصيحة")}
                      </div>
                      <p style={{ margin: 0, fontSize: "0.92rem", lineHeight: 1.6, color: "var(--learn-text-secondary)" }}>{card.context}</p>
                    </div>
                  </>
                ),
                (item) => item.title
              )}
            </div>
          )}

          {/* STEP 4 — Ramadan Awareness */}
          {step === "ramadan" && (
            <div>
              <h2 className="step-title">{t("cultureM5RamadanTitle")}</h2>
              <p className="step-subtitle">{t("cultureM5RamadanDesc")}</p>
              {renderSelectableCards(
                ramadanCards,
                selectedRamadan,
                setSelectedRamadan,
                (card) => (
                  <>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                      <div style={{ color: "var(--learn-accent)", background: "rgba(21,128,61,0.1)", padding: 12, borderRadius: 12 }}>{card.icon}</div>
                      <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700, color: "var(--learn-accent)" }}>{card.title}</h3>
                    </div>
                    <p style={{ lineHeight: 1.65, margin: "0 0 16px", color: "var(--learn-text)" }}>{card.desc}</p>
                    <div style={{ padding: "14px 18px", borderRadius: 12, background: "rgba(21,128,61,0.06)", border: "1px solid rgba(21,128,61,0.2)" }}>
                      <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--learn-accent)", marginBottom: 6, textTransform: "uppercase" }}>
                        {ui("À savoir", "Good to know", "معلومة")}
                      </div>
                      <p style={{ margin: 0, fontSize: "0.92rem", lineHeight: 1.6, color: "var(--learn-text-secondary)" }}>{card.context}</p>
                    </div>
                  </>
                ),
                (item) => item.title
              )}
            </div>
          )}

          {/* STEP 5 — Real-Life Scenarios */}
          {step === "scenarios" && (() => {
            const current = scenariosData[currentScenarioIndex];
            return (
              <div>
                <h2 className="step-title" style={{ textAlign: "center" }}>{t("cultureM5ScenTitle")}</h2>
                <p className="step-subtitle" style={{ textAlign: "center" }}>
                  {t("cultureM5ScenDesc")} ({currentScenarioIndex + 1}/{scenariosData.length})
                </p>

                <div className="vocab-card culture-card-override" style={{ padding: "32px 24px", maxWidth: 600, margin: "0 auto" }}>
                  <div style={{ textAlign: "center", marginBottom: 16 }}>
                    {(() => { const Ic = iconMap[current.icon]; return <Ic size={48} />; })()}
                  </div>
                  <div className="quiz-question">{current.q}</div>
                  <div className="quiz-options">
                    {current.options.map((opt, idx) => {
                      let btnClass = "quiz-option";
                      if (scenarioFeedback) {
                        if (idx === current.correctIdx) btnClass += " correct";
                        else if (scenarioFeedback === "wrong") btnClass += " wrong";
                      }
                      return (
                        <button
                          key={idx}
                          className={btnClass}
                          onClick={() => handleScenarioAnswer(idx)}
                          disabled={scenarioFeedback !== null}
                        >
                          <span style={{ fontWeight: 700, marginRight: 8 }}>{String.fromCharCode(65 + idx)}.</span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {renderFeedback(
                    scenarioFeedback,
                    current.feedbackCorrect,
                    current.feedbackWrong,
                    handleNextScenario,
                    () => setScenarioFeedback(null)
                  )}
                </div>
              </div>
            );
          })()}

          {/* STEP 6 — Common Mistakes */}
          {step === "mistakes" && (
            <div>
              <h2 className="step-title" style={{ textAlign: "center" }}>
                <AlertTriangle size={24} style={{ display: "inline", verticalAlign: "middle", marginRight: 8, color: "var(--learn-accent)" }} />
                {t("cultureM5MistakesTitle")}
              </h2>
              <p className="step-subtitle" style={{ textAlign: "center" }}>{t("cultureM5MistakesDesc")}</p>

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

          {/* STEP 7 — Cultural Challenge */}
          {step === "challenge" && (() => {
            const ch = challengeData[challengeIndex];
            const allDone = challengeCompleted.length === challengeData.length && challengeIndex === challengeData.length - 1 && challengeFeedback === "correct";
            return (
              <div>
                <h2 className="step-title" style={{ textAlign: "center" }}>{t("cultureM5ChallengeTitle")}</h2>
                <p className="step-subtitle" style={{ textAlign: "center" }}>
                  {t("cultureM5ChallengeDesc")} ({challengeIndex + 1}/{challengeData.length})
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
                      <p style={{ margin: 0, fontWeight: 600, color: "var(--learn-accent)" }}>{t("cultureM5ChallengeSuccess")}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}

          {/* STEP 8 — Final Quiz */}
          {step === "quiz" && (
            <div>
              <h2 className="step-title" style={{ textAlign: "center" }}>{t("cultureM5QuizTitle")}</h2>
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
              missionNumber={5}
              completeTitle={t("cultureM5CompleteTitle")}
              completeDesc={t("cultureM5CompleteDesc")}
              nextMissionTitle={t("cultureM6Title")}
              nextMissionPath="/languages/culture/mission-6"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {(step === "mosques" || step === "friday" || step === "ramadan" || step === "mistakes") && (
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

export default CultureMission5;
