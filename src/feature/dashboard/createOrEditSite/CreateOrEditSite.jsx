import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { API } from '../../../env';

import './CreateOrEditSite.scss';

import { Button, Select, Card } from '../../../shared';


import data from './data.json'; //sanam dbs gavasworeb bliad 


export const CreateOrEditSite = ({ token }) => {
  const [step, setStep] = useState(1);
  const [list, setList] = useState([]);
  const [category, setCategory] = useState();
  const [options, setOptions] = useState([]);
  const isNextStepDisabled = useMemo(
    () => step === 1 && !category,
    [(step, category)]
  );
  const navigate = useNavigate();


  

  const updateStep = (key) => setCategory(key >= 0 ? list[key] : '');

  const choose = (template, category) => {
    const headers = { Authorization: `Bearer ${token}` };

    axios
      .post(API + 'site', { template, category }, { headers })
      .then(() => navigate('/dashboard'));
  };

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };

    axios.get(API + 'template', { headers }).then((res) => {
      const dataFromJson = data.map((item, key) => ({ ...item, key }));

      setList(dataFromJson);
      setOptions(dataFromJson.map((item) => ({ key: item.key, label: item.title })));
    });
  }, []);

  return (
    <div id="CreateOrEditSite">
      <div className="form">
        <div className={['step step-1', step === 1 ? 'active' : ''].join(' ')}>
          <h3>აარჩიე კატეგორია</h3>
          <Select
            name="category"
            value={category?.title}
            options={options}
            onChange={(value) => updateStep(value)}
          />
        </div>
        <div className={['step step-2', step === 2 ? 'active' : ''].join(' ')}>
          <div className="templates">
            {category &&
              category.children.map((category) =>
                category.templates.map((template, key) => (
                  <Card
                    key={key}
                    template={template}
                    category={category}
                    token={token}
                    type="choose"
                    onChoose={() => choose(template.id, category.id)}
                  />
                ))
              )}
          </div>
        </div>
        <div className="actions">
          {step === 1 && (
            <Button onClick={() => setStep(2)} disabled={isNextStepDisabled}>
              შემდეგი
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
