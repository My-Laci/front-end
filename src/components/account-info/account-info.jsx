import './account-info.css';
import editIcon from '../../assets/editIcon.svg';


export default function AccountInfo() {
    return (
        <div className="account-card">
            <div className="account-description">
                <h2>Account Information</h2>
                <hr></hr>
                <ul>
                    <li>
                        <div className="account-info">
                            <span className="label">Nama:</span>
                            <span className="value">John Doe</span>
                        </div>
                        <button className="account-edit-li">
                            <img src={editIcon} alt="Edit" className="account-edit-icon" />
                        </button>
                    </li>
                    <li>
                        <div className="account-info">
                            <span className="label">Email:</span>
                            <span className="value">johndoe@example.com</span>
                        </div>
                        <button className="account-edit-li">
                            <img src={editIcon} alt="Edit" className="account-edit-icon" />
                        </button>
                    </li>
                    <li>
                        <div className="account-info">
                            <span className="label">Password:</span>
                            <span className="value">********</span>
                        </div>
                        <button className="account-edit-li">
                            <img src={editIcon} alt="Edit" className="account-edit-icon" />
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

