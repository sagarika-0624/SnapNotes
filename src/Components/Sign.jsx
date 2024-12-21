// Sign.jsx
import React, { useState } from 'react';
import './Sign.css'; // Import the CSS for sign-up form

const Sign = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    // Store user data in local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));
    console.log('Form data:', formData);

    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <div>
      {/* Background Video */}
      <video className="video-background" autoPlay loop muted>
        <source src="\src\Videos\SnapNotes.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="sign-container">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account?{' '}
          <a href="/login" className="login-link">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Sign;
