/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar.jsx";
import Sidebar from "../../components/sidebar/sidebar.jsx";
import "./otp-email-page.css";
import OtpEmail from "../../components/otp-email/otp-email.jsx";

const OtpEmailPage = () => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const navigate = useNavigate(); // Inisialisasi useNavigate untuk navigasi

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const tokenFromCookie = Cookies.get("token");
                setToken(tokenFromCookie); // Set token ke state

                if (!tokenFromCookie) {
                    // Jika tidak ada token, arahkan ke halaman login
                    navigate("/login");
                    return;
                }

                const decodedToken = jwtDecode(tokenFromCookie);
                const userId = decodedToken.payload.id;

                const response = await axios.get(`https://laci-api-owihrlqaza-et.a.run.app/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${tokenFromCookie}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    Cookies.remove("token");
                    navigate("/login");
                }
            }
        };
        fetchUserData();
    }, [navigate]);

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <Navbar />
            <div className="changeEmail-container">
                <Sidebar />
                <div className="changeEmail-content">
                    <OtpEmail user={user} token={token} />
                </div>
            </div>
        </>
    );
};

export default OtpEmailPage;
