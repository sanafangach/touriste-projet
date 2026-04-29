import React, { createContext, useContext, useState } from "react";

const translations = {
  FR: {
    // Navigation
    home: "Home",
    card: "Card",
    destination: "Destination",
    languages: "Learning Darija",
    pack: "Pack",
    saved: "Sauvegardés",
    login: "Connexion",
    darkMode: "Mode Sombre",
    lightMode: "Mode Clair",
    translation: "Traduction",
    settings: "Paramètres",

    // Home Hero
    heroTitle: "Découvrez de Belles Destinations",
    heroSubtitle: "Voyagez, Explorez et Vivez des moments inoubliables",
    exploreBtn: "Explorer",

    // Popular Destinations
    topPlaces: "TOP PLACES",
    popularDestinations: "Destinations Populaires",
    viewAll: "Voir tout",

    // Chatbot
    chatbotGreeting: "Bonjour ! 👋 Je suis votre assistant AMUDUX. Comment puis-je vous aider à découvrir le Maroc ?",
    chatbotPlaceholder: "Écrire un message...",
    chatbotClear: "Effacer",
    chatbotOnline: "En ligne",
    chatbotAssistant: "Assistant AMUDUX",

    // Quick chips
    chip1: "🌴 Marrakech",
    chip2: "🏨 Hôtels",
    chip3: "🎯 Activités",
    chip4: "💰 Prix",
  },

  EN: {
    // Navigation
    home: "Home",
    card: "Card",
    destination: "Destination",
    languages: "Learning Darija",
    pack: "Pack",
    saved: "Saved",
    login: "Login",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    translation: "Translation",
    settings: "Settings",

    // Home Hero
    heroTitle: "Discover Beautiful Destinations",
    heroSubtitle: "Travel, Explore and Live unforgettable moments",
    exploreBtn: "Explore Now",

    // Popular Destinations
    topPlaces: "TOP PLACES",
    popularDestinations: "Popular Destinations",
    viewAll: "View All",

    // Chatbot
    chatbotGreeting: "Hello! 👋 I'm your AMUDUX assistant. How can I help you discover Morocco?",
    chatbotPlaceholder: "Write a message...",
    chatbotClear: "Clear",
    chatbotOnline: "Online",
    chatbotAssistant: "AMUDUX Assistant",

    // Quick chips
    chip1: "🌴 Marrakech",
    chip2: "🏨 Hotels",
    chip3: "🎯 Activities",
    chip4: "💰 Prices",
  },

  AR: {
    // Navigation
    home: "الرئيسية",
    card: "البطاقة",
    destination: "الوجهات",
    languages: "تعلم الدارجة",
    pack: "الباقات",
    saved: "المحفوظات",
    login: "تسجيل الدخول",
    darkMode: "الوضع الداكن",
    lightMode: "الوضع الفاتح",
    translation: "الترجمة",
    settings: "الإعدادات",

    // Home Hero
    heroTitle: "اكتشف وجهات رائعة",
    heroSubtitle: "سافر، استكشف وعش لحظات لا تُنسى",
    exploreBtn: "استكشف الآن",

    // Popular Destinations
    topPlaces: "أفضل الأماكن",
    popularDestinations: "الوجهات الشعبية",
    viewAll: "عرض الكل",

    // Chatbot
    chatbotGreeting: "مرحباً! 👋 أنا مساعدك في AMUDUX. كيف يمكنني مساعدتك في اكتشاف المغرب؟",
    chatbotPlaceholder: "اكتب رسالة...",
    chatbotClear: "مسح",
    chatbotOnline: "متصل",
    chatbotAssistant: "مساعد AMUDUX",

    // Quick chips
    chip1: "🌴 مراكش",
    chip2: "🏨 الفنادق",
    chip3: "🎯 الأنشطة",
    chip4: "💰 الأسعار",
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("FR");

  const t = (key) => translations[lang][key] || key;
  const isRTL = lang === "AR";

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRTL }}>
      <div dir={isRTL ? "rtl" : "ltr"}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export default LanguageContext;