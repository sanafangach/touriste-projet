import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Shuffle, ArrowRight, Lightbulb, CheckCircle, XCircle } from "lucide-react";
import { getSavedVocabulary } from "../../../utils/storage";

function RevisionMode({ lang, isRTL, onClose }) {
  const allItems = useMemo(() => getSavedVocabulary(), []);
  const ui = (fr, en, ar) => lang === "FR" ? fr : lang === "AR" ? ar : en;

  const [mode, setMode] = useState(null); // null | "flashcard" | "quiz" | "reverse"
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [shuffled, setShuffled] = useState(() => [...allItems].sort(() => Math.random() - 0.5));

  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizFeedback, setQuizFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const currentItem = shuffled[currentIndex];

  const extractTifinagh = (word) => {
    if (!word) return "";
    const match = word.match(/[\u2D30-\u2D7F]+/g);
    return match ? match.join(" ") : word;
  };

  const extractMeaning = (item) => {
    if (item.translation) return item.translation;
    const word = item.word || "";
    const parenMatch = word.match(/\(([^)]+)\)/);
    if (parenMatch) {
      const content = parenMatch[1];
      const parts = content.split(/[—–-]/);
      return parts[parts.length - 1].trim();
    }
    return "";
  };

  const resetQuiz = () => {
    setQuizAnswer(null);
    setQuizFeedback(null);
  };

  const generateOptions = (correct, count = 4) => {
    const isQuiz = mode === "quiz";
    const others = allItems.filter(i => {
      if (i.id === correct.id) return false;
      const label = isQuiz ? extractMeaning(i) : extractTifinagh(i.word);
      return label && label.trim().length > 0;
    });
    const shuffledOthers = [...others].sort(() => Math.random() - 0.5).slice(0, count - 1);
    const options = [...shuffledOthers, correct].sort(() => Math.random() - 0.5);
    return options;
  };

  const [quizOptions, setQuizOptions] = useState([]);

  const startMode = (newMode) => {
    const s = [...allItems].sort(() => Math.random() - 0.5);
    setShuffled(s);
    setCurrentIndex(0);
    setFlipped(false);
    setQuizAnswer(null);
    setQuizFeedback(null);
    setScore(0);
    setDone(false);
    setMode(newMode);
    if (newMode === "quiz" || newMode === "reverse") {
      setQuizOptions(generateOptions(s[0]));
    }
  };

  const handleNext = () => {
    if (currentIndex < shuffled.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setFlipped(false);
      resetQuiz();
      if (mode === "quiz" || mode === "reverse") {
        setQuizOptions(generateOptions(shuffled[nextIdx]));
      }
    } else {
      setDone(true);
    }
  };

  const handleQuizAnswer = (idx) => {
    if (quizAnswer !== null) return;
    setQuizAnswer(idx);
    const isCorrect = mode === "quiz"
      ? quizOptions[idx].id === currentItem.id
      : quizOptions[idx].id === currentItem.id;
    setQuizFeedback(isCorrect ? "correct" : "wrong");
    if (isCorrect) setScore(prev => prev + 1);
  };

  const handleNextQuiz = () => {
    handleNext();
  };

  if (allItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "20px"
        }}
        onClick={() => onClose()}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          onClick={e => e.stopPropagation()}
          style={{
            background: "var(--apprendre-surface)", borderRadius: "24px",
            border: "1px solid var(--apprendre-border)", padding: "60px 40px",
            textAlign: "center", maxWidth: "400px"
          }}
        >
          <Lightbulb size={48} style={{ color: "var(--apprendre-text-secondary)", marginBottom: "16px", opacity: 0.4 }} />
          <h3 style={{ margin: "0 0 12px", fontSize: "1.2rem", fontWeight: 700, color: "var(--apprendre-text-primary)" }}>
            {ui("Aucun mot enregistré", "No Saved Words", "لا توجد كلمات محفوظة")}
          </h3>
          <p style={{ color: "var(--apprendre-text-secondary)", margin: "0 0 24px" }}>
            {ui("Enregistrez des mots de vocabulaire dans les missions pour commencer la révision.", "Save vocabulary words from missions to start revision.", "احفظ كلمات المفردات من المهام لبدء المراجعة.")}
          </p>
          <button className="mission-btn secondary" onClick={() => onClose()}>
            {ui("Fermer", "Close", "إغلاق")}
          </button>
        </motion.div>
      </motion.div>
    );
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "20px"
        }}
        onClick={() => onClose()}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          onClick={e => e.stopPropagation()}
          style={{
            background: "var(--apprendre-surface)", borderRadius: "24px",
            border: "1px solid var(--apprendre-border)", padding: "60px 40px",
            textAlign: "center", maxWidth: "400px"
          }}
        >
          <CheckCircle size={48} style={{ color: "var(--learn-success, #10b981)", marginBottom: "16px" }} />
          <h3 style={{ margin: "0 0 8px", fontSize: "1.2rem", fontWeight: 700, color: "var(--apprendre-text-primary)" }}>
            {ui("Révision Terminée !", "Revision Complete!", "اكتملت المراجعة!")}
          </h3>
          <p style={{ color: "var(--apprendre-text-secondary)", margin: "0 0 8px" }}>
            {mode !== "flashcard" && (
              <span style={{ fontWeight: 700, color: "var(--learn-accent, #d97706)", fontSize: "1.4rem" }}>
                {score}/{shuffled.length}
              </span>
            )}
          </p>
          <p style={{ color: "var(--apprendre-text-secondary)", margin: "0 0 24px" }}>
            {ui(`${shuffled.length} mot${shuffled.length > 1 ? "s" : ""} révisé${shuffled.length > 1 ? "s" : ""}`,
                `${shuffled.length} word${shuffled.length > 1 ? "s" : ""} reviewed`,
                `${shuffled.length} ${shuffled.length > 1 ? "كلمات تمت مراجعتها" : "كلمة تمت مراجعتها"}`)}
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button className="mission-btn" onClick={() => startMode(mode)}>
              <Shuffle size={16} style={{ marginRight: 6 }} />
              {ui("Recommencer", "Restart", "إعادة")}
            </button>
            <button className="mission-btn secondary" onClick={() => onClose()}>
              {ui("Fermer", "Close", "إغلاق")}
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  const modeSelector = !mode ? (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "24px 0" }}>
      <button className="mission-btn" onClick={() => startMode("flashcard")} style={{ justifyContent: "center" }}>
        <Lightbulb size={18} style={{ marginRight: 8 }} />
        {ui("Mode Flashcard", "Flashcard Mode", "وضع البطاقات التعليمية")}
      </button>
      <button className="mission-btn" onClick={() => startMode("quiz")} style={{ justifyContent: "center" }}>
        <CheckCircle size={18} style={{ marginRight: 8 }} />
        {ui("Mode Quiz", "Quiz Mode", "وضع الاختبار")}
      </button>
    </div>
  ) : mode === "flashcard" ? (
    <div>
      <div
        onClick={() => setFlipped(!flipped)}
        style={{
          minHeight: "200px", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "var(--apprendre-surface)", borderRadius: "20px",
          border: "2px solid var(--apprendre-border)", padding: "40px 24px",
          marginBottom: "20px", userSelect: "none",
          transition: "border-color 0.2s"
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--learn-accent, #d97706)"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--apprendre-border)"; }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={flipped ? "back" : "front"}
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -90 }}
            style={{ textAlign: "center" }}
          >
            <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--apprendre-text-primary)", marginBottom: "8px" }}>
              {flipped ? currentItem.translation : currentItem.word}
            </div>
            {!flipped && (
              <div style={{ fontSize: "0.85rem", color: "var(--apprendre-text-secondary)" }}>
                {ui("Cliquez pour voir la traduction", "Click to reveal translation", "انقر لإظهار الترجمة")}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
        <button className="mission-btn secondary" onClick={handleNext} disabled={currentIndex >= shuffled.length - 1}>
          {ui("Suivant", "Next", "التالي")} <ArrowRight size={16} style={{ marginLeft: 6 }} />
        </button>
      </div>

      <div style={{ textAlign: "center", marginTop: "16px", fontSize: "0.85rem", color: "var(--apprendre-text-secondary)" }}>
        {currentIndex + 1} / {shuffled.length}
      </div>
    </div>
  ) : (
    <div>
      <div style={{
        minHeight: "200px",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "var(--apprendre-surface)", borderRadius: "20px",
        border: "2px solid var(--apprendre-border)", padding: "32px 24px",
        marginBottom: "20px"
      }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1rem", fontWeight: 500, color: "var(--apprendre-text-secondary)", marginBottom: "12px" }}>
              {mode === "quiz"
                ? ui("Que signifie ce mot ?", "What does this word mean?", "ماذا تعني هذه الكلمة؟")
                : ui("Quel mot correspond ?", "Which word matches?", "أي كلمة تطابق؟")}
            </div>
            <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--apprendre-text-primary)" }}>
              {mode === "quiz" ? extractTifinagh(currentItem.word) : extractMeaning(currentItem)}
            </div>
          </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {quizOptions.map((opt, idx) => {
          const label = mode === "quiz" ? extractMeaning(opt) : extractTifinagh(opt.word);
          if (!label || label.trim().length === 0) return null;
          let btnClass = "quiz-option";
          if (quizAnswer === idx) {
            btnClass += quizFeedback === "correct" ? " correct" : " wrong";
          } else if (quizFeedback === "wrong" && quizAnswer !== null && opt.id === currentItem.id) {
            btnClass += " correct";
          }
          return (
            <button
              key={idx}
              className={btnClass}
              onClick={() => handleQuizAnswer(idx)}
              disabled={quizAnswer !== null}
              style={{ textAlign: isRTL ? "right" : "left" }}
            >
              <span style={{ fontWeight: 700, marginRight: 8 }}>{String.fromCharCode(65 + idx)}.</span>
              {label}
            </button>
          );
        })}
      </div>

      {quizFeedback && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: "16px", borderRadius: "16px", marginTop: "16px",
            background: quizFeedback === "correct" ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
            color: quizFeedback === "correct" ? "var(--learn-success, #10b981)" : "var(--learn-error, #ef4444)",
            display: "flex", alignItems: "center", gap: "10px", fontWeight: 600
          }}
        >
          {quizFeedback === "correct" ? <CheckCircle size={20} /> : <XCircle size={20} />}
          <span style={{ flex: 1 }}>
            {quizFeedback === "correct"
              ? ui("Correct !", "Correct!", "صحيح!")
              : ui("Incorrect. La bonne réponse était :", "Incorrect. The correct answer was:", "إجابة خاطئة. الإجابة الصحيحة هي:")}
          </span>
          {quizFeedback === "correct"
            ? <button className="mission-btn" onClick={handleNextQuiz} style={{ fontSize: "0.85rem", padding: "8px 16px" }}>
                {currentIndex < shuffled.length - 1
                  ? (ui("Suivant", "Next", "التالي"))
                  : (ui("Terminer", "Finish", "إنهاء"))}
                <ArrowRight size={16} style={{ marginLeft: 6 }} />
              </button>
            : <button className="mission-btn secondary" onClick={() => resetQuiz()} style={{ fontSize: "0.85rem", padding: "8px 16px" }}>
                {ui("Réessayer", "Retry", "إعادة المحاولة")}
              </button>}
        </motion.div>
      )}

      <div style={{ textAlign: "center", marginTop: "16px", fontSize: "0.85rem", color: "var(--apprendre-text-secondary)" }}>
        {ui("Question", "Question", "سؤال")} {currentIndex + 1} / {shuffled.length} — {ui("Score", "Score", "النتيجة")}: {score}
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px"
      }}
      onClick={() => onClose()}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: "var(--apprendre-surface)", borderRadius: "24px",
          border: "1px solid var(--apprendre-border)",
          boxShadow: "var(--apprendre-shadow-lg, 0 20px 60px rgba(0,0,0,0.15))",
          width: "100%", maxWidth: "520px",
          overflow: "hidden", display: "flex", flexDirection: "column"
        }}
      >
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 24px",
          borderBottom: mode ? "1px solid var(--apprendre-border)" : "none"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Lightbulb size={20} style={{ color: "var(--learn-accent, #d97706)" }} />
            <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700, color: "var(--apprendre-text-primary)" }}>
              {mode
                ? (mode === "flashcard" ? ui("Flashcards", "Flashcards", "بطاقات تعليمية") : ui("Quiz", "Quiz", "اختبار"))
                : ui("Mode Révision", "Revision Mode", "وضع المراجعة")}
            </h3>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {mode && (
              <button className="mission-btn secondary" onClick={() => { setMode(null); setDone(false); }}
                style={{ fontSize: "0.8rem", padding: "6px 12px" }}>
                <Shuffle size={14} style={{ marginRight: 4 }} />
                {ui("Changer", "Change", "تغيير")}
              </button>
            )}
            <button onClick={() => onClose()} className="mission-close" style={{ position: "static", width: 36, height: 36 }}>
              <X size={20} />
            </button>
          </div>
        </div>

        <div style={{ padding: "8px 24px 24px" }}>
          {modeSelector}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default RevisionMode;
