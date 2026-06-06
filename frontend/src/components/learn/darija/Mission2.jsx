import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X, ArrowRight, ArrowLeft, MessageCircle, CheckCircle, Car, Award, Navigation, Lock } from "lucide-react";
import { useLanguage } from "../../accueil/LanguageContext";
import { useAuth } from "../../../context/AuthContext";
import { AudioButton } from "../common/AudioButton";
import "./mission.css";
import { useAutoProgress, canAccessMission } from "../../../utils/progress";
import LockedScreen from "../common/LockedScreen";
import FavoriteButton from "../common/FavoriteButton";
import SaveVocabButton from "../common/SaveVocabButton";

const STEPS = ["intro", "vocab", "expressions", "conversation", "situations", "quiz", "recap", "completion"];

const STEP_LABELS = {
  intro: { FR: "Introduction", EN: "Introduction", AR: "مقدمة" },
  vocab: { FR: "Vocabulaire", EN: "Vocabulary", AR: "مفردات" },
  expressions: { FR: "Expressions", EN: "Expressions", AR: "عبارات" },
  conversation: { FR: "Conversation", EN: "Conversation", AR: "محادثة" },
  situations: { FR: "Situations", EN: "Situations", AR: "مواقف" },
  quiz: { FR: "Quiz", EN: "Quiz", AR: "اختبار" },
  recap: { FR: "Récapitulatif", EN: "Recap", AR: "ملخص" },
  completion: { FR: "Terminé", EN: "Completed", AR: "اكتملت" },
};

