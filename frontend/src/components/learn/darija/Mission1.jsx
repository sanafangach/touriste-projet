import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X, ArrowRight, ArrowLeft, MessageCircle, Plane, Lock, Award } from "lucide-react";
import { useLanguage } from "../../accueil/LanguageContext";
import { useAuth } from "../../../context/AuthContext";
import { AudioButton } from "../common/AudioButton";
import "./mission.css"; // We created this file for Mission specific CSS
import { useAutoProgress, canAccessMission } from "../../../utils/progress";
import LockedScreen from "../common/LockedScreen";
import FavoriteButton from "../common/FavoriteButton";
import SaveVocabButton from "../common/SaveVocabButton";

const vocabData = [
  { darija: "Salam", arabicText: "سلام", fr: "Bonjour", en: "Hello", ar: "سلام", context: { en: "Used as a friendly greeting when meeting anyone.", fr: "Utilisé comme salutation amicale pour tout le monde.", ar: "يستخدم كتحية ودية عند لقاء أي شخص." } },
  { darija: "Shukran", arabicText: "شكرا", fr: "Merci", en: "Thank you", ar: "شكرا", context: { en: "Essential for showing appreciation, e.g. to a taxi driver.", fr: "Essentiel pour montrer votre appréciation, ex. à un chauffeur.", ar: "أساسي لإظهار التقدير، مثل سائق التاكسي." } },
  { darija: "Fin...?", arabicText: "فين؟", fr: "Où est...?", en: "Where is...?", ar: "أين...؟", context: { en: "Crucial for asking directions, like 'Fin l'aéroport?'", fr: "Crucial pour demander son chemin, comme 'Fin l'aéroport?'", ar: "مهم جداً لطلب الاتجاهات، مثل 'فين المطار؟'" } },
  { darija: "Labas?", arabicText: "لاباس؟", fr: "Ça va ?", en: "How are you?", ar: "لاباس؟", context: { en: "Standard follow-up to Salam. Reply with 'Labas, shukran'.", fr: "Suite standard après Salam. Répondez par 'Labas, shukran'.", ar: "سؤال معتاد بعد السلام. الرد بـ 'لاباس، شكرا'." } },
  { darija: "Naam", arabicText: "نعم", fr: "Oui", en: "Yes", ar: "نعم", context: { en: "Used to agree or accept an offer.", fr: "Utilisé pour être d'accord ou accepter une offre.", ar: "يستخدم للموافقة أو قبول عرض." } },
  { darija: "La", arabicText: "لا", fr: "Non", en: "No", ar: "لا", context: { en: "Polite refusal. Often combined as 'La, shukran'.", fr: "Refus poli. Souvent combiné en 'La, shukran'.", ar: "رفض مهذب. غالباً ما يجمع كـ 'لا، شكرا'." } }
];

const expressionsData = [
  { darija: "Salam, labas?", arabicText: "سلام، لاباس؟", fr: "Bonjour, ça va ?", en: "Hello, how are you?", ar: "سلام، لاباس؟", context: { en: "The golden standard for starting any interaction.", fr: "Le standard pour commencer toute interaction.", ar: "المعيار الذهبي لبدء أي محادثة." } },
  { darija: "Fin l'aéroport?", arabicText: "فين المطار؟", fr: "Où est l'aéroport ?", en: "Where is the airport?", ar: "أين المطار؟", context: { en: "Useful when looking for your terminal or transport.", fr: "Utile pour chercher votre terminal ou transport.", ar: "مفيد عند البحث عن محطتك أو وسيلة النقل." } },
  { darija: "Shukran bzaf", arabicText: "شكرا بزاف", fr: "Merci beaucoup", en: "Thank you very much", ar: "شكرا بزاف", context: { en: "Adds 'bzaf' (a lot) for extra gratitude.", fr: "Ajoute 'bzaf' (beaucoup) pour plus de gratitude.", ar: "يضيف 'بزاف' (كثيراً) لمزيد من الامتنان." } }
];

