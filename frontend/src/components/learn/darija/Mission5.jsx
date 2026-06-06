import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X, ArrowRight, ArrowLeft, MessageCircle, CheckCircle, ShoppingBag, Award, Lock } from "lucide-react";
import { useLanguage } from "../../accueil/LanguageContext";
import { useAuth } from "../../../context/AuthContext";
import { AudioButton } from "../common/AudioButton";
import "./mission.css";
import { useAutoProgress, canAccessMission } from "../../../utils/progress";
import LockedScreen from "../common/LockedScreen";
import FavoriteButton from "../common/FavoriteButton";
import SaveVocabButton from "../common/SaveVocabButton";

const vocabData = [
  { darija: "Souk", arabicText: "سوق", fr: "Marché", en: "Market", ar: "سوق", context: { en: "The traditional open-air market. Every city has one.", fr: "Le marché traditionnel en plein air. Chaque ville en a un.", ar: "السوق التقليدي المفتوح. كل مدينة لديها واحد." } },
  { darija: "Bshhal?", arabicText: "بشحال؟", fr: "Combien ?", en: "How much?", ar: "بشحال؟", context: { en: "The first word you need in any souk. Always ask before buying.", fr: "Le premier mot dont vous avez besoin dans tout souk. Demandez toujours avant d'acheter.", ar: "أول كلمة تحتاجها في أي سوق. اسأل دائماً قبل الشراء." } },
  { darija: "Ghali", arabicText: "غالي", fr: "Cher", en: "Expensive", ar: "غالي", context: { en: "Use this to signal that the price is too high. Opens negotiation.", fr: "Utilisez-le pour signaler que le prix est trop élevé. Ouvre la négociation.", ar: "استخدمها للإشارة إلى أن السعر مرتفع جداً. يفتح باب التفاوض." } },
  { darija: "Rkhis", arabicText: "رخيص", fr: "Pas cher", en: "Cheap", ar: "رخيص", context: { en: "The opposite of ghali. Use when suggesting a lower price.", fr: "Le contraire de ghali. Utilisez quand vous suggérez un prix plus bas.", ar: "عكس غالي. استخدمها عند اقتراح سعر أقل." } },
  { darija: "3tini", arabicText: "عطيني", fr: "Donne-moi", en: "Give me", ar: "عطيني", context: { en: "Polite way to ask for an item. '3tini wahd had...' = Give me one of these.", fr: "Façon polie de demander un article. '3tini wahd had...' = Donne-moi un de ceux-ci.", ar: "طريقة مهذبة لطلب سلعة. 'عطيني واحد هاد...' = أعطني واحد من هذا." } },
  { darija: "Nqss", arabicText: "نقص", fr: "Réduire", en: "Lower / Reduce", ar: "نقص", context: { en: "Key negotiation word. 'Nqss shwiya' = Lower it a bit.", fr: "Mot clé de négociation. 'Nqss shwiya' = Baisse un peu.", ar: "كلمة تفاوض رئيسية. 'نقص شوية' = انزل شوية." } }
];

const expressionsData = [
  { darija: "Bshhal hada?", arabicText: "بشحال هدا؟", fr: "Combien ça coûte ?", en: "How much is this?", ar: "بشحال هدا؟", context: { en: "Point at the item and ask. Always your first move.", fr: "Montrez l'article et demandez. Toujours votre premier geste.", ar: "أشر إلى السلعة واسأل. دائماً خطوتك الأولى." } },
  { darija: "Ghali bzaf! Nqss shwiya.", arabicText: "غالي بزاف! نقص شوية.", fr: "C'est trop cher ! Baissez un peu.", en: "Too expensive! Lower it a bit.", ar: "غالي بزاف! نقص شوية.", context: { en: "The classic bargaining opener. Say it with a smile.", fr: "L'ouverture classique de négociation. Dites-le avec le sourire.", ar: "الافتتاحية الكلاسيكية للمساومة. قلها بابتسامة." } },
  { darija: "Wakha, 3tini b...", arabicText: "واخا، عطيني ب...", fr: "D'accord, donnez-moi à...", en: "Okay, give it to me for...", ar: "واخا، عطيني ب...", context: { en: "Use to propose your counter-offer after negotiating.", fr: "Utilisez pour proposer votre contre-offre après négociation.", ar: "استخدمها لاقتراح عرضك المضاد بعد التفاوض." } }
];

