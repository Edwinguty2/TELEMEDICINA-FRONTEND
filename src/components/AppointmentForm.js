import React from 'react';
import { useForm } from 'react-hook-form';
import InputField from './InputField';
import SubmitButton from './SubmitButton';

const AppointmentForm = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField label="Cédula del Paciente" type="text" name="cedulaPaciente" register={register} required />
      <InputField label="Fecha y Hora" type="datetime-local" name="fechaHora" register={register} required />
      <SubmitButton label="Agendar" />
    </form>
  );
};

export default AppointmentForm;
