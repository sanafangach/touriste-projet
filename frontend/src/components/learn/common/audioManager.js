class AudioManager {
  constructor() {
    this.currentAudio = null;   // HTML Audio element for MP3
    this.currentUtterance = null; // SpeechSynthesisUtterance (prevent GC)
    this.currentUrl = null;
    this.currentText = null;
    this.listeners = new Set();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((listener) => listener({
      playingUrl: this.currentUrl,
      playingText: this.currentText
    }));
  }

  stop() {
    // Stop HTML5 Audio
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch (e) {
        // Ignore errors on cleanup
      }
      this.currentAudio = null;
    }

    // Stop TTS — cancel triggers onerror with "interrupted", which is expected
    if (window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        // Ignore errors on cleanup
      }
    }

    this.currentUtterance = null;
    this.currentUrl = null;
    this.currentText = null;
    this.notify();
  }

  play({ text, audioUrl, overrideLang, uiLang }) {
    // Always stop previous audio first
    this.stop();

    // Guard: nothing to play
    if (!audioUrl && !text) {
      return Promise.resolve();
    }

    this.currentUrl = audioUrl || null;
    this.currentText = text || null;
    this.notify();

    if (audioUrl) {
      return this._playMP3(audioUrl);
    } else {
      return this._playTTS(text, overrideLang, uiLang);
    }
  }

  _playMP3(audioUrl) {
    return new Promise((resolve) => {
      try {
        const audio = new Audio(audioUrl);
        this.currentAudio = audio;

        audio.onended = () => {
          this.stop();
          resolve();
        };

        audio.onerror = () => {
          console.warn("Audio file playback failed:", audioUrl);
          this.stop();
          resolve(); // Resolve, not reject — graceful fallback
        };

        audio.play().catch(() => {
          console.warn("Audio play() was blocked or failed:", audioUrl);
          this.stop();
          resolve(); // Resolve, not reject
        });
      } catch (e) {
        console.warn("Audio constructor error:", e);
        this.stop();
        resolve();
      }
    });
  }

  _playTTS(text, overrideLang, uiLang) {
    return new Promise((resolve) => {
      // Guard: browser doesn't support TTS
      if (!window.speechSynthesis) {
        console.warn("SpeechSynthesis not supported in this browser.");
        this.stop();
        resolve();
        return;
      }

      try {
        const utterance = new SpeechSynthesisUtterance(text);
        // CRITICAL: Store reference to prevent Chrome garbage collection
        this.currentUtterance = utterance;

        // Language detection
        const hasArabic = /[\u0600-\u06FF]/.test(text);
        let targetLang = overrideLang || uiLang;

        if (hasArabic) {
          utterance.lang = 'ar-SA';
        } else if (targetLang === 'FR') {
          utterance.lang = 'fr-FR';
        } else if (targetLang === 'AR') {
          utterance.lang = 'ar-SA';
        } else {
          utterance.lang = 'en-US';
        }

        utterance.onend = () => {
          this.stop();
          resolve();
        };

        utterance.onerror = (e) => {
          // "interrupted" fires when we call speechSynthesis.cancel() — this is expected
          if (e && e.error === 'interrupted') {
            resolve();
            return;
          }
          console.warn("TTS error:", e?.error || e);
          this.stop();
          resolve(); // Resolve, not reject — graceful degradation
        };

        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.warn("TTS speak() threw:", e);
        this.stop();
        resolve();
      }
    });
  }
}

export const globalAudioManager = new AudioManager();
