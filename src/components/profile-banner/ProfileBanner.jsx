import bannerIcon from "../../assets/Banner-Icon.svg";
import settingIcon from "../../assets/Setting-icon.svg";
import "../profile-banner/ProfileBanner.css";
import { Link } from "react-router-dom";

export default function ProfileBanner() {
  return (
    <div className="profile-banner">
      <img className="imgBanner" src={bannerIcon} alt="" />
      <div className="banner-content">
        <div className="identity">
          <h2>Edo Mahendra</h2>
          <p>Universitas Airlangga</p>
          <p>Web Development Intern</p>
        </div>
        <Link to="/AccountInfo">
          <img className="setting-icon" src={settingIcon} alt="" />
        </Link>
      </div>
      <img
        className="profile-picture"
        src="https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg"
        alt=""
      />
    </div>
  );
}
