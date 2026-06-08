import React from "react";

import ActivitiesTable from "./ActivitiesTable";
import AdminTableEmpty from "./AdminTableEmpty";
import CitiesTable from "./CitiesTable";
import FavoritesTable from "./FavoritesTable";
import HiddenGemsTable from "./HiddenGemsTable";
import HotelsTable from "./HotelsTable";
import PlacesTable from "./PlacesTable";
import RestaurantsTable from "./RestaurantsTable";
import UsersTable from "./UsersTable";
import CommentsTable from "./CommentsTable";

const tableBySection = {
  users: UsersTable,
  cities: CitiesTable,
  activities: ActivitiesTable,
  restaurants: RestaurantsTable,
  places: PlacesTable,
  hiddenGems: HiddenGemsTable,
  hotels: HotelsTable,
  favorites: FavoritesTable,
  comments: CommentsTable,
};

function AdminDataTable({ activeSection, activeMeta, rows, currentUser, onEdit, onDelete, onApprove }) {
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
      onApprove={onApprove}
    />
  );
}

export default AdminDataTable;
