import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Award,
  Type,
  BookOpen,
  MapPin,
  Lock,
} from "lucide-react";
import { useLanguage } from "../../accueil/LanguageContext";
import { useAuth } from "../../../context/AuthContext";
import "../darija/mission.css";
import { useAutoProgress, canAccessMission } from "../../../utils/progress";
import LockedScreen from "../common/LockedScreen";
import FavoriteButton from "../common/FavoriteButton";
import SaveVocabButton from "../common/SaveVocabButton";

const STEPS = [
  "intro",
  "review",
  "word",
  "assembly",
  "recognition",
  "culture",
  "quiz",
  "completion",
];

const STEP_LABELS = {
  intro: { en: "Introduction", fr: "Introduction", ar: "مقدمة" },
  review: { en: "Quick Review", fr: "Révision Rapide", ar: "مراجعة سريعة" },
  word: { en: 'Learn "AZUL"', fr: 'Apprenez "AZUL"', ar: 'تعلّم "أزول"' },
  assembly: { en: "Assemble the Word", fr: "Assemblez le Mot", ar: "كوّن الكلمة" },
  recognition: { en: "Recognition Challenge", fr: "Défi de Reconnaissance", ar: "تحدي التعرف" },
  culture: { en: "Cultural Discovery", fr: "Découverte Culturelle", ar: "اكتشاف ثقافي" },
  quiz: { en: "Quick Quiz", fr: "Quiz Rapide", ar: "اختبار سريع" },
  completion: { en: "Completion", fr: "Achèvement", ar: "اكتمال" }
};

const reviewSymbols = [
  {
    symbol: "ⴰ",
    latin: "A",
    title: { en: "The sound A", fr: "Le son A", ar: "صوت أ" },
    desc: {
      en: "A common opening sound in many Amazigh words.",
      fr: "Un son fréquent au début de nombreux mots amazighs.",
      ar: "صوت شائع في بداية العديد من الكلمات الأمازيغية.",
    },
  },
  {
    symbol: "ⴱ",
    latin: "B",
    title: { en: "The sound B", fr: "Le son B", ar: "صوت ب" },
    desc: {
      en: "Useful for recognizing more words on signs later.",
      fr: "Utile pour reconnaître plus de mots sur les panneaux plus tard.",
      ar: "مفيد للتعرّف على كلمات أكثر على اللافتات لاحقًا.",
    },
  },
  {
    symbol: "ⵣ",
    latin: "Z",
    title: { en: "The sound Z", fr: "Le son Z", ar: "صوت ز" },
    desc: {
      en: "One of the most iconic Amazigh symbols.",
      fr: "L'un des symboles amazighs les plus emblématiques.",
      ar: "أحد أكثر الرموز الأمازيغية شهرة.",
    },
  },
];

const azulLetters = [
  {
    symbol: "ⴰ",
    latin: "A",
    note: {
      en: "Starts the word with an open A sound.",
      fr: "Commence le mot avec un son A ouvert.",
      ar: "تبدأ الكلمة بصوت أ واضح.",
    },
  },
  {
    symbol: "ⵣ",
    latin: "Z",
    note: {
      en: "Adds the strong Z sound heard clearly in AZUL.",
      fr: "Ajoute le son Z fort que l'on entend clairement dans AZUL.",
      ar: "يضيف صوت ز الواضح في أزول.",
    },
  },
  {
    symbol: "ⵓ",
    latin: "U",
    note: {
      en: "Creates the smooth U sound in the middle.",
      fr: "Crée le son U fluide au milieu.",
      ar: "يصنع صوت أو/و السلس في وسط الكلمة.",
    },
  },
  {
    symbol: "ⵍ",
    latin: "L",
    note: {
      en: "Ends the word softly with L.",
      fr: "Termine le mot doucement avec L.",
      ar: "تنهي الكلمة بصوت ل.",
    },
  },
];

const recognitionChoices = [
  {
    en: "Hello / Welcome",
    fr: "Bonjour / Bienvenue",
    ar: "مرحبًا / أهلاً وسهلاً",
  },
  {
    en: "Thank you",
    fr: "Merci",
    ar: "شكرًا",
  },
  {
    en: "Mountain",
    fr: "Montagne",
    ar: "جبل",
  },
];

