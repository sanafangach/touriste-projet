import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import { LanguageProvider } from "./components/accueil/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";

import Menu from "./components/accueil/Menu";
import Footer from "./components/accueil/Footer";

import Home from "./components/accueil/home";
import Card from "./components/pages/card";
import Destination from "./components/pages/destination";
import Languages from "./components/pages/languages";
import Login from "./components/pages/login";
import Chatbot from "./components/Chatbot/Chatbot";

import EmailVerification from "./components/auth/EmailVerification";
import VerifyCode from "./components/auth/VerifyCode";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import GoogleCallback from "./components/auth/GoogleCallback";

import ProtectedRoute from "./components/pages/ProtectedRoute";
import Saved from "./components/pages/favorite";
import AdminDashboard from "./pageadmin/AdminDashboard";
import Pack from "./components/pages/pack";
import Profile from "./components/pages/Profile";

import Commentaire from "./components/accueil/Commentaire";
import CityDetail from "./components/pages/destinations/Citydetail";

function AppContent() {
  const location = useLocation();

  React.useEffect(() => {
    const savedDark = localStorage.getItem("app-dark-mode") === "true";
    document.documentElement.classList.toggle("dark", savedDark);
  }, []);

  // pages where menu/chatbot/footer should NOT appear
  const noMenuPages = [
    "/login",
    "/register",
    "/admin",
    "/forgot-password",
    "/reset-password",
    "/verify-code",
    "/auth/google/callback",
    "/auth/registration-success",
  ];

  const noChatbotPages =  [...noMenuPages];
  const noFooterPages =  [...noMenuPages];

  const showFooter = !noFooterPages.includes(location.pathname);
  const showMenu = !noMenuPages.includes(location.pathname);
  const showChatbot = !noChatbotPages.includes(location.pathname);

  const isHome = location.pathname === "/";

  return (
    <>
      {/* MENU */}
      {showMenu && <Menu />}

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card" element={<Card />} />
        <Route path="/destination" element={<Destination />} />
        
        <Route path="/languages/*" element={<Languages />} />
        <Route path="/destination/:slug" element={<CityDetail />} />
        

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/pack" element={<Pack />} />

        <Route
          path="/saved"
          element={
            <ProtectedRoute>
              <Saved />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/auth/google/callback" element={<GoogleCallback />} />

        <Route
          path="/auth/registration-success"
          element={<Navigate to="/" replace />}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* COMMENTAIRE → ONLY HOME */}
      {isHome && <Commentaire />}

      {/* CHATBOT */}
      {showChatbot && <Chatbot />}

      {/* FOOTER */}
      {showFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <FavoritesProvider>
          <Router>
            <AppContent />
          </Router>
        </FavoritesProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;