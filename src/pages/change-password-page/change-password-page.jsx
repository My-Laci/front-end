import Navbar from "../../components/navbar/Navbar.jsx";
import Sidebar from "../../components/sidebar/sidebar.jsx";
import "./change-password-page.css";
import ChangePassword from "../../components/change-password/change-password.jsx";
import SaveChangesButton from "../../components/save-changes-button/save-changes-button.jsx";

export default function ChangePasswordPage() {
    return (
        <>
            <body>
                <Navbar />
                <div className="changePassword-container">
                    <Sidebar />
                    <div className="changePassword-content">
                        <ChangePassword />
                        <SaveChangesButton />
                    </div>

                </div>
            </body>
        </>
    );
}