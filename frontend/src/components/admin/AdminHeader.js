import React from "react";
import { BarChart3, Home, RefreshCw } from "lucide-react";

const getLocale = (lang) => {
  if (lang === "FR") return "fr-FR";
  if (lang === "AR") return "ar-SA";
  return "en-US";
};

function AdminHeader({ user, lang, refreshing, onHome, onRefresh, className = "" }) {
  const formattedDate = new Date().toLocaleDateString(getLocale(lang), {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const username = user?.name || "Admin";

  return (
    <header className={`admin-topbar ${className}`.trim()}>
      <div className="admin-topbar-content">
        <span className="admin-kicker">
          <BarChart3 size={16} />
          Admin Dashboard
        </span>
        <h1>Manage travel content</h1>
        <p>{formattedDate}</p>
      </div>

      <div className="admin-topbar-actions">
        <div className="admin-header-user">
          <div className="admin-avatar">{username[0]?.toUpperCase() || "A"}</div>
          <div>
            <strong>{username}</strong>
            <span>{user?.role || "admin"}</span>
          </div>
        </div>

        <button type="button" className="admin-secondary-btn" onClick={onHome}>
          <Home size={17} />
          Home
        </button>

        <button
          type="button"
          className="admin-secondary-btn"
          onClick={onRefresh}
          disabled={refreshing}
        >
          <RefreshCw size={17} className={refreshing ? "spin" : ""} />
          Refresh
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;
