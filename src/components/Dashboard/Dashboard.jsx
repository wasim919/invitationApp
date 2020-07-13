import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../../components';
import { fetchLoggedUser, fetchPosts } from '../../api';
import { Posts } from '../../components';

export default function Dashboard() {
  const [userData, setUserData] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    (async function () {
      try {
        const {
          data: { _id, username, email, followers, following },
        } = await fetchLoggedUser();
        const data = { _id, username, email, followers, following };
        dispatch({
          type: 'SET_USER_DETAILS',
          payload: {
            ...data,
          },
        });
        const fetchedData = await fetchPosts(data._id);
        dispatch({
          type: 'SET_USER_POSTS',
          payload: {
            posts: fetchedData.data,
          },
        });
        setUserData(data);
      } catch (error) {
        alert(error.message);
        console.log(error.message);
      }
    })();
  }, []);
  return (
    <div className='container'>
      <h2>Hi {userData.username}, Welcome to the dashboard</h2>
      <Logout />
      <ul className='nav nav-tabs' id='myTab' role>
        <li className='nav-item'>
          <a
            href='#posts'
            className='nav-link active'
            id='posts-tab'
            data-toggle='tab'
            role='tab'
            aria-controls='posts'
            aria-selected='true'
          >
            Posts
          </a>
        </li>
        <li className='nav-item'>
          <a
            href='#followers'
            className='nav-link'
            id='followers-tab'
            data-toggle='tab'
            href='#followers'
            role='tab'
            aria-controls='followers'
            aria-selected='false'
          >
            Followers
          </a>
        </li>
        <li className='nav-item'>
          <a
            href='#following'
            className='nav-link'
            id='following-tab'
            data-toggle='tab'
            href='#following'
            role='tab'
            aria-controls='following'
            aria-selected='false'
          >
            Following
          </a>
        </li>
      </ul>
      <div class='tab-content' id='myTabContent'>
        <div
          class='tab-pane fade show active'
          id='posts'
          role='tabpanel'
          aria-labelledby='posts-tab'
        >
          <Posts />
        </div>
        <div
          class='tab-pane fade'
          id='followers'
          role='tabpanel'
          aria-labelledby='followers-tab'
        >
          ...
        </div>
        <div
          class='tab-pane fade'
          id='following'
          role='tabpanel'
          aria-labelledby='following-tab'
        >
          ...
        </div>
      </div>
    </div>
  );
}
