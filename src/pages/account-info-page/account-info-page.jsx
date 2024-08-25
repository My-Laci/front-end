/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar.jsx";
import Sidebar from "../../components/sidebar/sidebar.jsx";
import AccountInfo from "../../components/account-info/account-info.jsx";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom"; // Import jwt-decode
import "./account-info-page.css";

const AccountInfoPage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); // Inisialisasi useNavigate untuk navigasi

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = Cookies.get("token");

                if (!token) {
                    // Jika tidak ada token, arahkan ke halaman login
                    navigate("/login");
                    return;
                }

                const decodedToken = jwtDecode(token);
                const userId = decodedToken.payload.id;

                const response = await axios.get(`http://localhost:8080/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);

                // Cek apakah error disebabkan oleh token yang invalid atau expired
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    // Hapus token dari cookies dan arahkan ke halaman login
                    Cookies.remove("token");
                    navigate("/login");
                }
            }
        };

        fetchUserData();
    }, [navigate]);

    return (
        <>
            <Navbar />
            <div className="account-container">
                <Sidebar />
                <div className="account-content">
                    {user ? <AccountInfo user={user} /> : <p>Loading...</p>}
                </div>
            </div>
        </>
    );
};

export default AccountInfoPage;