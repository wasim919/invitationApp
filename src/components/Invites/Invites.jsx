import React, { useEffect, useState } from 'react';
import styles from './Invites.module.css';
import { Invite } from '../';
import { useSelector, useDispatch } from 'react-redux';

export default function () {
  const dispatch = useDispatch();

  const userInvitesExistForUser = (userData, userLoggedIn) => {
    let flag = 1;
    for (let i = 0; i < userData.length; ++i) {
      flag = 1;
      if (userLoggedIn === userData[i].username) {
        flag = 0;
        if (userData[i].invites) {
          for (let j = 0; j < userData[i].invites.length; ++j) {
            console.log(`${j} hello`);
            dispatch({
              type: 'ADD_INVITE',
              payload: {
                onRefresh: false,
                ...userData[i].invites[j],
              },
            });
          }
          if (flag === 0) {
            break;
          }
        }
      }
    }
    return;
  };

  useEffect(() => {
    let userLoggedIn = localStorage.getItem('username');
    let userData = localStorage.getItem('userData');
    if (userData != null) {
      userData = JSON.parse(userData);
      userInvitesExistForUser(userData, userLoggedIn);
    }
  }, []);

  const invites = useSelector((state) => state.taskReducer.invites);

  return { invites } ? (
    <div className={styles.container}>
      <div className='invitesDisplay'>
        <ul className='list-group'>
          {invites.map((invite, index) => (
            <Invite index={index} email={invite.email} mobile={invite.mobile} />
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <div className='container'>Add Invites</div>
  );
}
