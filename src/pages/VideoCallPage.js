import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './VideoCallPage.module.css';

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

    axios.get(`http://localhost:8080/api/appointments?cedulaPaciente=${cedulaPaciente}`)
      .then(response => setAppointments(response.data))
      .catch(error => console.error('Error al cargar citas:', error));
  }, [cedulaPaciente]);

  useEffect(() => {
    const now = new Date();
    const upcoming = appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.fechaHora);
      return appointment.estado && appointmentDate > now;
    });
    setUpcomingAppointments(upcoming);
  }, [appointments]);

  const handleJoinCall = (appointmentId) => {
    localStorage.setItem('appointmentId', appointmentId);
    navigate('/video-call-sim');
  };

  return (
    <div className={styles.videoCallContainer}>
      <header className={styles.header}>
        <h1>Próximas Citas para Videollamada</h1>
      </header>

      <div className={styles.appointmentsBox}>
        {upcomingAppointments.length > 0 ? (
          <div className={styles.cardList}>
            {upcomingAppointments.map(appointment => (
              <div key={appointment.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3>Cita con el Dr. Juan Pérez</h3>
                  <p>{new Date(appointment.fechaHora).toLocaleDateString()} - {new Date(appointment.fechaHora).toLocaleTimeString()}</p>
                </div>
                <div className={styles.cardBody}>
                  <p><strong>Estado:</strong> {appointment.estado ? 'Próxima' : 'Cancelada'}</p>
                  <button className={styles.joinButton} onClick={() => handleJoinCall(appointment.id)}>
                    Unirse a la llamada
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.noAppointments}>No tienes citas próximas para videollamadas.</p>
        )}
      </div>

      <button className={styles.backButton} onClick={() => navigate('/')}>
        ← Volver al Menú Principal
      </button>
    </div>
  );
};

export default VideoCallPage;