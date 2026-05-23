// App.js

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate
} from "react-router-dom";

import { LanguageProvider } from "./components/accueil/LanguageContext";
import { AuthProvider } from "./context/AuthContext";

import ProtectedRoute from "./components/pages/ProtectedRoute";

import Menu from "./components/accueil/Menu";
import Home from "./components/accueil/Home";
import Card from "./components/pages/card";
import Destination from "./components/pages/destination";
import Languages from "./components/pages/languages";
import Login from "./components/pages/login";
import Saved from "./components/pages/saved";
import Chatbot from "./components/Chatbot/Chatbot";
import AdminDashboard from "./components/pages/adminDashboard";

import EmailVerification from "./components/auth/EmailVerification";
import VerifyCode from "./components/auth/VerifyCode";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";

// ✅ Generic Dynamic City Page
import CityDetail from "./components/pages/destinations/CityDetail";

function AppContent() {
  const location = useLocation();

  const noMenuPages = [
    "/login",
    "/admin",
    "/forgot-password",
    "/reset-password",
    "/verify-code"
  ];

  const noChatbotPages = [
    "/login",
    "/admin",
    "/forgot-password",
    "/reset-password",
    "/verify-code"
  ];

  const showMenu = !noMenuPages.includes(location.pathname);

  const showChatbot = !noChatbotPages.includes(location.pathname);

  return (
    <>
      {showMenu && <Menu />}

      <Routes>
        {/* MAIN ROUTES */}

        <Route path="/" element={<Home />} />

        <Route path="/card" element={<Card />} />

        <Route
          path="/destination"
          element={<Destination />}
        />

        <Route
          path="/languages"
          element={<Languages />}
        />

        {/* ✅ DYNAMIC CITY ROUTE */}

        <Route
          path="/destination/:slug"
          element={<CityDetail />}
        />

        {/* LOGIN */}

        <Route path="/login" element={<Login />} />

        {/* PROTECTED */}

        <Route
          path="/saved"
          element={
            <ProtectedRoute>
              <Saved />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* AUTH */}

        <Route
          path="/verify-email"
          element={<EmailVerification />}
        />

        <Route
          path="/verify-code"
          element={<VerifyCode />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        {/* FALLBACK */}

        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>

      {showChatbot && <Chatbot />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <AppContent />
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;