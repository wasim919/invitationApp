import React from 'react';
import styles from './App.module.css';
import { StartScreen } from './components';

function App() {
  return (
    <div className={styles.body}>
      <div className='container'>
        <StartScreen />
      </div>
    </div>
  );
}

export default App;
