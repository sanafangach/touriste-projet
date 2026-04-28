import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  }, 3000);

  return () => clearInterval(interval);
}, [images.length]);

  return (
    <div className="home">

      <div
        className="hero"
        style={{ backgroundImage: `url(${images[current]})` }}
      >
        <div className="overlay">
          <h1>Discover Beautiful Destinations</h1>
          <p>Travel, Explore and Live unforgettable moments</p>

          <Link to="/destination">
            <button className="hero-btn">Explore Now</button>
          </Link>
        </div>
      </div>
      <PopularDestination />
    </div>
  );
}

export default Home;