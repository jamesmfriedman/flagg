import { FlagglyStorage, FlagValue } from '../core';
import { safeParseJSON, getKey, mapFromStoredValuesWithPrefix } from './utils';

export const localStore = (): FlagglyStorage => {
  const get = (flagName: string): FlagValue =>
    safeParseJSON(window.localStorage.getItem(getKey(flagName)));

  return {
    name: 'localStore',
    get,
    set: (flagName, value) =>
      window.localStorage.setItem(getKey(flagName), JSON.stringify(value)),
    remove: flagName => window.localStorage.removeItem(getKey(flagName)),
    all: () => mapFromStoredValuesWithPrefix(window.localStorage, get)
  };
};
