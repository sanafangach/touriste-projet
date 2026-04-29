import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "./LanguageContext"; // 🔥 Import
import "../css/sectionlearning.css";

function LearningSection() {
  const { lang } = useLanguage(); // 🔥 Utilisation du contexte

  const content = {
    FR: {
      title: "Apprenez le Darija & le Tifinagh",
      subtitle: "Commencez avec des expressions marocaines simples et l'alphabet",
      darijaTitle: "🇲🇦 Exemples de Darija",
      darijaExamples: `Salam = Bonjour
Labas? = Comment ça va?
Shukran = Merci
Bslama = Au revoir
Afak = S'il vous plaît
Smah lia = Pardon
Zwin = Beau/Belle
Nss = Oublier`,
      tifinaghTitle: "🔤 Exemples de Tifinagh",
      tifinaghExamples: `ⴰⵎⴰⵣⵉⵖ = Amazigh (Homme berbère)
ⴰⵎⴰⵏ = Aman (eau)
ⵜⴰⵎⴰⵣⵉⵔⵜ = Tamazirt (Pays)
ⴰⵢⵢⵓⵔ = Ayyur (Lune)
ⵜⴰⴼⵓⴽⵜ = Tafukt (soleil)
ⵉⴼⵔⵉ = Ifri (Grotte / Afrique)
ⵜⵉⵔⵔⴰ = Tirra (Écriture)
ⴰⵣⵓⵍ = Azul (Bonjour)`,
      btnDarija: "Commencer l'apprentissage",
      btnTifinagh: "Commencer l'apprentissage"
    },
    EN: {
      title: "Learn Darija & Tifinagh",
      subtitle: "Start with simple Moroccan expressions and alphabet",
      darijaTitle: "🇲🇦 Darija Examples",
      darijaExamples: `Salam = Hello
Labas? = How are you?
Shukran = Thank you
Bslama = Goodbye
Afak = Please
Smah lia = Sorry
Zwin = Beautiful
Nss = Forget`,
      tifinaghTitle: "🔤 Tifinagh Examples",
      tifinaghExamples: `ⴰⵎⴰⵣⵉⵖ = Amazigh (Berber man)
ⴰⵎⴰⵏ = Aman (water)
ⵜⴰⵎⴰⵣⵉⵔⵜ = Tamazirt (Country)
ⴰⵢⵢⵓⵔ = Ayyur (Moon)
ⵜⴰⴼⵓⴽⵜ = Tafukt (sun)
ⵉⴼⵔⵉ = Ifri (Grotte / Afrique)
ⵜⵉⵔⵔⴰ = Tirra (Writing)
ⴰⵣⵓⵍ = Azul (Hello)`,
      btnDarija: "Start Learning",
      btnTifinagh: "Start Learning"
    },
    AR: {
      title: "تعلم الدارجة والتيفيناغ",
      subtitle: "ابدأ بتعبيرات مغربية بسيطة والأبجدية",
      darijaTitle: "🇲🇦 أمثلة الدارجة",
      darijaExamples: `سلام = مرحباً
لباس؟ = كيف حالك؟
شكراً = شكراً
بسلامة = إلى اللقاء
عفاك = من فضلك
سمح ليا = آسف
زوين = جميل
نسّ = نسيان`,
      tifinaghTitle: "🔤 أمثلة التيفيناغ",
      tifinaghExamples: `ⴰⵎⴰⵣⵉⵖ = أمازيغي
ⴰⵎⴰⵏ = ماء
ⵜⴰⵎⴰⵣⵉⵔⵜ = تامازيرت (البلد)
ⴰⵢⵢⵓⵔ = أير (القمر)
ⵜⴰⴼⵓⴽⵜ = تافوكت (الشمس)
ⵉⴼⵔⵉ = إيفري (الكهف / أفريقيا)
ⵜⵉⵔⵔⴰ = تيرا (الكتابة)
ⴰⵣⵓⵍ = أزول (مرحباً)`,
      btnDarija: "ابدأ التعلم",
      btnTifinagh: "ابدأ التعلم"
    }
  };

  const c = content[lang];

  return (
    <section className="learning-section">
      <div className="learning-header">
        <h2>{c.title}</h2>
        <p>{c.subtitle}</p>
      </div>

      <div className="learning-grid">
        <div className="learning-card">
          <h3>{c.darijaTitle}</h3>
          <p className="example" style={{ whiteSpace: 'pre-line' }}>
            {c.darijaExamples}
          </p>
          <Link to="/learn-darija" className="btn">
            {c.btnDarija}
          </Link>
        </div>

        <div className="learning-card">
          <h3>{c.tifinaghTitle}</h3>
          <p className="example" style={{ whiteSpace: 'pre-line' }}>
            {c.tifinaghExamples}
          </p>
          <Link to="/languages" className="btn">
            {c.btnTifinagh}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LearningSection;