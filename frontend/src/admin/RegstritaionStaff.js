import React, { useState, useEffect } from "react";
import axios from "axios";

const LibraryStaff = () => {
  const [staff, setStaff] = useState([]);
  const [editStaff, setEditStaff] = useState(null);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "" });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchLibraryStaff();
  }, []);

  const fetchLibraryStaff = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/user/admin/library-staff", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStaff(response.data.staff);
    } catch (error) {
      console.error("Error fetching staff data", error);
    }
  };

  const handleEdit = (staffMember) => {
    setEditStaff(staffMember);
    setFormData({ firstName: staffMember.firstName, lastName: staffMember.lastName, email: staffMember.email });
  };

  const handleUpdate = async () => {
    if (!editStaff) return;

    try {
      await axios.patch(
        `http://localhost:3000/api/user/admin/update-staff/${editStaff.id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditStaff(null);
      fetchLibraryStaff();
    } catch (error) {
      console.error("Error updating staff", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      try {
        await axios.delete(`http://localhost:3000/api/user/admin/delete-staff/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchLibraryStaff();
      } catch (error) {
        console.error("Error deleting staff", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Library Staff Management</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">First Name</th>
              <th className="py-3 px-6 text-left">Last Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {staff.map((staffMember) => (
              <tr key={staffMember._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{staffMember.firstName}</td>
                <td className="py-3 px-6 text-left">{staffMember.lastName}</td>
                <td className="py-3 px-6 text-left">{staffMember.email}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleEdit(staffMember)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(staffMember._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editStaff && (
        <div className="mt-6 p-4 bg-gray-100 rounded shadow-md">
          <h3 className="text-lg font-bold text-gray-700 mb-4">Edit Staff Member</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="p-2 border rounded w-full"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="p-2 border rounded w-full"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="p-2 border rounded w-full"
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Update
            </button>
            <button onClick={() => setEditStaff(null)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LibraryStaff;
