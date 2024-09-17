import "./ArticleDetail.css";

export default function ArticleDetail({ article }) {
  return (
    <div className="article-detail-content">
      <div className="upper-article-detail">
        <img
          src={article.image.url}
          alt="Thumbnail"
          className="article-detail-thumbnail"
        />

        <h1 className="article-detail-title">{article.title}</h1>

        <p className="article-detail-author">By {article.author.name}</p>
      </div>

      <div
        className="article-detail-content-text"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  );
}
