import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './Logout.module.css';

export default function (props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const logout = () => {
    dispatch({
      type: 'LOGOUT',
      payload: {
        isLogged: false,
        token: {},
        posts: [],
      },
    });
    history.push('/');
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
