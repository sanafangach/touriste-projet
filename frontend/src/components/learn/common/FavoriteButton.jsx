import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { favoriteMission, unfavoriteMission, isMissionFavorited } from "../../../utils/storage";

function FavoriteButton({ track, missionNum }) {
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    setFavorited(isMissionFavorited(track, missionNum));
  }, [track, missionNum]);

  const toggle = async (e) => {
    e.stopPropagation();
    if (favorited) {
      setFavorited(false); // optimistic
      try {
        await unfavoriteMission(track, missionNum);
      } catch {
        setFavorited(true); // revert UI to match cache on failure
      }
    } else {
      setFavorited(true); // optimistic
      try {
        await favoriteMission(track, missionNum);
      } catch {
        setFavorited(false); // revert UI to match cache on failure
      }
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
