import React from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from "./components/accueil/LanguageContext";
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from "./components/pages/ProtectedRoute";

import Menu from "./components/accueil/Menu";
import Home from "./components/accueil/home";
import Card from "./components/pages/card";
import Destination from "./components/pages/destination";
import Languages from "./components/pages/languages";
import Login from "./components/pages/login";
import Saved from "./components/pages/saved";
import Chatbot from "./components/Chatbot/Chatbot";
import AdminDashboard from "./components/pages/adminDashboard";

function AppContent() {
    const location = useLocation();
    
    const noMenuPages = ['/login', '/admin'];
    const noChatbotPages = ['/login', '/admin'];
    const showMenu = !noMenuPages.includes(location.pathname);
    const showChatbot = !noChatbotPages.includes(location.pathname);

    return (
        <>
            {showMenu && <Menu />}
            
            <Routes>
                <Route path="/login" element={<Login />} />
                
                <Route path="/" element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                } />
                <Route path="/card" element={
                    <ProtectedRoute>
                        <Card />
                    </ProtectedRoute>
                } />
                <Route path="/destination" element={
                    <ProtectedRoute>
                        <Destination />
                    </ProtectedRoute>
                } />
                <Route path="/languages" element={
                    <ProtectedRoute>
                        <Languages />
                    </ProtectedRoute>
                } />
                <Route path="/saved" element={
                    <ProtectedRoute>
                        <Saved />
                    </ProtectedRoute>
                } />
                
                <Route path="/admin" element={
                    <ProtectedRoute requireAdmin={true}>
                        <AdminDashboard />
                    </ProtectedRoute>
                } />
            </Routes>

            {showChatbot && <Chatbot />}
        </>
    );
}

function App() {
    return (
        <AuthProvider>
            <LanguageProvider>
                <AppContent />
            </LanguageProvider>
        </AuthProvider>
    );
}

export default App;