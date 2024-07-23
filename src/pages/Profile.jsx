import "../styles/profile.css";
import settingIcon from "../assets/Setting-icon.svg";
import bannerIcon from "../assets/Banner-Icon.svg";

function Profile() {
  return (
    <>
      <div className="profile">
        <div className="profile-banner">
          <img className="imgBanner" src={bannerIcon} alt="" />
          <div className="banner-content">
            <div className="identity">
              <h3>Edo Mahendra</h3>
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
        <div className="profile-content">
          <div className="post-article-navigation">
            <p>Posts</p>
            <p>Articles</p>
          </div>
          <div className="article-display">
            <img className="articleImage" src="https://pbs.twimg.com/media/GHqS6L3boAAjFXF.jpg:large" alt="" />
            <div className="title-content">
              <h4>Akhirnya Ketemu! Vincent Bertemu Pak Vinsen</h4>
              <p>
                Hari ini adalah hari yang sangat memuaskan bagi saya dan tim.
                Kami berhasil menyelesaikan proyek
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
