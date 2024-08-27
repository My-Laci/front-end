/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar.jsx";
import Sidebar from "../../components/sidebar/sidebar.jsx";
import "./change-email-page.css";
import ChangeEmail from "../../components/change-email/change-email.jsx";

const ChangeEmailPage = () => {

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

                const response = await axios.get(`https://laci-api-owihrlqaza-et.a.run.app/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {

                    navigate("/login");
                }
            }
        };

        fetchUserData();
    }, [navigate]);

    return (
        <>
            <div>
                <Navbar />
                <div className="changeEmail-container">
                    <Sidebar />
                    <div className="changeEmail-content">
                        <ChangeEmail />
                    </div>

                </div>
            </div>
        </>
    );
};

export default ChangeEmailPage;
