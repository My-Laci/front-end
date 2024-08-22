import Navbar from "../../components/navbar/Navbar";
import ArticleDetail from "../../components/article-detail/ArticleDetail";

import "./Article.css";

export default function Article() {
  return (
    <div className="article-container">
      <Navbar />
      <div className="article-content">
        <ArticleDetail />
      </div>
    </div>
  );
}
