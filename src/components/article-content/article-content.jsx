import React from "react";
import UserImage from "../../assets/vinsen.svg";
import ArticleCover from "../../assets/image1.svg";
import Like from "../../assets/like.svg";
import Comment from "../../assets/comment.svg";
import Repost from "../../assets/repost.svg";
import Bookmark from "../../assets/post-bookmark.svg";
import "./article-content.css";

const ArticleContent = () => {
  return (
    <div className="content-card">
      <div className="article-info">
        <div className="user-image">
          <img src={UserImage} alt="User" />
        </div>
        <div className="details-article">
          <div className="user-name">
            Vinsen
            <span className="divider"> | </span>
            <span className="user-instance"> Universitas Airlangga</span>
          </div>
          <div className="date-time-article">10 hours ago</div>
        </div>
      </div>
      <div className="article-img">
        <img src={ArticleCover} alt="Article Image" />
      </div>
      <div className="article-title">
        Peningkatan Kualitas Sinyal Setelah Optimisasi
      </div>
      <div className="article-text">
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
      <div className="post-interactions">
        <button className="interaction">
          <img src={Like} alt="Like" />
          <div className="text-interaction">Like</div>
        </button>
        <button className="interaction">
          <img src={Comment} alt="Comment" />
          <div className="text-interaction">Comment</div>
        </button>
        <button className="interaction">
          <img src={Repost} alt="Repost" />
          <div className="text-interaction">Repost</div>
        </button>
        <button className="interaction">
          <img src={Bookmark} alt="Bookmark" />
          <div className="text-interaction">Bookmark</div>
        </button>
      </div>
      <hr></hr>
      <div className="bottom-section">
        <div className="user-image">
          <img src={UserImage} alt="User" />
        </div>
        <div className="comment-field">
          <input type="text" placeholder="Write your comment here" />
        </div>
      </div>
    </div>
  );
};

export default ArticleContent;
