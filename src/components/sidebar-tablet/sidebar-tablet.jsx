import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./sidebar-tablet.css";
import homeIcon from "../../assets/home.svg";
import profileIcon from "../../assets/profile.svg";
import popularIcon from "../../assets/popular.svg";
import bookmarkIcon from "../../assets/bookmark.svg";

export default function SidebarTablet() {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState("Home");

  useEffect(() => {
    // Update the active button based on the current location pathname
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
      // Add cases for other routes if needed
      default:
        setActiveButton("");
    }
  }, [location.pathname]);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="sidebar-tablet">
      <Link to="/">
        <button
          className={activeButton === "Home" ? "active" : ""}
          onClick={() => handleButtonClick("Home")}
          data-title="Home"
        >
          <img src={homeIcon} alt="Home" className="edit-icon" />
        </button>
      </Link>
      <Link to="/Profile">
        <button
          className={activeButton === "Profile" ? "active" : ""}
          onClick={() => handleButtonClick("Profile")}
          data-title="Profile"
        >
          <img src={profileIcon} alt="Profile" className="edit-icon" />
        </button>
      </Link>
      <Link to="/Popular">
        <button
          className={activeButton === "Popular" ? "active" : ""}
          onClick={() => handleButtonClick("Popular")}
          data-title="Popular"
        >
          <img src={popularIcon} alt="Popular" className="edit-icon" />
        </button>
      </Link>
      {/* <Link to="">
        <button
          className={activeButton === "Bookmarks" ? "active" : ""}
          onClick={() => handleButtonClick("Bookmarks")}
          data-title="Bookmarks"
        >
          <img src={bookmarkIcon} alt="Bookmarks" className="edit-icon" />
        </button>
      </Link> */}
    </div>
  );
}