const conversationData = [
  { speaker: "Traveler", darija: "Salam! Bshhal hada?", arabicText: "سلام! بشحال هدا؟", fr: "Bonjour ! Combien ça coûte ?", en: "Hello! How much is this?", isRight: true },
  { speaker: "Seller", darija: "Salam! Hada b 300 dirham.", arabicText: "سلام! هدا ب 300 درهم.", fr: "Bonjour ! C'est 300 dirhams.", en: "Hello! That's 300 dirhams.", isRight: false },
  { speaker: "Traveler", darija: "Ghali bzaf! Nqss shwiya.", arabicText: "غالي بزاف! نقص شوية.", fr: "C'est trop cher ! Baissez un peu.", en: "Too expensive! Lower it a bit.", isRight: true },
  { speaker: "Seller", darija: "Hada mezyan, qualité mezyana. 250?", arabicText: "هدا مزيان، كواليطي مزيانة. 250؟", fr: "C'est bon, bonne qualité. 250 ?", en: "It's good, great quality. 250?", isRight: false },
  { speaker: "Traveler", darija: "La, 150 afak.", arabicText: "لا، 150 عافاك.", fr: "Non, 150 s'il vous plaît.", en: "No, 150 please.", isRight: true },
  { speaker: "Seller", darija: "200, akhir taman.", arabicText: "200، آخر تمن.", fr: "200, dernier prix.", en: "200, final price.", isRight: false },
  { speaker: "Traveler", darija: "Wakha, 3tini b 200. Shukran!", arabicText: "واخا، عطيني ب 200. شكرا!", fr: "D'accord, donnez-moi à 200. Merci !", en: "Okay, give it to me for 200. Thanks!", isRight: true },
];

const situationsData = [
  {
    q: { en: "A seller quotes 500 dirhams for a leather bag. You think it's too expensive. What do you say?", fr: "Un vendeur propose un sac en cuir à 500 dirhams. Vous trouvez que c'est trop cher. Que dites-vous ?", ar: "بائع يقترح حقيبة جلدية بـ 500 درهم. تعتقد أنها غالية جداً. ماذا تقول؟" },
    options: { en: ["Ghali bzaf! Nqss shwiya.", "Shukran, bslama."], fr: ["Ghali bzaf! Nqss shwiya.", "Shukran, bslama."], ar: ["غالي بزاف! نقص شوية.", "شكرا، بسلامة."] },
    correctIdx: 0,
    feedback: { en: "Correct! This opens a friendly negotiation. The seller expects it.", fr: "Correct ! Cela ouvre une négociation amicale. Le vendeur s'y attend.", ar: "صحيح! هذا يفتح مفاوضة ودية. البائع يتوقع ذلك." },
    feedbackWrong: { en: "That means 'Thanks, goodbye.' You left without trying to negotiate!", fr: "Ça signifie 'Merci, au revoir.' Vous êtes parti sans essayer de négocier !", ar: "هذا يعني 'شكرا، مع السلامة.' غادرت دون محاولة التفاوض!" }
  },
  {
    q: { en: "You want to know the price of spices at a stall. What do you ask?", fr: "Vous voulez connaître le prix des épices à un étal. Que demandez-vous ?", ar: "تريد معرفة سعر التوابل في كشك. ماذا تسأل؟" },
    options: { en: ["3tini wahd kilo.", "Bshhal hada?"], fr: ["3tini wahd kilo.", "Bshhal hada?"], ar: ["عطيني واحد كيلو.", "بشحال هدا؟"] },
    correctIdx: 1,
    feedback: { en: "Correct! Always ask the price first before committing.", fr: "Correct ! Demandez toujours le prix avant de vous engager.", ar: "صحيح! اسأل دائماً عن السعر أولاً قبل الالتزام." },
    feedbackWrong: { en: "That means 'Give me one kilo.' You ordered without knowing the price!", fr: "Ça signifie 'Donne-moi un kilo.' Vous avez commandé sans connaître le prix !", ar: "هذا يعني 'أعطني كيلو واحد.' طلبت دون معرفة السعر!" }
  }
];

