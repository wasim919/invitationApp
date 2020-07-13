import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Login.module.css';
import { useDispatch } from 'react-redux';
import { loginAPI } from '../../api';
import cx from 'classnames';

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    let isLogged = localStorage.getItem('isLogged');
    let token = localStorage.getItem('token');
    if (isLogged && token) {
      dispatch({
        type: 'LOGIN',
        payload: {
          isLogged,
          token,
        },
      });
    }
  }, []);

  const checkPresentNameAndPassword = () => {
    if (!email || !password) {
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
      const { token } = await loginAPI({
        email,
        password,
      });

      isLogged = true;

      dispatch({
        type: 'LOGIN',
        payload: {
          isLogged,
          token,
        },
      });

      history.push('/dashboard');
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  // const isLogged = useSelector((state) => state.taskReducer.isLogged);
  const isLogged = JSON.parse(localStorage.getItem('isLogged'));

  return (
    <>
      <div className={cx('container', styles.container)}>
        <div className='row'>
          <div className={cx('card', styles.card)}>
            <div className={cx('card-body', styles.cardBody)}>
              <form>
                <div className='form-group'>
                  <label htmlFor='email'>Email</label>
                  <input
                    type='text'
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
    </>
  );
}
