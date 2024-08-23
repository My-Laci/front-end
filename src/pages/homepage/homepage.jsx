import React, { useState } from "react";
import LoginRegisterPopup from "../../components/loginregister-popup/loginregister-popup.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import SidebarTablet from "../../components/sidebar-tablet/sidebar-tablet.jsx";
import Sidebar from "../../components/sidebar/sidebar.jsx";
import PostContent from "../../components/post-content/post-content.jsx";
import Aside from "../../components/aside/aside.jsx";
import "./homepage.css";

const Homepage = () => {
  const [showPopup, setShowPopup] = useState(true); // Show popup on first load

  const closePopup = () => {
    setShowPopup(false); // Close the popup when user interacts with it
  };

  return (
    <>
      <body>
        <Navbar />
        <Sidebar />
        <div className="container">
          <div className="content">
            <PostContent showCommentSection={true} />
          </div>
          <SidebarTablet />
          <Aside />
        </div>
        <LoginRegisterPopup show={showPopup} onClose={closePopup} />
      </body>
    </>
  );
};

export default Homepage;
