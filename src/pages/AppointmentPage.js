import React, { useState } from 'react';
import AppointmentForm from '../components/AppointmentForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const AppointmentPage = () => {
  const [appointment, setAppointment] = useState(null); // Estado para la cita agendada
  const navigate = useNavigate(); // Hook para la navegación

  const handleAppointmentSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:8080/api/appointments', data);
      setAppointment(response.data); // Guardar la cita agendada en el estado
    } catch (error) {
      alert('Error al agendar la cita');
    }
  };

  const handleBackClick = () => {
    navigate('/'); // Redirige a la HomePage
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
          <button onClick={handleBackClick}>Volver a la Página Principal</button> {/* Botón de regreso */}
        </div>
      )}
    </div>
  );
};

export default AppointmentPage;
