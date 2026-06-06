import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  X, ArrowRight, ArrowLeft, CheckCircle, XCircle, ShoppingBag, AlertTriangle,
  Award, Handshake, Tag, TrendingDown,
  Footprints, MapPin, Palette, Gem, Store, Sparkles, Users, Globe,
  Hand, Clock, MessageCircle, Smile, Gift, Flame, Shirt
} from "lucide-react";
import { useLanguage } from "../../accueil/LanguageContext";
import { useAuth } from "../../../context/AuthContext";
import CultureCompletion from "./CultureCompletion";
import "../darija/mission.css";
import { useAutoProgress, canAccessMission } from "../../../utils/progress";
import LockedScreen from "../common/LockedScreen";
import FavoriteButton from "../common/FavoriteButton";
import SaveVocabButton from "../common/SaveVocabButton";

const STEPS = ["intro", "culture", "negotiation", "situations", "mistakes", "challenge", "discovery", "quiz", "completion"];

const STEP_LABELS = {
  intro: { FR: "Bienvenue au Souk", EN: "Welcome to the Souk", AR: "مرحباً في السوق" },
  culture: { FR: "Culture du Marché", EN: "Market Culture", AR: "ثقافة السوق" },
  negotiation: { FR: "Négociation", EN: "Negotiation Basics", AR: "أساسيات التفاوض" },
  situations: { FR: "Scénarios", EN: "Market Scenarios", AR: "سيناريوهات السوق" },
  mistakes: { FR: "Erreurs", EN: "Common Mistakes", AR: "أخطاء شائعة" },
  challenge: { FR: "Défi", EN: "Bargaining Challenge", AR: "تحدي المساومة" },
  discovery: { FR: "Découverte", EN: "Cultural Discovery", AR: "اكتشاف ثقافي" },
  quiz: { FR: "Quiz Final", EN: "Final Quiz", AR: "الاختبار النهائي" },
  completion: { FR: "Achèvement", EN: "Completion", AR: "اكتمال" }
};

