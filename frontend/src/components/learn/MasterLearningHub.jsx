import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpenText,
  Compass,
  Flame,
  LayoutDashboard,
  MessageCircleMore,
  MoonStar,
  PenTool,
  Sparkles,
  SunMedium,
  Target,
  Trophy,
  UserCircle2,
  Users,
  Volume2,
} from "lucide-react";
import TifinaghHub from "./TifinaghHub";
import DarijaHub from "./DarijaHub";
import { loadProgress } from "./data/gamificationEngine";
import "./LearnHub.css";

const NAV_ITEMS = [
  { id: "overview", label: "Overview", note: "Command center", icon: LayoutDashboard },
  { id: "darija", label: "Darija Studio", note: "Conversations", icon: MessageCircleMore },
  { id: "tifinagh", label: "Tifinagh Lab", note: "Alphabet + sound", icon: PenTool },
  { id: "practice", label: "Daily Missions", note: "Quick wins", icon: Target },
  { id: "community", label: "Community", note: "Energy + ranking", icon: Users },
  { id: "profile", label: "Profile", note: "XP + identity", icon: UserCircle2 },
];

const PANEL_COPY = {
  overview: {
    kicker: "Immersive learning platform",
    title: "A premium Moroccan language universe designed to keep practice irresistible.",
    heroTitle: "Learn Darija and Tifinagh through momentum, emotion, and beautifully guided repetition.",
    heroCopy:
      "AMUDUX Learn blends the warmth of Morocco with a polished digital studio so vocabulary, pronunciation, and cultural memory feel more like a living ritual than a static course.",
    primaryLabel: "Open Darija Studio",
    primaryTarget: "darija",
    secondaryLabel: "Enter Tifinagh Lab",
    secondaryTarget: "tifinagh",
  },
  practice: {
    kicker: "Momentum mode",
    title: "Short, satisfying sessions that turn daily consistency into a premium habit.",
    heroTitle: "Keep the streak alive with audio drills, micro-missions, and contextual recall.",
    heroCopy:
      "This surface is tuned for low friction: quick wins, visible progress, and tactile feedback that make returning tomorrow feel effortless.",
    primaryLabel: "Continue Darija drills",
    primaryTarget: "darija",
    secondaryLabel: "Train the alphabet",
    secondaryTarget: "tifinagh",
  },
  community: {
    kicker: "Social energy",
    title: "A modern learning lounge where progress feels shared, visible, and aspirational.",
    heroTitle: "Celebrate streaks, compare XP, and stay motivated by a living community pulse.",
    heroCopy:
      "The best education products feel personal and collective at the same time. Here, every milestone turns into a reason to stay curious and keep practicing.",
    primaryLabel: "Jump into Darija",
    primaryTarget: "darija",
    secondaryLabel: "Explore Tifinagh culture",
    secondaryTarget: "tifinagh",
  },
  profile: {
    kicker: "Personal mastery",
    title: "A polished dashboard for your rank, rhythm, and long-term cultural fluency.",
    heroTitle: "Track what you know, what is unlocking next, and where your strongest momentum lives.",
    heroCopy:
      "Your learning profile should feel like a premium passport: elegant, motivating, and rich with signals about how far you have already come.",
    primaryLabel: "Resume your path",
    primaryTarget: "darija",
    secondaryLabel: "Refine pronunciation",
    secondaryTarget: "tifinagh",
  },
};

