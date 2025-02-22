import API from "../axiosConfig";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
    const [staffList, setStaffList] = useState([]);

    useEffect(() => {
        const fetchStaff = async () => {
            const { data } = await API.get("/admin/staff");
            setStaffList(data.staff);
        };
        fetchStaff();
    }, []);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h2>Registered Library Staff</h2>
            <ul>
                {staffList.map((staff) => (
                    <li key={staff.id}>{staff.firstName} {staff.lastName}</li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
