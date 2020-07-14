import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../api';

export default function Users() {
  const dispatch = useDispatch();
  useEffect(() => {
    (async function () {
      try {
        const { data } = await fetchUsers();
        dispatch({
          type: 'SET_USERS',
          payload: {
            users: data,
          },
        });
      } catch (error) {
        alert(error.message);
        console.log(error.message);
      }
    })();
  }, []);
  const users = useSelector((state) => state.taskReducer.users);
  return (
    <ul className='list-group'>
      {users.map((user, index) => (
        <li className='list-group-item'>
          <span>{user.username}</span>
          isFollowing(user) ? (
          <button
            className='btn btn-danger btn-lg'
            key={index}
            style={{ float: 'right' }}
            //   onClick={(e) => unFollowUser(index, follower.id)}
          >
            Remove Follower
          </button>
          ) : (
          <button
            className='btn btn-danger btn-lg'
            key={index}
            style={{ float: 'right' }}
            //   onClick={(e) => unFollowUser(index, follower.id)}
          >
            Remove Follower
          </button>
          )
        </li>
      ))}
    </ul>
  );
}
