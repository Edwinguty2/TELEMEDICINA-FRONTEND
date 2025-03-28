import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', data);
      // Si el login es exitoso, redirige a la página de citas
      navigate('/appointments');
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
