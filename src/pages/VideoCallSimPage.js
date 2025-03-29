import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChatBox from '../components/ChatBox'; // Importa el componente ChatBox
import './VideoCallSimPage.css'; // Estilos específicos de esta página

const VideoCallSimPage = () => {
  const navigate = useNavigate();

  const handleHangUp = () => {
    // Redirige al Home o a la página anterior
    navigate(-1); // Esto hace que el usuario regrese a la página anterior
  };

  return (
    <div className="video-call-sim-page">
      <div className="video-call-container">
        <div className="doctor-screen">
          <div className="doctor-video">
            <img src="https://via.placeholder.com/300" alt="Doctor" />
          </div>
          <div className="doctor-name">Dr. Juan Pérez</div>
        </div>

        <div className="chat-box">
          <ChatBox />  {/* Incluye el componente ChatBox */}
        </div>
      </div>

      <button className="hang-up-button" onClick={handleHangUp}>Colgar</button>
    </div>
  );
};

export default VideoCallSimPage;
