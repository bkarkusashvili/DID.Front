import React from 'react';
import { Link } from 'react-router-dom';

import './header.scss';
import logo from '../../assets/images/logo.png';

export const Header = ({ hasUser }) => {
  return (
    <header id="header">
      <Link to="/">
        <img src={logo} alt="didge logo" />
      </Link>
      {/* <select>
        <option value="ENG">ENG</option>
        <option value="GE">GE</option>
      </select> */}
      <div className="loginControl">
        {hasUser ? (
          <div>
            <Link to="/">Logout</Link>
          </div>
        ) : (
          <div>
            <Link className="logbtn" to="/login">
              Log In
            </Link>
            <Link to="register">Sign up</Link>
          </div>
        )}
      </div>
    </header>
  );
};
