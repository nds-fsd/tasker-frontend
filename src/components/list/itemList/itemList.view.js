import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './itemList.module.css';
import { iconsMapDisplay } from '../../../utils/icons';

function ItemList(props) {
  const { el } = props;
  const Icon = iconsMapDisplay[el.icon].label;
  const navigate = useNavigate();
  const handleClickToColection = () => {
    navigate(`/app/collections/${el.id}`, { replace: true });
  };
  return (
    <div className={styles.root} onClick={handleClickToColection}>
      <span className={styles.icon}>
        <Icon color={el.color} />
      </span>
      {el.name}
    </div>
  );
}

export default ItemList;
