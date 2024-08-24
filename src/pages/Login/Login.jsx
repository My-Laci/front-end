import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginBanner from "../../assets/Regist-banner.svg";
import LoginIcon from "../../assets/Login-icon.svg";
import Form from "../../components/input-form/InputFrom";
import BlueButton from "../../components/blue-button/BlueButton";
import GreenButton from "../../components/green-button/GreenButton";
import Cookies from "js-cookie";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState([]);
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      // Send data as JSON
      const response = await axios.post(
        "http://localhost:8080/signIn",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login successful");
      const token = response.data.token;
      Cookies.set("token", token, { expires: 7 });
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      navigate("/");
    } catch (error) {
      if (error.response) {
        console.error("Login failed:", error.response.data);
        setValidation(error.response.data);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-left-side">
        <h1 id="login">Login</h1>
        <h1 id="login-logo">Laci</h1>

        <form className="login-formlist" onSubmit={loginHandler}>
          <Form
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <Form
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <div className="login-forgot-password">
            <a href="#">Forgot Password?</a>
          </div>
          <BlueButton type="submit" label="Continue" />
          <p id="dont-have-account">
            Don’t have an account?<a href="#">Register Here</a>
          </p>
          <p id="login-or">OR</p>
          <GreenButton label="View As Guest" />
        </form>
      </div>
      <div className="login-right-side">
        <img src={LoginBanner} id="login-banner" alt="Login Banner" />
        <img src={LoginIcon} id="login-icon" alt="Login Icon" />
      </div>
    </div>
  );
}
