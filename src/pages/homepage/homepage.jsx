import { useState, useEffect } from "react";
import LoginRegisterPopup from "../../components/loginregister-popup/loginregister-popup.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import SidebarTablet from "../../components/sidebar-tablet/sidebar-tablet.jsx";
import Sidebar from "../../components/sidebar/sidebar.jsx";
import PostContent from "../../components/post-content/post-content.jsx";
import Aside from "../../components/aside/aside.jsx";
import axios from "axios";
import Cookies from "js-cookie";
import "./homepage.css";

const Homepage = () => {
  const [post, setPost] = useState([]);
  const [profile, setProfile] = useState({});
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token");
      if (!token) {
        setError("You're not logged in yet.");
        return;
      }

      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const id = decodedToken.payload.id;

        const profileResponse = await axios.get(
          `http://localhost:8080/users/${id}`
        );
        setProfile(profileResponse.data);

        const postResponse = await axios.get(`http://localhost:8080/posts`);

        setPost(postResponse.data.getAllPost || []);
        console.log(postResponse.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="container">
        <div className="content">
          {error && <p className="error">{error}</p>}
          {post.length > 0 ? (
            post.map((item, index) => (
              <PostContent key={index} post={item} profile={profile} />
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>
        <SidebarTablet />
        <Aside />
      </div>
      <LoginRegisterPopup show={showPopup} onClose={closePopup} />
    </>
  );
};

export default Homepage;
