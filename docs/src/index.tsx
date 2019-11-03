import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import * as serviceWorker from './serviceWorker';
import { definitions } from './feature-flags';

import { flaggly, sessionStore } from './flaggly';
import { FlagglyProvider } from './flaggly/react';

const featureFlags = flaggly<keyof typeof definitions>({
  storage: sessionStore(),
  definitions
});

ReactDOM.render(
  <FlagglyProvider featureFlags={featureFlags}>
    <App />
  </FlagglyProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
