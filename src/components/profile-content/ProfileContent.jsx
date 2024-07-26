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
        <div className="button">
          <a
            href="#"
            className={activeTab === "posts" ? "active" : ""}
            onClick={() => handleTabClick("posts")}
          >
            Posts
          </a>
        </div>
        <div className="button">
          <a
            href="#"
            className={activeTab === "articles" ? "active" : ""}
            onClick={() => handleTabClick("articles")}
          >
            Articles
          </a>
        </div>
      </div>
      {activeTab === "articles" && (
        <div className="content">
          <Article />
          <Article />
        </div>
      )}
      {activeTab === "posty" && (
        <div className="content">
          <h1>Malas</h1>
        </div>
      )}
    </div>
  );
}
