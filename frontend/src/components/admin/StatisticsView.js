import React from "react";

import StatsCards from "./StatsCards";
import ContentPieChart from "./ContentPieChart";

function StatisticsView({ stats, collections }) {
  return (
    <section className="admin-statistics">
      <StatsCards stats={stats} collections={collections} />
      <ContentPieChart stats={stats} collections={collections} />
    </section>
  );
}

export default StatisticsView;
