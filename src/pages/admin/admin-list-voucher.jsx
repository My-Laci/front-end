import React from "react";
import AdminSidebar from "../../components/admin-sidebar/admin-sidebar";
import AdminNavbar from "../../components/admin-navbar/admin-navbar";
import ListVoucherBackButton from "../../assets/back-button.svg";
import "./admin-list-voucher.css";

const AdminListVoucher = () => {
  return (
    <>
      <AdminNavbar />
      <AdminSidebar />
      <body>
        <div className="admin-list-content">
          <h1 className="admin-h1">Magang Batch 3</h1>
          <div className="main-list-voucher">
            <div className="voucher-list">
              <div className="left-voucher-side">
                <div className="voucher-number-list">1</div>
                <div className="voucher-code">VHS912OOP1ER</div>
              </div>
              <div className="right-voucher-side">
                <div className="voucher-status">active</div>
              </div>
            </div>
            <div className="voucher-list">
              <div className="left-voucher-side">
                <div className="voucher-number-list">2</div>
                <div className="voucher-code">VHS912OOP1ER</div>
              </div>
              <div className="right-voucher-side">
                <div className="voucher-status">active</div>
              </div>
            </div>
            <div className="voucher-list">
              <div className="left-voucher-side">
                <div className="voucher-number-list">3</div>
                <div className="voucher-code">VHS912OOP1ER</div>
              </div>
              <div className="right-voucher-side">
                <div className="voucher-status">active</div>
              </div>
            </div>
            <div className="voucher-list">
              <div className="left-voucher-side">
                <div className="voucher-number-list">4</div>
                <div className="voucher-code">VHS912OOP1ER</div>
              </div>
              <div className="right-voucher-side">
                <div className="voucher-status">active</div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default AdminListVoucher;
