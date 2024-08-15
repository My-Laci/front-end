import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import AdminSidebar from "../../components/admin-sidebar/admin-sidebar";
import AdminNavbar from "../../components/admin-navbar/admin-navbar";
import "./admin-list-batch.css";

const AdminListBatch = () => {
  return (
    <>
      <AdminNavbar />
      <AdminSidebar />
      <body>
        <div className="admin-list-batch">
          <h1 className="admin-h1">Batch Created</h1>
          <div className="main-list-batch">
            <Link to="/AdminCreateVoucher" className="batch-link">
              <a className="batch-list" href="/">
                <div className="batch-number-list">1</div>
                <div className="batch-name-list">Magang Batch 1</div>
              </a>
            </Link>
            <Link to="/AdminCreateVoucher" className="batch-link">
              <a className="batch-list" href="/">
                <div className="batch-number-list">2</div>
                <div className="batch-name-list">Magang Batch 2</div>
              </a>
            </Link>
            <Link to="/AdminCreateVoucher" className="batch-link">
              <a className="batch-list" href="/">
                <div className="batch-number-list">3</div>
                <div className="batch-name-list">Magang Batch 3</div>
              </a>
            </Link>
            <Link to="/AdminCreateVoucher" className="batch-link">
              <a className="batch-list" href="/">
                <div className="batch-number-list">4</div>
                <div className="batch-name-list">Magang Batch 4</div>
              </a>
            </Link>
            <Link to="/AdminCreateVoucher" className="batch-link">
              <a className="batch-list" href="/">
                <div className="batch-number-list">5</div>
                <div className="batch-name-list">Magang Batch 5</div>
              </a>
            </Link>
          </div>
        </div>
      </body>
    </>
  );
};

export default AdminListBatch;
