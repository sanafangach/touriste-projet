import React from "react";
import { Mail, Phone, MapPin, Clock, Sparkles, Map, Brain, Globe, Star } from "lucide-react";
import { useLanguage } from "../accueil/LanguageContext";
import "../css/ContactUs.css";
import contactImage from "../../assets/Marrakech.jpg";

export default function ContactUs() {
  const { lang, isRTL } = useLanguage();

  const translations = {
    FR: {
      title: "Contactez-nous",
      subtitle: "Une question ou un projet de voyage au Maroc ? Nous sommes là pour vous !",
      infoTitle: "Nos Coordonnées",
      infoSubtitle: "N'hésitez pas à nous joindre directement.",
      phone: "Téléphone",
      email: "E-mail",
      address: "Adresse",
      addressVal: "OFPPT Tiznit, Tiznit, Maroc",
      hours: "Disponibilité",
      hoursVal: "24h/24 — 7j/7",
      imageCaption: "Laissez-vous envoûter par les trésors cachés du Maroc.",

      aboutBadge: "Notre histoire",
      aboutTitle: "Qui sommes-nous ?",
      aboutDesc: "Amudux est une plateforme de voyage numérique née d'une passion profonde pour le Maroc et ses richesses culturelles. Fondée par une équipe de jeunes innovateurs, notre mission est de rendre l'exploration du Royaume accessible, immersive et mémorable pour chaque voyageur.",
      features: [
        { icon: "brain", title: "IA Avancée", desc: "Planification intelligente de vos itinéraires grâce à l'intelligence artificielle." },
        { icon: "map", title: "Carte Interactive", desc: "Explorez les destinations, activités et points d'intérêt en temps réel." },
        { icon: "globe", title: "Multilingue", desc: "Expérience disponible en Français, Anglais et Arabe pour tous les voyageurs." },
        { icon: "star", title: "Expérience Authentique", desc: "Des recommandations locales soigneusement sélectionnées pour vivre le vrai Maroc." },
      ],
      statLabel1: "Destinations",
      statLabel2: "Voyageurs",
      statLabel3: "Support",
    },
    EN: {
      title: "Contact Us",
      subtitle: "Any questions or travel plans in Morocco? We're here for you!",
      infoTitle: "Contact Info",
      infoSubtitle: "Feel free to reach out to us directly.",
      phone: "Phone",
      email: "Email",
      address: "Address",
      addressVal: "OFPPT Tiznit, Tiznit, Morocco",
      hours: "Availability",
      hoursVal: "24/7 — Always open",
      imageCaption: "Let yourself be enchanted by the hidden treasures of Morocco.",

      aboutBadge: "Our Story",
      aboutTitle: "Who Are We?",
      aboutDesc: "Amudux is a digital travel platform born from a deep passion for Morocco and its cultural richness. Founded by a team of young innovators, our mission is to make exploring the Kingdom accessible, immersive, and unforgettable for every traveler.",
      features: [
        { icon: "brain", title: "Advanced AI", desc: "Smart itinerary planning powered by artificial intelligence." },
        { icon: "map", title: "Interactive Map", desc: "Explore destinations, activities, and points of interest in real time." },
        { icon: "globe", title: "Multilingual", desc: "Available in French, English and Arabic for all travelers worldwide." },
        { icon: "star", title: "Authentic Experience", desc: "Carefully curated local recommendations to experience the real Morocco." },
      ],
      statLabel1: "Destinations",
      statLabel2: "Travelers",
      statLabel3: "Support",
    },
    AR: {
      title: "اتصل بنا",
      subtitle: "هل لديك أي استفسار أو خطط سفر في المغرب؟ نحن هنا لمساعدتك!",
      infoTitle: "معلومات الاتصال",
      infoSubtitle: "لا تتردد في الاتصال بنا مباشرة.",
      phone: "الهاتف",
      email: "البريد الإلكتروني",
      address: "العنوان",
      addressVal: "OFPPT تيزنيت، تيزنيت، المغرب",
      hours: "التوفر",
      hoursVal: "24/7 — دائمًا متاح",
      imageCaption: "دع سحر الكنوز المخفية في المغرب يأسرك.",

      aboutBadge: "قصتنا",
      aboutTitle: "من نحن؟",
      aboutDesc: "Amudux هي منصة سفر رقمية وُلدت من شغف عميق بالمغرب وثرواته الثقافية. أسسها فريق من المبتكرين الشباب، ومهمتنا جعل استكشاف المملكة في متناول الجميع، غامرًا ولا يُنسى لكل مسافر.",
      features: [
        { icon: "brain", title: "ذكاء اصطناعي متقدم", desc: "تخطيط ذكي لمساراتك السياحية بفضل الذكاء الاصطناعي." },
        { icon: "map", title: "خريطة تفاعلية", desc: "استكشف الوجهات والأنشطة ونقاط الاهتمام في الوقت الفعلي." },
        { icon: "globe", title: "متعدد اللغات", desc: "متاح بالفرنسية والإنجليزية والعربية لجميع المسافرين حول العالم." },
        { icon: "star", title: "تجربة أصيلة", desc: "توصيات محلية منتقاة بعناية لتعيش المغرب الحقيقي." },
      ],
      statLabel1: "وجهات",
      statLabel2: "مسافر",
      statLabel3: "دعم",
    },
  };

  const t = translations[lang] || translations.FR;

  const featureIcons = {
    brain: <Brain size={20} />,
    map: <Map size={20} />,
    globe: <Globe size={20} />,
    star: <Star size={20} />,
  };

  return (
    <div className={`contact-page ${isRTL ? "rtl" : ""}`}>
      {/* Background elements */}
      <div className="contact-bg-grid"></div>
      <div className="contact-glow-1"></div>
      <div className="contact-glow-2"></div>

      <div className="contact-hero">
        <div className="contact-hero-content">
          <div className="contact-badge">
            <Sparkles size={16} />
            <span>AMUDUX SUPPORT</span>
          </div>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>
      </div>

      <div className="contact-container">
        <div className="contact-grid">
          {/* Contact info cards */}
          <div className="contact-info-section">
            <h2 className="section-title">{t.infoTitle}</h2>
            <p className="section-subtitle">{t.infoSubtitle}</p>

            <div className="info-cards">
              <div className="info-card">
                <div className="info-icon-wrapper">
                  <Phone size={22} />
                </div>
                <div className="info-details">
                  <h3>{t.phone}</h3>
                  <a href="tel:+212658251105" className="info-link">+212 658-251105</a>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon-wrapper">
                  <Mail size={22} />
                </div>
                <div className="info-details">
                  <h3>{t.email}</h3>
                  <a href="mailto:amudux@gmail.com" className="info-link">amudux@gmail.com</a>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon-wrapper">
                  <MapPin size={22} />
                </div>
                <div className="info-details">
                  <h3>{t.address}</h3>
                  <p>{t.addressVal}</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon-wrapper">
                  <Clock size={22} />
                </div>
                <div className="info-details">
                  <h3>{t.hours}</h3>
                  <p>{t.hoursVal}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Image Section */}
          <div className="contact-image-section">
            <div className="image-wrapper">
              <img src={contactImage} alt="Beautiful Morocco" className="contact-visual-img" />
              <div className="image-overlay"></div>
              <div className="image-caption">
                <Sparkles size={20} className="caption-icon" />
                <p>{t.imageCaption}</p>
              </div>
            </div>
          </div>
        </div>

        {/* About Us Section — Professional Full Width */}
        <div className="about-us-section">
          <div className="about-us-header">
            <span className="about-us-badge">
              <Sparkles size={14} />
              {t.aboutBadge}
            </span>
            <h2 className="about-us-main-title">{t.aboutTitle}</h2>
            <p className="about-us-main-desc">{t.aboutDesc}</p>
          </div>

          <div className="about-us-stats">
            <div className="about-us-stat">
              <span className="stat-num">50+</span>
              <span className="stat-label">{t.statLabel1}</span>
            </div>
            <div className="about-us-stat-divider"></div>
            <div className="about-us-stat">
              <span className="stat-num">10K+</span>
              <span className="stat-label">{t.statLabel2}</span>
            </div>
            <div className="about-us-stat-divider"></div>
            <div className="about-us-stat">
              <span className="stat-num">24/7</span>
              <span className="stat-label">{t.statLabel3}</span>
            </div>
          </div>

          <div className="about-us-features">
            {t.features.map((f, i) => (
              <div className="about-feature-card" key={i}>
                <div className="about-feature-icon">{featureIcons[f.icon]}</div>
                <h4 className="about-feature-title">{f.title}</h4>
                <p className="about-feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
