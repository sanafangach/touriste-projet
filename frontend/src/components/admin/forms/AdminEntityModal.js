import React from "react";
import { Save, X } from "lucide-react";

import { adminSections } from "../config/adminDashboardConfig";
import { getFieldConfig } from "./adminFormConfig";
import AdminFormField from "./AdminFormField";

function AdminEntityModal({
  modal,
  form,
  cities,
  saving,
  onClose,
  onFieldChange,
  onSubmit,
}) {
  if (!modal) return null;

  const sectionMeta = adminSections.find((section) => section.key === modal.section);
  const fields = getFieldConfig(modal.section, modal.mode, cities, modal.isSelf);

  return (
    <div className="admin-modal-backdrop" onMouseDown={onClose}>
      <div
        className="admin-modal"
        role="dialog"
        aria-modal="true"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="admin-modal-header">
          <div>
            <span>{modal.mode === "create" ? "Create" : "Edit"}</span>
            <h2>
              {modal.mode === "create" ? "Add" : "Update"} {sectionMeta?.singular}
            </h2>
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <form className="admin-form" onSubmit={onSubmit}>
          {fields.map((field) => (
            <div
              className={`admin-form-field ${field.type === "textarea" ? "wide" : ""}`}
              key={field.name}
            >
              <label htmlFor={field.name}>{field.label}</label>
              <AdminFormField
                field={field}
                value={form[field.name]}
                onChange={onFieldChange}
              />
            </div>
          ))}

          <div className="admin-form-actions">
            <button type="button" className="admin-secondary-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="admin-primary-btn" disabled={saving}>
              <Save size={17} />
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminEntityModal;
