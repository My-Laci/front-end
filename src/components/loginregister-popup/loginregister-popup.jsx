import { Link } from "react-router-dom";
import "./loginregister-popup.css";

const LoginRegisterPopup = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="login-regist-popup-overlay">
      <div className="login-regist-popup-content">
        <h2>Welcome!</h2>
        <p>Please log in or register to continue.</p>
        <button className="login-regist-popup-button" onClick={onClose}>
          Register
        </button>
        <div className="login-regist-pop-up-bottom-area">
          <p>Already have an account?</p>
          <Link to="/login">Login</Link>
        </div>
        </div>
        <button className="login-regist-popup-close" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
  );
};

export default LoginRegisterPopup;
