import React from "react";
import UserImage from "../../assets/test-profile.svg";
import Send from "../../assets/send-button.svg";
import "./comment-field-box.css";

const CommentFieldBox = ({ onSend }) => {
  return (
    <div className="comment-field-box">
      <div className="user-image">
        <img src={UserImage} alt="User" />
      </div>
      <div className="comment-field">
        <input type="text" placeholder="Write your comment here" />
      </div>
      <div className="comment-field-send-button">
        <button onClick={onSend}>
          <img src={Send} alt="Send Button" />
        </button>
      </div>
    </div>
  );
};

export default CommentFieldBox;
