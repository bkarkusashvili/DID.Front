import React from 'react';
import { Link } from 'react-router-dom';

import './header.scss';
import logo from '../../assets/images/logo.png';

export const Header = ({ hasUser, logout }) => {
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
          <button onClick={logout} children="გამოსვლა" />
        ) : (
          <>
            <Link className="logbtn" to="/login" children="შესვლა" />
            <Link to="register" children="რეგისტრაცია" />
          </>
        )}
      </div>
    </header>
  );
};
