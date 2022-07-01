import React from "react";

import "./header.scss";
import logo from "../../assets/images/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  const [login, setLogin] = useState(false);
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
        {login ? (
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
