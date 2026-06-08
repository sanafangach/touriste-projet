// src/hooks/useAuth.js
// Thin wrapper — delegates to the global AuthContext so all components
// share the same user state and token.
export { useAuth } from '../context/AuthContext';