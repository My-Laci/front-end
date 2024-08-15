// import React from "react";
import "./Navbar.css";
import burgerIcon from "../../assets/burger.svg";
import searchInIcon from "../../assets/search-in.svg";
import searchIcon from "../../assets/search.svg";
import addPostIcon from "../../assets/add.svg";

const Navbar = () => {
  return (
    <header className="navbar-header">
      <div className="navbar-section-1">
        <div className="navbar-logo-sidebar">
          <a href="/sidebar">
            <img src={burgerIcon} alt="Sidebar Icon" />
          </a>
          <a href="/">
            <div className="navbar-logo">Laci</div>
          </a>
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
            <a href="">
              <img src={addPostIcon} alt="Add Post Icon" />
            </a>
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
