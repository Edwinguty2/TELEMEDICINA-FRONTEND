import React from 'react';
import { useNavigate } from 'react-router-dom';
import CardModule from '../components/CardModule';
import '../Home.css'; // Importamos los estilos específicos

const HomePage = () => {
  const navigate = useNavigate();
  const cedula = localStorage.getItem('cedula'); // Recupera la cédula del usuario logueado

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Elimina el token de autenticación
    localStorage.removeItem('cedula'); // Elimina la cédula del usuario
    navigate('/login'); // Redirige al login
  };

  return (
    <div className="home-container">
      <header>
        <h1>Bienvenido a la Oficina Virtual</h1>
      </header>
      <div className="card-container">
        <CardModule
          title="Agendamiento"
          description="Solicita tus citas médicas de forma rápida y sencilla."
          link="/appointments"
          icon="📅"
        />
        <CardModule
          title="Perfil"
          description="Observa y gestiona tu información personal."
          link="/profile"
          icon="👤"
        />
        <CardModule
          title="Videollamada"
          description="Conéctate con un médico por videollamada."
          link="/video-call"
          icon="💻"
        />
      </div>
      <button className="logout-btn" onClick={handleLogout}>
         Cerrar sesión
      </button>
    </div>
  );
};

export default HomePage;
