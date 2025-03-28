import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import AppointmentPage from './pages/AppointmentPage';
import ProfilePage from './pages/ProfilePage'; 
import VideoCallPage from './pages/VideoCallPage'; 
import HomePage from './pages/HomePage';  

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/appointments" element={<AppointmentPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/video-call" element={<VideoCallPage />} />
        <Route path="/" exact element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
