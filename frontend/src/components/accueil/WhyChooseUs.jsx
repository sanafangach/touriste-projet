import React, { useEffect, useRef } from "react";
import "../css/WhyChooseUs.css";
import { useLanguage } from "./LanguageContext";
import { Brain, Map, BookOpen, Globe, Compass, Clock } from "lucide-react";

const WhyChooseUs = () => {
  const { lang, isRTL } = useLanguage();
  const revealRefs = useRef([]);

  // Clear references array on each render
  revealRefs.current = [];

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const tSection = {
    FR: {
      tag: "POURQUOI NOUS CHOISIR ?",
      title: "Pourquoi voyager avec amudux ?",
      subtitle: "Découvrez comment notre plateforme révolutionne votre façon d'explorer le Maroc.",
      features: [
        {
          title: "Planificateur de Voyage IA",
          desc: "Créez des itinéraires personnalisés en quelques secondes adaptés à votre budget et vos envies.",
          icon: Brain,
        },
        {
          title: "Carte Interactive",
          desc: "Explorez visuellement les trésors cachés, les plages et les sites culturels à proximité.",
          icon: Map,
        },
        {
          title: "Immersion Culturelle",
          desc: "Apprenez le Darija et le Tifinagh grâce à nos modules de langue interactifs.",
          icon: BookOpen,
        },
        {
          title: "Support Multilingue",
          desc: "Explorez et apprenez en Français, Anglais ou Arabe avec une interface entièrement traduite.",
          icon: Globe,
        },
        {
          title: "Destinations Uniques",
          desc: "Accédez à plus de 50 destinations magiques et authentiques à travers tout le Maroc.",
          icon: Compass,
        },
        {
          title: "Disponible 24h/24 & 7j/7",
          desc: "Notre assistant IA est toujours disponible pour vous guider, répondre à vos questions et vous conseiller.",
          icon: Clock,
        },
      ],
    },
    EN: {
      tag: "WHY CHOOSE US?",
      title: "Why travel with amudux?",
      subtitle: "Discover how our platform revolutionizes the way you explore Morocco.",
      features: [
        {
          title: "AI Trip Planner",
          desc: "Create personalized itineraries in seconds, customized to your budget and preferences.",
          icon: Brain,
        },
        {
          title: "Interactive Map",
          desc: "Visually explore hidden gems, beaches, and cultural sites near you.",
          icon: Map,
        },
        {
          title: "Cultural Immersion",
          desc: "Learn Darija and Tifinagh through our fun and interactive learning modules.",
          icon: BookOpen,
        },
        {
          title: "Multilingual Support",
          desc: "Explore and learn in French, English, or Arabic with a fully translated interface.",
          icon: Globe,
        },
        {
          title: "Unique Destinations",
          desc: "Access over 50 magical and authentic destinations across the entire country.",
          icon: Compass,
        },
        {
          title: "Available 24/7",
          desc: "Our AI assistant is always online to guide you, answer questions, and give advice.",
          icon: Clock,
        },
      ],
    },
    AR: {
      tag: "لماذا تختارنا ؟",
      title: "لماذا تسافر مع amudux ؟",
      subtitle: "اكتشف كيف تحدث منصتنا ثورة في طريقة استكشافك للمغرب.",
      features: [
        {
          title: "مخطط الرحلات بالذكاء الاصطناعي",
          desc: "أنشئ مسارات رحلات مخصصة في ثوانٍ معدودة، تتناسب مع ميزانيتك وتفضيلاتك.",
          icon: Brain,
        },
        {
          title: "الخريطة التفاعلية",
          desc: "استكشف بصرياً الكنوز المخفية والشواطئ والمواقع الثقافية القريبة منك.",
          icon: Map,
        },
        {
          title: "الانغماس الثقافي",
          desc: "تعلم الدارجة والتيفيناغ من خلال وحداتنا التعليمية الممتعة والتفاعلية.",
          icon: BookOpen,
        },
        {
          title: "دعم متعدد اللغات",
          desc: "استكشف وتعلم بالفرنسية، الإنجليزية، أو العربية مع واجهة مترجمة بالكامل.",
          icon: Globe,
        },
        {
          title: "وجهات فريدة",
          desc: "الوصول إلى أكثر من 50 وجهة ساحرة وأصيلة في جميع أنحاء المملكة المغربية.",
          icon: Compass,
        },
        {
          title: "متاح على مدار الساعة",
          desc: "مساعدنا بالذكاء الاصطناعي متصل دائمًا لمساعدتك، والإجابة عن أسئلتك، وتقديم النصائح.",
          icon: Clock,
        },
      ],
    },
  };

  const currentT = tSection[lang] || tSection.FR;

  return (
    <section className={`why-choose-us-section ${isRTL ? "rtl" : ""}`}>
      {/* Decorative Grid and Ambient Glows */}
      <div className="section-grid-bg"></div>
      <div className="section-glow glow-1"></div>
      <div className="section-glow glow-2"></div>

      <div className="section-container">
        {/* Header */}
        <div className="section-header reveal" ref={addToRefs}>
          <span className="section-tag">{currentT.tag}</span>
          <h2 className="section-title">{currentT.title}</h2>
          <p className="section-subtitle">{currentT.subtitle}</p>
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          {currentT.features.map((feature, idx) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={idx}
                className="feature-card reveal"
                ref={addToRefs}
                style={{ transitionDelay: `${idx * 0.1}s` }}
              >
                <div className="feature-card-glow"></div>
                <div className="icon-wrapper">
                  <IconComponent size={24} className="feature-icon" />
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-desc">{feature.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
