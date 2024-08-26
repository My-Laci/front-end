import { useEffect, useState } from "react";
import ProfileBanner from "../../components/profile-banner/ProfileBanner";
import Navbar from "../../components/navbar/Navbar";
import SideBar from "../../components/sidebar/sidebar";
import InternHistory from "../../components/intern-history/InternHistory";
import ProfileContent from "../../components/profile-content/ProfileContent";
import axios from "axios";
import Cookies from "js-cookie";
import "../Profile/profile.css";

function Profile() {
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const [internship, setInternship] = useState([]);
  const [post, setPost] = useState([]);
  const [article, setArticle] = useState([]);

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
        console.log("id user", id);

        const profileResponse = await axios.get(
          `http://localhost:8080/users/${id}`
        );

        setProfile(profileResponse.data);
        console.log("profile user", profileResponse.data);

        const internshipResponse = await axios.get(
          `http://localhost:8080/internship/user/${id}`
        );

        setInternship(internshipResponse.data.getData ?? []);
        console.log("intern anjjjing", internshipResponse.data.getData);

        const postResponse = await axios.get(
          `http://localhost:8080/post/${id}`
        );

        setPost(postResponse.data.getUserPost ?? []);
        console.log(postResponse.data.getUserPost);

        const articleResponse = await axios.get(
          `http://localhost:8080/articles/user/${id}`
        );

        setArticle(articleResponse.data);
        console.log("Ini artikel ", articleResponse.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching user data", err);
      }
    };

    fetchUserData();
  }, []);

  // Determine the last internship item
  const lastInternship =
    internship.length > 0 ? internship[internship.length - 1] : null;

  console.log("last inter", lastInternship);

  return (
    <div className="container">
      <Navbar />
      <SideBar />
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
                  position={lastInternship ? lastInternship.positions : ""}
                  image={profile.profileImg}
                />{" "}
                <InternHistory internship={internship} />
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
    </div>
  );
}

export default Profile;
