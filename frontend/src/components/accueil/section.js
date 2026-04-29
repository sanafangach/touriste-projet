import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import "../css/section.css";

import img1 from "../../assets/taghazot.png";
import img2 from "../../assets/img3.webp";
import img3 from "../../assets/Chefchaouen.jpg";
import img4 from "../../assets/Merzouga.jpg";

function PopularDestination() {
  const places = [
    {
      id: 1,
      city: "Agadir",
      place: "Taghazout Beach",
      image: img1,
      link: "/destination/agadir",
    },
    {
      id: 2,
      city: "Marrakech",
      place: "Jamaa El Fna",
      image: img2,
      link: "/destination/marrakech",
    },
    {
      id: 3,
      city: "Chefchaouen",
      place: "Blue Medina",
      image: img3,
      link: "/destination/chefchaouen",
    },
    {
      id: 4,
      city: "Merzouga",
      place: "Sahara Desert",
      image: img4,
      link: "/destination/merzouga",
    },
  ];

  return (
    <section className="popular-section">

      {/* HEADER */}
      <div className="popular-header">
        <div>
          <p className="mini-title">Top Places</p>
          <h2>Popular Destinations</h2>
        </div>

        {/* VIEW ALL BUTTON LINK */}
        <Link to="/destination" className="view-btn">
          View All <ArrowRight size={18} className="arrow-icon" />
        </Link>
      </div>

      {/* CARDS */}
      <div className="popular-grid">
        {places.map((item) => (
          <Link
            to={item.link}
            className="popular-card group"
            key={item.id}
          >
            <div className="card-bg" style={{ backgroundImage: `url(${item.image})` }}></div>
            <div className="card-overlay">
              <div className="card-content">
                <h3>{item.place}</h3>
                <p>{item.city}</p>
                <div className="card-hover-indicator">
                  <span>Explore</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}

export default PopularDestination;