function Mission2() {
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

  const getLangProp = (item, prop) => {
    if (typeof item[prop] === 'object') {
      return item[prop][lang.toLowerCase()] || item[prop].en;
    }
    return item[prop] || item[lang.toLowerCase()] || item.en || "";
  };

  // ── Vocabulary Data ──
  const vocabData = [
    { darija: "Bshhal?", arabicText: "بشحال؟", fr: "Combien ?", en: "How much?", ar: "بكم؟", context: { fr: t("darijaM2Vocab1Context"), en: t("darijaM2Vocab1Context"), ar: t("darijaM2Vocab1Context") } },
    { darija: "Fin ghadi?", arabicText: "فين غادي؟", fr: "Où allez-vous ?", en: "Where are you going?", ar: "إلى أين أنت ذاهب؟", context: { fr: t("darijaM2Vocab2Context"), en: t("darijaM2Vocab2Context"), ar: t("darijaM2Vocab2Context") } },
    { darija: "Wqef hna", arabicText: "وقف هنا", fr: "Arrêtez-vous ici", en: "Stop here", ar: "توقف هنا", context: { fr: t("darijaM2Vocab3Context"), en: t("darijaM2Vocab3Context"), ar: t("darijaM2Vocab3Context") } },
    { darija: "Yallah", arabicText: "يلاه", fr: "Allons-y", en: "Let's go", ar: "هيا بنا", context: { fr: t("darijaM2Vocab4Context"), en: t("darijaM2Vocab4Context"), ar: t("darijaM2Vocab4Context") } },
    { darija: "Shukran", arabicText: "شكرا", fr: "Merci", en: "Thank you", ar: "شكراً", context: { fr: t("darijaM2Vocab5Context"), en: t("darijaM2Vocab5Context"), ar: t("darijaM2Vocab5Context") } },
    { darija: "Afak", arabicText: "عفاك", fr: "S'il vous plaît", en: "Please", ar: "من فضلك", context: { fr: t("darijaM2Vocab6Context"), en: t("darijaM2Vocab6Context"), ar: t("darijaM2Vocab6Context") } }
  ];

  // ── Expressions Data ──
  const expressionsData = [
    { darija: "Bshhal l mdina?", arabicText: "بشحال للمدينة؟", fr: "Combien pour le centre-ville ?", en: "How much to downtown?", ar: "بكم إلى وسط المدينة؟", context: { fr: t("darijaM2Exp1Context"), en: t("darijaM2Exp1Context"), ar: t("darijaM2Exp1Context") } },
    { darija: "Wqef hna afak.", arabicText: "وقف هنا عفاك.", fr: "Arrêtez-vous ici s'il vous plaît.", en: "Please stop here.", ar: "توقف هنا من فضلك.", context: { fr: t("darijaM2Exp2Context"), en: t("darijaM2Exp2Context"), ar: t("darijaM2Exp2Context") } },
    { darija: "Fin kayn station?", arabicText: "فين كاين الستاسيون؟", fr: "Où est la station de taxi ?", en: "Where is the taxi station?", ar: "أين محطة التاكسي؟", context: { fr: t("darijaM2Exp3Context"), en: t("darijaM2Exp3Context"), ar: t("darijaM2Exp3Context") } }
  ];

  // ── Conversation Data ──
  const conversationData = [
    { speaker: "Traveler", isRight: true, darija: "Salam", arabicText: "سلام", fr: "Bonjour", en: "Hello", ar: "سلام" },
    { speaker: "Driver", isRight: false, darija: "Salam, fin ghadi?", arabicText: "سلام، فين غادي؟", fr: "Bonjour, où allez-vous ?", en: "Hello, where are you going?", ar: "سلام، فين غادي؟" },
    { speaker: "Traveler", isRight: true, darija: "L mdina afak.", arabicText: "للمدينة عفاك.", fr: "Le centre-ville s'il vous plaît.", en: "Downtown please.", ar: "للمدينة عفاك." },
    { speaker: "Driver", isRight: false, darija: "Bshhal?", arabicText: "بشحال؟", fr: "Combien ?", en: "How much?", ar: "بشحال؟" },
    { speaker: "Driver", isRight: false, darija: "Khamssin Dirham.", arabicText: "خمسين درهم.", fr: "C'est 50 Dirhams.", en: "It's 50 Dirhams.", ar: "خمسين درهم." },
    { speaker: "Traveler", isRight: true, darija: "Wach mumkin b rab'in?", arabicText: "واش ممكن بربعين؟", fr: "Est-ce possible pour 40 ?", en: "Is 40 possible?", ar: "واش ممكن بربعين؟" },
    { speaker: "Driver", isRight: false, yallah: true, darija: "Wakhaa, yallah.", arabicText: "واخا، يلاه.", fr: "D'accord, montez.", en: "Okay, get in.", ar: "واخا، يلاه." }
  ];

  // ── Situations Data ──
  const situationsData = [
    {
      q: t("darijaM2Sit1Q"),
      options: [t("darijaM2Sit1A1"), t("darijaM2Sit1A2")],
      correctIdx: 1,
      feedbackCorrect: t("darijaM2Sit1FeedbackCorrect"),
      feedbackWrong: t("darijaM2Sit1FeedbackWrong"),
    },
    {
      q: t("darijaM2Sit2Q"),
      options: [t("darijaM2Sit2A1"), t("darijaM2Sit2A2")],
      correctIdx: 1,
      feedbackCorrect: t("darijaM2Sit2FeedbackCorrect"),
      feedbackWrong: t("darijaM2Sit2FeedbackWrong"),
    }
  ];

  // ── Quiz Data ──
  const quizData = [
    {
      q: t("darijaM2QuizQ1"),
      options: [t("darijaM2QuizQ1O1"), t("darijaM2QuizQ1O2"), t("darijaM2QuizQ1O3")],
      answer: 0
    },
    {
      q: t("darijaM2QuizQ2"),
      options: [t("darijaM2QuizQ2O1"), t("darijaM2QuizQ2O2"), t("darijaM2QuizQ2O3")],
      answer: 0
    },
    {
      q: t("darijaM2QuizQ3"),
      options: [t("darijaM2QuizQ3O1"), t("darijaM2QuizQ3O2"), t("darijaM2QuizQ3O3")],
      answer: 0
    }
  ];

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
    <div className={`mission-container ${isRTL ? "rtl" : "ltr"}`}>
      {/* ── Header / Progress ── */}
      <div className="mission-header">
        <button className="mission-close" onClick={() => navigate("/languages")}>
          <X size={24} />
        </button>
        <FavoriteButton track="darija" missionNum={2} />
        <div className="mission-progress-bar">
          <div className="mission-progress-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
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
          {/* Step Indicator */}
          <div className="step-indicator">
            <span className="step-indicator-number">{lang === "FR" ? "Étape" : lang === "AR" ? "خطوة" : "Step"} {currentStepIndex + 1}/{STEPS.length}</span>
            <span className="step-indicator-name">{STEP_LABELS[STEPS[currentStepIndex]][lang]}</span>
          </div>

          {/* ══════════════════════════════════════════
              STEP 1 — Intro
              ══════════════════════════════════════════ */}
          {step === "intro" && (
            <div className="intro-step">
              <div className="intro-icon">
                <Car size={40} />
              </div>
              <h1 className="intro-title">{t("darijaM2Title")}</h1>
              <p className="step-subtitle" style={{ fontSize: "1.2rem", fontWeight: 500 }}>{t("darijaM2IntroSubtitle")}</p>
              <p className="intro-desc">{t("darijaM2IntroDesc")}</p>
              <button className="mission-btn" onClick={handleNext}>
                {lang === "FR" ? "Commencer la mission" : lang === "AR" ? "ابدأ المهمة" : "Start Mission"}
              </button>
            </div>
          )}

          {/* ══════════════════════════════════════════
              STEP 2 — Vocabulary
              ══════════════════════════════════════════ */}
          {step === "vocab" && (
            <div>
              <h2 className="step-title">{t("darijaM2VocabTitle")}</h2>
              <p className="step-subtitle">{t("darijaM2VocabDesc")}</p>

              <div className="vocab-grid">
                {vocabData.map((word, idx) => (
                  <div key={idx} className="vocab-card">
                    <AudioButton text={word.darija} ttsText={word.arabicText} overrideLang="AR" />
                    <div className="vocab-word" style={{display:"flex",alignItems:"center",gap:"8px"}}>
  <span>{word.darija}</span>
  <SaveVocabButton id={'darija_2_' + word.darija} word={word.darija} translation={word.en} track="darija" missionNum={2} />
</div>
                    <div className="vocab-translations">
                      <span className="vocab-trans-item">
                        <strong>{lang === "FR" ? "Français:" : "English:"}</strong>
                        {lang === "FR" ? word.fr : word.en}
                      </span>
                      <span className="vocab-trans-item ar">{word.ar}</span>
                    </div>
                    <div className="chat-trans" style={{ marginTop: '16px', color: 'var(--learn-text-secondary)', fontSize: '0.85rem' }}>
                      <MessageCircle size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                      {getLangProp(word, 'context')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════
              STEP 3 — Expressions
              ══════════════════════════════════════════ */}
          {step === "expressions" && (
            <div>
              <h2 className="step-title">{t("darijaM2ExpTitle")}</h2>
              <p className="step-subtitle">{t("darijaM2ExpDesc")}</p>

              <div className="expressions-list">
                {expressionsData.map((exp, idx) => (
                  <div key={idx} className="expression-card">
                    <AudioButton text={exp.darija} ttsText={exp.arabicText} overrideLang="AR" style={{ position: 'static', flexShrink: 0 }} />
                    <div className="expression-content">
                      <div className="exp-darija" style={{display:"flex",alignItems:"center",gap:"8px"}}>
  <span>{exp.darija}</span>
  <SaveVocabButton id={'darija_2_' + exp.darija} word={exp.darija} translation={exp.en || exp.fr} track="darija" missionNum={2} type="expression" />
</div>
                      <div className="exp-trans">{lang === "FR" ? exp.fr : lang === "AR" ? exp.ar : exp.en}</div>
                      <div className="chat-trans" style={{ marginTop: '8px', color: 'var(--learn-text-secondary)' }}>
                        {getLangProp(exp, 'context')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════
              STEP 4 — Conversation
              ══════════════════════════════════════════ */}
          {step === "conversation" && (
            <div>
              <h2 className="step-title">{t("darijaM2ChatTitle")}</h2>
              <p className="step-subtitle">{t("darijaM2ChatDesc")}</p>

              <div className="chat-container">
                {conversationData.map((line, idx) => (
                  <div key={idx} className={`chat-bubble-wrapper ${line.isRight ? 'right' : 'left'}`}>
                    <div className="chat-speaker">
                      {line.speaker === "Traveler"
                        ? (lang === "FR" ? "Vous" : lang === "AR" ? "أنت" : "You")
                        : (lang === "FR" ? "Chauffeur" : lang === "AR" ? "سائق" : "Driver")}
                    </div>
                    <div className="chat-bubble">
                      <div>
                        <div>{line.darija}</div>
                        <div className="chat-trans">{lang === "FR" ? line.fr : lang === "AR" ? line.ar : line.en}</div>
                      </div>
                      <AudioButton text={line.darija} ttsText={line.arabicText} overrideLang="AR" style={{ position: 'static', width: 32, height: 32, flexShrink: 0 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════
              STEP 5 — Decision Scenarios
              ══════════════════════════════════════════ */}
          {step === "situations" && (() => {
            const currentSit = situationsData[currentSituationIndex];
            return (
              <div>
                <h2 className="step-title" style={{ textAlign: "center" }}>{t("darijaM2SitTitle")}</h2>
                <p className="step-subtitle" style={{ textAlign: "center" }}>
                  {t("darijaM2SitDesc")}
                </p>

                <div style={{
                  background: "var(--learn-card-bg)", borderRadius: 20,
                  padding: "32px 24px", border: "2px solid var(--learn-border)",
                  maxWidth: 600, margin: "0 auto"
                }}>
                  <div className="quiz-question">{currentSit.q}</div>

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
              STEP 6 — Quiz
              ══════════════════════════════════════════ */}
          {step === "quiz" && (
            <div>
              <h2 className="step-title" style={{ textAlign: "center" }}>{t("darijaM2QuizTitle")}</h2>
              <p className="step-subtitle" style={{ textAlign: "center" }}>
                {lang === "FR" ? `Question ${quizQuestionIndex + 1} sur ${quizData.length}` :
                  lang === "AR" ? `السؤال ${quizQuestionIndex + 1} من ${quizData.length}` :
                  `Question ${quizQuestionIndex + 1} of ${quizData.length}`}
              </p>

              <div className="quiz-card" style={{ maxWidth: 600, margin: "0 auto" }}>
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
              STEP 7 — Recap
              ══════════════════════════════════════════ */}
          {step === "recap" && (
            <div className="intro-step">
              <div className="intro-icon">
                <Navigation size={40} />
              </div>
              <h2 className="step-title">{t("darijaM2RecapTitle")}</h2>
              <p className="step-subtitle">{t("darijaM2RecapDesc")}</p>

              <div className="expressions-list" style={{ maxWidth: 500, margin: "0 auto 40px", textAlign: "left" }}>
                <div className="expression-card">
                  <div className="expression-content">
                    <div className="exp-darija">Bshhal?</div>
                    <div className="exp-trans">{lang === "FR" ? "Combien ?" : lang === "AR" ? "بكم؟" : "How much?"}</div>
                  </div>
                </div>
                <div className="expression-card">
                  <div className="expression-content">
                    <div className="exp-darija">Fin ghadi?</div>
                    <div className="exp-trans">{lang === "FR" ? "Où allez-vous ?" : lang === "AR" ? "إلى أين أنت ذاهب؟" : "Where are you going?"}</div>
                  </div>
                </div>
                <div className="expression-card">
                  <div className="expression-content">
                    <div className="exp-darija">Wqef hna</div>
                    <div className="exp-trans">{lang === "FR" ? "Arrêtez-vous ici" : lang === "AR" ? "توقف هنا" : "Stop here"}</div>
                  </div>
                </div>
              </div>

              <button className="mission-btn" onClick={handleNext}>
                {lang === "FR" ? "Terminer la mission" : lang === "AR" ? "إنهاء المهمة" : "Finish Mission"}
                <ArrowRight size={20} />
              </button>
            </div>
          )}

          {/* ══════════════════════════════════════════
              STEP 8 — Completion
              ══════════════════════════════════════════ */}
          {step === "completion" && (
            <div className="completion-step">
              <div className="completion-icon">
                <Award size={48} />
              </div>
              <h1 className="intro-title">{t("darijaM2CompleteTitle")}</h1>
              <p className="intro-desc">{t("darijaM2CompleteDesc")}</p>

              {/* Progression */}
              <div style={{ marginTop: '30px', textAlign: 'left', background: 'var(--learn-surface)', padding: '20px', borderRadius: '16px', border: '1px solid var(--learn-border)', width: '100%', maxWidth: '400px' }}>
                <h4 style={{ marginBottom: '16px', fontSize: '1.1rem', fontWeight: 600 }}>
                  {lang === "FR" ? "Progression" : lang === "AR" ? "التقدم" : "Progression"}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--learn-success)' }}>
                    <CheckCircle size={20} />
                    <span style={{ fontWeight: 500 }}>{lang === "FR" ? "Mission 1 : Aéroport" : lang === "AR" ? "المهمة 1: المطار" : "Mission 1: Airport"}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--learn-success)' }}>
                    <CheckCircle size={20} />
                    <span style={{ fontWeight: 500 }}>{lang === "FR" ? "Mission 2 : Trajet en Taxi" : lang === "AR" ? "المهمة 2: رحلة التاكسي" : "Mission 2: Taxi Journey"}</span>
                  </div>
                  <div className="completion-progress-current" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Lock size={20} />
                    <span style={{ fontWeight: 500 }}>{t("darijaM2NextUnlock")}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginTop: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button className="mission-btn" onClick={() => navigate("/languages/darija/mission-3")}>
                  {lang === "FR" ? "Continuer vers la Mission 3" : lang === "AR" ? "متابعة إلى المهمة 3" : "Continue to Mission 3"}
                  <ArrowRight size={20} style={{ marginLeft: 8 }} />
                </button>
                <button className="mission-btn secondary" onClick={() => navigate("/languages")}>
                  {lang === "FR" ? "Retour au parcours d'apprentissage" : lang === "AR" ? "العودة إلى مسار التعلم" : "Return to Learning Hub"}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Footer Navigation ── */}
      {step !== "intro" && step !== "situations" && step !== "quiz" && step !== "recap" && step !== "completion" && (
        <div className="mission-footer">
          <button className="mission-btn secondary" onClick={handleBack} disabled={currentStepIndex === 0}>
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

export default Mission2;
