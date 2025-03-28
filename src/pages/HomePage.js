import React from 'react';
import { useNavigate } from 'react-router-dom';
import CardModule from '../components/CardModule';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar datos de autenticación almacenados
    localStorage.removeItem('authToken'); // Si usas un token
    localStorage.removeItem('user'); // Si guardas información del usuario
    navigate('/login'); // Redirigir al login
  };

  return (
    <div className="home-container">
      <h1>Bienvenido a la Oficina Virtual</h1>
      <button className="logout-btn" onClick={handleLogout}>
        Cerrar sesión
      </button>
      <div className="card-container">
        <CardModule 
          title="Agendamiento"
          description="Solicita tus citas médicas de forma rápida y sencilla."
          link="/appointments"
          icon="📅"
        />
        <CardModule 
          title="Perfil"
          description="Gestiona tu información personal."
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
    </div>
  );
};

export default HomePage;