import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "./LanguageContext";
import "../css/sectionactivite.css";

import surfImg from "../../assets/surf.jfif";
import paraImg from "../../assets/para.jfif";
import horseImg from "../../assets/horse.jfif";
import saharaImg from "../../assets/sahara.jfif";


const content = {
  FR: {
    mini: "Top Activités",
    title: "Activités Populaires",
    explorer: "Explorer",
    activites: [
      {
        id: 1,
        nom: "Surf à Taghazout",
        lieu: "Agadir",
        badge: "Sport",
        image: surfImg,
        slug: "agadir",
      },
      {
        id: 2,
        nom: "Parapente à Aguergour",
        lieu: "Marrakech",
        badge: "Aventure",
        image: paraImg,
        slug: "marrakech",
      },
      {
        id: 3,
        nom: "Balade à cheval",
        lieu: "Essaouira",
        badge: "Culture",
        image: horseImg,
        slug: "essaouira",
      },
      {
        id: 4,
        nom: "Bivouac dans le Sahara",
        lieu: "Merzouga",
        badge: "Aventure",
        image: saharaImg,
        slug: "merzouga",
      },
    ],
  },

  EN: {
    mini: "Top Activities",
    title: "Popular Activities",
    explorer: "Explore",
    activites: [
      {
        id: 1,
        nom: "Surfing in Taghazout",
        lieu: "Agadir",
        badge: "Sport",
        image: surfImg,
        slug: "agadir",
      },
      {
        id: 2,
        nom: "Paragliding in Aguergour",
        lieu: "Marrakech",
        badge: "Adventure",
        image: paraImg,
        slug: "marrakech",
      },
      {
        id: 3,
        nom: "Horse Riding",
        lieu: "Essaouira",
        badge: "Culture",
        image: horseImg,
        slug: "essaouira",
      },
      {
        id: 4,
        nom: "Sahara Camp",
        lieu: "Merzouga",
        badge: "Adventure",
        image: saharaImg,
        slug: "merzouga",
      },
    ],
  },

  AR: {
    mini: "أبرز الأنشطة",
    title: "الأنشطة الشعبية",
    explorer: "استكشف",
    activites: [
      {
        id: 1,
        nom: "ركوب الأمواج في تغازوت",
        lieu: "أكادير",
        badge: "رياضة",
        image: surfImg,
        slug: "agadir",
      },
      {
        id: 2,
        nom: "الطيران المظلي في أكركور",
        lieu: "مراكش",
        badge: "مغامرة",
        image: paraImg,
        slug: "marrakech",
      },
      {
        id: 3,
        nom: "ركوب الخيل",
        lieu: "الصويرة",
        badge: "ثقافة",
        image: horseImg,
        slug: "essaouira",
      },
      {
        id: 4,
        nom: "مخيم في الصحراء",
        lieu: "مرزوكة",
        badge: "مغامرة",
        image: saharaImg,
        slug: "merzouga",
      },
    ],
  },
};

function ActiviteCard({ activite, explorerLabel, onExplore }) {
  return (
    <div className="activite-card" onClick={() => onExplore && onExplore(activite.slug)}>
      <img
        className="activite-card__img"
        src={activite.image}
        alt={activite.nom}
        loading="lazy"
      />
      <div className="activite-card__overlay" />

      <span className="activite-card__badge">{activite.badge}</span>

      <div className="activite-card__info">
        <p className="activite-card__nom">{activite.nom}</p>
        <p className="activite-card__lieu">{activite.lieu}</p>
        <button
          className="activite-card__btn"
          onClick={(e) => {
            e.stopPropagation();
            onExplore && onExplore(activite.slug);
          }}
        >
          {explorerLabel} →
        </button>
      </div>
    </div>
  );
}

function SectionActivite() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const c = content[lang] || content["FR"];

  const handleExplore = (slug) => {
    navigate(`/destination/${slug}`);
  };

  return (
    <section className="section-activite">
      <div className="activite-header">
        <div>
          <p className="activite-mini">{c.mini}</p>
          <h2 className="activite-title">{c.title}</h2>
        </div>
      </div>

      <div className="activite-grid">
        {c.activites.map((activite) => (
          <ActiviteCard
            key={activite.id}
            activite={activite}
            explorerLabel={c.explorer}
            onExplore={handleExplore}
          />
        ))}
      </div>
    </section>
  );
}

export default SectionActivite;