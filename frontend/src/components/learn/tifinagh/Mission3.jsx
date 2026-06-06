import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X, ArrowRight, ArrowLeft, CheckCircle, MapPin, Award, Compass, Lock } from "lucide-react";
import { useLanguage } from "../../accueil/LanguageContext";
import { useAuth } from "../../../context/AuthContext";
import "../darija/mission.css"; // Reuse styling, but with tifinagh-theme class
import { useAutoProgress, canAccessMission } from "../../../utils/progress";
import LockedScreen from "../common/LockedScreen";
import FavoriteButton from "../common/FavoriteButton";
import SaveVocabButton from "../common/SaveVocabButton";

const signsData = [
  { 
    tifinagh: "ⴰⵏⵙⴰⴼ", 
    latin: "Ansaf", 
    meaning: { en: "Welcome", fr: "Bienvenue", ar: "مرحباً" },
    context: { en: "Seen at airport entrances and city limits.", fr: "Vu aux entrées des aéroports et aux limites de la ville.", ar: "تُرى في مداخل المطارات وحدود المدن." },
    type: "Welcome Sign"
  },
  { 
    tifinagh: "ⴰⵎⴰⵡⴰⵍ", 
    latin: "Amawal", 
    meaning: { en: "Dictionary / Vocabulary", fr: "Dictionnaire / Vocabulaire", ar: "قاموس / مفردات" },
    context: { en: "Often seen on cultural centers or bookshops.", fr: "Souvent vu sur les centres culturels ou les librairies.", ar: "غالبًا ما تُرى على المراكز الثقافية أو المكتبات." },
    type: "Cultural Sign"
  },
  { 
    tifinagh: "ⴰⵖⴰⵔⴰⵙ", 
    latin: "Agharas", 
    meaning: { en: "Road / Path", fr: "Route / Chemin", ar: "طريق / مسار" },
    context: { en: "Very common on direction signs and highways.", fr: "Très courant sur les panneaux de direction et les autoroutes.", ar: "شائعة جدًا على لافتات الاتجاهات والطرق السريعة." },
    type: "Direction Sign"
  },
  { 
    tifinagh: "ⵜⴰⵙⴷⴰⵡⵉⵜ", 
    latin: "Tasdawit", 
    meaning: { en: "University", fr: "Université", ar: "جامعة" },
    context: { en: "Seen near major educational institutions.", fr: "Vu près des grandes institutions éducatives.", ar: "تُرى بالقرب من المؤسسات التعليمية الكبرى." },
    type: "Public Building"
  }
];

const patternsData = [
  {
    symbol: "ⵜ ... ⵜ",
    name: "T ... T",
    explanation: { 
      en: "Many feminine nouns in Tifinagh start and end with 'T' (ⵜ), like 'Tasdawit' (University) or 'Tamazight' (The Language).", 
      fr: "Beaucoup de noms féminins en tifinagh commencent et se terminent par 'T' (ⵜ), comme 'Tasdawit' (Université) ou 'Tamazight' (La Langue).", 
      ar: "العديد من الأسماء المؤنثة في تيفيناغ تبدأ وتنتهي بحرف 'ت' (ⵜ)، مثل 'تاسداويت' (جامعة) أو 'تامازيغت' (اللغة)." 
    }
  },
  {
    symbol: "ⴰ",
    name: "A",
    explanation: { 
      en: "Many masculine nouns start with 'A' (ⴰ), like 'Agharas' (Road) or 'Amazigh' (Free man).", 
      fr: "Beaucoup de noms masculins commencent par 'A' (ⴰ), comme 'Agharas' (Route) ou 'Amazigh' (Homme libre).", 
      ar: "العديد من الأسماء المذكرة تبدأ بحرف 'أ' (ⴰ)، مثل 'أغاراس' (طريق) أو 'أمازيغ' (رجل حر)." 
    }
  }
];

