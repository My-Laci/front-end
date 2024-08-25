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
  const [bannerData, setBannerData] = useState(null);
  const [error, setError] = useState(null);

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

        const internshipResponse = await axios.get(`http://localhost:8080/internship/user/${id}`)

        // Set bannerData from the response
        setBannerData({
          name: profileResponse.data.name,
          agencyOrigin: profileResponse.data.agencyOrigin,
          profileImg: profileResponse.data.profileImg,
          lastPosition : internshipResponse.
        });
      } catch (err) {
        setError(err.message);
        console.error("Error fetching user data", err);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="container">
      <Navbar />
      <SideBar />
      <div className="profile">
        {error ? (
          <p className="error">Login dulu pepek</p>
        ) : (
          <>
            {bannerData && <ProfileBanner bannerData={bannerData} />}
            <InternHistory />
            <ProfileContent />
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
