import React from 'react';
import { inMemoryStore } from '../store';
import { flagg } from '../core';

export const FlaggContext = React.createContext({
  featureFlags: flagg({ store: inMemoryStore() }),
  iteration: 0
});
