import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./post-content.css";
import Like from "../../assets/like.svg";
import Comment from "../../assets/comment.svg";
import Repost from "../../assets/repost.svg";
import Bookmark from "../../assets/post-bookmark.svg";
import ImageModal from "../image-modal/image-modal.jsx";
import GuestProfile from "../../assets/unknown-profile.svg"
import { format, parseISO } from "date-fns"; // Import date-fns functions

const PostContent = ({ profile, post, showCommentSection = true }) => {
  console.log("uini post", post);
  const [animateLike, setAnimateLike] = useState(false);
  const [animateBookmark, setAnimateBookmark] = useState(false);
  const [animateComment, setAnimateComment] = useState(false);
  const [animateRepost, setAnimateRepost] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");

  const commentInputRef = useRef(null);

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  // Format the post date
  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return format(date, "dd MMM yyyy 'at' HH:mm");
  };

  return (
    <div className="content-card">
      <div className="post-info">
        <div className="user-image">
          <img src={post.profileImage} alt="User" />
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
      <div className="post-text">{post.caption}</div>
      <div className="post-img">
        <Slider {...settings}>
          {post.imageContent && post.imageContent.length > 0 ? (
            post.imageContent.map((item, index) => (
              <div key={index}>
                <img
                  src={item} // Use `item` as the src for each image
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
              <img src={profile.profileImg || GuestProfile } alt="User" />
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
    </div>
  );
};

export default PostContent;
