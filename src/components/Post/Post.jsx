import React from 'react';
import { useDispatch } from 'react-redux';
import { removePost } from '../../api';

export default function Post({ userPost, index }) {
  const dispatch = useDispatch();
  const deletePost = async (index, id) => {
    try {
      await removePost(id);
      dispatch({
        type: 'DELETE_POST',
        payload: {
          index,
        },
      });
      // console.log(response);
      // alert('Post has been deleted');
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
    console.log(index, id);
  };
  return (
    <>
      <li className='list-group-item'>
        {userPost.text}
        <button
          className='btn btn-danger btn-lg'
          key={index}
          style={{ float: 'right' }}
          onClick={(e) => deletePost(index, userPost._id)}
        >
          x
        </button>
      </li>
    </>
  );
}
