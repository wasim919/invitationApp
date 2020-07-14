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

export const fetchUsers = async (id) => {
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

export const remove_follower = async (id) => {};

export const remove_following = async (id) => {};
