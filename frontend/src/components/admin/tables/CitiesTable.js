import React from "react";

import { formatDate } from "../utils/adminDashboardUtils";
import { AdminImageThumb, AdminRating } from "./AdminTableCells";
import AdminRowActions from "./AdminRowActions";

function CitiesTable({ rows, currentUser, onEdit, onDelete }) {
  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>City</th>
          <th>Slug</th>
          <th>Rating</th>
          <th>Content</th>
          <th>Updated</th>
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
                  <span>#{item.id}</span>
                </div>
              </div>
            </td>
            <td>{item.slug || "-"}</td>
            <td>
              <AdminRating rating={item.rating} />
            </td>
            <td>
              <div className="admin-mini-metrics">
                <span>{item.activities_count || 0} act.</span>
                <span>{item.restaurants_count || 0} rest.</span>
                <span>{item.places_count || 0} places</span>
                <span>{item.hidden_gems_count || 0} gems</span>
              </div>
            </td>
            <td>{formatDate(item.updated_at)}</td>
            <td>
              <AdminRowActions
                section="cities"
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

export default CitiesTable;
