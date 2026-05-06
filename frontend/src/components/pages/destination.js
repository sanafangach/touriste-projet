import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal, Star, MapPin, Activity, Heart, ArrowRight } from "lucide-react";
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

const destinationsData = [
  { id: 1, name: "Agadir", rating: 4.7, reviews: 312, activities: 12, image: agadir, location: "Souss-Massa", featured: true },
  { id: 2, name: "Atlantic Coast", rating: 4.7, reviews: 274, activities: 16, image: atlantic, location: "Coastal Region", featured: true },
  { id: 3, name: "Atlas Mountains", rating: 4.8, reviews: 342, activities: 18, image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80", location: "High Atlas", featured: true },
  { id: 4, name: "Casablanca", rating: 4.8, reviews: 528, activities: 15, image: casa, location: "Casablanca-Settat", featured: true },
  { id: 5, name: "Fez", rating: 4.7, reviews: 345, activities: 18, image: fes, location: "Fès-Meknès", featured: true },
  { id: 6, name: "Tiznit", rating: 4.8, reviews: 412, activities: 22, image: tiznit, location: "Sous Massa", featured: true },
  { id: 7, name: "Marrakech", rating: 4.9, reviews: 892, activities: 34, image: Marrakech, location: "Marrakech-Safi", featured: false },
  { id: 8, name: "Chefchaouen", rating: 4.9, reviews: 567, activities: 14, image: chefchaouen, location: "Tangier-Tetouan", featured: false },
  { id: 9, name: "Essaouira", rating: 4.6, reviews: 298, activities: 11, image: essouira, location: "Marrakech-Safi", featured: false },
  { id: 10, name: "Merzouga", rating: 4.8, reviews: 421, activities: 19, image: Merzouga, location: "Draa-Tafilalet", featured: false },
  { id: 11, name: "Rabat", rating: 4.5, reviews: 234, activities: 10, image: rabat, location: "Rabat-Salé-Kénitra", featured: false },
  { id: 12, name: "Tangier", rating: 4.6, reviews: 378, activities: 13, image: "https://images.unsplash.com/photo-1584987729951-35d44b231d25?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80", location: "Tangier-Tetouan", featured: false }
];

function Destinations() {
  const { t, lang, isRTL } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [savedItems, setSavedItems] = useState([]);

  const toggleSave = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredDestinations = destinationsData.filter(dest =>
    dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dest.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedDestinations = [...filteredDestinations].sort((a, b) => {
    switch (sortBy) {
      case "rating": return b.rating - a.rating;
      case "reviews": return b.reviews - a.reviews;
      case "activities": return b.activities - a.activities;
      case "name": return a.name.localeCompare(b.name);
      default: return 0;
    }
  });

  const startCount = 1;
  const endCount = Math.min(9, sortedDestinations.length);
  const totalCount = sortedDestinations.length;

  return (
    <div className={`destinations-page ${isRTL ? 'rtl' : ''}`}>
      {/* Hero Section */}
      <div className="destinations-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>{lang === 'AR' ? 'استكشف الوجهات' : lang === 'FR' ? 'Explorez les Destinations' : 'Explore Destinations'}</h1>
          <p>{lang === 'AR' ? 'اكتشف أجمل الوجهات في جميع أنحاء المغرب' : lang === 'FR' ? 'Découvrez les plus belles destinations à travers le Maroc' : 'Discover the most beautiful destinations across Morocco'}</p>
        </div>
        
        {/* Scroll indicator */}
        <div className="scroll-indicator" onClick={() => window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })}>
          <div className="mouse">
            <div className="wheel"></div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="search-filter-container">
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder={lang === 'AR' ? 'ابحث عن وجهة...' : lang === 'FR' ? 'Rechercher une destination...' : 'Search destinations...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="sort-container">
          <button className="sort-btn" onClick={() => setShowSortMenu(!showSortMenu)}>
            <SlidersHorizontal size={18} />
            <span>{lang === 'AR' ? 'ترتيب حسب' : lang === 'FR' ? 'Trier par' : 'Sort By'}</span>
          </button>
          {showSortMenu && (
            <div className="sort-menu">
              <button onClick={() => { setSortBy("default"); setShowSortMenu(false); }} className={sortBy === "default" ? "active" : ""}>
                {lang === 'AR' ? 'افتراضي' : lang === 'FR' ? 'Par défaut' : 'Default'}
              </button>
              <button onClick={() => { setSortBy("name"); setShowSortMenu(false); }} className={sortBy === "name" ? "active" : ""}>
                {lang === 'AR' ? 'الاسم' : lang === 'FR' ? 'Nom' : 'Name'}
              </button>
              <button onClick={() => { setSortBy("rating"); setShowSortMenu(false); }} className={sortBy === "rating" ? "active" : ""}>
                {lang === 'AR' ? 'التقييم' : lang === 'FR' ? 'Note' : 'Rating'}
              </button>
              <button onClick={() => { setSortBy("reviews"); setShowSortMenu(false); }} className={sortBy === "reviews" ? "active" : ""}>
                {lang === 'AR' ? 'المراجعات' : lang === 'FR' ? 'Avis' : 'Reviews'}
              </button>
              <button onClick={() => { setSortBy("activities"); setShowSortMenu(false); }} className={sortBy === "activities" ? "active" : ""}>
                {lang === 'AR' ? 'الأنشطة' : lang === 'FR' ? 'Activités' : 'Activities'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Results Info */}
      <div className="results-info">
        <span>
          {lang === 'AR' ? `عرض ${startCount}-${endCount} من ${totalCount} وجهة` : 
           lang === 'FR' ? `Affichage de ${startCount}-${endCount} sur ${totalCount} destinations` : 
           `Showing ${startCount}-${endCount} of ${totalCount} destinations`}
        </span>
      </div>

      {/* Destinations Grid */}
      <div className="destinations-grid">
        {sortedDestinations.slice(0, 9).map((dest) => (
          <Link to={`/destination/${dest.id}`} key={dest.id} className="destination-card">
            <div className="card-image">
              <img src={dest.image} alt={dest.name} loading="lazy" />
              <div className="card-overlay"></div>
              
              {/* Save button */}
              <button 
                className={`save-heart ${savedItems.includes(dest.id) ? 'saved' : ''}`}
                onClick={(e) => toggleSave(e, dest.id)}
              >
                <Heart size={18} fill={savedItems.includes(dest.id) ? "currentColor" : "none"} />
              </button>
              
              {/* Featured badge */}
              {dest.featured && (
                <div className="featured-badge">
                  <Star size={12} fill="currentColor" />
                  {lang === 'AR' ? 'مميز' : lang === 'FR' ? 'En vedette' : 'Featured'}
                </div>
              )}
            </div>
            
            <div className="card-content">
              <div className="card-header">
                <h3>{dest.name}</h3>
                <div className="rating">
                  <Star size={14} fill="currentColor" className="star-icon" />
                  <span>{dest.rating}</span>
                </div>
              </div>
              
              <div className="card-stats">
                <div className="stat-item">
                  <MapPin size={14} />
                  <span>{dest.location}</span>
                </div>
                <div className="stat-item">
                  <Activity size={14} />
                  <span>{dest.activities} {lang === 'AR' ? 'نشاط' : lang === 'FR' ? 'activités' : 'activities'}</span>
                </div>
              </div>
              
              <div className="card-footer">
                <span className="reviews-count">({dest.reviews} {lang === 'AR' ? 'مراجعة' : lang === 'FR' ? 'avis' : 'reviews'})</span>
                <span className="explore-link">
                  {lang === 'AR' ? 'استكشف' : lang === 'FR' ? 'Explorer' : 'Explore'}
                  <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* No Results */}
      {sortedDestinations.length === 0 && (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <p>{lang === 'AR' ? 'لا توجد وجهات تطابق بحثك' : lang === 'FR' ? 'Aucune destination ne correspond à votre recherche' : 'No destinations found matching your search'}</p>
        </div>
      )}
    </div>
  );
}

export default Destinations;