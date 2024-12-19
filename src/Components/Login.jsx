// Login.jsx
import React, { useState } from 'react';
import './login.css'; // Import the CSS for login form

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here (e.g., authenticate user)
    console.log('Login data:', formData);
  };
  return (
    <div>
    {/* Background Video */}
    <video className="video-background" autoPlay loop muted>
      <source src="\src\Videos\SnapNotes.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div className="login-container">
      <h2>Login to Your Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email or username"
          name="email or username"
          placeholder="Email / Username"
          value={formData.emailOrUsername}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Log In</button>
      </form>
    </div>
    </div>
  );
};

export default Login;
