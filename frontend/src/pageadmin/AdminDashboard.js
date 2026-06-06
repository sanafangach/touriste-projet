import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminHeader from "../components/admin/AdminHeader";
import AdminLoading from "../components/admin/AdminLoading";
import AdminNotice from "../components/admin/AdminNotice";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminWorkspace from "../components/admin/AdminWorkspace";
import StatsCards from "../components/admin/StatsCards";
import {
  adminEndpoints,
  adminSections,
  createEmptyCollections,
} from "../components/admin/config/adminDashboardConfig";
import AdminEntityModal from "../components/admin/forms/AdminEntityModal";
import AdminDataTable from "../components/admin/tables/AdminDataTable";
import {
  buildAdminFormData,
  getEmptyForm,
  getErrorMessage,
  getFavoriteItem,
  getFormFromItem,
  normalizeList,
} from "../components/admin/utils/adminDashboardUtils";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../components/accueil/LanguageContext";
import api from "../services/api";
import ConfirmDialog from "../components/common/ConfirmDialog";

import "../components/css/AdminDashboard.css";

function AdminDashboard() {
  const { user, logout, isAdmin } = useAuth();
  const { lang, isRTL } = useLanguage();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("users");
  const [collections, setCollections] = useState(() => createEmptyCollections());
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState(null);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [confirmTarget, setConfirmTarget] = useState(null);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  const activeMeta = useMemo(
    () => adminSections.find((section) => section.key === activeSection) || adminSections[0],
    [activeSection]
  );

  const fetchData = useCallback(async (showLoader = true) => {
    try {
      if (showLoader) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      const [
        usersRes,
        statsRes,
        citiesRes,
        activitiesRes,
        restaurantsRes,
        placesRes,
        hiddenGemsRes,
        favoritesRes,
      ] = await Promise.all([
        api.get(adminEndpoints.users),
        api.get("/admin/stats"),
        api.get(adminEndpoints.cities),
        api.get(adminEndpoints.activities),
        api.get(adminEndpoints.restaurants),
        api.get(adminEndpoints.places),
        api.get(adminEndpoints.hiddenGems),
        api.get(adminEndpoints.favorites),
      ]);

      setCollections({
        users: normalizeList(usersRes.data, "users"),
        cities: normalizeList(citiesRes.data, "cities"),
        activities: normalizeList(activitiesRes.data, "activities"),
        restaurants: normalizeList(restaurantsRes.data, "restaurants"),
        places: normalizeList(placesRes.data, "places"),
        hiddenGems: normalizeList(hiddenGemsRes.data, "hidden_gems"),
        favorites: normalizeList(favoritesRes.data, "favorites"),
      });
      setStats(statsRes.data || {});
    } catch (error) {
      setNotice({ type: "error", message: getErrorMessage(error) });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (!isAdmin()) {
      navigate("/");
      return;
    }

    fetchData();
  }, [fetchData, isAdmin, navigate]);

  const currentRows = useMemo(() => {
    const rows = collections[activeSection] || [];
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return rows;

    return rows.filter((row) => {
      const favoriteItem = getFavoriteItem(row);
      const searchable = [
        row.id,
        row.name,
        row.email,
        row.role,
        row.slug,
        row.city?.name,
        row.cuisine,
        row.category,
        row.duration,
        row.opening_hours,
        row.location,
        row.best_time,
        row.description,
        row.user?.name,
        row.user?.email,
        row.item_type,
        favoriteItem?.name,
        favoriteItem?.city?.name,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchable.includes(normalizedQuery);
    });
  }, [activeSection, collections, query]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setQuery("");
  };

  const openModal = (section, mode, item = null) => {
    const isSelf = section === "users" && item?.id === user?.id;
    const cities = collections.cities || [];

    setModal({ section, mode, item, isSelf });
    setForm(item ? getFormFromItem(section, item, cities) : getEmptyForm(section, cities));
    setNotice(null);
  };

  const closeModal = () => {
    if (saving) return;
    setModal(null);
    setForm({});
  };

  const handleFieldChange = (field, value) => {
    setForm((current) => ({
      ...current,
      [field.name]: field.type === "file" ? value?.[0] || null : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!modal) return;

    setSaving(true);
    setNotice(null);

    try {
      const { section, mode, item } = modal;
      const sectionLabel = adminSections.find((entry) => entry.key === section)?.singular || "Record";

      if (section === "users") {
        const payload = { ...form };
        if (mode === "edit" && !payload.password) {
          delete payload.password;
        }

        if (mode === "create") {
          await api.post(adminEndpoints.users, payload);
        } else {
          await api.put(`${adminEndpoints.users}/${item.id}`, payload);
        }
      } else {
        const payload = buildAdminFormData(form);

        if (mode === "create") {
          await api.post(adminEndpoints[section], payload);
        } else {
          payload.append("_method", "PUT");
          await api.post(`${adminEndpoints[section]}/${item.id}`, payload);
        }
      }

      setNotice({
        type: "success",
        message: `${sectionLabel} saved successfully.`,
      });
      closeModal();
      fetchData(false);
    } catch (error) {
      setNotice({ type: "error", message: getErrorMessage(error) });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmTarget) return;

    const { section, item } = confirmTarget;

    try {
      await api.delete(`${adminEndpoints[section]}/${item.id}`);
      setConfirmTarget(null);
      setNotice({
        type: "success",
        message: `${
          adminSections.find((entry) => entry.key === section)?.singular || "Record"
        } deleted successfully.`,
      });
      fetchData(false);
    } catch (error) {
      setConfirmTarget(null);
      setNotice({ type: "error", message: getErrorMessage(error) });
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch (error) {
      console.error(error);
    }

    setLogoutConfirmOpen(false);
    logout();
    navigate("/");
  };

  if (loading) {
    return <AdminLoading />;
  }

  return (
    <div className={`admin-dashboard ${isRTL ? "rtl" : ""}`}>
      <AdminSidebar
        user={user}
        sections={adminSections}
        activeSection={activeSection}
        collections={collections}
        onSectionChange={handleSectionChange}
        onLogout={() => setLogoutConfirmOpen(true)}
      />

      <main className="admin-main">
        <AdminHeader lang={lang} refreshing={refreshing} onRefresh={() => fetchData(false)} />

        <AdminNotice notice={notice} onDismiss={() => setNotice(null)} />

        <StatsCards stats={stats} collections={collections} />

        <AdminWorkspace
          activeMeta={activeMeta}
          activeSection={activeSection}
          rowCount={currentRows.length}
          query={query}
          onQueryChange={setQuery}
          onAdd={(section) => openModal(section, "create")}
        >
          <AdminDataTable
            activeSection={activeSection}
            activeMeta={activeMeta}
            rows={currentRows}
            currentUser={user}
            onEdit={(section, item) => openModal(section, "edit", item)}
            onDelete={(section, item) => setConfirmTarget({ section, item })}
          />
        </AdminWorkspace>
      </main>

      <AdminEntityModal
        modal={modal}
        form={form}
        cities={collections.cities}
        saving={saving}
        onClose={closeModal}
        onFieldChange={handleFieldChange}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={Boolean(confirmTarget)}
        title="Delete record"
        message={`Delete ${confirmTarget?.item?.name || "this record"}? This action cannot be undone.`}
        cancelLabel="Cancel"
        confirmLabel="Delete"
        onCancel={() => setConfirmTarget(null)}
        onConfirm={handleDelete}
        isRTL={isRTL}
      />

      <ConfirmDialog
        open={logoutConfirmOpen}
        title="Confirm logout"
        message="Are you sure you want to log out?"
        cancelLabel="Cancel"
        confirmLabel="Log out"
        onCancel={() => setLogoutConfirmOpen(false)}
        onConfirm={handleLogout}
        isRTL={isRTL}
      />
    </div>
  );
}

export default AdminDashboard;
