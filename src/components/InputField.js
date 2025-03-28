import React from 'react';

const InputField = ({ label, type, name, register, required }) => {
  return (
    <div>
      <label>{label}</label>
      <input type={type} {...register(name)} required={required} />
    </div>
  );
};

export default InputField;
