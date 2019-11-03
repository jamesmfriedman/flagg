import React from 'react';
import styles from './app.module.css';
import { FlaggAdmin } from './flagg/react';
import { Demo } from './demo/demo';

function App() {
  return (
    <div className={styles.view}>
      <FlaggAdmin />
      <Demo />
    </div>
  );
}

export default App;
