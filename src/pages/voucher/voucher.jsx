import CreateVoucher from "../../components/create-voucher/CreateVoucher";
import VoucherBatchHistory from "../voucher-batch-history/VoucherBatchHistory";


import "./voucher.css";

export default function Voucher() {
  return (
    <div className="voucher-container">
      <CreateVoucher />
      <VoucherBatchHistory />
    </div>
  );
}
