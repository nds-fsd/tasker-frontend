import ReactSelect from 'react-select';
import styles from './selectColection.module.css';
import { iconsMapDisplay } from '../../utils/icons';
import { useTaskerContext } from '../../context';

const SelectColection = ({ value, onChange }) => {
  const {
    state: { colections },
  } = useTaskerContext();
  const colectionsArr = colections.map((colection) => {
    const Icon = iconsMapDisplay[colection.icon].label;
    return {
      label: (
        <div style={{ color: 'black', display: 'flex', alignItems: 'center' }}>
          <Icon size="20" color={colection.color} />
          <div>{colection.name}</div>
        </div>
      ),
      value: colection.id,
    };
  });
  return (
    <ReactSelect
      className={styles.select}
      options={colectionsArr}
      value={value}
      placeholder="Colection"
      onChange={onChange}
    />
  );
};

export default SelectColection;
