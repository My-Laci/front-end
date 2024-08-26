/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar.jsx";
import Sidebar from "../../components/sidebar/sidebar.jsx";
import "./change-password-page.css";
import ChangePassword from "../../components/change-password/change-password.jsx";

export default function ChangePasswordPage() {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = Cookies.get("token");

                if (!token) {
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
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    Cookies.remove("token");
                    navigate("/login");
                }
            }
        };

        fetchUserData();
    }, [navigate]);

    return (
        <>
            <body>
                <Navbar />
                <div className="changePassword-container">
                    <Sidebar />
                    <div className="changePassword-content">
                        <ChangePassword />
                    </div>

                </div>
            </body>
        </>
    );
}