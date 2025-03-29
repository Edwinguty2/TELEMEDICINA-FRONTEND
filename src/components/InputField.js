import React from 'react';

const InputField = ({ label, type, name, register, required, min, max}) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        {...register(name)}
        required={required}
        min={min}
        max={max}
      />
    </div>
  );
};

export default InputField;
