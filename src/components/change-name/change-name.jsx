/* eslint-disable no-unused-vars */
import { useState } from 'react';
import axios from 'axios';
import './change-name.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

export default function ChangeName() {
    const [newFullName, setNewFullName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleNameChange = async () => {
        const token = Cookies.get('token');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.payload.id;
            console.log(token);
            console.log(userId);

            await axios.patch(`http://localhost:8080/users/${userId}/updateFullName`, {
                newFullName,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            // Navigate to account info page after successful change
            navigate('/AccountInfo');
        } catch (error) {
            console.error('Error updating name:', error);
            setError('Failed to update name. Please try again.');
        }
    };

    return (
        <div>
            <div className="changeName-card">
                <div className="changeName-description">
                    <h2>Change Full Name</h2>
                    <hr></hr>
                    <input
                        type="text"
                        placeholder="Enter new full name"
                        className="name-input"
                        value={newFullName}
                        onChange={(e) => setNewFullName(e.target.value)}
                    />
                    {error && <p className="error-message">{error}</p>}
                </div>
            </div>
            <button onClick={handleNameChange} className="save-changes-button">Save Changes</button>
        </div>
    );
}

