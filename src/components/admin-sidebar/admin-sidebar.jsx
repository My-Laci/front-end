import { BrowserRouter as Router, Link } from "react-router-dom";
import CheckIcon from "../../assets/check.svg";
import CreateVoucherIcon from "../../assets/voucher.svg";
import HistoryIcon from "../../assets/history.svg";
import ValidateIcon from "../../assets/validate.svg";
import Logo from "../../assets/Laci.svg";
import "./admin-sidebar.css";

export default function AdminSidebar() {
  return (
    <div className="admin-sidebar">
      <div className="logo">
        <img src={Logo} alt="Laci Logo" />
      </div>
      <Link to="/AdminCreateVoucher" className="nav-link">
        <button>
          <img src={CreateVoucherIcon} alt="Edit" className="edit-icon" />
          Create Voucher
        </button>
      </Link>
      <Link to="/AdminCreateVoucher" className="nav-link">
        <button>
          <img src={CheckIcon} alt="Edit" className="edit-icon" />
          Voucher List
        </button>
      </Link>
      <Link to="/AdminCreateVoucher" className="nav-link">
        <button>
          <img src={HistoryIcon} alt="Edit" className="edit-icon" />
          History
        </button>
      </Link>
      <Link to="/AdminValidate" className="nav-link">
        <button>
          <img src={ValidateIcon} alt="Edit" className="edit-icon" />
          Validate
        </button>
      </Link>
    </div>
  );
}
