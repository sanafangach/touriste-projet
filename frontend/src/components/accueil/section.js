import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import "../css/section.css";

import img1 from "../../assets/taghazot.png";
import img2 from "../../assets/img3.webp";
import img3 from "../../assets/Chefchaouen.jpg";
import img4 from "../../assets/Merzouga.jpg";

function PopularDestination() {
  const { t, lang } = useLanguage();

  const getPlaces = () => {
    const basePlaces = [
      { id: 1, image: img1, link: "/destination/agadir" },
      { id: 2, image: img2, link: "/destination/marrakech" },
      { id: 3, image: img3, link: "/destination/chefchaouen" },
      { id: 4, image: img4, link: "/destination/merzouga" },
    ];

    const translations = {
      FR: [
        { city: "Agadir", place: "Plage de Taghazout" },
        { city: "Marrakech", place: "Jamaa El Fna" },
        { city: "Chefchaouen", place: "Médina Bleue" },
        { city: "Merzouga", place: "Désert du Sahara" },
      ],
      EN: [
        { city: "Agadir", place: "Taghazout Beach" },
        { city: "Marrakech", place: "Jamaa El Fna" },
        { city: "Chefchaouen", place: "Blue Medina" },
        { city: "Merzouga", place: "Sahara Desert" },
      ],
      AR: [
        { city: "أكادير", place: "شاطئ تغازوت" },
        { city: "مراكش", place: "جامع الفنا" },
        { city: "شفشاون", place: "المدينة الزرقاء" },
        { city: "مرزوقة", place: "صحراء الساحرة" },
      ],
    };

    return basePlaces.map((place, index) => ({
      ...place,
      ...translations[lang][index]
    }));
  };

  const places = getPlaces();

  return (
    <section className="popular-section">
      <div className="popular-header">
        <div>
          <p className="mini-title">{t("topPlaces")}</p>
          <h2>{t("popularDestinations")}</h2>
        </div>
        <Link to="/destination" className="view-btn">
          {t("viewAll")} <ArrowRight size={18} className="arrow-icon" />
        </Link>
      </div>

      <div className="popular-grid">
        {places.map((item) => (
          <Link to={item.link} className="popular-card" key={item.id}>
            <img src={item.image} alt={item.place} />
            <div className="card-info">
              <h3>{item.place}</h3>
              <p>{item.city}</p>
              <span className="card-btn">
                {lang === "FR" ? "Explorer" : lang === "AR" ? "استكشف" : "Explore"}
                <ArrowRight size={16} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default PopularDestination;