import { useEffect } from "react";

const PATHS = {
  darija: { total: 7 },
  tifinagh: { total: 5 },
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
