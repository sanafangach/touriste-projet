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

function ContentPieChart({ stats, collections }) {
  const slices = adminStatCards
    .map((card) => ({
      label: card.label,
      color: TONE_COLORS[card.tone] || "#6b7280",
      value: stats[card.key] ?? collections[card.collection]?.length ?? 0,
    }))
    .filter((slice) => slice.value > 0)
    .sort((a, b) => b.value - a.value);

  const total = slices.reduce((sum, slice) => sum + slice.value, 0);

  // Build conic-gradient stops so each slice occupies its proportional arc.
  let cursor = 0;
  const stops = slices
    .map((slice) => {
      const start = (cursor / total) * 100;
      cursor += slice.value;
      const end = (cursor / total) * 100;
      return `${slice.color} ${start}% ${end}%`;
    })
    .join(", ");

  return (
    <section className="admin-pie-card" aria-label="Content distribution">
      <h3>Content Distribution</h3>

      {total === 0 ? (
        <p className="apprendre-analytics-muted">No content to chart yet.</p>
      ) : (
        <div className="admin-pie-body">
          <div
            className="admin-pie-ring"
            style={{ background: `conic-gradient(${stops})` }}
            role="img"
            aria-label={`Total content items: ${total}`}
          >
            <div className="admin-pie-center">
              <strong>{total}</strong>
              <span>Total</span>
            </div>
          </div>

          <ul className="admin-pie-legend">
            {slices.map((slice) => {
              const percent = Math.round((slice.value / total) * 100);
              return (
                <li key={slice.label} className="admin-pie-legend-row">
                  <span
                    className="admin-pie-dot"
                    style={{ background: slice.color }}
                    aria-hidden="true"
                  />
                  <span className="admin-pie-legend-label">{slice.label}</span>
                  <span className="admin-pie-legend-value">
                    {slice.value} ({percent}%)
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}

export default ContentPieChart;
