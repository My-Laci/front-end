/* eslint-disable react/prop-types */
import './otp-email.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export default function OTPEmail({ user, token }) {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        let timer;
        if (resendTimer > 0) {
            timer = setInterval(() => {
                setResendTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [resendTimer]);

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
        setIsVerifying(true);
        setError(null);

        const otpCode = otp.join('');
        try {
            const response = await axios.post(`https://laci-api-owihrlqaza-et.a.run.app/users/${user._id}/verifyEmail`,
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
                toast.success('Email verified successfully!');
                setTimeout(() => {
                    navigate('/accountinfo');
                }, 2000);
            } else {
                setError('Verification failed. Please check the OTP and try again.');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            setError(error.response?.data?.message || 'An error occurred during OTP verification.');
        } finally {
            setIsVerifying(false);
        }
    };

    const handleResend = async () => {
        setIsResending(true);
        setError(null);

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
            toast.success('Verification email has been resent.');
            setResendTimer(30); // Set timer ke 30 detik
        } catch (error) {
            console.error('Error sending OTP email:', error);
            setError(error.response?.data?.message || 'An error occurred while sending the verification email.');
        } finally {
            setIsResending(false);
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
                    <button className="resend-button" onClick={handleResend} disabled={isResending || resendTimer > 0}>
                        {isResending ? "Sending..." : resendTimer > 0 ? `Resend OTP (${resendTimer}s)` : "Resend OTP"}
                    </button>
                    <button className="verify-button" onClick={handleVerify} disabled={isVerifying}>
                        {isVerifying ? "Verifying..." : "Verify"}
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
