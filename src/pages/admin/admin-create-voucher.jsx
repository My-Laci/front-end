import React from "react";
// import SaveButton from "../../components/"
import AdminSidebar from "../../components/admin-sidebar/admin-sidebar";
<<<<<<< HEAD
import AdminNavbar from "../../components/admin-navbar/admin-navbar";
=======
>>>>>>> 920f0ff71a649808ebdb0fbdff658a19d1295f3c
import "./admin-create-voucher.css";

const AdminCreateVoucher = () => {
  return (
    <>
<<<<<<< HEAD
      <AdminNavbar />
      <body>
        <AdminSidebar />
        <div className="admin-create-content">
          <h1 className="admin-h1">Create New Vouchers</h1>
=======
      <body>
        <AdminSidebar />
        <div className="admin-create-content">
          <h1>Create New Vouchers</h1>
>>>>>>> 920f0ff71a649808ebdb0fbdff658a19d1295f3c
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
