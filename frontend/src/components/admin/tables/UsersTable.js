import React from "react";
import { Crown, Shield } from "lucide-react";

import { formatDate } from "../utils/adminDashboardUtils";
import AdminRowActions from "./AdminRowActions";

function UsersTable({ rows, currentUser, onEdit, onDelete }) {
  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>User</th>
          <th>Email</th>
          <th>Role</th>
          <th>City</th>
          <th>Joined</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((item) => (
          <tr key={item.id} className={item.id === currentUser?.id ? "current-admin-row" : ""}>
            <td>
              <div className="admin-name-cell">
                <div className="admin-avatar">{item.name?.[0]?.toUpperCase() || "U"}</div>
                <div>
                  <strong>{item.name}</strong>
                  <span>#{item.id}</span>
                </div>
              </div>
            </td>
            <td>{item.email}</td>
            <td>
              <span className={`role-pill ${item.role}`}>
                {item.role === "admin" ? <Crown size={13} /> : <Shield size={13} />}
                {item.role}
              </span>
            </td>
            <td>{item.ville || "-"}</td>
            <td>{formatDate(item.created_at)}</td>
            <td>
              <AdminRowActions
                section="users"
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

export default UsersTable;
