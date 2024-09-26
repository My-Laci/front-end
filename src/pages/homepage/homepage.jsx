import { useState, useEffect } from "react";
import LoginRegisterPopup from "../../components/loginregister-popup/loginregister-popup.jsx";
import PostContent from "../../components/post-content/post-content.jsx";
import Aside from "../../components/aside/aside.jsx";
import axios from "axios";
import Cookies from "js-cookie";
import "./homepage.css";

const Homepage = () => {
  const [post, setPost] = useState([]);
  const [profile, setProfile] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  // Tutup popup setelah pengguna melihatnya
  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ambil semua post tanpa memeriksa token
        const postResponse = await axios.get(`http://localhost:8080/posts`);
        setPost(postResponse.data.getAllPost || []); // Set postingan

        const token = Cookies.get("token");

        // Jika token ada, ambil data profil
        if (token) {
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
          const id = decodedToken.payload.id;

          const profileResponse = await axios.get(
            `http://localhost:8080/users/${id}`
          );
          setProfile(profileResponse.data); // Set profil jika login

          // Jika pengguna sudah login, tutup pop-up
          setShowPopup(false);
          // console.log(`paham?`, profileResponse.data);
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
