import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import styles from './logIn.module.css';
import Input from '../../components/input';
import Button from '../../components/button';
import { ReactComponent as TaskerLogo } from '../../assets/taskerLogo.svg';
import fetchResource from '../../utils/fetchResource';
import { hasUserSession, setUserSession } from '../../utils/sesion';

const LogIn = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const handleChangeInput = (e, key) => {
    setErrors({ ...errors, [key]: '' });

    setData({ ...data, [key]: e.target.value });
  };
  const emailRegex = /\S+@\S+\.\S+/;
  const validateEmail = (email) => emailRegex.test(email);
  const handleLogIn = () => {
    if (validateEmail(data.email)) {
      fetchResource('POST', 'login', { body: data })
        .then((res) => {
          setUserSession(res);
          navigate('/app/dashboard', { replace: true });
        })
        .catch((apiError) => {
          setErrors({ ...apiError.response.error });
        });
    } else {
      setErrors({ email: 'Enter a valid email' });
    }
  };

  return (
    <>
      {hasUserSession() && <Navigate to="/app/dashboard" replace />}
      {!hasUserSession() && (
        <div className={styles.root}>
          <div className={styles.formContainer}>
            <TaskerLogo className={styles.logo} />
            <h3 className={styles.title}>Log In</h3>
            <div className={styles.input}>
              <Input
                label="Email"
                size="big"
                value={data.email}
                onChange={(e) => handleChangeInput(e, 'email')}
                error={errors && errors.email}
              />
            </div>
            <div className={styles.input}>
              <Input
                label="Password"
                type="password"
                size="big"
                value={data.password}
                onChange={(e) => handleChangeInput(e, 'password')}
                error={errors && errors.password}
              />
            </div>
            <div className={styles.button}>
              <Button label="ENTER" variant="primary" onClick={handleLogIn} />
            </div>
            <div className={styles.redirectText}>
              Are you not registered yet? Do it <Link to="/signup">here</Link>.
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogIn;
