import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const RegistrationStaff = () => {
  const [staff, setStaff] = useState([]);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editStaffId, setEditStaffId] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch all staff members
  const fetchLibraryStaff = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. User is not authenticated.");
        return;
      }

      const response = await axios.get("http://localhost:3000/api/user/admin/library-staff", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStaff(response.data.staff);
    } catch (error) {
      console.error("Error fetching staff data:", error);
    }
  }, []);

  useEffect(() => {
    fetchLibraryStaff();
  }, [fetchLibraryStaff]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle submit (add/update staff)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You are not authenticated. Please log in.");
        navigate("/login");
        return;
      }

      if (isEditing) {
        if (!editStaffId) {
          console.error("editStaffId is undefined");
          return;
        }

        await axios.put(
          `http://localhost:3000/api/user/admin/update-staff/${editStaffId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Staff updated successfully!");
        setIsEditing(false);
        setEditStaffId(null);
      } else {
        await axios.post(
          "http://localhost:3000/api/user/admin/create-staff",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Staff added successfully!");
      }

      setFormData({ firstName: "", lastName: "", email: "" });
      fetchLibraryStaff();
    } catch (error) {
      console.error("Error saving staff:", error);
      setError(error.response ? error.response.data.message : "An error occurred, please try again.");
    }
  };

  // Handle edit
  const handleEdit = (staffMember) => {
    setFormData({
      firstName: staffMember.firstName,
      lastName: staffMember.lastName,
      email: staffMember.email,
    });
    setIsEditing(true);
    setEditStaffId(staffMember._id);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You are not authenticated. Please log in.");
          navigate("/login");
          return;
        }

        await axios.delete(`http://localhost:3000/api/user/admin/delete-staff/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        toast.success("Staff deleted successfully!");
        fetchLibraryStaff();
      } catch (error) {
        console.error("Error deleting staff:", error);
        setError(error.response ? error.response.data.message : "An error occurred, please try again.");
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Library Staff Management</h1>

      {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          {isEditing ? "Update Staff" : "Add Staff"}
        </button>
      </form>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">First Name</th>
            <th className="p-2 border">Last Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((staffMember) => (
            <tr key={staffMember._id} className="hover:bg-gray-100">
              <td className="p-2 border">{staffMember.firstName}</td>
              <td className="p-2 border">{staffMember.lastName}</td>
              <td className="p-2 border">{staffMember.email}</td>
              <td className="p-2 border">
                <button
                  onClick={() => handleEdit(staffMember)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(staffMember._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegistrationStaff;
