import React, { useCallback, useMemo } from 'react';
import { Formik } from 'formik';
import { TextField, Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../api/ApiProvider';
import './LoginForm.css';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const apiClient = useApi();

  const onSubmit = useCallback(
    (values: { login: string; password: string }, formik: any) => {
      apiClient.login(values).then((response) => {
        if (response.success) {
          const role = localStorage.getItem('role');
          if (role === 'ROLE_LIBRARIAN') {
            navigate('/home/librarian');
          } else if (role === 'ROLE_READER') {
            navigate('/home/reader');
          }
        } else {
          formik.setFieldError('password', 'Invalid username or password');
        }
      });
    },
    [apiClient, navigate],
  );

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        login: yup.string().required('Required'),
        password: yup
          .string()
          .required('Required')
          .min(5, 'Password too short'),
      }),
    [],
  );

  return (
    <div className="login-wrapper">
      <Formik
        initialValues={{ login: '', password: '' }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnChange
        validateOnBlur
      >
        {(formik: any) => (
          <form
            className="login-form"
            id="signForm"
            onSubmit={formik.handleSubmit}
            noValidate
          >
            <h1>Login</h1>
            <div className="login-input-box">
              <TextField
                id="login"
                placeholder="Username"
                variant="outlined"
                name="login"
                color="success"
                InputProps={{ sx: { borderRadius: 40 } }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.login && !!formik.errors.login}
                helperText={formik.touched.login && formik.errors.login}
              />
            </div>
            <div className="login-input-box">
              <TextField
                id="password"
                placeholder="Password"
                variant="outlined"
                type="password"
                name="password"
                color="success"
                InputProps={{ sx: { borderRadius: 40 } }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && !!formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
              />
            </div>
            <Button
              className="login-button"
              variant="contained"
              startIcon={<LoginIcon />}
              type="submit"
              form="signForm"
              disabled={!(formik.isValid && formik.dirty)}
            >
              Login
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
