import React, { useEffect, useState } from 'react';
import format from 'date-fns/format';
import styles from './dashboard.module.css';
import fetchResource from '../../utils/fetchResource';
import Accordion from '../../components/accordion';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [colections, setColections] = useState([]);
  const [groupedTasks, setGroupedTasks] = useState({});
  const [refresh, setRefresh] = useState(true);
  const infoSentenceNotTask = "There aren't tasks for today";
  useEffect(() => {
    if (refresh) {
      fetchResource(
        'GET',
        'task',
        {},
        {
          date: format(new Date(), 'yyyy-MM-dd'),
        },
      ).then((res) => {
        setTasks(res);
        setLoading(true);
        setRefresh(false);
      });
    }
  }, [refresh]);
  useEffect(() => {
    const colIds = {};
    tasks.forEach((task) => {
      if (colIds[task.colection] === undefined) {
        colIds[task.colection] = [];
      }
      colIds[task.colection].push(task);
    });
    const ids = Object.keys(colIds);
    if (tasks.length > 0) {
      fetchResource('GET', 'colection', {}, { idIn: ids }).then((res) => {
        setColections(res);
        setGroupedTasks(colIds);
      });
    }
  }, [tasks]);
  const doneTask = (done, taskId) => {
    fetchResource('PATCH', `task/${taskId}`, { body: { done } }, {}).then(() => {
      setRefresh(true);
    });
  };
  return (
    <>
      {loading && tasks.length > 0 && (
        <div>
          {colections.map((colection) => (
            <Accordion collection={colection} tasks={groupedTasks[colection.id]} onChangeItem={doneTask} />
          ))}
        </div>
      )}
      {loading && tasks.length === 0 && <div className={styles.infoRoot}>{infoSentenceNotTask}</div>}
    </>
  );
}

export default Dashboard;
