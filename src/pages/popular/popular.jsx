import { useState, useEffect } from "react";
import axios from "axios";
import SidebarTablet from "../../components/sidebar-tablet/sidebar-tablet.jsx";
import PostContent from "../../components/post-content/post-content.jsx";
import Aside from "../../components/aside/aside.jsx";
import ArticleContent from "../../components/article-content/article-content.jsx";
import FaceSwitch from "../../components/face-switch/face-switch.jsx";
import Cookies from "js-cookie";
import "./popular.css";

const Popular = () => {
  const [view, setView] = useState("posts");
  const [posts, setPosts] = useState([]);
  const [articles, setArticles] = useState([]);
  const [profile, setProfile] = useState({});

  const handleSwitch = (type) => {
    setView(type);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postResponse = await axios.get(`http://localhost:8080/posts`);
        setPosts(postResponse.data.getAllPost || []);

        const articleResponse = await axios.get(`http://localhost:8080/articles`);
        setArticles(articleResponse.data || []);  // Store articles data

        const token = Cookies.get("token");
        if (token) {
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
          const id = decodedToken.payload.id;
          const profileResponse = await axios.get(`http://localhost:8080/users/${id}`);
          setProfile(profileResponse.data);
        }
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="popular-container">
      <div className="popular-content">
        <div className="content">
          <FaceSwitch onSwitch={handleSwitch} />{" "}
          {/* Switcher between posts and articles */}
          {view === "posts" ? (
            posts.length > 0 ? (
              posts.map((item, index) => (
                <PostContent
                  key={index}
                  post={item}
                  profile={profile}
                  showCommentSection={true}
                />
              ))
            ) : (
              <p>No posts available</p>
            )
          ) : view === "articles" ? (
            <ArticleContent
              articles={articles} 
              profile={profile}
            />
          ) : null}
          {/* <AccountInfo /> */}
        </div>
        <Aside />
      </div>
      <SidebarTablet />
    </div>
  );
};

export default Popular;
