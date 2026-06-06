import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X, ArrowRight, ArrowLeft, MessageCircle, CheckCircle, Map, Award, Lock } from "lucide-react";
import { useLanguage } from "../../accueil/LanguageContext";
import { useAuth } from "../../../context/AuthContext";
import { AudioButton } from "../common/AudioButton";
import "./mission.css";
import { useAutoProgress, canAccessMission } from "../../../utils/progress";
import LockedScreen from "../common/LockedScreen";
import FavoriteButton from "../common/FavoriteButton";
import SaveVocabButton from "../common/SaveVocabButton";

const vocabData = [
  { darija: "Fin kayn...?", arabicText: "فين كاين...؟", fr: "Où se trouve...?", en: "Where is...?", ar: "أين يوجد...؟", context: { en: "The essential phrase for asking locations. 'Fin kayn l'hotel?'", fr: "La phrase essentielle pour demander un lieu. 'Fin kayn l'hotel?'", ar: "العبارة الأساسية للسؤال عن الأماكن. 'فين كاين الفندق؟'" } },
  { darija: "Ymna", arabicText: "يمنى", fr: "Droite", en: "Right", ar: "يمين", context: { en: "Means 'Right'. Often '3la limn' (on the right).", fr: "Signifie 'Droite'. Souvent '3la limn' (sur la droite).", ar: "تعني 'يمين'. غالباً 'على ليمن' (على اليمين)." } },
  { standard: true, darija: "Ysar", arabicText: "يسار", fr: "Gauche", en: "Left", ar: "يسار", context: { en: "Means 'Left'. Often '3la lissr' (on the left).", fr: "Signifie 'Gauche'. Souvent '3la lissr' (sur la gauche).", ar: "تعني 'يسار'. غالباً 'على ليسر' (على اليسار)." } },
  { darija: "Niche", arabicText: "نيشان", fr: "Tout droit", en: "Straight ahead", ar: "مباشرة", context: { en: "Very common. Keep going straight.", fr: "Très courant. Continuez tout droit.", ar: "شائعة جداً. استمر بشكل مستقيم." } },
  { darija: "Qrib", arabicText: "قريب", fr: "Près", en: "Near", ar: "قريب", context: { en: "Means it's close. You can walk.", fr: "Signifie que c'est proche. Vous pouvez marcher.", ar: "تعني أنه قريب. يمكنك المشي." } },
  { darija: "B3id", arabicText: "بعيد", fr: "Loin", en: "Far", ar: "بعيد", context: { en: "Means it's far. You might need a taxi.", fr: "Signifie que c'est loin. Vous aurez peut-être besoin d'un taxi.", ar: "تعني أنه بعيد. قد تحتاج إلى سيارة أجرة." } }
];

const expressionsData = [
  { darija: "Fin kayn l'hotel?", arabicText: "فين كاين الفندق؟", fr: "Où est l'hôtel ?", en: "Where is the hotel?", ar: "أين يوجد الفندق؟", context: { en: "Replace 'l'hotel' with any place.", fr: "Remplacez 'l'hotel' par n'importe quel endroit.", ar: "استبدل 'الفندق' بأي مكان." } },
  { darija: "Wach qrib?", arabicText: "واش قريب؟", fr: "Est-ce que c'est près ?", en: "Is it near?", ar: "هل هو قريب؟", context: { en: "Useful to know if you should take a taxi.", fr: "Utile pour savoir si vous devez prendre un taxi.", ar: "مفيد لمعرفة ما إذا كان يجب أن تأخذ سيارة أجرة." } },
  { darija: "Nmshi ymna wla ysar?", arabicText: "نمشي يمنى ولا يسار؟", fr: "Je vais à droite ou à gauche ?", en: "Do I go right or left?", ar: "أذهب يميناً أم يساراً؟", context: { en: "When you reach an intersection.", fr: "Quand vous arrivez à une intersection.", ar: "عندما تصل إلى تقاطع." } },
  { darija: "Ch7al mn d9i9a?", arabicText: "شحال من دقيقة؟", fr: "Combien de minutes ?", en: "How many minutes?", ar: "كم عدد الدقائق؟", context: { en: "To ask about the walking distance.", fr: "Pour demander la distance de marche.", ar: "للسؤال عن مسافة المشي." } }
];

