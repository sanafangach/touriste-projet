import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X, ArrowRight, ArrowLeft, MessageCircle, CheckCircle, Award, Droplets, BookOpen, RefreshCw, Undo2, Lock } from "lucide-react";
import { useLanguage } from "../../accueil/LanguageContext";
import { useAuth } from "../../../context/AuthContext";
import "../darija/mission.css"; // Reuse styling, but with tifinagh-theme class
import { useAutoProgress, canAccessMission } from "../../../utils/progress";
import LockedScreen from "../common/LockedScreen";
import FavoriteButton from "../common/FavoriteButton";
import SaveVocabButton from "../common/SaveVocabButton";

const vocabData = [
  { tifinagh: "ⴰⵣⵓⵍ", latin: "Azul", meaning: { en: "Hello / Welcome", fr: "Bonjour / Bienvenue", ar: "مرحباً / أهلاً" }, context: { en: "The most common Amazigh greeting.", fr: "La salutation amazighe la plus courante.", ar: "التحية الأمازيغية الأكثر شيوعاً." } },
  { tifinagh: "ⵜⴰⵏⵎⵉⵔⵜ", latin: "Tanmirt", meaning: { en: "Thank you", fr: "Merci", ar: "شكراً" }, context: { en: "Essential for showing appreciation.", fr: "Essentiel pour montrer de la gratitude.", ar: "أساسي لإظهار التقدير." } },
  { tifinagh: "ⴰⵎⴰⵏ", latin: "Aman", meaning: { en: "Water", fr: "Eau", ar: "ماء" }, context: { en: "Very useful when ordering at a café.", fr: "Très utile pour commander dans un café.", ar: "مفيد جداً عند الطلب في مقهى." } },
  { tifinagh: "ⵜⴰⴼⵓⴽⵜ", latin: "Tafoukt", meaning: { en: "Sun", fr: "Soleil", ar: "شمس" }, context: { en: "A beautiful word you might see in poetry or art.", fr: "Un beau mot que vous pourriez voir dans la poésie ou l'art.", ar: "كلمة جميلة قد تراها في الشعر أو الفن." } },
  { tifinagh: "ⴰⴳⴰⴷⵉⵔ", latin: "Agadir", meaning: { en: "Wall / Fortified granary", fr: "Mur / Grenier fortifié", ar: "جدار / مخزن محصن" }, context: { en: "Also the name of the famous coastal city.", fr: "Aussi le nom de la célèbre ville côtière.", ar: "أيضاً اسم المدينة الساحلية الشهيرة." } },
  { tifinagh: "ⴰⵎⴰⵣⵉⵖ", latin: "Amazigh", meaning: { en: "Free man", fr: "Homme libre", ar: "رجل حر" }, context: { en: "The name the people use for themselves.", fr: "Le nom que le peuple utilise pour lui-même.", ar: "الاسم الذي يطلقه الشعب على نفسه." } }
];

const breakdownData = [
  { 
    word: "ⵜⴰⵏⵎⵉⵔⵜ", 
    latin: "Tanmirt", 
    meaning: { en: "Thank you", fr: "Merci", ar: "شكراً" },
    letters: [
      { symbol: "ⵜ", latin: "T" },
      { symbol: "ⴰ", latin: "A" },
      { symbol: "ⵏ", latin: "N" },
      { symbol: "ⵎ", latin: "M" },
      { symbol: "ⵉ", latin: "I" },
      { symbol: "ⵔ", latin: "R" },
      { symbol: "ⵜ", latin: "T" }
    ]
  },
  { 
    word: "ⴰⵎⴰⵏ", 
    latin: "Aman", 
    meaning: { en: "Water", fr: "Eau", ar: "ماء" },
    letters: [
      { symbol: "ⴰ", latin: "A" },
      { symbol: "ⵎ", latin: "M" },
      { symbol: "ⴰ", latin: "A" },
      { symbol: "ⵏ", latin: "N" }
    ]
  }
];

const matchingPairs = [
  { tifinagh: "ⴰⵣⵓⵍ", latin: "Azul" },
  { tifinagh: "ⵜⴰⵏⵎⵉⵔⵜ", latin: "Tanmirt" },
  { tifinagh: "ⴰⵎⴰⵏ", latin: "Aman" },
  { tifinagh: "ⵜⴰⴼⵓⴽⵜ", latin: "Tafoukt" }
];

