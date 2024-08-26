import bannerIcon from "../../assets/Banner-Icon.svg";
import settingIcon from "../../assets/Setting-icon.svg";
import "../profile-banner/ProfileBanner.css";
import { Link } from "react-router-dom";


export default function ProfileBanner(props) {
  return (
    <div className="profile-banner">
      <img className="imgBanner" src={bannerIcon} alt="" />
      <div className="banner-content">
        <div className="identity">
          <h2>{props.name}</h2>
          <p>{props.campus}</p>
          <p>{props.position}</p>
        </div>
        <Link to="/AccountInfo">
          <img className="setting-icon" src={settingIcon} alt="" />
        </Link>
      </div>
      <img className="profile-picture" src={props.image} alt="" />
    </div>
  );
}
