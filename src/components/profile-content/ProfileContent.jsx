import React, { useState } from "react";
import "../profile-content/ProfileContent.css";
import Article from "../profile-article/ProfileArticle";
import PostContent from "../post-content/post-content";

export default function ProfileContent() {
  // State untuk melacak tab yang aktif
  const [activeTab, setActiveTab] = useState("posts");

  // Data posts dan articles sebagai contoh
  const posts = [
    <>
      <PostContent />
    </>,
  ];

  // Array kosong untuk mensimulasikan tidak ada konten
  const articles = [
    <>
      <Article />
      <Article />
      <Article />
      <Article />
      <Article />
    </>,
  ];

  // Handler untuk mengubah tab yang aktif
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
          <span>Posts</span>
        </div>
        <div
          className={
            activeTab === "articles"
              ? "profile-button-nest active clickable"
              : "profile-button-nest clickable"
          }
          onClick={() => handleTabClick("articles")}
        >
          <span>Articles</span>
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
