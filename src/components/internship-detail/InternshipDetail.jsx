import { useState, useEffect, useRef } from "react";
import "./InternshipDetail.css";
import { Link } from "react-router-dom";
import AddInternExperience from "../add-intern-experience/add-intern-experience";

export default function InternshipDetail({ detail }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { positions, jobdesk, startDate, endDate } = detail;

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
          {endDate && (
            <Link
              to="/Certificate"
              state={{ detail }} // Mengirim data sebagai state
              className="internship-certificate-link"
            >
              Certificate
            </Link>
          )}
        </div>
        <div className="internship-dropdown" ref={dropdownRef}>
          <i className="fa-solid fa-ellipsis-vertical" onClick={handleDropdownToggle}></i>
          {isDropdownOpen && (
            <div className="internship-dropdown-menu">
              <button>Edit</button>
              <button>Delete</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