const quizData = [
  {
    q: {
      en: 'What does "ⴰⵣⵓⵍ" mean?',
      fr: 'Que signifie "ⴰⵣⵓⵍ" ?',
      ar: 'ماذا تعني "ⴰⵣⵓⵍ"؟',
    },
    options: [
      { en: "Hello / Welcome", fr: "Bonjour / Bienvenue", ar: "مرحبًا / أهلاً وسهلاً" },
      { en: "Goodbye", fr: "Au revoir", ar: "إلى اللقاء" },
      { en: "Market", fr: "Marché", ar: "سوق" },
    ],
    answer: 0,
  },
  {
    q: {
      en: "Which symbol gives the Z sound in AZUL?",
      fr: "Quel symbole donne le son Z dans AZUL ?",
      ar: "أي رمز يعطي صوت ز في أزول؟",
    },
    options: ["ⵍ", "ⵣ", "ⴱ"],
    answer: 1,
  },
  {
    q: {
      en: "Where might travelers see Tifinagh?",
      fr: "Où les voyageurs peuvent-ils voir le tifinagh ?",
      ar: "أين قد يرى المسافرون تيفيناغ؟",
    },
    options: [
      { en: "On signs and monuments", fr: "Sur des panneaux et monuments", ar: "على اللافتات والمعالم" },
      { en: "Only in airports", fr: "Uniquement dans les aéroports", ar: "فقط في المطارات" },
      { en: "Only in textbooks", fr: "Uniquement dans les manuels", ar: "فقط في الكتب المدرسية" },
    ],
    answer: 0,
  },
];

const assemblyPool = ["ⴰ", "ⵣ", "ⵓ", "ⵍ"];
const targetWord = ["ⴰ", "ⵣ", "ⵓ", "ⵍ"];

