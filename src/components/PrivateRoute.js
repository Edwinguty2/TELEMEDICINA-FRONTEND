import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Verifica si hay un token almacenado

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;