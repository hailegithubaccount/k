import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";

const Seats = () => {
  const [seats, setSeats] = useState([]);
  const [formData, setFormData] = useState({ seatNumber: "", isAvailable: "", location: "" });
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editSeatId, setEditSeatId] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchSeats = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. User is not authenticated.");
        return;
      }

      const response = await axios.get("http://localhost:3000/api/user/seat/readSeat", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Fetched seats:", response.data.data);
      setSeats(response.data.data);
    } catch (error) {
      console.error("Error fetching seats:", error);
    }
  }, []);

  useEffect(() => {
    fetchSeats();
  }, [fetchSeats]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.location) newErrors.location = "Location is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You are not authenticated. Please log in.");
        navigate("/login");
        return;
      }

      const payload = {
        location: formData.location,
        seatNumber: formData.seatNumber || null, // Make seatNumber optional
        isAvailable: formData.isAvailable || null, // Make isAvailable optional
      };

      if (isEditing) {
        await axios.patch(`http://localhost:3000/api/user/seat/updateSeat/${editSeatId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsEditing(false);
        setEditSeatId(null);
      } else {
        await axios.post("http://localhost:3000/api/user/seat/insertSeat", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setFormData({ seatNumber: "", isAvailable: "", location: "" });
      fetchSeats();
    } catch (error) {
      console.error("Error saving seat:", error);
      setError(error.response ? error.response.data.message : "An error occurred, please try again.");
    }
  };

  const handleEdit = (seat) => {
    setFormData({
      seatNumber: seat.seatNumber || "",
      isAvailable: seat.isAvailable || "",
      location: seat.location,
    });
    setIsEditing(true);
    setEditSeatId(seat.id);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You are not authenticated. Please log in.");
        navigate("/login");
        return;
      }

      await axios.delete(`http://localhost:3000/api/user/seat/deleteSeat/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSeats();
    } catch (error) {
      console.error("Error deleting seat:", error);
      setError(error.response ? error.response.data.message : "An error occurred, please try again.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Seat Management</h1>

      {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            name="seatNumber"
            placeholder="Seat Number (Optional)"
            value={formData.seatNumber}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <select
            name="isAvailable"
            value={formData.isAvailable}
            onChange={handleInputChange}
            className="p-2 border rounded"
          >
            <option value="">Select Availability (Optional)</option>
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          {isEditing ? "Update Seat" : "Add Seat"}
        </button>
      </form>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Seat Number</th>
            <th className="p-2 border">Location</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {seats.map((seat) => (
            <tr key={seat.id} className="hover:bg-gray-100">
              <td className="p-2 border">{seat.seatNumber || "N/A"}</td>
              <td className="p-2 border">{seat.location}</td>
              <td className="p-2 border">
                <button onClick={() => handleEdit(seat)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(seat.id)} className="bg-red-500 text-white px-2 py-1 rounded">
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

export default Seats;