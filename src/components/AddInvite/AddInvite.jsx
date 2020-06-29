import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './AddInvite.module.css';
import cx from 'classnames';

export default function () {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  const checkEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  };
  const checkMobileNumber = (mobile) => {
    let phoneno = /^\d{10}$/;
    if (mobile.match(phoneno)) {
      return true;
    } else {
      return false;
    }
  };
  const addMore = (e) => {
    e.preventDefault();
    if (email.length === 0 || mobile.length === 0) {
      return alert('Please enter email and mobile number');
    }
    let message = '';
    let flag = 0;
    if (!checkEmail(email)) {
      message += 'You have entered an invalid Email id';
      flag = 1;
    }
    if (!checkMobileNumber(mobile)) {
      if (message.length === 0) {
        message += 'You have entered an invalid mobile number!';
      } else {
        message += ' and mobile number!';
      }
      flag = 1;
    }
    if (flag) {
      return alert(message);
    }
    dispatch({
      type: 'ADD_INVITE',
      payload: {
        email,
        mobile,
      },
    });
    setEmail('');
    setMobile('');
    return true;
  };

  return (
    <div className='container'>
      <form>
        <div className='form-group'>
          <label htmlFor='Email'>Email</label>
          <input
            type='email'
            className={cx('form-control', styles.inputfield)}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='Mobile'>Mobile</label>
          <input
            type='text'
            className={cx('form-control', styles.inputfield)}
            onChange={(e) => setMobile(e.target.value)}
            value={mobile}
          />
        </div>
        <button
          className={cx('btn btn-primary', styles.addMoreButton)}
          onClick={(e) => addMore(e)}
        >
          Add More
        </button>
      </form>
    </div>
  );
}
