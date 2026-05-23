import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, ChevronDown } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import "../css/home.css";
import PopularDestination from "./section";
import AboutSite from "./sectiondescription";
import PopularActivities from "./sectionactivite";
import LearningSection from "./sectionlearning";

import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpeg";
import img3 from "../../assets/img3.webp";
import img4 from "../../assets/img4.webp";

function Home() {
    const { t, dir } = useLanguage();
    const images = [img1, img2, img3, img4];
    const [current, setCurrent] = useState(0);
    const [successMessage, setSuccessMessage] = useState("");
    const [successLeaving, setSuccessLeaving] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const authMessage = location.state?.authMessage;

    // Handle auth success message
    useEffect(() => {
        if (!authMessage) return;

        setSuccessLeaving(false);
        setSuccessMessage(authMessage);
        navigate(location.pathname, { replace: true, state: null });
    }, [authMessage, location.pathname, navigate]);

    // Auto-dismiss toast
    useEffect(() => {
        if (!successMessage) return;

        const leaveTimer = setTimeout(() => {
            setSuccessLeaving(true);
        }, 2500);

        const clearTimer = setTimeout(() => {
            setSuccessMessage("");
            setSuccessLeaving(false);
        }, 2900);

        return () => {
            clearTimeout(leaveTimer);
            clearTimeout(clearTimer);
        };
    }, [successMessage]);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [location]);

    // Background slideshow
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="home" dir={dir}>
            {successMessage && (
                <div
                    className={`home-auth-message ${successLeaving ? "leaving" : ""}`}
                    role="status"
                    aria-live="polite"
                >
                    <span className="home-auth-message__glow" aria-hidden="true" />
                    <span className="home-auth-message__icon">
                        <CheckCircle size={20} />
                    </span>
                    <span className="home-auth-message__content">
                        <span className="home-auth-message__brand">AMUDUX</span>
                        <span className="home-auth-message__text">{successMessage}</span>
                    </span>
                    <span className="home-auth-message__progress" aria-hidden="true" />
                </div>
            )}

            <div className="hero">
                <div
                    className="hero-bg"
                    style={{
                        backgroundImage: `url(${images[current]})`,
                        transition: "background-image 1.5s ease-in-out",
                    }}
                />

                <div className="overlay">
                    <h1 key={`title-${current}`} className="slide-up">
                        {t("heroTitle")}
                    </h1>
                    <p key={`desc-${current}`} className="slide-up-delay">
                        {t("heroSubtitle")}
                    </p>

                    <Link to="/destination" className="slide-up-delay-2">
                        <button className="hero-btn">{t("exploreBtn")}</button>
                    </Link>
                </div>

                <div
                    className="scroll-indicator"
                    onClick={() =>
                        window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
                    }
                >
                    <div className="mouse">
                        <div className="wheel" />
                    </div>
                    <ChevronDown size={24} className="bounce" />
                </div>
            </div>

            <PopularDestination />
            <AboutSite />
            <PopularActivities />
            <LearningSection />
        </div>
    );
}

export default Home;