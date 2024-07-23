import "../styles/post-content.css";
import UserImage from "../assets/vinsen.svg";
import PostImage1 from "../assets/image1.svg";
import PostImage2 from "../assets/image2.svg";
import Like from "../assets/like.svg";
import Comment from "../assets/comment.svg";
import Repost from "../assets/repost.svg";
import Bookmark from "../assets/post-bookmark.svg";

const PostContent = () => {
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
        <div className="interaction">
          <img src={Like} />
          <div className="text-interaction">Like</div>
        </div>
        <div className="interaction">
          <img src={Comment} />
          <div className="text-interaction">Comment</div>
        </div>
        <div className="interaction">
          <img src={Repost} />
          <div className="text-interaction">Repost</div>
        </div>
        <div className="interaction">
          <img src={Bookmark} />
          <div className="text-interaction">Bookmark</div>
        </div>
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

export default PostContent;
