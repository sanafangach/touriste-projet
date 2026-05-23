import React from "react";
import { useLanguage } from "./LanguageContext"; // 🔥 Import
import "../css/sectiondescription.css";

function AboutSite() {
  const { t, lang } = useLanguage(); // 🔥 Utilisation du contexte

  const content = {
    FR: {
      mini: "Qui Nous Sommes",
      title: "Découvrez le Maroc Avec la Meilleure Expérience de Voyage",
      text1: "Bienvenue sur notre plateforme de voyage, votre guide parfait pour explorer la beauté du Maroc. Des déserts dorés aux villes bleues, des plages, des montagnes et des lieux historiques, nous aidons les voyageurs à découvrir les destinations les plus incroyables avec confort et style.",
      text2: "Notre mission est de rendre chaque voyage inoubliable en offrant les meilleurs endroits, des expériences locales et des solutions de réservation faciles.",
      btn: "En Savoir Plus",
      stats: [
        { num: "50+", label: "Destinations Populaires" },
        { num: "10K+", label: "Voyageurs Satisfaits" },
        { num: "24/7", label: "Support Client" },
        { num: "100%", label: "Réservation Sécurisée" },
      ]
    },
    EN: {
      mini: "Who We Are",
      title: "Discover Morocco With The Best Travel Experience",
      text1: "Welcome to our travel platform, your perfect guide to explore the beauty of Morocco. From golden deserts to blue cities, beaches, mountains and historical places, we help travelers discover the most amazing destinations with comfort and style.",
      text2: "Our mission is to make every trip unforgettable by offering the best places, local experiences and easy booking solutions.",
      btn: "Learn More",
      stats: [
        { num: "50+", label: "Popular Destinations" },
        { num: "10K+", label: "Happy Travelers" },
        { num: "24/7", label: "Customer Support" },
        { num: "100%", label: "Secure Booking" },
      ]
    },
    AR: {
      mini: "من نحن",
      title: "اكتشف المغرب مع أفضل تجربة سفر",
      text1: "مرحباً بك في منصتنا السياحية، دليلك المثالي لاستكشاف جمال المغرب. من الصحاري الذهبية إلى المدن الزرقاء، والشواطئ، والجبال، والأماكن التاريخية، نساعد المسافرين على اكتشاف أروع الوجهات براحة وأناقة.",
      text2: "مهمتنا هي جعل كل رحلة لا تُنسى من خلال تقديم أفضل الأماكن، والتجارب المحلية، وحلول الحجز السهلة.",
      btn: "اعرف المزيد",
      stats: [
        { num: "+٥٠", label: "وجهات شعبية" },
        { num: "+١٠ آلاف", label: "مسافر سعيد" },
        { num: "٢٤/٧", label: "دعم العملاء" },
        { num: "١٠٠٪", label: "حجز آمن" },
      ]
    }
  };

  const c = content[lang];

  return (
    <section className="about-site">
      <div className="about-container">
        <div className="about-left">
          <p className="about-mini">{c.mini}</p>
          <h2>{c.title}</h2>
          <p className="about-text">{c.text1}</p>
          <p className="about-text">{c.text2}</p>
          <button className="about-btn">{c.btn}</button>
        </div>

        <div className="about-right">
          {c.stats.map((stat, index) => (
            <div className="info-box" key={index}>
              <h3>{stat.num}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutSite;