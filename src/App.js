import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import AppointmentPage from './pages/AppointmentPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/appointments" element={<AppointmentPage />} />
        <Route path="/" exact element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
