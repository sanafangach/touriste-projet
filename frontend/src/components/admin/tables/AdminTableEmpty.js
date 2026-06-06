import React from "react";
import { Search } from "lucide-react";

function AdminTableEmpty({ activeMeta }) {
  return (
    <div className="admin-empty">
      <Search size={28} />
      <h3>No {activeMeta.label.toLowerCase()} found</h3>
      <p>
        {activeMeta.readOnly
          ? "Saved user items will appear here."
          : `Try a different search or add a new ${activeMeta.singular.toLowerCase()}.`}
      </p>
    </div>
  );
}

export default AdminTableEmpty;
