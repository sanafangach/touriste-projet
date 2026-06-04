import React from "react";
import { Routes, Route } from "react-router-dom";

import ApprendreHub from "../learn/ApprendreHub";
import Mission1 from "../learn/darija/Mission1";
import TifinaghMission1 from "../learn/tifinagh/Mission1";

function Languages() {
  return (
    <Routes>
      <Route path="darija/mission-1" element={<Mission1 />} />
      <Route path="tifinagh/mission-1" element={<TifinaghMission1 />} />
      {/* Since we are starting fresh, all nested routes gracefully fall back to the Hub */}
      <Route path="*" element={<ApprendreHub />} />
    </Routes>
  );
}

export default Languages;
