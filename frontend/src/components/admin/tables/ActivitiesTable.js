import React from "react";
import { Clock, DollarSign } from "lucide-react";

import { AdminImageThumb, AdminRating } from "./AdminTableCells";
import AdminRowActions from "./AdminRowActions";

function ActivitiesTable({ rows, currentUser, onEdit, onDelete }) {
  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Activity</th>
          <th>City</th>
          <th>Rating</th>
          <th>Price</th>
          <th>Duration</th>
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
                <DollarSign size={14} />
                {Number(item.price || 0).toFixed(2)}
              </span>
            </td>
            <td>
              <span className="admin-inline-icon">
                <Clock size={14} />
                {item.duration || "-"}
              </span>
            </td>
            <td>
              <AdminRowActions
                section="activities"
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

export default ActivitiesTable;
