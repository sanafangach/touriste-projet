import React, { useState, useEffect , useRef  } from "react";
import { Link } from "react-router-dom";
import { Settings, Moon, Sun, Menu as MenuIcon, X, Bookmark, LogIn, Home, Map, Globe, Box } from "lucide-react";
import { useLanguage } from "./LanguageContext";

import "../css/Menu.css";
import logo from "../../assets/logo1.png";

function Menu() {
  const dropdownRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(() => {
    const savedDark = localStorage.getItem("app-dark-mode");
    return savedDark === "true";
  });
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang, t, isRTL } = useLanguage();

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
//hadik settings li fl menu ila clicite ela ay haja thiyd eahadik useref o dropdownRef dyalha lfog
      useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  const toggleTheme = () => {
    const newDark = !dark;
    setDark(newDark);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("app-dark-mode", newDark);
  };

  const handleLanguageChange = (newLang) => {
    setLang(newLang);
  };

  const getNavLinks = () => {
    const links = [
      { to: "/", icon: <Home size={18} />, label: t("home") },
      { to: "/card", icon: <Box size={18} />, label: t("card") },
      { to: "/destination", icon: <Map size={18} />, label: t("destination") },
      { to: "/languages", icon: <Globe size={18} />, label: t("languages") },
      { to: "/pack", icon: <Box size={18} />, label: t("pack") },
    ];
    return isRTL ? links.reverse() : links;
  };

  const navLinks = getNavLinks();

  return (
    <nav className={`menu ${scrolled ? "scrolled" : ""} ${isRTL ? "rtl" : ""}`}>
      <div className="menu-left">
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
      </div>

      <div className="mobile-icon" onClick={() => setMobile(!mobile)}>
        {mobile ? <X size={28} /> : <MenuIcon size={28} />}
      </div>

      <ul className={mobile ? "menu-links active" : "menu-links"}>
        {navLinks.map((link, index) => (
          <li key={index}>
            <Link to={link.to}>
              {isRTL ? (
                <>
                  <span className="link-text">{link.label}</span>
                  <span className="link-icon">{link.icon}</span>
                </>
              ) : (
                <>
                  <span className="link-icon">{link.icon}</span>
                  <span className="link-text">{link.label}</span>
                </>
              )}
            </Link>
          </li>
        ))}
      </ul>

      <div className="menu-right">
        <button
            onClick={(e) => { 
              e.stopPropagation();
              setOpen(!open);
            }}
          className={`settings-btn ${open ? "active" : ""}`}
        >
          <Settings size={20} className={open ? "spin" : ""} />
        </button>

        {open && (
          <div 
            ref={dropdownRef}
            className={`dropdown ${isRTL ? "dropdown-rtl" : ""}`}
          >
            <div className="dropdown-header">{t("translation")}</div>
            <div className="language-bar">
              <button 
                className={`lang-btn ${lang === "AR" ? "active" : ""}`}
                onClick={() => handleLanguageChange("AR")}
              >AR</button>
              <button 
                className={`lang-btn ${lang === "FR" ? "active" : ""}`}
                onClick={() => handleLanguageChange("FR")}
              >FR</button>
              <button 
                className={`lang-btn ${lang === "EN" ? "active" : ""}`}
                onClick={() => handleLanguageChange("EN")}
              >EN</button>
            </div>
            
            <div className="dropdown-divider"></div>

            <div className="dropdown-header">{t("settings")}</div>
            <Link to="/saved" className="dropdown-item" onClick={() => setOpen(false)}>
              <Bookmark size={18} /> <span>{t("saved")}</span>
            </Link>
            <Link to="/login" className="dropdown-item" onClick={() => setOpen(false)}>
              <LogIn size={18} /> <span>{t("login")}</span>
            </Link>
            <div className="dropdown-item" onClick={toggleTheme}>
              {dark ? <Sun size={18} /> : <Moon size={18} />}
              <span>{dark ? t("lightMode") : t("darkMode")}</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Menu;