import { useFormik } from 'formik';
import React from 'react';
import {
  Button,
  ButtonGroup,
  ImageUpload,
  Input,
  Select,
} from '../../../shared';

import './TypeForm.scss';

const Steps = [
  {
    type: 'welcome',
    title: 'Help build your website',
    subTitle:
      "We'll ask you about your business, your brand and, finally about you.",
    info: 'Just 5 questions here...',
    actionText: 'Get Started',
  },
  {
    type: 'select',
    title: 'Which industry does your business belong to?',
    info: 'Type or select an option',
    actionText: 'Next',
    form: [
      {
        type: 'select',
        name: 'business',
        options: [
          {
            value: '1',
            label: 'Accounting',
          },
          {
            value: '2',
            label: 'Advertising',
          },
          {
            value: '3',
            label: 'Agriculture',
          },
          {
            value: '4',
            label: 'Architecture',
          },
          {
            value: '1',
            label: 'Accounting',
          },
          {
            value: '2',
            label: 'Advertising',
          },
          {
            value: '3',
            label: 'Agriculture',
          },
          {
            value: '4',
            label: 'Architecture',
          },
          {
            value: '1',
            label: 'Accounting',
          },
          {
            value: '2',
            label: 'Advertising',
          },
          {
            value: '3',
            label: 'Agriculture',
          },
          {
            value: '4',
            label: 'Architecture',
          },
          {
            value: '1',
            label: 'Accounting',
          },
          {
            value: '2',
            label: 'Advertising',
          },
          {
            value: '3',
            label: 'Agriculture',
          },
          {
            value: '4',
            label: 'Architecture',
          },
        ],
      },
    ],
  },
  {
    type: 'input',
    title: 'Provide 3 keywords that describe your business',
    info: 'Type your answer here',
    actionText: 'Next',
    form: [
      {
        type: 'input',
        name: 'keywords',
      },
    ],
  },
  {
    type: 'buttonGroup',
    title: 'What are you building website for?',
    info: 'Select your answer here',
    actionText: 'Next',
    form: [
      {
        type: 'buttonGroup',
        name: 'websiteType',
        value: '2',
        options: [
          {
            value: '1',
            label: 'Company',
          },
          {
            value: '2',
            label: 'Product',
          },
          {
            value: '3',
            label: 'Service',
          },
        ],
      },
    ],
  },
  {
    type: 'image',
    title: 'Do you have a logo?',
    info: 'You can upload your logo here or move on to the next step',
    actionText: 'Next',
    form: [
      {
        type: 'image',
        name: 'logo',
      },
    ],
  },
  {
    type: 'thankyou',
    title: "Thanks, that was helpful. You're about halfway through",
    actionText: 'Save',
  },
];

export const TypeForm = () => {
  const [step, setStep] = React.useState(0);
  const { values, setFieldValue } = useFormik({
    initialValues: {},
  });

  const nextStep = () => {
    if (step < Steps.length - 1) {
      setStep(step + 1);
    }
  };

  return (
    <div id="type-form">
      <div className="container">
        <div className={['steps', step !== 0 ? 'active' : ''].join(' ')}>
          {Steps.map(
            (item, index) =>
              index !== 0 && (
                <span
                  key={index}
                  className={step >= index ? 'active' : ''}
                ></span>
              )
          )}
        </div>
        <div className="list">
          {Steps.map((item, index) => (
            <div
              key={index}
              className={[
                'item',
                item.type,
                step === index ? 'active' : '',
              ].join(' ')}
            >
              <div className="content">
                <h3>{item.title}</h3>
                {item.subTitle && <h4>{item.subTitle}</h4>}
                {item.info && <p>{item.info}</p>}
                {item.form &&
                  item.form.map((formItem, index) => (
                    <React.Fragment key={index}>
                      {formItem.type === 'select' && (
                        <Select
                          {...formItem}
                          value={values[formItem.name]}
                          onChange={(value) =>
                            setFieldValue(formItem.name, value)
                          }
                        />
                      )}
                      {formItem.type === 'input' && <Input {...formItem} />}
                      {formItem.type === 'buttonGroup' && (
                        <ButtonGroup
                          {...formItem}
                          value={values[formItem.name]}
                          onChange={(value) =>
                            setFieldValue(formItem.name, value)
                          }
                        />
                      )}
                      {formItem.type === 'image' && (
                        <ImageUpload {...formItem} />
                      )}
                    </React.Fragment>
                  ))}
              </div>
              {item.actionText && (
                <Button onClick={nextStep}>{item.actionText}</Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
