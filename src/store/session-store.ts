import { FlaggStore, FlagValue } from '../core';
import { getKey, safeParseJSON, mapFromStoredValuesWithPrefix } from './utils';

export const sessionStore = (): FlaggStore => {
  const get = (flagName: string): FlagValue =>
    safeParseJSON(window.sessionStorage.getItem(getKey(flagName)));

  return {
    name: 'sessionStore',
    get,
    set: (flagName, value) =>
      window.sessionStorage.setItem(getKey(flagName), JSON.stringify(value)),
    remove: flagName => window.sessionStorage.removeItem(getKey(flagName)),
    all: () => mapFromStoredValuesWithPrefix(window.sessionStorage, get)
  };
};
