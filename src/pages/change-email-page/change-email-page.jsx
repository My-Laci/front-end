import Navbar from "../../components/navbar/Navbar.jsx";
import Sidebar from "../../components/sidebar/sidebar.jsx";
import "./change-email-page.css";
import SaveChangesButton from "../../components/save-changes-button/save-changes-button.jsx";
import ChangeEmail from "../../components/change-email/change-email.jsx";

const ChangeEmailPage = () => {
    return (
        <>
            <body>
                <Navbar />
                <div className="container">
                    <Sidebar />
                    <div className="content">
                        <ChangeEmail />
                        <SaveChangesButton />
                    </div>

                </div>
            </body>
        </>
    );
};

export default ChangeEmailPage;
