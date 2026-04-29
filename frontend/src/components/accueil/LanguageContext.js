import React, { createContext, useContext, useState, useEffect } from "react";

const translations = {
  FR: {
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
    heroTitle: "Découvrez de Belles Destinations",
    heroSubtitle: "Voyagez, Explorez et Vivez des moments inoubliables",
    exploreBtn: "Explorer",
    topPlaces: "TOP PLACES",
    popularDestinations: "Destinations Populaires",
    viewAll: "Voir tout",
    chatbotGreeting: "Bonjour ! 👋 Je suis votre assistant AMUDUX. Comment puis-je vous aider à découvrir le Maroc ?",
    chatbotPlaceholder: "Écrire un message...",
    chatbotClear: "Effacer",
    chatbotOnline: "En ligne",
    chatbotAssistant: "Assistant AMUDUX",
    chip1: "🌴 Marrakech",
    chip2: "🏨 Hôtels",
    chip3: "🎯 Activités",
    chip4: "💰 Prix",
  },

  EN: {
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
    heroTitle: "Discover Beautiful Destinations",
    heroSubtitle: "Travel, Explore and Live unforgettable moments",
    exploreBtn: "Explore Now",
    topPlaces: "TOP PLACES",
    popularDestinations: "Popular Destinations",
    viewAll: "View All",
    chatbotGreeting: "Hello! 👋 I'm your AMUDUX assistant. How can I help you discover Morocco?",
    chatbotPlaceholder: "Write a message...",
    chatbotClear: "Clear",
    chatbotOnline: "Online",
    chatbotAssistant: "AMUDUX Assistant",
    chip1: "🌴 Marrakech",
    chip2: "🏨 Hotels",
    chip3: "🎯 Activities",
    chip4: "💰 Prices",
  },

  AR: {
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
    heroTitle: "اكتشف وجهات رائعة",
    heroSubtitle: "سافر، استكشف وعش لحظات لا تُنسى",
    exploreBtn: "استكشف الآن",
    topPlaces: "أفضل الأماكن",
    popularDestinations: "الوجهات الشعبية",
    viewAll: "عرض الكل",
    chatbotGreeting: "مرحباً! 👋 أنا مساعدك في AMUDUX. كيف يمكنني مساعدتك في اكتشاف المغرب؟",
    chatbotPlaceholder: "اكتب رسالة...",
    chatbotClear: "مسح",
    chatbotOnline: "متصل",
    chatbotAssistant: "مساعد AMUDUX",
    chip1: "🌴 مراكش",
    chip2: "🏨 الفنادق",
    chip3: "🎯 الأنشطة",
    chip4: "💰 الأسعار",
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // 🔥 Récupérer la langue sauvegardée ou utiliser FR par défaut
  const [lang, setLang] = useState(() => {
    const savedLang = localStorage.getItem("app-language");
    return savedLang || "FR";
  });

  const t = (key) => translations[lang][key] || key;
  const isRTL = lang === "AR";

  // 🔥 Sauvegarder la langue quand elle change
  useEffect(() => {
    localStorage.setItem("app-language", lang);
  }, [lang]);

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