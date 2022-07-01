import React, { useMemo } from 'react';
import { TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './Auth.scss';

import { Remember, SocialLogin } from './components';
import { API } from '../../env';
import { useEffect } from 'react';

const form = {
  login: [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
    },
  ],
  register: [
    {
      name: 'firstname',
      label: 'First Name',
      type: 'text',
    },
    {
      name: 'lastname',
      label: 'Last Name',
      type: 'text',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
    },
    {
      name: 'password_confirmation',
      label: 'Confirm Password',
      type: 'password',
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

export const Auth = ({ type, updateToken }) => {
  const isLogin = useMemo(() => type === 'login', [type]);
  const isRegister = useMemo(() => type === 'register', [type]);
  const title = useMemo(
    () => (isLogin ? 'Log into system' : 'Create your account'),
    [isLogin]
  );
  const navigate = useNavigate();

  const onSubmit = (data, helper) => {
    axios
      .post(API + type, data)
      .then((res) => {
        updateToken(res.data.plainTextToken);
        navigate('/dashboard');
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
  }, [type]);

  return (
    <div id="auth">
      <div className="formLayout">
        <h1 children={title} />
        <SocialLogin />
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
        <Remember hasReset={isLogin} />
        <button
          className={`submit ${type}`}
          onClick={submit}
          type="submit"
          children={isRegister ? 'Get started' : 'Log in'}
        />
        <div className="other-option">
          {isRegister ? (
            <>
              Already have an account? <Link to="/login" children="Log in" />
            </>
          ) : (
            <>
              Don't have an account? <Link to="/register" children="Register" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
