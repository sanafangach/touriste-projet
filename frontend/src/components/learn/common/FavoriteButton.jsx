import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { favoriteMission, unfavoriteMission, isMissionFavorited } from "../../../utils/storage";

function FavoriteButton({ track, missionNum }) {
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    setFavorited(isMissionFavorited(track, missionNum));
  }, [track, missionNum]);

  const toggle = (e) => {
    e.stopPropagation();
    if (favorited) {
      unfavoriteMission(track, missionNum);
      setFavorited(false);
    } else {
      favoriteMission(track, missionNum);
      setFavorited(true);
    }
  };

  return (
    <button
      onClick={toggle}
      title={favorited ? "Favorited" : "Favorite"}
      style={{
        background: "none", border: "none", cursor: "pointer",
        padding: "6px", display: "inline-flex", alignItems: "center",
        color: favorited ? "var(--learn-error, #ef4444)" : "var(--learn-text-secondary, #9ca3af)",
        transition: "color 0.2s, transform 0.2s",
        position: "relative"
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.2)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
    >
      <Heart size={20} fill={favorited ? "currentColor" : "none"} />
    </button>
  );
}

export default FavoriteButton;
