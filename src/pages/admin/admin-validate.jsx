import React, { useState } from 'react';
import AdminSidebar from "../../components/admin-sidebar/admin-sidebar";
import AdminNavbar from "../../components/admin-navbar/admin-navbar";
import "./admin-validate.css";

const AdminValidate = () => {
    // State for users and search query
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([
        {
            id: 1,
            name: "John Doe",
            email: "johndoe@example.com",
            internshipPeriod: "June 2023 - August 2023",
            jobDesk: "Frontend Developer",
            position: "Intern"
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "janesmith@example.com",
            internshipPeriod: "July 2023 - September 2023",
            jobDesk: "Backend Developer",
            position: "Intern"
        },
        {
            id: 3,
            name: "Michael Johnson",
            email: "michaelj@example.com",
            internshipPeriod: "May 2023 - July 2023",
            jobDesk: "UI/UX Designer",
            position: "Intern"
        }
    ]);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filtered users based on search query
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <AdminNavbar />
            <div className="admin-validate-container">
                <AdminSidebar />
                <div className="admin-validate-content">
                    <h2 className="admin-validate-h1">Validate Interns</h2>
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        className="search-bar"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    {filteredUsers.length === 0 ? (
                        <p>No users found.</p>
                    ) : (
                        filteredUsers.map(user => (
                            <div key={user.id} className="user-validation-card">
                                <h3>Data Diri</h3>
                                <p><strong>Nama:</strong> {user.name}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <h3>Informasi Magang</h3>
                                <p><strong>Periode Magang:</strong> {user.internshipPeriod}</p>
                                <p><strong>Jobdesk:</strong> {user.jobDesk}</p>
                                <p><strong>Posisi:</strong> {user.position}</p>
                                <button className="validate-button">Validasi</button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default AdminValidate;