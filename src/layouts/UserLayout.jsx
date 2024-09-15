import {  Outlet } from "react-router-dom";

import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/sidebar";
import SidebarTablet from "../components/sidebar-tablet/sidebar-tablet";
export default function UserLayout(){
    return (
        <div className="user-layout-container">
            <Navbar/>
            <Sidebar/>
            <SidebarTablet />
            <Outlet/>
        </div>
    )
}