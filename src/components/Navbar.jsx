import React from "react";
import "../styles/Navbar.css";
import burgerIcon from "../assets/burger.svg";
import searchInIcon from "../assets/search-in.svg";
import searchIcon from "../assets/search.svg";
import addPostIcon from "../assets/add.svg";

const Navbar = () => {
  return (
    <header className="header">
      <div className="logo-sidebar">
        <a href="/sidebar">
          <img src={burgerIcon} alt="Sidebar Icon" />
        </a>
        <a href="/">
          <div className="logo">Laci</div>
        </a>
      </div>
      <div className="search-container">
        <img src={searchInIcon} alt="Search Icon" />
        <input type="text" placeholder="Search" />
      </div>
      <div className="user-section">
        <div className="user-info">
          <div className="user-name">Edo Mahendra</div>
          <div className="user-university">Universitas Airlangga</div>
        </div>
        <div className="search-icon">
          <a href="/search">
            <img src={searchIcon} alt="Search Icon" />
          </a>
        </div>
        <div className="add-post-article">
          <a href="">
            <img src={addPostIcon} alt="Add Post Icon" />
          </a>
        </div>
        <div className="user-image">
          <a href="/profile">
            <img src="src/assets/sakil.png" alt="User Image" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
