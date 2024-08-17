import React, { useState, useRef } from "react";
import "./post-content.css"; // Correct relative path for the CSS file
import UserImage from "../../assets/vinsen.svg";
import PostImage1 from "../../assets/image1.svg";
import PostImage2 from "../../assets/image2.svg";
import Like from "../../assets/like.svg";
import Comment from "../../assets/comment.svg";
import Repost from "../../assets/repost.svg";
import Bookmark from "../../assets/post-bookmark.svg";

const PostContent = () => {
  const [animateLike, setAnimateLike] = useState(false);
  const [animateBookmark, setAnimateBookmark] = useState(false);

  const commentInputRef = useRef(null);

  const triggerLikeAnimation = () => {
    setAnimateLike(true);
    setTimeout(() => setAnimateLike(false), 300);
  };

  const triggerBookmarkAnimation = () => {
    setAnimateBookmark(true);
    setTimeout(() => setAnimateBookmark(false), 300);
  };

  const focusCommentField = () => {
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
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
        <img src={PostImage1} alt="Post Image" />
        <img src={PostImage2} alt="Post Image" />
      </div>
      <div className="post-interactions">
        <button
          className={`interaction ${animateLike ? "animate" : ""}`}
          onClick={triggerLikeAnimation}
        >
          <img src={Like} alt="Like" />
          <div className="text-interaction">Like</div>
        </button>
        <button className="interaction" onClick={focusCommentField}>
          <img src={Comment} alt="Comment" />
          <div className="text-interaction">Comment</div>
        </button>
        <button className="interaction">
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
    </div>
  );
};

export default PostContent;