const buildingLetters = [
  { id: 0, char: "ⴰ" },
  { id: 1, char: "ⵎ" },
  { id: 2, char: "ⴰ" },
  { id: 3, char: "ⵏ" }
];
const buildingTarget = "ⴰⵎⴰⵏ";
const buildingLatin = "Aman";
const buildingMeaning = { en: "Water", fr: "Eau", ar: "ماء" };

const recognitionData = [
  {
    tifinagh: "ⴰⵣⵓⵍ",
    options: { en: ["Thank you", "Hello", "Water", "Sun"], fr: ["Merci", "Bonjour", "Eau", "Soleil"], ar: ["شكراً", "مرحباً", "ماء", "شمس"] },
    answer: 1
  },
  {
    tifinagh: "ⵜⴰⵏⵎⵉⵔⵜ",
    options: { en: ["Hello", "Free man", "Thank you", "Water"], fr: ["Bonjour", "Homme libre", "Merci", "Eau"], ar: ["مرحباً", "رجل حر", "شكراً", "ماء"] },
    answer: 2
  },
  {
    tifinagh: "ⴰⵎⴰⵏ",
    options: { en: ["Sun", "Mountain", "Water", "Road"], fr: ["Soleil", "Montagne", "Eau", "Route"], ar: ["شمس", "جبل", "ماء", "طريق"] },
    answer: 2
  }
];

const quizData = [
  {
    q: { en: 'What does "ⵜⴰⵏⵎⵉⵔⵜ" (Tanmirt) mean?', fr: 'Que signifie "ⵜⴰⵏⵎⵉⵔⵜ" (Tanmirt) ?', ar: 'ماذا تعني "ⵜⴰⵏⵎⵉⵔⵜ" (تانميرت)؟' },
    options: { en: ["Water", "Thank you", "Sun", "Hello"], fr: ["Eau", "Merci", "Soleil", "Bonjour"], ar: ["ماء", "شكراً", "شمس", "مرحباً"] },
    answer: 1
  },
  {
    q: { en: 'Which word means "Water"?', fr: 'Quel mot signifie "Eau" ?', ar: 'أي كلمة تعني "ماء"؟' },
    options: { en: ["Aman", "Tafoukt", "Azul", "Amazigh"], fr: ["Aman", "Tafoukt", "Azul", "Amazigh"], ar: ["أمان", "تافوكت", "أزول", "أمازيغ"] },
    answer: 0
  },
  {
    q: { en: 'What is the original meaning of "Agadir"?', fr: 'Quelle est la signification originale de "Agadir" ?', ar: 'ما هو المعنى الأصلي لـ "أكادير"؟' },
    options: { en: ["Beach", "Mountain", "Fortified granary / Wall", "River"], fr: ["Plage", "Montagne", "Grenier fortifié / Mur", "Rivière"], ar: ["شاطئ", "جبل", "مخزن محصن / جدار", "نهر"] },
    answer: 2
  }
];

const STEPS = ["intro", "vocab", "breakdown", "wordbuilding", "matching", "recognition", "quiz", "completion"];

const STEP_LABELS = {
  intro: { en: "Introduction", fr: "Introduction", ar: "مقدمة" },
  vocab: { en: "Vocabulary Cards", fr: "Cartes de Vocabulaire", ar: "بطاقات المفردات" },
  breakdown: { en: "Word Breakdown", fr: "Décomposition des Mots", ar: "تحليل الكلمات" },
  wordbuilding: { en: "Word Building", fr: "Construisez le Mot", ar: "قم ببناء الكلمة" },
  matching: { en: "Matching Challenge", fr: "Défi d'Association", ar: "تحدي المطابقة" },
  recognition: { en: "Recognition Challenge", fr: "Défi de Reconnaissance", ar: "تحدي التعرف" },
  quiz: { en: "Knowledge Check", fr: "Vérification des Connaissances", ar: "التحقق من المعرفة" },
  completion: { en: "Completion", fr: "Achèvement", ar: "اكتمال" }
};

