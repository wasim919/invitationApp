import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './Logout.module.css';

export default function (props) {
  const dispatch = useDispatch();
  const logout = () => {
    localStorage.removeItem('isLogged');
    localStorage.removeItem('tokens');
    dispatch({
      type: 'LOGOUT',
      payload: {
        isLogged: false,
        tokens: {},
      },
    });
  };
  return (
    <div className='container'>
      <div className={styles.logoutButton}>
        <button className='btn btn-danger btn-lg' onClick={(e) => logout()}>
          Logout
        </button>
      </div>
    </div>
  );
}
