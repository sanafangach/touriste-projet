import React, { useState } from "react";
import "./Menu.css";

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
      
      {/* LEFT - LOGO */}
      <div className="menu-left">
        <img src="/assets/logo.png" alt="logo" className="logo" />
      </div>

      {/* CENTER - LINKS */}
      <ul className="menu-links">
        <li>Home</li>
        <li>Card</li>
        <li>Destination</li>
        <li>Languages</li>
      </ul>

      {/* RIGHT - SETTINGS */}
      <div className="menu-right">
        <button onClick={toggleMenu} className="settings-btn">
          ⚙️
        </button>

        {open && (
          <div className="dropdown">
            <p>Saved</p>
            <p>Login</p>
            <p onClick={toggleTheme}>Dark / Light</p>
          </div>
        )}
      </div>

    </nav>
  );
}

export default Menu;