const conversationData = [
  { speaker: "Traveler", darija: "Salam", arabicText: "سلام", fr: "Bonjour", en: "Hello", isRight: true },
  { speaker: "Staff", darija: "Salam, labas?", arabicText: "سلام، لاباس؟", fr: "Bonjour, ça va ?", en: "Hello, how are you?", isRight: false },
  { speaker: "Traveler", darija: "Labas, shukran. Fin l'aéroport?", arabicText: "لاباس، شكرا. فين المطار؟", fr: "Ça va, merci. Où est l'aéroport ?", en: "Fine, thanks. Where is the airport?", isRight: true },
  { speaker: "Staff", darija: "L'aéroport hnaya.", arabicText: "المطار هنايا.", fr: "L'aéroport est ici.", en: "The airport is here.", isRight: false },
  { speaker: "Traveler", darija: "Shukran bzaf!", arabicText: "شكرا بزاف!", fr: "Merci beaucoup !", en: "Thank you very much!", isRight: true },
];

const quizData = [
  { 
    q: { en: 'What does "Shukran" mean?', fr: 'Que signifie "Shukran" ?', ar: 'ماذا تعني "شكرا"؟' }, 
    options: { en: ["Hello", "Thank you", "Where is?", "Yes"], fr: ["Bonjour", "Merci", "Où est ?", "Oui"], ar: ["مرحبا", "شكرا", "أين؟", "نعم"] }, 
    answer: 1 
  },
  { 
    q: { en: 'How do you say "Where is...?"', fr: 'Comment dit-on "Où est..." ?', ar: 'كيف تقول "أين...؟"' }, 
    options: { en: ["Labas", "La", "Fin", "Salam"], fr: ["Labas", "La", "Fin", "Salam"], ar: ["لاباس", "لا", "فين", "سلام"] }, 
    answer: 2 
  },
  { 
    q: { en: 'If someone asks "Labas?", you reply:', fr: 'Si quelqu\'un demande "Labas?", vous répondez :', ar: 'إذا سأل أحدهم "لاباس؟"، تجيب بـ:' }, 
    options: { en: ["Fin", "Labas, shukran", "La", "Naam"], fr: ["Fin", "Labas, shukran", "La", "Naam"], ar: ["فين", "لاباس، شكرا", "لا", "نعم"] }, 
    answer: 1 
  },
];

const STEPS = ["intro", "vocab", "expressions", "conversation", "quiz", "completion"];

const STEP_LABELS = {
  intro: { FR: "Introduction", EN: "Introduction", AR: "مقدمة" },
  vocab: { FR: "Vocabulaire", EN: "Vocabulary", AR: "مفردات" },
  expressions: { FR: "Expressions", EN: "Expressions", AR: "عبارات" },
  conversation: { FR: "Conversation", EN: "Conversation", AR: "محادثة" },
  quiz: { FR: "Quiz", EN: "Quiz", AR: "اختبار" },
  completion: { FR: "Terminé", EN: "Completed", AR: "اكتملت" },
};

