import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({ name: "", category: "", author: "", photo: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editBookId, setEditBookId] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchBooks = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. User is not authenticated.");
        return;
      }

      const response = await axios.get("http://localhost:3000/api/user/books/read", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Fetched books:", response.data.data); // Log the fetched books
      setBooks(response.data.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  useEffect(() => {
    console.log("editBookId updated:", editBookId); // Log editBookId changes
  }, [editBookId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with editBookId:", editBookId); // Log the editBookId
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found. User is not authenticated.");
        setError("You are not authenticated. Please log in.");
        navigate("/login");
        return;
      }

      if (isEditing) {
        if (!editBookId) {
          console.error("editBookId is undefined");
          return;
        }

        await axios.patch(
          `http://localhost:3000/api/user/books/update${editBookId}`, // Ensure editBookId is correct
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsEditing(false);
        setEditBookId(null);
      } else {
        await axios.post(
          "http://localhost:3000/api/user/books/insert",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      setFormData({ name: "", category: "", author: "", photo: "" });
      fetchBooks(); // Refresh the book list
    } catch (error) {
      console.error("Error saving book:", error);
      setError(error.response ? error.response.data.message : "An error occurred, please try again.");
    }
  };

  const handleEdit = (book) => {
    console.log("Editing book:", book); // Log the book object
    console.log("Setting editBookId to:", book.id); // Use book.id instead of book._id
    setFormData({
      name: book.name,
      category: book.category,
      author: book.author,
      photo: book.photo,
    });
    setIsEditing(true);
    setEditBookId(book.id); // Use book.id instead of book._id
  };

  const handleDelete = async (id) => {
    console.log("Deleting book with ID:", id); // Log the ID
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found. User is not authenticated.");
        setError("You are not authenticated. Please log in.");
        navigate("/login");
        return;
      }

      await axios.delete(`http://localhost:3000/api/user/books/delete${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchBooks(); // Refresh the book list
    } catch (error) {
      console.error("Error deleting book:", error);
      setError(error.response ? error.response.data.message : "An error occurred, please try again.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Book Management</h1>

      {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Book Name"
            value={formData.name}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="photo"
            placeholder="Photo URL"
            value={formData.photo}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isEditing ? "Update Book" : "Add Book"}
        </button>
      </form>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Author</th>
            <th className="p-2 border">Photo</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="hover:bg-gray-100">
              <td className="p-2 border">{book.name}</td>
              <td className="p-2 border">{book.category}</td>
              <td className="p-2 border">{book.author}</td>
              <td className="p-2 border">
                <img src={book.photo} alt={book.name} className="w-16 h-16 object-cover" />
              </td>
              <td className="p-2 border">
                <button
                  onClick={() => handleEdit(book)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(book.id)}
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

export default Books;