import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "./LanguageContext"; // 🔥 Import
import "../css/home.css";
import PopularDestination from "./section"
import AboutSite from "./sectiondescription"
import PopularActivities from "./sectionactivite"
import LearningSection from "./sectionlearning"

import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpeg";
import img3 from "../../assets/img3.webp";
import img4 from "../../assets/img4.webp";

function Home() {
  const { t } = useLanguage(); // 🔥 Utilisation du contexte
  const images = [img1, img2, img3, img4];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="home">
      <div className="hero">
        <div 
          className="hero-bg"
          style={{ 
            backgroundImage: `url(${images[current]})`,
            transition: 'background-image 1.5s ease-in-out'
          }}
        ></div>

        <div className="overlay">
          <h1 key={`title-${current}`} className="slide-up">{t("heroTitle")}</h1>
          <p key={`desc-${current}`} className="slide-up-delay">{t("heroSubtitle")}</p>

          <Link to="/destination" className="slide-up-delay-2">
            <button className="hero-btn">{t("exploreBtn")}</button>
          </Link>
        </div>

        <div 
          className="scroll-indicator" 
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <ChevronDown size={24} className="bounce" />
        </div>
      </div>
      
      <PopularDestination />
      <AboutSite />
      <PopularActivities />
      <LearningSection />
    </div>
  );
}

export default Home;