import React from 'react';

export default function Post({ userPost, index, deletePost }) {
  return (
    <>
      <li className='list-group-item'>
        {userPost.text}
        <button
          className='btn btn-danger btn-lg'
          key={index}
          style={{ float: 'right' }}
          onClick={(e) => deletePost(e)}
        >
          x
        </button>
      </li>
    </>
  );
}
