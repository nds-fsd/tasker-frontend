import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './colectionCard.module.css';
import { iconsMapDisplay } from '../../utils/icons';
import { useTaskerContext } from '../../context';

const ColectionCard = ({ colection }) => {
  const { setRefreshColection } = useTaskerContext();
  const navigate = useNavigate();
  const Icon = iconsMapDisplay[colection.icon].label;
  const handleClickToColection = () => {
    setRefreshColection(true);
    navigate(`/app/collections/${colection.id}`, { replace: true });
  };
  return (
    <div className={styles.root} onClick={handleClickToColection}>
      <div>
        <span>
          <Icon color={colection.color} />
        </span>
      </div>
      <div className={styles.name}>{colection.name}</div>
    </div>
  );
};

export default ColectionCard;
