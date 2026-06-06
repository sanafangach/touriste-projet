import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X, CheckCircle, Type, ArrowRight, ArrowLeft, Award, Lock } from "lucide-react";
import { useLanguage } from "../../accueil/LanguageContext";
import { useAuth } from "../../../context/AuthContext";
import { AudioButton } from "../common/AudioButton";
import "../darija/mission.css"; // Reuse the mission styling system
import { useAutoProgress, canAccessMission } from "../../../utils/progress";
import LockedScreen from "../common/LockedScreen";
import FavoriteButton from "../common/FavoriteButton";
import SaveVocabButton from "../common/SaveVocabButton";

const tifinaghSymbols = [
  { symbol: "ⴰ", pronunciation: "a", name: "Yaz", ar: "أ", context: { en: "The sound 'a'. It often looks like a circle.", fr: "Le son 'a'. Ressemble souvent à un cercle.", ar: "صوت 'أ'. غالباً ما يشبه الدائرة." } },
  { symbol: "ⴱ", pronunciation: "b", name: "Yab", ar: "ب", context: { en: "The sound 'b'. Symmetrical and round.", fr: "Le son 'b'. Symétrique et rond.", ar: "صوت 'ب'. متماثل ومستدير." } },
  { symbol: "ⵣ", pronunciation: "z", name: "Yaz", ar: "ز", context: { en: "The iconic 'z'. The central emblem of Amazigh identity.", fr: "Le 'z' iconique. L'emblème central de l'identité amazighe.", ar: "حرف 'ز' الشهير. الرمز المركزي للهوية الأمازيغية." } }
];

const quizData = [
  { 
    q: { en: 'Which symbol represents the sound "a"?', fr: 'Quel symbole représente le son "a" ?', ar: 'أي رمز يمثل صوت "أ"؟' }, 
    options: ["ⴱ", "ⴰ", "ⵣ", "ⵜ"], 
    answer: 1 
  },
  { 
    q: { en: 'Which symbol is the emblem of Amazigh identity?', fr: 'Quel symbole est l\'emblème de l\'identité amazighe ?', ar: 'أي رمز هو شعار الهوية الأمازيغية؟' }, 
    options: ["ⵣ", "ⵎ", "ⵉ", "ⴱ"], 
    answer: 0 
  }
];

const STEPS = ["intro", "symbols", "cards", "quiz", "culture", "completion"];

const STEP_LABELS = {
  intro: { en: "Introduction", fr: "Introduction", ar: "مقدمة" },
  symbols: { en: "First Symbols", fr: "Les Premiers Symboles", ar: "الرموز الأولى" },
  cards: { en: "Interactive Cards", fr: "Cartes Interactives", ar: "بطاقات تفاعلية" },
  quiz: { en: "Recognition Exercise", fr: "Exercice de Reconnaissance", ar: "تمرين التعرف" },
  culture: { en: "Cultural Discovery", fr: "Découverte Culturelle", ar: "اكتشاف ثقافي" },
  completion: { en: "Completion", fr: "Achèvement", ar: "اكتمال" }
};

