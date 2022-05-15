import React from "react";
import "./form.scss";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField, Button, Checkbox } from "@material-ui/core";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Form = ({ title }) => {
  const formik = useFormik({
    initialValues: {
      email: "foobar@example.com",
      password: "foobar",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div id="formLayout">
      <h2>{title}</h2>
      <div className="other-registation">
        <ul>
          <li>
            <a href="#">Login with Google</a>
          </li>
          <li>
            <a href="#">Login with facebook</a>
          </li>
          <li>
            <a href="#">Login with Apple</a>
          </li>
        </ul>
        <div className="or">
          <span>or</span>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <div className="remmember-password">
          <div>
            <Checkbox />
            <span className="remmember-me">Remember me</span>
          </div>
          <span>
            <a href="#">Forgot your password?</a>
          </span>
        </div>
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          className="submit-button"
        >
          Log in
        </Button>
        <Button
          color="primary"
          variant="contained"
          href="#"
          fullWidth
          className="registration-btn"
        >
          Registration
        </Button>
      </form>
    </div>
  );
};

export default Form;
