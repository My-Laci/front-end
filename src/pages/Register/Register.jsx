import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "../../components/input-form/InputFrom.jsx";
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

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!fullName || !email || !password || !confirmPassword || !agencyOrigin || !code) {
      toast.error("All fields are required.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format.");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post("https://laci-api-owihrlqaza-et.a.run.app/signup", {
        name: fullName,
        email,
        password,
        agencyOrigin,
        code,
      });

      toast.success("Registration successful!");
      console.error("Registration successful:", response.data);
      setShowModal(true);

    } catch (error) {
      const errorMessage = error.response?.data?.message || "Registration failed.";
      toast.error(`${errorMessage}`);
      console.error("Registration error:", error);
    }
  };

  const handleModalClose = () => setShowModal(false);
  const handleModalConfirm = () => {
    setShowModal(false);
    navigate('/login');
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
          <form className="register-formlist" onSubmit={handleRegister}>
            <Form
              name="fullName"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <Form
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form
              name="password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Form
              name="agencyOrigin"
              placeholder="Agency Origin"
              value={agencyOrigin}
              onChange={(e) => setAgencyOrigin(e.target.value)}
            />
            <p id="Register-enterText">
              Enter the code you received from your mentor down below.
            </p>
            <Form
              name="code"
              placeholder="XXXX-XXXX-XXXX"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
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
            >
              Continue
            </button>
          </form>
          <p>
            Already have an account?{" "}
            <Link to="/login" id="Register-loginSpan">
              Login
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />

      {/* Modal for successful registration */}
      <Modal
        show={showModal}
        onHide={handleModalClose}
        size="lg" // Set the size of the modal
        centered // Center the modal vertically
      >
        <Modal.Header closeButton>
          <Modal.Title>Registration Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your registration was successful. Click the button below to log in.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button className="go-to-login-btn" variant="primary" onClick={handleModalConfirm}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
