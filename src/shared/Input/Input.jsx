import React from 'react';
import './Input.scss';

export const Input = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
}) => {
  return (
    <input
      className="d-input"
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
    />
  );
};
