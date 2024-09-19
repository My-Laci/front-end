import React, { useState, useEffect, useRef } from "react";
import "./search-result.css";

const SearchResults = ({ results, userId }) => {
  const [visibleDropdownIndex, setVisibleDropdownIndex] = useState(null);
  const dropdownRefs = useRef([]);

  // Toggle dropdown visibility for a specific article
  const handleDropdownToggle = (index) => {
    setVisibleDropdownIndex(visibleDropdownIndex === index ? null : index);
  };

  // Handle delete button click
  const handleDelete = async (articleId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this article?"
    );
    if (!isConfirmed) {
      return; // Do nothing if the user cancels
    }

    try {
      await deleteArticle(articleId);
      alert("Article deleted successfully");
      // Optionally, refresh the list or redirect the user
    } catch (error) {
      alert("Failed to delete article");
    }
  };

  // Handle clicks outside of any dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRefs.current &&
        !dropdownRefs.current.some((ref) => ref && ref.contains(event.target))
      ) {
        setVisibleDropdownIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="search-results">
      {results.articles.length > 0 && (
        <div className="search-category">
          <h2>Articles</h2>
          {results.articles.map((article, index) => (
            <div key={article._id} className="search-item">
              <img
                src={article.image}
                alt={article.title}
                className="search-item-image"
              />
              <div className="search-item-content">
                <h3>{article.title}</h3>
                <div className="search-item-content-caption">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: article.content.substring(0, 100) + "...",
                    }}
                  />
                </div>
              </div>
              <div
                className="search-article-dropdown"
                ref={(el) => (dropdownRefs.current[index] = el)}
              >
                <i
                  className="fa-solid fa-ellipsis-vertical"
                  onClick={() => handleDropdownToggle(index)}
                ></i>
                {visibleDropdownIndex === index && (
                  <div className="search-article-dropdown-menu">
                    <button>Share</button>
                    <button>Report</button>
                    <button>Edit</button>
                    {userId === article.author._id && (
                      <button
                        id="search-article-dropdown-delete"
                        onClick={() => handleDelete(article._id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {results.posts.length > 0 && (
        <div className="search-category">
          <h2>Posts</h2>
          {results.posts.map((post) => (
            <div key={post._id} className="search-item">
              <img
                src={post.imageContent[0]} // Displaying the first image from the imageContent array
                alt={post.caption}
                className="search-item-image"
              />
              <div className="search-item-content">
                <h3>{post.fullname}</h3>
                <div className="search-item-content-agency">
                  <p>{post.agencyOrigin}</p>
                </div>
                <div className="search-item-content-caption">
                  <p>{post.caption}</p>
                </div>
                <div className="search-item-content-tags">
                  <p>{post.tag.join(", ")}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {results.users.length > 0 && (
        <div className="search-category">
          <h2>Users</h2>
          {results.users.map((user) => (
            <div key={user._id} className="search-item">
              <img
                src={user.profileImg}
                alt={user.name}
                className="search-item-image"
              />
              <div className="search-item-content">
                <h3>{user.name}</h3>
                <div className="search-item-content-agency">
                  <p>{user.agencyOrigin}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
