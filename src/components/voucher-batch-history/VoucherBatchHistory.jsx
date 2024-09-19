import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./VoucherBatchHistory.css";

export default function VoucherBatchHistory() {
  const [batchList, setBatchList] = useState([]);
  const [filteredBatchList, setFilteredBatchList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/vouchers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const groupedVouchers = Object.keys(response.data).map(
          (batchName, index) => ({
            batchName,
            index: index + 1,
          })
        );

        setBatchList(groupedVouchers);
        setFilteredBatchList(groupedVouchers);
      } catch (err) {
        setError("Failed to load voucher batches.");
      } finally {
        setLoading(false);
      }
    };

    fetchBatches();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = batchList.filter((batch) =>
        batch.batchName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBatchList(filtered);
    } else {
      setFilteredBatchList(batchList);
    }
  }, [searchTerm, batchList]);

  const handleDelete = async (batchName) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this voucher batch?"
    );

    if (isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(
          `http://localhost:8080/vouchers/batch/${batchName}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBatchList((prevList) =>
          prevList.filter((batch) => batch.batchName !== batchName)
        );
        setFilteredBatchList((prevList) =>
          prevList.filter((batch) => batch.batchName !== batchName)
        );
      } catch (err) {
        setError("Failed to delete the voucher batch.");
      }
    }
  };

  return (
    <div className="voucher-batch-content">
      <h2>Voucher Batch History</h2>
      <hr />
      <div className="voucher-batch-search">
        <input
          type="text"
          id="voucher-batch-search"
          placeholder="Search batches..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <div className="voucher-batch-container">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && filteredBatchList.length === 0 && (
          <p>No voucher batches found.</p>
        )}
        {!loading &&
          !error &&
          filteredBatchList.length > 0 &&
          filteredBatchList.map((batch) => (
            <div className="voucher-batch-label" key={batch.index}>
              <Link to="/DetailVoucher" state={{ batchName: batch.batchName }}>
                <div className="voucher-batch-label-text">
                  <p>{batch.batchName}</p>
                </div>
              </Link>
              <div className="voucher-batch-delete">
                <i
                  className="fa-solid fa-trash"
                  onClick={() => handleDelete(batch.batchName)}
                  style={{ cursor: "pointer" }}
                ></i>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
