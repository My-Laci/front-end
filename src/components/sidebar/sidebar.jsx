import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";
import homeIcon from "../../assets/home.svg";
import profileIcon from "../../assets/profile.svg";
import popularIcon from "../../assets/popular.svg";
import bookmarkIcon from "../../assets/bookmark.svg";

export default function Sidebar() {
  const location = useLocation(); // Get current location
  const [activeButton, setActiveButton] = useState("Home");

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
      // Add other cases for additional routes if needed
      default:
        setActiveButton(""); // Default or empty if not matched
    }
  }, [location.pathname]); // Update when location changes

  return (
    <div className="sidebar">
      <Link to="/">
        <button
          id="side-button-sidebar"
          className={activeButton === "Home" ? "active" : ""}
          onClick={() => setActiveButton("Home")}
        >
          <img src={homeIcon} alt="Home" className="edit-icon" />
          Home
        </button>
      </Link>
      <Link to="/Profile">
        <button
          id="side-button-sidebar"
          className={activeButton === "Profile" ? "active" : ""}
          onClick={() => setActiveButton("Profile")}
        >
          <img src={profileIcon} alt="Profile" className="edit-icon" />
          Profile
        </button>
      </Link>
      <Link to="/Popular">
        <button
          id="side-button-sidebar"
          className={activeButton === "Popular" ? "active" : ""}
          onClick={() => setActiveButton("Popular")}
        >
          <img src={popularIcon} alt="Popular" className="edit-icon" />
          Popular
        </button>
      </Link>
      {/* <Link>
        <button
          id="side-button-sidebar"
          className={activeButton === "Bookmarks" ? "active" : ""}
          onClick={() => setActiveButton("Bookmarks")}
        >
          <img src={bookmarkIcon} alt="Bookmarks" className="edit-icon" />
          Bookmarks
        </button>
      </Link> */}
    </div>
  );
}
