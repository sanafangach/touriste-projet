import React from "react";
import { Edit3, Trash2 } from "lucide-react";

function AdminRowActions({ section, item, currentUser, onEdit, onDelete }) {
  const isSelf = section === "users" && item.id === currentUser?.id;
  const label = item.name || `record ${item.id}`;

  return (
    <div className="admin-row-actions">
      <button
        type="button"
        className="icon-btn"
        onClick={() => onEdit(section, item)}
        aria-label={`Edit ${label}`}
        title={`Edit ${label}`}
      >
        <Edit3 size={16} />
      </button>
      <button
        type="button"
        className="icon-btn danger"
        onClick={() => onDelete(section, item)}
        disabled={isSelf}
        aria-label={`Delete ${label}`}
        title={isSelf ? "Current account" : `Delete ${label}`}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}

export default AdminRowActions;
