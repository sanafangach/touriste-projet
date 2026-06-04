import React from "react";
import { Routes, Route } from "react-router-dom";

import ApprendreHub from "../learn/ApprendreHub";
import Mission1 from "../learn/darija/Mission1";
import Mission2 from "../learn/darija/Mission2";
import TifinaghMission1 from "../learn/tifinagh/Mission1";
import CultureMission1 from "../learn/culture/Mission1";

function Languages() {
  return (
    <Routes>
      <Route path="darija/mission-1" element={<Mission1 />} />
      <Route path="darija/mission-2" element={<Mission2 />} />
      <Route path="tifinagh/mission-1" element={<TifinaghMission1 />} />
      <Route path="culture/mission-1" element={<CultureMission1 />} />
      {/* Since we are starting fresh, all nested routes gracefully fall back to the Hub */}
      <Route path="*" element={<ApprendreHub />} />
    </Routes>
  );
}

export default Languages;
