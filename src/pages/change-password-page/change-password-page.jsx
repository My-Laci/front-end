import Navbar from "../../components/navbar/Navbar.jsx";
import Sidebar from "../../components/sidebar/sidebar.jsx";
import "./change-password-page.css";
import ChangePassword from "../../components/change-password/change-password.jsx";

export default function ChangePasswordPage() {
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