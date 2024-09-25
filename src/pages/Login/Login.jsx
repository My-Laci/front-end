/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoginBanner from "../../assets/Regist-banner.svg";
import LoginIcon from "../../assets/Login-icon.svg";
import Form from "../../components/input-form/InputFrom";
import BlueButton from "../../components/blue-button/BlueButton";
import GreenButton from "../../components/green-button/GreenButton";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import { Spinner } from "react-bootstrap"; // Import Spinner dari react-bootstrap
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Menambahkan state untuk loading
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true); // Menampilkan spinner saat loading

    try {
      Cookies.remove("token");
      const response = await axios.post(
        "https://laci-api-46818093185.asia-southeast2.run.app/signIn",
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

      const token = response.data.token;
      Cookies.set("token", token, { expires: 7 });
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      if (error.response) {
        toast.error("Login failed: " + error.response.data.message);
        setValidation(error.response.data);
      } else {
        toast.error("An error occurred. Please try again.");
        console.error("Error:", error.message);
      }
    } finally {
      setIsLoading(false); // Menghentikan spinner setelah selesai
    }
  };

  const viewAsGuestHandler = () => {
    Cookies.remove("token");
    axios.defaults.headers.common["Authorization"] = "";
    window.location.href = "/";
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
          <button
            id="blue-button"
            type="submit"
            style={{
              backgroundImage: 'linear-gradient(to right, #5cd9ff, #01baf2)',
              width: '100%',
              borderRadius: '100px',
              color: '#ffffff',
              margin: '7px 0 20px 0',
              border: 'none',
              fontSize: '14px',
              fontWeight: '600',
              padding: '12px',
              boxShadow: '0 3px 3px rgba(0, 0, 0, 0.3)',
              cursor: 'pointer',
            }}
            disabled={isLoading} // Menonaktifkan tombol saat loading
          >
            {isLoading ? <Spinner animation="border" role="status" /> : "Continue"}
          </button>
          <p id="dont-have-account">
            Don’t have an account?<Link to="/register">Register Here</Link>
          </p>
          <p id="login-or">OR</p>
          <Link onClick={viewAsGuestHandler}>
            <GreenButton label="View As Guest" />
          </Link>
        </form>
      </div>
      <div className="login-right-side">
        <img src={LoginBanner} id="login-banner" alt="Login Banner" />
        <img src={LoginIcon} id="login-icon" alt="Login Icon" />
      </div>
      <ToastContainer />
    </div>
  );
}
