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
} from "lucide-react";

import "../css/Profile.css";

function Profile() {
  const { user, updateUser } = useAuth();
  const { lang } = useLanguage();
  const fileInputRef = useRef(null);

  // États des champs
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [location, setLocation] = useState(user?.location || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [photo, setPhoto] = useState(user?.photo || null);

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Synchronisation avec les données utilisateur
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setLocation(user.location || "");
      setBio(user.bio || "");
      setPhoto(user.photo || null);
    }
  }, [user]);

  // Gestion de la photo
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPhoto(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  // Sauvegarde
  const handleSave = async () => {
    setLoading(true);

    try {
      await updateUser({
        name,
        location,
        bio,
        photo,
      });

      setSaved(true);
      setIsEditing(false);

      setTimeout(() => {
        setSaved(false);
      }, 3000);
    } catch (error) {
      console.error("Erreur mise à jour profil", error);
    } finally {
      setLoading(false);
    }
  };

  // Traductions
  const t = {
    title:
      lang === "AR"
        ? "الملف الشخصي"
        : lang === "FR"
        ? "Mon profil"
        : "My profile",

    nameLabel:
      lang === "AR"
        ? "الاسم الكامل"
        : lang === "FR"
        ? "Nom complet"
        : "Full name",

    emailLabel: "Email",

    locationLabel:
      lang === "AR"
        ? "المدينة / الدولة"
        : lang === "FR"
        ? "Ville / Pays"
        : "City / Country",

    bioLabel:
      lang === "AR"
        ? "نبذة عني"
        : lang === "FR"
        ? "Bio"
        : "Bio",

    save:
      lang === "AR"
        ? "حفظ التغييرات"
        : lang === "FR"
        ? "Enregistrer"
        : "Save changes",

    edit:
      lang === "AR"
        ? "تعديل"
        : lang === "FR"
        ? "Modifier"
        : "Edit",

    quote:
      lang === "AR"
        ? "✧ أضف صورتك الشخصية ✧"
        : lang === "FR"
        ? " Ajoutez votre photo "
        : " Add your profile picture ",

    subtitle:
      lang === "AR"
        ? "حافظ على معلوماتك محدثة"
        : lang === "FR"
        ? "Gardez vos infos à jour"
        : "Keep your info up to date",

    savedMsg:
      lang === "AR"
        ? "تم حفظ التغييرات"
        : lang === "FR"
        ? "Modifications enregistrées"
        : "Changes saved",

    emailReadOnlyMsg:
      lang === "AR"
        ? "البريد الإلكتروني غير قابل للتغيير"
        : lang === "FR"
        ? "Email non modifiable"
        : "Email cannot be changed",
  };

  return (
    <div className="profile-container">
      {/* Formes décoratives */}
      <div className="bg-shape-1"></div>
      <div className="bg-shape-2"></div>
      <div className="bg-shape-3"></div>

      <div className="profile-card">
        <div className="profile-card-inner">
          {/* Partie gauche */}
          <div className="profile-left">
            <div className="profile-photo-wrapper">
              <div className="profile-photo-ring"></div>

              {photo ? (
                <img
                  src={photo}
                  alt="Avatar"
                  className="profile-photo-img"
                />
              ) : (
                <div className="profile-photo-placeholder">
                  <User size={64} />
                </div>
              )}
              <button
                className="profile-photo-edit"
                onClick={() => fileInputRef.current.click()}
                aria-label="Changer la photo"
              >
                <Camera size={20} />
              </button>
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

          {/* Partie droite */}
          <div className="profile-right">
            <div className="profile-header">
              <h1 className="profile-title">{t.title}</h1>

              {!isEditing && (
                <button
                  className="edit-mode-btn"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit3 size={18} /> {t.edit}
                </button>
              )}
            </div>

            <div className="profile-sub">{t.subtitle}</div>

            <div className="profile-form">
              {/* Nom */}
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

              {/* Email */}
              <div className="form-group">
                <label>{t.emailLabel}</label>

                <div className="input-icon-wrapper readonly">
                  <Mail size={18} className="input-icon" />

                  <input
                    type="email"
                    value={email}
                    readOnly
                    placeholder="exemple@domaine.com"
                  />
                </div>

                <small className="email-hint">
                  {t.emailReadOnlyMsg}
                </small>
              </div>

              {/* Localisation */}
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

              {/* Bouton save */}
              {isEditing && (
                <button
                  className="save-button"
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 size={20} className="spinner" />
                  ) : (
                    <Save size={18} />
                  )}

                  <span>{t.save}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {saved && <div className="save-toast">{t.savedMsg}</div>}
    </div>
  );
}

export default Profile;
