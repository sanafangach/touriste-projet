import React from "react";
import { Routes, Route } from "react-router-dom";

import ApprendreHub from "../learn/ApprendreHub";
import Mission1 from "../learn/darija/Mission1";
import Mission2 from "../learn/darija/Mission2";
import Mission3 from "../learn/darija/Mission3";
import Mission4 from "../learn/darija/Mission4";
import Mission5 from "../learn/darija/Mission5";
import Mission6 from "../learn/darija/Mission6";
import Mission7 from "../learn/darija/Mission7";
import TifinaghMission1 from "../learn/tifinagh/Mission1";
import TifinaghMission2 from "../learn/tifinagh/Mission2";
import TifinaghMission3 from "../learn/tifinagh/Mission3";
import TifinaghMission4 from "../learn/tifinagh/Mission4";
import TifinaghMission5 from "../learn/tifinagh/Mission5";
import TifinaghMission6 from "../learn/tifinagh/Mission6";
import CultureMission1 from "../learn/culture/Mission1";
import CultureMission2 from "../learn/culture/Mission2";
import CultureMission3 from "../learn/culture/Mission3";
import CultureMission4 from "../learn/culture/Mission4";
import CultureMission5 from "../learn/culture/Mission5";
import CultureMission6 from "../learn/culture/Mission6";

function Languages() {
  return (
    <Routes>
      <Route path="darija/mission-1" element={<Mission1 />} />
      <Route path="darija/mission-2" element={<Mission2 />} />
      <Route path="darija/mission-3" element={<Mission3 />} />
      <Route path="darija/mission-4" element={<Mission4 />} />
      <Route path="darija/mission-5" element={<Mission5 />} />
      <Route path="darija/mission-6" element={<Mission6 />} />
      <Route path="darija/mission-7" element={<Mission7 />} />
      <Route path="tifinagh/mission-1" element={<TifinaghMission1 />} />
      <Route path="tifinagh/mission-2" element={<TifinaghMission2 />} />
      <Route path="tifinagh/mission-3" element={<TifinaghMission3 />} />
      <Route path="tifinagh/mission-4" element={<TifinaghMission4 />} />
      <Route path="tifinagh/mission-5" element={<TifinaghMission5 />} />
      <Route path="tifinagh/mission-6" element={<TifinaghMission6 />} />
      <Route path="culture/mission-1" element={<CultureMission1 />} />
      <Route path="culture/mission-2" element={<CultureMission2 />} />
      <Route path="culture/mission-3" element={<CultureMission3 />} />
      <Route path="culture/mission-4" element={<CultureMission4 />} />
      <Route path="culture/mission-5" element={<CultureMission5 />} />
      <Route path="culture/mission-6" element={<CultureMission6 />} />
      {/* Since we are starting fresh, all nested routes gracefully fall back to the Hub */}
      <Route path="*" element={<ApprendreHub />} />
    </Routes>
  );
}

export default Languages;
