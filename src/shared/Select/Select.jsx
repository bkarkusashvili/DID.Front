import React, { useEffect, useMemo, useState } from 'react';
import { KeyboardArrowDown, Close } from '@mui/icons-material';
import './Select.scss';
import Scrollbars from 'react-custom-scrollbars';
import { useDetectClickOutside } from 'react-detect-click-outside';

export const Select = ({ options, name, value, onChange }) => {
  const ref = useDetectClickOutside({
    onTriggered: (e) =>
      !e.target.classList.contains('d-option') && setActive(false),
  });
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
          ref={ref}
          type="text"
          name={name}
          value={search}
          onFocus={() => setActive(true)}
          onInput={(e) => {
            setSearch(e.target.value);
            onChange();
          }}
        />
        {search ? (
          <Close
            style={{ color: '#FFFFFF' }}
            fontSize={'large'}
            onClick={() => {
              setSearch('');
              onChange();
            }}
          />
        ) : (
          <KeyboardArrowDown style={{ color: '#FFFFFF' }} fontSize={'large'} />
        )}
      </label>
      <div className={['list', active ? 'active' : ''].join(' ')}>
        <Scrollbars>
          {list.map((option, key) => (
            <div
              key={key}
              className={[
                'item d-option',
                option.key === value ? 'active' : '',
              ].join(' ')}
              onClick={() => {
                onChange(option.key);
                setActive(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </Scrollbars>
      </div>
    </div>
  );
};
