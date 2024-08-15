import React from "react";
import AdminBurgerIcon from "../../assets/bars.svg";
import Logo from "../../assets/Laci.svg";
import "./admin-navbar.css";

const AdminNavbar = () => {
  return (
    <header className="admin-header">
      <div className="admin-burger">
        <a href="/">
          <img src={AdminBurgerIcon} alt="Admin Sidebar Icon" />
        </a>
      </div>
      <div className="admin-logo">
        <a href="/">
          <img src={Logo} alt="Admin Laci Logo" />
        </a>
      </div>
    </header>
  );
};

export default AdminNavbar;
