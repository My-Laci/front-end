import React from "react";
import PropTypes from "prop-types";
import "./comment-strip.css";

const CommentStrip = ({ userImage, userName, commentText }) => {
  return (
    <div className="post-comments">
      <div className="post-comment-user-image">
        <img src={userImage} alt="User" />
      </div>
      <div className="post-comment-text-section">
        <h3>{userName}</h3>
        <p>{commentText}</p>
      </div>
    </div>
  );
};

CommentStrip.propTypes = {
  userImage: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  commentText: PropTypes.string.isRequired,
};

export default CommentStrip;
