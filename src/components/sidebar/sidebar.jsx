import React, { useState } from "react";
import "./sidebar.css";
import homeIcon from "../../assets/home.svg";
import profileIcon from "../../assets/profile.svg";
import popularIcon from "../../assets/popular.svg";
import bookmarkIcon from "../../assets/bookmark.svg";

export default function Sidebar() {
  const [activeButton, setActiveButton] = useState("Home");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="sidebar">
      <button
        className={activeButton === "Home" ? "active" : ""}
        onClick={() => handleButtonClick("Home")}
      >
        <img src={homeIcon} alt="Home" className="edit-icon" />
        Home
      </button>
      <button
        className={activeButton === "Profile" ? "active" : ""}
        onClick={() => handleButtonClick("Profile")}
      >
        <img src={profileIcon} alt="Profile" className="edit-icon" />
        Profile
      </button>
      <button
        className={activeButton === "Popular" ? "active" : ""}
        onClick={() => handleButtonClick("Popular")}
      >
        <img src={popularIcon} alt="Popular" className="edit-icon" />
        Popular
      </button>
      <button
        className={activeButton === "Bookmarks" ? "active" : ""}
        onClick={() => handleButtonClick("Bookmarks")}
      >
        <img src={bookmarkIcon} alt="Bookmarks" className="edit-icon" />
        Bookmarks
      </button>
    </div>
  );
}
