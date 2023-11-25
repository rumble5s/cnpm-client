import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../css/AdminForm.css";
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
