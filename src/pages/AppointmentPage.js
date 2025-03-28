import React from 'react';
import AppointmentForm from '../components/AppointmentForm';
import axios from 'axios';

const AppointmentPage = () => {
  const handleAppointmentSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:8080/api/appointments', data);
      alert('Cita agendada con éxito');
    } catch (error) {
      alert('Error al agendar la cita');
    }
  };

  return (
    <div>
      <h1>Agendar Cita</h1>
      <AppointmentForm onSubmit={handleAppointmentSubmit} />
    </div>
  );
};

export default AppointmentPage;
