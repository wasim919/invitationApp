import React from 'react';
import { useSelector } from 'react-redux';

export default function Connections({ isFollower }) {
  const userData = useSelector((state) => state.taskReducer.user);
  console.log(userData);
  if (userData === undefined) {
    return <h3>No follower</h3>;
  }
  return isFollower ? (
    <ul className='list-group'>
      {userData.followers.map((follower, index) => (
        <li className='list-group-item'>
          {follower}
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
          {following}
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
