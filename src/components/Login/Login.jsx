import React, { useState } from "react";
import styles from "./Login.module.css";
import { Invites, AddInvite, SendInvitation } from "../";
import { useSelector, useDispatch } from "react-redux";
import { loginAPI } from "../../api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const { accessToken, refreshToken } = await loginAPI({
        username,
        password,
      });
      dispatch({
        type: "LOGIN",
        payload: {
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      });
      localStorage.setItem("tokens", { refreshToken, accessToken });
    } catch (error) {
      console.log(error.message);
    }
  };
  const tokens = useSelector((state) => state.taskReducer.tokens);
  // const tokens = localStorage.getItem('tokens');
  return !tokens.accessToken ? (
    <div className={styles.row}>
      <h3>{tokens.accessToken}</h3>
      <form>
        <div className='form-group'>
          <label htmlFor='Username'>Username</label>
          <input
            type='text'
            className='form-control'
            placeholder='Enter username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='Password'>Password</label>
          <input
            type='password'
            className='form-control'
            placeholder='Enter your password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button
          type='submit'
          className='btn btn-primary btn-lg'
          onClick={(e) => submitForm(e)}
        >
          Submit
        </button>
      </form>
    </div>
  ) : (
    <div className='container'>
      <AddInvite />
      <Invites />
      <SendInvitation />
    </div>
  );
}
