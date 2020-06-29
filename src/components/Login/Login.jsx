import React, { useState } from 'react';
import styles from './Login.module.css';
import { Invites, AddInvite, SendInvitation } from '../';
import { useSelector, useDispatch } from 'react-redux';
import { loginAPI } from '../../api';
import cx from 'classnames';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const { accessToken, refreshToken } = await loginAPI({
        username,
        password,
      });
      dispatch({
        type: 'LOGIN',
        payload: {
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      });
      // localStorage.setItem("tokens", { refreshToken, accessToken });
    } catch (error) {
      console.log(error.message);
    }
  };
  const tokens = useSelector((state) => state.taskReducer.tokens); // comment this line if you want to fetch login tokens from local storage
  // const tokens = localStorage.getItem('tokens'); // un-comment this line if you want to perserve login info upon refresh
  return !tokens.accessToken ? (
    <div className={cx('container', styles.container)}>
      <div className='row'>
        <h3>{tokens.accessToken}</h3>
        <form>
          <div className='form-group'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              id='username'
              className={cx('inputfield form-control', styles.inputfield)}
              placeholder='Enter username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              className={cx('form-control', styles.inputfield)}
              placeholder='Enter your password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className={styles.submitButton}>
            <button
              type='submit'
              className='btn btn-primary btn-lg'
              onClick={(e) => submitForm(e)}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <div className='container'>
      <AddInvite />
      <Invites />
      <SendInvitation />
    </div>
  );
}
