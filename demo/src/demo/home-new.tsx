import React from 'react';
import { useFeatureFlag } from 'flagg/react';
import styles from './home.module.css';
import { Button } from 'rmwc';

export function HomeNew() {
  const [homeV2, setHomeV2] = useFeatureFlag('home.v2');
  return (
    <div>
      <div className={styles.banner} onClick={() => setHomeV2(false)}>
        Use the old home instead... <Button>Go Back</Button>
      </div>
      New Home
    </div>
  );
}
