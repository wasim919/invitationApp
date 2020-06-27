import React from "react";
import styles from "./App.module.css";
import { Login } from "./components";

function App() {
  return (
    <div className={styles.body}>
      <div className='container'>
        <Login />
      </div>
    </div>
  );
}

export default App;