const situationsData = [
  {
    q: { 
      en: "You are driving on the highway and see a sign with 'ⴰⵖⴰⵔⴰⵙ'. What does it indicate?", 
      fr: "Vous conduisez sur l'autoroute et voyez un panneau avec 'ⴰⵖⴰⵔⴰⵙ'. Qu'est-ce que cela indique ?", 
      ar: "أنت تقود على الطريق السريع وترى لافتة مكتوب عليها 'ⴰⵖⴰⵔⴰⵙ'. ماذا تشير؟" 
    },
    options: { 
      en: ["A Road or Path", "A University"], 
      fr: ["Une route ou un chemin", "Une université"], 
      ar: ["طريق أو مسار", "جامعة"] 
    },
    correctIdx: 0,
    feedback: { 
      en: "Correct! 'Agharas' means road or path.", 
      fr: "Correct ! 'Agharas' signifie route ou chemin.", 
      ar: "صحيح! 'أغاراس' تعني طريق أو مسار." 
    },
    feedbackWrong: { 
      en: "Not quite. University is 'Tasdawit'.", 
      fr: "Pas tout à fait. Université se dit 'Tasdawit'.", 
      ar: "ليس تمامًا. جامعة هي 'تاسداويت'." 
    }
  },
  {
    q: { 
      en: "You arrive at the airport and see 'ⴰⵏⵙⴰⴼ'. How should you feel?", 
      fr: "Vous arrivez à l'aéroport et voyez 'ⴰⵏⵙⴰⴼ'. Comment devriez-vous vous sentir ?", 
      ar: "تصل إلى المطار وترى 'ⴰⵏⵙⴰⴼ'. كيف يجب أن تشعر؟" 
    },
    options: { 
      en: ["Welcomed", "Lost"], 
      fr: ["Accueilli", "Perdu"], 
      ar: ["مُرحَب بك", "ضائع"] 
    },
    correctIdx: 0,
    feedback: { 
      en: "Correct! 'Ansaf' means Welcome.", 
      fr: "Correct ! 'Ansaf' signifie Bienvenue.", 
      ar: "صحيح! 'أنساف' تعني مرحباً." 
    },
    feedbackWrong: { 
      en: "Actually, it means 'Welcome'!", 
      fr: "En fait, cela signifie 'Bienvenue' !", 
      ar: "في الواقع، إنها تعني 'مرحباً'!" 
    }
  }
];

const quizData = [
  {
    q: { 
      en: 'What does the word "ⵜⴰⵙⴷⴰⵡⵉⵜ" (Tasdawit) mean?', 
      fr: 'Que signifie le mot "ⵜⴰⵙⴷⴰⵡⵉⵜ" (Tasdawit) ?', 
      ar: 'ماذا تعني كلمة "ⵜⴰⵙⴷⴰⵡⵉⵜ" (تاسداويت)؟' 
    },
    options: { 
      en: ["Welcome", "University", "Road", "Market"], 
      fr: ["Bienvenue", "Université", "Route", "Marché"], 
      ar: ["مرحباً", "جامعة", "طريق", "سوق"] 
    },
    answer: 1
  },
  {
    q: { 
      en: 'If a word starts and ends with "ⵜ" (T), it is likely:', 
      fr: 'Si un mot commence et se termine par "ⵜ" (T), il est probablement :', 
      ar: 'إذا بدأت الكلمة وانتهت بحرف "ⵜ" (ت)، فمن المحتمل أن تكون:' 
    },
    options: { 
      en: ["A masculine noun", "A feminine noun", "A verb", "A direction"], 
      fr: ["Un nom masculin", "Un nom féminin", "Un verbe", "Une direction"], 
      ar: ["اسم مذكر", "اسم مؤنث", "فعل", "اتجاه"] 
    },
    answer: 1
  },
  {
    q: { 
      en: 'Which Tifinagh letter often starts masculine nouns like Agharas or Amazigh?', 
      fr: 'Quelle lettre tifinagh commence souvent les noms masculins comme Agharas ou Amazigh ?', 
      ar: 'أي حرف تيفيناغ يبدأ به غالباً الأسماء المذكرة مثل أغاراس أو أمازيغ؟' 
    },
    options: { 
      en: ["ⵣ (Z)", "ⵎ (M)", "ⴰ (A)", "ⵜ (T)"], 
      fr: ["ⵣ (Z)", "ⵎ (M)", "ⴰ (A)", "ⵜ (T)"], 
      ar: ["ⵣ (ز)", "ⵎ (م)", "ⴰ (أ)", "ⵜ (ت)"] 
    },
    answer: 2
  }
];

