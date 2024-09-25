import Navbar from "../../components/navbar/Navbar";
import ArticleDetail from "../../components/article-detail/ArticleDetail";
import { useLocation } from "react-router-dom";
import "./Article.css";

export default function Article() {
  const location = useLocation();
  const { article } = location.state || {};

  console.log("ini adalah article detail", article)

  return (
    <div className="article-container">
      <div className="article-content">
        {/* Gunakan article di sini */}
        <ArticleDetail article={article} />
      </div>
    </div>
  );
}
