import { useEffect } from "react";

const PATHS = {
  darija: { total: 7 },
  tifinagh: { total: 6 },
  culture: { total: 6 }
};

const STORAGE_PREFIX = "apprendre_";

function storageKey(track, missionNum) {
  return `${STORAGE_PREFIX}${track}_${missionNum}_completed`;
}

export function completeMission(track, missionNum) {
  try {
    localStorage.setItem(storageKey(track, missionNum), "true");
  } catch (e) {}
}

export function isMissionCompleted(track, missionNum) {
  try {
    return localStorage.getItem(storageKey(track, missionNum)) === "true";
  } catch (e) {
    return false;
  }
}

export function getCompletedMissions(track) {
  const total = PATHS[track]?.total || 0;
  let count = 0;
  for (let i = 1; i <= total; i++) {
    if (isMissionCompleted(track, i)) count++;
  }
  return count;
}

export function getPathProgress(track) {
  const total = PATHS[track]?.total || 0;
  if (total === 0) return 0;
  return Math.round((getCompletedMissions(track) / total) * 100);
}

export function getOverallProgress() {
  let totalCompleted = 0;
  let totalMissions = 0;
  for (const track of Object.keys(PATHS)) {
    totalCompleted += getCompletedMissions(track);
    totalMissions += PATHS[track].total;
  }
  if (totalMissions === 0) return 0;
  return Math.round((totalCompleted / totalMissions) * 100);
}

export function getTotalCompleted() {
  let totalCompleted = 0;
  for (const track of Object.keys(PATHS)) {
    totalCompleted += getCompletedMissions(track);
  }
  return totalCompleted;
}

export function getTotalMissions() {
  let totalMissions = 0;
  for (const track of Object.keys(PATHS)) {
    totalMissions += PATHS[track].total;
  }
  return totalMissions;
}

export function getPathTotalMissions(track) {
  return PATHS[track]?.total || 0;
}

export const ADMIN_EMAILS = ["yassinoubrik2021@gmail.com"];

export function isAdminUser(user) {
  return user?.email && ADMIN_EMAILS.includes(user.email);
}

export function canAccessMission(track, missionNum, user) {
  if (isAdminUser(user)) return true;
  return isMissionUnlocked(track, missionNum);
}

export function isMissionUnlocked(track, missionNum) {
  if (missionNum === 1) return true;
  return isMissionCompleted(track, missionNum - 1);
}

export function getFirstUnlockedMission(track) {
  const total = PATHS[track]?.total || 0;
  for (let i = 1; i <= total; i++) {
    if (!isMissionCompleted(track, i) && isMissionUnlocked(track, i)) {
      return i;
    }
  }
  return null;
}

export function isPathCompleted(track) {
  return getCompletedMissions(track) === PATHS[track]?.total;
}

export const MISSION_NAMES = {
  darija: {
    1: { en: "Airport Arrival", fr: "Arrivée à l'Aéroport", ar: "الوصول إلى المطار" },
    2: { en: "Taxi Journey", fr: "Trajet en Taxi", ar: "رحلة التاكسي" },
    3: { en: "Hotel Check-In", fr: "Arrivée à l'Hôtel", ar: "تسجيل الدخول في الفندق" },
    4: { en: "Restaurant & Café", fr: "Restaurant & Café", ar: "مطعم ومقهى" },
    5: { en: "Souk & Bargaining", fr: "Souk & Négociation", ar: "السوق والمساومة" },
    6: { en: "Asking Directions", fr: "Demander son Chemin", ar: "طلب الاتجاهات" },
    7: { en: "Emergency Situations", fr: "Situations d'Urgence", ar: "حالات الطوارئ" }
  },
  tifinagh: {
    1: { en: "Discover Tifinagh", fr: "Découvrir le Tifinagh", ar: "اكتشف تيفيناغ" },
    2: { en: "Write Your First Tifinagh Word", fr: "Écrire votre premier mot en tifinagh", ar: "اكتب أول كلمة لك بتيفيناغ" },
    3: { en: "Reading Common Signs", fr: "Lire les Panneaux", ar: "قراءة اللافتات" },
    4: { en: "Everyday Words", fr: "Mots du Quotidien", ar: "كلمات يومية" },
    5: { en: "Amazigh Culture & Symbols", fr: "Culture & Symboles Amazighs", ar: "الثقافة والرموز الأمازيغية" },
    6: { en: "Complete Tifinagh Alphabet", fr: "Alphabet Complet Tifinagh", ar: "أبجدية تيفيناغ الكاملة" }
  },
  culture: {
    1: { en: "Moroccan Hospitality", fr: "L'hospitalité Marocaine", ar: "الضيافة المغربية" },
    2: { en: "Markets & Bargaining", fr: "Marchés & Négociation", ar: "الأسواق والمساومة" },
    3: { en: "Moroccan Food & Etiquette", fr: "Cuisine Marocaine & Étiquette", ar: "الطعام المغربي والآداب" },
    4: { en: "Local Customs & Everyday Life", fr: "Coutumes Locales & Vie Quotidienne", ar: "العادات المحلية والحياة اليومية" },
    5: { en: "Religious Etiquette", fr: "Étiquette Religieuse", ar: "آداب دينية" },
    6: { en: "Travel Safety & Smart Travel", fr: "Sécurité en Voyage & Voyage Intelligent", ar: "سلامة السفر والسفر الذكي" }
  }
};

export function getMissionTitle(track, missionNum, lang) {
  const names = MISSION_NAMES[track]?.[missionNum];
  if (!names) return `Mission ${missionNum}`;
  return names[lang?.toLowerCase()] || names.en;
}

export function getMissionStatus(track, missionNum) {
  if (isMissionCompleted(track, missionNum)) return "completed";
  if (isMissionUnlocked(track, missionNum)) return "unlocked";
  return "locked";
}

export function getContinueLearningInfo() {
  const order = ["darija", "tifinagh", "culture"];
  for (const track of order) {
    const total = PATHS[track]?.total || 0;
    for (let i = 1; i <= total; i++) {
      if (!isMissionCompleted(track, i) && isMissionUnlocked(track, i)) {
        return { track, missionNum: i };
      }
    }
  }
  return null;
}

export function useAutoProgress(step) {
  useEffect(() => {
    if (step === "completion") {
      const match = window.location.pathname.match(/\/languages\/(\w+)\/mission-(\d+)/);
      if (match) {
        completeMission(match[1], parseInt(match[2]));
      }
    }
  }, [step]);
}
