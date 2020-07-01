import React from 'react';
import styles from './Invite.module.css';
import { useDispatch } from 'react-redux';

export default function (props) {
  const dispatch = useDispatch();
  const deleteInvite = (e) => {
    console.log(props.index);
    dispatch({
      type: 'REMOVE_INVITE',
      payload: props.index,
    });
  };
  return (
    <div className='container'>
      <div className={styles.inviteContainer}>
        <li className='list-group-item'>Email: {props.email}</li>
        <li className='list-group-item'>Mobile: {props.mobile}</li>
        <button
          className='btn btn-danger btn-lg'
          key={props.index}
          onClick={(e) => deleteInvite(e)}
        >
          x
        </button>
      </div>
    </div>
  );
}
