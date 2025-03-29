import React from 'react';
import { useForm } from 'react-hook-form';

const LoginForm = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Cédula"
        {...register('cedula', { required: true })}
      />
      <input
        type="password"
        placeholder="Contraseña"
        {...register('password', { required: true })}
      />
      <button type="submit">Iniciar sesión</button>
    </form>
  );
};

export default LoginForm;