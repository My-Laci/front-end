import React, { useState, useRef, useEffect } from "react";
import "./sidebar-phone.css";
import homeIcon from "../../assets/home.svg";
import profileIcon from "../../assets/profile.svg";
import popularIcon from "../../assets/popular.svg";
import bookmarkIcon from "../../assets/bookmark.svg";

const SidebarPhone = ({ isOpen, toggleSidebar }) => {
  const [activeButton, setActiveButton] = useState("Home");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  const sidebarRef = useRef(null);

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      toggleSidebar();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={sidebarRef} className={`sidebar-phone ${isOpen ? "open" : ""}`}>
      <div className="sidebar-phone-logo">Laci</div>
      <div className="sidebar-phone-content">
        {/* <button
          onClick={() => toggleSidebar()}
          className="sidebar-phone-close-button"
        >
          &times;
        </button> */}
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
    </div>
  );
};

export default SidebarPhone;
