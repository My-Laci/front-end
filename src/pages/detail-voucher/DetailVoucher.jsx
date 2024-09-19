import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./DetailVoucher.css";

export default function DetailVoucher() {
  const location = useLocation();
  const { batchName } = location.state || {}; // Get the batchName from location state
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVouchers = async () => {
      if (!batchName) return; // Exit early if no batchName is available

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8080/vouchers/batch/${batchName}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("API Response Data:", response.data); // Log API response
        setVouchers(response.data); // Set the fetched vouchers
      } catch (err) {
        console.error("Error fetching vouchers:", err); // Log the error
        setError("Failed to load vouchers.");
      } finally {
        setLoading(false);
      }
    };

    fetchVouchers();
  }, [batchName]); // Re-fetch if batchName changes

  return (
    <div className="detail-voucher-container">
      <div className="detail-voucher-content">
        <h2>Batch: {batchName}</h2>
        <hr />
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && vouchers.length === 0 && <p>No vouchers found for this batch.</p>}
        {!loading &&
          !error &&
          vouchers.length > 0 &&
          vouchers.map((voucher, index) => (
            <div className="list-voucher-label" key={index}>
              <div className="list-voucher">
                <div className="list-voucher-name">
                  <p>{index + 1}.</p>
                  <p>{voucher.code}</p> {/* Adjust based on the actual voucher data structure */}
                </div>
                <p>{voucher.isActive ? "Active" : "Inactive"}</p> {/* Adjust based on the actual voucher data structure */}
              </div>
              <hr />
            </div>
          ))}
      </div>
    </div>
  );
}
