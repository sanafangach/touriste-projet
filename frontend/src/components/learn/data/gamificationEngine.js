// Gamification and progression system engine

export const MASTERY_RANKS = [
  { level: 1, title: "Arrivee a Casablanca", minXp: 0, color: "#a7b2bf" },
  { level: 2, title: "Passage a Rabat", minXp: 500, color: "#c47a45" },
  { level: 3, title: "Les ruelles de Fes", minXp: 1200, color: "#ff7a00" },
  { level: 4, title: "Medina de Marrakech", minXp: 2500, color: "#ff9a3d" },
  { level: 5, title: "Le tumulte du souk", minXp: 4000, color: "#357eba" },
  { level: 6, title: "Portes de Ouarzazate", minXp: 6000, color: "#4c7fa8" },
  { level: 7, title: "Vallee du Dades", minXp: 8500, color: "#e07a2f" },
  { level: 8, title: "Sommets de l'Atlas", minXp: 11500, color: "#f0b15a" },
  { level: 9, title: "Le vent du Chergui", minXp: 15000, color: "#ff8b3d" },
  { level: 10, title: "Dunes de Merzouga", minXp: 20000, color: "#c4513d" },
  { level: 11, title: "Sagesse Amazighe", minXp: 26000, color: "#ffd39a" },
  { level: 12, title: "Legende du Sahara", minXp: 35000, color: "#8fbfd6" },
];

export const ACHIEVEMENTS = [
  {
    id: "first_word",
    title: "Premier pas",
    description: "Apprendre votre premier mot",
    icon: "Flag",
    color: "#ff9a3d",
    xpReward: 50,
  },
  {
    id: "streak_3",
    title: "Regularite",
    description: "3 jours de suite",
    icon: "Calendar",
    color: "#e07a2f",
    xpReward: 100,
  },
  {
    id: "perfect_quiz",
    title: "Sans faute",
    description: "Terminer un quiz a 100%",
    icon: "Target",
    color: "#ffd39a",
    xpReward: 150,
  },
  {
    id: "speed_demon",
    title: "Reflexe",
    description: "Reponse en moins d'une seconde",
    icon: "Zap",
    color: "#c4513d",
    xpReward: 100,
  },
  {
    id: "darija_speaker",
    title: "Conversationaliste",
    description: "Terminer un scenario de vie",
    icon: "MessageCircle",
    color: "#ff7a00",
    xpReward: 200,
  },
  {
    id: "alphabet_master",
    title: "Gardien des lettres",
    description: "Maitriser tout l'alphabet Tifinagh",
    icon: "Book",
    color: "#4c7fa8",
    xpReward: 500,
  },
  {
    id: "cultural_scholar",
    title: "Erudit",
    description: "Lire 5 mythes culturels",
    icon: "Compass",
    color: "#d98b45",
    xpReward: 250,
  },
];

export const FEATURE_UNLOCKS = [
  { id: "quiz_survival", title: "Arene : mode survie", requiredLevel: 3, icon: "Heart", hub: "tifinagh" },
  { id: "quiz_timed", title: "Arene : contre-la-montre", requiredLevel: 5, icon: "Timer", hub: "tifinagh" },
  { id: "quiz_audio", title: "Arene : a l'aveugle", requiredLevel: 7, icon: "Volume2", hub: "tifinagh" },
  { id: "name_converter", title: "Studio de calligraphie", requiredLevel: 2, icon: "Award", hub: "tifinagh" },
  { id: "pronunciation_lab", title: "Laboratoire phonetique", requiredLevel: 4, icon: "Mic", hub: "tifinagh" },
  { id: "darija_taxi", title: "Scenario : le petit taxi", requiredLevel: 2, icon: "MapPin", hub: "darija" },
];

export const getNewlyUnlockedFeatures = (oldXp, newXp) => {
  const oldLevel = getRankByXp(oldXp).currentRank.level;
  const newLevel = getRankByXp(newXp).currentRank.level;

  if (newLevel > oldLevel) {
    return FEATURE_UNLOCKS.filter(
      (feature) => feature.requiredLevel > oldLevel && feature.requiredLevel <= newLevel
    );
  }

  return [];
};

const STORAGE_KEYS = {
  USER_STATS: "amudux_learn_stats",
  LEARNED_LETTERS: "amudux_learned_letters",
  UNLOCKED_CARDS: "amudux_unlocked_cards",
  ACHIEVEMENTS: "amudux_achievements",
  DAILY_STATE: "amudux_daily_state",
  WORD_MASTERY: "amudux_word_mastery",
};

const INITIAL_STATS = {
  xp: 0,
  level: 1,
  streak: 0,
  lastActiveDate: null,
  streakFreezes: 1,
  totalQuizzesTaken: 0,
  correctAnswers: 0,
};

