import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './LandingPage.css'; // Import the CSS file


const LandingPage = () => {
  return (
    
    <div className="landing-container">
        <h1>Welcome to Notes App</h1>
        <p>Organize your thoughts and ideas effortlessly.</p>
      {/* Video Background */}
      <div className="video-background">
        <video className="background-video" autoPlay loop muted>
          <source src="\src\Videos\SnapNotes.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      

      {/* Get Started Button (Link to Sign In page) */}
      <Link to="/signin">
      
        <button 
          className="get-started-button"
        >
            Get Started
        </button>
       
      </Link>
    </div>
  );
};

export default LandingPage;
