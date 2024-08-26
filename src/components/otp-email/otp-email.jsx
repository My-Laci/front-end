/* eslint-disable react/prop-types */
import './otp-email.css';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export default function OTPEmail({ user, token }) {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleOtpChange = (e, index) => {
        const value = e.target.value;
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value && index < 5) {
                document.getElementById(`otp-${index + 1}`).focus();
            }
        }
    };

    const handleVerify = async () => {
        const otpCode = otp.join('');
        console.log(otpCode);
        console.log(user.email);
        try {
            const response = await axios.post(`http://localhost:8080/users/${user._id}/verifyEmail`,
                {
                    otp: otpCode
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.data.verified) {
                toast.success('Email verified successfully!'); // Tampilkan pesan sukses
                setTimeout(() => {
                    navigate('/accountinfo'); // Redirect setelah beberapa detik
                }, 2000); // Delay 2 detik untuk memungkinkan pengguna melihat pesan sukses
            } else {
                setError('Verification failed. Please check the OTP and try again.');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            setError(error.response?.data?.message || 'An error occurred during OTP verification.');
        }
    };

    const handleResend = async () => {
        try {
            await axios.post(`http://localhost:8080/users/${user._id}/sendEmailVerification`,
                { email: user.email },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            // Notify user that email has been sent
            alert('Verification email has been resent.');
        } catch (error) {
            console.error('Error sending OTP email:', error);
            setError(error.response?.data?.message || 'An error occurred while sending the verification email.');
        }
    };

    return (
        <div className="emailVerification-card">
            <div className="changeEmail-description">
                <h2>Verify your Email</h2>
                <hr></hr>
                <p className="otp-instruction">
                    To proceed, we have sent an OTP code to your current email.<br />
                    Please enter the received OTP code below.
                </p>

                <div className="otp-input-container">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleOtpChange(e, index)}
                            className="otp-input"
                        />
                    ))}
                </div>
                {error && <p className="error-message">{error}</p>}
                <div className="button-container">
                    <button className="resend-button" onClick={handleResend}>Resend OTP</button>
                    <button className="verify-button" onClick={handleVerify}>Verify</button>
                </div>
            </div>
        </div>
    );
}
