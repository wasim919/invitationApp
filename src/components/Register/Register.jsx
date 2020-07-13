import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { registerAPI } from '../../api';
import styles from './Register.module.css';
import cx from 'classnames';

export default function Register() {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const isLogged = useSelector((state) => state.taskReducer.isLogged);
  const dispatch = useDispatch();

  const checkAttributes = () => {
    if (!username || !email || !password || !confirmPassword) {
      return true;
    }
    return false;
  };

  const registerUser = async (e) => {
    e.preventDefault();
    let isLogged = false;
    if (checkAttributes()) {
      return alert(
        'Please enter username, email, password and confirm password'
      );
    }
    if (password !== confirmPassword) {
      return alert("Passwords don't match");
    }

    try {
      const { token } = await registerAPI({
        username,
        email,
        password,
      });
      isLogged = true;
      dispatch({
        type: 'REGISTER',
        payload: {
          isLogged,
        },
      });
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  return (
    <div className={cx('container', styles.container)}>
      <div className='row'>
        <div className={cx('card', styles.card)}>
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
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  id='email'
                  className={cx('inputfield form-control', styles.inputfield)}
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <div className='form-group'>
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input
                  type='password'
                  id='confirmPassword'
                  className={cx('form-control', styles.inputfield)}
                  placeholder='Re-enter your password'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={password}
                />
              </div>
              <div className={styles.submitButton}>
                <button
                  type='submit'
                  className='btn btn-primary btn-lg'
                  onClick={(e) => registerUser(e)}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