function Mission4() {
  const { lang, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizFeedback, setQuizFeedback] = useState(null);

  // Word Building State
  const [assembledIds, setAssembledIds] = useState([]);
  const [buildingFeedback, setBuildingFeedback] = useState(null);

  // Matching Game State
  const [matchingSelectedTifinagh, setMatchingSelectedTifinagh] = useState(null);
  const [matchingSelectedLatin, setMatchingSelectedLatin] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);

  // Recognition State
  const [recognitionIndex, setRecognitionIndex] = useState(0);
  const [recognitionAnswer, setRecognitionAnswer] = useState(null);
  const [recognitionFeedback, setRecognitionFeedback] = useState(null);

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

  // Matching Logic
  const handleMatchSelect = (type, value) => {
    if (type === 'tifinagh') {
      if (matchedPairs.includes(value)) return;
      setMatchingSelectedTifinagh(value);
    } else {
      if (matchedPairs.some(pair => matchingPairs.find(p => p.tifinagh === pair)?.latin === value)) return;
      setMatchingSelectedLatin(value);
    }
  };

  useEffect(() => {
    if (matchingSelectedTifinagh && matchingSelectedLatin) {
      const isMatch = matchingPairs.find(p => p.tifinagh === matchingSelectedTifinagh && p.latin === matchingSelectedLatin);
      if (isMatch) {
        setMatchedPairs(prev => [...prev, matchingSelectedTifinagh]);
      }
      setTimeout(() => {
        setMatchingSelectedTifinagh(null);
        setMatchingSelectedLatin(null);
      }, 500);
    }
  }, [matchingSelectedTifinagh, matchingSelectedLatin]);

  const allMatched = matchedPairs.length === matchingPairs.length;

  // Word Building Logic
  const shuffledPool = useMemo(() => [...buildingLetters].sort(() => Math.random() - 0.5), []);

  const handleBuildingSelect = (letter) => {
    if (assembledIds.length >= buildingLetters.length || buildingFeedback === "correct") return;
    setAssembledIds(prev => [...prev, letter.id]);
    setBuildingFeedback(null);
  };

  const handleBuildingUndo = () => {
    if (!assembledIds.length || buildingFeedback === "correct") return;
    setAssembledIds(prev => prev.slice(0, -1));
    setBuildingFeedback(null);
  };

  const handleBuildingReset = () => {
    setAssembledIds([]);
    setBuildingFeedback(null);
  };

  const handleBuildingCheck = () => {
    if (assembledIds.length !== buildingLetters.length) return;
    const assembled = assembledIds.map(id => buildingLetters.find(l => l.id === id).char).join('');
    const isCorrect = assembled === buildingTarget;
    setBuildingFeedback(isCorrect ? "correct" : "wrong");
    if (isCorrect) {
      setTimeout(() => { handleNext(); }, 1200);
    }
  };

  // Recognition Logic
  const handleRecognitionAnswer = (idx) => {
    if (recognitionAnswer !== null) return;
    setRecognitionAnswer(idx);
    const isCorrect = idx === recognitionData[recognitionIndex].answer;
    setRecognitionFeedback(isCorrect ? "correct" : "wrong");
    setTimeout(() => {
      if (isCorrect) {
        if (recognitionIndex < recognitionData.length - 1) {
          setRecognitionIndex(prev => prev + 1);
          setRecognitionAnswer(null);
          setRecognitionFeedback(null);
        } else {
          handleNext();
        }
      } else {
        setRecognitionAnswer(null);
        setRecognitionFeedback(null);
      }
    }, 1500);
  };

  // Shuffle matching items just once
  const shuffledTifinagh = useMemo(() => [...matchingPairs].sort(() => Math.random() - 0.5), []);
  const shuffledLatin = useMemo(() => [...matchingPairs].sort(() => Math.random() - 0.5), []);

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
        <FavoriteButton track="tifinagh" missionNum={4} />
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
              <div className="intro-icon"><BookOpen size={40} /></div>
              <h1 className="intro-title">{lang === "FR" ? "Mots du Quotidien" : lang === "AR" ? "كلمات يومية" : "Everyday Words"}</h1>
              <p className="intro-desc">
                {lang === "FR" ? "Découvrez des mots amazighs pratiques que vous pourriez rencontrer tous les jours au Maroc. Apprenez à dire merci, demander de l'eau, et plus encore." :
                 lang === "AR" ? "اكتشف كلمات أمازيغية عملية قد تصادفها كل يوم في المغرب. تعلم كيف تقول شكراً، اطلب الماء، والمزيد." :
                 "Discover practical Amazigh words you might encounter every day in Morocco. Learn to say thank you, ask for water, and more."}
              </p>
              <button className="mission-btn" onClick={handleNext}>
                {lang === "FR" ? "Commencer la mission" : lang === "AR" ? "ابدأ المهمة" : "Start Mission"}
              </button>
            </div>
          )}

          {step === "vocab" && (
            <div>
              <h2 className="step-title">{lang === "FR" ? "Cartes de Vocabulaire" : lang === "AR" ? "بطاقات المفردات" : "Vocabulary Cards"}</h2>
              <p className="step-subtitle">{lang === "FR" ? "Écoutez et lisez ces mots essentiels." : lang === "AR" ? "استمع واقرأ هذه الكلمات الأساسية." : "Listen and read these essential words."}</p>
              <div className="vocab-grid">
                {vocabData.map((word, idx) => (
                  <div key={idx} className="vocab-card tifinagh-card-override" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="tifinagh-script" style={{ fontSize: '2.5rem', color: 'var(--learn-primary)', marginBottom: '8px', textAlign: 'center' }}>{word.tifinagh}</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '4px', textAlign: 'center' }}>{word.latin}</div>
                    <div style={{ fontSize: '1.1rem', color: 'var(--learn-text-secondary)', marginBottom: '12px', textAlign: 'center' }}>{getLangProp(word, 'meaning')}</div>
                    <div className="chat-trans" style={{ marginTop: 'auto', color: 'var(--learn-text)', fontSize: '0.9rem', background: 'rgba(59, 130, 246, 0.05)', padding: '12px', borderRadius: '8px' }}>
                      <MessageCircle size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle', color: 'var(--learn-primary)' }}/>
                      {getLangProp(word, 'context')}
                    </div>
                    <SaveVocabButton id={'tifinagh_4_' + word.tifinagh} word={word.tifinagh} translation={getLangProp(word, 'meaning')} track="tifinagh" missionNum={4} type="vocab" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === "breakdown" && (
            <div>
              <h2 className="step-title">{lang === "FR" ? "Décomposition des Mots" : lang === "AR" ? "تحليل الكلمات" : "Word Breakdown"}</h2>
              <p className="step-subtitle">{lang === "FR" ? "Voyons comment ces mots sont construits." : lang === "AR" ? "دعونا نرى كيف يتم بناء هذه الكلمات." : "Let's see how these words are built."}</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {breakdownData.map((data, idx) => (
                  <div key={idx} className="vocab-card tifinagh-card-override" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <div>
                        <div className="tifinagh-script" style={{ fontSize: '2.5rem', color: 'var(--learn-primary)' }}>{data.word}</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{data.latin}</div>
                        <div style={{ color: 'var(--learn-text-secondary)' }}>{getLangProp(data, 'meaning')}</div>
                      </div>
                      {idx === 0 ? <Award size={40} color="var(--learn-primary)" opacity={0.5} /> : <Droplets size={40} color="var(--learn-primary)" opacity={0.5} />}
                    </div>
                    
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', background: 'rgba(59,130,246,0.05)', padding: '16px', borderRadius: '12px' }}>
                      {data.letters.map((letter, lIdx) => (
                        <div key={lIdx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'var(--learn-surface)', padding: '8px 12px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                          <span className="tifinagh-script" style={{ fontSize: '1.5rem', color: 'var(--learn-primary)' }}>{letter.symbol}</span>
                          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--learn-text)' }}>{letter.latin}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === "wordbuilding" && (
            <div>
              <h2 className="step-title">{lang === "FR" ? "Construisez le Mot" : lang === "AR" ? "قم ببناء الكلمة" : "Word Building Exercise"}</h2>
              <p className="step-subtitle">
                {lang === "FR" ? `Assemblez "${buildingLatin}" en sélectionnant les symboles dans le bon ordre.` : lang === "AR" ? `قم بتجميع "${buildingLatin}" عن طريق اختيار الرموز بالترتيب الصحيح.` : `Assemble "${buildingLatin}" by selecting the symbols in the correct order.`}
              </p>

              {/* Target Info */}
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--learn-text)' }}>
                  {buildingLatin}
                </div>
                <div style={{ fontSize: '1rem', color: 'var(--learn-text-secondary)', marginTop: '4px' }}>
                  {lang === "FR" ? buildingMeaning.fr : lang === "AR" ? buildingMeaning.ar : buildingMeaning.en}
                </div>
              </div>

              {/* Progress Indicator */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', justifyContent: 'center' }}>
                <div style={{ flex: 1, maxWidth: '300px', height: '8px', background: 'var(--learn-border)', borderRadius: '4px', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(assembledIds.length / buildingLetters.length) * 100}%` }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    style={{ height: '100%', background: 'linear-gradient(90deg, var(--learn-primary), #38bdf8)', borderRadius: '4px' }}
                  />
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--learn-text-secondary)', whiteSpace: 'nowrap' }}>
                  {assembledIds.length}/{buildingLetters.length}
                  {assembledIds.length < buildingLetters.length
                    ? (lang === "FR" ? ` — ${buildingLetters.length - assembledIds.length} restant` : lang === "AR" ? ` — ${buildingLetters.length - assembledIds.length} متبقي` : ` — ${buildingLetters.length - assembledIds.length} left`)
                    : (lang === "FR" ? " — Complet" : lang === "AR" ? " — مكتمل" : " — Complete")}
                </span>
              </div>

              {/* Slot Display */}
              <div className="chat-container" style={{ textAlign: 'center', background: 'rgba(59,130,246,0.03)', padding: '24px', borderRadius: '16px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                  {buildingLetters.map((_, idx) => {
                    const filled = idx < assembledIds.length;
                    return (
                      <motion.div
                        key={idx}
                        animate={filled ? { scale: [0.8, 1.05, 1], borderColor: 'var(--learn-primary)' } : { scale: 1, borderColor: 'var(--learn-border)' }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        style={{
                          width: '60px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '2rem', fontWeight: 'bold', borderRadius: '12px',
                          background: filled ? 'var(--learn-surface)' : 'rgba(59,130,246,0.08)',
                          border: `2px solid ${filled ? 'var(--learn-primary)' : 'var(--learn-border)'}`,
                          color: filled ? 'var(--learn-primary)' : 'var(--learn-text-secondary)',
                          fontFamily: '"Noto Sans Tifinagh", "Segoe UI Symbol", "Arial Unicode MS", sans-serif',
                          transition: 'all 0.2s'
                        }}
                      >
                        {filled ? buildingLetters.find(l => l.id === assembledIds[idx]).char : "?"}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Letter Pool */}
              <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--learn-text-secondary)' }}>
                  {lang === "FR" ? "Sélectionnez la lettre suivante :" : lang === "AR" ? "اختر الحرف التالي:" : "Select the next letter:"}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
                {shuffledPool.filter(l => !assembledIds.includes(l.id)).map((letter) => (
                  <motion.button
                    key={letter.id}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="quiz-option tifinagh-script"
                    onClick={() => handleBuildingSelect(letter)}
                    style={{
                      fontSize: '2rem', padding: '16px 24px',
                      fontFamily: '"Noto Sans Tifinagh", "Segoe UI Symbol", "Arial Unicode MS", sans-serif',
                      cursor: buildingFeedback === 'correct' ? 'default' : 'pointer',
                      opacity: buildingFeedback === 'correct' ? 0.5 : 1
                    }}
                    disabled={buildingFeedback === 'correct'}
                  >
                    {letter.char}
                  </motion.button>
                ))}
                {shuffledPool.filter(l => !assembledIds.includes(l.id)).length === 0 && (
                  <span style={{ fontSize: '0.95rem', color: 'var(--learn-text-secondary)', fontStyle: 'italic' }}>
                    {lang === "FR" ? "Toutes les lettres placées ! Vérifiez votre réponse." : lang === "AR" ? "تم وضع جميع الحروف! تحقق من إجابتك." : "All letters placed! Check your answer."}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="mission-btn secondary" onClick={handleBuildingUndo} disabled={!assembledIds.length || buildingFeedback === 'correct'}>
                  <Undo2 size={18} style={{ marginRight: 6 }} /> {lang === "FR" ? "Annuler" : lang === "AR" ? "تراجع" : "Undo"}
                </button>
                <button className="mission-btn secondary" onClick={handleBuildingReset} disabled={!assembledIds.length || buildingFeedback === 'correct'}>
                  <RefreshCw size={18} style={{ marginRight: 6 }} /> {lang === "FR" ? "Réinitialiser" : lang === "AR" ? "إعادة تعيين" : "Reset"}
                </button>
                <button className="mission-btn" onClick={handleBuildingCheck} disabled={assembledIds.length !== buildingLetters.length}>
                  {lang === "FR" ? "Vérifier" : lang === "AR" ? "تحقق" : "Check"} <ArrowRight size={18} style={{ marginLeft: 6 }} />
                </button>
              </div>

              {/* Feedback */}
              <AnimatePresence>
                {buildingFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`quiz-feedback ${buildingFeedback === 'correct' ? 'correct-text' : 'wrong-text'}`}
                    style={{ marginTop: '20px' }}
                  >
                    {buildingFeedback === 'correct' && (
                      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <CheckCircle size={20} />
                        {lang === "FR" ? `Parfait ! Vous avez écrit "${buildingLatin}" !` : lang === "AR" ? `ممتاز! لقد كتبت "${buildingLatin}"!` : `Perfect! You wrote "${buildingLatin}"!`}
                      </span>
                    )}
                    {buildingFeedback === 'wrong' && (
                      <span>
                        {lang === "FR" ? `Pas tout à fait. Essayez l'ordre ⴰ → ⵎ → ⴰ → ⵏ.` : lang === "AR" ? `ليس تمامًا. جرب الترتيب ⴰ ← ⵎ ← ⴰ ← ⵏ.` : `Not quite. Try the order ⴰ → ⵎ → ⴰ → ⵏ.`}
                      </span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {step === "matching" && (
            <div>
              <h2 className="step-title">{lang === "FR" ? "Défi d'Association" : lang === "AR" ? "تحدي المطابقة" : "Matching Challenge"}</h2>
              <p className="step-subtitle">{lang === "FR" ? "Associez le mot tifinagh à sa prononciation." : lang === "AR" ? "طابق كلمة تيفيناغ مع نطقها." : "Match the Tifinagh word to its pronunciation."}</p>
              
              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '30px' }}>
                {/* Tifinagh Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, maxWidth: '200px' }}>
                  {shuffledTifinagh.map((pair, idx) => {
                    const isMatched = matchedPairs.includes(pair.tifinagh);
                    const isSelected = matchingSelectedTifinagh === pair.tifinagh;
                    return (
                      <button 
                        key={idx}
                        className={`quiz-option tifinagh-script ${isMatched ? 'correct' : isSelected ? 'selected' : ''}`}
                        style={{ fontSize: '1.8rem', padding: '16px', opacity: isMatched ? 0.5 : 1, transition: 'all 0.2s' }}
                        onClick={() => handleMatchSelect('tifinagh', pair.tifinagh)}
                        disabled={isMatched}
                      >
                        {pair.tifinagh}
                      </button>
                    )
                  })}
                </div>

                {/* Latin Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, maxWidth: '200px' }}>
                  {shuffledLatin.map((pair, idx) => {
                    const isMatched = matchedPairs.some(p => matchingPairs.find(mp => mp.tifinagh === p)?.latin === pair.latin);
                    const isSelected = matchingSelectedLatin === pair.latin;
                    return (
                      <button 
                        key={idx}
                        className={`quiz-option ${isMatched ? 'correct' : isSelected ? 'selected' : ''}`}
                        style={{ fontSize: '1.2rem', padding: '16px', fontWeight: 600, opacity: isMatched ? 0.5 : 1, transition: 'all 0.2s' }}
                        onClick={() => handleMatchSelect('latin', pair.latin)}
                        disabled={isMatched}
                      >
                        {pair.latin}
                      </button>
                    )
                  })}
                </div>
              </div>

              {allMatched && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginTop: '30px' }}>
                  <div className="correct-text" style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '16px' }}>
                    {lang === "FR" ? "Excellent ! Vous avez tout associé." : lang === "AR" ? "ممتاز! لقد قمت بمطابقة كل شيء." : "Excellent! You matched them all."}
                  </div>
                  <button className="mission-btn" onClick={handleNext}>
                    {lang === "FR" ? "Continuer" : lang === "AR" ? "متابعة" : "Continue"} <ArrowRight size={18} />
                  </button>
                </motion.div>
              )}
            </div>
          )}

          {step === "recognition" && (
            <div>
              <h2 className="step-title">{lang === "FR" ? "Défi de Reconnaissance" : lang === "AR" ? "تحدي التعرف" : "Recognition Challenge"}</h2>
              <p className="step-subtitle">
                {lang === "FR" ? `Reconnaissez le mot ${recognitionIndex + 1} sur ${recognitionData.length}` : lang === "AR" ? `تعرف على الكلمة ${recognitionIndex + 1} من ${recognitionData.length}` : `Recognize word ${recognitionIndex + 1} of ${recognitionData.length}`}
              </p>
              <div className="quiz-card">
                <div style={{ textAlign: 'center', fontSize: '3.5rem', color: 'var(--learn-primary)', marginBottom: '20px', fontFamily: '"Noto Sans Tifinagh", "Segoe UI Symbol", "Arial Unicode MS", sans-serif' }}>
                  {recognitionData[recognitionIndex].tifinagh}
                </div>
                <div className="quiz-question" style={{ fontSize: '1.1rem' }}>
                  {lang === "FR" ? "Que signifie ce mot ?" : lang === "AR" ? "ماذا تعني هذه الكلمة؟" : "What does this word mean?"}
                </div>
                <div className="quiz-options">
                  {getLangProp(recognitionData[recognitionIndex], 'options').map((opt, idx) => {
                    let cls = "quiz-option";
                    if (recognitionAnswer === idx) {
                      if (recognitionFeedback === 'correct') cls += " correct";
                      else if (recognitionFeedback === 'wrong') cls += " wrong";
                      else cls += " selected";
                    } else if (recognitionAnswer !== null && idx === recognitionData[recognitionIndex].answer && recognitionFeedback === 'wrong') {
                      cls += " correct";
                    }
                    return <button key={idx} className={cls} onClick={() => handleRecognitionAnswer(idx)} disabled={recognitionAnswer !== null}>{opt}</button>;
                  })}
                </div>
                <div className={`quiz-feedback ${recognitionFeedback ? (recognitionFeedback === 'correct' ? 'correct-text' : 'wrong-text') : ''}`}>
                  {recognitionFeedback === 'correct' && (lang === "FR" ? "Correct !" : lang === "AR" ? "صحيح!" : "Correct!")}
                  {recognitionFeedback === 'wrong' && (lang === "FR" ? "Réessayez." : lang === "AR" ? "حاول مرة أخرى." : "Try again.")}
                </div>
              </div>
            </div>
          )}

          {step === "quiz" && (
            <div>
              <h2 className="step-title">{lang === "FR" ? "Vérification des Connaissances" : lang === "AR" ? "التحقق من المعرفة" : "Knowledge Check"}</h2>
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
                {lang === "FR" ? "Vous connaissez maintenant des mots amazighs essentiels pour votre voyage." :
                 lang === "AR" ? "أنت تعرف الآن كلمات أمازيغية أساسية لرحلتك." :
                 "You now know essential Amazigh words for your journey."}
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--learn-success)' }}>
                    <CheckCircle size={20} />
                    <span style={{ fontWeight: 500 }}>{lang === "FR" ? "Mission 4 : Mots du Quotidien" : lang === "AR" ? "المهمة 4: كلمات يومية" : "Mission 4: Everyday Words"}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--learn-text)' }} className="completion-progress-current">
                    <Lock size={20} />
                    <span style={{ fontWeight: 500 }}>{lang === "FR" ? "Dernière Mission : Culture & Symboles" : lang === "AR" ? "المهمة الأخيرة: الثقافة والرموز" : "Final Mission: Culture & Symbols"}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginTop: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button className="mission-btn" onClick={() => navigate("/languages/tifinagh/mission-5")}>
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

      {step !== "intro" && step !== "completion" && step !== "wordbuilding" && step !== "matching" && step !== "recognition" && step !== "quiz" && (
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

export default Mission4;
