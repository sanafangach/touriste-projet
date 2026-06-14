import React from "react";
import { Crown } from "lucide-react";

function AdminSidebar({
  user,
  sections,
  activeSection,
  collections,
  badgeCounts,
  onSectionChange,
}) {
  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <div className="admin-brand-icon">
          <Crown size={24} />
        </div>
        <div>
          <strong>AMUDUX</strong>
          <span>{user?.name || "Admin"}</span>
        </div>
      </div>

      <nav className="admin-nav" aria-label="Admin navigation">
        {sections.map((section) => {
          const Icon = section.icon;
          const count = badgeCounts?.[section.key] ?? collections[section.key]?.length ?? 0;

          return (
            <button
              type="button"
              key={section.key}
              className={`admin-nav-item ${activeSection === section.key ? "active" : ""}`}
              onClick={() => onSectionChange(section.key)}
            >
              <Icon size={18} />
              <span>{section.label}</span>
              <b>{count}</b>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export default AdminSidebar;
