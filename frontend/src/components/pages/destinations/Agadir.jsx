// src/components/pages/destinations/Agadir.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Star, MapPin, Clock, Heart, Share2, ArrowLeft, 
  ChevronRight, Utensils, Building2, Mountain, 
  Sun, Camera, Award, Users, Phone, Globe,
  Navigation, Calendar, DollarSign, Wifi, 
  Wind, Waves, Bike
} from "lucide-react";
import { useLanguage } from "../../accueil/LanguageContext";
import "../../css/CityDetail.css";

// Import de tes images locales
import heroImage from "../../../assets/cities/Agadir/hero.jpg";
import camelRide from "../../../assets/cities/Agadir/camel-ride.jpg";
import quadBike from "../../../assets/cities/Agadir/quad-bike.jpg";
import balloon from "../../../assets/cities/Agadir/balloon.png";
import place1 from "../../../assets/cities/Agadir/place1.png";
import place2 from "../../../assets/cities/Agadir/place2.png";
import place3 from "../../../assets/cities/Agadir/place3.png";
import hidden1 from "../../../assets/cities/Agadir/hidden1.png";
import hidden2 from "../../../assets/cities/Agadir/hidden2.png";

function Agadir() {
  const navigate = useNavigate();
  const { t, lang, isRTL } = useLanguage();
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("activities");
  const [scrolled, setScrolled] = useState(false);
  
  // State pour les favoris de chaque item
  const [favoriteActivities, setFavoriteActivities] = useState({});
  const [favoriteRestaurants, setFavoriteRestaurants] = useState({});
  const [favoritePlaces, setFavoritePlaces] = useState({});
  const [favoriteGems, setFavoriteGems] = useState({});

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fonction pour toggle favorite
  const toggleFavorite = (e, id, type) => {
    e.preventDefault();
    e.stopPropagation();
    
    switch(type) {
      case 'activity':
        setFavoriteActivities(prev => ({ ...prev, [id]: !prev[id] }));
        break;
      case 'restaurant':
        setFavoriteRestaurants(prev => ({ ...prev, [id]: !prev[id] }));
        break;
      case 'place':
        setFavoritePlaces(prev => ({ ...prev, [id]: !prev[id] }));
        break;
      case 'gem':
        setFavoriteGems(prev => ({ ...prev, [id]: !prev[id] }));
        break;
      default:
        break;
    }
  };

  const cityData = {
    name: "Agadir",
    nameAr: "أكادير",
    heroTitle: "DÉCOUVRIR AGADIR",
    heroTitleAr: "اكتشف أكادير",
    heroTitleFr: "DÉCOUVRIR AGADIR",
    heroSubtitle: "La perle de l'Atlantique entre plages dorées et montagnes majestueuses",
    heroSubtitleAr: "لؤلؤة الأطلسي بين الشواطئ الذهبية والجبال المهيبة",
    heroSubtitleFr: "La perle de l'Atlantique entre plages dorées et montagnes majestueuses",
    heroImage: heroImage,
    
    description: "Agadir is a beautiful coastal city known for its golden beaches, vibrant culture, and stunning views of the Atlas Mountains.",
    
    stats: {
      activities: 45,
      restaurants: 28,
      places: 15,
      rating: 4.7
    },

    activities: [
      {
        id: 1,
        name: "Camel Ride",
        nameAr: "ركوب الجمل",
        price: "$110",
        priceValue: 110,
        duration: "2 hours",
        rating: 4.8,
        stars: 5,
        description: "Learn to ride a camel in this breathtaking experience along the beach with stunning ocean views.",
        image: camelRide,
        includes: ["Professional guide", "Camel ride", "Mint tea ceremony", "Traditional clothing"],
        bestTime: "Sunset",
        icon: <Sun size={20} />
      },
      {
        id: 2,
        name: "Quad Bike Desert Safari",
        nameAr: "سفاري بالكواد",
        price: "$25-45",
        priceValue: 35,
        duration: "2 hours",
        rating: 4.3,
        stars: 4,
        description: "Experience the thrill of quad biking on a desert adventure through the dunes.",
        image: quadBike,
        includes: ["Quad bike", "Helmet", "Safety briefing", "Guide", "Refreshments"],
        bestTime: "Morning",
        icon: <Bike size={20} />
      },
      {
        id: 3,
        name: "Surf Lessons",
        nameAr: "دروس ركوب الأمواج",
        price: "$100",
        priceValue: 100,
        duration: "3 hours",
        rating: 4.6,
        stars: 4,
        description: "Learn to surf with professional instructors at one of Morocco's best surf spots.",
        image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        includes: ["Surfboard", "Wetsuit", "Professional instructor", "Photos"],
        bestTime: "Morning",
        icon: <Waves size={20} />
      },
      {
        id: 4,
        name: "Hot Air Balloon",
        nameAr: "بالون الهواء الساخن",
        price: "$120",
        priceValue: 120,
        duration: "4 hours",
        rating: 4.9,
        stars: 5,
        description: "Experience breathtaking views of Agadir and the Atlas Mountains from above.",
        image: balloon,
        includes: ["Balloon ride", "Breakfast", "Certificate", "Transport"],
        bestTime: "Sunrise",
        icon: <Wind size={20} />
      }
    ],

    restaurants: [
      {
        id: 1,
        name: "Le Jardin d'Eau",
        nameAr: "حديقة الماء",
        rating: 4.9,
        stars: 5,
        priceRange: "$$$",
        priceValue: "$25-45",
        cuisine: "Moroccan & International",
        signatureDishes: ["Tagine", "Couscous", "Pastilla", "Mint Tea"],
        description: "Authentic Moroccan flavors served in a beautiful garden setting.",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        location: "Agadir Center",
        openingHours: "12:00 - 23:00",
        phone: "+212 5XX XXX XXX",
        features: ["Outdoor seating", "Vegetarian options", "Free WiFi", "Parking"]
      },
      {
        id: 2,
        name: "La Scala",
        nameAr: "لا سكالا",
        rating: 4.7,
        stars: 4,
        priceRange: "$$$",
        priceValue: "$30-50",
        cuisine: "Seafood & Mediterranean",
        signatureDishes: ["Fresh Fish", "Paella", "Seafood Soup", "Grilled Lobster"],
        description: "Fresh seafood with an olive oil drizzle and Moroccan spices.",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        location: "Marina Agadir",
        openingHours: "12:00 - 23:30",
        phone: "+212 5XX XXX XXX",
        features: ["Sea view", "Romantic", "Reservations recommended"]
      },
      {
        id: 3,
        name: "Pure Passion",
        nameAr: "بيور باشن",
        rating: 4.8,
        stars: 5,
        priceRange: "$$$$",
        priceValue: "$35-60",
        cuisine: "French-Moroccan Fusion",
        signatureDishes: ["Foie gras", "Lamb chops", "Crème brûlée"],
        description: "Elegant dining with a blend of French and Moroccan cuisines.",
        image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        location: "Tour Hassan",
        openingHours: "19:00 - 00:00",
        phone: "+212 5XX XXX XXX",
        features: ["Fine dining", "Wine cellar", "Private rooms"]
      }
    ],

    placesToVisit: [
      {
        id: 1,
        name: "Agadir Beach",
        nameAr: "شاطئ أكادير",
        category: "Beach",
        rating: 4.8,
        description: "Main public beach with golden sand and clear waters, perfect for swimming and sunbathing.",
        image: place1,
        location: "Agadir Center",
        openingHours: "24/7",
        entryPrice: "Free",
        bestTime: "Morning/Afternoon",
        activities: ["Swimming", "Sunbathing", "Walking", "Volleyball"]
      },
      {
        id: 2,
        name: "Agadir Oufella Ruins",
        nameAr: "أنقاض أكادير أوفيلا",
        category: "Historical",
        rating: 4.6,
        description: "Ancient kasbah with panoramic views of the city and ocean. Perfect for sunset photos.",
        image: place2,
        location: "Hill overlooking Agadir",
        openingHours: "9:00 - 18:00",
        entryPrice: "$2",
        bestTime: "Sunset",
        activities: ["Photography", "History", "Sightseeing"]
      },
      {
        id: 3,
        name: "Marina Agadir",
        nameAr: "مرينا أكادير",
        category: "Marina",
        rating: 4.7,
        description: "Modern marina with luxury yachts, restaurants, and shopping.",
        image: place3,
        location: "Agadir Bay",
        openingHours: "24/7",
        entryPrice: "Free",
        bestTime: "Evening",
        activities: ["Walking", "Dining", "Shopping", "Boat tours"]
      }
    ],

    hiddenGems: [
      {
        id: 1,
        name: "Secret Viewpoint at Agadir Oufella",
        description: "Hidden spot with the best panoramic view of the entire bay.",
        image: hidden1,
        location: "Behind the Kasbah",
        bestTime: "Sunset"
      },
      {
        id: 2,
        name: "Taghazout Fishing Village",
        description: "Charming surf village with authentic atmosphere.",
        image: hidden2,
        location: "20km north of Agadir",
        bestTime: "Morning"
      }
    ]
  };

  const renderStars = (rating, stars) => {
    return (
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            fill={i < stars ? "#f5a623" : "none"}
            color={i < stars ? "#f5a623" : "#ddd"}
          />
        ))}
        <span className="rating-value">{rating}</span>
      </div>
    );
  };

  return (
    <div className="city-detail" dir={isRTL ? "rtl" : "ltr"}>
      {/* Hero Section avec grande image */}
      <div className="city-hero" style={{ backgroundImage: `url(${cityData.heroImage})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-container">
          <button className="back-button" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
            {t("back") || "Back"}
          </button>
          
          <div className="hero-content">
            <div className="hero-badge">
              <Award size={16} />
              Top Destination 2024
            </div>
            <h1>{cityData.heroTitle}</h1>
            <p>{cityData.heroSubtitle}</p>
            
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-value">{cityData.stats.activities}+</div>
                <div className="stat-label">Activities</div>
              </div>
              <div className="stat">
                <div className="stat-value">{cityData.stats.restaurants}+</div>
                <div className="stat-label">Restaurants</div>
              </div>
              <div className="stat">
                <div className="stat-value">{cityData.stats.places}+</div>
                <div className="stat-label">Places</div>
              </div>
              <div className="stat">
                <div className="stat-value">{cityData.stats.rating}</div>
                <div className="stat-label">
                  <Star size={12} fill="#f5a623" color="#f5a623" />
                  Rating
                </div>
              </div>
            </div>

            <div className="hero-actions">
              <button className={`save-btn ${saved ? "saved" : ""}`} onClick={() => setSaved(!saved)}>
                <Heart size={18} fill={saved ? "white" : "none"} />
                {saved ? "Saved" : "Save"}
              </button>
              <button className="share-btn">
                <Share2 size={18} />
                Share
              </button>
            </div>
          </div>
        </div>
        
        <div className="scroll-indicator" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
          <div className="mouse">
            <div className="wheel"></div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className={`tabs-container ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="tabs">
            <button className={`tab ${activeTab === "activities" ? "active" : ""}`} onClick={() => setActiveTab("activities")}>
              <Mountain size={18} />
              <span>Activities</span>
            </button>
            <button className={`tab ${activeTab === "restaurants" ? "active" : ""}`} onClick={() => setActiveTab("restaurants")}>
              <Utensils size={18} />
              <span>Restaurants</span>
            </button>
            <button className={`tab ${activeTab === "places" ? "active" : ""}`} onClick={() => setActiveTab("places")}>
              <Building2 size={18} />
              <span>Places to Visit</span>
            </button>
            <button className={`tab ${activeTab === "hidden" ? "active" : ""}`} onClick={() => setActiveTab("hidden")}>
              <Camera size={18} />
              <span>Hidden Gems</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        {/* ========== ACTIVITIES SECTION ========== */}
        {activeTab === "activities" && (
          <div className="activities-section">
            <div className="section-header">
              <h2>Things to Do in {cityData.name}</h2>
              <p>Discover the best experiences and adventures</p>
            </div>
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
                    {/* ❤️ BOUTON FAVORI - ACTIVITIES */}
                    <button 
                      className={`favorite-btn ${favoriteActivities[activity.id] ? 'active' : ''}`}
                      onClick={(e) => toggleFavorite(e, activity.id, 'activity')}
                    >
                      <Heart size={18} fill={favoriteActivities[activity.id] ? "#ff6b35" : "none"} />
                    </button>
                  </div>
                  <div className="activity-content">
                    <div className="activity-header">
                      <h3>{activity.name}</h3>
                      {renderStars(activity.rating, activity.stars)}
                    </div>
                    <p className="activity-description">{activity.description}</p>
                    <div className="activity-includes">
                      <div className="includes-title">
                        <Award size={14} />
                        Includes:
                      </div>
                      <div className="includes-list">
                        {activity.includes.map((item, idx) => (
                          <span key={idx} className="include-item">✓ {item}</span>
                        ))}
                      </div>
                    </div>
                    <div className="activity-best-time">
                      <Sun size={14} />
                      Best time: {activity.bestTime}
                    </div>
                    <button className="book-btn">
                      Book Now
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== RESTAURANTS SECTION ========== */}
        {activeTab === "restaurants" && (
          <div className="restaurants-section">
            <div className="section-header">
              <h2>Best Restaurants in {cityData.name}</h2>
              <p>Experience the finest culinary delights</p>
            </div>
            <div className="restaurants-grid">
              {cityData.restaurants.map((restaurant) => (
                <div key={restaurant.id} className="restaurant-card">
                  <div className="restaurant-image">
                    <img src={restaurant.image} alt={restaurant.name} />
                    <div className="restaurant-price-badge">{restaurant.priceValue}</div>
                    {/* ❤️ BOUTON FAVORI - RESTAURANTS */}
                    <button 
                      className={`favorite-btn ${favoriteRestaurants[restaurant.id] ? 'active' : ''}`}
                      onClick={(e) => toggleFavorite(e, restaurant.id, 'restaurant')}
                    >
                      <Heart size={18} fill={favoriteRestaurants[restaurant.id] ? "#ff6b35" : "none"} />
                    </button>
                  </div>
                  <div className="restaurant-content">
                    <div className="restaurant-header">
                      <h3>{restaurant.name}</h3>
                      {renderStars(restaurant.rating, restaurant.stars)}
                    </div>
                    <div className="restaurant-cuisine">
                      <Utensils size={14} />
                      {restaurant.cuisine}
                    </div>
                    <p className="restaurant-description">{restaurant.description}</p>
                    <div className="restaurant-signature">
                      <strong>Signature dishes:</strong>
                      <div className="signature-list">
                        {restaurant.signatureDishes.map((dish, idx) => (
                          <span key={idx} className="signature-item">{dish}</span>
                        ))}
                      </div>
                    </div>
                    <div className="restaurant-info">
                      <div className="info-row">
                        <MapPin size={14} />
                        <span>{restaurant.location}</span>
                      </div>
                      <div className="info-row">
                        <Clock size={14} />
                        <span>{restaurant.openingHours}</span>
                      </div>
                      <div className="info-row">
                        <Phone size={14} />
                        <span>{restaurant.phone}</span>
                      </div>
                    </div>
                    <div className="restaurant-features">
                      {restaurant.features.map((feature, idx) => (
                        <span key={idx} className="feature-tag">{feature}</span>
                      ))}
                    </div>
                    <button className="details-btn">
                      View Details
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== PLACES TO VISIT SECTION ========== */}
        {activeTab === "places" && (
          <div className="places-section">
            <div className="section-header">
              <h2>Must-Visit Places in {cityData.name}</h2>
              <p>Discover the most iconic spots and attractions</p>
            </div>
            <div className="places-grid">
              {cityData.placesToVisit.map((place) => (
                <div key={place.id} className="place-card">
                  <div className="place-image">
                    <img src={place.image} alt={place.name} />
                    <div className="place-category">{place.category}</div>
                    {/* ❤️ BOUTON FAVORI - PLACES */}
                    <button 
                      className={`favorite-btn ${favoritePlaces[place.id] ? 'active' : ''}`}
                      onClick={(e) => toggleFavorite(e, place.id, 'place')}
                    >
                      <Heart size={18} fill={favoritePlaces[place.id] ? "#ff6b35" : "none"} />
                    </button>
                  </div>
                  <div className="place-content">
                    <h3>{place.name}</h3>
                    <div className="place-rating">
                      <Star size={14} fill="#f5a623" color="#f5a623" />
                      <span>{place.rating}</span>
                    </div>
                    <p className="place-description">{place.description}</p>
                    <div className="place-details">
                      <div className="detail">
                        <MapPin size={14} />
                        <span>{place.location}</span>
                      </div>
                      <div className="detail">
                        <Clock size={14} />
                        <span>{place.openingHours}</span>
                      </div>
                      <div className="detail">
                        <DollarSign size={14} />
                        <span>{place.entryPrice}</span>
                      </div>
                    </div>
                    <div className="place-activities">
                      <strong>Activities:</strong>
                      {place.activities.map((activity, idx) => (
                        <span key={idx} className="activity-tag">{activity}</span>
                      ))}
                    </div>
                    <button className="explore-btn">
                      Explore
                      <Navigation size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== HIDDEN GEMS SECTION ========== */}
        {activeTab === "hidden" && (
          <div className="hidden-section">
            <div className="section-header">
              <h2>Hidden Gems in {cityData.name}</h2>
              <p>Off the beaten path experiences</p>
            </div>
            <div className="hidden-grid">
              {cityData.hiddenGems.map((gem) => (
                <div key={gem.id} className="hidden-card">
                  <div className="hidden-image">
                    <img src={gem.image} alt={gem.name} />
                    {/* ❤️ BOUTON FAVORI - HIDDEN GEMS */}
                    <button 
                      className={`favorite-btn ${favoriteGems[gem.id] ? 'active' : ''}`}
                      onClick={(e) => toggleFavorite(e, gem.id, 'gem')}
                    >
                      <Heart size={18} fill={favoriteGems[gem.id] ? "#ff6b35" : "none"} />
                    </button>
                  </div>
                  <div className="hidden-content">
                    <h3>{gem.name}</h3>
                    <p>{gem.description}</p>
                    <div className="hidden-meta">
                      <span><MapPin size={14} /> {gem.location}</span>
                      <span><Sun size={14} /> Best time: {gem.bestTime}</span>
                    </div>
                    <button className="discover-btn">
                      Discover
                      <ChevronRight size={16} />
                    </button>
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

export default Agadir;