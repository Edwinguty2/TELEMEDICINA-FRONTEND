import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import '../Agendamiento.css'; // Importamos los estilos específicos

const AppointmentForm = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm();

  const [selectedHour, setSelectedHour] = useState('');

  const currentDate = new Date().toISOString().slice(0, 10);

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 7);
  const formattedMaxDate = maxDate.toISOString().slice(0, 10);

  const availableHours = [];
  for (let hour = 8; hour <= 17; hour++) {
    const isAM = hour < 12;
    const hourIn12 = hour % 12 === 0 ? 12 : hour % 12;
    const period = isAM ? 'AM' : 'PM';
    const time = `${hourIn12}:00 ${period}`;
    availableHours.push(time);
  }

  const cedulaPaciente = localStorage.getItem('cedula');

  const convertTo24HourFormat = (hour) => {
    const [hourPart, period] = hour.split(' ');
    let [hh, mm] = hourPart.split(':');

    if (period === 'PM' && hh !== '12') {
      hh = (parseInt(hh) + 12).toString();
    } else if (period === 'AM' && hh === '12') {
      hh = '00';
    }

    hh = hh.padStart(2, '0');

    return `${hh}:${mm}:00`;
  };

  const handleFormSubmit = (data) => {
    const selectedDate = data.fecha;
    const formattedHour = convertTo24HourFormat(selectedHour);

    const formattedDateTime = `${selectedDate}T${formattedHour}`;

    const formData = { ...data, cedulaPaciente, fechaHora: formattedDateTime };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <InputField
        label="Fecha"
        type="date"
        name="fecha"
        register={register}
        required
        min={currentDate}
        max={formattedMaxDate}
      />

      <div>
        <label>Hora</label>
        <select
          name="hora"
          {...register("hora")}
          onChange={(e) => setSelectedHour(e.target.value)}
          value={selectedHour}
          required
        >
          <option value="">Selecciona una hora</option>
          {availableHours.map((hour, index) => (
            <option key={index} value={hour}>{hour}</option>
          ))}
        </select>
      </div>

      <button type="submit" className="submit-button">Agendar</button>
    </form>
  );
};

export default AppointmentForm;
