import React from 'react';

import './header.scss';
import logo from '../../assets/images/logo.png';

export const Header = ({ hasUser }) => {
  return (
    <header id="header">
      <a href="/">
        <img src={logo} alt="didge logo" />
      </a>
      {/* <select>
        <option value="ENG">ENG</option>
        <option value="GE">GE</option>
      </select> */}
      <div className="loginControl">
        {hasUser ? (
          <div>
            <a href="/">Logout</a>
          </div>
        ) : (
          <div>
            <a className="logbtn" href="/login">
              Log In
            </a>
            <a href="register">Sign up</a>
          </div>
        )}
      </div>
    </header>
  );
};
