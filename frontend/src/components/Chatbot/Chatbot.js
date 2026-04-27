import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Bonjour ! 👋 Je suis votre assistant virtuel. Comment puis-je vous aider aujourd'hui ?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const getBotResponse = (userMessage) => {
  const msg = userMessage.toLowerCase();

  // 👋 Salutations
  if (
    msg.includes('bonjour') ||
    msg.includes('salut') ||
    msg.includes('hello') ||
    msg.includes('مرحبا')
  ) {
    return "Bienvenue sur AMUDUX 🇲🇦✨ ! Je peux vous aider à découvrir le Maroc, trouver des hôtels, des activités ou apprendre des langues locales 😊";
  }

  // 🏙️ Villes
  if (
    msg.includes('ville') ||
    msg.includes('destination') ||
    msg.includes('où aller')
  ) {
    return "Les villes populaires sont Marrakech, Agadir, Fès, Chefchaouen et Casablanca 🌆";
  }

  // 📍 Marrakech
  if (msg.includes('marrakech')) {
    return "Marrakech est une ville magnifique ! Ne manquez pas :contentReference[oaicite:0]{index=0}, les souks et les jardins 🌴";
  }

  // 🏖️ Agadir
  if (msg.includes('agadir')) {
    return "Agadir est parfaite pour la plage et le surf 🏄‍♂️☀️";
  }

  // 🏨 Hôtels
  if (
    msg.includes('hotel') ||
    msg.includes('hébergement') ||
    msg.includes('logement')
  ) {
    return "Nous affichons les hôtels via Google Maps 🗺️. Cliquez sur 'Réserver' pour aller vers leur site officiel ou WhatsApp.";
  }

  // 🎯 Activités
  if (
    msg.includes('activité') ||
    msg.includes('faire') ||
    msg.includes('visiter')
  ) {
    return "Vous pouvez faire : désert 🐪, surf 🏄, quad, randonnée ⛰️ et visites culturelles.";
  }

  // 🗺️ Localisation
  if (
    msg.includes('où je suis') ||
    msg.includes('localisation') ||
    msg.includes('map')
  ) {
    return "Nous utilisons Google Maps pour afficher votre position et les lieux autour de vous 📍";
  }

  // 📅 Packs
  if (
    msg.includes('pack') ||
    msg.includes('voyage') ||
    msg.includes('plan')
  ) {
    return "Nous proposons des packs 1 jour ou 1 semaine avec itinéraire détaillé étape par étape 📅";
  }

  // 💰 Budget
  if (
    msg.includes('prix') ||
    msg.includes('budget') ||
    msg.includes('combien')
  ) {
    return "Le Maroc est abordable 💸. Le budget dépend de vos choix d’hôtels et d’activités.";
  }

  // 🧠 Apprentissage Darija
  if (msg.includes('darija')) {
    return "Vous pouvez apprendre la Darija 🇲🇦 avec audio et traduction (FR / EN / AR). Exemple : 'Salam' = Bonjour 🎧";
  }

  // 🔤 Tifinagh
  if (msg.includes('tifinagh')) {
    return "Le Tifinagh est l’alphabet Amazigh ⵣ. Vous pouvez l’apprendre avec audio et exercices interactifs.";
  }

  // 🗣️ Tachlhit
  if (msg.includes('tachlhit') || msg.includes('amazigh')) {
    return "Le Tachlhit est une langue amazighe parlée au sud du Maroc 🏔️. Disponible avec audio.";
  }

  // 🌐 Traduction
  if (
    msg.includes('langue') ||
    msg.includes('traduction') ||
    msg.includes('language')
  ) {
    return "Le site est disponible en Français 🇫🇷, Anglais 🇬🇧 et Arabe 🇲🇦";
  }

  // 🌙 Mode sombre
  if (
    msg.includes('mode sombre') ||
    msg.includes('dark') ||
    msg.includes('clair')
  ) {
    return "Vous pouvez activer le mode sombre ou clair dans les paramètres 🌙☀️";
  }

  // 👤 Compte
  if (
    msg.includes('compte') ||
    msg.includes('inscription') ||
    msg.includes('login')
  ) {
    return "Créez un compte pour sauvegarder votre progression et vos préférences 👤";
  }

  // 🔐 Admin
  if (msg.includes('admin')) {
    return "L’admin kayselem alik hhhh ⚙️";
  }

  // 🚫 Réservation
  if (
    msg.includes('réserver') ||
    msg.includes('reservation')
  ) {
    return "Nous ne gérons pas les réservations. Vous serez redirigé vers le site officiel ou WhatsApp de l’hôtel 🔗";
  }

  // 🍽️ Restaurants
  if (msg.includes('restaurant') || msg.includes('manger')) {
    return "Découvrez les meilleurs restaurants via Google Maps 🍽️";
  }

  // 🚗 Transport
  if (
    msg.includes('transport') ||
    msg.includes('déplacement')
  ) {
    return "Vous pouvez utiliser taxi 🚕, bus 🚌 ou location de voiture 🚗";
  }

  // 🌤️ Météo
  if (msg.includes('météo') || msg.includes('climat')) {
    return "Le Maroc a un climat ensoleillé ☀️, surtout à Agadir et Marrakech.";
  }

  // 🧭 Conseils
  if (
    msg.includes('conseil') ||
    msg.includes('astuce')
  ) {
    return "Astuce 💡 : Apprenez quelques mots en Darija pour mieux communiquer avec les locaux !";
  }

  // ❓ Fallback
  return "Je peux vous aider avec : villes, hôtels, activités, packs, langues ou navigation 🧭😊";
};

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(userMessage.text),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
          <MessageCircle size={28} />
        </button>
      )}

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div>
              <Bot size={20} /> Assistant
            </div>
            <button onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={msg.isBot ? 'bot' : 'user'}>
                {msg.isBot ? <Bot size={16} /> : <User size={16} />}
                <p>{msg.text}</p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Écrire..."
            />
            <button onClick={handleSend}>
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;