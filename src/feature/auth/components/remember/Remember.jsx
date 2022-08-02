import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Radio } from '../../../../shared';

import './Remember.scss';

export const Remember = ({ hasReset }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="remmember-password">
      <span
        className={isActive ? 'active' : ''}
        onClick={() => setIsActive(!isActive)}
      >
        <Radio active={isActive} style={{ marginRight: 13 }} />
        დამიმახსოვრე
      </span>
      {hasReset && <Link to="/reset" children="პაროლის აღდგენა?" />}
    </div>
  );
};
