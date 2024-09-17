import { useState } from "react";
import "../profile-content/ProfileContent.css";
import ArticleProfile from "../profile-article/ProfileArticle";
import PostContent from "../post-content/post-content";

export default function ProfileContent({ post, profile, article }) {
  const [activeTab, setActiveTab] = useState("posts");

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
          {article.length > 0 ? (
            article.map((item) => (
              <ArticleProfile
                key={item._id}
                article={item}
                profile={profile} // Pass userId to ArticleProfile
              />
            ))
          ) : (
            <p>No articles available</p>
          )}
        </div>
      )}
      {activeTab === "posts" && (
        <div className="profile-content-list">
          {post.length > 0 ? (
            post.map((item, index) => (
              <PostContent
                key={index}
                post={item}
                profile={profile}
                canDelete={true}
              />
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>
      )}
    </div>
  );
}
