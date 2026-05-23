// src/components/pages/destination.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal, Star, MapPin, Activity, Heart, ArrowRight } from "lucide-react";
import { useLanguage } from "../accueil/LanguageContext";
import "../css/destination.css";

// Import de TES images depuis assets
import atlanticImg from "../../assets/atlantic.jpg";
import atlasImg from "../../assets/img1.jpg";
import casablancaImg from "../../assets/casa.jpg";
import fezImg from "../../assets/fes.jpg";
import marrakechImg from "../../assets/Marrakech.jpg";
import chefchaouenImg from "../../assets/Chefchaouen.jpg";
import essaouiraImg from "../../assets/essouira.jpg";
import merzougaImg from "../../assets/Merzouga.jpg";
import rabatImg from "../../assets/rabat.jpg";
import tangierImg from "../../assets/taghazot.png";
import tiznitImg from "../../assets/tiznit.jpg";
import camelImg from "../../assets/camel.jpg";
import backgroundImg from "../../assets/background2.jpg"; // Image par défaut

// Map des images par ville
const cityImages = {
  "Agadir": camelImg,
  "Atlantic Coast": atlanticImg,
  "Atlas Mountains": atlasImg,
  "Casablanca": casablancaImg,
  "Fez": fezImg,
  "Marrakech": marrakechImg,
  "Chefchaouen": chefchaouenImg,
  "Essaouira": essaouiraImg,
  "Merzouga": merzougaImg,
  "Rabat": rabatImg,
  "Tangier": tangierImg,
  "Tiznit": tiznitImg
};

const destinationsData = [
  { id: 1, name: "Agadir", slug: "agadir", rating: 4.7, reviews: 312, activities: 12, location: "Souss-Massa", featured: true },
  { id: 2, name: "Atlantic Coast", slug: "atlantic-coast", rating: 4.7, reviews: 274, activities: 16, location: "Coastal Region", featured: true },
  { id: 3, name: "Atlas Mountains", slug: "atlas-mountains", rating: 4.8, reviews: 342, activities: 18, location: "High Atlas", featured: true },
  { id: 4, name: "Casablanca", slug: "casablanca", rating: 4.8, reviews: 528, activities: 15, location: "Casablanca-Settat", featured: true },
  { id: 5, name: "Fez", slug: "fes", rating: 4.7, reviews: 345, activities: 18, location: "Fès-Meknès", featured: true },
  { id: 6, name: "Marrakech", slug: "marrakech", rating: 4.9, reviews: 892, activities: 34, location: "Marrakech-Safi", featured: true },
  { id: 7, name: "Chefchaouen", slug: "chefchaouen", rating: 4.9, reviews: 567, activities: 14, location: "Tangier-Tetouan", featured: false },
  { id: 8, name: "Essaouira", slug: "essaouira", rating: 4.6, reviews: 298, activities: 11, location: "Marrakech-Safi", featured: false },
  { id: 9, name: "Merzouga", slug: "merzouga", rating: 4.8, reviews: 421, activities: 19, location: "Draa-Tafilalet", featured: false },
  { id: 10, name: "Rabat", slug: "rabat", rating: 4.5, reviews: 234, activities: 10, location: "Rabat-Salé-Kénitra", featured: false },
  { id: 11, name: "Tangier", slug: "tangier", rating: 4.6, reviews: 378, activities: 13, location: "Tangier-Tetouan", featured: false },
  { id: 12, name: "Tiznit", slug: "tiznit", rating: 4.8, reviews: 412, activities: 22, location: "Sous Massa", featured: false }
].map(city => ({
  ...city,
  image: cityImages[city.name] || backgroundImg // fallback si image non trouvée
}));

function Destinations() {
  const { lang, isRTL } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [savedItems, setSavedItems] = useState([]);

  const toggleSave = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const filtered = destinationsData.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "reviews") return b.reviews - a.reviews;
    if (sortBy === "activities") return b.activities - a.activities;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  const endCount = Math.min(9, sorted.length);

  return (
    <div className={`destinations-page ${isRTL ? 'rtl' : ''}`}>
      <div className="destinations-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>{lang === 'AR' ? 'استكشف الوجهات' : lang === 'FR' ? 'Explorez les Destinations' : 'Explore Destinations'}</h1>
          <p>{lang === 'AR' ? 'اكتشف أجمل الوجهات في المغرب' : lang === 'FR' ? 'Découvrez les plus belles destinations' : 'Discover the most beautiful destinations in Morocco'}</p>
        </div>
      </div>

      <div className="search-filter-container">
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input type="text" placeholder={lang === 'AR' ? 'ابحث...' : lang === 'FR' ? 'Rechercher...' : 'Search...'} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input" />
        </div>
        <div className="sort-container">
          <button className="sort-btn" onClick={() => setShowSortMenu(!showSortMenu)}>
            <SlidersHorizontal size={18} />
            <span>{lang === 'AR' ? 'ترتيب' : lang === 'FR' ? 'Trier' : 'Sort'}</span>
          </button>
          {showSortMenu && (
            <div className="sort-menu">
              <button onClick={() => { setSortBy("default"); setShowSortMenu(false); }}>Default</button>
              <button onClick={() => { setSortBy("name"); setShowSortMenu(false); }}>Name</button>
              <button onClick={() => { setSortBy("rating"); setShowSortMenu(false); }}>Rating</button>
              <button onClick={() => { setSortBy("reviews"); setShowSortMenu(false); }}>Reviews</button>
              <button onClick={() => { setSortBy("activities"); setShowSortMenu(false); }}>Activities</button>
            </div>
          )}
        </div>
      </div>

      <div className="results-info">
        <span>Showing 1-{endCount} of {sorted.length} destinations</span>
      </div>

      <div className="destinations-grid">
        {sorted.slice(0, 9).map((dest) => (
          <Link to={`/destination/${dest.slug}`} key={dest.id} className="destination-card">
            <div className="card-image">
              <img src={dest.image} alt={dest.name} />
              <button className={`save-heart ${savedItems.includes(dest.id) ? 'saved' : ''}`} onClick={(e) => toggleSave(e, dest.id)}>
                <Heart size={18} fill={savedItems.includes(dest.id) ? "currentColor" : "none"} />
              </button>
              {dest.featured && <div className="featured-badge">⭐ Featured</div>}
            </div>
            <div className="card-content">
              <h3>{dest.name}</h3>
              <div className="rating"><Star size={14} fill="currentColor" /> {dest.rating}</div>
              <div className="location"><MapPin size={14} /> {dest.location}</div>
              <div className="activities"><Activity size={14} /> {dest.activities} activities</div>
              <div className="reviews">({dest.reviews} reviews)</div>
              <div className="explore-link">Explore <ArrowRight size={14} /></div>
            </div>
          </Link>
        ))}
      </div>

      {sorted.length === 0 && (
        <div className="no-results">
          <p>No destinations found</p>
        </div>
      )}
    </div>
  );
}

export default Destinations;