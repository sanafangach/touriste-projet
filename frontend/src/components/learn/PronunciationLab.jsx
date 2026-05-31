import React, { useEffect, useRef, useState } from "react";
import { Play, RefreshCcw, Settings, Square } from "lucide-react";
import { tifinaghAlphabet } from "./data/tifnaghData";
import { useLanguage } from "../accueil/LanguageContext";

const PronunciationLab = () => {
  const { t } = useLanguage();
  const [word, setWord] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const drawWaveform = (active = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.moveTo(0, height / 2);

    const time = Date.now() / 200;

    for (let index = 0; index < width; index += 1) {
      const amplitude = active ? Math.random() * 40 + 10 : 2;
      const y = height / 2 + Math.sin(index * 0.05 + time) * amplitude * Math.sin(time * 0.5);
      ctx.lineTo(index, y);
    }

    ctx.strokeStyle = active ? "#ff9d4d" : "rgba(255, 157, 77, 0.22)";
    ctx.lineWidth = active ? 3 : 1;
    ctx.stroke();
    ctx.shadowBlur = active ? 15 : 0;
    ctx.shadowColor = active ? "rgba(255, 157, 77, 0.45)" : "transparent";

    if (active) {
      animationRef.current = requestAnimationFrame(() => drawWaveform(true));
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      drawWaveform(false);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
    // drawWaveform is intentionally recreated with component state and only used for initial canvas bootstrapping here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlayAudio = () => {
    if (word.length === 0) return;

    setIsPlaying(true);
    drawWaveform(true);

    const fullTextToSpeak = word.map((item) => item.name).join(" ");

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(fullTextToSpeak);
      utterance.lang = "fr-FR";
      utterance.rate = playbackSpeed;

      utterance.onend = () => {
        setIsPlaying(false);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        drawWaveform(false);
      };

      window.speechSynthesis.speak(utterance);
      return;
    }

    setTimeout(() => {
      setIsPlaying(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      drawWaveform(false);
    }, 2000);
  };

  const addLetterToWord = (letter) => {
    if (word.length < 8) {
      setWord((previous) => [...previous, letter]);
    }
  };

  const clearWord = () => {
    setWord([]);
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    drawWaveform(false);
  };

  return (
    <div className="pronunciation-lab learn-glass-panel">
      <div className="learn-panel-intro learn-panel-intro--centered">
        <h2>{t("learnPhoneticLab")}</h2>
        <p>{t("learnLabDesc")}</p>
      </div>

      <canvas ref={canvasRef} className="wave-canvas" />

      <div className="pronunciation-lab__controls">
        <button
          type="button"
          className="btn-primary"
          onClick={handlePlayAudio}
          disabled={isPlaying || word.length === 0}
        >
          {isPlaying ? <Square size={18} /> : <Play size={18} />}
          {isPlaying ? t("learnAnalysisInProgress") : t("learnListen")}
        </button>

        <button type="button" className="btn-primary btn-primary--ghost" onClick={clearWord}>
          <RefreshCcw size={18} />
        </button>
      </div>

      <div className="pronunciation-lab__composer">
        <div className="pronunciation-lab__word">
          {word.length === 0 ? (
            <span>{t("learnClickToBuild")}</span>
          ) : (
            word.map((item, index) => (
              <strong key={index}>{item.char}</strong>
            ))
          )}
        </div>

        {word.length > 0 && <div className="pronunciation-lab__latin">{word.map((item) => item.transliteration).join("")}</div>}
      </div>

      <div className="pronunciation-lab__head">
        <h3>{t("learnPhoneticKeyboard")}</h3>
        <label className="pronunciation-lab__speed">
          <Settings size={16} />
          <span>{t("learnSpeed")}</span>
          <select value={playbackSpeed} onChange={(event) => setPlaybackSpeed(parseFloat(event.target.value))} className="learn-select">
            <option value="0.5">{t("learnSpeedSlow")}</option>
            <option value="0.85">{t("learnSpeedNormal")}</option>
            <option value="1.5">{t("learnSpeedFast")}</option>
          </select>
        </label>
      </div>

      <div className="alphabet-grid alphabet-grid--compact">
        {tifinaghAlphabet.map((item, index) => (
          <button
            key={index}
            type="button"
            className="letter-card letter-card--keyboard"
            onClick={() => addLetterToWord(item)}
          >
            {item.char}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PronunciationLab;
