import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppointmentCard from '../components/Appointment/AppointmentCard';
import './ProfilePage.css';

const ProfilePage = () => {
  const [appointments, setAppointments] = useState([]);
  const cedulaPaciente = localStorage.getItem('cedula');
  const navigate = useNavigate();

  useEffect(() => {
    if (!cedulaPaciente) {
      console.error('No se encontró la cédula del usuario autenticado.');
      return;
    }

    // Cargar citas
    axios.get(`http://localhost:8080/api/appointments?cedulaPaciente=${cedulaPaciente}`)
      .then(response => setAppointments(response.data))
      .catch(error => console.error('Error al cargar citas:', error));
  }, [cedulaPaciente]);

  const handleCancelAppointment = (appointmentId) => {
    // Simula la cancelación de la cita
    axios.post(`http://localhost:8080/api/appointments/cancel/${appointmentId}`)
      .then(() => {
        setAppointments(prevAppointments =>
          prevAppointments.map(appointment =>
            appointment.id === appointmentId ? { ...appointment, estado: false } : appointment
          )
        );
      })
      .catch(error => console.error('Error al cancelar la cita:', error));
  };

  return (
    <div className="profile-container">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Menú Principal
      </button>
      <h1>Perfil</h1>
      <div className="menu">
        <button className="menu-item active">Historial Citas</button>
        <button className="menu-item">Tratamientos</button>
        <button className="menu-item">Orden de Medicamentos</button>
        <button className="menu-item">Historia Clínica</button>
      </div>
      <div className="appointments-box">
      <h2>Citas Médicas</h2>
        <div className="card-list">
          {appointments.map(appointment => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onCancel={handleCancelAppointment}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;