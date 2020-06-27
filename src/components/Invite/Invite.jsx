import React from "react";
import styles from "./Invite.module.css";
import { useDispatch } from "react-redux";

export default function (props) {
  const dispatch = useDispatch();
  const deleteInvite = (e) => {
    dispatch({
      type: "REMOVE_INVITE",
      payload: e.target.key,
    });
  };
  return (
    <div className='container'>
      <div className={styles.inviteContainer}>
        <li className='list-group-item' key={props.index}>
          Email: {props.email}
        </li>
        <li className='list-group-item' key={props.index}>
          Mobile: {props.mobile}
        </li>
        <button
          className='btn btn-danger btn-lg'
          onClick={(e) => deleteInvite(e)}
        >
          x
        </button>
      </div>
    </div>
  );
}
