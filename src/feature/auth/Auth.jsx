import React, { useMemo, useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './Auth.scss';

import { Remember, SocialLogin } from './components';
import { API } from '../../env';

const form = {
  login: [
    {
      name: 'email',
      label: 'ელ-ფოსტა',
      type: 'email',
    },
    {
      name: 'password',
      label: 'პაროლი',
      type: 'password',
    },
  ],
  register: [
    {
      name: 'firstname',
      label: 'სახელი',
      type: 'text',
    },
    {
      name: 'lastname',
      label: 'გვარი',
      type: 'text',
    },
    {
      name: 'email',
      label: 'ელ-ფოსტა',
      type: 'email',
    },
    {
      name: 'password',
      label: 'პაროლი',
      type: 'password',
    },
    {
      name: 'password_confirmation',
      label: 'გაიმეორე პაროლი',
      type: 'password',
    },
  ],
  reset: [
    {
      name: 'email',
      label: 'ელ-ფოსტა',
      type: 'email',
    },
  ],
};

const validationSchema = {
  login: yup.object({
    email: yup
      .string()
      .required('Email is required')
      .email('Enter a valid email'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password should be of minimum 8 characters length'),
  }),
  register: yup.object({
    firstname: yup.string().required('Firstname is required'),
    lastname: yup.string().required('Lastname is required'),
    email: yup
      .string()
      .required('Email is required')
      .email('Enter a valid email'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password should be of minimum 8 characters length'),
    password_confirmation: yup
      .string()
      .required('Password is required')
      .min(8, 'Password should be of minimum 8 characters length')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  }),
};

const contents = {
  login: {
    title: 'სისტემაში შესვლა',
    button: 'შესვლა',
  },
  register: {
    title: 'Create your account',
    button: 'დაწყება',
  },
  reset: {
    title: 'აღადგინე შენი პაროლი',
    button: 'პაროლის აღდგენა',
  },
};

export const Auth = ({ type, updateToken }) => {
  const isLogin = useMemo(() => type === 'login', [type]);
  const isRegister = useMemo(() => type === 'register', [type]);
  const isReset = useMemo(() => type === 'reset', [type]);
  const content = useMemo(() => contents[type], [type]);
  const [notification, setNotification] = useState();
  const navigate = useNavigate();

  const onSubmit = (data, helper) => {
    axios
      .post(API + type, data)
      .then((res) => {
        if (!isReset) {
          updateToken(res.data.plainTextToken);
          navigate('/dashboard');
        } else {
          setNotification(res.data.status);
        }
      })
      .catch((err) => {
        const res = err.response;

        if (res.status === 422) {
          const errors = res.data.errors;

          Object.keys(errors).forEach((key) =>
            helper.setFieldError(key, errors[key])
          );
        }
      });
  };

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    setTouched,
    values,
    setValues,
    setErrors,
  } = useFormik({
    initialValues: {},
    onSubmit,
    validationSchema: validationSchema[type],
  });

  const submit = (e) => {
    setTouched();
    handleSubmit(e);
  };

  useEffect(() => {
    setValues({});
    setErrors({});
    setNotification('');
  }, [type]);

  return (
    <div id="auth">
      <div className="formLayout">
        <h1 children={content.title} />
        {!isReset && <SocialLogin />}
        <div className="form">
          {form[type].map((item, key) => (
            <TextField
              fullWidth
              variant="outlined"
              key={key}
              name={item.name}
              type={item.type}
              label={item.label}
              value={values[item.name] || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched[item.name] && errors[item.name]}
              helperText={touched[item.name] && errors[item.name]}
            />
          ))}
        </div>
        {!isReset && <Remember hasReset={isLogin} />}
        <button
          className={`submit ${type}`}
          onClick={submit}
          type="submit"
          children={content.button}
        />
        {isReset && notification && (
          <span className="notification">{notification}</span>
        )}
        {!isReset && (
          <div className="other-option">
            {isRegister ? (
              <>
                უკვე ხარ რეგისტრირებული? <Link to="/login" children="შესვლა" />
              </>
            ) : (
              <>
                არ ხარ დარეგისტრირებული?{' '}
                <Link to="/register" children="რეგისტრაცია" />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
