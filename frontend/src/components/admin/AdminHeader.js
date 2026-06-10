import React from "react";
import { BarChart3, Home, RefreshCw } from "lucide-react";

const getLocale = (lang) => {
  if (lang === "FR") return "fr-FR";
  if (lang === "AR") return "ar-SA";
  return "en-US";
};

function AdminHeader({ lang, refreshing, onHome, onRefresh }) {
  const formattedDate = new Date().toLocaleDateString(getLocale(lang), {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

return (
    <header className="admin-topbar">
      <div>
        <span className="admin-kicker">
          <BarChart3 size={16} />
          Admin Dashboard
        </span>
        <h1>Manage travel content</h1>
        <p>{formattedDate}</p>
      </div>

      <div className="admin-topbar-actions">
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
