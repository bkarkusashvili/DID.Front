import React, { useEffect, useMemo, useState } from 'react';
import { KeyboardArrowDown } from '@mui/icons-material';
import './Select.scss';
import Scrollbars from 'react-custom-scrollbars';

export const Select = ({ options, name, value, onChange }) => {
  const [active, setActive] = useState(false);
  const [search, setSearch] = useState('');
  const list = useMemo(
    () =>
      search
        ? options.filter(
            (item) => item.label.toLowerCase().search(search.toLowerCase()) >= 0
          )
        : options,
    [options, search]
  );

  useEffect(() => {
    setSearch(value);
  }, [value]);

  return (
    <div className="d-select">
      <label className="field">
        <input
          type="text"
          name={name}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          onInput={(e) => setSearch(e.target.value)}
        />
        <KeyboardArrowDown style={{ color: '#FFFFFF' }} fontSize={'large'} />
      </label>
      <div className={['list', active ? 'active' : ''].join(' ')}>
        <Scrollbars>
          {list.map((option, key) => (
            <div
              key={key}
              className={['item', option.key === value ? 'active' : ''].join(
                ' '
              )}
              onClick={() => onChange(option.key)}
            >
              {option.label}
            </div>
          ))}
        </Scrollbars>
      </div>
    </div>
  );
};
