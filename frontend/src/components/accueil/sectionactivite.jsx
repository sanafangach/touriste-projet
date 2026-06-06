import React from "react";
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
    voirTout: "Voir tout",
    explorer: "Explorer",
    activites: [
      {
        id: 1,
        nom: "Surf à Taghazout",
        lieu: "Agadir",
        badge: "Sport",
        image: surfImg,
      },
      {
        id: 2,
        nom: "Parapente à Aguergour",
        lieu: "Marrakech",
        badge: "Aventure",
        image: paraImg,
      },
      {
        id: 3,
        nom: "Balade à cheval",
        lieu: "Essaouira",
        badge: "Culture",
        image: horseImg,
      },
      {
        id: 4,
        nom: "Bivouac dans le Sahara",
        lieu: "Merzouga",
        badge: "Aventure",
        image: saharaImg,
      },
    ],
  },

  EN: {
    mini: "Top Activities",
    title: "Popular Activities",
    voirTout: "See all",
    explorer: "Explore",
    activites: [
      {
        id: 1,
        nom: "Surfing in Taghazout",
        lieu: "Agadir",
        badge: "Sport",
        image: surfImg,
      },
      {
        id: 2,
        nom: "Paragliding in Aguergour",
        lieu: "Marrakech",
        badge: "Adventure",
        image: paraImg,
      },
      {
        id: 3,
        nom: "Horse Riding",
        lieu: "Essaouira",
        badge: "Culture",
        image: horseImg,
      },
      {
        id: 4,
        nom: "Sahara Camp",
        lieu: "Merzouga",
        badge: "Adventure",
        image: saharaImg,
      },
    ],
  },

  AR: {
    mini: "أبرز الأنشطة",
    title: "الأنشطة الشعبية",
    voirTout: "عرض الكل",
    explorer: "استكشف",
    activites: [
      {
        id: 1,
        nom: "ركوب الأمواج في تغازوت",
        lieu: "أكادير",
        badge: "رياضة",
        image: surfImg,
      },
      {
        id: 2,
        nom: "الطيران المظلي في أكركور",
        lieu: "مراكش",
        badge: "مغامرة",
        image: paraImg,
      },
      {
        id: 3,
        nom: "ركوب الخيل",
        lieu: "الصويرة",
        badge: "ثقافة",
        image: horseImg,
      },
      {
        id: 4,
        nom: "مخيم في الصحراء",
        lieu: "مرزوكة",
        badge: "مغامرة",
        image: saharaImg,
      },
    ],
  },
};
function ActiviteCard({ activite, explorerLabel, onExplore }) {
  return (
    <div className="activite-card" onClick={() => onExplore && onExplore(activite)}>
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
            onExplore && onExplore(activite);
          }}
        >
          {explorerLabel} →
        </button>
      </div>
    </div>
  );
}

function SectionActivite({ onVoirTout, onExplore }) {
  const { lang } = useLanguage();
  const c = content[lang] || content["FR"];

  return (
    <section className="section-activite">
      <div className="activite-header">
        <div>
          <p className="activite-mini">{c.mini}</p>
          <h2 className="activite-title">{c.title}</h2>
        </div>
        <button
          className="activite-voir-tout"
          onClick={() => onVoirTout && onVoirTout()}
        >
          {c.voirTout} →
        </button>
      </div>

      <div className="activite-grid">
        {c.activites.map((activite) => (
          <ActiviteCard
            key={activite.id}
            activite={activite}
            explorerLabel={c.explorer}
            onExplore={onExplore}
          />
        ))}
      </div>
    </section>
  );
}

export default SectionActivite;