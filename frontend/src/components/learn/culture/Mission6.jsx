import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  X, ArrowRight, ArrowLeft, CheckCircle, XCircle, AlertTriangle,
  Shield, Eye, Car, Train, Bus, Phone, MapPin,
  Wallet, CreditCard, Users, Star, Compass
} from "lucide-react";
import { useLanguage } from "../../accueil/LanguageContext";
import { useAuth } from "../../../context/AuthContext";
import CultureFinalCompletion from "./CultureFinalCompletion";
import "../darija/mission.css";
import { useAutoProgress, canAccessMission } from "../../../utils/progress";
import LockedScreen from "../common/LockedScreen";
import FavoriteButton from "../common/FavoriteButton";
import SaveVocabButton from "../common/SaveVocabButton";

const STEPS = ["intro", "aware", "transport", "scams", "emergency", "scenarios", "challenge", "quiz", "completion"];

const STEP_LABELS = {
  intro: { FR: "Introduction", EN: "Introduction", AR: "مقدمة" },
  aware: { FR: "Rester Vigilant", EN: "Staying Aware", AR: "البقاء يقظًا" },
  transport: { FR: "Sécurité des Transports", EN: "Transportation Safety", AR: "سلامة النقل" },
  scams: { FR: "Arnaques à Éviter", EN: "Scams to Avoid", AR: "الاحتيال الذي يجب تجنبه" },
  emergency: { FR: "Préparation aux Urgences", EN: "Emergency Preparedness", AR: "الاستعداد للطوارئ" },
  scenarios: { FR: "Scénarios", EN: "Real Scenarios", AR: "سيناريوهات" },
  challenge: { FR: "Défi", EN: "Smart Travel Challenge", AR: "تحدي السفر الذكي" },
  quiz: { FR: "Quiz Final", EN: "Final Quiz", AR: "الاختبار النهائي" },
  completion: { FR: "Achèvement", EN: "Completion", AR: "اكتمال" }
};

