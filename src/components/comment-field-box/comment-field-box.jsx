import React, { useState } from "react";
import UserImage from "../../assets/test-profile.svg";
import GuestProfile from "../../assets/unknown-profile.svg";
import Send from "../../assets/send-button.svg";
import "./comment-field-box.css";

const CommentFieldBox = ({ profile, onSend }) => {
  const [comment, setComment] = useState("");

  const handleSendClick = () => {
    if (comment.trim()) {
      onSend(comment); // Call the onSend function with the comment
      setComment(""); // Clear the input after sending the comment
    }
  };

  return (
    <div className="comment-field-box">
      <div className="user-image">
        <img src={profile?.profileImg || GuestProfile} alt="User" />
      </div>
      <div className="comment-field">
        <input
          type="text"
          placeholder="Write your comment here"
          value={comment}
          onChange={(e) => setComment(e.target.value)} // Handle comment input change
        />
      </div>
      <div className="comment-field-send-button">
      <button onClick={handleSendClick}>
          <img src={Send} alt="Send Button" />
        </button>
      </div>
    </div>
  );
};

export default CommentFieldBox;
