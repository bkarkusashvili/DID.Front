import React from "react";

import "./footer.scss";

export const Footer = () => {
  return (
    <footer id="footer">
      <ul className="icons">
        <li>
          <a href="https://www.facebook.com/www.did.ge/" target="_blank">
            <i class="fa-brands fa-facebook-square"></i>
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/did.ge_/" target="_blank">
            <i class="fa-brands fa-instagram"></i>
          </a>
        </li>
        <li>
          <a href="https://twitter.com/www_did_ge/" target="_blank">
            <i class="fa-brands fa-twitter"></i>
          </a>
        </li>
        <li>
          <a
            href="https://www.youtube.com/channel/UCXb66GQl0j9pycCzAxtr3WQ"
            target="_blank"
          >
            <i class="fa-brands fa-youtube"></i>
          </a>
        </li>
      </ul>
      <div className="terms">
        <ul>
          <li>
            <a href="/terms">terms and conditions</a>
          </li>
          <li>
            <a href="/policy">privacy policy</a>
          </li>
        </ul>
        <span>© Untitled. All rights reserved</span>
      </div>
    </footer>
  );
};
