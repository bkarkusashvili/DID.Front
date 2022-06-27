import React from 'react';

import './header.scss';
import logo from '../../assets/images/logo.png';

export const Header = () => {
  return (
    <header id="header">
      <a href="#">
        <img src={logo} alt="didge logo" />
      </a>
      <select>
        <option value="ENG">ENG</option>
        <option value="GE">GE</option>
      </select>
    </header>
  );
};
