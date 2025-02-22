import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Component/Login";
import AdminDashboard from "./Pages/AdminDashboard";
import StaffDashboard from "./Pages/StaffDashboard";
import ProtectedRoute from "./Component/ProtectedRoute";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<ProtectedRoute role="admin" />}>
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                </Route>
                <Route element={<ProtectedRoute role="library-staff" />}>
                    <Route path="/library-staff/dashboard" element={<StaffDashboard />} />
                </Route>
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;