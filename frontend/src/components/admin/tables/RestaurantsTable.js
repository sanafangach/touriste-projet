import React from "react";

import { AdminImageThumb, AdminRating } from "./AdminTableCells";
import AdminRowActions from "./AdminRowActions";

function RestaurantsTable({ rows, currentUser, onEdit, onDelete }) {
  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Restaurant</th>
          <th>City</th>
          <th>Cuisine</th>
          <th>Rating</th>
          <th>Hours</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((item) => (
          <tr key={item.id}>
            <td>
              <div className="admin-name-cell">
                <AdminImageThumb item={item} />
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.phone || `#${item.id}`}</span>
                </div>
              </div>
            </td>
            <td>{item.city?.name || "-"}</td>
            <td>{item.cuisine || "-"}</td>
            <td>
              <AdminRating rating={item.rating} />
            </td>
            <td>{item.opening_hours || "-"}</td>
            <td>
              <AdminRowActions
                section="restaurants"
                item={item}
                currentUser={currentUser}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RestaurantsTable;
