import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getUserById } from "../apis/UserApis";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/sidebar";
import SidebarTablet from "../components/sidebar-tablet/sidebar-tablet";

export default function UserLayout() {
  const [user, setUser] = useState(null); // State to hold user info

  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = Cookies.get("token");

        if (token) {
          // Token exists, decode it to get userId
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
          const userId = decodedToken.payload.id;

          // Fetch user profile using getUserById
          const profileResponse = await axios.get(
            `http://localhost:8080/users/${userId}`
          );

          setUser(profileResponse.data); // Set profile data
        } else {
          // No token means guest
          setUser({ name: "Guest", agencyOrigin: "Guest Campus" });
        }
      } catch (error) {
        console.error("Failed to check user", error);
        setUser({ name: "Guest", agencyOrigin: "Guest Campus" }); // Fallback for errors
      }
    };

    checkUser();
  }, []);

  return (
    <div className="user-layout-container">
      <Navbar userData={user} /> 
      <Sidebar userData={user} />
      <SidebarTablet userData={user} />
      <Outlet />
    </div>
  );
}
