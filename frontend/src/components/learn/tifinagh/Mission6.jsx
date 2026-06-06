import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X, ArrowRight, ArrowLeft, CheckCircle, Copy, Book, Type, Search, Shuffle, Sparkles, Trophy, FileText, PenLine, RefreshCw } from "lucide-react";
import { useLanguage } from "../../accueil/LanguageContext";
import { useAuth } from "../../../context/AuthContext";
import { AudioButton } from "../common/AudioButton";
import "../darija/mission.css";
import { useAutoProgress, canAccessMission } from "../../../utils/progress";
import LockedScreen from "../common/LockedScreen";
import FavoriteButton from "../common/FavoriteButton";
import SaveVocabButton from "../common/SaveVocabButton";

const tff = '"Noto Sans Tifinagh", "Segoe UI Symbol", "Arial Unicode MS", sans-serif';

const FULL_ALPHABET = [
  { symbol: "\u2D30", latin: "a", name: "Ya", pron: "a", example: "ⴰⵣⵓⵍ (Azul — Bonjour)", explanation: { en: "Like 'a' in 'father'. The first letter of the Tifinagh alphabet.", fr: "Comme le 'a' dans 'papa'. La première lettre de l'alphabet tifinagh.", ar: "مثل الألف في 'أب'. الحرف الأول من أبجدية تيفيناغ." } },
  { symbol: "\u2D31", latin: "b", name: "Yab", pron: "b", example: "ⴰⴱⴰⴱⴰ (Ababa — Père)", explanation: { en: "Like 'b' in 'book'. Common in family words.", fr: "Comme le 'b' dans 'bonjour'. Courant dans les mots familiaux.", ar: "مثل الباء في 'باب'. شائع في كلمات العائلة." } },
  { symbol: "\u2D33", latin: "g", name: "Yag", pron: "g", example: "ⴰⴳⵍⵉⴷ (Aglid — Roi)", explanation: { en: "Like 'g' in 'go'. A hard g sound.", fr: "Comme le 'g' dans 'gare'. Un son g dur.", ar: "مثل الجيم في 'جمل'. صوت جيم قوي." } },
  { symbol: "\u2D33\u2D2F", latin: "gw", name: "Yagw", pron: "gw", example: "ⵉⴳⵯⵣⵓⵍ (Igwzul — Court)", explanation: { en: "Labialized 'g' — a g with a w sound.", fr: "'g' labialisé — un g avec un son w.", ar: "الجيم المُشفَّعة — جيم مع صوت واو." } },
  { symbol: "\u2D37", latin: "d", name: "Yad", pron: "d", example: "ⴰⴷⴰⵔ (Adar — Pied)", explanation: { en: "Like 'd' in 'door'. One of the most frequent letters.", fr: "Comme le 'd' dans 'dos'. Une des lettres les plus fréquentes.", ar: "مثل الدال في 'دار'. من أكثر الحروف شيوعاً." } },
  { symbol: "\u2D39", latin: "d", name: "Yad", pron: "d (emphatic)", example: "ⴰⴹⵔⴰⵔ (Aḍrar — Montagne)", explanation: { en: "Emphatic 'd' — pronounced deeper in the throat.", fr: "'d' emphatique — prononcé plus profondément dans la gorge.", ar: "الدال المفخمة — تنطق من أعمق الحلق." } },
  { symbol: "\u2D3B", latin: "e", name: "Yey", pron: "e", example: "ⵢⴻⵎⵎⴰ (Yemma — Maman)", explanation: { en: "A short neutral vowel like 'e' in 'the'.", fr: "Voyelle neutre courte comme 'e' dans 'le'.", ar: "حركة قصيرة محايدة مثل الألف الممدودة." } },
  { symbol: "\u2D3C", latin: "f", name: "Yaf", pron: "f", example: "ⴰⴼⵓⵙ (Afus — Main)", explanation: { en: "Like 'f' in 'friend'. Appears in everyday words.", fr: "Comme le 'f' dans 'famille'. Apparaît dans les mots quotidiens.", ar: "مثل الفاء في 'فم'. يظهر في الكلمات اليومية." } },
  { symbol: "\u2D3D", latin: "k", name: "Yak", pron: "k", example: "ⴰⴽⴰⵍ (Akal — Terre)", explanation: { en: "Like 'k' in 'kite'. An unaspirated k.", fr: "Comme le 'k' dans 'kilo'. Un k non aspiré.", ar: "مثل الكاف في 'كتاب'. كاف غير منفخ." } },
  { symbol: "\u2D3D\u2D2F", latin: "kw", name: "Yakw", pron: "kw", example: "ⴰⴽⵯⴼⴰⵢ (Akway — Pain)", explanation: { en: "Labialized 'k' — k with a w sound.", fr: "'k' labialisé — k avec un son w.", ar: "الكاف المُشفَّعة — كاف مع صوت واو." } },
  { symbol: "\u2D40", latin: "h", name: "Yah", pron: "h", example: "ⴰⵀⴰ (Aha — Oui, d'accord)", explanation: { en: "Like 'h' in 'hello'. A light breath.", fr: "Comme le 'h' dans 'habiter'. Une légère expiration.", ar: "مثل الهاء في 'هو'. زفير خفيف." } },
  { symbol: "\u2D43", latin: "h", name: "Yah", pron: "h (fort)", example: "ⵃⵓⵔⵎⴰ (Hurma — Sainteté)", explanation: { en: "Strong 'h' from deep in the throat.", fr: "'h' fort provenant du fond de la gorge.", ar: "حاء مهموسة من عمق الحلق." } },
  { symbol: "\u2D44", latin: "e", name: "Yae", pron: "e (serré)", example: "ⴰⵄⵔⵔⵉⵎ (Aɛrrim — Jeune)", explanation: { en: "Like 'a' said with constricted throat. A Semitic sound.", fr: "Comme un 'a' prononcé avec la gorge serrée. Un son sémitique.", ar: "العين — صوت حلقي عميق." } },
  { symbol: "\u2D45", latin: "x", name: "Yax", pron: "kh", example: "ⵅⵓⴱⵣ (Khobz — Pain)", explanation: { en: "Like 'ch' in Scottish 'loch' or German 'Bach'.", fr: "Comme le 'j' espagnol ou 'ch' allemand.", ar: "الخاء — مثل صوت الخاء في 'خبز'." } },
  { symbol: "\u2D47", latin: "q", name: "Yaq", pron: "q", example: "ⴰⵇⵔⵔⴰⴱ (Aqerrab — Sac)", explanation: { en: "Deep 'k' pronounced from the back of the throat.", fr: "'k' profond prononcé depuis le fond de la gorge.", ar: "القاف — تنطق من أقصى الحلق." } },
  { symbol: "\u2D49", latin: "i", name: "Yi", pron: "i", example: "ⵉⵍⵍⵉ (Yilli — Ma fille)", explanation: { en: "Like 'ee' in 'see'. A long i sound.", fr: "Comme le 'i' dans 'si'. Un son i long.", ar: "مثل الياء في 'يد'. صوت ياء طويل." } },
  { symbol: "\u2D4A", latin: "j", name: "Yaj", pron: "j", example: "ⴰⵊⴷⵉⴷ (Ajdid — Nouveau)", explanation: { en: "Like 's' in 'measure' or French 'j' in 'jour'.", fr: "Comme le 'j' dans 'jour'.", ar: "مثل الجيم المصرية أو الفرنسية." } },
  { symbol: "\u2D4D", latin: "l", name: "Yal", pron: "l", example: "ⴰⵍⵍⵉ (Alli — Monte)", explanation: { en: "Like 'l' in 'love'. A clear l.", fr: "Comme le 'l' dans 'lune'. Un l clair.", ar: "مثل اللام في 'ليل'. لام واضحة." } },
  { symbol: "\u2D4E", latin: "m", name: "Yam", pron: "m", example: "ⴰⵎⴰⵏ (Aman — Eau)", explanation: { en: "Like 'm' in 'moon'. Found in many water-related words.", fr: "Comme le 'm' dans 'mer'. Présent dans beaucoup de mots liés à l'eau.", ar: "مثل الميم في 'ماء'. توجد في كلمات الماء." } },
  { symbol: "\u2D4F", latin: "n", name: "Yan", pron: "n", example: "ⴰⵏⵙⴰ (Ansa — Lieu)", explanation: { en: "Like 'n' in 'name'. A very common letter.", fr: "Comme le 'n' dans 'nom'. Une lettre très courante.", ar: "مثل النون في 'نور'. حرف شائع جداً." } },
  { symbol: "\u2D53", latin: "u", name: "Yu", pron: "ou", example: "ⵓⵔⵜⵉ (Urti — Jardin)", explanation: { en: "Like 'oo' in 'moon'. The u vowel.", fr: "Comme le 'ou' dans 'lune'. La voyelle u.", ar: "مثل الواو في 'وادي'. حرف علة واو." } },
  { symbol: "\u2D54", latin: "r", name: "Yar", pron: "r roulé", example: "ⴰⵔⴳ (Arg — Rêve)", explanation: { en: "Rolled 'r' like Spanish or Italian r.", fr: "'r' roulé comme en espagnol ou italien.", ar: "راء مكررة مثل الراء الإسبانية." } },
  { symbol: "\u2D55", latin: "r", name: "Yar", pron: "r (emphatique)", example: "ⴰⵕⵥⵉⵎ (Aṛẓim — Lionceau)", explanation: { en: "Emphatic rolled 'r' — deeper and stronger.", fr: "'r' roulé emphatique — plus profond et plus fort.", ar: "راء مفخمة — أعمق وأقوى." } },
  { symbol: "\u2D56", latin: "gh", name: "Yagh", pron: "r français", example: "ⴰⵖⴰⵔⴰⵙ (Aɣaras — Route)", explanation: { en: "Like French 'r' in 'Paris'. A guttural sound.", fr: "Comme le 'r' français dans 'Paris'. Un son guttural.", ar: "الغين — مثل الغين العربية." } },
  { symbol: "\u2D59", latin: "s", name: "Yas", pron: "s", example: "ⴰⵙⵙ (Ass — Jour)", explanation: { en: "Like 's' in 'sun'. A sharp s.", fr: "Comme le 's' dans 'soleil'. Un s aigu.", ar: "مثل السين في 'شمس'. سين حادة." } },
  { symbol: "\u2D5A", latin: "s", name: "Yas", pron: "s (emphatique)", example: "ⴰⵚⴰⴱⵓⵏ (Aṣabun — Savon)", explanation: { en: "Emphatic 's' — pronounced with the tongue retracted.", fr: "'s' emphatique — prononcé avec la langue en arrière.", ar: "الصاد — تنطح بلسان مرتد للخلف." } },
  { symbol: "\u2D5B", latin: "c", name: "Yac", pron: "ch", example: "ⴰⵛⵏⵢⴰⵍ (Acnyal — Drapeau)", explanation: { en: "Like 'sh' in 'ship'. Written 'c' in Tifinagh.", fr: "Comme 'ch' dans 'chat'. Écrit 'c' en tifinagh.", ar: "مثل الشين في 'شمس'. تكتب 'c' في تيفيناغ." } },
  { symbol: "\u2D5C", latin: "t", name: "Yat", pron: "t", example: "ⵜⴰⴼⵓⴽⵜ (Tafukt — Soleil)", explanation: { en: "Like 't' in 'time'. One of the most common Tifinagh letters.", fr: "Comme le 't' dans 'temps'. Une des lettres tifinagh les plus courantes.", ar: "مثل التاء في 'بيت'. من أشهر حروف تيفيناغ." } },
  { symbol: "\u2D5F", latin: "t", name: "Yat", pron: "t (emphatique)", example: "ⴰⵟⵟⴰⵔ (Aṭṭar — Poussière)", explanation: { en: "Emphatic 't' — a thicker, deeper t.", fr: "'t' emphatique — un t plus épais et plus profond.", ar: "الطاء — تاء مفخمة أكثر سمكاً." } },
  { symbol: "\u2D61", latin: "w", name: "Yaw", pron: "w", example: "ⴰⵡⵜⴰⵢ (Awtay — Chemin)", explanation: { en: "Like 'w' in 'water'. A semivowel.", fr: "Comme le 'w' dans 'ouate'. Une semi-voyelle.", ar: "مثل الواو في 'وطن'. شبه حركة." } },
  { symbol: "\u2D62", latin: "y", name: "Yay", pron: "y", example: "ⵢⴰⵏ (Yan — Un)", explanation: { en: "Like 'y' in 'yes'. Used for the number one.", fr: "Comme le 'y' dans 'yaourt'. Utilisé pour le nombre un.", ar: "مثل الياء في 'يد'. تستخدم للرقم واحد." } },
  { symbol: "\u2D63", latin: "z", name: "Yaz", pron: "z", example: "ⴰⵣⵓⵍ (Azul — Bonjour)", explanation: { en: "Like 'z' in 'zebra'. The iconic Amazigh symbol.", fr: "Comme le 'z' dans 'zèbre'. Le symbole iconique amazigh.", ar: "مثل الزاي في 'زهرة'. الرمز الأمازيغي الأيقوني." } },
  { symbol: "\u2D65", latin: "z", name: "Yaz", pron: "z (emphatique)", example: "ⵥⵓⵕ (Ẓuṛ — Visite)", explanation: { en: "Emphatic 'z' — a heavier, deeper z.", fr: "'z' emphatique — un z plus lourd et profond.", ar: "الظاء — زاي مفخمة أثقل." } }
];

