import React from 'react';
import styles from './styles.scss';

export default function Page({children}) {
  return (
    <div className={styles.base}>
      {children}
    </div>
  );
}
