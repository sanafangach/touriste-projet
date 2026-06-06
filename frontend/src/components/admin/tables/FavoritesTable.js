import React from "react";
import { Heart } from "lucide-react";

import { favoriteTypeLabels } from "../config/adminDashboardConfig";
import {
  formatDate,
  getFavoriteCityName,
  getFavoriteItem,
} from "../utils/adminDashboardUtils";
import { AdminImageThumb } from "./AdminTableCells";

function FavoritesTable({ rows }) {
  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>User</th>
          <th>Favorite item</th>
          <th>Type</th>
          <th>City</th>
          <th>Saved</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((favorite) => {
          const item = getFavoriteItem(favorite);
          const typeLabel = favoriteTypeLabels[favorite.item_type] || favorite.item_type || "Item";

          return (
            <tr key={favorite.id}>
              <td>
                <div className="admin-name-cell">
                  <div className="admin-avatar">
                    {favorite.user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <strong>{favorite.user?.name || "Unknown user"}</strong>
                    <span>{favorite.user?.email || `#${favorite.user_id}`}</span>
                  </div>
                </div>
              </td>
              <td>
                <div className="admin-name-cell">
                  <AdminImageThumb item={item || {}} />
                  <div>
                    <strong>{item?.name || `Item #${favorite.item_id}`}</strong>
                    <span>#{favorite.item_id}</span>
                  </div>
                </div>
              </td>
              <td>
                <span className={`admin-type-pill ${favorite.item_type || "item"}`}>
                  <Heart size={13} fill="currentColor" />
                  {typeLabel}
                </span>
              </td>
              <td>{getFavoriteCityName(favorite)}</td>
              <td>{formatDate(favorite.created_at)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default FavoritesTable;
