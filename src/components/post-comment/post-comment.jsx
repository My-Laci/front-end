import React from "react";
import UnknownProfile from "../../assets/unknown-profile.svg";
import CommentStrip from "../../components/comment-strip/comment-strip.jsx";
import "./post-comment.css";

const PostComment = () => {
  const comments = [
    // {
    //   userImage: "",
    //   userName: "Budiono Siregar",
    //   commentText: "What a great job Vinsen! You are the best",
    // },
  ];

  if (comments.length === 0) {
    return (
      <div className="post-comment-container">
        <p>Be the first to comment!</p>
      </div>
    );
  }

  return (
    <div className="post-comment-container">
      {comments.map((comment, index) => (
        // setelan defaul untuk value yang kosong
        <CommentStrip
          key={index}
          userImage={comment.userImage || UnknownProfile}
          userName={comment.userName || "Anonymous"}
          commentText={comment.commentText || "No comment text available"}
        />
      ))}
    </div>
  );
};

export default PostComment;
