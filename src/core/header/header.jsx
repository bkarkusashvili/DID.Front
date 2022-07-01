import React from "react";

import "./header.scss";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header id="header">
      <Link href="#">
        <img src={logo} alt="didge logo" />
      </Link>
      <select>
        <option value="ENG">ENG</option>
        <option value="GE">GE</option>
      </select>
    </header>
  );
};
