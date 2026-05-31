import React, { useRef, useState } from "react";
import { Download, Sparkles } from "lucide-react";
import { tifinaghAlphabet } from "./data/tifnaghData";
import { useLanguage } from "../accueil/LanguageContext";

const NameConverter = ({ onAchievementUnlock, unlockedAchievements }) => {
  const { t } = useLanguage();
  const [nameInput, setNameInput] = useState("");
  const [convertedChars, setConvertedChars] = useState([]);
  const badgeRef = useRef(null);

  const parseNameToTifinagh = (name) => {
    if (!name) {
      setConvertedChars([]);
      return;
    }

    const lowerName = name.toLowerCase().replace(/[^a-z\s]/g, "");
    const result = [];
    const sortedAlphabet = [...tifinaghAlphabet].sort((left, right) => right.transliteration.length - left.transliteration.length);

    let index = 0;
    while (index < lowerName.length) {
      if (lowerName[index] === " ") {
        result.push({ char: " ", name: "space", transliteration: " " });
        index += 1;
        continue;
      }

      let matched = false;
      for (const item of sortedAlphabet) {
        if (lowerName.startsWith(item.transliteration, index)) {
          result.push(item);
          index += item.transliteration.length;
          matched = true;
          break;
        }
      }

      if (!matched) {
        const approximations = {
          c: "ⵙ",
          p: "ⴱ",
          v: "ⴼ",
          o: "ⵓ",
          y: "ⵢ"
        };
        const approxChar = approximations[lowerName[index]];
        if (approxChar) {
          result.push({ char: approxChar, name: "approx", transliteration: lowerName[index] });
        }
        index += 1;
      }
    }

    setConvertedChars(result);

    if (result.length > 2 && !unlockedAchievements.includes("calligrapher")) {
      onAchievementUnlock("calligrapher");
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setNameInput(value);
    parseNameToTifinagh(value);
  };

  const downloadBadge = () => {
    if (!badgeRef.current) return;
    alert(t("learnDownloadAlert"));
  };

  return (
    <div className="name-converter-system learn-glass-panel">
      <div className="learn-panel-intro learn-panel-intro--centered">
        <h2>{t("learnIdentityCalligraphy")}</h2>
        <p>{t("learnConverterDesc")}</p>
      </div>

      <div className="converter-input-wrapper">
        <input
          type="text"
          className="converter-input"
          placeholder={t("learnEnterFirstName")}
          value={nameInput}
          onChange={handleInputChange}
          maxLength="20"
        />
        <button type="button" className="btn-primary" onClick={downloadBadge} disabled={convertedChars.length === 0}>
          <Download size={18} />
          {t("learnSave")}
        </button>
      </div>

      {convertedChars.length > 0 && (
        <div className="id-card-render" ref={badgeRef}>
          <div className="id-card-pattern" />

          <div className="id-card-render__content">
            <div className="id-card-render__sparkles">
              <span />
              <Sparkles size={18} />
              <span />
            </div>

            <p className="id-card-render__label">{t("learnAmazighIdentity")}</p>

            <div className="id-card-tifinagh" dir="ltr">
              {convertedChars.map((item) => item.char).join("")}
            </div>

            <p className="id-card-render__name">{nameInput.toUpperCase()}</p>

            <div className="id-card-render__legend">
              {convertedChars.map((item, index) =>
                item.char === " " ? null : (
                  <div key={index} className="id-card-render__legend-item">
                    <strong>{item.char}</strong>= {item.transliteration}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NameConverter;