const conversationData = [
  { speaker: "Traveler", darija: "Salam, sm7li. Fin kayn la gare?", arabicText: "سلام، سمحلي. فين كاين لاگار؟", fr: "Bonjour, excusez-moi. Où est la gare ?", en: "Hello, excuse me. Where is the train station?", isRight: true },
  { speaker: "Local", darija: "Salam. La gare? Sair niche.", arabicText: "سلام. لاگار؟ سير نيشان.", fr: "Bonjour. La gare ? Allez tout droit.", en: "Hello. The train station? Go straight ahead.", isRight: false },
  { speaker: "Traveler", darija: "Wach qrib wla b3id?", arabicText: "واش قريب ولا بعيد؟", fr: "C'est près ou loin ?", en: "Is it near or far?", isRight: true },
  { speaker: "Local", darija: "Qrib, shi 5 d9ay9.", arabicText: "قريب، شي 5 دقايق.", fr: "Près, environ 5 minutes.", en: "Near, about 5 minutes.", isRight: false },
  { speaker: "Traveler", darija: "Ndor ymna?", arabicText: "ندور يمنى؟", fr: "Je tourne à droite ?", en: "Do I turn right?", isRight: true },
  { speaker: "Local", darija: "La, ndor ysar. 3la lissr.", arabicText: "لا، ندور يسار. على ليسر.", fr: "Non, tournez à gauche. Sur la gauche.", en: "No, turn left. On the left.", isRight: false },
  { speaker: "Traveler", instructor: true, darija: "Shukran bzaf!", arabicText: "شكرا بزاف!", fr: "Merci beaucoup !", en: "Thank you very much!", isRight: true },
];

const situationsData = [
  {
    q: { en: "You are trying to find the train station and want to know if you can walk there. What do you ask?", fr: "Vous essayez de trouver la gare et voulez savoir si vous pouvez y aller à pied. Que demandez-vous ?", ar: "أنت تحاول العثور على محطة القطار وتريد أن تعرف ما إذا كان يمكنك المشي إلى هناك. ماذا تسأل؟" },
    options: { en: ["Wach qrib?", "Fin kayn l'hotel?"], fr: ["Wach qrib?", "Fin kayn l'hotel?"], ar: ["واش قريب؟", "فين كاين الفندق؟"] },
    correctIdx: 0,
    feedback: { en: "Correct! 'Wach qrib?' means 'Is it near?'.", fr: "Correct ! 'Wach qrib?' signifie 'Est-ce que c'est près ?'.", ar: "صحيح! 'واش قريب؟' تعني 'هل هو قريب؟'." },
    feedbackWrong: { en: "That means 'Where is the hotel?'. You need to ask if it's close.", fr: "Ça signifie 'Où est l'hôtel ?'. Vous devez demander si c'est proche.", ar: "هذا يعني 'أين الفندق؟'. يجب أن تسأل عما إذا كان قريباً." }
  },
  {
    q: { en: "A local tells you 'Sair niche, w ndor ymna'. Where should you go?", fr: "Un habitant vous dit 'Sair niche, w ndor ymna'. Où devez-vous aller ?", ar: "يخبرك شخص محلي 'سير نيشان، و ندور يمنى'. أين يجب أن تذهب؟" },
    options: { en: ["Straight, then left", "Straight, then right"], fr: ["Tout droit, puis à gauche", "Tout droit, puis à droite"], ar: ["مباشرة، ثم يساراً", "مباشرة، ثم يميناً"] },
    correctIdx: 1,
    feedback: { en: "Correct! 'Niche' is straight, and 'Ymna' is right.", fr: "Correct ! 'Niche' c'est tout droit, et 'Ymna' c'est à droite.", ar: "صحيح! 'نيشان' تعني مباشرة، و 'يمنى' تعني يميناً." },
    feedbackWrong: { en: "Oops. 'Ysar' is left. 'Ymna' is right.", fr: "Oops. 'Ysar' c'est à gauche. 'Ymna' c'est à droite.", ar: "عفواً. 'يسار' هو اليسار. 'يمنى' هو اليمين." }
  }
];

