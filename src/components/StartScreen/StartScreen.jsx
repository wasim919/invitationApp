import React, { useState } from 'react';
import { Login, Register } from '../../components';
import styles from './StartScreen.module.css';

export default function StartScreen() {
  const [showLogin, setShowLogin] = useState('true');
  return (
    <>
      <div className={styles.displayCenter}>
        <button
          onClick={(e) => setShowLogin(true)}
          className='btn btn-lg btn-primary'
        >
          Login
        </button>
        <button
          onClick={(e) => setShowLogin(false)}
          className='btn btn-lg btn-primary'
        >
          Register
        </button>
      </div>
      {showLogin ? <Login /> : <Register />}
    </>
  );
}
