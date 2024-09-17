import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../../components/admin-sidebar/admin-sidebar";
import AdminNavbar from "../../components/admin-navbar/admin-navbar";
import "./admin-list-voucher.css";

const AdminListVoucher = () => {
  const [vouchers, setVouchers] = useState([]);
  const batchName = "test";

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await axios.get(
          `https://laci-api-46818093185.asia-southeast2.run.app/vouchers/batch/${batchName}`
        );
        setVouchers(response.data);
      } catch (error) {
        console.error("Error fetching vouchers:", error);
      }
    };

    fetchVouchers();
  }, [batchName]);

  return (
    <>
      <AdminNavbar />
      <AdminSidebar />
      <div className="admin-list-content">
        <h1 className="admin-h1">{batchName}</h1>
        <div className="main-list-voucher">
          {vouchers.map((voucher, index) => (
            <div key={voucher._id} className="voucher-list">
              <div className="left-voucher-side">
                <div className="voucher-number-list">{index + 1}</div>
                <div className="voucher-code">{voucher.code}</div>
              </div>
              <div className="right-voucher-side">
                <div className="voucher-status">
                  {voucher.isActive ? "active" : "inactive"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminListVoucher;
