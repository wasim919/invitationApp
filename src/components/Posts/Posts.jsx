import React from 'react';
import { Post } from '../../components';
import { useSelector } from 'react-redux';

export default function Posts() {
  const userPosts = useSelector((state) => state.taskReducer.userPosts);
  return userPosts.length > 0 ? (
    <div className='invitesDisplay'>
      <ul className='list-group'>
        {userPosts.map((userPost, index) => (
          <Post index={index} userPost={userPost} key={index} />
        ))}
      </ul>
    </div>
  ) : (
    <div className='container'>You don't have any posts yet</div>
  );
}
