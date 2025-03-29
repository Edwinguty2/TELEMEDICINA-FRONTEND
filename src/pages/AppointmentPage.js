import React, { useState } from 'react';
import AppointmentForm from '../components/AppointmentForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Agendamiento.css'; // Importamos los estilos específicos

const AppointmentPage = () => {
  const [appointment, setAppointment] = useState(null);
  const navigate = useNavigate();

  const handleAppointmentSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:8080/api/appointments', data);
      setAppointment(response.data);

      // Redirigir al menú principal después de agendar la cita
      setTimeout(() => {
        navigate('/'); // Redirige a la página principal
      }, 15000); // Espera 15 segundos antes de redirigir al menú
    } catch (error) {
      console.error('Error al agendar la cita:', error);
      alert('Error al agendar la cita');
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <header>
        <h1>Agendar Cita</h1>
      </header>
      {!appointment ? ( // Si no hay cita, muestra el formulario
        <div className="form-container">
          <AppointmentForm onSubmit={handleAppointmentSubmit} />
        </div>
      ) : ( // Si hay cita, muestra la información de la cita
        <div className="appointment-summary">
          <h2>Cita Agendada Exitosamente</h2>
          <p><strong>Cédula del Paciente:</strong> {appointment.cedulaPaciente}</p>
          <p><strong>Fecha y Hora:</strong> {new Date(appointment.fechaHora).toLocaleString()}</p>
          <button onClick={handleBackClick}>Volver a la Página Principal</button>
        </div>
      )}
    </div>
  );
};

export default AppointmentPage;
