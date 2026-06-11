import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Type, Compass, Award, Download, Loader2 } from "lucide-react";
import api from "../../../services/api";

// Per-track presentation. Colours mirror the existing Apprendre theme variables
// (Darija = gold/orange, Tifinagh = blue, Culture = green).
const TRACK_META = {
  darija:   { icon: MessageCircle, color: "#d97706", soft: "rgba(217,119,6,0.12)" },
  tifinagh: { icon: Type,          color: "#0369a1", soft: "rgba(3,105,161,0.12)" },
  culture:  { icon: Compass,       color: "#15803d", soft: "rgba(21,128,61,0.12)" },
};

function formatDate(value, lang) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  const locale = lang === "FR" ? "fr-FR" : lang === "AR" ? "ar-MA" : "en-US";
  return d.toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" });
}

function MyCertificates({ lang, isRTL, refreshKey }) {
  const ui = (fr, en, ar) => (lang === "FR" ? fr : lang === "AR" ? ar : en);

  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(null);

  useEffect(() => {
    let active = true;
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    setLoading(true);
    api.get("/apprendre/certificates")
      .then((res) => {
        if (active) setCertificates(Array.isArray(res.data) ? res.data : []);
      })
      .catch((e) => {
        console.error("[apprendre] failed to load certificates:", e?.message || e);
        if (active) setCertificates([]);
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [refreshKey]);

  const handleDownload = async (cert) => {
    setDownloading(cert.track);
    try {
      // Stream through the authenticated API so ownership is enforced server-side.
      const res = await api.get(`/apprendre/certificates/${cert.track}/download`, {
        responseType: "blob",
      });
      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `AMUDUX-${cert.certificate_number}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error("[apprendre] certificate download failed:", e?.message || e);
    } finally {
      setDownloading(null);
    }
  };

  // While loading, or when the learner has not earned any certificate yet, the
  // section quietly collapses so it never disturbs the existing hub layout.
  if (loading || certificates.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ width: "100%", maxWidth: "1200px", marginBottom: "48px" }}
    >
      <div style={{
        width: "100%", marginBottom: "20px",
        display: "flex", alignItems: "center", gap: "10px"
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: "10px",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "var(--apprendre-border)", color: "var(--apprendre-text-primary)"
        }}>
          <Award size={18} />
        </div>
        <h2 style={{
          margin: 0, fontSize: "1.3rem", fontWeight: 700,
          color: "var(--apprendre-text-primary)"
        }}>
          {ui("Mes Certificats", "My Certificates", "شهاداتي")}
        </h2>
      </div>

      <div className="apprendre-certificates-grid">
        {certificates.map((cert) => {
          const meta = TRACK_META[cert.track] || TRACK_META.darija;
          const Icon = meta.icon;
          const isDownloading = downloading === cert.track;

          return (
            <div key={cert.track} className="apprendre-certificate-card" style={{ "--cert-color": meta.color }}>
              <div className="apprendre-certificate-accent" />

              <div className="apprendre-certificate-head">
                <div className="apprendre-certificate-icon" style={{ background: meta.soft, color: meta.color }}>
                  <Icon size={22} />
                </div>
                <span className="apprendre-certificate-badge">
                  <Award size={12} />
                  {ui("Obtenu", "Earned", "تم الحصول")}
                </span>
              </div>

              <h3 className="apprendre-certificate-title">{cert.title}</h3>

              <div className="apprendre-certificate-meta">
                <div className="apprendre-certificate-row">
                  <span className="apprendre-certificate-label">{ui("Délivré le", "Completed on", "تاريخ الإنجاز")}</span>
                  <span className="apprendre-certificate-value">{formatDate(cert.issued_at, lang)}</span>
                </div>
                <div className="apprendre-certificate-row">
                  <span className="apprendre-certificate-label">{ui("N° du certificat", "Certificate No.", "رقم الشهادة")}</span>
                  <span className="apprendre-certificate-value apprendre-certificate-number">{cert.certificate_number}</span>
                </div>
              </div>

              <button
                className="apprendre-certificate-btn"
                onClick={() => handleDownload(cert)}
                disabled={isDownloading}
              >
                {isDownloading
                  ? <Loader2 size={18} className="apprendre-certificate-spin" />
                  : <Download size={18} />}
                <span>
                  {isDownloading
                    ? ui("Téléchargement…", "Downloading…", "جارٍ التحميل…")
                    : ui("Télécharger le PDF", "Download PDF", "تحميل PDF")}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default MyCertificates;
