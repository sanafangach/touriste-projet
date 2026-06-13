import React from "react";
import { AdminImageThumb, AdminRating } from "./AdminTableCells";
import AdminRowActions from "./AdminRowActions";

function HotelsTable({ rows, currentUser, onEdit, onDelete }) {
  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Hotel</th>
          <th>City</th>
          <th>Rating</th>
          <th>Price</th>
          <th>Budget</th>
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
            <td>
              <AdminRating rating={item.rating} />
            </td>
            <td>
              <span className="admin-inline-icon">
                {item.price ? `${item.price} MAD` : "-"}
              </span>
            </td>
            <td>
              <span className={`admin-badge badge-${item.budget_level || "moderate"}`}>
                {item.budget_level || "moderate"}
              </span>
            </td>
            <td>
              <AdminRowActions
                section="hotels"
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

export default HotelsTable;
