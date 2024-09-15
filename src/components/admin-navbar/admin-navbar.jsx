// import React from "react";
import { Link } from "react-router-dom";
import AdminBurgerIcon from "../../assets/bars.svg";
import Logo from "../../assets/Laci.svg";
import "./admin-navbar.css";

const AdminNavbar = () => {
  return (
    <header className="admin-header">
      <div className="admin-burger">
        <Link to="/Admin/CreateVoucher">
          <img src={AdminBurgerIcon} alt="Admin Sidebar Icon" />
        </Link>
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
