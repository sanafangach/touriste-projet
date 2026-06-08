// Verification tests for DATABASE PHASE 2 — STEP 1 correctness fixes.
//
// Covers:
//   1. Saved vocabulary deletion persists (DB + cache) and survives a sync.
//   2. syncProgressFromDb is authoritative (stale entries removed).
//   3. Mission resolution is database-driven (no hardcoded ids).
//   4. Write failures are logged and the cache is reverted (no silent swallow).

jest.mock("../services/api", () => ({
  __esModule: true,
  default: { get: jest.fn(), post: jest.fn(), delete: jest.fn() },
}));

// Mission list returned by GET /apprendre/missions (DB-owned mapping).
const MISSIONS = [
  { id: 101, track: "darija", mission_number: 1 },
  { id: 102, track: "darija", mission_number: 2 },
  { id: 201, track: "tifinagh", mission_number: 3 },
];

let api;
let progress;
let storage;

beforeEach(() => {
  jest.resetModules();
  localStorage.clear();
  // Authenticated user with id 7.
  localStorage.setItem("token", "test-token");
  localStorage.setItem("user", JSON.stringify({ id: 7 }));
  jest.spyOn(console, "error").mockImplementation(() => {});

  // Require everything from the SAME fresh module registry so the test and the
  // modules under test share one mocked `api`, and the cached mission map resets.
  api = require("../services/api").default;
  progress = require("./progress");
  storage = require("./storage");

  // Default: missions endpoint resolves to the DB-owned list.
  api.get.mockImplementation((url) => {
    if (url === "/apprendre/missions") return Promise.resolve({ data: MISSIONS });
    return Promise.resolve({ data: [] });
  });
});

afterEach(() => {
  console.error.mockRestore();
});

describe("Fix 3 — database-driven mission resolution", () => {
  test("getMissionId is empty before the map loads (no hardcoded ids)", () => {
    expect(progress.getMissionId("darija", 1)).toBeNull();
  });

  test("resolveMissionId loads the map from the API and resolves ids", async () => {
    expect(await progress.resolveMissionId("tifinagh", 3)).toBe(201);
    expect(progress.getMissionId("darija", 2)).toBe(102);
    expect(api.get).toHaveBeenCalledWith("/apprendre/missions");
  });

  test("mission map is fetched only once and cached", async () => {
    await progress.loadMissionMap();
    await progress.loadMissionMap();
    const calls = api.get.mock.calls.filter(([u]) => u === "/apprendre/missions");
    expect(calls).toHaveLength(1);
  });
});

describe("Fix 1 — saved vocabulary deletion persists and survives sync", () => {
  test("remove deletes by natural key (mission_id + content), not the DB id", async () => {
    api.post.mockResolvedValue({ data: {} });
    api.delete.mockResolvedValue({ data: { deleted: 1 } });

    const item = { id: "darija_1_salam", word: "salam", translation: "hello", track: "darija", missionNum: 1, type: "vocab" };
    await storage.saveVocabularyItem(item);
    expect(storage.getSavedVocabulary()).toHaveLength(1);

    await storage.removeVocabularyItem(item);

    // Deleted from cache...
    expect(storage.getSavedVocabulary()).toHaveLength(0);
    // ...and from DB via the natural-key endpoint.
    expect(api.delete).toHaveBeenCalledWith("/apprendre/saved", {
      data: { mission_id: 101, content: "salam" },
    });
  });

  test("deleted item does NOT reappear after syncSavedFromDb", async () => {
    api.post.mockResolvedValue({ data: {} });
    api.delete.mockResolvedValue({ data: { deleted: 1 } });

    const item = { id: "darija_1_salam", word: "salam", translation: "hello", track: "darija", missionNum: 1, type: "vocab" };
    await storage.saveVocabularyItem(item);
    await storage.removeVocabularyItem(item);

    // DB now returns the item with its real auto-increment id (different from client id).
    // Because identity is the natural key, the (still-deleted) item must not resurrect.
    api.get.mockImplementation((url) => {
      if (url === "/apprendre/saved") return Promise.resolve({ data: [] });
      if (url === "/apprendre/missions") return Promise.resolve({ data: MISSIONS });
      return Promise.resolve({ data: [] });
    });
    await storage.syncSavedFromDb();

    expect(storage.getSavedVocabulary()).toHaveLength(0);
  });

  test("isVocabularySaved keys on track+mission+word, stable across a sync", async () => {
    // DB sync returns the item with a server id that differs from the client id.
    api.get.mockImplementation((url) => {
      if (url === "/apprendre/saved") {
        return Promise.resolve({ data: [
          { id: 9999, content: "salam", translation: "hello", track: "darija", mission_number: 1, type: "vocab", category: null },
        ] });
      }
      if (url === "/apprendre/missions") return Promise.resolve({ data: MISSIONS });
      return Promise.resolve({ data: [] });
    });

    await storage.syncSavedFromDb();
    // Identity check uses the natural key, so it matches despite the server id.
    expect(storage.isVocabularySaved("darija", 1, "salam")).toBe(true);
  });
});

