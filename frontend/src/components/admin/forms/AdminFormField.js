import React from "react";
import { Upload } from "lucide-react";

function AdminFormField({ field, value, onChange }) {
  const fieldValue = value ?? "";

  if (field.type === "textarea") {
    return (
      <textarea
        id={field.name}
        value={fieldValue}
        onChange={(event) => onChange(field, event.target.value)}
        rows={4}
        disabled={field.disabled}
      />
    );
  }

  if (field.type === "select") {
    const options = field.options || [];

    return (
      <select
        id={field.name}
        value={fieldValue}
        onChange={(event) => onChange(field, event.target.value)}
        required={field.required}
        disabled={field.disabled}
      >
        {options.length === 0 && <option value="">No option</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === "file") {
    return (
      <label className="admin-file-input" htmlFor={field.name}>
        <Upload size={16} />
        <span>{value?.name || "Choose image"}</span>
        <input
          id={field.name}
          type="file"
          accept="image/*"
          onChange={(event) => onChange(field, event.target.files)}
          disabled={field.disabled}
        />
      </label>
    );
  }

  return (
    <input
      id={field.name}
      type={field.type}
      value={fieldValue}
      min={field.min}
      max={field.max}
      step={field.step}
      required={field.required}
      disabled={field.disabled}
      onChange={(event) => onChange(field, event.target.value)}
    />
  );
}

export default AdminFormField;
