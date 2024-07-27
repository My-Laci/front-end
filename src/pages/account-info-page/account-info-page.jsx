import Navbar from "../../components/navbar/Navbar.jsx";
import Sidebar from "../../components/sidebar/sidebar.jsx";
import AccountInfo from "../../components/account-info/account-info.jsx";
import "./account-info-page.css";

const AccountInfoPage = () => {
    return (
        <>
            <body>
                <Navbar />
                <div className="container">
                    <Sidebar />
                    <div className="content">
                        <AccountInfo />
                    </div>

                </div>
            </body>
        </>
    );
};

export default AccountInfoPage;
