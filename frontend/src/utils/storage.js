const STORAGE_KEYS = {
  savedVocabulary: "saved_vocabulary",
  favoriteMissions: "favorite_missions",
  revisionProgress: "revision_progress"
};

function safeGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch { /* quota exceeded, silently fail */ }
}

/* ===== Saved Vocabulary ===== */

export function saveVocabularyItem(item) {
  const items = safeGet(STORAGE_KEYS.savedVocabulary, []);
  if (items.some(i => i.id === item.id)) return;
  items.push(item);
  safeSet(STORAGE_KEYS.savedVocabulary, items);
}

export function removeVocabularyItem(id) {
  const items = safeGet(STORAGE_KEYS.savedVocabulary, []);
  safeSet(STORAGE_KEYS.savedVocabulary, items.filter(i => i.id !== id));
}

export function getSavedVocabulary() {
  return safeGet(STORAGE_KEYS.savedVocabulary, []);
}

export function isVocabularySaved(id) {
  const items = safeGet(STORAGE_KEYS.savedVocabulary, []);
  return items.some(i => i.id === id);
}

export function getSavedVocabCount() {
  return getSavedVocabulary().length;
}

/* ===== Favorite Missions ===== */

export function favoriteMission(track, missionNum) {
  const items = safeGet(STORAGE_KEYS.favoriteMissions, []);
  if (items.some(i => i.track === track && i.missionNum === missionNum)) return;
  items.push({ track, missionNum });
  safeSet(STORAGE_KEYS.favoriteMissions, items);
}

export function unfavoriteMission(track, missionNum) {
  const items = safeGet(STORAGE_KEYS.favoriteMissions, []);
  safeSet(STORAGE_KEYS.favoriteMissions, items.filter(i => !(i.track === track && i.missionNum === missionNum)));
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
