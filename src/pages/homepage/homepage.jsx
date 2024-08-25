import { useState, useEffect } from "react";
import LoginRegisterPopup from "../../components/loginregister-popup/loginregister-popup.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import SidebarTablet from "../../components/sidebar-tablet/sidebar-tablet.jsx";
import Sidebar from "../../components/sidebar/sidebar.jsx";
import PostContent from "../../components/post-content/post-content.jsx";
import Aside from "../../components/aside/aside.jsx";
import axios from "axios";
import Cookies from "js-cookie";
import "./homepage.css";

const Homepage = () => {
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  const [showPopup, setShowPopup] = useState(true);
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <body>
        <Navbar />
        <div className="container">
          <Sidebar />
          <SidebarTablet />
          <div className="content">
            <PostContent showCommentSection={true} />
          </div>
          <Aside />
        </div>
        <LoginRegisterPopup show={showPopup} onClose={closePopup} />
      </body>
    </>
  );
};

export default Homepage;
