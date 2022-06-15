import { createContext, useContext } from 'react';
import { initialState, useTaskerReducer } from './reducer';
import taskerTypes from './types';

const TaskerContext = createContext(initialState);

export const TaskerContextProvider = ({ children }) => {
  const { state, dispatch } = useTaskerReducer();
  return <TaskerContext.Provider value={{ state, dispatch }}>{children}</TaskerContext.Provider>;
};

export const useTaskerContext = () => {
  const { state, dispatch } = useContext(TaskerContext);
  return {
    state,
    dispatch,
    setColections: (res) => dispatch({ type: taskerTypes.SET_COLECTIONS, payload: res }),
    setRefresh: (value) => dispatch({ type: taskerTypes.SET_REFRESH, payload: value }),
    openDrawer: () => dispatch({ type: taskerTypes.TOGGLE_DRAWER }),
    openModal: () => dispatch({ type: taskerTypes.MODAL_OPEN }),
    closeModal: () => dispatch({ type: taskerTypes.MODAL_CLOSE }),
    refreshColections: () => dispatch({ type: taskerTypes.SET_REFRESH, payload: true }),
    refreshCalendar: () => dispatch({ type: taskerTypes.SET_REFRESH_CALENDAR, payload: true }),
    cleanContext: () => dispatch({ type: taskerTypes.CLEAN_CONTEXT }),
    setRefreshColection: (value) => dispatch({ type: taskerTypes.SET_REFRESH_COLECTION, payload: value }),
    setRefreshContext: (value) => dispatch({ type: taskerTypes.SET_REFRESH, payload: value }),
    editModal: (colection) => dispatch({ type: taskerTypes.EDIT_MODAL_FORM, payload: colection }),
    setTasks: (res) => dispatch({ type: taskerTypes.SET_TASKS, payload: res }),
    closeCalendarModal: () => dispatch({ type: taskerTypes.CLOSE_CALENDAR_MODAL }),
    openCalendarModal: (day) => dispatch({ type: taskerTypes.OPEN_CALENDAR_MODAL, payload: day }),
    cleanEditValues: () => dispatch({ type: taskerTypes.CLEAN_EDIT_MODAL_FORM }),
  };
};
