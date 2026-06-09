import React, { useState, useEffect, useRef, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Check, 
  ExternalLink,
  TrendingUp,
  Coins,
  BarChart3,
  Crown,
  Smile,
  Compass,
  Star,
  Plane,
  Hotel,
  UtensilsCrossed,
  Camera,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  User,
  Heart,
  Users,
  Sun,
  Waves,
  Mountain,
  Landmark
} from "lucide-react";
import { useLanguage } from "../accueil/LanguageContext";
import { generateTripData } from "../../services/aiService";
import { MOROCCO_CITIES, getMoroccoImageByText, CITY_CATEGORIES, getGoogleMapsHotelOptions, getRealGoogleMapsOptions } from "../../services/moroccoData";
import api from "../../services/api";
import { getUploadUrl } from "../../services/config";
import "../css/pack.css";

const formatDateInput = (date) => date.toISOString().slice(0, 10);

const addDays = (date, days) => {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
};

const getInclusiveDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) return 1;
  return Math.min(14, Math.max(1, Math.round((end - start) / 86400000) + 1));
};

function Pack() {
  const { t, lang, isRTL } = useLanguage();
  const locationState = useLocation();
  const today = formatDateInput(new Date());
  const defaultEndDate = formatDateInput(addDays(new Date(), 2));
  
  // Form State
  const [formData, setFormData] = useState({
    location: locationState.state?.city || "Marrakech",
    noOfDays: "3",
    startDate: today,
    endDate: defaultEndDate,
    budget: "Moderate",
    traveler: "Couple"
  });

  // Flow State
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [tripResult, setTripResult] = useState(null);

  // Redesign States
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [citySearch, setCitySearch] = useState("");
  const [expandedDays, setExpandedDays] = useState({});
  const cityDropdownRef = useRef(null);

  // Horizontal Scroll Refs
  const hotelsScrollRef = useRef(null);
  const restaurantsScrollRef = useRef(null);

  // Saved Trips State
  const [savedTrips, setSavedTrips] = useState(() => {
    try {
      const saved = localStorage.getItem("saved_ai_trips");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // DB cities & items fetched from backend
  const [dbCities, setDbCities]   = useState([]);
  const [dbItems, setDbItems]     = useState(null);  // { activities, restaurants, places, hidden_gems }
  const [dbHotels, setDbHotels]   = useState([]);     // Hotels from /hotels?city=

  // Merged city list: static MOROCCO_CITIES + any extra DB city names
  const allCities = useMemo(() => {
    const dbNames = dbCities.map(c => c.name);
    const extras  = dbNames.filter(n => !MOROCCO_CITIES.includes(n));
    return [...MOROCCO_CITIES, ...extras];
  }, [dbCities]);

  // Fetch cities from backend on mount
  useEffect(() => {
    api.get('/cities')
      .then(res => {
        const list = Array.isArray(res.data?.cities) ? res.data.cities : [];
        setDbCities(list);
      })
      .catch(() => { /* silent — fall back to static list */ });
  }, []);

  // When the selected city changes, try to load DB details for it
  useEffect(() => {
    const match = dbCities.find(
      c => c.name.toLowerCase() === formData.location.toLowerCase()
    );
    if (!match) { setDbItems(null); return; }

    api.get(`/cities/${match.slug}`)
      .then(res => {
        setDbItems({
          activities:   Array.isArray(res.data?.activities)   ? res.data.activities   : [],
          restaurants:  Array.isArray(res.data?.restaurants)  ? res.data.restaurants  : [],
          places:       Array.isArray(res.data?.places)        ? res.data.places        : [],
          hidden_gems:  Array.isArray(res.data?.hidden_gems)   ? res.data.hidden_gems  : [],
        });
      })
      .catch(() => setDbItems(null));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.location, dbCities]);

  // When the selected city changes, fetch DB hotels for it
  useEffect(() => {
    const cityName = formData.location;
    if (!cityName) { setDbHotels([]); return; }

    api.get(`/hotels?city=${encodeURIComponent(cityName)}`)
      .then(res => {
        const list = Array.isArray(res.data) ? res.data : [];
        setDbHotels(list);
      })
      .catch(() => setDbHotels([]));
  }, [formData.location]);

  // Build "DB hotel cards" from the /hotels endpoint
  const dbHotelCards = useMemo(() => {
    if (!dbHotels.length) return [];
    return dbHotels.map(h => ({
      name: h.name,
      price: h.price || 'Sur place',
      rating: h.rating ? String(h.rating) : '4.5',
      reviews: h.reviews || '',
      address: h.city?.name ? `${h.city.name}, Maroc` : `${formData.location}, Maroc`,
      description: h.description || '',
      image_url: h.image || getMoroccoImageByText(formData.location, 'hotel'),
      maps_query: h.maps_query || `${h.name}, ${formData.location}, Morocco`,
      source: h.source || 'Base de données',
    }));
  }, [dbHotels, formData.location]);

  // Build "DB restaurant cards"
  const dbRestaurantCards = useMemo(() => {
    if (!dbItems?.restaurants?.length) return [];
    return dbItems.restaurants.map(r => ({
      name: r.name,
      price: r.price_range || 'Varie',
      rating: r.rating ? String(r.rating) : '4.4',
      cuisine: r.cuisine || 'Marocain',
      address: r.address || formData.location,
      description: r.description || '',
      image_url: r.image ? getUploadUrl(r.image) : getMoroccoImageByText(formData.location, 'restaurant'),
      maps_query: `${r.name}, ${formData.location}, Morocco`,
      source: 'Base de données',
    }));
  }, [dbItems, formData.location]);

  const stepTimerRef = useRef(null);
  const progressTimerRef = useRef(null);

  // Get city geographical category
  const getCityCategory = (cityName) => {
    return CITY_CATEGORIES?.[cityName] || "imperial";
  };

  // Emoji Categories mapping helper
  const getCityCategoryIcon = (cityName) => {
    const cat = getCityCategory(cityName);
    if (cat === "desert") return <Sun size={20} className="city-category-icon" />;
    if (cat === "beach") return <Waves size={20} className="city-category-icon" />;
    if (cat === "nature") return <Mountain size={20} className="city-category-icon" />;
    return <Landmark size={20} className="city-category-icon" />;
  };

  // Timeline Time of Day Pill Styling Helpers
  const getTimeBadgeClass = (time = "") => {
    const t = time.toLowerCase();
    if (t.includes("morning") || t.includes("matin") || t.includes("صباح")) return "time-pill-morning";
    if (t.includes("lunch") || t.includes("midi") || t.includes("غداء")) return "time-pill-lunch";
    if (t.includes("afternoon") || t.includes("après-midi") || t.includes("زوال")) return "time-pill-afternoon";
    if (t.includes("evening") || t.includes("soir") || t.includes("مساء")) return "time-pill-evening";
    return "time-pill-default";
  };

  const getTimeEmoji = (time = "") => {
    const t = time.toLowerCase();
    if (t.includes("morning") || t.includes("matin") || t.includes("صباح")) return "🌅";
    if (t.includes("lunch") || t.includes("midi") || t.includes("غداء")) return "☀️";
    if (t.includes("afternoon") || t.includes("après-midi") || t.includes("زوال")) return "🌊";
    if (t.includes("evening") || t.includes("soir") || t.includes("مساء")) return "🌙";
    return "⏳";
  };

  const toggleDayExpansion = (dayIndex) => {
    setExpandedDays(prev => ({
      ...prev,
      [dayIndex]: prev[dayIndex] === false ? true : false // default to true, click toggles to false
    }));
  };

  const isDayExpanded = (dayIndex) => {
    return expandedDays[dayIndex] !== false; // expanded by default
  };

  // Horizontal scroll helper
  const scrollContainer = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 340;
      ref.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const STEP_MESSAGES = [
    {
      icon: <Compass size={18} />,
      text: lang === "AR" ? "تحليل رغبات السفر الخاصة بك..." : lang === "FR" ? "Analyse de vos préférences de voyage..." : "Analyzing travel preferences..."
    },
    {
      icon: <Hotel size={18} />,
      text: lang === "AR" ? "البحث عن أفضل الفنادق والرياضات..." : lang === "FR" ? "Recherche des meilleurs hôtels et riads..." : "Finding best hotels & riads..."
    },
    {
      icon: <Camera size={18} />,
      text: lang === "AR" ? "تصميم جدول الأنشطة اليومية..." : lang === "FR" ? "Création du planning d'activités quotidiennes..." : "Designing daily activities..."
    },
    {
      icon: <UtensilsCrossed size={18} />,
      text: lang === "AR" ? "اختيار أفضل المطاعم والتجارب..." : lang === "FR" ? "Sélection des meilleurs restaurants et expériences..." : "Selecting top restaurants & experiences..."
    },
    {
      icon: <MapPin size={18} />,
      text: lang === "AR" ? "تحديد المواقع على الخريطة..." : lang === "FR" ? "Localisation des points d'intérêt sur la carte..." : "Mapping points of interest..."
    },
    {
      icon: <Plane size={18} />,
      text: lang === "AR" ? "تجميع خطة الرحلة المخصصة..." : lang === "FR" ? "Finalisation de l'itinéraire sur-mesure..." : "Assembling your custom itinerary..."
    }
  ];

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, value) => {
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "startDate" && next.endDate < value) {
        next.endDate = value;
      }
      if (name === "endDate" && value < next.startDate) {
        next.startDate = value;
      }
      next.noOfDays = getInclusiveDays(next.startDate, next.endDate).toString();
      return next;
    });
  };

  // Launch AI Trip Generation
  const handleGenerate = async () => {
    if (!formData.location || !formData.noOfDays) return;

    setLoading(true);
    setLoadingStep(0);
    setLoadingProgress(0);
    setTripResult(null);
    setExpandedDays({}); // Reset day toggle settings

    // Animate step progression
    let step = 0;
    stepTimerRef.current = setInterval(() => {
      step++;
      if (step < STEP_MESSAGES.length) {
        setLoadingStep(step);
      }
    }, 2000);

    // Animate progress percentage
    let progress = 0;
    progressTimerRef.current = setInterval(() => {
      progress += Math.random() * 3 + 0.5;
      if (progress > 92) progress = 92; // Cap at 92% until real data arrives
      setLoadingProgress(Math.floor(progress));
    }, 200);

    try {
      const data = await generateTripData({
        location: formData.location,
        noOfDays: formData.noOfDays,
        budget: formData.budget,
        traveler: formData.traveler,
        lang: lang,
        dbItems: dbItems
      });

      // Complete the progress animation
      setLoadingProgress(100);
      setLoadingStep(STEP_MESSAGES.length - 1);
      await new Promise((resolve) => setTimeout(resolve, 600));
      setTripResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      clearInterval(stepTimerRef.current);
      clearInterval(progressTimerRef.current);
      setLoading(false);
    }
  };

  // Save generated trip
  const saveTrip = () => {
    if (!tripResult) return;
    const newTrip = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(lang === "AR" ? "ar-MA" : lang === "FR" ? "fr-FR" : "en-US"),
      formData: { ...formData },
      result: tripResult
    };
    const updated = [newTrip, ...savedTrips];
    setSavedTrips(updated);
    localStorage.setItem("saved_ai_trips", JSON.stringify(updated));
  };

  // Delete saved trip
  const deleteSavedTrip = (id, e) => {
    e.stopPropagation();
    const updated = savedTrips.filter((trip) => trip.id !== id);
    setSavedTrips(updated);
    localStorage.setItem("saved_ai_trips", JSON.stringify(updated));
  };

  // Select a past saved trip
  const selectSavedTrip = (trip) => {
    setFormData({
      location: "Marrakech",
      noOfDays: "3",
      startDate: today,
      endDate: defaultEndDate,
      budget: "Moderate",
      traveler: "Couple",
      ...trip.formData,
    });
    setTripResult(trip.result);
    setExpandedDays({}); // Reset toggles
    setTimeout(() => {
      document.getElementById("trip-results-anchor")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Clean up timers and add outside click binding on mount
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target)) {
        setCityDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (stepTimerRef.current) clearInterval(stepTimerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, []);

  // Helper to open Google Maps search in new tab
  const openGoogleMaps = (query) => {
    const url = String(query).startsWith("http")
      ? query
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Budget Styles config
  const budgetOptions = [
    {
      value: "Cheap",
      label: t("cheapBudget"),
      summary: lang === "AR" ? "أقل تكلفة" : lang === "FR" ? "Prix malin" : "Smart price",
      icon: Coins
    },
    {
      value: "Moderate",
      label: t("moderateBudget"),
      summary: lang === "AR" ? "راحة متوازنة" : lang === "FR" ? "Bon équilibre" : "Best balance",
      icon: BarChart3
    },
    {
      value: "Luxury",
      label: t("luxuryBudget"),
      summary: lang === "AR" ? "تجربة راقية" : lang === "FR" ? "Expérience premium" : "Premium stay",
      icon: Crown
    }
  ];

  // Traveler Options config
  const travelerOptions = [
    { value: "Solo", label: t("soloTravel"), desc: t("soloDesc"), icon: User },
    { value: "Couple", label: t("coupleTravel"), desc: t("coupleDesc"), icon: Heart },
    { value: "Family", label: t("familyTravel"), desc: t("familyDesc"), icon: Users },
    { value: "Friends", label: t("friendsTravel"), desc: t("friendsDesc"), icon: Users }
  ];

  // Section headings for accommodation types
  const sectionLabels = {
    hotels: lang === "AR" ? "فنادق حقيقية على Google Maps" : lang === "FR" ? "Hôtels réels sur Google Maps" : "Real hotels on Google Maps",
    restaurants: lang === "AR" ? "مطاعم حقيقية" : lang === "FR" ? "Restaurants réels" : "Real restaurants"
  };

  const googleHotelOptions = getGoogleMapsHotelOptions(formData.location, lang, formData.budget);
  const realRestaurantOptions = getRealGoogleMapsOptions(formData.location, lang, formData.budget, "restaurants");
  const mapsLabel = "Google Maps";

  const renderRealPlaceCard = (item, index, fallbackContext = "hotel") => (
    <div key={`${item.name}-${index}`} className="h-scroll-card pack-card" style={{ "--delay": `${index * 0.12}s` }}>
      <div className="h-scroll-img-wrapper">
        <img src={item.image_url || getMoroccoImageByText(formData.location, fallbackContext)} alt={item.name} />
        <div className="h-scroll-price-badge">{item.price}</div>
        {item.cuisine && (
          <div className="h-scroll-cuisine-badge">{item.cuisine}</div>
        )}
      </div>
      <div className="h-scroll-info">
        <div className="h-scroll-title-row">
          <h3>{item.name}</h3>
          <div className="h-scroll-rating">
            <Star size={12} fill="currentColor" />
            <span>{item.rating}</span>
          </div>
        </div>
        <p className="h-scroll-address">
          <MapPin size={12} />
          <span>{item.address || item.source}{item.reviews ? ` • ${item.reviews}` : ""}</span>
        </p>
        <p className="h-scroll-desc">{item.description}</p>
        <button
          className="maps-redirect-btn mini"
          onClick={() => openGoogleMaps(item.maps_url || item.maps_query || `${item.name}, ${formData.location}, Morocco`)}
        >
          <ExternalLink size={12} />
          <span>{mapsLabel}</span>
        </button>
      </div>
    </div>
  );

  const renderGoogleHotelCard = (hotel, index) => renderRealPlaceCard(hotel, index, "hotel");

  // Reusable horizontal scroll section component
  const renderHorizontalSection = (title, icon, items, scrollRef, renderCard) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="accommodation-section animate-slide-up" style={{ "--delay": "0.1s" }}>
        <div className="accommodation-section-header">
          <div className="section-title-row">
            {icon}
            <h2>{title}</h2>
          </div>
          <div className="scroll-nav-arrows">
            <button 
              className="scroll-arrow-btn" 
              onClick={() => scrollContainer(scrollRef, "left")}
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              className="scroll-arrow-btn" 
              onClick={() => scrollContainer(scrollRef, "right")}
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <div className="horizontal-scroll-track" ref={scrollRef}>
          {items.map((item, index) => renderCard(item, index))}
        </div>
      </div>
    );
  };

  return (
    <div className={`pack-page ${isRTL ? "rtl" : ""}`}>
      {/* Banner/Header */}
      <div className="pack-hero">
        <div className="pack-hero-overlay"></div>
        <div className="pack-hero-content animate-slide-up" style={{ "--delay": "0s" }}>
          <span className="pack-badge">
            <Sparkles size={14} className="sparkle-icon animate-pulse" />
            <span>Morocco AI Tech</span>
          </span>
          <h1>{t("packTitle")}</h1>
          <p>{t("packSubtitle")}</p>
        </div>
      </div>

      {/* Main Container */}
      <div className="pack-container">

        <div className="pack-layout">
          {/* Left Panel: Configuration Form — Independent Scroll */}
          <div className="pack-form-side animate-slide-up" style={{ "--delay": "0.1s" }}>
            <div className="pack-form-scroll-wrapper">
              <div className="pack-card form-card">
                
                {/* Destination Input - Custom Search Autocomplete Dropdown */}
                <div className="form-group animate-slide-up" style={{ "--delay": "0.15s" }}>
                  <label className="form-label">
                    <MapPin size={16} className="label-icon" />
                    <span>{t("searchPlaceholder")}</span>
                  </label>
                  <div className="premium-city-selector-wrapper" ref={cityDropdownRef}>
                    <div 
                      className={`premium-city-trigger ${cityDropdownOpen ? "active" : ""}`}
                      onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                    >
                      <span className="trigger-emoji">{getCityCategoryIcon(formData.location)}</span>
                      <div className="trigger-text-details">
                        <span className="trigger-val">{formData.location}</span>
                        <span className="trigger-sub">{getCityCategory(formData.location).toUpperCase()}</span>
                      </div>
                      <Compass size={16} className={`chevron-indicator ${cityDropdownOpen ? "open" : ""}`} />
                    </div>
                    
                    {cityDropdownOpen && (
                      <div className="premium-city-dropdown animate-slide-down">
                        <input 
                          type="text" 
                          placeholder={lang === "AR" ? "ابحث عن مدينة..." : lang === "FR" ? "Rechercher une ville..." : "Search a city..."} 
                          value={citySearch}
                          onChange={(e) => setCitySearch(e.target.value)}
                          className="dropdown-search-input"
                          onClick={(e) => e.stopPropagation()}
                          autoFocus
                        />
                        <div className="dropdown-options-list">
                          {allCities.filter(city => 
                            city.toLowerCase().includes(citySearch.toLowerCase())
                          ).map((city) => (
                            <div 
                              key={city}
                              className={`dropdown-option-item ${formData.location === city ? "selected" : ""}`}
                              onClick={() => {
                                handleInputChange("location", city);
                                setCityDropdownOpen(false);
                                setCitySearch("");
                              }}
                            >
                              <span className="option-icon">{getCityCategoryIcon(city)}</span>
                              <div className="option-details">
                                <span className="option-name">{city}</span>
                                <span className="option-sub">{getCityCategory(city)}</span>
                              </div>
                              {formData.location === city && <Check size={14} className="option-check" />}
                            </div>
                          ))}
                          {allCities.filter(city => 
                            city.toLowerCase().includes(citySearch.toLowerCase())
                          ).length === 0 && (
                            <div className="dropdown-no-results">
                              {lang === "AR" ? "لا توجد نتائج" : lang === "FR" ? "Aucun résultat" : "No results found"}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Duration Date Range */}
                <div className="form-group duration-group animate-slide-up" style={{ "--delay": "0.2s" }}>
                  <label className="form-label">
                    <Calendar size={16} className="label-icon" />
                    <span>{t("daysLabel")}</span>
                  </label>
                  <div className="date-range-panel redesigned">
                    <div className="date-field">
                      <span>{lang === "AR" ? "اليوم الأول" : lang === "FR" ? "Jour de début" : "Start day"}</span>
                      <input
                        type="date"
                        value={formData.startDate}
                        min={today}
                        onChange={(e) => handleDateChange("startDate", e.target.value)}
                      />
                    </div>
                    <div className="date-field">
                      <span>{lang === "AR" ? "اليوم الأخير" : lang === "FR" ? "Jour de fin" : "End day"}</span>
                      <input
                        type="date"
                        value={formData.endDate}
                        min={formData.startDate || today}
                        max={formatDateInput(addDays(new Date(formData.startDate || today), 13))}
                        onChange={(e) => handleDateChange("endDate", e.target.value)}
                      />
                    </div>
                    <div className="date-duration-summary">
                      <span className="stepper-number">{formData.noOfDays}</span>
                      <span className="stepper-label">{lang === "AR" ? "أيام" : lang === "FR" ? "jours" : "days"}</span>
                    </div>
                  </div>
                </div>

                {/* Budget Option Cards */}
                <div className="form-group budget-group animate-slide-up" style={{ "--delay": "0.25s" }}>
                  <label className="form-label">
                    <TrendingUp size={16} className="label-icon" />
                    <span>{t("budgetLabel")}</span>
                  </label>
                  <div className="budget-segmented-control">
                    {budgetOptions.map((opt) => {
                      const BudgetIcon = opt.icon;
                      return (
                      <button
                        type="button"
                        key={opt.value}
                        className={`budget-pill ${formData.budget === opt.value ? "active" : ""}`}
                        onClick={() => handleInputChange("budget", opt.value)}
                      >
                        <span className="budget-icon-wrap">
                          <BudgetIcon size={20} strokeWidth={2.3} />
                        </span>
                        <span className="budget-pill-text">
                          <h3>{opt.label}</h3>
                          <small>{opt.summary}</small>
                        </span>
                        <span className="budget-check-dot">
                          <Check size={11} strokeWidth={3} />
                        </span>
                      </button>
                    );
                    })}
                  </div>
                </div>

                {/* Traveler Companion Cards */}
                <div className="form-group animate-slide-up" style={{ "--delay": "0.3s" }}>
                  <label className="form-label">
                    <Smile size={16} className="label-icon" />
                    <span>{t("groupLabel")}</span>
                  </label>
                  <div className="card-selector-grid">
                    {travelerOptions.map((opt) => {
                      const TravelerIcon = opt.icon;
                      return (
                        <div 
                          key={opt.value}
                          className={`selector-card ${formData.traveler === opt.value ? "active" : ""}`}
                          onClick={() => handleInputChange("traveler", opt.value)}
                        >
                          <div className="selector-header">
                            <span className="selector-emoji">
                              <TravelerIcon size={20} className="traveler-icon" />
                            </span>
                            <h3>{opt.label}</h3>
                          </div>
                          <p>{opt.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Action Button */}
                <button 
                  className={`generate-btn ${loading ? "loading" : ""} animate-slide-up`} 
                  style={{ "--delay": "0.35s" }}
                  onClick={handleGenerate}
                  disabled={loading}
                >
                  <Sparkles size={18} className={loading ? "animate-spin" : ""} />
                  <span>{loading ? t("loadingTrip") : t("generateBtn")}</span>
                </button>

              </div>

              {/* Quick Access: Saved Past Trips */}
              {savedTrips.length > 0 && (
                <div className="pack-card saved-trips-card animate-slide-up" style={{ "--delay": "0.4s" }}>
                  <h2>{t("saved")}</h2>
                  <div className="saved-trips-list">
                    {savedTrips.map((trip) => (
                      <div 
                        key={trip.id} 
                        className="saved-trip-item"
                        onClick={() => selectSavedTrip(trip)}
                      >
                        <div className="saved-trip-info">
                          <h3>{trip.formData.location}</h3>
                          <p>{trip.formData.noOfDays} {t("duration")} • {trip.date}</p>
                        </div>
                        <button 
                          className="delete-saved-btn"
                          onClick={(e) => deleteSavedTrip(trip.id, e)}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel: Premium Loading & Results */}
          <div className="pack-display-side" id="trip-results-anchor">
            
            {/* ========== PREMIUM AI LOADING DASHBOARD ========== */}
            {loading && (
              <div className="ai-loader-dashboard pack-card">
                {/* Neon Rings */}
                <div className="ai-loader-rings">
                  <div className="ring ring-outer"></div>
                  <div className="ring ring-middle"></div>
                  <div className="ring ring-inner"></div>
                  <div className="ring-center">
                    <span className="ring-percent">{loadingProgress}%</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="ai-loader-title">
                  {lang === "AR" ? "الذكاء الاصطناعي يعمل..." : lang === "FR" ? "L'IA génère votre voyage..." : "AI is crafting your trip..."}
                </h2>
                <p className="ai-loader-subtitle">
                  {lang === "AR" ? `جاري إنشاء خطة لـ ${formData.location}` : lang === "FR" ? `Création d'un itinéraire pour ${formData.location}` : `Building itinerary for ${formData.location}`}
                </p>

                {/* Progress Bar */}
                <div className="ai-progress-bar-wrapper">
                  <div className="ai-progress-bar" style={{ width: `${loadingProgress}%` }}></div>
                </div>

                {/* Step Checklist */}
                <div className="ai-loader-steps">
                  {STEP_MESSAGES.map((step, i) => {
                    const done = loadingStep > i;
                    const active = loadingStep === i;
                    return (
                      <div key={i} className={`ai-step-item ${done ? "done" : ""} ${active ? "active" : ""}`} style={{ "--delay": `${i * 0.1}s` }}>
                        <div className="ai-step-icon">
                          {done ? <Check size={14} className="checkmark-pulse" /> : step.icon}
                        </div>
                        <span>{step.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* No Trip Generated yet state */}
            {!loading && !tripResult && (
              <div className="planner-waiting-card pack-card animate-fade-in">
                <div className="waiting-map">
                  <span className="map-line line-one"></span>
                  <span className="map-line line-two"></span>
                  <span className="map-line line-three"></span>
                  <span className="map-point point-one"></span>
                  <span className="map-point point-two"></span>
                  <span className="map-point point-three"></span>
                  <Compass size={42} className="waiting-compass" />
                </div>
                <div className="waiting-copy">
                  <span className="waiting-kicker">{formData.location}</span>
                  <h2>{lang === "AR" ? "خطتك جاهزة للتصميم" : lang === "FR" ? "Votre plan attend le départ" : "Your plan is ready to begin"}</h2>
                  <p>{lang === "AR" ? "اختار المدينة، التاريخ، الميزانية والمرافقين ثم اضغط على إنشاء." : lang === "FR" ? "Choisissez la ville, les dates, le budget et les voyageurs, puis lancez la génération." : "Choose the city, dates, budget and travelers, then generate your trip."}</p>
                </div>
                <div className="waiting-summary">
                  <span>{formData.startDate}</span>
                  <strong>{formData.noOfDays} {t("duration")}</strong>
                  <span>{formData.endDate}</span>
                </div>
              </div>
            )}

            {/* Generated Trip Plan Result */}
            {tripResult && !loading && (
              <div className="itinerary-results animate-fade-in">
                
                {/* Result Hero Info */}
                <div className="itinerary-header-card pack-card">
                  <div className="itinerary-header-bg" style={{ backgroundImage: `url(${getMoroccoImageByText(formData.location)})` }}></div>
                  <div className="itinerary-header-overlay"></div>
                  <div className="itinerary-header-text">
                    <div className="trip-meta-chips">
                      <span className="meta-chip">{formData.noOfDays} {t("duration")}</span>
                      <span className="meta-chip">{formData.startDate} - {formData.endDate}</span>
                      <span className="meta-chip">{formData.budget}</span>
                      <span className="meta-chip">{formData.traveler}</span>
                    </div>
                    <h1>{formData.location} {lang === "AR" ? "خطة الرحلة" : lang === "FR" ? "Itinéraire" : "Itinerary"}</h1>
                    <button className="save-trip-btn" onClick={saveTrip}>
                      <Check size={14} />
                      <span>{t("saved")}</span>
                    </button>
                  </div>
                </div>

                {/* ============ HOTELS — HORIZONTAL SCROLL ============ */}
                {renderHorizontalSection(
                  sectionLabels.hotels,
                  <Hotel size={20} className="section-icon" />,
                  [...dbHotelCards, ...googleHotelOptions],
                  hotelsScrollRef,
                  renderGoogleHotelCard
                )}

                {/* ============ RESTAURANTS — HORIZONTAL SCROLL ============ */}
                {renderHorizontalSection(
                  sectionLabels.restaurants,
                  <UtensilsCrossed size={20} className="section-icon" />,
                  [...dbRestaurantCards, ...realRestaurantOptions],
                  restaurantsScrollRef,
                  (restaurant, index) => renderRealPlaceCard(restaurant, index, "restaurant")
                )}



                {/* Day by Day Plan Timeline */}
                <div className="itinerary-timeline-section">
                  <h2>{t("itineraryHeading")}</h2>
                  <div className="timeline-container">
                    {tripResult.itinerary?.map((dayPlan, dayIndex) => {
                      const expanded = isDayExpanded(dayIndex);
                      return (
                        <div key={dayIndex} className={`timeline-day-block ${expanded ? "expanded" : "collapsed"}`}>
                          <button 
                            className="timeline-day-header"
                            onClick={() => toggleDayExpansion(dayIndex)}
                            type="button"
                            aria-expanded={expanded}
                          >
                            <div className="timeline-circle">
                              {expanded ? <Check size={14} className="timeline-check-icon" /> : <span>{dayIndex + 1}</span>}
                            </div>
                            <div className="timeline-day-title">
                              <span>{lang === "AR" ? "برنامج اليوم" : lang === "FR" ? "Programme du jour" : "Daily plan"}</span>
                              <h3>{dayPlan.day}</h3>
                              {(dayPlan.theme || dayPlan.route_summary) && (
                                <p className="timeline-day-subtitle">
                                  {[dayPlan.theme, dayPlan.route_summary].filter(Boolean).join(" - ")}
                                </p>
                              )}
                            </div>
                            <span className={`day-collapse-indicator ${expanded ? "open" : ""}`} aria-hidden="true">
                              <ChevronDown size={18} />
                            </span>
                          </button>
                          
                          {expanded && (
                            <div className="timeline-activities-list animate-slide-down">
                              {dayPlan.plan?.map((act, actIndex) => (
                                <div 
                                  key={actIndex} 
                                  className="timeline-activity-card pack-card" 
                                  style={{ "--delay": `${actIndex * 0.1}s` }}
                                >
                                  <div className="activity-img-wrapper">
                                    <img src={act.image_url || getMoroccoImageByText(formData.location, act.place)} alt={act.place} />
                                    <span className={`time-pill-badge ${getTimeBadgeClass(act.time)}`}>
                                      <span className="time-pill-emoji">{getTimeEmoji(act.time)}</span>
                                      <span>{act.time}</span>
                                    </span>
                                  </div>
                                   <div className="activity-details">
                                    <div className="activity-title-row">
                                      <h4>{act.place}</h4>
                                      <div className="activity-rating">
                                        <Star size={12} fill="currentColor" />
                                        <span>{act.rating}</span>
                                      </div>
                                    </div>
                                    <p className="activity-desc">{act.details}</p>
                                    <div className="activity-footer">
                                      <span className="entry-price-chip">
                                        <span className="entry-price-icon" aria-hidden="true">
                                          <Coins size={15} strokeWidth={2.4} />
                                        </span>
                                        <span className="entry-price-copy">
                                          <span className="entry-price-label">{t("ticketPrice").replace(/\s*[:：]\s*$/, "")}</span>
                                          <strong className="entry-price-value">{act.ticket_pricing}</strong>
                                        </span>
                                      </span>
                                      <button 
                                        className="maps-redirect-btn mini"
                                        onClick={() => openGoogleMaps(`${act.place}, ${formData.location}, Morocco`)}
                                      >
                                        <ExternalLink size={12} />
                                        <span>{t("viewOnMap")}</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

export default Pack;
