import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './VideoCallPage.css';

const VideoCallPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const cedulaPaciente = localStorage.getItem('cedula');
  const navigate = useNavigate();

  useEffect(() => {
    if (!cedulaPaciente) {
      console.error('No se encontró la cédula del usuario autenticado.');
      return;
    }

    // Obtener citas para el paciente
    axios.get(`http://localhost:8080/api/appointments?cedulaPaciente=${cedulaPaciente}`)
      .then(response => {
        setAppointments(response.data);
      })
      .catch(error => console.error('Error al cargar citas:', error));
  }, [cedulaPaciente]);

  useEffect(() => {
    // Filtrar citas próximas
    const now = new Date();
    const upcoming = appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.fechaHora);
      return appointment.estado && appointmentDate > now;
    });
    setUpcomingAppointments(upcoming);
  }, [appointments]);

  const handleJoinCall = (appointmentId) => {
    // Función para unirse a la videollamada (simulada aquí)
    console.log(`Unirse a la llamada con la cita ID: ${appointmentId}`);
    // Lógica para unirse a la videollamada (redireccionar, abrir WebRTC, etc.)
  };

  return (
    <div className="video-call-container">
      <header>
        <h1>Próximas Citas para Videollamada</h1>
      </header>
      
      <div className="appointments-box">
        {upcomingAppointments.length > 0 ? (
          <div className="card-list">
            {upcomingAppointments.map(appointment => (
              <div key={appointment.id} className="card">
                <div className="card-header">
                  <h3>Cita con el Dr. Juan Pérez</h3>
                  <p>{new Date(appointment.fechaHora).toLocaleDateString()} - {new Date(appointment.fechaHora).toLocaleTimeString()}</p>
                </div>
                <div className="card-body">
                  <p><strong>Estado:</strong> {appointment.estado ? 'Próxima' : 'Cancelada'}</p>
                  <button className="join-button" onClick={() => handleJoinCall(appointment.id)}>
                    Unirse a la llamada
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No tienes citas próximas para videollamadas.</p>
        )}
      </div>

      <button className="back-button" onClick={() => navigate('/')}>
        ← Volver al Menú Principal
      </button>
    </div>
  );
};

export default VideoCallPage;
