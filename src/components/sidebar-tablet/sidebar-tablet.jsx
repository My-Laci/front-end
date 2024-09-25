import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./sidebar-tablet.css";

export default function SidebarTablet({ userData }) {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState("Home");

  // Determine if the user is an admin; default to false if userData or isAdmin is undefined
  const isAdmin = userData ? userData.isAdmin : false;

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setActiveButton("Home");
        break;
      case "/Profile":
        setActiveButton("Profile");
        break;
      case "/Popular":
        setActiveButton("Popular");
        break;
      case "/Voucher":
        setActiveButton("Voucher");
        break;
      case "/Validate":
        setActiveButton("Validate User");
        break;
      default:
        setActiveButton("");
    }
  }, [location.pathname]);

  // Hide the sidebar if the route is /Article or /Certificate
  const hideSidebar = location.pathname === "/Article" || location.pathname === "/Certificate";

  if (hideSidebar) {
    return null; // Don't render the sidebar
  }

  return (
    <div className="sidebar-tablet">
      <Link to="/">
        <button
          className={activeButton === "Home" ? "active" : ""}
          onClick={() => setActiveButton("Home")}
          data-title="Home"
        >
          <i className="fa-solid fa-house"></i>
        </button>
      </Link>
      <Link to="/Profile">
        <button
          className={activeButton === "Profile" ? "active" : ""}
          onClick={() => setActiveButton("Profile")}
          data-title="Profile"
        >
          <i className="fa-solid fa-user"></i>
        </button>
      </Link>
      <Link to="/Popular">
        <button
          className={activeButton === "Popular" ? "active" : ""}
          onClick={() => setActiveButton("Popular")}
          data-title="Popular"
        >
          <i className="fa-solid fa-fire"></i>
        </button>
      </Link>

      {/* Show Voucher and Validate buttons if the user is an admin */}
      {isAdmin && (
        <>
          <Link to="/Voucher">
            <button
              className={activeButton === "Voucher" ? "active" : ""}
              onClick={() => setActiveButton("Voucher")}
              data-title="Voucher"
            >
              <i className="fa-solid fa-ticket"></i>
            </button>
          </Link>
          <Link to="/Validate">
            <button
              className={activeButton === "Validate User" ? "active" : ""}
              onClick={() => setActiveButton("Validate User")}
              data-title="Validate User"
            >
              <i className="fa-solid fa-circle-check"></i>
            </button>
          </Link>
        </>
      )}
    </div>
  );
}
