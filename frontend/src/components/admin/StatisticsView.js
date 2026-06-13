import React from "react";

import StatsCards from "./StatsCards";
import ContentBarChart from "./ContentBarChart";

function StatisticsView({ stats, collections }) {
  return (
    <section className="admin-statistics">
      <StatsCards stats={stats} collections={collections} />
      <ContentBarChart stats={stats} collections={collections} />
    </section>
  );
}

export default StatisticsView;
