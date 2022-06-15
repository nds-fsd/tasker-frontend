import React, { useEffect, useState } from 'react';
import { addMonths, endOfMonth, format, startOfMonth, subMonths } from 'date-fns';
import CalendarView from './calendar.view';
import fetchResource from '../../utils/fetchResource';
import { useTaskerContext } from '../../context';

const CalendarContainer = () => {
  const {
    setTasks,
    refreshCalendar: refresh,
    state: { refreshCalendar },
  } = useTaskerContext();
  const [month, setMonth] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const handleAddMonth = () => {
    setMonth(addMonths(month, 1));
    setLoading(true);
  };
  const handleSubMonth = () => {
    setMonth(subMonths(month, 1));
    setLoading(true);
    refresh();
  };
  const from = format(startOfMonth(month), 'yyyy-MM-dd');
  const to = format(endOfMonth(month), 'yyyy-MM-dd');
  useEffect(() => {
    if (refreshCalendar) {
      fetchResource('GET', 'task', {}, { from, to }).then((res) => {
        setTasks(res);
        setLoading(false);
        refresh();
      });
    }
  }, [refreshCalendar]);
  return !loading && <CalendarView month={month} onAddMonth={handleAddMonth} onSubMonth={handleSubMonth} />;
};

export default CalendarContainer;
