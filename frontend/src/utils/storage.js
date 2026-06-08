import { getUserScope } from "./userScope";
import api from "../services/api";
import { resolveMissionId } from "./progress";

const STORAGE_KEYS = {
  savedVocabulary: "saved_vocabulary",
  favoriteMissions: "favorite_missions",
  revisionProgress: "revision_progress"
};

function scopedKey(baseKey) {
  return `${baseKey}_${getUserScope()}`;
}

function safeGet(key, fallback) {
  try {
    const raw = localStorage.getItem(scopedKey(key));
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(scopedKey(key), JSON.stringify(value));
  } catch { /* quota exceeded, silently fail */ }
}

// Stable natural key for a saved vocabulary item. Identical whether the item was
// created locally or hydrated from the database, so identity survives a sync.
// (The DB-assigned integer id is NOT used for identity.)
function vocabKey(item) {
  return `${item.track}::${item.missionNum}::${item.word}`;
}

// ── DB sync ──────────────────────────────────────────

export async function syncFavoritesFromDb() {
  const token = localStorage.getItem("token");
  if (!token) return;
  try {
    const res = await api.get("/apprendre/favorites");
    const items = res.data.map(f => ({ track: f.track, missionNum: f.mission_number }));
    safeSet(STORAGE_KEYS.favoriteMissions, items);
  } catch (e) {
    console.error("[apprendre] syncFavoritesFromDb failed:", e?.message || e);
  }
}

export async function syncSavedFromDb() {
  const token = localStorage.getItem("token");
  if (!token) return;
  try {
    const res = await api.get("/apprendre/saved");
    const items = res.data.map(s => ({
      id: s.id,
      word: s.content,
      translation: s.translation || "",
      track: s.track,
      missionNum: s.mission_number,
      type: s.type,
      category: s.category,
    }));
    safeSet(STORAGE_KEYS.savedVocabulary, items);
  } catch (e) {
    console.error("[apprendre] syncSavedFromDb failed:", e?.message || e);
  }
}

/* ===== Saved Vocabulary ===== */

// item: { id, word, translation, track, missionNum, type, category? }
export async function saveVocabularyItem(item) {
  const key = vocabKey(item);
  const items = safeGet(STORAGE_KEYS.savedVocabulary, []);
  if (items.some(i => vocabKey(i) === key)) return; // already saved (idempotent)

  // Optimistic local insert
  items.push(item);
  safeSet(STORAGE_KEYS.savedVocabulary, items);

  if (!localStorage.getItem("token")) return;

  try {
    const missionId = await resolveMissionId(item.track, item.missionNum);
    if (!missionId) {
      throw new Error(`no mission id for ${item.track}/${item.missionNum}`);
    }
    await api.post("/apprendre/saved", {
      mission_id: missionId,
      category: item.category || null,
      type: item.type || "vocab",
      content: item.word,
      translation: item.translation || null,
    });
  } catch (e) {
    console.error(`[apprendre] saveVocabularyItem failed for ${key}:`, e?.message || e);
    // Revert the optimistic insert so the cache matches the database.
    const reverted = safeGet(STORAGE_KEYS.savedVocabulary, []).filter(i => vocabKey(i) !== key);
    safeSet(STORAGE_KEYS.savedVocabulary, reverted);
    throw e;
  }
}

// Accepts the full item (needs track/missionNum/word for the natural-key delete).
export async function removeVocabularyItem(item) {
  const key = vocabKey(item);
  const items = safeGet(STORAGE_KEYS.savedVocabulary, []);
  const removed = items.find(i => vocabKey(i) === key);
  if (!removed) return;

  // Optimistic local removal
  safeSet(STORAGE_KEYS.savedVocabulary, items.filter(i => vocabKey(i) !== key));

  if (!localStorage.getItem("token")) return;

  try {
    const missionId = await resolveMissionId(item.track, item.missionNum);
    if (!missionId) {
      throw new Error(`no mission id for ${item.track}/${item.missionNum}`);
    }
    // Delete by natural key (mission_id + content) — never the mismatched DB id.
    await api.delete("/apprendre/saved", {
      data: { mission_id: missionId, content: item.word },
    });
  } catch (e) {
    console.error(`[apprendre] removeVocabularyItem failed for ${key}:`, e?.message || e);
    // Revert: restore the removed item so the cache matches the database.
    const current = safeGet(STORAGE_KEYS.savedVocabulary, []);
    if (!current.some(i => vocabKey(i) === key)) {
      current.push(removed);
      safeSet(STORAGE_KEYS.savedVocabulary, current);
    }
    throw e;
  }
}

