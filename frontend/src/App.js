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
import Saved from "./components/pages/saved";
import Chatbot from "./components/Chatbot/Chatbot";
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

  const hideMenuPages = ["/login", "/admin"];
  const showMenu = !hideMenuPages.includes(location.pathname);

  return (
    <>
      {showMenu && <Menu />}

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

        <Route path="/login" element={<Login />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/saved" element={<Saved />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
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
