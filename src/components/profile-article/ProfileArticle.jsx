import "../profile-article/ProfileArticle.css";
import { Link } from "react-router-dom";

export default function ArticleProfile() {
  return (
    <>
      <Link to="/Article" className="article-list-link">
        <div className="article">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnv7w7ucSs7oFZr2IEj0iCY7y_PXV87c2o1A&s"
            alt=""
          />
          <div className="articles-detail">
            <h3>Akhirnya Ketemu! Vincent Bertemu Pak Vinsen</h3>
            <p>
              Hari ini adalah hari yang sangat memuaskan bagi saya dan tim. Kami
              berhasil menyelesaikan proyek optimisasi jaringan di wilayah
              Jakarta  Hari ini adalah hari yang sangat memuaskan bagi saya dan tim. Kami
              berhasil menyelesaikan proyek optimisasi jaringan di wilayah
              Jakarta Hari ini adalah hari yang sangat memuaskan bagi saya dan tim. Kami
              berhasil menyelesaikan proyek optimisasi jaringan di wilayah
              Jakarta
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}
