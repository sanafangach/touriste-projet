import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X, Navigation, CheckCircle, ArrowRight, ArrowLeft, Award, BedDouble, User, Lock } from "lucide-react";
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

function Mission3() {
  const { t, lang, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Situations State
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

  // ── Vocabulary Data ──
  const vocabList = [
    { word: t("darijaM3Vocab1Word"), trans: t("darijaM3Vocab1Trans"), ar: t("darijaM3Vocab1Arabic"), ctx: t("darijaM3Vocab1Context") },
    { word: t("darijaM3Vocab2Word"), trans: t("darijaM3Vocab2Trans"), ar: t("darijaM3Vocab2Arabic"), ctx: t("darijaM3Vocab2Context") },
    { word: t("darijaM3Vocab3Word"), trans: t("darijaM3Vocab3Trans"), ar: t("darijaM3Vocab3Arabic"), ctx: t("darijaM3Vocab3Context") },
    { word: t("darijaM3Vocab4Word"), trans: t("darijaM3Vocab4Trans"), ar: t("darijaM3Vocab4Arabic"), ctx: t("darijaM3Vocab4Context") },
    { word: t("darijaM3Vocab5Word"), trans: t("darijaM3Vocab5Trans"), ar: t("darijaM3Vocab5Arabic"), ctx: t("darijaM3Vocab5Context") },
    { word: t("darijaM3Vocab6Word"), trans: t("darijaM3Vocab6Trans"), ar: t("darijaM3Vocab6Arabic"), ctx: t("darijaM3Vocab6Context") },
  ];

  // ── Expressions Data ──
  const expressionsList = [
    { darija: t("darijaM3Exp1Darija"), trans: t("darijaM3Exp1Trans") },
    { darija: t("darijaM3Exp2Darija"), trans: t("darijaM3Exp2Trans") },
    { darija: t("darijaM3Exp3Darija"), trans: t("darijaM3Exp3Trans") },
    { darija: t("darijaM3Exp4Darija"), trans: t("darijaM3Exp4Trans") }
  ];

  // ── Conversation Data ──
  const conversationData = [
    { role: "traveler", name: t("darijaM3ConvRole1"), text: t("darijaM3ConvLine1"), trans: t("darijaM3ConvLine1Trans") },
    { role: "receptionist", name: t("darijaM3ConvRole2"), text: t("darijaM3ConvLine2"), trans: t("darijaM3ConvLine2Trans") },
    { role: "traveler", name: t("darijaM3ConvRole1"), text: t("darijaM3ConvLine3"), trans: t("darijaM3ConvLine3Trans") },
    { role: "receptionist", name: t("darijaM3ConvRole2"), text: t("darijaM3ConvLine4"), trans: t("darijaM3ConvLine4Trans") },
    { role: "traveler", name: t("darijaM3ConvRole1"), text: t("darijaM3ConvLine5"), trans: t("darijaM3ConvLine5Trans") },
    { role: "receptionist", name: t("darijaM3ConvRole2"), text: t("darijaM3ConvLine6"), trans: t("darijaM3ConvLine6Trans") },
    { role: "traveler", name: t("darijaM3ConvRole1"), text: t("darijaM3ConvLine7"), trans: t("darijaM3ConvLine7Trans") }
  ];

  // ── Situations Data ──
  const situationsData = [
    {
      q: t("darijaM3Sit1Q"),
      options: [t("darijaM3Sit1A1"), t("darijaM3Sit1A2")],
      correctIdx: 0,
      feedbackCorrect: t("darijaM3Sit1FeedbackCorrect"),
      feedbackWrong: t("darijaM3Sit1FeedbackWrong"),
    },
    {
      q: t("darijaM3Sit2Q"),
      options: [t("darijaM3Sit2A1"), t("darijaM3Sit2A2")],
      correctIdx: 1,
      feedbackCorrect: t("darijaM3Sit2FeedbackCorrect"),
      feedbackWrong: t("darijaM3Sit2FeedbackWrong"),
    }
  ];

  // ── Quiz Data ──
  const quizData = [
    {
      q: t("darijaM3QuizQ1"),
      options: [t("darijaM3QuizQ1O1"), t("darijaM3QuizQ1O2"), t("darijaM3QuizQ1O3")],
      answer: 0
    },
    {
      q: t("darijaM3QuizQ2"),
      options: [t("darijaM3QuizQ2O1"), t("darijaM3QuizQ2O2"), t("darijaM3QuizQ2O3")],
      answer: 1
    },
    {
      q: t("darijaM3QuizQ3"),
      options: [t("darijaM3QuizQ3O1"), t("darijaM3QuizQ3O2"), t("darijaM3QuizQ3O3")],
      answer: 2
    }
  ];

  // ── Handlers ──
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
        <FavoriteButton track="darija" missionNum={3} />
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
              STEP 1 — Introduction
              ══════════════════════════════════════════ */}
          {step === "intro" && (
            <div className="intro-step">
              <div className="intro-icon">
                <BedDouble size={40} />
              </div>
              <h1 className="intro-title">{t("darijaM3Title")}</h1>
              <p className="intro-desc">{t("darijaM3IntroDesc")}</p>
              <button className="mission-btn" onClick={handleNext}>
                {lang === "FR" ? "Commencer la mission" : lang === "AR" ? "ابدأ المهمة" : "Start Mission"}
              </button>
            </div>
          )}

          {/* ══════════════════════════════════════════
              STEP 2 — Essential Vocabulary
              ══════════════════════════════════════════ */}
          {step === "vocab" && (
            <div>
              <h2 className="step-title">{t("darijaM3VocabTitle")}</h2>
              <p className="step-subtitle">{t("darijaM3VocabDesc")}</p>

              <div className="vocab-grid">
                {vocabList.map((item, idx) => (
                  <div key={idx} className="vocab-card">
                    <div className="vocab-word-header">
                      <div>
                        <div className="vocab-word" style={{display:"flex",alignItems:"center",gap:"8px"}}>
  <span>{item.word}</span>
  <SaveVocabButton id={'darija_3_' + item.word} word={item.word} translation={item.en} track="darija" missionNum={3} />
</div>
                        <div className="vocab-trans">{item.trans}</div>
                      </div>
                      <AudioButton text={item.word} arabicText={item.ar} />
                    </div>
                    <div className="vocab-context">{item.ctx}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════
              STEP 3 — Useful Expressions
              ══════════════════════════════════════════ */}
          {step === "expressions" && (
            <div>
              <h2 className="step-title">{t("darijaM3ExpTitle")}</h2>
              <p className="step-subtitle">{t("darijaM3ExpDesc")}</p>

              <div className="expressions-list">
                {expressionsList.map((exp, idx) => (
                  <div key={idx} className="expression-card">
                    <div className="expression-content">
                      <div className="exp-darija" style={{display:"flex",alignItems:"center",gap:"8px"}}>
  <span>{exp.darija}</span>
  <SaveVocabButton id={'darija_3_' + exp.darija} word={exp.darija} translation={exp.en || exp.fr} track="darija" missionNum={3} type="expression" />
</div>
                      <div className="exp-trans">{exp.trans}</div>
                    </div>
                    <AudioButton text={exp.darija} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════
              STEP 4 — Interactive Conversation
              ══════════════════════════════════════════ */}
          {step === "conversation" && (
            <div>
              <h2 className="step-title">{t("darijaM3ConvTitle")}</h2>
              <p className="step-subtitle">{t("darijaM3ConvDesc")}</p>

              <div className="conversation-container">
                {conversationData.map((msg, idx) => (
                  <div key={idx} className={`chat-bubble ${msg.role === "traveler" ? "user" : "driver"}`}>
                    <div className="chat-avatar">
                      <User size={18} className="chat-speaker-icon" />
                    </div>
                    <div className="chat-content">
                      <div className="chat-name">{msg.name}</div>
                      <div className="chat-text">{msg.text}</div>
                      <div className="chat-trans">{msg.trans}</div>
                    </div>
                    <AudioButton text={msg.text} />
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
                <h2 className="step-title" style={{ textAlign: "center" }}>{t("darijaM3SitTitle")}</h2>
                <p className="step-subtitle" style={{ textAlign: "center" }}>
                  {t("darijaM3SitDesc")} ({currentSituationIndex + 1}/{situationsData.length})
                </p>

                <div className="quiz-card" style={{ maxWidth: 600, margin: "0 auto" }}>
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

                  {situationFeedback && (
                    <div className={`quiz-feedback ${situationFeedback === "correct" ? "correct-text" : "wrong-text"}`} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      <div>{situationFeedback === "correct" ? currentSit.feedbackCorrect : currentSit.feedbackWrong}</div>
                      {situationFeedback === "correct" && (
                        <button className="mission-btn" style={{ alignSelf: "center", marginTop: 8 }} onClick={handleNextSituation}>
                          {lang === "FR" ? "Continuer" : lang === "AR" ? "متابعة" : "Continue"}
                          <ArrowRight size={18} />
                        </button>
                      )}
                      {situationFeedback === "wrong" && (
                        <button className="mission-btn secondary" style={{ alignSelf: "center", marginTop: 8 }} onClick={() => setSituationFeedback(null)}>
                          {lang === "FR" ? "Réessayer" : lang === "AR" ? "حاول مرة أخرى" : "Retry"}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })()}

          {/* ══════════════════════════════════════════
              STEP 6 — Quiz Challenge
              ══════════════════════════════════════════ */}
          {step === "quiz" && (
            <div>
              <h2 className="step-title" style={{ textAlign: "center" }}>{t("darijaM3QuizTitle")}</h2>
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
              <h2 className="step-title">{t("darijaM3RecapTitle")}</h2>
              <p className="step-subtitle">{t("darijaM3RecapDesc")}</p>

              <div className="expressions-list" style={{ maxWidth: 500, margin: "0 auto 40px", textAlign: "left" }}>
                <div className="expression-card">
                  <div className="expression-content">
                    <div className="exp-darija">3ndi rizirvassyon</div>
                    <div className="exp-trans">{lang === "FR" ? "J'ai une réservation" : lang === "AR" ? "لدي حجز" : "I have a reservation"}</div>
                  </div>
                </div>
                <div className="expression-card">
                  <div className="expression-content">
                    <div className="exp-darija">Fin kayn l'bit dyali?</div>
                    <div className="exp-trans">{lang === "FR" ? "Où est ma chambre ?" : lang === "AR" ? "أين هي غرفتي؟" : "Where is my room?"}</div>
                  </div>
                </div>
                <div className="expression-card">
                  <div className="expression-content">
                    <div className="exp-darija">M3ash l'ftour?</div>
                    <div className="exp-trans">{lang === "FR" ? "À quelle heure le petit déjeuner ?" : lang === "AR" ? "في أي وقت الفطور؟" : "What time is breakfast?"}</div>
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
              <h1 className="intro-title">{t("darijaM3CompleteTitle")}</h1>
              <p className="intro-desc">{t("darijaM3CompleteDesc")}</p>

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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--learn-success)' }}>
                    <CheckCircle size={20} />
                    <span style={{ fontWeight: 500 }}>{lang === "FR" ? "Mission 3 : Arrivée à l'Hôtel" : lang === "AR" ? "المهمة 3: تسجيل الدخول في الفندق" : "Mission 3: Hotel Check-In"}</span>
                  </div>
                  <div className="completion-progress-current" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Lock size={20} />
                    <span style={{ fontWeight: 500 }}>{t("darijaM3NextUnlock")}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginTop: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button className="mission-btn" onClick={() => navigate("/languages/darija/mission-4")}>
                  {lang === "FR" ? "Continuer vers la Mission 4" : lang === "AR" ? "متابعة إلى المهمة 4" : "Continue to Mission 4"}
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

      {/* Footer Navigation Buttons */}
      {step !== "intro" && step !== "completion" && step !== "quiz" && step !== "recap" && step !== "situations" && (
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

export default Mission3;
