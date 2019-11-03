import React from 'react';
import 'material-components-web/dist/material-components-web.min.css';
import styles from './demo.module.css';
import classNames from 'classnames';

import { SimpleTopAppBar, Tab, TabBar } from 'rmwc';
import { Home } from './home';
import { HomeNew } from './home-new';
import { useFeatureFlag, useFeatureValue } from '../feature-flags';

export function Demo() {
  const [isDarkMode] = useFeatureFlag('app.darkMode');
  const [title] = useFeatureValue<string>('app.title');
  const [brandColor] = useFeatureValue<string>('app.brandColor');
  const [isBottomNav] = useFeatureFlag('app.bottomNav');
  const [homeV2] = useFeatureFlag('home.v2');

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
                  <Tab stacked icon="home" label="Home" />
                  <Tab stacked icon="chrome_reader_mode" label="Feed" />
                </TabBar>
              </div>
            </>
          ) : (
            <SimpleTopAppBar
              navigationIcon
              onNav={() => {}}
              title={title}
              className={styles.appBar}
            />
          )}
          <div className={styles.content}>
            {!!homeV2 ? <HomeNew /> : <Home />}
          </div>
        </div>
      </div>
    </div>
  );
}
