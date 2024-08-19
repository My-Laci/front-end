// import React from "react";
import ProfileBanner from "../../components/profile-banner/ProfileBanner";
import ProfileContent from "../../components/profile-content/ProfileContent";
import Navbar from "../../components/navbar/Navbar";
import SideBar from "../../components/sidebar/sidebar";
import InternHistory from "../../components/intern-history/InternHistory";

import "../Profile/profile.css";

function Profile() {
  return (
    <div className="container">
      <Navbar />
      <SideBar />
      <div className="profile">
        <ProfileBanner />
        <InternHistory />
        <ProfileContent />
      </div>
    </div>
  );
}

export default Profile;
