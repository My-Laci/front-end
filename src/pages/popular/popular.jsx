import { useState } from "react";
import Navbar from "../../components/navbar/Navbar.jsx";
import SidebarTablet from "../../components/sidebar-tablet/sidebar-tablet.jsx";
import Sidebar from "../../components/sidebar/sidebar.jsx";
import PostContent from "../../components/post-content/post-content.jsx";
import Aside from "../../components/aside/aside.jsx";
import ArticleContent from "../../components/article-content/article-content.jsx";
import FaceSwitch from "../../components/face-switch/face-switch.jsx";
import "./popular.css";

const Popular = () => {
  const [view, setView] = useState("posts");

  const handleSwitch = (type) => {
    setView(type);
  };
  return (
    <>
      <body>
        <Navbar />
        <div className="container">
          <Sidebar />
          <SidebarTablet />
          <div className="content">
            <FaceSwitch onSwitch={handleSwitch} />
            {view === "posts" ? (
              <PostContent showCommentSection={true} />
            ) : (
              <ArticleContent />
            )}
            {/* <AccountInfo /> */}
          </div>
          <Aside />
        </div>
      </body>
    </>
  );
};

export default Popular;
