import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X, ArrowRight, ArrowLeft, MessageCircle, CheckCircle, ShieldAlert, Award } from "lucide-react";
import { useLanguage } from "../../accueil/LanguageContext";
import { useAuth } from "../../../context/AuthContext";
import { AudioButton } from "../common/AudioButton";
import "./mission.css";
import { useAutoProgress, canAccessMission } from "../../../utils/progress";
import LockedScreen from "../common/LockedScreen";
import FavoriteButton from "../common/FavoriteButton";
import SaveVocabButton from "../common/SaveVocabButton";

const vocabData = [
  { darija: "Mosa3ada", arabicText: "مساعدة", fr: "Aide", en: "Help", ar: "مساعدة", context: { en: "The most important word for emergencies.", fr: "Le mot le plus important pour les urgences.", ar: "أهم كلمة في حالات الطوارئ." } },
  { darija: "Police", arabicText: "بوليس", fr: "Police", en: "Police", ar: "شرطة", context: { en: "Same word in Darija. Dial 19 in Morocco for police.", fr: "Même mot en darija. Composez le 19 au Maroc pour la police.", ar: "نفس الكلمة بالدارجة. اتصل بـ 19 في المغرب للشرطة." } },
  { darija: "Sbitar", arabicText: "سبيطار", fr: "Hôpital", en: "Hospital", ar: "مستشفى", context: { en: "Used for any hospital or clinic.", fr: "Utilisé pour tout hôpital ou clinique.", ar: "تستخدم لأي مستشفى أو عيادة." } },
  { darija: "Tabib", arabicText: "طبيب", fr: "Docteur", en: "Doctor", ar: "طبيب", context: { en: "Medical doctor.", fr: "Médecin.", ar: "طبيب." } },
  { darija: "Ana mred", arabicText: "أنا مريض", fr: "Je suis malade", en: "I am sick", ar: "أنا مريض", context: { en: "Use if you need medical attention.", fr: "Utilisez si vous avez besoin de soins médicaux.", ar: "استخدمها إذا كنت بحاجة إلى رعاية طبية." } },
  { darija: "Kayn mochkil", arabicText: "كاين مشكل", fr: "Il y a un problème", en: "There is a problem", ar: "هناك مشكلة", context: { en: "Good way to alert someone that something is wrong.", fr: "Bonne façon d'alerter quelqu'un que quelque chose ne va pas.", ar: "طريقة جيدة لتنبيه شخص ما بوجود خطأ ما." } }
];

const expressionsData = [
  { darija: "3afak, bghit mosa3ada.", arabicText: "عافاك، بغيت مساعدة.", fr: "S'il vous plaît, j'ai besoin d'aide.", en: "Please, I need help.", ar: "من فضلك، أحتاج مساعدة.", context: { en: "Polite and urgent way to ask for assistance.", fr: "Façon polie et urgente de demander de l'aide.", ar: "طريقة مهذبة وعاجلة لطلب المساعدة." } },
  { darija: "Fin kayn sbitar?", arabicText: "فين كاين السبيطار؟", fr: "Où est l'hôpital ?", en: "Where is the hospital?", ar: "أين يوجد المستشفى؟", context: { en: "Crucial if you or someone is hurt.", fr: "Crucial si vous ou quelqu'un d'autre est blessé.", ar: "مهم جداً إذا كنت أنت أو أي شخص آخر مصاباً." } },
  { darija: "Ana mred bzaf.", arabicText: "أنا مريض بزاف.", fr: "Je suis très malade.", en: "I am very sick.", ar: "أنا مريض جداً.", context: { en: "Adds 'bzaf' to indicate severity.", fr: "Ajoute 'bzaf' pour indiquer la gravité.", ar: "تضيف 'بزاف' للإشارة إلى الخطورة." } },
  { darija: "3ayet l police!", arabicText: "عيط للبوليس!", fr: "Appelez la police !", en: "Call the police!", ar: "اتصل بالشرطة!", context: { en: "Use if you feel unsafe or see a crime.", fr: "Utilisez si vous ne vous sentez pas en sécurité ou si vous êtes témoin d'un crime.", ar: "استخدمها إذا كنت لا تشعر بالأمان أو رأيت جريمة." } }
];

