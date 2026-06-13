import React from "react";

import { adminStatCards } from "./config/adminDashboardConfig";

const TONE_COLORS = {
  blue: "#3b82f6",
  green: "#10b981",
  amber: "#f59e0b",
  rose: "#f43f5e",
  violet: "#8b5cf6",
  cyan: "#06b6d4",
  orange: "#f97316",
  teal: "#14b8a6",
};

function ContentBarChart({ stats, collections }) {
  const bars = adminStatCards
    .map((card) => ({
      label: card.label,
      color: TONE_COLORS[card.tone] || "#6b7280",
      value: stats[card.key] ?? collections[card.collection]?.length ?? 0,
    }))
    .sort((a, b) => b.value - a.value);

  const max = bars.reduce((peak, bar) => Math.max(peak, bar.value), 0);

  return (
    <section className="admin-bar-card" aria-label="Content by type">
      <h3>Content by Type</h3>

      {max === 0 ? (
        <p className="apprendre-analytics-muted">No content to chart yet.</p>
      ) : (
        <ul className="admin-bar-list">
          {bars.map((bar) => {
            const width = max ? Math.round((bar.value / max) * 100) : 0;
            return (
              <li key={bar.label} className="admin-bar-row">
                <span className="admin-bar-label">{bar.label}</span>
                <div className="admin-bar-track">
                  <div
                    className="admin-bar-fill"
                    style={{ width: `${width}%`, background: bar.color }}
                  />
                </div>
                <span className="admin-bar-value">{bar.value}</span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default ContentBarChart;