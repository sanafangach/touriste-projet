import React from "react";
import { DollarSign } from "lucide-react";

import { AdminImageThumb, AdminRating } from "./AdminTableCells";
import AdminRowActions from "./AdminRowActions";

function PlacesTable({ rows, currentUser, onEdit, onDelete }) {
  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Place</th>
          <th>City</th>
          <th>Category</th>
          <th>Rating</th>
          <th>Entry</th>
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
            <td>{item.city?.name || "-"}</td>
            <td>{item.category || "-"}</td>
            <td>
              <AdminRating rating={item.rating} />
            </td>
            <td>
              <span className="admin-inline-icon">
                <DollarSign size={14} />
                {Number(item.entry_price || 0).toFixed(2)}
              </span>
            </td>
            <td>
              <AdminRowActions
                section="places"
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

export default PlacesTable;
