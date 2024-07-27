// import React from "react";
import Navbar from "../../components/navbar/Navbar.jsx";
import Sidebar from "../../components/sidebar/sidebar.jsx";
import PostContent from "../../components/post-content/post-content.jsx";
import Aside from "../../components/aside/aside.jsx";
import "./homepage.css";

const Homepage = () => {
  return (
    <>
      <body>
        <Navbar />
        <div className="container">
          <Sidebar />
          <div className="content">
            <PostContent />
          </div>
          <Aside />
        </div>
      </body>
    </>
  );
};

export default Homepage;
