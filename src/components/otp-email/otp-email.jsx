import './otp-email.css';
import { useState } from 'react';

export default function ChangeEmail() {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);

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

    return (
        <div className="emailVerification-card">
            <div className="changeEmail-description">
                <h2>Change Email</h2>
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
                <div className="button-container">
                    <button className="resend-button">Resend OTP</button>
                    <button className="verify-button">Verify</button>
                </div>
            </div>
        </div>
    );
}
