import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import AppointmentPage from './pages/AppointmentPage';
import ProfilePage from './pages/ProfilePage';
import VideoCallPage from './pages/VideoCallPage';
import VideoCallSimPage from './pages/VideoCallSimPage';  // Importa la página de videollamada simulada
import HomePage from './pages/HomePage';
import PrivateRoute from './components/PrivateRoute'; // Importa el componente de protección

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/appointments"
          element={
            <PrivateRoute>
              <AppointmentPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/video-call"
          element={
            <PrivateRoute>
              <VideoCallPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/video-call-sim"
          element={
            <PrivateRoute>
              <VideoCallSimPage />  {/* Nueva página para simular la videollamada */}
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
