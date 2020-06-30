import React from 'react';
import styles from './Invites.module.css';
import { Invite } from '../';
import { useSelector } from 'react-redux';

export default function () {
  const invites = useSelector((state) => state.taskReducer.invites);

  return { invites } ? (
    <div className={styles.container}>
      <div className='invitesDisplay'>
        <ul className='list-group'>
          {invites.map((invite, index) => (
            <Invite key={index} email={invite.email} mobile={invite.mobile} />
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <div className='container'>Add Invites</div>
  );
}
