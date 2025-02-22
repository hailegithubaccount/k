import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook to navigate after successful login

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3000/api/user/login', {
        email,
        password,
      });

      // Log the response for debugging
      console.log(response);

      // Check if the response contains a token (indicating successful login)
      if (response.data && response.data.token) {
        // Store the token and role in localStorage for future use
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role); // Ensure 'role' is directly under data

        // Set the Authorization header globally for future requests
        axios.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;

        if (response.data.role === 'admin') {
            window.location.href = '/admin-dashboard';
          } else if (response.data.role === 'staff') {
            window.location.href = '/staff-dashboard';
          }
      } else {
        // If the login is unsuccessful or no token is returned
        setError('User not found or incorrect credentials');
      }
    } catch (err) {
      // If there's an error with the request or server
      console.error(err);
      setError(err.response ? err.response.data.message : 'An error occurred, please try again.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', margin: '5px 0' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', margin: '5px 0' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white' }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
