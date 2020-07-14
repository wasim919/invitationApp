import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { remove_follower, remove_following } from '../../api';

export default function Connections({ isFollower }) {
  const [updated, setUpdated] = useState(0);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.taskReducer.user);
  useEffect(() => {}, [userData]);
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
    dispatch({
      type: 'REMOVE_FOLLOWER',
      payload: {
        index,
      },
    });
    try {
      await remove_follower(id);
      setUpdated(updated + 1);
      return;
    } catch (error) {
      alert(error.message);
      console.log(error.message);
      return;
    }
  };
  const removeFollowing = async (index, id) => {
    dispatch({
      type: 'REMOVE_FOLLOWING',
      payload: {
        index,
      },
    });
    try {
      await remove_following(id);
      setUpdated(updated + 1);
      return;
    } catch (error) {
      alert(error.message);
      console.log(error.message);
      return;
    }
  };

  return isFollower ? (
    <ul className='list-group'>
      {userData.followers.map((follower, index) => (
        <li className='list-group-item' key={index + 1}>
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
        <li className='list-group-item' key={index + 1}>
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