const STEPS = ["intro", "signs", "patterns", "situations", "quiz", "completion"];

const STEP_LABELS = {
  intro: { en: "Introduction", fr: "Introduction", ar: "مقدمة" },
  signs: { en: "Frequent Words", fr: "Mots Fréquents", ar: "كلمات شائعة" },
  patterns: { en: "Pattern Recognition", fr: "Reconnaître les Motifs", ar: "التعرف على الأنماط" },
  situations: { en: "On the Street", fr: "Dans la Rue", ar: "في الشارع" },
  quiz: { en: "Quick Check", fr: "Vérification Rapide", ar: "تحقق سريع" },
  completion: { en: "Completion", fr: "Achèvement", ar: "اكتمال" }
};

function Mission3() {
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
    <div className={`mission-container tifinagh-theme ${isRTL ? "rtl" : "ltr"}`}>
      <div className="mission-header">
        <button className="mission-close" onClick={() => navigate("/languages")}><X size={24} /></button>
        <FavoriteButton track="tifinagh" missionNum={3} />
        <div className="mission-progress-bar"><div className="mission-progress-fill" style={{ width: `${progressPercent}%` }}></div></div>
      </div>

      <div className="step-indicator">
        <span className="step-indicator-number">{lang === "FR" ? "Étape" : lang === "AR" ? "خطوة" : "Step"} {currentStepIndex + 1}/{STEPS.length}</span>
        <span className="step-indicator-name">{STEP_LABELS[STEPS[currentStepIndex]][lang.toLowerCase()]}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="mission-content">

          {step === "intro" && (
            <div className="intro-step">
              <div className="intro-icon"><Compass size={40} /></div>
              <h1 className="intro-title">{lang === "FR" ? "Lire les Panneaux" : lang === "AR" ? "قراءة اللافتات" : "Reading Common Signs"}</h1>
              <p className="intro-desc">
                {lang === "FR" ? "Le tifinagh est présent partout au Maroc : aéroports, autoroutes, et bâtiments publics. Apprenez à reconnaître les mots les plus fréquents pour naviguer avec confiance." :
                 lang === "AR" ? "يتواجد تيفيناغ في كل مكان في المغرب: المطارات، الطرق السريعة، والمباني العامة. تعلم كيفية التعرف على الكلمات الأكثر شيوعاً للتنقل بثقة." :
                 "Tifinagh is present everywhere in Morocco: airports, highways, and public buildings. Learn to recognize the most frequent words to navigate with confidence."}
              </p>
              <button className="mission-btn" onClick={handleNext}>
                {lang === "FR" ? "Commencer la mission" : lang === "AR" ? "ابدأ المهمة" : "Start Mission"}
              </button>
            </div>
          )}

          {step === "signs" && (
            <div>
              <h2 className="step-title">{lang === "FR" ? "Mots Fréquents" : lang === "AR" ? "كلمات شائعة" : "Frequent Words"}</h2>
              <p className="step-subtitle">{lang === "FR" ? "Ce que vous verrez dans la rue." : lang === "AR" ? "ما ستراه في الشارع." : "What you will see on the street."}</p>
              <div className="expressions-list">
                {signsData.map((sign, idx) => (
                  <div key={idx} className="expression-card tifinagh-card-override" style={{ display: 'flex', flexDirection: 'column', padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--learn-border)', paddingBottom: '16px' }}>
                      <div className="tifinagh-script" style={{ fontSize: '2.5rem', color: 'var(--learn-primary)' }}>{sign.tifinagh}</div>
                      <div style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--learn-primary)', padding: '4px 12px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 600 }}>{sign.type}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '4px' }}>{sign.latin}</div>
                      <div style={{ fontSize: '1.1rem', color: 'var(--learn-text-secondary)', marginBottom: '12px' }}>{getLangProp(sign, 'meaning')}</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--learn-text)', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <MapPin size={16} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--learn-primary)' }} />
                        <span>{getLangProp(sign, 'context')}</span>
                      </div>
                    </div>
                    <SaveVocabButton id={'tifinagh_3_' + sign.tifinagh} word={sign.tifinagh} translation={getLangProp(sign, 'meaning')} track="tifinagh" missionNum={3} type="vocab" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === "patterns" && (
            <div>
              <h2 className="step-title">{lang === "FR" ? "Reconnaître les Motifs" : lang === "AR" ? "التعرف على الأنماط" : "Pattern Recognition"}</h2>
              <p className="step-subtitle">{lang === "FR" ? "Astuces pour identifier les mots rapidement." : lang === "AR" ? "نصائح لتحديد الكلمات بسرعة." : "Tricks to identify words quickly."}</p>
              <div className="vocab-grid">
                {patternsData.map((pattern, idx) => (
                  <div key={idx} className="vocab-card tifinagh-card-override tifinagh-info-card">
                    <div className="tifinagh-script" style={{ fontSize: '3rem', color: 'var(--learn-primary)', textAlign: 'center', marginBottom: '16px' }}>
                      {pattern.symbol}
                    </div>
                    <h3 className="step-title" style={{ fontSize: "1.15rem", textAlign: 'center' }}>
                      {pattern.name}
                    </h3>
                    <p className="tifinagh-inline-note" style={{ textAlign: 'center' }}>
                      {getLangProp(pattern, 'explanation')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === "situations" && (() => {
            const sit = situationsData[currentSituationIndex];
            return (
              <div>
                <h2 className="step-title" style={{ textAlign: "center" }}>{lang === "FR" ? "Dans la Rue" : lang === "AR" ? "في الشارع" : "On the Street"}</h2>
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
              <h2 className="step-title">{lang === "FR" ? "Vérification Rapide" : lang === "AR" ? "تحقق سريع" : "Quick Check"}</h2>
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
                {lang === "FR" ? "Vous êtes maintenant capable de repérer et comprendre les panneaux tifinagh courants au Maroc." :
                 lang === "AR" ? "أنت الآن قادر على تحديد وفهم لافتات تيفيناغ الشائعة في المغرب." :
                 "You are now able to spot and understand common Tifinagh signs in Morocco."}
              </p>
              
              {/* Progression */}
              <div style={{ marginTop: '30px', textAlign: 'left', background: 'var(--learn-surface)', padding: '20px', borderRadius: '16px', border: '1px solid var(--learn-border)', width: '100%', maxWidth: '400px' }}>
                <h4 style={{ marginBottom: '16px', fontSize: '1.1rem', fontWeight: 600 }}>
                  {lang === "FR" ? "Progression" : lang === "AR" ? "التقدم" : "Progression"}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--learn-success)' }}>
                    <CheckCircle size={20} />
                    <span style={{ fontWeight: 500 }}>{lang === "FR" ? "Mission 1 : L'Alphabet" : lang === "AR" ? "المهمة 1: الأبجدية" : "Mission 1: The Alphabet"}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--learn-success)' }}>
                    <CheckCircle size={20} />
                    <span style={{ fontWeight: 500 }}>{lang === "FR" ? "Mission 2 : Premier Mot" : lang === "AR" ? "المهمة 2: الكلمة الأولى" : "Mission 2: First Word"}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--learn-success)' }}>
                    <CheckCircle size={20} />
                    <span style={{ fontWeight: 500 }}>{lang === "FR" ? "Mission 3 : Signes Courants" : lang === "AR" ? "المهمة 3: اللافتات الشائعة" : "Mission 3: Common Signs"}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--learn-text)' }} className="completion-progress-current">
                    <Lock size={20} />
                    <span style={{ fontWeight: 500 }}>{lang === "FR" ? "Prochaine Mission : Mots du Quotidien" : lang === "AR" ? "المهمة القادمة: كلمات يومية" : "Next Mission: Everyday Words"}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginTop: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button className="mission-btn" onClick={() => navigate("/languages/tifinagh/mission-4")}>
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

export default Mission3;
