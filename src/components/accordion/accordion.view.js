import React, { useState } from 'react';
import { FiArrowRight, FiChevronDown } from 'react-icons/fi';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import styles from './accordion.module.css';
import { iconsMapDisplay } from '../../utils/icons';
import Item from './item/item.view';

const Accordion = ({ collection, tasks, onChangeItem }) => {
  const navigate = useNavigate();
  const icon = iconsMapDisplay[collection.icon].label;
  const [open, setOpen] = useState(true);
  const handleClickToOpen = () => {
    setOpen(!open);
  };
  const itemsContainerClass = classNames(styles.itemsContainer, {
    [styles.itemsContainerOpened]: open,
  });
  const footerClass = classNames(styles.footer, {
    [styles.footerClose]: !open,
  });
  const iconClass = classNames(styles.icon, {
    [styles.iconOpen]: open,
  });
  const goToColection = () => {
    navigate(`/app/collections/${collection.id}`, { replace: true });
  };
  return (
    <div className={styles.container} style={{ backgroundColor: collection.color }}>
      <div className={styles.titleContainer} onClick={handleClickToOpen}>
        <div className={styles.nameContainer}>
          <span>{icon}</span>
          <div className={styles.name}>{collection.name}</div>
        </div>
        <span className={iconClass}>
          <FiChevronDown size="20" />
        </span>
      </div>
      <div className={itemsContainerClass}>
        {tasks && tasks.length > 0 && tasks.map((task) => <Item task={task} onCheck={onChangeItem} />)}
      </div>
      <div className={footerClass} onClick={goToColection}>
        <div className={styles.footerText}>Go to Collection</div>
        <span className={styles.footerIcon}>
          <FiArrowRight />
        </span>
      </div>
    </div>
  );
};
export default Accordion;