function Mission1() {
  const { lang, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizFeedback, setQuizFeedback] = useState(null); // 'correct' or 'wrong'

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

  const handleQuizAnswer = (idx) => {
    if (selectedOption !== null) return; // Prevent multiple clicks
    setSelectedOption(idx);
    
    const isCorrect = idx === quizData[quizQuestionIndex].answer;
    setQuizFeedback(isCorrect ? 'correct' : 'wrong');

    setTimeout(() => {
      if (isCorrect) {
        if (quizQuestionIndex < quizData.length - 1) {
          setQuizQuestionIndex(prev => prev + 1);
          setSelectedOption(null);
          setQuizFeedback(null);
        } else {
          handleNext(); // Move to completion
        }
      } else {
        // Retry logic
        setSelectedOption(null);
        setQuizFeedback(null);
      }
    }, 1500);
  };

  const getLangProp = (item, prop) => {
    if (typeof item[prop] === 'object') {
      return item[prop][lang.toLowerCase()] || item[prop].en;
    }
    // Fallback if not an object (like the main darija string)
    return item[prop] || item[lang.toLowerCase()] || item.en || "";
  };

  const pathMatch = window.location.pathname.match(/\/languages\/(\w+)\/mission-(\d+)/);
  const currentTrack = pathMatch?.[1];
  const currentMissionNum = pathMatch?.[2] ? parseInt(pathMatch[2]) : 0;
  if (currentTrack && currentMissionNum && !canAccessMission(currentTrack, currentMissionNum, user)) {
    return <LockedScreen track={currentTrack} />;
  }
  return (
    <div className={`mission-container ${isRTL ? "rtl" : "ltr"}`}>
      {/* Header / Progress */}
      <div className="mission-header">
        <button className="mission-close" onClick={() => navigate("/languages")}>
          <X size={24} />
        </button>
        <FavoriteButton track="darija" missionNum={1} />
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

          {/* STEP 0: INTRO */}
          {step === "intro" && (
            <div className="intro-step">
              <div className="intro-icon">
                <Plane size={40} />
              </div>
              <h1 className="intro-title">
                {lang === "FR" ? "Arrivée à l'Aéroport" : lang === "AR" ? "الوصول إلى المطار" : "Airport Arrival"}
              </h1>
              <p className="intro-desc">
                {lang === "FR" ? "Apprenez les expressions essentielles en Darija dont vous aurez besoin à votre arrivée au Maroc." : 
                 lang === "AR" ? "تعلم العبارات الأساسية بالدارجة التي ستحتاجها عند وصولك إلى المغرب." : 
                 "Learn the essential Darija expressions you need when arriving in Morocco."}
              </p>
              <button className="mission-btn" onClick={handleNext}>
                {lang === "FR" ? "Commencer la mission" : lang === "AR" ? "ابدأ المهمة" : "Start Mission"}
              </button>
            </div>
          )}

          {/* STEP 1: VOCABULARY */}
          {step === "vocab" && (
            <div>
              <h2 className="step-title">
                {lang === "FR" ? "Vocabulaire Essentiel" : lang === "AR" ? "مفردات أساسية" : "Essential Vocabulary"}
              </h2>
              <p className="step-subtitle">
                {lang === "FR" ? "Écoutez et comprenez les mots clés." : lang === "AR" ? "استمع وافهم الكلمات الرئيسية." : "Listen and understand the key words."}
              </p>
              
              <div className="vocab-grid">
                {vocabData.map((word, idx) => (
                  <div key={idx} className="vocab-card">
                    <AudioButton text={word.darija} ttsText={word.arabicText} overrideLang="AR" />
                    <div className="vocab-word" style={{display:"flex",alignItems:"center",gap:"8px"}}>
  <span>{word.darija}</span>
  <SaveVocabButton id={'darija_1_' + word.darija} word={word.darija} translation={word.en} track="darija" missionNum={1} />
</div>
                    <div className="vocab-translations">
                      <span className="vocab-trans-item">
                        <strong>{lang === "FR" ? "Français:" : "English:"}</strong> 
                        {lang === "FR" ? word.fr : word.en}
                      </span>
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

          {/* STEP 2: EXPRESSIONS */}
          {step === "expressions" && (
            <div>
              <h2 className="step-title">
                {lang === "FR" ? "Expressions Utiles" : lang === "AR" ? "عبارات مفيدة" : "Useful Expressions"}
              </h2>
              <p className="step-subtitle">
                {lang === "FR" ? "Combinez les mots pour des situations réelles." : lang === "AR" ? "اجمع الكلمات لمواقف حقيقية." : "Combine words for real situations."}
              </p>
              
              <div className="expressions-list">
                {expressionsData.map((exp, idx) => (
                  <div key={idx} className="expression-card">
                    <AudioButton text={exp.darija} ttsText={exp.arabicText} overrideLang="AR" style={{position:'static', flexShrink:0}} />
                    <div className="expression-content">
                      <div className="exp-darija" style={{display:"flex",alignItems:"center",gap:"8px"}}>
  <span>{exp.darija}</span>
  <SaveVocabButton id={'darija_1_' + exp.darija} word={exp.darija} translation={exp.en || exp.fr} track="darija" missionNum={1} type="expression" />
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

          {/* STEP 3: CONVERSATION */}
          {step === "conversation" && (
            <div>
              <h2 className="step-title">
                {lang === "FR" ? "En Pratique" : lang === "AR" ? "في الممارسة" : "In Practice"}
              </h2>
              <p className="step-subtitle">
                {lang === "FR" ? "Une situation réelle à l'aéroport." : lang === "AR" ? "موقف حقيقي في المطار." : "A real situation at the airport."}
              </p>
              
              <div className="chat-container">
                {conversationData.map((line, idx) => (
                  <div key={idx} className={`chat-bubble-wrapper ${line.isRight ? 'right' : 'left'}`}>
                    <div className="chat-speaker">
                      {line.speaker === "Traveler" 
                        ? (lang === "FR" ? "Vous" : lang === "AR" ? "أنت" : "You") 
                        : (lang === "FR" ? "Agent" : lang === "AR" ? "موظف" : "Staff")}
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

          {/* STEP 4: QUIZ */}
          {step === "quiz" && (
            <div>
              <h2 className="step-title">
                {lang === "FR" ? "Vérifions vos acquis" : lang === "AR" ? "دعنا نتحقق من معرفتك" : "Let's check your knowledge"}
              </h2>
              <p className="step-subtitle">
                {lang === "FR" ? `Question ${quizQuestionIndex + 1} sur ${quizData.length}` : 
                 lang === "AR" ? `السؤال ${quizQuestionIndex + 1} من ${quizData.length}` : 
                 `Question ${quizQuestionIndex + 1} of ${quizData.length}`}
              </p>
              
              <div className="quiz-card">
                <div className="quiz-question">
                  {getLangProp(quizData[quizQuestionIndex], 'q')}
                </div>
                
                <div className="quiz-options">
                  {getLangProp(quizData[quizQuestionIndex], 'options').map((opt, idx) => {
                    let btnClass = "quiz-option";
                    if (selectedOption === idx) {
                      if (quizFeedback === 'correct') btnClass += " correct";
                      else if (quizFeedback === 'wrong') btnClass += " wrong";
                      else btnClass += " selected";
                    } else if (selectedOption !== null && idx === quizData[quizQuestionIndex].answer && quizFeedback === 'wrong') {
                      // Show the correct answer if they got it wrong
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

                <div className={`quiz-feedback ${quizFeedback ? (quizFeedback === 'correct' ? 'correct-text' : 'wrong-text') : ''}`}>
                  {quizFeedback === 'correct' && (lang === "FR" ? "Excellent !" : lang === "AR" ? "ممتاز!" : "Excellent!")}
                  {quizFeedback === 'wrong' && (lang === "FR" ? "Oops, essayez encore." : lang === "AR" ? "عفوا، حاول مرة أخرى." : "Oops, try again.")}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: COMPLETION */}
          {step === "completion" && (
            <div className="completion-step">
              <div className="completion-icon">
                <Award size={48} />
              </div>
              <h1 className="intro-title">
                {lang === "FR" ? "Mission Accomplie !" : lang === "AR" ? "تمت المهمة!" : "Mission Completed!"}
              </h1>
              <p className="intro-desc">
                {lang === "FR" ? "Vous maîtrisez maintenant les bases pour arriver au Maroc. Vous êtes prêt pour la prochaine étape." : 
                 lang === "AR" ? "أنت تتقن الآن الأساسيات للوصول إلى المغرب. أنت جاهز للخطوة التالية." : 
                 "You have mastered the basics for arriving in Morocco. You're ready for the next step."}
              </p>
              
              <div 
                className="next-mission-card" 
                style={{ cursor: 'pointer', borderColor: 'var(--learn-accent)' }}
                onClick={() => navigate("/languages/darija/mission-2")}
              >
                <div className="next-icon" style={{ background: 'var(--learn-accent)', color: '#ffffff' }}>
                  <Lock size={24} />
                </div>
                <div className="next-info">
                  <h4>{lang === "FR" ? "Prochaine Mission Débloquée" : lang === "AR" ? "تم فتح المهمة القادمة" : "Next Mission Unlocked"}</h4>
                  <p style={{ fontWeight: 600, color: 'var(--learn-text)' }}>{lang === "FR" ? "Trajet en Taxi" : lang === "AR" ? "رحلة التاكسي" : "Taxi Journey"}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginTop: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button className="mission-btn" onClick={() => navigate("/languages/darija/mission-2")}>
                  {lang === "FR" ? "Continuer vers la Mission 2" : lang === "AR" ? "متابعة إلى المهمة 2" : "Continue to Mission 2"}
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
      {step !== "intro" && step !== "completion" && step !== "quiz" && (
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

export default Mission1;
