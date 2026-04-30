import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Menu.css";
import logo from "../../assets/logo1.png";


function Menu() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  const toggleMenu = () => setOpen(!open);

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

      {/* LINKS */}
      <ul className="menu-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/card">Card</Link></li>
        <li><Link to="/destination">Destination</Link></li>
        <li><Link to="/languages">Languages</Link></li>
      </ul>

      {/* SETTINGS */}
      <div className="menu-right">
        <button onClick={toggleMenu} className="settings-btn">⚙️</button>

        {open && (
          <div className="dropdown">
            <p><Link to="/saved">Saved</Link></p>
            <p><Link to="/login">Login</Link></p>
            <p onClick={toggleTheme}>
              {dark ? "Light Mode" : "Dark Mode"}
            </p>
          </div>
        )}
      </div>

    </nav>
  );
}

export default Menu;