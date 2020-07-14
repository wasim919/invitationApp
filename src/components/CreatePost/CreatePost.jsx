import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../../api';
import styles from './CreatePost.module.css';
import cx from 'classnames';

export default function CreatePost() {
  const dispatch = useDispatch();
  const [postText, setPostText] = useState('');
  const create_post = async () => {
    dispatch({
      type: 'ADD_POST',
      payload: {
        postText,
      },
    });
    try {
      await createPost(postText);
      return;
    } catch (error) {
      alert(error.message);
      return;
    }
  };
  return (
    <div className='form-group'>
      <label htmlFor='postText'>Please enter: </label>
      <textarea
        className={cx('form-control', styles.textArea)}
        id='postText'
        rows='5'
        onChange={(e) => setPostText(e.target.value)}
        value={postText}
      ></textarea>
      <button className='btn btn-primary btn-lg' onClick={(e) => create_post()}>
        Create
      </button>
    </div>
  );
}
