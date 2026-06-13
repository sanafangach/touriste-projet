import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import "../css/HomeCTABanner.css";

function HomeCTABanner() {
  const { lang, isRTL } = useLanguage();

  const content = {
    FR: {
      title: "Prêt à concevoir votre voyage de rêve au Maroc ?",
      desc: "Laissez notre Intelligence Artificielle créer un itinéraire sur mesure adapté à votre budget, vos centres d'intérêt et vos envies d'exploration.",
      btnText: "Planifier mon voyage maintenant",
      badgeText: "Technologie IA Innovante"
    },
    EN: {
      title: "Ready to design your dream trip to Morocco?",
      desc: "Let our Artificial Intelligence draft a custom itinerary tailored to your budget, interests, and exploration goals.",
      btnText: "Plan My Trip Now",
      badgeText: "Innovative AI Technology"
    },
    AR: {
      title: "جاهز لتصميم رحلة أحلامك إلى المغرب؟",
      desc: "دع ذكاءنا الاصطناعي يصمم لك جدول رحلة مخصصاً يناسب ميزانيتك، اهتماماتك وأهدافك الاستكشافية.",
      btnText: "خطط لرحلتي الآن",
      badgeText: "تقنية الذكاء الاصطناعي المبتكرة"
    }
  };

  const c = content[lang] || content.FR;

  return (
    <div className={`home-cta-banner-wrapper ${isRTL ? "rtl" : ""}`}>
      <div className="home-cta-banner-card">
        {/* Glow Effects */}
        <div className="cta-glow glow-1"></div>
        <div className="cta-glow glow-2"></div>
        
        <div className="home-cta-content">
          <span className="cta-badge">
            <Sparkles size={14} className="cta-badge-icon" />
            <span>{c.badgeText}</span>
          </span>
          <h2>{c.title}</h2>
          <p>{c.desc}</p>
          <Link to="/pack" className="cta-button">
            <span>{c.btnText}</span>
            <ArrowRight size={18} className="cta-btn-arrow" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomeCTABanner;
