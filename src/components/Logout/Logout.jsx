import React from 'react';
import styles from './Logout.module.css';

export default function (props) {
  return (
    <div className='container'>
      <div className={styles.logoutButton}>
        <button className='btn btn-danger btn-lg' onClick={(e) => props.logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
