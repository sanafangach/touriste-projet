import React from "react";
import { Plus, Search } from "lucide-react";

function AdminWorkspace({
  activeMeta,
  activeSection,
  rowCount,
  query,
  onQueryChange,
  onAdd,
  children,
}) {
  return (
    <section className="admin-workspace">
      <div className="admin-workspace-header">
        <div>
          <h2>{activeMeta.label}</h2>
          <span>{rowCount} records</span>
        </div>

        <div className="admin-toolbar">
          <label className="admin-search">
            <Search size={17} />
            <input
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder={`Search ${activeMeta.label.toLowerCase()}`}
            />
          </label>

          {!activeMeta.readOnly && (
            <button
              type="button"
              className="admin-primary-btn"
              onClick={() => onAdd(activeSection)}
            >
              <Plus size={17} />
              Add {activeMeta.singular}
            </button>
          )}
        </div>
      </div>

      <div className="admin-table-wrap">{children}</div>
    </section>
  );
}

export default AdminWorkspace;
