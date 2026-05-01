import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal, Star, MapPin, Activity } from "lucide-react";
import { useLanguage } from "../accueil/LanguageContext";
import "../css/destination.css";

import agadir from "../../assets/agadir(1).jpg";
import atlantic from "../../assets/atlantic.jpg";
import casa from "../../assets/casa.jpg";
import fes from "../../assets/fes.jpg";
import chefchaouen from "../../assets/Chefchaouen.jpg";
import Merzouga from "../../assets/Merzouga.jpg";
import Marrakech from "../../assets/Marrakech.jpg";
import essouira from "../../assets/essouira.jpg";
import rabat from "../../assets/rabat.jpg";
import tiznit from "../../assets/tiznit.jpg";


// Sample destinations data matching the image content
const destinationsData = [
  {
    id: 1,
    name: "Agadir",
    rating: 4.7,
    reviews: 312,
    activities: 12,
    image: agadir,
    location: "Souss-Massa",
    featured: true
  },
  {
    id: 2,
    name: "Atlantic Coast",
    rating: 4.7,
    reviews: 274,
    activities: 16,
    image: atlantic,
    location: "Coastal Region",
    featured: true
  },
  {
    id: 3,
    name: "Atlas Mountains",
    rating: 4.8,
    reviews: 342,
    activities: 18,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
    location: "High Atlas",
    featured: true
  },
  {
    id: 4,
    name: "Casablanca",
    rating: 4.8,
    reviews: 528,
    activities: 15,
    image: casa,
    location: "Casablanca-Settat",
    featured: true
  },
  {
    id: 5,
    name: "Fez",
    rating: 4.7,
    reviews: 345,
    activities: 18,
    image: fes,
    location: "Fès-Meknès",
    featured: true
  },
  {
    id: 6,
    name: "Tiznit",
    rating: 4.8,
    reviews: 412,
    activities: 22,
    image: tiznit,
    location: "Sous Massa",
    featured: true
  },
  {
    id: 7,
    name: "Marrakech",
    rating: 4.9,
    reviews: 892,
    activities: 34,
    image: Marrakech,
    location: "Marrakech-Safi",
    featured: false
  },
  {
    id: 8,
    name: "Chefchaouen",
    rating: 4.9,
    reviews: 567,
    activities: 14,
    image: chefchaouen,
    location: "Tangier-Tetouan",
    featured: false
  },
  {
    id: 9,
    name: "Essaouira",
    rating: 4.6,
    reviews: 298,
    activities: 11,
    image: essouira,
    location: "Marrakech-Safi",
    featured: false
  },
  {
    id: 10,
    name: "Merzouga",
    rating: 4.8,
    reviews: 421,
    activities: 19,
    image: Merzouga,
    location: "Draa-Tafilalet",
    featured: false
  },
  {
    id: 11,
    name: "Rabat",
    rating: 4.5,
    reviews: 234,
    activities: 10,
    image: rabat,
    location: "Rabat-Salé-Kénitra",
    featured: false
  },
  {
    id: 12,
    name: "Tangier",
    rating: 4.6,
    reviews: 378,
    activities: 13,
    image: "https://images.unsplash.com/photo-1584987729951-35d44b231d25?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
    location: "Tangier-Tetouan",
    featured: false
  }
];

function Destinations() {
  const { t, isRTL } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [showSortMenu, setShowSortMenu] = useState(false);

  // Filter destinations based on search term
  const filteredDestinations = destinationsData.filter(dest =>
    dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dest.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort destinations
  const sortedDestinations = [...filteredDestinations].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "reviews":
        return b.reviews - a.reviews;
      case "activities":
        return b.activities - a.activities;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  // Get display range
  const startCount = 1;
  const endCount = Math.min(9, sortedDestinations.length);
  const totalCount = sortedDestinations.length;

  return (
    <div className="destinations-page" dir={isRTL ? "rtl" : "ltr"}>
      {/* Hero Section with Background Image */}
      <div className="destinations-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>{t("explore Destinations") || "Explore Destinations"}</h1>
          <p>{t("where do u want to go ?") || "Discover the most beautiful destinations across Morocco."}</p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="search-filter-container">
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder={t("searchDestinations") || "Search destinations..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="sort-container">
          <button 
            className="sort-btn"
            onClick={() => setShowSortMenu(!showSortMenu)}
          >
            <SlidersHorizontal size={18} />
            <span>{t("sortBy") || "Sort By"}</span>
          </button>
          {showSortMenu && (
            <div className="sort-menu">
              <button onClick={() => { setSortBy("default"); setShowSortMenu(false); }} className={sortBy === "default" ? "active" : ""}>
                {t("default") || "Default"}
              </button>
              <button onClick={() => { setSortBy("name"); setShowSortMenu(false); }} className={sortBy === "name" ? "active" : ""}>
                {t("name") || "Name"}
              </button>
              <button onClick={() => { setSortBy("rating"); setShowSortMenu(false); }} className={sortBy === "rating" ? "active" : ""}>
                {t("rating") || "Rating"}
              </button>
              <button onClick={() => { setSortBy("reviews"); setShowSortMenu(false); }} className={sortBy === "reviews" ? "active" : ""}>
                {t("reviews") || "Reviews"}
              </button>
              <button onClick={() => { setSortBy("activities"); setShowSortMenu(false); }} className={sortBy === "activities" ? "active" : ""}>
                {t("activities") || "Activities"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Results Info */}
      <div className="results-info">
        <span>
          {t("showing") || "Showing"} {startCount}-{endCount} {t("of") || "of"} {totalCount} {t("destinations") || "destinations"}
        </span>
      </div>

      {/* Destinations Grid */}
      <div className="destinations-grid">
        {sortedDestinations.slice(0, 9).map((dest) => (
          <Link to={`/destination/${dest.id}`} key={dest.id} className="destination-card">
            <div className="card-image">
              <img src={dest.image} alt={dest.name} loading="lazy" />
              <div className="card-overlay"></div>
            </div>
            <div className="card-content">
              <h3>{dest.name}</h3>
              <div className="card-stats">
                <div className="rating">
                  <Star size={16} fill="currentColor" className="star-icon" />
                  <span>{dest.rating}</span>
                  <span className="reviews">({dest.reviews} {t("reviews") || "reviews"})</span>
                </div>
                <div className="activities">
                  <Activity size={16} />
                  <span>{dest.activities} {t("activities") || "activities"}</span>
                </div>
              </div>
              <div className="location">
                <MapPin size={14} />
                <span>{dest.location}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* No Results Message */}
      {sortedDestinations.length === 0 && (
        <div className="no-results">
          <p>{t("noDestinations") || "No destinations found matching your search."}</p>
        </div>
      )}
    </div>
  );
}

export default Destinations;