const quizData = [
  {
    q: { en: 'What does "Bshhal?" mean?', fr: 'Que signifie "Bshhal?" ?', ar: 'ماذا تعني "بشحال؟"' },
    options: { en: ["Give me", "How much?", "Too expensive", "Lower it"], fr: ["Donne-moi", "Combien ?", "Trop cher", "Baisse"], ar: ["أعطني", "بشحال؟", "غالي بزاف", "نقص"] },
    answer: 1
  },
  {
    q: { en: 'How do you say "Too expensive" in Darija?', fr: 'Comment dit-on "Trop cher" en darija ?', ar: 'كيف تقول "غالي جداً" بالدارجة؟' },
    options: { en: ["Rkhis", "Nqss", "Ghali bzaf", "3tini"], fr: ["Rkhis", "Nqss", "Ghali bzaf", "3tini"], ar: ["رخيص", "نقص", "غالي بزاف", "عطيني"] },
    answer: 2
  },
  {
    q: { en: 'You agreed on a price. How do you say "Give it to me for 200"?', fr: 'Vous êtes d\'accord sur un prix. Comment dit-on "Donnez-le moi à 200" ?', ar: 'اتفقت على السعر. كيف تقول "أعطني بـ 200"؟' },
    options: { en: ["Bshhal 200?", "Ghali 200", "3tini b 200", "Nqss 200"], fr: ["Bshhal 200?", "Ghali 200", "3tini b 200", "Nqss 200"], ar: ["بشحال 200؟", "غالي 200", "عطيني ب 200", "نقص 200"] },
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

function Mission5() {
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
        <FavoriteButton track="darija" missionNum={5} />
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
              <div className="intro-icon"><ShoppingBag size={40} /></div>
              <h1 className="intro-title">{lang === "FR" ? "Souk & Négociation" : lang === "AR" ? "السوق والمساومة" : "Souk & Bargaining"}</h1>
              <p className="intro-desc">
                {lang === "FR" ? "Maîtrisez l'art de la négociation dans les souks marocains. Apprenez à demander les prix, négocier avec respect et obtenir les meilleures offres." :
                 lang === "AR" ? "أتقن فن المساومة في الأسواق المغربية. تعلم كيف تسأل عن الأسعار، تتفاوض باحترام وتحصل على أفضل العروض." :
                 "Master the art of negotiation in Moroccan souks. Learn to ask prices, bargain respectfully and get the best deals."}
              </p>
              <button className="mission-btn" onClick={handleNext}>
                {lang === "FR" ? "Commencer la mission" : lang === "AR" ? "ابدأ المهمة" : "Start Mission"}
              </button>
            </div>
          )}

          {step === "vocab" && (
            <div>
              <h2 className="step-title">{lang === "FR" ? "Vocabulaire du Souk" : lang === "AR" ? "مفردات السوق" : "Souk Vocabulary"}</h2>
              <p className="step-subtitle">{lang === "FR" ? "Les mots essentiels pour survivre au souk." : lang === "AR" ? "الكلمات الأساسية للتعامل في السوق." : "Essential words to survive the souk."}</p>
              <div className="vocab-grid">
                {vocabData.map((word, idx) => (
                  <div key={idx} className="vocab-card">
                    <AudioButton text={word.darija} ttsText={word.arabicText} overrideLang="AR" />
                    <div className="vocab-word" style={{display:"flex",alignItems:"center",gap:"8px"}}>
  <span>{word.darija}</span>
  <SaveVocabButton id={'darija_5_' + word.darija} word={word.darija} translation={word.en} track="darija" missionNum={5} />
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
              <h2 className="step-title">{lang === "FR" ? "Expressions de Négociation" : lang === "AR" ? "عبارات التفاوض" : "Bargaining Expressions"}</h2>
              <p className="step-subtitle">{lang === "FR" ? "Les phrases clés pour négocier comme un local." : lang === "AR" ? "العبارات الرئيسية للتفاوض كالمحليين." : "Key phrases to bargain like a local."}</p>
              <div className="expressions-list">
                {expressionsData.map((exp, idx) => (
                  <div key={idx} className="expression-card">
                    <AudioButton text={exp.darija} ttsText={exp.arabicText} overrideLang="AR" style={{position:'static', flexShrink:0}} />
                    <div className="expression-content">
                      <div className="exp-darija" style={{display:"flex",alignItems:"center",gap:"8px"}}>
  <span>{exp.darija}</span>
  <SaveVocabButton id={'darija_5_' + exp.darija} word={exp.darija} translation={exp.en || exp.fr} track="darija" missionNum={5} type="expression" />
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
              <h2 className="step-title">{lang === "FR" ? "Négociation en Pratique" : lang === "AR" ? "التفاوض عملياً" : "Bargaining in Practice"}</h2>
              <p className="step-subtitle">{lang === "FR" ? "Une négociation réaliste dans le souk." : lang === "AR" ? "مساومة واقعية في السوق." : "A realistic negotiation in the souk."}</p>
              <div className="chat-container">
                {conversationData.map((line, idx) => (
                  <div key={idx} className={`chat-bubble-wrapper ${line.isRight ? 'right' : 'left'}`}>
                    <div className="chat-speaker">
                      {line.speaker === "Traveler" ? (lang === "FR" ? "Vous" : lang === "AR" ? "أنت" : "You") : (lang === "FR" ? "Vendeur" : lang === "AR" ? "بائع" : "Seller")}
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
              <h2 className="step-title">{lang === "FR" ? "Défi du Souk" : lang === "AR" ? "تحدي السوق" : "Souk Challenge"}</h2>
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
                {lang === "FR" ? "Vous maîtrisez maintenant l'art de la négociation au souk marocain. Vous pouvez acheter avec confiance !" :
                 lang === "AR" ? "أنت تتقن الآن فن المساومة في السوق المغربي. يمكنك الشراء بثقة!" :
                 "You have mastered the art of bargaining in the Moroccan souk. You can shop with confidence!"}
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
                  <div className="completion-progress-current" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Lock size={20} />
                    <span style={{ fontWeight: 500 }}>{lang === "FR" ? "Prochaine Mission : Demander son Chemin" : lang === "AR" ? "المهمة القادمة: طلب الاتجاهات" : "Next Mission: Asking Directions"}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginTop: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button className="mission-btn" onClick={() => navigate("/languages/darija/mission-6")}>
                  {lang === "FR" ? "Continuer vers la Mission 6" : lang === "AR" ? "متابعة إلى المهمة 6" : "Continue to Mission 6"}
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

export default Mission5;
