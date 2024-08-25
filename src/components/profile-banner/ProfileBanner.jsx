import bannerIcon from "../../assets/Banner-Icon.svg";
import settingIcon from "../../assets/Setting-icon.svg";
import "../profile-banner/ProfileBanner.css";
import { Link } from "react-router-dom";

export default function ProfileBanner({ bannerData }) {
  return (
    <div className="profile-banner">
      <img className="imgBanner" src={bannerIcon} alt="" />
      <div className="banner-content">
        <div className="identity">
          <h2>{bannerData?.name || "User Name"}</h2>
          <p>{bannerData?.agencyOrigin || "Campus"}</p>
          <p>Web Development Intern</p>
        </div>
        <Link to="/AccountInfo">
          <img className="setting-icon" src={settingIcon} alt="" />
        </Link>
      </div>
      <img className="profile-picture" src={bannerData?.profileImg} alt="" />
    </div>
  );
}
