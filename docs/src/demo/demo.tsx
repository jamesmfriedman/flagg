import React, { useState } from 'react';
import 'material-components-web/dist/material-components-web.min.css';
import styles from './demo.module.css';
import classNames from 'classnames';

import {
  SimpleTopAppBar,
  Tab,
  TabBar,
  Drawer,
  DrawerHeader,
  DrawerTitle,
  DrawerSubtitle,
  DrawerContent,
  List,
  ListItem
} from 'rmwc';
import { Home } from './home';
import { HomeNew } from './home-new';
import { useFeatureFlag, useFeatureValue } from '../feature-flags';
import { FlagglyAdmin } from 'flaggly/react';

export function Demo() {
  const [route, setRoute] = useState('home');
  const [navOpen, setNavOpen] = useState(false);

  const [isDarkMode] = useFeatureFlag('app.darkMode');
  const [title] = useFeatureValue<string>('app.title');
  const [brandColor] = useFeatureValue<string>('app.brandColor');
  const [isBottomNav] = useFeatureFlag('app.bottomNav');
  const [homeV2] = useFeatureFlag('home.v2');
  const [enableFlaggly] = useFeatureFlag('developer.enableFlaggly');

  let content = null;
  switch (route) {
    case 'home':
      content = !!homeV2 ? <HomeNew /> : <Home />;
      break;
    case 'featureflags':
      content = enableFlaggly ? <FlagglyAdmin /> : null;
      break;
    default:
      break;
  }

  return (
    <div
      className={styles.view}
      style={
        {
          '--mdc-theme-primary': brandColor
        } as React.CSSProperties
      }
    >
      <div className={styles.callout}>
        <h1>Flaggly Demo</h1>
        This demo is to showcase how a real app might react to Feature Flags
        specified using Flaggly. The admin interface (pictured left) is an
        optional React component that you can mount at a secret route of your
        app that provides visibility and control of your Feature Flags when
        developing.
      </div>
      <div className={styles.appWrapper}>
        <div
          className={classNames(styles.app, {
            [styles.darkMode]: isDarkMode
          })}
        >
          {isBottomNav ? (
            <>
              <div className={styles.bottomNavHeader}>{title}</div>
              <div className={styles.bottomNav}>
                <TabBar>
                  <Tab stacked icon="chrome_reader_mode" label="Feed" />
                  <Tab stacked icon="person" label="Profile" />
                  <Tab
                    stacked
                    icon="more_horiz"
                    label="More"
                    onClick={() => setNavOpen(true)}
                  />
                </TabBar>
              </div>
            </>
          ) : (
            <SimpleTopAppBar
              navigationIcon={{
                onClick: () => setNavOpen(true)
              }}
              title={title}
              className={styles.appBar}
            />
          )}
          <AppDrawer
            open={navOpen}
            setOpen={setNavOpen}
            setRoute={route => {
              setRoute(route);
              setNavOpen(false);
            }}
          />
          <div className={styles.content}>{content}</div>
        </div>
      </div>
    </div>
  );
}

function AppDrawer({
  open,
  setOpen,
  setRoute
}: {
  open: boolean;
  setOpen: (bool: boolean) => void;
  setRoute: (route: string) => void;
}) {
  const [enableFlaggly] = useFeatureFlag('developer.enableFlaggly');
  const [title] = useFeatureValue('app.title');

  return (
    <Drawer modal open={open} onClose={() => setOpen(false)}>
      <DrawerHeader>
        <DrawerTitle>{title}</DrawerTitle>
      </DrawerHeader>
      <DrawerContent>
        <List>
          <ListItem onClick={() => setRoute('home')}>Feed</ListItem>
          <ListItem onClick={() => setRoute('home')}>Profile</ListItem>
          {enableFlaggly && (
            <ListItem onClick={() => setRoute('featureflags')}>
              Feature Flags
            </ListItem>
          )}
          <ListItem onClick={() => setRoute('home')}>Logout</ListItem>
        </List>
      </DrawerContent>
    </Drawer>
  );
}
