import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiChevronLeft, FiMoreVertical } from 'react-icons/fi';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.min.css';
import { Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { format } from 'date-fns';
import Item from '../../components/accordion/item/item.view';
import styles from './oneColection.module.css';
import fetchResource from '../../utils/fetchResource';
import Input from '../../components/input';
import Button from '../../components/button';
import { iconsMapDisplay } from '../../utils/icons';
import DatePickerTask from '../../utils/datePicker';
import { useTaskerContext } from '../../context';

const useStyles = makeStyles({
  input: {
    root: {
      color: 'white',
    },
  },
});
const OneColection = () => {
  const {
    state: { refreshColection },
    setRefreshContext,
    openModal,
    editModal,
    setRefreshColection,
  } = useTaskerContext();
  const classes = useStyles();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [colection, setColection] = useState({});
  const [error, setError] = useState({});
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [data, setData] = useState({
    description: '',
    date: new Date(),
    colection: id,
  });
  const [openOptions, setOpenOptions] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpenOptions = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenOptions(true);
  };
  const handleCloseMenu = () => {
    setOpenOptions(false);
    setAnchorEl(null);
  };
  useEffect(() => {
    if (refreshColection) {
      fetchResource('GET', `colection/${id}`, {}, {}).then((res) => {
        setColection(res);
        setRefresh(true);
        setRefreshColection(false);
      });
    }
  }, [refreshColection]);
  useEffect(() => {
    if (refresh) {
      fetchResource('GET', 'task', {}, { colection: id }).then((res) => {
        setTasks(res);
        setRefresh(false);
      });
    }
  }, [refresh]);
  const handleDeleteTask = (taskId) => {
    fetchResource('DELETE', `task/${taskId}`, {}, {}).then(() => {
      setRefresh(true);
    });
  };
  const handleEditTask = (newData, taskId) => {
    fetchResource('PATCH', `task/${taskId}`, { body: newData }, {}).then(() => {
      setRefresh(true);
    });
  };
  const handleBackToColection = () => {
    navigate(-1);
  };
  const notCompleteTasks = tasks.filter((task) => !task.done);
  const notCompleteTasksTitle = `Tasks - ${notCompleteTasks.length}`;
  const completeTasks = tasks.filter((task) => task.done);
  const completeTasksTitle = `Completed tasks - ${completeTasks.length}`;

  const doneTask = (done, taskId) => {
    fetchResource('PATCH', `task/${taskId}`, { body: { done } }, {}).then(() => {
      setRefresh(true);
    });
  };
  const handleChangeDescription = (e) => {
    setData({ ...data, description: e.target.value });
  };
  const handleAccept = (date) => {
    setData({ ...data, date });
    setOpenDatePicker(false);
  };
  const handleChangeDate = (date) => {
    setData({ ...data, date });
  };
  const handleSaveTask = () => {
    if (data.description && data.date) {
      const finalBody = { ...data, date: format(data.date, 'yyyy-MM-dd') };
      fetchResource('POST', 'task', { body: finalBody }, {}).then(() => {
        setRefreshContext(true);
        setRefresh(true);
        setData({
          description: '',
          date: new Date(),
          colection: id,
        });
        setError({});
      });
    } else {
      setError({ description: 'Name for task is required' });
    }
  };
  const handleDeleteColection = () => {
    fetchResource('DELETE', `colection/${id}`, {}, {}).then(() => {
      setRefreshContext(true);
      navigate('/app/collections', { replace: true });
    });
  };

  const openEditModal = () => {
    handleCloseMenu();
    editModal(colection);
    openModal(true);
  };
  let Icon = null;
  if (colection.icon) {
    Icon = iconsMapDisplay[colection.icon].label;
  }
  return (
    <div className={styles.root}>
      <div className={styles.head}>
        <div className={styles.backName}>
          <span className={styles.backIcon} onClick={handleBackToColection}>
            <FiChevronLeft size="22" />
          </span>
          <span>{Icon && <Icon color={colection.color} />}</span>
          <div className={styles.colectionName}>{colection.name}</div>
        </div>
        <span className={styles.moreIcon} onClick={handleOpenOptions}>
          <FiMoreVertical size="20" />
        </span>
        <Menu
          open={openOptions}
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
          <MenuItem onClick={openEditModal}>Edit</MenuItem>
          <MenuItem onClick={handleDeleteColection}>Delete</MenuItem>
        </Menu>
      </div>
      <div className={styles.add}>
        <div className={styles.addTask}>
          <div className={styles.inputsModal}>
            <div className={styles.input}>
              <Input
                label="Task"
                value={data.description}
                onChange={handleChangeDescription}
                error={error.description}
              />
            </div>
            <div className={styles.input}>
              <DatePickerTask
                value={data.date}
                onAccept={handleAccept}
                inputVariant="outlined"
                open={openDatePicker}
                onChange={handleChangeDate}
                onOpen={() => setOpenDatePicker(true)}
                onClose={() => setOpenDatePicker(false)}
                inputProps={{ className: classes.root }}
              />
            </div>
            <div className={styles.buttons}>
              <Button label="SAVE" onClick={handleSaveTask} variant="primary" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.tasksContainer}>
        {notCompleteTasks.length > 0 && (
          <div>
            <div>{notCompleteTasksTitle}</div>
            <div>
              {notCompleteTasks.map((task) => (
                <div className={styles.task}>
                  <Item task={task} onCheck={doneTask} onEdit={handleEditTask} onDelete={handleDeleteTask} />
                </div>
              ))}
            </div>
          </div>
        )}
        {completeTasks.length > 0 && (
          <div>
            <div>{completeTasksTitle}</div>
            <div>
              {completeTasks.map((task) => (
                <div className={styles.task}>
                  <Item task={task} onCheck={doneTask} onEdit={handleEditTask} onDelete={handleDeleteTask} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OneColection;
