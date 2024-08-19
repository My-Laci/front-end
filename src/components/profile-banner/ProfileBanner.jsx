import bannerIcon from "../../assets/Banner-Icon.svg";
import settingIcon from "../../assets/Setting-icon.svg";
import "../profile-banner/ProfileBanner.css"

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
        <img className="setting-icon" src={settingIcon} alt="" />
      </div>
      <img
        className="profile-picture"
        src="https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg"
        alt=""
      />
    </div>
  );
}
