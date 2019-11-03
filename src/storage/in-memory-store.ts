import { FlaggStorage, FlagValue } from '../core';
import { getKey, mapFromStoredValuesWithPrefix } from './utils';

export const inMemoryStore = (): FlaggStorage => {
  const store: { [key: string]: FlagValue } = {};
  const get = (flagName: string): FlagValue => store[getKey(flagName)] || null;
  return {
    name: 'inMemoryStore',
    get,
    set: (flagName, value) => {
      store[getKey(flagName)] = value;
    },
    remove: flagName => delete store[getKey(flagName)],
    all: () => mapFromStoredValuesWithPrefix(store, get)
  };
};
