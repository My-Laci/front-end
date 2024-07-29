import React from "react";
// import SaveButton from "../../components/"
import AdminSidebar from "../../components/admin-sidebar/admin-sidebar";
import "./admin-create-voucher.css";

const AdminCreateVoucher = () => {
  return (
    <>
      <body>
        <AdminSidebar />
        <div className="admin-create-content">
          <h1>Create New Vouchers</h1>
          <input
            type="text"
            placeholder="Voucher Batch Name"
            className="create-voucher-batch-name"
          />
          <input
            type="number"
            placeholder="Voucher Total"
            className="create-voucher-batch-total"
            min="1"
          />
          <button></button>
        </div>
      </body>
    </>
  );
};

export default AdminCreateVoucher;
