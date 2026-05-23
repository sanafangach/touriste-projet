import React, { useState, useEffect, useRef } from "react";
import "../css/Footer.css";

import logoDark from "../../assets/logo12.png";
import logoLight from "../../assets/logo13.png";

import {
  FaTwitter,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

import { RiInstagramFill } from "react-icons/ri";

import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  const refs = useRef([]);

  // detect dark mode change
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(
        document.documentElement.classList.contains("dark")
      );
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }),
      { threshold: 0.15 }
    );

    refs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const addRef = (el) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  const handleSubscribe = async () => {
    if (!email.trim()) return;

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    setSent(true);
    setLoading(false);
    setEmail("");

    setTimeout(() => setSent(false), 3000);
  };

  const socialLinks = [
    { icon: <FaTwitter />, label: "Twitter", url: "https://twitter.com" },
    { icon: <FaLinkedin />, label: "LinkedIn", url: "https://linkedin.com" },
    { icon: <FaYoutube />, label: "YouTube", url: "https://youtube.com" },
    { icon: <RiInstagramFill />, label: "Instagram", url: "https://instagram.com" },
  ];

  return (
    <footer className="amudux-footer">
      <div className="footer-grid-bg"></div>
      <div className="footer-glow"></div>

      {Array.from({ length: 14 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${5 + (i * 6.5) % 95}%`,
            bottom: `${10 + (i % 4) * 8}%`,
            animationDuration: `${3 + (i % 3)}s`,
            animationDelay: `${(i * 0.4) % 3}s`,
          }}
        />
      ))}

      <div className="footer-body">

        {/* LOGO */}
        <div className="footer-col reveal" ref={addRef}>
          <div className="footer-brand-logo">
            <img
              src={isDarkMode ? logoDark : logoLight}
              alt="Logo"
              className="logo-img"
            />
          </div>

          <p className="footer-brand-desc">
            Votre guide ultime pour explorer le Maroc authentique.
          </p>

          <div className="footer-socials">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
              >
                <span className="social-icon">{s.icon}</span>
              </a>
            ))}
          </div>
        </div>

        {/* DESTINATIONS */}
        <div className="footer-col reveal" ref={addRef}>
          <h4>Destinations</h4>
          <ul>
            {["Marrakech", "Agadir", "Chefchaouen", "Fès"].map((d) => (
              <li key={d}>
                <Link to="/destinations">{d}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* SERVICES */}
        <div className="footer-col reveal" ref={addRef}>
          <h4>Services</h4>
          <ul>
            {[
              "Hôtels",
              "Activités",
              "Transport",
              "Guides Touristiques",
            ].map((s) => (
              <li key={s}>
                <a href="#">{s}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div className="footer-col footer-newsletter reveal" ref={addRef}>
          <h4>Newsletter</h4>

          <p>Recevez nos meilleures offres directement par email.</p>

          <div className="newsletter-form">
            <input
              className="newsletter-input"
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              className="newsletter-submit"
              onClick={handleSubscribe}
              disabled={loading}
            >
              {loading ? "..." : sent ? "✓ Inscrit !" : "S'abonner"}
            </button>
          </div>
        </div>

      </div>

      <div className="footer-divider"></div>

      <div className="footer-bottom">

        <p className="footer-copy">
          © {new Date().getFullYear()} <span>Votre Marque</span>
        </p>

        <div className="footer-tags">
          <Link to="/destinations" className="footer-tag">Voyage</Link>
          <Link to="/destinations" className="footer-tag">Maroc</Link>
          <Link to="/destinations" className="footer-tag">Aventure</Link>
        </div>

      </div>
    </footer>
  );
};

export default Footer; 