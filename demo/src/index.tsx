import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import * as serviceWorker from './serviceWorker';
import { definitions } from './feature-flags';

import { flagg, sessionStore } from './flagg';
import { FlaggProvider } from './flagg/react';

const featureFlags = flagg<keyof typeof definitions>({
  store: sessionStore(),
  definitions
});

featureFlags.freeze('developer_enableFlagg');

ReactDOM.render(
  <FlaggProvider featureFlags={featureFlags}>
    <App />
  </FlaggProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
