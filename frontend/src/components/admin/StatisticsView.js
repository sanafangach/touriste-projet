import React from "react";

import StatsCards from "./StatsCards";
import ContentPieChart from "./ContentPieChart";
import ApprendreAnalytics from "./ApprendreAnalytics";

function StatisticsView({ stats, collections }) {
  return (
    <section className="admin-statistics">
      <StatsCards stats={stats} collections={collections} />
      <ContentPieChart stats={stats} collections={collections} />
      <ApprendreAnalytics />
    </section>
  );
}

export default StatisticsView;
