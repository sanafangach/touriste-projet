import React from "react";
import { Link } from "react-router-dom";
import "../css/sectionlearning.css";

function LearningSection() {
  return (
    <section className="learning-section">

      {/* HEADER */}
      <div className="learning-header">
        <h2>Learn Darija & Tifinagh</h2>
        <p>Start with simple Moroccan expressions and alphabet</p>
      </div>

      <div className="learning-grid">

        {/* DARIJA */}
        <div className="learning-card">
          <h3>🇲🇦 Darija Examples</h3>

          <p className="example">
            Salam = Hello <br />
            Labas? = How are you? <br />
            Shukran = Thank you <br />
            Bslama = Goodbye <br />
            Afak = Please <br />
            Smah lia = Sorry <br />
            Zwin = Beautiful <br />
            Nss = Forget
          </p>

          <Link to="/learn-darija" className="btn">
            Start Learning
          </Link>
        </div>

        {/* TIFINAGH */}
        <div className="learning-card">
          <h3>🔤 Tifinagh Examples</h3>

          <p className="example">
            ⴰⵎⴰⵣⵉⵖ = Amazigh (Berber man) <br />
            ⴰⵎⴰⵏ = Aman (water) <br />
            ⵜⴰⵎⴰⵣⵉⵔⵜ = Tamazirt (Country) <br />
            ⴰⵢⵢⵓⵔ = Ayyur (Moon) <br />
            ⵜⴰⴼⵓⴽⵜ = Tafukt (sun) <br />
            ⵉⴼⵔⵉ = Ifri (Grotte / Afrique) <br />
            ⵜⵉⵔⵔⴰ = Tirra (Writing) <br />
            ⴰⵣⵓⵍ = Azul (Hello)
          </p>

          <Link to="/languages" className="btn">
            Start Learning
          </Link>
        </div>

      </div>

    </section>
  );
}

export default LearningSection;