import "./suggestion.css";
import UserImage1 from "../../assets/vinsen.svg";
import UserImage2 from "../../assets/sakil.png";


export default function Suggestion() {
  return (
    <div className="suggested-aside">
      <div className="suggested-container">
        <div className="suggested-text">Suggested for you</div>
        <div className="suggested-user-field">

          {/* User 1 */}
          <div className="suggested-user-info">
            <div className="suggested-user-image">
              <img src={UserImage1} alt="User" />
            </div>
            <div className="suggested-user-name">
              Vinsen
            </div>
          </div>

          {/* User 2 */}
          <div className="suggested-user-info">
            <div className="suggested-user-image">
              <img src={UserImage2} alt="User" />
            </div>
            <div className="suggested-user-name">
              Sakilio Tiana
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
