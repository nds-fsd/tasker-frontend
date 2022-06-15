import ReactSelect from 'react-select';
import { iconsMap } from '../../utils/icons';
import styles from './selectIcons.module.css';

function Select(props) {
  const { value, onChange } = props;
  const selectValue = iconsMap[value];
  return (
    <ReactSelect
      className={styles.select}
      options={Object.values(iconsMap)}
      value={selectValue}
      placeholder="Icon"
      onChange={onChange}
    />
  );
}

export default Select;
