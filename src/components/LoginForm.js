import React from 'react';
import { useForm } from 'react-hook-form';
import InputField from './InputField';
import SubmitButton from './SubmitButton';

const LoginForm = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField label="Cédula" type="text" name="cedula" register={register} required />
      <InputField label="Contraseña" type="password" name="password" register={register} required />
      <SubmitButton label="Iniciar sesión" />
    </form>
  );
};

export default LoginForm;
