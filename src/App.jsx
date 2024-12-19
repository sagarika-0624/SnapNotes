import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router
import '@fortawesome/fontawesome-free/css/all.min.css';
import LandingPage from './Components/LanddingPage'; // Import LandingPage
import SignInPage from './Components/Sign'; // Import SignInPage
import LoginPage from './Components/Login';
import NotesPage from './Components/Notes'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/login"  element={<LoginPage />} />
      <Route path="/notes" element={<NotesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
