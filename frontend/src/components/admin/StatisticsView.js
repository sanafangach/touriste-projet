import React from "react";

import StatsCards from "./StatsCards";
import ContentBarChart from "./ContentBarChart";
import ContentPieChart from "./ContentPieChart";

function StatisticsView({ stats, collections }) {
  return (
    <section className="admin-statistics">
      <StatsCards stats={stats} collections={collections} />
      <div className="admin-charts-grid">
        <ContentBarChart stats={stats} collections={collections} />
        <ContentPieChart stats={stats} collections={collections} />
      </div>
    </section>
  );
}

export default StatisticsView;
