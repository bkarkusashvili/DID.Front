import React from 'react';
import './Button.scss';

export const Button = ({ children, onClick, ...rest }) => {
  return (
    <button className="d-button" onClick={onClick} {...rest}>
      {children}
    </button>
  );
};
