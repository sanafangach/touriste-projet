import React from "react";
import "../css/sectiondescription.css";

function AboutSite() {
  return (
    <section className="about-site">

      <div className="about-container">

        {/* LEFT */}
        <div className="about-left">
          <p className="about-mini">Who We Are</p>
          <h2>Discover Morocco With The Best Travel Experience</h2>

          <p className="about-text">
            Welcome to our travel platform, your perfect guide to explore the
            beauty of Morocco. From golden deserts to blue cities, beaches,
            mountains and historical places, we help travelers discover the
            most amazing destinations with comfort and style.
          </p>

          <p className="about-text">
            Our mission is to make every trip unforgettable by offering the
            best places, local experiences and easy booking solutions.
          </p>

          <button className="about-btn">Learn More</button>
        </div>

        {/* RIGHT */}
        <div className="about-right">

          <div className="info-box">
            <h3>50+</h3>
            <p>Popular Destinations</p>
          </div>

          <div className="info-box">
            <h3>10K+</h3>
            <p>Happy Travelers</p>
          </div>

          <div className="info-box">
            <h3>24/7</h3>
            <p>Customer Support</p>
          </div>

          <div className="info-box">
            <h3>100%</h3>
            <p>Secure Booking</p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default AboutSite;