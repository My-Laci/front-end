import "./sidebar.css";
import homeIcon from "../../assets/home.svg";
import profileIcon from "../../assets/profile.svg";
import popularIcon from "../../assets/popular.svg";
import bookmarkIcon from "../../assets/bookmark.svg";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <button>
        <img src={homeIcon} alt="Edit" className="edit-icon" />
        Home
      </button>
      <button>
        <img src={profileIcon} alt="Edit" className="edit-icon" />
        Profile
      </button>
      <button>
        <img src={popularIcon} alt="Edit" className="edit-icon" />
        Popular
      </button>
      <button>
        <img src={bookmarkIcon} alt="Edit" className="edit-icon" />
        Bookmarks
      </button>
    </div>
  );
}