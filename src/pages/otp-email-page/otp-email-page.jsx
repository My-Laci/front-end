import Navbar from "../../components/navbar/Navbar.jsx";
import Sidebar from "../../components/sidebar/sidebar.jsx";
import "./otp-email-page.css";
import OtpEmail from "../../components/otp-email/otp-email.jsx";

const OtpEmailPage = () => {
    return (
        <>
            <body>
                <Navbar />
                <div className="changeEmail-container">
                    <Sidebar />
                    <div className="changeEmail-content">
                        <OtpEmail />
                    </div>

                </div>
            </body>
        </>
    );
};

export default OtpEmailPage;