function TifinaghMission1() {
  const { lang, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
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

  const handleQuizAnswer = (idx) => {
    if (selectedOption !== null) return;
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
          handleNext();
        }
      } else {
        setSelectedOption(null);
        setQuizFeedback(null);
      }
    }, 1500);
  };

  const getLangProp = (item, prop) => {
    if (typeof item[prop] === 'object') {
      return item[prop][lang.toLowerCase()] || item[prop].en;
    }
    return item[prop] || item[lang.toLowerCase()] || item.en || "";
  };

  const pathMatch = window.location.pathname.match(/\/languages\/(\w+)\/mission-(\d+)/);
  const currentTrack = pathMatch?.[1];
  const currentMissionNum = pathMatch?.[2] ? parseInt(pathMatch[2]) : 0;
  if (currentTrack && currentMissionNum && !canAccessMission(currentTrack, currentMissionNum, user)) {
    return <LockedScreen track={currentTrack} />;
  }
  return (
    <div className={`mission-container tifinagh-theme ${isRTL ? "rtl" : "ltr"}`}>
      <div className="mission-header">
        <button className="mission-close" onClick={() => navigate("/languages")}>
          <X size={24} />
        </button>
        <FavoriteButton track="tifinagh" missionNum={1} />
        <div className="mission-progress-bar">
          <div className="mission-progress-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <div className="step-indicator">
        <span className="step-indicator-number">{lang === "FR" ? "Étape" : lang === "AR" ? "خطوة" : "Step"} {currentStepIndex + 1}/{STEPS.length}</span>
        <span className="step-indicator-name">{STEP_LABELS[STEPS[currentStepIndex]][lang.toLowerCase()]}</span>
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
          {/* STEP 0: INTRO */}
          {step === "intro" && (
            <div className="intro-step">
              <div className="intro-icon">
                <Type size={40} />
              </div>
              <h1 className="intro-title">
                {lang === "FR" ? "Découvrir le Tifinagh" : lang === "AR" ? "اكتشف تيفيناغ" : "Discover Tifinagh"}
              </h1>
              <p className="intro-desc">
                {lang === "FR" ? "Le Tifinagh est l'ancien alphabet utilisé pour écrire les langues amazighes (berbères). Vous le verrez sur les panneaux routiers, les bâtiments publics et les sites culturels à travers le Maroc." : 
                 lang === "AR" ? "تيفيناغ هي الأبجدية القديمة المستخدمة لكتابة اللغات الأمازيغية. ستراها على لافتات الطرق والمباني العامة والمواقع الثقافية في جميع أنحاء المغرب." : 
                 "Tifinagh is the ancient alphabet used to write Amazigh (Berber) languages. You will see it on road signs, public buildings, and cultural sites across Morocco."}
              </p>
              <button className="mission-btn" onClick={handleNext}>
                {lang === "FR" ? "Commencer la mission" : lang === "AR" ? "ابدأ المهمة" : "Start Mission"}
              </button>
            </div>
          )}

          {/* STEP 1: FIRST SYMBOLS */}
          {step === "symbols" && (
            <div>
              <h2 className="step-title">
                {lang === "FR" ? "Les Premiers Symboles" : lang === "AR" ? "الرموز الأولى" : "First Symbols"}
              </h2>
              <p className="step-subtitle">
                {lang === "FR" ? "Découvrez trois symboles fondamentaux." : lang === "AR" ? "اكتشف ثلاثة رموز أساسية." : "Discover three fundamental symbols."}
              </p>
              
              <div className="expressions-list">
                {tifinaghSymbols.map((sym, idx) => (
                  <div key={idx} className="expression-card" style={{padding: '24px'}}>
                    <div style={{fontSize: '3rem', fontWeight: 'bold', color: 'var(--learn-accent)', width: '80px', textAlign: 'center'}}>
                      {sym.symbol}
                    </div>
                    <div className="expression-content">
                      <div className="exp-darija" style={{fontSize: '1.2rem', marginBottom: '8px'}}>
                        {lang === "FR" ? "Prononciation:" : lang === "AR" ? "النطق:" : "Pronunciation:"} <strong>{sym.pronunciation}</strong>
                      </div>
                      <div className="exp-trans">
                        {lang === "FR" ? "Nom:" : lang === "AR" ? "الاسم:" : "Name:"} {sym.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: INTERACTIVE CARDS */}
          {step === "cards" && (
            <div>
              <h2 className="step-title">
                {lang === "FR" ? "Cartes Interactives" : lang === "AR" ? "بطاقات تفاعلية" : "Interactive Cards"}
              </h2>
              <p className="step-subtitle">
                {lang === "FR" ? "Écoutez et mémorisez la forme de chaque lettre." : lang === "AR" ? "استمع واحفظ شكل كل حرف." : "Listen and memorize the shape of each letter."}
              </p>
              
              <div className="vocab-grid">
                {tifinaghSymbols.map((sym, idx) => (
                  <div key={idx} className="vocab-card tifinagh-card-override" style={{alignItems: 'center', textAlign: 'center'}}>
                    <AudioButton text={sym.pronunciation} overrideLang={lang === 'AR' ? 'AR' : 'FR'} />
                    <div className="vocab-word" style={{fontSize: '4rem', margin: '20px 0', fontFamily: 'Tifinagh, sans-serif'}}>{sym.symbol}</div>
                    <div className="vocab-translations" style={{width: '100%', alignItems: 'center'}}>
                      <span className="vocab-trans-item" style={{fontSize: '1.2rem', fontWeight: 'bold'}}>
                        {sym.pronunciation}
                      </span>
                    </div>
                    <div className="chat-trans" style={{marginTop: '16px', color: 'var(--learn-text-secondary)', fontSize: '0.9rem', lineHeight: '1.5'}}>
                      {getLangProp(sym, 'context')}
                    </div>
                    <SaveVocabButton id={'tifinagh_1_' + sym.symbol} word={sym.symbol} translation={sym.pronunciation} track="tifinagh" missionNum={1} type="vocab" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: QUIZ */}
          {step === "quiz" && (
            <div>
              <h2 className="step-title">
                {lang === "FR" ? "Exercice de Reconnaissance" : lang === "AR" ? "تمرين التعرف" : "Recognition Exercise"}
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
                
                <div className="quiz-options" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
                  {quizData[quizQuestionIndex].options.map((opt, idx) => {
                    let btnClass = "quiz-option";
                    if (selectedOption === idx) {
                      if (quizFeedback === 'correct') btnClass += " correct";
                      else if (quizFeedback === 'wrong') btnClass += " wrong";
                      else btnClass += " selected";
                    } else if (selectedOption !== null && idx === quizData[quizQuestionIndex].answer && quizFeedback === 'wrong') {
                      btnClass += " correct";
                    }

                    return (
                      <button 
                        key={idx} 
                        className={btnClass}
                        onClick={() => handleQuizAnswer(idx)}
                        disabled={selectedOption !== null}
                        style={{textAlign: 'center', fontSize: '2.5rem', padding: '30px'}}
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

          {/* STEP 4: CULTURAL DISCOVERY */}
          {step === "culture" && (
            <div>
              <h2 className="step-title">
                {lang === "FR" ? "Découverte Culturelle" : lang === "AR" ? "اكتشاف ثقافي" : "Cultural Discovery"}
              </h2>
              <p className="step-subtitle">
                {lang === "FR" ? "Le symbole de l'homme libre." : lang === "AR" ? "رمز الرجل الحر." : "The symbol of the free man."}
              </p>
              
              <div className="chat-container" style={{alignItems: 'center', textAlign: 'center'}}>
                <div style={{fontSize: '6rem', color: 'var(--learn-accent)', marginBottom: '16px'}}>ⵣ</div>
                <h3 style={{fontSize: '1.8rem', marginBottom: '16px'}}>Yaz (Z)</h3>
                <p style={{fontSize: '1.1rem', color: 'var(--learn-text-secondary)', lineHeight: '1.8', maxWidth: '600px'}}>
                  {lang === "FR" ? "La lettre 'Yaz' (ⵣ) est bien plus qu'une simple lettre. C'est le symbole central du peuple Amazigh. Elle représente 'l'homme libre'. Vous verrez ce symbole fièrement affiché dans des bijoux, tissé dans des tapis et peint sur des murs à travers toute l'Afrique du Nord." : 
                   lang === "AR" ? "حرف 'ز' (ⵣ) هو أكثر بكثير من مجرد حرف. إنه الرمز المركزي للشعب الأمازيغي. وهو يمثل 'الرجل الحر'. سترى هذا الرمز معروضاً بفخر في المجوهرات، ومنسوجاً في السجاد، ومرسوماً على الجدران في جميع أنحاء شمال أفريقيا." : 
                   "The letter 'Yaz' (ⵣ) is much more than just a letter. It is the central symbol of the Amazigh people. It represents the 'free man'. You will see this symbol proudly displayed in jewelry, woven into carpets, and painted on walls across North Africa."}
                </p>
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
                {lang === "FR" ? "Vous avez appris vos premiers symboles Tifinagh et leur signification culturelle." : 
                 lang === "AR" ? "لقد تعلمت أول رموز تيفيناغ ومعناها الثقافي." : 
                 "You have learned your first Tifinagh symbols and their cultural significance."}
              </p>
              
              <div style={{ marginTop: '30px', textAlign: 'left', background: 'var(--learn-surface)', padding: '20px', borderRadius: '16px', border: '1px solid var(--learn-border)', width: '100%', maxWidth: '400px' }}>
                <h4 style={{ marginBottom: '16px', fontSize: '1.1rem', fontWeight: 600 }}>
                  {lang === "FR" ? "Progression" : lang === "AR" ? "التقدم" : "Progression"}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--learn-success)' }}>
                    <CheckCircle size={20} />
                    <span style={{ fontWeight: 500 }}>{lang === "FR" ? "Mission 1 : Découverte" : lang === "AR" ? "المهمة 1: اكتشاف" : "Mission 1: Discovery"}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--learn-text)' }} className="completion-progress-current">
                    <Lock size={20} />
                    <span style={{ fontWeight: 500 }}>{lang === "FR" ? "Mission 2 : Écrire votre premier mot" : lang === "AR" ? "المهمة 2: كتابة كلمتك الأولى" : "Mission 2: Write Your First Word"}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--learn-text-secondary)', opacity: 0.7 }} className="completion-progress-locked">
                    <Lock size={20} />
                    <span>{lang === "FR" ? "Mission 3 : Noms de villes" : lang === "AR" ? "المهمة 3: أسماء المدن" : "Mission 3: City Names"}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginTop: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button className="mission-btn" onClick={() => navigate("/languages/tifinagh/mission-2")}>
                  {lang === "FR" ? "Continuer vers la Mission suivante" : lang === "AR" ? "تابع إلى المهمة التالية" : "Continue to Next Mission"}
                  <ArrowRight size={20} />
                </button>
                <button className="mission-btn secondary" onClick={() => navigate("/languages")}>
                  {lang === "FR" ? "Retour au Hub d'Apprentissage" : lang === "AR" ? "العودة إلى لوحة التعلم" : "Return to Learning Hub"}
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

export default TifinaghMission1;
