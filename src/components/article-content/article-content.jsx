import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import UserImage from "../../assets/test-profile.svg";
import Like from "../../assets/like.svg";
import Comment from "../../assets/comment.svg";
import Repost from "../../assets/repost.svg";
import Bookmark from "../../assets/post-bookmark.svg";

import "./article-content.css";

const ArticleContent = () => {
  const [articles, setArticles] = useState([]);
  const [animateLike, setAnimateLike] = useState(null);
  const [animateBookmark, setAnimateBookmark] = useState(null);
  const [animateComment, setAnimateComment] = useState(null);
  const [animateRepost, setAnimateRepost] = useState(null);

  const commentInputRefs = useRef([]);

  useEffect(() => {
    // Fetch articles from the API
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:8080/articles");
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  const triggerLikeAnimation = (index) => {
    setAnimateLike(index);
    setTimeout(() => setAnimateLike(null), 300);
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
      {articles.map((article, index) => (
        <div className="content-card" key={article._id}>
          <div className="article-info">
            <div className="user-image">
              <img src={UserImage} alt="User" />
            </div>
            <div className="details-article">
              <div className="user-name">
                {article.author.name}
                <span className="divider"> | </span>
                <span className="user-instance">
                  {article.author.agencyOrigin}
                </span>
              </div>
              <div className="date-time-article">
                {new Date(article.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
          <div className="article-img">
            <img src={article.image.url} alt="Article Image" />
          </div>
          <div className="article-title">{article.title}</div>
          <div className="article-text">{article.content}</div>
          <div className="post-interactions">
            <button
              className={`interaction ${
                animateLike === index ? "animate" : ""
              }`}
              onClick={() => triggerLikeAnimation(index)}
            >
              <img src={Like} alt="Like" />
              <div className="text-interaction">Like</div>
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
          <hr></hr>
          <div className="bottom-section">
            <div className="user-image">
              <img src={UserImage} alt="User" />
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
      ))}
    </div>
  );
};

export default ArticleContent;
