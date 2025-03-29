import React from 'react';
import { useForm } from 'react-hook-form';
import InputField from './InputField';
import SubmitButton from './SubmitButton';

const AppointmentForm = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm();

  const currentDateTime = new Date().toISOString().slice(0, 16);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label="Cédula del Paciente"
        type="text"
        name="cedulaPaciente"
        register={register}
        required
      />
      <InputField
        label="Fecha y Hora"
        type="datetime-local"
        name="fechaHora"
        register={register}
        required
        min={currentDateTime} // Establece la fecha y hora mínima
      />
      <SubmitButton label="Agendar" />
    </form>
  );
};

export default AppointmentForm;
