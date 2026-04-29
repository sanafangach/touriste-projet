import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "./LanguageContext"; // 🔥 Import
import "../css/sectionactivite.css";

import img1 from "../../assets/surf.jfif";
import img2 from "../../assets/quad.jpg";
import img3 from "../../assets/camel.jpg";
import img4 from "../../assets/parachete.jpg";

function PopularActivities() {
  const { t, lang } = useLanguage(); // 🔥 Utilisation du contexte

  const getActivities = () => {
    const baseActivities = [
      { id: 1, image: img1, link: "/destination" },
      { id: 2, image: img2, link: "/destination" },
      { id: 3, image: img3, link: "/destination" },
      { id: 4, image: img4, link: "/destination" },
    ];

    const translations = {
      FR: [
        { title: "Aventure Surf", place: "Taghazout - Agadir" },
        { title: "Quad dans le Désert", place: "Agafay - Marrakech" },
        { title: "Expérience Chameau", place: "Désert de Merzouga" },
        { title: "Vol en Parapente", place: "Plage Aglou - Tiznit" },
      ],
      EN: [
        { title: "Surf Adventure", place: "Taghazout - Agadir" },
        { title: "Quad Desert Ride", place: "Agafay - Marrakech" },
        { title: "Camel Experience", place: "Merzouga Desert" },
        { title: "Paragliding Flight", place: "Aglou Beach - Tiznit" },
      ],
      AR: [
        { title: "مغامرة ركوب الأمواج", place: "تغازوت - أكادير" },
        { title: "رحلة الرباعي الصحراوي", place: "أكافاي - مراكش" },
        { title: "تجربة الجمل", place: "صحراء مرزوقة" },
        { title: "طيران بالمظلة", place: "شاطئ أگلو - تزنيت" },
      ],
    };

    return baseActivities.map((activity, index) => ({
      ...activity,
      ...translations[lang][index]
    }));
  };

  const activities = getActivities();

  return (
    <section className="activities-section">
      <div className="activities-header">
        <div>
          <p className="mini-title">{lang === "FR" ? "Temps d'Aventure" : lang === "AR" ? "وقت المغامرة" : "Adventure Time"}</p>
          <h2>{lang === "FR" ? "Activités Populaires" : lang === "AR" ? "الأنشطة الشعبية" : "Popular Activities"}</h2>
        </div>
        <Link to="/destination" className="view-btn">
          {t("viewAll")}
        </Link>
      </div>

      <div className="activities-grid">
        {activities.map((item) => (
          <Link
            to={item.link}
            className="activity-card"
            key={item.id}
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div className="activity-overlay">
              <h3>{item.title}</h3>
              <p>{item.place}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default PopularActivities;