// src/components/accueil/sectionactivite.js
import React, { useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";
import "../css/sectionactivite.css";

function SectionActivite() {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    setAnimateCards(true);
  }, []);

  const activities = [
    {
      id: 1,
      name: "Surf Lessons",
      nameAr: "دروس ركوب الأمواج",
      nameFr: "Cours de Surf",
      category: "water",
      price: "$45",
      priceAr: "45 دولار",
      priceFr: "45€",
      duration: "2 hours",
      durationAr: "ساعتين",
      durationFr: "2 heures",
      rating: 4.8,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600",
      description: "Learn to surf with professional instructors at one of Morocco's best surf spots.",
      descriptionAr: "تعلم ركوب الأمواج مع مدربين محترفين",
      descriptionFr: "Apprenez à surfer avec des instructeurs professionnels",
      location: "Agadir Beach",
      bestTime: "Morning",
      includes: ["Surfboard", "Wetsuit", "Instructor", "Photos"]
    },
    {
      id: 2,
      name: "Quad Biking",
      nameAr: "ركوب الكواد",
      nameFr: "Quad",
      category: "adventure",
      price: "$65",
      priceAr: "65 دولار",
      priceFr: "65€",
      duration: "3 hours",
      durationAr: "3 ساعات",
      durationFr: "3 heures",
      rating: 4.7,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1552318826-fda4d2545a1b?w=600",
      description: "Experience the thrill of quad biking through the desert dunes.",
      descriptionAr: "استمتع بتجربة ركوب الكواد المثيرة",
      descriptionFr: "Vivez le frisson du quad à travers les dunes",
      location: "Desert Agadir",
      bestTime: "Morning",
      includes: ["Quad bike", "Helmet", "Guide", "Refreshments"]
    },
    {
      id: 3,
      name: "Camel Ride",
      nameAr: "ركوب الجمل",
      nameFr: "Promenade à Chameau",
      category: "cultural",
      price: "$35",
      priceAr: "35 دولار",
      priceFr: "35€",
      duration: "1.5 hours",
      durationAr: "ساعة ونصف",
      durationFr: "1.5 heure",
      rating: 4.9,
      reviews: 456,
      image: "https://images.unsplash.com/photo-1550246140-2a7a1c6fdb2c?w=600",
      description: "Traditional camel ride along the beach with stunning sunset views.",
      descriptionAr: "ركوب الجمل التقليدي على طول الشاطئ",
      descriptionFr: "Promenade à chameau traditionnelle",
      location: "Agadir Coast",
      bestTime: "Sunset",
      includes: ["Camel", "Guide", "Mint tea", "Traditional clothing"]
    },
    {
      id: 4,
      name: "Hot Air Balloon",
      nameAr: "بالون الهواء الساخن",
      nameFr: "Montgolfière",
      category: "adventure",
      price: "$120",
      priceAr: "120 دولار",
      priceFr: "120€",
      duration: "4 hours",
      durationAr: "4 ساعات",
      durationFr: "4 heures",
      rating: 4.9,
      reviews: 98,
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600",
      description: "Spectacular sunrise balloon ride over the Atlas Mountains.",
      descriptionAr: "رحلة بالون عند شروق الشمس فوق جبال الأطلس",
      descriptionFr: "Vol en montgolfière au lever du soleil",
      location: "Atlas Foothills",
      bestTime: "Sunrise",
      includes: ["Balloon ride", "Breakfast", "Certificate", "Transport"]
    },
    {
      id: 5,
      name: "Cooking Class",
      nameAr: "دروس الطبخ",
      nameFr: "Cours de Cuisine",
      category: "cultural",
      price: "$50",
      priceAr: "50 دولار",
      priceFr: "50€",
      duration: "3 hours",
      durationAr: "3 ساعات",
      durationFr: "3 heures",
      rating: 4.8,
      reviews: 312,
      image: "https://images.unsplash.com/photo-1556910104-522b3a6c8d3b?w=600",
      description: "Learn to prepare traditional Moroccan dishes.",
      descriptionAr: "تعلم تحضير الأطباق المغربية التقليدية",
      descriptionFr: "Apprenez à préparer des plats marocains",
      location: "Local Riad",
      bestTime: "Morning",
      includes: ["Ingredients", "Lunch", "Recipe book", "Mint tea"]
    },
    {
      id: 6,
      name: "Paradise Valley Hike",
      nameAr: "وادي الجنة",
      nameFr: "Paradis Vallée",
      category: "nature",
      price: "$40",
      priceAr: "40 دولار",
      priceFr: "40€",
      duration: "5 hours",
      durationAr: "5 ساعات",
      durationFr: "5 heures",
      rating: 4.7,
      reviews: 267,
      image: "https://images.unsplash.com/photo-1533240332313-0db3b459d14c?w=600",
      description: "Guided hike through natural pools and waterfalls.",
      descriptionAr: "رحلة مشي عبر البرك الطبيعية والشلالات",
      descriptionFr: "Randonnée à travers des piscines naturelles",
      location: "Paradise Valley",
      bestTime: "Morning",
      includes: ["Guide", "Lunch", "Transport", "Swimming"]
    }
  ];

  const filteredActivities = activeCategory === "all" 
    ? activities 
    : activities.filter(a => a.category === activeCategory);

  const getName = (item) => {
    if (lang === 'AR') return item.nameAr;
    if (lang === 'FR') return item.nameFr;
    return item.name;
  };

  const getPrice = (item) => {
    if (lang === 'AR') return item.priceAr;
    if (lang === 'FR') return item.priceFr;
    return item.price;
  };

  const getDuration = (item) => {
    if (lang === 'AR') return item.durationAr;
    if (lang === 'FR') return item.durationFr;
    return item.duration;
  };

  const getDescription = (item) => {
    if (lang === 'AR') return item.descriptionAr;
    if (lang === 'FR') return item.descriptionFr;
    return item.description;
  };

  return (
    <div className="section-activite">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            {lang === 'AR' ? 'الأنشطة الشعبية' : lang === 'FR' ? 'Activités Populaires' : 'Popular Activities'}
          </h2>
          <p className="section-subtitle">
            {lang === 'AR' ? 'اكتشف أفضل الأنشطة في المغرب' : lang === 'FR' ? 'Découvrez les meilleures activités' : 'Discover the best activities in Morocco'}
          </p>
        </div>

        <div className="category-filters">
          <button className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => setActiveCategory('all')}>
            {lang === 'AR' ? 'الكل' : lang === 'FR' ? 'Tous' : 'All'}
          </button>
          <button className={`filter-btn ${activeCategory === 'water' ? 'active' : ''}`} onClick={() => setActiveCategory('water')}>
            🌊 {lang === 'AR' ? 'رياضات مائية' : lang === 'FR' ? 'Sports nautiques' : 'Water Sports'}
          </button>
          <button className={`filter-btn ${activeCategory === 'adventure' ? 'active' : ''}`} onClick={() => setActiveCategory('adventure')}>
            🏜️ {lang === 'AR' ? 'مغامرة' : lang === 'FR' ? 'Aventure' : 'Adventure'}
          </button>
          <button className={`filter-btn ${activeCategory === 'cultural' ? 'active' : ''}`} onClick={() => setActiveCategory('cultural')}>
            🕌 {lang === 'AR' ? 'ثقافي' : lang === 'FR' ? 'Culturel' : 'Cultural'}
          </button>
          <button className={`filter-btn ${activeCategory === 'nature' ? 'active' : ''}`} onClick={() => setActiveCategory('nature')}>
            🌿 {lang === 'AR' ? 'طبيعة' : lang === 'FR' ? 'Nature' : 'Nature'}
          </button>
        </div>

        <div className={`activities-grid ${animateCards ? 'animate' : ''}`}>
          {filteredActivities.map((activity, index) => (
            <div key={activity.id} className="activity-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="card-image">
                <img src={activity.image} alt={getName(activity)} />
                <div className="card-badge">⭐ {activity.rating}</div>
                <div className="card-price">{getPrice(activity)}</div>
              </div>
              <div className="card-content">
                <h3 className="activity-title">{getName(activity)}</h3>
                <div className="activity-meta">
                  <span>⏱️ {getDuration(activity)}</span>
                  <span>💬 {activity.reviews} {lang === 'AR' ? 'مراجعة' : lang === 'FR' ? 'avis' : 'reviews'}</span>
                </div>
                <p className="activity-description">{getDescription(activity)}</p>
                <div className="activity-location">📍 {activity.location}</div>
                <button className="book-button">
                  {lang === 'AR' ? 'احجز الآن' : lang === 'FR' ? 'Réserver' : 'Book Now'}
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SectionActivite;