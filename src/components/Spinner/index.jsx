import React from 'react';
import styles from './styles.scss';
import getClassName from 'utils/getClassName';

export default function Spinner(props) {
  const className = props.active
    ? styles.active
    : styles.base;

  return (
    <div className={getClassName(styles, props, className)} />
  );
}
