import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { hasUserSession } from '../sesion';

function PrivateRoute(props) {
  const { children, ...rest } = props;
  if (hasUserSession()) {
    return <Route {...rest}>{children}</Route>;
  }
  return <Navigate to="/login" />;
}

export default PrivateRoute;
