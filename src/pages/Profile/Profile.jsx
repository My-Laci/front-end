import { useEffect, useState } from "react";
import ProfileBanner from "../../components/profile-banner/ProfileBanner";
import LoginRegisterPopup from "../../components/loginregister-popup/loginregister-popup.jsx";
import InternHistory from "../../components/intern-history/InternHistory";
import ProfileContent from "../../components/profile-content/ProfileContent";
import Aside from "../../components/aside/aside.jsx";
import axios from "axios";
import Cookies from "js-cookie";
import "../Profile/profile.css";

function Profile() {
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const [internship, setInternship] = useState([]);
  const [post, setPost] = useState([]);
  const [article, setArticle] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get("token");
      if (!token) {
        setError("You're not logged in yet.");
        return;
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const id = decodedToken.payload.id;

        const profileResponse = await axios.get(
          `http://localhost:8080/users/${id}`
        );
        setProfile(profileResponse.data);

        const internshipResponse = await axios.get(
          `http://localhost:8080/internship/user/${id}`
        );
        setInternship(internshipResponse.data.getData ?? []);

        const postResponse = await axios.get(
          `http://localhost:8080/post/${id}`
        );
        setPost(postResponse.data.getUserPost ?? []);

        const articleResponse = await axios.get(
          `http://localhost:8080/articles/user/${id}`
        );
        setArticle(articleResponse.data);
        console.log("ini artikelmu mbot", articleResponse.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching user data", err);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="profile-container">
      <div className="profile">
        {error ? (
          <p className="error">{error}</p>
        ) : (
          <>
            {profile ? (
              <>
                <ProfileBanner
                  name={profile.name}
                  campus={profile.agencyOrigin}
                  position={
                    internship.length > 0
                      ? internship[internship.length - 1].positions
                      : ""
                  }
                  image={profile.profileImg}
                />
                <InternHistory internship={internship} profile={profile} />
                <ProfileContent
                  post={post}
                  profile={profile}
                  article={article}
                />
              </>
            ) : (
              <p>Loading...</p>
            )}
          </>
        )}
      </div>
      <Aside profile={profile} onOpenPopup={setShowPopup} />
      {showPopup && (
        <LoginRegisterPopup show={showPopup} onClose={closePopup} />
      )}
    </div>
  );
}

export default Profile;
