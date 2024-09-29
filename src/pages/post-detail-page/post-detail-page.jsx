import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import Navbar from "../../components/navbar/Navbar.jsx";
import CommentFieldBox from "../../components/comment-field-box/comment-field-box.jsx";
import Sidebar from "../../components/sidebar/sidebar.jsx";
import SidebarTablet from "../../components/sidebar-tablet/sidebar-tablet.jsx";
import PostContent from "../../components/post-content/post-content.jsx";
import PostComment from "../../components/post-comment/post-comment.jsx";
import BackButton2 from "../../assets/back-button2.svg";
import "./post-detail-page.css";

const PostDetailPage = () => {
  // Mengambil postId dari URL
  const { postId } = useParams();
  const navigate = useNavigate(); // Initialize the navigate function

  // State untuk menyimpan data postingan
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/post/detail/${postId}`
        );
        setPost(response.data.getData); // Assuming post data is inside getData
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [postId]);

  // Jika data post masih loading
  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="post-detail-container">
        <div className="post-detail-content">
          <div className="return-section">
            <button onClick={() => navigate(-1)}>
              {" "}
              {/* Use navigate(-1) to go back */}
              <img src={BackButton2} alt="Back Button" />
            </button>
          </div>

          {/* Kolom komentar */}
          <CommentFieldBox />

          {/* Konten Postingan */}
          <PostContent post={post} showCommentSection={false} />

          {/* Komentar pada postingan */}
          <PostComment postId={post._id} />
        </div>

        {/* Sidebar versi tablet */}
        <SidebarTablet />

        {/* Elemen tambahan */}
        <div className="third-part"></div>
      </div>
    </>
  );
};

export default PostDetailPage;
