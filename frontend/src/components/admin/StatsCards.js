import React from "react";

import { adminStatCards } from "./config/adminDashboardConfig";

function StatsCards({ stats, collections }) {
  return (
    <section className="admin-stats-grid" aria-label="Dashboard stats">
      {adminStatCards.map((card) => {
        const Icon = card.icon;
        const value = stats[card.key] ?? collections[card.collection]?.length ?? 0;

        return (
          <article className={`admin-stat-card ${card.tone}`} key={card.key}>
            <div className="admin-stat-icon">
              <Icon size={20} />
            </div>
            <div>
              <strong>{value}</strong>
              <span>{card.label}</span>
            </div>
          </article>
        );
      })}
    </section>
  );
}

export default StatsCards;
