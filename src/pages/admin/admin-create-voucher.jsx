import React, { useState } from "react";
import axios from "axios";
import AdminSidebar from "../../components/admin-sidebar/admin-sidebar";
import AdminNavbar from "../../components/admin-navbar/admin-navbar";
import "./admin-create-voucher.css";

const AdminCreateVoucher = () => {
  const [batchName, setBatchName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCreateVoucher = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:8080/vouchers/create",
        { batchName, quantity },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(
        `Vouchers created successfully!`
      );
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Failed to create vouchers. Please try again."
      );
    } finally {
      setLoading(false);
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
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <button
            className="create-voucher-button"
            onClick={handleCreateVoucher}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Voucher"}
          </button>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
        </div>
      </div>
    </>
  );
};

export default AdminCreateVoucher;
