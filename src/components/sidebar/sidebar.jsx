import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar({ userData }) {
  const location = useLocation(); // Get current location
  const [activeButton, setActiveButton] = useState("Home");

  console.log("ini user data di sidebar", userData);

  // Determine if the user is an admin; default to false if userData or isAdmin is undefined
  const isAdmin = userData ? userData.isAdmin : false;

  useEffect(() => {
    // Determine active button based on current path
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
        setActiveButton(""); // Default or empty if not matched
    }
  }, [location.pathname]); // Update when location changes

  // Hide the sidebar if the route is /Article or /Certificate
  const hideSidebar = location.pathname === "/Article" || location.pathname === "/Certificate";

  if (hideSidebar) {
    return null; // Don't render the sidebar
  }

  return (
    <div className="sidebar">
      <Link to="/">
        <button
          id="side-button-sidebar"
          className={activeButton === "Home" ? "active" : ""}
          onClick={() => setActiveButton("Home")}
        >
          <i className="fa-solid fa-house"></i>
          Home
        </button>
      </Link>
      <Link to="/Profile">
        <button
          id="side-button-sidebar"
          className={activeButton === "Profile" ? "active" : ""}
          onClick={() => setActiveButton("Profile")}
        >
          <i className="fa-solid fa-user"></i>
          Profile
        </button>
      </Link>
      <Link to="/Popular">
        <button
          id="side-button-sidebar"
          className={activeButton === "Popular" ? "active" : ""}
          onClick={() => setActiveButton("Popular")}
        >
          <i className="fa-solid fa-fire"></i>
          Popular
        </button>
      </Link>

      {/* Show Voucher and Validate buttons if the user is an admin */}
      {isAdmin && (
        <>
          <Link to="/Voucher">
            <button
              id="side-button-sidebar"
              className={activeButton === "Voucher" ? "active" : ""}
              onClick={() => setActiveButton("Voucher")}
            >
              <i className="fa-solid fa-ticket"></i>
              Voucher
            </button>
          </Link>
          <Link to="/Validate">
            <button
              id="side-button-sidebar"
              className={activeButton === "Validate User" ? "active" : ""}
              onClick={() => setActiveButton("Validate User")}
            >
              <i className="fa-solid fa-circle-check"></i>
              Validate User
            </button>
          </Link>
        </>
      )}
    </div>
  );
}
