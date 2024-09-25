import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

  // State untuk menyimpan data postingan
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/post/detail/${postId}`
        );
        setPost(response.data);
        console.log(response.data);
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
      <Navbar />
      <div className="container">
        <Sidebar />
        <div className="content">
          <div className="return-section">
            <button>
              <img src={BackButton2} alt="Back Button" />
              <p>Back</p>
            </button>
          </div>

          {/* Kolom komentar */}
          <CommentFieldBox />

          {/* Konten Postingan */}
          <PostContent post={post} showCommentSection={false} />

          {/* Komentar pada postingan */}
          <PostComment />
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
