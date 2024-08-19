import { useState } from "react";
import "../profile-content/ProfileContent.css";
import Article from "../profile-article/ProfileArticle";
import PostContent from "../post-content/post-content";

export default function ProfileContent() {
  const [activeTab, setActiveTab] = useState("posts");

  const posts = [
    <>
      <PostContent />
    </>,
  ];

  const articles = [
    <>
      <Article />
      <Article />
      <Article />
      <Article />
      <Article />
    </>,
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="profile-content">
      <div className="profile-navigation">
        <div
          className={
            activeTab === "posts"
              ? "profile-button-nest active clickable"
              : "profile-button-nest clickable"
          }
          onClick={() => handleTabClick("posts")}
        >
          <h3>Posts</h3>
        </div>
        <div
          className={
            activeTab === "articles"
              ? "profile-button-nest active clickable"
              : "profile-button-nest clickable"
          }
          onClick={() => handleTabClick("articles")}
        >
          <h3>Articles</h3>
        </div>
      </div>
      {activeTab === "articles" && (
        <div className="profile-content-list">
          {articles.length > 0 ? articles : <p>Nothing to post</p>}
        </div>
      )}
      {activeTab === "posts" && (
        <div className="profile-content-list">
          {posts.length > 0 ? posts : <p>Nothing to post</p>}
        </div>
      )}
    </div>
  );
}
