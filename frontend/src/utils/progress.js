import { useEffect } from "react";
import { getUserScope } from "./userScope";
import api from "../services/api";

const PATHS = {
  darija: { total: 7 },
  tifinagh: { total: 6 },
  culture: { total: 6 }
};

const STORAGE_PREFIX = "apprendre_";

function storageKey(track, missionNum) {
  return `${STORAGE_PREFIX}${getUserScope()}_${track}_${missionNum}_completed`;
}

// ── Mission id resolution (database-driven) ───────────
// The mapping track + mission_number → mission_id is owned by the database, not the
// client. We fetch the missions list once and cache it. No hardcoded ids.

let missionMapCache = null;     // { [track]: { [missionNum]: id } }
let missionMapPromise = null;   // in-flight fetch, so concurrent callers share one request

// Completion keys whose DB POST is currently in flight. An authoritative sync must
// not erase a mission the user just finished while its write is still on the wire —
// otherwise returning to the hub right after a mission visibly drops the completion.
const pendingCompletions = new Set();

function buildMissionMap(missions) {
  const map = {};
  for (const m of missions) {
    if (!map[m.track]) map[m.track] = {};
    map[m.track][m.mission_number] = m.id;
  }
  return map;
}

// Ensure the mission map is loaded. Safe to call repeatedly; resolves to the cached map.
export async function loadMissionMap() {
  if (missionMapCache) return missionMapCache;
  if (missionMapPromise) return missionMapPromise;

  missionMapPromise = api.get("/apprendre/missions")
    .then(res => {
      missionMapCache = buildMissionMap(res.data);
      return missionMapCache;
    })
    .catch(err => {
      console.error("[apprendre] failed to load mission map:", err?.message || err);
      missionMapPromise = null; // allow a later retry
      return null;
    });

  return missionMapPromise;
}

// Synchronous lookup from the cache. Returns null if the map hasn't loaded yet.
export function getMissionId(track, missionNum) {
  return missionMapCache?.[track]?.[missionNum] ?? null;
}

// Resolve a mission id, loading the map first if necessary.
export async function resolveMissionId(track, missionNum) {
  if (!missionMapCache) await loadMissionMap();
  return getMissionId(track, missionNum);
}

// ── DB sync ──────────────────────────────────────────
// Load progress from DB into localStorage (called on hub mount when authenticated).
// Authoritative: localStorage is reset to exactly match the database, so progress
// removed server-side no longer lingers on the client.

export async function syncProgressFromDb() {
  const token = localStorage.getItem("token");
  if (!token) return;
  try {
    const res = await api.get("/apprendre/progress");
    const progressList = res.data;

    // Clear all existing completion keys for this user scope, then re-apply from DB.
    // Exception: keys for completions whose DB write is still in flight are kept —
    // the GET may have been issued before that POST landed, so the DB snapshot does
    // not yet include them. Dropping them here makes a just-finished mission flicker
    // away from the hub until the next sync.
    const scope = getUserScope();
    const prefix = `${STORAGE_PREFIX}${scope}_`;
    const stale = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix) && key.endsWith("_completed") && !pendingCompletions.has(key)) {
        stale.push(key);
      }
    }
    stale.forEach(key => localStorage.removeItem(key));

    for (const p of progressList) {
      const key = storageKey(p.track, p.mission_number);
      localStorage.setItem(key, "true");
    }
  } catch (e) {
    console.error("[apprendre] syncProgressFromDb failed:", e?.message || e);
    // localStorage is left as-is; the existing cache remains the fallback.
  }
}

// ── Core progress functions ──────────────────────────

export async function completeMission(track, missionNum) {
  const key = storageKey(track, missionNum);
  try {
    localStorage.setItem(key, "true");
  } catch (e) {}

  // Unauthenticated: local-only progress, nothing to persist or reconcile.
  if (!localStorage.getItem("token")) return;

  // Mark the write in flight so a concurrent authoritative sync (e.g. the hub
  // mounting right after the mission) does not wipe this completion before its
  // POST lands.
  pendingCompletions.add(key);

  // Persist in DB. Awaited so failures are observable and consistency can be kept.
  try {
    const missionId = await resolveMissionId(track, missionNum);
    if (!missionId) {
      // No id means the write can never be persisted — drop the optimistic flag so
      // the cache does not claim a completion the database will never have.
      console.error(`[apprendre] completeMission: no mission id for ${track}/${missionNum}`);
      try { localStorage.removeItem(key); } catch (e) {}
      return;
    }
    await api.post("/apprendre/progress", { mission_id: missionId });
  } catch (e) {
    console.error(`[apprendre] completeMission failed for ${track}/${missionNum}:`, e?.message || e);
    // The database is the source of truth: if it did not record the completion,
    // revert the optimistic local flag so the cache cannot drift out of sync.
    try { localStorage.removeItem(key); } catch (err) {}
  } finally {
    pendingCompletions.delete(key);
  }
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

export function isAdminUser(user) {
  return user?.role === "admin";
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
