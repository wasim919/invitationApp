import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { remove_follower, remove_following } from '../../api';

export default function Connections({ isFollower }) {
  const userData = useSelector((state) => state.taskReducer.user);
  const dispatch = useDispatch();
  if (userData === undefined) {
    return <h3>No follower</h3>;
  }
  if (isFollower) {
    if (userData.followers === undefined || userData.followers.length === 0) {
      return <li className='list-group-item'>No follower yet.</li>;
    }
  }
  if (!isFollower) {
    if (
      userData.following === undefined ||
      (userData.following !== undefined && userData.following.length === 0)
    ) {
      return <li className='list-group-item'>No following yet.</li>;
    }
  }
  const removeFollower = async (index, id) => {
    console.log(index);
    dispatch({
      type: 'REMOVE_FOLLOWER',
      payload: {
        index,
      },
    });
    try {
      await remove_follower(id);
      alert('User removed as follower');
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };
  const removeFollowing = async (index, id) => {
    console.log(index);
    dispatch({
      type: 'REMOVE_FOLLOWING',
      payload: {
        index,
      },
    });
    try {
      await remove_following(id);
      alert('user un followed');
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };
  return isFollower ? (
    <ul className='list-group'>
      {userData.followers.map((follower, index) => (
        <li className='list-group-item'>
          <span>{follower.username}</span>
          <button
            className='btn btn-danger btn-lg'
            key={index}
            style={{ float: 'right' }}
            onClick={(e) => removeFollower(index, follower.id)}
          >
            Remove Follower
          </button>
        </li>
      ))}
    </ul>
  ) : (
    <ul className='list-group'>
      {userData.following.map((following, index) => (
        <li className='list-group-item'>
          {following.username}
          <button
            className='btn btn-danger btn-lg'
            key={index}
            style={{ float: 'right' }}
            onClick={(e) => removeFollowing(index, following.id)}
          >
            Remove Following
          </button>
        </li>
      ))}
    </ul>
  );
}
