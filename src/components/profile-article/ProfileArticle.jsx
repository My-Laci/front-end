import React, { useState, useEffect, useRef } from "react";
import "../profile-article/ProfileArticle.css";
import { Link } from "react-router-dom";
import { deleteArticle } from "../../apis/ArticleApis";

export default function ArticleProfile({ article, userId }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown visibility
  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // Handle delete button click
  const handleDelete = async () => {
    // Ask for confirmation
    const isConfirmed = window.confirm("Are you sure you want to delete this article?");
    if (!isConfirmed) {
      return; // Do nothing if the user cancels
    }

    try {
      await deleteArticle(article._id);
      alert("Article deleted successfully");
      // Optionally, you can add logic here to refresh the list or redirect the user
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

  // Check if article and article.image are defined
  if (!article || !article.image) {
    return <div>Loading...</div>; // or any other placeholder you prefer
  }

  return (
    <div className="article">
      <Link to="/Article" className="article-list-link" state={{ article }}>
        <div className="article-thumbnail">
          <img src={article.image.url} alt={article.title} />
          <div className="articles-detail">
            <h5>{article.title}</h5>
            <p>{article.content}</p>
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
            {userId === article.author._id && (
              <button id="article-dropdown-delete" onClick={handleDelete}>
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
