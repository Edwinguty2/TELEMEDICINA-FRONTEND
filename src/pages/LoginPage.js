import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', data);
      const { token } = response.data; // Asegúrate de que el backend devuelva un token
      localStorage.setItem('authToken', token); // Guarda el token en localStorage
      navigate('/'); // Redirige al home
    } catch (error) {
      alert('Error en el login');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <LoginForm onSubmit={handleLoginSubmit} />
    </div>
  );
};

export default LoginPage;
