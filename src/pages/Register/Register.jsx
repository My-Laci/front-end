import Form from "../../components/input-form/InputFrom.jsx";
import BlueButton from "../../components/blue-button/BlueButton.jsx";
import RegistBanner from "../../assets/Regist-banner.svg";
import RegisterIcon from "../../assets/Register-icon.svg";

import "../Register/Register.css";

export default function Register() {
  return (
    <div className="register-container">
      <div className="register-left-side">
        <img className="register-icon-banner" src={RegistBanner} alt="" />
        <img className="register-login-icon" src={RegisterIcon} alt="" />
      </div>
      <div className="register-right-side">
        <h1 id="register">Register</h1>
        <h1 id="logo">Laci</h1>

        <div className="register-formlist">
          <p className="register-description">
            To be able to create an account, you must be a part of the
            <span>Telkomsel Internship Programs.</span>
          </p>
          <Form placeholder="Full Name" />
          <Form placeholder="Email" />
          <Form placeholder="Password" type="password" />
          <Form placeholder="Confirm Password" type="password" />
          <Form placeholder="Agency Origin" />

          <p id="Register-enterText">
            Enter the code you received from your mentor down below.
          </p>
          <Form placeholder="XXXX-XXXX-XXXX" />
          <BlueButton label="Continue"/>
          <p>
            Already have an account?{" "}
            <a href="#" id="Register-loginSpan">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