export function getSavedVocabulary() {
  return safeGet(STORAGE_KEYS.savedVocabulary, []);
}

export function isVocabularySaved(track, missionNum, word) {
  const key = `${track}::${missionNum}::${word}`;
  const items = safeGet(STORAGE_KEYS.savedVocabulary, []);
  return items.some(i => vocabKey(i) === key);
}

export function getSavedVocabCount() {
  return getSavedVocabulary().length;
}

/* ===== Favorite Missions ===== */

export async function favoriteMission(track, missionNum) {
  const items = safeGet(STORAGE_KEYS.favoriteMissions, []);
  if (items.some(i => i.track === track && i.missionNum === missionNum)) return;

  // Optimistic local insert
  items.push({ track, missionNum });
  safeSet(STORAGE_KEYS.favoriteMissions, items);

  if (!localStorage.getItem("token")) return;

  try {
    const missionId = await resolveMissionId(track, missionNum);
    if (!missionId) {
      throw new Error(`no mission id for ${track}/${missionNum}`);
    }
    await api.post("/apprendre/favorites", { mission_id: missionId });
  } catch (e) {
    console.error(`[apprendre] favoriteMission failed for ${track}/${missionNum}:`, e?.message || e);
    const reverted = safeGet(STORAGE_KEYS.favoriteMissions, [])
      .filter(i => !(i.track === track && i.missionNum === missionNum));
    safeSet(STORAGE_KEYS.favoriteMissions, reverted);
    throw e;
  }
}

export async function unfavoriteMission(track, missionNum) {
  const items = safeGet(STORAGE_KEYS.favoriteMissions, []);
  const existed = items.some(i => i.track === track && i.missionNum === missionNum);
  if (!existed) return;

  // Optimistic local removal
  const updated = items.filter(i => !(i.track === track && i.missionNum === missionNum));
  safeSet(STORAGE_KEYS.favoriteMissions, updated);

  if (!localStorage.getItem("token")) return;

  try {
    const res = await api.get("/apprendre/favorites");
    const fav = res.data.find(f => f.track === track && f.mission_number === missionNum);
    if (fav) {
      await api.delete(`/apprendre/favorites/${fav.id}`);
    }
  } catch (e) {
    console.error(`[apprendre] unfavoriteMission failed for ${track}/${missionNum}:`, e?.message || e);
    // Revert: restore the favorite so the cache matches the database.
    const current = safeGet(STORAGE_KEYS.favoriteMissions, []);
    if (!current.some(i => i.track === track && i.missionNum === missionNum)) {
      current.push({ track, missionNum });
      safeSet(STORAGE_KEYS.favoriteMissions, current);
    }
    throw e;
  }
}

export function getFavoriteMissions() {
  return safeGet(STORAGE_KEYS.favoriteMissions, []);
}

export function isMissionFavorited(track, missionNum) {
  const items = safeGet(STORAGE_KEYS.favoriteMissions, []);
  return items.some(i => i.track === track && i.missionNum === missionNum);
}

export function getFavoriteMissionsCount() {
  return getFavoriteMissions().length;
}

/* ===== Revision Progress ===== */

export function setRevisionProgress(progress) {
  safeSet(STORAGE_KEYS.revisionProgress, progress);
}

export function getRevisionProgress() {
  return safeGet(STORAGE_KEYS.revisionProgress, {});
}
