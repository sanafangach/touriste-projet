// SectionActivite.js
import React from "react";
import { useLanguage } from "./LanguageContext";
import "../css/sectionactivite.css";

function SectionActivite() {
  const { lang } = useLanguage();

  const activities = [
    {
      id: 1,
      name: "Aventure Surf",
      nameAr: "مغامرة ركوب الأمواج",
      nameFr: "Aventure Surf",
      location: "Taghazout - Agadir",
      locationAr: "تاغازوت - أكادير",
      locationFr: "Taghazout - Agadir",
      image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&q=80"
    },
    {
      id: 2,
      name: "Quad dans le Désert",
      nameAr: "الكواد في الصحراء",
      nameFr: "Quad dans le Désert",
      location: "Agafay - Marrakech",
      locationAr: "أكاواي - مراكش",
      locationFr: "Agafay - Marrakech",
      image: "https://images.unsplash.com/photo-1552318826-fda4d2545a1b?w=600&q=80"
    },
    {
      id: 3,
      name: "Expérience Chameau",
      nameAr: "تجربة الجمل",
      nameFr: "Expérience Chameau",
      location: "Désert de Merzouga",
      locationAr: "صحراء مرزوقة",
      locationFr: "Désert de Merzouga",
      image: "https://images.unsplash.com/photo-1550246140-2a7a1c6fdb2c?w=600&q=80"
    },
    {
      id: 4,
      name: "Vol en Parapente",
      nameAr: "الطيران الشراعي",
      nameFr: "Vol en Parapente",
      location: "Plage Aglou - Tiznit",
      locationAr: "شاطئ أكلو - تزنيت",
      locationFr: "Plage Aglou - Tiznit",
      image: "https://images.unsplash.com/photo-1571605894703-2496dacb5674?w=600&q=80"
    }
  ];

  const getTitle = (item) => {
    if (lang === 'AR') return item.nameAr;
    if (lang === 'FR') return item.nameFr;
    return item.name;
  };

  const getLocation = (item) => {
    if (lang === 'AR') return item.locationAr;
    if (lang === 'FR') return item.locationFr;
    return item.location;
  };

  const handleViewAll = () => {
    console.log("View all activities clicked");
  };

  const handleExplore = (activityId, title) => {
    console.log(`Explorer l'activité : ${title} (ID: ${activityId})`);
  };

  // Textes multilingues
  const badgeText = {
    FR: "TOP PLACES",
    EN: "TOP PLACES",
    AR: "أفضل الأماكن"
  };

  const mainTitle = {
    FR: "Destinations Populaires",
    EN: "Popular Destinations",
    AR: "وجهات شعبية"
  };

  const viewAllText = {
    FR: "Voir tout",
    EN: "View all",
    AR: "عرض الكل"
  };

  const exploreText = {
    FR: "Explorer",
    EN: "Explore",
    AR: "استكشف"
  };

  return (
    <div className="activities-section">
      <div className="activities-header">
        <div className="header-left">
          <div className="mini-badge">{badgeText[lang]}</div>
          <h2 className="section-title">{mainTitle[lang]}</h2>
        </div>
        <button className="view-all-btn" onClick={handleViewAll}>
          {viewAllText[lang]}
          <span className="arrow">→</span>
        </button>
      </div>

      <div className="activities-grid">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="activity-card"
            style={{ backgroundImage: `url(${activity.image})` }}
          >
            <div className="activity-overlay">
              <h3 className="activity-title">{getTitle(activity)}</h3>
              <p className="activity-location">{getLocation(activity)}</p>
              <button
                className="explore-btn"
                onClick={() => handleExplore(activity.id, getTitle(activity))}
              >
                {exploreText[lang]}
                <span className="arrow">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SectionActivite;