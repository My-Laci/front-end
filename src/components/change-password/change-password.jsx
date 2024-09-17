import { useState } from "react";
import axios from "axios";
import './change-password.css';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';


export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handlePasswordChange = async () => {
        // Validasi apakah password baru dan konfirmasi password sama
        if (newPassword !== confirmPassword) {
            setError("New password and confirmation password do not match.");
            return;
        }

        try {
            const token = Cookies.get('token');
            const userId = jwtDecode(token).payload.id;
            const response = await axios.patch(`https://laci-api-46818093185.asia-southeast2.run.app/users/${userId}/updatePassword`, {
                oldPassword,
                newPassword
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                setSuccess("Password changed successfully.");
                setError(""); // Menghilangkan pesan error jika berhasil
                navigate('/AccountInfo');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('Failed to update password. Please try again.');
            }
        }
    };

    return (
        <div>
            <div className="changePassword-card">
                <div className="changePassword-description">
                    <h2>Change Password</h2>
                    <hr />
                    <input
                        type="password"
                        placeholder="Enter your current password"
                        className="changePassword-password-input"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <div className='changePassword-new-input'>
                        <input
                            type="password"
                            placeholder="Enter your new password"
                            className="changePassword-password-input"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Re-enter your new password"
                            className="changePassword-password-input"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                </div>
            </div>
            <button onClick={handlePasswordChange} className="save-changes-button">Save Changes</button>
        </div>

    );
}