function CultureMission2() {
  const { t, lang, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedCultureCard, setSelectedCultureCard] = useState(0);
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
    { icon: <Store size={22} />, text: t("cultureM2IntroWhatIsSouk") },
    { icon: <Tag size={22} />, text: t("cultureM2IntroWhyBargain") },
    { icon: <Handshake size={22} />, text: t("cultureM2IntroSocialNotConflict") },
    { icon: <Globe size={22} />, text: t("cultureM2IntroTouristVsLocal") }
  ];

  const cultureCards = [
    { icon: "Hand", title: t("cultureM2CultureCard1Title"), desc: t("cultureM2CultureCard1Desc"), context: t("cultureM2CultureCard1Context") },
    { icon: "Clock", title: t("cultureM2CultureCard2Title"), desc: t("cultureM2CultureCard2Desc"), context: t("cultureM2CultureCard2Context") },
    { icon: "MessageCircle", title: t("cultureM2CultureCard3Title"), desc: t("cultureM2CultureCard3Desc"), context: t("cultureM2CultureCard3Context") },
    { icon: "Handshake", title: t("cultureM2CultureCard4Title"), desc: t("cultureM2CultureCard4Desc"), context: t("cultureM2CultureCard4Context") },
    { icon: "Smile", title: t("cultureM2CultureCard5Title"), desc: t("cultureM2CultureCard5Desc"), context: t("cultureM2CultureCard5Context") }
  ];

  const negotiationData = [
    { icon: <Tag size={22} />, title: t("cultureM2Neg1Title"), desc: t("cultureM2Neg1Desc"), locals: t("cultureM2Neg1Locals"), tourists: t("cultureM2Neg1Tourists") },
    { icon: <TrendingDown size={22} />, title: t("cultureM2Neg2Title"), desc: t("cultureM2Neg2Desc"), locals: t("cultureM2Neg2Locals"), tourists: t("cultureM2Neg2Tourists") },
    { icon: <Handshake size={22} />, title: t("cultureM2Neg3Title"), desc: t("cultureM2Neg3Desc"), locals: t("cultureM2Neg3Locals"), tourists: t("cultureM2Neg3Tourists") },
    { icon: <Footprints size={22} />, title: t("cultureM2Neg4Title"), desc: t("cultureM2Neg4Desc"), locals: t("cultureM2Neg4Locals"), tourists: t("cultureM2Neg4Tourists") }
  ];

  const situationsData = [
    {
      icon: "Palette",
      price: "1500 DH",
      q: t("cultureM2Sit1Q"),
      options: [t("cultureM2Sit1A1"), t("cultureM2Sit1A2"), t("cultureM2Sit1A3")],
      correctIdx: 1,
      feedbackCorrect: t("cultureM2Sit1FeedbackCorrect"),
      feedbackWrong: t("cultureM2Sit1FeedbackWrong")
    },
    {
      icon: "Gift",
      q: t("cultureM2Sit2Q"),
      options: [t("cultureM2Sit2A1"), t("cultureM2Sit2A2"), t("cultureM2Sit2A3")],
      correctIdx: 1,
      feedbackCorrect: t("cultureM2Sit2FeedbackCorrect"),
      feedbackWrong: t("cultureM2Sit2FeedbackWrong")
    },
    {
      icon: "Flame",
      price: "200 DH/g",
      q: t("cultureM2Sit3Q"),
      options: [t("cultureM2Sit3A1"), t("cultureM2Sit3A2"), t("cultureM2Sit3A3")],
      correctIdx: 1,
      feedbackCorrect: t("cultureM2Sit3FeedbackCorrect"),
      feedbackWrong: t("cultureM2Sit3FeedbackWrong")
    },
    {
      icon: "Shirt",
      q: t("cultureM2Sit4Q"),
      options: [t("cultureM2Sit4A1"), t("cultureM2Sit4A2"), t("cultureM2Sit4A3")],
      correctIdx: 1,
      feedbackCorrect: t("cultureM2Sit4FeedbackCorrect"),
      feedbackWrong: t("cultureM2Sit4FeedbackWrong")
    }
  ];

  const mistakesData = [
    { title: t("cultureM2Mistake1Title"), why: t("cultureM2Mistake1Why"), bad: t("cultureM2Mistake1Bad"), good: t("cultureM2Mistake1Good") },
    { title: t("cultureM2Mistake2Title"), why: t("cultureM2Mistake2Why"), bad: t("cultureM2Mistake2Bad"), good: t("cultureM2Mistake2Good") },
    { title: t("cultureM2Mistake3Title"), why: t("cultureM2Mistake3Why"), bad: t("cultureM2Mistake3Bad"), good: t("cultureM2Mistake3Good") },
    { title: t("cultureM2Mistake4Title"), why: t("cultureM2Mistake4Why"), bad: t("cultureM2Mistake4Bad"), good: t("cultureM2Mistake4Good") },
    { title: t("cultureM2Mistake5Title"), why: t("cultureM2Mistake5Why"), bad: t("cultureM2Mistake5Bad"), good: t("cultureM2Mistake5Good") }
  ];

  const challengeData = [
    {
      q: t("cultureM2Ch1Q"),
      options: [t("cultureM2Ch1A1"), t("cultureM2Ch1A2"), t("cultureM2Ch1A3")],
      correctIdx: 0,
      feedbackCorrect: t("cultureM2Ch1FeedbackCorrect"),
      feedbackWrong: t("cultureM2Ch1FeedbackWrong")
    },
    {
      q: t("cultureM2Ch2Q"),
      options: [t("cultureM2Ch2A1"), t("cultureM2Ch2A2"), t("cultureM2Ch2A3")],
      correctIdx: 0,
      feedbackCorrect: t("cultureM2Ch2FeedbackCorrect"),
      feedbackWrong: t("cultureM2Ch2FeedbackWrong")
    },
    {
      q: t("cultureM2Ch3Q"),
      options: [t("cultureM2Ch3A1"), t("cultureM2Ch3A2"), t("cultureM2Ch3A3")],
      correctIdx: 0,
      feedbackCorrect: t("cultureM2Ch3FeedbackCorrect"),
      feedbackWrong: t("cultureM2Ch3FeedbackWrong")
    }
  ];

  const discoveryData = [
    { icon: <Palette size={24} />, title: t("cultureM2DiscArtisanTitle"), desc: t("cultureM2DiscArtisanDesc") },
    { icon: <Gem size={24} />, title: t("cultureM2DiscHandmadeTitle"), desc: t("cultureM2DiscHandmadeDesc") },
    { icon: <MapPin size={24} />, title: t("cultureM2DiscMarrakechTitle"), desc: t("cultureM2DiscMarrakechDesc") },
    { icon: <Store size={24} />, title: t("cultureM2DiscFesTitle"), desc: t("cultureM2DiscFesDesc") },
    { icon: <Sparkles size={24} />, title: t("cultureM2DiscChefchaouenTitle"), desc: t("cultureM2DiscChefchaouenDesc") },
    { icon: <Users size={24} />, title: t("cultureM2DiscAgadirTitle"), desc: t("cultureM2DiscAgadirDesc") }
  ];

  const quizData = [
    { q: t("cultureM2QuizQ1"), options: [t("cultureM2QuizQ1O1"), t("cultureM2QuizQ1O2"), t("cultureM2QuizQ1O3")], answer: 0 },
    { q: t("cultureM2QuizQ2"), options: [t("cultureM2QuizQ2O1"), t("cultureM2QuizQ2O2"), t("cultureM2QuizQ2O3")], answer: 0 },
    { q: t("cultureM2QuizQ3"), options: [t("cultureM2QuizQ3O1"), t("cultureM2QuizQ3O2"), t("cultureM2QuizQ3O3")], answer: 0 },
    { q: t("cultureM2QuizQ4"), options: [t("cultureM2QuizQ4O1"), t("cultureM2QuizQ4O2"), t("cultureM2QuizQ4O3")], answer: 0 },
    { q: t("cultureM2QuizQ5"), options: [t("cultureM2QuizQ5O1"), t("cultureM2QuizQ5O2"), t("cultureM2QuizQ5O3")], answer: 0 }
  ];

  const iconMap = {
    Hand, Clock, MessageCircle, Handshake, Smile,
    Palette, Gift, Flame, Shirt
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
    if (isCorrect) {
      setChallengeCompleted(prev => [...prev, challengeIndex]);
    }
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
        <FavoriteButton track="culture" missionNum={2} />
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
          {/* STEP 1 — Welcome to the Souk */}
          {step === "intro" && (
            <div className="intro-step">
              <div className="intro-icon">
                <ShoppingBag size={40} />
              </div>
              <h1 className="intro-title">{t("cultureM2Title")}</h1>
              <div className="culture-intro-hero">
                <Sparkles size={20} style={{ color: "var(--learn-accent)", marginBottom: 8 }} />
                <p style={{ margin: 0, fontStyle: "italic" }}>{t("cultureM2IntroStory")}</p>
              </div>
              <p className="intro-desc">{t("cultureM2IntroDesc")}</p>
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

          {/* STEP 2 — Understanding Market Culture */}
          {step === "culture" && (
            <div>
              <h2 className="step-title">{t("cultureM2CultureTitle")}</h2>
              <p className="step-subtitle">{t("cultureM2CultureDesc")}</p>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 24 }}>
                {cultureCards.map((card, idx) => (
                  <button
                    key={idx}
                    className={`vocab-card culture-card-override ${selectedCultureCard === idx ? "selected" : ""}`}
                    style={{ flex: "1 1 90px", maxWidth: 110, padding: 16, cursor: "pointer", textAlign: "center" }}
                    onClick={() => setSelectedCultureCard(idx)}
                  >
                    {(() => { const Ic = iconMap[card.icon]; return <Ic size={28} />; })()}
                    <div style={{ fontSize: "0.75rem", fontWeight: 600, marginTop: 8, color: selectedCultureCard === idx ? "var(--learn-accent)" : "var(--learn-text-secondary)" }}>
                      {card.title}
                    </div>
                  </button>
                ))}
              </div>

              <motion.div
                key={selectedCultureCard}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="vocab-card culture-card-override"
                style={{ padding: 28 }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "50%",
                    background: "rgba(21,128,61,0.1)", display: "flex",
                    alignItems: "center", justifyContent: "center"
                  }}>
                    {(() => { const Ic = iconMap[cultureCards[selectedCultureCard].icon]; return <Ic size={28} />; })()}
                  </div>
                  <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 700, color: "var(--learn-accent)" }}>
                    {cultureCards[selectedCultureCard].title}
                  </h3>
                  <SaveVocabButton id={'culture_2_' + selectedCultureCard} word={cultureCards[selectedCultureCard].title} translation={cultureCards[selectedCultureCard].desc} track="culture" missionNum={2} type="tip" />
                </div>
                <p style={{ lineHeight: 1.65, margin: "0 0 16px", color: "var(--learn-text)" }}>
                  {cultureCards[selectedCultureCard].desc}
                </p>
                <div style={{
                  padding: "14px 18px", borderRadius: 12,
                  background: "rgba(21,128,61,0.06)", border: "1px solid rgba(21,128,61,0.2)"
                }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--learn-accent)", marginBottom: 6, textTransform: "uppercase" }}>
                    {ui("En voyage", "While traveling", "أثناء السفر")}
                  </div>
                  <p style={{ margin: 0, fontSize: "0.92rem", lineHeight: 1.6, color: "var(--learn-text-secondary)" }}>
                    {cultureCards[selectedCultureCard].context}
                  </p>
                </div>
              </motion.div>
            </div>
          )}

          {/* STEP 3 — Price Negotiation Basics */}
          {step === "negotiation" && (
            <div>
              <h2 className="step-title">{t("cultureM2NegTitle")}</h2>
              <p className="step-subtitle">{t("cultureM2NegDesc")}</p>

              {negotiationData.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="culture-neg-card"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                    <div style={{ color: "var(--learn-accent)", background: "rgba(21,128,61,0.1)", padding: 10, borderRadius: 12 }}>
                      {item.icon}
                    </div>
                    <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "var(--learn-accent)" }}>{item.title}</h3>
                  </div>
                  <p style={{ margin: "0 0 4px", lineHeight: 1.6, color: "var(--learn-text)" }}>{item.desc}</p>
                  <div className="culture-neg-compare">
                    <div className="culture-neg-local">
                      <span className="culture-neg-label">{ui("Les locaux", "How locals do it", "ما يفعله المحليون")}</span>
                      {item.locals}
                    </div>
                    <div className="culture-neg-tourist">
                      <span className="culture-neg-label">{ui("Les touristes", "What tourists often do", "ما يفعله السياح غالباً")}</span>
                      {item.tourists}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* STEP 4 — Real Market Scenarios */}
          {step === "situations" && (() => {
            const currentSit = situationsData[currentSituationIndex];
            return (
              <div>
                <h2 className="step-title" style={{ textAlign: "center" }}>{t("cultureM2SitTitle")}</h2>
                <p className="step-subtitle" style={{ textAlign: "center" }}>
                  {t("cultureM2SitDesc")} ({currentSituationIndex + 1}/{situationsData.length})
                </p>

                <div className="vocab-card culture-card-override" style={{ padding: "32px 24px", maxWidth: 600, margin: "0 auto" }}>
                  <div style={{ textAlign: "center", marginBottom: 16 }}>
                    {(() => { const Ic = iconMap[currentSit.icon]; return <Ic size={48} />; })()}
                    {currentSit.price && <div className="culture-price-tag">{currentSit.price}</div>}
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
                {t("cultureM2MistakesTitle")}
              </h2>
              <p className="step-subtitle" style={{ textAlign: "center" }}>{t("cultureM2MistakesDesc")}</p>

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

          {/* STEP 6 — Bargaining Challenge */}
          {step === "challenge" && (() => {
            const ch = challengeData[challengeIndex];
            const allDone = challengeCompleted.length === challengeData.length && challengeIndex === challengeData.length - 1 && challengeFeedback === "correct";
            return (
              <div>
                <h2 className="step-title" style={{ textAlign: "center" }}>{t("cultureM2ChallengeTitle")}</h2>
                <p className="step-subtitle" style={{ textAlign: "center" }}>
                  {t("cultureM2ChallengeDesc")} ({challengeIndex + 1}/{challengeData.length})
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
                      <p style={{ margin: 0, fontWeight: 600, color: "var(--learn-accent)" }}>{t("cultureM2ChallengeSuccess")}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}

          {/* STEP 7 — Cultural Discovery */}
          {step === "discovery" && (
            <div>
              <h2 className="step-title">{t("cultureM2DiscTitle")}</h2>
              <p className="step-subtitle">{t("cultureM2DiscDesc")}</p>
              <div className="culture-region-grid">
                {discoveryData.map((item, idx) => (
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

          {/* STEP 8 — Final Quiz */}
          {step === "quiz" && (
            <div>
              <h2 className="step-title" style={{ textAlign: "center" }}>{t("cultureM2QuizTitle")}</h2>
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
              missionNumber={2}
              completeTitle={t("cultureM2CompleteTitle")}
              completeDesc={t("cultureM2CompleteDesc")}
              nextMissionTitle={t("cultureM3Title")}
              nextMissionPath="/languages/culture/mission-3"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {(step === "culture" || step === "negotiation" || step === "mistakes" || step === "discovery") && (
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

export default CultureMission2;
