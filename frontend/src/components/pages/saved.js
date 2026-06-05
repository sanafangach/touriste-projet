import React from "react";
import { Link } from "react-router-dom";
import { Heart, Star, ArrowRight } from "lucide-react";

import { useLanguage } from "../accueil/LanguageContext";
import { useFavorites } from "../../context/FavoritesContext";
import "../css/saved.css";

const relationByType = {
  city: "city",
  activity: "activity",
  restaurant: "restaurant",
  place: "place",
  gem: "gem",
};

const backendUploadsUrl = "http://localhost:8000/uploads/";

const isResolvedImage = (image) =>
  typeof image === "string" &&
  (image.startsWith("http") ||
    image.startsWith("/") ||
    image.startsWith("data:") ||
    image.startsWith("blob:"));

const getImageSrc = (image) => {
  if (!image) return "";
  return isResolvedImage(image) ? image : `${backendUploadsUrl}${image}`;
};

const getFavoriteData = (favorite) => {
  const relation = relationByType[favorite.item_type];
  return relation ? favorite[relation] : null;
};

const getFavoriteLink = (favorite, data) => {
  if (favorite.item_type === "city" && data?.slug) {
    return `/destination/${data.slug}`;
  }

  return "#";
};

function Saved() {
  const { lang, isRTL } = useLanguage();
  const { favorites, loading, removeFavorite } = useFavorites();

  const savedItems = favorites
    .map((favorite) => ({
      favorite,
      data: getFavoriteData(favorite),
    }))
    .filter(({ data }) => Boolean(data));

  if (loading) {
    return (
      <div className="saved-page">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className={`saved-page ${isRTL ? "rtl" : ""}`}>
      <div className="saved-hero">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <Heart size={48} className="hero-icon" fill="currentColor" />
          <h1>Favorites</h1>
        </div>
      </div>

      <div className="saved-content">
        {savedItems.length > 0 ? (
          <div className="saved-grid">
            {savedItems.map(({ favorite, data }) => (
              <div key={`${favorite.item_type}-${favorite.item_id}`} className="saved-card">
                <div className="card-image">
                  {data.image && (
                    <img src={getImageSrc(data.image)} alt={data.name} />
                  )}

                  <div className="card-overlay"></div>

                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeFavorite(favorite)}
                    aria-label="Remove from favorites"
                    title="Remove from favorites"
                  >
                    <Heart size={17} fill="currentColor" />
                  </button>
                </div>

                <div className="card-content">
                  <h3>{data.name}</h3>

                  {data.rating && (
                    <div className="card-meta">
                      <span className="rating">
                        <Star size={14} fill="currentColor" />
                        {data.rating}
                      </span>
                    </div>
                  )}

                  <Link
                    to={getFavoriteLink(favorite, data)}
                    className="view-link"
                  >
                    {lang === "AR"
                      ? "عرض التفاصيل"
                      : lang === "FR"
                      ? "Voir details"
                      : "View Details"}

                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Heart size={64} className="empty-icon" />

            <h3>
              {lang === "AR"
                ? "لا توجد عناصر محفوظة"
                : lang === "FR"
                ? "Aucun favori"
                : "No favorites"}
            </h3>

            <Link to="/destination" className="explore-btn">
              {lang === "AR"
                ? "استكشف الوجهات"
                : lang === "FR"
                ? "Explorer les destinations"
                : "Explore destinations"}
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Saved;
