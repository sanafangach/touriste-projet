import React from "react";
import { Crown, LogOut } from "lucide-react";

function AdminSidebar({
  user,
  sections,
  activeSection,
  collections,
  onSectionChange,
  onLogout,
}) {
  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <div className="admin-brand-icon">
          <Crown size={24} />
        </div>
        <div>
          <strong>AMUDUX</strong>
          <span>Admin Panel</span>
        </div>
      </div>

      <nav className="admin-nav" aria-label="Admin navigation">
        {sections.map((section) => {
          const Icon = section.icon;

          return (
            <button
              type="button"
              key={section.key}
              className={`admin-nav-item ${activeSection === section.key ? "active" : ""}`}
              onClick={() => onSectionChange(section.key)}
            >
              <Icon size={18} />
              <span>{section.label}</span>
              <b>{collections[section.key]?.length || 0}</b>
            </button>
          );
        })}
      </nav>

      <div className="admin-sidebar-user">
        <div className="admin-avatar large">{user?.name?.[0]?.toUpperCase() || "A"}</div>
        <div>
          <strong>{user?.name}</strong>
          <span>{user?.role}</span>
        </div>
      </div>

      <button type="button" className="admin-logout" onClick={onLogout}>
        <LogOut size={18} />
        Log out
      </button>
    </aside>
  );
}

export default AdminSidebar;