function CultureMission6() {
  const { t, lang, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedAware, setSelectedAware] = useState(0);
  const [selectedTransport, setSelectedTransport] = useState(0);
  const [selectedScam, setSelectedScam] = useState(0);
  const [selectedEmergency, setSelectedEmergency] = useState(0);

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

  const awareCards = [
    { icon: <Wallet size={22} />, title: t("cultureM6AwareCard1Title"), desc: t("cultureM6AwareCard1Desc") },
    { icon: <CreditCard size={22} />, title: t("cultureM6AwareCard2Title"), desc: t("cultureM6AwareCard2Desc") },
    { icon: <Shield size={22} />, title: t("cultureM6AwareCard3Title"), desc: t("cultureM6AwareCard3Desc") },
    { icon: <Users size={22} />, title: t("cultureM6AwareCard4Title"), desc: t("cultureM6AwareCard4Desc") }
  ];

  const transportCards = [
    { icon: <Car size={22} />, title: t("cultureM6TransportCard1Title"), desc: t("cultureM6TransportCard1Desc") },
    { icon: <MapPin size={22} />, title: t("cultureM6TransportCard2Title"), desc: t("cultureM6TransportCard2Desc") },
    { icon: <Train size={22} />, title: t("cultureM6TransportCard3Title"), desc: t("cultureM6TransportCard3Desc") },
    { icon: <Bus size={22} />, title: t("cultureM6TransportCard4Title"), desc: t("cultureM6TransportCard4Desc") }
  ];

  const scamsCards = [
    { icon: <AlertTriangle size={22} />, title: t("cultureM6Scam1Title"), desc: t("cultureM6Scam1Desc") },
    { icon: <AlertTriangle size={22} />, title: t("cultureM6Scam2Title"), desc: t("cultureM6Scam2Desc") },
    { icon: <AlertTriangle size={22} />, title: t("cultureM6Scam3Title"), desc: t("cultureM6Scam3Desc") }
  ];

  const emergencyCards = [
    { icon: <Shield size={22} />, title: t("cultureM6EmergencyCard1Title"), desc: t("cultureM6EmergencyCard1Desc") },
    { icon: <Phone size={22} />, title: t("cultureM6EmergencyCard2Title"), desc: t("cultureM6EmergencyCard2Desc") },
    { icon: <MapPin size={22} />, title: t("cultureM6EmergencyCard3Title"), desc: t("cultureM6EmergencyCard3Desc") }
  ];

  const scenariosData = [
    {
      icon: <Wallet size={32} />,
      q: t("cultureM6Scenario1Q"),
      options: [t("cultureM6Scenario1O1"), t("cultureM6Scenario1O2"), t("cultureM6Scenario1O3")],
      correctIdx: 1,
      feedback: t("cultureM6Scenario1Feedback")
    },
    {
      icon: <Car size={32} />,
      q: t("cultureM6Scenario2Q"),
      options: [t("cultureM6Scenario2O1"), t("cultureM6Scenario2O2"), t("cultureM6Scenario2O3")],
      correctIdx: 1,
      feedback: t("cultureM6Scenario2Feedback")
    },
    {
      icon: <MapPin size={32} />,
      q: t("cultureM6Scenario3Q"),
      options: [t("cultureM6Scenario3O1"), t("cultureM6Scenario3O2"), t("cultureM6Scenario3O3")],
      correctIdx: 1,
      feedback: t("cultureM6Scenario3Feedback")
    }
  ];

  const challengeData = [
    {
      q: t("cultureM6Challenge1Q"),
      options: [t("cultureM6Challenge1O1"), t("cultureM6Challenge1O2")],
      correctIdx: 1,
      feedback: t("cultureM6Challenge1Feedback")
    },
    {
      q: t("cultureM6Challenge2Q"),
      options: [t("cultureM6Challenge2O1"), t("cultureM6Challenge2O2")],
      correctIdx: 1,
      feedback: t("cultureM6Challenge2Feedback")
    },
    {
      q: t("cultureM6Challenge3Q"),
      options: [t("cultureM6Challenge3O1"), t("cultureM6Challenge3O2")],
      correctIdx: 1,
      feedback: t("cultureM6Challenge3Feedback")
    }
  ];

  const quizData = [
    { q: t("cultureM6QuizQ1"), options: [t("cultureM6QuizQ1O1"), t("cultureM6QuizQ1O2"), t("cultureM6QuizQ1O3")], answer: 1 },
    { q: t("cultureM6QuizQ2"), options: [t("cultureM6QuizQ2O1"), t("cultureM6QuizQ2O2"), t("cultureM6QuizQ2O3")], answer: 0 },
    { q: t("cultureM6QuizQ3"), options: [t("cultureM6QuizQ3O1"), t("cultureM6QuizQ3O2"), t("cultureM6QuizQ3O3")], answer: 1 },
    { q: t("cultureM6QuizQ4"), options: [t("cultureM6QuizQ4O1"), t("cultureM6QuizQ4O2"), t("cultureM6QuizQ4O3")], answer: 1 },
    { q: t("cultureM6QuizQ5"), options: [t("cultureM6QuizQ5O1"), t("cultureM6QuizQ5O2"), t("cultureM6QuizQ5O3")], answer: 1 },
    { q: t("cultureM6QuizQ6"), options: [t("cultureM6QuizQ6O1"), t("cultureM6QuizQ6O2"), t("cultureM6QuizQ6O3")], answer: 1 },
    { q: t("cultureM6QuizQ7"), options: [t("cultureM6QuizQ7O1"), t("cultureM6QuizQ7O2"), t("cultureM6QuizQ7O3")], answer: 1 }
  ];

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

  const renderFeedback = (feedback, feedbackText, onContinue, onRetry) => (
    <AnimatePresence>
      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          style={{
            padding: "16px 20px", borderRadius: 16, marginTop: 16,
            background: feedback === "correct" ? "rgba(var(--learn-success-rgb),0.1)" : "rgba(var(--learn-error-rgb),0.1)",
            color: feedback === "correct" ? "var(--learn-success)" : "var(--learn-error)",
            display: "flex", flexDirection: "column", gap: 12
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {feedback === "correct" ? <CheckCircle size={22} /> : <XCircle size={22} />}
            <span style={{ fontWeight: 600, lineHeight: 1.4 }}>{feedbackText}</span>
          </div>
          <button
            className={feedback === "correct" ? "mission-btn" : "mission-btn secondary"}
            style={{ alignSelf: "center", marginTop: 8 }}
            onClick={feedback === "correct" ? onContinue : onRetry}
          >
            {feedback === "correct"
              ? ui("Continuer", "Continue", "متابعة")
              : ui("Réessayer", "Retry", "حاول مرة أخرى")}
            {feedback === "correct" && <ArrowRight size={18} />}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderSelectableCards = (items, selected, setSelected, renderDetail) => (
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
              {item.title}
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
        <FavoriteButton track="culture" missionNum={6} />
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
                <Compass size={40} />
              </div>
              <h1 className="intro-title">{t("cultureM6Title")}</h1>
              <p className="intro-desc">{t("cultureM6IntroTitle")}</p>
              <div className="culture-story-grid">
                {[
                  { icon: <Shield size={20} />, text: t("cultureM6IntroDesc1") },
                  { icon: <Eye size={20} />, text: t("cultureM6IntroDesc2") },
                  { icon: <Star size={20} />, text: t("cultureM6IntroDesc3") }
                ].map((item, idx) => (
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

          {/* STEP 2 — Staying Aware */}
          {step === "aware" && (
            <div>
              <h2 className="step-title">{t("cultureM6AwareTitle")}</h2>
              {renderSelectableCards(
                awareCards,
                selectedAware,
                setSelectedAware,
                (card) => (
                  <>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                      <div style={{ color: "var(--learn-accent)", background: "rgba(var(--learn-accent-rgb),0.1)", padding: 12, borderRadius: 12 }}>{card.icon}</div>
                      <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700, color: "var(--learn-accent)" }}>{card.title}</h3>
                      <SaveVocabButton id={'culture_6_aware_' + selectedAware} word={card.title} translation={card.desc} track="culture" missionNum={6} type="tip" />
                    </div>
                    <p style={{ lineHeight: 1.65, margin: 0, color: "var(--learn-text)" }}>{card.desc}</p>
                  </>
                )
              )}
            </div>
          )}

          {/* STEP 3 — Transportation Safety */}
          {step === "transport" && (
            <div>
              <h2 className="step-title">{t("cultureM6TransportTitle")}</h2>
              {renderSelectableCards(
                transportCards,
                selectedTransport,
                setSelectedTransport,
                (card) => (
                  <>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                      <div style={{ color: "var(--learn-accent)", background: "rgba(var(--learn-accent-rgb),0.1)", padding: 12, borderRadius: 12 }}>{card.icon}</div>
                      <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700, color: "var(--learn-accent)" }}>{card.title}</h3>
                      <SaveVocabButton id={'culture_6_transport_' + selectedTransport} word={card.title} translation={card.desc} track="culture" missionNum={6} type="tip" />
                    </div>
                    <p style={{ lineHeight: 1.65, margin: 0, color: "var(--learn-text)" }}>{card.desc}</p>
                  </>
                )
              )}
            </div>
          )}

          {/* STEP 4 — Tourist Scams */}
          {step === "scams" && (
            <div>
              <h2 className="step-title">{t("cultureM6ScamsTitle")}</h2>
              {renderSelectableCards(
                scamsCards,
                selectedScam,
                setSelectedScam,
                (card) => (
                  <>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                      <div style={{ color: "var(--learn-danger)", background: "rgba(var(--learn-danger-rgb),0.1)", padding: 12, borderRadius: 12 }}>{card.icon}</div>
                      <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700, color: "var(--learn-danger)" }}>{card.title}</h3>
                      <SaveVocabButton id={'culture_6_scams_' + selectedScam} word={card.title} translation={card.desc} track="culture" missionNum={6} type="tip" />
                    </div>
                    <p style={{ lineHeight: 1.65, margin: 0, color: "var(--learn-text)" }}>{card.desc}</p>
                  </>
                )
              )}
            </div>
          )}

          {/* STEP 5 — Emergency Preparedness */}
          {step === "emergency" && (
            <div>
              <h2 className="step-title">{t("cultureM6EmergencyTitle")}</h2>
              {renderSelectableCards(
                emergencyCards,
                selectedEmergency,
                setSelectedEmergency,
                (card) => (
                  <>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                      <div style={{ color: "var(--learn-accent)", background: "rgba(var(--learn-accent-rgb),0.1)", padding: 12, borderRadius: 12 }}>{card.icon}</div>
                      <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700, color: "var(--learn-accent)" }}>{card.title}</h3>
                      <SaveVocabButton id={'culture_6_emergency_' + selectedEmergency} word={card.title} translation={card.desc} track="culture" missionNum={6} type="tip" />
                    </div>
                    <p style={{ lineHeight: 1.65, margin: 0, color: "var(--learn-text)" }}>{card.desc}</p>
                  </>
                )
              )}
            </div>
          )}

          {/* STEP 6 — Real-Life Scenarios */}
          {step === "scenarios" && (() => {
            const current = scenariosData[currentScenarioIndex];
            return (
              <div>
                <h2 className="step-title" style={{ textAlign: "center" }}>
                  {ui("Scénarios Réels", "Real-Life Scenarios", "سيناريوهات حقيقية")}
                </h2>
                <p className="step-subtitle" style={{ textAlign: "center" }}>
                  {ui(`Scénario ${currentScenarioIndex + 1}/${scenariosData.length}`, `Scenario ${currentScenarioIndex + 1}/${scenariosData.length}`, `السيناريو ${currentScenarioIndex + 1}/${scenariosData.length}`)}
                </p>

                <div className="vocab-card culture-card-override" style={{ padding: "32px 24px", maxWidth: 600, margin: "0 auto" }}>
                  <div className="icon-badge icon-badge-culture icon-badge-lg" style={{ margin: "0 auto 16px" }}>
                    {current.icon}
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
                    current.feedback,
                    handleNextScenario,
                    () => setScenarioFeedback(null)
                  )}
                </div>
              </div>
            );
          })()}

          {/* STEP 7 — Smart Travel Challenge */}
          {step === "challenge" && (() => {
            const ch = challengeData[challengeIndex];
            return (
              <div>
                <h2 className="step-title" style={{ textAlign: "center" }}>{t("cultureM6ChallengeTitle")}</h2>
                <p className="step-subtitle" style={{ textAlign: "center" }}>
                  {ui(`Défi ${challengeIndex + 1}/${challengeData.length}`, `Challenge ${challengeIndex + 1}/${challengeData.length}`, `التحدي ${challengeIndex + 1}/${challengeData.length}`)}
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
                    ch.feedback,
                    handleNextChallenge,
                    () => setChallengeFeedback(null)
                  )}
                </div>
              </div>
            );
          })()}

          {/* STEP 8 — Final Quiz */}
          {step === "quiz" && (
            <div>
              <h2 className="step-title" style={{ textAlign: "center" }}>
                {ui("Quiz Final", "Final Quiz", "الاختبار النهائي")}
              </h2>
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

          {/* STEP 9 — Final Culture Completion */}
          {step === "completion" && (
            <CultureFinalCompletion />
          )}
        </motion.div>
      </AnimatePresence>

      {(step === "aware" || step === "transport" || step === "scams" || step === "emergency") && (
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

export default CultureMission6;
