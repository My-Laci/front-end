import "./admin-sidebar.css";
import CreateVoucherIcon from "../../assets/voucher.svg";
import HistoryIcon from "../../assets/history.svg";
import Logo from "../../assets/Laci.svg";

export default function AdminSidebar() {
  return (
    <div className="admin-sidebar">
      <div className="logo">
        <img src={Logo} alt="Laci Logo" />
      </div>
      <button>
        <img src={CreateVoucherIcon} alt="Edit" className="edit-icon" />
        Create Voucher
      </button>
      <button>
        <img src={HistoryIcon} alt="Edit" className="edit-icon" />
        History
      </button>
    </div>
  );
}
