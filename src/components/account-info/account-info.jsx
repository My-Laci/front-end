import './account-info.css';
import editIcon from '../../assets/editIcon.svg';
import { useNavigate } from 'react-router-dom';

export default function AccountInfo({ user }) { // Terima prop user
    const navigate = useNavigate();

    return (
        <div className="account-card">
            <div className="account-description">
                <h2>Account Information</h2>
                <hr />
                <ul>
                    <li>
                        <div className="account-info">
                            <span className="label">Nama:</span>
                            <span className="value">{user.name}</span>
                        </div>
                        <button className="account-edit-li" onClick={() => navigate('/changeName')}>
                            <img src={editIcon} alt="Edit" className="account-edit-icon" />
                        </button>
                    </li>
                    <li>
                        <div className="account-info">
                            <span className="label">Email:</span>
                            <span className="value">{user.email}</span>
                        </div>
                        <button className="account-edit-li" onClick={() => navigate('/changeEmail')}>
                            <img src={editIcon} alt="Edit" className="account-edit-icon" />
                        </button>
                    </li>
                    <li>
                        <div className="account-info">
                            <span className="label">Password:</span>
                            <span className="value">********</span> {/* Password disembunyikan */}
                        </div>
                        <button className="account-edit-li" onClick={() => navigate('/changePassword')}>
                            <img src={editIcon} alt="Edit" className="account-edit-icon" />
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}
