import React from 'react';
import { format, isSameDay } from 'date-fns';
import styles from './calendarDay.module.css';
import { iconsMapDisplay } from '../../../utils/icons';
import { useTaskerContext } from '../../../context';

const CalendarDay = ({ month, day }) => {
  const {
    state: { tasks, colections },
    openCalendarModal,
  } = useTaskerContext();
  const dayStyles = {};
  if (day.getMonth() === month.getMonth()) {
    dayStyles.backgroundColor = '#222831';
  } else {
    dayStyles.backgroundColor = '#434953';
    dayStyles.color = '#212121';
  }
  const actualDay = isSameDay(day, new Date());
  const taskByDay = tasks.filter(
    (task) => new Date(task.date).getDate() === day.getDate() && new Date(task.date).getMonth() === day.getMonth(),
  );
  const tasksByColection = {};
  taskByDay.forEach((task) => {
    if (!tasksByColection[task.colection]) {
      tasksByColection[task.colection] = [];
    }

    tasksByColection[task.colection].push(task);
  });
  const handleOpenTaskModal = () => {
    openCalendarModal(day);
  };
  return (
    <div className={styles.bodyDay} style={dayStyles} onClick={handleOpenTaskModal}>
      <div className={styles.content}>
        {actualDay && <span className={styles.numberBall}>{format(day, 'dd')}</span>}
        {!actualDay && format(day, 'dd')}
        {taskByDay.length > 0 && colections.length > 0 && (
          <div className={styles.dayChildren}>
            {colections.length > 0 &&
              Object.keys(tasksByColection).map((col) => {
                const c = colections.find((cole) => cole.id === col);
                const colTasks = tasksByColection[c.id];
                const Icon = iconsMapDisplay[c.icon].label;
                return (
                  <div className={styles.taskSpan} style={{ backgroundColor: c.color }}>
                    <Icon color={c.color} padding="0" /> {colTasks.length} task
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarDay;
