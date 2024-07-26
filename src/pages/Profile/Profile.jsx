import React, { useState } from "react";
import ProfileBanner from "../../components/profile-banner/ProfileBanner";
import ProfileContent from "../../components/profile-content/ProfileContent";

import "../Profile/profile.css";

function Profile() {
  return (
    <div className="profile">
      <ProfileBanner />
      <ProfileContent />
    </div>
  );
}

export default Profile;
