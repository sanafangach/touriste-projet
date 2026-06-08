// Returns a stable per-user namespace for localStorage keys so that learning
// progress, saved vocabulary, favorites and revision data never leak between
// different accounts that log in on the same browser.
//
// Scoped by user.id (stable, set by AuthContext on login). Falls back to
// "guest" when no user is authenticated.
export function getUserScope() {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return "guest";
    const user = JSON.parse(raw);
    return user?.id ? `u${user.id}` : "guest";
  } catch {
    return "guest";
  }
}
