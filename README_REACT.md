# React

Flagg provides some basic utilities and hooks for React.

# Provider

Before you can use hooks or the admin, you need to create your feature flags and pass them to the FlaggProvider.

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { flagg, sessionStore } from 'flagg';
import { FlaggProvider } from 'flagg/react';

const featureFlags = flagg({
  store: sessionStore(),
  definitions: {
    myFlag: {}
  }
});

ReactDOM.render(
  <FlaggProvider featureFlags={featureFlags}>
    <App />
  </FlaggProvider>,
  document.getElementById('root')
);
```

# Hooks

The `useFeatureFlag` hook is very similar to Reacts `useState` hook. It provides a value and a setter function as an array.

```tsx
import { useFeatureFlag } from 'flagg/react';

function App() {
  const [myFlag, setMyFlag] = useFeatureFlag('myFlag);

  return (
    <div>
      {myFlag ? (
        <div>The flag is on!</div>
      ): (
        <div>The flag is off :(</div>
      )}
    </div>
  )
}
```

# Admin

Mount the admin component at the location of your choice. It takes an optional `onDone` prop which you can use to navigate away / hide it when the "done" button is clicked inside the admin.

```tsx
import {FlaggAdmin} from 'flagg/react';

function App() {
  return (
    <Switch>
      <Route path="/" render={() => <Home />}>
      {process.end.NODE_ENV === 'development' &&
        <Route path="/feature-flags" render={() => <FlaggAdmin onDone={() => history.back()} />
        }>
      }
    </Switch>
  )
}
```
