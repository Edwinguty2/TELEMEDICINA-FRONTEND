import React, { useState } from 'react';
import AppointmentForm from '../components/AppointmentForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AppointmentPage = () => {
  const [appointment, setAppointment] = useState(null);
  const navigate = useNavigate();

  const handleAppointmentSubmit = async (data) => {

    try {
      const response = await axios.post('http://localhost:8080/api/appointments', data);
      setAppointment(response.data);
    } catch (error) {
      console.error('Error al agendar la cita:', error);
      alert('Error al agendar la cita');
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Agendar Cita</h1>
      {!appointment ? ( // Si no hay cita, muestra el formulario
        <AppointmentForm onSubmit={handleAppointmentSubmit} />
      ) : ( // Si hay cita, muestra la información de la cita
        <div>
          <h2>Cita Agendada</h2>
          <p><strong>Cédula del Paciente:</strong> {appointment.cedulaPaciente}</p>
          <p><strong>Fecha y Hora:</strong> {new Date(appointment.fechaHora).toLocaleString()}</p>
          <button onClick={handleBackClick}>Volver a la Página Principal</button>
        </div>
      )}
    </div>
  );
};

export default AppointmentPage;
