import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import AdminSidebar from "../../components/admin-sidebar/admin-sidebar";
import AdminNavbar from "../../components/admin-navbar/admin-navbar";
import "./admin-create-voucher.css";

const AdminCreateVoucher = () => {
  const [batchName, setBatchName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  // Function to handle form submission
  const handleSubmit = async () => {
    const token = Cookies.get("token");
    if (!token) {
      setError("You're not logged in yet.");
      return;
    }

    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const id = decodedToken.payload.id;

      const response = await axios.post(
        `http://localhost:8080/vouchers/create`,
        {
          batchName,
          quantity,
        }
      );

      // Handle successful response
      console.log("Voucher created:", response.data);
      // Reset form or redirect user if needed
      setBatchName("");
      setQuantity(1);
    } catch (error) {
      setError("Failed to create voucher. Please try again.");
      console.error("API error:", error);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="admin-container">
        <AdminSidebar />
        <div className="admin-create-content">
          <h1 className="admin-h1">Create New Vouchers</h1>
          <input
            type="text"
            placeholder="Voucher Batch Name"
            className="create-voucher-batch-name"
            value={batchName}
            onChange={(e) => setBatchName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Voucher Total"
            className="create-voucher-batch-total"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button
            className="create-voucher-button"
            onClick={handleSubmit}
          >
            Create Voucher
          </button>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default AdminCreateVoucher;
