import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import { MapPin, Navigation, Star, Clock, Filter, Search, X, ChevronRight, Locate, Compass } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../css/card.css";
import { useLanguage } from "../accueil/LanguageContext";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const createDestIcon = (color = "#ff7a00", selected = false) =>
  L.divIcon({
    html: `<div style="
      width:${selected ? 44 : 34}px;height:${selected ? 44 : 34}px;
      background:${color};border:3px solid white;
      border-radius:50% 50% 50% 0;transform:rotate(-45deg);
      box-shadow:0 4px 15px rgba(0,0,0,0.4);
      transition:all 0.3s;
    "></div>`,
    className: "",
    iconSize: [selected ? 44 : 34, selected ? 44 : 34],
    iconAnchor: [selected ? 22 : 17, selected ? 44 : 34],
    popupAnchor: [0, selected ? -44 : -34],
  });

const userIcon = L.divIcon({
  html: `<div style="
    width:22px;height:22px;background:#4285f4;
    border:4px solid white;border-radius:50%;
    box-shadow:0 0 0 6px rgba(66,133,244,0.2);
  "></div>`,
  className: "",
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

const DESTINATIONS = [
  // Agadir region
  { id: 1, name: "Taghazout", city: "Agadir", lat: 30.5396, lng: -9.7093, cat: "catBeach", rating: 4.8, duration: "2h", color: "#0ea5e9" },
  { id: 2, name: "Plage d'Agadir", city: "Agadir", lat: 30.4219, lng: -9.5982, cat: "catBeach", rating: 4.5, duration: "1h", color: "#0ea5e9" },
  { id: 3, name: "Imouzzer", city: "Agadir", lat: 30.7030, lng: -9.4877, cat: "catNature", rating: 4.6, duration: "3h", color: "#22c55e" },
  { id: 4, name: "Souss-Massa", city: "Agadir", lat: 30.0490, lng: -9.6396, cat: "catNature", rating: 4.7, duration: "4h", color: "#22c55e" },
  // Marrakech
  { id: 5, name: "Jemaa el-Fna", city: "Marrakech", lat: 31.6258, lng: -7.9891, cat: "catCulture", rating: 4.9, duration: "3h", color: "#ff7a00" },
  { id: 6, name: "Jardin Majorelle", city: "Marrakech", lat: 31.6416, lng: -8.0137, cat: "catNature", rating: 4.8, duration: "2h", color: "#22c55e" },
  { id: 7, name: "Palais Bahia", city: "Marrakech", lat: 31.6208, lng: -7.9826, cat: "catHeritage", rating: 4.6, duration: "2h", color: "#a16207" },
  { id: 8, name: "Koutoubia", city: "Marrakech", lat: 31.6238, lng: -7.9939, cat: "catHeritage", rating: 4.7, duration: "1h", color: "#a16207" },
  { id: 9, name: "Toubkal", city: "Marrakech", lat: 31.0600, lng: -7.9150, cat: "catMountain", rating: 4.9, duration: "2j", color: "#7c3aed" },
  // Fes
  { id: 10, name: "Fes el-Bali", city: "Fes", lat: 34.0604, lng: -5.0144, cat: "catCulture", rating: 4.9, duration: "2j", color: "#dc2626" },
  { id: 11, name: "Tanneries Chouara", city: "Fes", lat: 34.0645, lng: -4.9745, cat: "catCulture", rating: 4.7, duration: "3h", color: "#dc2626" },
  { id: 12, name: "Bou Inania", city: "Fes", lat: 34.0641, lng: -4.9756, cat: "catHeritage", rating: 4.6, duration: "2h", color: "#a16207" },
  // Chefchaouen
  { id: 13, name: "Chefchaouen", city: "Chefchaouen", lat: 35.1688, lng: -5.2636, cat: "catCity", rating: 4.9, duration: "1j", color: "#6366f1" },
  // Merzouga / Sahara
  { id: 14, name: "Erg Chebbi", city: "Merzouga", lat: 31.1001, lng: -3.9718, cat: "catDesert", rating: 4.9, duration: "2j", color: "#f59e0b" },
  { id: 15, name: "Merzouga Village", city: "Merzouga", lat: 31.0804, lng: -4.0135, cat: "catDesert", rating: 4.7, duration: "1j", color: "#f59e0b" },
  // Ouarzazate
  { id: 16, name: "Ait Ben Haddou", city: "Ouarzazate", lat: 31.0472, lng: -7.1296, cat: "catHeritage", rating: 4.9, duration: "3h", color: "#a16207" },
  { id: 17, name: "Atlas Studios", city: "Ouarzazate", lat: 30.9369, lng: -6.8882, cat: "catActivities", rating: 4.5, duration: "2h", color: "#ec4899" },
  // Essaouira
  { id: 18, name: "Essaouira Medina", city: "Essaouira", lat: 31.5085, lng: -9.7595, cat: "catCity", rating: 4.8, duration: "1j", color: "#0e7490" },
  { id: 19, name: "Plage d'Essaouira", city: "Essaouira", lat: 31.5003, lng: -9.7744, cat: "catBeach", rating: 4.6, duration: "2h", color: "#0ea5e9" },
  // Casablanca
  { id: 20, name: "Hassan II Mosque", city: "Casablanca", lat: 33.6082, lng: -7.6325, cat: "catHeritage", rating: 4.9, duration: "2h", color: "#a16207" },
  { id: 21, name: "Corniche Casablanca", city: "Casablanca", lat: 33.5888, lng: -7.6588, cat: "catCity", rating: 4.4, duration: "2h", color: "#6366f1" },
  // Rabat
  { id: 22, name: "Kasbah Oudayas", city: "Rabat", lat: 34.0350, lng: -6.8443, cat: "catHeritage", rating: 4.7, duration: "2h", color: "#a16207" },
  { id: 23, name: "Tour Hassan", city: "Rabat", lat: 34.0229, lng: -6.8218, cat: "catHeritage", rating: 4.6, duration: "1h", color: "#a16207" },
  // Meknes
  { id: 24, name: "Bab Mansour", city: "Meknes", lat: 33.8955, lng: -5.5537, cat: "catHeritage", rating: 4.7, duration: "2h", color: "#a16207" },
  { id: 25, name: "Volubilis", city: "Meknes", lat: 34.0742, lng: -5.5533, cat: "catHeritage", rating: 4.8, duration: "3h", color: "#a16207" },
  // Cascades
  { id: 26, name: "Cascades d'Ouzoud", city: "Azilal", lat: 32.0094, lng: -6.7182, cat: "catNature", rating: 4.8, duration: "4h", color: "#22c55e" },
  { id: 27, name: "Cascades d'Akchour", city: "Chefchaouen", lat: 35.2420, lng: -5.1621, cat: "catNature", rating: 4.7, duration: "5h", color: "#22c55e" },
  // Tanger
  { id: 28, name: "Cap Spartel", city: "Tanger", lat: 35.7881, lng: -5.9215, cat: "catNature", rating: 4.7, duration: "2h", color: "#22c55e" },
  { id: 29, name: "Grottes d'Hercule", city: "Tanger", lat: 35.7798, lng: -5.9284, cat: "catNature", rating: 4.5, duration: "1h", color: "#22c55e" },
  { id: 30, name: "Medina de Tanger", city: "Tanger", lat: 35.7892, lng: -5.8135, cat: "catCity", rating: 4.4, duration: "3h", color: "#6366f1" },
  // Ifrane
  { id: 31, name: "Ifrane", city: "Ifrane", lat: 33.5333, lng: -5.1072, cat: "catNature", rating: 4.6, duration: "1j", color: "#22c55e" },
  // Dades / Gorges
  { id: 32, name: "Gorges du Dades", city: "Dades", lat: 31.5270, lng: -6.0000, cat: "catNature", rating: 4.8, duration: "1j", color: "#22c55e" },
  { id: 33, name: "Gorges du Todra", city: "Tinghir", lat: 31.5919, lng: -5.5883, cat: "catNature", rating: 4.8, duration: "4h", color: "#22c55e" },
  // Surf & Activites
  { id: 34, name: "Sidi Ifni", city: "Sidi Ifni", lat: 29.3797, lng: -10.1731, cat: "catBeach", rating: 4.5, duration: "2h", color: "#0ea5e9" },
  { id: 35, name: "Dakhla Surf", city: "Dakhla", lat: 23.6848, lng: -15.9573, cat: "catActivities", rating: 4.9, duration: "2j", color: "#ec4899" },
];

function getDistanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function FlyToUser({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.flyTo(position, 7, { duration: 2.5 });
  }, [position, map]);
  return null;
}

function FlyToDest({ dest }) {
  const map = useMap();
  useEffect(() => {
    if (dest) map.flyTo([dest.lat, dest.lng], 13, { duration: 1.5 });
  }, [dest, map]);
  return null;
}

export default function Card() {
  const { t, isRTL } = useLanguage();
  const [userPos, setUserPos] = useState(null);
  const [locError, setLocError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("catAll");
  const [radius, setRadius] = useState(600);

  const CATS = ["catAll","catBeach","catCulture","catCity","catDesert","catNature","catHeritage","catMountain","catActivities"];

  const locate = () => {
    setLoading(true);
    setLocError(null);
    navigator.geolocation.getCurrentPosition(
      (p) => { setUserPos([p.coords.latitude, p.coords.longitude]); setLoading(false); },
      () => { setLocError(t("locError")); setUserPos([29.0, -7.5]); setLoading(false); },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  useEffect(() => { locate(); }, []); // eslint-disable-line

  const destinations = DESTINATIONS.map((d) => ({
    ...d,
    distKm: userPos ? getDistanceKm(userPos[0], userPos[1], d.lat, d.lng) : null,
  }))
    .filter((d) => {
      const matchCat = category === "catAll" || d.cat === category;
      const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.city.toLowerCase().includes(search.toLowerCase());
      const matchRadius = !d.distKm || d.distKm <= radius;
      return matchCat && matchSearch && matchRadius;
    })
    .sort((a, b) => (a.distKm ?? 9999) - (b.distKm ?? 9999));

  return (
    <div className={`card-page ${isRTL ? "rtl" : ""}`}>

      {/* SIDEBAR */}
      <div className="card-sidebar">
        {/* Header */}
        <div className="sidebar-header">
          <div className="sidebar-title-wrap">
            <div className="sidebar-icon-wrap"><Compass size={18} /></div>
            <div>
              <h2 className="sidebar-title">{t("cardTitle")}</h2>
              <p className="sidebar-sub">{destinations.length} {t("resultsNear")}</p>
            </div>
          </div>
          <button className={`locate-btn${loading ? " loading" : ""}`} onClick={locate} disabled={loading} title={t("locateMe")}>
            {loading ? <span className="spin-sm" /> : <Locate size={17} />}
          </button>
        </div>

        {locError && <div className="loc-notice"><Navigation size={13} />{locError}</div>}

        {/* Search */}
        <div className="search-wrap">
          <Search size={15} className="s-icon" />
          <input placeholder={t("searchPlaceholder")} value={search} onChange={(e) => setSearch(e.target.value)} />
          {search && <button className="s-clear" onClick={() => setSearch("")}><X size={13} /></button>}
        </div>

        {/* Radius */}
        <div className="radius-wrap">
          <div className="radius-label">
            <Filter size={13} />
            <span>{t("radiusLabel")} : </span>
            <strong>{radius} km</strong>
          </div>
          <input type="range" min="100" max="2000" step="50" value={radius} onChange={(e) => setRadius(Number(e.target.value))} className="radius-slider" />
        </div>

        {/* Categories */}
        <div className="cats-scroll">
          {CATS.map((c) => (
            <button key={c} className={`cat-pill${category === c ? " active" : ""}`} onClick={() => setCategory(c)}>
              {t(c)}
            </button>
          ))}
        </div>

        <div className="res-count"><span>{destinations.length} {t("resultsNear")}</span></div>

        {/* List */}
        <div className="dest-list">
          {destinations.length === 0 && (
            <div className="empty-state">
              <MapPin size={30} /><p>{t("noResults")}</p>
            </div>
          )}
          {destinations.map((d) => (
            <div key={d.id} className={`dest-row${selected?.id === d.id ? " sel" : ""}`} onClick={() => setSelected(d)}>
              <div className="dest-dot" style={{ background: d.color }} />
              <div className="dest-info">
                <span className="dest-name">{d.name}</span>
                <span className="dest-city">{d.city}</span>
                <div className="dest-tags">
                  <span className="tag-cat">{t(d.cat)}</span>
                  <span className="tag-rat"><Star size={10} fill="#f59e0b" color="#f59e0b" />{d.rating}</span>
                  <span className="tag-dur"><Clock size={10} />{d.duration}</span>
                </div>
              </div>
              <div className="dest-km">
                {d.distKm && <><b>{d.distKm > 999 ? ">999" : d.distKm}</b><small>km</small></>}
                <ChevronRight size={13} className="row-arrow" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MAP */}
      <div className="card-map-wrap">
        {userPos ? (
          <MapContainer center={userPos} zoom={6} style={{ width: "100%", height: "100%" }} zoomControl={false}>
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution='&copy; Esri, DigitalGlobe, GeoEye, Earthstar Geographics'
              maxZoom={19}
            />
            {/* Labels overlay on top of satellite */}
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
              attribution=""
              maxZoom={19}
              opacity={0.8}
            />
            <FlyToUser position={userPos} />
            {selected && <FlyToDest dest={selected} />}

            <Circle center={userPos} radius={radius * 1000} pathOptions={{
              color: "#ff7a00", fillColor: "#ff7a00", fillOpacity: 0.03,
              weight: 1.5, dashArray: "6 5"
            }} />

            <Marker position={userPos} icon={userIcon}>
              <Popup className="map-popup">
                <div className="popup-user-inner">
                  <Navigation size={14} color="#4285f4" />
                  <strong>{t("yourPosition")}</strong>
                </div>
              </Popup>
            </Marker>

            {destinations.map((d) => (
              <Marker
                key={d.id}
                position={[d.lat, d.lng]}
                icon={createDestIcon(d.color, selected?.id === d.id)}
                eventHandlers={{ click: () => setSelected(d) }}
              >
                <Popup className="map-popup">
                  <div className="popup-dest-inner">
                    <div className="popup-badge" style={{ background: d.color }}>{t(d.cat)}</div>
                    <h4>{d.name}</h4>
                    <p className="popup-city-name">{d.city}</p>
                    <div className="popup-row">
                      <span><Star size={11} fill="#f59e0b" color="#f59e0b" /> {d.rating}</span>
                      <span><Clock size={11} /> {d.duration}</span>
                      {d.distKm && <span><Navigation size={11} color="#4285f4" /> {d.distKm} km</span>}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        ) : (
          <div className="map-placeholder">
            <span className="spin-lg" />
            <p>{t("locating")}</p>
          </div>
        )}

        {/* Detail card overlay */}
        {selected && (
          <div className="detail-card">
            <button className="detail-close" onClick={() => setSelected(null)}><X size={16} /></button>
            <div className="detail-badge" style={{ background: selected.color }}>{t(selected.cat)}</div>
            <h3 className="detail-name">{selected.name}</h3>
            <p className="detail-city"><MapPin size={13} />{selected.city}</p>
            <div className="detail-stats">
              <div className="d-stat"><Star size={15} fill="#f59e0b" color="#f59e0b" /><span>{selected.rating}/5</span></div>
              <div className="d-stat"><Clock size={15} color="#ff7a00" /><span>{selected.duration}</span></div>
              {selected.distKm && <div className="d-stat"><Navigation size={15} color="#4285f4" /><span>{selected.distKm} km</span></div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}