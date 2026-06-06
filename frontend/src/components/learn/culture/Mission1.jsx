import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X, Coffee, Users, ShieldCheck, CheckCircle, ArrowRight, ArrowLeft, Heart } from "lucide-react";
import { useLanguage } from "../../accueil/LanguageContext";
import { useAuth } from "../../../context/AuthContext";
import { AudioButton } from "../common/AudioButton";
import CultureCompletion from "./CultureCompletion";
import "../darija/mission.css";
import { useAutoProgress, canAccessMission } from "../../../utils/progress";
import LockedScreen from "../common/LockedScreen";
import FavoriteButton from "../common/FavoriteButton";
import SaveVocabButton from "../common/SaveVocabButton";

const STEPS = ["intro", "tea", "situations", "etiquette", "quiz", "completion"];

function CultureMission1() {
  const { t, lang, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Scenarios State
  const [currentSituationIndex, setCurrentSituationIndex] = useState(0);
  const [situationFeedback, setSituationFeedback] = useState(null);

  // Quiz State
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

  const STEP_LABELS = {
    intro: { FR: "Bienvenue", EN: "Welcome", AR: "مرحباً" },
    tea: { FR: "Rituel du Thé", EN: "Tea Ritual", AR: "طقوس الشاي" },
    situations: { FR: "Scénarios", EN: "Scenarios", AR: "سيناريوهات" },
    etiquette: { FR: "Étiquette", EN: "Etiquette", AR: "آداب" },
    quiz: { FR: "Quiz", EN: "Quiz", AR: "اختبار" },
    completion: { FR: "Achèvement", EN: "Completion", AR: "اكتمال" }
  };

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  // ── Scenario Data (driven by translation keys) ──
  const situationsData = [
    {
      q: t("cultureM1Sit1Q"),
      options: [t("cultureM1Sit1A1"), t("cultureM1Sit1A2")],
      correctIdx: 0,
      feedbackCorrect: t("cultureM1Sit1FeedbackCorrect"),
      feedbackWrong: t("cultureM1Sit1FeedbackWrong"),
    },
    {
      q: t("cultureM1Sit2Q"),
      options: [t("cultureM1Sit2A1"), t("cultureM1Sit2A2")],
      correctIdx: 1,
      feedbackCorrect: t("cultureM1Sit2FeedbackCorrect"),
      feedbackWrong: t("cultureM1Sit2FeedbackWrong"),
    },
    {
      q: t("cultureM1Sit3Q"),
      options: [t("cultureM1Sit3A1"), t("cultureM1Sit3A2")],
      correctIdx: 0,
      feedbackCorrect: t("cultureM1Sit3FeedbackCorrect"),
      feedbackWrong: t("cultureM1Sit3FeedbackWrong"),
    }
  ];

  // ── Quiz Data (driven by translation keys) ──
  const quizData = [
    {
      q: t("cultureM1QuizQ1"),
      options: [t("cultureM1QuizQ1O1"), t("cultureM1QuizQ1O2"), t("cultureM1QuizQ1O3")],
      answer: 0
    },
    {
      q: t("cultureM1QuizQ2"),
      options: [t("cultureM1QuizQ2O1"), t("cultureM1QuizQ2O2"), t("cultureM1QuizQ2O3")],
      answer: 0
    },
    {
      q: t("cultureM1QuizQ3"),
      options: [t("cultureM1QuizQ3O1"), t("cultureM1QuizQ3O2"), t("cultureM1QuizQ3O3")],
      answer: 0
    }
  ];

  // ── Scenario Handler ──
  const handleSituationAnswer = (idx) => {
    if (situationFeedback) return;
    const isCorrect = idx === situationsData[currentSituationIndex].correctIdx;
    setSituationFeedback(isCorrect ? "correct" : "wrong");
  };

  const handleNextSituation = () => {
    if (currentSituationIndex < situationsData.length - 1) {
      setCurrentSituationIndex(prev => prev + 1);
      setSituationFeedback(null);
    } else {
      handleNext();
    }
  };

  // ── Quiz Handler ──
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

  const pathMatch = window.location.pathname.match(/\/languages\/(\w+)\/mission-(\d+)/);
  const currentTrack = pathMatch?.[1];
  const currentMissionNum = pathMatch?.[2] ? parseInt(pathMatch[2]) : 0;
  if (currentTrack && currentMissionNum && !canAccessMission(currentTrack, currentMissionNum, user)) {
    return <LockedScreen track={currentTrack} />;
  }
  return (
    <div className={`mission-container culture-theme ${isRTL ? "rtl" : "ltr"}`}>
      {/* ── Header / Progress ── */}
      <div className="mission-header">
        <button className="mission-close" onClick={() => navigate("/languages")}>
          <X size={24} />
        </button>
        <FavoriteButton track="culture" missionNum={1} />
        <div className="mission-progress-bar">
          <div className="mission-progress-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <div className="step-indicator">
        <span className="step-indicator-number">{ui("Étape", "Step", "خطوة")} {currentStepIndex + 1}/{STEPS.length}</span>
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
          {/* ══════════════════════════════════════════
              STEP 1 — Welcome to Moroccan Culture
              ══════════════════════════════════════════ */}
          {step === "intro" && (
            <div className="intro-step">
              <div className="intro-icon">
                <Heart size={40} />
              </div>
              <h1 className="intro-title">{t("cultureM1Title")}</h1>
              <p className="intro-desc">{t("cultureM1IntroDesc")}</p>
              <button className="mission-btn" onClick={handleNext}>
                {lang === "FR" ? "Commencer la mission" : lang === "AR" ? "ابدأ المهمة" : "Start Mission"}
              </button>
            </div>
          )}

          {/* ══════════════════════════════════════════
              STEP 2 — The Tea Ritual (Atay)
              ══════════════════════════════════════════ */}
          {step === "tea" && (
            <div>
              <h2 className="step-title" style={{ textAlign: "center" }}>{t("cultureM1TeaTitle")}</h2>
              <p className="step-subtitle" style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 32px" }}>{t("cultureM1TeaDesc")}</p>

              <div className="vocab-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
                {[t("cultureM1TeaPoint1"), t("cultureM1TeaPoint2"), t("cultureM1TeaPoint3")].map((point, idx) => (
                  <div key={idx} className="vocab-card" style={{ alignItems: "center", textAlign: "center" }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: "50%",
                      background: "rgba(21,128,61,0.1)", display: "flex",
                      alignItems: "center", justifyContent: "center",
                      marginBottom: 16, color: "var(--learn-accent)"
                    }}>
                      <Coffee size={24} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', textAlign: 'left', gap: '8px' }}>
                      <AudioButton text={point} style={{ position: 'static', flexShrink: 0, width: 32, height: 32 }} />
                      <p style={{ fontWeight: 500, lineHeight: 1.5, margin: 0 }}>{point}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════
              STEP 3 — Real Travel Situations
              ══════════════════════════════════════════ */}
          {step === "situations" && (() => {
            const currentSit = situationsData[currentSituationIndex];
            return (
              <div>
                <h2 className="step-title" style={{ textAlign: "center" }}>{t("cultureM1SitTitle")}</h2>
                <p className="step-subtitle" style={{ textAlign: "center" }}>
                  {t("cultureM1SitDesc")} ({currentSituationIndex + 1}/{situationsData.length})
                </p>

                <div style={{
                  background: "var(--learn-card-bg)", borderRadius: 20,
                  padding: "32px 24px", border: "2px solid var(--learn-border)",
                  maxWidth: 600, margin: "0 auto"
                }}>
                  <div className="quiz-question" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <AudioButton text={currentSit.q} style={{ position: 'static', flexShrink: 0, width: 32, height: 32 }} />
                    <span>{currentSit.q}</span>
                  </div>

                  <div className="quiz-options">
                    {currentSit.options.map((opt, idx) => {
                      let btnClass = "quiz-option";
                      if (situationFeedback) {
                        if (idx === currentSit.correctIdx) btnClass += " correct";
                        else btnClass += " wrong";
                      }
                      return (
                        <button
                          key={idx}
                          className={btnClass}
                          onClick={() => handleSituationAnswer(idx)}
                          disabled={situationFeedback !== null}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  <AnimatePresence>
                    {situationFeedback && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        style={{
                          padding: "16px 20px", borderRadius: 16, marginTop: 16,
                          background: situationFeedback === "correct" ? "rgba(52,199,89,0.1)" : "rgba(255,59,48,0.1)",
                          color: situationFeedback === "correct" ? "var(--learn-success)" : "var(--learn-error)",
                          display: "flex", flexDirection: "column", gap: 12
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          {situationFeedback === "correct" ? <CheckCircle size={22} /> : <X size={22} />}
                          <span style={{ fontWeight: 600, lineHeight: 1.4 }}>
                            {situationFeedback === "correct" ? currentSit.feedbackCorrect : currentSit.feedbackWrong}
                          </span>
                        </div>
                        {situationFeedback === "correct" && (
                          <button className="mission-btn" style={{ alignSelf: "center", marginTop: 8 }} onClick={handleNextSituation}>
                            {lang === "FR" ? "Continuer" : lang === "AR" ? "متابعة" : "Continue"}
                            <ArrowRight size={18} />
                          </button>
                        )}
                        {situationFeedback === "wrong" && (
                          <button
                            className="mission-btn secondary"
                            style={{ alignSelf: "center", marginTop: 8 }}
                            onClick={() => setSituationFeedback(null)}
                          >
                            {lang === "FR" ? "Réessayer" : lang === "AR" ? "حاول مرة أخرى" : "Retry"}
                          </button>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })()}

          {/* ══════════════════════════════════════════
              STEP 4 — Respect & Etiquette
              ══════════════════════════════════════════ */}
          {step === "etiquette" && (
            <div>
              <h2 className="step-title" style={{ textAlign: "center" }}>{t("cultureM1EtiqTitle")}</h2>
              <p className="step-subtitle" style={{ textAlign: "center" }}>{t("cultureM1EtiqDesc")}</p>

              <div className="vocab-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
                {[
                  { icon: <Users size={28} />, text: t("cultureM1Etiq1") },
                  { icon: <ShieldCheck size={28} />, text: t("cultureM1Etiq2") },
                  { icon: <Heart size={28} />, text: t("cultureM1Etiq3") },
                ].map((item, idx) => (
                  <div key={idx} className="vocab-card" style={{ alignItems: "center", textAlign: "center" }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: 16,
                      background: "rgba(21,128,61,0.1)", display: "flex",
                      alignItems: "center", justifyContent: "center",
                      marginBottom: 16, color: "var(--learn-accent)"
                    }}>
                      {item.icon}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', textAlign: 'left', gap: '8px' }}>
                      <AudioButton text={item.text} style={{ position: 'static', flexShrink: 0, width: 32, height: 32 }} />
                      <p style={{ fontWeight: 500, lineHeight: 1.5, margin: 0 }}>{item.text}</p>
                      <SaveVocabButton id={'culture_1_' + idx} word={item.text} track="culture" missionNum={1} type="tip" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════
              STEP 5 — Culture Challenge (Quiz)
              ══════════════════════════════════════════ */}
          {step === "quiz" && (
            <div>
              <h2 className="step-title" style={{ textAlign: "center" }}>{t("cultureM1QuizTitle")}</h2>
              <p className="step-subtitle" style={{ textAlign: "center" }}>
                {lang === "FR" ? `Question ${quizQuestionIndex + 1} sur ${quizData.length}` :
                 lang === "AR" ? `السؤال ${quizQuestionIndex + 1} من ${quizData.length}` :
                 `Question ${quizQuestionIndex + 1} of ${quizData.length}`}
              </p>

              <div className="quiz-card">
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
                  {quizFeedback === "correct" && (lang === "FR" ? "Excellent !" : lang === "AR" ? "ممتاز!" : "Excellent!")}
                  {quizFeedback === "wrong" && (lang === "FR" ? "Oops, essayez encore." : lang === "AR" ? "عفوا، حاول مرة أخرى." : "Oops, try again.")}
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════
              STEP 6 — Completion
              ══════════════════════════════════════════ */}
          {step === "completion" && (
            <CultureCompletion
              missionNumber={1}
              completeTitle={t("cultureM1CompleteTitle")}
              completeDesc={t("cultureM1CompleteDesc")}
              nextMissionTitle={t("cultureM2Title")}
              nextMissionPath="/languages/culture/mission-2"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Footer Navigation (visible on tea & etiquette steps) ── */}
      {(step === "tea" || step === "etiquette") && (
        <div className="mission-footer">
          <button className="mission-btn secondary" onClick={handleBack}>
            <ArrowLeft size={18} />
            {lang === "FR" ? "Précédent" : lang === "AR" ? "السابق" : "Back"}
          </button>
          <button className="mission-btn" onClick={handleNext}>
            {lang === "FR" ? "Continuer" : lang === "AR" ? "متابعة" : "Continue"}
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}

export default CultureMission1;
