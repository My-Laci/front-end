import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar.jsx";
import Sidebar from "../../components/sidebar/sidebar.jsx";
import AccountInfo from "../../components/account-info/account-info.jsx";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode
import "./account-info-page.css";

const AccountInfoPage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = Cookies.get('token');
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.payload.id;

                console.log(token);
                console.log(decodedToken);
                console.log(userId);

                const response = await axios.get(`http://localhost:8080/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data); // Menyimpan data user di state
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <>
            <Navbar />
            <div className="account-container">
                <Sidebar />
                <div className="account-content">
                    {user ? <AccountInfo user={user} /> : <p>Loading...</p>} {/* Pass user sebagai prop */}
                </div>
            </div>
        </>
    );
};

export default AccountInfoPage;