describe("Fix 2 — syncProgressFromDb is authoritative", () => {
  test("removes stale local completion keys that are absent from the DB", async () => {
    // Seed a stale completion that the DB does NOT know about.
    localStorage.setItem("apprendre_u7_darija_5_completed", "true");

    api.get.mockImplementation((url) => {
      if (url === "/apprendre/progress") {
        return Promise.resolve({ data: [
          { track: "darija", mission_number: 1, completed: true },
        ] });
      }
      if (url === "/apprendre/missions") return Promise.resolve({ data: MISSIONS });
      return Promise.resolve({ data: [] });
    });

    await progress.syncProgressFromDb();

    expect(progress.isMissionCompleted("darija", 1)).toBe(true);   // present in DB
    expect(progress.isMissionCompleted("darija", 5)).toBe(false);  // stale, removed
  });

  test("does not touch another user's scoped keys", async () => {
    localStorage.setItem("apprendre_u8_darija_3_completed", "true"); // other user

    api.get.mockImplementation((url) => {
      if (url === "/apprendre/progress") return Promise.resolve({ data: [] });
      if (url === "/apprendre/missions") return Promise.resolve({ data: MISSIONS });
      return Promise.resolve({ data: [] });
    });

    await progress.syncProgressFromDb();

    expect(localStorage.getItem("apprendre_u8_darija_3_completed")).toBe("true");
  });
});

describe("Fix 4 — write failures are logged and the cache is reverted", () => {
  test("failed save reverts the optimistic cache insert and rethrows", async () => {
    await progress.loadMissionMap();
    api.post.mockRejectedValue(new Error("500"));

    const item = { id: "darija_1_salam", word: "salam", translation: "hello", track: "darija", missionNum: 1, type: "vocab" };
    await expect(storage.saveVocabularyItem(item)).rejects.toThrow();

    expect(storage.getSavedVocabulary()).toHaveLength(0); // reverted
    expect(console.error).toHaveBeenCalled();              // logged, not swallowed
  });

  test("failed delete restores the removed item and rethrows", async () => {
    api.post.mockResolvedValue({ data: {} });
    const item = { id: "darija_1_salam", word: "salam", translation: "hello", track: "darija", missionNum: 1, type: "vocab" };
    await storage.saveVocabularyItem(item);

    api.delete.mockRejectedValue(new Error("network"));
    await expect(storage.removeVocabularyItem(item)).rejects.toThrow();

    expect(storage.getSavedVocabulary()).toHaveLength(1); // restored
    expect(console.error).toHaveBeenCalled();
  });

  test("failed favorite reverts the optimistic cache insert and rethrows", async () => {
    await progress.loadMissionMap();
    api.post.mockRejectedValue(new Error("500"));

    await expect(storage.favoriteMission("darija", 1)).rejects.toThrow();

    expect(storage.getFavoriteMissions()).toHaveLength(0);
    expect(console.error).toHaveBeenCalled();
  });
});
