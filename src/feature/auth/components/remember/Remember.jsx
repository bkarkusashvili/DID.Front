import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Remember.scss';

export const Remember = ({ hasReset }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="remmember-password">
      <span
        className={isActive ? 'active' : ''}
        onClick={() => setIsActive(!isActive)}
      >
        <i></i>
        Remember me
      </span>
      {hasReset && <Link to="/reset" children="Forgot your password?" />}
    </div>
  );
};