import React from 'react';
import styles from './colections.module.css';
import ColectionCard from '../../components/colectionCard';
import { useTaskerContext } from '../../context';

const Colections = () => {
  const {
    state: { colections },
    openModal,
  } = useTaskerContext();
  const infoSentenceNotColections = "There aren't colections yet";

  return (
    <>
      {colections.length > 0 && (
        <div className={styles.root}>
          {colections.map((colection) => (
            <ColectionCard colection={colection} />
          ))}
          <div className={styles.addColection} onClick={openModal}>
            +
          </div>
        </div>
      )}
      {colections.length === 0 && <div className={styles.infoRoot}>{infoSentenceNotColections}</div>}
    </>
  );
};

export default Colections;
