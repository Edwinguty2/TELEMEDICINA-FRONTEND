import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatBox from '../components/ChatBox';  // Importa el componente ChatBox
import './VideoCallSimPage.css';  // Estilos específicos de esta página
import axios from 'axios'; 

// Importa los íconos para los botones de cámara y micrófono
import { FaVideo, FaMicrophone, FaVideoSlash, FaMicrophoneSlash } from 'react-icons/fa';

const VideoCallSimPage = () => {
  const navigate = useNavigate();

  
  
  // Estado para controlar si la cámara y el micrófono están activados
  const [cameraOn, setCameraOn] = useState(true);
  const [microphoneOn, setMicrophoneOn] = useState(true);
  const [userVideoStream, setUserVideoStream] = useState(null); // Para la cámara del paciente
  const [userCedula, setUserCedula] = useState(localStorage.getItem('cedula')); // Cedula del paciente
  const [appointmentId, setAppointmentId] = useState(localStorage.getItem('appointmentId')); // ID de la cita actual
  
  // Lógica para manejar el cambio de estado de la cámara
  const toggleCamera = () => {
    setCameraOn(!cameraOn);
    if (cameraOn) {
      stopUserCamera();
    } else {
      startUserCamera();
    }
  };

  // Lógica para manejar el cambio de estado del micrófono
  const toggleMicrophone = () => {
    setMicrophoneOn(!microphoneOn);
    // Aquí puedes agregar la lógica para activar/desactivar el micrófono real si fuera necesario.
  };

  // Iniciar la cámara del paciente
  const startUserCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setUserVideoStream(stream);
    } catch (err) {
      console.error('Error al acceder a la cámara del paciente: ', err);
    }
  };

  // Detener la cámara del paciente
  const stopUserCamera = () => {
    if (userVideoStream) {
      const tracks = userVideoStream.getTracks();
      tracks.forEach(track => track.stop());
      setUserVideoStream(null);
    }
  };

  const handleHangUp = async () => {
    try {
      // Cambiar el estado de la cita a false (finalizada)
      await axios.post(`http://localhost:8080/api/appointments/cancel/${appointmentId}`);

      // Crear una orden de medicamentos aleatoria
      await axios.post('http://localhost:8080/api/medication-orders', {
        cedulaPaciente: userCedula,
        medicamento: 'Paracetamol', // Puedes generar un medicamento aleatorio
        cantidad: Math.floor(Math.random() * 10) + 1, // Cantidad aleatoria entre 1 y 10
        indicaciones: 'Tomar 1 cada 8 horas'
      });

      // Crear un tratamiento aleatorio
      await axios.post('http://localhost:8080/api/treatments', {
        cedulaPaciente: userCedula,
        descripcion: 'Tratamiento para fiebre', // Puedes generar una descripción aleatoria
        fechaInicio: new Date().toISOString().split('T')[0], // Fecha actual
        fechaFin: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0] // Fecha de fin en 7 días
      });

      // Redirigir al menú principal
      navigate('/');
    } catch (error) {
      console.error('Error al finalizar la llamada:', error);
      alert('Hubo un problema al finalizar la llamada.');
    }
  };

  useEffect(() => {
    if (cameraOn) {
      startUserCamera();
    } else {
      stopUserCamera();
    }

    return () => {
      // Limpiar el stream de video cuando se desmonte el componente
      if (userVideoStream) {
        stopUserCamera();
      }
    };
  }, [cameraOn]);

  return (
    <div className="video-call-sim-page">
      <div className="video-call-container">
        {/* Pantalla de videollamada (simula al doctor) */}
        <div className="doctor-screen">
          <div className="doctor-video">
            {/* Video del doctor (reemplaza la URL con la fuente real del video) */}
            <img src={require('./doctor.jpg')} alt="Doctor" />
          </div>
          <div className="doctor-name">Dr. Maria López</div>
        </div>

        {/* Pantalla de la cámara del paciente */}
        <div className="patient-screen">
          <div className="patient-video">
            {cameraOn && userVideoStream ? (
              <video
                autoPlay
                playsInline
                muted
                ref={(ref) => {
                  if (ref && userVideoStream) {
                    ref.srcObject = userVideoStream;
                  }
                }}
              />
            ) : (
              <div className="no-video">Cámara apagada</div>
            )}
          </div>
          <div className="patient-name">Tú</div>
          <div className="patient-cedula">{userCedula}</div>

          {/* Botones de control debajo de la cámara del paciente */}
          <div className="controls">
            <button onClick={toggleCamera} className="control-button">
              {cameraOn ? <FaVideo /> : <FaVideoSlash />}  {/* Icono de cámara */}
            </button>
            <button onClick={toggleMicrophone} className="control-button">
              {microphoneOn ? <FaMicrophone /> : <FaMicrophoneSlash />}  {/* Icono de micrófono */}
            </button>
          </div>
        </div>

        {/* Área de chat (más grande y al lado de la cámara) */}
        <div className="chat-box">
          <ChatBox />  {/* Incluye el componente ChatBox */}
        </div>
      </div>

      {/* Botón de colgar debajo del chat */}
      <div className="hang-up-container">
        <button className="hang-up-button" onClick={handleHangUp}>Colgar</button>
      </div>
    </div>
  );
};

export default VideoCallSimPage;
