import React from 'react';
import {
  Button,
  Card,
  CardPrimaryAction,
  CardMedia,
  Typography,
  CardActions,
  CardActionButtons,
  CardActionButton,
  CardActionIcons,
  CardActionIcon
} from 'rmwc';

import styles from './home.module.css';
import { useFeatureFlag } from '../feature-flags';

export function Home() {
  const cards = [...Array(5)];
  const [enableOptIn] = useFeatureFlag('home_enableV2OptIn');
  const [, setHomeV2] = useFeatureFlag('home_v2');

  return (
    <div>
      {enableOptIn && (
        <div className={styles.banner} onClick={() => setHomeV2(true)}>
          🎈 Try the new home experience! <Button>Try It</Button>
        </div>
      )}

      {cards.map((val, index) => (
        <HomeCard key={index} index={index + 1} />
      ))}
    </div>
  );
}

function HomeCard({ index }: { index: number }) {
  return (
    <Card className={styles.homeCard}>
      <CardPrimaryAction>
        <CardMedia
          sixteenByNine
          style={{
            backgroundImage: `url(images/backgrounds/mb-bg-fb-2${index}.png)`
          }}
        />
        <div style={{ padding: '0 1rem 1rem 1rem' }}>
          <Typography use="headline6" tag="h2">
            Our Changing Planet
          </Typography>
          <Typography
            use="subtitle2"
            tag="h3"
            theme="textSecondaryOnBackground"
            style={{ marginTop: '-1rem' }}
          >
            by Kurt Wagner
          </Typography>
          <Typography use="body1" tag="div" theme="textSecondaryOnBackground">
            Visit ten places on our planet that are undergoing the biggest
            changes today.
          </Typography>
        </div>
      </CardPrimaryAction>
      <CardActions>
        <CardActionButtons>
          <CardActionButton>Comment</CardActionButton>
        </CardActionButtons>
        <CardActionIcons>
          <CardActionIcon onIcon="favorite" icon="favorite_border" />
          <CardActionIcon icon="share" />
          <CardActionIcon icon="more_vert" />
        </CardActionIcons>
      </CardActions>
    </Card>
  );
}
