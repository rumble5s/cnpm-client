import React from "react";
import AdminNavBar from "../components/AdminNavBar";
import AdminContent from "../components/AdminContent";

export const AdminPage = () => {
  return (
    <div className = "overflow-auto">
      {/* <AdminNavBar/> */}
      <AdminContent/>
    </div>
  );
};