const TIFINAGH_WORDS = [
  { latin: "azul", tifinagh: "ⴰⵣⵓⵍ", meaning: { en: "Hello", fr: "Bonjour", ar: "مرحبا" } },
  { latin: "aman", tifinagh: "ⴰⵎⴰⵏ", meaning: { en: "Water", fr: "Eau", ar: "ماء" } },
  { latin: "tafukt", tifinagh: "ⵜⴰⴼⵓⴽⵜ", meaning: { en: "Sun", fr: "Soleil", ar: "شمس" } },
  { latin: "agharas", tifinagh: "ⴰⵖⴰⵔⴰⵙ", meaning: { en: "Road", fr: "Route", ar: "طريق" } },
  { latin: "ilem", tifinagh: "ⵉⵍⴻⵎ", meaning: { en: "Name", fr: "Nom", ar: "اسم" } },
  { latin: "tamazight", tifinagh: "ⵜⴰⵎⴰⵣⵉⵖⵜ", meaning: { en: "Amazigh language", fr: "Langue amazighe", ar: "اللغة الأمازيغية" } },
  { latin: "tamurt", tifinagh: "ⵜⴰⵎⵓⵔⵜ", meaning: { en: "Country", fr: "Pays", ar: "بلد" } },
  { latin: "afus", tifinagh: "ⴰⴼⵓⵙ", meaning: { en: "Hand", fr: "Main", ar: "يد" } },
  { latin: "yemma", tifinagh: "ⵢⴻⵎⵎⴰ", meaning: { en: "Mother", fr: "Maman", ar: "أمي" } },
  { latin: "baba", tifinagh: "ⴱⴰⴱⴰ", meaning: { en: "Father", fr: "Papa", ar: "أبي" } }
];

