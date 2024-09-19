import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./InternshipDetail.css";
import AddInternExperience from "../add-intern-experience/add-intern-experience";
import { Link, useNavigate } from "react-router-dom";

// Set default Authorization header for all requests
const token = Cookies.get("authToken"); // Replace 'authToken' with your actual cookie name if different
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export default function InternshipDetail({ detail }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false); // State for popup visibility
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // Hook for programmatic navigation

  const { positions, jobdesk, startDate, endDate, _id, verified } = detail; // Ensure the detail object includes `_id` and `verified`

  // Function to format date to "Month YYYY"
  const formatDate = (date) => {
    if (!date) return "Date unknown";
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  // Toggle dropdown visibility
  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside of it
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  // Add event listener on mount and clean up on unmount
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Function to handle internship deletion
  const deleteInternship = async () => {
    if (!_id) {
      console.error("Internship ID is undefined.");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:8080/internship/${_id}`
      );
      console.log("Internship deleted successfully:", response.data);
    } catch (error) {
      console.error(
        "Error deleting internship:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Function to toggle popup visibility
  const togglePopup = () => {
    setPopupOpen((prev) => !prev);
  };

  return (
    <div className="internship-detail">
      <div className="intern-job-desk">
        <h4>{positions}</h4>
        <div className="detail-jobdesk">
          {jobdesk && jobdesk.length > 0 ? (
            jobdesk.map((item, index) => <li key={index}>{item}</li>)
          ) : (
            <p>No job desk available</p>
          )}
        </div>
      </div>
      <div className="intern-time-container">
        <div className="intern-time">
          <p>
            {startDate ? formatDate(startDate) : "Start date unknown"} -{" "}
            {endDate ? formatDate(endDate) : "Ongoing"}
          </p>
          {verified && endDate && (
            <Link
              to="/Certificate"
              state={{ detail }}
              className="internship-certificate-link"
            >
              Certificate
            </Link>
          )}
        </div>
        <div className="internship-dropdown" ref={dropdownRef}>
          <i
            className="fa-solid fa-ellipsis-vertical"
            onClick={handleDropdownToggle}
          ></i>
          {isDropdownOpen && (
            <div className="internship-dropdown-menu">
              <button onClick={togglePopup}>Edit</button>
              <button onClick={deleteInternship}>Delete</button>
            </div>
          )}
        </div>
      </div>

      {/* Popup for AddInternExperience */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <AddInternExperience detail={detail} onClose={togglePopup} />
          </div>
        </div>
      )}
    </div>
  );
}
