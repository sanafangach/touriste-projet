import React from "react";
import { Image as ImageIcon, Star } from "lucide-react";

import { getImageSrc } from "../utils/adminDashboardUtils";

export function AdminImageThumb({ item = {}, alt }) {
  const src = getImageSrc(item.image);

  if (!src) {
    return (
      <div className="admin-thumb empty">
        <ImageIcon size={18} />
      </div>
    );
  }

  return <img className="admin-thumb" src={src} alt={alt || item.name || "Preview"} />;
}

export function AdminRating({ rating }) {
  return (
    <span className="admin-rating">
      <Star size={14} fill="currentColor" />
      {Number(rating || 0).toFixed(1)}
    </span>
  );
}
