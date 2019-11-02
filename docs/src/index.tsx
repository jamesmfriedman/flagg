import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { flaggly, sessionStore } from './flaggly';
import { FlagglyProvider } from './flaggly/react';

const featureFlags = flaggly({
  storage: sessionStore(),
  definitions: {
    'home.dessertChoice': {
      description: 'Pick a dessert choice.',
      options: ['Cookies', 'Pizza', 'Icecream']
    },
    'home.anotherFlag': {
      description: 'Another Flag.'
    },
    'home.string': {
      default: 'My String',
      description: 'Another Flag.'
    },
    'home.string1': {
      default: 'My String',
      description: 'Another Flag.'
    },
    'home.string2': {
      default: 'My String',
      description: 'Another Flag.'
    },
    'home.string3': {
      default: 'My String',
      description: 'Another Flag.'
    },
    'home.string4': {
      default: 'My String',
      description: 'Another Flag.'
    },
    'home.string5': {
      default: 'My String',
      description: 'Another Flag.'
    },
    'home.string6': {
      default: 'My String',
      description: 'Another Flag.'
    },
    'home.string7': {
      default: 'My String',
      description: 'Another Flag.'
    },
    'home.string8': {
      default: 'My String',
      description: 'Another Flag.'
    },
    'home.string9': {
      default: 'My String',
      description: 'Another Flag.'
    },
    'home.string10': {
      default: 'My String',
      description: 'Another Flag.'
    },
    'home.string11': {
      default: 'My String',
      description: 'Another Flag.'
    },
    'home.allowUserInput': {},
    helloWorld: {
      default: true
    },
    anotherParam: {
      default: 'param'
    }
  }
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
