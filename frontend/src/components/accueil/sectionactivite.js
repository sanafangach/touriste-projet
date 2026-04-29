import React from "react";
import { Link } from "react-router-dom";
import "../css/sectionactivite.css";

import img1 from "../../assets/surf.jfif";
import img2 from "../../assets/quad.jpg";
import img3 from "../../assets/camel.jpg";
import img4 from "../../assets/parachete.jpg";

function PopularActivities() {
  const activities = [
    {
      id: 1,
      title: "Surf Adventure",
      place: "Taghazout - Agadir",
      image: img1,
      link: "/destination",
    },
    {
      id: 2,
      title: "Quad Desert Ride",
      place: "Agafay - Marrakech",
      image: img2,
      link: "/destination",
    },
    {
      id: 3,
      title: "Camel Experience",
      place: "Merzouga Desert",
      image: img3,
      link: "/destination",
    },
    {
      id: 4,
      title: "Paragliding Flight",
      place: "Aglou Beach - Tiznit",
      image: img4,
      link: "/destination",
    },
  ];

  return (
    <section className="activities-section">

      {/* HEADER */}
      <div className="activities-header">
        <div>
          <p className="mini-title">Adventure Time</p>
          <h2>Popular Activities</h2>
        </div>

        {/* BUTTON LINK */}
        <Link to="/destination" className="view-btn">
          View All
        </Link>
      </div>

      {/* CARDS */}
      <div className="activities-grid">
        {activities.map((item) => (
          <Link
            to={item.link}
            className="activity-card"
            key={item.id}
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div className="activity-overlay">
              <h3>{item.title}</h3>
              <p>{item.place}</p>
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}

export default PopularActivities;