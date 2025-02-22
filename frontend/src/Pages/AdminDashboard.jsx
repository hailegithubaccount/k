import { Link } from "react-router-dom";

const AdminDashboard = () => {
    return (
        <div className="flex min-h-screen bg-white">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white p-4 min-h-screen">
                <h2 className="text-lg font-bold mb-4">Admin Panel</h2>
                <ul>
                    <li className="mb-2">
                        <Link to="/library-staff" className="block p-2 hover:bg-gray-700 rounded">Library Staff</Link>
                    </li>
                    <li>
                        <Link to="/books" className="block p-2 hover:bg-gray-700 rounded">Books</Link>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 bg-white text-gray-900">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <h2 className="text-xl mt-4">Registered Library Staff</h2>
                <ul>
                    {/* List of staff members will go here */}
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;
