import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Component/Login";
import AdminDashboard from "./Pages/AdminDashboard";
import StaffDashboard from "./Pages/StaffDashboard";
import ProtectedRoute from "./Component/ProtectedRoute";
import Books from "./library-staff/Books";
import Seat from "./library-staff/seat";
import Dashboard from "./library-staff/Dashborad";
import AdminDash from "./admin/AdminDash";
import RegstritaionStaff from "./admin/RegstritaionStaff";


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<ProtectedRoute role="admin" />}>
                    <Route path="/admin" element={<AdminDashboard />}>
                        <Route path="dashboard" element={<AdminDash />} />
                        <Route path="staff" element={<RegstritaionStaff/>} />
                    </Route>
                </Route>
                <Route element={<ProtectedRoute role="library-staff" />}>
                    <Route path="/library-staff" element={<StaffDashboard />}>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="seat" element={<Seat />} />
                        <Route path="books" element={<Books />} />
                    </Route>
                </Route>

                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;