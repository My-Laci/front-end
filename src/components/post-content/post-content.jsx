import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./post-content.css";
import UserImage from "../../assets/test-profile.svg";
import PostImage1 from "../../assets/imagetest1.jpg";
import PostImage2 from "../../assets/imagetest2.jpg";
import PostImage3 from "../../assets/imagetest3.jpg";
import Like from "../../assets/like.svg";
import Comment from "../../assets/comment.svg";
import Repost from "../../assets/repost.svg";
import Bookmark from "../../assets/post-bookmark.svg";
import ImageModal from "../image-modal/image-modal.jsx";

const PostContent = ({ showCommentSection = true }) => {
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

  return (
    <div className="content-card">
      <div className="post-info">
        <div className="user-image">
          <img src={UserImage} alt="User" />
        </div>
        <div className="details-post">
          <div className="user-name">
            Vinsen
            <span className="divider"> | </span>
            <span className="user-instance"> Universitas Airlangga</span>
          </div>
          <div className="date-time-post">10 hours ago</div>
        </div>
      </div>
      <div className="post-text">
        Hari ini adalah hari yang sangat memuaskan bagi saya dan tim. Kami
        berhasil menyelesaikan proyek optimisasi jaringan di wilayah Jakarta
        yang sudah kami kerjakan selama beberapa minggu terakhir. Proyek ini
        melibatkan analisis menyeluruh terhadap area dengan sinyal lemah,
        perencanaan penempatan perangkat tambahan, dan pengujian hasil
        perbaikan. Setelah optimisasi, kualitas sinyal di area tersebut
        meningkat sebesar 20%, yang sangat signifikan untuk meningkatkan
        pengalaman pelanggan. Terima kasih kepada tim yang selalu bekerja keras
        dan memberikan dukungan penuh dalam setiap tahap proyek ini. Pengalaman
        ini benar-benar menambah wawasan dan keterampilan saya dalam bidang
        telekomunikasi.
      </div>
      <div className="post-img">
        <Slider {...settings}>
          <div>
            <img
              src={PostImage1}
              alt="Post Image 1"
              onClick={() => openImageModal(PostImage1)}
            />
          </div>
          <div>
            <img
              src={PostImage2}
              alt="Post Image 2"
              onClick={() => openImageModal(PostImage2)}
            />
          </div>
          <div>
            <img
              src={PostImage3}
              alt="Post Image 3"
              onClick={() => openImageModal(PostImage3)}
            />
          </div>
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
              <img src={UserImage} alt="User" />
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
