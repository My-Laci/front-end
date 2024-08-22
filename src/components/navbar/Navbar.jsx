import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import burgerIcon from "../../assets/burger.svg";
import searchInIcon from "../../assets/search-in.svg";
import searchIcon from "../../assets/search.svg";
import addPostIcon from "../../assets/add.svg";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
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
    <header className="navbar-header">
      <div className="navbar-section-1">
        <div className="navbar-a"></div>
        <div className="navbar-b">
          <div className="navbar-logo-sidebar">
            <a href="/sidebar">
              <img src={burgerIcon} alt="Sidebar Icon" />
            </a>
            <a href="/">
              <div className="navbar-logo">Laci</div>
            </a>
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
            <div className="navbar-user-name">Edo Mahendra</div>
            <div className="navbar-user-university">Universitas Airlangga</div>
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
                    <a href="/create-article">Create Article</a>
                  </div>
                  <div className="create-post-a">
                    <a href="/create-post">Create Post</a>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="navbar-user-image">
            <a href="/profile">
              <img src="src/assets/ammar.svg" alt="User Image" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
