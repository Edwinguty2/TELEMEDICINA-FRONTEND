import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [appointments, setAppointments] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const cedulaPaciente = localStorage.getItem('cedula'); // Recupera la cédula del usuario autenticado desde localStorage

  useEffect(() => {
    if (!cedulaPaciente) {
      console.error('No se encontró la cédula del usuario autenticado.');
      return;
    }

    // Cargar citas
    axios.get(`http://localhost:8080/api/appointments?cedulaPaciente=${cedulaPaciente}`)
      .then(response => setAppointments(response.data))
      .catch(error => console.error('Error al cargar citas:', error));

    // Cargar tratamientos
    axios.get(`http://localhost:8080/api/treatments/patient/${cedulaPaciente}`)
      .then(response => setTreatments(response.data))
      .catch(error => console.error('Error al cargar tratamientos:', error));
  }, [cedulaPaciente]);

  return (
    <div>
      <h1>Perfil</h1>
      <p>Cédula del usuario: {cedulaPaciente}</p> {/* Muestra la cédula del usuario */}
      <div>
        <h2>Historial de Citas</h2>
        <ul>
          {appointments.map(appointment => (
            <li key={appointment.id}>
              Fecha: {appointment.fechaHora}, Estado: {appointment.estado ? 'Completada' : 'Pendiente'}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Historial de Tratamientos</h2>
        <ul>
          {treatments.map(treatment => (
            <li key={treatment.id}>
              Descripción: {treatment.descripcion}, Inicio: {treatment.fechaInicio}, Fin: {treatment.fechaFin}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;