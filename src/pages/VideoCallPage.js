import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Importa el hook useNavigate

const VideoCallPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  
  // Obtener la cédula del usuario autenticado desde localStorage
  const cedula = localStorage.getItem('cedula'); 

  // Usar el hook useNavigate para navegar a otra página
  const navigate = useNavigate();

  useEffect(() => {
    // Llamar a la API para obtener todas las citas
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/appointments');
        setAppointments(response.data);

        // Filtrar las citas que están próximas y cuyo estado es true
        const now = new Date();
        const filteredAppointments = response.data.filter(appointment => {
          const appointmentDate = new Date(appointment.fechaHora);
          return appointment.estado && appointmentDate > now && appointment.cedulaPaciente === cedula;
        });

        setUpcomingAppointments(filteredAppointments);
      } catch (error) {
        console.error('Error al obtener las citas:', error);
      }
    };

    fetchAppointments();
  }, [cedula]);

  const handleJoinAppointment = (id) => {
    // Aquí podrías manejar la lógica para unirse a la cita, como abrir un videochat
    navigate('/video-call-sim');
  };

  const handleGoHome = () => {
    // Redirige al Home
    navigate('/'); // Esto te lleva al Home
  };

  return (
    <div>
      <h1>Bienvenido a tu Panel de Citas</h1>
      <h2>Citas próximas</h2>
      {upcomingAppointments.length > 0 ? (
        <ul>
          {upcomingAppointments.map(appointment => (
            <li key={appointment.id}>
              <p>Cita para el {appointment.fechaHora}</p>
              <button onClick={() => handleJoinAppointment(appointment.id)}>
                Unirse a la cita
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes citas próximas.</p>
      )}
      {/* Botón para regresar al Home */}
      <button onClick={handleGoHome}>Volver al Home</button>
    </div>
  );
};

export default VideoCallPage;
