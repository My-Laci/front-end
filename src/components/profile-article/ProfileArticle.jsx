import "../profile-article/ProfileArticle.css";
import { Link } from "react-router-dom";

export default function ArticleProfile(article) {
  return (
    <>
      <Link to="/Article" className="article-list-link" state={{article}}>
        <div className="article">
          <img
            src={article.image.url}
            alt=""
          />
          <div className="articles-detail">
            <h3>{article.title}</h3>
            <p>
            {article.content}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}