const quizData = [
  {
    q: { en: 'What does "Niche" mean?', fr: 'Que signifie "Niche" ?', ar: 'ماذا تعني "نيشان"؟' },
    options: { en: ["Right", "Straight ahead", "Left", "Far"], fr: ["Droite", "Tout droit", "Gauche", "Loin"], ar: ["يمين", "مباشرة", "يسار", "بعيد"] },
    answer: 1
  },
  {
    q: { en: 'How do you ask "Where is...?"', fr: 'Comment demandez-vous "Où est..." ?', ar: 'كيف تسأل "أين يوجد...؟"' },
    options: { en: ["Wach qrib?", "Fin kayn...?", "Ch7al mn d9i9a?", "Ndor ymna?"], fr: ["Wach qrib?", "Fin kayn...?", "Ch7al mn d9i9a?", "Ndor ymna?"], ar: ["واش قريب؟", "فين كاين...؟", "شحال من دقيقة؟", "ندور يمنى؟"] },
    answer: 1
  },
  {
    q: { en: 'If a place is very far, the local will say it is:', fr: 'Si un endroit est très loin, l\'habitant dira qu\'il est :', ar: 'إذا كان المكان بعيداً جداً، سيقول المحلي إنه:' },
    options: { en: ["Qrib", "Ymna", "B3id", "Ysar"], fr: ["Qrib", "Ymna", "B3id", "Ysar"], ar: ["قريب", "يمنى", "بعيد", "يسار"] },
    answer: 2
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

function Mission6() {
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
        <FavoriteButton track="darija" missionNum={6} />
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
              <div className="intro-icon"><Map size={40} /></div>
              <h1 className="intro-title">{lang === "FR" ? "Demander son Chemin" : lang === "AR" ? "طلب الاتجاهات" : "Asking Directions"}</h1>
              <p className="intro-desc">
                {lang === "FR" ? "Apprenez à demander de l'aide, comprendre les instructions de direction et naviguer dans les villes marocaines comme un local." :
                 lang === "AR" ? "تعلم كيف تطلب المساعدة، وتفهم إرشادات الاتجاهات، وتتنقل في المدن المغربية كالمحليين." :
                 "Learn how to ask for help, understand direction instructions, and navigate Moroccan cities like a local."}
              </p>
              <button className="mission-btn" onClick={handleNext}>
                {lang === "FR" ? "Commencer la mission" : lang === "AR" ? "ابدأ المهمة" : "Start Mission"}
              </button>
            </div>
          )}

          {step === "vocab" && (
            <div>
              <h2 className="step-title">{lang === "FR" ? "Vocabulaire de Navigation" : lang === "AR" ? "مفردات التنقل" : "Navigation Vocabulary"}</h2>
              <p className="step-subtitle">{lang === "FR" ? "Les mots essentiels pour se repérer." : lang === "AR" ? "الكلمات الأساسية لتحديد موقعك." : "Essential words to find your way."}</p>
              <div className="vocab-grid">
                {vocabData.map((word, idx) => (
                  <div key={idx} className="vocab-card">
                    <AudioButton text={word.darija} ttsText={word.arabicText} overrideLang="AR" />
                    <div className="vocab-word" style={{display:"flex",alignItems:"center",gap:"8px"}}>
  <span>{word.darija}</span>
  <SaveVocabButton id={'darija_6_' + word.darija} word={word.darija} translation={word.en} track="darija" missionNum={6} />
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
              <h2 className="step-title">{lang === "FR" ? "Expressions Utiles" : lang === "AR" ? "عبارات مفيدة" : "Useful Expressions"}</h2>
              <p className="step-subtitle">{lang === "FR" ? "Les phrases clés pour trouver votre chemin." : lang === "AR" ? "العبارات الرئيسية لإيجاد طريقك." : "Key phrases to find your way."}</p>
              <div className="expressions-list">
                {expressionsData.map((exp, idx) => (
                  <div key={idx} className="expression-card">
                    <AudioButton text={exp.darija} ttsText={exp.arabicText} overrideLang="AR" style={{position:'static', flexShrink:0}} />
                    <div className="expression-content">
                      <div className="exp-darija" style={{display:"flex",alignItems:"center",gap:"8px"}}>
  <span>{exp.darija}</span>
  <SaveVocabButton id={'darija_6_' + exp.darija} word={exp.darija} translation={exp.en || exp.fr} track="darija" missionNum={6} type="expression" />
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
              <p className="step-subtitle">{lang === "FR" ? "Demander le chemin vers la gare." : lang === "AR" ? "السؤال عن الطريق إلى محطة القطار." : "Asking the way to the train station."}</p>
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
              <h2 className="step-title">{lang === "FR" ? "Défi d'Orientation" : lang === "AR" ? "تحدي الاتجاهات" : "Direction Challenge"}</h2>
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
              <div className="completion-icon"><Award size={48} /></div>
              <h1 className="intro-title">{lang === "FR" ? "Mission Accomplie !" : lang === "AR" ? "تمت المهمة!" : "Mission Completed!"}</h1>
              <p className="intro-desc">
                {lang === "FR" ? "Vous savez maintenant comment demander votre chemin en arabe marocain." :
                 lang === "AR" ? "أنت تعرف الآن كيف تطلب الاتجاهات باللغة العربية المغربية." :
                 "You now know how to ask for directions in Moroccan Arabic."}
              </p>
              
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
                    <span style={{ fontWeight: 500 }}>{lang === "FR" ? "Mission 3 : Hôtel" : lang === "AR" ? "المهمة 3: الفندق" : "Mission 3: Hotel"}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--learn-success)' }}>
                    <CheckCircle size={20} />
                    <span style={{ fontWeight: 500 }}>{lang === "FR" ? "Mission 4 : Restaurant & Café" : lang === "AR" ? "المهمة 4: مطعم ومقهى" : "Mission 4: Restaurant & Café"}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--learn-success)' }}>
                    <CheckCircle size={20} />
                    <span style={{ fontWeight: 500 }}>{lang === "FR" ? "Mission 5 : Souk & Négociation" : lang === "AR" ? "المهمة 5: الأسواق والمساومة" : "Mission 5: Souk & Bargaining"}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--learn-success)' }}>
                    <CheckCircle size={20} />
                    <span style={{ fontWeight: 500 }}>{lang === "FR" ? "Mission 6 : Demander son Chemin" : lang === "AR" ? "المهمة 6: طلب الاتجاهات" : "Mission 6: Asking Directions"}</span>
                  </div>
                  <div className="completion-progress-current" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Lock size={20} />
                    <span style={{ fontWeight: 500 }}>{lang === "FR" ? "Dernière Mission : Urgences" : lang === "AR" ? "المهمة الأخيرة: حالات الطوارئ" : "Final Mission: Emergencies"}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginTop: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button className="mission-btn" onClick={() => navigate("/languages/darija/mission-7")}>
                  {lang === "FR" ? "Continuer vers la Mission 7" : lang === "AR" ? "متابعة إلى المهمة 7" : "Continue to Mission 7"}
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

export default Mission6;
