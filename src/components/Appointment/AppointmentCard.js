import React from 'react';
import './AppointmentCard.css';

const AppointmentCard = ({ appointment, onCancel }) => {
  const { fechaHora, estado } = appointment;

  // Generar un nombre de doctor y especialidad aleatorios
  const doctorNames = ['Dr. Juan Pérez', 'Dra. María López', 'Dr. Carlos Gómez', 'Dra. Ana Martínez'];
  const specialties = ['Medicina General', 'Pediatría', 'Cardiología', 'Dermatología'];
  const randomDoctor = doctorNames[Math.floor(Math.random() * doctorNames.length)];
  const randomSpecialty = specialties[Math.floor(Math.random() * specialties.length)];

  return (
    <div className={`appointment-card ${estado ? 'scheduled' : 'finished'}`}>
      <div className="appointment-left">
        <div className={`status ${estado ? 'scheduled' : 'finished'}`}>
          {estado ? 'AGENDADA' : 'FINALIZADA'}
        </div>
        <div className="date-time">
          <p className="date">{new Date(fechaHora).toLocaleDateString('es-ES', { weekday: 'long', day: '2-digit', month: '2-digit', year: '2-digit' })}</p>
          <p className="time">{new Date(fechaHora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
      </div>
      <div className="appointment-right">
        <h3>{randomDoctor}</h3>
        <p className="specialty">{randomSpecialty}</p>
        {estado && (
          <>
            <button className="cancel-button" onClick={() => onCancel(appointment.id)}>
              Cancelar
            </button>
            <p className="instructions">
              Para asistir a la cita, ingrese al módulo de videollamada, seleccione la cita y únase a la llamada. Recuerde ingresar con 5 minutos de anticipación.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;