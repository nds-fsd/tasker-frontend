import React from 'react';
import { getDaysInWeek } from '../utils';
import CalendarDay from '../calendarDay';
import styles from './calendarRow.module.css';

const CalendarRow = ({ week, month }) => {
  const daysWeek = getDaysInWeek(week);
  return (
    <div className={styles.bodyRow}>
      {daysWeek.map((day) => (
        <CalendarDay month={month} day={day} />
      ))}
    </div>
  );
};

export default CalendarRow;
