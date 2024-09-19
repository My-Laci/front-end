import "./VoucherBatchHistory.css";
import { Link } from "react-router-dom";

export default function VoucherBatchHistory() {
  return (
    <div className="voucher-batch-content">
      <h2>Voucher Batch History</h2>
      <hr />
      <div className="voucher-batch-search">
        <input type="text" id="voucher-batch-search" />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <div className="voucher-batch-container">
        <div className="voucher-batch-label">
          <Link to="/DetailVoucher">
            {" "}
            <div className="voucher-batch-label-text">
              <p>BUDIONO SIREGAR</p>
              <p>2 JANUARI 2024</p>
            </div>
          </Link>
          <div className="voucher-batch-delete">
            <i className="fa-solid fa-trash"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
