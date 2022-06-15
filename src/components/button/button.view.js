import React from 'react';
import classNames from 'classnames';
import styles from './button.module.css';

function Button(props) {
  const { size, variant, onClick, label, ...rest } = props;
  const buttonClass = classNames(styles.default, {
    [styles.big]: size === 'big',
    [styles.small]: size === 'small',
    [styles.primary]: variant === 'primary',
    [styles.secondary]: variant === 'secondary',
  });
  return (
    <button {...rest} className={buttonClass} onClick={onClick} type="button">
      {label.toUpperCase()}
    </button>
  );
}

export default Button;
