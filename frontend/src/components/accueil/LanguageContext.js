import React, { createContext, useContext, useState, useEffect } from "react";

const translations = {
  FR: {
    home: "Home",
    card: "Carte",
    destination: "Destination",
    languages: "Apprendre Darija",
    pack: "Pack",
    saved: "Sauvegardes",
    login: "Connexion",
    darkMode: "Mode Sombre",
    lightMode: "Mode Clair",
    translation: "Traduction",
    settings: "Parametres",
    heroTitle: "Decouvrez de Belles Destinations",
    heroSubtitle: "Voyagez, Explorez et Vivez des moments inoubliables",
    exploreBtn: "Explorer",
    topPlaces: "TOP PLACES",
    popularDestinations: "Destinations Populaires",
    viewAll: "Voir tout",
    chatbotGreeting: "Bonjour ! Je suis votre assistant AMUDUX. Comment puis-je vous aider a decouvrir le Maroc ?",
    chatbotPlaceholder: "Ecrire un message...",
    chatbotClear: "Effacer",
    chatbotOnline: "En ligne",
    chatbotAssistant: "Assistant AMUDUX",
    chip1: "Marrakech",
    chip2: "Hotels",
    chip3: "Activites",
    chip4: "Prix",
    cardTitle: "Carte des Destinations",
    cardSubtitle: "Destinations proches de vous",
    locating: "Localisation en cours...",
    locateMe: "Ma position",
    locError: "Geolocalisation refusee. Vue sur le Maroc.",
    searchPlaceholder: "Rechercher une ville, un lieu...",
    radiusLabel: "Rayon",
    resultsNear: "resultats a proximite",
    noResults: "Aucune destination trouvee",
    explore: "Decouvrir",
    yourPosition: "Votre position",
    rating: "Note",
    distance: "Distance",
    duration: "Duree",
    catAll: "Tous",
    catBeach: "Plage",
    catCulture: "Culture",
    catCity: "Ville",
    catDesert: "Desert",
    catNature: "Nature",
    catHeritage: "Patrimoine",
    catMountain: "Montagne",
    catActivities: "Activites",
  },

  EN: {
    home: "Home",
    card: "Map",
    destination: "Destination",
    languages: "Learn Darija",
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
    chatbotGreeting: "Hello! I'm your AMUDUX assistant. How can I help you discover Morocco?",
    chatbotPlaceholder: "Write a message...",
    chatbotClear: "Clear",
    chatbotOnline: "Online",
    chatbotAssistant: "AMUDUX Assistant",
    chip1: "Marrakech",
    chip2: "Hotels",
    chip3: "Activities",
    chip4: "Prices",
    cardTitle: "Destinations Map",
    cardSubtitle: "Destinations near you",
    locating: "Locating...",
    locateMe: "My location",
    locError: "Geolocation denied. Showing Morocco.",
    searchPlaceholder: "Search a city, place...",
    radiusLabel: "Radius",
    resultsNear: "results nearby",
    noResults: "No destinations found",
    explore: "Explore",
    yourPosition: "Your position",
    rating: "Rating",
    distance: "Distance",
    duration: "Duration",
    catAll: "All",
    catBeach: "Beach",
    catCulture: "Culture",
    catCity: "City",
    catDesert: "Desert",
    catNature: "Nature",
    catHeritage: "Heritage",
    catMountain: "Mountain",
    catActivities: "Activities",
  },

  AR: {
    home: "\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629",
    card: "\u0627\u0644\u062e\u0631\u064a\u0637\u0629",
    destination: "\u0627\u0644\u0648\u062c\u0647\u0627\u062a",
    languages: "\u062a\u0639\u0644\u0645 \u0627\u0644\u062f\u0627\u0631\u062c\u0629",
    pack: "\u0627\u0644\u0628\u0627\u0642\u0627\u062a",
    saved: "\u0627\u0644\u0645\u062d\u0641\u0648\u0638\u0627\u062a",
    login: "\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644",
    darkMode: "\u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u062f\u0627\u0643\u0646",
    lightMode: "\u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0641\u0627\u062a\u062d",
    translation: "\u0627\u0644\u062a\u0631\u062c\u0645\u0629",
    settings: "\u0627\u0644\u0625\u0639\u062f\u0627\u062f\u0627\u062a",
    heroTitle: "\u0627\u0643\u062a\u0634\u0641 \u0648\u062c\u0647\u0627\u062a \u0631\u0627\u0626\u0639\u0629",
    heroSubtitle: "\u0633\u0627\u0641\u0631\u060c \u0627\u0633\u062a\u0643\u0634\u0641 \u0648\u0639\u0634 \u0644\u062d\u0638\u0627\u062a \u0644\u0627 \u062a\u064f\u0646\u0633\u0649",
    exploreBtn: "\u0627\u0633\u062a\u0643\u0634\u0641 \u0627\u0644\u0622\u0646",
    topPlaces: "\u0623\u0641\u0636\u0644 \u0627\u0644\u0623\u0645\u0627\u0643\u0646",
    popularDestinations: "\u0627\u0644\u0648\u062c\u0647\u0627\u062a \u0627\u0644\u0634\u0639\u0628\u064a\u0629",
    viewAll: "\u0639\u0631\u0636 \u0627\u0644\u0643\u0644",
    chatbotGreeting: "\u0645\u0631\u062d\u0628\u0627! \u0623\u0646\u0627 \u0645\u0633\u0627\u0639\u062f\u0643 \u0641\u064a AMUDUX.",
    chatbotPlaceholder: "\u0627\u0643\u062a\u0628 \u0631\u0633\u0627\u0644\u0629...",
    chatbotClear: "\u0645\u0633\u062d",
    chatbotOnline: "\u0645\u062a\u0635\u0644",
    chatbotAssistant: "\u0645\u0633\u0627\u0639\u062f AMUDUX",
    chip1: "\u0645\u0631\u0627\u0643\u0634",
    chip2: "\u0627\u0644\u0641\u0646\u0627\u062f\u0642",
    chip3: "\u0627\u0644\u0623\u0646\u0634\u0637\u0629",
    chip4: "\u0627\u0644\u0623\u0633\u0639\u0627\u0631",
    cardTitle: "\u062e\u0631\u064a\u0637\u0629 \u0627\u0644\u0648\u062c\u0647\u0627\u062a",
    cardSubtitle: "\u0627\u0644\u0648\u062c\u0647\u0627\u062a \u0627\u0644\u0642\u0631\u064a\u0628\u0629 \u0645\u0646\u0643",
    locating: "\u062c\u0627\u0631\u064a\u064b \u062a\u062d\u062f\u064a\u062f \u0627\u0644\u0645\u0648\u0642\u0639...",
    locateMe: "\u0645\u0648\u0642\u0639\u064a",
    locError: "\u062a\u0645 \u0631\u0641\u0636 \u0627\u0644\u0645\u0648\u0642\u0639. \u0639\u0631\u0636 \u0627\u0644\u0645\u063a\u0631\u0628.",
    searchPlaceholder: "\u0627\u0628\u062d\u062b \u0639\u0646 \u0645\u062f\u064a\u0646\u0629 \u0623\u0648 \u0645\u0643\u0627\u0646...",
    radiusLabel: "\u0627\u0644\u0646\u0637\u0627\u0642",
    resultsNear: "\u0646\u062a\u064a\u062c\u0629 \u0642\u0631\u064a\u0628\u0629",
    noResults: "\u0644\u0627 \u062a\u0648\u062c\u062f \u0648\u062c\u0647\u0627\u062a",
    explore: "\u0627\u0633\u062a\u0643\u0634\u0641",
    yourPosition: "\u0645\u0648\u0642\u0639\u0643",
    rating: "\u0627\u0644\u062a\u0642\u064a\u064a\u0645",
    distance: "\u0627\u0644\u0645\u0633\u0627\u0641\u0629",
    duration: "\u0627\u0644\u0645\u062f\u0629",
    catAll: "\u0627\u0644\u0643\u0644",
    catBeach: "\u0634\u0627\u0637\u0626",
    catCulture: "\u062b\u0642\u0627\u0641\u0629",
    catCity: "\u0645\u062f\u064a\u0646\u0629",
    catDesert: "\u0635\u062d\u0631\u0627\u0621",
    catNature: "\u0637\u0628\u064a\u0639\u0629",
    catHeritage: "\u062a\u0631\u0627\u062b",
    catMountain: "\u062c\u0628\u0627\u0644",
    catActivities: "\u0623\u0646\u0634\u0637\u0629",
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    const savedLang = localStorage.getItem("app-language");
    return savedLang || "FR";
  });

  const t = (key) => translations[lang][key] || key;
  const isRTL = lang === "AR";

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