function TifinaghMission2() {
  const { lang, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedReviewSymbol, setSelectedReviewSymbol] = useState(0);
  const [assembledLetters, setAssembledLetters] = useState([]);
  const [assemblyFeedback, setAssemblyFeedback] = useState(null);
  const [recognitionAnswer, setRecognitionAnswer] = useState(null);
  const [recognitionFeedback, setRecognitionFeedback] = useState(null);
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizFeedback, setQuizFeedback] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStepIndex]);

  const step = STEPS[currentStepIndex];
  useAutoProgress(step);
  const progressPercent = (currentStepIndex / (STEPS.length - 1)) * 100;
  const selectedSymbol = reviewSymbols[selectedReviewSymbol];

  const getText = (value) => {
    if (typeof value === "object") {
      return value[lang.toLowerCase()] || value.en;
    }
    return value;
  };

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const availableLetters = useMemo(
    () => assemblyPool.filter((letter) => !assembledLetters.includes(letter)),
    [assembledLetters]
  );

  const handleAssemblySelect = (letter) => {
    if (assembledLetters.length >= targetWord.length || assemblyFeedback === "correct") return;
    setAssembledLetters((prev) => [...prev, letter]);
    setAssemblyFeedback(null);
  };

  const handleAssemblyUndo = () => {
    if (!assembledLetters.length || assemblyFeedback === "correct") return;
    setAssembledLetters((prev) => prev.slice(0, -1));
    setAssemblyFeedback(null);
  };

  const handleAssemblyReset = () => {
    setAssembledLetters([]);
    setAssemblyFeedback(null);
  };

  const handleAssemblyCheck = () => {
    if (assembledLetters.length !== targetWord.length) return;

    const isCorrect = assembledLetters.join("") === targetWord.join("");
    setAssemblyFeedback(isCorrect ? "correct" : "wrong");

    if (isCorrect) {
      setTimeout(() => {
        handleNext();
      }, 1200);
    }
  };

  const handleRecognitionAnswer = (index) => {
    if (recognitionAnswer !== null) return;

    const isCorrect = index === 0;
    setRecognitionAnswer(index);
    setRecognitionFeedback(isCorrect ? "correct" : "wrong");

    setTimeout(() => {
      if (isCorrect) {
        handleNext();
      } else {
        setRecognitionAnswer(null);
        setRecognitionFeedback(null);
      }
    }, 1400);
  };

  const handleQuizAnswer = (idx) => {
    if (selectedOption !== null) return;

    setSelectedOption(idx);
    const isCorrect = idx === quizData[quizQuestionIndex].answer;
    setQuizFeedback(isCorrect ? "correct" : "wrong");

    setTimeout(() => {
      if (isCorrect) {
        if (quizQuestionIndex < quizData.length - 1) {
          setQuizQuestionIndex((prev) => prev + 1);
          setSelectedOption(null);
          setQuizFeedback(null);
        } else {
          handleNext();
        }
      } else {
        setSelectedOption(null);
        setQuizFeedback(null);
      }
    }, 1400);
  };

  const getRecognitionOptionClass = (index) => {
    let className = "quiz-option";

    if (recognitionAnswer === null) {
      return className;
    }

    if (index === 0 && recognitionFeedback === "wrong") {
      return `${className} correct`;
    }

    if (recognitionAnswer === index) {
      return `${className} ${recognitionFeedback === "correct" ? "correct" : "wrong"}`;
    }

    return className;
  };

  const getQuizOptionClass = (index) => {
    let className = "quiz-option";

    if (selectedOption === index) {
      if (quizFeedback === "correct") return `${className} correct`;
      if (quizFeedback === "wrong") return `${className} wrong`;
      return `${className} selected`;
    }

    if (
      selectedOption !== null &&
      quizFeedback === "wrong" &&
      index === quizData[quizQuestionIndex].answer
    ) {
      return `${className} correct`;
    }

    return className;
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
        <FavoriteButton track="tifinagh" missionNum={2} />
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
          {step === "intro" && (
            <div className="intro-step">
              <div className="intro-icon">
                <BookOpen size={40} />
              </div>
              <h1 className="intro-title">
                {lang === "FR"
                  ? "Écrire votre premier mot en tifinagh"
                  : lang === "AR"
                  ? "اكتب أول كلمة لك بتيفيناغ"
                  : "Write Your First Tifinagh Word"}
              </h1>
              <p className="intro-desc">
                {lang === "FR"
                  ? "Les symboles tifinagh se combinent pour former de vrais mots que les voyageurs peuvent remarquer sur des panneaux, des monuments et dans des espaces culturels à travers le Maroc."
                  : lang === "AR"
                  ? "تجتمع رموز تيفيناغ لتكوّن كلمات حقيقية قد يراها المسافرون على اللافتات والمعالم والأماكن الثقافية في أنحاء المغرب."
                  : "Tifinagh symbols combine to form real words that travelers may notice on signs, monuments, and cultural spaces across Morocco."}
              </p>
              <button className="mission-btn" onClick={handleNext}>
                {lang === "FR" ? "Commencer la mission" : lang === "AR" ? "ابدأ المهمة" : "Start Mission"}
                <ArrowRight size={20} />
              </button>
            </div>
          )}

          {step === "review" && (
            <div>
              <h2 className="step-title">
                {lang === "FR" ? "Révision rapide des symboles" : lang === "AR" ? "مراجعة سريعة للرموز" : "Quick Symbol Review"}
              </h2>
              <p className="step-subtitle">
                {lang === "FR"
                  ? "Touchez une carte pour revoir chaque symbole avant de former votre premier mot."
                  : lang === "AR"
                  ? "اضغط على بطاقة لمراجعة كل رمز قبل تكوين أول كلمة لك."
                  : "Tap a card to review each symbol before building your first word."}
              </p>

              <div className="vocab-grid">
                {reviewSymbols.map((item, index) => (
                  <button
                    key={item.symbol}
                    type="button"
                    className={`vocab-card tifinagh-card-override tifinagh-word-card ${
                      selectedReviewSymbol === index ? "tifinagh-review-card-active" : ""
                    }`}
                    onClick={() => setSelectedReviewSymbol(index)}
                  >
                    <div className="tifinagh-symbol-chip tifinagh-script">{item.symbol}</div>
                    <div className="vocab-word">{item.latin}</div>
                    <div className="tifinagh-inline-note">{getText(item.title)}</div>
                    <SaveVocabButton id={'tifinagh_2_' + item.symbol} word={item.symbol} translation={item.latin} track="tifinagh" missionNum={2} type="vocab" />
                  </button>
                ))}
              </div>

              <div className="chat-container tifinagh-review-detail">
                <div className="tifinagh-break-symbol tifinagh-script">{selectedSymbol.symbol}</div>
                <h3 className="step-title" style={{ fontSize: "1.3rem", marginBottom: 8 }}>
                  {selectedSymbol.latin}
                </h3>
                <p className="tifinagh-inline-note">{getText(selectedSymbol.desc)}</p>
              </div>
            </div>
          )}

          {step === "word" && (
            <div>
              <h2 className="step-title">
                {lang === "FR" ? 'Apprenez le mot "AZUL"' : lang === "AR" ? 'تعلّم كلمة "أزول"' : 'Learn the Word "AZUL"'}
              </h2>
              <p className="step-subtitle">
                {lang === "FR"
                  ? "AZUL signifie bonjour ou bienvenue, un mot chaleureux profondément lié à l'hospitalité amazighe."
                  : lang === "AR"
                  ? "أزول تعني مرحبًا أو أهلاً وسهلاً، وهي كلمة دافئة مرتبطة بكرم الضيافة الأمازيغية."
                  : "AZUL means hello or welcome, a warm word closely tied to Amazigh hospitality."}
              </p>

              <div className="chat-container tifinagh-lesson-block">
                <div className="tifinagh-hero-word tifinagh-script">ⴰⵣⵓⵍ</div>
                <div className="tifinagh-hero-translation">AZUL</div>
                <div className="tifinagh-inline-note">
                  {lang === "FR"
                    ? "Prononciation : a-zoul"
                    : lang === "AR"
                    ? "النطق: أ-زول"
                    : "Pronunciation: ah-zool"}
                </div>
              </div>

              <div className="expressions-list">
                {azulLetters.map((item) => (
                  <div key={item.symbol} className="expression-card tifinagh-breakdown-card">
                    <div className="expression-content tifinagh-breakdown-row">
                      <div className="tifinagh-break-symbol tifinagh-script">{item.symbol}</div>
                      <div className="tifinagh-break-arrow">→</div>
                      <div className="tifinagh-break-latin">{item.latin}</div>
                    </div>
                    <div className="exp-context">{getText(item.note)}</div>
                    <SaveVocabButton id={'tifinagh_2_' + item.symbol} word={item.symbol} translation={item.latin} track="tifinagh" missionNum={2} type="vocab" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === "assembly" && (
            <div>
              <h2 className="step-title">
                {lang === "FR" ? "Assemblez le mot" : lang === "AR" ? "كوّن الكلمة" : "Assemble the Word"}
              </h2>
              <p className="step-subtitle">
                {lang === "FR"
                  ? "Touchez les symboles dans le bon ordre pour écrire AZUL."
                  : lang === "AR"
                  ? "اضغط على الرموز بالترتيب الصحيح لكتابة أزول."
                  : "Tap the symbols in the correct order to write AZUL."}
              </p>

              <div className="chat-container tifinagh-assembly-board">
                <div className="tifinagh-target-label">AZUL</div>
                <div className="tifinagh-slots">
                  {targetWord.map((_, index) => (
                    <div key={index} className="tifinagh-slot tifinagh-script">
                      {assembledLetters[index] || "?"}
                    </div>
                  ))}
                </div>

                <div className="quiz-options tifinagh-options-grid">
                  {availableLetters.map((letter) => (
                    <button
                      key={letter}
                      type="button"
                      className="quiz-option tifinagh-letter-btn tifinagh-script"
                      onClick={() => handleAssemblySelect(letter)}
                    >
                      {letter}
                    </button>
                  ))}
                </div>

                <div className="tifinagh-action-row">
                  <button className="mission-btn secondary" onClick={handleAssemblyUndo} disabled={!assembledLetters.length}>
                    {lang === "FR" ? "Annuler" : lang === "AR" ? "تراجع" : "Undo"}
                  </button>
                  <button className="mission-btn secondary" onClick={handleAssemblyReset} disabled={!assembledLetters.length}>
                    {lang === "FR" ? "Réinitialiser" : lang === "AR" ? "إعادة الضبط" : "Reset"}
                  </button>
                  <button className="mission-btn" onClick={handleAssemblyCheck} disabled={assembledLetters.length !== targetWord.length}>
                    {lang === "FR" ? "Vérifier" : lang === "AR" ? "تحقق" : "Check"}
                  </button>
                </div>

                <div className={`quiz-feedback ${assemblyFeedback ? (assemblyFeedback === "correct" ? "correct-text" : "wrong-text") : ""}`}>
                  {assemblyFeedback === "correct" &&
                    (lang === "FR" ? "Parfait ! Vous avez écrit AZUL." : lang === "AR" ? "ممتاز! لقد كتبت أزول." : "Perfect! You wrote AZUL.")}
                  {assemblyFeedback === "wrong" &&
                    (lang === "FR" ? "Pas encore. Essayez l'ordre A → Z → U → L." : lang === "AR" ? "ليس بعد. جرّب الترتيب أ → ز → و → ل." : "Not yet. Try the order A → Z → U → L.")}
                </div>
              </div>
            </div>
          )}

          {step === "recognition" && (
            <div>
              <h2 className="step-title">
                {lang === "FR" ? "Défi de reconnaissance" : lang === "AR" ? "تحدي التعرّف" : "Recognition Challenge"}
              </h2>
              <p className="step-subtitle">
                {lang === "FR"
                  ? "Vous voyez ce mot sur un panneau. Que signifie-t-il ?"
                  : lang === "AR"
                  ? "أنت ترى هذه الكلمة على لافتة. ماذا تعني؟"
                  : "You see this word on a sign. What does it mean?"}
              </p>

              <div className="chat-container" style={{ textAlign: "center" }}>
                <div className="tifinagh-recognition-word tifinagh-script">ⴰⵣⵓⵍ</div>
                <div className="quiz-options tifinagh-options-grid">
                  {recognitionChoices.map((choice, index) => (
                    <button
                      key={index}
                      type="button"
                      className={getRecognitionOptionClass(index)}
                      onClick={() => handleRecognitionAnswer(index)}
                      disabled={recognitionAnswer !== null}
                    >
                      {getText(choice)}
                    </button>
                  ))}
                </div>
                <div className={`quiz-feedback ${recognitionFeedback ? (recognitionFeedback === "correct" ? "correct-text" : "wrong-text") : ""}`}>
                  {recognitionFeedback === "correct" &&
                    (lang === "FR" ? "Oui ! AZUL veut dire bonjour ou bienvenue." : lang === "AR" ? "نعم! أزول تعني مرحبًا أو أهلاً وسهلاً." : "Yes! AZUL means hello or welcome.")}
                  {recognitionFeedback === "wrong" &&
                    (lang === "FR" ? "Réessayez. C'est une salutation chaleureuse." : lang === "AR" ? "حاول مرة أخرى. إنها تحية دافئة." : "Try again. It is a warm greeting.")}
                </div>
              </div>
            </div>
          )}

          {step === "culture" && (
            <div>
              <h2 className="step-title">
                {lang === "FR" ? "Découverte culturelle" : lang === "AR" ? "اكتشاف ثقافي" : "Cultural Discovery"}
              </h2>
              <p className="step-subtitle">
                {lang === "FR"
                  ? "Pourquoi AZUL compte dans la vie amazighe et pour les voyageurs."
                  : lang === "AR"
                  ? "لماذا تُعد أزول مهمة في الحياة الأمازيغية وللمسافرين."
                  : "Why AZUL matters in Amazigh life and for travelers."}
              </p>

              <div className="vocab-grid">
                <div className="vocab-card tifinagh-card-override tifinagh-info-card">
                  <div className="intro-icon tifinagh-mini-icon">
                    <BookOpen size={24} />
                  </div>
                  <h3 className="step-title" style={{ fontSize: "1.15rem" }}>
                    {lang === "FR" ? "Une salutation de bienvenue" : lang === "AR" ? "تحية ترحيب" : "A welcoming greeting"}
                  </h3>
                  <p className="tifinagh-inline-note">
                    {lang === "FR"
                      ? "AZUL exprime l'accueil, la chaleur et le respect dans de nombreux contextes amazighs."
                      : lang === "AR"
                      ? "تعبر أزول عن الترحيب والدفء والاحترام في كثير من السياقات الأمازيغية."
                      : "AZUL expresses welcome, warmth, and respect in many Amazigh contexts."}
                  </p>
                </div>

                <div className="vocab-card tifinagh-card-override tifinagh-info-card">
                  <div className="intro-icon tifinagh-mini-icon">
                    <MapPin size={24} />
                  </div>
                  <h3 className="step-title" style={{ fontSize: "1.15rem" }}>
                    {lang === "FR" ? "Où vous pouvez le voir" : lang === "AR" ? "أين قد تراه" : "Where you may see it"}
                  </h3>
                  <p className="tifinagh-inline-note">
                    {lang === "FR"
                      ? "Les touristes peuvent repérer le tifinagh sur des panneaux officiels, des centres culturels, des monuments et des enseignes locales."
                      : lang === "AR"
                      ? "قد يلاحظ السياح تيفيناغ على اللافتات الرسمية والمراكز الثقافية والمعالم واللوحات المحلية."
                      : "Tourists may spot Tifinagh on official signs, cultural centers, monuments, and local displays."}
                  </p>
                </div>

                <div className="vocab-card tifinagh-card-override tifinagh-info-card">
                  <div className="intro-icon tifinagh-mini-icon">
                    <Type size={24} />
                  </div>
                  <h3 className="step-title" style={{ fontSize: "1.15rem" }}>
                    {lang === "FR" ? "Identité amazighe" : lang === "AR" ? "الهوية الأمازيغية" : "Amazigh identity"}
                  </h3>
                  <p className="tifinagh-inline-note">
                    {lang === "FR"
                      ? "Lire un mot comme AZUL aide les visiteurs à reconnaître une langue vivante et une identité fièrement visible dans l'espace public."
                      : lang === "AR"
                      ? "قراءة كلمة مثل أزول تساعد الزوار على التعرّف على لغة حيّة وهوية تظهر بفخر في الفضاء العام."
                      : "Reading a word like AZUL helps visitors recognize a living language and identity proudly visible in public spaces."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {step === "quiz" && (
            <div>
              <h2 className="step-title">
                {lang === "FR" ? "Quiz rapide" : lang === "AR" ? "اختبار سريع" : "Quick Quiz"}
              </h2>
              <p className="step-subtitle">
                {lang === "FR"
                  ? `Question ${quizQuestionIndex + 1} sur ${quizData.length}`
                  : lang === "AR"
                  ? `السؤال ${quizQuestionIndex + 1} من ${quizData.length}`
                  : `Question ${quizQuestionIndex + 1} of ${quizData.length}`}
              </p>

              <div className="chat-container" style={{ textAlign: isRTL ? "right" : "left" }}>
                <h3 className="step-title" style={{ fontSize: "1.4rem", marginBottom: 24 }}>
                  {getText(quizData[quizQuestionIndex].q)}
                </h3>

                <div className="quiz-options tifinagh-options-grid">
                  {quizData[quizQuestionIndex].options.map((opt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={getQuizOptionClass(idx)}
                      onClick={() => handleQuizAnswer(idx)}
                      disabled={selectedOption !== null}
                    >
                      {getText(opt)}
                    </button>
                  ))}
                </div>

                <div className={`quiz-feedback ${quizFeedback ? (quizFeedback === "correct" ? "correct-text" : "wrong-text") : ""}`}>
                  {quizFeedback === "correct" && (lang === "FR" ? "Bien joué !" : lang === "AR" ? "أحسنت!" : "Well done!")}
                  {quizFeedback === "wrong" &&
                    (lang === "FR" ? "Pas tout à fait. Réessayez." : lang === "AR" ? "ليس تمامًا. حاول مرة أخرى." : "Not quite. Try again.")}
                </div>
              </div>
            </div>
          )}

          {step === "completion" && (
            <div className="completion-step">
              <div className="completion-icon">
                <Award size={48} />
              </div>
              <h1 className="intro-title">
                {lang === "FR" ? "Mission accomplie !" : lang === "AR" ? "اكتملت المهمة!" : "Mission Completed!"}
              </h1>
              <p className="intro-desc">
                {lang === "FR"
                  ? "Vous pouvez maintenant reconnaître votre premier mot amazigh."
                  : lang === "AR"
                  ? "يمكنك الآن التعرّف على أول كلمة أمازيغية لك."
                  : "You can now recognize your first Amazigh word."}
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--learn-text)' }} className="completion-progress-current">
                    <Lock size={20} />
                    <span style={{ fontWeight: 500 }}>{lang === "FR" ? "Prochaine Mission : Signes Courants" : lang === "AR" ? "المهمة القادمة: اللافتات الشائعة" : "Next Mission: Common Signs"}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginTop: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button className="mission-btn" onClick={() => navigate("/languages/tifinagh/mission-3")}>
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

      {step !== "intro" && step !== "assembly" && step !== "recognition" && step !== "quiz" && step !== "completion" && (
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

export default TifinaghMission2;
