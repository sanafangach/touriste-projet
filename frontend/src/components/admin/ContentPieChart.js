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

const polarToCartesian = (cx, cy, radius, angle) => {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
};

const arcPath = (cx, cy, radius, startAngle, endAngle) => {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
  return [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArc} 0 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
};

function ContentPieChart({ stats, collections }) {
  const slices = adminStatCards.map((card) => ({
    label: card.label,
    color: TONE_COLORS[card.tone] || "#6b7280",
    value: stats[card.key] ?? collections[card.collection]?.length ?? 0,
  }));

  const total = slices.reduce((sum, slice) => sum + slice.value, 0);
  const cx = 110;
  const cy = 110;
  const radius = 100;

  let cursor = 0;

  return (
    <section className="admin-pie-card" aria-label="Content distribution">
      <h3>Content Distribution</h3>

      {total === 0 ? (
        <p className="apprendre-analytics-muted">No content to chart yet.</p>
      ) : (
        <div className="admin-pie-body">
          <svg
            className="admin-pie-svg"
            viewBox="0 0 220 220"
            role="img"
            aria-label="Pie chart of content by type"
          >
            {slices
              .filter((slice) => slice.value > 0)
              .map((slice) => {
                const angle = (slice.value / total) * 360;
                const startAngle = cursor;
                const endAngle = cursor + angle;
                cursor = endAngle;

                // A single full-circle slice can't be drawn as an arc; use a circle.
                if (angle >= 360) {
                  return (
                    <circle
                      key={slice.label}
                      cx={cx}
                      cy={cy}
                      r={radius}
                      fill={slice.color}
                    />
                  );
                }

                return (
                  <path
                    key={slice.label}
                    d={arcPath(cx, cy, radius, startAngle, endAngle)}
                    fill={slice.color}
                    stroke="#fff"
                    strokeWidth="1.5"
                  />
                );
              })}
          </svg>

          <ul className="admin-pie-legend">
            {slices.map((slice) => {
              const pct = total ? Math.round((slice.value / total) * 100) : 0;
              return (
                <li key={slice.label}>
                  <span className="admin-pie-dot" style={{ background: slice.color }} />
                  <span className="admin-pie-legend-label">{slice.label}</span>
                  <span className="admin-pie-legend-value">
                    {slice.value} · {pct}%
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
