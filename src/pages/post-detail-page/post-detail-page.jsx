import React, { useState, useEffect } from "react";
import BackButton2 from "../../assets/back-button2.svg";
import Navbar from "../../components/navbar/Navbar.jsx";
import CommentFieldBox from "../../components/comment-field-box/comment-field-box.jsx";
import Sidebar from "../../components/sidebar/sidebar.jsx";
import SidebarTablet from "../../components/sidebar-tablet/sidebar-tablet.jsx";
import PostContent from "../../components/post-content/post-content.jsx";
import PostComment from "../../components/post-comment/post-comment.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";
// import Cookies from "js-cookie";
import "./post-detail-page.css";

const PostDetailPage = () => {
  const { postId } = useParams(); // Ambil postId dari URL
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/posts/${postId}`
        );
        setPost(response.data); // Set data post
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container">
        <div className="content">
          <div className="return-section">
            <button onClick={goBack}>
              <img src={BackButton2} alt="Back Button" />
              <p>Back</p>
            </button>
          </div>
          <CommentFieldBox />
          <PostContent
            post={post}
            profile={profile}
            showCommentSection={false}
          />
          <PostComment />
        </div>
        <SidebarTablet />
        <div className="third-part"></div>
      </div>
    </>
  );
};

export default PostDetailPage;
