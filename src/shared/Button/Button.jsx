import React from 'react';
import './Button.scss';

export const Button = ({ children, onClick }) => {
  return (
    <button className="d-button" onClick={onClick}>
      {children}
    </button>
  );
};