const conversationData = [
  { speaker: "Traveler", darija: "Sm7li 3afak, kayn mochkil.", arabicText: "سمحلي عافاك، كاين مشكل.", fr: "Excusez-moi s'il vous plaît, il y a un problème.", en: "Excuse me please, there is a problem.", isRight: true },
  { speaker: "Local", darija: "Ash kayn? Labas?", arabicText: "أش كاين؟ لاباس؟", fr: "Qu'y a-t-il ? Ça va ?", en: "What is it? Are you okay?", isRight: false },
  { speaker: "Traveler", darija: "La, ana mred bzaf. Bghit tabib.", arabicText: "لا، أنا مريض بزاف. بغيت طبيب.", fr: "Non, je suis très malade. Je veux un médecin.", en: "No, I am very sick. I want a doctor.", isRight: true },
  { speaker: "Local", darija: "Wakha, sbitar qrib. Ndiik tema.", arabicText: "واخا، السبيطار قريب. نديك تما.", fr: "D'accord, l'hôpital est proche. Je t'emmène là-bas.", en: "Okay, the hospital is close. I'll take you there.", isRight: false },
  { speaker: "Traveler", darija: "Shukran bzaf 3la mosa3ada.", arabicText: "شكرا بزاف على المساعدة.", fr: "Merci beaucoup pour l'aide.", en: "Thank you very much for the help.", isRight: true }
];

const situationsData = [
  {
    q: { en: "You lost your bag and need to report it. What do you tell someone?", fr: "Vous avez perdu votre sac et devez le signaler. Que dites-vous à quelqu'un ?", ar: "لقد فقدت حقيبتك وتحتاج إلى الإبلاغ عنها. ماذا تقول لشخص ما؟" },
    options: { en: ["3ayet l police!", "Fin kayn sbitar?"], fr: ["3ayet l police!", "Fin kayn sbitar?"], ar: ["عيط للبوليس!", "فين كاين السبيطار؟"] },
    correctIdx: 0,
    feedback: { en: "Correct! '3ayet l police' means 'Call the police'.", fr: "Correct ! '3ayet l police' signifie 'Appelez la police'.", ar: "صحيح! 'عيط للبوليس' تعني 'اتصل بالشرطة'." },
    feedbackWrong: { en: "That means 'Where is the hospital?'. You need the police for a lost bag.", fr: "Ça signifie 'Où est l'hôpital ?'. Vous avez besoin de la police pour un sac perdu.", ar: "هذا يعني 'أين المستشفى؟'. أنت بحاجة إلى الشرطة من أجل حقيبة مفقودة." }
  },
  {
    q: { en: "You suddenly feel very ill on the street. You stop a local. What do you say?", fr: "Vous vous sentez soudainement très mal dans la rue. Vous arrêtez un habitant. Que dites-vous ?", ar: "تشعر فجأة بمرض شديد في الشارع. توقف شخصاً محلياً. ماذا تقول؟" },
    options: { en: ["Kayn mochkil. 3ayet l police.", "Ana mred bzaf. Fin kayn sbitar?"], fr: ["Kayn mochkil. 3ayet l police.", "Ana mred bzaf. Fin kayn sbitar?"], ar: ["كاين مشكل. عيط للبوليس.", "أنا مريض بزاف. فين كاين السبيطار؟"] },
    correctIdx: 1,
    feedback: { en: "Correct! This translates to 'I am very sick. Where is the hospital?'.", fr: "Correct ! Cela se traduit par 'Je suis très malade. Où est l'hôpital ?'.", ar: "صحيح! هذا يترجم إلى 'أنا مريض جداً. أين المستشفى؟'." },
    feedbackWrong: { en: "While there is a problem, calling the police isn't the best first step for a medical issue.", fr: "Bien qu'il y ait un problème, appeler la police n'est pas la meilleure première étape pour un problème médical.", ar: "في حين أن هناك مشكلة، فإن الاتصال بالشرطة ليس أفضل خطوة أولى لمشكلة طبية." }
  }
];

