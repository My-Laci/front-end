import { useState } from 'react';
import Form from "../../components/input-form/InputFrom.jsx";
import BlueButton from "../../components/blue-button/BlueButton.jsx";
import RegistBanner from "../../assets/Regist-banner.svg";
import RegisterIcon from "../../assets/Register-icon.svg";

import "../Register/Register.css";

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agencyOrigin, setAgencyOrigin] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  // Validate form fields
  const validateForm = () => {
    if (!fullName || !email || !password || !confirmPassword || !agencyOrigin || !code) {
      setError("All fields are required.");
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      return false;
    }

    // Validate password match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    // Validate code format
    if (code.length !== 14 || !/^[A-Z0-9-]+$/.test(code)) {
      setError("Invalid code format. Must be in XXXX-XXXX-XXXX format.");
      return false;
    }

    setError(""); // Clear error message if validation is successful
    return true;
  };

  // Handle form submission
  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch("https://your-backend-api.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          email,
          password,
          agencyOrigin,
          code,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed.");
      }

      // Handle successful registration (e.g., redirect to login page)
      console.log("Registration successful");
    } catch (error) {
      setError(error.message || "An unexpected error occurred. Please try again.");
      console.error("Registration error:", error);
    }
  };

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
          <Form
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Form
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Form
            placeholder="Agency Origin"
            value={agencyOrigin}
            onChange={(e) => setAgencyOrigin(e.target.value)}
          />
          <Form
            placeholder="XXXX-XXXX-XXXX"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <p id="Register-enterText">
            Enter the code you received from your mentor down below.
          </p>
          <BlueButton label="Continue" onClick={handleRegister} />
          <p>
            Already have an account?{" "}
            <a href="#" id="Register-loginSpan">
              Login
            </a>
          </p>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
}
