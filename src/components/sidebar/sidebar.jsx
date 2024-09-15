import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";
import homeIcon from "../../assets/home.svg";
import profileIcon from "../../assets/profile.svg";
import popularIcon from "../../assets/popular.svg";

export default function Sidebar() {
  const location = useLocation();
  
  return (
    <div className="sidebar">
      <Link to="/">
        <button
          id="side-button-sidebar"
          className={location.pathname === "/" ? "active" : ""}
        >
          <img src={homeIcon} alt="Home" className="edit-icon" />
          Home
        </button>
      </Link>
      <Link to="/Profile">
        <button
          id="side-button-sidebar"
          className={location.pathname === "/Profile" ? "active" : ""}
        >
          <img src={profileIcon} alt="Profile" className="edit-icon" />
          Profile
        </button>
      </Link>
      <Link to="/Popular">
        <button
          id="side-button-sidebar"
          className={location.pathname === "/Popular" ? "active" : ""}
        >
          <img src={popularIcon} alt="Popular" className="edit-icon" />
          Popular
        </button>
      </Link>
      {/* <Link>
        <button
          id="side-button-sidebar"
          className={location.pathname === "/Bookmarks" ? "active" : ""}
        >
          <img src={bookmarkIcon} alt="Bookmarks" className="edit-icon" />
          Bookmarks
        </button>
      </Link> */}
    </div>
  );
}