const quizData = [
  {
    q: { en: 'What does "Mosa3ada" mean?', fr: 'Que signifie "Mosa3ada" ?', ar: 'ماذا تعني "مساعدة"؟' },
    options: { en: ["Doctor", "Hospital", "Help", "Problem"], fr: ["Docteur", "Hôpital", "Aide", "Problème"], ar: ["طبيب", "مستشفى", "مساعدة", "مشكلة"] },
    answer: 2
  },
  {
    q: { en: 'How do you say "I am sick"?', fr: 'Comment dit-on "Je suis malade" ?', ar: 'كيف تقول "أنا مريض"؟' },
    options: { en: ["Kayn mochkil", "Ana mred", "Tabib", "Sbitar"], fr: ["Kayn mochkil", "Ana mred", "Tabib", "Sbitar"], ar: ["كاين مشكل", "أنا مريض", "طبيب", "سبيطار"] },
    answer: 1
  },
  {
    q: { en: 'Which number do you call for the police in Morocco?', fr: 'Quel numéro appelez-vous pour la police au Maroc ?', ar: 'ما هو الرقم الذي تتصل به للشرطة في المغرب؟' },
    options: { en: ["911", "19", "112", "15"], fr: ["911", "19", "112", "15"], ar: ["911", "19", "112", "15"] },
    answer: 1
  }
];

const STEPS = ["intro", "vocab", "expressions", "conversation", "situations", "quiz", "completion"];

const STEP_LABELS = {
  intro: { FR: "Introduction", EN: "Introduction", AR: "مقدمة" },
  vocab: { FR: "Vocabulaire", EN: "Vocabulary", AR: "مفردات" },
  expressions: { FR: "Expressions", EN: "Expressions", AR: "عبارات" },
  conversation: { FR: "Conversation", EN: "Conversation", AR: "محادثة" },
  situations: { FR: "Situations", EN: "Situations", AR: "مواقف" },
  quiz: { FR: "Quiz", EN: "Quiz", AR: "اختبار" },
  completion: { FR: "Terminé", EN: "Completed", AR: "اكتملت" },
};

