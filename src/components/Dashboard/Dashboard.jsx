import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../../components';
import { fetchLoggedUser, fetchPosts } from '../../api';
import { Posts, Connections, Users } from '../../components';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const [userData, setUserData] = useState({});
  const [element, setElement] = useState(<Posts />);
  const dispatch = useDispatch();
  useEffect(() => {
    (async function () {
      try {
        const {
          data: { _id, username, email, followers, following },
        } = await fetchLoggedUser();
        const userData = { _id, username, email, followers, following };
        setUserData(userData);
        dispatch({
          type: 'SET_USER_DETAILS',
          payload: {
            ...userData,
          },
        });
        const fetchedData = await fetchPosts(userData._id);
        dispatch({
          type: 'SET_USER_POSTS',
          payload: {
            posts: fetchedData.data,
          },
        });
      } catch (error) {
        alert(error.message);
        console.log(error.message);
      }
    })();
  }, [element]);
  const posts = useSelector((state) => state.taskReducer.userPosts);
  let followersLen = 0;
  let followingLen = 0;
  let postsLen = 0;
  if (posts === undefined) {
    postsLen = 0;
  } else {
    postsLen = posts.length;
  }
  if (userData.followers === undefined) {
    followersLen = 0;
  } else {
    followersLen = userData.following.length;
  }
  if (userData.following === undefined) {
    followingLen = 0;
  } else {
    followingLen = userData.following.length;
  }
  return (
    <div className='container'>
      <h2>Hi {userData.username}, Welcome to the dashboard</h2>
      <span>
        Posts: {postsLen} Followers: {followersLen} Following: {followingLen}
      </span>
      <Logout />
      <div className={styles.displayCenter}>
        <button
          onClick={(e) => setElement(<Posts />)}
          className='btn btn-lg btn-primary'
        >
          Posts
        </button>
        <button className='btn btn-lg btn-primary'>Feed</button>
        <button
          onClick={(e) => setElement(<Connections isFollower={true} />)}
          className='btn btn-lg btn-primary'
        >
          Followers
        </button>
        <button
          onClick={(e) => setElement(<Connections isFollower={false} />)}
          className='btn btn-lg btn-primary'
        >
          Following
        </button>
        <button className='btn btn-lg btn-primary'>Create Post</button>
        <button
          onClick={(e) => setElement(<Users />)}
          className='btn btn-lg btn-primary'
        >
          Users
        </button>
      </div>
      {element}
    </div>
  );
}
