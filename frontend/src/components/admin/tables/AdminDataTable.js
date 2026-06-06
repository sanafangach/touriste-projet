import React from "react";

import ActivitiesTable from "./ActivitiesTable";
import AdminTableEmpty from "./AdminTableEmpty";
import CitiesTable from "./CitiesTable";
import FavoritesTable from "./FavoritesTable";
import HiddenGemsTable from "./HiddenGemsTable";
import PlacesTable from "./PlacesTable";
import RestaurantsTable from "./RestaurantsTable";
import UsersTable from "./UsersTable";

const tableBySection = {
  users: UsersTable,
  cities: CitiesTable,
  activities: ActivitiesTable,
  restaurants: RestaurantsTable,
  places: PlacesTable,
  hiddenGems: HiddenGemsTable,
  favorites: FavoritesTable,
};

function AdminDataTable({ activeSection, activeMeta, rows, currentUser, onEdit, onDelete }) {
  const safeRows = rows || [];

  if (safeRows.length === 0) {
    return <AdminTableEmpty activeMeta={activeMeta} />;
  }

  const TableComponent = tableBySection[activeSection] || PlacesTable;

  return (
    <TableComponent
      rows={safeRows}
      currentUser={currentUser}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
}

export default AdminDataTable;
