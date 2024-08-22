import React, { useState } from "react";
import "./sidebar-tablet.css";
import homeIcon from "../../assets/home.svg";
import profileIcon from "../../assets/profile.svg";
import popularIcon from "../../assets/popular.svg";
import bookmarkIcon from "../../assets/bookmark.svg";

export default function SidebarTablet() {
  const [activeButton, setActiveButton] = useState("Home");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="sidebar-tablet">
      <button
        className={activeButton === "Home" ? "active" : ""}
        onClick={() => handleButtonClick("Home")}
        data-title="Home"
      >
        <img src={homeIcon} alt="Home" className="edit-icon" />
      </button>
      <button
        className={activeButton === "Profile" ? "active" : ""}
        onClick={() => handleButtonClick("Profile")}
        data-title="Profile"
      >
        <img src={profileIcon} alt="Profile" className="edit-icon" />
      </button>
      <button
        className={activeButton === "Popular" ? "active" : ""}
        onClick={() => handleButtonClick("Popular")}
        data-title="Popular"
      >
        <img src={popularIcon} alt="Popular" className="edit-icon" />
      </button>
      <button
        className={activeButton === "Bookmarks" ? "active" : ""}
        onClick={() => handleButtonClick("Bookmarks")}
        data-title="Bookmarks"
      >
        <img src={bookmarkIcon} alt="Bookmarks" className="edit-icon" />
      </button>
    </div>
  );
}
