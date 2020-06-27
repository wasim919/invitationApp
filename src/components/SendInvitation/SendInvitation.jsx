import React from "react";
import styles from "./SendInvitation.module.css";
import { sendInvitationAPI } from "../../api";
import { useSelector } from "react-redux";

export default function () {
  const invites = useSelector((state) => state.taskReducer.invites);
  const tokens = useSelector((state) => state.taskReducer.tokens);

  const sendInvitationToAll = async (e) => {
    try {
      const response = await sendInvitationAPI(invites, tokens.accessToken);
      if (response.status === 200) {
        return alert("Invitation Sent");
      }
      alert(response.statusText);
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
    return true;
  };
  if (invites.length === 0) return <div></div>;
  return (
    <section className={styles.container}>
      <button
        className='btn btn-lg btn-primary'
        onClick={(e) => sendInvitationToAll(e)}
      >
        Send Invitation
      </button>
    </section>
  );
}
