import "./ArticleDetail.css";

export default function ArticleDetail({ article }) {
  return (
    <div className="article-detail-content">
      <img
        src={article.image.url}
        alt=""
      />

      <h1>{article.title}</h1>
      <p>{article.author.name}</p>

      <div className="article-detail-content-text">
        <p>
          {article.content}
        </p>
      </div>
    </div>
  );
}
