import { useState, useEffect } from "react";
import LoginRegisterPopup from "../../components/loginregister-popup/loginregister-popup.jsx";
import PostContent from "../../components/post-content/post-content.jsx";
import Aside from "../../components/aside/aside.jsx";
import axios from "axios";
import Cookies from "js-cookie";
import "./homepage.css";

const Homepage = () => {
  const [post, setPost] = useState([]);
  const [profile, setProfile] = useState({}); // Default profile as empty object
  const [showPopup, setShowPopup] = useState(false); // Default popup closed

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postResponse = await axios.get(`http://localhost:8080/posts`);
        setPost(postResponse.data.getAllPost || []); // Set postingan

        const token = Cookies.get("token");

        if (token) {
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
          const id = decodedToken.payload.id;

          const profileResponse = await axios.get(
            `http://localhost:8080/users/${id}`
          );
          setProfile(profileResponse.data); // Set profile jika login
        }
      } catch (err) {
        console.error("Error fetching data", err); // Logging error ke console
      }
    };

    fetchData();
  }, []);

  return (
    <div className="homepage-container">
      <div className="homepage-content">
        <div className="content">
          {post.length > 0 ? (
            post.map((item, index) => (
              <PostContent key={index} post={item} profile={profile} />
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>
        <Aside profile={profile} onOpenPopup={setShowPopup} />
      </div>
      {showPopup && (
        <LoginRegisterPopup show={showPopup} onClose={closePopup} />
      )}
    </div>
  );
};

export default Homepage;
