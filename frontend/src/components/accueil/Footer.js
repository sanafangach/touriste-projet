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
import { useLanguage } from "./LanguageContext";

const Footer = () => {
  const { lang } = useLanguage();

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

  const socialLinks = [
    { icon: <FaTwitter />, label: "Twitter", url: "https://twitter.com" },
    { icon: <FaLinkedin />, label: "LinkedIn", url: "https://linkedin.com" },
    { icon: <FaYoutube />, label: "YouTube", url: "https://youtube.com" },
    { icon: <RiInstagramFill />, label: "Instagram", url: "https://instagram.com" },
  ];

  const tFooter = {
    FR: {
      desc: "Votre guide ultime pour explorer le Maroc authentique.",
      destinations: "Destinations",
      services: "Services",
      aboutTitle: "À propos d'amudux",
      aboutDesc: "amudux est votre compagnon de voyage ultime au Maroc. Nous vous aidons à découvrir des destinations magnifiques, à planifier vos itinéraires avec l'IA et à explorer le pays de façon immersive.",
      copy: "Tous droits réservés.",
      tag1: "Voyage",
      tag2: "Maroc",
      tag3: "Aventure",
      learn: "Apprendre",
      planner: "Planificateur",
      maps: "Carte Interactive",
      contact: "Contactez-nous"
    },
    EN: {
      desc: "Your ultimate guide to exploring authentic Morocco.",
      destinations: "Destinations",
      services: "Services",
      aboutTitle: "About amudux",
      aboutDesc: "amudux is your ultimate travel companion in Morocco. We help you discover beautiful destinations, plan your trips using our AI, and explore the country in an immersive way.",
      copy: "All rights reserved.",
      tag1: "Travel",
      tag2: "Morocco",
      tag3: "Adventure",
      learn: "Learn",
      planner: "Travel Planner",
      maps: "Interactive Map",
      contact: "Contact Us"
    },
    AR: {
      desc: "دليلك الأمثل لاستكشاف المغرب الأصيل.",
      destinations: "الوجهات",
      services: "الخدمات",
      aboutTitle: "حول amudux",
      aboutDesc: "amudux هو رفيقك الأمثل للسفر في المغرب. نحن نساعدك على اكتشاف الوجهات الرائعة، وتخطيط مسارات رحلاتك بالذكاء الاصطناعي، واستكشاف البلاد بطريقة غامرة.",
      copy: "جميع الحقوق محفوظة.",
      tag1: "سفر",
      tag2: "المغرب",
      tag3: "مغامرة",
      learn: "تعلم",
      planner: "مخطط الرحلات",
      maps: "الخريطة التفاعلية",
      contact: "اتصل بنا"
    }
  };

  const currentT = tFooter[lang] || tFooter.FR;

  const dests = [
    { name: lang === "AR" ? "مراكش" : "Marrakech", slug: "marrakech" },
    { name: lang === "AR" ? "أكادير" : "Agadir", slug: "agadir" },
    { name: lang === "AR" ? "شفشاون" : "Chefchaouen", slug: "chefchaouen" },
    { name: lang === "AR" ? "فاس" : "Fès", slug: "fes" },
  ];

  const services = [
    { label: currentT.learn, path: "/languages" },
    { label: currentT.planner, path: "/pack" },
    { label: currentT.maps, path: "/card" },
    { label: currentT.contact, path: "/contact" },
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
            {currentT.desc}
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
          <h4>{currentT.destinations}</h4>
          <ul>
            {dests.map((d) => (
              <li key={d.slug}>
                <Link to={`/destination/${d.slug}`}>{d.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* SERVICES */}
        <div className="footer-col reveal" ref={addRef}>
          <h4>{currentT.services}</h4>
          <ul>
            {services.map((s) => (
              <li key={s.path}>
                <Link to={s.path}>{s.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ABOUT */}
        <div className="footer-col footer-about reveal" ref={addRef}>
          <h4>{currentT.aboutTitle}</h4>
          <p>{currentT.aboutDesc}</p>
        </div>

      </div>

      <div className="footer-divider"></div>

      <div className="footer-bottom">

        <p className="footer-copy">
          © {new Date().getFullYear()} <span>amudux</span>. {currentT.copy}
        </p>

        <div className="footer-tags">
          <Link to="/destination" className="footer-tag">{currentT.tag1}</Link>
          <Link to="/destination" className="footer-tag">{currentT.tag2}</Link>
          <Link to="/destination" className="footer-tag">{currentT.tag3}</Link>
        </div>

      </div>
    </footer>
  );
};

export default Footer; 