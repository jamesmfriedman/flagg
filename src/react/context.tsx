import React from 'react';
import { inMemoryStore } from '../storage';
import { flaggly } from '../core';

export const FlagglyContext = React.createContext({
  featureFlags: flaggly({ storage: inMemoryStore() }),
  iteration: 0
});
