import Form from "../../components/input-form/InputFrom.jsx";
import Button from "../../components/login-button/LoginButton.jsx";
import RegistBanner from "../../assets/Regist-banner.svg";
import LoginIcon from "../../assets/Login-icon.svg";

import "../Register/Register.css";

export default function Register() {
  return (
    <div className="container">
      <div className="left-side">
        <img className="icon-banner" src={RegistBanner} alt="" />
        <img className="login-icon" src={LoginIcon} alt="" />
      </div>
      <div className="right-side">
        <h1 id="register">Register</h1>
        <h1 id="logo">Laci</h1>

        <div className="formlist">
          <p className="description">
            To be able to create an account, you must be a part of the
            <span>Telkomsel Internship Programs.</span>
          </p>
          <Form placeholder="Full Name" />
          <Form placeholder="Email" />
          <Form placeholder="Password" type="password" />
          <Form placeholder="Confirm Password" type="password" />
          <Form placeholder="Agency Origin" />

          <p id="enterText">
            Enter the code you received from your mentor down below.
          </p>
          <Form placeholder="XXXX-XXXX-XXXX" />
          <Button />
          <p>
            Already have an account?{" "}
            <a href="#" id="loginSpan">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
