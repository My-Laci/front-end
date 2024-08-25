import React from "react";
import "./loginregister-popup.css";

const LoginRegisterPopup = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="login-regist-popup-overlay">
      <div className="login-regist-popup-content">
        <h2>Welcome!</h2>
        <p>Please log in or register to continue.</p>
        <button className="popup-button" onClick={onClose}>
          Register
        </button>
        <div className="pop-up-bottom-area">
          <p>Already have an account?</p>
          <button onClick={{}}>Login</button>
        </div>
        <button className="popup-close" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default LoginRegisterPopup;
