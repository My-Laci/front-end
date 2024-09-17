/* eslint-disable no-unused-vars */
import './change-email.css';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

export default function ChangeEmail() {
    const [newEmail, setNewEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleEmailChange = async () => {
        const token = Cookies.get('token');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.payload.id;

            const response = await axios.patch(`https://laci-api-46818093185.asia-southeast2.run.app/users/${userId}/updateEmail`, {
                newEmail,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                setSuccess("Email changed successfully.");
                setError("");
                navigate('/AccountInfo');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('Failed to update email. Please try again.');
            }
        }
    };

    return (
        <div>
            <div className="changeEmail-card">
                <div className="changeEmail-description">
                    <h2>Change Email</h2>
                    <hr></hr>
                    <input
                        type="text"
                        placeholder="Enter New Email"
                        className="changeEmail-email-input"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)} />
                    {error && <p className="error-message">{error}</p>}
                </div>
            </div>
            <button onClick={handleEmailChange} className="save-changes-button">Save Changes</button>
        </div>

    );
}

