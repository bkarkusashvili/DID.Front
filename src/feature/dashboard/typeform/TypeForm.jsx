import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import jsonToFormData from 'json-form-data';

import {
  Button,
  ButtonGroup,
  ImageUpload,
  Input,
  Select,
} from '../../../shared';

import './TypeForm.scss';
import { API } from '../../../env';

const Steps = [
  {
    type: 'welcome',
    title: 'დავიწყოთ საიტის აწყობა',
    subTitle:
      'ჩვენ გვექნება რამოდენიმე კითხვა თქვენი ბიზნესის, თქვენი ბრენდის და ბოლოს თქვენს შესახებ. ',
    info: 'მხოლოდ 5 შეკითხვა',
    actionText: 'დავიწყოთ',
  },
  // {
  //   type: 'select',
  //   title: 'Which industry does your business belong to?',
  //   info: 'Type or select an option',
  //   actionText: 'Next',
  //   form: [
  //     {
  //       type: 'select',
  //       name: 'business',
  //       options: [
  //         {
  //           value: '1',
  //           label: 'Accounting',
  //         },
  //         {
  //           value: '2',
  //           label: 'Advertising',
  //         },
  //         {
  //           value: '3',
  //           label: 'Agriculture',
  //         },
  //         {
  //           value: '4',
  //           label: 'Architecture',
  //         },
  //         {
  //           value: '1',
  //           label: 'Accounting',
  //         },
  //         {
  //           value: '2',
  //           label: 'Advertising',
  //         },
  //         {
  //           value: '3',
  //           label: 'Agriculture',
  //         },
  //         {
  //           value: '4',
  //           label: 'Architecture',
  //         },
  //         {
  //           value: '1',
  //           label: 'Accounting',
  //         },
  //         {
  //           value: '2',
  //           label: 'Advertising',
  //         },
  //         {
  //           value: '3',
  //           label: 'Agriculture',
  //         },
  //         {
  //           value: '4',
  //           label: 'Architecture',
  //         },
  //         {
  //           value: '1',
  //           label: 'Accounting',
  //         },
  //         {
  //           value: '2',
  //           label: 'Advertising',
  //         },
  //         {
  //           value: '3',
  //           label: 'Agriculture',
  //         },
  //         {
  //           value: '4',
  //           label: 'Architecture',
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    type: 'input',
    title: 'მოგვაწოდეთ 3 საკვანძო სიტყვა რაც აღწერს თქვენს ბიზნესს.',
    info: 'ჩაწერეთ თქვენი პასუხი აქ',
    actionText: 'შემდეგი',
    form: [
      {
        type: 'input',
        name: 'keywords',
      },
    ],
  },
  {
    type: 'buttonGroup',
    title: 'რისთვის ქმნით ვებსაიტს?',
    info: 'აირჩიეთ პასუხი',
    actionText: 'შემდეგი',
    form: [
      {
        type: 'buttonGroup',
        name: 'websiteType',
        value: '2',
        options: [
          {
            value: '1',
            label: 'ბიზნესისთვის',
          },
          {
            value: '2',
            label: 'სერვისებისთვის',
          },
          {
            value: '3',
            label: 'ღონისძიებისთვის',
          },
        ],
      },
    ],
  },
  {
    type: 'image',
    title: 'გაქვთ ლოგო?',
    info: 'შეგიძლიათ ატვირთოთ ლოგო ან გადახვიდეთ შემდეგ საფეხურზე',
    actionText: 'შემდეგი',
    form: [
      {
        type: 'image',
        name: 'logo',
      },
    ],
  },
  {
    type: 'input',
    title: 'გაქვთ სოც. მედია გვერდი თქვენი ბიზნესისთვის?',
    // info: 'ჩაწერეთ თქვენი პასუხი აქ',
    actionText: 'შემდეგი',
    form: [
      {
        type: 'input',
        name: 'socialMedia',
      },
    ],
  },
  // {
  //   type: 'color',
  //   title: 'ამ ფერებიდან ყველაზე მეტად რომელი შეესაბამება თქვენს ბრენდს?',
  //   // info: 'ჩაწერეთ თქვენი პასუხი აქ',
  //   actionText: 'შემდეგი',
  //   form: [
  //     {
  //       type: 'input',
  //       name: 'color',
  //     },
  //   ],
  // },
  {
    type: 'image',
    title: 'ატვირთეთ თქვენი ბიზნესის, პროდუქტის ან სერვისის ფოტოები',
    // info: 'შეგიძლიათ ატვირთოთ ლოგო ან გადახვიდეთ შემდეგ საფეხურზე',
    actionText: 'შემდეგი',
    form: [
      {
        type: 'image',
        name: 'businessImages',
      },
    ],
  },
  {
    type: 'input',
    title: 'რა ქვია თქვენს კომპანიას ან ბრენდს?',
    info: 'ჩაწერეთ თქვენი პასუხი აქ',
    actionText: 'შემდეგი',
    form: [
      {
        type: 'input',
        name: 'brand',
      },
    ],
  },
  {
    type: 'thankyou',
    title: 'მადლობა, დააჭირეთ გაგზავნას და დაასრულეთ განაცხადი.',
    actionText: 'შენახვა',
  },
];

export const TypeForm = ({ token }) => {
  const [step, setStep] = React.useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const { values, setFieldValue, setValues } = useFormik({
    initialValues: {},
  });

  const nextStep = () => {
    if (step < Steps.length - 1) {
      setStep(step + 1);
    } else {
      const headers = { Authorization: `Bearer ${token}` };
      const data = { ...values };

      if (typeof data.logo === 'string') {
        delete data.logo;
      }

      if (typeof data.businessImages === 'string') {
        delete data.businessImages;
      }

      axios
        .post(API + 'site/update/' + id, jsonToFormData(data), { headers })
        .then(() => navigate('/dashboard'));
    }
  };

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };

    axios
      .get(API + 'site/' + id, { headers })
      .then(({ data }) => data.data && setValues(data.data));
  }, [id]);

  console.log(values);

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
                      {formItem.type === 'input' && (
                        <Input
                          {...formItem}
                          value={values[formItem.name]}
                          onChange={(value) =>
                            setFieldValue(formItem.name, value)
                          }
                        />
                      )}
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
                        <ImageUpload
                          {...formItem}
                          onChange={(value) =>
                            setFieldValue(formItem.name, value)
                          }
                        />
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
