import React from 'react';
import { inMemoryStore } from '../storage';
import { flagg } from '../core';

export const FlaggContext = React.createContext({
  featureFlags: flagg({ storage: inMemoryStore() }),
  iteration: 0
});
