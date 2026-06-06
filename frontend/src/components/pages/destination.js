// src/components/pages/destination.js
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  Star,
  MapPin,
  Activity,
  Heart,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "../accueil/LanguageContext";
import { useFavorites } from "../../context/FavoritesContext";
import api from "../../services/api";
import "../css/destination.css";

import backgroundImg from "../../assets/background2.jpg";

const backendUploadsUrl = "http://localhost:8000/uploads/";

const isResolvedImage = (image) =>
  typeof image === "string" &&
  (image.startsWith("http") ||
    image.startsWith("/") ||
    image.startsWith("data:") ||
    image.startsWith("blob:"));

const getImageSrc = (image) => {
  if (!image) return backgroundImg;
  return isResolvedImage(image) ? image : `${backendUploadsUrl}${image}`;
};

const getCityListFromResponse = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.cities)) return data.cities;
  return [];
};

const normalizeCity = (city) => {
  return {
    id: city.id,
    name: city.name,
    slug: city.slug,
    description: city.description || "",
    rating: Number(city.rating || 0),
    reviews: Number(city.reviews || 0),
    activities: Number(city.activities_count ?? city.activities?.length ?? 0),
    location: city.location || city.region || "",
    featured: Boolean(city.featured),
    image: getImageSrc(city.image),
  };
};

function Destinations() {
  const { lang, isRTL } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchDestinations = async () => {
      setLoading(true);

      try {
        const response = await api.get("/cities");
        const cities = getCityListFromResponse(response.data)
          .filter((city) => city?.id && city?.name && city?.slug)
          .map(normalizeCity);

        if (isMounted) {
          setDestinations(cities);
        }
      } catch (error) {
        console.error("Unable to fetch destinations:", error);
        if (isMounted) {
          setDestinations([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDestinations();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleFavoriteClick = (event, destination) => {
    event.preventDefault();
    event.stopPropagation();
    toggleFavorite("city", destination);
  };

  const filtered = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return destinations;

    return destinations.filter(
      (destination) =>
        destination.name.toLowerCase().includes(query) ||
        destination.description.toLowerCase().includes(query) ||
        destination.location.toLowerCase().includes(query)
    );
  }, [destinations, searchTerm]);

  const sorted = useMemo(
    () =>
      [...filtered].sort((a, b) => {
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "reviews") return b.reviews - a.reviews;
        if (sortBy === "activities") return b.activities - a.activities;
        if (sortBy === "name") return a.name.localeCompare(b.name);
        return 0;
      }),
    [filtered, sortBy]
  );

  const endCount = Math.min(9, sorted.length);

  return (
    <div className={`destinations-page ${isRTL ? "rtl" : ""}`}>
      <div className="destinations-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>
            {lang === "AR"
              ? "استكشف الوجهات"
              : lang === "FR"
              ? "Explorez les destinations"
              : "Explore Destinations"}
          </h1>
          <p>
            {lang === "AR"
              ? "اكتشف اجمل الوجهات في المغرب"
              : lang === "FR"
              ? "Decouvrez les plus belles destinations"
              : "Discover the most beautiful destinations in Morocco"}
          </p>
        </div>
      </div>

      <div className="search-filter-container">
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder={lang === "AR" ? "ابحث..." : lang === "FR" ? "Rechercher..." : "Search..."}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="search-input"
          />
        </div>

        <div className="sort-container">
          <button
            type="button"
            className="sort-btn"
            onClick={() => setShowSortMenu((current) => !current)}
          >
            <SlidersHorizontal size={18} />
            <span>{lang === "AR" ? "ترتيب" : lang === "FR" ? "Trier" : "Sort"}</span>
          </button>

          {showSortMenu && (
            <div className="sort-menu">
              <button type="button" onClick={() => { setSortBy("default"); setShowSortMenu(false); }}>Default</button>
              <button type="button" onClick={() => { setSortBy("name"); setShowSortMenu(false); }}>Name</button>
              <button type="button" onClick={() => { setSortBy("rating"); setShowSortMenu(false); }}>Rating</button>
              <button type="button" onClick={() => { setSortBy("activities"); setShowSortMenu(false); }}>Activities</button>
            </div>
          )}
        </div>
      </div>

      <div className="results-info">
        <span>
          {loading
            ? "Loading destinations..."
            : `Showing ${sorted.length ? `1-${endCount}` : "0"} of ${sorted.length} destinations`}
        </span>
      </div>

      {!loading && sorted.length > 0 && (
        <div className="destinations-grid">
          {sorted.slice(0, 9).map((destination) => {
            const saved = isFavorite("city", destination.id);

            return (
              <Link
                to={`/destination/${destination.slug}`}
                key={destination.id}
                className="destination-card"
              >
                <div className="card-image">
                  <img src={destination.image} alt={destination.name} />
                  <button
                    type="button"
                    className={`save-heart ${saved ? "saved" : ""}`}
                    onClick={(event) => handleFavoriteClick(event, destination)}
                    aria-label={saved ? "Remove from favorites" : "Add to favorites"}
                    title={saved ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart size={18} fill={saved ? "currentColor" : "none"} />
                  </button>
                  {destination.featured && <div className="featured-badge">Featured</div>}
                </div>

                <div className="card-content">
                  <div className="card-header">
                    <h3>{destination.name}</h3>
                    <div className="rating">
                      <Star size={14} fill="currentColor" />
                      {destination.rating}
                    </div>
                  </div>

                  <div className="card-stats">
                    {destination.location && (
                      <span className="stat-item">
                        <MapPin size={14} />
                        {destination.location}
                      </span>
                    )}
                    <span className="stat-item">
                      <Activity size={14} />
                      {destination.activities} activities
                    </span>
                  </div>

                  <div className="card-footer">
                    <span className="reviews-count">
                      {destination.reviews > 0 ? `(${destination.reviews} reviews)` : ""}
                    </span>
                    <div className="explore-link">
                      Explore
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {!loading && sorted.length === 0 && (
        <div className="no-results">
          <p>No destinations found</p>
        </div>
      )}
    </div>
  );
}

export default Destinations;
