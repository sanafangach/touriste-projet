import React, { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User } from "lucide-react";
import "./Chatbot.css";

const BubbleDotsIcon = () => (
  <svg width="28" height="28" viewBox="0 0 30 30" fill="none">
    <path d="M15 4C9 4 4 8.03 4 13c0 2.2.9 4.2 2.4 5.8L5 26l7-3c1 .26 2 .4 3 .4 6 0 11-4.03 11-9S21 4 15 4z" fill="white" fillOpacity="0.95"/>
    <circle cx="10.5" cy="13" r="1.5" fill="#f97316"/>
    <circle cx="15" cy="13" r="1.5" fill="#f97316"/>
    <circle cx="19.5" cy="13" r="1.5" fill="#f97316"/>
  </svg>
);

const Chatbot = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Bonjour ! 👋 Je suis votre assistant AMUDUX. Comment puis-je vous aider à découvrir le Maroc ?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // BOT RESPONSE
  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();

    // Salutations
    if (
      msg.includes("bonjour") ||
      msg.includes("salut") ||
      msg.includes("hello") ||
      msg.includes("مرحبا")
    ) {
      return "Bienvenue sur AMUDUX 🇲🇦✨ ! Je peux vous aider à découvrir le Maroc, trouver des hôtels, des activités ou apprendre des langues locales 😊";
    }

    // Villes
    if (msg.includes("ville") || msg.includes("destination") || msg.includes("où aller")) {
      return "Les villes populaires sont Marrakech, Agadir, Fès, Chefchaouen et Casablanca 🌆";
    }

    // Marrakech
    if (msg.includes("marrakech")) {
      return "Marrakech est une ville magnifique ! Ne manquez pas la place Jemaa el-Fna, les souks et les jardins 🌴";
    }

    // Agadir
    if (msg.includes("agadir")) {
      return "Agadir est parfaite pour la plage et le surf 🏄‍♂️☀️";
    }

    // Fès
    if (msg.includes("fès") || msg.includes("fes")) {
      return "Fès est la capitale spirituelle du Maroc 🕌. Visitez la médina, les tanneries et les souks !";
    }

    // Chefchaouen
    if (msg.includes("chefchaouen") || msg.includes("chaouen")) {
      return "Chefchaouen, la ville bleue 💙, est un endroit magique dans le Rif. Un must-see !";
    }

    // Hôtels
    if (msg.includes("hotel") || msg.includes("hébergement") || msg.includes("logement")) {
      return "Nous affichons les hôtels via Google Maps 🗺️. Cliquez sur 'Réserver' pour aller vers leur site officiel ou WhatsApp.";
    }

    // Activités
    if (msg.includes("activité") || msg.includes("faire") || msg.includes("visiter")) {
      return "Vous pouvez faire : désert 🐪, surf 🏄, quad, randonnée ⛰️ et visites culturelles.";
    }

    // Localisation
    if (msg.includes("où je suis") || msg.includes("localisation") || msg.includes("map")) {
      return "Nous utilisons Google Maps pour afficher votre position et les lieux autour de vous 📍";
    }

    // Packs
    if (msg.includes("pack") || msg.includes("voyage") || msg.includes("plan")) {
      return "Nous proposons des packs 1 jour ou 1 semaine avec itinéraire détaillé étape par étape 📅";
    }

    // Budget
    if (msg.includes("prix") || msg.includes("budget") || msg.includes("combien")) {
      return "Le Maroc est abordable 💸. Le budget dépend de vos choix d'hôtels et d'activités.";
    }

    // Darija
    if (msg.includes("darija")) {
      return "Vous pouvez apprendre la Darija 🇲🇦 avec audio et traduction (FR / EN / AR). Exemple : 'Salam' = Bonjour 🎧";
    }

    // Tifinagh
    if (msg.includes("tifinagh")) {
      return "Le Tifinagh est l'alphabet Amazigh ⵣ. Vous pouvez l'apprendre avec audio et exercices interactifs.";
    }

    // Amazigh / Tachlhit
    if (msg.includes("tachlhit") || msg.includes("amazigh")) {
      return "Le Tachlhit est une langue amazighe parlée au sud du Maroc 🏔️. Disponible avec audio.";
    }

    // Traduction / Langue
    if (msg.includes("langue") || msg.includes("traduction") || msg.includes("language")) {
      return "Le site est disponible en Français 🇫🇷, Anglais 🇬🇧 et Arabe 🇲🇦";
    }

    // Mode sombre
    if (msg.includes("mode sombre") || msg.includes("dark") || msg.includes("clair")) {
      return "Vous pouvez activer le mode sombre ou clair dans les paramètres ⚙️🌙☀️";
    }

    // Compte
    if (msg.includes("compte") || msg.includes("inscription") || msg.includes("login")) {
      return "Créez un compte pour sauvegarder votre progression et vos préférences 👤";
    }

    // Admin
    if (msg.includes("admin")) {
      return "L'admin kayselem alik hhhh ⚙️";
    }

    // Réservation
    if (msg.includes("réserver") || msg.includes("reservation")) {
      return "Nous ne gérons pas les réservations. Vous serez redirigé vers le site officiel ou WhatsApp de l'hôtel 🔗";
    }

    // Restaurants
    if (msg.includes("restaurant") || msg.includes("manger")) {
      return "Découvrez les meilleurs restaurants via Google Maps 🍽️";
    }

    // Transport
    if (msg.includes("transport") || msg.includes("déplacement")) {
      return "Vous pouvez utiliser taxi 🚕, bus 🚌 ou location de voiture 🚗";
    }

    // Météo
    if (msg.includes("météo") || msg.includes("climat")) {
      return "Le Maroc a un climat ensoleillé ☀️, surtout à Agadir et Marrakech.";
    }

    // Conseils
    if (msg.includes("conseil") || msg.includes("astuce")) {
      return "Astuce 💡 : Apprenez quelques mots en Darija pour mieux communiquer avec les locaux !";
    }

    // Fallback
    return "Je peux vous aider avec : villes, hôtels, activités, packs, langues ou navigation 🧭😊";
  };

  // SEND MESSAGE
  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    const botReply = getBotResponse(inputValue);

    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        text: botReply,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 700);
  };

  // ENTER KEY
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  // QUICK BUTTONS
  const handleQuick = (text) => {
    const userMessage = {
      id: Date.now(),
      text,
      isBot: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    const botReply = getBotResponse(text);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: botReply, isBot: true, timestamp: new Date() },
      ]);
      setIsTyping(false);
    }, 700);
  };

  // CLEAR CHAT
  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: "Bonjour ! 👋 Je suis votre assistant AMUDUX. Comment puis-je vous aider à découvrir le Maroc ?",
        isBot: true,
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="chatbot-container">
      {/* TOGGLE BUTTON */}
      {!isOpen && (
        <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
          <BubbleDotsIcon />
        </button>
      )}

      {/* CHAT WINDOW */}
      {isOpen && (
        <div className="chatbot-window">

          {/* HEADER */}
          <div className="chatbot-header">
            <div className="chatbot-header-left">
              <div className="chatbot-header-avatar">
                <Bot size={20} />
              </div>
              <div className="chatbot-header-info">
                <div className="chatbot-header-title">Assistant AMUDUX</div>
                <div className="chatbot-header-status">
                  <span className="chatbot-status-dot"></span>
                  En ligne
                </div>
              </div>
            </div>
            <div className="chatbot-header-actions">
              <button onClick={clearChat} className="chatbot-clear">
                Effacer
              </button>
              <button onClick={() => setIsOpen(false)} className="chatbot-close">
                <X size={16} />
              </button>
            </div>
          </div>

          {/* MESSAGES */}
          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chatbot-message ${msg.isBot ? "bot" : "user"}`}
              >
                <div className="chatbot-message-avatar">
                  {msg.isBot ? <Bot size={14} /> : <User size={14} />}
                </div>
                <div className="chatbot-message-content">
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}

            {/* TYPING INDICATOR */}
            {isTyping && (
              <div className="chatbot-message bot typing">
                <div className="chatbot-message-avatar">
                  <Bot size={14} />
                </div>
                <div className="typing-bubble">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* QUICK SUGGESTIONS */}
          <div className="chatbot-suggestions">
            <button onClick={() => handleQuick("Marrakech")}>🌴 Marrakech</button>
            <button onClick={() => handleQuick("hotel")}>🏨 Hôtels</button>
            <button onClick={() => handleQuick("activité")}>🎯 Activités</button>
            <button onClick={() => handleQuick("prix")}>💰 Prix</button>
          </div>

          {/* INPUT */}
          <div className="chatbot-input">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Écrire un message..."
            />
            <button onClick={handleSend}>
              <Send size={16} />
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default Chatbot;