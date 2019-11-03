import React from 'react';
import styles from './app.module.css';
import { FlagglyAdmin } from './flaggly/react';
import { Demo } from './demo/demo';

function App() {
  return (
    <div className={styles.view}>
      <FlagglyAdmin />
      <Demo />
    </div>
  );
}

export default App;
