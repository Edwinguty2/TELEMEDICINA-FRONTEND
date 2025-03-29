import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppointmentCard from '../components/Appointment/AppointmentCard';
import './ProfilePage.css';

const ProfilePage = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState('Historial Citas'); // Estado para el menú seleccionado
  const [treatments, setTreatments] = useState([]); // Estado para tratamientos
  const [medicationOrders, setMedicationOrders] = useState([]); // Estado para órdenes de medicamentos
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

    // Cargar tratamientos
    axios.get(`http://localhost:8080/api/treatments?cedulaPaciente=${cedulaPaciente}`)
      .then(response => setTreatments(response.data))
      .catch(error => console.error('Error al cargar tratamientos:', error));

    // Cargar órdenes de medicamentos
    axios.get(`http://localhost:8080/api/medication-orders?cedulaPaciente=${cedulaPaciente}`)
      .then(response => setMedicationOrders(response.data))
      .catch(error => console.error('Error al cargar órdenes de medicamentos:', error));
  }, [cedulaPaciente]);

  const handleCancelAppointment = (appointmentId) => {
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

  const renderContent = () => {
    switch (selectedMenu) {
      case 'Historial Citas':
        return (
          <div>
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
        );
      case 'Tratamientos':
        return (
          <div>
            <h2>Tratamientos</h2>
            <div className="card-list">
              {treatments.map(treatment => (
                <div key={treatment.id} className="card">
                  <h3>{treatment.nombre}</h3>
                  <p>{treatment.descripcion}</p>
                  <p>Fecha Inicio: {new Date(treatment.fechaInicio).toLocaleDateString('es-ES', { weekday: 'long', day: '2-digit', month: '2-digit', year: '2-digit' })}</p>
                  <p>Fecha de Finalización: {new Date(treatment.fechaFin).toLocaleDateString('es-ES', { weekday: 'long', day: '2-digit', month: '2-digit', year: '2-digit' })}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Orden de Medicamentos':
        return (
          <div>
            <h2>Órdenes de Medicamentos</h2>
            <div className="card-list">
              {medicationOrders.map(order => (
                <div key={order.id} className="card">
                  <h3>{order.medicamento}</h3>
                  <p>Cantidad: {order.cantidad}</p>
                  <p>Indicaciones: {order.indicaciones}</p>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="profile-container">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Menú Principal
      </button>
      <h1>Perfil</h1>
      <div className="menu">
        <button
          className={`menu-item ${selectedMenu === 'Historial Citas' ? 'active' : ''}`}
          onClick={() => setSelectedMenu('Historial Citas')}
        >
          Historial Citas
        </button>
        <button
          className={`menu-item ${selectedMenu === 'Tratamientos' ? 'active' : ''}`}
          onClick={() => setSelectedMenu('Tratamientos')}
        >
          Tratamientos
        </button>
        <button
          className={`menu-item ${selectedMenu === 'Orden de Medicamentos' ? 'active' : ''}`}
          onClick={() => setSelectedMenu('Orden de Medicamentos')}
        >
          Orden de Medicamentos
        </button>
        <button
          className={`menu-item ${selectedMenu === 'Historia Clínica' ? 'active' : ''}`}
          onClick={() => setSelectedMenu('Historia Clínica')}
        >
          Historia Clínica
        </button>
      </div>
      <div className="appointments-box">
        {renderContent()}
      </div>
    </div>
  );
};

export default ProfilePage;