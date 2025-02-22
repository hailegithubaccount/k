import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted"); // Debugging log

        try {
            const response = await axios.post("http://localhost:3000/api/user/login", {
                email,
                password,
            });

            console.log("Login Response:", response.data); // Log the full response

            // Check if the response contains a token and role
            if (response.data && response.data.token) {
                // Store the token and role in localStorage
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("role", response.data.role);

                // Set the default Authorization header for Axios
                axios.defaults.headers["Authorization"] = `Bearer ${response.data.token}`;

                // Extract the role from the response
                const role = response.data.role?.trim(); // Trim any extra spaces

                // Redirect based on role
                if (role === "admin") {
                    console.log("Redirecting to /admin/dashboard"); // Debugging log
                    navigate("/admin/dashboard");
                } else if (role === "library-staff") {
                    console.log("Redirecting to /library-staff/dashboard"); // Debugging log
                    navigate("/library-staff/dashboard");
                } else {
                    setError("Invalid role"); // This will only trigger if role is neither 'admin' nor 'user'
                }
            } else {
                setError("Invalid response from server");
            }
        } catch (err) {
            console.error(err);
            setError(err.response ? err.response.data.message : "An error occurred, please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
                {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit" // Ensure this is set to "submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-gray-600 text-sm text-center">
                    Don't have an account?{" "}
                    <a href="/register" className="text-blue-500 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;