import axios from 'axios';

// const url = "http://13.235.134.196:8006";
const url = 'http://127.0.0.1:5000/api/v1/auth';

export const loginAPI = async (user) => {
  let modifiedUrl = url;

  modifiedUrl = `${url}/login/`;
  try {
    const response = await axios.post(modifiedUrl, {
      username: user.username,
      password: user.password,
    });
    // return {
    //   accessToken: response.data.access,
    //   refreshToken: response.data.refresh,
    // };
    console.log(response);
    return response;
  } catch (err) {
    throw new Error('Invalid Credentials');
  }
};

export const sendInvitationAPI = async (invites, token) => {
  let modifiedUrl = url;
  console.log(token.length);
  let headerToken = `Bearer ${token}`;
  modifiedUrl = `${url}/accounts/send_invitation/`;
  try {
    const response = await axios.post(modifiedUrl, invites, {
      headers: {
        Authorization: headerToken,
      },
    });
    console.log(response);
    return response;
  } catch (err) {
    throw new Error('Not Authorized');
  }
};
