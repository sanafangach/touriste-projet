import React, { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User } from "lucide-react";
import { useLanguage } from "../accueil/LanguageContext"; // 🔥 Import
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
  const { t, lang } = useLanguage(); // 🔥 Utilisation du contexte
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: t("chatbotGreeting"),
      isBot: true,
      timestamp: new Date(),
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  // 🔥 Mettre à jour le message de bienvenue quand la langue change
  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: t("chatbotGreeting"),
        isBot: true,
        timestamp: new Date(),
      },
    ]);
  }, [lang, t]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // BOT RESPONSE - Adapté selon la langue
  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    
    // Réponses selon la langue
    const responses = {
      FR: {
        greeting: "Bienvenue sur AMUDUX 🇲🇦✨ ! Je peux vous aider à découvrir le Maroc, trouver des hôtels, des activités ou apprendre des langues locales 😊",
        cities: "Les villes populaires sont Marrakech, Agadir, Fès, Chefchaouen et Casablanca 🌆",
        marrakech: "Marrakech est une ville magnifique ! Ne manquez pas la place Jemaa el-Fna, les souks et les jardins 🌴",
        agadir: "Agadir est parfaite pour la plage et le surf 🏄‍♂️☀️",
        fes: "Fès est la capitale spirituelle du Maroc 🕌. Visitez la médina, les tanneries et les souks !",
        chefchaouen: "Chefchaouen, la ville bleue 💙, est un endroit magique dans le Rif. Un must-see !",
        hotels: "Nous affichons les hôtels via Google Maps 🗺️. Cliquez sur 'Réserver' pour aller vers leur site officiel ou WhatsApp.",
        activities: "Vous pouvez faire : désert 🐪, surf 🏄, quad, randonnée ⛰️ et visites culturelles.",
        location: "Nous utilisons Google Maps pour afficher votre position et les lieux autour de vous 📍",
        packs: "Nous proposons des packs 1 jour ou 1 semaine avec itinéraire détaillé étape par étape 📅",
        budget: "Le Maroc est abordable 💸. Le budget dépend de vos choix d'hôtels et d'activités.",
        darija: "Vous pouvez apprendre la Darija 🇲🇦 avec audio et traduction (FR / EN / AR). Exemple : 'Salam' = Bonjour 🎧",
        tifinagh: "Le Tifinagh est l'alphabet Amazigh ⵣ. Vous pouvez l'apprendre avec audio et exercices interactifs.",
        amazigh: "Le Tachlhit est une langue amazighe parlée au sud du Maroc 🏔️. Disponible avec audio.",
        language: "Le site est disponible en Français 🇫🇷, Anglais 🇬🇧 et Arabe 🇲🇦",
        dark: "Vous pouvez activer le mode sombre ou clair dans les paramètres ⚙️🌙☀️",
        account: "Créez un compte pour sauvegarder votre progression et vos préférences 👤",
        admin: "L'admin kayselem alik hhhh ⚙️",
        booking: "Nous ne gérons pas les réservations. Vous serez redirigé vers le site officiel ou WhatsApp de l'hôtel 🔗",
        restaurant: "Découvrez les meilleurs restaurants via Google Maps 🍽️",
        transport: "Vous pouvez utiliser taxi 🚕, bus 🚌 ou location de voiture 🚗",
        weather: "Le Maroc a un climat ensoleillé ☀️, surtout à Agadir et Marrakech.",
        tips: "Astuce 💡 : Apprenez quelques mots en Darija pour mieux communiquer avec les locaux !",
        fallback: "Je peux vous aider avec : villes, hôtels, activités, packs, langues ou navigation 🧭😊"
      },
      EN: {
        greeting: "Welcome to AMUDUX 🇲🇦✨! I can help you discover Morocco, find hotels, activities, or learn local languages 😊",
        cities: "Popular cities are Marrakech, Agadir, Fes, Chefchaouen, and Casablanca 🌆",
        marrakech: "Marrakech is a beautiful city! Don't miss Jemaa el-Fna square, the souks, and the gardens 🌴",
        agadir: "Agadir is perfect for beach and surfing 🏄‍♂️☀️",
        fes: "Fes is the spiritual capital of Morocco 🕌. Visit the medina, tanneries, and souks!",
        chefchaouen: "Chefchaouen, the blue city 💙, is a magical place in the Rif. A must-see!",
        hotels: "We display hotels via Google Maps 🗺️. Click 'Book' to go to their official website or WhatsApp.",
        activities: "You can do: desert 🐪, surf 🏄, quad, hiking ⛰️, and cultural visits.",
        location: "We use Google Maps to show your location and places around you 📍",
        packs: "We offer 1-day or 1-week packs with detailed step-by-step itinerary 📅",
        budget: "Morocco is affordable 💸. Budget depends on your hotel and activity choices.",
        darija: "You can learn Darija 🇲🇦 with audio and translation (FR / EN / AR). Example: 'Salam' = Hello 🎧",
        tifinagh: "Tifinagh is the Amazigh alphabet ⵣ. You can learn it with audio and interactive exercises.",
        amazigh: "Tachlhit is an Amazigh language spoken in southern Morocco 🏔️. Available with audio.",
        language: "The site is available in French 🇫🇷, English 🇬🇧, and Arabic 🇲🇦",
        dark: "You can enable dark or light mode in settings ⚙️🌙☀️",
        account: "Create an account to save your progress and preferences 👤",
        admin: "The admin says hi hhhh ⚙️",
        booking: "We don't handle reservations. You'll be redirected to the hotel's official website or WhatsApp 🔗",
        restaurant: "Discover the best restaurants via Google Maps 🍽️",
        transport: "You can use taxi 🚕, bus 🚌, or car rental 🚗",
        weather: "Morocco has a sunny climate ☀️, especially in Agadir and Marrakech.",
        tips: "Tip 💡: Learn a few words in Darija to better communicate with locals!",
        fallback: "I can help you with: cities, hotels, activities, packs, languages, or navigation 🧭😊"
      },
      AR: {
        greeting: "مرحباً بك في AMUDUX 🇲🇦✨! يمكنني مساعدتك في اكتشاف المغرب، والعثور على فنادق، وأنشطة، أو تعلم اللغات المحلية 😊",
        cities: "المدن الشعبية هي مراكش، أكادير، فاس، شفشاون، والدار البيضاء 🌆",
        marrakech: "مراكش مدينة رائعة! لا تفوت ساحة جامع الفنا، الأسواق، والحدائق 🌴",
        agadir: "أكادير مثالية للشاطئ وركوب الأمواج 🏄‍♂️☀️",
        fes: "فاس هي العاصمة الروحية للمغرب 🕌. زر المدينة العتيقة، الدباغات، والأسواق!",
        chefchaouen: "شفشاون، المدينة الزرقاء 💙، مكان ساحر في الريف. يجب زيارتها!",
        hotels: "نعرض الفنادق عبر خرائط Google 🗺️. اضغط 'احجز' للذهاب إلى موقعهم الرسمي أو واتساب.",
        activities: "يمكنك القيام ب: صحراء 🐪، ركوب أمواج 🏄، رباعي، تنزه ⛰️، وزيارات ثقافية.",
        location: "نستخدم خرائط Google لعرض موقعك والأماكن من حولك 📍",
        packs: "نقدم باقات يوم أو أسبوع مع خط سير مفصل خطوة بخطوة 📅",
        budget: "المغور ميسور التكلفة 💸. الميزانية تعتمد على اختياراتك من الفنادق والأنشطة.",
        darija: "يمكنك تعلم الدارجة 🇲🇦 مع الصوت والترجمة (FR / EN / AR). مثال: 'سلام' = مرحباً 🎧",
        tifinagh: "التيفيناغ هو الأبجدية الأمازيغية ⵣ. يمكنك تعلمها مع الصوت وتمارين تفاعلية.",
        amazigh: "التشلحيت هي لغة أمازيغية تُتحدث في جنوب المغرب 🏔️. متوفرة مع الصوت.",
        language: "الموقع متاح بالفرنسية 🇫🇷، الإنجليزية 🇬🇧، والعربية 🇲🇦",
        dark: "يمكنك تفعيل الوضع الداكن أو الفاتح في الإعدادات ⚙️🌙☀️",
        account: "أنشئ حساباً لحفظ تقدمك وتفضيلاتك 👤",
        admin: "الأدمين كايسلم عليك هههه ⚙️",
        booking: "لا ندير الحجوزات. سيتم تحويلك إلى الموقع الرسمي أو واتساب الفندق 🔗",
        restaurant: "اكتشف أفضل المطاعم عبر خرائط Google 🍽️",
        transport: "يمكنك استخدام التاكسي 🚕، الحافلة 🚌، أو استئجار سيارة 🚗",
        weather: "المغرب مناخه مشمس ☀️، خاصة في أكادير ومراكش.",
        tips: "نصيحة 💡: تعلم بعض الكلمات بالدارجة للتواصل بشكل أفضل مع السكان المحليين!",
        fallback: "يمكنني مساعدتك في: المدن، الفنادق، الأنشطة، الباقات، اللغات، أو التنقل 🧭😊"
      }
    };

    const r = responses[lang];

    if (msg.includes("bonjour") || msg.includes("salut") || msg.includes("hello") || msg.includes("مرحبا") || msg.includes("salam")) return r.greeting;
    if (msg.includes("ville") || msg.includes("destination") || msg.includes("où aller") || msg.includes("city") || msg.includes("مدينة")) return r.cities;
    if (msg.includes("marrakech") || msg.includes("مراكش")) return r.marrakech;
    if (msg.includes("agadir") || msg.includes("أكادير")) return r.agadir;
    if (msg.includes("fès") || msg.includes("fes") || msg.includes("فاس")) return r.fes;
    if (msg.includes("chefchaouen") || msg.includes("chaouen") || msg.includes("شفشاون")) return r.chefchaouen;
    if (msg.includes("hotel") || msg.includes("hébergement") || msg.includes("logement") || msg.includes("hotels") || msg.includes("فندق")) return r.hotels;
    if (msg.includes("activité") || msg.includes("faire") || msg.includes("visiter") || msg.includes("activity") || msg.includes("activities") || msg.includes("نشاط")) return r.activities;
    if (msg.includes("où je suis") || msg.includes("localisation") || msg.includes("map") || msg.includes("location") || msg.includes("موقع")) return r.location;
    if (msg.includes("pack") || msg.includes("voyage") || msg.includes("plan") || msg.includes("packs") || msg.includes("باقة")) return r.packs;
    if (msg.includes("prix") || msg.includes("budget") || msg.includes("combien") || msg.includes("price") || msg.includes("budget") || msg.includes("سعر")) return r.budget;
    if (msg.includes("darija") || msg.includes("الدارجة")) return r.darija;
    if (msg.includes("tifinagh") || msg.includes("التيفيناغ")) return r.tifinagh;
    if (msg.includes("tachlhit") || msg.includes("amazigh") || msg.includes("أمازيغ")) return r.amazigh;
    if (msg.includes("langue") || msg.includes("traduction") || msg.includes("language") || msg.includes("languages") || msg.includes("لغة")) return r.language;
    if (msg.includes("mode sombre") || msg.includes("dark") || msg.includes("clair") || msg.includes("light") || msg.includes("داكن")) return r.dark;
    if (msg.includes("compte") || msg.includes("inscription") || msg.includes("login") || msg.includes("account") || msg.includes("حساب")) return r.account;
    if (msg.includes("admin")) return r.admin;
    if (msg.includes("réserver") || msg.includes("reservation") || msg.includes("booking") || msg.includes("book") || msg.includes("حجز")) return r.booking;
    if (msg.includes("restaurant") || msg.includes("manger") || msg.includes("restaurants") || msg.includes("eat") || msg.includes("مطعم")) return r.restaurant;
    if (msg.includes("transport") || msg.includes("déplacement") || msg.includes("transportation") || msg.includes("مواصلات")) return r.transport;
    if (msg.includes("météo") || msg.includes("climat") || msg.includes("weather") || msg.includes("climate") || msg.includes("طقس")) return r.weather;
    if (msg.includes("conseil") || msg.includes("astuce") || msg.includes("tip") || msg.includes("tips") || msg.includes("نصيحة")) return r.tips;

    return r.fallback;
  };

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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!isTyping) {
        handleSend();
      }
    }
  };

  const handleQuick = (text) => {
    if (isLocked) return;
    setIsLocked(true);

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
        {
          id: Date.now() + 1,
          text: botReply,
          isBot: true,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
      setIsLocked(false);
    }, 700);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: t("chatbotGreeting"),
        isBot: true,
        timestamp: new Date(),
      },
    ]);
  };

  // 🔥 Chips selon la langue
  const getChips = () => {
    switch(lang) {
      case "AR":
        return [
          { label: "🌴 مراكش", value: "مراكش" },
          { label: "🏨 الفنادق", value: "فندق" },
          { label: "🎯 الأنشطة", value: "نشاط" },
          { label: "💰 الأسعار", value: "سعر" }
        ];
      case "EN":
        return [
          { label: "🌴 Marrakech", value: "Marrakech" },
          { label: "🏨 Hotels", value: "hotel" },
          { label: "🎯 Activities", value: "activity" },
          { label: "💰 Prices", value: "price" }
        ];
      default:
        return [
          { label: "🌴 Marrakech", value: "Marrakech" },
          { label: "🏨 Hôtels", value: "hotel" },
          { label: "🎯 Activités", value: "activité" },
          { label: "💰 Prix", value: "prix" }
        ];
    }
  };

  const chips = getChips();

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
          <BubbleDotsIcon />
        </button>
      )}

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-header-left">
              <div className="chatbot-header-avatar">
                <Bot size={20} />
              </div>
              <div className="chatbot-header-info">
                <div className="chatbot-header-title">{t("chatbotAssistant")}</div>
                <div className="chatbot-header-status">
                  <span className="chatbot-status-dot"></span>
                  {t("chatbotOnline")}
                </div>
              </div>
            </div>
            <div className="chatbot-header-actions">
              <button onClick={clearChat} className="chatbot-clear">
                {t("chatbotClear")}
              </button>
              <button onClick={() => setIsOpen(false)} className="chatbot-close">
                <X size={16} />
              </button>
            </div>
          </div>

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

          <div className="chatbot-suggestions">
            {chips.map((chip, index) => (
              <button key={index} onClick={() => handleQuick(chip.value)}>
                {chip.label}
              </button>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={t("chatbotPlaceholder")}
            />
            <button onClick={handleSend} disabled={isTyping}>
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;