import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./sidebar-phone.css";

const SidebarPhone = ({ isOpen, toggleSidebar, userData }) => {
  const [activeButton, setActiveButton] = useState("Home");
  const navigate = useNavigate(); // Hook to handle navigation

  // Determine if the user is an admin; default to false if userData or isAdmin is undefined
  const isAdmin = userData ? userData.isAdmin : false;

  const handleButtonClick = (buttonName, path) => {
    setActiveButton(buttonName);
    navigate(path); // Navigate to the given path
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
        <button
          className={activeButton === "Home" ? "active" : ""}
          onClick={() => handleButtonClick("Home", "/")}
        >
          <i className="fa-solid fa-house"></i>
          Home
        </button>
        <button
          className={activeButton === "Profile" ? "active" : ""}
          onClick={() => handleButtonClick("Profile", "/Profile")}
        >
          <i className="fa-solid fa-user"></i>
          Profile
        </button>
        <button
          className={activeButton === "Popular" ? "active" : ""}
          onClick={() => handleButtonClick("Popular", "/Popular")}
        >
          <i className="fa-solid fa-fire"></i>
          Popular
        </button>

        {/* Show Voucher and Validate buttons only if the user is an admin */}
        {isAdmin && (
          <>
            <button
              className={activeButton === "Voucher" ? "active" : ""}
              onClick={() => handleButtonClick("Voucher", "/Voucher")}
            >
              <i className="fa-solid fa-ticket"></i>
              Voucher
            </button>
            <button
              className={activeButton === "Validate" ? "active" : ""}
              onClick={() => handleButtonClick("Validate", "/Validate")}
            >
              <i className="fa-solid fa-circle-check"></i>
              Validate User
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SidebarPhone;
