import React from 'react';

import './SocialLogin.scss';

export const SocialLogin = () => {
  return (
    <div className="social-login">
      <ul>
        <li>
          <a href="#">Login with Google</a>
        </li>
        <li>
          <a href="#">Login with facebook</a>
        </li>
        <li>
          <a href="#">Login with Apple</a>
        </li>
      </ul>
      <div className="or">
        <span>or</span>
      </div>
    </div>
  );
};
