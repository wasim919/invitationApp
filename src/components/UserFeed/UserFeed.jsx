import React, { useEffect, useState } from 'react';
import { fetchAllPosts } from '../../api';
import { useSelector } from 'react-redux';

export default function UserFeed() {
  const [userFollowingPosts, setUserFollowingPosts] = useState([]);
  const userData = useSelector((state) => state.taskReducer.user);
  let following = [];
  if (
    userData.following !== undefined ||
    (userData.following !== undefined && userData.following.length === 0)
  ) {
    following = userData.following;
  }
  useEffect(() => {
    (async function () {
      try {
        const followingPosts = [];
        const allPosts = await fetchAllPosts();
        if (allPosts !== undefined && allPosts.data !== undefined) {
          for (let i = 0; i < following.length; ++i) {
            for (let j = 0; j < allPosts.data.length; ++j) {
              if (allPosts.data[j].user === following[i].id) {
                followingPosts.push({
                  post: allPosts.data[j],
                  username: following[i].username,
                });
              }
            }
          }
          setUserFollowingPosts([...userFollowingPosts, ...followingPosts]);
        }
      } catch (error) {
        alert(error.message);
        console.log(error.message);
        return;
      }
    })();
  }, []);
  console.log(userFollowingPosts);
  if (userFollowingPosts === undefined) {
    return <h3>Loading...</h3>;
  }
  return (
    <ul className='list-group'>
      {userFollowingPosts.map((post, index) => (
        <li className='list-group-item' key={index + 1}>
          <span>{post.username}</span>
          <span style={{ float: 'right' }}>{post.post.text}</span>
        </li>
      ))}
    </ul>
  );
}
