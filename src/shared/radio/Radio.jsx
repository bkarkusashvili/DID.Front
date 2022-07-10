import * as React from 'react';
import './Radio.scss';

export const Radio = ({ active, style }) => (
  <i
    style={style}
    className={['radio-button', active ? 'active' : ''].join(' ')}
  />
);
