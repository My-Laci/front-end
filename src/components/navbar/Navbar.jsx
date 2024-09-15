import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "./Navbar.css";
import burgerIcon from "../../assets/burger.svg";
import searchInIcon from "../../assets/search-in.svg";
import searchIcon from "../../assets/search.svg";
import addPostIcon from "../../assets/add.svg";
import SidebarPhone from "../sidebar-phone/sidebar-phone.jsx";
import GuestProfile from "../../assets/unknown-profile.svg"; // Ensure this path is correct

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null); // State to hold user info
  const dropdownRef = useRef(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = Cookies.get("token");

        if (token) {
          // Token exists, decode and fetch user profile
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
          const userId = decodedToken.payload.id;

          // Fetch user profile
          const profileResponse = await axios.get(`http://localhost:8080/users/${userId}`);
          console.log("iki profilemu navbar su", profileResponse.data)
          setUser(profileResponse.data); // Set profile data
        } else {
          // No token means guest
          setUser({ name: "Guest", agencyOrigin: "Guest Campus" }); // Adjust agencyOrigin if needed
        }
      } catch (error) {
        console.error("Failed to check user", error);
        setUser({ name: "Guest", agencyOrigin: "Guest Campus" }); // Fallback for errors
      }
    };

    checkUser();
  }, []);

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
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div className="navbar-section-3">
          <div className="navbar-user-section">
            <div className="navbar-user-info">
              <div className="navbar-user-name">
                {user ? user.name : "Guest"}
              </div>
              <div className="navbar-user-university">
                {user ? user.agencyOrigin : "Guest Campus"}
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
                  <div className={`dropdown-menu ${dropdownOpen ? "" : "exit"}`}>
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
                <img src={user && user.profileImg ? user.profileImg : GuestProfile} alt="User Image" />
              </Link>
            </div>
          </div>
        </div>
      </header>
      <SidebarPhone isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Navbar;
