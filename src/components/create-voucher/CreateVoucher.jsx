import React, { useState } from "react";
import { CreateVouchers } from "../../apis/VoucherApis";
import "./CreateVoucher.css";

export default function CreateVoucher() {
  const [batchName, setBatchName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCreateVoucher = async () => {
    try {
      const data = {
        batchName,
        quantity,
      };

      const response = await CreateVouchers(data);

      // Tangani respons yang berhasil
      setSuccess("Voucher created successfully!");
      console.log("Voucher created successfully:", response);
    } catch (error) {
      // Tangani kesalahan
      setError(error.message);
      console.error("Error creating voucher:", error);
    }
  };

  return (
    <div className="create-voucher-content">
      <h2>Create Voucher</h2>
      <hr />
      <div className="create-voucher-input">
        <input
          type="text"
          placeholder="Batch Name"
          value={batchName}
          onChange={(e) => setBatchName(e.target.value)}
        />
        <input
          type="number"
          min="0"
          step="1"
          placeholder="Voucher Amount"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div>
      <button onClick={handleCreateVoucher}>Create Voucher</button>

      <div className="create-voucher-result">
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        {success && <p style={{ color: "green", marginTop: "10px" }}>{success}</p>}
      </div>
    </div>
  );
}
