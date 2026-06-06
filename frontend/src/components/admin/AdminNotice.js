import React from "react";
import { X } from "lucide-react";

function AdminNotice({ notice, onDismiss }) {
  if (!notice) return null;

  return (
    <div className={`admin-notice ${notice.type}`} role="status">
      {notice.message}
      <button type="button" onClick={onDismiss} aria-label="Dismiss">
        <X size={16} />
      </button>
    </div>
  );
}

export default AdminNotice;
