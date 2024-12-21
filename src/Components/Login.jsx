// Login.jsx
import React, { useState } from 'react';
import './login.css'; // Import the CSS for login form

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: '',
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
    // Authenticate user
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (user) =>
        (user.email === formData.emailOrUsername || user.username === formData.emailOrUsername) &&
        user.password === formData.password
    );

    if (user) {
      console.log('Login successful:', formData);
      // Redirect to notes page
      window.location.href = '/notes';
    } else {
      console.log('Invalid credentials');
      alert('Invalid credentials');
    }
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
            type="text"
            name="emailOrUsername"
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
