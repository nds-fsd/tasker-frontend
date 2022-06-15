import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import classnames from 'classnames';
import styles from './main.module.css';
import NavBar from './navbar';
import Drawer from './drawer/drawer.view';
import fetchResource from '../../utils/fetchResource';
import { useTaskerContext } from '../../context';
import { hasUserSession } from '../../utils/sesion';

const Main = (props) => {
  const {
    state: { openedDrawer, refresh },
    setColections,
    setRefresh,
  } = useTaskerContext();
  const location = useLocation();
  const containerClass = classnames(styles.container, {
    [styles.containerMove]: openedDrawer,
  });

  const containerStyle = {};
  if (location.pathname.includes('calendar')) {
    containerStyle.paddingTop = 0;
  }
  useEffect(() => {
    if (refresh) {
      fetchResource('GET', 'colection', {}, {}).then((res) => {
        setColections(res);
        setRefresh(false);
      });
    }
  }, [refresh]);

  return (
    <>
      {!hasUserSession() && <Navigate to="/login" replace />}
      {hasUserSession() && (
        <div className={styles.root}>
          <div>
            <NavBar />
            <Drawer />
          </div>
          <div className={styles.mainContainer}>
            <div className={containerClass} style={containerStyle}>
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Main;
