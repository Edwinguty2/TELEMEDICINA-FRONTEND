import React from 'react';
import CardModule from '../components/CardModule';

const HomePage = () => {
  return (
    <div className="home-container">
      <h1>Bienvenido a la Oficina Virtual</h1>
      <div className="card-container">
        <CardModule 
          title="Agendamiento"
          description="Solicita tus citas médicas de forma rápida y sencilla."
          link="/appointments"
          icon="📅" // Aquí puedes agregar íconos personalizados o usar una librería como FontAwesome
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
