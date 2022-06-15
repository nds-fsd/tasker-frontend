import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCalendar as CalendarIcon } from 'react-icons/fi';
import { AiOutlineMenu as MenuIcon } from 'react-icons/ai';
import { BiCollection as CollectionIcon } from 'react-icons/bi';
import { MdDashboard as DashboardIcon } from 'react-icons/md';
import { RiAddFill as AddIcon } from 'react-icons/ri';
import { Menu, MenuItem } from '@material-ui/core';
import styles from './navBar.module.css';
import NewCollectionModal from '../../newCollectionModal/newCollectionModal.view';
import { getUserSession } from '../../../utils/sesion';
import Avatar from '../../../components/avatar';
import SearchBar from '../../../components/searchBar';
import { useTaskerContext } from '../../../context';

const NavBar = () => {
  const { openDrawer, openModal, refreshColections, refreshCalendar, cleanContext } = useTaskerContext();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };
  const handleCloseMenu = () => {
    setOpenMenu(false);
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    localStorage.removeItem('userSession');
    handleCloseMenu();
    cleanContext();
    navigate('/login', { replace: true });
  };
  const handleProfile = () => {
    handleCloseMenu();
  };
  const handleClickDashboardView = () => {
    navigate('/app/dashboard', { replace: true });
  };
  const handleClickColectionView = () => {
    refreshColections();
    navigate('/app/collections', { replace: true });
  };
  const handleClickCalendarView = () => {
    navigate('/app/calendar', { replace: true });
    refreshCalendar(true);
  };
  const userInfo = getUserSession('userSession');
  const name = `${userInfo.user.firstName} ${userInfo.user.lastName}`;

  return (
    <div className={styles.root}>
      <NewCollectionModal />
      <div className={styles.itemsContainer}>
        <div className={styles.left}>
          <span className={styles.button} onClick={openDrawer}>
            <MenuIcon size="24px" />
          </span>
          <div className={styles.button} onClick={handleClickDashboardView}>
            <DashboardIcon size="22px" className={styles.icons} />
            Dashboard
          </div>
          <div className={styles.button} onClick={handleClickColectionView}>
            <CollectionIcon size="22px" className={styles.icons} />
            Collections
          </div>
          <div className={styles.button} onClick={handleClickCalendarView}>
            <CalendarIcon size="22px" className={styles.icons} />
            Calendar
          </div>
        </div>
        <div className={styles.right}>
          <span className={styles.specialButton} onClick={openModal}>
            <AddIcon size="26px" className={styles.specialButtonIcon} />
          </span>
          <div className={styles.serchBar}>
            <SearchBar />
          </div>
          <div className={styles.imgSession} onClick={handleOpenMenu}>
            <Avatar name={name} />
          </div>
          <Menu
            open={openMenu}
            onClose={handleCloseMenu}
            elevation={0}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}>
            <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};
export default NavBar;
