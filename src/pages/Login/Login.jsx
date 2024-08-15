import LoginBanner from "../../assets/Regist-banner.svg";
import LoginIcon from "../../assets/Login-icon.svg";
import Form from "../../components/input-form/InputFrom";
import BlueButton from "../../components/blue-button/BlueButton";
import GreenButton from "../../components/green-button/GreenButton";
import "./Login.css";

export default function Login() {
  return (
    <div className="login-container">
      <div className="login-left-side">
        <h1 id="login">Login</h1>
        <h1 id="login-logo">Laci</h1>

        <div className="login-formlist">
          <Form placeholder="Email" />
          <Form placeholder="Password" />
          <div className="login-forgot-password">
            <a href="#">Forgot Password ?</a>
          </div>
          <BlueButton label="Continue" />
          <p id="dont-have-account">
            Don’t have an account?<a href="#">Register Here</a>
          </p>
          <p id="login-or">OR</p>
          <GreenButton label="View As Guest" />
        </div>

      </div>
      <div className="login-right-side">
        <img src={LoginBanner} id="login-banner" alt="" />
        <img src={LoginIcon} id="login-icon" alt="" />
      </div>
    </div>
  );
}
