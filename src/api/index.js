import axios from "axios";

const url = "http://13.235.134.196:8006";

export const loginAPI = async (user) => {
  let modifiedUrl = url;
  if (!user.username || !user.password) {
    return alert("Please enter both email and password");
  }
  modifiedUrl = `${url}/login/`;
  try {
    const response = await axios.post(modifiedUrl, {
      username: user.username,
      password: user.password,
    });
    return {
      accessToken: response.data.access,
      refreshToken: response.data.refresh,
    };
  } catch (err) {
    throw new Error("Invalid Credentials");
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
    throw new Error("Not Authorized");
  }
};
