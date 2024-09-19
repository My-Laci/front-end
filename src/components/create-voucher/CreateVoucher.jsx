import "./CreateVoucher.css";

export default function CreateVoucher() {
  return (
    <div className="create-voucher-content">
      <h2>Create Voucher</h2>
      <hr />
      <div className="create-voucher-input">
        <input type="text" placeholder="Batch Name" />
        <input
          type="number"
          min="0" // Batas minimum angka
          step="1" // Langkah setiap kali tombol panah ditekan
          placeholder="Voucher Amount"
        />
      </div>
      <button>Create Voucher</button>
    </div>
  );
}
