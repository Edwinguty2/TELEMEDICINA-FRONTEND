import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CardModule from '../components/CardModule';
import axios from 'axios';  // Para hacer las peticiones al backend
import '../Home.css'; // Importamos los estilos específicos

const HomePage = () => {
  const navigate = useNavigate();
  const cedula = localStorage.getItem('cedula'); // Recupera la cédula del usuario logueado
  const [notification, setNotification] = useState(''); // Estado para la notificación

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Elimina el token de autenticación
    localStorage.removeItem('cedula'); // Elimina la cédula del usuario
    navigate('/login'); // Redirige al login
  };

  // Función para mostrar la notificación
  const showNotification = (appointment) => {
    setNotification(`¡Tu próxima cita es el ${new Date(appointment.fechaHora).toLocaleDateString()} a las ${new Date(appointment.fechaHora).toLocaleTimeString()}!`);
    setTimeout(() => {
      setNotification(''); // La notificación desaparece después de 3 segundos
    }, 3000);
  };

  // Obtener las citas del usuario cuando se cargue la página
  useEffect(() => {
    if (cedula) {
      axios
        .get('http://localhost:8080/api/appointments')  // Obtener todas las citas
        .then((response) => {
          const appointments = response.data;

          // Filtrar las citas por cédula del usuario autenticado
          const userAppointments = appointments.filter(appointment => appointment.cedulaPaciente === cedula);

          if (userAppointments.length > 0) {
            // Ordenamos las citas por fecha y hora para obtener la más reciente
            const sortedAppointments = userAppointments.sort(
              (a, b) => new Date(b.fechaHora) - new Date(a.fechaHora)
            );
            const mostRecentAppointment = sortedAppointments[0];  // La última cita agendada

            // Retrasar la aparición de la notificación 5 segundos
            setTimeout(() => {
              showNotification(mostRecentAppointment); // Mostrar la notificación con la última cita
            }, 5000);  // 5 segundos de retraso
          }
        })
        .catch((error) => {
          console.error('Error al obtener las citas:', error);
        });
    }
  }, [cedula]); // Dependencia de cedula

  return (
    <div className="home-container">
      <header>
        <h1>Bienvenido a la Oficina Virtual</h1>
      </header>
      
      {/* Mostrar la notificación si existe */}
      {notification && (
        <div className="notification">
          <p>{notification}</p>
        </div>
      )}

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
