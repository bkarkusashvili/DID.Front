import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsonToFormData from 'json-form-data';

import { API, WEB } from '../../../env';

import './CreateOrEditSite.scss';

import { FormControl, InputLabel, Select } from '@material-ui/core';

export const CreateOrEditSite = ({ token }) => {
  const [step, setStep] = useState(1);
  const [list, setList] = useState([]);
  const [category, setCategory] = useState();
  const [template, setTemplate] = useState();
  const isNextStepDisabled = useMemo(
    () => (step === 1 && !category) || (step === 2 && !template),
    [step, category]
  );
  const navigate = useNavigate();

  const updateStep = (keys) => {
    if (!keys) return;

    const [parentKey, childKey] = keys.split('.');
    const category = list[parentKey].children[childKey];

    setCategory(category);
  };

  const buy = () => {
    const headers = { Authorization: `Bearer ${token}` };
    console.log(template);

    axios.post(API + 'site', { template }, { headers }).then((res) => {
      console.log(res.data);
    });
  };

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };

    axios.get(API + 'template', { headers }).then((res) => setList(res.data));
  }, []);

  return (
    <div id="CreateOrEditSite">
      <div className="head"></div>
      <div className="form">
        <div className={['step step-1', step === 1 ? 'active' : ''].join(' ')}>
          <FormControl fullWidth variant="filled">
            <InputLabel>ინდუსტრია</InputLabel>
            <Select native onChange={(e) => updateStep(e.target.value)}>
              <option aria-label="None" value="" />
              {list.map((parent, parentKey) => (
                <optgroup key={parentKey} label={parent.title}>
                  {parent.children.map((child, childKey) => (
                    <option key={childKey} value={`${parentKey}.${childKey}`}>
                      {child.title}
                    </option>
                  ))}
                </optgroup>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={['step step-2', step === 2 ? 'active' : ''].join(' ')}>
          <div className="templates">
            {!!category?.small?.id && (
              <div className="item">
                <label className="heads">
                  <span>S - 35 ლარი</span>
                  <input
                    type="radio"
                    name="theme"
                    value={category.small.id}
                    onChange={(e) => setTemplate(e.target.value)}
                  />
                </label>
                <a
                  href={category.small.old_url}
                  rel="noreferrer"
                  target="_blank"
                >
                  <img src={WEB + 'storage/' + category.small.image} />
                </a>
              </div>
            )}
            {!!category?.medium?.id && (
              <div className="item">
                <label className="heads">
                  <span>M - 49 ლარი</span>
                  <input
                    type="radio"
                    name="theme"
                    value={category.medium.id}
                    onChange={(e) => setTemplate(e.target.value)}
                  />
                </label>
                <a
                  href={category.medium.old_url}
                  rel="noreferrer"
                  target="_blank"
                >
                  <img src={WEB + 'storage/' + category.medium.image} />
                </a>
              </div>
            )}
            {!!category?.large?.id && (
              <div className="item">
                <label className="heads">
                  <span>L - 69 ლარი</span>
                  <input
                    type="radio"
                    name="theme"
                    value={category.large.id}
                    onChange={(e) => setTemplate(e.target.value)}
                  />
                </label>
                <a
                  href={category.large.old_url}
                  rel="noreferrer"
                  target="_blank"
                >
                  <img src={WEB + 'storage/' + category.large.image} />
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="actions">
          {step > 1 && (
            <button
              onClick={() => step !== 1 && setStep(step - 1)}
              className="prev-step"
            >
              წინა
            </button>
          )}
          <button
            // disabled={isNextStepDisabled}
            onClick={() => (step === 2 ? buy() : setStep(step + 1))}
            className="next-step"
          >
            {step === 2 ? 'ყიდვა' : 'შემდეგი'}
          </button>
        </div>
      </div>
    </div>
  );
};
