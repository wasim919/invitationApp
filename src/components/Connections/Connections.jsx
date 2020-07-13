import React from 'react';
import { useSelector } from 'react-redux';

export default function Connections({ isFollower }) {
  const userData = useSelector((state) => state.taskReducer.user);

  if (userData === undefined) {
    return <h3>No follower</h3>;
  }
  if (isFollower && userData.followers.length === 0) {
    return <li className='list-group-item'>No follower yet.</li>;
  }
  if (!isFollower && userData.following.length === 0) {
    return <li className='list-group-item'>No following yet.</li>;
  }
  return isFollower ? (
    <ul className='list-group'>
      {userData.followers.map((follower, index) => (
        <li className='list-group-item'>
          <span>{follower.username}</span>
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
  ) : (
    <ul className='list-group'>
      {userData.following.map((following, index) => (
        <li className='list-group-item'>
          {following.username}
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