const LATIN_TO_TIFINAGH = {
  a: "\u2D30", b: "\u2D31", c: "\u2D5B", d: "\u2D37", e: "\u2D3B",
  f: "\u2D3C", g: "\u2D33", h: "\u2D40", i: "\u2D49", j: "\u2D4A",
  k: "\u2D3D", l: "\u2D4D", m: "\u2D4E", n: "\u2D4F", o: "\u2D53",
  p: "\u2D31", q: "\u2D47", r: "\u2D54", s: "\u2D59", t: "\u2D5C",
  u: "\u2D53", v: "\u2D3C", w: "\u2D61", x: "\u2D45", y: "\u2D62",
  z: "\u2D63"
};

const DIGRAPH_MAP = {
  sh: "\u2D5B", ch: "\u2D5B", gh: "\u2D56", kh: "\u2D45",
  th: "\u2D5C", dh: "\u2D39", ou: "\u2D53"
};

function transliterate(text) {
  let result = "";
  let lower = text.toLowerCase();
  let i = 0;
  while (i < lower.length) {
    if (i < lower.length - 1) {
      const digraph = lower.substring(i, i + 2);
      if (DIGRAPH_MAP[digraph]) {
        result += DIGRAPH_MAP[digraph];
        i += 2;
        continue;
      }
    }
    const char = lower[i];
    result += LATIN_TO_TIFINAGH[char] || char;
    i++;
  }
  return result;
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandom(arr, count) {
  return shuffleArray(arr).slice(0, count);
}

function generateQuizQuestions() {
  const questions = [];
  const alphabetPool = FULL_ALPHABET.filter(a => a.symbol.length === 2);
  const types = ["typeA", "typeB", "typeD"];
  const selected = pickRandom(alphabetPool, 10);

  for (const item of selected) {
    const type = types[Math.floor(Math.random() * types.length)];
    const wrongPool = FULL_ALPHABET.filter(a => a.symbol !== item.symbol);
    const wrongItems = pickRandom(wrongPool, 3);

    switch (type) {
      case "typeA": {
        const options = shuffleArray([item.pron, ...wrongItems.map(w => w.pron)]).slice(0, 4);
        if (options.length < 4) continue;
        questions.push({
          type: "A",
          prompt: "What is the pronunciation of",
          symbol: item.symbol,
          options,
          answer: item.pron
        });
        break;
      }
      case "typeB": {
        const options = shuffleArray([item.symbol, ...wrongItems.map(w => w.symbol)]).slice(0, 4);
        if (options.length < 4) continue;
        questions.push({
          type: "B",
          prompt: "Which symbol represents",
          pronunciation: item.pron.split(" ")[0],
          options,
          answer: item.symbol
        });
        break;
      }
      case "typeD": {
        const options = shuffleArray([item.pron, ...wrongItems.map(w => w.pron)]).slice(0, 4);
        if (options.length < 4) continue;
        questions.push({
          type: "D",
          prompt: "Identify the symbol",
          symbol: item.symbol,
          options,
          answer: item.pron
        });
        break;
      }
      default:
        break;
    }

  }

  const typeCWords = pickRandom(TIFINAGH_WORDS, 3);
  for (const word of typeCWords) {
    const wrongWords = TIFINAGH_WORDS.filter(w => w.tifinagh !== word.tifinagh);
    const options = shuffleArray([word.tifinagh, ...pickRandom(wrongWords, 3).map(w => w.tifinagh)]).slice(0, 4);
    if (options.length < 4) continue;
    questions.push({
      type: "C",
      prompt: "Select the correct Tifinagh spelling of",
      word: word.latin.toUpperCase(),
      options,
      answer: word.tifinagh
    });
  }

  return shuffleArray(questions).slice(0, 12);
}

function generateAssessmentQuestions() {
  const questions = [];
  const alphabetPool = FULL_ALPHABET.filter(a => a.symbol.length === 2);
  const types = ["typeA", "typeB", "typeD", "typeA", "typeB", "typeD"];
  const selected = pickRandom(alphabetPool, 8);

  for (const item of selected) {
    const type = types[Math.floor(Math.random() * types.length)];
    const wrongPool = FULL_ALPHABET.filter(a => a.symbol !== item.symbol);
    const wrongItems = pickRandom(wrongPool, 3);

    switch (type) {
      case "typeA": {
        const options = shuffleArray([item.pron, ...wrongItems.map(w => w.pron)]).slice(0, 4);
        if (options.length < 4) continue;
        questions.push({
          type: "A",
          prompt: "What is the pronunciation of",
          symbol: item.symbol,
          options,
          answer: item.pron
        });
        break;
      }
      case "typeB": {
        const options = shuffleArray([item.symbol, ...wrongItems.map(w => w.symbol)]).slice(0, 4);
        if (options.length < 4) continue;
        questions.push({
          type: "B",
          prompt: "Which symbol represents",
          pronunciation: item.pron.split(" ")[0],
          options,
          answer: item.symbol
        });
        break;
      }
      case "typeD": {
        const options = shuffleArray([item.pron, ...wrongItems.map(w => w.pron)]).slice(0, 4);
        if (options.length < 4) continue;
        questions.push({
          type: "D",
          prompt: "Identify the symbol",
          symbol: item.symbol,
          options,
          answer: item.pron
        });
        break;
      }
      default:
        break;
    }

  }

  const typeCWords = pickRandom(TIFINAGH_WORDS, 2);
  for (const word of typeCWords) {
    const wrongWords = TIFINAGH_WORDS.filter(w => w.tifinagh !== word.tifinagh);
    const options = shuffleArray([word.tifinagh, ...pickRandom(wrongWords, 3).map(w => w.tifinagh)]).slice(0, 4);
    if (options.length < 4) continue;
    questions.push({
      type: "C",
      prompt: "Select the correct Tifinagh spelling of",
      word: word.latin.toUpperCase(),
      options,
      answer: word.tifinagh
    });
  }

  return shuffleArray(questions).slice(0, 10);
}

const STEPS = ["intro", "alphabet", "discovery", "nametrans", "converter", "quiz", "assessment", "completion"];

const STEP_LABELS = {
  intro: { en: "Introduction", fr: "Introduction", ar: "مقدمة" },
  alphabet: { en: "Complete Alphabet", fr: "Alphabet Complet", ar: "الأبجدية الكاملة" },
  discovery: { en: "Interactive Discovery", fr: "Découverte Interactive", ar: "اكتشاف تفاعلي" },
  nametrans: { en: "Write Your Name", fr: "Écrivez Votre Nom", ar: "اكتب اسمك" },
  converter: { en: "Word Converter", fr: "Convertisseur de Mots", ar: "محول الكلمات" },
  quiz: { en: "Alphabet Challenge", fr: "Défi de l'Alphabet", ar: "تحدي الأبجدية" },
  assessment: { en: "Final Assessment", fr: "Évaluation Finale", ar: "التقييم النهائي" },
  completion: { en: "Completion", fr: "Achèvement", ar: "اكتمال" }
};

const TIFINAGH_MISSIONS = [
  { fr: "Mission 1 : Découvrir les Symboles", ar: "المهمة 1: اكتشاف الرموز", en: "Mission 1: Discover Symbols" },
  { fr: "Mission 2 : Écrire Votre Premier Mot", ar: "المهمة 2: كتابة كلمتك الأولى", en: "Mission 2: Write Your First Word" },
  { fr: "Mission 3 : Lire les Panneaux", ar: "المهمة 3: قراءة اللافتات", en: "Mission 3: Reading Common Signs" },
  { fr: "Mission 4 : Mots du Quotidien", ar: "المهمة 4: كلمات يومية", en: "Mission 4: Everyday Words" },
  { fr: "Mission 5 : Culture & Symboles", ar: "المهمة 5: الثقافة والرموز", en: "Mission 5: Culture & Symbols" },
  { fr: "Mission 6 : Alphabet Complet", ar: "المهمة 6: الأبجدية الكاملة", en: "Mission 6: Complete Alphabet" }
];

function Mission6() {
  const { lang, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [nameInput, setNameInput] = useState("");
  const [converterInput, setConverterInput] = useState("");
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [assessmentQuestions, setAssessmentQuestions] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizSelected, setQuizSelected] = useState(null);
  const [quizFeedback, setQuizFeedback] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [assessmentIndex, setAssessmentIndex] = useState(0);
  const [assessmentSelected, setAssessmentSelected] = useState(null);
  const [assessmentFeedback, setAssessmentFeedback] = useState(null);
  const [assessmentScore, setAssessmentScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const [alphabetSearch, setAlphabetSearch] = useState("");

  useEffect(() => { window.scrollTo(0, 0); }, [currentStepIndex]);

  const step = STEPS[currentStepIndex];
  useAutoProgress(step);
  const progressPercent = (currentStepIndex / (STEPS.length - 1)) * 100;

  const handleNext = () => { if (currentStepIndex < STEPS.length - 1) setCurrentStepIndex(prev => prev + 1); };
  const handleBack = () => { if (currentStepIndex > 0) setCurrentStepIndex(prev => prev - 1); };

  const getLangProp = useCallback((item, prop) => {
    if (typeof item[prop] === 'object') return item[prop][lang.toLowerCase()] || item[prop].en;
    return item[prop] || item[lang.toLowerCase()] || item.en || "";
  }, [lang]);

  const getStepLabel = useCallback((stepKey) => {
    const labels = STEP_LABELS[stepKey];
    if (!labels) return stepKey;
    return labels[lang.toLowerCase()] || labels.en;
  }, [lang]);

  const filteredAlphabet = useMemo(() => {
    if (!alphabetSearch) return FULL_ALPHABET;
    const q = alphabetSearch.toLowerCase();
    return FULL_ALPHABET.filter(a =>
      a.latin.toLowerCase().includes(q) ||
      a.pron.toLowerCase().includes(q) ||
      a.name.toLowerCase().includes(q) ||
      a.symbol.includes(q)
    );
  }, [alphabetSearch]);

  const startQuiz = useCallback(() => {
    setQuizQuestions(generateQuizQuestions());
    setQuizIndex(0);
    setQuizSelected(null);
    setQuizFeedback(null);
    setQuizScore(0);
    setQuizComplete(false);
  }, []);

  const startAssessment = useCallback(() => {
    setAssessmentQuestions(generateAssessmentQuestions());
    setAssessmentIndex(0);
    setAssessmentSelected(null);
    setAssessmentFeedback(null);
    setAssessmentScore(0);
    setAssessmentComplete(false);
  }, []);

  const handleQuizAnswer = (opt) => {
    if (quizSelected !== null) return;
    setQuizSelected(opt);
    const correct = opt === quizQuestions[quizIndex]?.answer;
    setQuizFeedback(correct ? "correct" : "wrong");
    if (correct) setQuizScore(prev => prev + 1);
  };

  const handleQuizNext = () => {
    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex(prev => prev + 1);
      setQuizSelected(null);
      setQuizFeedback(null);
    } else {
      setQuizComplete(true);
    }
  };

  const handleAssessmentAnswer = (opt) => {
    if (assessmentSelected !== null) return;
    setAssessmentSelected(opt);
    const correct = opt === assessmentQuestions[assessmentIndex]?.answer;
    setAssessmentFeedback(correct ? "correct" : "wrong");
    if (correct) setAssessmentScore(prev => prev + 1);
  };

  const handleAssessmentNext = () => {
    if (assessmentIndex < assessmentQuestions.length - 1) {
      setAssessmentIndex(prev => prev + 1);
      setAssessmentSelected(null);
      setAssessmentFeedback(null);
    } else {
      setAssessmentComplete(true);
    }
  };

  const handleRestartQuiz = () => {
    startQuiz();
  };

  const handleRestartAssessment = () => {
    startAssessment();
  };

  const pathMatch = window.location.pathname.match(/\/languages\/(\w+)\/mission-(\d+)/);
  const currentTrack = pathMatch?.[1];
  const currentMissionNum = pathMatch?.[2] ? parseInt(pathMatch[2]) : 0;
  if (currentTrack && currentMissionNum && !canAccessMission(currentTrack, currentMissionNum, user)) {
    return <LockedScreen track={currentTrack} />;
  }

  const renderQuizQuestion = (q, idx, total, selected, feedback, onAnswer, onNext, isComplete, restartFn, score, onContinue) => {
    if (isComplete) {
      return (
        <div className="completion-step" style={{ padding: "40px 20px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: "80px", height: "80px", borderRadius: "50%",
              background: score >= Math.floor(total * 0.7) ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 16px",
              border: `2px solid ${score >= Math.floor(total * 0.7) ? "var(--learn-success)" : "var(--learn-warning)"}`
            }}>
              <Trophy size={36} color={score >= Math.floor(total * 0.7) ? "var(--learn-success)" : "var(--learn-warning)"} />
            </div>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--learn-text)" }}>
              {score >= Math.floor(total * 0.7)
                ? (lang === "FR" ? "Excellent Résultat !" : lang === "AR" ? "نتيجة ممتازة!" : "Great Result!")
                : (lang === "FR" ? "Continuez à Pratiquer !" : lang === "AR" ? "واصل التدريب!" : "Keep Practicing!")}
            </h2>
            <p style={{ fontSize: "1.2rem", color: "var(--learn-text-secondary)", margin: "12px 0 24px" }}>
              {lang === "FR" ? `Score : ${score}/${total}` : lang === "AR" ? `النتيجة: ${score}/${total}` : `Score: ${score}/${total}`}
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <button className="mission-btn secondary" onClick={restartFn}>
                <RefreshCw size={18} />
                <span style={{ marginLeft: "8px" }}>
                  {lang === "FR" ? "Recommencer" : lang === "AR" ? "إعادة المحاولة" : "Try Again"}
                </span>
              </button>
              {onContinue && (
                <button className="mission-btn" onClick={onContinue}>
                  {lang === "FR" ? "Continuer" : lang === "AR" ? "متابعة" : "Continue"} <ArrowRight size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }

    const qTotal = idx + 1;
    const isCorrect = feedback === "correct";

    return (
      <div>
        <p style={{ fontSize: "0.9rem", color: "var(--learn-text-secondary)", marginBottom: "4px", fontWeight: 500 }}>
          {lang === "FR" ? `Question ${qTotal} / ${total}` : lang === "AR" ? `السؤال ${qTotal} / ${total}` : `Question ${qTotal} / ${total}`}
        </p>
        <div className="quiz-question" style={{ fontSize: "1.15rem", marginBottom: "20px", whiteSpace: q.type === "C" ? "normal" : undefined }}>
          {q.type === "A" && <span>{q.prompt} <span style={{ fontSize: "3rem", fontFamily: tff, display: "inline-block", verticalAlign: "middle" }}>{q.symbol}</span> ?</span>}
          {q.type === "B" && <span>{q.prompt} <strong style={{ color: "var(--learn-primary)", fontSize: "1.3rem" }}>{q.pronunciation}</strong> ?</span>}
          {q.type === "C" && <span>{q.prompt} <strong style={{ color: "var(--learn-primary)", fontSize: "1.3rem" }}>{q.word}</strong> ?</span>}
          {q.type === "D" && <span>{q.prompt} <span style={{ fontSize: "3rem", fontFamily: tff, display: "inline-block", verticalAlign: "middle" }}>{q.symbol}</span> ?</span>}
        </div>
        <div className="quiz-options">
          {q.options.map((opt, oi) => {
            let cls = "quiz-option";
            if (selected !== null) {
              if (opt === q.answer) cls += " correct";
              else if (opt === selected && !isCorrect) cls += " wrong";
            }
            return (
              <button key={oi} className={cls} onClick={() => onAnswer(opt)} disabled={selected !== null}
                style={q.type === "B" || q.type === "C" ? { fontFamily: tff, fontSize: "1.8rem", minHeight: "60px" } : undefined}>
                {opt}
              </button>
            );
          })}
        </div>
        <div className={`quiz-feedback ${feedback ? (isCorrect ? "correct-text" : "wrong-text") : ""}`}>
          {feedback === "correct" && <span>{lang === "FR" ? "Correct !" : lang === "AR" ? "صحيح!" : "Correct!"}</span>}
          {feedback === "wrong" && <span>{lang === "FR" ? "Incorrect. La bonne réponse était : " : lang === "AR" ? "إجابة خاطئة. الإجابة الصحيحة: " : "Incorrect. The correct answer was: "}<strong>{q.answer}</strong></span>}
        </div>
        {selected !== null && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <button className="mission-btn" onClick={onNext}>
              {qTotal >= total
                ? (lang === "FR" ? "Voir le Résultat" : lang === "AR" ? "عرض النتيجة" : "See Result")
                : (lang === "FR" ? "Question Suivante" : lang === "AR" ? "السؤال التالي" : "Next Question")}
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`mission-container tifinagh-theme ${isRTL ? "rtl" : "ltr"}`}>
      <div className="mission-header">
        <button className="mission-close" onClick={() => navigate("/languages")}><X size={24} /></button>
        <FavoriteButton track="tifinagh" missionNum={6} />
        <div className="mission-progress-bar"><div className="mission-progress-fill" style={{ width: `${progressPercent}%` }}></div></div>
      </div>

      <div className="step-indicator">
        <span className="step-indicator-number">{lang === "FR" ? "Étape" : lang === "AR" ? "خطوة" : "Step"} {currentStepIndex + 1}/{STEPS.length}</span>
        <span className="step-indicator-name">{getStepLabel(step)}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="mission-content">

          {/* STEP 0: INTRO */}
          {step === "intro" && (
            <div className="intro-step">
              <div className="intro-icon"><Book size={40} /></div>
              <h1 className="intro-title">
                {lang === "FR" ? "Alphabet Complet Tifinagh" : lang === "AR" ? "أبجدية تيفيناغ الكاملة" : "Complete Tifinagh Alphabet"}
              </h1>
              <p className="intro-desc">
                {lang === "FR"
                  ? "Découvrez l'alphabet tifinagh complet — 33 lettres qui forment le système d'écriture de la langue amazighe. Chaque lettre raconte une histoire et vous ouvre les portes de la riche culture nord-africaine. Apprenez à reconnaître, prononcer et écrire chaque symbole."
                  : lang === "AR"
                  ? "اكتشف أبجدية تيفيناغ الكاملة — 33 حرفاً تشكل نظام كتابة اللغة الأمازيغية. كل حرف يروي قصة ويفتح لك أبواب الثقافة الغنية لشمال إفريقيا. تعلم التعرف على كل رمز ونطقه وكتابته."
                  : "Discover the complete Tifinagh alphabet — 33 letters that form the writing system of the Amazigh language. Each letter tells a story and opens doors to the rich North African culture. Learn to recognize, pronounce, and write every symbol."}
              </p>
              <div style={{
                background: "linear-gradient(135deg, rgba(3,105,161,0.1) 0%, rgba(3,105,161,0) 100%)",
                border: "1px solid rgba(3,105,161,0.2)", borderRadius: "16px", padding: "20px 24px",
                marginBottom: "28px", maxWidth: "500px", margin: "0 auto 28px"
              }}>
                <div style={{ fontSize: "3rem", textAlign: "center", fontFamily: tff, marginBottom: "8px", color: "var(--learn-primary)" }}>
                  {FULL_ALPHABET.slice(0, 10).map(a => a.symbol).join(" ")}
                </div>
                <p style={{ fontSize: "0.9rem", color: "var(--learn-text-secondary)", textAlign: "center" }}>
                  {lang === "FR" ? "Les 33 lettres de l'alphabet tifinagh" : lang === "AR" ? "الحروف الـ 33 لأبجدية تيفيناغ" : "The 33 letters of the Tifinagh alphabet"}
                </p>
              </div>
              <button className="mission-btn" onClick={handleNext}>
                {lang === "FR" ? "Commencer la mission" : lang === "AR" ? "ابدأ المهمة" : "Start Mission"}
              </button>
            </div>
          )}

          {/* STEP 1: COMPLETE ALPHABET */}
          {step === "alphabet" && (
            <div>
              <h2 className="step-title">{lang === "FR" ? "Explorez l'Alphabet Complet" : lang === "AR" ? "استكشف الأبجدية الكاملة" : "Explore the Complete Alphabet"}</h2>
              <p className="step-subtitle">
                {lang === "FR" ? "Cliquez sur chaque lettre pour voir sa prononciation et sa signification." : lang === "AR" ? "انقر على كل حرف لرؤية نطقه ومعناه." : "Click each letter to see its pronunciation and meaning."}
              </p>

              <div style={{ position: "relative", marginBottom: "24px" }}>
                <Search size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--learn-text-secondary)", pointerEvents: "none" }} />
                <input
                  type="text"
                  value={alphabetSearch}
                  onChange={e => { setAlphabetSearch(e.target.value); setSelectedSymbol(null); }}
                  placeholder={lang === "FR" ? "Rechercher une lettre..." : lang === "AR" ? "ابحث عن حرف..." : "Search for a letter..."}
                  style={{
                    width: "100%", padding: "14px 14px 14px 44px", borderRadius: "12px",
                    border: "1px solid var(--learn-border)", background: "var(--learn-surface)",
                    color: "var(--learn-text)", fontSize: "1rem", outline: "none",
                    fontFamily: "inherit"
                  }}
                />
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
                gap: "12px"
              }}>
                {filteredAlphabet.map((item, idx) => (
                  <motion.button
                    key={item.symbol + item.latin}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: idx * 0.02 }}
                    className={`vocab-card tifinagh-card-override ${selectedSymbol === item.symbol ? "selected" : ""}`}
                    onClick={() => setSelectedSymbol(selectedSymbol === item.symbol ? null : item.symbol)}
                    style={{
                      padding: "14px 8px", border: selectedSymbol === item.symbol ? "2px solid var(--learn-primary)" : "2px solid transparent",
                      cursor: "pointer", background: selectedSymbol === item.symbol ? "rgba(3,105,161,0.08)" : "var(--learn-surface)",
                      textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <span style={{ fontSize: "2.2rem", fontFamily: tff, color: "var(--learn-primary)", lineHeight: 1 }}>{item.symbol}</span>
                    <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--learn-text)" }}>{item.latin}</span>
                    <span style={{ fontSize: "0.7rem", color: "var(--learn-text-secondary)" }}>{item.pron}</span>
                  </motion.button>
                ))}
              </div>

              {filteredAlphabet.length === 0 && (
                <p style={{ textAlign: "center", color: "var(--learn-text-secondary)", padding: "40px" }}>
                  {lang === "FR" ? "Aucune lettre trouvée." : lang === "AR" ? "لم يتم العثور على حرف." : "No letters found."}
                </p>
              )}

              <AnimatePresence>
                {selectedSymbol !== null && (() => {
                  const selectedItem = FULL_ALPHABET.find(a => a.symbol === selectedSymbol);
                  if (!selectedItem) return null;
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="vocab-card tifinagh-card-override"
                      style={{ marginTop: "20px", padding: "24px" }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "16px" }}>
                        <div style={{ fontSize: "4rem", fontFamily: tff, color: "var(--learn-primary)", lineHeight: 1, textShadow: "0 4px 12px rgba(3,105,161,0.3)" }}>
                          {selectedItem.symbol}
                        </div>
                        <div>
                          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--learn-text)" }}>{selectedItem.name}</div>
                          <div style={{ fontSize: "1rem", color: "var(--learn-primary)", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px" }}>
                            {selectedItem.latin} — {selectedItem.pron}
                            <AudioButton text={selectedItem.pron} ttsText={selectedItem.pron} overrideLang="FR" />
                          </div>
                        </div>
                      </div>
                      <div style={{ color: "var(--learn-text-secondary)", lineHeight: "1.6", fontSize: "0.95rem" }}>
                        {getLangProp(selectedItem, "explanation")}
                      </div>
                      <div style={{ marginTop: "12px", padding: "12px 16px", background: "rgba(3,105,161,0.05)", borderRadius: "10px", borderLeft: "3px solid var(--learn-primary)" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <span style={{ fontWeight: 600, color: "var(--learn-primary)", fontSize: "0.9rem" }}>
                            {lang === "FR" ? "Exemple" : lang === "AR" ? "مثال" : "Example"}:
                          </span>
                          <SaveVocabButton id={'tifinagh_6_a_' + selectedItem.symbol} word={selectedItem.example} track="tifinagh" missionNum={6} type="vocab" />
                        </div>
                        <span style={{ marginLeft: "8px", fontFamily: tff, fontSize: "1.2rem" }}> {selectedItem.example}</span>
                      </div>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>
            </div>
          )}

          {/* STEP 2: INTERACTIVE LETTER DISCOVERY */}
          {step === "discovery" && (
            <div>
              <h2 className="step-title">{lang === "FR" ? "Découverte Interactive" : lang === "AR" ? "اكتشاف تفاعلي" : "Interactive Letter Discovery"}</h2>
              <p className="step-subtitle">
                {lang === "FR" ? "Sélectionnez un symbole pour explorer sa prononciation et un exemple." : lang === "AR" ? "اختر رمزاً لاستكشاف نطقه ومثال عليه." : "Select a symbol to explore its pronunciation and an example."}
              </p>

              <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "24px", flexWrap: "wrap" }}>
                {FULL_ALPHABET.filter(a => a.symbol.length === 1).slice(0, 16).map((item, idx) => (
                  <button
                    key={item.symbol}
                    className={`vocab-card tifinagh-card-override ${selectedSymbol === item.symbol ? "selected" : ""}`}
                    style={{
                      width: "64px", height: "64px", display: "flex", justifyContent: "center", alignItems: "center",
                      padding: "0", border: selectedSymbol === item.symbol ? "2px solid var(--learn-primary)" : "2px solid transparent",
                      cursor: "pointer", background: selectedSymbol === item.symbol ? "rgba(3,105,161,0.08)" : "transparent",
                      borderRadius: "12px"
                    }}
                    onClick={() => setSelectedSymbol(selectedSymbol === item.symbol ? null : item.symbol)}
                  >
                    <span style={{ fontSize: "2rem", fontFamily: tff, color: selectedSymbol === item.symbol ? "var(--learn-primary)" : "var(--learn-text-secondary)" }}>{item.symbol}</span>
                  </button>
                ))}
              </div>

              {selectedSymbol !== null && (() => {
                const item = FULL_ALPHABET.find(a => a.symbol === selectedSymbol);
                if (!item) return null;
                return (
                  <motion.div
                    key={selectedSymbol}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="vocab-card tifinagh-card-override"
                    style={{ padding: "28px", textAlign: "center", maxWidth: "450px", margin: "0 auto" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "16px" }}>
                      <div style={{ fontSize: "5rem", fontFamily: tff, color: "var(--learn-primary)", textShadow: "0 4px 12px rgba(3,105,161,0.3)" }}>
                        {item.symbol}
                      </div>
                      <AudioButton text={item.pron} ttsText={item.pron} overrideLang="FR" />
                    </div>
                    <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--learn-text)", marginBottom: "4px" }}>
                      {lang === "FR" ? "Prononciation" : lang === "AR" ? "النطق" : "Pronunciation"}:
                    </div>
                    <div style={{ fontSize: "1.8rem", color: "var(--learn-primary)", fontWeight: 600, marginBottom: "16px" }}>
                      {item.pron.toUpperCase()}
                    </div>
                    <div style={{ padding: "16px", background: "rgba(3,105,161,0.05)", borderRadius: "12px", border: "1px solid rgba(3,105,161,0.15)" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontWeight: 600, color: "var(--learn-primary)", fontSize: "0.9rem" }}>
                          {lang === "FR" ? "Exemple" : lang === "AR" ? "مثال" : "Example"}:
                        </span>
                        <SaveVocabButton id={'tifinagh_6_ex_' + item.symbol} word={item.example} track="tifinagh" missionNum={6} type="vocab" />
                      </div>
                      <div style={{ fontSize: "2rem", fontFamily: tff, marginTop: "8px", color: "var(--learn-text)" }}>{item.example}</div>
                    </div>
                  </motion.div>
                );
              })()}

              {selectedSymbol === null && (
                <div style={{ textAlign: "center", padding: "32px", color: "var(--learn-text-secondary)" }}>
                  <Type size={40} style={{ opacity: 0.4, marginBottom: "12px" }} />
                  <p>{lang === "FR" ? "Cliquez sur un symbole ci-dessus pour voir les détails." : lang === "AR" ? "انقر على رمز أعلاه لرؤية التفاصيل." : "Click a symbol above to see details."}</p>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: WRITE YOUR NAME */}
          {step === "nametrans" && (
            <div>
              <h2 className="step-title">{lang === "FR" ? "Écrivez Votre Nom en Tifinagh" : lang === "AR" ? "اكتب اسمك بتيفيناغ" : "Write Your Name in Tifinagh"}</h2>
              <p className="step-subtitle">
                {lang === "FR" ? "Convertissez des lettres latines en caractères tifinagh. Ceci est une translittération, pas une traduction." : lang === "AR" ? "حول الحروف اللاتينية إلى أحرف تيفيناغ. هذا تحويل صوتي وليس ترجمة." : "Convert Latin letters into Tifinagh characters. This is transliteration, not translation."}
              </p>

              <div className="vocab-card tifinagh-card-override" style={{ padding: "28px", maxWidth: "500px", margin: "0 auto" }}>
                <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 600, color: "var(--learn-text-secondary)", marginBottom: "8px" }}>
                  {lang === "FR" ? "Entrez votre nom" : lang === "AR" ? "أدخل اسمك" : "Enter your name"}
                </label>
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <input
                    type="text"
                    value={nameInput}
                    onChange={e => setNameInput(e.target.value)}
                    placeholder={lang === "FR" ? "Ex: Yassin" : lang === "AR" ? "مثال: ياسين" : "Ex: Yassin"}
                    style={{
                      flex: 1, padding: "14px 16px", borderRadius: "12px",
                      border: "1px solid var(--learn-border)", background: "var(--learn-surface)",
                      color: "var(--learn-text)", fontSize: "1.1rem", outline: "none",
                      fontFamily: "inherit"
                    }}
                  />
                  <button className="mission-btn secondary" onClick={() => setNameInput("")} style={{ padding: "14px 16px" }}>
                    <RefreshCw size={18} />
                  </button>
                </div>

                <div style={{ marginTop: "24px" }}>
                  <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 600, color: "var(--learn-text-secondary)", marginBottom: "8px" }}>
                    {lang === "FR" ? "Résultat en Tifinagh" : lang === "AR" ? "النتيجة بتيفيناغ" : "Result in Tifinagh"}
                  </label>
                  <div style={{
                    padding: "20px", borderRadius: "12px", background: "rgba(3,105,161,0.05)",
                    border: "2px solid var(--learn-primary)", minHeight: "60px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "2.5rem", fontFamily: tff, color: "var(--learn-primary)",
                    wordBreak: "break-all", lineHeight: 1.4
                  }}>
                    {nameInput ? transliterate(nameInput) : (
                      <span style={{ fontSize: "1rem", color: "var(--learn-text-secondary)", fontFamily: "inherit" }}>
                        {lang === "FR" ? "Votre nom apparaîtra ici" : lang === "AR" ? "سَيَظْهَر اسمك هنا" : "Your name will appear here"}
                      </span>
                    )}
                  </div>
                </div>

                {nameInput && (
                  <div style={{ marginTop: "16px", display: "flex", gap: "12px", justifyContent: "center" }}>
                    <SaveVocabButton id={'tifinagh_6_conv_' + nameInput.toLowerCase().replace(/\s/g, '_')} word={transliterate(nameInput)} translation={nameInput} track="tifinagh" missionNum={6} type="vocab" />
                    <button className="mission-btn secondary" onClick={() => { navigator.clipboard.writeText(transliterate(nameInput)); }}>
                      <Copy size={16} />
                      <span style={{ marginLeft: "6px" }}>{lang === "FR" ? "Copier" : lang === "AR" ? "نسخ" : "Copy"}</span>
                    </button>
                  </div>
                )}

                <div style={{ marginTop: "20px", padding: "12px 16px", background: "rgba(245,158,11,0.08)", borderRadius: "10px", border: "1px solid rgba(245,158,11,0.2)" }}>
                  <p style={{ fontSize: "0.85rem", color: "var(--learn-warning)", fontWeight: 500 }}>
                    {lang === "FR" ? "💡 Ceci est une translittération lettre par lettre. Certains sons peuvent être approximatifs." : lang === "AR" ? "💡 هذا تحويل صوتي حرف بحرف. بعض الأصوات قد تكون تقريبية." : "💡 This is a letter-by-letter transliteration. Some sounds may be approximate."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: WORD CONVERTER */}
          {step === "converter" && (
            <div>
              <h2 className="step-title">{lang === "FR" ? "Convertisseur de Mots" : lang === "AR" ? "محول الكلمات" : "Word Converter"}</h2>
              <p className="step-subtitle">
                {lang === "FR" ? "Convertissez des mots latins en caractères tifinagh. Entrez un mot et voyez sa représentation." : lang === "AR" ? "حول الكلمات اللاتينية إلى أحرف تيفيناغ. أدخل كلمة وشاهد تمثيلها." : "Convert Latin words into Tifinagh characters. Enter a word and see its representation."}
              </p>

              <div className="vocab-card tifinagh-card-override" style={{ padding: "28px", maxWidth: "550px", margin: "0 auto" }}>
                <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 600, color: "var(--learn-text-secondary)", marginBottom: "8px" }}>
                  {lang === "FR" ? "Entrez un mot" : lang === "AR" ? "أدخل كلمة" : "Enter a word"}
                </label>
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <input
                    type="text"
                    value={converterInput}
                    onChange={e => setConverterInput(e.target.value)}
                    placeholder={lang === "FR" ? "Ex: Salam, Morocco..." : lang === "AR" ? "مثال: سلام، المغرب..." : "Ex: Salam, Morocco..."}
                    style={{
                      flex: 1, padding: "14px 16px", borderRadius: "12px",
                      border: "1px solid var(--learn-border)", background: "var(--learn-surface)",
                      color: "var(--learn-text)", fontSize: "1.1rem", outline: "none",
                      fontFamily: "inherit"
                    }}
                  />
                  <button className="mission-btn secondary" onClick={() => setConverterInput("")} style={{ padding: "14px 16px" }}>
                    <RefreshCw size={18} />
                  </button>
                </div>

                {converterInput && (
                  <>
                    <div style={{ marginTop: "20px" }}>
                      <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 600, color: "var(--learn-text-secondary)", marginBottom: "8px" }}>
                        {lang === "FR" ? "Résultat en Tifinagh" : lang === "AR" ? "النتيجة بتيفيناغ" : "Result in Tifinagh"}
                      </label>
                      <div style={{
                        padding: "20px", borderRadius: "12px", background: "rgba(3,105,161,0.05)",
                        border: "2px solid var(--learn-primary)",
                        display: "flex", flexDirection: "column", alignItems: "center", gap: "8px"
                      }}>
                        <div style={{ fontSize: "2.5rem", fontFamily: tff, color: "var(--learn-primary)", wordBreak: "break-all", lineHeight: 1.4 }}>
                          {transliterate(converterInput)}
                        </div>
                        <div style={{ fontSize: "0.85rem", color: "var(--learn-text-secondary)", fontStyle: "italic" }}>
                          {converterInput} → {transliterate(converterInput)}
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: "16px", display: "flex", gap: "12px", justifyContent: "center" }}>
                      <SaveVocabButton id={'tifinagh_6_wordconv_' + converterInput.toLowerCase().replace(/\s/g, '_')} word={transliterate(converterInput)} translation={converterInput} track="tifinagh" missionNum={6} type="vocab" />
                      <button className="mission-btn secondary" onClick={() => { navigator.clipboard.writeText(transliterate(converterInput)); }}>
                        <Copy size={16} />
                        <span style={{ marginLeft: "6px" }}>{lang === "FR" ? "Copier" : lang === "AR" ? "نسخ" : "Copy"}</span>
                      </button>
                    </div>
                  </>
                )}

                <div style={{ marginTop: "20px" }}>
                  <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--learn-text-secondary)", marginBottom: "8px" }}>
                    {lang === "FR" ? "Mots connus en Tifinagh" : lang === "AR" ? "كلمات معروفة بتيفيناغ" : "Known Tifinagh words"}
                  </p>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {TIFINAGH_WORDS.slice(0, 6).map((w, idx) => (
                      <div key={idx} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <button
                          className="mission-btn secondary"
                          style={{ padding: "8px 14px", fontSize: "0.85rem" }}
                          onClick={() => setConverterInput(w.latin)}
                        >
                          <span style={{ fontFamily: tff, marginRight: "6px" }}>{w.tifinagh}</span>
                          {w.latin}
                        </button>
                        <SaveVocabButton id={'tifinagh_6_' + w.latin} word={w.tifinagh} translation={w.latin} track="tifinagh" missionNum={6} type="vocab" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: ALPHABET CHALLENGE (QUIZ) */}
          {step === "quiz" && (
            <div>
              <h2 className="step-title">{lang === "FR" ? "Défi de l'Alphabet" : lang === "AR" ? "تحدي الأبجدية" : "Alphabet Challenge"}</h2>
              <p className="step-subtitle">
                {lang === "FR" ? "Testez vos connaissances avec des questions aléatoires sur l'alphabet tifinagh." : lang === "AR" ? "اختبر معرفتك بأسئلة عشوائية عن أبجدية تيفيناغ." : "Test your knowledge with random questions about the Tifinagh alphabet."}
              </p>

              <div className="quiz-card">
                {quizQuestions.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "40px 20px" }}>
                    <Shuffle size={48} style={{ color: "var(--learn-primary)", opacity: 0.6, marginBottom: "16px" }} />
                    <p style={{ color: "var(--learn-text-secondary)", marginBottom: "20px", fontSize: "1.05rem" }}>
                      {lang === "FR" ? "Prêt pour un défi ? Chaque tentative génère des questions uniques !" : lang === "AR" ? "مستعد لتحدي؟ كل محاولة تولد أسئلة فريدة!" : "Ready for a challenge? Each attempt generates unique questions!"}
                    </p>
                    <button className="mission-btn" onClick={startQuiz}>
                      {lang === "FR" ? "Commencer le Défi" : lang === "AR" ? "ابدأ التحدي" : "Start Challenge"} <Sparkles size={18} />
                    </button>
                  </div>
                ) : (
                  renderQuizQuestion(
                    quizQuestions[quizIndex],
                    quizIndex,
                    quizQuestions.length,
                    quizSelected,
                    quizFeedback,
                    handleQuizAnswer,
                    handleQuizNext,
                    quizComplete,
                    handleRestartQuiz,
                    quizScore,
                    quizComplete ? handleNext : null
                  )
                )}
              </div>
            </div>
          )}

          {/* STEP 6: FINAL ASSESSMENT */}
          {step === "assessment" && (
            <div>
              <h2 className="step-title">{lang === "FR" ? "Évaluation Finale" : lang === "AR" ? "التقييم النهائي" : "Final Assessment"}</h2>
              <p className="step-subtitle">
                {lang === "FR" ? "Un mélange de reconnaissance de symboles, de prononciation et de mots." : lang === "AR" ? "مزيج من التعرف على الرموز والنطق والكلمات." : "A mix of symbol recognition, pronunciation, and word recognition."}
              </p>

              <div className="quiz-card">
                {assessmentQuestions.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "40px 20px" }}>
                    <FileText size={48} style={{ color: "var(--learn-primary)", opacity: 0.6, marginBottom: "16px" }} />
                    <p style={{ color: "var(--learn-text-secondary)", marginBottom: "20px", fontSize: "1.05rem" }}>
                      {lang === "FR" ? "Évaluez vos connaissances de l'alphabet tifinagh complet." : lang === "AR" ? "قيم معرفتك بأبجدية تيفيناغ الكاملة." : "Assess your knowledge of the complete Tifinagh alphabet."}
                    </p>
                    <button className="mission-btn" onClick={startAssessment}>
                      {lang === "FR" ? "Commencer l'Évaluation" : lang === "AR" ? "ابدأ التقييم" : "Start Assessment"} <PenLine size={18} />
                    </button>
                  </div>
                ) : (
                  renderQuizQuestion(
                    assessmentQuestions[assessmentIndex],
                    assessmentIndex,
                    assessmentQuestions.length,
                    assessmentSelected,
                    assessmentFeedback,
                    handleAssessmentAnswer,
                    handleAssessmentNext,
                    assessmentComplete,
                    handleRestartAssessment,
                    assessmentScore,
                    assessmentComplete ? handleNext : null
                  )
                )}
              </div>
            </div>
          )}

          {/* STEP 7: COMPLETION */}
          {step === "completion" && (
            <div className="completion-step">
              <div className="completion-icon" style={{ background: 'linear-gradient(135deg, var(--learn-accent) 0%, #0284c7 50%, #38bdf8 100%)', padding: '24px', borderRadius: '50%', boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)' }}>
                <Trophy size={64} />
              </div>
              <h1 className="intro-title" style={{ fontSize: '2.5rem', marginTop: '20px' }}>
                {lang === "FR" ? "Mission Accomplie !" : lang === "AR" ? "المهمة مكتملة!" : "Mission Completed!"}
              </h1>
              <p className="intro-desc" style={{ fontSize: '1.2rem', marginBottom: '32px' }}>
                {lang === "FR"
                  ? "Vous avez terminé avec succès : Alphabet Complet Tifinagh"
                  : lang === "AR"
                  ? "لقد أكملت بنجاح: الأبجدية الكاملة لتيفيناغ"
                  : "You successfully completed: Complete Tifinagh Alphabet"}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '500px' }}>

                {/* Score Card */}
                <div style={{ textAlign: 'center', background: 'var(--learn-surface)', padding: '20px 28px', borderRadius: '16px', border: '2px solid var(--learn-border)' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--learn-text)', marginBottom: '8px' }}>
                    {lang === "FR" ? "Résultat du Quiz Final" : lang === "AR" ? "نتيجة الاختبار النهائي" : "Final Quiz Score"}
                  </h3>
                  <p style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--learn-primary)' }}>
                    {assessmentScore}/{assessmentQuestions.length || 10}
                  </p>
                </div>

                {/* Path Completed Card */}
                <div style={{ textAlign: 'left', background: 'var(--learn-surface)', padding: '28px', borderRadius: '20px', border: '2px solid var(--learn-primary)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                  <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <span style={{ fontSize: '2.5rem', fontFamily: tff, color: 'var(--learn-primary)' }}>ⵣ</span>
                    <h4 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--learn-primary)', textAlign: 'center', marginTop: '8px' }}>
                      {lang === "FR" ? "Parcours Tifinagh Terminé" : lang === "AR" ? "تم إكمال مسار تيفيناغ" : "Tifinagh Path Completed"}
                    </h4>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {TIFINAGH_MISSIONS.map((mission, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '14px', color: 'var(--learn-success)', padding: '10px 12px', background: 'rgba(16, 185, 129, 0.06)', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
                        <CheckCircle size={22} fill="currentColor" color="white" />
                        <span style={{ fontWeight: 600, fontSize: '1rem' }}>
                          {lang === "FR" ? mission.fr : lang === "AR" ? mission.ar : mission.en}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginTop: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button className="mission-btn" onClick={() => navigate("/languages")}>
                  {lang === "FR" ? "Retour au Hub d'Apprentissage" : lang === "AR" ? "العودة إلى لوحة التعلم" : "Return to Learning Hub"}
                  <ArrowRight size={20} />
                </button>
                <button className="mission-btn secondary" onClick={() => navigate("/languages/darija/mission-1")}>
                  {lang === "FR" ? "Explorer le Darija" : lang === "AR" ? "استكشف الدراجة" : "Explore Darija"}
                  <ArrowRight size={20} />
                </button>
                <button className="mission-btn secondary" onClick={() => navigate("/languages/culture/mission-1")}>
                  {lang === "FR" ? "Explorer la Culture" : lang === "AR" ? "استكشف الثقافة" : "Explore Culture"}
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {step !== "intro" && step !== "completion" && (
        (step !== "quiz" || quizComplete) && (step !== "assessment" || assessmentComplete)
      ) && (
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
