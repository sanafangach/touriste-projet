import React from "react";
import { Clock } from "lucide-react";

import { formatDate } from "../utils/adminDashboardUtils";
import { AdminImageThumb } from "./AdminTableCells";
import AdminRowActions from "./AdminRowActions";

function HiddenGemsTable({ rows, currentUser, onEdit, onDelete }) {
  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Hidden Gem</th>
          <th>City</th>
          <th>Location</th>
          <th>Best time</th>
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
            <td>{item.city?.name || "-"}</td>
            <td>{item.location || "-"}</td>
            <td>
              <span className="admin-inline-icon">
                <Clock size={14} />
                {item.best_time || "-"}
              </span>
            </td>
            <td>{formatDate(item.updated_at)}</td>
            <td>
              <AdminRowActions
                section="hiddenGems"
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

export default HiddenGemsTable;
