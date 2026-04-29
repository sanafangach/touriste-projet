import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import "../css/home.css";
import PopularDestination from "./section"

import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpeg";
import img3 from "../../assets/img3.webp";
import img4 from "../../assets/img4.webp";

function Home() {
  const images = [img1, img2, img3, img4];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
  const interval = setInterval(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, 4000); // Increased time slightly for the zoom effect to be more visible

  return () => clearInterval(interval);
}, [images.length]);

  return (
    <div className="home">

      <div className="hero">
        {/* Background Image with Zoom effect */}
        <div 
          className="hero-bg"
          style={{ 
            backgroundImage: `url(${images[current]})`,
            transition: 'background-image 1.5s ease-in-out'
          }}
        ></div>

        <div className="overlay">
          <h1 key={`title-${current}`} className="slide-up">Discover Beautiful Destinations</h1>
          <p key={`desc-${current}`} className="slide-up-delay">Travel, Explore and Live unforgettable moments</p>

          <Link to="/destination" className="slide-up-delay-2">
            <button className="hero-btn">Explore Now</button>
          </Link>
        </div>

        {/* Bottom Hover Indicator */}
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
    </div>
  );
}

export default Home;