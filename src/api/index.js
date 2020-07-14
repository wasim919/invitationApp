import axios from 'axios';

const url = 'http://127.0.0.1:5000/api/v1';
export const registerAPI = async (user) => {
  let modifiedUrl = url;
  modifiedUrl = `${url}/auth/register/`;
  try {
    const response = await axios.post(modifiedUrl, {
      username: user.username,
      email: user.email,
      password: user.password,
    });
    return {
      token: response.data.token,
    };
  } catch (err) {
    throw new Error('Invalid Credentials');
  }
};

export const loginAPI = async (user) => {
  let modifiedUrl = url;

  modifiedUrl = `${url}/auth/login/`;
  try {
    const response = await axios.post(modifiedUrl, {
      username: user.username,
      email: user.email,
      password: user.password,
    });
    return {
      token: response.data.token,
    };
  } catch (err) {
    throw new Error('Invalid Credentials');
  }
};

export const fetchLoggedUser = async () => {
  let modifiedUrl = url;
  let token = JSON.parse(localStorage.getItem('token'));
  let headerToken = `Bearer ${token}`;
  modifiedUrl = `${url}/auth/me`;
  try {
    const response = await axios.get(modifiedUrl, {
      headers: {
        Authorization: headerToken,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error('Not Authorized');
  }
};

export const fetchPosts = async (id) => {
  let modifiedUrl = url;
  let token = JSON.parse(localStorage.getItem('token'));
  let headerToken = `Bearer ${token}`;
  modifiedUrl = `${url}/users/posts/${id}`;
  console.log(modifiedUrl);
  try {
    const response = await axios.get(modifiedUrl, {
      headers: {
        Authorization: headerToken,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error('Not Authorized');
  }
};

export const fetchAllPosts = async () => {
  let modifiedUrl = url;
  let token = JSON.parse(localStorage.getItem('token'));
  let headerToken = `Bearer ${token}`;
  modifiedUrl = `${url}/posts`;
  try {
    const response = await axios.get(modifiedUrl, {
      headers: {
        Authorization: headerToken,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error('Not Authorized');
  }
};

export const removePost = async (id) => {
  let modifiedUrl = url;
  let token = JSON.parse(localStorage.getItem('token'));
  let headerToken = `Bearer ${token}`;
  modifiedUrl = `${url}/posts/${id}`;
  try {
    const response = await axios.delete(modifiedUrl, {
      headers: {
        Authorization: headerToken,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error('Not Authorized');
  }
};

export const fetchUsers = async () => {
  let modifiedUrl = url;
  let token = JSON.parse(localStorage.getItem('token'));
  let headerToken = `Bearer ${token}`;
  modifiedUrl = `${url}/users`;
  try {
    const response = await axios.get(modifiedUrl, {
      headers: {
        Authorization: headerToken,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error('Not Authorized');
  }
};

export const fetchUserFollowers = async (id) => {
  let modifiedUrl = url;
  let token = JSON.parse(localStorage.getItem('token'));
  let headerToken = `Bearer ${token}`;
  modifiedUrl = `${url}/auth/getFollowers`;
  try {
    const response = await axios.get(modifiedUrl, {
      headers: {
        Authorization: headerToken,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error('Not Authorized');
  }
};

export const fetchUserFollowing = async (id) => {
  let modifiedUrl = url;
  let token = JSON.parse(localStorage.getItem('token'));
  let headerToken = `Bearer ${token}`;
  modifiedUrl = `${url}/auth/getFollowing`;
  try {
    const response = await axios.get(modifiedUrl, {
      headers: {
        Authorization: headerToken,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error('Not Authorized');
  }
};

export const remove_follower = async (id) => {
  let modifiedUrl = url;
  let token = JSON.parse(localStorage.getItem('token'));
  let headerToken = `Bearer ${token}`;
  modifiedUrl = `${url}/users/removefollower/${id}`;
  try {
    await axios.get(modifiedUrl, {
      headers: {
        Authorization: headerToken,
      },
    });
    return true;
  } catch (err) {
    throw new Error('Not Authorized');
  }
};

export const follow_user = async (id) => {
  let modifiedUrl = url;
  let token = JSON.parse(localStorage.getItem('token'));
  let headerToken = `Bearer ${token}`;
  modifiedUrl = `${url}/users/followUser/${id}`;
  try {
    await axios.get(modifiedUrl, {
      headers: {
        Authorization: headerToken,
      },
    });
    return true;
  } catch (err) {
    throw new Error('Not Authorized');
  }
};

export const createPost = async (body) => {
  let modifiedUrl = url;
  let token = JSON.parse(localStorage.getItem('token'));
  let headerToken = `Bearer ${token}`;
  modifiedUrl = `${url}/posts`;
  try {
    await axios.post(
      modifiedUrl,
      { text: body },
      {
        headers: {
          Authorization: headerToken,
        },
      }
    );
    return true;
  } catch (error) {
    throw new Error('Not Authorized');
  }
};

export const remove_following = async (id) => {
  let modifiedUrl = url;
  let token = JSON.parse(localStorage.getItem('token'));
  let headerToken = `Bearer ${token}`;
  modifiedUrl = `${url}/users/removeFollowing/${id}`;
  try {
    await axios.get(modifiedUrl, {
      headers: {
        Authorization: headerToken,
      },
    });
    return true;
  } catch (err) {
    throw new Error('Not Authorized');
  }
};
