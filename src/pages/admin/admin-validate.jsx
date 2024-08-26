import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import AdminSidebar from "../../components/admin-sidebar/admin-sidebar";
import AdminNavbar from "../../components/admin-navbar/admin-navbar";
import "./admin-validate.css";

const AdminValidate = () => {
  // State for users, search query, and error
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token");
      if (!token) {
        setError("You're not logged in yet.");
        return;
      }

      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const response = await axios.get(`http://localhost:8080/internship`);

        // Assuming response.data is an array of user objects
        setUsers(response.data.getAllData);
      } catch (error) {
        setError("Failed to fetch data. Please try again.");
        console.error("API error:", error);
      }
    };

    fetchData();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to format the date
  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    if (endDate) {
      const end = new Date(endDate).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
      return `${start} - ${end}`;
    } else {
      return `${start} - Ongoing`;
    }
  };

  // Function to handle validation
  const handleValidate = async (userId) => {
    const token = Cookies.get("token");
    if (!token) {
      setError("You're not logged in yet.");
      return;
    }

    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Find the user to get current status
      const userToUpdate = users.find((user) => user._id === userId);
      if (!userToUpdate) return;

      const now = new Date().toISOString();

      // Determine new values
      const updatedUser = {
        verified: !userToUpdate.verified,
        endDate: userToUpdate.verified ? null : now,
      };

      // Send the request to update the user
      await axios.put(
        `http://localhost:8080/internship/${userId}`,
        updatedUser
      );

      // Update the state to reflect the changes
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, ...updatedUser } : user
        )
      );
    } catch (error) {
      setError("Failed to validate user. Please try again.");
      console.error("Validation error:", error);
    }
  };

  // Filtered users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) // Adjust if needed
  );

  return (
    <>
      <AdminNavbar />
      <div className="admin-validate-container">
        <AdminSidebar />
        <div className="admin-validate-content">
          <h2 className="admin-validate-h1">Validate Interns</h2>

          <input
            type="text"
            placeholder="Search by name or email..."
            className="admin-validate-search"
            value={searchQuery}
            onChange={handleSearchChange}
          />

          {error && <p className="error-message">{error}</p>}

          {filteredUsers.length === 0 ? (
            <p className="no-user-found">No users found.</p>
          ) : (
            filteredUsers.map((user) => (
              <div key={user._id} className="user-validation-card">
                <h3>Data Diri</h3>
                <p>
                  <strong>Nama:</strong> {user.fullname}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <h3>Informasi Magang</h3>
                <p>
                  <strong>Periode Magang:</strong>{" "}
                  {formatDateRange(user.startDate, user.endDate)}
                </p>
                <p>
                  <strong>Jobdesk:</strong> {user.jobdesk.join(", ")}
                </p>
                <p>
                  <strong>Posisi:</strong> {user.positions}
                </p>
                <button
                  className={`validate-button ${
                    user.verified ? "validated" : ""
                  }`}
                  onClick={() => handleValidate(user._id)}
                >
                  {user.verified ? "Revert Validation" : "Validate"}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default AdminValidate;
