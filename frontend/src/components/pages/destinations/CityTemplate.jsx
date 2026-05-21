// src/components/pages/destinations/CityTemplate.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, MapPin, Clock, Heart, Share2, ArrowLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../../accueil/LanguageContext"; // Changé le chemin
import "../../css/CityDetail.css";

function CityTemplate({ cityData }) {
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("activities");

  const renderStars = (rating, stars) => {
    return (
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            fill={i < stars ? "#f5a623" : "none"}
            color={i < stars ? "#f5a623" : "#ccc"}
          />
        ))}
        <span className="rating-value">{rating}</span>
      </div>
    );
  };

  return (
    <div className="city-detail" dir={isRTL ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <div className="city-hero" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3)), url(${cityData.coverImage})` }}>
        <div className="hero-container">
          <button className="back-button" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
            {t("back") || "Back"}
          </button>
          <div className="hero-content">
            <h1>{cityData.heroTitle}</h1>
            <p>{cityData.heroSubtitle}</p>
            <div className="hero-actions">
              <button className={`save-btn ${saved ? "saved" : ""}`} onClick={() => setSaved(!saved)}>
                <Heart size={18} fill={saved ? "#ff6b35" : "none"} />
                {saved ? t("saved") : t("save")}
              </button>
              <button className="share-btn">
                <Share2 size={18} />
                {t("share") || "Share"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="tabs-container">
        <div className="container">
          <div className="tabs">
            <button className={`tab ${activeTab === "activities" ? "active" : ""}`} onClick={() => setActiveTab("activities")}>
              {t("activities") || "Activities"}
            </button>
            <button className={`tab ${activeTab === "restaurants" ? "active" : ""}`} onClick={() => setActiveTab("restaurants")}>
              {t("restaurants") || "Restaurants"}
            </button>
            <button className={`tab ${activeTab === "hidden" ? "active" : ""}`} onClick={() => setActiveTab("hidden")}>
              {t("hiddenCorners") || "Hidden Corners"}
            </button>
            <button className={`tab ${activeTab === "spots" ? "active" : ""}`} onClick={() => setActiveTab("spots")}>
              {t("popularSpots") || "Popular Spots"}
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Activities Section */}
        {activeTab === "activities" && (
          <div className="activities-section">
            <h2>{t("activities") || "Activities"}</h2>
            <div className="activities-grid">
              {cityData.activities.map((activity) => (
                <div key={activity.id} className="activity-card">
                  <div className="activity-image">
                    <img src={activity.image} alt={activity.name} />
                    <div className="activity-price">{activity.price}</div>
                    <div className="activity-duration">
                      <Clock size={14} />
                      {activity.duration}
                    </div>
                  </div>
                  <div className="activity-content">
                    <h3>{activity.name}</h3>
                    {renderStars(activity.rating, activity.stars)}
                    <p className="activity-description">{activity.description}</p>
                    <button className="book-btn">{t("bookNow") || "Book Now"}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Restaurants Section */}
        {activeTab === "restaurants" && cityData.restaurants && cityData.restaurants.length > 0 && (
          <div className="restaurants-section">
            <h2>{t("restaurants") || "Popular Restaurants"}</h2>
            <div className="restaurants-grid">
              {cityData.restaurants.map((restaurant) => (
                <div key={restaurant.id} className="restaurant-card">
                  <div className="restaurant-image">
                    <img src={restaurant.image} alt={restaurant.name} />
                    <div className="restaurant-price">{restaurant.priceRange}</div>
                  </div>
                  <div className="restaurant-content">
                    <h3>{restaurant.name}</h3>
                    {renderStars(restaurant.rating, restaurant.stars)}
                    <p className="cuisine">{restaurant.cuisine}</p>
                    <p className="signature-dishes">
                      <strong>Signature dishes:</strong> {restaurant.signatureDishes}
                    </p>
                    <div className="restaurant-info">
                      <span><MapPin size={14} /> {restaurant.location || "City Center"}</span>
                      <span><Clock size={14} /> {restaurant.openingHours || "12:00 - 23:00"}</span>
                    </div>
                    <button className="details-btn">{t("viewDetails") || "View Details"}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hidden Corners Section */}
        {activeTab === "hidden" && cityData.hiddenCorners && cityData.hiddenCorners.length > 0 && (
          <div className="hidden-section">
            <h2>{t("hiddenCorners") || "Hidden Corners"}</h2>
            <div className="hidden-grid">
              {cityData.hiddenCorners.map((corner) => (
                <div key={corner.id} className="hidden-card">
                  <div className="hidden-image">
                    <img src={corner.image} alt={corner.name} />
                    {corner.entryFee === "Free" && <div className="free-badge">Free Entry</div>}
                  </div>
                  <div className="hidden-content">
                    <h3>{corner.name}</h3>
                    {renderStars(corner.rating, corner.stars)}
                    <p>{corner.description}</p>
                    <div className="hidden-details">
                      <span><MapPin size={14} /> {corner.location}</span>
                      {corner.bestTime && <span>🌟 Best time: {corner.bestTime}</span>}
                    </div>
                    <button className="explore-btn">{t("explore") || "Explore"} <ChevronRight size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Popular Spots Section */}
        {activeTab === "spots" && cityData.popularSpots && cityData.popularSpots.length > 0 && (
          <div className="spots-section">
            <h2>{t("popularSpots") || "Popular Spots"}</h2>
            <div className="spots-grid">
              {cityData.popularSpots.map((spot) => (
                <div key={spot.id} className="spot-card">
                  <img src={spot.image} alt={spot.name} />
                  <div className="spot-overlay">
                    <span className="spot-category">{spot.category}</span>
                    <h4>{spot.name}</h4>
                    {spot.description && <p>{spot.description}</p>}
                    <div className="spot-rating">
                      <Star size={14} fill="#f5a623" color="#f5a623" />
                      <span>{spot.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CityTemplate;