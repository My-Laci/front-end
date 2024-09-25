import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "./Navbar.css";
import burgerIcon from "../../assets/burger.svg";
import searchInIcon from "../../assets/search-in.svg";
import searchIcon from "../../assets/search.svg";
import addPostIcon from "../../assets/add.svg";
import SidebarPhone from "../sidebar-phone/sidebar-phone.jsx";
import GuestProfile from "../../assets/unknown-profile.svg"; // Ensure this path is correct

const Navbar = ({ userData }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      // Navigate to search results page with the query
      navigate(`/search?q=${searchQuery}`);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  return (
    <>
      <header className="navbar-header">
        <div className="navbar-section-1">
          <div className="navbar-a"></div>
          <div className="navbar-b">
            <div className="navbar-logo-sidebar">
              <button className="sidebar-toggle" onClick={toggleSidebar}>
                <img src={burgerIcon} alt="Sidebar Icon" />
              </button>
              <Link to="/">
                <div className="navbar-logo">Laci</div>
              </Link>
            </div>
          </div>
        </div>
        <div className="navbar-section-2">
          <div className="navbar-search-container">
            <img src={searchInIcon} alt="Search Icon" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchInputChange}
              onKeyPress={handleSearchKeyPress} // Trigger search on Enter
            />
          </div>
        </div>
        <div className="navbar-section-3">
          {userData ? (
            <div className="navbar-user-section">
              <div className="navbar-user-info">
                <div className="navbar-user-name">
                  {userData ? userData.name : "Guest"}
                </div>
                <div className="navbar-user-university">
                  {userData ? userData.agencyOrigin : "Guest Campus"}
                </div>
              </div>
              <div className="navbar-search-icon">
                <a href="/search">
                  <img src={searchIcon} alt="Search Icon" />
                </a>
              </div>
              <div className="navbar-add-post-article">
                <div className="dropdown-container" ref={dropdownRef}>
                  <button className="dropdown-toggle" onClick={toggleDropdown}>
                    <img src={addPostIcon} alt="Add Post Icon" />
                  </button>
                  {dropdownOpen && (
                    <div
                      className={`dropdown-menu ${dropdownOpen ? "" : "exit"}`}
                    >
                      <div className="create-article-a">
                        <a href="/createarticle">Create Article</a>
                      </div>
                      <div className="create-post-a">
                        <a href="/createpost">Create Post</a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="navbar-user-image">
                <Link to="/Profile">
                  <img
                    src={
                      userData && userData.profileImg
                        ? userData.profileImg
                        : GuestProfile
                    }
                    alt="User Image"
                  />
                </Link>
              </div>
            </div>
          ) : (
            <div className="navbar-login-register">
              <Link id="navbar-login" to="/Login">
                Login
              </Link>
              <Link id="navbar-regist" to="/Register">
                Register
              </Link>
            </div>
          )}
        </div>
      </header>
      <SidebarPhone
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        userData={userData}
      />
    </>
  );
};

export default Navbar;
