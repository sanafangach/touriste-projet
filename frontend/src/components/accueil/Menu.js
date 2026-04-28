import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCog,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import "../css/Menu.css";
import logo from "../../assets/logo1.png";

function Menu() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [mobile, setMobile] = useState(false);

  const toggleTheme = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  return (
    <nav className="menu">
      {/* LOGO */}
      <div className="menu-left">
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
      </div>

      {/* MOBILE BUTTON */}
      <div className="mobile-icon" onClick={() => setMobile(!mobile)}>
        {mobile ? <FaTimes /> : <FaBars />}
      </div>

      {/* LINKS */}
      <ul className={mobile ? "menu-links active" : "menu-links"}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/card">Card</Link></li>
        <li><Link to="/destination">Destination</Link></li>
        <li><Link to="/languages">Languages</Link></li>
        <li><Link to="/pack">Pack</Link></li>
      </ul>

      {/* RIGHT SIDE */}
      <div className="menu-right">
        {/* SETTINGS */}
        <button
          onClick={() => setOpen(!open)}
          className="settings-btn"
        >
          <FaCog />
        </button>

        {open && (
          <div className="dropdown">
            <p><Link to="/saved">Saved</Link></p>
            <p><Link to="/login">Login</Link></p>
            <p onClick={toggleTheme}>
              {dark ? <FaSun /> : <FaMoon />}
              {dark ? " Light Mode" : " Dark Mode"}
            </p>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Menu;