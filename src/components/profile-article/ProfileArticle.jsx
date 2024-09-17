import React, { useState, useEffect, useRef } from "react";
import "../profile-article/ProfileArticle.css";
import { Link } from "react-router-dom";
import { deleteArticle } from "../../apis/ArticleApis";
import CreateArticle from "../create-article/CreateArticle";

export default function ArticleProfile({ article, profile }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false); // State for popup visibility
  const dropdownRef = useRef(null);

  // Check if the logged-in user is the author or an admin
  const isAuthorOrAdmin =
    profile._id === article.author._id || profile.isAdmin === true;

  // Toggle dropdown visibility
  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // Handle delete button click
  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this article?"
    );
    if (!isConfirmed) {
      return;
    }

    try {
      await deleteArticle(article._id);
      alert("Article deleted successfully");
    } catch (error) {
      alert("Failed to delete article");
    }
  };

  // Handle clicks outside of the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!article || !article.image) {
    return <div>Loading...</div>;
  }

  return (
    <div className="article">
      <Link to="/Article" className="article-list-link" state={{ article }}>
        <div className="article-thumbnail">
          <img src={article.image.url} alt={article.title} />
          <div className="articles-detail">
            <h5>{article.title}</h5>
            <p
              dangerouslySetInnerHTML={{
                __html: article.content.substring(0, 300) + "...",
              }}
            />
          </div>
        </div>
      </Link>

      <div className="article-dropdown" ref={dropdownRef}>
        <i
          className="fa-solid fa-ellipsis-vertical"
          onClick={handleDropdownToggle}
        ></i>
        {dropdownVisible && (
          <div className="article-dropdown-menu">
            <button>Share</button>
            <button>Report</button>
            {isAuthorOrAdmin && (
              <>
                <button onClick={() => setPopupVisible(true)}>Edit</button>
                <button id="article-dropdown-delete" onClick={handleDelete}>
                  Delete
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Popup for CreateArticle component */}
      {popupVisible && (
        <div className="popup-overlay" onClick={() => setPopupVisible(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            {/* Pass article as a prop to CreateArticle */}
            <CreateArticle
              onClose={() => setPopupVisible(false)}
              article={article} // Pass article data for editing
            />
          </div>
        </div>
      )}
    </div>
  );
}
