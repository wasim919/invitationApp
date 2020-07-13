import React from 'react';

export default function Connections({ connections, follower }) {
  return (
    <ul className='list-group'>
      {connections.map((connection, index) => (
        <li className='list-group-item'>
          {connection.username}
          {/* <button
        className='btn btn-danger btn-lg'
        key={index}
        style={{ float: 'right' }}
        onClick={(e) => deletePost(index, userPost._id)}
      >
        x
      </button> */}
        </li>
      ))}
    </ul>
  );
}
