import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/admin-sidebar/admin-sidebar";
import AdminNavbar from "../components/admin-navbar/admin-navbar";

export default function AdminLayout() {
  return (
    <div className="admin-layout-container">
      <AdminNavbar />
      <AdminSidebar />
      <Outlet />
    </div>
  );
}
