import React, { useEffect, useState } from 'react';
import {
  fetchUserFollowers,
  fetchUserFollowing,
  fetchUsers,
  fetchLoggedUser,
  follow_user,
} from '../../api';

export default function Users() {
  const [noConnectionUsers, setNoConnectionUsers] = useState([]);
  useEffect(() => {
    (async function () {
      try {
        const response = await fetchLoggedUser();

        const loggedUserId = response.data._id;

        const {
          data: { followers },
        } = await fetchUserFollowers();

        const {
          data: { following },
        } = await fetchUserFollowing();

        const { data } = await fetchUsers();

        const users = data;
        let newConnections = [];
        let flag = 0;
        if (following !== undefined) {
          for (let i = 0; i < users.length; ++i) {
            flag = 0;
            for (let j = 0; j < following.length; ++j) {
              if (users[i]._id === following[j].id) {
                flag = 1;
                break;
              }
            }
            if (flag === 0 && users[i]._id !== loggedUserId) {
              newConnections.push(users[i]);
            }
          }
        }
        if (followers !== undefined) {
          for (let i = 0; i < users.length; ++i) {
            flag = 0;
            for (let j = 0; j < followers.length; ++j) {
              if (users[i]._id === followers[j].id) {
                flag = 1;
                break;
              }
            }
            if (flag === 0 && users[i]._id !== loggedUserId) {
              newConnections.push(users[i]);
            }
          }
        }
        setNoConnectionUsers(newConnections);
        return;
      } catch (error) {
        alert(error.message);
        console.log(error.message);
        return;
      }
    })();
  }, []);
  const followUser = async (id) => {
    try {
      await follow_user(id);
      return;
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };
  return (
    <ul className='list-group'>
      {noConnectionUsers.map((user, index) => (
        <li className='list-group-item' key={index + 1}>
          <span>{user.username}</span>

          <button
            className='btn btn-danger btn-lg'
            key={index}
            style={{ float: 'right' }}
            onClick={(e) => followUser(user._id)}
          >
            Follow
          </button>
        </li>
      ))}
    </ul>
  );
}
