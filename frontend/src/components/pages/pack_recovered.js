import React, { useState, useEffect, useRef } from "react";
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Check, 
  ExternalLink,
  TrendingUp,
  Smile,
  Compass,
  Star,
  Plane,
  Hotel,
  UtensilsCrossed,
  Camera
} from "lucide-react";
import { useLanguage } from "../accueil/LanguageContext";
import { generateTripData } from "../../services/aiService";
import { MOROCCO_CITIES, getMoroccoImageByText } from "../../services/moroccoData";
import "../css/pack.css";

function Pack() {
  const { t, lang, isRTL } = useLanguage();
  
  // Form State
  const [formData, setFormData] = useState({
    location: "Marrakech",
    noOfDays: "3",
    budget: "Moderate",
    traveler: "Couple"
  });

  // Flow State
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [tripResult, setTripResult] = useState(null);

  // Saved Trips State
  const [savedTrips, setSavedTrips] = useState(() => {
    try {
      const saved = localStorage.getItem("saved_ai_trips");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const stepTimerRef = useRef(null);
  const progressTimerRef = useRef(null);

  const STEP_MESSAGES = [
    {
      icon: <Compass size={18} />,
      text: lang === "AR" ? "تحليل رغبا
<truncated 19724 bytes>
ageByText(formData.location, act.place)} alt={act.place} />
                                <div className="activity-time-badge">{act.time}</div>
                              </div>
                              <div className="activity-details">
                                <div className="activity-title-row">
                                  <h4>{act.place}</h4>
                                  <div className="activity-rating">
                                    <Star size={10} fill="currentColor" />
                                    <span>{act.rating}</span>
                                  </div>
                                </div>
                                <p className="activity-desc">{act.details}</p>
                                <div className="activity-footer">
                                  <span className="activity-price">{t("ticketPrice")} {act.ticket_pricing}</span>
                                  <button 
                                    className="maps-redirect-btn mini"
                                    onClick={() => openGoogleMaps(`${act.place}, ${formData.location}, Morocco`)}
                                  >
                                    <ExternalLink size={10} />
                                    <span>{t("viewOnMap")}</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
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

The above content shows the entire, complete file contents of the requested file.
