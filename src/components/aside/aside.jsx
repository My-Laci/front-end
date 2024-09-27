import { useState } from "react";
import "./aside.css";
import CreatePost from "../create-post/CreatePost";
import CreateArticle from "../create-article/CreateArticle";

export default function Aside({ profile, onOpenPopup }) {
  const [popupType, setPopupType] = useState(null);

  const handleOpenPopup = (type) => {
    if (!profile?._id) {
      onOpenPopup(true); 
    } else {
      setPopupType(type); 
    }
  };

  const handleClosePopup = () => {
    setPopupType(null);
  };

  return (
    <div className="aside">
      <div className="aside-post-container">
        <div className="aside-create-post-text">Create a story</div>
        <div className="aside-post-field">
          <button onClick={() => handleOpenPopup("post")}>Create a Post</button>
          <button onClick={() => handleOpenPopup("article")}>
            Create an Article
          </button>
        </div>
      </div>

      {popupType && (
        <div className="popup-overlay">
          <div className="popup-content">
            {popupType === "post" && <CreatePost onClose={handleClosePopup} />}
            {popupType === "article" && (
              <CreateArticle onClose={handleClosePopup} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
