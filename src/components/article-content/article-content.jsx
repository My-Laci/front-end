import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Impor Link dari react-router-dom
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

  const [isLiked, setIsLiked] = useState(
    articles.likes?.includes(profile._id) || false
  );
  const [likeCount, setLikeCount] = useState(articles.likes?.length || 0);

  const commentInputRefs = useRef([]);

  useEffect(() => {
    setIsLiked(articles.likes?.includes(profile._id) || false); // Check if user has liked
    setLikeCount(articles.likes?.length || 0); // Set like count
  }, [articles.likes, profile._id]);

  const handleLikeClick = async () => {
    try {
      if (isLiked) {
        // Unlike post
        await axios.post(
          `http://localhost:8080/articles/${articles._id}/unlike`,
          {
            userId: profile._id,
          }
        );
        setIsLiked(false);
        setLikeCount(likeCount - 1);
      } else {
        // Like post
        await axios.post(
          `http://localhost:8080/articles/${articles._id}/like`,
          {
            userId: profile._id,
          }
        );
        setIsLiked(true);
        setLikeCount(likeCount + 1);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const triggerLikeAnimation = (index) => {
    setAnimateLike(index);
    setTimeout(() => setAnimateLike(null), 300);
    handleLikeClick();
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
              {/* Tambahkan Link di sini */}
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
                onClick={() => triggerLikeAnimation(index)}
              >
                <img src={isLiked ? Liked : Like} alt="Like" />
                <div className="text-interaction">{likeCount} Likes</div>
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
