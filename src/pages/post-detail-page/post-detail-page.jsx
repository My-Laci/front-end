import React from "react";
import BackButton2 from "../../assets/back-button2.svg";
import Navbar from "../../components/navbar/Navbar.jsx";
import CommentFieldBox from "../../components/comment-field-box/comment-field-box.jsx";
import Sidebar from "../../components/sidebar/sidebar.jsx";
import SidebarTablet from "../../components/sidebar-tablet/sidebar-tablet.jsx";
import PostContent from "../../components/post-content/post-content.jsx";
import PostComment from "../../components/post-comment/post-comment.jsx";
import "./post-detail-page.css";

const PostDetailPage = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="container">
        <div className="content">
          <div className="return-section">
            <button onClick={{}}>
              <img src={BackButton2} alt="Back Button" />
              <p>Back</p>
            </button>
          </div>
          <CommentFieldBox />
          <PostContent showCommentSection={false} />
          <PostComment />
        </div>
        <SidebarTablet />
        <div className="third-part"></div>
      </div>
    </>
  );
};

export default PostDetailPage;
