import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Menu from "./components/accueil/Menu";
import Home from "./components/accueil/home";
import Card from "./components/pages/card";
import Destination from "./components/pages/destination";
import Languages from "./components/pages/languages";
import Login from "./components/pages/login";
import Saved from "./components/pages/saved";

import Chatbot from './components/Chatbot/Chatbot';


function App() {
  return (
    <Router>
      <Menu />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card" element={<Card />} />
        <Route path="/destination" element={<Destination />} />
        <Route path="/languages" element={<Languages />} />
        <Route path="/login" element={<Login />} />
        <Route path="/saved" element={<Saved />} />
      </Routes>
      <Chatbot />
    </Router>

  );
}

export default App;