function MasterLearningHub() {
  const [activeSurface, setActiveSurface] = useState("overview");
  const [theme, setTheme] = useState(() => localStorage.getItem("amudux_learn_theme") || "dark");
  const [stats, setStats] = useState(null);
  const [currentRank, setCurrentRank] = useState(null);
  const [nextRank, setNextRank] = useState(null);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [learnedLettersCount, setLearnedLettersCount] = useState(0);
  const [learnedDarijaCount, setLearnedDarijaCount] = useState(0);
  const [unlockedAchievementsCount, setUnlockedAchievementsCount] = useState(0);

  useEffect(() => {
    localStorage.setItem("amudux_learn_theme", theme);
  }, [theme]);

  useEffect(() => {
    if (activeSurface === "darija" || activeSurface === "tifinagh") {
      return;
    }

    const progress = loadProgress();
    const learnedWords = JSON.parse(localStorage.getItem("amudux_darija_learned") || "[]");

    setStats(progress.stats);
    setCurrentRank(progress.currentRank);
    setNextRank(progress.nextRank);
    setProgressPercentage(progress.progressPercentage);
    setLearnedLettersCount(progress.learnedLetters.length);
    setLearnedDarijaCount(learnedWords.length);
    setUnlockedAchievementsCount(progress.unlockedAchievements.length);
  }, [activeSurface]);

  if (activeSurface === "darija") {
    return <DarijaHub theme={theme} onBack={() => setActiveSurface("overview")} />;
  }

  if (activeSurface === "tifinagh") {
    return <TifinaghHub theme={theme} onBack={() => setActiveSurface("overview")} />;
  }

  if (!stats || !currentRank) {
    return <div className="learn-loading">Loading your Moroccan learning studio...</div>;
  }

  const panel = PANEL_COPY[activeSurface] || PANEL_COPY.overview;
  const xpToNext = nextRank ? Math.max(0, nextRank.minXp - stats.xp) : 0;
  const totalUnits = 33 + 18;
  const masteryPercent = Math.min(
    100,
    Math.round(((learnedLettersCount + learnedDarijaCount) / totalUnits) * 100)
  );

  const missionList = [
    {
      label: "Darija greetings",
      detail: "Review useful openers for cafes, taxis, and first meetings.",
      reward: "+40 XP",
      progress: Math.min(100, learnedDarijaCount * 18),
    },
    {
      label: "Tifinagh alphabet pulse",
      detail: "Keep the alphabet alive with one quick visual recall round.",
      reward: "+25 XP",
      progress: Math.min(100, Math.round((learnedLettersCount / 10) * 100)),
    },
    {
      label: "Pronunciation focus",
      detail: "Play one audio session and repeat out loud for fluency.",
      reward: "+35 XP",
      progress: stats.streak > 0 ? Math.min(100, stats.streak * 12) : 0,
    },
  ];

  const practiceModes = [
    {
      icon: Volume2,
      title: "Audio pulse",
      copy: "Short listening rounds for rhythm, sound memory, and confidence.",
      action: "Train with Tifinagh",
      target: "tifinagh",
    },
    {
      icon: MessageCircleMore,
      title: "Conversation sprint",
      copy: "Jump into realistic Moroccan moments and answer like a local.",
      action: "Open Darija scenes",
      target: "darija",
    },
    {
      icon: BookOpenText,
      title: "Flashcard flow",
      copy: "Quick recall loops designed to feel satisfying instead of repetitive.",
      action: "Review vocabulary",
      target: "darija",
    },
  ];

  const leaderboard = [
    { name: "You", xp: stats.xp, meta: currentRank.title, highlight: true },
    { name: "Salma", xp: stats.xp + 180, meta: "12-day streak" },
    { name: "Idriss", xp: Math.max(0, stats.xp - 90), meta: "Audio specialist" },
    { name: "Nora", xp: stats.xp + 60, meta: "Daily learner" },
  ].sort((a, b) => b.xp - a.xp);

  const navAction = (id) => {
    setActiveSurface(id);
  };

  return (
    <div
      className={`learn-hub-container learn-platform-shell ${
        theme === "light" ? "learn-hub-container--light" : ""
      }`}
    >
      <div className="learn-orbit learn-orbit--one"></div>
      <div className="learn-orbit learn-orbit--two"></div>

      <div className="learn-content-z learn-app-shell">
        <aside className="learn-sidebar learn-glass-panel">
          <div className="learn-brand">
            <div className="learn-brand-mark">ⵣ</div>
            <div>
              <strong>AMUDUX Learn</strong>
              <span>Darija + Tifinagh studio</span>
            </div>
          </div>

          <div className="learn-sidebar-nav">
            {NAV_ITEMS.map(({ id, label, note, icon: Icon }) => {
              const isActive = activeSurface === id;

              return (
                <button
                  key={id}
                  type="button"
                  className={`learn-sidebar-link ${isActive ? "learn-sidebar-link--active" : ""}`}
                  onClick={() => navAction(id)}
                >
                  <div className="learn-sidebar-link__icon">
                    <Icon size={18} />
                  </div>
                  <div className="learn-sidebar-link__meta">
                    <strong>{label}</strong>
                    <span>{note}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="learn-sidebar-footer">
            <div className="learn-focus-card">
              <span className="learn-focus-pill">
                <Sparkles size={14} />
                Daily focus
              </span>
              <h3>Keep the learning loop warm and cinematic.</h3>
              <p>
                A short session today protects your streak, sharpens recall, and keeps Morocco
                close in memory.
              </p>
            </div>
          </div>
        </aside>

        <main className="learn-stage">
          <header className="learn-topbar learn-glass-panel">
            <div>
              <div className="learn-topbar-kicker">{panel.kicker}</div>
              <h1 className="learn-topbar-title">{panel.title}</h1>
            </div>

            <div className="learn-topbar-actions">
              <div className="learn-pill-stat">
                <Flame size={16} />
                <span>{stats.streak} day streak</span>
              </div>
              <div className="learn-pill-stat">
                <Trophy size={16} />
                <span>{stats.xp} XP</span>
              </div>
              <button
                type="button"
                className="learn-theme-toggle"
                onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
              >
                {theme === "dark" ? <SunMedium size={18} /> : <MoonStar size={18} />}
                <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
              </button>
            </div>
          </header>

          <section className="learn-command-grid">
            <article className="learn-glass-panel learn-immersive-hero">
              <div className="learn-kicker">
                <Sparkles size={14} />
                <span>Moroccan language OS</span>
              </div>

              <h2 className="learn-hero-title">{panel.heroTitle}</h2>
              <p className="learn-hero-copy">{panel.heroCopy}</p>

              <div className="learn-hero-actions">
                <button
                  type="button"
                  className="btn-cinematic learn-magnetic-btn"
                  onClick={() => navAction(panel.primaryTarget)}
                >
                  {panel.primaryLabel}
                  <ArrowRight size={18} />
                </button>
                <button
                  type="button"
                  className="btn-primary learn-magnetic-btn"
                  onClick={() => navAction(panel.secondaryTarget)}
                >
                  {panel.secondaryLabel}
                </button>
              </div>

              <div className="learn-progress-track">
                <div className="learn-progress-track__meta">
                  <span>Current rank</span>
                  <strong>{currentRank.title}</strong>
                </div>
                <div className="learn-progress-bar">
                  <span style={{ width: `${progressPercentage}%` }}></span>
                </div>
                <small>
                  {nextRank
                    ? `${xpToNext} XP left before ${nextRank.title}`
                    : "You have reached the highest mastery tier."}
                </small>
              </div>

              <div className="learn-chip-row">
                <span className="learn-chip">Context-first lessons</span>
                <span className="learn-chip">Interactive pronunciation</span>
                <span className="learn-chip">Elegant streak system</span>
                <span className="learn-chip">Culture + writing practice</span>
              </div>
            </article>

            <div className="learn-command-side">
              <article className="learn-glass-panel learn-stat-card">
                <span className="learn-stat-card__label">Darija vocabulary</span>
                <strong className="learn-stat-card__value">{learnedDarijaCount} words saved</strong>
                <p>Useful phrases tracked across daily situations and travel moments.</p>
              </article>

              <article className="learn-glass-panel learn-stat-card">
                <span className="learn-stat-card__label">Alphabet mastery</span>
                <strong className="learn-stat-card__value">{learnedLettersCount} letters known</strong>
                <p>Tifinagh recognition and sound memory growing with every practice loop.</p>
              </article>

              <article className="learn-glass-panel learn-stat-card">
                <span className="learn-stat-card__label">Platform completion</span>
                <strong className="learn-stat-card__value">{masteryPercent}% mastered</strong>
                <p>Your current mix of Darija recall, alphabet fluency, and mission momentum.</p>
              </article>
            </div>
          </section>

          <section className="learn-premium-grid">
            <article className="learn-glass-panel learn-feature-card learn-feature-card--darija">
              <div className="learn-feature-card__header">
                <div className="learn-signal">
                  <MessageCircleMore size={18} />
                </div>
                <span>Flagship experience</span>
              </div>
              <h3 className="learn-feature-card__title">Darija Studio</h3>
              <p className="learn-feature-card__copy">
                Conversation-led learning with street vocabulary, practical listening cues, and
                immersive Moroccan situations.
              </p>
              <div className="learn-feature-card__stats">
                <div className="learn-feature-card__stat">
                  <strong>{learnedDarijaCount}</strong>
                  <span>phrases known</span>
                </div>
                <div className="learn-feature-card__stat">
                  <strong>{stats.streak}</strong>
                  <span>days active</span>
                </div>
              </div>
              <button type="button" className="learn-inline-link" onClick={() => navAction("darija")}>
                Enter Darija Studio
                <ArrowRight size={16} />
              </button>
            </article>

            <article className="learn-glass-panel learn-feature-card learn-feature-card--tifinagh">
              <div className="learn-feature-card__header">
                <div className="learn-signal learn-signal--secondary">
                  <Compass size={18} />
                </div>
                <span>Cultural depth</span>
              </div>
              <h3 className="learn-feature-card__title">Tifinagh Lab</h3>
              <p className="learn-feature-card__copy">
                A refined alphabet trainer with sound cues, writing awareness, and a modern
                interface for Amazigh identity.
              </p>
              <div className="learn-feature-card__stats">
                <div className="learn-feature-card__stat">
                  <strong>{learnedLettersCount}</strong>
                  <span>letters tracked</span>
                </div>
                <div className="learn-feature-card__stat">
                  <strong>{unlockedAchievementsCount}</strong>
                  <span>badges unlocked</span>
                </div>
              </div>
              <button type="button" className="learn-inline-link" onClick={() => navAction("tifinagh")}>
                Open Tifinagh Lab
                <ArrowRight size={16} />
              </button>
            </article>

            <article className="learn-glass-panel learn-mission-panel">
              <div className="learn-section-heading">
                <div>
                  <span className="learn-section-eyebrow">Daily missions</span>
                  <h3>Small sessions that keep learning addictive.</h3>
                </div>
                <Target size={18} />
              </div>

              <div className="learn-mission-list">
                {missionList.map((mission) => (
                  <div key={mission.label} className="learn-mission-item">
                    <div className="learn-mission-meta">
                      <strong>{mission.label}</strong>
                      <span>{mission.detail}</span>
                    </div>
                    <div className="learn-mission-reward">{mission.reward}</div>
                    <div className="learn-mission-progress">
                      <span style={{ width: `${mission.progress}%` }}></span>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="learn-glass-panel learn-practice-panel">
              <div className="learn-section-heading">
                <div>
                  <span className="learn-section-eyebrow">Practice surfaces</span>
                  <h3>Micro-experiences tuned for rhythm and retention.</h3>
                </div>
                <Sparkles size={18} />
              </div>

              <div className="learn-practice-list">
                {practiceModes.map(({ icon: Icon, title, copy, action, target }) => (
                  <button
                    key={title}
                    type="button"
                    className="learn-practice-item"
                    onClick={() => navAction(target)}
                  >
                    <div className="learn-practice-item__icon">
                      <Icon size={18} />
                    </div>
                    <div className="learn-practice-item__body">
                      <strong>{title}</strong>
                      <span>{copy}</span>
                    </div>
                    <div className="learn-practice-item__cta">{action}</div>
                  </button>
                ))}
              </div>
            </article>

            <article className="learn-glass-panel learn-community-panel">
              <div className="learn-section-heading">
                <div>
                  <span className="learn-section-eyebrow">Community pulse</span>
                  <h3>A social layer that keeps progress visible and exciting.</h3>
                </div>
                <Users size={18} />
              </div>

              <div className="learn-leaderboard">
                {leaderboard.map((entry, index) => (
                  <div
                    key={`${entry.name}-${entry.xp}`}
                    className={`learn-leaderboard-item ${
                      entry.highlight ? "learn-leaderboard-item--active" : ""
                    }`}
                  >
                    <div className="learn-leaderboard-rank">{index + 1}</div>
                    <div className="learn-leaderboard-copy">
                      <strong>{entry.name}</strong>
                      <span>{entry.meta}</span>
                    </div>
                    <div className="learn-leaderboard-xp">{entry.xp} XP</div>
                  </div>
                ))}
              </div>
            </article>

            <article className="learn-glass-panel learn-profile-panel">
              <div className="learn-section-heading">
                <div>
                  <span className="learn-section-eyebrow">Profile and rewards</span>
                  <h3>Your premium passport into Moroccan language fluency.</h3>
                </div>
                <UserCircle2 size={18} />
              </div>

              <div className="learn-profile-summary">
                <div className="learn-profile-badge">{currentRank.level}</div>
                <div className="learn-profile-copy">
                  <strong>{currentRank.title}</strong>
                  <span>{nextRank ? `Next unlock: ${nextRank.title}` : "Top tier unlocked"}</span>
                </div>
              </div>

              <div className="learn-badge-grid">
                <div className="learn-badge-tile">
                  <span className="learn-badge-tile__value">{unlockedAchievementsCount}</span>
                  <span>achievements</span>
                </div>
                <div className="learn-badge-tile">
                  <span className="learn-badge-tile__value">{masteryPercent}%</span>
                  <span>mastery</span>
                </div>
                <div className="learn-badge-tile">
                  <span className="learn-badge-tile__value">{xpToNext}</span>
                  <span>XP to next</span>
                </div>
              </div>
            </article>
          </section>
        </main>
      </div>
    </div>
  );
}

export default MasterLearningHub;
