import React from 'react';

import './footer.scss';

export const Footer = () => {
  return (
    <footer id="footer">
      <ul className="icons">
        <li>
          <a href="#">
            <i class="fa-brands fa-facebook-square"></i>
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa-brands fa-instagram"></i>
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa-brands fa-twitter"></i>
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa-brands fa-youtube"></i>
          </a>
        </li>
      </ul>
      <div className="terms">
        <ul>
          <li>
            <a href="#">terms and conditions</a>
          </li>
          <li>
            <a href="#">privacy policy</a>
          </li>
          <li>
            <a href="#">use of cookies</a>
          </li>
        </ul>
        <span>© Untitled. All rights reserved</span>
      </div>
    </footer>
  );
};
