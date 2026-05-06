import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Star, Trash2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../accueil/LanguageContext';
import '../css/saved.css';

const savedDestinationsData = [
  { id: 1, name: "Marrakech", rating: 4.9, reviews: 892, image: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=800", location: "Marrakech-Safi", savedDate: "2024-01-15" },
  { id: 8, name: "Chefchaouen", rating: 4.9, reviews: 567, image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800", location: "Tangier-Tetouan", savedDate: "2024-01-10" },
  { id: 10, name: "Merzouga", rating: 4.8, reviews: 421, image: "https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=800", location: "Draa-Tafilalet", savedDate: "2024-01-05" },
];

function Saved() {
  const { lang, isRTL } = useLanguage();
  const [savedItems, setSavedItems] = useState(savedDestinationsData);

  const removeItem = (id) => {
    setSavedItems(prev => prev.filter(item => item.id !== id));
  };

  const lt = {
    FR: { saved: 'Enregistrés', subtitle: 'Vos destinations favorites', empty: 'Aucune destination enregistrée', explore: 'Explorer les destinations', remove: 'Retirer' },
    EN: { saved: 'Saved', subtitle: 'Your favorite destinations', empty: 'No saved destinations', explore: 'Explore destinations', remove: 'Remove' },
    AR: { saved: 'المحفوظات', subtitle: 'وجهاتك المفضلة', empty: 'لا توجد وجهات محفوظة', explore: 'استكشف الوجهات', remove: 'إزالة' }
  };

  const t = lt[lang];

  return (
    <div className={`saved-page ${isRTL ? 'rtl' : ''}`}>
      {/* Hero */}
      <div className="saved-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <Heart size={48} className="hero-icon" />
          <h1>{t.saved}</h1>
          <p>{t.subtitle}</p>
        </div>
      </div>

      {/* Content */}
      <div className="saved-content">
        {savedItems.length > 0 ? (
          <div className="saved-grid">
            {savedItems.map((item) => (
              <div key={item.id} className="saved-card">
                <div className="card-image">
                  <img src={item.image} alt={item.name} />
                  <div className="card-overlay"></div>
                  <button className="remove-btn" onClick={() => removeItem(item.id)} title={t.remove}>
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="card-content">
                  <h3>{item.name}</h3>
                  <div className="card-meta">
                    <span className="location"><MapPin size={14} /> {item.location}</span>
                    <span className="rating"><Star size={14} fill="currentColor" /> {item.rating}</span>
                  </div>
                  <Link to={`/destination/${item.id}`} className="view-link">
                    {lang === 'AR' ? 'عرض التفاصيل' : lang === 'FR' ? 'Voir les détails' : 'View details'}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Heart size={64} className="empty-icon" />
            <h3>{t.empty}</h3>
            <Link to="/destination" className="explore-btn">
              {t.explore}
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Saved;