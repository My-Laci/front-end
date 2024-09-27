import { Link } from "react-router-dom";
import "./loginregister-popup.css";

const LoginRegisterPopup = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="login-regist-popup-overlay">
      <div className="login-regist-popup-content">
        <button className="login-regist-popup-close" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        {/* <h2>Welcome!</h2> */}
        <h2>Please log in or register to continue.</h2>
        <button className="login-regist-popup-button" onClick={onClose}>
          Register
        </button>
        <div className="login-regist-pop-up-bottom-area">
          <p>Already have an account?</p>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterPopup;
