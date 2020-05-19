import React from 'react';
import styles from './style/css/Usage.module.css';

const UsageModal = ({ onClose }) => {
  return (
    <div className={styles.outter}>
      <div className={styles.content}>
        <div
          className={styles.button}
          onClick={() => onClose(false)}
        ></div>
        <p>command List</p>
        <p>1. ls [ File List ]</p>
        <p>2. cd + file [ Change Directory ]</p>
        <p>3. open . [ Open File ]</p>
      </div>
    </div>
  )
}

export default UsageModal