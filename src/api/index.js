import axios from 'axios';

// const url = 'http://test.kruntummy.com/apii';
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
      token: response.token,
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
      token: response.token,
    };
  } catch (err) {
    throw new Error('Invalid Credentials');
  }
};

export const sendInvitationAPI = async (invites, token) => {
  //   let modifiedUrl = url;
  //   console.log(token.length);
  //   let headerToken = `Bearer ${token}`;
  //   modifiedUrl = `${url}/accounts/send_invitation/`;
  //   try {
  //     const response = await axios.post(modifiedUrl, invites, {
  //       headers: {
  //         Authorization: headerToken,
  //       },
  //     });
  //     console.log(response);
  //     return response;
  //   } catch (err) {
  //     throw new Error('Not Authorized');
  //   }
};
