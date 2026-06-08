import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../accueil/LanguageContext";
import {
  Camera,
  Save,
  User,
  Mail,
  Loader2,
  MapPin,
  Edit3,
  Award,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { getUploadUrl } from "../../services/config";

import "../css/Profile.css";

function Profile() {
  const { user, updateUser } = useAuth();
  const { lang } = useLanguage();
  const fileInputRef = useRef(null);

  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio]           = useState("");
  const [photo, setPhoto]       = useState(null);
  const [photoFile, setPhotoFile] = useState(null); // the actual File or base64

  const [loading, setLoading]     = useState(false);
  const [saved, setSaved]         = useState(false);
  const [error, setError]         = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Sync whenever user object changes (initial load + after save)
  useEffect(() => {
    if (user) {
      setName(user.name  || "");
      setEmail(user.email || "");
      setLocation(user.ville || user.location || "");
      setBio(user.bio  || "");
      // image may be a full URL (from backend) or a base64 preview
      setPhoto(user.image ? getUploadUrl(user.image) : null);
      setPhotoFile(null);
    }
  }, [user]);

  // When user picks a file: show preview + keep base64 for upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result);   // preview
      setPhotoFile(reader.result); // base64 data URL to send
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");
    try {
      await updateUser({
        name,
        ville: location,
        bio,
        ...(photoFile ? { photo: photoFile } : {}),
      });
      setSaved(true);
      setIsEditing(false);
      setPhotoFile(null);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Erreur lors de la mise à jour"
      );
    } finally {
      setLoading(false);
    }
  };

  // ── Translations ──────────────────────────────────────
  const t = {
    title:
      lang === "AR" ? "الملف الشخصي" : lang === "FR" ? "Mon profil" : "My profile",
    nameLabel:
      lang === "AR" ? "الاسم الكامل" : lang === "FR" ? "Nom complet" : "Full name",
    emailLabel: "Email",
    locationLabel:
      lang === "AR" ? "المدينة / الدولة" : lang === "FR" ? "Ville / Pays" : "City / Country",
    bioLabel:
      lang === "AR" ? "نبذة عني" : lang === "FR" ? "Bio" : "Bio",
    save:
      lang === "AR" ? "حفظ التغييرات" : lang === "FR" ? "Enregistrer" : "Save changes",
    edit:
      lang === "AR" ? "تعديل" : lang === "FR" ? "Modifier" : "Edit",
    cancel:
      lang === "AR" ? "إلغاء" : lang === "FR" ? "Annuler" : "Cancel",
    quote:
      lang === "AR" ? "✧ أضف صورتك الشخصية ✧" : lang === "FR" ? "Ajoutez votre photo" : "Add your profile picture",
    subtitle:
      lang === "AR" ? "حافظ على معلوماتك محدثة" : lang === "FR" ? "Gardez vos infos à jour" : "Keep your info up to date",
    savedMsg:
      lang === "AR" ? "تم حفظ التغييرات" : lang === "FR" ? "Modifications enregistrées" : "Changes saved",
    emailReadOnlyMsg:
      lang === "AR" ? "البريد الإلكتروني غير قابل للتغيير" : lang === "FR" ? "Email non modifiable" : "Email cannot be changed",
  };

  return (
    <div className="profile-container">
      <div className="bg-shape-1" />
      <div className="bg-shape-2" />
      <div className="bg-shape-3" />

      <div className="profile-card">
        <div className="profile-card-inner">

          {/* Left — avatar */}
          <div className="profile-left">
            <div className="profile-photo-wrapper">
              <div className="profile-photo-ring" />
              {photo ? (
                <img src={photo} alt="Avatar" className="profile-photo-img" />
              ) : (
                <div className="profile-photo-placeholder">
                  <User size={64} />
                </div>
              )}
              {isEditing && (
                <button
                  className="profile-photo-edit"
                  onClick={() => fileInputRef.current.click()}
                  aria-label="Changer la photo"
                >
                  <Camera size={20} />
                </button>
              )}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </div>
            <div className="profile-quote">{t.quote}</div>
          </div>

          {/* Right — form */}
          <div className="profile-right">
            <div className="profile-header">
              <h1 className="profile-title">{t.title}</h1>
              {!isEditing ? (
                <button className="edit-mode-btn" onClick={() => setIsEditing(true)}>
                  <Edit3 size={18} /> {t.edit}
                </button>
              ) : (
                <button
                  className="edit-mode-btn secondary"
                  onClick={() => { setIsEditing(false); setError(""); }}
                >
                  {t.cancel}
                </button>
              )}
            </div>

            <div className="profile-sub">{t.subtitle}</div>

            {/* Success / Error banners */}
            {saved && (
              <div className="profile-alert success">
                <CheckCircle size={16} /> {t.savedMsg}
              </div>
            )}
            {error && (
              <div className="profile-alert danger">
                <AlertCircle size={16} /> {error}
              </div>
            )}

            <div className="profile-form">
              {/* Name */}
              <div className="form-group">
                <label>{t.nameLabel}</label>
                <div className="input-icon-wrapper">
                  <User size={18} className="input-icon" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.nameLabel}
                    readOnly={!isEditing}
                    className={!isEditing ? "readonly-field" : ""}
                  />
                </div>
              </div>

              {/* Email (always read-only) */}
              <div className="form-group">
                <label>{t.emailLabel}</label>
                <div className="input-icon-wrapper readonly">
                  <Mail size={18} className="input-icon" />
                  <input type="email" value={email} readOnly placeholder="email@domain.com" />
                </div>
                <small className="email-hint">{t.emailReadOnlyMsg}</small>
              </div>

              {/* Location / Ville */}
              <div className="form-group">
                <label>{t.locationLabel}</label>
                <div className="input-icon-wrapper">
                  <MapPin size={18} className="input-icon" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={t.locationLabel}
                    readOnly={!isEditing}
                    className={!isEditing ? "readonly-field" : ""}
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="form-group">
                <label>{t.bioLabel}</label>
                <div className="input-icon-wrapper">
                  <Award size={18} className="input-icon" />
                  <textarea
                    rows="3"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder={t.bioLabel}
                    readOnly={!isEditing}
                    className={!isEditing ? "readonly-field" : ""}
                  />
                </div>
              </div>

              {/* Save button */}
              {isEditing && (
                <button className="save-button" onClick={handleSave} disabled={loading}>
                  {loading ? <Loader2 size={20} className="spinner" /> : <Save size={18} />}
                  <span>{t.save}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
