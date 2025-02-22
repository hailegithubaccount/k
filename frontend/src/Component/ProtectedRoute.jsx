import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ role }) => {
    // Get the token and role from localStorage
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    // Check if the user's role matches the required role
    if (!token || userRole !== role) {
        return <Navigate to="/login" />; // Redirect to login if not authorized
    }

    return <Outlet />; // Render the child routes if authorized
};

export default ProtectedRoute;