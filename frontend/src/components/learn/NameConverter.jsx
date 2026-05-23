// Phonetic Name to Tifinagh Converter System
// Designed for the AMUDUX Immersive Learning Platform

import React, { useState, useRef } from "react";
import { Download, Sparkles } from "lucide-react";
import { tifinaghAlphabet } from "./data/tifnaghData";
import { useLanguage } from "../accueil/LanguageContext";

const NameConverter = ({ onAchievementUnlock, unlockedAchievements }) => {
  const { t } = useLanguage();
  const [nameInput, setNameInput] = useState("");
  const [convertedChars, setConvertedChars] = useState([]);
  const badgeRef = useRef(null);

  // Advanced phonetic parsing logic
  const parseNameToTifinagh = (name) => {
    if (!name) {
      setConvertedChars([]);
      return;
    }

    const lowerName = name.toLowerCase().replace(/[^a-z\s]/g, '');
    let result = [];
    
    // Sort alphabet by transliteration length descending to catch multi-char sounds first (e.g., 'yaṭ', 'yag')
    const sortedAlpha = [...tifinaghAlphabet].sort((a, b) => b.transliteration.length - a.transliteration.length);

    let i = 0;
    while (i < lowerName.length) {
      if (lowerName[i] === ' ') {
        result.push({ char: ' ', name: 'espace', transliteration: ' ' });
        i++;
        continue;
      }

      let matched = false;
      // Try to match longest possible string first
      for (const t of sortedAlpha) {
        if (lowerName.startsWith(t.transliteration, i)) {
          result.push(t);
          i += t.transliteration.length;
          matched = true;
          break;
        }
      }

      if (!matched) {
        // Fallback approximation map for Latin chars that don't directly map
        const approximations = {
          'c': 'ⵙ', 'p': 'ⴱ', 'v': 'ⴼ', 'o': 'ⵓ', 'y': 'ⵢ'
        };
        const approxChar = approximations[lowerName[i]];
        if (approxChar) {
          result.push({ char: approxChar, name: 'approx', transliteration: lowerName[i] });
        }
        i++;
      }
    }

    setConvertedChars(result);
    
    // Check calligrapher achievement
    if (result.length > 2 && !unlockedAchievements.includes('calligrapher')) {
      // Simulate tracking multiple conversions. For simplicity here, we unlock on first valid attempt.
      onAchievementUnlock('calligrapher');
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setNameInput(val);
    parseNameToTifinagh(val);
  };

  const downloadBadge = () => {
    // In a real app, we would use html2canvas here.
    // For this build, we mock the download functionality securely.
    alert(t("learnDownloadAlert"));
  };

  return (
    <div className="name-converter-system learn-glass-panel">
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '10px', fontWeight: '500', color: '#FFF' }}>{t("learnIdentityCalligraphy")}</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{t("learnConverterDesc")}</p>
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
        <button 
          className="btn-primary" 
          style={{ width: 'auto', padding: '0 40px' }}
          onClick={downloadBadge}
          disabled={convertedChars.length === 0}
        >
          <Download size={20} style={{ marginRight: '10px', verticalAlign: 'middle' }} />
          {t("learnSave")}
        </button>
      </div>

      {convertedChars.length > 0 && (
        <div className="id-card-render" ref={badgeRef}>
          <div className="id-card-pattern"></div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', color: 'var(--amazigh-amber)', marginBottom: '20px' }}>
              <hr style={{ width: '50px', borderColor: 'rgba(212, 168, 67, 0.4)' }} />
              <Sparkles size={20} />
              <hr style={{ width: '50px', borderColor: 'rgba(212, 168, 67, 0.4)' }} />
            </div>
            
            <p style={{ textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              {t("learnAmazighIdentity")}
            </p>
            
            <div className="id-card-tifinagh" dir="ltr">
              {convertedChars.map(c => c.char).join('')}
            </div>
            
            <p style={{ fontSize: '1.4rem', fontWeight: '500', color: '#FFF', letterSpacing: '2px' }}>
              {nameInput.toUpperCase()}
            </p>

            <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
              {convertedChars.map((c, i) => c.char !== ' ' && (
                <div key={i} style={{ background: 'rgba(0,0,0,0.5)', padding: '5px 15px', borderRadius: '15px', fontSize: '0.8rem', border: '1px solid rgba(212, 168, 67, 0.3)' }}>
                  <strong style={{ color: 'var(--amazigh-amber)' }}>{c.char}</strong> = {c.transliteration}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NameConverter;