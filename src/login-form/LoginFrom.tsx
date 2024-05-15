import React, { useCallback, useMemo } from 'react';
import './LoginForm.css';
import { Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { LoginSharp } from '@mui/icons-material';

function LoginForm() {
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (values: { username: string; password: string }, formik: any) => {
      console.log(values);
    },
    [],
  );
  const handleLogInClick = () => {
    navigate('/allbooks');
  };

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup.string().required('Username cannot be empty'),
        password: yup
          .string()
          .required('Password cannot be empty')
          .min(5, 'Needs at least 5 characters'),
      }),
    [],
  );

  return (
    <div>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnChange
        validateOnBlur
      >
        {(formik: any) => (
          <form
            className="Login-form"
            id="signForm"
            noValidate
            onChange={formik.handleSubmit}
          >
            <TextField
              id="username"
              name="username"
              label="Username"
              variant="standard"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && formik.errors.username}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              variant="standard"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              variant="contained"
              type="submit"
              form="signForm"
              endIcon={<LoginSharp />}
              disabled={!(formik.isValid && formik.dirty)}
              onClick={handleLogInClick}
            >
              Log In
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
