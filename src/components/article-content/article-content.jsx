import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserImage from "../../assets/test-profile.svg"; // Default image
import Like from "../../assets/like.svg";
import Comment from "../../assets/comment.svg";
import Repost from "../../assets/repost.svg";
import Bookmark from "../../assets/post-bookmark.svg";
import Liked from "../../assets/liked.svg";

import "./article-content.css";

const ArticleContent = ({ articles = [], profile }) => {
  const [animateLike, setAnimateLike] = useState(null);
  const [animateBookmark, setAnimateBookmark] = useState(null);
  const [animateComment, setAnimateComment] = useState(null);
  const [animateRepost, setAnimateRepost] = useState(null);

  const [likeStatuses, setLikeStatuses] = useState({}); // Store like status per article
  const [likeCounts, setLikeCounts] = useState({});

  const commentInputRefs = useRef([]);

  useEffect(() => {
    // Fetch like status and like count for each article when component mounts
    articles.forEach((article) => {
      checkIfLiked(article._id);
      setLikeCounts((prevState) => ({
        ...prevState,
        [article._id]: article.likeCount || 0,
      }));
    });
  }, [articles]);

  const checkIfLiked = async (articleId) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/articles/${articleId}/isLiked`,
        { credentials: "include" }
      );
      const data = await response.json();
      setLikeStatuses((prevState) => ({
        ...prevState,
        [articleId]: data.isLiked, // Set isLiked from API response
      }));
    } catch (error) {
      console.error("Failed to check like status", error);
    }
  };

  const triggerLikeAnimation = (index, articleId) => {
    const isLiked = likeStatuses[articleId];
    if (isLiked) {
      unlikeArticle(articleId);
    } else {
      likeArticle(articleId);
    }
    setAnimateLike(index);
    setTimeout(() => setAnimateLike(null), 300);
  };

  const likeArticle = async (articleId) => {
    try {
      await axios.post(`http://localhost:8080/articles/${articleId}/like`, {
        method: "POST",
        credentials: "include",
      });
      setLikeStatuses((prevState) => ({
        ...prevState,
        [articleId]: true, // Set liked state
      }));
      setLikeCounts((prevState) => ({
        ...prevState,
        [articleId]: prevState[articleId] + 1,
      }));
    } catch (error) {
      console.error("Failed to like article", error);
    }
  };

  const unlikeArticle = async (articleId) => {
    try {
      await axios.post(`http://localhost:8080/articles/${articleId}/unlike`, {
        method: "POST",
        credentials: "include",
      });
      setLikeStatuses((prevState) => ({
        ...prevState,
        [articleId]: false, // Set unliked state
      }));
      setLikeCounts((prevState) => ({
        ...prevState,
        [articleId]: prevState[articleId] - 1,
      }));
    } catch (error) {
      console.error("Failed to unlike article", error);
    }
  };

  const triggerBookmarkAnimation = (index) => {
    setAnimateBookmark(index);
    setTimeout(() => setAnimateBookmark(null), 300);
  };

  const triggerCommentAnimation = (index) => {
    setAnimateComment(index);
    setTimeout(() => setAnimateComment(null), 300);
    focusCommentField(index);
  };

  const triggerRepostAnimation = (index) => {
    setAnimateRepost(index);
    setTimeout(() => setAnimateRepost(null), 300);
  };

  const focusCommentField = (index) => {
    if (commentInputRefs.current[index]) {
      commentInputRefs.current[index].focus();
    }
  };

  return (
    <div className="content-container">
      {articles.length > 0 ? (
        articles.map((article, index) => (
          <div className="content-card" key={article._id}>
            <div className="article-info">
              <div className="user-image">
                <img src={article.author?.profileImg || UserImage} alt="User" />
              </div>
              <div className="details-article">
                <div className="user-name">
                  {article.author?.name || "Unknown Author"}
                  <span className="divider"> | </span>
                  <span className="user-instance">
                    {article.author?.agencyOrigin || "Unknown Agency"}
                  </span>
                </div>
                <div className="date-time-article">
                  {new Date(article.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
            <Link to="/Article" state={{ article }}>
              <div className="article-img">
                <img src={article.image?.url || UserImage} alt="Article" />
              </div>
              <div className="article-title">{article.title}</div>
              <div
                className="article-text"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </Link>
            <div className="post-interactions">
              <button
                className={`interaction ${
                  animateLike === index ? "animate" : ""
                }`}
                onClick={() => triggerLikeAnimation(index, article._id)}
              >
                <img
                  src={likeStatuses[article._id] ? Liked : Like}
                  alt={likeStatuses[article._id] ? "Liked" : "Like"}
                />
                <div className="text-interaction">
                  {likeCounts[article._id] || 0}
                  {/* <div className="space"></div> */}
                  {likeStatuses[article._id] ? " Liked" : " Like"}
                </div>
                {/* <span className="like-count">
                  {likeCounts[article._id] || 0}
                </span> */}
              </button>
              <button
                className={`interaction ${
                  animateComment === index ? "animate" : ""
                }`}
                onClick={() => triggerCommentAnimation(index)}
              >
                <img src={Comment} alt="Comment" />
                <div className="text-interaction">Comment</div>
              </button>
              <button
                className={`interaction ${
                  animateRepost === index ? "animate" : ""
                }`}
                onClick={() => triggerRepostAnimation(index)}
              >
                <img src={Repost} alt="Repost" />
                <div className="text-interaction">Repost</div>
              </button>
              <button
                className={`interaction ${
                  animateBookmark === index ? "animate" : ""
                }`}
                onClick={() => triggerBookmarkAnimation(index)}
              >
                <img src={Bookmark} alt="Bookmark" />
                <div className="text-interaction">Bookmark</div>
              </button>
            </div>
            <hr />
            <div className="bottom-section">
              <div className="user-image">
                <img src={profile.profileImg || UserImage} alt="User" />
              </div>
              <div className="comment-field">
                <input
                  type="text"
                  placeholder="Write your comment here"
                  ref={(el) => (commentInputRefs.current[index] = el)}
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No articles available</p>
      )}
    </div>
  );
};

export default ArticleContent;
