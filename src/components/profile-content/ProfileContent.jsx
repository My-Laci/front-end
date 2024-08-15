import React, { useState } from "react";
import "../profile-content/ProfileContent.css";
import Article from "../profile-article/ProfileArticle";

export default function ProfileContent() {
  // State untuk melacak tab yang aktif
  const [activeTab, setActiveTab] = useState("posts");

  // Handler untuk mengubah tab yang aktif
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="profile-content">
      <div className="navigation">
        <div className="button-nest">
          <span
            href="#"
            className={activeTab === "posts" ? "active" : ""}
            onClick={() => handleTabClick("posts")}
          >
            Posts
          </span>
        </div>
        <div className="button-nest">
          <span
            href="#"
            className={activeTab === "articles" ? "active" : ""}
            onClick={() => handleTabClick("articles")}
          >
            Articles
          </span>
        </div>
      </div>
      {activeTab === "articles" && (
        <div className="content">
          <Article />
          <Article />
          <Article />
          <Article />
          <Article />
        </div>
      )}
      {activeTab === "posts" && <div className="content"></div>}
    </div>
  );
}
