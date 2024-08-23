import { useState, useEffect } from 'react';
import './account-info.css';
import editIcon from '../../assets/editIcon.svg';
import { useNavigate } from 'react-router-dom';

export default function AccountInfo() {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('URL_API_YANG_SESUAI'); // Ganti dengan URL API Anda
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                const data = await response.json();
                setUser({
                    name: data.name,
                    email: data.email,
                    password: '********', // Anda dapat mengubah ini jika password perlu ditampilkan berbeda
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError(true);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="account-card">
            <div className="account-description">
                <h2>Account Information</h2>
                <hr />
                <ul>
                    <li>
                        <div className="account-info">
                            <span className="label">Nama:</span>
                            <span className="value">{error ? 'Error loading name' : user.name}</span>
                        </div>
                        <button className="account-edit-li" onClick={() => navigate('/changeName')}>
                            <img src={editIcon} alt="Edit" className="account-edit-icon" />
                        </button>
                    </li>
                    <li>
                        <div className="account-info">
                            <span className="label">Email:</span>
                            <span className="value">{error ? 'Error loading email' : user.email}</span>
                        </div>
                        <button className="account-edit-li" onClick={() => navigate('/changeEmail')}>
                            <img src={editIcon} alt="Edit" className="account-edit-icon" />
                        </button>
                    </li>
                    <li>
                        <div className="account-info">
                            <span className="label">Password:</span>
                            <span className="value">{user.password}</span>
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
