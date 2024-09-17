import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./post-content.css";
import Like from "../../assets/like.svg";
import Comment from "../../assets/comment.svg";
import Repost from "../../assets/repost.svg";
import Bookmark from "../../assets/post-bookmark.svg";
import ImageModal from "../image-modal/image-modal.jsx";
import GuestProfile from "../../assets/unknown-profile.svg";
import CreatePost from "../create-post/CreatePost.jsx";
import { format, parseISO } from "date-fns";
import { deletePost } from "../../apis/PostApis.jsx";

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

  const commentInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const popupRef = useRef(null);

  const canEditOrDelete = profile.isAdmin || post.author === profile._id;

  const triggerLikeAnimation = () => {
    setAnimateLike(true);
    setTimeout(() => setAnimateLike(false), 300);
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
    const date = parseISO(dateString);
    return format(date, "dd MMM yyyy 'at' HH:mm");
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
            <img src={post.profileImage || GuestProfile} alt="User" />
          </div>
          <div className="details-post">
            <div className="user-name">
              {post.fullname}
              <span className="divider"> | </span>
              <span className="user-instance">{post.agencyOrigin}</span>
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
          <img src={Like} alt="Like" />
          <div className="text-interaction">Like</div>
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
      {showCommentSection && (
        <>
          <hr />
          <div className="bottom-section">
            <div className="user-image">
              <img src={profile.profileImg || GuestProfile} alt="User" />
            </div>
            <div className="comment-field">
              <input
                type="text"
                placeholder="Write your comment here"
                ref={commentInputRef}
              />
            </div>
          </div>
        </>
      )}
      <ImageModal
        isOpen={isModalOpen}
        imageSrc={modalImageSrc}
        onClose={closeImageModal}
      />
      {isCreatePostOpen && (
        <div className="edit-post-popup" ref={popupRef}>
          <div className="edit-post-content">
            <CreatePost onClose={closeCreatePostPopup} post={post} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostContent;
