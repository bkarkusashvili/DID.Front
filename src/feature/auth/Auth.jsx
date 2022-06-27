import React, { useMemo } from 'react';

import './Auth.scss';

import { Remember, SocialLogin } from './components';

export const Auth = ({ type }) => {
  const isLogin = useMemo(() => type === 'login', [type]);
  const isRegister = useMemo(() => type === 'register', [type]);

  const title = useMemo(
    () => (isLogin ? 'Log into system' : 'Create your account'),
    [type]
  );

  return (
    <div id="auth">
      <div className="formLayout">
        <h1 children={title} />
        <SocialLogin />
        {isLogin && <Remember />}
      </div>
    </div>
  );
};
