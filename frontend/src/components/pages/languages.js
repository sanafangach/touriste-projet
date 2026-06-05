import React from "react";
import { Routes, Route } from "react-router-dom";

import ApprendreHub from "../learn/ApprendreHub";
import Mission1 from "../learn/darija/Mission1";
import Mission2 from "../learn/darija/Mission2";
import Mission3 from "../learn/darija/Mission3";
import Mission4 from "../learn/darija/Mission4";
import TifinaghMission1 from "../learn/tifinagh/Mission1";
import TifinaghMission2 from "../learn/tifinagh/Mission2";
import CultureMission1 from "../learn/culture/Mission1";
import CultureMission2 from "../learn/culture/Mission2";

function Languages() {
  return (
    <Routes>
      <Route path="darija/mission-1" element={<Mission1 />} />
      <Route path="darija/mission-2" element={<Mission2 />} />
      <Route path="darija/mission-3" element={<Mission3 />} />
      <Route path="darija/mission-4" element={<Mission4 />} />
      <Route path="tifinagh/mission-1" element={<TifinaghMission1 />} />
      <Route path="tifinagh/mission-2" element={<TifinaghMission2 />} />
      <Route path="culture/mission-1" element={<CultureMission1 />} />
      <Route path="culture/mission-2" element={<CultureMission2 />} />
      {/* Since we are starting fresh, all nested routes gracefully fall back to the Hub */}
      <Route path="*" element={<ApprendreHub />} />
    </Routes>
  );
}

export default Languages;
