/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./post-content.css";
import Like from "../../assets/like.svg";
import Liked from "../../assets/liked.svg"; // Icon untuk like aktif
import Comment from "../../assets/comment.svg";
import Repost from "../../assets/repost.svg";
import Bookmark from "../../assets/post-bookmark.svg";
import ImageModal from "../image-modal/image-modal.jsx";
import GuestProfile from "../../assets/unknown-profile.svg";
import CreatePost from "../create-post/CreatePost.jsx";
import { format, parseISO } from "date-fns";
import { deletePost } from "../../apis/PostApis.jsx";
import { useNavigate } from "react-router-dom";

const PostContent = ({
  profile,
  post,
  showCommentSection = true,
  onDelete,
}) => {
  const [animateLike, setAnimateLike] = useState(false);
  const [animateBookmark, setAnimateBookmark] = useState(false);
  const [animateComment, setAnimateComment] = useState(false);
  const [animateRepost, setAnimateRepost] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  const [isLiked, setIsLiked] = useState(post.likes.includes(profile._id)); // Cek apakah user sudah like
  const [likeCount, setLikeCount] = useState(post.likes.length); // Menyimpan jumlah likes

  const commentInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const popupRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLiked(post.likes.includes(profile._id)); // Cek apakah user sudah like
    setLikeCount(post.likes.length); // Set jumlah likes
  }, [post.likes, profile._id]);

  const goToPostDetail = () => {
    navigate(`/post/${post._id}`);
  };

  const canEditOrDelete =
    profile?.isAdmin == true || post?.author._id === profile?._id;

  const handleLikeClick = async () => {
    try {
      if (isLiked) {
        // Unlike post
        await axios.post(`http://localhost:8080/posts/${post._id}/unlike`, {
          userId: profile._id,
        });
        setIsLiked(false);
        setLikeCount(likeCount - 1);
      } else {
        // Like post
        await axios.post(`http://localhost:8080/posts/${post._id}/like`, {
          userId: profile._id,
        });
        setIsLiked(true);
        setLikeCount(likeCount + 1);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const triggerLikeAnimation = () => {
    setAnimateLike(true);
    setTimeout(() => setAnimateLike(false), 300);
    handleLikeClick(); // Panggil fungsi handleLikeClick saat user menekan like
  };

  const triggerBookmarkAnimation = () => {
    setAnimateBookmark(true);
    setTimeout(() => setAnimateBookmark(false), 300);
  };

  const triggerCommentAnimation = () => {
    setAnimateComment(true);
    setTimeout(() => setAnimateComment(false), 300);
    focusCommentField();
  };

  const triggerRepostAnimation = () => {
    setAnimateRepost(true);
    setTimeout(() => setAnimateRepost(false), 300);
  };

  const focusCommentField = () => {
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  };

  const openImageModal = (imageSrc) => {
    setModalImageSrc(imageSrc);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
    setModalImageSrc("");
  };

  const openCreatePostPopup = () => {
    setIsCreatePostOpen(true);
  };

  const closeCreatePostPopup = () => {
    setIsCreatePostOpen(false);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown Date"; // Jika dateString undefined atau null, kembalikan teks default
    try {
      const date = parseISO(dateString);
      return format(date, "dd MMM yyyy 'at' HH:mm");
    } catch (error) {
      console.error("Invalid date format:", error);
      return "Invalid Date";
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsCreatePostOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDeleteClick = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(post._id);
        if (onDelete) {
          onDelete(post._id);
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  return (
    <div className="content-card">
      <div className="post-info">
        <div className="post-info-container">
          <div className="user-image">
            <img src={post.author?.profileImg || GuestProfile} alt="User" />
          </div>
          <div className="details-post">
            <div className="user-name">
              {post.author.name}
              <span className="divider"> | </span>
              <span className="user-instance">{post.author.agencyOrigin}</span>
            </div>
            <div className="date-time-post">{formatDate(post.createdAt)}</div>
          </div>
        </div>
        <div className="post-info-drop-down" onClick={toggleDropdown}>
          <i className="fa-solid fa-ellipsis-vertical"></i>
          <div
            className={`post-info-drop-down-menu ${
              dropdownVisible ? "visible" : ""
            }`}
            ref={dropdownRef}
          >
            <button>Share</button>
            <button>Report</button>
            {canEditOrDelete && (
              <>
                <button onClick={openCreatePostPopup}>Edit</button>
                <button id="post-info-delete" onClick={handleDeleteClick}>
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="post-text">{post.caption}</div>
      <div className="post-tags">
        {post.tag && post.tag.length > 0
          ? post.tag.map((item, index) => (
              <React.Fragment key={index}>
                <span className="tag">#{item}</span>
                {index < post.tag.length - 1 && " "}{" "}
              </React.Fragment>
            ))
          : null}{" "}
      </div>

      <div className="post-img">
        <Slider {...settings}>
          {post.imageContent && post.imageContent.length > 0 ? (
            post.imageContent.map((item, index) => (
              <div key={index}>
                <img
                  src={item}
                  alt={`Post Image ${index + 1}`}
                  onClick={() => openImageModal(item)}
                />
              </div>
            ))
          ) : (
            <p>No images available</p>
          )}
        </Slider>
      </div>
      <div className="post-interactions">
        <button
          className={`interaction ${animateLike ? "animate" : ""}`}
          onClick={triggerLikeAnimation}
        >
          <img src={isLiked ? Liked : Like} alt="Like" />
          <div className="text-interaction">{likeCount} Likes</div>
        </button>
        <button
          className={`interaction ${animateComment ? "animate" : ""}`}
          onClick={triggerCommentAnimation}
        >
          <img src={Comment} alt="Comment" />
          <div className="text-interaction">Comment</div>
        </button>
        <button
          className={`interaction ${animateRepost ? "animate" : ""}`}
          onClick={triggerRepostAnimation}
        >
          <img src={Repost} alt="Repost" />
          <div className="text-interaction">Repost</div>
        </button>
        <button
          className={`interaction ${animateBookmark ? "animate" : ""}`}
          onClick={triggerBookmarkAnimation}
        >
          <img src={Bookmark} alt="Bookmark" />
          <div className="text-interaction">Bookmark</div>
        </button>
      </div>
      {isCreatePostOpen && (
        <div className="post-content-popup-overlay">
          <CreatePost
            isOpen={isCreatePostOpen}
            onClose={closeCreatePostPopup}
            post={post}
            isEditing={true}
          />
        </div>
      )}
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeImageModal}
        imageSrc={modalImageSrc}
      />
    </div>
  );
};

export default PostContent;
