import { useEffect, useState } from "react";
import axios from "axios";
import "./ValidateUser.css";

export default function ValidateUser() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [validationStatus, setValidationStatus] = useState({}); // State for validation status

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await axios.get("http://localhost:8080/internship/");
        setInternships(response.data.getAllData); // Set the fetched internships
      } catch (err) {
        setError("Failed to load internship data.");
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  // Function to format date
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Function to handle validation toggle
  const handleValidate = async (internshipId) => {
    const internship = internships.find((i) => i._id === internshipId);
    const newVerifiedStatus = !internship.verified; // Toggle the verification status
    const currentDate = new Date().toISOString(); // Get the current date in ISO format

    try {
      await axios.put(`http://localhost:8080/internship/${internshipId}`, {
        verified: newVerifiedStatus,
        endDate: newVerifiedStatus ? currentDate : null, // Update endDate only if verified
      });
      setValidationStatus((prev) => ({
        ...prev,
        [internshipId]: newVerifiedStatus ? "Validated successfully!" : "Unvalidated.",
      }));
      // Update the local state to reflect the changes
      setInternships(prev =>
        prev.map(internship =>
          internship._id === internshipId
            ? { ...internship, verified: newVerifiedStatus, endDate: newVerifiedStatus ? currentDate : internship.endDate }
            : internship
        )
      );
    } catch (err) {
      setValidationStatus((prev) => ({
        ...prev,
        [internshipId]: "Validation failed.",
      }));
    }
  };

  return (
    <div className="validate-user-container">
      <div className="validate-user-content">
        <h2>Validate User</h2>
        <hr />
        <div className="validate-user-search">
          <input type="text" placeholder="Search by name or email" />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <div className="validate-user-list">
          {internships.length === 0 ? (
            <p>No internship data available.</p>
          ) : (
            internships.map((internship) => (
              <div className="validate-user-detail" key={internship._id}>
                <p>
                  <strong>Name:</strong> {internship.fullname}
                </p>
                <p>
                  <strong>Email:</strong> {internship.email}
                </p>
                <p>
                  <strong>Internship Period:</strong> {formatDate(internship.startDate)} to{" "}
                  {internship.endDate ? formatDate(internship.endDate) : "Present"}
                </p>
                <p>
                  <strong>Jobdesk:</strong> {internship.jobdesk.join(", ")}
                </p>
                <p>
                  <strong>Position:</strong> {internship.positions}
                </p>
                <button 
                  onClick={() => handleValidate(internship._id)}
                  className={internship.verified ? 'validated' : ''}
                >
                  {internship.verified ? 'Validated' : 'Validate'}
                </button>
                {validationStatus[internship._id] && <p>{validationStatus[internship._id]}</p>}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
