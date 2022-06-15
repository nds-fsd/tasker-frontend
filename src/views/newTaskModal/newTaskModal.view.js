import React, { useState } from 'react';
import { format } from 'date-fns';
import styles from './newTaskModal.module.css';
import Modal from '../../components/modal';
import Input from '../../components/input';
import Button from '../../components/button';
import fetchResource from '../../utils/fetchResource';
import SelectColection from '../../components/selectColection';
import { useTaskerContext } from '../../context';

const NewTaskModal = () => {
  const {
    state: {
      calendarModal: { open: isModalOpen, day: calendarDay },
    },
    closeCalendarModal,
    setRefreshCalendar,
  } = useTaskerContext();
  const [data, setData] = useState({
    description: '',
    colection: undefined,
  });
  const [error, setError] = useState({});
  const handleDescriptionTask = (e) => {
    setData({ ...data, description: e.target.value });
  };
  const handleSelectColection = (value) => {
    setData({ ...data, colection: value });
  };

  const handleSubmit = () => {
    if (data.description) {
      const finalBody = {
        ...data,
        date: format(calendarDay, 'yyyy-MM-dd'),
        colection: data.colection.value,
      };
      fetchResource('POST', `task`, { body: finalBody }, {}).then(() => {
        closeCalendarModal();
        setRefreshCalendar(true);
        setError({});
      });
    } else {
      setError({ description: 'Name for task is required' });
    }
  };
  const handleCloseModal = () => {
    closeCalendarModal();
    setError({});
  };
  return (
    <Modal open={isModalOpen} closeModal={handleCloseModal}>
      <div className={styles.modalContainer}>
        <div className={styles.dataContainer}>
          <div className={styles.data}>
            <div className={styles.input}>
              <Input
                label="New task"
                value={data.description}
                onChange={handleDescriptionTask}
                error={error.description}
              />
            </div>
            <SelectColection value={data.colection} onChange={handleSelectColection} />
          </div>
        </div>
        <div className={styles.buttonsContainer}>
          <Button label="create" variant="primary" onClick={handleSubmit} />
          <Button label="cancel" variant="secondary" onClick={handleCloseModal} />
        </div>
      </div>
    </Modal>
  );
};

export default NewTaskModal;
