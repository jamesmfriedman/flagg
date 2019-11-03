import { FlaggReadOnlyStorage, FlagValue } from '../core';
import { KEY_PREFIX, safeParseJSON } from './utils';

export const urlStore = (locationSearch: string): FlaggReadOnlyStorage => {
  const params = new URLSearchParams(locationSearch);
  const store = safeParseJSON(params.get(KEY_PREFIX) || {}) as {
    [key: string]: FlagValue;
  };

  return {
    name: 'urlStore',
    get: flagName => store[flagName] || null,
    all: () => store
  };
};
