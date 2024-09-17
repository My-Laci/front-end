import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "../../components/admin-sidebar/admin-sidebar";
import AdminNavbar from "../../components/admin-navbar/admin-navbar";
import "./admin-list-batch.css";

const AdminListBatch = () => {
  const [batchList, setBatchList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://laci-api-46818093185.asia-southeast2.run.app/vouchers", {
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
      } catch (err) {
        setError("Failed to load voucher batches.");
      } finally {
        setLoading(false);
      }
    };

    fetchVouchers();
  }, []);

  return (
    <>
      <AdminNavbar />
      <AdminSidebar />
      <div className="admin-list-batch">
        <h1 className="admin-h1">Batch Created</h1>
        <div className="main-list-batch">
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && batchList.length === 0 && (
            <p>No voucher batches found.</p>
          )}
          {!loading &&
            !error &&
            batchList.length > 0 &&
            batchList.map((batch) => (
              <Link
                to={`/Admin/ListVoucher/${batch.batchName}`}
                className="batch-link"
                key={batch.index}
              >
                <div className="batch-list">
                  <div className="batch-number-list">{batch.index}</div>
                  <div className="batch-name-list">{batch.batchName}</div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default AdminListBatch;
