import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Settings, Moon, Sun, Menu as MenuIcon, X, Bookmark, LogIn, Home, Map, Globe, Box } from "lucide-react";

import "../css/Menu.css";
import logo from "../../assets/logo1.png";

function Menu() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState("EN"); // Default language

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  return (
    <nav className={`menu ${scrolled ? "scrolled" : ""}`}>
      {/* LOGO */}
      <div className="menu-left">
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
      </div>

      {/* MOBILE BUTTON */}
      <div className="mobile-icon" onClick={() => setMobile(!mobile)}>
        {mobile ? <X size={28} /> : <MenuIcon size={28} />}
      </div>

      {/* LINKS */}
      <ul className={mobile ? "menu-links active" : "menu-links"}>
        <li><Link to="/"><Home size={18} /> Home</Link></li>
        <li><Link to="/card"><Box size={18} /> Card</Link></li>
        <li><Link to="/destination"><Map size={18} /> Destination</Link></li>
        <li><Link to="/languages"><Globe size={18} /> learning darija</Link></li>
        <li><Link to="/pack"><Box size={18} /> Pack</Link></li>
      </ul>

      {/* RIGHT SIDE */}
      <div className="menu-right">
        {/* SETTINGS */}
        <button
          onClick={() => setOpen(!open)}
          className={`settings-btn ${open ? "active" : ""}`}
        >
          <Settings size={20} className={open ? "spin" : ""} />
        </button>

        {open && (
          <div className="dropdown">
            {/* LANGUAGE BAR */}
            <div className="dropdown-header">Translation</div>
            <div className="language-bar">
              <button 
                className={`lang-btn ${lang === "AR" ? "active" : ""}`}
                onClick={() => setLang("AR")}
              >AR</button>
              <button 
                className={`lang-btn ${lang === "FR" ? "active" : ""}`}
                onClick={() => setLang("FR")}
              >FR</button>
              <button 
                className={`lang-btn ${lang === "EN" ? "active" : ""}`}
                onClick={() => setLang("EN")}
              >EN</button>
            </div>
            
            <div className="dropdown-divider"></div>

            <div className="dropdown-header">Settings</div>
            <Link to="/saved" className="dropdown-item" onClick={() => setOpen(false)}>
              <Bookmark size={18} /> <span>Saved</span>
            </Link>
            <Link to="/login" className="dropdown-item" onClick={() => setOpen(false)}>
              <LogIn size={18} /> <span>Login</span>
            </Link>
            <div className="dropdown-item" onClick={toggleTheme}>
              {dark ? <Sun size={18} /> : <Moon size={18} />}
              <span>{dark ? "Light Mode" : "Dark Mode"}</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Menu;