export const getRankByXp = (xp) => {
  let currentRank = MASTERY_RANKS[0];
  let nextRank = MASTERY_RANKS[1];

  for (let index = 0; index < MASTERY_RANKS.length; index += 1) {
    if (xp >= MASTERY_RANKS[index].minXp) {
      currentRank = MASTERY_RANKS[index];
      nextRank = MASTERY_RANKS[index + 1] || null;
    } else {
      break;
    }
  }

  let progressPercentage = 100;

  if (nextRank) {
    const xpIntoLevel = xp - currentRank.minXp;
    const xpRequiredForNextLevel = nextRank.minXp - currentRank.minXp;
    progressPercentage = (xpIntoLevel / xpRequiredForNextLevel) * 100;
  }

  return { currentRank, nextRank, progressPercentage };
};

export const loadProgress = () => {
  try {
    const statsStr = localStorage.getItem(STORAGE_KEYS.USER_STATS);
    const learnedStr = localStorage.getItem(STORAGE_KEYS.LEARNED_LETTERS);
    const unlockedStr = localStorage.getItem(STORAGE_KEYS.UNLOCKED_CARDS);
    const achievementsStr = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);

    const stats = statsStr ? JSON.parse(statsStr) : { ...INITIAL_STATS };
    const learnedLetters = learnedStr ? JSON.parse(learnedStr) : [];
    const unlockedCards = unlockedStr ? JSON.parse(unlockedStr) : ["anzar"];
    const unlockedAchievements = achievementsStr ? JSON.parse(achievementsStr) : [];

    const today = new Date().toDateString();
    if (stats.lastActiveDate !== today) {
      if (stats.lastActiveDate) {
        const lastDate = new Date(stats.lastActiveDate);
        const diffDays = Math.floor((new Date() - lastDate) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          stats.streak += 1;
        } else if (diffDays > 1) {
          if (stats.streakFreezes > 0) {
            stats.streakFreezes -= 1;
          } else {
            stats.streak = 1;
          }
        }
      } else {
        stats.streak = 1;
      }

      stats.lastActiveDate = today;
      saveStats(stats);
    }

    const { currentRank, nextRank, progressPercentage } = getRankByXp(stats.xp);

    return {
      stats,
      learnedLetters,
      unlockedCards,
      unlockedAchievements,
      currentRank,
      nextRank,
      progressPercentage,
    };
  } catch (error) {
    console.error("Error loading progress", error);
    return {
      stats: { ...INITIAL_STATS },
      learnedLetters: [],
      unlockedCards: ["anzar"],
      unlockedAchievements: [],
      ...getRankByXp(0),
    };
  }
};

export const saveStats = (stats) => {
  localStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(stats));
};

export const addXp = (amount) => {
  try {
    const statsStr = localStorage.getItem(STORAGE_KEYS.USER_STATS);
    const stats = statsStr ? JSON.parse(statsStr) : { ...INITIAL_STATS };

    const oldXp = stats.xp;
    const oldLevel = getRankByXp(oldXp).currentRank.level;
    stats.xp += amount;
    const newLevel = getRankByXp(stats.xp).currentRank.level;
    const newUnlocks = getNewlyUnlockedFeatures(oldXp, stats.xp);

    saveStats(stats);

    return {
      stats,
      leveledUp: newLevel > oldLevel,
      newLevel,
      newUnlocks,
    };
  } catch (error) {
    console.error("Error adding XP", error);
    return null;
  }
};

export const markLetterLearned = (char) => {
  try {
    const learnedStr = localStorage.getItem(STORAGE_KEYS.LEARNED_LETTERS);
    const learnedLetters = learnedStr ? JSON.parse(learnedStr) : [];

    if (!learnedLetters.includes(char)) {
      learnedLetters.push(char);
      localStorage.setItem(STORAGE_KEYS.LEARNED_LETTERS, JSON.stringify(learnedLetters));
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error marking letter", error);
    return false;
  }
};

export const unlockAchievement = (achievementId) => {
  try {
    const achievementsStr = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
    const achievements = achievementsStr ? JSON.parse(achievementsStr) : [];

    if (!achievements.includes(achievementId)) {
      achievements.push(achievementId);
      localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));

      const achievementDef = ACHIEVEMENTS.find((achievement) => achievement.id === achievementId);
      if (achievementDef && achievementDef.xpReward) {
        addXp(achievementDef.xpReward);
      }

      return achievementDef;
    }

    return null;
  } catch (error) {
    console.error("Error unlocking achievement", error);
    return null;
  }
};

export const recordWordAttempt = (wordId, isCorrect) => {
  try {
    const str = localStorage.getItem(STORAGE_KEYS.WORD_MASTERY);
    const mastery = str ? JSON.parse(str) : {};

    if (!mastery[wordId]) {
      mastery[wordId] = { attempts: 0, correct: 0 };
    }

    mastery[wordId].attempts += 1;
    if (isCorrect) {
      mastery[wordId].correct += 1;
    }

    mastery[wordId].lastAttempt = Date.now();
    localStorage.setItem(STORAGE_KEYS.WORD_MASTERY, JSON.stringify(mastery));
  } catch (error) {
    console.error("Error recording word attempt", error);
  }
};

export const getWordMastery = () => {
  try {
    const str = localStorage.getItem(STORAGE_KEYS.WORD_MASTERY);
    return str ? JSON.parse(str) : {};
  } catch (error) {
    console.error("Error loading word mastery", error);
    return {};
  }
};
