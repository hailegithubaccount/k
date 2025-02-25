
import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
    return (
        <div className="flex min-h-screen bg-white">
            {/* Fixed Sidebar */}
            <div className="w-64 bg-gray-800 text-white p-4 min-h-screen">
                <h2 className="text-lg font-bold mb-4">Admin Panel</h2>
                <ul>
                    <li className="mb-2">
                        <Link to="/admin/dashboard" className="block p-2 hover:bg-gray-700 rounded">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/admin/staff" className="block p-2 hover:bg-gray-700 rounded">Library Staff</Link>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 bg-white text-gray-900 ml-64">
                {/* Fixed Navbar */}
                <div className="fixed top-0 left-64 right-0 bg-gray-100 border-b border-gray-300 z-10 p-4">
                    <div className="flex justify-between items-center">
                        {/* Title */}
                        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

                        {/* Icons */}
                        <div className="flex items-center space-x-4">
                            {/* Notification Icon */}
                            <button className="relative p-2 hover:bg-gray-200 rounded-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-gray-700"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                    />
                                </svg>
                                {/* Notification Badge */}
                                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">3</span>
                            </button>

                            {/* Profile Image */}
                            <div className="relative">
                                <img
                                    src="https://i.pinimg.com/736x/c7/9a/37/c79a37e13ef14be556b51143bcbb1b01.jpg" // Replace with your profile image URL
                                    alt="Profile"
                                    className="h-10 w-10 rounded-full cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content (with padding to avoid overlap with navbar) */}
                <div className="pt-20">
                    <h2 className="text-xl mt-4">Welcome, Admin!</h2>
                    {/* Outlet for nested routes */}
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
