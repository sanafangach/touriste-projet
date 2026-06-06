import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Star,
  Heart,
  Share2,
  ArrowLeft,
  ChevronRight,
  Utensils,
  Building2,
  Mountain,
  Camera,
  Award,
  Clock,
  MapPin,
  DollarSign
} from "lucide-react";

import { useFavorites } from "../../../context/FavoritesContext";
import "../../css/CityDetail.css";

function CityDetail() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [activeTab, setActiveTab] = useState("activities");
  const [scrolled, setScrolled] = useState(false);

  const [cityData, setCityData] = useState(null);
  const [loading, setLoading] = useState(true);

  // SCROLL EFFECT
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // API FETCH
  useEffect(() => {
    const fetchCity = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `http://localhost:8000/api/cities/${slug}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch city");
        }

        const data = await res.json();

        setCityData(data);
      } catch (err) {
        console.log("API ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCity();
  }, [slug]);

  const handleFavoriteClick = (e, item, type) => {
    e.preventDefault();
    e.stopPropagation();

    toggleFavorite(type, item);
  };

  // STARS
  const renderStars = (rating) => (
    <div className="stars">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          fill={i < Math.round(rating) ? "#f5a623" : "none"}
          color={i < Math.round(rating) ? "#f5a623" : "#ddd"}
        />
      ))}

      <span className="rating-value">{rating}</span>
    </div>
  );

  // LOADING
  if (loading) {
    return (
      <div className="loading-page">
        <h1>Loading...</h1>
      </div>
    );
  }

  // NO DATA
  if (!cityData || !cityData.city) {
    return (
      <div className="loading-page">
        <h1>City not found</h1>
      </div>
    );
  }

  const citySaved = isFavorite("city", cityData.city.id);

  return (
    <div className="city-detail">

      {/* HERO */}
      <div
        className="city-hero"
        style={{
          backgroundImage: `url(http://localhost:8000/uploads/${cityData.city.image})`
        }}
      >
        <div className="hero-overlay"></div>

        <div className="hero-container">

          <button
            className="back-button"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={20} />
            Back
          </button>

          <div className="hero-content">

            <div className="hero-badge">
              <Award size={16} />
              Top Destination
            </div>

            <h1>{cityData.city.name}</h1>

            <p>{cityData.city.description}</p>

            <div className="hero-stats">

              <div className="stat">
                <div className="stat-value">
                  {cityData.activities?.length || 0}
                </div>

                <div className="stat-label">
                  Activities
                </div>
              </div>

              <div className="stat">
                <div className="stat-value">
                  {cityData.restaurants?.length || 0}
                </div>

                <div className="stat-label">
                  Restaurants
                </div>
              </div>

              <div className="stat">
                <div className="stat-value">
                  {cityData.places?.length || 0}
                </div>

                <div className="stat-label">
                  Places
                </div>
              </div>

              <div className="stat">
                <div className="stat-value">
                  {cityData.city.rating}
                </div>

                <div className="stat-label">
                  Rating
                </div>
              </div>

            </div>

            <div className="hero-actions">

              <button
                className={`save-btn ${citySaved ? "saved" : ""}`}
                onClick={(e) =>
                  handleFavoriteClick(
                    e,
                    cityData.city,
                    "city"
                  )
                }
              >
                <Heart
                  size={18}
                  fill={citySaved ? "white" : "none"}
                />

                {citySaved ? "Saved" : "Save"}
              </button>

              <button className="share-btn">
                <Share2 size={18} />
                Share
              </button>

            </div>

          </div>
        </div>
      </div>

      {/* TABS */}
      <div className={`tabs-container ${scrolled ? "scrolled" : ""}`}>

        <div className="container">

          <div className="tabs">

            <button
              className={`tab ${
                activeTab === "activities" ? "active" : ""
              }`}
              onClick={() => setActiveTab("activities")}
            >
              <Mountain size={18} />
              Activities
            </button>

            <button
              className={`tab ${
                activeTab === "restaurants" ? "active" : ""
              }`}
              onClick={() => setActiveTab("restaurants")}
            >
              <Utensils size={18} />
              Restaurants
            </button>

            <button
              className={`tab ${
                activeTab === "places" ? "active" : ""
              }`}
              onClick={() => setActiveTab("places")}
            >
              <Building2 size={18} />
              Places
            </button>

            <button
              className={`tab ${
                activeTab === "hidden" ? "active" : ""
              }`}
              onClick={() => setActiveTab("hidden")}
            >
              <Camera size={18} />
              Hidden Gems
            </button>

          </div>
        </div>
      </div>

      <div className="container">

        {/* ACTIVITIES */}
        {activeTab === "activities" && (

          <div className="activities-grid">

            {cityData.activities?.map((activity) => (

              <div
                key={activity.id}
                className="activity-card"
              >

                <div className="activity-image">

                  <img
                    src={`http://localhost:8000/uploads/${activity.image}`}
                    alt={activity.name}
                  />

                  <button
                    className={`favorite-btn ${
                      isFavorite("activity", activity.id)
                        ? "active"
                        : ""
                    }`}
                    onClick={(e) =>
                      handleFavoriteClick(
                        e,
                        activity,
                        "activity"
                      )
                    }
                  >
                    <Heart
                      size={18}
                      fill={
                        isFavorite("activity", activity.id)
                          ? "#ff6b35"
                          : "none"
                      }
                    />
                  </button>

                </div>

                <div className="activity-content">

                  <h3>{activity.name}</h3>

                  {renderStars(activity.rating)}

                  <p>{activity.description}</p>

                  <div className="activity-meta">

                    <span>
                      <DollarSign size={14} />
                      {activity.price}
                    </span>

                    <span>
                      <Clock size={14} />
                      {activity.duration}
                    </span>

                  </div>

                  <button className="book-btn">
                    Book Now
                    <ChevronRight size={16} />
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

        {/* RESTAURANTS */}
        {activeTab === "restaurants" && (

          <div className="restaurants-grid">

            {cityData.restaurants?.map((restaurant) => (

              <div
                key={restaurant.id}
                className="restaurant-card"
              >

                <div className="restaurant-image">

                  <img
                    src={`http://localhost:8000/uploads/${restaurant.image}`}
                    alt={restaurant.name}
                  />

                  <button
                    className={`favorite-btn ${
                      isFavorite("restaurant", restaurant.id)
                        ? "active"
                        : ""
                    }`}
                    onClick={(e) =>
                      handleFavoriteClick(
                        e,
                        restaurant,
                        "restaurant"
                      )
                    }
                  >
                    <Heart
                      size={18}
                      fill={
                        isFavorite("restaurant", restaurant.id)
                          ? "#ff6b35"
                          : "none"
                      }
                    />
                  </button>

                </div>

                <div className="restaurant-content">

                  <h3>{restaurant.name}</h3>

                  {renderStars(restaurant.rating)}

                  <p>{restaurant.description}</p>

                  <div className="restaurant-meta">

                    <span>
                      <Utensils size={14} />
                      {restaurant.cuisine}
                    </span>

                    <span>
                      <Clock size={14} />
                      {restaurant.opening_hours}
                    </span>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

        {/* PLACES */}
        {activeTab === "places" && (

          <div className="places-grid">

            {cityData.places?.map((place) => (

              <div
                key={place.id}
                className="place-card"
              >

                <div className="place-image">

                  <img
                    src={`http://localhost:8000/uploads/${place.image}`}
                    alt={place.name}
                  />

                  <button
                    className={`favorite-btn ${
                      isFavorite("place", place.id)
                        ? "active"
                        : ""
                    }`}
                    onClick={(e) =>
                      handleFavoriteClick(
                        e,
                        place,
                        "place"
                      )
                    }
                  >
                    <Heart
                      size={18}
                      fill={
                        isFavorite("place", place.id)
                          ? "#ff6b35"
                          : "none"
                      }
                    />
                  </button>

                </div>

                <div className="place-content">

                  <h3>{place.name}</h3>

                  {renderStars(place.rating)}

                  <p>{place.description}</p>

                  <div className="place-meta">

                    <span>
                      <Building2 size={14} />
                      {place.category}
                    </span>

                    <span>
                      <DollarSign size={14} />
                      {place.entry_price}
                    </span>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

        {/* HIDDEN GEMS */}
        {activeTab === "hidden" && (

          <div className="hidden-grid">

            {cityData.hidden_gems?.map((gem) => (

              <div
                key={gem.id}
                className="hidden-card"
              >

                <div className="hidden-image">

                  <img
                    src={`http://localhost:8000/uploads/${gem.image}`}
                    alt={gem.name}
                  />

                  <button
                    className={`favorite-btn ${
                      isFavorite("gem", gem.id)
                        ? "active"
                        : ""
                    }`}
                    onClick={(e) =>
                      handleFavoriteClick(
                        e,
                        gem,
                        "gem"
                      )
                    }
                  >
                    <Heart
                      size={18}
                      fill={
                        isFavorite("gem", gem.id)
                          ? "#ff6b35"
                          : "none"
                      }
                    />
                  </button>

                </div>

                <div className="hidden-content">

                  <h3>{gem.name}</h3>

                  <p>{gem.description}</p>

                  <div className="hidden-meta">

                    <span>
                      <MapPin size={14} />
                      {gem.location}
                    </span>

                    <span>
                      <Clock size={14} />
                      {gem.best_time}
                    </span>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default CityDetail;
