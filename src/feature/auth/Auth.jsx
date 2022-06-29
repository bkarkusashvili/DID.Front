import React, { useMemo } from 'react';
import { TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import './Auth.scss';

import { Remember, SocialLogin } from './components';

const form = {
  login: [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      // validate: yup.email('Enter a valid email').required('Email is required'),
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

export const Auth = ({ type }) => {
  const isLogin = useMemo(() => type === 'login', [type]);
  const isRegister = useMemo(() => type === 'register', [type]);
  const title = useMemo(
    () => (isLogin ? 'Log into system' : 'Create your account'),
    [type]
  );

  const { handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {},
    // validationSchema:
  });

  const submit = () => {};

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
            />
          ))}
        </div>
        <Remember hasReset={isLogin} />
        <button
          className={`submit ${type}`}
          onClick={submit}
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
