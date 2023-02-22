import React from 'react';
import { Check } from '@mui/icons-material';
import './ButtonGroup.scss';

export const ButtonGroup = ({ options, value, onChange }) => {
  return (
    <div className="d-buttonGroup">
      {options.map((option, index) => (
        <button
          key={index}
          disabled={value === option.value}
          onClick={() => onChange(option.value)}
          className={value === option.value ? 'active' : ''}
        >
          <span>{option.label}</span>
          {value === option.value && <Check style={{ color: '#06C97E' }} />}
        </button>
      ))}
    </div>
  );
};
