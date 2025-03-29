import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import styles from './LoginPage.module.css';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', data);
      const { token, cedula } = response.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('cedula', cedula);
      navigate('/');
    } catch (error) {
      alert('Error en el login');
    }
  };

  return (
    <div className={styles.loginPageContainer}>
      <div className={styles.loginPageBox}>
        <h1>Iniciar Sesión</h1>
        <p>Ingrese sus credenciales para acceder a su cuenta</p>
        <LoginForm onSubmit={handleLoginSubmit} />
      </div>
    </div>
  );
};

export default LoginPage;