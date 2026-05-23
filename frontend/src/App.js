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

import Menu from "./components/accueil/Menu";
import Home from "./components/accueil/home";
import Card from "./components/pages/card";
import Destination from "./components/pages/destination";
import Languages from "./components/pages/languages";
import Login from "./components/pages/login";
import Footer from "./components/accueil/Footer"
import Chatbot from "./components/Chatbot/Chatbot";
import EmailVerification from './components/auth/EmailVerification';
import VerifyCode from './components/auth/VerifyCode';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import GoogleCallback from './components/auth/GoogleCallback';
import ProtectedRoute from "./components/pages/ProtectedRoute";
import Saved from "./components/pages/saved";
import AdminDashboard from "./components/pages/adminDashboard";
import Pack from "./components/pages/pack";

import Profile from "./components/pages/Profile";

import Agadir from "./components/pages/destinations/Agadir";
import Casablanca from "./components/pages/destinations/Casablanca";
import Marrakech from "./components/pages/destinations/Marrakech";
import Fes from "./components/pages/destinations/Fes";
import Chefchaouen from "./components/pages/destinations/Chefchaouen";
import Essaouira from "./components/pages/destinations/Essaouira";

function AppContent() {
  const location = useLocation();

    React.useEffect(() => {
        const savedDark = localStorage.getItem("app-dark-mode") === "true";
        document.documentElement.classList.toggle("dark", savedDark);
    }, []);

    const noMenuPages = ['/login', '/register', '/admin', '/forgot-password', '/reset-password', '/verify-code', '/auth/google/callback', '/auth/registration-success'];
    const noChatbotPages = ['/login', '/register', '/admin', '/forgot-password', '/reset-password', '/verify-code', '/auth/google/callback', '/auth/registration-success'];

  const showMenu = !noMenuPages.includes(location.pathname);
  const showChatbot = !noChatbotPages.includes(location.pathname);


  return (
    <>
      {showMenu && <Menu /> }

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card" element={<Card />} />
        <Route path="/destination" element={<Destination />} />
        <Route path="/languages" element={<Languages />} />

        <Route path="/destination/agadir" element={<Agadir />} />
        <Route path="/destination/casablanca" element={<Casablanca />} />
        <Route path="/destination/marrakech" element={<Marrakech />} />
        <Route path="/destination/fes" element={<Fes />} />
        <Route path="/destination/chefchaouen" element={<Chefchaouen />} />
        <Route path="/destination/essaouira" element={<Essaouira />} />

                {/* Login page */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Login />} />
                <Route path="/profile" element={<Profile />} />


                {/* Protected routes */}
                <Route path="/saved" element={
                    <ProtectedRoute>
                        <Saved />
                    </ProtectedRoute>
                } />

                {/* Admin route */}
                <Route path="/admin" element={
                    <ProtectedRoute requireAdmin={true}>
                        <AdminDashboard />
                    </ProtectedRoute>
                } />
                

                {/* Auth routes */}
                <Route path="/verify-email" element={<EmailVerification />} />
                <Route path="/verify-code" element={<VerifyCode />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/auth/google/callback" element={<GoogleCallback />} />
                <Route path="/auth/registration-success" element={<Navigate to="/" replace />} />



                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>

            {showChatbot && <Chatbot /> }
            {showChatbot && <Footer /> }
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