function Mission7() {
  const { lang, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizFeedback, setQuizFeedback] = useState(null);
  const [currentSituationIndex, setCurrentSituationIndex] = useState(0);
  const [situationFeedback, setSituationFeedback] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, [currentStepIndex]);

  const step = STEPS[currentStepIndex];
  useAutoProgress(step);
  const progressPercent = (currentStepIndex / (STEPS.length - 1)) * 100;

  const handleNext = () => { if (currentStepIndex < STEPS.length - 1) setCurrentStepIndex(prev => prev + 1); };
  const handleBack = () => { if (currentStepIndex > 0) setCurrentStepIndex(prev => prev - 1); };

  const getLangProp = (item, prop) => {
    if (typeof item[prop] === 'object') return item[prop][lang.toLowerCase()] || item[prop].en;
    return item[prop] || item[lang.toLowerCase()] || item.en || "";
  };

  const handleQuizAnswer = (idx) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    const isCorrect = idx === quizData[quizQuestionIndex].answer;
    setQuizFeedback(isCorrect ? 'correct' : 'wrong');
    setTimeout(() => {
      if (isCorrect) {
        if (quizQuestionIndex < quizData.length - 1) { setQuizQuestionIndex(prev => prev + 1); setSelectedOption(null); setQuizFeedback(null); }
        else { handleNext(); }
      } else { setSelectedOption(null); setQuizFeedback(null); }
    }, 1500);
  };

  const handleSituationAnswer = (idx) => {
    if (situationFeedback) return;
    setSituationFeedback(idx === situationsData[currentSituationIndex].correctIdx ? "correct" : "wrong");
  };

  const handleNextSituation = () => {
    if (currentSituationIndex < situationsData.length - 1) { setCurrentSituationIndex(prev => prev + 1); setSituationFeedback(null); }
    else { handleNext(); }
  };

  const pathMatch = window.location.pathname.match(/\/languages\/(\w+)\/mission-(\d+)/);
  const currentTrack = pathMatch?.[1];
  const currentMissionNum = pathMatch?.[2] ? parseInt(pathMatch[2]) : 0;
  if (currentTrack && currentMissionNum && !canAccessMission(currentTrack, currentMissionNum, user)) {
    return <LockedScreen track={currentTrack} />;
  }
  return (
    <div className={`mission-container ${isRTL ? "rtl" : "ltr"}`}>
      <div className="mission-header">
        <button className="mission-close" onClick={() => navigate("/languages")}><X size={24} /></button>
        <FavoriteButton track="darija" missionNum={7} />
        <div className="mission-progress-bar"><div className="mission-progress-fill" style={{ width: `${progressPercent}%` }}></div></div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="mission-content">
          {/* Step Indicator */}
          <div className="step-indicator">
            <span className="step-indicator-number">{lang === "FR" ? "Étape" : lang === "AR" ? "خطوة" : "Step"} {currentStepIndex + 1}/{STEPS.length}</span>
            <span className="step-indicator-name">{STEP_LABELS[STEPS[currentStepIndex]][lang]}</span>
          </div>

          {step === "intro" && (
            <div className="intro-step">
              <div className="intro-icon"><ShieldAlert size={40} /></div>
              <h1 className="intro-title">{lang === "FR" ? "Situations d'Urgence" : lang === "AR" ? "حالات الطوارئ" : "Emergency Situations"}</h1>
              <p className="intro-desc">
                {lang === "FR" ? "La sécurité avant tout. Apprenez le vocabulaire essentiel pour demander de l'aide, trouver un hôpital ou contacter la police au Maroc." :
                 lang === "AR" ? "السلامة أولاً. تعلم المفردات الأساسية لطلب المساعدة، أو العثور على مستشفى، أو الاتصال بالشرطة في المغرب." :
                 "Safety first. Learn the essential vocabulary to ask for help, find a hospital, or contact the police in Morocco."}
              </p>
              <button className="mission-btn" onClick={handleNext}>
                {lang === "FR" ? "Commencer la mission" : lang === "AR" ? "ابدأ المهمة" : "Start Mission"}
              </button>
            </div>
          )}

          {step === "vocab" && (
            <div>
              <h2 className="step-title">{lang === "FR" ? "Vocabulaire de Sécurité" : lang === "AR" ? "مفردات السلامة" : "Safety Vocabulary"}</h2>
              <p className="step-subtitle">{lang === "FR" ? "Les mots à connaître en cas de besoin." : lang === "AR" ? "الكلمات التي يجب معرفتها عند الحاجة." : "Words to know when in need."}</p>
              <div className="vocab-grid">
                {vocabData.map((word, idx) => (
                  <div key={idx} className="vocab-card">
                    <AudioButton text={word.darija} ttsText={word.arabicText} overrideLang="AR" />
                    <div className="vocab-word" style={{display:"flex",alignItems:"center",gap:"8px"}}>
  <span>{word.darija}</span>
  <SaveVocabButton id={'darija_7_' + word.darija} word={word.darija} translation={word.en} track="darija" missionNum={7} />
</div>
                    <div className="vocab-translations">
                      <span className="vocab-trans-item"><strong>{lang === "FR" ? "Français:" : "English:"}</strong> {lang === "FR" ? word.fr : word.en}</span>
                      <span className="vocab-trans-item ar">{word.ar}</span>
                    </div>
                    <div className="chat-trans" style={{marginTop: '16px', color: 'var(--learn-text-secondary)', fontSize: '0.85rem'}}>
                      <MessageCircle size={14} style={{display:'inline', marginRight:'4px', verticalAlign:'middle'}}/>
                      {getLangProp(word, 'context')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === "expressions" && (
            <div>
              <h2 className="step-title">{lang === "FR" ? "Expressions d'Urgence" : lang === "AR" ? "عبارات الطوارئ" : "Emergency Expressions"}</h2>
              <p className="step-subtitle">{lang === "FR" ? "Les phrases pour demander de l'aide." : lang === "AR" ? "العبارات لطلب المساعدة." : "Phrases to ask for help."}</p>
              <div className="expressions-list">
                {expressionsData.map((exp, idx) => (
                  <div key={idx} className="expression-card">
                    <AudioButton text={exp.darija} ttsText={exp.arabicText} overrideLang="AR" style={{position:'static', flexShrink:0}} />
                    <div className="expression-content">
                      <div className="exp-darija" style={{display:"flex",alignItems:"center",gap:"8px"}}>
  <span>{exp.darija}</span>
  <SaveVocabButton id={'darija_7_' + exp.darija} word={exp.darija} translation={exp.en || exp.fr} track="darija" missionNum={7} type="expression" />
</div>
                      <div className="exp-trans">{lang === "FR" ? exp.fr : lang === "AR" ? exp.ar : exp.en}</div>
                      <div className="chat-trans" style={{marginTop: '8px', color: 'var(--learn-text-secondary)'}}>
                        {getLangProp(exp, 'context')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === "conversation" && (
            <div>
              <h2 className="step-title">{lang === "FR" ? "En Pratique" : lang === "AR" ? "في الممارسة" : "In Practice"}</h2>
              <p className="step-subtitle">{lang === "FR" ? "Demander une assistance médicale." : lang === "AR" ? "طلب المساعدة الطبية." : "Asking for medical assistance."}</p>
              <div className="chat-container">
                {conversationData.map((line, idx) => (
                  <div key={idx} className={`chat-bubble-wrapper ${line.isRight ? 'right' : 'left'}`}>
                    <div className="chat-speaker">
                      {line.speaker === "Traveler" ? (lang === "FR" ? "Vous" : lang === "AR" ? "أنت" : "You") : (lang === "FR" ? "Habitant" : lang === "AR" ? "محلي" : "Local")}
                    </div>
                    <div className="chat-bubble">
                      <div>
                        <div>{line.darija}</div>
                        <div className="chat-trans">{lang === "FR" ? line.fr : lang === "AR" ? line.ar : line.en}</div>
                      </div>
                      <AudioButton text={line.darija} ttsText={line.arabicText} overrideLang="AR" style={{position:'static', width:32, height:32, flexShrink:0}} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === "situations" && (() => {
            const sit = situationsData[currentSituationIndex];
            return (
              <div>
                <h2 className="step-title" style={{ textAlign: "center" }}>{lang === "FR" ? "Mises en Situation" : lang === "AR" ? "مواقف عملية" : "Real Situations"}</h2>
                <p className="step-subtitle" style={{ textAlign: "center" }}>
                  {lang === "FR" ? `Situation ${currentSituationIndex + 1} sur ${situationsData.length}` : lang === "AR" ? `الموقف ${currentSituationIndex + 1} من ${situationsData.length}` : `Situation ${currentSituationIndex + 1} of ${situationsData.length}`}
                </p>
                <div className="quiz-card" style={{ maxWidth: 600, margin: "0 auto" }}>
                  <div className="quiz-question">{getLangProp(sit, 'q')}</div>
                  <div className="quiz-options">
                    {getLangProp(sit, 'options').map((opt, idx) => {
                      let cls = "quiz-option";
                      if (situationFeedback) { if (idx === sit.correctIdx) cls += " correct"; else cls += " wrong"; }
                      return <button key={idx} className={cls} onClick={() => handleSituationAnswer(idx)} disabled={situationFeedback !== null}>{opt}</button>;
                    })}
                  </div>
                  {situationFeedback && (
                    <div className={`quiz-feedback ${situationFeedback === "correct" ? "correct-text" : "wrong-text"}`} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      <div>{situationFeedback === "correct" ? getLangProp(sit, 'feedback') : getLangProp(sit, 'feedbackWrong')}</div>
                      {situationFeedback === "correct" && (
                        <button className="mission-btn" style={{ alignSelf: "center", marginTop: 8 }} onClick={handleNextSituation}>
                          {lang === "FR" ? "Continuer" : lang === "AR" ? "متابعة" : "Continue"} <ArrowRight size={18} />
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

          {step === "quiz" && (
            <div>
              <h2 className="step-title">{lang === "FR" ? "Test de Sécurité" : lang === "AR" ? "اختبار السلامة" : "Safety Test"}</h2>
              <p className="step-subtitle">
                {lang === "FR" ? `Question ${quizQuestionIndex + 1} sur ${quizData.length}` : lang === "AR" ? `السؤال ${quizQuestionIndex + 1} من ${quizData.length}` : `Question ${quizQuestionIndex + 1} of ${quizData.length}`}
              </p>
              <div className="quiz-card">
                <div className="quiz-question">{getLangProp(quizData[quizQuestionIndex], 'q')}</div>
                <div className="quiz-options">
                  {getLangProp(quizData[quizQuestionIndex], 'options').map((opt, idx) => {
                    let cls = "quiz-option";
                    if (selectedOption === idx) { if (quizFeedback === 'correct') cls += " correct"; else if (quizFeedback === 'wrong') cls += " wrong"; else cls += " selected"; }
                    else if (selectedOption !== null && idx === quizData[quizQuestionIndex].answer && quizFeedback === 'wrong') cls += " correct";
                    return <button key={idx} className={cls} onClick={() => handleQuizAnswer(idx)} disabled={selectedOption !== null}>{opt}</button>;
                  })}
                </div>
                <div className={`quiz-feedback ${quizFeedback ? (quizFeedback === 'correct' ? 'correct-text' : 'wrong-text') : ''}`}>
                  {quizFeedback === 'correct' && (lang === "FR" ? "Excellent !" : lang === "AR" ? "ممتاز!" : "Excellent!")}
                  {quizFeedback === 'wrong' && (lang === "FR" ? "Oops, essayez encore." : lang === "AR" ? "عفوا، حاول مرة أخرى." : "Oops, try again.")}
                </div>
              </div>
            </div>
          )}

          {step === "completion" && (
            <div className="completion-step">
              <div className="completion-icon" style={{ background: 'var(--learn-accent)', padding: '24px', borderRadius: '50%', boxShadow: '0 10px 25px rgba(245, 158, 11, 0.4)' }}>
                <Award size={64} />
              </div>
              <h1 className="intro-title" style={{ fontSize: '2.5rem', marginTop: '20px' }}>
                {lang === "FR" ? "Félicitations !" : lang === "AR" ? "مبروك!" : "Congratulations!"}
              </h1>
              <p className="intro-desc" style={{ fontSize: '1.2rem', marginBottom: '40px' }}>
                {lang === "FR" ? "Vous avez terminé le parcours complet d'apprentissage de la Darija." :
                 lang === "AR" ? "لقد أكملت مسار تعلم الدارجة بالكامل." :
                 "You have completed the full Darija Learning Path."}
              </p>
              
              {/* FINAL ROADMAP PROGRESSION */}
              <div style={{ textAlign: 'left', background: 'var(--learn-surface)', padding: '24px', borderRadius: '20px', border: '2px solid var(--learn-accent)', width: '100%', maxWidth: '450px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                <h4 style={{ marginBottom: '20px', fontSize: '1.3rem', fontWeight: 700, color: 'var(--learn-accent)', textAlign: 'center' }}>
                  {lang === "FR" ? "Parcours Darija Terminé" : lang === "AR" ? "تم إكمال مسار الدارجة" : "Darija Path Completed"}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {[
                    { fr: "Mission 1 : Aéroport", ar: "المهمة 1: المطار", en: "Mission 1: Airport" },
                    { fr: "Mission 2 : Trajet en Taxi", ar: "المهمة 2: رحلة التاكسي", en: "Mission 2: Taxi Journey" },
                    { fr: "Mission 3 : Hôtel", ar: "المهمة 3: الفندق", en: "Mission 3: Hotel" },
                    { fr: "Mission 4 : Restaurant & Café", ar: "المهمة 4: مطعم ومقهى", en: "Mission 4: Restaurant & Café" },
                    { fr: "Mission 5 : Souk & Négociation", ar: "المهمة 5: الأسواق والمساومة", en: "Mission 5: Souk & Bargaining" },
                    { fr: "Mission 6 : Demander son Chemin", ar: "المهمة 6: طلب الاتجاهات", en: "Mission 6: Asking Directions" },
                    { fr: "Mission 7 : Urgences", ar: "المهمة 7: حالات الطوارئ", en: "Mission 7: Emergencies" }
                  ].map((mission, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--learn-success)', padding: '8px', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '8px' }}>
                      <CheckCircle size={22} fill="currentColor" color="white" />
                      <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>
                        {lang === "FR" ? mission.fr : lang === "AR" ? mission.ar : mission.en}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginTop: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button className="mission-btn" onClick={() => navigate("/languages")}>
                  {lang === "FR" ? "Voir tous les parcours" : lang === "AR" ? "عرض جميع المسارات" : "Browse All Courses"}
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

      {step !== "intro" && step !== "completion" && step !== "quiz" && step !== "situations" && (
        <div className="mission-footer">
          <button className="mission-btn secondary" onClick={handleBack} disabled={currentStepIndex === 0}>
            <ArrowLeft size={18} /> {lang === "FR" ? "Précédent" : lang === "AR" ? "السابق" : "Back"}
          </button>
          <button className="mission-btn" onClick={handleNext}>
            {lang === "FR" ? "Continuer" : lang === "AR" ? "متابعة" : "Continue"} <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}

export default Mission7;
