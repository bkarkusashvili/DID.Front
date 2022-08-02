import React from 'react';
import { WEB } from '../../../../env';

import './SocialLogin.scss';

export const SocialLogin = () => {
  return (
    <div className="social-login">
      <ul>
        <li>
          <a href={`${WEB}auth/google/redirect`}>Login with Google</a>
        </li>
        <li>
          <a href={`${WEB}auth/facebook/redirect`}>Login with facebook</a>
        </li>
        {/* <li>
          <a href="#">Login with Apple</a>
        </li> */}
      </ul>
      <div className="or">
        <span>ან</span>
      </div>
    </div>
  );
};
