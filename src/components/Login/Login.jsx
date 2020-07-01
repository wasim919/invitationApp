import React, { useState, useEffect } from 'react';
import styles from './Login.module.css';
import { Invites, AddInvite, SendInvitation, Logout } from '../';
import { useSelector, useDispatch } from 'react-redux';
import { loginAPI } from '../../api';
import cx from 'classnames';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    let isLogged = localStorage.getItem('isLogged');
    let tokens = localStorage.getItem('tokens');
    let username = localStorage.getItem('username');
    if (isLogged && tokens) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username,
          isLogged,
          tokens,
        },
      });
    }
  }, []);

  const checkPresentNameAndPassword = () => {
    if (!username || !password) {
      return true;
    }
    return false;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    let isLogged = false;

    if (checkPresentNameAndPassword()) {
      return alert('Please enter both username and password');
    }

    try {
      const { accessToken, refreshToken } = await loginAPI({
        username,
        password,
      });
      isLogged = true;
      dispatch({
        type: 'LOGIN',
        payload: {
          username,
          isLogged,
          tokens: {
            accessToken: accessToken,
            refreshToken: refreshToken,
          },
        },
      });
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  const isLogged = useSelector((state) => state.taskReducer.isLogged);

  return !isLogged ? (
    <div className={cx('container', styles.container)}>
      <div className='row'>
        {/* <h3>{tokens.accessToken}</h3> */}
        <div className='card'>
          <div className={cx('card-body', styles.cardBody)}>
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
      </div>
    </div>
  ) : (
    // return (
    <div className='container'>
      <Logout />
      <AddInvite />
      <Invites />
      <SendInvitation />
    </div>
  );
}
