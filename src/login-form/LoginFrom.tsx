import React, { useCallback, useMemo } from 'react';
import './LoginForm.css';
import { Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

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
        username: yup.string().required('Pole nie może być puste'),
        password: yup
          .string()
          .required('Pole nie może być puste')
          .min(5, 'Nie może być krótsze niż 5 znaków'),
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
              label="Nazwa Użytkownika"
              variant="standard"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && formik.errors.username}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              id="password"
              name="password"
              label="Hasło"
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
              form="sigmForm"
              disabled={!(formik.isValid && formik.dirty)}
              onClick={handleLogInClick}
            >
              Zaloguj się
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
