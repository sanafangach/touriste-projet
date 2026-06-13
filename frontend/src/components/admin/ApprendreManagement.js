import React, { useEffect, useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  ChevronsUpDown,
} from "lucide-react";

import api from "../../services/api";
import ApprendreAnalytics from "./ApprendreAnalytics";
import { apprendreEndpoints } from "./config/adminDashboardConfig";
import { formatDate } from "./utils/adminDashboardUtils";

const PER_PAGE = 10;

const TRACK_META = {
  darija: { label: "Darija", className: "darija" },
  tifinagh: { label: "Tifinagh", className: "tifinagh" },
  culture: { label: "Culture", className: "culture" },
};

// ── Shared cell renderers ──────────────────────────────────────────

function TrackBadge({ track }) {
  if (!track) return <span className="apprendre-muted">-</span>;
  const meta = TRACK_META[track] || { label: track, className: "default" };
  return <span className={`apprendre-track-badge ${meta.className}`}>{meta.label}</span>;
}

function UserCell({ user }) {
  if (!user) return <span className="apprendre-muted">Unknown</span>;
  return (
    <div className="admin-name-cell">
      <div className="admin-avatar">{user.name?.[0]?.toUpperCase() || "U"}</div>
      <div>
        <strong>{user.name || "—"}</strong>
        <span>{user.email || `#${user.id}`}</span>
      </div>
    </div>
  );
}

function MissionCell({ mission }) {
  if (!mission) return <span className="apprendre-muted">-</span>;
  return (
    <span className="apprendre-mission-cell">
      <strong>#{mission.mission_number}</strong> {mission.title}
    </span>
  );
}

// ── Column definitions per tab ─────────────────────────────────────
// `key` is the server-side sort key (null = not sortable).

const progressColumns = [
  { key: "user", label: "User", render: (r) => <UserCell user={r.user} /> },
  { key: "track", label: "Track", render: (r) => <TrackBadge track={r.mission?.track} /> },
  { key: "mission", label: "Mission", render: (r) => <MissionCell mission={r.mission} /> },
  { key: "date", label: "Completed At", render: (r) => formatDate(r.completed_at) },
];

const favoritesColumns = [
  { key: "user", label: "User", render: (r) => <UserCell user={r.user} /> },
  { key: "track", label: "Track", render: (r) => <TrackBadge track={r.mission?.track} /> },
  { key: "mission", label: "Mission", render: (r) => <MissionCell mission={r.mission} /> },
  { key: "date", label: "Date", render: (r) => formatDate(r.created_at) },
];

const savedColumns = [
  { key: "user", label: "User", render: (r) => <UserCell user={r.user} /> },
  { key: "word", label: "Word", render: (r) => <span className="apprendre-word">{r.content}</span> },
  { key: "translation", label: "Translation", render: (r) => r.translation || <span className="apprendre-muted">-</span> },
  { key: "track", label: "Track", render: (r) => <TrackBadge track={r.mission?.track} /> },
  { key: "mission", label: "Mission", render: (r) => <MissionCell mission={r.mission} /> },
  { key: "date", label: "Date", render: (r) => formatDate(r.created_at) },
];

// ── Reusable server-paginated, searchable, sortable list ───────────

function ApprendreList({ endpoint, columns, searchPlaceholder }) {
  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date");
  const [dir, setDir] = useState("desc");

  // Debounce the search box so we don't fire a request on every keystroke.
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 350);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    api
      .get(endpoint, { params: { page, per_page: PER_PAGE, search, sort, dir } })
      .then((res) => {
        if (!active) return;
        const data = res.data || {};
        setRows(Array.isArray(data.data) ? data.data : []);
        setMeta({
          current_page: data.current_page || 1,
          last_page: data.last_page || 1,
          total: data.total || 0,
        });
      })
      .catch((err) => {
        if (active) setError(err?.response?.data?.message || "Failed to load records.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [endpoint, page, search, sort, dir]);

  const handleSort = (key) => {
    if (!key) return;
    if (sort === key) {
      setDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSort(key);
      setDir("asc");
    }
    setPage(1);
  };

  const colCount = columns.length;

  return (
    <div className="apprendre-list">
      <div className="apprendre-list-toolbar">
        <label className="admin-search">
          <Search size={17} />
          <input
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={searchPlaceholder || "Search…"}
          />
        </label>
        <span className="apprendre-list-count">{meta.total} records</span>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table apprendre-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.label}
                  className={col.key ? "apprendre-sortable" : ""}
                  onClick={() => handleSort(col.key)}
                  aria-sort={
                    sort === col.key ? (dir === "asc" ? "ascending" : "descending") : "none"
                  }
                >
                  <span className="apprendre-th-inner">
                    {col.label}
                    {col.key &&
                      (sort === col.key ? (
                        dir === "asc" ? (
                          <ArrowUp size={13} />
                        ) : (
                          <ArrowDown size={13} />
                        )
                      ) : (
                        <ChevronsUpDown size={13} className="apprendre-sort-idle" />
                      ))}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={colCount} className="apprendre-state-cell">
                  Loading…
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={colCount} className="apprendre-state-cell error">
                  {error}
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={colCount} className="apprendre-state-cell">
                  {search ? "No records match your search." : "No records yet."}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id}>
                  {columns.map((col) => (
                    <td key={col.label}>{col.render(row)}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="apprendre-pagination">
        <span className="apprendre-pagination-info">
          Page {meta.current_page} of {meta.last_page}
        </span>
        <div className="apprendre-pagination-btns">
          <button
            type="button"
            disabled={loading || page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            <ChevronLeft size={16} /> Prev
          </button>
          <button
            type="button"
            disabled={loading || page >= meta.last_page}
            onClick={() => setPage((p) => p + 1)}
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Tabbed Apprendre management page ───────────────────────────────

const TABS = [
  { key: "progress", label: "Progress" },
  { key: "favorites", label: "Favorite Lessons" },
  { key: "saved", label: "Saved Vocabulary" },
  { key: "analytics", label: "Analytics" },
];

function ApprendreManagement() {
  const [tab, setTab] = useState("progress");

  return (
    <section className="apprendre-management" aria-label="Apprendre management">
      <div className="apprendre-tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={tab === t.key}
            className={`apprendre-tab ${tab === t.key ? "active" : ""}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="apprendre-tab-panel" role="tabpanel">
        {tab === "progress" && (
          <ApprendreList
            key="progress"
            endpoint={apprendreEndpoints.progress}
            columns={progressColumns}
            searchPlaceholder="Search by learner or mission…"
          />
        )}
        {tab === "favorites" && (
          <ApprendreList
            key="favorites"
            endpoint={apprendreEndpoints.favorites}
            columns={favoritesColumns}
            searchPlaceholder="Search by learner or mission…"
          />
        )}
        {tab === "saved" && (
          <ApprendreList
            key="saved"
            endpoint={apprendreEndpoints.saved}
            columns={savedColumns}
            searchPlaceholder="Search by word, translation, learner or mission…"
          />
        )}
        {tab === "analytics" && <ApprendreAnalytics />}
      </div>
    </section>
  );
}

export default ApprendreManagement;
